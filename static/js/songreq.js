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

  // ---------- 我的追劇缺歌（只開放給管理者帳號）：每部作品就地選連結、類型、音樂／影片，按「儲存」才算確認 ----------
  // 沒按儲存的不會處理；儲存後變成一筆投稿（等待處理）
  let missing = [];
  let missLimit = 30;
  const KINDS = ['TV片頭曲', '完整片頭曲', 'TV片尾曲', '完整ED', '劇中歌', '完整劇中歌', '其他'];
  const fmtSec = (s) => (s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : '');
  async function loadMissing() {
    const box = $('sr-missing');
    if (!box) return;
    box.innerHTML = '<p class="sheet-sub">讀取中…</p>';
    try {
      const j = await api('/api/song-requests/missing/');
      missing = j.items;
      missLimit = 30;
      paintMissing();
    } catch (err) { box.innerHTML = `<p class="alert">${esc(err.message)}</p>`; }
  }
  function paintMissing() {
    const box = $('sr-missing');
    const q = (box.querySelector('#sr-mq') || {}).value || '';
    const airedOnly = box.querySelector('#sr-maired') ? box.querySelector('#sr-maired').checked : true;
    $('sr-miss-n').textContent = missing.length || '';
    const list = missing.filter((w) => (!airedOnly || w.aired) && (!q || `${w.title} ${w.jp}`.toLowerCase().includes(q.toLowerCase())));
    box.innerHTML = `<p class="sheet-sub">你追的作品中還沒有歌、也還沒投稿的有 ${missing.length} 部（已播出 ${missing.filter((w) => w.aired).length} 部）。
      每部選好連結、類型與要下載的檔案後按「儲存」，<b>沒按儲存的不會處理</b>。</p>
      <div class="sr-mtools"><input id="sr-mq" type="search" placeholder="搜尋作品" value="${esc(q)}"><label><input type="checkbox" id="sr-maired"${airedOnly ? ' checked' : ''}> 只看已播出</label></div>`;
    const mq = box.querySelector('#sr-mq');
    mq.addEventListener('input', () => { missLimit = 30; const pos = mq.selectionStart; paintMissing(); const n = $('sr-mq'); n.focus(); n.setSelectionRange(pos, pos); });
    box.querySelector('#sr-maired').addEventListener('change', () => { missLimit = 30; paintMissing(); });
    list.slice(0, missLimit).forEach((w) => box.appendChild(missRow(w)));
    if (list.length > missLimit) {
      const more = document.createElement('button');
      more.className = 'btn ghost sr-more'; more.type = 'button'; more.textContent = `顯示更多（還有 ${list.length - missLimit} 部）`;
      more.addEventListener('click', () => { missLimit += 30; paintMissing(); });
      box.appendChild(more);
    }
    if (!list.length) box.insertAdjacentHTML('beforeend', '<p class="sheet-sub">沒有符合的作品。</p>');
  }
  function missRow(w) {
    const row = document.createElement('div');
    row.className = 'sr-mrow';
    const q = encodeURIComponent(`${w.jp || w.title} ${w.kind === 'TV片頭曲' ? 'ノンクレジットOP' : '主題歌 MV'}`);
    const group = `srm-${w.id}`;
    const cands = w.candidates.map((c, k) => `<label class="sr-cand"><input type="radio" name="${group}" value="${esc(c.url)}"${k === 0 ? ' checked' : ''}>
        <img src="https://i.ytimg.com/vi/${esc((c.url.match(/v=([\w-]+)/) || [])[1] || '')}/default.jpg" alt="" loading="lazy">
        <span><a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a><small>${fmtSec(c.sec)}・${esc(c.channel || '上傳者不明')}</small></span></label>`).join('');
    row.innerHTML = `<div class="sr-mhead"><b>${esc(w.title)}</b><small>${esc(w.media)}・${esc(w.label)}${w.aired ? '' : '・尚未播出'}・<a href="https://www.youtube.com/results?search_query=${q}" target="_blank" rel="noopener">🔍 YouTube</a></small></div>
      ${cands || '<p class="sheet-sub">沒有自動找到候選，請貼上自己找的連結。</p>'}
      <label class="sr-cand own"><input type="radio" name="${group}" value="own"${w.candidates.length ? '' : ' checked'}><input type="url" class="sr-murl" placeholder="或貼上自己找的 YouTube 連結"></label>
      <div class="sr-mopts"><select class="sr-mkind">${KINDS.map((k) => `<option${k === w.kind ? ' selected' : ''}>${k}</option>`).join('')}</select>
        <input class="sr-mtags" maxlength="100" placeholder="標籤（選其他時必填）">
        <label><input type="checkbox" class="sr-ma" checked> 🎵</label><label><input type="checkbox" class="sr-mv" checked> 🎬</label>
        <button class="btn primary sm sr-msave" type="button">儲存</button></div>
      <p class="alert" hidden></p>`;
    const urlIn = row.querySelector('.sr-murl');
    urlIn.addEventListener('input', () => { if (urlIn.value.trim()) row.querySelector(`input[name="${group}"][value="own"]`).checked = true; });
    row.querySelector('.sr-msave').addEventListener('click', async (ev) => {
      const btn = ev.currentTarget;
      const err = row.querySelector('.alert');
      const pick = row.querySelector(`input[name="${group}"]:checked`);
      const url = !pick || pick.value === 'own' ? urlIn.value.trim() : pick.value;
      btn.disabled = true;
      try {
        await api('/api/song-requests/', {
          work_id: w.id, kind: row.querySelector('.sr-mkind').value, tags: row.querySelector('.sr-mtags').value.trim(), url,
          audio: row.querySelector('.sr-ma').checked, video: row.querySelector('.sr-mv').checked, note: '我的追劇缺歌',
        });
        missing = missing.filter((x) => x.id !== w.id);
        row.className = 'sr-mrow saved';
        row.innerHTML = `<b>${esc(w.title)}</b> <span class="sr-st done">✅ 已儲存，等待處理</span>`;
        $('sr-miss-n').textContent = missing.length || '';
        loadMine(true);
      } catch (e) { err.textContent = e.message; err.hidden = false; btn.disabled = false; }
    });
    return row;
  }
})();
