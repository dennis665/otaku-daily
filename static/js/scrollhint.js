// 可滑動的提示：橫向標籤列（.chips，捲軸隱藏）還有內容的那一邊顯示淡色箭頭 ‹ ›，點箭頭往那邊滑
// - 每個標籤列外面包一層 .chips-box 放箭頭（箭頭若放在標籤列裡面會被邊緣淡出遮掉）
// - 邊緣淡出：新瀏覽器用 CSS 捲動驅動動畫（app.css 的 .chips）；不支援的舊瀏覽器（例如 iOS 18 以前）
//   由這裡在標籤列加 more-start／more-end，CSS 依此淡出
(() => {
  const SEL = '.chips:not(.wrap)';
  const cssFade = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()'));

  function wrap(el) {
    if (el.parentElement && el.parentElement.classList.contains('chips-box')) return el.parentElement;
    const box = document.createElement('div');
    box.className = 'chips-box';
    el.before(box);
    box.append(el);
    ['start', 'end'].forEach((side) => {
      const a = document.createElement('span');
      a.className = `chips-arrow ${side}`;
      a.textContent = side === 'start' ? '‹' : '›';
      a.setAttribute('aria-hidden', 'true');   // 只是提示，用手滑或螢幕閱讀器都不影響
      a.addEventListener('click', () => el.scrollBy({ left: (side === 'start' ? -1 : 1) * el.clientWidth * 0.7, behavior: 'smooth' }));
      box.append(a);
    });
    return box;
  }
  function mark(el) {
    const box = wrap(el);
    const max = el.scrollWidth - el.clientWidth;
    const start = max > 1 && el.scrollLeft > 1;
    const end = max > 1 && el.scrollLeft < max - 1;
    box.classList.toggle('more-start', start);
    box.classList.toggle('more-end', end);
    if (!cssFade) {
      el.classList.toggle('more-start', start);
      el.classList.toggle('more-end', end);
    }
  }
  let queued = false;
  const markAll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; document.querySelectorAll(SEL).forEach(mark); });
  };
  // 捲動事件不會冒泡，用捕捉階段在 document 一次接住所有標籤列
  document.addEventListener('scroll', (e) => { if (e.target.matches && e.target.matches(SEL)) mark(e.target); }, { capture: true, passive: true });
  window.addEventListener('resize', markAll);
  const start = () => {
    // 標籤是程式畫出來的（歌單、篩選…）、切分頁時才看得到寬度：內容或顯示狀態變了就重算
    new MutationObserver(markAll).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden', 'class'] });
    markAll();
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
