// 🎞 AI 動畫分頁：播放原創動畫作品
// - 一開始播放（還沒載入到可以播）時顯示載入遮罩；播放中途的緩衝不遮罩
// - 播放作品時暫停音樂與影片分頁；切到別的分頁時暫停作品
(() => {
  const vids = [...document.querySelectorAll('.wk-video')];
  if (!vids.length) return;
  const others = () => [document.getElementById('audio'), document.getElementById('video')].filter(Boolean);

  vids.forEach((v) => {
    v.addEventListener('play', () => {
      others().forEach((m) => m.pause());
      vids.forEach((x) => { if (x !== v) x.pause(); });
      if (v.readyState < 3 && window.AppLoading) {   // 還沒緩衝到可以播：遮罩到可以播放或失敗為止
        const done = window.AppLoading.start();
        const finish = () => { ['playing', 'canplay', 'error', 'pause'].forEach((e) => v.removeEventListener(e, finish)); done(); };
        ['playing', 'canplay', 'error', 'pause'].forEach((e) => v.addEventListener(e, finish));
      }
    });
    v.addEventListener('error', () => {
      const card = v.closest('.wk-card');
      if (card && !card.querySelector('.alert')) card.insertAdjacentHTML('beforeend', '<p class="alert">影片載入失敗，請檢查網路後再試一次。</p>');
    }, true);
  });

  // 切換分頁：離開 AI 動畫就暫停
  document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
    if (tab.dataset.tab !== 'works') vids.forEach((v) => v.pause());
  }));
  // 音樂開始播時也暫停作品（例如從鎖定畫面按播放）
  others().forEach((m) => m.addEventListener('play', () => vids.forEach((v) => v.pause())));
})();
