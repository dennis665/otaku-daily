// 宅日常 service worker：快取網站外殼 (CSS / JS / 圖示)，影音檔不快取以免塞爆手機空間
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
