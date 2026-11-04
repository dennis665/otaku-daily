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
  function renderList(listEl, items, onPick) {
    listEl.innerHTML = '';
    items.forEach((item, i) => {
      const li = document.createElement('li');
      li.dataset.index = i;
      li.innerHTML = '<span class="no"></span><span class="name"></span><span class="playing">▶</span>';
      li.querySelector('.no').textContent = i + 1;
      li.querySelector('.name').textContent = item.title;
      li.addEventListener('click', () => onPick(i));
      listEl.appendChild(li);
    });
  }
  function markActive(listEl, index) {
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
  let mIndex = -1;
  const mLoop = setupLoop($('m-loop'), $('m-loop-text'), 'musicLoop');

  function loadSong(i, autoplay = true) {
    if (!songs.length) return;
    mIndex = i;
    const s = songs[i];
    if (autoplay) trackMediaLoading(audio);
    audio.src = s.audio;
    $('m-title').textContent = s.title;
    $('m-dl').href = s.audio;
    $('m-dl').setAttribute('download', `${s.title}.mp3`);
    $('m-seek').value = 0;
    $('m-cur').textContent = '0:00';
    markActive(mList, i);
    store.set('musicIndex', i);
    updateMediaSession(s);
    if (autoplay) audio.play().catch(() => {});
  }
  const playSong = () => (mIndex < 0 ? loadSong(0) : audio.play().catch(() => {}));
  $('m-play').addEventListener('click', () => (audio.paused ? playSong() : audio.pause()));
  $('m-prev').addEventListener('click', () => loadSong(nextIndex(mLoop(), Math.max(mIndex, 0), songs.length, -1)));
  $('m-next').addEventListener('click', () => loadSong(nextIndex(mLoop(), mIndex, songs.length, 1)));
  audio.addEventListener('ended', () => (mLoop() === 'ONE' ? audio.play() : loadSong(nextIndex(mLoop(), mIndex, songs.length, 1))));

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

  renderList(mList, songs, (i) => loadSong(i));
  setupFinder('m', songs, (i) => loadSong(i), () => mIndex, '首');

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
  const lastSong = store.get('musicIndex', -1);
  if (lastSong >= 0 && lastSong < songs.length) loadSong(lastSong, false);
  const lastVideo = store.get('videoIndex', -1);
  if (lastVideo >= 0 && lastVideo < videos.length) loadVideo(lastVideo, false);
  // 指定分頁：網址 ?tab=plan（例如從邀請頁回來）優先，否則還原上次的分頁
  const params = new URLSearchParams(location.search);
  const wantTab = params.get('tab') || store.get('tab', 'music');
  if (params.has('tab')) history.replaceState(null, '', location.pathname);
  const tabBtn = document.querySelector(`.tab[data-tab="${wantTab}"]`);
  if (tabBtn && wantTab !== 'music') tabBtn.click();
})();
