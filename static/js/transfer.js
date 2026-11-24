// Ukiyo 📲 傳檔案：在自己的手機、電腦之間直接互傳檔案（WebRTC 點對點）。
// 伺服器（/transfer/api/）只負責牽線：記錄哪些裝置在線、交換連線資訊（offer／answer）；
// 檔案內容由兩台裝置直接傳，不經過伺服器、也不存在伺服器上。
// 流程：傳送端選裝置與檔案 → 建立連線資訊送到伺服器 → 收檔端定時查詢看到請求、按接收 → 回送連線資訊 → 兩台直接連線傳檔。
(() => {
  const $ = (id) => document.getElementById(id);
  const sheet = $('x-sheet');
  if (!sheet || !window.RTCPeerConnection) {
    const btn = $('x-open');
    if (btn) btn.hidden = true;   // 太舊的瀏覽器不支援點對點連線
    return;
  }
  const csrf = () => (document.querySelector('input[name=csrfmiddlewaretoken]') || {}).value || '';
  const MB = 1024 * 1024;
  const ICE = [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] }];
  const HIGH_WATER = 4 * MB;     // 傳送緩衝超過這個量就先等一下（避免塞爆記憶體）
  const LOW_WATER = 1 * MB;
  const PART = 8 * MB;           // 收檔時每累積這麼多就先合成一塊，減少零碎的記憶體
  const CONNECT_MS = 20000;      // 雙方交換完連線資訊後，多久連不上就放棄
  const ANSWER_MS = 125000;      // 傳送端等對方按接收的時間（伺服器 120 秒後算逾時）
  const POLL_FAST = 3000;        // 視窗開著或傳送中：每 3 秒查一次
  const POLL_SLOW = 10000;       // 平常（App 在前景）：每 10 秒查一次有沒有人要傳檔案過來

  // ---------- 這台裝置 ----------
  const ua = navigator.userAgent;
  const platform = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios'
    : /Android/.test(ua) ? 'android' : 'desktop';
  const defaultName = platform === 'ios' ? (/iPad/.test(ua) || /Macintosh/.test(ua) ? 'iPad' : 'iPhone')
    : platform === 'android' ? 'Android 手機'
      : /Windows/.test(ua) ? 'Windows 電腦' : /Macintosh/.test(ua) ? 'Mac' : '電腦';
  const deviceId = (() => {
    const make = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    try {
      let id = localStorage.getItem('ukiyoDeviceId');
      if (!id) { id = make(); localStorage.setItem('ukiyoDeviceId', id); }
      return id;
    } catch (e) { return make(); }   // 無痕模式：這次開著的期間有效
  })();

  let me = null;
  let devices = [];           // 我的其他裝置
  let friends = [];           // 群組朋友 [{id, name, groups, devices:[在線裝置]}]
  let groups = [];            // 我的行程群組
  let view = 'mine';          // 目前看「我的裝置」或「群組朋友」
  let groupFilter = 'all';
  let limits = { max_files: 10, max_total: 500 * MB, max_file_ios: 200 * MB, max_targets: 5 };
  const targets = new Set();  // 選中的裝置 id（可以同時傳給好幾台）
  let picked = [];            // 選好的檔案
  const jobs = new Map();     // 進行中與完成的傳送（傳出 out／收到 in）
  const asked = new Set();    // 已經問過使用者的收檔請求
  const askQueue = [];
  let polling = false;
  let pollTimer = null;
  let wakeLock = null;

  // ---------- 小工具 ----------
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const size = (n) => (n >= MB ? `${(n / MB).toFixed(n >= 100 * MB ? 0 : 1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
  const icon = (p) => (p === 'desktop' ? '💻' : '📱');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function api(url, body, quiet = false) {
    const opts = { credentials: 'same-origin', loading: !quiet };
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

  // ---------- 定時查詢 ----------
  const activeJobs = () => [...jobs.values()].filter((j) => !j.finished);
  const sheetOpen = () => !sheet.hidden;

  function schedule() {
    clearTimeout(pollTimer);
    if (document.visibilityState !== 'visible' || document.body.classList.contains('offline-mode')) return;
    pollTimer = setTimeout(poll, sheetOpen() || activeJobs().length ? POLL_FAST : POLL_SLOW);
  }

  async function poll() {
    if (polling) return;
    polling = true;
    try {
      const data = await api('/transfer/api/poll/', { device_id: deviceId, name: defaultName, platform }, true);
      me = data.me;
      devices = data.devices;
      friends = data.friends || [];
      groups = data.groups || [];
      limits = data.limits || limits;
      const online = new Set(allTargets().filter((d) => d.online).map((d) => d.id));
      [...targets].forEach((id) => { if (!online.has(id)) targets.delete(id); });
      data.incoming.forEach((t) => {
        if (asked.has(t.id)) return;
        asked.add(t.id);
        askQueue.push(t);
      });
      // 傳出去的：對方拒絕或逾時
      data.outgoing.forEach((o) => {
        const j = jobs.get(o.id);
        if (j && !j.finished && !j.connected && ['declined', 'failed', 'cancelled'].includes(o.status)) {
          finish(j, o.status === 'declined' ? '對方拒絕接收' : (o.note || '傳送失敗'), true);
        }
      });
      renderDevices();
      renderPick();
      nextAsk();
    } catch (e) { /* 離線或伺服器休眠：下次再試 */ }
    polling = false;
    schedule();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { poll(); lockScreen(); } else clearTimeout(pollTimer);
  });

  // ---------- 傳送中：畫面保持亮著、不自動更新、離開前提醒 ----------
  async function lockScreen() {
    const busy = activeJobs().length > 0;
    document.body.classList.toggle('x-busy', busy);
    try {
      if (busy && !wakeLock && navigator.wakeLock && document.visibilityState === 'visible') {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      } else if (!busy && wakeLock) {
        await wakeLock.release();
        wakeLock = null;
      }
    } catch (e) { /* 不支援或被拒絕：只能提醒使用者別關螢幕 */ }
  }
  window.addEventListener('beforeunload', (e) => {
    if (activeJobs().length) { e.preventDefault(); e.returnValue = ''; }
  });

  // ---------- WebRTC ----------
  function waitIce(pc) {
    // 一次把所有連線方式收集完再交換（不用一來一往地補送），最多等 4 秒
    return new Promise((resolve) => {
      if (pc.iceGatheringState === 'complete') { resolve(); return; }
      const t = setTimeout(resolve, 4000);
      pc.addEventListener('icegatheringstatechange', () => {
        if (pc.iceGatheringState === 'complete') { clearTimeout(t); resolve(); }
      });
    });
  }

  function watchConnect(j) {
    j.connectTimer = setTimeout(() => {
      if (!j.connected && !j.finished) finish(j, '連不上對方。請確認兩台裝置連在同一個 Wi-Fi，再試一次', true);
    }, CONNECT_MS);
  }

  function finish(j, msg, failed = false, report = true) {
    if (j.finished) return;
    j.finished = true;
    j.failed = failed;
    j.msg = msg;
    clearTimeout(j.connectTimer);
    try { if (j.dc) j.dc.close(); } catch (e) { /* 已關閉 */ }
    try { if (j.pc) j.pc.close(); } catch (e) { /* 已關閉 */ }
    if (report) {
      const status = failed ? (j.cancelled ? 'cancelled' : 'failed') : 'done';
      api(`/transfer/api/${j.id}/status/`, { status, note: failed ? msg : '' }, true).catch(() => {});
    }
    renderJobs();
    lockScreen();
    schedule();
  }

  // ---------- 傳送 ----------
  // 可以傳送的對象：我的其他裝置＋群組朋友在線的裝置（label 是畫面上顯示的名稱）
  function allTargets() {
    return [
      ...devices.map((d) => ({ ...d, label: d.name })),
      ...friends.flatMap((f) => f.devices.map((d) => ({ ...d, label: `${f.name}（${d.name}）`, friend: f.id }))),
    ];
  }
  const chosen = () => allTargets().filter((d) => targets.has(d.id));

  function checkPicked() {
    if (!picked.length) return '請選擇要傳的檔案';
    if (picked.length > limits.max_files) return `一次最多傳 ${limits.max_files} 個檔案`;
    const total = picked.reduce((s, f) => s + f.size, 0);
    if (total > limits.max_total) return `一次最多傳 ${size(limits.max_total)}，請分批傳送`;
    const ios = chosen().some((d) => d.platform === 'ios');
    const big = ios && picked.find((f) => f.size > limits.max_file_ios);
    if (big) return `「${big.name}」太大了：傳到 iPhone／iPad 每個檔案最多 ${size(limits.max_file_ios)}`;
    return '';
  }

  // 對一台裝置建立連線資訊並登記傳送；回傳傳送紀錄（還沒開始傳）
  async function createOut(dev, files) {
    const pc = new RTCPeerConnection({ iceServers: ICE });
    const dc = pc.createDataChannel('files', { ordered: true });
    try {
      await pc.setLocalDescription(await pc.createOffer());
      await waitIce(pc);
      const res = await api('/transfer/api/send/', {
        device_id: deviceId, to: dev.id, offer: JSON.stringify(pc.localDescription),
        files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
      }, true);
      return {
        id: res.id, dir: 'out', peer: dev.label, pc, dc, files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
        total: files.reduce((s, f) => s + f.size, 0), done: 0, msg: `等「${dev.label}」按接收…`,
      };
    } catch (e) {
      pc.close();
      throw new Error(`${dev.label}：${e.message || '傳送失敗'}`);
    }
  }

  async function startSend() {
    const err = checkPicked();
    const list = chosen();
    if (err || !list.length) { showError(err || '請選擇要傳給誰'); return; }
    showError('');
    const files = picked.slice();
    // 傳給好幾台時同時建立（每台各一條連線，各自按接收、各自傳）
    const results = await AppLoading.track(Promise.allSettled(list.map((dev) => createOut(dev, files))));
    const errors = results.filter((r) => r.status === 'rejected').map((r) => r.reason.message);
    const ok = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);
    if (!ok.length) { showError(errors.join('\n')); return; }
    picked = [];
    targets.clear();
    $('x-file').value = '';
    ok.forEach((j) => { jobs.set(j.id, j); runOut(j, files); });
    renderDevices();
    renderPick();
    showError(errors.join('\n'));
    renderJobs();
    lockScreen();
    schedule();
  }

  async function runOut(j, files) {
    const { pc, dc, id } = j;
    dc.binaryType = 'arraybuffer';
    dc.bufferedAmountLowThreshold = LOW_WATER;
    dc.addEventListener('open', () => {
      j.connected = true;
      clearTimeout(j.connectTimer);
      sendFiles(j, files).catch(() => finish(j, '傳送中斷了，請再試一次', true));
    });
    dc.addEventListener('message', (e) => {
      if (typeof e.data !== 'string') return;
      const m = JSON.parse(e.data);
      if (m.t === 'ok') finish(j, `✅ 已傳給「${j.peer}」`);
      if (m.t === 'cancel') { j.cancelled = true; finish(j, '對方取消了接收', true, false); }
    });
    dc.addEventListener('close', () => { if (!j.finished) finish(j, '連線中斷了，請再試一次', true); });

    // 等對方按接收，拿到對方的連線資訊就開始連線
    const until = Date.now() + ANSWER_MS;
    while (!j.finished && Date.now() < until) {
      await sleep(1500);
      if (j.finished) return;
      try {
        const r = await api(`/transfer/api/${id}/`, undefined, true);
        if (r.status === 'accepted' && r.answer) {
          j.msg = '連線中…';
          renderJobs();
          await pc.setRemoteDescription(JSON.parse(r.answer));
          watchConnect(j);
          return;
        }
        if (r.status === 'declined') { finish(j, '對方拒絕接收', true, false); return; }
        if (['failed', 'cancelled'].includes(r.status)) { finish(j, r.note || '傳送失敗', true, false); return; }
      } catch (e) { /* 暫時連不到伺服器：繼續等 */ }
    }
    if (!j.finished) finish(j, '對方沒有回應', true);
  }

  async function sendFiles(j, files) {
    const max = j.pc.sctp && j.pc.sctp.maxMessageSize;
    const chunk = Math.min(64 * 1024, max || 16 * 1024);
    const waitDrain = () => new Promise((resolve) => {
      const on = () => { j.dc.removeEventListener('bufferedamountlow', on); resolve(); };
      j.dc.addEventListener('bufferedamountlow', on);
    });
    j.msg = '傳送中…';
    let shown = 0;
    for (let i = 0; i < files.length; i += 1) {
      const f = files[i];
      j.dc.send(JSON.stringify({ t: 'file', i, name: f.name, size: f.size, type: f.type }));
      for (let off = 0; off < f.size; off += chunk) {
        if (j.finished) return;
        if (j.dc.bufferedAmount > HIGH_WATER) await waitDrain();
        j.dc.send(await f.slice(off, off + chunk).arrayBuffer());
        j.done += Math.min(chunk, f.size - off);
        if (Date.now() - shown > 200) { shown = Date.now(); renderJobs(); }
      }
    }
    j.dc.send(JSON.stringify({ t: 'end' }));
    j.msg = '等對方收完…';
    renderJobs();
  }

  // ---------- 接收 ----------
  function nextAsk() {
    const box = $('x-ask');
    if (!box.hidden || !askQueue.length) return;
    const t = askQueue.shift();
    $('x-ask-from').textContent = `「${t.from_name}」想傳 ${t.files.length} 個檔案給你（共 ${size(t.total_size)}）`;
    const ul = $('x-ask-files');
    ul.replaceChildren(...t.files.map((f) => el('li', '', `${f.name}（${size(f.size)}）`)));
    $('x-ask-warn').hidden = platform !== 'ios';
    box.dataset.id = t.id;
    box._req = t;
    box.hidden = false;
    document.body.classList.add('sheet-open');
  }

  function closeAsk() {
    $('x-ask').hidden = true;
    if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open');
    setTimeout(nextAsk, 300);
  }

  function decline() {
    const t = $('x-ask')._req;
    closeAsk();
    if (t) api(`/transfer/api/${t.id}/status/`, { status: 'declined' }, true).catch(() => {});
  }

  async function accept() {
    const t = $('x-ask')._req;
    $('x-ask').hidden = true;
    const pc = new RTCPeerConnection({ iceServers: ICE });
    const j = {
      id: t.id, dir: 'in', peer: t.from_name, pc, files: t.files, total: t.total_size, done: 0,
      msg: '連線中…', received: [],
    };
    jobs.set(t.id, j);
    pc.addEventListener('datachannel', (e) => receive(j, e.channel));
    try {
      await AppLoading.track((async () => {
        await pc.setRemoteDescription(JSON.parse(t.offer));
        await pc.setLocalDescription(await pc.createAnswer());
        await waitIce(pc);
        await api(`/transfer/api/${t.id}/answer/`, { device_id: deviceId, answer: JSON.stringify(pc.localDescription) }, true);
      })());
    } catch (e) {
      finish(j, e.message || '接收失敗', true, false);
    }
    if (!j.finished) watchConnect(j);
    openSheet();
    closeAsk();
    renderJobs();
    lockScreen();
  }

  function receive(j, dc) {
    j.dc = dc;
    dc.binaryType = 'arraybuffer';
    let cur = null;
    let shown = 0;
    const flush = () => { if (cur.pending.length) { cur.parts.push(new Blob(cur.pending)); cur.pending = []; cur.pendingSize = 0; } };
    dc.addEventListener('open', () => { j.connected = true; clearTimeout(j.connectTimer); j.msg = '接收中…'; renderJobs(); });
    if (dc.readyState === 'open') { j.connected = true; clearTimeout(j.connectTimer); j.msg = '接收中…'; }
    dc.addEventListener('message', (e) => {
      if (typeof e.data === 'string') {
        const m = JSON.parse(e.data);
        if (m.t === 'file') {
          cur = { name: m.name, size: m.size, type: m.type, parts: [], pending: [], pendingSize: 0, got: 0 };
          if (m.size === 0) done();
        } else if (m.t === 'end') {
          j.complete = true;
          dc.send(JSON.stringify({ t: 'ok' }));   // 對方收到「收完了」就會關連線
          setTimeout(complete, 1000);
        } else if (m.t === 'cancel') {
          finish(j, '對方取消了傳送', true, false);
        }
        return;
      }
      if (!cur) return;
      cur.pending.push(e.data);
      cur.pendingSize += e.data.byteLength;
      cur.got += e.data.byteLength;
      j.done += e.data.byteLength;
      if (cur.pendingSize >= PART) flush();
      if (cur.got >= cur.size) done();
      if (Date.now() - shown > 200) { shown = Date.now(); renderJobs(); }
    });
    dc.addEventListener('close', () => {
      if (j.complete) complete();
      else if (!j.finished) finish(j, '連線中斷了，沒收完的檔案請對方重傳', true);
    });
    function complete() { finish(j, `✅ 收到 ${j.received.length} 個檔案`, false, false); }
    function done() {
      flush();
      const blob = new Blob(cur.parts, { type: cur.type || 'application/octet-stream' });
      j.received.push({ name: cur.name, type: cur.type, blob, url: URL.createObjectURL(blob) });
      cur = null;
      renderJobs();
    }
  }

  function cancel(j) {
    j.cancelled = true;
    try { if (j.dc && j.dc.readyState === 'open') j.dc.send(JSON.stringify({ t: 'cancel' })); } catch (e) { /* 已斷線 */ }
    finish(j, '已取消', true);
  }

  function removeJob(j) {
    (j.received || []).forEach((r) => URL.revokeObjectURL(r.url));
    jobs.delete(j.id);
    renderJobs();
  }

  async function shareFile(r) {
    try {
      const file = new File([r.blob], r.name, { type: r.type || r.blob.type });
      await navigator.share({ files: [file] });
    } catch (e) { /* 使用者取消分享 */ }
  }

  // ---------- 畫面 ----------
  function showError(msg) { const p = $('x-error'); p.textContent = msg; p.hidden = !msg; }

  function toggleTarget(id) {
    if (targets.has(id)) targets.delete(id);
    else if (targets.size >= limits.max_targets) { showError(`一次最多傳給 ${limits.max_targets} 台裝置`); return; }
    else targets.add(id);
    showError('');
    renderDevices();
    renderPick();
  }

  function devButton(d, label, sub) {
    const on = targets.has(d.id);
    const b = el('button', `x-dev${on ? ' active' : ''}${d.online ? '' : ' off'}`);
    b.type = 'button';
    b.disabled = !d.online;
    b.setAttribute('aria-pressed', String(on));
    const name = el('span', 'x-dev-name', label);
    if (sub) name.append(el('small', '', sub));
    b.append(el('span', 'x-dev-icon', icon(d.platform)), name,
      el('span', 'x-dev-state', on ? '✔ 已選' : (d.online ? '● 在線' : '不在線')));
    if (d.online) b.addEventListener('click', () => toggleTarget(d.id));
    return b;
  }

  async function nudge(f, btn) {
    btn.disabled = true;
    try {
      await api('/transfer/api/nudge/', { user: f.id });
      btn.textContent = '✅ 已通知';
    } catch (e) {
      showError(e.message);
      btn.disabled = false;
    }
  }

  function renderMine(box) {
    if (!devices.length) {
      box.append(el('p', 'x-empty', '還沒有其他裝置。用同一個帳號在另一台手機或電腦登入 Ukiyo，就會出現在這裡。'));
      return;
    }
    devices.forEach((d) => {
      const row = el('div', 'x-dev-row');
      row.append(devButton(d, d.name));
      if (!d.online) {
        const rm = el('button', 'act x-dev-rm', '移除');
        rm.type = 'button';
        rm.title = '從清單移除（那台下次打開 Ukiyo 會再出現）';
        rm.addEventListener('click', async () => {
          try { await api(`/transfer/api/devices/${d.id}/remove/`, {}); devices = devices.filter((x) => x !== d); renderDevices(); } catch (e) { showError(e.message); }
        });
        row.append(rm);
      }
      box.append(row);
    });
    if (!devices.some((d) => d.online)) box.append(el('p', 'x-empty', '要傳送的話，先在另一台裝置打開 Ukiyo（App 開著就好）。'));
  }

  function renderFriends(box) {
    const gf = $('x-gfilter');
    if (!groups.length) {
      box.append(el('p', 'x-empty', '還沒有加入任何群組。到「📅 行程」→「👥 群組」建立群組並邀請朋友，就能互傳檔案。'));
      return;
    }
    // 依群組篩選（只有一個群組就不顯示）
    if (groups.length > 1) {
      gf.hidden = false;
      gf.replaceChildren(...[{ id: 'all', name: '全部' }, ...groups].map((g) => {
        const c = el('button', `chip${String(g.id) === String(groupFilter) ? ' active' : ''}`, g.id === 'all' ? g.name : `👥 ${g.name}`);
        c.type = 'button';
        c.addEventListener('click', () => { groupFilter = g.id; renderDevices(); });
        return c;
      }));
    }
    const list = friends.filter((f) => groupFilter === 'all' || f.groups.includes(Number(groupFilter)));
    if (!list.length) { box.append(el('p', 'x-empty', '這個群組還沒有其他成員。')); return; }
    const onlineList = list.filter((f) => f.devices.length);
    if (onlineList.length > 1) {
      const all = el('button', 'act x-all', `✔ 全選在線的人（最多 ${limits.max_targets} 台）`);
      all.type = 'button';
      all.addEventListener('click', () => {
        onlineList.forEach((f) => {
          if (targets.size < limits.max_targets && !f.devices.some((d) => targets.has(d.id))) targets.add(f.devices[0].id);
        });
        showError('');
        renderDevices();
        renderPick();
      });
      box.append(all);
    }
    list.forEach((f) => {
      if (f.devices.length) {
        f.devices.forEach((d) => {
          const row = el('div', 'x-dev-row');
          row.append(devButton(d, f.name, d.name));
          box.append(row);
        });
        return;
      }
      const row = el('div', 'x-dev-row');
      row.append(devButton({ id: `u${f.id}`, platform: 'mobile', online: false }, f.name));
      const nb = el('button', 'act x-dev-rm', '🔔 叫他上線');
      nb.type = 'button';
      nb.title = '推播通知對方打開 Ukiyo（對方要有開通知）';
      nb.addEventListener('click', () => nudge(f, nb));
      row.append(nb);
      box.append(row);
    });
  }

  function renderDevices() {
    if (me) $('x-me-name').textContent = me.name;
    $('x-views').querySelectorAll('.chip').forEach((c) => {
      c.classList.toggle('active', c.dataset.v === view);
      const n = c.querySelector('b');
      const count = c.dataset.v === 'mine' ? devices.filter((d) => d.online).length : friends.filter((f) => f.devices.length).length;
      if (n) n.textContent = count ? `${count} 在線` : '';
    });
    const box = $('x-devices');
    box.replaceChildren();
    $('x-gfilter').hidden = true;
    if (view === 'mine') renderMine(box); else renderFriends(box);
  }

  function renderPick() {
    const list = chosen();
    $('x-pick').hidden = !list.length;
    if (!list.length) return;
    $('x-to').textContent = list.length === 1 ? `傳給「${list[0].label}」` : `傳給 ${list.length} 台：${list.map((d) => d.label).join('、')}`;
    const lim = `一次最多 ${limits.max_files} 個檔案、共 ${size(limits.max_total)}`
      + (list.some((d) => d.platform === 'ios') ? `；傳到 iPhone／iPad 每個檔案最多 ${size(limits.max_file_ios)}` : '')
      + (list.length > 1 ? '；同時傳給好幾台會比較慢（每台各傳一份）' : '');
    $('x-limit').textContent = lim;
    const ul = $('x-files');
    ul.replaceChildren(...picked.map((f, i) => {
      const li = el('li', '', `${f.name}（${size(f.size)}）`);
      const rm = el('button', 'act', '✕');
      rm.type = 'button';
      rm.setAttribute('aria-label', `移除 ${f.name}`);
      rm.addEventListener('click', () => { picked.splice(i, 1); showError(''); renderPick(); });
      li.append(rm);
      return li;
    }));
    const err = picked.length ? checkPicked() : '';
    if (picked.length) showError(err);
    const send = $('x-send');
    send.disabled = !picked.length || !!err;
    send.textContent = picked.length ? `📤 傳送 ${picked.length} 個檔案（${size(picked.reduce((s, f) => s + f.size, 0))}）` : '📤 傳送';
  }

  function renderJobs() {
    const box = $('x-jobs');
    const list = [...jobs.values()].reverse();
    $('x-jobs-h').hidden = !list.length;
    box.replaceChildren(...list.map((j) => {
      const c = el('div', `x-job${j.failed ? ' failed' : ''}${j.finished && !j.failed ? ' ok' : ''}`);
      const head = el('div', 'x-job-head');
      head.append(el('b', '', j.dir === 'out' ? `📤 傳給「${j.peer}」` : `📥 來自「${j.peer}」`),
        el('span', '', `${j.files.length} 個・${size(j.total)}`));
      c.append(head);
      const pct = j.total ? Math.min(100, Math.round((j.done / j.total) * 100)) : (j.finished && !j.failed ? 100 : 0);
      if (!j.finished) {
        const bar = el('div', 'x-bar');
        const fill = el('i');
        fill.style.width = `${pct}%`;
        bar.append(fill);
        c.append(bar);
      }
      const foot = el('div', 'x-job-foot');
      foot.append(el('span', 'x-job-msg', j.finished ? j.msg : `${j.msg}${j.connected ? ` ${pct}%` : ''}`));
      const act = el('button', 'act', j.finished ? '✕ 清除' : '取消');
      act.type = 'button';
      act.addEventListener('click', () => (j.finished ? removeJob(j) : cancel(j)));
      foot.append(act);
      c.append(foot);
      if (j.dir === 'in' && j.received.length) {
        const ul = el('ul', 'x-got');
        j.received.forEach((r) => {
          const li = el('li');
          if (/^image\//.test(r.type)) {
            const img = el('img');
            img.src = r.url;
            img.alt = '';
            img.loading = 'lazy';
            li.append(img);
          }
          li.append(el('span', 'x-got-name', r.name));
          const btns = el('span', 'x-got-btns');
          const a = el('a', 'act', '💾 儲存');
          a.href = r.url;
          a.download = r.name;
          btns.append(a);
          if (navigator.canShare && navigator.canShare({ files: [new File([], r.name, { type: r.type })] })) {
            const s = el('button', 'act', platform === 'ios' ? '📤 分享／存到相簿' : '📤 分享');
            s.type = 'button';
            s.addEventListener('click', () => shareFile(r));
            btns.append(s);
          }
          li.append(btns);
          ul.append(li);
        });
        c.append(ul);
      }
      return c;
    }));
  }

  function openSheet() {
    sheet.hidden = false;
    document.body.classList.add('sheet-open');
    renderDevices();
    renderPick();
    renderJobs();
    poll();
  }
  function closeSheet() {
    sheet.hidden = true;
    if (!document.querySelector('.sheet-backdrop:not([hidden])')) document.body.classList.remove('sheet-open');
    schedule();
  }

  $('x-open').addEventListener('click', openSheet);
  $('x-views').addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (!c || c.dataset.v === view) return;
    view = c.dataset.v;
    renderDevices();
  });
  // 朋友按了「🔔 叫他上線」的推播：打開 App 就直接開傳檔案視窗
  const launch = window.appLaunchParams || new URLSearchParams(location.search);
  if (launch.get('transfer')) {
    history.replaceState(null, '', location.pathname);
    setTimeout(openSheet, 300);
  }
  window.addEventListener('app-link', (e) => { if (e.detail.get('transfer')) openSheet(); });
  sheet.addEventListener('click', (e) => { if (e.target === sheet || e.target.closest('[data-close]')) closeSheet(); });
  $('x-file').addEventListener('change', (e) => {
    const add = [...e.target.files].filter((f) => !picked.some((p) => p.name === f.name && p.size === f.size));
    picked = picked.concat(add);
    e.target.value = '';
    renderPick();
  });
  $('x-send').addEventListener('click', startSend);
  $('x-rename').addEventListener('click', async () => {
    const name = prompt('這台裝置的名稱（其他裝置會看到）', me ? me.name : defaultName);
    if (!name || !name.trim()) return;
    try { me = (await api('/transfer/api/rename/', { device_id: deviceId, name })).me; renderDevices(); } catch (e) { showError(e.message); }
  });
  const ask = $('x-ask');
  ask.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) decline(); });   // 點外面不算拒絕，避免誤觸
  $('x-accept').addEventListener('click', accept);

  if (document.visibilityState === 'visible') setTimeout(poll, 1500);
})();
