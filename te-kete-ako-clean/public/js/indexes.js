(function(){
  async function fetchSitemap() {
    try {
      const res = await fetch('/sitemap.html', { credentials: 'omit' });
      if (!res.ok) throw new Error('Failed to load sitemap');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return [...doc.querySelectorAll('a[href]')].map(a => ({ href: a.getAttribute('href'), text: (a.textContent||'').trim() }));
    } catch (e) {
      console.error('Sitemap load error', e);
      return [];
    }
  }

  function matchesType(href, type){
    if(!href) return false;
    const h = href.toLowerCase();
    if (type === 'units') return h.includes('/units/') || /unit\.html$/.test(h) || h.includes('-unit.html');
    if (type === 'lessons') return h.includes('/lessons/') || /lesson-\d/.test(h);
    if (type === 'handouts') return h.includes('/handouts/') || h.includes('handout') || h.includes('template');
    return false;
  }

  function renderList(container, items){
    const input = container.querySelector('input[type="search"]');
    const countEl = container.querySelector('[data-count]');
    const list = container.querySelector('ul');
    function applyFilter(){
      const q = (input?.value || '').toLowerCase();
      const filtered = items.filter(it => it.text.toLowerCase().includes(q) || it.href.toLowerCase().includes(q));
      list.innerHTML = '';
      filtered.slice(0, 1000).forEach(it => {
        const li = document.createElement('li');
        li.className = 'resource-item';
        const a = document.createElement('a');
        a.href = it.href;
        a.textContent = it.text || it.href;
        a.rel = a.href.startsWith('http') ? 'noopener noreferrer' : '';
        li.appendChild(a);
        list.appendChild(li);
      });
      if (countEl) countEl.textContent = String(filtered.length);
    }
    input?.addEventListener('input', applyFilter);
    applyFilter();
  }

  async function init(){
    const root = document.querySelector('[data-index-type]');
    if (!root) return;
    const type = root.getAttribute('data-index-type');
    const links = await fetchSitemap();
    const items = links.filter(l => matchesType(l.href, type));
    renderList(root, items);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
