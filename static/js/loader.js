// 宅日常 全站載入遮罩：芙莉蓮動圖、背景變暗並鎖住操作
// 所有載入動作都要經過這裡（規範見專案 CLAUDE.md）：
//   - 換頁（點站內連結）、送出表單：自動處理
//   - fetch()：自動處理；不需要遮罩的背景請求加上 { loading: false }
//   - 其他非同步工作：AppLoading.track(promise) 或 AppLoading.start() / 回傳的 done()
(() => {
  const loader = document.getElementById('page-loader');
  const FAILSAFE_MS = 15000;
  let pending = 0;          // 進行中的載入數量，全部完成才解除
  let navigating = false;   // 正在換頁：頁面即將被取代，不再解除
  let failsafe = null;

  function render() {
    const on = navigating || pending > 0;
    loader.classList.toggle('is-active', on);
    // inert 讓遮罩底下的內容不能點擊、也不能用鍵盤操作
    [...document.body.children].forEach((el) => { if (el !== loader && el.tagName !== 'SCRIPT') el.inert = on; });
    document.body.setAttribute('aria-busy', on ? 'true' : 'false');
    clearTimeout(failsafe);
    // 防呆：卡住超過 15 秒就解除鎖定，避免頁面永遠不能操作
    if (on) failsafe = setTimeout(reset, FAILSAFE_MS);
  }

  function reset() { pending = 0; navigating = false; loader.classList.remove('is-immediate'); render(); }

  /** 開始一個載入，回傳 done()；done 重複呼叫也只算一次 */
  function start() {
    pending += 1;
    render();
    let finished = false;
    return () => {
      if (finished) return;
      finished = true;
      pending = Math.max(0, pending - 1);
      render();
    };
  }

  /** 在 promise 完成（成功或失敗）前顯示遮罩，回傳原本的 promise */
  function track(promise) {
    const done = start();
    return Promise.resolve(promise).finally(done);
  }

  function navigate() { navigating = true; render(); }

  // iPhone Safari 一開始換頁就停止更新舊頁面，遮罩來不及出現。
  // 換頁、送出表單是使用者主動操作，本來就要等：立即顯示（不延遲），
  // 等遮罩真的畫到畫面上（兩個畫面更新週期，約 0.03 秒）才開始換頁。
  function navigateAfterPaint(go) {
    loader.classList.add('is-immediate');
    navigate();
    let started = false;
    const once = () => { if (!started) { started = true; go(); } };
    requestAnimationFrame(() => requestAnimationFrame(once));
    // 分頁在背景時畫面更新會暫停，保底 0.1 秒後一定換頁
    setTimeout(once, 100);
  }

  // ---------- fetch 自動顯示遮罩 ----------
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const { loading = true, ...rest } = init;
    return loading ? track(nativeFetch(input, rest)) : nativeFetch(input, rest);
  };

  // ---------- 頁面一開始的遮罩：內容準備好就移除（不等動圖等大檔案） ----------
  navigating = true;
  document.addEventListener('DOMContentLoaded', () => { navigating = false; render(); });

  // ---------- 點站內連結時顯示（新分頁、下載、頁內錨點、按住修飾鍵開新視窗除外） ----------
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
    e.preventDefault();
    navigateAfterPaint(() => { location.href = url.href; });
  });

  // ---------- 送出表單：停用按鈕避免連按兩次造成「頁面已過期」，並顯示遮罩 ----------
  document.addEventListener('submit', (e) => {
    if (e.defaultPrevented) return;
    const form = e.target;
    e.preventDefault();
    form.querySelectorAll('button[type=submit]').forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.busy) btn.textContent = btn.dataset.busy;
    });
    // form.submit() 不會再觸發 submit 事件，不會重複執行這段
    navigateAfterPaint(() => form.submit());
  });

  // ---------- 從返回鍵或切回 App 顯示快取頁面：有表單就重新載入確保是最新的，否則解除遮罩 ----------
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    if (document.querySelector('form input[name=csrfmiddlewaretoken]')) location.reload();
    else reset();
  });

  window.AppLoading = { start, track, reset };
})();
