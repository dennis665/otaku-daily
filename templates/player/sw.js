// Ukiyo service worker：快取網站外殼 (CSS / JS / 圖示)，影音檔不快取以免塞爆手機空間
const CACHE = 'otaku-daily-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // 靜態檔案：先用快取，背景更新
  if (url.pathname.startsWith('/static/')) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = await cache.match(req);
        const network = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; });
        return cached || network;
      })
    );
    return;
  }

  // 頁面：一律走網路 (登入狀態才會正確)，離線時顯示提示
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => new Response(
        '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="background:#14122b;color:#fff;font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0"><p>目前沒有網路連線，請連線後再試 📶</p></body>',
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      ))
    );
  }
});

// ---------- 推播通知 ----------
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { body: event.data && event.data.text() }; }
  const title = data.title || 'Ukiyo';
  event.waitUntil(self.registration.showNotification(title, {
    body: data.body || '',
    icon: data.icon || '/static/icons/icon-192.png',
    badge: data.icon || '/static/icons/icon-192.png',
    tag: data.tag || undefined,
    data: { url: data.url || '/' },
  }));
});

// 點通知：已經開著 App 就切過去並換到對應頁面，否則開新視窗
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const win = wins.find((w) => new URL(w.url).origin === self.location.origin);
    if (win) {
      // App 已經開著（iPhone 點通知只會把 App 叫到前景）：通知頁面自己切換到對應的地方
      win.postMessage({ type: 'notification-click', url });
      try { await win.focus(); } catch { /* 部分瀏覽器不允許 */ }
      return undefined;
    }
    return self.clients.openWindow(url);
  })());
});
