// 🙋 歌曲投稿：選追劇清單的作品（或自己輸入名稱）＋類型＋YouTube 連結；我的投稿與處理狀態；
// 測試站另外列出「我的追劇缺歌」，一鍵帶入投稿表單（後端 player/views.py 的 song_requests）
(() => {
  const $ = (id) => document.getElementById(id);
  const sheet = $('sr-sheet');
  if (!sheet) return;
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const csrf = () => (document.cookie.match(/csrftoken=([^;]+)/) || [])[1] || (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';
  const STATUS = { pending: ['⏳ 等待處理', 'pending'], done: ['✅ 已加入', 'done'], skip: ['🙈 沒有採用', 'skip'] };
  let picked = null;   // { id, title }
  let view = 'form';

  async function api(url, body) {
    const opts = { credentials: 'same-origin' };
    if (body !== undefined) { opts.method = 'POST'; opts.headers = { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() }; opts.body = JSON.stringify(body); }
    const r = await fetch(url, opts);
    const j = await r.json().catch(() => ({}));
    if (!r.ok || j.ok === false) throw new Error(j.error || '發生錯誤，請稍後再試');
    return j;
  }
  const show = (id, text) => { const e = $(id); e.textContent = text || ''; e.hidden = !text; };

  function setView(v) {
    view = v;
    sheet.querySelectorAll('#sr-tabs .chip').forEach((c) => c.classList.toggle('active', c.dataset.v === v));
    $('sr-form').hidden = v !== 'form';
    $('sr-mine').hidden = v !== 'mine';
    if ($('sr-missing')) $('sr-missing').hidden = v !== 'missing';
    if (v === 'mine') loadMine();
    if (v === 'missing') loadMissing();
  }
  sheet.querySelectorAll('#sr-tabs .chip').forEach((c) => c.addEventListener('click', () => setView(c.dataset.v)));

  function open() {
    sheet.hidden = false;
    document.body.classList.add('sheet-open');
    setView('form');
    loadMine(true);
  }
  function close() {
    sheet.hidden = true;
    if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open');
  }
  $('sr-open').addEventListener('click', open);
  sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('[data-close]')) close(); });

  // ---------- 選作品：搜尋追劇清單 ----------
  function pick(w) {
    picked = w;
    $('sr-picked-name').textContent = w ? w.title : '';
    $('sr-picked').hidden = !w;
    $('sr-q').hidden = !!w || $('sr-own').checked;
    $('sr-results').hidden = true;
  }
  $('sr-unpick').addEventListener('click', () => { pick(null); $('sr-q').value = ''; $('sr-q').focus(); });
  let timer = null;
  let seq = 0;
  $('sr-q').addEventListener('input', () => {
    clearTimeout(timer);
    const q = $('sr-q').value.trim();
    if (q.length < 1) { $('sr-results').hidden = true; return; }
    timer = setTimeout(async () => {
      const my = ++seq;
      try {
        const r = await fetch(`/dramas/api/works/?page=1&size=10&q=${encodeURIComponent(q)}`, { credentials: 'same-origin', loading: false });
        const j = await r.json();
        if (my !== seq) return;
        const ul = $('sr-results');
        ul.innerHTML = '';
        if (!j.items.length) ul.innerHTML = '<li class="muted">追劇清單裡找不到，可以勾選「自己輸入名稱」</li>';
        j.items.forEach((w) => {
          const li = document.createElement('li');
          li.innerHTML = `<b>${esc(w.title)}</b><small>${esc(w.latest || '')}${w.mp3 && w.mp3.length ? '・🎵 已有歌' : ''}</small>`;
          li.addEventListener('click', () => pick({ id: w.id, title: w.title }));
          ul.appendChild(li);
        });
        ul.hidden = false;
      } catch { /* 搜尋失敗：不顯示結果 */ }
    }, 300);
  });
  $('sr-own').addEventListener('change', () => {
    const own = $('sr-own').checked;
    $('sr-title').hidden = !own;
    if (own) { pick(null); $('sr-q').hidden = true; $('sr-title').focus(); } else { $('sr-q').hidden = false; }
  });
  $('sr-kind').addEventListener('change', () => {
    $('sr-tags').placeholder = $('sr-kind').value === '其他' ? '標籤（必填，例：角色歌、Live 版）' : '標籤（可不填，例：第二季、角色歌）';
  });

  // ---------- 送出 ----------
  $('sr-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    show('sr-error', ''); show('sr-ok', '');
    const body = {
      work_id: picked ? picked.id : null,
      title: $('sr-own').checked ? $('sr-title').value.trim() : '',
      kind: $('sr-kind').value,
      tags: $('sr-tags').value.trim(),
      url: $('sr-url').value.trim(),
      audio: $('sr-audio').checked,
      video: $('sr-video').checked,
      note: $('sr-note').value.trim(),
    };
    try {
      const j = await api('/api/song-requests/', body);
      show('sr-ok', `✅ 已投稿「${j.item.work || j.item.title} ${j.item.kind}」，處理後會出現在音樂清單`);
      $('sr-url').value = ''; $('sr-note').value = ''; $('sr-tags').value = '';
      pick(null); $('sr-q').value = ''; $('sr-own').checked = false; $('sr-title').hidden = true; $('sr-title').value = ''; $('sr-q').hidden = false;
      missing = missing.filter((w) => w.id !== body.work_id);
      loadMine(true);
    } catch (err) { show('sr-error', err.message); }
  });

  // ---------- 我的投稿 ----------
  async function loadMine(countOnly = false) {
    try {
      const j = await api('/api/song-requests/');
      const pending = j.items.filter((x) => x.status === 'pending').length;
      $('sr-mine-n').textContent = j.items.length ? `${pending}／${j.items.length}` : '';
      if (countOnly && view !== 'mine') return;
      const box = $('sr-mine');
      if (!j.items.length) { box.innerHTML = '<p class="sheet-sub">還沒有投稿。</p>'; return; }
      box.innerHTML = '';
      j.items.forEach((x) => {
        const [text, cls] = STATUS[x.status] || STATUS.pending;
        const row = document.createElement('div');
        row.className = 'sr-row';
        row.innerHTML = `<div><b>${esc(x.work || x.title)}</b> <span class="sr-kind">${esc(x.kind)}${x.tags ? `・${esc(x.tags)}` : ''}</span>
          <small>${esc(x.created)}・${x.audio ? '🎵' : ''}${x.video ? '🎬' : ''}・<a href="${esc(x.url)}" target="_blank" rel="noopener">連結</a>${x.result ? `・${esc(x.result)}` : ''}</small></div>
          <span class="sr-st ${cls}">${text}</span>`;
        if (x.status === 'pending') {
          const del = document.createElement('button');
          del.className = 'act'; del.type = 'button'; del.textContent = '收回';
          del.addEventListener('click', async () => {
            if (!window.confirm('收回這筆投稿？')) return;
            try { await api(`/api/song-requests/${x.id}/delete/`, {}); loadMine(); } catch (err) { alert(err.message); }
          });
          row.appendChild(del);
        }
        box.appendChild(row);
      });
    } catch { /* 讀不到就不顯示數字 */ }
  }

  // ---------- 測試站：我的追劇缺歌 ----------
  let missing = [];
  async function loadMissing() {
    const box = $('sr-missing');
    if (!box) return;
    box.innerHTML = '<p class="sheet-sub">讀取中…</p>';
    try {
      const j = await api('/api/song-requests/missing/');
      missing = j.items;
      $('sr-miss-n').textContent = missing.length || '';
      box.innerHTML = `<p class="sheet-sub">你追的 TV 動畫中，2024 年 1 月以後播出、還沒有歌也還沒投稿的有 ${missing.length} 部。按「投稿」會帶入作品與「TV片頭曲」。</p>`;
      missing.forEach((w) => {
        const row = document.createElement('div');
        row.className = 'sr-row';
        const q = encodeURIComponent(`${w.jp || w.title} ノンクレジットOP`);
        row.innerHTML = `<div><b>${esc(w.title)}</b><small>${esc(w.label)}・<a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">🔍 YouTube 找 OP</a></small></div>`;
        const b = document.createElement('button');
        b.className = 'act'; b.type = 'button'; b.textContent = '投稿';
        b.addEventListener('click', () => {
          setView('form');
          $('sr-own').checked = false; $('sr-title').hidden = true;
          pick({ id: w.id, title: w.title });
          $('sr-kind').value = 'TV片頭曲';
          $('sr-url').focus();
        });
        row.appendChild(b);
        box.appendChild(row);
      });
    } catch (err) { box.innerHTML = `<p class="alert">${esc(err.message)}</p>`; }
  }
})();
