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
        if (!url.startsWith('https://raw.githubusercontent.com/')) continue;
        const res = await fetch(url, { mode: 'cors', loading: false }).catch(() => null);
        if (res && res.ok) await cache.put(url, res);
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
      return `<div class="gcard is-missing r-${opts.rarity}"><div class="gcard-in"></div><div class="gcard-badge">${esc(LABEL[opts.rarity])}</div></div>`;
    }
    const back = opts.back ? '<div class="gcard-back">UKIYO</div>' : '';
    const art = c.image
      ? `<img src="${esc(c.image)}" alt="" loading="lazy">`
      : `<div class="gcard-noimg">${esc(c.title)}</div>`;
    return `<div class="gcard r-${c.rarity}${c.image ? '' : ' is-noimg'}" data-c="${c.card_id}">
      <div class="gcard-face">
        <div class="gcard-in">${art}<div class="gcard-name">${esc(c.name || c.title)}</div></div>
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
  function paintStatus() {
    const s = status;
    const left = s.follow_left.length + s.free_left;
    $('g-count').textContent = s.unlimited ? '∞' : left;
    $('g-info').innerHTML = s.unlimited
      ? `♾ 測試帳號：抽卡不限次數<br>再 <b>${s.pity_left}</b> 抽必出 SSR 以上`
      : `今天還可以抽 <b>${left}</b> 次・隨機抽 <b>${s.free_left}</b>／${s.free_daily}<br>再 <b>${s.pity_left}</b> 抽必出 SSR 以上`;
    $('g-free').disabled = !s.free_left;
    $('g-free').innerHTML = `🎲 隨機抽<small>全作品・${s.unlimited ? '不限次數' : `剩 ${s.free_left} 次`}</small>`;
    $('g-all').disabled = !s.follow_left.length;
    $('g-all').innerHTML = `⚡ 追的作品全抽<small>${s.follow_left.length ? `${s.follow_left.length} 部一次抽` : '今天都抽完了'}</small>`;
    const box = $('g-works');
    box.innerHTML = '';
    if (!s.pool_works) {
      box.innerHTML = '<p class="g-empty">🎴 卡片製作中，還沒有可以抽的卡，敬請期待！</p>';
    } else if (!s.follow_left.length) {
      box.innerHTML = '<p class="g-empty">今天追的作品都抽完了，或你追的作品還沒有卡片（到「📺 追劇」按 ⭐ 追有卡片的作品）。明天 00:00 重置！</p>';
    }
    s.follow_left.forEach((w) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'g-work';
      b.innerHTML = `${w.image ? `<img src="${esc(w.image)}" alt="" loading="lazy">` : '<i class="g-work-noimg"></i>'}<span>${esc(w.title)}</span>`;
      b.addEventListener('click', () => draw({ work_id: w.id }));
      box.appendChild(b);
    });
    $('g-rates').innerHTML = `<table>${s.rates.map((r) => `<tr><td><b style="color:${COLOR[r.rarity]}">${esc(r.label)}</b></td><td>${r.percent}%</td></tr>`).join('')}</table>
      <p>・每天台灣時間 00:00 重置：追的作品每部 1 抽，另送 ${s.free_daily} 次全作品隨機抽。<br>・連續 ${s.pity_at} 抽沒有 SSR 以上，下一抽必定 SSR 以上。<br>・抽卡結果由伺服器決定並記錄，重新整理也不會改變。</p>`;
  }
  $('g-free').addEventListener('click', () => draw({}));
  $('g-all').addEventListener('click', () => draw({ all: true }));

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
    openStage();
    buzz(30);
    // 一邊蓄力一邊等伺服器結果
    let data;
    try {
      const url = opts.all ? '/gacha/api/pull-all/' : '/gacha/api/pull/';
      const body = new URLSearchParams(opts.work_id ? { work_id: opts.work_id } : {});
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
    saveImages(data.cards.map((c) => c.image));   // 抽到的卡面直接存到手機
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
      reveal.innerHTML = cards.sort((a, b) => rank(b.rarity) - rank(a.rarity)).map((c) => cardHTML(c, { isNew: true })).join('');
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
  let albumStale = true;
  let filter = 'all';
  let shown = 20;
  async function loadAlbum() {
    if (!albumStale && album) { paintAlbum(); return; }
    try {
      const res = await fetch('/gacha/api/album/', { credentials: 'same-origin' });
      album = await res.json();
      albumStale = false;
      paintAlbum();
      // 卡冊裡的卡面也存一份（之前抽到但還沒存的）
      saveImages(album.works.flatMap((w) => w.cards.filter((c) => c.owned).map((c) => c.image)));
    } catch {
      $('g-sum').textContent = '讀取失敗，請稍後再試';
    }
  }
  function paintAlbum() {
    const s = album.summary;
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
        <header><b>${esc(w.title)}</b><span>${w.have}／${w.total}</span></header>
        <div class="g-progress"><i style="width:${(w.have / w.total) * 100}%"></i></div>
        <div class="g-slots">${w.cards.map((c) => cardHTML(c.owned ? c : null, { rarity: c.rarity, count: true })).join('')}</div>
      </div>`).join('');
    $('g-more').hidden = list.length <= shown;
  }
  $('g-more').addEventListener('click', () => { shown += 20; paintAlbum(); });
  $('g-album-list').addEventListener('click', (e) => {
    const el = e.target.closest('.gcard:not(.is-missing)');
    if (!el) return;
    const c = album.works.flatMap((w) => w.cards).find((x) => String(x.card_id) === el.dataset.c);
    if (c) openDetail(c);
  });

  // ---------- 卡片大圖 ----------
  const detail = $('g-detail');
  function openDetail(c) {
    $('g-detail-card').innerHTML = cardHTML(c, { count: false });
    $('g-detail-info').innerHTML = `<b>${esc(c.name || c.title)}</b><br>${c.name ? `${esc(c.title)}<br>` : ''}${esc(LABEL[c.rarity])}・持有 ${c.count} 張${c.first_at ? `・首次入手 ${esc(c.first_at)}` : ''}<br><small>手指在卡片上滑動可以傾斜欣賞</small>`;
    detail.hidden = false;
    document.body.classList.add('sheet-open');
  }
  const closeDetail = () => { detail.hidden = true; document.body.classList.remove('sheet-open'); };
  $('g-detail-close').addEventListener('click', closeDetail);
  detail.addEventListener('click', (e) => { if (e.target === detail) closeDetail(); });
  tilt($('g-detail-card'));

  // ---------- 切換：抽卡／卡冊 ----------
  panel.querySelectorAll('.g-views .chip').forEach((b) => b.addEventListener('click', () => {
    panel.querySelectorAll('.g-views .chip').forEach((x) => x.classList.toggle('active', x === b));
    const isAlbum = b.dataset.g === 'album';
    $('g-draw').hidden = isAlbum;
    $('g-album').hidden = !isAlbum;
    if (isAlbum) loadAlbum();
  }));
  if (tab) tab.addEventListener('click', () => { if (!status) loadStatus(); });
  // 分頁上的數字：背景讀取今天剩幾抽
  if (tab && !tab.hidden) loadStatus(false);
})();
