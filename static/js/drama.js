// Ukiyo 追劇小幫手：我的追劇、探索劇庫（只記「有在追」，不記集數）
// 劇庫以 youranimes 作品編號為準，同一部作品只有一筆；名稱相同的不同作品會在名稱後面加年份
(() => {
  const $ = (id) => document.getElementById(id);
  const tab = document.querySelector('.tab[data-tab="drama"]');
  const list = $('d-list');
  const meta = $('d-meta');
  const search = $('d-search');
  const clearBtn = search.closest('.finder').querySelector('.finder-clear');
  const more = $('d-more');
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';

  let view = 'mine';
  let page = 1;
  let onlyNew = false;
  let filtersLoaded = false;
  let mineTotal = 0;

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
      paintCount();
      if (view === 'mine' && !r.followed) btn.closest('.d-card').remove();
    } catch (err) { alert(err.message); }
  }

  function paintCount() {
    $('d-count').textContent = mineTotal;
    $('d-views').querySelector('[data-view="mine"] b').textContent = mineTotal || '';
  }

  // ---------- 載入 ----------
  async function loadMine() {
    const q = search.value.trim();
    const data = await getJSON(`/dramas/api/mine/?q=${encodeURIComponent(q)}`);
    mineTotal = data.total;
    paintCount();
    list.innerHTML = '';
    meta.textContent = q ? `找到 ${data.items.length} 部（共追 ${data.total} 部）` : `共追 ${data.total} 部，依最新播出排序`;
    if (!data.items.length) list.append(el('p', 'empty', q ? '沒有符合的作品' : '還沒有追任何作品，到「🌐 探索劇庫」加入吧'));
    data.items.forEach((w) => list.append(card(w)));
    more.hidden = true;
  }

  async function loadFilters() {
    if (filtersLoaded) return;
    const f = await getJSON('/dramas/api/filters/');
    const sel = $('d-label');
    sel.innerHTML = '';
    sel.append(new Option(`全部作品（${f.total}）`, ''));
    const group = (name, rows) => {
      if (!rows.length) return;
      const g = document.createElement('optgroup');
      g.label = name;
      rows.forEach((r) => g.append(new Option(`${r.label}（${r.n}）`, r.label)));
      sel.append(g);
    };
    group('動畫化／製作決定', f.others);
    group('新番季度', f.seasons);
    group('動畫電影', f.movies);
    // 預設本季（有資料的話）
    sel.value = f.seasons.some((r) => r.label === f.current) ? f.current : '';
    filtersLoaded = true;
  }

  async function loadExplore(append = false) {
    await loadFilters();
    if (!append) page = 1;
    const params = new URLSearchParams({ page, q: search.value.trim(), label: $('d-label').value, media: $('d-media').value });
    if (onlyNew) params.set('only', 'new');
    const data = await getJSON(`/dramas/api/works/?${params}`);
    if (!append) list.innerHTML = '';
    meta.textContent = `共 ${data.count} 部・第 ${data.page} / ${data.pages || 1} 頁`;
    if (!data.items.length && !append) list.append(el('p', 'empty', '沒有符合條件的作品'));
    data.items.forEach((w) => list.append(card(w)));
    more.hidden = data.page >= data.pages;
  }

  const reload = () => (view === 'mine' ? loadMine() : loadExplore()).catch((err) => { list.innerHTML = ''; list.append(el('p', 'empty', err.message)); });

  // ---------- 操作 ----------
  $('d-views').querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => {
    view = chip.dataset.view;
    $('d-views').querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === chip));
    $('d-tools').hidden = view !== 'explore';
    search.placeholder = view === 'mine' ? '在我的追劇裡搜尋' : '搜尋整個劇庫（中文、日文、別名都可以）';
    reload();
  }));
  let timer = null;
  search.addEventListener('input', () => {
    clearBtn.hidden = !search.value;
    clearTimeout(timer);
    timer = setTimeout(reload, 350);
  });
  clearBtn.addEventListener('click', () => { search.value = ''; clearBtn.hidden = true; reload(); });
  $('d-label').addEventListener('change', () => loadExplore());
  $('d-media').addEventListener('change', () => loadExplore());
  $('d-new').addEventListener('click', () => { onlyNew = !onlyNew; $('d-new').classList.toggle('active', onlyNew); loadExplore(); });
  more.addEventListener('click', () => { page += 1; loadExplore(true); });

  // 首次切到追劇分頁才載入；分頁標籤上的數字在背景先讀
  let started = false;
  const start = () => { if (!started) { started = true; reload(); } };
  tab.addEventListener('click', start);
  if (tab.classList.contains('active')) start();
  getJSON('/dramas/api/mine/?q=', { loading: false }).then((d) => { mineTotal = d.total; paintCount(); }).catch(() => { $('d-count').textContent = '!'; });
})();
