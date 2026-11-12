// 動畫小卡抽卡：抽卡機、抽卡演出、集卡冊（後端 gacha 模組）
(() => {
  const $ = (id) => document.getElementById(id);
  const panel = $('panel-gacha');
  if (!panel) return;
  const tab = document.querySelector('.tab[data-tab="gacha"]');
  const RAR = ['N', 'R', 'SR', 'SSR', 'UR', 'LR'];
  const LABEL = { N: 'N', R: 'R', SR: 'SR', SSR: 'SSR', UR: 'UR', LR: '秘・LR' };
  const COLOR = { N: '#9aa0b8', R: '#cfd8ea', SR: '#ffd166', SSR: '#ff6fae', UR: '#5ee7ff', LR: '#ffcf5a' };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';
  const rank = (r) => RAR.indexOf(r);
  let status = null;

  // ---------- 卡面存到手機：抽到的卡（與卡冊裡的卡）圖片存進 Cache Storage，service worker 會優先從手機提供 ----------
  const CARD_CACHE = 'ukiyo-cards';
  const canCache = 'caches' in window;
  async function saveImages(urls) {
    if (!canCache) return;
    try {
      const cache = await caches.open(CARD_CACHE);
      for (const url of [...new Set(urls)].filter(Boolean)) {
        if (await cache.match(url, { ignoreVary: true })) continue;
        if (!url.startsWith('/gacha/img/')) continue;
        const res = await fetch(url, { credentials: 'same-origin', loading: false }).catch(() => null);
        if (res && res.ok && (res.headers.get('content-type') || '').startsWith('image/')) await cache.put(url, res);
      }
    } catch { /* 手機空間不足或無痕模式：照常從網路讀 */ }
    paintLocal();
  }
  async function paintLocal() {
    const box = $('g-local');
    if (!canCache || !box) return;
    const n = (await (await caches.open(CARD_CACHE)).keys()).length;
    box.hidden = !n;
    $('g-local-info').textContent = `📱 手機裡存了 ${n} 張卡面（離線也看得到，讀取更快）`;
  }
  $('g-local-clear').addEventListener('click', async () => {
    if (!window.confirm('要清除手機裡存的卡面圖片嗎？（卡冊不會受影響，之後會從網路重新讀取）')) return;
    await caches.delete(CARD_CACHE);
    paintLocal();
  });

  // ---------- 卡片 ----------
  function cardHTML(c, opts = {}) {
    if (!c) {
      // 還沒收集到：剪影中間顯示卡號
      const no = opts.no ? `<span class="gcard-missing-no">No.<b>${String(opts.no).padStart(3, '0')}</b></span>` : '';
      return `<div class="gcard is-missing r-${opts.rarity}${no ? ' has-no' : ''}"${opts.cardId ? ` data-c="${opts.cardId}"` : ''}><div class="gcard-in">${no}</div><div class="gcard-badge">${esc(LABEL[opts.rarity])}</div></div>`;
    }
    const hasBack = Boolean(c.back_image);
    const backStyle = hasBack ? ` style="background-image: url('${esc(c.back_image)}');"` : '';
    const back = opts.back ? `<div class="gcard-back${hasBack ? ' has-art' : ''}"${backStyle}>${hasBack ? '' : 'UKIYO'}</div>` : '';
    const art = c.image
      ? `<img src="${esc(c.image)}" alt="" loading="lazy">`
      : `<div class="gcard-noimg">${esc(c.title)}</div>`;
    return `<div class="gcard r-${c.rarity}${c.image ? '' : ' is-noimg'}" data-c="${c.card_id}">
      <div class="gcard-face">
        <div class="gcard-in">${art}<div class="gcard-name">${esc(c.name || c.title)}${c.no ? `<span class="gcard-no">No.${String(c.no).padStart(3, '0')}</span>` : ''}</div></div>
        <div class="gcard-frame"></div><div class="gcard-holo"></div><div class="gcard-glare"></div>
        <div class="gcard-badge">${esc(LABEL[c.rarity])}</div>
        ${c.count > 1 && opts.count !== false ? `<div class="gcard-count">×${c.count}</div>` : ''}
        ${c.new && opts.isNew ? '<div class="gcard-new">NEW</div>' : ''}
      </div>${back}</div>`;
  }

  // 傾斜：手指／滑鼠移動時卡片跟著轉，反光與閃卡紋路跟著動
  function tilt(box) {
    const move = (e) => {
      const card = box.querySelector('.gcard');
      if (!card) return;
      const p = e.touches ? e.touches[0] : e;
      const r = card.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (p.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (p.clientY - r.top) / r.height));
      card.style.setProperty('--ry', `${(x - 0.5) * 30}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 30}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
      card.style.setProperty('--hx', `${x * 300}%`);
      card.style.setProperty('--hy', `${y * 300}%`);
    };
    const reset = () => {
      const card = box.querySelector('.gcard');
      if (card) ['--rx', '--ry'].forEach((k) => card.style.setProperty(k, '0deg'));
    };
    box.addEventListener('pointermove', move);
    box.addEventListener('touchmove', move, { passive: true });
    box.addEventListener('pointerleave', reset);
    box.addEventListener('touchend', reset);
  }

  // ---------- 抽卡機 ----------
  async function loadStatus(loading = true) {
    try {
      const res = await fetch('/gacha/api/status/', { credentials: 'same-origin', loading });
      if (!res.ok) throw new Error();
      status = await res.json();
      paintStatus();
    } catch {
      $('g-info').textContent = '讀取失敗，請稍後再試';
    }
  }
  function picksLeft() { return status ? status.pick_left + status.bonus : 0; }
  function fmtTime(sec) { return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`; }
  // 在線時間：伺服器每 30 秒同步一次，中間畫面每秒自己往上跳（最多多算 35 秒，網路斷了就停住）
  let task = null;
  let taskAt = 0;
  function paintTask(t) {
    if (!t) return;
    task = t;
    taskAt = Date.now();
    drawTask();
  }
  function drawTask() {
    if (!task) return;
    const t = task;
    const running = !t.claimed && t.seconds < t.need && !document.hidden && navigator.onLine !== false;
    const extra = running ? Math.min(35, Math.floor((Date.now() - taskAt) / 1000)) : 0;
    const secs = Math.min(t.need, t.seconds + extra);
    $('g-task').hidden = false;
    $('g-task-text').textContent = t.claimed ? '今天已領取 ✅' : `今天在線 ${fmtTime(secs)}／${fmtTime(t.need)}`;
    $('g-task-bar').style.width = `${Math.min(100, (secs / t.need) * 100)}%`;
    $('g-task-claim').hidden = !t.claimable;
    $('g-task-claim').textContent = `🎁 領取 ${t.reward} 張自選抽卡券（可累積保留）`;
  }
  setInterval(drawTask, 1000);
  function paintStatus() {
    const s = status;
    const left = picksLeft() + s.random_left;
    $('g-count').textContent = s.unlimited ? '∞' : left;
    $('g-info').innerHTML = s.unlimited
      ? `♾ 測試帳號：抽卡不限次數・再 <b>${s.pity_left}</b> 抽必出 SSR 以上`
      : `再 <b>${s.pity_left}</b> 抽必出 SSR 以上・每天 00:00 補券・✨ 星塵 <b>${s.stardust}</b>`;
    $('g-tickets').innerHTML = s.unlimited ? '' : `
      <div class="g-ticket">🎟 自選抽卡券<b>${s.pick_left}／${s.pick_daily}${s.bonus ? ` <em>＋保留 ${s.bonus}</em>` : ''}</b>自己選作品抽</div>
      <div class="g-ticket">🎲 隨機抽卡券<b>${s.random_left}／${s.free_daily}</b>全作品大混池</div>`;
    paintTask(s.task);
    if (s.notice) toast(s.notice);
    if (!$('g-shop').hidden) paintShop();
    $('g-free').disabled = !s.random_left;
    $('g-all').disabled = s.random_left < 2;
    const n = Math.min(s.random_left, 5);
    $('g-all').innerHTML = `🎲 隨機連抽${n > 1 ? ` ×${n}` : ''}<small>${s.unlimited ? '一次 5 張' : '把隨機券一次用完'}</small>`;
    const box = $('g-works');
    box.innerHTML = '';
    if (!s.pool_works) {
      box.innerHTML = '<p class="g-empty">🎴 卡片製作中，還沒有可以抽的卡，敬請期待！</p>';
    }
    s.works.forEach((w) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `g-work${w.followed ? ' is-followed' : ''}`;
      b.innerHTML = `${w.image ? `<img src="${esc(w.image)}" alt="" loading="lazy">` : '<i class="g-work-noimg"></i>'}<span>${esc(w.title)}</span>`;
      b.addEventListener('click', () => openPick(w));
      box.appendChild(b);
    });
    $('g-rates').innerHTML = `<table>${s.rates.map((r) => `<tr><td><b style="color:${COLOR[r.rarity]}">${esc(r.label)}</b></td><td>${r.percent}%</td></tr>`).join('')}</table>
      <p>・每天台灣時間 00:00 補券：自選抽卡券 ${s.pick_daily} 張（自己選作品抽）、隨機抽卡券 ${s.free_daily} 張（全作品大混池），當天沒用完不保留。<br>
      ・每日任務：當天 App 累積在線 5 分鐘，可領自選抽卡券 5 張；這是保留券，不會過期、可以累積。自選抽時先用當天的券，再用保留券。<br>
      ・連續 ${s.pity_at} 抽沒有 SSR 以上，下一抽必定 SSR 以上。<br>・抽卡結果由伺服器決定並記錄，重新整理也不會改變。</p>`;
  }
  $('g-free').addEventListener('click', () => draw({ count: 1 }));
  $('g-all').addEventListener('click', () => draw({ count: Math.min(status ? status.random_left : 1, 5) }));

  // 選作品後選張數
  let pickWork = null;
  function openPick(w) {
    pickWork = w;
    const left = status.unlimited ? 99 : picksLeft();
    const art = w.card_back || w.image;
    $('g-pick-title').textContent = w.title;
    $('g-pick-back').style.backgroundImage = art ? `url('${art}')` : '';
    $('g-pick-info').textContent = status.unlimited ? '測試帳號不限張數' : left ? `可用自選抽卡券 ${left} 張（券不夠時抽到用完為止）` : '自選抽卡券用完了，完成每日任務或明天再來';
    $('g-pick').querySelectorAll('[data-n]').forEach((b) => { b.disabled = !left; });
    $('g-pick').hidden = false;
    document.body.classList.add('sheet-open');
  }
  const closePick = () => { $('g-pick').hidden = true; document.body.classList.remove('sheet-open'); };
  $('g-pick-close').addEventListener('click', closePick);
  $('g-pick').addEventListener('click', (e) => { if (e.target.id === 'g-pick') closePick(); });
  $('g-pick').querySelectorAll('[data-n]').forEach((b) => b.addEventListener('click', () => {
    const w = pickWork;
    closePick();
    if (w) draw({ work_id: w.id, count: Number(b.dataset.n) });
  }));

  // 每日任務：領獎
  $('g-task-claim').addEventListener('click', async () => {
    $('g-task-claim').disabled = true;
    try {
      const res = await fetch('/gacha/api/task/claim/', { method: 'POST', credentials: 'same-origin', headers: { 'X-CSRFToken': csrf() } });
      const j = await res.json();
      if (!j.ok) throw new Error(j.error);
      status = j.status;
      paintStatus();
      alert(`🎁 領到 ${status.task.reward} 張自選抽卡券！（保留券不會過期）`);
    } catch (err) { alert(err.message || '領取失敗，請稍後再試'); }
    $('g-task-claim').disabled = false;
  });

  // 在線時間：App 在前景時每 60 秒回報一次（背景、離線不算）
  async function beat() {
    if (document.hidden || navigator.onLine === false) return;
    try {
      const res = await fetch('/gacha/api/heartbeat/', { method: 'POST', credentials: 'same-origin', loading: false, headers: { 'X-CSRFToken': csrf() } });
      const j = await res.json();
      if (!j.ok) return;
      if (status) status.task = j.task;
      paintTask(j.task);
    } catch { /* 網路不穩：下次再回報 */ }
  }
  beat();
  setInterval(beat, 30000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { drawTask(); return; }
    taskAt = Date.now();   // 從背景回來：背景的時間不算
    beat();
  });

  // ---------- 抽卡演出 ----------
  const stage = $('g-stage');
  const reveal = $('g-reveal');
  const stamp = $('g-stamp');
  const tip = $('g-tip');
  let skip = null;          // 跳過：讓等待中的步驟立刻結束
  let skipping = false;     // 按過跳過：後面的步驟都不再等
  let busy = false;
  let finished = false;
  const wait = (ms) => (skipping ? Promise.resolve() : new Promise((resolve) => {
    const t = setTimeout(resolve, ms);
    skip = () => { clearTimeout(t); resolve(); };
  }));
  const buzz = (p) => { try { if (navigator.vibrate) navigator.vibrate(p); } catch { /* 不支援 */ } };

  // 粒子特效
  const fx = $('g-fx');
  const ctx = fx.getContext('2d');
  let parts = [];
  let raf = 0;
  let rainColor = null;
  function burst(rarity) {
    const n = { N: 0, R: 24, SR: 70, SSR: 130, UR: 200, LR: 260 }[rarity];
    const colors = rarity === 'UR' ? ['#ff6fae', '#ffd166', '#6fffc8', '#5ee7ff', '#9b7bff'] : rarity === 'LR' ? ['#ffcf5a', '#fff2c2', '#ffffff', '#c9a227'] : [COLOR[rarity], '#ffffff'];
    const w = fx.width / 2;
    const h = fx.height * 0.45;
    for (let i = 0; i < n; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const v = 4 + Math.random() * (rank(rarity) * 3 + 4);
      parts.push({ x: w, y: h, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, life: 60 + Math.random() * 50, s: 2 + Math.random() * 4, c: colors[i % colors.length], star: rank(rarity) >= 4 && i % 3 === 0 });
    }
    rainColor = rank(rarity) >= 4 ? colors : null;
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function drawStar(x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const rr = i % 2 ? r / 2.4 : r;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fill();
  }
  function tick() {
    ctx.clearRect(0, 0, fx.width, fx.height);
    if (rainColor && parts.length < 140) {
      parts.push({ x: Math.random() * fx.width, y: -10, vx: (Math.random() - 0.5) * 1.5, vy: 1.5 + Math.random() * 2, life: 200, s: 2 + Math.random() * 3, c: rainColor[Math.floor(Math.random() * rainColor.length)], star: Math.random() < 0.4, rain: true });
    }
    parts = parts.filter((p) => p.life > 0 && p.y < fx.height + 20);
    parts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (!p.rain) { p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.12; }
      p.life -= 1;
      ctx.globalAlpha = Math.min(1, p.life / 40);
      ctx.fillStyle = p.c;
      if (p.star) drawStar(p.x, p.y, p.s * 2);
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
    raf = parts.length || rainColor ? requestAnimationFrame(tick) : 0;
  }
  function stopFx() {
    rainColor = null;
    parts = [];
    cancelAnimationFrame(raf);
    raf = 0;
    ctx.clearRect(0, 0, fx.width, fx.height);
  }

  function setGlow(r) {
    stage.classList.toggle('t-rainbow', r === 'UR');
    stage.classList.toggle('t-black', r === 'LR');
    const c = r === 'UR' ? '#ffffff' : COLOR[r === 'N' || r === 'R' ? 'R' : r];
    stage.querySelector('.g-rays').style.setProperty('--ray', r === 'N' || r === 'R' ? '#9bd2ff' : c);
    stage.style.setProperty('--glow', r === 'N' || r === 'R' ? '#9bd2ff' : c);
  }

  // 抽卡舞台的卡包：選了作品就換成那部作品的卡背
  function setStagePack(back) {
    const pack = stage.querySelector('.g-stage-pack .g-pack');
    pack.classList.toggle('has-art', Boolean(back));
    pack.style.backgroundImage = back ? `url('${back}')` : '';
  }
  function openStage() {
    fx.width = innerWidth * devicePixelRatio;
    fx.height = innerHeight * devicePixelRatio;
    fx.style.width = '100%';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    stage.className = 'g-stage is-charging';
    reveal.className = 'g-reveal';
    reveal.innerHTML = '';
    stamp.className = 'g-stamp';
    stamp.innerHTML = '';
    tip.textContent = '';
    setGlow('N');
    stage.hidden = false;
    document.body.classList.add('sheet-open');
  }
  function closeStage() {
    stage.hidden = true;
    stopFx();
    document.body.classList.remove('sheet-open');
    busy = false;
  }
  stage.addEventListener('click', () => {
    if (!finished) { skipping = true; if (skip) skip(); return; }
    closeStage();
  });

  async function draw(opts) {
    if (busy) return;
    busy = true;
    finished = false;
    skipping = false;
    const picked = opts.work_id && status ? status.works.find((w) => w.id === opts.work_id) : null;
    setStagePack(picked ? picked.card_back : '');
    openStage();
    buzz(30);
    // 一邊蓄力一邊等伺服器結果
    let data;
    try {
      const url = '/gacha/api/pull/';
      const body = new URLSearchParams({ count: opts.count || 1, ...(opts.work_id ? { work_id: opts.work_id } : {}) });
      const [res] = await Promise.all([
        fetch(url, { method: 'POST', credentials: 'same-origin', loading: false, headers: { 'X-CSRFToken': csrf() }, body }),
        new Promise((r) => setTimeout(r, 900)),
      ]);
      data = await res.json().catch(() => ({ ok: false, error: '連線失敗，請稍後再試' }));
    } catch {
      data = { ok: false, error: '連線失敗，請稍後再試' };
    }
    if (!data.ok) {
      closeStage();
      alert(data.error || '抽卡失敗');
      return;
    }
    status = data.status;
    paintStatus();
    skipping = false;
    saveImages(data.cards.flatMap((c) => [c.image, c.back_image]));   // 抽到的卡面與卡背直接存到手機
    albumStale = true;
    await perform(data.cards);
  }

  async function perform(cards) {
    const best = cards.reduce((m, c) => (rank(c.rarity) > rank(m) ? c.rarity : m), 'N');
    const lv = rank(best);
    tip.textContent = '點一下跳過';
    // 蓄力：光芒逐級升級（藍 → 金 → 粉 → 彩虹 → 黑金），越稀有越久
    const steps = ['R', 'SR', 'SSR', 'UR', 'LR'].filter((r) => rank(r) <= lv && rank(r) >= 2);
    await wait(500);
    for (const r of steps) {
      setGlow(r);
      stage.classList.add('lv2');
      buzz(rank(r) >= 4 ? [60, 40, 60] : 40);
      await wait(r === 'LR' ? 1300 : 650);
    }
    // 開包
    stage.classList.remove('is-charging');
    stage.classList.add('is-open');
    const flash = stage.querySelector('.g-flash');
    flash.classList.remove('go');
    void flash.offsetWidth;
    flash.classList.add('go');
    burst(best);
    buzz(lv >= 3 ? [80, 50, 120] : 50);
    // 翻卡
    if (cards.length === 1) {
      reveal.innerHTML = cardHTML(cards[0], { back: true, isNew: true });
      await wait(250);
      reveal.querySelector('.gcard').classList.add('flip');
    } else {
      reveal.classList.add('is-multi');
      reveal.innerHTML = cards.sort((a, b) => rank(b.rarity) - rank(a.rarity)).map((c) => cardHTML(c, { back: true, isNew: true })).join('');
      const els = [...reveal.querySelectorAll('.gcard')];
      for (const el of els) {
        el.classList.add('flip');
        await wait(110);
      }
    }
    await wait(450);
    if (lv >= 2) {
      stamp.style.setProperty('--sc', COLOR[best]);
      stamp.innerHTML = `${esc(LABEL[best])}<small>${lv >= 5 ? 'LEGEND' : lv >= 4 ? 'ULTRA RARE' : lv >= 3 ? 'SUPER SPECIAL' : 'SUPER RARE'}</small>`;
      stamp.classList.add('go');
    }
    // 跳過時把所有東西直接放到最後狀態
    reveal.querySelectorAll('.gcard').forEach((el) => el.classList.add('flip'));
    if (cards.length === 1) tip.textContent = `${cards[0].new ? '🆕 新卡入手！' : `已收進卡冊（×${cards[0].count}）`}・點一下關閉`;
    else tip.textContent = `${cards.length} 張・新卡 ${cards.filter((c) => c.new).length} 張・點一下關閉`;
    skip = null;
    finished = true;
  }
  tilt(reveal);

  // ---------- 卡冊 ----------
  let album = null;
  const ALBUM_KEY = 'gachaAlbum';   // 卡冊副本（離線時看）
  let albumStale = true;
  let filter = 'all';
  let shown = 20;
  async function loadAlbum() {
    if (!albumStale && album) { paintAlbum(); return; }
    try {
      if (navigator.onLine === false) throw new Error('offline');
      const res = await fetch('/gacha/api/album/', { credentials: 'same-origin' });
      if (!res.ok || !(res.headers.get('content-type') || '').includes('json')) throw new Error('fail');
      album = await res.json();
      albumStale = false;
      try { localStorage.setItem(ALBUM_KEY, JSON.stringify(album)); } catch { /* 空間不足：下次再存 */ }
      paintAlbum();
      // 卡冊裡的卡面也存一份（之前抽到但還沒存的）
      saveImages(album.works.flatMap((w) => w.cards.filter((c) => c.owned).map((c) => c.image)));
    } catch {
      // 離線或讀不到：用手機裡最近一次的卡冊副本（卡面圖片已存在手機）
      let copy = null;
      try { copy = JSON.parse(localStorage.getItem(ALBUM_KEY) || 'null'); } catch { copy = null; }
      if (copy) {
        album = copy;
        paintAlbum();
        $('g-sum').insertAdjacentHTML('afterbegin', '📴 離線中，顯示手機裡最近一次的卡冊<br>');
      } else {
        $('g-sum').textContent = navigator.onLine === false ? '📴 離線中，手機裡還沒有卡冊資料（連網打開一次卡冊就會存起來）' : '讀取失敗，請稍後再試';
      }
    }
  }
  // 收集度：收集到幾 % 的卡（有收集就至少顯示 1%，全部收集才 100%）
  function pct(w) {
    if (!w.total) return 0;
    const p = Math.floor((w.have / w.total) * 100);
    return w.have && !p ? 1 : p;
  }
  function paintAlbum() {
    const s = album.summary;
    const dup = album.works.flatMap((w) => w.cards).filter((c) => c.owned && c.count > 1);
    const gain = status ? dup.reduce((n, c) => n + status.dust_value[c.rarity] * (c.count - 1), 0) : 0;
    $('g-dust-all').hidden = !dup.length || !status;
    $('g-dust-all').textContent = `✨ 一鍵分解重複卡 ${dup.reduce((n, c) => n + c.count - 1, 0)} 張（+${gain} 星塵）`;
    $('g-album-n').textContent = s.kinds || '';
    $('g-sum').innerHTML = s.works ? `收集了 <b>${s.works}</b> 部作品・<b>${s.kinds}</b> 種卡・總共抽了 <b>${s.pulls}</b> 張` : '卡冊還是空的，先去抽一張吧！';
    const fbox = $('g-filter');
    fbox.innerHTML = '';
    [['all', '全部'], ...RAR.map((r) => [r, LABEL[r]])].forEach(([k, label]) => {
      const n = k === 'all' ? album.works.length : album.works.filter((w) => w.cards.some((c) => c.owned && c.rarity === k)).length;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `chip${filter === k ? ' active' : ''}`;
      b.innerHTML = `${esc(label)} <b>${n}</b>`;
      b.addEventListener('click', () => { filter = k; shown = 20; paintAlbum(); });
      fbox.appendChild(b);
    });
    const list = album.works.filter((w) => filter === 'all' || w.cards.some((c) => c.owned && c.rarity === filter));
    const box = $('g-album-list');
    box.innerHTML = list.slice(0, shown).map((w) => `
      <div class="g-album-work">
        <header><b>${esc(w.title)}</b><span>${w.have}／${w.total}・<em class="g-pct${w.have === w.total ? ' done' : ''}">${pct(w)}%</em></span></header>
        <div class="g-progress"><i style="width:${(w.have / w.total) * 100}%"></i></div>
        <div class="g-slots">${w.cards.map((c) => cardHTML(c.owned ? c : null, { rarity: c.rarity, no: c.no, cardId: c.card_id, count: true })).join('')}</div>
      </div>`).join('');
    $('g-more').hidden = list.length <= shown;
  }
  $('g-more').addEventListener('click', () => { shown += 20; paintAlbum(); });
  $('g-album-list').addEventListener('click', (e) => {
    const el = e.target.closest('.gcard');
    if (!el || !el.dataset.c) return;
    const c = album.works.flatMap((w) => w.cards).find((x) => String(x.card_id) === el.dataset.c);
    if (c) openDetail(c);
  });

  // ---------- 卡片大圖 ----------
  const detail = $('g-detail');
  function openDetail(c) {
    const noText = c.no ? `No.${String(c.no).padStart(3, '0')}・` : '';
    const acts = $('g-detail-acts');
    acts.innerHTML = '';
    const dust = status ? status.stardust : 0;
    if (c.owned) {
      $('g-detail-card').innerHTML = cardHTML(c, { count: false });
      $('g-detail-info').innerHTML = `<b>${esc(c.name || c.title)}</b><br>${c.name ? `${esc(c.title)}<br>` : ''}${noText}${esc(LABEL[c.rarity])}・持有 ${c.count} 張${c.first_at ? `・首次入手 ${esc(c.first_at)}` : ''}<br><small>手指在卡片上滑動可以傾斜欣賞</small>`;
      if (c.count > 1 && status) {
        const v = status.dust_value[c.rarity];
        addAct(acts, `✨ 分解 1 張（+${v} 星塵）`, () => doDismantle({ card_id: c.card_id, n: 1 }));
        if (c.count > 2) addAct(acts, `✨ 分解全部重複 ${c.count - 1} 張（+${v * (c.count - 1)} 星塵）`, () => doDismantle({ card_id: c.card_id, n: c.count - 1 }));
      }
    } else {
      // 還沒收集到：剪影＋星塵兌換
      $('g-detail-card').innerHTML = cardHTML(null, { rarity: c.rarity, no: c.no });
      const price = status ? status.card_price[c.rarity] : 0;
      $('g-detail-info').innerHTML = `<b>${esc(c.title)}</b><br>${noText}${esc(LABEL[c.rarity])}・還沒收集到<br><small>目前星塵 ✨ ${dust}</small>`;
      if (status) {
        const b = addAct(acts, dust >= price ? `🛒 用 ${price} 星塵兌換這張` : `🛒 兌換需要 ${price} 星塵（還差 ${price - dust}）`, () => doShop({ kind: 'card', card_id: c.card_id }));
        b.disabled = dust < price;
      }
    }
    detail.hidden = false;
    document.body.classList.add('sheet-open');
  }
  const closeDetail = () => { detail.hidden = true; document.body.classList.remove('sheet-open'); };

  // ---------- ✨ 星塵：分解、兌換 ----------
  function addAct(box, text, fn) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'g-btn sm';
    b.textContent = text;
    b.addEventListener('click', fn);
    box.appendChild(b);
    return b;
  }
  function toast(msg) {
    const el = document.createElement('div');
    el.className = 'g-toast';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }
  async function postForm(url, data) {
    const res = await fetch(url, { method: 'POST', credentials: 'same-origin', headers: { 'X-CSRFToken': csrf() }, body: new URLSearchParams(data) });
    const j = await res.json().catch(() => ({ ok: false, error: '連線失敗，請稍後再試' }));
    if (!j.ok) throw new Error(j.error || '操作失敗');
    return j;
  }
  async function doDismantle(data) {
    try {
      const j = await postForm('/gacha/api/dismantle/', data);
      status = j.status;
      paintStatus();
      closeDetail();
      albumStale = true;
      await loadAlbum();
      toast(`✨ 分解 ${j.count} 張，得到 ${j.gain} 星塵`);
    } catch (err) { alert(err.message); }
  }
  async function doShop(data) {
    try {
      const j = await postForm('/gacha/api/shop/', data);
      status = j.status;
      paintStatus();
      closeDetail();
      if (data.kind === 'card') { albumStale = true; await loadAlbum(); toast('🛒 兌換成功，已收進卡冊！'); }
      else toast(`🎟 兌換了 ${data.n} 張自選抽卡券（保留券）`);
    } catch (err) { alert(err.message); }
  }
  $('g-dust-all').addEventListener('click', () => {
    if (window.confirm('把所有重複的卡都分解成星塵嗎？（每張卡會保留 1 張）')) doDismantle({ all: 1 });
  });
  function paintShop() {
    if (!status) return;
    $('g-dust').textContent = status.stardust;
    const box = $('g-shop-tickets');
    box.innerHTML = '';
    [1, 5, 10].forEach((n) => {
      const cost = status.ticket_price * n;
      const b = addAct(box, `${n} 張\n✨ ${cost}`, () => doShop({ kind: 'ticket', n }));
      b.style.whiteSpace = 'pre-line';
      b.disabled = status.stardust < cost;
    });
    $('g-dust-table').innerHTML = `<table class="g-dust-table"><tr><th>稀有度</th><th>分解得到</th><th>兌換指定卡</th></tr>${RAR.map((r) => `<tr><td style="color:${COLOR[r]};font-weight:700">${esc(LABEL[r])}</td><td>✨ ${status.dust_value[r]}</td><td>✨ ${status.card_price[r]}</td></tr>`).join('')}</table>
      <p class="g-info g-left">・只有重複的卡可以分解，每張卡至少會保留 1 張。<br>・自選抽卡券 1 張 ✨ ${status.ticket_price}，兌換的是保留券，不會過期。<br>・卡片下架時，你持有的那張會自動依上表退還星塵。</p>`;
  }
  $('g-detail-close').addEventListener('click', closeDetail);
  detail.addEventListener('click', (e) => { if (e.target === detail) closeDetail(); });
  tilt($('g-detail-card'));

  // ---------- 切換：抽卡／卡冊 ----------
  panel.querySelectorAll('.g-views .chip').forEach((b) => b.addEventListener('click', () => {
    panel.querySelectorAll('.g-views .chip').forEach((x) => x.classList.toggle('active', x === b));
    const v = b.dataset.g;
    $('g-draw').hidden = v !== 'draw';
    $('g-album').hidden = v !== 'album';
    $('g-shop').hidden = v !== 'shop';
    if (v === 'album') loadAlbum();
    if (v === 'shop') { if (status) paintShop(); else loadStatus().then(paintShop); }
  }));
  // 離線：抽卡分頁只能看卡冊
  const albumChip = panel.querySelector('.g-views .chip[data-g="album"]');
  function offlineAlbum() {
    if (navigator.onLine !== false) return;
    albumStale = true;
    albumChip.click();
  }
  window.addEventListener('offline', offlineAlbum);
  window.addEventListener('online', () => { albumStale = true; if (!$('g-album').hidden) loadAlbum(); });
  // 登出：刪掉手機裡的卡冊副本（個人資料）
  const logoutForm = document.querySelector('form[action$="/logout/"]');
  if (logoutForm) logoutForm.addEventListener('submit', () => { try { localStorage.removeItem(ALBUM_KEY); } catch { /* 忽略 */ } });
  if (tab) tab.addEventListener('click', () => { if (navigator.onLine === false) { offlineAlbum(); return; } if (!status) loadStatus(); });
  // 分頁上的數字：背景讀取今天剩幾抽
  if (tab && !tab.hidden) loadStatus(false);
})();
