/**
 * ================================================================
 * ENHANCED HEADER SYSTEM - Modern Functionality & Components
 * ================================================================
 * 
 * PURPOSE: Upgrades the header with sophisticated functionality that reflects
 * the full scope of our site features, including authentication, search,
 * smart navigation, and user-specific tools.
 * 
 * ENHANCED FEATURES:
 * - Intelligent search with live suggestions
 * - Mega dropdowns with content previews
 * - User dashboard integration
 * - Quick action buttons for generators and tools
 * - Progress indicators and notifications
 * - Responsive design with mobile optimization
 * - Cultural elements and whakataukī integration
 * 
 * DESIGN PHILOSOPHY:
 * - Maintain beautiful gradient and cultural design
 * - Add powerful functionality without cluttering
 * - Smart context-aware features
 * - Seamless integration with existing auth system
 * 
 * FOR AI AGENTS:
 * - This enhances navigation and user experience
 * - Provides quick access to all site functionality
 * - Maintains cultural authenticity while being modern
 * 
 * ================================================================
 */

class EnhancedHeader {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.searchData = this.initSearchData();
        this.recentActivity = this.loadRecentActivity();
        this.init();
    }

    initSearchData() {
        return {
            units: [
                { title: "Te Ao Māori - Cultural Identity", url: "units/unit-1-te-ao-maori.html", type: "Unit Plan" },
                { title: "Decolonized Aotearoa History", url: "units/unit-2-decolonized-history.html", type: "Unit Plan" },
                { title: "STEM + Mātauranga Māori", url: "units/unit-3-stem-matauranga.html", type: "Unit Plan" },
                { title: "Future Rangatiratanga & Action", url: "units/unit-6-future-rangatiratanga.html", type: "Unit Plan" }
            ],
            lessons: [
                { title: "Ko Wai Au? - Who Am I?", url: "units/lessons/unit-1-lesson-1.html", type: "Lesson Plan" },
                { title: "Haka & Cultural Expression", url: "units/lessons/unit-1-lesson-3.html", type: "Lesson Plan" },
                { title: "Pre-Colonial Excellence", url: "units/lessons/unit-2-lesson-1.html", type: "Lesson Plan" },
                { title: "Te Tiriti o Waitangi - Partnership", url: "units/lessons/unit-1-lesson-4.html", type: "Lesson Plan" }
            ],
            resources: [
                { title: "Haka Comprehension Analysis", url: "handouts/haka-comprehension-handout.html", type: "Handout" },
                { title: "Treaty of Waitangi Analysis", url: "handouts/treaty-of-waitangi-handout.html", type: "Handout" },
                { title: "Te Reo Māori Greetings", url: "handouts/te-reo-maori-greetings-handout.html", type: "Handout" },
                { title: "PEEL Argument Method", url: "handouts/writers-toolkit-peel-argument-handout.html", type: "Handout" }
            ],
            games: [
                { title: "Te Reo Māori Wordle", url: "games/te-reo-wordle.html", type: "Game" },
                { title: "Categories Challenge", url: "games/categories.html", type: "Game" }
            ]
        };
    }

    loadRecentActivity() {
        // Load from localStorage or return defaults
        const saved = localStorage.getItem('te_kete_recent_activity');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            lastVisited: [],
            bookmarks: [],
            generatedActivities: 0,
            gamesPlayed: 0
        };
    }

    init() {
        this.checkAuthenticationStatus();
        this.enhanceExistingHeader();
        this.addAdvancedFeatures();
        this.setupEventListeners();
        this.addHeaderStyles();
    }

    async checkAuthenticationStatus() {
        // Check with Supabase auth system
        try {
            const { data: { user } } = await supabase.auth.getUser();
            this.isAuthenticated = !!user;
            this.currentUser = user;
        } catch (error) {
            console.error('Error checking auth status:', error);
            this.isAuthenticated = false;
            this.currentUser = null;
        }
    }

    enhanceExistingHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        // Add enhanced navigation structure
        const navContainer = header.querySelector('.nav-container');
        if (navContainer) {
            this.upgradeNavigation(navContainer);
        }
    }

    upgradeNavigation(navContainer) {
        // Find the existing nav
        const mainNav = navContainer.querySelector('.main-nav');
        if (!mainNav) return;

        // Add search and tools before the main nav
        const enhancedToolbar = document.createElement('div');
        enhancedToolbar.className = 'enhanced-toolbar';
        enhancedToolbar.innerHTML = `
            <!-- Search Component -->
            <div class="header-search-component">
                <div class="search-input-container">
                    <input type="text" 
                           class="header-search-input" 
                           placeholder="Search resources, lessons, games..."
                           id="header-search">
                    <button class="search-btn" aria-label="Search">
                        <span class="search-icon">🔍</span>
                    </button>
                </div>
                <div class="search-suggestions" id="search-suggestions" style="display: none;"></div>
            </div>

            <!-- Quick Actions -->
            <div class="header-quick-actions">
                <button class="quick-action-btn" onclick="window.generateRandomActivity?.()" title="Generate Random Activity">
                    <span class="action-icon">🎲</span>
                    <span class="action-label">Generate</span>
                </button>
                
                <button class="quick-action-btn" onclick="window.showContentHierarchy?.()" title="Content Hierarchy">
                    <span class="action-icon">🗂️</span>
                    <span class="action-label">Hierarchy</span>
                </button>
                
                <div class="user-notifications" id="user-notifications">
                    <button class="notification-btn" onclick="this.toggleNotifications()">
                        <span class="notification-icon">🔔</span>
                        <span class="notification-badge" id="notification-count" style="display: none;">0</span>
                    </button>
                    <div class="notifications-dropdown" id="notifications-dropdown" style="display: none;">
                        <div class="notification-header">
                            <h4>Recent Activity</h4>
                        </div>
                        <div class="notification-list" id="notification-list">
                            <!-- Dynamic notifications will be inserted here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert before existing nav
        navContainer.insertBefore(enhancedToolbar, mainNav);

        // Enhance existing navigation items with mega dropdowns
        this.enhanceNavigationItems(mainNav);

        // Add user profile area if authenticated
        if (this.isAuthenticated) {
            this.addUserProfileArea(navContainer);
        }
    }

    enhanceNavigationItems(mainNav) {
        const navItems = mainNav.querySelectorAll('li');
        
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (!link) return;

            const href = link.getAttribute('href');
            
            // Add mega dropdowns for main sections
            if (href?.includes('unit-plans.html')) {
                this.addMegaDropdown(item, 'units');
            } else if (href?.includes('lessons.html')) {
                this.addMegaDropdown(item, 'lessons');
            } else if (href?.includes('handouts.html')) {
                this.addMegaDropdown(item, 'resources');
            } else if (href?.includes('games.html')) {
                this.addMegaDropdown(item, 'games');
            }
        });
    }

    addMegaDropdown(navItem, type) {
        const dropdown = document.createElement('div');
        dropdown.className = 'mega-dropdown';
        
        const content = this.getMegaDropdownContent(type);
        dropdown.innerHTML = content;
        
        navItem.style.position = 'relative';
        navItem.appendChild(dropdown);

        // Add hover events
        navItem.addEventListener('mouseenter', () => {
            dropdown.style.display = 'block';
            dropdown.style.animation = 'fadeInDown 0.3s ease-out';
        });

        navItem.addEventListener('mouseleave', () => {
            dropdown.style.animation = 'fadeOutUp 0.3s ease-in';
            setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300);
        });
    }

    getMegaDropdownContent(type) {
        const data = this.searchData[type] || [];
        const typeLabels = {
            units: { title: '📚 Unit Plans', description: 'Complete strategic teaching units' },
            lessons: { title: '📖 Lesson Plans', description: '75-minute teaching instances' },
            resources: { title: '📄 Resources', description: 'Supporting handouts and materials' },
            games: { title: '🎮 Games', description: 'Interactive educational activities' }
        };

        const typeInfo = typeLabels[type];
        
        return `
            <div class="mega-dropdown-header">
                <h3>${typeInfo.title}</h3>
                <p>${typeInfo.description}</p>
            </div>
            
            <div class="mega-dropdown-content">
                <div class="featured-items">
                    <h4>🌟 Featured</h4>
                    ${data.slice(0, 3).map(item => `
                        <a href="${item.url}" class="featured-item">
                            <span class="featured-icon">${this.getTypeIcon(item.type)}</span>
                            <div class="featured-info">
                                <div class="featured-title">${item.title}</div>
                                <div class="featured-type">${item.type}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
                
                <div class="quick-links">
                    <h4>⚡ Quick Access</h4>
                    <a href="${this.getMainPageUrl(type)}" class="quick-link">View All ${typeInfo.title.replace(/📚|📖|📄|🎮/, '').trim()}</a>
                    ${type === 'units' ? '<a href="#" onclick="window.showContentHierarchy?.()" class="quick-link">Content Hierarchy</a>' : ''}
                    ${type === 'games' ? '<a href="games/te-reo-wordle.html" class="quick-link">Play Te Reo Wordle</a>' : ''}
                    ${type === 'resources' ? '<a href="activities.html" class="quick-link">Do Now Activities</a>' : ''}
                </div>
            </div>
            
            <div class="mega-dropdown-footer">
                <button onclick="this.closeDropdown()" class="close-dropdown">✕</button>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            'Unit Plan': '📚',
            'Lesson Plan': '📖',
            'Handout': '📄',
            'Game': '🎮',
            'Activity': '⚡'
        };
        return icons[type] || '📋';
    }

    getMainPageUrl(type) {
        const urls = {
            units: 'unit-plans.html',
            lessons: 'lessons.html',
            resources: 'handouts.html',
            games: 'games.html'
        };
        return urls[type] || '#';
    }

    addUserProfileArea(navContainer) {
        const userArea = document.createElement('div');
        userArea.className = 'user-profile-area';
        userArea.innerHTML = `
            <div class="user-avatar" onclick="this.toggleUserMenu()">
                <span class="user-initial">${this.currentUser?.name?.charAt(0) || 'U'}</span>
                <span class="user-status-dot"></span>
            </div>
            
            <div class="user-menu-dropdown" id="user-menu" style="display: none;">
                <div class="user-menu-header">
                    <div class="user-info">
                        <div class="user-name">${this.currentUser?.name || 'User'}</div>
                        <div class="user-role">${this.currentUser?.role || 'Educator'}</div>
                    </div>
                </div>
                
                <div class="user-menu-items">
                    <a href="my-kete.html" class="user-menu-item">
                        <span class="menu-icon">🧺</span>
                        <span>My Kete</span>
                    </a>
                    
                    <a href="#profile" class="user-menu-item">
                        <span class="menu-icon">👤</span>
                        <span>Profile Settings</span>
                    </a>
                    
                    <a href="#preferences" class="user-menu-item">
                        <span class="menu-icon">⚙️</span>
                        <span>Preferences</span>
                    </a>
                    
                    <div class="user-menu-divider"></div>
                    
                    <a href="#logout" onclick="this.handleLogout()" class="user-menu-item">
                        <span class="menu-icon">🚪</span>
                        <span>Log Out</span>
                    </a>
                </div>
                
                <div class="user-menu-footer">
                    <div class="user-stats">
                        <div class="stat-item">
                            <span class="stat-value">${this.recentActivity.generatedActivities}</span>
                            <span class="stat-label">Activities Generated</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.recentActivity.gamesPlayed}</span>
                            <span class="stat-label">Games Played</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        navContainer.appendChild(userArea);
    }

    addAdvancedFeatures() {
        this.setupSmartSearch();
        this.addKeyboardShortcuts();
        this.setupNotificationSystem();
        this.addProgressIndicators();
    }

    setupSmartSearch() {
        const searchInput = document.getElementById('header-search');
        const suggestionsContainer = document.getElementById('search-suggestions');
        
        if (!searchInput || !suggestionsContainer) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSmartSearch(query, suggestionsContainer);
            }, 300);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.length >= 2) {
                suggestionsContainer.style.display = 'block';
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    performSmartSearch(query, container) {
        const allItems = [
            ...this.searchData.units,
            ...this.searchData.lessons,
            ...this.searchData.resources,
            ...this.searchData.games
        ];

        const results = allItems.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        ).slice(0, 8);

        if (results.length === 0) {
            container.innerHTML = `
                <div class="search-no-results">
                    <div class="no-results-icon">🔍</div>
                    <div class="no-results-text">No results found for "${query}"</div>
                    <div class="search-suggestions-help">
                        Try searching for: "te ao māori", "lesson plans", "games", "handouts"
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="search-results-header">
                    <span>Search Results (${results.length})</span>
                </div>
                ${results.map(result => `
                    <a href="${result.url}" class="search-result-item">
                        <span class="result-icon">${this.getTypeIcon(result.type)}</span>
                        <div class="result-content">
                            <div class="result-title">${this.highlightQuery(result.title, query)}</div>
                            <div class="result-type">${result.type}</div>
                        </div>
                    </a>
                `).join('')}
                <div class="search-results-footer">
                    <button onclick="this.viewAllResults('${query}')" class="view-all-btn">
                        View all results for "${query}"
                    </button>
                </div>
            `;
        }

        container.style.display = 'block';
    }

    highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('header-search');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Ctrl/Cmd + G for generate activity
            if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
                e.preventDefault();
                if (window.generateRandomActivity) {
                    window.generateRandomActivity();
                }
            }

            // Escape to close dropdowns
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    setupNotificationSystem() {
        // Check for new content, achievements, etc.
        this.checkForNotifications();
        
        // Set up periodic checks
        setInterval(() => {
            this.checkForNotifications();
        }, 30000); // Check every 30 seconds
    }

    checkForNotifications() {
        const notifications = [];
        
        // Check for new achievements
        if (window.teKeteAkoGamification) {
            const summary = window.teKeteAkoGamification.getProgressSummary();
            if (summary.recentAchievements?.length > 0) {
                notifications.push({
                    type: 'achievement',
                    title: 'New Achievement!',
                    message: `You've unlocked: ${summary.recentAchievements[0].name}`,
                    icon: '🏆'
                });
            }
        }

        // Check for daily streak
        const lastVisit = localStorage.getItem('te_kete_last_visit');
        const today = new Date().toDateString();
        if (lastVisit !== today) {
            notifications.push({
                type: 'daily',
                title: 'Welcome back!',
                message: 'Check out today\'s featured whakataukī',
                icon: '🌅'
            });
            localStorage.setItem('te_kete_last_visit', today);
        }

        this.updateNotificationBadge(notifications.length);
        this.displayNotifications(notifications);
    }

    updateNotificationBadge(count) {
        const badge = document.getElementById('notification-count');
        if (badge) {
            if (count > 0) {
                badge.textContent = count;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    displayNotifications(notifications) {
        const container = document.getElementById('notification-list');
        if (!container) return;

        if (notifications.length === 0) {
            container.innerHTML = `
                <div class="notification-empty">
                    <div class="empty-icon">🌿</div>
                    <div class="empty-text">All caught up!</div>
                </div>
            `;
        } else {
            container.innerHTML = notifications.map(notification => `
                <div class="notification-item">
                    <span class="notification-icon">${notification.icon}</span>
                    <div class="notification-content">
                        <div class="notification-title">${notification.title}</div>
                        <div class="notification-message">${notification.message}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    addProgressIndicators() {
        // Add subtle progress indicators for user engagement
        if (this.isAuthenticated) {
            const progressBar = document.createElement('div');
            progressBar.className = 'header-progress-bar';
            progressBar.innerHTML = `
                <div class="progress-fill" style="width: ${this.calculateUserProgress()}%"></div>
            `;
            
            const header = document.querySelector('.site-header');
            if (header) {
                header.appendChild(progressBar);
            }
        }
    }

    calculateUserProgress() {
        // Simple progress calculation based on activity
        const activities = this.recentActivity.generatedActivities;
        const games = this.recentActivity.gamesPlayed;
        const total = activities + games;
        
        return Math.min(100, (total / 10) * 100); // 10 actions = 100%
    }

    addHeaderStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Toolbar */
            .enhanced-toolbar {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-right: 2rem;
            }
            
            /* Search Component */
            .header-search-component {
                position: relative;
                min-width: 300px;
            }
            
            .search-input-container {
                display: flex;
                align-items: center;
                background: rgba(255,255,255,0.15);
                border-radius: 25px;
                padding: 0.5rem 1rem;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                transition: all 0.3s ease;
            }
            
            .search-input-container:focus-within {
                background: rgba(255,255,255,0.25);
                border-color: rgba(255,255,255,0.4);
                box-shadow: 0 0 0 3px rgba(255,255,255,0.1);
            }
            
            .header-search-input {
                background: transparent;
                border: none;
                color: white;
                font-size: 0.9rem;
                flex: 1;
                padding: 0.25rem 0;
                outline: none;
            }
            
            .header-search-input::placeholder {
                color: rgba(255,255,255,0.7);
            }
            
            .search-btn {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0.25rem;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .search-btn:hover {
                opacity: 1;
            }
            
            /* Search Suggestions */
            .search-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border);
                z-index: 1000;
                max-height: 400px;
                overflow-y: auto;
                margin-top: 0.5rem;
            }
            
            .search-results-header {
                padding: 1rem 1rem 0.5rem;
                font-size: 0.8rem;
                font-weight: 600;
                color: var(--color-text-secondary);
                border-bottom: 1px solid var(--color-border);
            }
            
            .search-result-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                text-decoration: none;
                color: var(--color-text-primary);
                border-bottom: 1px solid var(--color-border-light);
                transition: all 0.2s ease;
            }
            
            .search-result-item:hover {
                background: var(--color-surface);
                text-decoration: none;
                color: var(--color-text-primary);
            }
            
            .result-icon {
                font-size: 1.2rem;
                flex-shrink: 0;
            }
            
            .result-content {
                flex: 1;
            }
            
            .result-title {
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            
            .result-title mark {
                background: var(--color-accent);
                color: white;
                padding: 0.1rem 0.2rem;
                border-radius: 3px;
            }
            
            .result-type {
                font-size: 0.8rem;
                color: var(--color-text-secondary);
            }
            
            .search-no-results {
                padding: 2rem;
                text-align: center;
                color: var(--color-text-secondary);
            }
            
            .no-results-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                opacity: 0.5;
            }
            
            .search-results-footer {
                padding: 1rem;
                border-top: 1px solid var(--color-border);
            }
            
            .view-all-btn {
                width: 100%;
                background: var(--color-primary);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }
            
            .view-all-btn:hover {
                background: var(--color-secondary);
            }
            
            /* Quick Actions */
            .header-quick-actions {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .quick-action-btn {
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.8rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .quick-action-btn:hover {
                background: rgba(255,255,255,0.25);
                transform: translateY(-2px);
            }
            
            .action-icon {
                font-size: 1rem;
            }
            
            .action-label {
                font-weight: 500;
            }
            
            /* Mega Dropdowns */
            .mega-dropdown {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                border-radius: 16px;
                box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border);
                z-index: 1000;
                min-width: 500px;
                max-width: 700px;
                display: none;
            }
            
            .mega-dropdown-header {
                padding: 1.5rem 1.5rem 1rem;
                border-bottom: 1px solid var(--color-border);
                text-align: center;
            }
            
            .mega-dropdown-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--color-primary);
                font-size: 1.3rem;
            }
            
            .mega-dropdown-header p {
                margin: 0;
                color: var(--color-text-secondary);
                font-size: 0.9rem;
            }
            
            .mega-dropdown-content {
                display: grid;
                grid-template-columns: 2fr 1fr;
                gap: 2rem;
                padding: 1.5rem;
            }
            
            .featured-items h4,
            .quick-links h4 {
                margin: 0 0 1rem 0;
                font-size: 0.9rem;
                color: var(--color-secondary);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .featured-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                text-decoration: none;
                color: var(--color-text-primary);
                border-radius: 10px;
                border: 1px solid var(--color-border-light);
                margin-bottom: 0.75rem;
                transition: all 0.2s ease;
            }
            
            .featured-item:hover {
                background: var(--color-surface);
                border-color: var(--color-secondary);
                text-decoration: none;
                color: var(--color-text-primary);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .featured-icon {
                font-size: 1.3rem;
                flex-shrink: 0;
            }
            
            .featured-title {
                font-weight: 500;
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
            }
            
            .featured-type {
                font-size: 0.8rem;
                color: var(--color-text-secondary);
            }
            
            .quick-links {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .quick-link {
                display: block;
                padding: 0.75rem 1rem;
                background: var(--color-cultural-light);
                color: var(--color-primary);
                text-decoration: none;
                border-radius: 8px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                border: 1px solid var(--color-border-light);
            }
            
            .quick-link:hover {
                background: var(--color-secondary);
                color: white;
                text-decoration: none;
                transform: translateY(-2px);
            }
            
            .mega-dropdown-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid var(--color-border);
                text-align: right;
            }
            
            .close-dropdown {
                background: none;
                border: none;
                color: var(--color-text-secondary);
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-dropdown:hover {
                background: var(--color-border-light);
                color: var(--color-text-primary);
            }
            
            /* User Profile Area */
            .user-profile-area {
                position: relative;
                margin-left: 1rem;
            }
            
            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .user-avatar:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.05);
            }
            
            .user-initial {
                color: white;
                font-weight: bold;
                font-size: 1rem;
            }
            
            .user-status-dot {
                position: absolute;
                bottom: 2px;
                right: 2px;
                width: 10px;
                height: 10px;
                background: #4ade80;
                border-radius: 50%;
                border: 2px solid white;
            }
            
            .user-menu-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border);
                z-index: 1000;
                min-width: 280px;
                margin-top: 0.5rem;
            }
            
            .user-menu-header {
                padding: 1.5rem 1.5rem 1rem;
                border-bottom: 1px solid var(--color-border);
            }
            
            .user-name {
                font-weight: 600;
                color: var(--color-primary);
                margin-bottom: 0.25rem;
            }
            
            .user-role {
                font-size: 0.8rem;
                color: var(--color-text-secondary);
            }
            
            .user-menu-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 1.5rem;
                text-decoration: none;
                color: var(--color-text-primary);
                transition: all 0.2s ease;
                border-bottom: 1px solid var(--color-border-light);
            }
            
            .user-menu-item:hover {
                background: var(--color-surface);
                color: var(--color-primary);
                text-decoration: none;
            }
            
            .menu-icon {
                font-size: 1.1rem;
                flex-shrink: 0;
            }
            
            .user-menu-divider {
                height: 1px;
                background: var(--color-border);
                margin: 0.5rem 1.5rem;
            }
            
            .user-menu-footer {
                padding: 1rem 1.5rem;
                background: var(--color-surface);
                border-radius: 0 0 12px 12px;
            }
            
            .user-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                text-align: center;
            }
            
            .stat-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .stat-value {
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--color-primary);
            }
            
            .stat-label {
                font-size: 0.7rem;
                color: var(--color-text-secondary);
            }
            
            /* Notifications */
            .user-notifications {
                position: relative;
            }
            
            .notification-btn {
                background: rgba(255,255,255,0.15);
                border: 1px solid rgba(255,255,255,0.2);
                color: white;
                padding: 0.5rem;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .notification-btn:hover {
                background: rgba(255,255,255,0.25);
            }
            
            .notification-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ef4444;
                color: white;
                font-size: 0.7rem;
                padding: 0.2rem 0.4rem;
                border-radius: 10px;
                min-width: 18px;
                text-align: center;
            }
            
            .notifications-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border);
                z-index: 1000;
                width: 350px;
                margin-top: 0.5rem;
            }
            
            .notification-header {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--color-border);
            }
            
            .notification-header h4 {
                margin: 0;
                color: var(--color-primary);
                font-size: 1rem;
            }
            
            .notification-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--color-border-light);
            }
            
            .notification-icon {
                font-size: 1.3rem;
                flex-shrink: 0;
            }
            
            .notification-title {
                font-weight: 500;
                margin-bottom: 0.25rem;
                color: var(--color-text-primary);
            }
            
            .notification-message {
                font-size: 0.8rem;
                color: var(--color-text-secondary);
                line-height: 1.3;
            }
            
            .notification-empty {
                padding: 2rem;
                text-align: center;
                color: var(--color-text-secondary);
            }
            
            .empty-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                opacity: 0.5;
            }
            
            /* Progress Bar */
            .header-progress-bar {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: rgba(255,255,255,0.2);
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                background: var(--color-accent);
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(0,176,185,0.5);
            }
            
            /* Animations */
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeOutUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
            
            /* Responsive Design */
            @media (max-width: 1024px) {
                .enhanced-toolbar {
                    gap: 1rem;
                }
                
                .header-search-component {
                    min-width: 250px;
                }
                
                .mega-dropdown {
                    min-width: 400px;
                }
                
                .mega-dropdown-content {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }
            }
            
            @media (max-width: 768px) {
                .enhanced-toolbar {
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-right: 1rem;
                }
                
                .header-search-component {
                    min-width: 200px;
                    order: 2;
                }
                
                .header-quick-actions {
                    order: 1;
                }
                
                .quick-action-btn .action-label {
                    display: none;
                }
                
                .mega-dropdown {
                    min-width: 300px;
                    left: 0;
                    transform: none;
                }
                
                .search-suggestions {
                    left: -50px;
                    right: -50px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Global methods for onclick handlers
        window.headerInstance = this;
        
        // Toggle methods
        window.toggleUserMenu = () => this.toggleUserMenu();
        window.toggleNotifications = () => this.toggleNotifications();
        window.handleLogout = () => this.handleLogout();
        window.viewAllResults = (query) => this.viewAllResults(query);
    }

    toggleUserMenu() {
        const menu = document.getElementById('user-menu');
        if (menu) {
            menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        }
    }

    toggleNotifications() {
        const dropdown = document.getElementById('notifications-dropdown');
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    }

    async handleLogout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    viewAllResults(query) {
        // Navigate to search results page
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    closeAllDropdowns() {
        // Close all dropdowns
        document.querySelectorAll('.mega-dropdown, .user-menu-dropdown, .notifications-dropdown, .search-suggestions')
            .forEach(dropdown => {
                dropdown.style.display = 'none';
            });
    }
}

// Auto-initialize enhanced header
document.addEventListener('DOMContentLoaded', () => {
    if (!window.headerInstance) {
        window.headerInstance = new EnhancedHeader();
    }
});

// Make class available globally
window.EnhancedHeader = EnhancedHeader;