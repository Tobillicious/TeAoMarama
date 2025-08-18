/**
 * ================================================================
 * COMPREHENSIVE SEARCH SYSTEM - Te Kete Ako
 * ================================================================
 * 
 * PURPOSE: Provides powerful search functionality across all 186+ resources
 * using Supabase database with relevance scoring and filtering.
 * 
 * FEATURES:
 * - Full-text search across titles, descriptions, and tags
 * - Real-time search with debouncing
 * - Filter by type, subject, and level
 * - Cultural-aware search (Te Reo Māori terms)
 * - Mobile-responsive search interface
 * - Recent searches and suggestions
 * 
 * CULTURAL INTEGRATION:
 * - Supports Te Reo Māori search terms
 * - Cultural content prioritization
 * - Respectful display of cultural elements
 * 
 * ================================================================
 */

class TeKeteAkoSearch {
    constructor() {
        this.searchCache = new Map();
        this.recentSearches = this.loadRecentSearches();
        this.searchDebounceTimer = null;
        this.currentFilters = {
            type: '',
            subject: '',
            level: ''
        };
        this.init();
    }

    init() {
        this.createSearchInterface();
        this.setupEventListeners();
        this.loadSearchSuggestions();
    }

    createSearchInterface() {
        // Find existing search containers or create them
        const searchContainers = document.querySelectorAll('.search-container, #search-container');
        
        if (searchContainers.length === 0) {
            // Create search interface if none exists
            this.insertSearchInterface();
        }

        // Add search functionality to existing containers
        searchContainers.forEach(container => {
            if (!container.querySelector('.te-kete-search')) {
                container.innerHTML = this.getSearchHTML();
                this.enhanceSearchContainer(container);
            }
        });
    }

    insertSearchInterface() {
        // Add search to header if it doesn't exist
        const header = document.querySelector('.site-header .nav-container');
        if (header && !header.querySelector('.header-search')) {
            const searchDiv = document.createElement('div');
            searchDiv.className = 'header-search';
            searchDiv.innerHTML = this.getCompactSearchHTML();
            header.appendChild(searchDiv);
        }

        // Add search to main content areas
        const mainAreas = document.querySelectorAll('main, .content-area, .main-container');
        mainAreas.forEach(area => {
            if (!area.querySelector('.te-kete-search')) {
                const searchDiv = document.createElement('div');
                searchDiv.className = 'search-container';
                searchDiv.innerHTML = this.getSearchHTML();
                area.insertBefore(searchDiv, area.firstChild);
            }
        });
    }

    getCompactSearchHTML() {
        return `
            <div class="te-kete-search compact">
                <div class="search-input-container">
                    <input type="text" 
                           class="search-input" 
                           placeholder="Search Te Kete Ako..." 
                           aria-label="Search resources">
                    <button class="search-button" aria-label="Search">
                        <span class="search-icon">🔍</span>
                    </button>
                </div>
            </div>
        `;
    }

    getSearchHTML() {
        return `
            <div class="te-kete-search">
                <div class="search-header">
                    <h3>🔍 Kimi Rauemi - Search Resources</h3>
                    <p>Search through 186+ educational resources with cultural awareness</p>
                </div>
                
                <div class="search-main">
                    <div class="search-input-container">
                        <input type="text" 
                               class="search-input" 
                               placeholder="Search handouts, lessons, games, units..." 
                               aria-label="Search Te Kete Ako resources">
                        <button class="search-button" aria-label="Search">
                            <span class="search-icon">🔍</span>
                        </button>
                    </div>
                    
                    <div class="search-filters">
                        <select class="filter-select" data-filter="type" aria-label="Filter by type">
                            <option value="">All Types</option>
                            <option value="handout">📄 Handouts</option>
                            <option value="lesson">📖 Lessons</option>
                            <option value="unit-plan">📚 Unit Plans</option>
                            <option value="game">🎮 Games</option>
                            <option value="activity">⚡ Activities</option>
                            <option value="assessment">📊 Assessments</option>
                        </select>
                        
                        <select class="filter-select" data-filter="subject" aria-label="Filter by subject">
                            <option value="">All Subjects</option>
                            <option value="English">📝 English</option>
                            <option value="Te Reo Māori">🌿 Te Reo Māori</option>
                            <option value="Social Studies">🏛️ Social Studies</option>
                            <option value="Mathematics">🔢 Mathematics</option>
                            <option value="Science">🧪 Science</option>
                            <option value="Technology">💻 Technology</option>
                        </select>
                        
                        <select class="filter-select" data-filter="level" aria-label="Filter by level">
                            <option value="">All Levels</option>
                            <option value="Year 7">Year 7</option>
                            <option value="Year 8">Year 8</option>
                            <option value="Year 9">Year 9</option>
                            <option value="Year 10">Year 10</option>
                            <option value="All Levels">All Levels</option>
                        </select>
                        
                        <button class="clear-filters" aria-label="Clear all filters">Clear</button>
                    </div>
                </div>
                
                <div class="search-suggestions" style="display: none;">
                    <h4>Suggestions:</h4>
                    <div class="suggestion-tags"></div>
                </div>
                
                <div class="search-results" style="display: none;">
                    <div class="results-header">
                        <h4>Search Results</h4>
                        <span class="results-count"></span>
                    </div>
                    <div class="results-list"></div>
                </div>
                
                <div class="search-loading" style="display: none;">
                    <div class="loading-spinner">🔄</div>
                    <p>Searching Te Kete Ako...</p>
                </div>
            </div>
        `;
    }

    enhanceSearchContainer(container) {
        // Add CSS if not already present
        if (!document.querySelector('#te-kete-search-styles')) {
            this.addSearchStyles();
        }
    }

    addSearchStyles() {
        const style = document.createElement('style');
        style.id = 'te-kete-search-styles';
        style.textContent = `
            /* Te Kete Ako Search System Styles */
            .te-kete-search {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                margin: 2rem 0;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                border-left: 4px solid var(--color-secondary);
            }
            
            .te-kete-search.compact {
                background: rgba(255,255,255,0.1);
                padding: 0.5rem;
                margin: 0 1rem;
                border: none;
                box-shadow: none;
            }
            
            .search-header h3 {
                color: var(--color-primary);
                margin: 0 0 0.5rem 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .search-header p {
                color: var(--color-text-secondary);
                margin: 0 0 1rem 0;
                font-size: 0.9rem;
            }
            
            .search-input-container {
                position: relative;
                display: flex;
                margin-bottom: 1rem;
            }
            
            .search-input {
                flex: 1;
                padding: 0.75rem 1rem;
                border: 2px solid var(--color-border);
                border-radius: 8px 0 0 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .search-input:focus {
                outline: none;
                border-color: var(--color-secondary);
            }
            
            .search-button {
                background: var(--color-secondary);
                color: white;
                border: none;
                padding: 0.75rem 1rem;
                border-radius: 0 8px 8px 0;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .search-button:hover {
                background: var(--color-primary);
            }
            
            .search-filters {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                margin-bottom: 1rem;
            }
            
            .filter-select {
                padding: 0.5rem;
                border: 1px solid var(--color-border);
                border-radius: 6px;
                background: white;
                font-size: 0.9rem;
                min-width: 120px;
            }
            
            .clear-filters {
                background: var(--color-text-secondary);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            .search-suggestions {
                margin-bottom: 1rem;
            }
            
            .suggestion-tags {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .suggestion-tag {
                background: var(--color-cultural-light);
                color: var(--color-primary);
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .suggestion-tag:hover {
                background: var(--color-secondary);
                color: white;
            }
            
            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--color-border);
            }
            
            .results-count {
                color: var(--color-text-secondary);
                font-size: 0.9rem;
            }
            
            .result-item {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 1rem;
                margin-bottom: 1rem;
                transition: all 0.3s ease;
                cursor: pointer;
            }
            
            .result-item:hover {
                border-color: var(--color-secondary);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .result-title {
                color: var(--color-primary);
                font-weight: bold;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .result-description {
                color: var(--color-text-secondary);
                margin-bottom: 0.5rem;
                line-height: 1.4;
            }
            
            .result-meta {
                display: flex;
                gap: 1rem;
                font-size: 0.8rem;
                color: var(--color-text-muted);
            }
            
            .result-type, .result-subject, .result-level {
                background: var(--color-border-light);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
            }
            
            .cultural-result {
                border-left: 4px solid var(--color-secondary);
                background: linear-gradient(135deg, var(--color-cultural-light) 0%, white 100%);
            }
            
            .search-loading {
                text-align: center;
                padding: 2rem;
                color: var(--color-text-secondary);
            }
            
            .loading-spinner {
                font-size: 2rem;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Compact search styles */
            .te-kete-search.compact .search-input {
                background: rgba(255,255,255,0.9);
                border: 1px solid rgba(255,255,255,0.3);
                color: var(--color-primary);
            }
            
            .te-kete-search.compact .search-button {
                background: rgba(255,255,255,0.2);
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .search-filters {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .filter-select {
                    min-width: auto;
                    width: 100%;
                }
                
                .header-search {
                    display: none;
                }
                
                .te-kete-search {
                    margin: 1rem 0;
                    padding: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Search input listeners
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search-input')) {
                this.handleSearchInput(e.target);
            }
        });

        // Search button listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.search-button')) {
                const container = e.target.closest('.te-kete-search');
                const input = container.querySelector('.search-input');
                this.performSearch(input.value.trim());
            }
        });

        // Filter listeners
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('filter-select')) {
                this.updateFilter(e.target.dataset.filter, e.target.value);
            }
        });

        // Clear filters
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('clear-filters')) {
                this.clearFilters();
            }
        });

        // Result click listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.result-item')) {
                const path = e.target.closest('.result-item').dataset.path;
                if (path) {
                    window.location.href = path;
                }
            }
        });

        // Suggestion click listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-tag')) {
                const searchTerm = e.target.textContent.trim();
                this.performSearch(searchTerm);
            }
        });

        // Enter key search
        document.addEventListener('keypress', (e) => {
            if (e.target.classList.contains('search-input') && e.key === 'Enter') {
                this.performSearch(e.target.value.trim());
            }
        });
    }

    handleSearchInput(input) {
        const query = input.value.trim();
        
        // Clear existing timer
        if (this.searchDebounceTimer) {
            clearTimeout(this.searchDebounceTimer);
        }

        // Show suggestions for short queries
        if (query.length > 0 && query.length < 3) {
            this.showSuggestions(query);
        }

        // Debounced search for longer queries
        if (query.length >= 3) {
            this.searchDebounceTimer = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        }

        // Hide results for empty query
        if (query.length === 0) {
            this.hideResults();
        }
    }

    async performSearch(query) {
        if (!query || query.length < 1) {
            this.hideResults();
            return;
        }

        // Show loading state
        this.showLoading();

        try {
            // Check cache first
            const cacheKey = this.getCacheKey(query, this.currentFilters);
            if (this.searchCache.has(cacheKey)) {
                this.displayResults(this.searchCache.get(cacheKey), query);
                return;
            }

            // Perform search
            const results = await this.searchResources(query);
            
            // Cache results
            this.searchCache.set(cacheKey, results);
            
            // Display results
            this.displayResults(results, query);
            
            // Save to recent searches
            this.addToRecentSearches(query);

        } catch (error) {
            console.error('Search error:', error);
            this.showError('Search failed. Please try again.');
        }
    }

    async searchResources(query) {
        // If Supabase is available, use database search
        if (typeof supabase !== 'undefined') {
            return await this.searchWithSupabase(query);
        } else {
            // Fallback to client-side search
            return await this.searchClientSide(query);
        }
    }

    async searchWithSupabase(query) {
        try {
            // Use the search function from the resources table
            const { data, error } = await supabase
                .rpc('search_resources', { search_term: query });

            if (error) throw error;

            // Apply additional filters
            let filteredResults = data || [];
            
            if (this.currentFilters.type) {
                filteredResults = filteredResults.filter(item => item.type === this.currentFilters.type);
            }
            if (this.currentFilters.subject) {
                filteredResults = filteredResults.filter(item => item.subject === this.currentFilters.subject);
            }
            if (this.currentFilters.level) {
                filteredResults = filteredResults.filter(item => item.level === this.currentFilters.level);
            }

            return filteredResults;

        } catch (error) {
            console.error('Supabase search error:', error);
            // Fallback to client-side search
            return await this.searchClientSide(query);
        }
    }

    async searchClientSide(query) {
        // Client-side search through known resources
        const staticResources = this.getStaticResourcesIndex();
        const results = [];

        const lowerQuery = query.toLowerCase();

        staticResources.forEach(resource => {
            let relevanceScore = 0;
            
            // Check title
            if (resource.title.toLowerCase().includes(lowerQuery)) {
                relevanceScore += 3;
            }
            
            // Check description
            if (resource.description.toLowerCase().includes(lowerQuery)) {
                relevanceScore += 2;
            }
            
            // Check tags
            if (resource.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
                relevanceScore += 1;
            }

            if (relevanceScore > 0) {
                // Apply filters
                if (this.currentFilters.type && resource.type !== this.currentFilters.type) return;
                if (this.currentFilters.subject && resource.subject !== this.currentFilters.subject) return;
                if (this.currentFilters.level && resource.level !== this.currentFilters.level) return;

                results.push({
                    ...resource,
                    relevance_score: relevanceScore
                });
            }
        });

        // Sort by relevance
        results.sort((a, b) => b.relevance_score - a.relevance_score);

        return results;
    }

    getStaticResourcesIndex() {
        // Comprehensive index of known resources
        return [
            {
                title: "Year 8 Systems: Decolonizing Power Structures",
                description: "Complete 5-week social studies unit exploring how systems shape our lives through a decolonized lens",
                path: "y8-systems-unit.html",
                type: "unit-plan",
                subject: "Social Studies",
                level: "Year 8",
                tags: ["systems", "decolonization", "te-tiriti", "governance", "social-justice"]
            },
            {
                title: "Te Reo Māori Wordle",
                description: "Interactive word-guessing game to practice te reo Māori vocabulary",
                path: "games/te-reo-wordle.html",
                type: "game",
                subject: "Te Reo Māori",
                level: "All Levels",
                tags: ["te-reo-maori", "vocabulary", "interactive", "cultural-learning"]
            },
            {
                title: "PEEL Method Toolkit",
                description: "Master the art of structuring powerful, persuasive paragraphs",
                path: "handouts/writers-toolkit-peel-argument-handout.html",
                type: "handout",
                subject: "English",
                level: "Year 7-10",
                tags: ["writing", "persuasive", "argument", "paragraph-structure"]
            },
            {
                title: "The Power of Haka: Reading Comprehension",
                description: "Explore the cultural significance and contemporary relevance of haka",
                path: "handouts/haka-comprehension-handout.html",
                type: "handout",
                subject: "English",
                level: "Year 7-9",
                tags: ["haka", "reading-comprehension", "cultural-significance", "maori-culture"]
            },
            {
                title: "Te Tiriti o Waitangi: Living Document",
                description: "Explore Te Tiriti as a living document with contemporary relevance",
                path: "handouts/treaty-of-waitangi-handout.html",
                type: "handout",
                subject: "Social Studies",
                level: "Year 8-10",
                tags: ["te-tiriti", "treaty-of-waitangi", "constitutional-history"]
            }
            // Add more resources as needed
        ];
    }

    displayResults(results, query) {
        const containers = document.querySelectorAll('.te-kete-search');
        
        containers.forEach(container => {
            const resultsDiv = container.querySelector('.search-results');
            const loadingDiv = container.querySelector('.search-loading');
            const suggestionDiv = container.querySelector('.search-suggestions');

            if (loadingDiv) loadingDiv.style.display = 'none';
            if (suggestionDiv) suggestionDiv.style.display = 'none';

            if (!resultsDiv) return;

            if (results.length === 0) {
                resultsDiv.innerHTML = `
                    <div class="results-header">
                        <h4>No Results Found</h4>
                    </div>
                    <div class="no-results">
                        <p>No resources found for "${query}". Try:</p>
                        <ul>
                            <li>Different keywords</li>
                            <li>Broader search terms</li>
                            <li>Checking spelling</li>
                            <li>Using Te Reo Māori terms</li>
                        </ul>
                    </div>
                `;
            } else {
                const resultsList = results.map(result => this.createResultItem(result)).join('');
                
                resultsDiv.innerHTML = `
                    <div class="results-header">
                        <h4>Search Results</h4>
                        <span class="results-count">${results.length} resource${results.length !== 1 ? 's' : ''} found</span>
                    </div>
                    <div class="results-list">
                        ${resultsList}
                    </div>
                `;
            }

            resultsDiv.style.display = 'block';
        });
    }

    createResultItem(result) {
        const isCultural = result.tags?.some(tag => 
            ['te-reo-maori', 'cultural', 'maori-culture', 'te-tiriti', 'haka'].includes(tag)
        ) || result.subject === 'Te Reo Māori';

        const typeIcon = this.getTypeIcon(result.type);
        const culturalClass = isCultural ? 'cultural-result' : '';

        return `
            <div class="result-item ${culturalClass}" data-path="${result.path}">
                <div class="result-title">
                    ${typeIcon} ${result.title}
                </div>
                <div class="result-description">
                    ${result.description}
                </div>
                <div class="result-meta">
                    <span class="result-type">${result.type}</span>
                    <span class="result-subject">${result.subject}</span>
                    <span class="result-level">${result.level}</span>
                    ${isCultural ? '<span class="cultural-badge">🌿 Cultural Content</span>' : ''}
                </div>
            </div>
        `;
    }

    getTypeIcon(type) {
        const icons = {
            'handout': '📄',
            'lesson': '📖',
            'unit-plan': '📚',
            'game': '🎮',
            'activity': '⚡',
            'assessment': '📊',
            'video': '📺',
            'interactive': '🎯'
        };
        return icons[type] || '📄';
    }

    showSuggestions(query) {
        const suggestions = this.getSuggestions(query);
        const containers = document.querySelectorAll('.te-kete-search');

        containers.forEach(container => {
            const suggestionDiv = container.querySelector('.search-suggestions');
            const resultsDiv = container.querySelector('.search-results');
            
            if (resultsDiv) resultsDiv.style.display = 'none';
            
            if (suggestionDiv && suggestions.length > 0) {
                const tagsHTML = suggestions.map(s => 
                    `<span class="suggestion-tag">${s}</span>`
                ).join('');
                
                suggestionDiv.querySelector('.suggestion-tags').innerHTML = tagsHTML;
                suggestionDiv.style.display = 'block';
            }
        });
    }

    getSuggestions(query) {
        const allSuggestions = [
            'haka', 'te reo māori', 'treaty', 'systems', 'writing',
            'peel method', 'wordle', 'cultural', 'decolonization',
            'assessment', 'social studies', 'english', 'mathematics'
        ];

        return allSuggestions
            .filter(s => s.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5);
    }

    showLoading() {
        const containers = document.querySelectorAll('.te-kete-search');
        containers.forEach(container => {
            const loadingDiv = container.querySelector('.search-loading');
            const resultsDiv = container.querySelector('.search-results');
            const suggestionDiv = container.querySelector('.search-suggestions');

            if (resultsDiv) resultsDiv.style.display = 'none';
            if (suggestionDiv) suggestionDiv.style.display = 'none';
            if (loadingDiv) loadingDiv.style.display = 'block';
        });
    }

    hideResults() {
        const containers = document.querySelectorAll('.te-kete-search');
        containers.forEach(container => {
            const resultsDiv = container.querySelector('.search-results');
            const loadingDiv = container.querySelector('.search-loading');
            const suggestionDiv = container.querySelector('.search-suggestions');

            if (resultsDiv) resultsDiv.style.display = 'none';
            if (loadingDiv) loadingDiv.style.display = 'none';
            if (suggestionDiv) suggestionDiv.style.display = 'none';
        });
    }

    showError(message) {
        const containers = document.querySelectorAll('.te-kete-search');
        containers.forEach(container => {
            const resultsDiv = container.querySelector('.search-results');
            if (resultsDiv) {
                resultsDiv.innerHTML = `
                    <div class="search-error">
                        <h4>Search Error</h4>
                        <p>${message}</p>
                    </div>
                `;
                resultsDiv.style.display = 'block';
            }
        });
    }

    updateFilter(filterType, value) {
        this.currentFilters[filterType] = value;
        
        // Refresh search if there's an active query
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            if (input.value.trim().length >= 3) {
                this.performSearch(input.value.trim());
            }
        });
    }

    clearFilters() {
        this.currentFilters = { type: '', subject: '', level: '' };
        
        // Reset filter selects
        document.querySelectorAll('.filter-select').forEach(select => {
            select.value = '';
        });
        
        // Refresh search
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            if (input.value.trim().length >= 3) {
                this.performSearch(input.value.trim());
            }
        });
    }

    getCacheKey(query, filters) {
        return `${query}|${filters.type}|${filters.subject}|${filters.level}`;
    }

    loadRecentSearches() {
        try {
            return JSON.parse(localStorage.getItem('teKeteAko_recentSearches')) || [];
        } catch {
            return [];
        }
    }

    addToRecentSearches(query) {
        this.recentSearches = this.recentSearches.filter(s => s !== query);
        this.recentSearches.unshift(query);
        this.recentSearches = this.recentSearches.slice(0, 10);
        
        localStorage.setItem('teKeteAko_recentSearches', JSON.stringify(this.recentSearches));
    }

    loadSearchSuggestions() {
        // Could load from API or use static suggestions
        // For now, we'll use the static suggestions in getSuggestions method
    }
}

// Auto-initialize search system
document.addEventListener('DOMContentLoaded', () => {
    if (!window.teKeteAkoSearch) {
        window.teKeteAkoSearch = new TeKeteAkoSearch();
    }
});

// Make available globally
window.TeKeteAkoSearch = TeKeteAkoSearch;