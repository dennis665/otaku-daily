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
    const onServer = sub && status.devices.some((d) => d.endpoint === sub.endpoint);
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
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyToBytes(btnEnable.dataset.key) });
      await api('/notify/api/subscribe/', sub.toJSON());
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
