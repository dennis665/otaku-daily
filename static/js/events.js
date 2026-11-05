// Ukiyo 北部動漫活動：資料來自 Google 試算表（每天 08:30 後更新一次）
// 進入頁面就在背景先載入（不顯示遮罩），切到「活動」分頁時若還沒載完才顯示載入遮罩
(() => {
  const $ = (id) => document.getElementById(id);
  const list = $('e-list');
  const meta = $('e-meta');
  const count = $('e-count');
  const search = $('e-search');
  const clearBtn = search.closest('.finder').querySelector('.finder-clear');
  const typeBox = $('e-types');
  const tab = document.querySelector('.tab[data-tab="events"]');

  const TYPE_EMOJI = { '快閃店': '🛍️', '聯名餐廳/咖啡廳': '☕', '電影': '🎬', '市集/同人場': '📚', '展覽': '🖼️', '演唱會/舞台': '🎤' };
  const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
  const MOVIE_DAYS = 30;   // 只有開始日的活動（多半是電影），開始後 30 天內都算進行中

  // 日期一律用台灣時間的 YYYY-MM-DD 字串比較
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());
  const toDate = (s) => new Date(`${s}T00:00:00Z`);
  const addDays = (s, n) => { const d = toDate(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
  const diffDays = (a, b) => Math.round((toDate(b) - toDate(a)) / 86400000);
  const short = (s) => { const d = toDate(s); return `${d.getUTCMonth() + 1}/${d.getUTCDate()}（${WEEK[d.getUTCDay()]}）`; };

  // 這個週末：今天是週六日就從今天算，否則是接下來的週六、週日
  const dow = toDate(today).getUTCDay();
  const weekend = dow === 0 ? [today] : dow === 6 ? [today, addDays(today, 1)] : [addDays(today, 6 - dow), addDays(today, 7 - dow)];

  let events = [];
  let when = 'all';
  let type = '';

  // 排序方式（記在這台裝置）
  const SORTS = {
    smart: '進行中優先（快結束的在前）',
    start_asc: '開始日期：近 → 遠',
    start_desc: '開始日期：遠 → 近',
    end_asc: '快結束的優先',
    newest: '最新收錄',
    type: '依類型',
  };
  let sortKey = 'smart';
  try { sortKey = localStorage.getItem('eventSort') || 'smart'; } catch { /* 無痕模式 */ }
  if (!SORTS[sortKey]) sortKey = 'smart';
  const far = '9999-12-31';
  const sorters = {
    smart: (a, b) => ({ now: 0, soon: 1 }[a.status.key] - { now: 0, soon: 1 }[b.status.key])
      || (a.status.key === 'now' ? (a.end || far).localeCompare(b.end || far) : (a.start || far).localeCompare(b.start || far)),
    start_asc: (a, b) => (a.start || far).localeCompare(b.start || far),
    start_desc: (a, b) => (b.start || '').localeCompare(a.start || ''),
    end_asc: (a, b) => (a.end || far).localeCompare(b.end || far),
    newest: (a, b) => (b.added || '').localeCompare(a.added || '') || (a.start || far).localeCompare(b.start || far),
    type: (a, b) => (a.type || '').localeCompare(b.type || '', 'zh-Hant') || sorters.smart(a, b),
  };

  // 活動在某一天是否有在進行
  function activeOn(e, day) {
    if (!e.start && !e.end) return false;
    const end = e.end || addDays(e.start, MOVIE_DAYS);
    return (!e.start || e.start <= day) && end >= day;
  }

  // 狀態：ended / now / soon，以及畫面上的文字
  function status(e) {
    if (e.end && e.end < today) return { key: 'ended' };
    if (e.start && e.start > today) {
      const d = diffDays(today, e.start);
      return { key: 'soon', text: d === 1 ? '明天開始' : `${d} 天後開始`, hot: d <= 7 };
    }
    if (!e.end) {
      if (!e.start || diffDays(e.start, today) > MOVIE_DAYS) return { key: 'ended' };
      return { key: 'now', text: e.type === '電影' ? '上映中' : '進行中' };
    }
    const left = diffDays(today, e.end);
    if (left === 0) return { key: 'now', text: '今天最後一天', hot: true };
    return { key: 'now', text: left <= 7 ? `剩 ${left} 天` : '進行中', hot: left <= 7 };
  }

  function dateText(e) {
    if (e.start && e.end) return e.start === e.end ? short(e.start) : `${short(e.start)} – ${short(e.end)}`;
    if (e.start) return `${short(e.start)} 起`;
    if (e.end) return `至 ${short(e.end)}`;
    return '日期未定';
  }

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const extLink = (cls, text, href) => { const a = el('a', cls, text); a.href = href; a.target = '_blank'; a.rel = 'noopener'; return a; };

  function card(e) {
    const st = e.status;
    const c = el('article', `ev ev-${st.key}`);
    const head = el('div', 'ev-head');
    head.append(el('span', 'ev-type', `${TYPE_EMOJI[e.type] || '🎪'} ${e.type || '活動'}`), el('span', `ev-badge${st.hot ? ' hot' : ''}`, st.text));
    c.append(head, el('h3', 'ev-name', e.name));
    if (e.ip) c.append(el('p', 'ev-ip', e.ip));

    const info = el('ul', 'ev-info');
    info.append(el('li', null, `📅 ${dateText(e)}`));
    const place = el('li');
    // 有具體地點才連到 Google 地圖
    if (e.place && !/各大戲院|未查到/.test(e.place)) {
      place.append(extLink(null, `📍 ${e.place}`, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.place)}`));
    } else place.textContent = `📍 ${e.place || '地點未定'}`;
    info.append(place);
    c.append(info);
    if (e.summary) c.append(el('p', 'ev-sum', e.summary));

    const foot = el('div', 'ev-foot');
    if (e.added && diffDays(e.added, today) <= 2) foot.append(el('span', 'ev-tag new', 'NEW'));
    if (e.unverified) {
      const t = el('span', 'ev-tag', '資訊待確認');
      t.title = '這筆資料還沒在原始網頁核實，出發前請再確認';
      foot.append(t);
    }
    // 加入行程小幫手：帶入活動名稱、地點、期間與來源，時間先設為未定讓使用者自己選
    if (window.Planner) {
      const add = el('button', 'act ev-add', '＋ 加入行程');
      add.type = 'button';
      add.addEventListener('click', () => window.Planner.addFromEvent({
        title: e.name,
        type: e.type === '電影' ? 'MOVIE' : e.type === '展覽' ? 'EXHIBIT' : 'ANIME',
        location: /各大戲院|未查到/.test(e.place) ? '' : e.place,
        links: e.url ? [{ title: '活動資訊', url: e.url }] : [],
        notes: [`活動期間：${dateText(e)}`, e.summary].filter(Boolean).join('\n'),
        tbd: true,
      }));
      foot.append(add);
    }
    if (e.url) foot.append(extLink('ev-src', '查看來源 ↗', e.url));
    c.append(foot);
    return c;
  }

  const norm = (s) => s.normalize('NFKC').toLowerCase().replace(/[\s《》「」『』()（）×・·]/g, '');

  // 分頁：清單上下各一組頁碼，只畫出目前這一頁
  const pager = window.Pager.create({ key: 'events', top: $('e-pager-top'), bottom: $('e-pager-bottom'), defaultSize: 10, onChange: () => render(true) });

  function render(keepPage) {
    if (keepPage !== true) pager.reset();
    const words = search.value.trim().split(/\s+/).map(norm).filter(Boolean);
    clearBtn.hidden = !search.value;
    const shown = events.filter((e) => {
      if (type && e.type !== type) return false;
      if (when === 'now' && e.status.key !== 'now') return false;
      if (when === 'soon' && e.status.key !== 'soon') return false;
      if (when === 'weekend' && !weekend.some((d) => activeOn(e, d))) return false;
      return words.every((w) => e.haystack.includes(w));
    });
    list.innerHTML = '';
    if (!shown.length) list.append(el('p', 'empty', events.length ? '沒有符合條件的活動，換個篩選條件試試' : '目前沒有活動資料'));
    else pager.slice([...shown].sort(sorters[sortKey])).forEach((e) => list.append(card(e)));
    if (!shown.length) pager.slice([]);
    $('e-shown').textContent = `顯示 ${shown.length} / ${events.length} 筆`;
  }

  function buildTypes() {
    const types = [...new Set(events.map((e) => e.type).filter(Boolean))];
    typeBox.innerHTML = '';
    ['', ...types].forEach((t) => {
      const b = el('button', `chip${t === type ? ' active' : ''}`, t ? `${TYPE_EMOJI[t] || '🎪'} ${t}` : '全部類型');
      b.type = 'button';
      b.addEventListener('click', () => {
        type = t;
        typeBox.querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === b));
        render();
      });
      typeBox.append(b);
    });
  }

  function setData(data) {
    const order = { now: 0, soon: 1 };
    events = (data.events || [])
      .map((e) => ({ ...e, status: status(e), haystack: norm([e.name, e.ip, e.place, e.type, e.summary].join(' ')) }))
      .filter((e) => e.status.key !== 'ended')
      // 進行中的排前面（快結束的優先），接著是即將開始的（越快開始越前面）
      .sort((a, b) => (order[a.status.key] - order[b.status.key])
        || (a.status.key === 'now' ? (a.end || '9999').localeCompare(b.end || '9999') : a.start.localeCompare(b.start)));
    count.textContent = events.length;
    meta.innerHTML = '';
    meta.append(el('span', null, ''));
    meta.lastChild.id = 'e-shown';
    if (data.updated) meta.append(document.createTextNode(`・資料更新 ${short(data.updated)}`));
    if (!data.fresh) meta.append(el('span', 'warn', '（暫時連不到試算表，顯示上次的資料）'));
    buildTypes();
    render();
  }

  function fail() {
    count.textContent = '!';
    list.innerHTML = '';
    list.append(el('p', 'empty', '活動資料載入失敗，請稍後重新整理'));
  }

  // 背景先載入，不鎖畫面
  let loaded = false;
  const loading = fetch('/api/events/', { loading: false, credentials: 'same-origin' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(setData)
    .catch(fail)
    .finally(() => { loaded = true; });

  // 切到活動分頁時還沒載完：顯示載入遮罩直到完成
  const waitIfNeeded = () => { if (!loaded && window.AppLoading) window.AppLoading.track(loading); };
  tab.addEventListener('click', waitIfNeeded);
  if (tab.classList.contains('active')) waitIfNeeded();

  // 篩選與搜尋
  $('e-when').querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => {
    when = b.dataset.when;
    $('e-when').querySelectorAll('.chip').forEach((x) => x.classList.toggle('active', x === b));
    render();
  }));
  search.addEventListener('input', render);
  clearBtn.addEventListener('click', () => { search.value = ''; render(); search.focus(); });

  // 排序選單
  const sortSel = $('e-sort');
  Object.entries(SORTS).forEach(([k, label]) => sortSel.append(new Option(label, k)));
  sortSel.value = sortKey;
  sortSel.addEventListener('change', () => {
    sortKey = sortSel.value;
    try { localStorage.setItem('eventSort', sortKey); } catch { /* 無痕模式 */ }
    render();
  });
})();
