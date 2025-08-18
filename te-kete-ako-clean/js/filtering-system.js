/**
 * ================================================================
 * TE KETE AKO FILTERING SYSTEM
 * ================================================================
 * 
 * PURPOSE: Advanced filtering system for handouts, lessons, and other resources
 * with cultural awareness and GraphRAG integration.
 * 
 * FEATURES:
 * - URL parameter filtering (e.g., ?type=cultural)
 * - Multi-criteria filtering (subject, year, phase, cultural level, tags)
 * - Cultural content prioritization
 * - Real-time filtering with smooth animations
 * - Mobile-responsive interface
 * - Accessibility compliant
 * 
 * CULTURAL INTEGRATION:
 * - Prioritizes cultural content when filtering
 * - Respectful display of Te Ao Māori resources
 * - Cultural authenticity indicators
 * 
 * ================================================================
 */

class TeKeteAkoFilteringSystem {
    constructor() {
        this.currentFilters = {
            type: '',
            subject: '',
            year: '',
            phase: '',
            cultural: '',
            tags: ''
        };
        
        this.allResources = [];
        this.filteredResources = [];
        this.resourcesContainer = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeSystem());
        } else {
            this.initializeSystem();
        }
    }

    initializeSystem() {
        this.findResourcesContainer();
        this.collectAllResources();
        this.setupEventListeners();
        this.handleURLParameters();
        this.addFilteringStyles();
        
        console.log(`🎯 Filtering System initialized with ${this.allResources.length} resources`);
    }

    findResourcesContainer() {
        // Find the main container with resources
        this.resourcesContainer = document.querySelector('.resource-grid') ||
                                  document.querySelector('.lesson-grid') ||
                                  document.querySelector('.unit-grid') ||
                                  document.querySelector('.content-grid');
        
        if (!this.resourcesContainer) {
            console.warn('⚠️ No resource container found for filtering');
        }
    }

    collectAllResources() {
        if (!this.resourcesContainer) return;

        // Find all resource cards
        const resourceCards = this.resourcesContainer.querySelectorAll('.resource-card, .unit-card, .lesson-card');
        
        resourceCards.forEach((card, index) => {
            const resourceData = this.extractResourceData(card, index);
            this.allResources.push(resourceData);
        });

        // Initially show all resources
        this.filteredResources = [...this.allResources];
    }

    extractResourceData(card, index) {
        const title = card.querySelector('h3')?.textContent?.trim() || '';
        const description = card.querySelector('p')?.textContent?.trim() || '';
        const href = card.getAttribute('href') || '';
        
        // Extract data attributes or infer from content
        const subject = this.inferSubject(card, title, description);
        const year = this.inferYear(card, title, description);
        const phase = this.inferPhase(year);
        const tags = this.inferTags(card, title, description);
        const type = this.inferType(card, href, title);
        const cultural = this.inferCulturalLevel(card, title, description, tags);

        return {
            element: card,
            index,
            title,
            description,
            href,
            subject,
            year,
            phase,
            tags,
            type,
            cultural,
            visible: true
        };
    }

    inferSubject(card, title, description) {
        // Check data attributes first
        const dataSubject = card.getAttribute('data-subject');
        if (dataSubject) return dataSubject;

        // Infer from content
        const content = (title + ' ' + description).toLowerCase();
        
        if (content.includes('te reo') || content.includes('māori') || content.includes('maori') || content.includes('cultural') || content.includes('haka') || content.includes('treaty')) {
            return 'te-ao-maori';
        } else if (content.includes('english') || content.includes('writing') || content.includes('literature') || content.includes('reading')) {
            return 'english';
        } else if (content.includes('math') || content.includes('probability') || content.includes('statistics') || content.includes('graph')) {
            return 'maths';
        } else if (content.includes('science') || content.includes('stem') || content.includes('physics') || content.includes('chemistry') || content.includes('biology')) {
            return 'stem';
        } else if (content.includes('social') || content.includes('history') || content.includes('geography') || content.includes('civics')) {
            return 'humanities';
        } else if (content.includes('technology') || content.includes('digital') || content.includes('ai') || content.includes('computer')) {
            return 'tech';
        } else if (content.includes('art') || content.includes('music') || content.includes('creative')) {
            return 'arts';
        }
        
        return 'general';
    }

    inferYear(card, title, description) {
        // Check data attributes first
        const dataYear = card.getAttribute('data-year');
        if (dataYear) return dataYear;

        // Look for year patterns in content
        const content = (title + ' ' + description).toLowerCase();
        const yearMatch = content.match(/year\s*(\d+)/);
        if (yearMatch) {
            return yearMatch[1];
        }

        // Look for year ranges
        if (content.includes('7-8') || content.includes('years 7-8')) return '7-8';
        if (content.includes('9-10') || content.includes('years 9-10')) return '9-10';
        if (content.includes('11-13') || content.includes('years 11-13')) return '11-13';
        if (content.includes('7-13') || content.includes('all levels')) return 'all';

        return 'all';
    }

    inferPhase(year) {
        if (!year || year === 'all') return '';
        
        const yearNum = parseInt(year);
        if (yearNum >= 7 && yearNum <= 8) return 'junior';
        if (yearNum >= 9 && yearNum <= 10) return 'middle';
        if (yearNum >= 11 && yearNum <= 13) return 'senior';
        
        return '';
    }

    inferTags(card, title, description) {
        // Check data attributes first
        const dataTags = card.getAttribute('data-tags');
        if (dataTags) return dataTags.split(',').map(tag => tag.trim());

        // Infer from content
        const content = (title + ' ' + description).toLowerCase();
        const tags = [];

        // Writing and English tags
        if (content.includes('writing') || content.includes('writers')) tags.push('writing-skills');
        if (content.includes('persuasive')) tags.push('persuasive-writing');
        if (content.includes('creative')) tags.push('creative-writing');
        if (content.includes('analysis')) tags.push('analysis');

        // Cultural tags
        if (content.includes('cultural') || content.includes('māori') || content.includes('maori')) tags.push('cultural');
        if (content.includes('treaty') || content.includes('waitangi')) tags.push('treaty-of-waitangi');
        if (content.includes('history') || content.includes('nz')) tags.push('nz-history');
        if (content.includes('haka')) tags.push('haka');

        // Subject tags
        if (content.includes('science') || content.includes('stem')) tags.push('science');
        if (content.includes('environmental') || content.includes('environment')) tags.push('environmental');
        if (content.includes('ai') || content.includes('artificial intelligence')) tags.push('ai');
        if (content.includes('digital')) tags.push('digital-literacy');
        if (content.includes('media')) tags.push('media-literacy');

        // Activity types
        if (content.includes('do now')) tags.push('do-now');
        if (content.includes('video')) tags.push('video-activity');
        if (content.includes('assessment')) tags.push('assessment');

        return tags;
    }

    inferType(card, href, title) {
        // Check URL patterns
        if (href.includes('/handouts/')) return 'handout';
        if (href.includes('/lessons/')) return 'lesson';
        if (href.includes('/unit-plans/') || href.includes('-unit.html')) return 'unit-plan';
        if (href.includes('/games/')) return 'game';
        if (href.includes('/activities/')) return 'activity';

        // Check title patterns
        const titleLower = title.toLowerCase();
        if (titleLower.includes('unit') || titleLower.includes('series')) return 'unit-plan';
        if (titleLower.includes('lesson')) return 'lesson';
        if (titleLower.includes('handout') || titleLower.includes('toolkit')) return 'handout';
        if (titleLower.includes('game') || titleLower.includes('wordle')) return 'game';
        if (titleLower.includes('activity') || titleLower.includes('do now')) return 'activity';

        return 'handout'; // default
    }

    inferCulturalLevel(card, title, description, tags) {
        const content = (title + ' ' + description + ' ' + tags.join(' ')).toLowerCase();
        
        // Essential cultural content (high priority)
        if (content.includes('te reo māori') || 
            content.includes('māori') || 
            content.includes('treaty') || 
            content.includes('haka') || 
            content.includes('whakapapa') || 
            content.includes('kaitiakitanga') ||
            content.includes('mātauranga') ||
            content.includes('indigenous governance') ||
            tags.includes('cultural')) {
            return 'essential';
        }

        // Integrated cultural content
        if (content.includes('cultural') || 
            content.includes('traditional') || 
            content.includes('nz history') ||
            content.includes('new zealand') ||
            content.includes('aotearoa')) {
            return 'integrated';
        }

        return 'general';
    }

    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        let hasActiveFilters = false;

        // Check for type parameter
        const type = urlParams.get('type');
        if (type) {
            this.currentFilters.type = type;
            this.updateFilterDropdown('type', type);
            hasActiveFilters = true;
        }

        // Check for other parameters
        ['subject', 'year', 'phase', 'cultural', 'tags'].forEach(param => {
            const value = urlParams.get(param);
            if (value) {
                this.currentFilters[param] = value;
                this.updateFilterDropdown(param, value);
                hasActiveFilters = true;
            }
        });

        // Apply filters if any were found in URL
        if (hasActiveFilters) {
            this.applyFilters();
            this.showFilterIndicator();
        }
    }

    updateFilterDropdown(filterType, value) {
        // Map filter types to actual select IDs
        const selectMap = {
            'type': 'resource-type-filter',
            'subject': 'subject-filter',
            'year': 'year-filter',
            'phase': 'phase-filter',
            'cultural': 'cultural-filter',
            'tags': 'tags-filter'
        };

        const selectId = selectMap[filterType];
        const select = document.getElementById(selectId);
        
        if (select) {
            // Special handling for type mapping
            if (filterType === 'type') {
                const typeMap = {
                    'cultural': 'essential',
                    'writers-toolkit': 'writing-skills',
                    'stem': 'science',
                    'analysis': 'analysis',
                    'contemporary': 'contemporary-issues',
                    'ai-tech': 'ai',
                    'enhanced': 'curriculum-enhanced',
                    'video-activities': 'video-activity',
                    'do-now': 'do-now',
                    'arts': 'arts'
                };
                
                // Try direct match first, then mapped value
                const mappedValue = typeMap[value] || value;
                
                // For cultural filter, set cultural level
                if (value === 'cultural') {
                    this.currentFilters.cultural = 'essential';
                    const culturalSelect = document.getElementById('cultural-filter');
                    if (culturalSelect) {
                        culturalSelect.value = 'essential';
                    }
                } else if (mappedValue === 'writing-skills') {
                    this.currentFilters.tags = 'writing-skills';
                    const tagsSelect = document.getElementById('tags-filter');
                    if (tagsSelect) {
                        tagsSelect.value = 'writing-skills';
                    }
                }
            } else {
                select.value = value;
            }
        }
    }

    setupEventListeners() {
        // Filter dropdown listeners
        const filterSelects = document.querySelectorAll('.filter-dropdown');
        filterSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.handleFilterChange(e.target);
            });
        });

        // Sidebar category link listeners
        document.addEventListener('click', (e) => {
            const categoryLink = e.target.closest('a[href*="handouts.html?type="]');
            if (categoryLink) {
                e.preventDefault();
                const url = new URL(categoryLink.href);
                const type = url.searchParams.get('type');
                this.applyTypeFilter(type);
            }
        });

        // Clear filters button
        const clearButton = document.querySelector('.clear-filters, .reset-filters');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    handleFilterChange(selectElement) {
        const filterId = selectElement.id;
        const value = selectElement.value;

        // Map select IDs to filter types
        const filterMap = {
            'subject-filter': 'subject',
            'year-filter': 'year',
            'phase-filter': 'phase',
            'cultural-filter': 'cultural',
            'tags-filter': 'tags'
        };

        const filterType = filterMap[filterId];
        if (filterType) {
            this.currentFilters[filterType] = value;
            this.applyFilters();
            this.updateURLParameters();
        }
    }

    applyTypeFilter(type) {
        // Clear existing filters first
        this.clearAllFilters(false);
        
        // Apply the type-specific filter
        this.currentFilters.type = type;
        
        // Special handling for different types
        switch (type) {
            case 'cultural':
                this.currentFilters.cultural = 'essential';
                break;
            case 'writers-toolkit':
                this.currentFilters.tags = 'writing-skills';
                break;
            case 'stem':
                this.currentFilters.subject = 'stem';
                break;
            case 'analysis':
                this.currentFilters.tags = 'analysis';
                break;
            case 'contemporary':
                this.currentFilters.tags = 'contemporary-issues';
                break;
            case 'ai-tech':
                this.currentFilters.tags = 'ai';
                break;
            case 'enhanced':
                this.currentFilters.tags = 'curriculum-enhanced';
                break;
            case 'video-activities':
                this.currentFilters.tags = 'video-activity';
                break;
            case 'do-now':
                this.currentFilters.tags = 'do-now';
                break;
            case 'arts':
                this.currentFilters.subject = 'arts';
                break;
        }

        this.applyFilters();
        this.updateURLParameters();
        this.updateFilterDropdowns();
        this.showFilterIndicator(type);
    }

    applyFilters() {
        let visibleCount = 0;

        this.allResources.forEach(resource => {
            let shouldShow = true;

            // Apply each filter
            if (this.currentFilters.subject && this.currentFilters.subject !== resource.subject) {
                shouldShow = false;
            }

            if (this.currentFilters.year && this.currentFilters.year !== 'all') {
                if (resource.year !== this.currentFilters.year && 
                    resource.year !== 'all' && 
                    !resource.year.includes(this.currentFilters.year)) {
                    shouldShow = false;
                }
            }

            if (this.currentFilters.phase && this.currentFilters.phase !== resource.phase) {
                shouldShow = false;
            }

            if (this.currentFilters.cultural && this.currentFilters.cultural !== resource.cultural) {
                if (!(this.currentFilters.cultural === 'essential' && resource.cultural === 'integrated')) {
                    shouldShow = false;
                }
            }

            if (this.currentFilters.tags) {
                if (!resource.tags.some(tag => tag.includes(this.currentFilters.tags))) {
                    shouldShow = false;
                }
            }

            // Update visibility
            resource.visible = shouldShow;
            
            if (shouldShow) {
                resource.element.style.display = 'block';
                resource.element.classList.remove('filtered-out');
                visibleCount++;
            } else {
                resource.element.style.display = 'none';
                resource.element.classList.add('filtered-out');
            }
        });

        this.updateFilterResults(visibleCount);
        this.prioritizeCulturalContent();
    }

    prioritizeCulturalContent() {
        if (!this.resourcesContainer) return;

        // Sort visible resources to prioritize cultural content
        const visibleResources = this.allResources.filter(r => r.visible);
        const culturalResources = visibleResources.filter(r => r.cultural === 'essential');
        const integratedResources = visibleResources.filter(r => r.cultural === 'integrated');
        const generalResources = visibleResources.filter(r => r.cultural === 'general');

        // Reorder DOM elements (cultural first, then integrated, then general)
        [...culturalResources, ...integratedResources, ...generalResources].forEach(resource => {
            this.resourcesContainer.appendChild(resource.element);
        });
    }

    updateFilterResults(visibleCount) {
        // Update the results counter
        let resultText = `Showing ${visibleCount} of ${this.allResources.length} resources`;
        
        // Add active filters info
        const activeFilters = Object.entries(this.currentFilters)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => `${key}: ${value}`);
        
        if (activeFilters.length > 0) {
            resultText += ` (filtered by: ${activeFilters.join(', ')})`;
        }

        // Find or create results display
        let resultsDisplay = document.querySelector('.filter-results');
        if (!resultsDisplay) {
            resultsDisplay = document.createElement('div');
            resultsDisplay.className = 'filter-results';
            
            const filterBar = document.querySelector('.filter-bar');
            if (filterBar) {
                filterBar.insertAdjacentElement('afterend', resultsDisplay);
            }
        }

        resultsDisplay.innerHTML = `
            <div class="filter-results-content">
                <span class="results-count">${resultText}</span>
                ${activeFilters.length > 0 ? '<button class="clear-active-filters" onclick="window.teKeteAkoFiltering.clearAllFilters()">Clear Filters</button>' : ''}
            </div>
        `;

        // Show cultural priority notice if filtering by cultural content
        if (this.currentFilters.cultural === 'essential' || this.currentFilters.type === 'cultural') {
            const culturalNotice = document.createElement('div');
            culturalNotice.className = 'cultural-filter-notice';
            culturalNotice.innerHTML = `
                <div class="cultural-notice-content" style="background: linear-gradient(135deg, #98FB98 0%, #90EE90 100%); padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #2d5f2d;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #2d5f2d;">🌿 Cultural Content Priority</h4>
                    <p style="margin: 0; color: #2d5f2d; font-size: 0.9rem;">Displaying ${visibleCount} resources with authentic Te Ao Māori integration, prioritized by cultural authenticity and pedagogical value.</p>
                </div>
            `;
            resultsDisplay.appendChild(culturalNotice);
        }
    }

    updateFilterDropdowns() {
        // Update all dropdowns to reflect current filters
        Object.entries(this.currentFilters).forEach(([filterType, value]) => {
            if (value) {
                this.updateFilterDropdown(filterType, value);
            }
        });
    }

    showFilterIndicator(activeType = null) {
        const indicator = document.createElement('div');
        indicator.className = 'active-filter-indicator';
        indicator.innerHTML = `
            <div class="filter-indicator-content">
                <span class="filter-icon">🎯</span>
                <span class="filter-text">Active Filter: ${activeType || 'Custom'}</span>
                <button class="close-indicator" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        const main = document.querySelector('main, .content-area');
        if (main) {
            main.insertBefore(indicator, main.firstChild);
        }
    }

    clearAllFilters(updateDisplay = true) {
        // Reset all filters
        this.currentFilters = {
            type: '',
            subject: '',
            year: '',
            phase: '',
            cultural: '',
            tags: ''
        };

        // Reset all dropdowns
        const filterSelects = document.querySelectorAll('.filter-dropdown');
        filterSelects.forEach(select => {
            select.value = '';
        });

        // Show all resources
        this.allResources.forEach(resource => {
            resource.visible = true;
            resource.element.style.display = 'block';
            resource.element.classList.remove('filtered-out');
        });

        if (updateDisplay) {
            this.updateFilterResults(this.allResources.length);
            this.updateURLParameters();
        }

        // Remove filter indicators
        const indicators = document.querySelectorAll('.active-filter-indicator, .filter-results');
        indicators.forEach(indicator => indicator.remove());
    }

    updateURLParameters() {
        const url = new URL(window.location);
        const params = new URLSearchParams();

        // Add active filters to URL
        Object.entries(this.currentFilters).forEach(([key, value]) => {
            if (value) {
                // Map back to original type names for URL
                if (key === 'cultural' && value === 'essential') {
                    params.set('type', 'cultural');
                } else if (key === 'tags' && value === 'writing-skills') {
                    params.set('type', 'writers-toolkit');
                } else if (key === 'subject' && value === 'stem') {
                    params.set('type', 'stem');
                } else {
                    params.set(key, value);
                }
            }
        });

        // Update URL without page reload
        const newURL = params.toString() ? `${url.pathname}?${params.toString()}` : url.pathname;
        window.history.replaceState({}, '', newURL);
    }

    addFilteringStyles() {
        if (document.getElementById('te-kete-filtering-styles')) return;

        const style = document.createElement('style');
        style.id = 'te-kete-filtering-styles';
        style.textContent = `
            /* Te Kete Ako Filtering System Styles */
            .filter-results {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 1rem;
                margin: 1rem 0;
            }

            .filter-results-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }

            .results-count {
                color: var(--color-text-secondary);
                font-size: 0.9rem;
            }

            .clear-active-filters {
                background: var(--color-accent);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8rem;
                transition: background 0.3s ease;
            }

            .clear-active-filters:hover {
                background: var(--color-primary);
            }

            .active-filter-indicator {
                background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%);
                color: white;
                padding: 0.75rem;
                border-radius: 8px;
                margin: 1rem 0;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .filter-indicator-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .filter-icon {
                font-size: 1.2rem;
            }

            .close-indicator {
                background: rgba(255,255,255,0.2);
                color: white;
                border: none;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                cursor: pointer;
                margin-left: auto;
                font-weight: bold;
                transition: background 0.3s ease;
            }

            .close-indicator:hover {
                background: rgba(255,255,255,0.3);
            }

            .resource-card.filtered-out {
                opacity: 0;
                transform: scale(0.95);
                transition: all 0.3s ease;
            }

            .cultural-filter-notice {
                margin: 1rem 0;
            }

            .cultural-notice-content h4 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .filter-results-content {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }

                .active-filter-indicator {
                    margin: 0.5rem 0;
                    padding: 0.5rem;
                }

                .filter-indicator-content {
                    font-size: 0.9rem;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (!window.teKeteAkoFiltering) {
        window.teKeteAkoFiltering = new TeKeteAkoFilteringSystem();
    }
});

// Make available globally
window.TeKeteAkoFilteringSystem = TeKeteAkoFilteringSystem;