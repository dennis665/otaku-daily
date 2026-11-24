// 返回鍵／返回手勢先關掉最上層的視窗（Android 的返回鍵、手機瀏覽器左右滑返回），而不是直接離開 App
// 做法：視窗打開時在瀏覽紀錄多放一筆，按返回時瀏覽器退回這一筆（觸發 popstate），我們就幫忙按那個視窗的關閉鈕；
// 視窗被其他方式關掉（按 ✕、點外面）時，把多放的那一筆退掉，瀏覽紀錄保持乾淨。
// 各視窗原本的開關程式都不用改：這裡只觀察視窗的 hidden 屬性。
(() => {
  // 會蓋住畫面的視窗；新增這類視窗時加進來（關閉鈕也要加進 CLOSE）
  const SEL = '.sheet-backdrop, #g-pick, #g-detail, #g-stage, .iv, #u-menu';
  // 按返回時要按的關閉鈕（抽卡動畫的「略過／返回」：播放中按返回＝略過到結果，再按一次才關閉）
  const CLOSE = '[data-close], #g-pick-close, #g-detail-close, #g-skip, .iv-close';
  const stack = [];   // 目前打開的視窗，依打開順序
  let depth = 0;      // 我們在瀏覽紀錄裡多放了幾筆
  let ignore = 0;     // 我們自己退回瀏覽紀錄造成的 popstate，要略過
  let queued = false;

  const isOpen = (el) => el.isConnected && !el.hidden;
  function sync() {
    queued = false;
    const open = [...document.querySelectorAll(SEL)].filter(isOpen);
    for (let i = stack.length - 1; i >= 0; i -= 1) if (!open.includes(stack[i])) stack.splice(i, 1);
    open.forEach((el) => { if (!stack.includes(el)) stack.push(el); });
    // 一個關、一個開（例如選卡包後直接開始抽卡動畫）數量不變，就不用動瀏覽紀錄
    const diff = stack.length - depth;
    if (diff > 0) {
      for (let i = 0; i < diff; i += 1) history.pushState({ ukiyoSheet: true }, '');
    } else if (diff < 0) {
      ignore += 1;
      history.go(diff);
    }
    depth = stack.length;
  }
  const schedule = () => { if (!queued) { queued = true; setTimeout(sync, 0); } };

  window.addEventListener('popstate', () => {
    if (ignore > 0) { ignore -= 1; return; }
    if (!depth) return;
    depth -= 1;   // 使用者按返回，瀏覽器已經退掉一筆
    const top = stack[stack.length - 1];
    if (!top || !isOpen(top)) { schedule(); return; }
    const btn = top.querySelector(CLOSE);
    if (btn) btn.click();
    else {   // 沒有關閉鈕：點視窗外圍（大部分視窗點外面會關），再不行就直接藏起來
      top.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      if (isOpen(top)) top.hidden = true;
    }
    if (![...document.querySelectorAll(SEL)].some(isOpen)) document.body.classList.remove('sheet-open');
    schedule();   // 關不掉的（例如抽卡動畫只是略過到結果）會再補放一筆
  });

  const start = () => {
    new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
    schedule();
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
