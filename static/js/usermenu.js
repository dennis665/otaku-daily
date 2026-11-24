// 頁首帳號選單：點暱稱展開，選了項目、點外面或按 Esc 就收起來。
// 選單裡的按鈕沿用原本的 id（x-open、s-open、n-open），各功能的程式不用改。
(() => {
  const btn = document.getElementById('u-btn');
  const menu = document.getElementById('u-menu');
  if (!btn || !menu) return;

  function toggle(open) {
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle(menu.hidden);
    if (!menu.hidden) {
      const first = [...menu.querySelectorAll('.u-item')].find((x) => x.offsetParent);
      if (first && matchMedia('(hover: hover)').matches) first.focus();
    }
  });
  // 選了項目（項目自己的動作先執行）或按返回鍵（backclose.js 會按 [data-close]）就收起來
  menu.addEventListener('click', (e) => { if (e.target.closest('.u-item, [data-close]')) toggle(false); });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target)) toggle(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { toggle(false); btn.focus(); }
  });
})();
