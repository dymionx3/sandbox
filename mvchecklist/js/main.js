// Hub interactions: theme sync w/ system, keyboard a11y, export/import backup
(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(t){
    root.setAttribute('data-theme', t);
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
  }

  // Determine initial theme (localStorage overrides system)
  const stored = localStorage.getItem('theme');
  const initial = stored || (prefersDark && prefersDark.matches ? 'dark' : 'light');
  applyTheme(initial);

  // React to system changes if user hasn't set a preference
  if (!stored && prefersDark && prefersDark.addEventListener){
    prefersDark.addEventListener('change', e => applyTheme(e.matches ? 'dark' : 'light'));
  }

  // Toggle button
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  // Keyboard support for cards (Enter/Space to open)
  document.querySelectorAll('.card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  // Export all localStorage keys that begin with "chk:"
  const exportBtn = document.querySelector('.hdr-export');
  if (exportBtn) exportBtn.addEventListener('click', () => {
    const dump = {};
    for (let i=0; i<localStorage.length; i++){
      const k = localStorage.key(i);
      if (k && k.startsWith('chk:')) dump[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'checklists-backup.json'; a.click();
    setTimeout(()=> URL.revokeObjectURL(url), 1000);
  });

  // Import backup (header input)
  const hdrImport = document.getElementById('hdrImport');
  if (hdrImport) hdrImport.addEventListener('change', async () => {
    const file = hdrImport.files && hdrImport.files[0];
    if (!file) return;
    try{
      const text = await file.text();
      const json = JSON.parse(text);
      Object.entries(json).forEach(([k,v]) => localStorage.setItem(k, String(v)));
      alert('Imported. Reload pages to see updates.');
    }catch(err){ alert('Import failed: '+ err.message); }
    hdrImport.value = '';
  });
})();
