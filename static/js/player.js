// 宅日常 影音播放器：音樂 / 影片兩個分頁，各自有清單、循環模式與搜尋
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

  const LOOP_MODES = ['ALL', 'ONE', 'SHUFFLE'];
  const LOOP_LABEL = { ALL: ['🔁', '全部循環'], ONE: ['🔂', '單曲循環'], SHUFFLE: ['🔀', '隨機播放'] };
  const fmt = (t) => (isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}` : '0:00');

  // ---------- 分頁切換 ----------
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));
      document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('active', p.id === `panel-${tab.dataset.tab}`));
      // 切換分頁時暫停另一邊，避免兩個同時發聲
      if (tab.dataset.tab === 'music') video.pause(); else audio.pause();
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
  function bindSearch(inputEl, listEl) {
    inputEl.addEventListener('input', () => {
      const q = inputEl.value.trim().toLowerCase();
      listEl.querySelectorAll('li').forEach((li) => {
        li.hidden = Boolean(q) && !li.querySelector('.name').textContent.toLowerCase().includes(q);
      });
    });
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
  bindSearch($('m-search'), mList);

  // ---------- 影片 ----------
  const vList = $('v-list');
  let vIndex = -1;
  const vLoop = setupLoop($('v-loop'), $('v-loop-text'), 'videoLoop');

  function loadVideo(i, autoplay = true) {
    if (!videos.length) return;
    vIndex = i;
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
  bindSearch($('v-search'), vList);

  // ---------- 鎖定畫面 / 耳機按鍵控制 ----------
  function updateMediaSession(s) {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: s.title,
      artist: '動漫原聲',
      album: '宅日常',
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
  if (store.get('tab', 'music') === 'video') document.querySelector('.tab[data-tab="video"]').click();
})();
