// Generic Checklist Engine
// Features: autosave, progress bar, clear/reset, export/import, print-friendly
(function(){
  const checklist = document.querySelector('.checklist');
  if (!checklist) return;
  const listId = checklist.getAttribute('data-checklist-id') || location.pathname.replace(/[^a-z0-9]+/gi,'-').toLowerCase();
  const storageKey = `chk:${listId}`;

  // Inject toolbar (keeps markup minimal in pages)
  const toolbar = document.createElement('div');
  toolbar.className = 'chk-toolbar';
  toolbar.innerHTML = `
    <progress class="chk-progress" value="0" max="100" aria-label="Completion"></progress>
    <div class="chk-actions">
      <button class="btn" data-act="export">Export</button>
      <label class="btn">Import<input type="file" class="sr-only" data-act="import" accept="application/json"/></label>
      <button class="btn" data-act="clear">Reset</button>
      <button class="btn primary" type="button">Print</button>
    </div>`;
  checklist.parentElement?.insertBefore(toolbar, checklist);

  // Load saved state
  function load(){
    try{ return JSON.parse(localStorage.getItem(storageKey) || '{}'); }
    catch{ return {}; }
  }
  function save(state){
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
  const state = load();
  if (state && Array.isArray(state.items)){
    checkboxes.forEach((cb, i) => cb.checked = !!state.items[i]);
  }

  // Update + persist
  function update(){
    const items = checkboxes.map(cb => cb.checked);
    save({ items, updatedAt: Date.now() });
    updateProgress();
  }

  checklist.addEventListener('change', e => {
    if (e.target && e.target.matches('input[type="checkbox"]')) update();
  });

  // Keyboard a11y: Space toggles focused checkbox
  checklist.addEventListener('keydown', e => {
    if (e.key === ' ') {
      const el = document.activeElement;
      if (el && el.matches('input[type="checkbox"]')) { e.preventDefault(); el.checked = !el.checked; update(); }
    }
  });

  // Progress meter
  function updateProgress(){
    const total = checkboxes.length || 1;
    const done = checkboxes.filter(cb => cb.checked).length;
    const pct = Math.round((done / total) * 100);
    const prog = document.querySelector('.chk-progress');
    if (prog){ prog.value = pct; prog.setAttribute('aria-valuenow', String(pct)); prog.title = pct + '% complete'; }
  }
  updateProgress();

  // Toolbar actions
  toolbar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    if (btn.matches('.primary')) { window.print(); return; }

    const act = btn.getAttribute('data-act');
    if (act === 'clear'){
      if (confirm('Reset all items to unchecked?')){
        checkboxes.forEach(cb => cb.checked = false); update();
      }
    }
    if (act === 'export'){
      const data = localStorage.getItem(storageKey) || '{}';
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${listId}.json`; a.click();
      setTimeout(()=> URL.revokeObjectURL(url), 1000);
    }
  });

  // Import handler
  toolbar.querySelector('[data-act="import"]').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try{
      const text = await file.text();
      const json = JSON.parse(text);
      if (json && Array.isArray(json.items)){
        checkboxes.forEach((cb,i)=> cb.checked = !!json.items[i]);
        update();
      } else { alert('Invalid file.'); }
    }catch(err){ alert('Import failed: ' + err.message); }
    e.target.value = '';
  });
})();
