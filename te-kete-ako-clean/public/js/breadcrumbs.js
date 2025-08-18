/**
 * Te Kete Ako Breadcrumbs System
 * Automatically generates breadcrumb navigation based on URL path
 */
(function() {
  'use strict';

  // Path-to-title mappings for better breadcrumb labels
  const pathMappings = {
    // Main sections
    'unit-plans': 'Unit Plans',
    'lessons': 'Lessons', 
    'handouts': 'Handouts',
    'games': 'Games',
    'teachers': 'Teachers',
    'activities': 'Activities',
    'experiences': 'Experiences',
    'assessment-frameworks': 'Assessment Frameworks',
    
    // Units
    'units': 'Units',
    'y7-introduction': 'Y7 Introduction',
    'y8-systems': 'Y8 Systems',
    'y8-digital-kaitiakitanga': 'Y8 Digital Kaitiakitanga', 
    'y8-statistics': 'Y8 Statistics',
    'y9-mathematics-geometry-maori-patterns': 'Y9 Geometry & Māori Patterns',
    'y9-maths-geometry-patterns': 'Y9 Geometry Patterns',
    'y9-science-ecology': 'Y9 Science: Ecology',
    'y10-physics-forces': 'Y10 Physics: Forces',
    'y10-physics-navigation': 'Y10 Navigation & Ocean Sciences',
    
    // Content types
    'resources': 'Resources',
    'materials': 'Materials',
    'video-activities': 'Video Activities',
    'do-now-activities': 'Do Now Activities',
    'enhanced': 'Enhanced Resources',
    'writers-toolkit': "Writer's Toolkit",
    'guided-inquiry-unit': 'Guided Inquiry',
    'podcast-series': 'Podcast Series',
    'critical-thinking': 'Critical Thinking',
    
    // Special pages
    'sitemap': 'Sitemap',
    'orphans': 'Discover',
    'curriculum-alignment': 'Curriculum Alignment',
    'my-kete': 'My Kete',
    'te-ao-maori': 'Te Ao Māori',
    'living-whakapapa': 'Living Whakapapa'
  };

  // Get clean title from filename
  function getCleanTitle(filename) {
    if (!filename) return '';
    
    // Remove file extension
    let title = filename.replace(/\.(html|htm)$/i, '');
    
    // Handle special cases
    if (title === 'index') return '';
    
    // Convert kebab-case and snake_case to Title Case
    title = title
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      // Handle common patterns
      .replace(/\bY(\d+)\b/g, 'Year $1')
      .replace(/\bLesson (\d+)/g, 'Lesson $1')
      .replace(/\bUnit (\d+)/g, 'Unit $1')
      .replace(/\bMaori\b/g, 'Māori')
      .replace(/\bTe Ao Maori\b/g, 'Te Ao Māori');
      
    return title;
  }

  // Build breadcrumb structure from current path
  function buildBreadcrumbs() {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');
    
    // Always start with home
    const breadcrumbs = [{
      label: '🏠 Te Kete Ako',
      href: '/',
      isHome: true
    }];
    
    let currentPath = '';
    
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      currentPath += '/' + part;
      
      // Skip if this is the final part and it's a file
      if (i === pathParts.length - 1 && part.includes('.html')) {
        // Add page title if it's not index
        const pageTitle = getCleanTitle(part);
        if (pageTitle) {
          breadcrumbs.push({
            label: pageTitle,
            href: null, // Current page, no link
            isCurrent: true
          });
        }
        break;
      }
      
      // Use mapping or clean the part name
      const label = pathMappings[part] || getCleanTitle(part);
      
      if (label) {
        breadcrumbs.push({
          label: label,
          href: currentPath + (currentPath.endsWith('/') ? '' : '/'),
          isCurrent: i === pathParts.length - 1
        });
      }
    }
    
    return breadcrumbs;
  }

  // Render breadcrumbs to the DOM
  function renderBreadcrumbs() {
    const container = document.getElementById('breadcrumbs');
    if (!container) return;
    
    const breadcrumbs = buildBreadcrumbs();
    
    // Don't show breadcrumbs if we're just on home page
    if (breadcrumbs.length <= 1) {
      container.style.display = 'none';
      return;
    }
    
    container.innerHTML = '';
    container.style.display = 'flex';
    
    breadcrumbs.forEach((crumb, index) => {
      const li = document.createElement('li');
      li.className = 'breadcrumb-item';
      
      if (crumb.isCurrent) {
        li.className += ' breadcrumb-current';
        li.innerHTML = `<span aria-current="page">${crumb.label}</span>`;
      } else {
        const link = document.createElement('a');
        link.href = crumb.href;
        link.textContent = crumb.label;
        link.className = 'breadcrumb-link';
        li.appendChild(link);
      }
      
      // Add separator (except for last item)
      if (index < breadcrumbs.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.setAttribute('aria-hidden', 'true');
        separator.textContent = ' › ';
        li.appendChild(separator);
      }
      
      container.appendChild(li);
    });
  }

  // Add CSS styles for breadcrumbs if not already present
  function addBreadcrumbStyles() {
    const styleId = 'breadcrumb-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .breadcrumbs {
        margin: var(--space-2) 0;
        font-size: var(--text-sm);
      }
      
      .breadcrumbs-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: var(--space-1);
      }
      
      .breadcrumb-item {
        display: flex;
        align-items: center;
        color: var(--color-text-muted);
      }
      
      .breadcrumb-link {
        color: var(--color-secondary);
        text-decoration: none;
        transition: color var(--duration-fast) ease;
      }
      
      .breadcrumb-link:hover {
        color: var(--color-secondary-dark);
        text-decoration: underline;
      }
      
      .breadcrumb-current span {
        color: var(--color-text-primary);
        font-weight: var(--weight-medium);
      }
      
      .breadcrumb-separator {
        margin: 0 var(--space-1);
        color: var(--color-text-light);
      }
      
      @media (max-width: 640px) {
        .breadcrumbs-list {
          font-size: var(--text-xs);
        }
        
        .breadcrumb-separator {
          margin: 0 2px;
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Initialize breadcrumbs when DOM is ready
  function init() {
    // Add styles first
    addBreadcrumbStyles();
    
    // Render breadcrumbs
    renderBreadcrumbs();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Expose to global scope for debugging
  window.TKA_Breadcrumbs = {
    rebuild: renderBreadcrumbs,
    mappings: pathMappings
  };

})();