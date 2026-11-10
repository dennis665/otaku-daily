// Ukiyo 影音播放器：音樂 / 影片兩個分頁，各自有清單、循環模式與搜尋
(() => {
  const playlist = JSON.parse(document.getElementById('playlist-data').textContent);
  const songs = playlist.filter((s) => s.audio);
  const videos = playlist.filter((s) => s.video);
  const $ = (id) => document.getElementById(id);
  const audio = $('audio');
  const video = $('video');

  // localStorage 在無痕模式等情況可能無法使用，讀寫都要包 try/catch
  const store = {
    get(key, fallback) { try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 忽略 */ } },
  };

  // 換歌或換影片時顯示載入遮罩，直到可以開始播放（或載入失敗）為止
  // 播放中途的短暫緩衝不鎖畫面，否則連暫停、換歌都按不了
  function trackMediaLoading(el) {
    const done = window.AppLoading ? window.AppLoading.start() : () => {};
    const finish = () => {
      el.removeEventListener('canplay', finish);
      el.removeEventListener('error', finish);
      done();
    };
    el.addEventListener('canplay', finish);
    el.addEventListener('error', finish);
  }

  const LOOP_MODES = ['ALL', 'ONE', 'SHUFFLE'];
  const LOOP_LABEL = { ALL: ['🔁', '全部循環'], ONE: ['🔂', '單曲循環'], SHUFFLE: ['🔀', '隨機播放'] };
  const fmt = (t) => (isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}` : '0:00');

  // ---------- 分頁切換 ----------
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${tab.dataset.tab}`));
      // 切換分頁時暫停另一邊，避免兩個同時發聲
      // 切到「活動」分頁時音樂繼續播（邊聽歌邊看活動）
      if (tab.dataset.tab === 'music') video.pause();
      if (tab.dataset.tab === 'video') audio.pause();
      store.set('tab', tab.dataset.tab);
    });
  });

  // ---------- 共用：清單繪製與循環模式 ----------
  // 清單分頁：只畫出目前這一頁（清單資料很小，主要是讓畫面不用一次畫出上百列）
  // lists[listEl.id] = { items, onPick, pager, active }
  const lists = {};
  function renderList(listEl, items, onPick, decorate) {
    const key = listEl.id;
    const state = lists[key] || (lists[key] = { items, onPick, active: -1 });
    state.items = items;
    state.onPick = onPick;
    state.decorate = decorate;
    if (!state.pager) {
      state.pager = window.Pager.create({
        key, top: $(`${key}-pager-top`), bottom: $(`${key}-pager-bottom`),
        onChange: () => paintList(listEl),
      });
    }
    paintList(listEl);
  }
  function paintList(listEl) {
    const state = lists[listEl.id];
    const pageItems = state.pager.slice(state.items);
    const offset = (state.pager.page - 1) * state.pager.size;
    listEl.innerHTML = '';
    pageItems.forEach((item, k) => {
      const i = offset + k;
      const li = document.createElement('li');
      li.dataset.index = i;
      li.classList.toggle('active', i === state.active);
      li.innerHTML = '<span class="no"></span><span class="name"></span><span class="playing">▶</span>';
      li.querySelector('.no').textContent = i + 1;
      li.querySelector('.name').textContent = item.title;
      li.addEventListener('click', () => state.onPick(i));
      if (state.decorate) state.decorate(li, item, i);
      listEl.appendChild(li);
    });
  }
  function markActive(listEl, index) {
    const state = lists[listEl.id];
    if (state) {
      state.active = index;
      state.pager.showIndex(index, state.items.length);   // 換歌時自動翻到正在播的那一頁
    }
    listEl.querySelectorAll('li').forEach((li) => li.classList.toggle('active', Number(li.dataset.index) === index));
    const cur = listEl.querySelector('li.active');
    if (cur) cur.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // ---------- 搜尋：打字即時列出符合的項目，點一下直接播放 ----------
  // 比對時忽略大小寫、全形半形、空白與標點；多個關鍵字用空白分開，全部都要符合
  const norm = (s) => s.normalize('NFKC').toLowerCase().replace(/[\s\-_.・·•:：!！?？'"「」『』()（）[\]【】~～,，、。]/g, '');
  function setupFinder(prefix, items, onPick, getCurrent, unit) {
    const root = $(`${prefix}-finder`);
    const input = $(`${prefix}-search`);
    const clear = root.querySelector('.finder-clear');
    const status = root.querySelector('.finder-status');
    const results = root.querySelector('.finder-results');
    const index = items.map((item, i) => ({ i, title: item.title, key: norm(item.title) }));
    let matches = [];

    // 把符合的關鍵字標亮（只處理原文中找得到的部分）
    function highlight(el, title, words) {
      const lower = title.toLowerCase();
      const marks = new Array(title.length).fill(false);
      words.forEach((w) => {
        if (!w) return;
        let at = lower.indexOf(w);
        while (at !== -1) { for (let k = at; k < at + w.length; k += 1) marks[k] = true; at = lower.indexOf(w, at + w.length); }
      });
      let buf = ''; let on = false;
      const flush = () => {
        if (!buf) return;
        if (on) { const m = document.createElement('mark'); m.textContent = buf; el.appendChild(m); } else el.appendChild(document.createTextNode(buf));
        buf = '';
      };
      for (let k = 0; k < title.length; k += 1) { if (marks[k] !== on) { flush(); on = marks[k]; } buf += title[k]; }
      flush();
    }

    function close() { results.hidden = true; }
    function pick(i) {
      onPick(i);
      input.value = '';
      update();
      input.blur();
    }
    function update() {
      const raw = input.value.trim();
      clear.hidden = !raw;
      results.innerHTML = '';
      if (!raw) { matches = []; status.textContent = `共 ${items.length} ${unit}，輸入關鍵字找找看`; close(); return; }
      const words = raw.toLowerCase().split(/\s+/);
      const keys = words.map(norm).filter(Boolean);
      const whole = norm(raw);
      matches = index.filter((x) => keys.every((k) => x.key.includes(k)))
        // 開頭就符合的排前面，其餘照清單順序
        .sort((a, b) => (b.key.startsWith(whole) - a.key.startsWith(whole)) || a.i - b.i);
      if (!matches.length) {
        status.textContent = `清單裡沒有「${raw}」，試試只打作品名的一部分`;
        close();
        return;
      }
      status.textContent = `找到 ${matches.length} ${unit}，點一下就播放（按 Enter 播第一${unit}）`;
      const current = getCurrent();
      matches.forEach((x) => {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        const name = document.createElement('span');
        name.className = 'name';
        highlight(name, x.title, words);
        const no = document.createElement('span');
        no.className = 'no';
        no.textContent = x.i + 1;
        li.append(no, name);
        if (x.i === current) { li.classList.add('active'); li.insertAdjacentHTML('beforeend', '<span class="tag">播放中</span>'); }
        li.addEventListener('click', () => pick(x.i));
        results.appendChild(li);
      });
      results.hidden = false;
      results.scrollTop = 0;
    }

    input.addEventListener('input', update);
    input.addEventListener('focus', () => { if (input.value.trim()) update(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && matches.length) { e.preventDefault(); pick(matches[0].i); }
      if (e.key === 'Escape') { input.value = ''; update(); }
    });
    clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
    // 點搜尋區以外的地方就收起結果（保留輸入的文字）
    document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target)) close(); });
    update();
  }
  function nextIndex(mode, index, length, step) {
    if (mode === 'SHUFFLE' && length > 1) {
      let n;
      do { n = Math.floor(Math.random() * length); } while (n === index);
      return n;
    }
    return (index + step + length) % length;
  }
  function setupLoop(btn, textEl, key) {
    let mode = store.get(key, 'ALL');
    if (!LOOP_MODES.includes(mode)) mode = 'ALL';
    const paint = () => { btn.textContent = LOOP_LABEL[mode][0]; textEl.textContent = LOOP_LABEL[mode][1]; };
    btn.addEventListener('click', () => {
      mode = LOOP_MODES[(LOOP_MODES.indexOf(mode) + 1) % LOOP_MODES.length];
      store.set(key, mode);
      paint();
    });
    paint();
    return () => mode;
  }

  // ---------- 音樂 ----------
  const mList = $('m-list');
  let mIndex = -1;          // 目前歌曲在 queue 裡的位置
  let queue = songs;        // 目前選的歌單（全部歌曲或自訂歌單），上一首／下一首照這個順序
  let curSong = null;
  const mLoop = setupLoop($('m-loop'), $('m-loop-text'), 'musicLoop');

  function loadSong(i, autoplay = true, dir = 1, src = null) {
    if (!queue.length) return;
    if (!playable(queue[i])) {
      // 離線時往同一個方向找下一首已存到手機的歌
      let j = i;
      for (let k = 0; k < queue.length && !playable(queue[j]); k += 1) j = (j + dir + queue.length) % queue.length;
      if (!playable(queue[j])) { offNote(true, '📴 目前離線，這個歌單沒有已存到手機的歌'); return; }
      i = j;
    }
    mIndex = i;
    const s = queue[i];
    curSong = s;
    if (autoplay && !document.hidden) trackMediaLoading(audio);
    if (curBlob && curBlob !== src) { URL.revokeObjectURL(curBlob); curBlob = null; }
    if (src) curBlob = src;
    audio.src = src || s.audio;
    $('m-title').textContent = s.title;
    $('m-dl').href = s.audio;
    $('m-dl').setAttribute('download', `${s.title}.${(s.audio.split('.').pop() || 'm4a').toLowerCase()}`);
    $('m-seek').value = 0;
    $('m-cur').textContent = '0:00';
    markActive(mList, i);
    store.set('musicId', s.id);
    updateMediaSession(s);
    if (autoplay) audio.play().catch(() => {});
  }
  const playSong = () => (mIndex < 0 ? loadSong(0) : audio.play().catch(() => {}));
  $('m-play').addEventListener('click', () => (audio.paused ? playSong() : audio.pause()));
  $('m-prev').addEventListener('click', () => loadSong(nextIndex(mLoop(), Math.max(mIndex, 0), queue.length, -1), true, -1));
  $('m-next').addEventListener('click', () => playNext());
  audio.addEventListener('ended', () => (mLoop() === 'ONE' ? audio.play() : playNext()));

  // ---------- 背景連續播放 ----------
  // iPhone 鎖定畫面或切到別的 App 時，歌一停網頁就會被暫停，下一首要等回到 App 才開始下載，所以會卡很久。
  // 解法：每首歌開始播時，就先把「下一首」整首下載到記憶體；播完直接換上，不用等網路，中間不會停。
  let curBlob = null;       // 目前播放中、從記憶體播的那首（換歌時釋放）
  let plan = null;          // 預先準備的下一首：{ from, index, song, mode, url }
  function planNext() {
    if (!queue.length) return null;
    const mode = mLoop();
    if (plan && plan.from === curSong && plan.mode === mode && queue[plan.index] === plan.song) return plan;
    let j = nextIndex(mode, mIndex, queue.length, 1);
    for (let k = 0; k < queue.length && !playable(queue[j]); k += 1) j = (j + 1) % queue.length;
    dropPlan();
    plan = { from: curSong, index: j, song: queue[j], mode, url: null, loading: false };
    return plan;
  }
  function dropPlan() {
    if (plan && plan.url && plan.url !== curBlob) URL.revokeObjectURL(plan.url);
    plan = null;
  }
  async function prefetchNext() {
    const p = planNext();
    if (!p || p.url || p.loading) return;
    p.loading = true;
    try {
      const res = await fetch(p.song.audio, { loading: false, mode: 'cors' });   // 存在手機的歌會由 service worker 直接給
      if (res.status === 200) {
        const url = URL.createObjectURL(await res.blob());
        if (plan === p) p.url = url; else URL.revokeObjectURL(url);
      }
    } catch { /* 下載失敗就照舊從網路播 */ }
    p.loading = false;
  }
  function playNext() {
    const p = planNext();
    if (!p) return;
    plan = null;   // 用掉了
    loadSong(p.index, true, 1, p.url);
  }
  audio.addEventListener('playing', () => { prefetchNext(); });

  const setPlaying = (on) => {
    $('m-play').textContent = on ? '⏸' : '▶';
    $('disc').classList.toggle('spin', on);
    $('eq').classList.toggle('on', on);
  };
  audio.addEventListener('play', () => setPlaying(true));
  audio.addEventListener('pause', () => setPlaying(false));

  // 進度條：拖曳時不被 timeupdate 覆蓋
  const seek = $('m-seek');
  let seeking = false;
  seek.addEventListener('input', () => { seeking = true; $('m-cur').textContent = fmt((seek.value / 1000) * audio.duration); });
  seek.addEventListener('change', () => {
    if (isFinite(audio.duration)) audio.currentTime = (seek.value / 1000) * audio.duration;
    seeking = false;
  });
  audio.addEventListener('timeupdate', () => {
    if (seeking || !isFinite(audio.duration)) return;
    seek.value = (audio.currentTime / audio.duration) * 1000;
    $('m-cur').textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('loadedmetadata', () => { $('m-dur').textContent = fmt(audio.duration); });

  // 音量 (iPhone 不允許網頁調整音量，只能用實體按鍵，CSS 會隱藏這一列)
  const vol = $('m-vol');
  let lastVol = 100;
  const applyVol = (v) => {
    v = Number(v);
    audio.volume = v / 100;
    video.volume = v / 100;
    vol.value = v;
    $('m-mute').textContent = v === 0 ? '🔇' : '🔊';
    store.set('volume', v);
  };
  vol.addEventListener('input', () => applyVol(vol.value));
  $('m-mute').addEventListener('click', () => {
    if (Number(vol.value) > 0) { lastVol = Number(vol.value); applyVol(0); } else applyVol(lastVol || 100);
  });

  // 搜尋找的是全部歌曲；不在目前歌單裡的歌，先切回「全部歌曲」再播放
  setupFinder('m', songs, (i) => {
    let at = queue.indexOf(songs[i]);
    if (at < 0) { selectList('all'); at = i; }
    loadSong(at);
  }, () => (curSong ? songs.indexOf(curSong) : -1), '首');

  // ---------- 自訂歌單（存在伺服器，換手機也看得到） ----------
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';
  async function api(url, body) {
    if (!isOnline()) throw new Error('目前離線，暫時不能修改，連上網路後再試');
    const opts = { credentials: 'same-origin' };
    if (body !== undefined) {
      opts.method = 'POST';
      opts.headers = { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() };
      opts.body = JSON.stringify(body);
    }
    const res = await fetch(url, opts);
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok === false) throw new Error(json.error || '操作失敗，請稍後再試');
    return json;
  }
  const openSheet = (id) => { $(id).hidden = false; document.body.classList.add('sheet-open'); };
  const closeSheet = (id) => {
    $(id).hidden = true;
    if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open');
  };
  ['s-sheet', 'm-add', 'm-edit'].forEach((id) => {
    $(id).addEventListener('click', (e) => { if (e.target.id === id || e.target.closest('[data-close]')) closeSheet(id); });
  });
  const showError = (id, msg) => { const el = $(id); el.textContent = msg || ''; el.hidden = !msg; };

  const songById = new Map(songs.map((s) => [s.id, s]));
  let myLists = [];
  let listId = store.get('musicList', 'all');
  const currentList = () => myLists.find((p) => p.id === listId) || null;

  function paintLists() {
    const cur = currentList();
    const box = $('m-lists');
    box.innerHTML = '';
    const chip = (id, label, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip';
      b.classList.toggle('active', cur ? cur.id === id : id === 'all');
      b.textContent = `${label} `;
      const count = document.createElement('b');
      count.textContent = n;
      b.append(count);
      b.addEventListener('click', () => selectList(id));
      box.appendChild(b);
    };
    chip('all', '🎵 全部歌曲', songs.length);
    myLists.forEach((p) => chip(p.id, p.name, p.songs.filter((id) => songById.has(id)).length));
    $('m-list-bar').hidden = !cur;
    $('m-list-empty').hidden = !cur || queue.length > 0;
    if (cur) $('m-list-info').textContent = `「${cur.name}」共 ${queue.length} 首・依加入順序播放`;
  }

  // 每一列右邊的按鈕：全部歌曲＝＋ 加入歌單（已在某個歌單裡顯示 ✓）；自訂歌單＝✕ 移出這個歌單
  function decorateSong(li, song) {
    li.classList.toggle('unavail', !playable(song));
    if (saved.has(song.audio)) {
      const mark = document.createElement('span');
      mark.className = 'saved-mark';
      mark.textContent = '📱';
      mark.title = '已存到手機，可離線播放';
      li.insertBefore(mark, li.querySelector('.playing'));
    }
    const cur = currentList();
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'li-act';
    if (cur) {
      btn.classList.add('rm');
      btn.textContent = '✕';
      btn.title = `從「${cur.name}」移除`;
      btn.addEventListener('click', (e) => { e.stopPropagation(); toggleSong(cur, song, false).catch((err) => alert(err.message)); });
    } else {
      const inAny = myLists.some((p) => p.songs.includes(song.id));
      btn.classList.toggle('on', inAny);
      btn.textContent = inAny ? '✓' : '＋';
      btn.title = '加入歌單';
      btn.addEventListener('click', (e) => { e.stopPropagation(); openAdd(song); });
    }
    btn.setAttribute('aria-label', btn.title);
    li.appendChild(btn);
  }

  // 重新整理目前的播放清單；resetPage＝切換歌單時回到第一頁（或正在播的那一頁）
  function refreshQueue(resetPage) {
    const cur = currentList();
    queue = cur ? cur.songs.map((id) => songById.get(id)).filter(Boolean) : songs;
    mIndex = curSong ? queue.indexOf(curSong) : -1;
    const state = lists[mList.id];
    if (state) {
      state.active = mIndex;
      if (resetPage) state.pager.reset();
    }
    renderList(mList, queue, (i) => loadSong(i), decorateSong);
    // 翻到正在播的那一頁（不捲動畫面）
    if (resetPage && mIndex >= 0) lists[mList.id].pager.showIndex(mIndex, queue.length);
    paintLists();
    paintOffline();
  }
  function selectList(id) {
    listId = id;
    store.set('musicList', id);
    refreshQueue(true);
  }
  function replaceList(p) {
    const i = myLists.findIndex((x) => x.id === p.id);
    if (i >= 0) myLists[i] = p; else myLists.push(p);
  }
  async function toggleSong(p, song, on) {
    const res = await api(`/api/playlists/${p.id}/`, on ? { add: song.id } : { remove: song.id });
    replaceList(res.playlist);
    refreshQueue(false);
    return res.playlist;
  }

  // 加入歌單視窗：每個歌單一個開關，打開＝加入、關掉＝移出
  let addSong = null;
  function paintAdd() {
    const box = $('m-add-lists');
    box.innerHTML = '';
    box.hidden = !myLists.length;
    $('m-add-name').placeholder = myLists.length ? '或建立新歌單並加入這首' : '還沒有歌單，輸入名稱建立一個';
    myLists.forEach((p) => {
      const row = document.createElement('label');
      row.className = 'toggle-row';
      const name = document.createElement('span');
      name.textContent = p.name;
      const n = document.createElement('em');
      n.textContent = `${p.songs.length} 首`;
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = p.songs.includes(addSong.id);
      cb.addEventListener('change', async () => {
        cb.disabled = true;
        showError('m-add-error', '');
        try {
          const np = await toggleSong(myLists.find((x) => x.id === p.id), addSong, cb.checked);
          n.textContent = `${np.songs.length} 首`;
        } catch (err) {
          cb.checked = !cb.checked;
          showError('m-add-error', err.message);
        }
        cb.disabled = false;
      });
      row.append(name, n, cb);
      box.appendChild(row);
    });
  }
  function openAdd(song) {
    addSong = song;
    $('m-add-song').textContent = `🎵 ${song.title}`;
    $('m-add-name').value = '';
    showError('m-add-error', '');
    paintAdd();
    openSheet('m-add');
  }
  $('m-add-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('m-add-name').value.trim();
    if (!name) { showError('m-add-error', '請輸入歌單名稱'); return; }
    try {
      const res = await api('/api/playlists/', { name, songs: [addSong.id] });
      replaceList(res.playlist);
      $('m-add-name').value = '';
      showError('m-add-error', '');
      paintAdd();
      refreshQueue(false);
    } catch (err) { showError('m-add-error', err.message); }
  });

  // 新增 / 改名 / 刪除歌單
  let editing = null;
  function openEdit(p) {
    editing = p;
    $('m-edit-title').textContent = p ? '✏️ 編輯歌單' : '＋ 新歌單';
    $('m-edit-name').value = p ? p.name : '';
    $('m-edit-delete').hidden = !p;
    showError('m-edit-error', '');
    openSheet('m-edit');
  }
  $('m-list-new').addEventListener('click', () => openEdit(null));
  $('m-list-edit').addEventListener('click', () => openEdit(currentList()));
  $('m-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('m-edit-name').value.trim();
    if (!name) { showError('m-edit-error', '請輸入歌單名稱'); return; }
    try {
      const res = editing ? await api(`/api/playlists/${editing.id}/`, { name }) : await api('/api/playlists/', { name });
      replaceList(res.playlist);
      closeSheet('m-edit');
      if (editing) refreshQueue(false); else selectList(res.playlist.id);
    } catch (err) { showError('m-edit-error', err.message); }
  });
  $('m-edit-delete').addEventListener('click', async () => {
    if (!editing || !window.confirm(`確定刪除歌單「${editing.name}」？（歌曲本身不會被刪除）`)) return;
    try {
      await api(`/api/playlists/${editing.id}/delete/`, {});
      myLists = myLists.filter((p) => p.id !== editing.id);
      closeSheet('m-edit');
      selectList('all');
    } catch (err) { showError('m-edit-error', err.message); }
  });

  // ---------- 離線聽歌：把歌存到手機（service worker 會改從手機播放），歌單也在手機存一份最近的副本 ----------
  const SONG_CACHE = 'ukiyo-offline-songs';
  const canSave = 'caches' in window && 'serviceWorker' in navigator;
  const saved = new Set();          // 已存到手機的音樂網址
  let saving = null;                // 下載中：{ stop: false }
  function isOnline() { return navigator.onLine !== false; }
  function playable(s) { return isOnline() || saved.has(s.audio); }
  const tellWorker = () => { if (navigator.serviceWorker && navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({ type: 'songs-changed' }); };
  function offNote(show, text) {
    const el = $('m-off-note');
    el.textContent = text || '📴 目前離線：只能播已存到手機的歌（📱），歌單暫時不能修改';
    el.hidden = !show;
  }
  async function paintOffline() {
    const box = $('m-offline');
    if (!canSave) { box.hidden = true; return; }
    box.hidden = false;
    const have = queue.filter((s) => saved.has(s.audio)).length;
    const name = currentList() ? '這個歌單' : '全部歌曲';
    $('m-off-info').textContent = saving ? `存到手機中… ${saving.done}／${saving.total} 首` : `📱 ${name}已存 ${have}／${queue.length} 首`;
    $('m-off-get').textContent = saving ? '⏹ 停止' : '📥 存到手機';
    $('m-off-get').hidden = !saving && (have === queue.length || !queue.length);
    $('m-off-get').disabled = !saving && !isOnline();
    $('m-off-del').hidden = !!saving || !have;
    offNote(!isOnline());
    if (navigator.storage && navigator.storage.estimate && !saving) {
      const est = await navigator.storage.estimate().catch(() => null);
      if (est && est.usage) $('m-off-info').textContent += `・手機已用 ${Math.round(est.usage / 1048576)} MB`;
    }
  }
  async function saveSongs() {
    const todo = queue.filter((s) => !saved.has(s.audio));
    if (!todo.length) return;
    const mb = Math.round(todo.length * 1.1);
    if (todo.length > 20 && !window.confirm(`要把 ${todo.length} 首存到手機嗎？約 ${mb} MB，建議連 Wi-Fi 再下載。`)) return;
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});   // 請瀏覽器不要自動清掉
    saving = { stop: false, done: 0, total: todo.length };
    let failed = 0;
    const cache = await caches.open(SONG_CACHE);
    for (const s of todo) {
      if (saving.stop) break;
      paintOffline();
      try {
        const res = await fetch(s.audio, { loading: false, mode: 'cors', cache: 'no-store' });
        if (res.status !== 200) throw new Error(res.status);
        await cache.put(s.audio, res);
        saved.add(s.audio);
      } catch {
        failed += 1;
        if (!isOnline()) break;
      }
      saving.done += 1;
    }
    saving = null;
    tellWorker();
    refreshQueue(false);
    if (failed) alert(`有 ${failed} 首沒存成功（可能是網路不穩或手機空間不足），可以再按一次「存到手機」補存。`);
  }
  async function removeSongs() {
    const list = queue.filter((s) => saved.has(s.audio));
    const name = currentList() ? `「${currentList().name}」` : '全部歌曲';
    if (!list.length || !window.confirm(`要把${name}已存到手機的 ${list.length} 首刪掉嗎？（之後播放會改用網路，可以再存回來）`)) return;
    const cache = await caches.open(SONG_CACHE);
    await Promise.all(list.map((s) => cache.delete(s.audio, { ignoreVary: true }).then(() => saved.delete(s.audio))));
    tellWorker();
    refreshQueue(false);
  }
  async function loadSaved() {
    if (!canSave) return;
    try {
      const cache = await caches.open(SONG_CACHE);
      const current = new Set(songs.map((s) => s.audio));
      for (const req of await cache.keys()) {
        // 影音庫已經換掉或刪掉的檔案：從手機清掉，不佔空間
        if (current.has(req.url)) saved.add(req.url); else await cache.delete(req);
      }
    } catch { /* 無痕模式等情況無法使用 */ }
    refreshQueue(false);
  }
  $('m-off-get').addEventListener('click', () => {
    if (saving) saving.stop = true; else saveSongs().catch((err) => { saving = null; alert(err.message); paintOffline(); });
  });
  $('m-off-del').addEventListener('click', () => removeSongs().catch((err) => alert(err.message)));
  window.addEventListener('online', () => { refreshQueue(false); loadMyLists(); });
  window.addEventListener('offline', () => refreshQueue(false));
  // 登出：刪掉手機裡的個人歌單副本；存的主頁與歌保留，沒網路時仍可以聽存在手機的歌（離線模式）
  const logout = document.querySelector('form[action$="/logout/"]');
  if (logout) logout.addEventListener('submit', () => {
    try { localStorage.removeItem('myLists'); } catch { /* 忽略 */ }
    store.set('loggedOut', true);
  });
  // 已登出、沒網路打開的是存在手機的主頁：不顯示帳號名稱，改標示離線模式
  function showLoggedOut(on) {
    $('u-name').textContent = on ? '📴 離線模式' : $('u-name').dataset.name;
    if (logout) logout.hidden = on;
  }
  if (store.get('loggedOut', false) && !isOnline()) showLoggedOut(true);

  // 背景讀取歌單（不顯示載入遮罩）；讀不到（離線）就用手機裡最近一次的副本
  function loadMyLists() {
    return fetch('/api/playlists/', { credentials: 'same-origin', loading: false, cache: 'no-store' })
      .then((r) => (r.ok && (r.headers.get('content-type') || '').includes('json') ? r.json() : Promise.reject()))
      .then((res) => {
        myLists = res.playlists || [];
        store.set('myLists', myLists);
        if (store.get('loggedOut', false)) { store.set('loggedOut', false); showLoggedOut(false); }
        refreshQueue(true);
      })
      .catch(() => {
        myLists = store.get('myLists', []);
        if (store.get('loggedOut', false)) showLoggedOut(true);
        refreshQueue(true);
      });
  }
  myLists = isOnline() ? [] : store.get('myLists', []);
  refreshQueue(false);
  loadMyLists();
  loadSaved();

  // ---------- 個人設定：要顯示哪些分頁 ----------
  const tabBtnOf = (name) => document.querySelector(`.tab[data-tab="${name}"]`);
  const toggles = [...document.querySelectorAll('#s-tabs input[data-tab]')];
  $('s-open').addEventListener('click', () => {
    toggles.forEach((cb) => { cb.checked = !tabBtnOf(cb.dataset.tab).hidden; });
    showError('s-error', '');
    openSheet('s-sheet');
  });
  toggles.forEach((cb) => cb.addEventListener('change', async () => {
    const hidden = toggles.filter((x) => !x.checked).map((x) => x.dataset.tab);
    toggles.forEach((x) => { x.disabled = true; });
    try {
      await api('/api/prefs/', { hidden_tabs: hidden });
      toggles.forEach((x) => {
        const btn = tabBtnOf(x.dataset.tab);
        btn.hidden = !x.checked;
        if (btn.hidden && btn.classList.contains('active')) tabBtnOf('music').click();
      });
      showError('s-error', '');
    } catch (err) {
      cb.checked = !cb.checked;
      showError('s-error', err.message);
    }
    toggles.forEach((x) => { x.disabled = false; });
  }));

  // ---------- 影片 ----------
  const vList = $('v-list');
  let vIndex = -1;
  const vLoop = setupLoop($('v-loop'), $('v-loop-text'), 'videoLoop');

  function loadVideo(i, autoplay = true) {
    if (!videos.length) return;
    vIndex = i;
    if (autoplay) trackMediaLoading(video);
    video.src = videos[i].video;
    $('v-title').textContent = videos[i].title;
    markActive(vList, i);
    store.set('videoIndex', i);
    if (autoplay) video.play().catch(() => {});
  }
  $('v-prev').addEventListener('click', () => loadVideo(nextIndex(vLoop(), Math.max(vIndex, 0), videos.length, -1)));
  $('v-next').addEventListener('click', () => loadVideo(nextIndex(vLoop(), vIndex, videos.length, 1)));
  video.addEventListener('ended', () => (vLoop() === 'ONE' ? video.play() : loadVideo(nextIndex(vLoop(), vIndex, videos.length, 1))));
  renderList(vList, videos, (i) => loadVideo(i));
  setupFinder('v', videos, (i) => loadVideo(i), () => vIndex, '部');

  // ---------- 鎖定畫面 / 耳機按鍵控制 ----------
  function updateMediaSession(s) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: s.title,
      artist: '動漫原聲',
      album: 'Ukiyo',
      artwork: [{ src: '/static/icons/icon-512.png', sizes: '512x512', type: 'image/png' }],
    });
  }
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', playSong);
    navigator.mediaSession.setActionHandler('pause', () => audio.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => $('m-prev').click());
    navigator.mediaSession.setActionHandler('nexttrack', () => $('m-next').click());
  }

  // ---------- 還原上次的狀態 (不自動播放，瀏覽器也不允許) ----------
  applyVol(store.get('volume', 100));
  const lastSong = songById.get(store.get('musicId', '')) || songs[store.get('musicIndex', -1)];
  if (lastSong && queue.includes(lastSong)) loadSong(queue.indexOf(lastSong), false);
  const lastVideo = store.get('videoIndex', -1);
  const videoOn = !tabBtnOf('video').hidden;   // 影片分頁關掉時不預先載入影片
  if (videoOn && lastVideo >= 0 && lastVideo < videos.length) loadVideo(lastVideo, false);
  // 指定分頁：網址 ?tab=plan（例如從邀請頁回來）優先，否則還原上次的分頁
  const params = new URLSearchParams(location.search);
  window.appLaunchParams = params;   // 給行程頁讀取 ?invite= 等參數（網址列稍後會清掉）
  const wantTab = params.get('tab') || store.get('tab', 'music');
  if (params.has('tab')) history.replaceState(null, '', location.pathname);
  const tabBtn = document.querySelector(`.tab[data-tab="${wantTab}"]`);
  if (tabBtn && !tabBtn.hidden && wantTab !== 'music') tabBtn.click();

  // 點通知時 App 已經開著：切到指定分頁，並交給該分頁處理其他參數（例如群組邀請）
  window.handleAppLink = (url) => {
    const p = new URL(url, location.origin).searchParams;
    const btn = document.querySelector(`.tab[data-tab="${p.get('tab')}"]`);
    if (btn) btn.click();
    window.dispatchEvent(new CustomEvent('app-link', { detail: p }));
  };
})();
