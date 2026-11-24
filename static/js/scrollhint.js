// 可滑動的提示（舊瀏覽器備援）：新瀏覽器用 CSS 捲動驅動動畫就會淡出邊緣（見 app.css 的 .chips），
// 不支援的（例如 iOS 18 以前的 Safari）由這裡依捲動位置加上 more-start／more-end，CSS 再依此淡出。
(() => {
  if (window.CSS && CSS.supports && CSS.supports('animation-timeline', 'scroll()')) return;
  const SEL = '.chips:not(.wrap)';
  function mark(el) {
    const max = el.scrollWidth - el.clientWidth;
    el.classList.toggle('more-start', max > 1 && el.scrollLeft > 1);
    el.classList.toggle('more-end', max > 1 && el.scrollLeft < max - 1);
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
