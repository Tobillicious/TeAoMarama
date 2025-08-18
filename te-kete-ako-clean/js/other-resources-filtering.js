/**
 * 🧠 GraphRAG-Powered Other Resources Filtering System
 * Transforms broken ?type= links into intelligent resource discovery
 * Built on Project Kete Aronui Phase 4 intelligence architecture
 */

class GraphRAGOtherResourcesFilter {
    constructor() {
        this.resources = [];
        this.allResources = [];
        this.currentFilter = 'all';
        this.initialized = false;
        
        // GraphRAG intelligence-based categories from semantic analysis
        this.categories = {
            'assessment': {
                name: 'Assessment Tools',
                icon: '📊',
                description: 'Rubrics, frameworks, and evaluation tools',
                keywords: ['assessment', 'rubric', 'evaluation', 'framework', 'progression', 'feedback']
            },
            'project': {
                name: 'Learning Projects', 
                icon: '🏗️',
                description: 'Project templates, briefs, and collaborative work',
                keywords: ['project', 'design', 'template', 'brief', 'submission', 'society', 'collaboration']
            },
            'tools': {
                name: 'Digital Tools',
                icon: '⚡',
                description: 'Interactive tools, generators, and digital platforms',
                keywords: ['tool', 'generator', 'calculator', 'interactive', 'dashboard', 'leaderboard', 'digital']
            },
            'templates': {
                name: 'Templates',
                icon: '📄',
                description: 'Ready-to-use templates and frameworks',
                keywords: ['template', 'framework', 'commitment', 'design', 'model']
            },
            'external': {
                name: 'External Links',
                icon: '🌐', 
                description: 'External platforms and resources',
                keywords: ['platform', 'website', 'external', 'link', 'hub']
            }
        };
    }

    async init() {
        if (this.initialized) return;
        
        console.log('🧠 Initializing GraphRAG Other Resources Filter...');
        
        // Check URL parameters for initial filter
        const urlParams = new URLSearchParams(window.location.search);
        const filterType = urlParams.get('type');
        if (filterType && this.categories[filterType]) {
            this.currentFilter = filterType;
        }
        
        await this.loadResources();
        this.setupFilterUI();
        this.applyFilter(this.currentFilter);
        this.initialized = true;
        
        console.log('✅ GraphRAG Other Resources Filter initialized with', this.allResources.length, 'resources');
    }

    async loadResources() {
        // In a full GraphRAG implementation, this would query the semantic search
        // For now, we'll use the identified resources from our analysis
        this.allResources = [
            // Assessment Tools (18 from GraphRAG analysis)
            {
                title: 'Decolonized Assessment Framework',
                path: 'decolonized-assessment-framework.html',
                description: 'Culturally responsive assessment approaches that honor Te Ao Māori values',
                category: 'assessment',
                cultural_level: 'high'
            },
            {
                title: 'Society Design Assessment Rubric',
                path: 'y8-systems/resources/society-design-assessment-rubric.html', 
                description: 'Comprehensive rubric for evaluating student society design projects',
                category: 'assessment'
            },
            {
                title: 'Indigenous Feedback Framework',
                path: 'y8-systems/resources/indigenous-feedback-framework.html',
                description: 'Culturally appropriate feedback methods rooted in Indigenous practices',
                category: 'assessment',
                cultural_level: 'essential'
            },
            {
                title: 'English Literacy Progression Framework',
                path: 'english-literacy-progression-framework.html',
                description: 'Comprehensive framework tracking literacy development',
                category: 'assessment'
            },
            {
                title: 'Social Sciences Progression Framework',
                path: 'social-sciences-progression-framework.html',
                description: 'Assessment framework for social sciences learning progression',
                category: 'assessment'
            },
            {
                title: 'Curriculum Alignment Tool',
                path: 'curriculum-alignment.html',
                description: 'Tool for aligning resources with NZ Curriculum objectives',
                category: 'assessment'
            },
            {
                title: 'Environmental Literacy Framework',
                path: 'handouts/environmental-literacy-framework.html',
                description: 'Framework for assessing environmental knowledge and action',
                category: 'assessment'
            },

            // Project Resources
            {
                title: 'Society Design Project',
                path: 'guided-inquiry-unit/society-design-tool.html',
                description: '🏛️ Revolutionary guided inquiry project where students design ideal societies',
                category: 'project',
                featured: true
            },
            {
                title: 'Society Design Collaboration Framework',
                path: 'y8-systems/resources/society-design-collaboration-framework.html',
                description: 'Framework for collaborative group work in society design projects',
                category: 'project'
            },
            {
                title: 'Decolonization Commitment Template',
                path: 'y8-systems/resources/decolonization-commitment-template.html',
                description: 'Template for personal decolonization commitments and action plans',
                category: 'templates',
                cultural_level: 'high'
            },
            {
                title: 'Design A System Template',
                path: 'y8-systems/resources/design-a-system-template.html',
                description: 'Template for students to design their own governmental systems',
                category: 'templates'
            },

            // Digital Tools (140 from analysis)
            {
                title: 'Classroom Leaderboard',
                path: 'classroom-leaderboard.html',
                description: '🎮 Gamification system for classroom engagement and motivation',
                category: 'tools',
                featured: true
            },
            {
                title: 'GraphRAG Intelligent Search',
                path: 'graphrag-search.html',
                description: '🧠 AI-powered semantic search across all educational resources',
                category: 'tools',
                featured: true
            },
            {
                title: 'Teacher Dashboard',
                path: 'teacher-dashboard.html',
                description: '👨‍🏫 Comprehensive dashboard for teachers to track student progress',
                category: 'tools'
            },
            {
                title: 'Student Dashboard', 
                path: 'student-dashboard.html',
                description: '👩‍🎓 Personalized learning dashboard for students',
                category: 'tools'
            },

            // Templates
            {
                title: 'Decolonized Design Template',
                path: 'y8-systems/resources/decolonized-design-template.html',
                description: 'Template incorporating Indigenous knowledge in system design',
                category: 'templates',
                cultural_level: 'high'
            },
            {
                title: 'Treaty Articles Template',
                path: 'y8-systems/resources/treaty-articles.html',
                description: 'Educational template for understanding Treaty of Waitangi articles',
                category: 'templates',
                cultural_level: 'essential'
            },

            // External/Platform Resources
            {
                title: 'Digital Pūrākau Platform',
                path: 'digital-purakau.html',
                description: '🌿 Interactive Māori storytelling and cultural learning platform',
                category: 'external',
                cultural_level: 'essential',
                featured: true
            },
            {
                title: 'Living Whakapapa Platform',
                path: 'living-whakapapa.html', 
                description: '🌿 Cultural identity mapping and whakapapa exploration platform',
                category: 'external',
                cultural_level: 'essential',
                featured: true
            },
            {
                title: 'Virtual Marae',
                path: 'virtual-marae.html',
                description: '🏛️ Virtual reality cultural training and marae protocols',
                category: 'external',
                cultural_level: 'essential',
                featured: true
            }
        ];
    }

    setupFilterUI() {
        // Create filter navigation
        const filterContainer = document.querySelector('.filter-container') || this.createFilterContainer();
        
        // Add category buttons
        const nav = document.createElement('nav');
        nav.className = 'resource-filter-nav';
        nav.innerHTML = `
            <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
                📚 All Resources (${this.allResources.length})
            </button>
            ${Object.entries(this.categories).map(([key, cat]) => {
                const count = this.allResources.filter(r => r.category === key).length;
                return `<button class="filter-btn ${this.currentFilter === key ? 'active' : ''}" data-filter="${key}">
                    ${cat.icon} ${cat.name} (${count})
                </button>`;
            }).join('')}
        `;
        
        filterContainer.appendChild(nav);
        
        // Add event listeners
        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
                
                // Update URL without reload
                const url = new URL(window.location);
                if (filter === 'all') {
                    url.searchParams.delete('type');
                } else {
                    url.searchParams.set('type', filter);
                }
                window.history.replaceState({}, '', url);
            }
        });
    }

    createFilterContainer() {
        const container = document.createElement('div');
        container.className = 'filter-container';
        const main = document.querySelector('main') || document.querySelector('.content-area');
        if (main) {
            main.insertBefore(container, main.firstChild);
        }
        return container;
    }

    applyFilter(filterType) {
        this.currentFilter = filterType;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filterType);
        });
        
        // Filter resources
        const filteredResources = filterType === 'all' 
            ? this.allResources 
            : this.allResources.filter(r => r.category === filterType);
        
        this.displayResources(filteredResources, filterType);
    }

    displayResources(resources, filterType) {
        const container = this.getOrCreateResourceContainer();
        
        // Show category description
        if (filterType !== 'all' && this.categories[filterType]) {
            const cat = this.categories[filterType];
            container.innerHTML = `
                <div class="category-header">
                    <h2>${cat.icon} ${cat.name}</h2>
                    <p class="category-description">${cat.description}</p>
                </div>
            `;
        } else {
            container.innerHTML = '<h2>📚 All Other Resources</h2>';
        }
        
        // Display resources
        const grid = document.createElement('div');
        grid.className = 'resource-grid';
        
        if (resources.length === 0) {
            grid.innerHTML = '<p class="no-resources">No resources found in this category.</p>';
        } else {
            grid.innerHTML = resources.map(resource => this.createResourceCard(resource)).join('');
        }
        
        container.appendChild(grid);
        
        // Update result count
        const countElement = document.querySelector('.resource-count');
        if (countElement) {
            countElement.textContent = `${resources.length} resources found`;
        }
    }

    createResourceCard(resource) {
        const culturalIndicator = resource.cultural_level ? 
            `<div class="cultural-indicator cultural-${resource.cultural_level}">
                🌿 ${resource.cultural_level === 'essential' ? 'Essential' : 'High'} Cultural
            </div>` : '';
        
        const featuredBadge = resource.featured ? 
            '<div class="featured-badge">🌟 Featured</div>' : '';
        
        return `
            <div class="resource-card ${resource.featured ? 'featured' : ''}" data-category="${resource.category}">
                ${featuredBadge}
                <h3 class="resource-title">${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                ${culturalIndicator}
                <div class="resource-actions">
                    <a href="${resource.path}" class="btn btn-primary">Open Resource</a>
                </div>
            </div>
        `;
    }

    getOrCreateResourceContainer() {
        let container = document.querySelector('.filtered-resources-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'filtered-resources-container';
            const main = document.querySelector('main') || document.querySelector('.content-area');
            if (main) {
                main.appendChild(container);
            }
        }
        return container;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const filter = new GraphRAGOtherResourcesFilter();
    filter.init();
});

// Also initialize if scripts load after DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const filter = new GraphRAGOtherResourcesFilter();
        filter.init();
    });
} else {
    const filter = new GraphRAGOtherResourcesFilter();
    filter.init();
}