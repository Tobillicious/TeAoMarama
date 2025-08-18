/**
 * =================================================================
 * SHARED COMPONENTS - Te Kete Ako Platform Core Functionality
 * =================================================================
 * 
 * PURPOSE: Central JavaScript module providing common functionality
 * across all pages of the educational platform. Handles navigation,
 * recommended reading integration, and utility functions.
 * 
 * ARCHITECTURE:
 * - Educational content recommendations by topic
 * - Dynamic DOM manipulation for enhanced UX
 * - Print-optimized functionality
 * - Cultural integration (Te Ao Māori elements)
 * 
 * FOR AI AGENTS:
 * - This file is imported by most pages via <script src="../js/shared-components.js">
 * - Key integration points: initRelatedResources(), auto-init system
 * - Cultural sensitivity: Maintains bilingual content throughout
 * - Performance: Lightweight, minimal dependencies
 * 
 * USAGE PATTERN:
 * Pages include data attributes like data-reading-topic="[topic]"
 * which automatically populate relevant educational resources
 * 
 * =================================================================
 */

// Educational book recommendations organized by topic
const RECOMMENDED_READING = {
    'authors-purpose': [
        {
            title: "They Say / I Say: The Moves That Matter in Academic Writing",
            authors: "Gerald Graff & Cathy Birkenstein",
            type: "book",
            description: "Essential guide to understanding how authors structure arguments and present their purposes in academic writing.",
            link: "https://wwnorton.com/books/9780393538700"
        },
        {
            title: "Reading Like a Writer",
            authors: "Francine Prose",
            type: "book", 
            description: "Explores how understanding an author's purpose can transform your own writing and critical reading skills.",
            link: "https://www.harpercollins.com/products/reading-like-a-writer-francine-prose"
        },
        {
            title: "The Elements of Persuasion",
            authors: "Richard Maxwell & Robert Dickman",
            type: "article",
            description: "Harvard Business Review article on the fundamental elements that make persuasive communication effective.",
            link: "https://hbr.org/2007/05/the-elements-of-persuasion"
        }
    ],
    'writing-techniques': [
        {
            title: "The Sense of Style: The Thinking Person's Guide to Writing",
            authors: "Steven Pinker",
            type: "book",
            description: "Modern approach to clear, effective writing with practical techniques for improving style and clarity.",
            link: "https://stevenpinker.com/publications/sense-style-thinking-persons-guide-writing-21st-century"
        },
        {
            title: "Bird by Bird: Some Instructions on Writing and Life",
            authors: "Anne Lamott",
            type: "book",
            description: "Beloved guide to the writing process, including techniques for developing voice, revision, and storytelling.",
            link: "https://www.penguinrandomhouse.com/books/97439/bird-by-bird-by-anne-lamott/"
        },
        {
            title: "Writing to Learn",
            authors: "William Zinsser",
            type: "book",
            description: "Explores how writing can be used as a tool for learning and understanding complex subjects.",
            link: "https://www.harpercollins.com/products/writing-to-learn-william-zinsser"
        }
    ],
    'critical-thinking': [
        {
            title: "Thinking, Fast and Slow",
            authors: "Daniel Kahneman",
            type: "book",
            description: "Essential reading on cognitive biases and decision-making processes that affect how we interpret information.",
            link: "https://us.macmillan.com/books/9780374533557/thinkingfastandslow"
        },
        {
            title: "The Art of Thinking Clearly",
            authors: "Rolf Dobelli",
            type: "book",
            description: "Practical guide to recognizing and avoiding common thinking errors and cognitive biases.",
            link: "https://www.harpercollins.com/products/the-art-of-thinking-clearly-rolf-dobelli"
        },
        {
            title: "Critical Thinking: An Introduction",
            authors: "Alec Fisher",
            type: "book",
            description: "Comprehensive introduction to critical thinking skills for students and educators.",
            link: "https://www.cambridge.org/core/books/critical-thinking/8B4D2E1F1B4F5C2A3E6D9F8B1A2C3D4E"
        }
    ],
    'media-literacy': [
        {
            title: "The Filter Bubble",
            authors: "Eli Pariser",
            type: "book",
            description: "Explores how personalized web content affects our understanding of the world and information literacy.",
            link: "https://www.penguinrandomhouse.com/books/309832/the-filter-bubble-by-eli-pariser/"
        },
        {
            title: "News Literacy Project",
            authors: "Various",
            type: "resource",
            description: "Comprehensive online resources for developing media literacy skills and evaluating news sources.",
            link: "https://newslit.org/"
        },
        {
            title: "Made to Stick",
            authors: "Chip Heath & Dan Heath",
            type: "book",
            description: "Why some ideas survive and others die - essential for understanding how media messages are crafted.",
            link: "https://heathbrothers.com/books/made-to-stick/"
        }
    ],
    'new-zealand-context': [
        {
            title: "The Penguin History of New Zealand",
            authors: "Michael King",
            type: "book",
            description: "Comprehensive overview of New Zealand history providing context for understanding contemporary issues.",
            link: "https://www.penguin.co.nz/books/the-penguin-history-of-new-zealand-9780143019664"
        },
        {
            title: "New Zealand History Online",
            authors: "Ministry for Culture and Heritage",
            type: "resource",
            description: "Government resource with articles, primary sources, and educational materials on NZ history.",
            link: "https://nzhistory.govt.nz/"
        },
        {
            title: "Being Pākehā Now",
            authors: "Joanna Kidman",
            type: "book",
            description: "Explores contemporary identity and cultural understanding in New Zealand's bicultural context.",
            link: "https://www.aucklanduniversitypress.co.nz/books-and-journals/books/being-pakehe-now/"
        }
    ],
    'science-literacy': [
        {
            title: "The Demon-Haunted World",
            authors: "Carl Sagan",
            type: "book",
            description: "Classic guide to scientific thinking and skepticism, essential for understanding science communication.",
            link: "https://www.penguinrandomhouse.com/books/153079/the-demon-haunted-world-by-carl-sagan/"
        },
        {
            title: "Bad Science",
            authors: "Ben Goldacre",
            type: "book",
            description: "Engaging examination of how science is misrepresented in media and the importance of scientific literacy.",
            link: "https://www.harpercollins.com/products/bad-science-ben-goldacre"
        },
        {
            title: "Science Media Centre",
            authors: "Various",
            type: "resource",
            description: "New Zealand resource for understanding how science is reported and communicated to the public.",
            link: "https://www.sciencemediacentre.co.nz/"
        }
    ]
};

/**
 * Generate site navigation HTML
 * @param {string} currentPage - Current page identifier for highlighting active nav item
 * @returns {string} Navigation HTML
 */
function generateNavigation(currentPage = '') {
    const navItems = [
        { id: 'home', text: 'Unit Hub', href: 'index.html' },
        { id: 'handouts', text: 'Handouts', href: 'handouts.html' },
        { id: 'lessons', text: 'Lessons', href: 'lesson-plans/lessons.html' },
        { id: 'toolkit', text: 'Writer\'s Toolkit', href: 'toolkit.html' },
        { id: 'project', text: 'Project', href: 'project/project-brief.html' },
        { id: 'other-resources', text: 'Other Resources', href: 'other-resources.html' }
    ];

    const navLinks = navItems.map(item => 
        `<li><a href="${item.href}" class="nav-link ${currentPage === item.id ? 'active' : ''}">${item.text}</a></li>`
    ).join('');

    return `
        <nav class="site-nav">
            <div class="nav-container">
                <a href="index.html" class="nav-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Te Kete Ako
                </a>
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>
                <ul class="nav-links">
                    ${navLinks}
                </ul>
            </div>
        </nav>
    `;
}

/**
 * Generate recommended reading section based on topic
 * @param {string} topic - Topic key for recommended reading
 * @param {number} maxItems - Maximum number of items to show (default: 3)
 * @returns {string} Recommended reading HTML
 */
function generateRecommendedReading(topic, maxItems = 3) {
    const readings = RECOMMENDED_READING[topic];
    if (!readings || readings.length === 0) {
        return '';
    }

    const readingItems = readings.slice(0, maxItems).map(item => `
        <div class="reading-item">
            <h4>${item.title}</h4>
            <p><strong>By:</strong> ${item.authors}</p>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="reading-link">
                ${item.type === 'book' ? 'View Book' : item.type === 'article' ? 'Read Article' : 'Explore Resource'} →
            </a>
        </div>
    `).join('');

    return `
        <div class="recommended-reading no-print">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM3 18.5V7c1.1-.35 2.3-.5 3.5-.5 1.34 0 3.13.41 4.5.99v11.5C9.63 18.41 7.84 18 6.5 18c-1.2 0-2.4.15-3.5.5z"/>
                </svg>
                Recommended Reading
            </h3>
            <p>Deepen your understanding with these carefully selected educational resources:</p>
            <div class="reading-list">
                ${readingItems}
            </div>
        </div>
    `;
}

/**
 * Get breadcrumb path based on current page
 * @param {string} currentPath - Current file path or page identifier
 * @returns {string} Breadcrumb HTML
 */
function generateBreadcrumb(currentPath) {
    const pathMap = {
        'handouts.html': '← Back to Unit Hub',
        'toolkit.html': '← Back to Unit Hub',
        'lessons.html': '← Back to Unit Hub',
        'project-brief.html': '← Back to Unit Hub',
        'handout': '← Back to Handouts',
        'lesson': '← Back to Lessons',
        'toolkit-item': '← Back to Writer\'s Toolkit'
    };

    const linkMap = {
        'handouts.html': 'index.html',
        'toolkit.html': 'index.html',
        'lessons.html': '../index.html',
        'project-brief.html': '../index.html',
        'handout': '../handouts.html',
        'lesson': 'lessons.html',
        'toolkit-item': '../toolkit.html'
    };

    const text = pathMap[currentPath] || '← Back to Unit Hub';
    const link = linkMap[currentPath] || 'index.html';

    return `<a href="${link}" class="breadcrumb">${text}</a>`;
}

/**
 * Initialize mobile menu functionality with enhanced keyboard navigation
 */
function initializeMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (toggleButton && navLinks) {
        // Mobile menu toggle
        toggleButton.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('mobile-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
            toggleButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            
            // Focus management
            if (isOpen && navItems.length > 0) {
                navItems[0].focus();
            }
        });

        // Keyboard navigation within menu
        navItems.forEach((item, index) => {
            item.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % navItems.length;
                    navItems[nextIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + navItems.length) % navItems.length;
                    navItems[prevIndex].focus();
                } else if (event.key === 'Home') {
                    event.preventDefault();
                    navItems[0].focus();
                } else if (event.key === 'End') {
                    event.preventDefault();
                    navItems[navItems.length - 1].focus();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.site-nav')) {
                navLinks.classList.remove('mobile-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navLinks.classList.remove('mobile-open');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.focus();
            }
        });
    }

    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if not present
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
}

/**
 * Initialize shared components on page load
 * @param {Object} options - Configuration options
 * @param {string} options.currentPage - Current page identifier
 * @param {string} options.readingTopic - Topic for recommended reading
 * @param {string} options.breadcrumbPath - Path for breadcrumb navigation
 */
function initializeSharedComponents(options = {}) {
    const {
        currentPage = '',
        readingTopic = '',
        breadcrumbPath = ''
    } = options;

    // Add navigation to the top of the body only if no existing site-header is found
    const existingHeader = document.querySelector('.site-header');
    if (!existingHeader) {
        const navigation = generateNavigation(currentPage);
        document.body.insertAdjacentHTML('afterbegin', navigation);
    }

    // Add breadcrumb if specified
    if (breadcrumbPath) {
        const breadcrumb = generateBreadcrumb(breadcrumbPath);
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.insertAdjacentHTML('afterbegin', breadcrumb);
        }
    }

    // Add recommended reading if topic specified
    if (readingTopic) {
        const recommendedReading = generateRecommendedReading(readingTopic);
        if (recommendedReading) {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertAdjacentHTML('beforeend', recommendedReading);
            }
        }
    }

    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Initialize accessibility features
    initializeAccessibilityFeatures();
    
    // Initialize enhanced keyboard navigation
    initializeKeyboardNavigation();
}

/**
 * Initialize accessibility features
 */
function initializeAccessibilityFeatures() {
    // Add ARIA labels to elements that need them
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        const title = card.querySelector('.resource-title');
        if (title && !card.getAttribute('aria-label')) {
            card.setAttribute('aria-label', `Resource: ${title.textContent}`);
        }
    });
    
    // Add proper heading structure validation
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > currentLevel + 1) {
            console.warn(`Heading level skip detected: ${heading.tagName} after h${currentLevel}`);
        }
        currentLevel = level;
    });
    
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Add CSS for keyboard focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-user *:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
        
        .skip-link:focus {
            outline: 2px solid white !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize enhanced keyboard navigation
 */
function initializeKeyboardNavigation() {
    // Resource card keyboard navigation
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        const link = card.querySelector('.resource-link');
        if (link) {
            link.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    link.click();
                }
            });
        }
    });
    
    // Enhanced breadcrumb navigation
    const breadcrumbs = document.querySelectorAll('.breadcrumb');
    breadcrumbs.forEach(breadcrumb => {
        breadcrumb.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                breadcrumb.click();
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Alt + H: Go to homepage
        if (event.altKey && event.key === 'h') {
            event.preventDefault();
            window.location.href = '/index.html';
        }
        
        // Alt + M: Focus on main content
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            const mainContent = document.querySelector('#main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Alt + S: Focus on search (if search exists)
        if (event.altKey && event.key === 's') {
            event.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

/**
 * Utility function to determine reading topic from filename
 * @param {string} filename - Current page filename
 * @returns {string} Reading topic key
 */
function getReadingTopicFromFilename(filename) {
    if (filename.includes('authors-purpose')) return 'authors-purpose';
    if (filename.includes('writers-toolkit')) return 'writing-techniques';
    if (filename.includes('media') || filename.includes('political-cartoon') || filename.includes('film')) return 'media-literacy';
    if (filename.includes('cognitive-biases') || filename.includes('misleading-graphs')) return 'critical-thinking';
    if (filename.includes('treaty') || filename.includes('dawn-raids') || filename.includes('haka') || filename.includes('te-reo')) return 'new-zealand-context';
    if (filename.includes('science') || filename.includes('plate-tectonics') || filename.includes('genetic') || filename.includes('microplastics')) return 'science-literacy';
    return 'critical-thinking'; // Default fallback
}

/**
 * MCP Agent-Enhanced Search and Filtering System
 * Integrates cross-curricular connections and cultural content
 */

// Enhanced search categories based on MCP agent specializations
const MCP_SEARCH_CATEGORIES = {
    'te-ao-maori': {
        agent: 'LF_Te_Ao_Māori',
        label: 'Te Ao Māori',
        keywords: ['maori', 'tikanga', 'whakatoki', 'te-reo', 'iwi', 'hapu', 'whakapapa', 'tangata-whenua'],
        color: '#2e7d32'
    },
    'economic-justice': {
        agent: 'LF_SocialSciences',
        label: 'Economic Justice',
        keywords: ['economic', 'justice', 'capitalism', 'wealth', 'inequality', 'housing', 'gig-economy'],
        color: '#d32f2f'
    },
    'stem-matauranga': {
        agent: 'Kaiako_STEM',
        label: 'STEM + Mātauranga',
        keywords: ['science', 'mathematics', 'traditional-knowledge', 'environmental', 'sustainability'],
        color: '#1976d2'
    },
    'digital-sovereignty': {
        agent: 'UX_Designer',
        label: 'Digital Technologies',
        keywords: ['ai', 'digital', 'data-sovereignty', 'technology', 'llm', 'prompt-engineering'],
        color: '#7b1fa2'
    },
    'literacy-numeracy': {
        agent: 'LF_LiteracyNumeracy',
        label: 'Literacy & Numeracy',
        keywords: ['literacy', 'numeracy', 'reading', 'writing', 'mathematics', 'statistics'],
        color: '#f57c00'
    },
    'arts-expression': {
        agent: 'LF_TheArts',
        label: 'Arts & Expression',
        keywords: ['arts', 'creative', 'performance', 'visual', 'storytelling', 'media'],
        color: '#8e24aa'
    }
};

/**
 * Advanced MCP-powered search function
 * @param {string} query - Search query
 * @param {Array} items - Items to search through
 * @param {Object} options - Search options
 * @returns {Array} Filtered and scored results
 */
function mcpEnhancedSearch(query, items, options = {}) {
    if (!query || !query.trim()) return items;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    const results = [];
    
    items.forEach(item => {
        let score = 0;
        let agentMatches = [];
        
        // Title matching (highest weight)
        const titleText = (item.title || '').toLowerCase();
        searchTerms.forEach(term => {
            if (titleText.includes(term)) score += 10;
        });
        
        // Content matching
        const contentText = (item.description || item.content || '').toLowerCase();
        searchTerms.forEach(term => {
            if (contentText.includes(term)) score += 5;
        });
        
        // Data tags matching
        const tags = item.dataset?.tags || item.tags || '';
        const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
        searchTerms.forEach(term => {
            tagArray.forEach(tag => {
                if (tag.includes(term)) score += 8;
            });
        });
        
        // MCP Agent category matching
        Object.entries(MCP_SEARCH_CATEGORIES).forEach(([key, category]) => {
            category.keywords.forEach(keyword => {
                searchTerms.forEach(term => {
                    if (keyword.includes(term) || term.includes(keyword)) {
                        score += 12;
                        if (!agentMatches.includes(category.agent)) {
                            agentMatches.push(category.agent);
                        }
                    }
                });
            });
        });
        
        if (score > 0) {
            results.push({
                ...item,
                searchScore: score,
                agentMatches: agentMatches,
                matchedTerms: searchTerms.filter(term => 
                    titleText.includes(term) || contentText.includes(term) || 
                    tagArray.some(tag => tag.includes(term))
                )
            });
        }
    });
    
    // Sort by relevance score
    return results.sort((a, b) => b.searchScore - a.searchScore);
}

/**
 * Generate MCP agent filter interface
 * @param {Object} options - Filter options
 * @returns {string} HTML for agent filters
 */
function generateMCPAgentFilters(options = {}) {
    const selectedAgents = options.selectedAgents || [];
    
    let html = `
        <div class="mcp-agent-filters" style="margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border-radius: 8px;">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.1rem;">🤖 Filter by MCP Agent Specialization</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    `;
    
    Object.entries(MCP_SEARCH_CATEGORIES).forEach(([key, category]) => {
        const isSelected = selectedAgents.includes(key);
        const selectedClass = isSelected ? 'selected' : '';
        
        html += `
            <button class="agent-filter-btn ${selectedClass}" 
                    data-agent="${key}" 
                    style="padding: 0.5rem 1rem; border: 2px solid white; background: ${isSelected ? 'white' : 'transparent'}; 
                           color: ${isSelected ? category.color : 'white'}; border-radius: 20px; cursor: pointer; 
                           transition: all 0.3s ease; font-size: 0.8rem; font-weight: bold;">
                ${category.label}
                <span style="font-size: 0.7rem; opacity: 0.8;">(${category.agent})</span>
            </button>
        `;
    });
    
    html += `
            </div>
            <div style="margin-top: 1rem;">
                <button id="clear-agent-filters" style="padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.2); 
                        border: 1px solid white; color: white; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    Clear All Filters
                </button>
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Initialize MCP-enhanced search interface
 * @param {string} containerId - Container element ID
 * @param {Array} searchableItems - Items to make searchable
 * @param {Object} options - Configuration options
 */
function initializeMCPSearch(containerId, searchableItems, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create search interface using safe DOM methods
    
    // Safe DOM creation instead of innerHTML
    container.replaceChildren();
    const tempDiv = document.createElement('div');
    tempDiv.className = 'mcp-search-interface';
    
    // Create agent filters section
    const filtersSection = document.createElement('div');
    filtersSection.className = 'mcp-agent-filters';
    filtersSection.style.cssText = 'margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border-radius: 8px;';
    
    const filtersTitle = document.createElement('h3');
    filtersTitle.textContent = '🤖 Filter by MCP Agent Specialization';
    filtersTitle.style.cssText = 'color: white; margin-bottom: 1rem; font-size: 1.1rem;';
    filtersSection.appendChild(filtersTitle);
    
    const filterButtonsContainer = document.createElement('div');
    filterButtonsContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 0.5rem;';
    
    // Create filter buttons safely
    Object.entries(MCP_SEARCH_CATEGORIES).forEach(([key, category]) => {
        const btn = document.createElement('button');
        btn.className = 'agent-filter-btn';
        btn.dataset.agent = key;
        btn.style.cssText = `padding: 0.5rem 1rem; border: 2px solid white; background: transparent; color: white; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; font-size: 0.8rem; font-weight: bold;`;
        
        const labelSpan = document.createElement('span');
        labelSpan.textContent = category.label;
        btn.appendChild(labelSpan);
        
        const agentSpan = document.createElement('span');
        agentSpan.textContent = `(${category.agent})`;
        agentSpan.style.cssText = 'font-size: 0.7rem; opacity: 0.8;';
        btn.appendChild(agentSpan);
        
        filterButtonsContainer.appendChild(btn);
    });
    
    filtersSection.appendChild(filterButtonsContainer);
    
    const clearFiltersContainer = document.createElement('div');
    clearFiltersContainer.style.marginTop = '1rem';
    const clearBtn = document.createElement('button');
    clearBtn.id = 'clear-agent-filters';
    clearBtn.textContent = 'Clear All Filters';
    clearBtn.style.cssText = 'padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.2); border: 1px solid white; color: white; border-radius: 4px; cursor: pointer; font-size: 0.8rem;';
    clearFiltersContainer.appendChild(clearBtn);
    filtersSection.appendChild(clearFiltersContainer);
    
    tempDiv.appendChild(filtersSection);
    
    // Create search input section
    const searchInputContainer = document.createElement('div');
    searchInputContainer.style.marginBottom = '1rem';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.id = 'mcp-search-input';
    searchInput.placeholder = 'Search across all learning areas...';
    searchInput.style.cssText = 'width: 100%; padding: 0.75rem; border: 2px solid var(--color-border); border-radius: 8px; font-size: 1rem; background: white;';
    searchInputContainer.appendChild(searchInput);
    tempDiv.appendChild(searchInputContainer);
    
    // Create results section
    const searchResults = document.createElement('div');
    searchResults.id = 'search-results';
    searchResults.className = 'search-results';
    
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';
    searchResults.appendChild(resultsContainer);
    
    const noResults = document.createElement('div');
    noResults.id = 'no-results';
    noResults.style.cssText = 'display: none; text-align: center; padding: 2rem; color: var(--color-text-secondary);';
    const noResultsP1 = document.createElement('p');
    noResultsP1.textContent = 'No resources found matching your search criteria.';
    const noResultsP2 = document.createElement('p');
    noResultsP2.textContent = 'Try different keywords or remove some filters.';
    noResultsP2.style.fontSize = '0.9rem';
    noResults.appendChild(noResultsP1);
    noResults.appendChild(noResultsP2);
    searchResults.appendChild(noResults);
    
    tempDiv.appendChild(searchResults);
    container.appendChild(tempDiv);
    
    // Initialize search functionality - use existing DOM elements
    const searchInputElement = document.getElementById('mcp-search-input');
    const resultsContainerElement = document.getElementById('results-container');
    const noResultsElement = document.getElementById('no-results');
    
    let currentFilters = [];
    
    function performSearch() {
        const query = searchInputElement.value;
        let filteredItems = searchableItems;
        
        // Apply agent filters
        if (currentFilters.length > 0) {
            filteredItems = searchableItems.filter(item => {
                const itemTags = (item.dataset?.tags || item.tags || '').toLowerCase();
                return currentFilters.some(filter => {
                    const category = MCP_SEARCH_CATEGORIES[filter];
                    return category.keywords.some(keyword => itemTags.includes(keyword));
                });
            });
        }
        
        const results = mcpEnhancedSearch(query, filteredItems);
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            resultsContainerElement.style.display = 'none';
            noResultsElement.style.display = 'block';
            return;
        }
        
        noResultsElement.style.display = 'none';
        resultsContainerElement.style.display = 'block';
        
        // Removed unused resultsHTML variable - now using safe DOM creation below
        
        // Safe DOM creation for search results instead of innerHTML
        resultsContainerElement.replaceChildren();
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.cssText = 'border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: white;';
            
            const title = document.createElement('h4');
            title.style.marginBottom = '0.5rem';
            const titleLink = document.createElement('a');
            titleLink.href = item.href || '#';
            titleLink.style.cssText = 'color: var(--color-primary); text-decoration: none;';
            titleLink.textContent = item.title || 'Untitled';
            title.appendChild(titleLink);
            resultItem.appendChild(title);
            
            if (item.description) {
                const description = document.createElement('p');
                description.style.cssText = 'color: var(--color-text-secondary); margin-bottom: 0.5rem; line-height: 1.5;';
                description.textContent = item.description;
                resultItem.appendChild(description);
            }
            
            const footer = document.createElement('div');
            footer.style.cssText = 'display: flex; align-items: center; justify-content: space-between;';
            
            const agentMatches = document.createElement('div');
            agentMatches.className = 'agent-matches';
            if (item.agentMatches) {
                item.agentMatches.forEach(agent => {
                    const badge = document.createElement('span');
                    badge.className = 'agent-badge';
                    badge.style.cssText = 'background: var(--color-secondary); color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-right: 0.25rem;';
                    badge.textContent = agent;
                    agentMatches.appendChild(badge);
                });
            }
            footer.appendChild(agentMatches);
            
            const relevance = document.createElement('div');
            relevance.style.cssText = 'font-size: 0.8rem; color: var(--color-text-secondary);';
            relevance.textContent = `Relevance: ${item.searchScore || 0}`;
            footer.appendChild(relevance);
            
            resultItem.appendChild(footer);
            resultsContainerElement.appendChild(resultItem);
        });
    }
    
    // Event listeners
    searchInputElement.addEventListener('input', performSearch);
    
    // Agent filter event listeners
    document.querySelectorAll('.agent-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const agent = e.target.dataset.agent;
            if (currentFilters.includes(agent)) {
                currentFilters = currentFilters.filter(f => f !== agent);
                e.target.classList.remove('selected');
            } else {
                currentFilters.push(agent);
                e.target.classList.add('selected');
            }
            performSearch();
        });
    });
    
    document.getElementById('clear-agent-filters').addEventListener('click', () => {
        currentFilters = [];
        document.querySelectorAll('.agent-filter-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        performSearch();
    });
    
    // Initial display
    displaySearchResults(searchableItems);
}

// Export enhanced functions
if (typeof window !== 'undefined') {
    window.SharedComponents = {
        generateNavigation,
        generateRecommendedReading,
        generateBreadcrumb,
        initializeSharedComponents,
        getReadingTopicFromFilename,
        RECOMMENDED_READING,
        // New MCP-enhanced functions
        mcpEnhancedSearch,
        generateMCPAgentFilters,
        initializeMCPSearch,
        MCP_SEARCH_CATEGORIES
    };
}

/**
 * Enhanced filtering for curriculum-enhanced resources
 */
function initializeCurriculumEnhancedFilter() {
    const tagsFilter = document.getElementById('tags-filter');
    if (!tagsFilter) return;
    
    tagsFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        const resourceCards = document.querySelectorAll('.resource-card');
        
        resourceCards.forEach(card => {
            if (selectedValue === 'curriculum-enhanced') {
                // Show only curriculum-enhanced resources
                // Safe text content checking instead of innerHTML
                const cardText = card.textContent || '';
                const hasCurriculumSection = cardText.includes('curriculum-alignment.html') || 
                                           cardText.includes('Achievement Objective') ||
                                           cardText.includes('NZ Curriculum') ||
                                           card.querySelector('a[href*="curriculum-alignment"]') !== null;
                
                if (hasCurriculumSection) {
                    card.style.display = 'block';
                    // Add visual indicator
                    card.style.boxShadow = '0 4px 12px rgba(64, 224, 208, 0.3)';
                    card.style.borderLeft = '4px solid var(--color-accent)';
                } else {
                    card.style.display = 'none';
                }
            } else if (selectedValue === '') {
                // Show all resources
                card.style.display = 'block';
                card.style.boxShadow = '';
                card.style.borderLeft = '';
            }
        });
    });
}

// Auto-initialize if running in browser and data attributes are present
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const autoInit = body.dataset.autoInit;
    
    if (autoInit === 'true') {
        const options = {
            currentPage: body.dataset.currentPage || '',
            readingTopic: body.dataset.readingTopic || getReadingTopicFromFilename(window.location.pathname),
            breadcrumbPath: body.dataset.breadcrumbPath || ''
        };
        
        initializeSharedComponents(options);
        
        // Initialize enhanced curriculum filtering
        initializeCurriculumEnhancedFilter();
    }
    
    console.log('Te Kete Ako loaded with curriculum enhancement features');
    
    // Initialize Firebase Authentication if available
    initializeFirebaseAuth();
});

/**
 * =================================================================
 * SUPABASE AUTHENTICATION MODULE
 * =================================================================
 * 
 * Provides secure authentication functionality for Te Kete Ako platform
 * Integrates with Supabase Auth for user management, progress tracking,
 * and personalized learning experiences.
 * 
 * Features:
 * - Secure sign-in/sign-up with email/password
 * - User profile management with education metadata
 * - Learning progress tracking
 * - Cultural safety and privacy protection
 * - Integration with Te Kete Ako profile system
 * =================================================================
 */

class TeKeteSupabaseAuth {
    constructor() {
        this.user = null;
        this.supabase = null;
        this.initialized = false;
        
        // Cultural greeting messages
        this.culturalGreetings = [
            { en: 'Welcome back!', maori: 'Nau mai hoki mai!' },
            { en: 'Great to see you!', maori: 'He pai koe kitea!' },
            { en: 'Ready to learn?', maori: 'Kei te reri koe ki te ako?' }
        ];
        
        this.initializeSupabaseSDK();
    }
    
    async initializeSupabaseSDK() {
        try {
            // Check if Supabase is already loaded
            if (typeof window.supabase !== 'undefined') {
                // Use existing Supabase but create proper client with config
                const supabaseUrl = window.ENV?.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co';
                const supabaseKey = window.ENV?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';
                
                if (supabaseUrl && supabaseKey) {
                    this.supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
                    this.setupSupabase();
                    return;
                }
            }
            
            // Load Supabase SDK dynamically if not present
            await this.loadSupabaseSDK();
            this.setupSupabase();
            
        } catch (error) {
            console.warn('Supabase SDK not available:', error.message);
            this.showFallbackAuth();
        }
    }
    
    async loadSupabaseSDK() {
        return new Promise((resolve, reject) => {
            // Load Supabase client
            const supabaseScript = document.createElement('script');
            supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
            supabaseScript.onload = () => {
                // Initialize Supabase client with your credentials
                const supabaseUrl = window.ENV?.SUPABASE_URL || 'ENVIRONMENT_VARIABLE_REQUIRED';
                const supabaseKey = window.ENV?.SUPABASE_ANON_KEY || 'ENVIRONMENT_VARIABLE_REQUIRED';
                
                this.supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
                resolve();
            };
            supabaseScript.onerror = reject;
            document.head.appendChild(supabaseScript);
        });
    }
    
    setupSupabase() {
        this.initialized = true;
        this.setupAuthStateListener();
        this.createAuthUI();
    }
    
    setupAuthStateListener() {
        // Listen for auth state changes
        this.supabase.auth.onAuthStateChange((event, session) => {
            this.user = session?.user || null;
            this.updateAuthUI();
            
            if (event === 'SIGNED_IN') {
                this.onUserSignedIn(this.user);
            } else if (event === 'SIGNED_OUT') {
                this.onUserSignedOut();
            }
        });
        
        // Check current session
        this.supabase.auth.getSession().then(({ data: { session } }) => {
            this.user = session?.user || null;
            this.updateAuthUI();
        });
    }
    
    createAuthUI() {
        // Create authentication UI elements
        const authContainer = document.createElement('div');
        authContainer.id = 'te-kete-auth';
        authContainer.className = 'auth-container no-print';
        authContainer.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 0.75rem;
            max-width: 300px;
            font-size: 0.9rem;
        `;
        
        // Add to page
        document.body.appendChild(authContainer);
        this.authContainer = authContainer;
        this.updateAuthUI();
    }
    
    updateAuthUI() {
        if (!this.authContainer) return;
        
        this.authContainer.replaceChildren();
        
        if (this.user) {
            this.createSignedInUI();
        } else {
            this.createSignedOutUI();
        }
    }
    
    createSignedInUI() {
        const greeting = this.culturalGreetings[Math.floor(Math.random() * this.culturalGreetings.length)];
        
        // User greeting
        const greetingDiv = document.createElement('div');
        greetingDiv.style.cssText = 'margin-bottom: 0.5rem; color: var(--color-primary); font-weight: 500;';
        greetingDiv.textContent = greeting.en;
        
        const maoriGreeting = document.createElement('div');
        maoriGreeting.style.cssText = 'font-size: 0.8rem; color: var(--color-text-secondary); font-style: italic; margin-bottom: 0.75rem;';
        maoriGreeting.textContent = greeting.maori;
        
        // User info
        const userInfo = document.createElement('div');
        userInfo.style.cssText = 'margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--color-border);';
        
        const userName = document.createElement('div');
        userName.style.cssText = 'font-weight: 500; margin-bottom: 0.25rem;';
        userName.textContent = this.user.displayName || this.user.email.split('@')[0];
        
        const userEmail = document.createElement('div');
        userEmail.style.cssText = 'font-size: 0.8rem; color: var(--color-text-secondary);';
        userEmail.textContent = this.user.email;
        
        userInfo.appendChild(userName);
        userInfo.appendChild(userEmail);
        
        // Action buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 0.5rem; flex-wrap: wrap;';
        
        const profileBtn = this.createButton('👤 Profile', () => this.showProfile());
        const progressBtn = this.createButton('📊 Progress', () => this.showProgress());
        const signOutBtn = this.createButton('↗️ Sign Out', () => this.signOut());
        
        profileBtn.style.fontSize = '0.8rem';
        progressBtn.style.fontSize = '0.8rem';
        signOutBtn.style.fontSize = '0.8rem';
        
        buttonContainer.appendChild(profileBtn);
        buttonContainer.appendChild(progressBtn);
        buttonContainer.appendChild(signOutBtn);
        
        this.authContainer.appendChild(greetingDiv);
        this.authContainer.appendChild(maoriGreeting);
        this.authContainer.appendChild(userInfo);
        this.authContainer.appendChild(buttonContainer);
    }
    
    createSignedOutUI() {
        const welcomeText = document.createElement('div');
        welcomeText.style.cssText = 'margin-bottom: 0.75rem; color: var(--color-primary); font-weight: 500;';
        welcomeText.textContent = 'Join Te Kete Ako';
        
        const description = document.createElement('div');
        description.style.cssText = 'font-size: 0.8rem; color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.4;';
        description.textContent = 'Sign in to track your learning progress and access personalized resources.';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
        
        const signInBtn = this.createButton('🚀 Sign In', () => this.showSignIn());
        const signUpBtn = this.createButton('✨ Create Account', () => this.showSignUp());
        
        signInBtn.style.cssText += 'background: var(--color-primary); color: white;';
        signUpBtn.style.cssText += 'background: transparent; color: var(--color-primary); border: 1px solid var(--color-primary);';
        
        buttonContainer.appendChild(signInBtn);
        buttonContainer.appendChild(signUpBtn);
        
        this.authContainer.appendChild(welcomeText);
        this.authContainer.appendChild(description);
        this.authContainer.appendChild(buttonContainer);
    }
    
    createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.cssText = `
            padding: 0.5rem 0.75rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s ease;
            background: var(--color-secondary);
            color: white;
        `;
        
        button.addEventListener('click', onClick);
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-1px)';
            button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
        
        return button;
    }
    
    // Authentication methods
    async signInWithEmail(email, password) {
        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) throw error;
            
            this.showNotification('Welcome back! / Nau mai hoki mai!', 'success');
            return data.user;
        } catch (error) {
            this.showNotification(`Sign in failed: ${error.message}`, 'error');
            throw error;
        }
    }
    
    async signUpWithEmail(email, password, displayName, schoolName, yearLevel, role = 'student') {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        display_name: displayName,
                        school_name: schoolName,
                        year_level: yearLevel,
                        role: role
                    }
                }
            });
            
            if (error) throw error;
            
            this.showNotification('Account created successfully! Check your email to verify. / Kua oti te hanga!', 'success');
            return data.user;
        } catch (error) {
            this.showNotification(`Sign up failed: ${error.message}`, 'error');
            throw error;
        }
    }
    
    async signOut() {
        try {
            const { error } = await this.supabase.auth.signOut();
            if (error) throw error;
            
            this.showNotification('Signed out successfully / Ka kite ano!', 'success');
        } catch (error) {
            this.showNotification(`Sign out failed: ${error.message}`, 'error');
        }
    }
    
    // UI Methods
    showSignIn() {
        const modal = this.createAuthModal('Sign In', (formData) => {
            return this.signInWithEmail(formData.email, formData.password);
        });
    }
    
    showSignUp() {
        const modal = this.createAuthModal('Create Account', (formData) => {
            return this.signUpWithEmail(
                formData.email, 
                formData.password, 
                formData.displayName,
                formData.schoolName,
                parseInt(formData.yearLevel) || null,
                formData.role
            );
        }, true);
    }
    
    createAuthModal(title, onSubmit, includeDisplayName = false) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Create modal content
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            max-width: 400px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        `;
        
        // Modal title
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = title;
        modalTitle.style.cssText = 'margin-bottom: 1.5rem; color: var(--color-primary);';
        
        // Create form
        const form = document.createElement('form');
        
        if (includeDisplayName) {
            // Sign-up form with educational fields
            const nameField = this.createFormField('displayName', 'text', 'Your Name', true);
            form.appendChild(nameField);
            
            const emailField = this.createFormField('email', 'email', 'Email Address', true);
            form.appendChild(emailField);
            
            const passwordField = this.createFormField('password', 'password', 'Password (min 8 characters)', true);
            passwordField.querySelector('input').minLength = 8;
            form.appendChild(passwordField);
            
            const schoolField = this.createFormField('schoolName', 'text', 'School Name', false);
            form.appendChild(schoolField);
            
            const yearField = this.createSelectField('yearLevel', 'Year Level', [
                { value: '', text: 'Select Year Level...' },
                { value: '7', text: 'Year 7' },
                { value: '8', text: 'Year 8' },
                { value: '9', text: 'Year 9' },
                { value: '10', text: 'Year 10' },
                { value: '11', text: 'Year 11' },
                { value: '12', text: 'Year 12' },
                { value: '13', text: 'Year 13' },
                { value: 'teacher', text: 'Teacher' },
                { value: 'other', text: 'Other' }
            ]);
            form.appendChild(yearField);
            
            const roleField = this.createSelectField('role', 'Role', [
                { value: 'student', text: 'Student' },
                { value: 'teacher', text: 'Teacher' },
                { value: 'whānau', text: 'Whānau/Family' }
            ]);
            form.appendChild(roleField);
        } else {
            // Sign-in form
            const emailField = this.createFormField('email', 'email', 'Email Address', true);
            const passwordField = this.createFormField('password', 'password', 'Password', true);
            
            form.appendChild(emailField);
            form.appendChild(passwordField);
        }
        
        // Form buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 1rem; margin-top: 1.5rem;';
        
        const submitBtn = this.createButton(title, () => {});
        submitBtn.type = 'submit';
        submitBtn.style.cssText += 'flex: 1; background: var(--color-primary); color: white;';
        
        const cancelBtn = this.createButton('Cancel', () => {
            document.body.removeChild(overlay);
        });
        cancelBtn.type = 'button';
        cancelBtn.style.cssText += 'flex: 1; background: var(--color-border); color: var(--color-text);';
        
        buttonContainer.appendChild(submitBtn);
        buttonContainer.appendChild(cancelBtn);
        
        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing...';
                await onSubmit(data);
                document.body.removeChild(overlay);
            } catch (error) {
                console.error('Auth error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = title;
            }
        });
        
        modal.appendChild(modalTitle);
        modal.appendChild(form);
        form.appendChild(buttonContainer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Focus first input
        const firstInput = form.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        return overlay;
    }
    
    createFormField(name, type, placeholder, required = false) {
        const fieldContainer = document.createElement('div');
        fieldContainer.style.cssText = 'margin-bottom: 1rem;';
        
        const input = document.createElement('input');
        input.name = name;
        input.type = type;
        input.placeholder = placeholder;
        input.required = required;
        input.style.cssText = `
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            font-size: 1rem;
            transition: border-color 0.2s ease;
        `;
        
        input.addEventListener('focus', () => {
            input.style.borderColor = 'var(--color-primary)';
            input.style.outline = 'none';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = 'var(--color-border)';
        });
        
        fieldContainer.appendChild(input);
        return fieldContainer;
    }
    
    createSelectField(name, label, options) {
        const fieldContainer = document.createElement('div');
        fieldContainer.style.cssText = 'margin-bottom: 1rem;';
        
        const labelElement = document.createElement('label');
        labelElement.textContent = label;
        labelElement.style.cssText = 'display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--color-primary);';
        
        const select = document.createElement('select');
        select.name = name;
        select.style.cssText = `
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--color-border);
            border-radius: 6px;
            font-size: 1rem;
            background: white;
            transition: border-color 0.2s ease;
        `;
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            select.appendChild(optionElement);
        });
        
        select.addEventListener('focus', () => {
            select.style.borderColor = 'var(--color-primary)';
            select.style.outline = 'none';
        });
        
        select.addEventListener('blur', () => {
            select.style.borderColor = 'var(--color-border)';
        });
        
        fieldContainer.appendChild(labelElement);
        fieldContainer.appendChild(select);
        return fieldContainer;
    }
    
    showProfile() {
        this.showNotification('Profile management coming soon! / Ka utaina a mua!', 'info');
    }
    
    showProgress() {
        this.showNotification('Learning progress tracking coming soon! / Ka utaina nga hua ako!', 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10001;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 90%;
            text-align: center;
            font-weight: 500;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        `;
        
        // Set colors based on type
        const colors = {
            success: { bg: '#4CAF50', text: 'white' },
            error: { bg: '#f44336', text: 'white' },
            info: { bg: 'var(--color-primary)', text: 'white' },
            warning: { bg: '#ff9800', text: 'white' }
        };
        
        const color = colors[type] || colors.info;
        notification.style.backgroundColor = color.bg;
        notification.style.color = color.text;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    // Event handlers
    onUserSignedIn(user) {
        console.log('User signed in:', user.email);
        
        // Could integrate with GraphRAG for personalized recommendations
        this.updatePersonalizedContent(user);
        
        // Track learning progress
        this.initializeLearningTracking(user);
    }
    
    onUserSignedOut() {
        console.log('User signed out');
        
        // Clear personalized content
        this.clearPersonalizedContent();
    }
    
    updatePersonalizedContent(user) {
        // Future integration with GraphRAG system for personalized learning paths
        console.log('Personalizing content for:', user.email);
    }
    
    clearPersonalizedContent() {
        // Clear any personalized UI elements
        console.log('Clearing personalized content');
    }
    
    initializeLearningTracking(user) {
        // Future integration with learning analytics
        console.log('Initializing learning tracking for:', user.email);
    }
    
    showFallbackAuth() {
        // Fallback authentication without Firebase
        console.log('Using fallback authentication');
        this.createSimpleAuthUI();
    }
    
    createSimpleAuthUI() {
        // Simple authentication UI for when Firebase is not available
        const authContainer = document.createElement('div');
        authContainer.id = 'te-kete-simple-auth';
        authContainer.className = 'auth-container no-print';
        authContainer.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 0.75rem;
            max-width: 250px;
            font-size: 0.9rem;
            text-align: center;
        `;
        
        const message = document.createElement('div');
        message.style.cssText = 'color: var(--color-text-secondary);';
        message.textContent = 'Authentication temporarily unavailable';
        
        authContainer.appendChild(message);
        document.body.appendChild(authContainer);
    }
}

// Initialize Supabase Authentication
function initializeFirebaseAuth() {
    if (typeof window !== 'undefined') {
        window.teKeteAuth = new TeKeteSupabaseAuth();
        
        // Add to shared components export
        if (window.SharedComponents) {
            window.SharedComponents.auth = window.teKeteAuth;
        }
    }
}