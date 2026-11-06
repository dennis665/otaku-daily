// Ukiyo 追劇小幫手：我的追劇、探索劇庫（只記「有在追」，不記集數）
// - 伺服器分頁：每次只讀取目前這一頁（劇庫 5000 多部，不會一次全部下載）
// - 分類導覽：季番（十年 → 年 → 季度）、動畫電影（十年 → 年 → 日版／台版），可折疊
(() => {
  const $ = (id) => document.getElementById(id);
  const tab = document.querySelector('.tab[data-tab="drama"]');
  const list = $('d-list');
  const search = $('d-search');
  const clearBtn = search.closest('.finder').querySelector('.finder-clear');
  const navBody = $('d-nav-body');
  const navToggle = $('d-nav-toggle');
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';

  let view = 'mine';
  let onlyNew = false;
  let mineTotal = 0;
  const label = { mine: '', explore: null };   // explore 第一次會預設為本季
  const navCache = {};

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const extLink = (cls, text, href) => { const a = el('a', cls, text); a.href = href; a.target = '_blank'; a.rel = 'noopener'; return a; };

  async function getJSON(url, opts = {}) {
    const r = await fetch(url, { credentials: 'same-origin', ...opts });
    if (!r.ok) throw new Error('讀取失敗，請稍後再試');
    return r.json();
  }

  const pager = window.Pager.create({ key: 'drama', top: $('d-pager-top'), bottom: $('d-pager-bottom'), onChange: () => load() });

  // ---------- 卡片 ----------
  function card(w) {
    const c = el('article', 'd-card');
    const cover = el('div', 'd-cover');
    if (w.images.length) {
      const img = el('img');
      img.src = w.images[0];
      img.alt = '';
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.onerror = () => { cover.classList.add('empty'); img.remove(); };
      cover.append(img);
    } else cover.classList.add('empty');
    if (w.is_new) cover.append(el('span', 'd-new', 'NEW'));

    const body = el('div', 'd-body');
    body.append(el('h3', 'd-title', w.title));
    if (w.alt_titles.length) body.append(el('p', 'd-alt', w.alt_titles.slice(0, 2).join('／')));
    const tags = el('div', 'd-tags');
    tags.append(el('span', 'd-tag media', w.media));
    if (w.latest) tags.append(el('span', 'd-tag', w.latest));
    if (w.followers) tags.append(el('span', 'd-tag muted', `👥 ${w.followers}`));
    body.append(tags);
    if (w.airings.length > 1) body.append(el('p', 'd-airings', `播出／上映：${w.airings.join('、')}`));
    if (w.franchise && w.franchise !== w.title) body.append(el('p', 'd-fr', `📚 ${w.franchise}`));

    const acts = el('div', 'd-acts');
    const fb = el('button', `act ${w.followed ? 'on' : ''}`, w.followed ? '✓ 追劇中' : '＋ 追劇');
    fb.type = 'button';
    fb.addEventListener('click', () => toggleFollow(w, fb));
    acts.append(fb);
    if (w.info_url) acts.append(extLink('act', '資訊 ↗', w.info_url));
    if (w.mp3.length) acts.append(extLink('act', '♪ 主題曲', w.mp3[0].url));
    if (w.mp4.length) acts.append(extLink('act', '▶ 影片', w.mp4[0].url));
    body.append(acts);

    c.append(cover, body);
    return c;
  }

  async function toggleFollow(w, btn) {
    try {
      const r = await getJSON(`/dramas/api/works/${w.id}/follow/`, { method: 'POST', headers: { 'X-CSRFToken': csrf() }, loading: false });
      w.followed = r.followed;
      btn.textContent = r.followed ? '✓ 追劇中' : '＋ 追劇';
      btn.classList.toggle('on', r.followed);
      mineTotal += r.followed ? 1 : -1;
      delete navCache.mine;   // 我的追劇分類數量變了
      paintCount();
    } catch (err) { alert(err.message); }
  }

  function paintCount() {
    $('d-count').textContent = mineTotal;
    $('d-views').querySelector('[data-view="mine"] b').textContent = mineTotal || '';
  }

  // ---------- 分類導覽 ----------
  async function getNav() {
    if (!navCache[view]) navCache[view] = await getJSON(`/dramas/api/filters/${view === 'mine' ? '?scope=mine' : ''}`);
    return navCache[view];
  }

  function chip(text, value, n) {
    const b = el('button', `chip${label[view] === value ? ' active' : ''}`);
    b.type = 'button';
    b.append(document.createTextNode(text));
    if (n != null) b.append(el('b', null, n));
    b.addEventListener('click', () => {
      label[view] = value;
      navBody.hidden = true;
      navToggle.setAttribute('aria-expanded', 'false');
      pager.reset();
      load();
    });
    return b;
  }

  // 十年 → 年 → 項目，用可折疊的區塊（含目前篩選的那一層會自動展開）
  function tree(decades, shortName) {
    const wrap = el('div', 'd-tree');
    decades.forEach((d) => {
      const dd = el('details', 'd-decade');
      const hasCurrent = d.years.some((y) => y.items.some((i) => i.label === label[view]));
      dd.open = hasCurrent;
      const ds = el('summary');
      ds.append(el('span', null, `${d.decade} 年代`), el('b', 'd-n', `${d.n} 筆`));
      dd.append(ds);
      d.years.forEach((y) => {
        const yd = el('details', 'd-year');
        yd.open = y.items.some((i) => i.label === label[view]);
        const ys = el('summary');
        ys.append(el('span', null, `${y.year} 年`), el('b', 'd-n', `${y.n} 筆`));
        const chips = el('div', 'chips wrap');
        y.items.forEach((i) => chips.append(chip(shortName(i.label), i.label, i.n)));
        yd.append(ys, chips);
        dd.append(yd);
      });
      wrap.append(dd);
    });
    return wrap;
  }

  async function renderNav() {
    const nav = await getNav();
    if (view === 'explore' && label.explore === null) {
      const hasCurrent = nav.tv.some((d) => d.years.some((y) => y.items.some((i) => i.label === nav.current)));
      label.explore = hasCurrent ? nav.current : '';
    }
    $('d-current').textContent = label[view] || '全部劇集';
    navBody.innerHTML = '';
    if (view === 'explore') {
      const s = nav.last_sync;
      navBody.append(el('p', 'd-sync', s ? `🔄 劇庫每天 16:00 自動更新・上次 ${s.at}（新增 ${s.created} 部）` : '🔄 劇庫每天 16:00 自動更新'));
    }
    navBody.append(el('div', 'chips wrap', null));
    navBody.lastChild.append(chip(`🌐 全部劇集`, '', nav.total));

    const tvSec = el('section', 'd-sec');
    tvSec.append(el('h4', null, '📺 季番動畫（依十年與年份）'));
    if (nav.announced) { const row = el('div', 'chips wrap'); row.append(chip('動畫化決定', nav.announced.label, nav.announced.n)); tvSec.append(row); }
    tvSec.append(tree(nav.tv, (l) => l.replace(/^\d{4}年/, '')));
    const mvSec = el('section', 'd-sec');
    mvSec.append(el('h4', null, '🎬 動畫電影／劇場版（依十年與年份）'));
    if (nav.movie_announced) { const row = el('div', 'chips wrap'); row.append(chip('電影製作決定', nav.movie_announced.label, nav.movie_announced.n)); mvSec.append(row); }
    mvSec.append(tree(nav.movie, (l) => (l.includes('日版') ? '🇯🇵 日版上映' : '🇹🇼 台版上映')));
    navBody.append(tvSec, mvSec);
  }

  navToggle.addEventListener('click', () => {
    navBody.hidden = !navBody.hidden;
    navToggle.setAttribute('aria-expanded', String(!navBody.hidden));
  });

  // ---------- 載入目前這一頁 ----------
  async function load() {
    try {
      await renderNav();
      const params = new URLSearchParams({ page: pager.page, size: pager.size, q: search.value.trim(), label: label[view] || '' });
      if (view === 'explore') {
        params.set('media', $('d-media').value);
        if (onlyNew) params.set('only', 'new');
      }
      const data = await getJSON(`/dramas/api/${view === 'mine' ? 'mine' : 'works'}/?${params}`);
      if (view === 'mine') { mineTotal = data.total; paintCount(); }
      pager.update({ page: data.page, total: data.count });
      list.innerHTML = '';
      if (!data.items.length) {
        const empty = view === 'mine' && !search.value && !label.mine ? '還沒有追任何作品，到「🌐 探索劇庫」加入吧' : '沒有符合條件的作品';
        list.append(el('p', 'empty', empty));
      }
      data.items.forEach((w) => list.append(card(w)));
    } catch (err) {
      list.innerHTML = '';
      list.append(el('p', 'empty', err.message));
    }
  }

  const restart = () => { pager.reset(); load(); };

  // ---------- 操作 ----------
  $('d-views').querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
    view = c.dataset.view;
    $('d-views').querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === c));
    $('d-tools').hidden = view !== 'explore';
    search.placeholder = view === 'mine' ? '在我的追劇裡搜尋' : '搜尋整個劇庫（中文、日文、別名都可以）';
    navBody.hidden = true;
    restart();
  }));
  let timer = null;
  search.addEventListener('input', () => {
    clearBtn.hidden = !search.value;
    clearTimeout(timer);
    timer = setTimeout(restart, 350);
  });
  clearBtn.addEventListener('click', () => { search.value = ''; clearBtn.hidden = true; restart(); });
  $('d-media').addEventListener('change', restart);
  $('d-new').addEventListener('click', () => { onlyNew = !onlyNew; $('d-new').classList.toggle('active', onlyNew); restart(); });

  // 首次切到追劇分頁才載入；分頁標籤上的數字在背景先讀
  let started = false;
  const start = () => { if (!started) { started = true; load(); } };
  tab.addEventListener('click', start);
  if (tab.classList.contains('active')) start();
  getJSON('/dramas/api/mine/?size=5', { loading: false }).then((d) => { mineTotal = d.total; paintCount(); }).catch(() => { $('d-count').textContent = '!'; });
})();
