# 宅日常 (otaku_daily) 開發規範

## 載入遮罩（必須遵守）

網頁裡**所有會讓使用者等待的載入動作都要顯示全站載入遮罩**（芙莉蓮動圖、背景變暗、鎖住操作），實作在 `static/js/loader.js`，由 `templates/base.html` 載入。

- App 自動更新：`static/js/updater.js` 在切回前景與每 5 分鐘比對 `/version.json`（Render 的 `RENDER_GIT_COMMIT` 與建置時間 `built`＝建置時產生的 `staticfiles.json` 時間），版本不同且伺服器的建置時間比頁面新（Render 換版時新舊機器會並行幾分鐘，舊機器的回應要忽略，否則會被拉回舊版）、沒在播放／填表單就自動重新整理，否則顯示「有新版本」提示。
- 換頁（點站內連結）、送出表單：已自動處理，不用另外寫。
  - iPhone Safari 一開始換頁就會凍結舊頁面（動圖停住），所以 POST 表單一律在背景送出：伺服器導向就換到導向的網址，沒導向（表單錯誤）就只替換頁面的 `<main>`。因此**表單頁的內容要放在 `<main>` 裡**，錯誤時才能正確顯示。
  - 站內連結會先在背景請求一次新頁面，準備好才換頁（免費主機休眠喚醒期間動圖持續播放）。
- `fetch()`：已自動處理。只有不需要使用者等待的背景請求（例如定時同步、記錄點擊）才加 `{ loading: false }`。
- 其他非同步工作（等待影音、計時、第三方 SDK 等）：用 `AppLoading.track(promise)`，或 `const done = AppLoading.start()` 完成時呼叫 `done()`；失敗時也要呼叫。
- 影音只在「開始載入一首／一部」時遮罩（見 `static/js/player.js` 的 `trackMediaLoading`），播放中途的緩衝不遮罩，避免連暫停都按不了。
- 遮罩超過 15 秒會自動解除（防呆；換頁與送出表單為 60 秒，配合免費主機喚醒時間），頁面內的載入不到 0.25 秒不會顯示（避免閃爍），換頁與送出表單則立即顯示。

## 部署流程

- `staging` 分支 → 測試站 https://otaku-daily-staging.onrender.com （資料庫在 Neon 的 `ukiyo_staging`，資料會保留，頂端有「測試站」橫幅）
- `main` 分支 → 正式站 https://otaku-daily.onrender.com （資料庫在 Neon，`DATABASE_URL` 只在 Render 網頁設定）
- 新功能先推 `staging` 驗證，經使用者同意後再快轉合併到 `main`。
- 測試站資料庫：Neon 同專案的 `ukiyo_staging` 資料庫（Render 測試站的 DATABASE_URL，不開 pooling），帳號與資料會保留；未設定時退回 SQLite（每次部署清空）。
- 測試帳號放在 `dev_test_account.txt`（不進 Git），只用在本機與測試站，不在正式站建立或登入帳號。
- 測試站登入頁有「⚡ 一鍵登入測試帳號」（`accounts.views.quick_login`，帳號 quick_tester、無密碼），只在 `APP_ENV=staging` 開放，正式站回 404。

## 其他

- 介面文字一律繁體中文（台灣）。
- 行程小幫手：`planner` 模組（從 csi_server LINE 版移植）。一個行程可分享到多個群組；群組用搜尋會員邀請或邀請連結加入；權限是建立者或任一分享群組的成員才能編輯／刪除／定案；提醒自動發給建立者、所有群組成員與透過分享連結加入的人（沒有「我有興趣」）。測試：`python manage.py test planner`。
- 推播通知：`notifications` 模組（Web Push，VAPID 金鑰首次使用時自動產生存 DB）。右上角 🔔 開啟；iPhone 需加入主畫面（iOS 16.4+）。行程提醒由 `/notify/tick/` 發送。主要由 cron-job.org（使用者的帳號）定時呼叫：「Ukiyo 保持清醒」台灣 08:00～22:00 每 10 分鐘呼叫 `/version.json`（不碰資料庫，讓 Render 白天不休眠）、「Ukiyo 提醒檢查」每 30 分鐘呼叫 `/notify/tick/`；GitHub Actions（`.github/workflows/notify-tick.yml`）同時段當備援（GitHub 免費排程常延遲或跳過，不可單靠它）。22:00 會先發出到隔天 08:00 前的提醒。重複呼叫不會重複發送。測試：`python manage.py test notifications`。
- 喚醒等待畫面：`templates/player/wake.html` + `static/video/wake.mp4`。service worker 安裝時存進手機；開頁時 Render 回 503（休眠）、502／504（換版重啟中）或 3.5 秒沒回應（且 `/version.json` 也沒醒）就顯示等待畫面播影片，每 2 秒檢查主機，醒了自動重新載入；超過 3 分鐘還沒醒（Render 免費方案偶爾會叫不醒）改顯示「🛠 伺服器維護中」，每 15 秒檢查並有「重新檢查」鈕。測試站橫幅有「🎬 預覽等待畫面」（`/wake/?preview=1`）與「🛠 維護畫面」（`/wake/?preview=maint`）。主機叫不醒時：Render 後台該服務右上 Manual Deploy → Restart service。換影片只要替換 `static/video/wake.mp4`。
- 追劇小幫手：`dramas` 模組。卡片縮圖點了用全螢幕看圖（`static/js/viewer.js`，`window.ImageViewer.open(網址陣列, 起始張, 標題)`；左右滑動或箭頭換張、往下拉或 ✕ 關閉；多張圖的縮圖右下角標 🖼 張數）。作品以 youranimes 作品編號（source_id）為準，同一部只有一筆，劇庫「只新增、不刪除」（`dramas/sync.py`）。每日抓新番：GitHub Actions（`.github/workflows/drama-sync.yml`）台灣 16:00 執行 `tools/crawl_youranimes.py`，讀頁面 JSON-LD 後送到 `/dramas/api/sync/`（密碼在 GitHub Secrets 的 `DRAMA_SYNC_TOKEN`，程式只存指紋）。測試：`python manage.py test dramas`。
- 北部動漫活動：讀取 Google 試算表（claude.ai 雲端排程「每日 AI 與北部動漫活動資訊更新」台灣 08:00 完整更新、「北部動漫快訊」12:30／19:30 只搜新公告），網站在 08:30、13:00、20:00 後各重新讀一次；活動分頁的 🔄 可手動重讀（伺服器端同一份快取至少間隔 60 秒），App 在背景超過 30 分鐘切回來也會自動重讀，見 `player/events.py`；備份用 `python manage.py update_events_snapshot` 更新。
- 個人設定與自訂歌單：`player` 模組的 `UserPrefs`（右上角 ⚙️，可關閉影片／活動／行程／追劇分頁，音樂固定顯示）與 `Playlist`（歌曲以檔名為編號，依加入順序；播放的上一首／下一首跟著目前選的歌單）。測試：`python manage.py test player`。
- 背景連續播放：每首歌開始播時先把下一首整首下載到記憶體（blob），播完直接換上，iPhone 鎖定畫面或在背景時也不用等網路（`player.js` 的 planNext／prefetchNext）。
- 離線聽歌：音樂分頁的「📥 存到手機」把目前歌單的歌存進 Cache Storage（`ukiyo-offline-songs`），service worker 攔截 raw.githubusercontent 的請求，有存就從手機分段提供（不耗流量）；主頁每次從網路成功打開就存一份（`ukiyo-offline-page`），沒網路時用它開 App；個人歌單在 localStorage 存最近一次的副本（`myLists`），離線模式（`body.offline-mode`）只留音樂分頁（有存歌的歌單與存在手機的歌）和抽卡分頁的卡冊（卡冊每次連網讀取時在 localStorage 存副本 `gachaAlbum`，卡面圖在 `ukiyo-cards`；登出時刪副本），其他分頁、設定、搜尋、新增或編輯歌單、登出都隱藏；沒網路的提示頁網路恢復會自動重新載入；沒網路時送出表單（例如登入）留在原頁提示。登出時只刪歌單副本，存的主頁與歌保留，沒網路時以「📴 離線模式」開啟（不顯示帳號、只有全部歌曲）；沒網路時開任何頁面都改開存的主頁。影音庫換檔後，手機裡對不上的舊檔會自動清掉。
- 動畫小卡抽卡：`gacha` 模組＋「🎴 抽卡」分頁（`static/js/gacha.js`、`static/css/gacha.css`，可在 ⚙️ 關閉）。抽卡演出：蓄力光芒依最高稀有度逐級升級（藍→金→粉→彩虹→黑金）、開包閃光與粒子、翻卡、稀有度印章，點一下可跳過；卡冊每部作品 6 格（沒收集到顯示剪影），點卡看大圖可傾斜欣賞。卡片（`Card`）＝一張卡面圖片，屬於某部作品與稀有度，同作品同稀有度可以多張；卡面放在不公開的 GitHub 儲存庫 `dennis665/fenglan-card-images`（本機 `D:\SI1403\dennis\card-images`，索引 `index.json`），由本站 `/gacha/img/<file>` 代為讀取、需登入才看得到；Render 要設環境變數 `CARD_REPO_TOKEN`（只給這個儲存庫 Contents 讀取權限），本機用 `.env` 的 `CARD_LOCAL_DIR` 直接讀本機資料夾。伺服器每 10 分鐘讀索引同步（`gacha/cards.py`），卡片以作品系列共用（卡掛在第一季，追同系列任何一季都抽得到），只有本身或同系列有卡片的作品抽得到；挑圖用 `card-images/card_sorter.py`（瀏覽 `card_inbox/_候選`、按稀有度分類、一鍵匯入上傳）；新增卡面：圖片放 `card-images/card_inbox/<作品名>/<稀有度>/<卡名>.png`，執行 `python card_import.py --push`（作品清單先用 `python manage.py export_card_works ../../card-images/card_works.json` 匯出）。抽到與卡冊裡的卡面存進手機 Cache Storage（`ukiyo-cards`），service worker 優先從手機提供，卡冊底下可一鍵清除。早期沒有圖的舊卡保留為文字卡面、不會再被抽到。稀有度機率見 `gacha/models.py`，每天台灣 00:00 補券：自選抽卡券 10 張（任選有卡片的作品抽，追的作品排前面、標 ⭐）、隨機抽卡券 5 張（全作品大混池），當天沒用完不保留；每日任務：App 在前景時每 30 秒回報在線（`/gacha/api/heartbeat/`，間隔太短或太長不算；畫面每秒自己往上跳），當天累積 5 分鐘可領自選抽卡券 5 張（保留券 `GachaState.bonus_tickets`，不過期、可累積，自選抽時先用當天的券再用保留券）；一次可抽 1／5／10 張，券不夠抽到用完為止；50 抽保底 SSR 以上；結果由伺服器決定並記錄。✨ 星塵：只有重複的卡可以分解（每張至少保留 1 張，卡冊有「一鍵分解重複卡」），🛒 星塵商店可兌換自選抽卡券（保留券）或在卡冊點沒收集到的剪影兌換指定卡，價格見 `gacha/models.py` 的 DUST_VALUE／CARD_PRICE／TICKET_PRICE；卡面庫下架卡片時，持有者依分解價值自動退還星塵並收到一次性通知（`GachaState.notice`）。新作品第一次有卡片上架時（同系列算同一部），所有帳號每部送自選抽卡券 10 張（保留券，`NEW_WORK_GIFT`）並通知；已送過的作品記在 `GiftedWork`，不會重複送（`gacha/cards.py` 的 `gift_new_works`）。同時推播「🎉 新作品上架」給有開通知的裝置（點了開抽卡分頁）。延伸玩法在 `gacha/extras.py`：🏆 組合羈絆（卡面庫 index.json 的 `combos`，每位角色至少 1 張卡就集齊，送 成員數×20 星塵、每組一次；角色＝卡名第一個空白前的字）、🏅 收集稱號（某作品收集 50%／100% 與合計種數解鎖，名稱在 index.json 的 `titles`，解鎖後永久保留、可選一個顯示）、⭐ 展示櫃（抽卡分頁最上面，最多 3 張，卡片大圖裡放入／拿出）、🎯 問答（🎵 聽歌猜作品：追劇庫作品的主題曲從約 25% 處播 15 秒；💬 名言猜猜看：`gacha/data/quotes.json`；兩種各每天 3 題、答對 +10 星塵，下方保留當天的作答紀錄，聽歌題可再聽一次）。一次性活動（例如大更新全帳號送券）：在 `gacha/cards.py` 的 `CAMPAIGNS` 加一筆（key 不可重複），伺服器第一次有人打開抽卡分頁時發給當下所有帳號（保留券＋通知）並推播，記在 `GiftedWork`（`campaign:<key>`）只發一次；測試站與正式站各自發一次。測試：`python manage.py test gacha`。
- 影音清單來源與快照：見 `player/playlist.py`；影音儲存庫新增檔案後執行 `python manage.py update_media_snapshot` 更新快照。
