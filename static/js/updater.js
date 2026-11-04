// Ukiyo 自動更新：加到主畫面的 App 切回前景時不會重新載入頁面，所以看不到新部署的功能。
// 這裡在 App 回到前景、以及開著時每 5 分鐘，向伺服器確認目前版本：
//   - 有新版本且沒在播放、沒在填表單 → 直接重新整理
//   - 正在聽歌／看影片或填到一半 → 不打斷，畫面下方顯示「有新版本，點我更新」
(() => {
  const meta = document.querySelector('meta[name="app-version"]');
  if (!meta) return;
  const current = meta.content;
  const INTERVAL_MS = 5 * 60 * 1000;
  const MIN_GAP_MS = 30 * 1000;   // 短時間內切來切去不重複檢查
  let lastCheck = Date.now();
  let checking = false;
  let toast = null;

  // 正在播放影音，或表單有輸入內容（搜尋框除外）→ 不要自動重新整理
  function busy() {
    const playing = [...document.querySelectorAll('audio, video')].some((m) => !m.paused && !m.ended);
    const typing = [...document.querySelectorAll('form input:not([type=hidden]):not([type=search]), form textarea')]
      .some((f) => f.value && f.value !== f.defaultValue);
    return playing || typing;
  }

  function showToast() {
    if (toast) return;
    toast = document.createElement('button');
    toast.type = 'button';
    toast.className = 'update-toast';
    toast.textContent = '✨ 有新版本，點我更新';
    toast.addEventListener('click', () => location.reload());
    document.body.appendChild(toast);
  }

  async function check(force = false) {
    if (checking || (!force && Date.now() - lastCheck < MIN_GAP_MS)) return;
    checking = true;
    lastCheck = Date.now();
    try {
      // loading:false → 背景檢查，不顯示載入遮罩
      const res = await fetch('/version.json', { loading: false, cache: 'no-store', credentials: 'same-origin' });
      const { version } = await res.json();
      if (version && version !== current) {
        if (busy()) showToast(); else location.reload();
      }
    } catch { /* 離線或伺服器休眠中：下次再檢查 */ }
    checking = false;
  }

  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
  window.addEventListener('pageshow', (e) => { if (e.persisted) check(true); });
  setInterval(() => { if (document.visibilityState === 'visible') check(true); }, INTERVAL_MS);
})();
