{% load static %}// Ukiyo service worker：快取網站外殼 (CSS / JS / 圖示)、主機喚醒等待畫面、推播通知
// 影音清單的歌曲與影片不快取，以免塞爆手機空間（等待畫面的短片例外，約 4.5MB）
const CACHE = 'otaku-daily-v1';
// 等待畫面：頁面每次部署都更新（很小）；影片只有換片時才重新下載（網址含檔案指紋）
const WAKE_URL = '/wake/';
const WAKE_VIDEO = '{% static "video/wake.mp4" %}';
const WAKE_PAGE_CACHE = 'ukiyo-wake-page-{{ app_version }}';
const WAKE_VIDEO_CACHE = `ukiyo-wake-video-${WAKE_VIDEO.split('/').pop()}`;
const KEEP = [CACHE, WAKE_PAGE_CACHE, WAKE_VIDEO_CACHE];

async function storeWake() {
  const page = await caches.open(WAKE_PAGE_CACHE);
  if (!(await page.match(WAKE_URL))) await page.add(WAKE_URL);
  const video = await caches.open(WAKE_VIDEO_CACHE);
  if (!(await video.match(WAKE_VIDEO))) await video.add(WAKE_VIDEO);
}
const WAKE_AFTER_MS = 3500;   // 開頁超過這麼久還沒回應，就先顯示等待畫面

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // 事先把等待畫面和影片存進手機；失敗也不影響安裝（啟用時再補）
  event.waitUntil(storeWake().catch(() => {}));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => storeWake().catch(() => {}))   // 安裝時沒存成功（例如網路不穩）就在這裡補存
      .then(() => self.clients.claim())
  );
});

const offlinePage = (err) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="background:#14122b;color:#fff;font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0"><p>目前沒有網路連線，請連線後再試 📶</p><!-- ${String(err && err.message || err || '').replace(/--/g, '')} --></body>`,
  { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
);

// 開頁：一律走網路（登入狀態才會正確）。
// 免費主機休眠時 Render 會回 503「應用程式載入中」，或一直等不到回應 → 改顯示我們自己的等待畫面（影片輪播），主機醒了會自動重新載入
async function openPage(req) {
  const network = fetch(req);
  const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), WAKE_AFTER_MS));
  let res;
  try {
    res = await Promise.race([network, slow]);
  } catch (err) {
    return offlinePage(err);
  }
  if (res === 'slow' && (await serverAwake())) return network.catch(offlinePage);   // 主機醒著，只是頁面比較慢：繼續等
  if (res === 'slow' || res.status === 503) {
    const wake = await caches.match(WAKE_URL, { ignoreSearch: true });
    if (wake) return wake;
    if (res === 'slow') return network.catch(offlinePage);
  }
  return res;
}

// 快速確認主機是否醒著（1.5 秒內回應版本資訊就算醒著）
async function serverAwake() {
  try {
    const probe = fetch('/version.json', { cache: 'no-store' });
    const r = await Promise.race([probe, new Promise((resolve) => setTimeout(() => resolve(null), 1500))]);
    return Boolean(r && r.ok && (r.headers.get('content-type') || '').includes('json'));
  } catch {
    return false;
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // 靜態檔案：先用快取，背景更新（分段讀取的影片請求直接走網路）
  if (url.pathname.startsWith('/static/') && !req.headers.has('range')) {
    event.respondWith(
      caches.open(CACHE).then(async (cache) => {
        const cached = (await cache.match(req)) || (await caches.match(req));
        const network = fetch(req).then((res) => { if (res.status === 200) cache.put(req, res.clone()); return res; });
        return cached || network;
      })
    );
    return;
  }

  // 等待畫面的預覽（/wake/?preview=1）走網路，其他頁面用 openPage
  if (req.mode === 'navigate' && url.pathname !== WAKE_URL) {
    event.respondWith(openPage(req));
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
