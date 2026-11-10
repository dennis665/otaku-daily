// 宅日常 全站載入遮罩：芙莉蓮動圖、背景變暗並鎖住操作
// 所有載入動作都要經過這裡（規範見專案 CLAUDE.md）：
//   - 換頁（點站內連結）、送出表單：自動處理
//   - fetch()：自動處理；不需要遮罩的背景請求加上 { loading: false }
//   - 其他非同步工作：AppLoading.track(promise) 或 AppLoading.start() / 回傳的 done()
(() => {
  const loader = document.getElementById('page-loader');
  const FAILSAFE_MS = 15000;      // 一般載入卡住多久後解除鎖定
  const SERVER_WAIT_MS = 60000;   // 換頁、送出表單：免費主機休眠喚醒要 30～60 秒
  let pending = 0;          // 進行中的載入數量，全部完成才解除
  let navigating = false;   // 正在換頁：頁面即將被取代，不再解除
  let deadline = 0;         // 防呆解除鎖定的時間點
  let failsafe = null;

  function render() {
    const on = navigating || pending > 0;
    loader.classList.toggle('is-active', on);
    // inert 讓遮罩底下的內容不能點擊、也不能用鍵盤操作
    [...document.body.children].forEach((el) => { if (el !== loader && el.tagName !== 'SCRIPT') el.inert = on; });
    document.body.setAttribute('aria-busy', on ? 'true' : 'false');
    clearTimeout(failsafe);
    // 防呆：卡住超過時限就解除鎖定，避免頁面永遠不能操作
    if (on) {
      deadline = Math.max(deadline, Date.now() + FAILSAFE_MS);
      failsafe = setTimeout(reset, deadline - Date.now());
    } else {
      deadline = 0;
    }
  }

  function reset() { pending = 0; navigating = false; deadline = 0; loader.classList.remove('is-immediate'); render(); }

  /** 開始一個載入，回傳 done()；done 重複呼叫也只算一次。maxMs：最多鎖定多久 */
  function start(maxMs = FAILSAFE_MS) {
    pending += 1;
    deadline = Math.max(deadline, Date.now() + maxMs);
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

  // 換頁前先立即顯示遮罩（不延遲），等遮罩畫到畫面上（兩個畫面更新週期，約 0.03 秒）才換頁。
  // 用在無法改成背景處理的情況（例如背景請求失敗時的退路）。
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
    // iPhone Safari 一開始換頁就凍結舊頁面（動圖停住）。先在背景確認新頁面準備好
    // （主機休眠時等它喚醒），這段時間動圖會持續播放，準備好才真正換頁。
    loader.classList.add('is-immediate');
    const done = start(SERVER_WAIT_MS);
    nativeFetch(url.href, { credentials: 'same-origin' })
      .catch(() => {})
      .then(() => { navigate(); done(); location.href = url.href; });
  });

  // ---------- 送出表單：在背景送出，伺服器處理期間動圖持續播放 ----------
  // 成功（伺服器導向下一頁）才換頁；失敗（例如密碼錯誤）直接把錯誤訊息換到目前頁面，不用換頁。
  // 也會停用按鈕，避免連按兩次造成「頁面已過期」。
  document.addEventListener('submit', async (e) => {
    if (e.defaultPrevented) return;
    const form = e.target;
    e.preventDefault();
    const body = new FormData(form);
    form.querySelectorAll('button[type=submit]').forEach((btn) => {
      btn.disabled = true;
      if (btn.dataset.busy) btn.textContent = btn.dataset.busy;
    });
    // form.submit() 不會再觸發 submit 事件，不會重複執行這段
    if ((form.getAttribute('method') || 'get').toLowerCase() !== 'post') {
      navigateAfterPaint(() => form.submit());
      return;
    }

    loader.classList.add('is-immediate');
    const done = start(SERVER_WAIT_MS);
    let res;
    try {
      res = await nativeFetch(form.action || location.href, { method: 'POST', body, credentials: 'same-origin' });
    } catch {
      done();
      if (navigator.onLine === false) {
        // 沒網路：留在原頁提示，不改用一般方式送出（會跳到無法連線的畫面）
        loader.classList.remove('is-immediate');
        form.querySelectorAll('button[type=submit]').forEach((btn) => { btn.disabled = false; });
        alert('目前沒有網路連線，請連線後再試 📶');
        return;
      }
      navigateAfterPaint(() => form.submit());   // 背景送出失敗：改用一般方式送出
      return;
    }
    if (res.redirected) {
      navigate();
      done();
      location.replace(res.url);
      return;
    }
    // 沒有導向：伺服器重新顯示了表單（含錯誤訊息），換掉目前頁面的主要內容
    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const newMain = doc.querySelector('main');
    const oldMain = document.querySelector('main');
    if (newMain && oldMain) {
      document.title = doc.title;
      oldMain.replaceWith(document.importNode(newMain, true));
      done();
      loader.classList.remove('is-immediate');
      const firstError = document.querySelector('main .err, main .alert');
      const field = firstError && firstError.closest('.field') ? firstError.closest('.field').querySelector('input') : document.querySelector('main input:not([type=hidden])');
      if (field) field.focus();
    } else {
      // 其他格式的回應：整頁換成伺服器的回應
      navigate();
      done();
      document.open();
      document.write(html);
      document.close();
    }
  });

  // ---------- 從返回鍵或切回 App 顯示快取頁面：有表單就重新載入確保是最新的，否則解除遮罩 ----------
  window.addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    if (document.querySelector('form input[name=csrfmiddlewaretoken]')) location.reload();
    else reset();
  });

  window.AppLoading = { start, track, reset };
})();
