# 宅日常 (otaku_daily) 開發規範

## 載入遮罩（必須遵守）

網頁裡**所有會讓使用者等待的載入動作都要顯示全站載入遮罩**（芙莉蓮動圖、背景變暗、鎖住操作），實作在 `static/js/loader.js`，由 `templates/base.html` 載入。

- 換頁（點站內連結）、送出表單：已自動處理，不用另外寫。
- `fetch()`：已自動處理。只有不需要使用者等待的背景請求（例如定時同步、記錄點擊）才加 `{ loading: false }`。
- 其他非同步工作（等待影音、計時、第三方 SDK 等）：用 `AppLoading.track(promise)`，或 `const done = AppLoading.start()` 完成時呼叫 `done()`；失敗時也要呼叫。
- 影音只在「開始載入一首／一部」時遮罩（見 `static/js/player.js` 的 `trackMediaLoading`），播放中途的緩衝不遮罩，避免連暫停都按不了。
- 遮罩超過 15 秒會自動解除（防呆），載入不到 0.25 秒不會顯示（避免閃爍）。

## 部署流程

- `staging` 分支 → 測試站 https://otaku-daily-staging.onrender.com （SQLite，部署或休眠後資料清空，頂端有「測試站」橫幅）
- `main` 分支 → 正式站 https://otaku-daily.onrender.com （資料庫在 Neon，`DATABASE_URL` 只在 Render 網頁設定）
- 新功能先推 `staging` 驗證，經使用者同意後再快轉合併到 `main`。
- 測試帳號放在 `dev_test_account.txt`（不進 Git），只用在本機與測試站，不在正式站建立或登入帳號。

## 其他

- 介面文字一律繁體中文（台灣）。
- 影音清單來源與快照：見 `player/playlist.py`；影音儲存庫新增檔案後執行 `python manage.py update_media_snapshot` 更新快照。
