// Ukiyo 行程小幫手：行程看板（即將到來 / 時間未定 / 歷史）、新增編輯、我有興趣、決定時間、群組
// 從 LINE 版移植：LINE 群組改成 Ukiyo 群組（邀請連結加入），分享改用手機分享選單或複製連結
(() => {
  const $ = (id) => document.getElementById(id);
  const tab = document.querySelector('.tab[data-tab="plan"]');
  const list = $('p-list');
  const count = $('p-count');
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';

  const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei' }).format(new Date());

  let data = { upcoming: [], tbd: [], history: [], groups: [], notify_choices: [], types: [] };
  let view = 'upcoming';
  let editing = null;      // 正在編輯的行程（null = 新增）
  let finalizing = null;   // 正在決定時間的行程

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const extLink = (cls, text, href) => { const a = el('a', cls, text); a.href = href; a.target = '_blank'; a.rel = 'noopener'; return a; };

  async function api(url, body) {
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

  // ---------- 時間顯示 ----------
  function whenText(it) {
    if (!it.date_time) return '時間未定';
    const [d, t] = it.date_time.split('T');
    const date = new Date(`${d}T00:00:00Z`);
    return `${date.getUTCMonth() + 1}/${date.getUTCDate()}（${WEEK[date.getUTCDay()]}）${t}`;
  }
  function badge(it) {
    if (!it.date_time) return { text: '時間未定', cls: '' };
    const d = it.date_time.slice(0, 10);
    const diff = Math.round((new Date(`${d}T00:00:00Z`) - new Date(`${today}T00:00:00Z`)) / 86400000);
    if (view === 'history' || diff < 0) return { text: '已結束', cls: 'done' };
    if (diff === 0) return { text: '今天', cls: 'hot' };
    if (diff === 1) return { text: '明天', cls: 'hot' };
    return { text: `${diff} 天後`, cls: diff <= 7 ? 'hot' : '' };
  }

  // ---------- 卡片 ----------
  function card(it) {
    const c = el('article', `ev plan-card${view === 'tbd' ? ' ev-soon' : ''}`);
    const head = el('div', 'ev-head');
    const b = badge(it);
    head.append(el('span', 'ev-type', `${it.type_label}・${it.group ? `👥 ${it.group.name}` : '🔒 個人'}`), el('span', `ev-badge ${b.cls}`, b.text));
    c.append(head, el('h3', 'ev-name', it.title));

    const info = el('ul', 'ev-info');
    info.append(el('li', null, `📅 ${whenText(it)}`));
    if (it.location) {
      const li = el('li');
      li.append(extLink(null, `📍 ${it.location}`, `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(it.location)}`));
      info.append(li);
    }
    it.links.forEach((l) => { const li = el('li'); li.append(extLink(null, `🔗 ${l.title || l.url}`, l.url)); info.append(li); });
    info.append(el('li', 'muted', `🙋 有興趣：${it.interested.length ? it.interested.join('、') : '還沒有人'}`));
    if (it.date_time && view !== 'history') info.append(el('li', 'muted', `⏰ 提醒：${it.notify_label}・建立者 ${it.creator}`));
    c.append(info);
    if (it.notes) c.append(el('p', 'ev-sum', it.notes));

    // 操作按鈕
    const acts = el('div', 'plan-acts');
    const btn = (text, fn, cls = '') => { const x = el('button', `act ${cls}`, text); x.type = 'button'; x.addEventListener('click', fn); acts.append(x); };
    if (view !== 'history') btn(it.i_am_interested ? '✅ 有興趣' : '🙋 我有興趣', () => toggleInterest(it), it.i_am_interested ? 'on' : '');
    if (view === 'tbd' && it.can_manage) btn('🗓 決定時間', () => openFinalize(it));
    if (view !== 'history' && it.can_manage) btn('✏️ 編輯', () => openForm(it));
    btn('📤 分享', () => shareIt(it));
    if (it.gcal_url && view !== 'history') { const a = extLink('act', '📆 日曆', it.gcal_url); acts.append(a); }
    if (view === 'history') btn('🙈 隱藏', () => hideIt(it));
    if (it.can_manage) btn('🗑', () => deleteIt(it), 'danger');
    c.append(acts);
    return c;
  }

  // 收到的群組邀請：顯示在行程頁最上方
  function renderInvites() {
    const box = $('p-invites');
    box.innerHTML = '';
    (data.invitations || []).forEach((inv) => {
      const row = el('div', 'invite-row');
      row.append(el('span', null, `📨 ${inv.inviter} 邀請你加入「${inv.group}」`));
      const yes = el('button', 'btn primary sm', '加入'); yes.type = 'button';
      const no = el('button', 'btn ghost sm', '婉拒'); no.type = 'button';
      yes.addEventListener('click', () => run(async () => { await api(`/plan/api/invitations/${inv.id}/accept/`, {}); await reload(); }));
      no.addEventListener('click', () => run(async () => { await api(`/plan/api/invitations/${inv.id}/decline/`, {}); await reload(); }));
      row.append(yes, no);
      box.append(row);
    });
  }

  function render() {
    renderInvites();
    const items = data[view] || [];
    $('p-tabs').querySelectorAll('.chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.view === view);
      chip.querySelector('b').textContent = (data[chip.dataset.view] || []).length || '';
    });
    count.textContent = data.upcoming.length + data.tbd.length + (data.invitations || []).length;
    list.innerHTML = '';
    if (!items.length) {
      const msg = { upcoming: '還沒有即將到來的行程，按「＋ 新增行程」或到「活動」頁把有興趣的活動加進來', tbd: '沒有時間未定的行程', history: '還沒有歷史行程' }[view];
      list.append(el('p', 'empty', msg));
    } else items.forEach((it) => list.append(card(it)));
  }

  async function reload() {
    data = await api('/plan/api/itineraries/');
    render();
  }

  // ---------- 操作 ----------
  async function run(fn) {
    try { await fn(); } catch (err) { alert(err.message); }
  }
  const toggleInterest = (it) => run(async () => { await api(`/plan/api/itineraries/${it.id}/interest/`, {}); await reload(); });
  const hideIt = (it) => run(async () => { await api(`/plan/api/itineraries/${it.id}/hide/`, {}); await reload(); });
  const deleteIt = (it) => {
    if (!confirm(`確定要刪除「${it.title}」？${it.group ? '群組成員都會看不到。' : ''}`)) return;
    run(async () => { await api(`/plan/api/itineraries/${it.id}/delete/`, {}); await reload(); });
  };
  async function shareIt(it) {
    const text = `${it.title}｜${whenText(it)}${it.location ? `｜${it.location}` : ''}`;
    if (navigator.share) {
      try { await navigator.share({ title: it.title, text, url: it.share_url }); } catch { /* 使用者取消 */ }
      return;
    }
    try { await navigator.clipboard.writeText(`${text}\n${it.share_url}`); alert('邀約連結已複製，貼到 LINE 給朋友吧！'); } catch { prompt('複製這個邀約連結：', it.share_url); }
  }

  // ---------- 視窗共用 ----------
  function openSheet(id) { $(id).hidden = false; document.body.classList.add('sheet-open'); }
  function closeSheet(id) { $(id).hidden = true; if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open'); }
  document.querySelectorAll('.sheet-backdrop').forEach((bd) => {
    bd.addEventListener('click', (e) => { if (e.target === bd || e.target.closest('[data-close]')) closeSheet(bd.id); });
  });
  const showError = (id, msg) => { const p = $(id); p.textContent = msg; p.hidden = !msg; };

  // ---------- 新增 / 編輯 ----------
  const form = $('p-form');
  function fillSelects() {
    $('p-type').innerHTML = '';
    data.types.forEach(([v, label]) => $('p-type').append(new Option(label, v)));
    $('p-group').innerHTML = '';
    $('p-group').append(new Option('🔒 只有我（個人行程）', ''));
    data.groups.forEach((g) => $('p-group').append(new Option(`👥 ${g.name}`, g.id)));
    $('p-notify').innerHTML = '';
    data.notify_choices.forEach(([v, label]) => $('p-notify').append(new Option(label, v)));
  }
  function addLinkRow(link = {}) {
    const row = el('div', 'link-row');
    const t = el('input'); t.placeholder = '名稱（可不填）'; t.value = link.title || ''; t.maxLength = 60; t.className = 'l-title';
    const u = el('input'); u.type = 'url'; u.placeholder = 'https://…'; u.value = link.url || ''; u.className = 'l-url';
    const x = el('button', 'icon sm', '✕'); x.type = 'button'; x.setAttribute('aria-label', '移除連結'); x.addEventListener('click', () => row.remove());
    row.append(t, u, x);
    $('p-links').append(row);
  }
  function syncTbd() { $('p-dt').disabled = $('p-tbd').checked; if ($('p-tbd').checked) $('p-dt').value = ''; }
  $('p-tbd').addEventListener('change', syncTbd);
  $('p-add-link').addEventListener('click', () => addLinkRow());

  function openForm(it = null, preset = {}) {
    editing = it;
    fillSelects();
    const v = it || { title: '', type: 'OTHER', group: null, date_time: '', location: '', notes: '', links: [], notify_minutes_before: 1440, ...preset };
    $('p-form-title').textContent = it ? '編輯行程' : '新增行程';
    form.elements.title.value = v.title;
    form.elements.type.value = v.type;
    form.elements.group_id.value = v.group ? v.group.id : (preset.group_id || '');
    form.elements.date_time.value = v.date_time || '';
    $('p-tbd').checked = !v.date_time && (it ? true : Boolean(preset.tbd));
    syncTbd();
    form.elements.location.value = v.location;
    form.elements.notes.value = v.notes;
    form.elements.notify_minutes_before.value = v.notify_minutes_before;
    $('p-links').innerHTML = '';
    v.links.forEach((l) => addLinkRow(l));
    showError('p-form-error', '');
    openSheet('p-sheet');
    if (!it) form.elements.title.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();   // 這裡自己用 fetch 送出（載入遮罩會自動顯示）
    if (!$('p-tbd').checked && !form.elements.date_time.value) { showError('p-form-error', '請選擇時間，或勾選「時間還沒決定」'); return; }
    const body = {
      title: form.elements.title.value,
      type: form.elements.type.value,
      group_id: form.elements.group_id.value || null,
      date_time: $('p-tbd').checked ? '' : form.elements.date_time.value,
      location: form.elements.location.value,
      notes: form.elements.notes.value,
      notify_minutes_before: Number(form.elements.notify_minutes_before.value),
      links: [...$('p-links').querySelectorAll('.link-row')].map((r) => ({ title: r.querySelector('.l-title').value, url: r.querySelector('.l-url').value })).filter((l) => l.url),
    };
    api(editing ? `/plan/api/itineraries/${editing.id}/` : '/plan/api/itineraries/', body)
      .then(async () => {
        closeSheet('p-sheet');
        view = body.date_time ? 'upcoming' : 'tbd';
        await reload();
      })
      .catch((err) => showError('p-form-error', err.message));
  });

  // 用目前位置帶入地點（OpenStreetMap 反查地址）
  $('p-locate').addEventListener('click', () => {
    if (!navigator.geolocation) { alert('這台裝置不支援定位'); return; }
    const done = window.AppLoading ? window.AppLoading.start() : () => {};
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&accept-language=zh-TW&lat=${lat}&lon=${lon}`, { loading: false });
        const j = await r.json();
        const a = j.address || {};
        const parts = [a.city || a.county, a.suburb || a.town || a.district, a.road, a.house_number && `${a.house_number}號`, j.name].filter(Boolean);
        form.elements.location.value = parts.length ? [...new Set(parts)].join(' ') : `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      } catch {
        form.elements.location.value = `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
      }
      done();
    }, (err) => {
      done();
      alert(err.code === 1 ? '請允許定位權限才能帶入目前位置' : '定位失敗，請手動輸入地點');
    }, { enableHighAccuracy: true, timeout: 12000 });
  });

  // ---------- 決定時間 ----------
  function openFinalize(it) {
    finalizing = it;
    $('p-final-name').textContent = it.title;
    $('p-final-dt').value = '';
    showError('p-final-error', '');
    openSheet('p-final');
  }
  $('p-final-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const dt = $('p-final-dt').value;
    if (!dt) { showError('p-final-error', '請選擇時間'); return; }
    api(`/plan/api/itineraries/${finalizing.id}/finalize/`, { date_time: dt })
      .then(async () => { closeSheet('p-final'); view = 'upcoming'; await reload(); })
      .catch((err) => showError('p-final-error', err.message));
  });

  // ---------- 群組 ----------
  async function renderGroups() {
    const { groups } = await api('/plan/api/groups/');
    const box = $('p-group-list');
    box.innerHTML = '';
    if (!groups.length) box.append(el('p', 'empty', '還沒有群組'));
    groups.forEach((g) => {
      const row = el('div', 'group-row');
      const info = el('div', 'group-info');
      info.append(el('strong', null, `👥 ${g.name}`), el('small', null, `${g.members.length} 人：${g.members.join('、')}`));
      if (g.pending.length) info.append(el('small', 'pending', `邀請中：${g.pending.join('、')}`));
      const add = el('button', 'btn ghost sm', '➕ 邀請');
      add.type = 'button';
      add.addEventListener('click', () => toggleSearch(row, g));
      const invite = el('button', 'btn ghost sm', '🔗');
      invite.type = 'button';
      invite.title = '分享邀請連結（給還沒註冊的朋友）';
      invite.setAttribute('aria-label', '分享邀請連結');
      invite.addEventListener('click', async () => {
        const text = `邀請你加入 Ukiyo 行程群組「${g.name}」`;
        if (navigator.share) { try { await navigator.share({ title: g.name, text, url: g.invite_url }); } catch { /* 取消 */ } return; }
        try { await navigator.clipboard.writeText(`${text}\n${g.invite_url}`); alert('邀請連結已複製，貼給朋友吧！'); } catch { prompt('複製這個邀請連結：', g.invite_url); }
      });
      const leave = el('button', 'btn ghost sm', '離開');
      leave.type = 'button';
      leave.addEventListener('click', () => {
        if (!confirm(`確定要離開「${g.name}」？${g.members.length === 1 ? '你是最後一位成員，群組會被刪除。' : ''}`)) return;
        run(async () => { await api(`/plan/api/groups/${g.id}/leave/`, {}); await renderGroups(); await reload(); });
      });
      row.append(info, add, invite, leave);
      box.append(row);
    });
  }

  // 在群組底下展開搜尋框：輸入帳號名稱（至少 2 個字）→ 點「邀請」
  function toggleSearch(row, g) {
    const next = row.nextElementSibling;
    if (next && next.classList.contains('member-search')) { next.remove(); return; }
    document.querySelectorAll('.member-search').forEach((x) => x.remove());
    const panel = el('div', 'member-search');
    const input = el('input');
    input.type = 'search';
    input.placeholder = '輸入對方的帳號名稱（至少 2 個字）';
    input.autocomplete = 'off';
    const results = el('div', 'member-results');
    const hint = el('small', null, '找不到人？用 🔗 分享邀請連結，對方註冊後點連結就能加入');
    panel.append(input, results, hint);
    row.after(panel);
    input.focus();

    let timer = null;
    let seq = 0;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const q = input.value.trim();
        const my = ++seq;
        results.innerHTML = '';
        if (q.length < 2) return;
        const r = await fetch(`/plan/api/users/search/?group=${g.id}&q=${encodeURIComponent(q)}`, { loading: false, credentials: 'same-origin' }).then((x) => x.json()).catch(() => ({ users: [] }));
        if (my !== seq) return;   // 已經有更新的搜尋
        if (!r.users.length) { results.append(el('p', 'empty', '找不到符合的會員')); return; }
        r.users.forEach((u) => {
          const line = el('div', 'member-line');
          line.append(el('span', null, `👤 ${u.username}`));
          const b = el('button', 'btn ghost sm', u.invited ? '已邀請' : '邀請');
          b.type = 'button';
          b.disabled = u.invited;
          b.addEventListener('click', () => run(async () => {
            await api(`/plan/api/groups/${g.id}/invite/`, { username: u.username });
            b.textContent = '已邀請 ✓';
            b.disabled = true;
          }));
          line.append(b);
          results.append(line);
        });
      }, 300);
    });
  }
  $('p-groups-open').addEventListener('click', () => run(async () => { await renderGroups(); openSheet('p-groups'); }));
  $('p-group-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('p-group-name');
    const name = input.value.trim();
    if (!name) { alert('請先輸入群組名稱，例如：週末出遊團'); input.focus(); return; }
    run(async () => { await api('/plan/api/groups/', { name }); $('p-group-name').value = ''; await renderGroups(); await reload(); });
  });

  // ---------- 分頁與載入 ----------
  $('p-tabs').querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => { view = chip.dataset.view; render(); }));
  $('p-new').addEventListener('click', () => openForm());

  let loaded = false;
  const loading = fetch('/plan/api/itineraries/', { loading: false, credentials: 'same-origin' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((j) => { data = j; render(); })
    .catch(() => { count.textContent = '!'; list.innerHTML = ''; list.append(el('p', 'empty', '行程載入失敗，請稍後重新整理')); })
    .finally(() => { loaded = true; });
  const waitIfNeeded = () => { if (!loaded && window.AppLoading) window.AppLoading.track(loading); };
  tab.addEventListener('click', waitIfNeeded);
  if (tab.classList.contains('active')) waitIfNeeded();

  // 給「活動」頁用：把活動帶入新增行程
  window.Planner = {
    async addFromEvent(preset) {
      await loading;
      tab.click();
      openForm(null, preset);
    },
  };
})();
