// 決定轉盤（抽卡分頁的「🎡 轉盤」）：項目自己輸入；下拉選一部上架作品當主題，
// 轉盤配色、外框、中心 logo、扇形 logo 浮水印與背景（該作品代表全圖）都跟著換；按下轉動時隨機播放該作品的抽卡動畫，播完才出結果。設定存在這台手機（localStorage）
(() => {
  const $ = (id) => document.getElementById(id);
  const box = $('g-wheel');
  if (!box) return;
  const panel = $('panel-gacha');
  const canvas = $('wh-canvas');
  const ctx = canvas.getContext('2d');
  const video = $('wh-bg');
  const stage = $('wh-stage');
  const KEY = 'ukiyoWheel';
  const SIZE = canvas.width;
  const R = SIZE / 2;
  const MAX_ITEMS = 24;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const DEFAULT_SETS = [
    { id: 'lunch', name: '🍱 午餐吃什麼', items: ['便當', '拉麵', '滷肉飯', '火鍋', '麥當勞', '義大利麵', '咖哩飯', '牛肉麵'] },
    { id: 'drink', name: '🧋 飲料喝哪家', items: ['50嵐', '可不可', '迷客夏', '清心', '麻古', '珍煮丹'] },
  ];
  let cfg = { theme: null, set: 'lunch', sets: DEFAULT_SETS };
  try { cfg = { ...cfg, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { /* 無痕模式：用預設 */ }
  if (!Array.isArray(cfg.sets) || !cfg.sets.length) cfg.sets = DEFAULT_SETS;
  if (!cfg.sets.some((s) => s.id === cfg.set)) cfg.set = cfg.sets[0].id;
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch { /* 忽略 */ } };

  let works = [];          // 有轉盤主題的上架作品
  let rotation = 0;
  let spinning = false;
  const logo = new Image(); // 目前主題的 logo（畫在扇形上當浮水印）
  logo.onload = () => draw();

  // ---------- 主題 ----------
  const theme = () => works.find((w) => w.id === cfg.theme) || works[0] || null;
  function mix(a, b, t) {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const [x, y] = [p(a), p(b)];
    return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(',')})`;
  }
  function applyTheme() {
    const t = theme();
    if (!t) { draw(); return; }
    $('wh-theme').value = String(t.id);
    stage.style.setProperty('--wh-bg', t.wheel.bg);
    stage.style.setProperty('--wh-ac', t.wheel.accent);
    $('wh-hub-logo').src = t.wheel.logo;
    $('wh-hub-logo').alt = t.title;
    if (!logo.src.endsWith(t.wheel.logo)) logo.src = t.wheel.logo;
    // 平常的背景：該作品的代表全圖（卡背大圖），淡化顯示；抽卡動畫只在轉動時播放
    const art = t.card_back || t.image;
    $('wh-art').style.backgroundImage = art ? `url("${art}")` : '';
    draw();
  }
  function visible() { return !box.hidden && panel.classList.contains('active') && document.visibilityState === 'visible'; }
  function playBg() {
    if (!visible() && !video.paused) video.pause();   // 切走分頁時先停，結果照樣在時間到時出來
  }

  // 轉動時隨機播放該作品的抽卡動畫（一般版或 SSR 版），回傳動畫長度（秒）；播不了回傳 0
  function startAnim(t) {
    const urls = [t && t.anim, t && t.anim_ssr].filter(Boolean);
    if (!urls.length) return Promise.resolve(0);
    video.src = urls[Math.floor(Math.random() * urls.length)];
    video.currentTime = 0;
    return new Promise((resolve) => {
      let done = false;
      const ok = () => {
        if (done) return;
        done = true;
        video.play().then(() => { stage.classList.add('playing'); resolve(video.duration || 0); }).catch(() => resolve(0));
      };
      video.addEventListener('loadedmetadata', ok, { once: true });
      if (video.readyState >= 1) ok();
      video.load();
      setTimeout(() => { if (!done) { done = true; resolve(0); } }, 4000);   // 網路太慢：不等動畫直接轉
    });
  }
  function stopAnim() {
    stage.classList.remove('playing');
    video.pause();
  }
  $('wh-theme').addEventListener('change', () => {
    if (spinning) { applyTheme(); return; }
    cfg.theme = Number($('wh-theme').value);
    save();
    applyTheme();
  });

  // ---------- 轉盤 ----------
  const current = () => cfg.sets.find((x) => x.id === cfg.set) || cfg.sets[0];
  const items = () => (current() ? current().items : []);

  function draw() {
    const list = items();
    const t = theme();
    const bg = t ? t.wheel.bg : '#1a1440';
    const ac = t ? t.wheel.accent : '#ff6fae';
    ctx.clearRect(0, 0, SIZE, SIZE);
    const n = Math.max(list.length, 1);
    const step = (Math.PI * 2) / n;
    const hasLogo = logo.complete && logo.naturalWidth && t && logo.src.endsWith(t.wheel.logo);
    for (let i = 0; i < n; i += 1) {
      const a0 = -Math.PI / 2 + i * step;
      // 扇形：主題底色與強調色交錯，由內往外漸層
      const g = ctx.createRadialGradient(R, R, R * 0.12, R, R, R * 0.96);
      g.addColorStop(0, i % 2 ? mix(bg, ac, 0.18) : mix(bg, ac, 0.62));
      g.addColorStop(1, i % 2 ? mix(bg, '#000000', 0.2) : mix(bg, ac, 0.3));
      ctx.beginPath();
      ctx.moveTo(R, R);
      ctx.arc(R, R, R * 0.95, a0, a0 + step);
      ctx.closePath();
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,240,200,.8)';
      ctx.stroke();

      ctx.save();
      ctx.translate(R, R);
      ctx.rotate(a0 + step / 2);
      // 作品 logo 浮水印：靠近中心、橫向擺放（轉到指針正上方時是正的）
      if (hasLogo) {
        const rc = R * 0.42;
        const maxW = Math.min(R * 0.42, 2 * rc * Math.sin(step / 2) * 0.85);
        const s = Math.min(maxW / logo.naturalWidth, (R * 0.16) / logo.naturalHeight);
        const w = logo.naturalWidth * s;
        const h = logo.naturalHeight * s;
        ctx.save();
        ctx.translate(rc, 0);
        ctx.rotate(Math.PI / 2);
        ctx.globalAlpha = 0.38;
        ctx.drawImage(logo, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      if (list[i]) {
        ctx.fillStyle = '#fff';
        ctx.shadowColor = 'rgba(0,0,0,.75)';
        ctx.shadowBlur = 8;
        const size = Math.max(22, Math.min(46, 300 / n + 16));
        ctx.font = `800 ${size}px "Noto Sans TC", system-ui, sans-serif`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        let label = list[i];
        while (label.length > 1 && ctx.measureText(label).width > R * 0.53) label = label.slice(0, -1);
        if (label !== list[i]) label += '…';
        ctx.fillText(label, R * 0.89, 0);
      }
      ctx.restore();
    }
    // 外圈：主題色漸層金邊
    ctx.beginPath();
    ctx.arc(R, R, R * 0.955, 0, Math.PI * 2);
    ctx.lineWidth = R * 0.04;
    const rim = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    rim.addColorStop(0, '#fff3c4');
    rim.addColorStop(0.5, ac);
    rim.addColorStop(1, '#ffd166');
    ctx.strokeStyle = rim;
    ctx.stroke();
  }

  function lights() {
    const wrap = $('wh-lights');
    wrap.innerHTML = '';
    for (let i = 0; i < 24; i += 1) {
      const b = document.createElement('i');
      b.style.transform = `rotate(${i * 15}deg) translateY(calc(var(--wh-size) / -2 + 7px))`;
      b.style.animationDelay = `${(i % 2) * 0.35}s`;
      wrap.append(b);
    }
  }

  // ---------- 選項組與編輯 ----------
  function paintSets() {
    const el = $('wh-sets');
    el.innerHTML = '';
    const chip = (id, label) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip${cfg.set === id ? ' active' : ''}`;
      b.textContent = label;
      b.addEventListener('click', () => {
        if (spinning) return;
        if (id === 'new') {
          if (cfg.sets.length >= 20) { alert('最多 20 組轉盤'); return; }
          const s = { id: `s${Date.now()}`, name: '我的轉盤', items: ['選項 1', '選項 2'] };
          cfg.sets.push(s);
          id = s.id;
        }
        cfg.set = id;
        save();
        paintSets();
        draw();
        if (label === '＋ 新增') $('wh-name').select();
      });
      el.append(b);
    };
    cfg.sets.forEach((s) => chip(s.id, s.name));
    chip('new', '＋ 新增');
    const s = current();
    $('wh-name').value = s ? s.name : '';
    $('wh-items').value = s ? s.items.join('\n') : '';
    $('wh-del').hidden = cfg.sets.length <= 1;
  }
  $('wh-name').addEventListener('input', () => {
    const s = current();
    if (!s) return;
    s.name = $('wh-name').value.trim() || '我的轉盤';
    save();
    const active = $('wh-sets').querySelector('.chip.active');
    if (active) active.textContent = s.name;
  });
  $('wh-items').addEventListener('input', () => {
    const s = current();
    if (!s) return;
    s.items = $('wh-items').value.split('\n').map((x) => x.trim()).filter(Boolean).slice(0, MAX_ITEMS);
    save();
    draw();
  });
  $('wh-del').addEventListener('click', () => {
    const s = current();
    if (!s || cfg.sets.length <= 1 || !window.confirm(`刪除「${s.name}」轉盤？`)) return;
    cfg.sets = cfg.sets.filter((x) => x !== s);
    cfg.set = cfg.sets[0].id;
    save();
    paintSets();
    draw();
  });

  // ---------- 轉動 ----------
  function randomInt(n) {
    const a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0] % n;
  }
  function spin() {
    if (spinning) return;
    const list = items();
    if (list.length < 2) { alert('轉盤至少要有 2 個項目，在下面的框框一行輸入一個'); return; }
    spinning = true;
    $('wh-result').hidden = true;
    $('wh-hint').textContent = '轉動中…';
    const n = list.length;
    const pick = randomInt(n);
    const step = 360 / n;
    // 指針在正上方：讓抽中的扇形中間（稍微隨機偏移）停在上方
    const jitter = (Math.random() - 0.5) * step * 0.7;
    const target = 360 - (pick * step + step / 2 + jitter);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stage.classList.add('spinning');
    // 先開始播抽卡動畫，轉盤配合動畫長度轉，動畫播完才顯示結果
    startAnim(theme()).then((dur) => {
      const turns = reduce ? 1 : Math.max(6, Math.round(dur * 1.1)) + randomInt(3);
      rotation = rotation - (rotation % 360) + turns * 360 + (((target % 360) + 360) % 360);
      const secs = reduce ? 1.2 : (dur ? Math.min(Math.max(dur - 0.6, 3.5), 12) : 5.6);
      canvas.style.transition = `transform ${secs}s cubic-bezier(.12,.68,.08,1)`;
      canvas.style.transform = `rotate(${rotation}deg)`;
      const wait = Math.max(secs, dur) * 1000 + 150;
      let shown = false;
      const show = () => { if (shown) return; shown = true; stopAnim(); finish(list[pick]); };
      if (dur) video.addEventListener('ended', () => setTimeout(show, Math.max(0, secs * 1000 - video.currentTime * 1000) + 100), { once: true });
      setTimeout(show, wait + 1500);   // 保險：ended 沒觸發（被暫停、切到背景）也會出結果
    });
  }
  function finish(label) {
    spinning = false;
    stage.classList.remove('spinning');
    if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
    const t = theme();
    const r = $('wh-result');
    r.innerHTML = `<div class="wh-r-box"><small>🎉 就決定是</small>${t ? `<img class="wh-r-logo" src="${esc(t.wheel.logo)}" alt="">` : ''}<b>${esc(label)}</b>
      <div class="wh-r-btns"><button class="g-btn sm" type="button" data-act="again">🎡 再轉一次</button><button class="g-btn sm alt" type="button" data-act="drop">✂️ 拿掉這項再轉</button></div></div>`;
    for (let i = 0; i < 28; i += 1) {
      const p = document.createElement('i');
      p.className = 'wh-spark';
      p.style.setProperty('--x', `${(Math.random() - 0.5) * 320}px`);
      p.style.setProperty('--y', `${(Math.random() - 0.5) * 320}px`);
      p.style.animationDelay = `${Math.random() * 0.25}s`;
      r.append(p);
    }
    r.hidden = false;
    $('wh-hint').textContent = '點中間的按鈕再轉一次';
    r.querySelector('[data-act="again"]').addEventListener('click', () => { r.hidden = true; spin(); });
    r.querySelector('[data-act="drop"]').addEventListener('click', () => {
      const s = current();
      if (s.items.length <= 2) { alert('至少要留 2 個項目'); return; }
      s.items = s.items.filter((x, i) => i !== s.items.indexOf(label));
      save();
      paintSets();
      draw();
      r.hidden = true;
      spin();
    });
  }
  $('wh-spin').addEventListener('click', spin);
  $('wh-result').addEventListener('click', (ev) => { if (ev.target.id === 'wh-result') $('wh-result').hidden = true; });

  // ---------- 資料與顯示時機 ----------
  window.addEventListener('gacha-status', (ev) => {
    works = ((ev.detail && ev.detail.works) || []).filter((w) => w.wheel);
    const sel = $('wh-theme');
    sel.innerHTML = '';
    works.forEach((w) => sel.append(new Option(w.title, String(w.id))));
    applyTheme();
  });
  window.addEventListener('gacha-view', () => playBg());
  document.addEventListener('visibilitychange', playBg);
  new MutationObserver(playBg).observe(panel, { attributes: true, attributeFilter: ['class', 'hidden'] });
  lights();
  paintSets();
  draw();
})();
