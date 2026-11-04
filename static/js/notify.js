// Ukiyo 推播通知設定（右上角 🔔）：開啟 / 關閉這台裝置的通知、傳送測試通知
// iPhone 只有「加入主畫面」後從主畫面打開才支援（iOS 16.4+）；權限要在使用者按按鈕時才能詢問
(() => {
  const $ = (id) => document.getElementById(id);
  const sheet = $('n-sheet');
  const statusEl = $('n-status');
  const btnEnable = $('n-enable');
  const btnTest = $('n-test');
  const btnDisable = $('n-disable');
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

  async function api(url, body) {
    const opts = { credentials: 'same-origin' };
    if (body !== undefined) {
      opts.method = 'POST';
      opts.headers = { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() };
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(url, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok === false) throw new Error(json.error || '操作失敗，請稍後再試');
    return json;
  }

  // 推播公開金鑰（base64url）轉成瀏覽器要的格式
  function keyToBytes(b64) {
    const pad = '='.repeat((4 - (b64.length % 4)) % 4);
    const raw = atob((b64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(raw, (c) => c.charCodeAt(0));
  }

  // 手機上的訂閱是用哪一把金鑰建立的；和網站目前的金鑰不同就必須重新訂閱
  function sameKey(sub, key) {
    const used = sub && sub.options && sub.options.applicationServerKey;
    if (!used) return false;
    const a = new Uint8Array(used);
    const b = keyToBytes(key);
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }

  // 取得與目前金鑰相符的訂閱（舊金鑰的先取消再重新訂閱），並登記到伺服器
  async function subscribeFresh(key) {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (sub && !sameKey(sub, key)) { await sub.unsubscribe(); sub = null; }
    if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyToBytes(key) });
    await api('/notify/api/subscribe/', sub.toJSON());
    return sub;
  }

  async function currentSubscription() {
    if (!supported) return null;
    const reg = await navigator.serviceWorker.ready;
    return reg.pushManager.getSubscription();
  }

  function show(el, on) { el.hidden = !on; }

  async function refresh() {
    show($('n-ios'), isIOS && !standalone);
    if (!supported) {
      statusEl.textContent = isIOS && !standalone ? '目前用瀏覽器開啟，無法接收通知。' : '這個瀏覽器不支援推播通知。';
      [btnEnable, btnTest, btnDisable].forEach((b) => show(b, false));
      return;
    }
    const [status, sub] = await Promise.all([api('/notify/api/status/'), currentSubscription()]);
    const onServer = sub && sameKey(sub, status.public_key) && status.devices.some((d) => d.endpoint === sub.endpoint);
    const perm = Notification.permission;
    if (perm === 'denied') {
      statusEl.textContent = '⛔ 通知權限被封鎖了，請到手機的「設定 → 通知 → Ukiyo」（或瀏覽器的網站設定）重新允許。';
    } else if (onServer) {
      statusEl.textContent = '✅ 這台裝置已開啟通知';
    } else {
      statusEl.textContent = '這台裝置還沒開啟通知';
    }
    show(btnEnable, perm !== 'denied' && !onServer);
    show(btnDisable, Boolean(onServer));
    show(btnTest, status.devices.length > 0);
    $('n-devices').textContent = status.devices.length
      ? `已開啟通知的裝置：${status.devices.map((d) => `${d.label}（${d.created}）`).join('、')}`
      : '';
    btnEnable.dataset.key = status.public_key;
  }

  btnEnable.addEventListener('click', async () => {
    try {
      // 權限詢問一定要在按鈕的點擊裡直接呼叫（iPhone 的規定）
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') { await refresh(); return; }
      await subscribeFresh(btnEnable.dataset.key);
      await refresh();
    } catch (err) {
      alert(`開啟通知失敗：${err.message}`);
    }
  });

  btnDisable.addEventListener('click', async () => {
    try {
      const sub = await currentSubscription();
      if (sub) {
        await api('/notify/api/unsubscribe/', { endpoint: sub.endpoint });
        await sub.unsubscribe();
      }
      await refresh();
    } catch (err) {
      alert(err.message);
    }
  });

  btnTest.addEventListener('click', async () => {
    try {
      const r = await api('/notify/api/test/', {});
      alert(`已送出測試通知到 ${r.sent} 台裝置${r.failed ? `（${r.failed} 台失敗）` : ''}，幾秒內會跳出來。\n如果 App 開在前景，iPhone 可能不會顯示，可以先切到主畫面等一下。`);
    } catch (err) {
      alert(err.message);
    }
  });

  // 打開 App 時自動修復：已經允許通知，但伺服器沒有這台裝置（例如測試站資料被清空、金鑰換了）就在背景重新訂閱
  async function autoRepair() {
    if (!supported || Notification.permission !== 'granted') return;
    try {
      const res = await fetch('/notify/api/status/', { loading: false, credentials: 'same-origin' });
      if (!res.ok) return;
      const status = await res.json();
      const sub = await currentSubscription();
      const ok = sub && sameKey(sub, status.public_key) && status.devices.some((d) => d.endpoint === sub.endpoint);
      if (!ok) await subscribeFresh(status.public_key);
    } catch { /* 下次打開再試 */ }
  }
  autoRepair();

  $('n-open').addEventListener('click', async () => {
    sheet.hidden = false;
    document.body.classList.add('sheet-open');
    statusEl.textContent = '檢查中…';
    try { await refresh(); } catch (err) { statusEl.textContent = err.message; }
  });
  sheet.addEventListener('click', (e) => {
    if (e.target === sheet || e.target.closest('[data-close]')) {
      sheet.hidden = true;
      if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open');
    }
  });
})();
