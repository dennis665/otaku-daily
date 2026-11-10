{% load static %}// Ukiyo service worker：快取網站外殼 (CSS / JS / 圖示)、主機喚醒等待畫面、推播通知
// 影音清單的歌曲與影片預設不快取；使用者在音樂分頁按「存到手機」的歌才存（離線聽歌），主頁也存一份讓沒網路時能打開
const CACHE = 'otaku-daily-v1';
// 等待畫面：頁面內容有改才重新存（快取名稱含頁面指紋）；影片只有換片時才重新下載（網址含檔案指紋）
const WAKE_URL = '/wake/';
const WAKE_VIDEO = '{% static "video/wake.mp4" %}';
const WAKE_POSTER = '{% static "video/wake-poster.jpg" %}';
const WAKE_PAGE_CACHE = 'ukiyo-wake-page-{{ wake_hash }}';
const WAKE_VIDEO_CACHE = `ukiyo-wake-video-${WAKE_VIDEO.split('/').pop()}`;
// 離線聽歌：主頁（含歌曲清單，登入者自己的）與使用者下載到手機的歌；名稱固定，改版也不會被清掉
const PAGE_CACHE = 'ukiyo-offline-page';
const SONG_CACHE = 'ukiyo-offline-songs';
const HOME_URL = '/';
const KEEP = [CACHE, WAKE_PAGE_CACHE, WAKE_VIDEO_CACHE, PAGE_CACHE, SONG_CACHE];

async function storeWake() {
  const page = await caches.open(WAKE_PAGE_CACHE);
  if (!(await page.match(WAKE_URL))) await page.add(WAKE_URL);
  if (!(await page.match(WAKE_POSTER))) await page.add(WAKE_POSTER);   // 封面圖很小，跟頁面放一起
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

// 網路恢復（或按「重新連線」）就自動重新載入，不用把 App 關掉重開
const offlinePage = (err) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><body style="background:#14122b;color:#fff;font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0;text-align:center"><div><p>目前沒有網路連線，連線後會自動重新開啟 📶</p><button onclick="location.reload()" style="margin-top:12px;padding:10px 22px;border-radius:99px;border:0;background:linear-gradient(135deg,#ff6fae,#8a7bff);color:#fff;font-size:1rem">🔄 重新連線</button></div><script>addEventListener('online',()=>location.reload());setInterval(()=>fetch('/version.json',{cache:'no-store'}).then(r=>{if(r.ok)location.reload()}).catch(()=>{}),5000);</script><!-- ${String(err && err.message || err || '').replace(/--/g, '')} --></body>`,
  { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
);

// 主頁每次從網路成功打開就存一份（離線時用）；登出後也保留，沒網路時仍能聽存在手機的歌
// （個人歌單不在頁面裡，登出時頁面程式會刪掉手機裡的歌單副本；換別人登入就會被新的主頁取代）
function rememberPage(req, res) {
  const url = new URL(req.url);
  if (url.pathname === HOME_URL && res.status === 200 && !res.redirected) {
    const copy = res.clone();
    caches.open(PAGE_CACHE).then((c) => c.put(HOME_URL, copy)).catch(() => {});
  }
  return res;
}

// 沒有網路：不管開哪一頁都改開存好的主頁（音樂分頁可以播存在手機的歌），沒存過才顯示離線提示
async function offlineFallback(req, err) {
  const cached = await caches.match(HOME_URL, { cacheName: PAGE_CACHE });
  return cached || offlinePage(err);
}

// 開頁：一律走網路（登入狀態才會正確），沒網路才用手機裡存的主頁。
// 免費主機休眠時 Render 會回 503「應用程式載入中」，或一直等不到回應 → 改顯示我們自己的等待畫面（影片輪播），主機醒了會自動重新載入
async function openPage(req) {
  if (self.navigator && self.navigator.onLine === false) return offlineFallback(req, '離線');
  const network = fetch(req).then((res) => rememberPage(req, res));
  const fallback = (err) => offlineFallback(req, err);
  const slow = new Promise((resolve) => setTimeout(() => resolve('slow'), WAKE_AFTER_MS));
  let res;
  try {
    res = await Promise.race([network, slow]);
  } catch (err) {
    return fallback(err);
  }
  if (res === 'slow' && (await serverAwake())) return network.catch(fallback);   // 主機醒著，只是頁面比較慢：繼續等
  if (res === 'slow' || res.status === 503) {
    const wake = await caches.match(WAKE_URL, { ignoreSearch: true });
    if (wake) return wake;
    if (res === 'slow') return network.catch(fallback);
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

// 從存好的檔案提供影音，並支援分段讀取（iPhone 播影音一定會分段要資料，回 206）
function rangeResponse(buf, type, req) {
  const size = buf.byteLength;
  const headers = { 'Content-Type': type, 'Accept-Ranges': 'bytes' };
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return new Response(buf, { status: 200, headers: { ...headers, 'Content-Length': String(size) } });
  let start = m[1] === '' ? size - Number(m[2]) : Number(m[1]);
  let end = m[1] !== '' && m[2] !== '' ? Number(m[2]) : size - 1;
  start = Math.max(0, start);
  end = Math.min(end, size - 1);
  if (start > end) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': String(end - start + 1) },
  });
}

// 等待影片
let videoBuf = null;
async function serveVideo(req) {
  if (!videoBuf) {
    const cached = await caches.match(WAKE_VIDEO);
    if (!cached) return fetch(req);
    videoBuf = await cached.arrayBuffer();
  }
  return rangeResponse(videoBuf, 'video/mp4', req);
}

// 下載到手機的歌：有存就直接從手機播（不用網路、不耗流量），沒存就照常走網路
// 最近讀過的一首留在記憶體，避免每次分段讀取都重新讀檔
let songMem = { url: '', buf: null, type: '' };
async function serveSong(req) {
  const key = req.url.split('#')[0];
  if (songMem.url !== key) {
    const cache = await caches.open(SONG_CACHE);
    const cached = await cache.match(key, { ignoreVary: true });
    if (!cached) return fetch(req);
    songMem = { url: key, buf: await cached.arrayBuffer(), type: cached.headers.get('content-type') || 'audio/mp4' };
  }
  return rangeResponse(songMem.buf, songMem.type, req);
}
let songKeys = null;   // 已下載歌曲網址（加快判斷；頁面下載或刪除後會通知更新）
async function hasSong(url) {
  if (!songKeys) {
    const cache = await caches.open(SONG_CACHE);
    songKeys = new Set((await cache.keys()).map((r) => r.url));
  }
  return songKeys.has(url);
}
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'songs-changed') { songKeys = null; songMem = { url: '', buf: null, type: '' }; }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET') return;

  // 影音儲存庫的歌：手機裡有存才接手
  if (url.origin === 'https://raw.githubusercontent.com') {
    event.respondWith(hasSong(req.url.split('#')[0]).then((yes) => (yes ? serveSong(req) : fetch(req))).catch(() => fetch(req)));
    return;
  }
  if (url.origin !== self.location.origin) return;

  if (url.pathname === WAKE_VIDEO) {
    event.respondWith(serveVideo(req));
    return;
  }

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
