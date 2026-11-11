// 全螢幕看圖：左右滑動（手指拖曳）、左右箭頭、鍵盤 ← → Esc、往下滑關閉
(() => {
  const box = document.createElement('div');
  box.className = 'iv';
  box.hidden = true;
  box.innerHTML = `
    <div class="iv-top"><span class="iv-title"></span><span class="iv-count"></span><button class="iv-close" type="button" aria-label="關閉">✕</button></div>
    <div class="iv-stage"><div class="iv-track"></div></div>
    <button class="iv-nav prev" type="button" aria-label="上一張">‹</button>
    <button class="iv-nav next" type="button" aria-label="下一張">›</button>
    <div class="iv-dots"></div>`;
  document.body.appendChild(box);
  const track = box.querySelector('.iv-track');
  const stage = box.querySelector('.iv-stage');
  let urls = [];
  let index = 0;

  function go(i, animate = true) {
    index = Math.max(0, Math.min(urls.length - 1, i));
    track.style.transition = animate ? 'transform .3s ease' : 'none';
    track.style.transform = `translateX(${-index * 100}%)`;
    box.querySelector('.iv-count').textContent = urls.length > 1 ? `${index + 1}／${urls.length}` : '';
    box.querySelector('.prev').hidden = index === 0;
    box.querySelector('.next').hidden = index >= urls.length - 1;
    box.querySelectorAll('.iv-dots i').forEach((d, k) => d.classList.toggle('on', k === index));
  }

  function open(list, start = 0, title = '') {
    urls = (list || []).filter(Boolean);
    if (!urls.length) return;
    track.innerHTML = urls.map((u) => `<div class="iv-slide"><img src="${u.replace(/"/g, '&quot;')}" alt="" referrerpolicy="no-referrer" draggable="false"></div>`).join('');
    box.querySelector('.iv-title').textContent = title;
    box.querySelector('.iv-dots').innerHTML = urls.length > 1 ? urls.map(() => '<i></i>').join('') : '';
    box.hidden = false;
    box.style.opacity = '';
    document.body.classList.add('sheet-open');
    go(start, false);
  }
  function close() {
    box.hidden = true;
    track.innerHTML = '';
    document.body.classList.remove('sheet-open');
  }

  box.querySelector('.iv-close').addEventListener('click', close);
  box.querySelector('.prev').addEventListener('click', () => go(index - 1));
  box.querySelector('.next').addEventListener('click', () => go(index + 1));
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(index - 1);
    if (e.key === 'ArrowRight') go(index + 1);
  });

  // 手指（或滑鼠）拖曳：左右換張、往下拉關閉
  let sx = 0;
  let sy = 0;
  let dx = 0;
  let dy = 0;
  let dragging = false;
  let axis = '';
  stage.addEventListener('pointerdown', (e) => {
    dragging = true;
    axis = '';
    sx = e.clientX;
    sy = e.clientY;
    dx = 0;
    dy = 0;
    stage.setPointerCapture(e.pointerId);
    track.style.transition = 'none';
  });
  stage.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dx = e.clientX - sx;
    dy = e.clientY - sy;
    if (!axis && Math.hypot(dx, dy) > 8) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'x') {
      const edge = (index === 0 && dx > 0) || (index === urls.length - 1 && dx < 0);
      track.style.transform = `translateX(calc(${-index * 100}% + ${edge ? dx / 3 : dx}px))`;
    } else if (axis === 'y' && dy > 0) {
      track.style.transform = `translateX(${-index * 100}%) translateY(${dy}px)`;
      box.style.opacity = String(Math.max(0.3, 1 - dy / 400));
    }
  });
  const end = () => {
    if (!dragging) return;
    dragging = false;
    box.style.opacity = '';
    const w = stage.clientWidth;
    if (axis === 'x' && Math.abs(dx) > Math.min(80, w * 0.18)) go(index + (dx < 0 ? 1 : -1));
    else if (axis === 'y' && dy > 120) close();
    else go(index);
  };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);

  window.ImageViewer = { open, close };
})();
