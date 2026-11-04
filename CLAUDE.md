# 宅日常 (otaku_daily) 開發規範

## 載入遮罩（必須遵守）

網頁裡**所有會讓使用者等待的載入動作都要顯示全站載入遮罩**（芙莉蓮動圖、背景變暗、鎖住操作），實作在 `static/js/loader.js`，由 `templates/base.html` 載入。

- App 自動更新：`static/js/updater.js` 在切回前景與每 5 分鐘比對 `/version.json`（Render 的 `RENDER_GIT_COMMIT`），有新版且沒在播放／填表單就自動重新整理，否則顯示「有新版本」提示。
- 換頁（點站內連結）、送出表單：已自動處理，不用另外寫。
  - iPhone Safari 一開始換頁就會凍結舊頁面（動圖停住），所以 POST 表單一律在背景送出：伺服器導向就換到導向的網址，沒導向（表單錯誤）就只替換頁面的 `<main>`。因此**表單頁的內容要放在 `<main>` 裡**，錯誤時才能正確顯示。
  - 站內連結會先在背景請求一次新頁面，準備好才換頁（免費主機休眠喚醒期間動圖持續播放）。
- `fetch()`：已自動處理。只有不需要使用者等待的背景請求（例如定時同步、記錄點擊）才加 `{ loading: false }`。
- 其他非同步工作（等待影音、計時、第三方 SDK 等）：用 `AppLoading.track(promise)`，或 `const done = AppLoading.start()` 完成時呼叫 `done()`；失敗時也要呼叫。
- 影音只在「開始載入一首／一部」時遮罩（見 `static/js/player.js` 的 `trackMediaLoading`），播放中途的緩衝不遮罩，避免連暫停都按不了。
- 遮罩超過 15 秒會自動解除（防呆；換頁與送出表單為 60 秒，配合免費主機喚醒時間），頁面內的載入不到 0.25 秒不會顯示（避免閃爍），換頁與送出表單則立即顯示。

## 部署流程

- `staging` 分支 → 測試站 https://otaku-daily-staging.onrender.com （SQLite，部署或休眠後資料清空，頂端有「測試站」橫幅）
- `main` 分支 → 正式站 https://otaku-daily.onrender.com （資料庫在 Neon，`DATABASE_URL` 只在 Render 網頁設定）
- 新功能先推 `staging` 驗證，經使用者同意後再快轉合併到 `main`。
- 測試站資料庫：Neon 同專案的 `ukiyo_staging` 資料庫（Render 測試站的 DATABASE_URL），帳號與資料會保留；未設定時退回 SQLite（每次部署清空）。
- 測試帳號放在 `dev_test_account.txt`（不進 Git），只用在本機與測試站，不在正式站建立或登入帳號。
- 測試站登入頁有「⚡ 一鍵登入測試帳號」（`accounts.views.quick_login`，帳號 quick_tester、無密碼），只在 `APP_ENV=staging` 開放，正式站回 404。

## 其他

- 介面文字一律繁體中文（台灣）。
- 行程小幫手：`planner` 模組（從 csi_server LINE 版移植）。群組用邀請連結加入；權限是建立者或群組成員才能編輯／刪除／定案；提前提醒欄位已存，推播完成後才實際發送。測試：`python manage.py test planner`。
- 推播通知：`notifications` 模組（Web Push，VAPID 金鑰首次使用時自動產生存 DB）。右上角 🔔 開啟；iPhone 需加入主畫面（iOS 16.4+）。行程提醒由 `/notify/tick/` 發送，GitHub Actions（`.github/workflows/notify-tick.yml`）在台灣 08:00～22:00 每 30 分鐘叫醒正式站，22:00 會先發出到隔天 08:00 前的提醒（節省 Render／Neon 免費額度）。測試：`python manage.py test notifications`。
- 北部動漫活動：讀取 Google 試算表（雲端排程每天台灣時間 08:00 更新），網站每天 08:30 後重新讀一次，見 `player/events.py`；備份用 `python manage.py update_events_snapshot` 更新。
- 影音清單來源與快照：見 `player/playlist.py`；影音儲存庫新增檔案後執行 `python manage.py update_media_snapshot` 更新快照。
