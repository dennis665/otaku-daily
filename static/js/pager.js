// Ukiyo 共用分頁元件：清單上下各一組「第 X / 共 Y 頁（N 筆）・每頁筆數・上一頁・跳至・下一頁」
// 用法：const pager = Pager.create({ key: 'music', top: 元素, bottom: 元素, onChange: (page, size) => {...} });
//      pager.update({ page, total })   // 重新畫頁碼（total = 總筆數）
// 每頁筆數記在這台裝置（localStorage，鍵為 pager:<key>）
(() => {
  const SIZES = [5, 10, 20, 50];
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  function create({ key, top, bottom, onChange, defaultSize = 20 }) {
    let size = defaultSize;
    try { size = Number(localStorage.getItem(`pager:${key}`)) || defaultSize; } catch { /* 無痕模式 */ }
    if (!SIZES.includes(size)) size = defaultSize;
    let page = 1;
    let pages = 1;
    let total = 0;
    const bars = [top, bottom].filter(Boolean);

    function go(p) {
      p = Math.min(Math.max(1, p), pages);
      if (p === page) return;
      page = p;
      onChange(page, size);
    }

    function render() {
      bars.forEach((bar, idx) => {
        bar.innerHTML = '';
        bar.classList.add('pager');
        bar.hidden = total === 0;
        const info = el('div', 'pg-info');
        info.append(el('span', null, '每頁'));
        const sel = el('select');
        sel.setAttribute('aria-label', '每頁筆數');
        SIZES.forEach((s) => sel.append(new Option(`${s} 筆`, s)));
        sel.value = size;
        sel.addEventListener('change', () => {
          size = Number(sel.value);
          try { localStorage.setItem(`pager:${key}`, size); } catch { /* 無痕模式 */ }
          page = 1;
          onChange(page, size);
        });
        info.append(sel, el('b', 'pg-count', `第 ${page} / 共 ${pages} 頁（${total} 筆）`));

        const nav = el('div', 'pg-nav');
        const prev = el('button', 'btn ghost sm', '‹ 上一頁');
        prev.type = 'button';
        prev.disabled = page <= 1;
        prev.addEventListener('click', () => { go(page - 1); if (idx === 1) bars[0].scrollIntoView({ block: 'start' }); });
        const jump = el('select');
        jump.setAttribute('aria-label', '跳至頁數');
        for (let p = 1; p <= pages; p += 1) jump.append(new Option(`第 ${p} 頁`, p));
        jump.value = page;
        jump.addEventListener('change', () => { go(Number(jump.value)); if (idx === 1) bars[0].scrollIntoView({ block: 'start' }); });
        const next = el('button', 'btn ghost sm', '下一頁 ›');
        next.type = 'button';
        next.disabled = page >= pages;
        next.addEventListener('click', () => { go(page + 1); if (idx === 1) bars[0].scrollIntoView({ block: 'start' }); });
        nav.append(prev, el('span', 'pg-jump-label', '跳至'), jump, next);
        bar.append(info, nav);
      });
    }

    return {
      get page() { return page; },
      get size() { return size; },
      /** 回到第一頁（不觸發 onChange） */
      reset() { page = 1; },
      /** 畫面上的頁數：page 由呼叫端決定（伺服器回傳），total 為總筆數 */
      update(state) {
        total = state.total;
        pages = Math.max(1, Math.ceil(total / size));
        page = Math.min(Math.max(1, state.page || page), pages);
        render();
      },
      /** 前端分頁用：取出目前這一頁的項目，順便更新頁碼 */
      slice(items) {
        total = items.length;
        pages = Math.max(1, Math.ceil(total / size));
        page = Math.min(page, pages);
        render();
        return items.slice((page - 1) * size, page * size);
      },
      /** 前端分頁用：跳到含有第 index 項的那一頁（例如換歌時跳到正在播的歌） */
      showIndex(index, count) {
        const p = Math.floor(index / size) + 1;
        if (p !== page && p >= 1 && p <= Math.max(1, Math.ceil(count / size))) { page = p; onChange(page, size); }
      },
    };
  }

  window.Pager = { create };
})();
