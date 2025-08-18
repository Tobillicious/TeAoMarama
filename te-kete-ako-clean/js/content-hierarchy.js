/**
 * ================================================================
 * CONTENT HIERARCHY SYSTEM - Educational Content Organization
 * ================================================================
 * 
 * PURPOSE: Implements clear hierarchy showing Unit Plans → Lesson Plans → Resources
 * relationship that reflects real teaching workflow and planning structure.
 * 
 * EDUCATIONAL DESIGN:
 * - Unit Plans: Strategic overview with curriculum alignment and cultural context
 * - Lesson Plans: Detailed 75-minute teaching instances within units
 * - Resources: Handouts, activities, links supporting specific lessons
 * 
 * FEATURES:
 * - Interactive tree navigation showing relationships
 * - Breadcrumb navigation maintaining hierarchy context
 * - Quick access to related resources from any level
 * - Clear visual indicators of content depth and relationships
 * 
 * FOR AI AGENTS:
 * - This system maps the professional teaching workflow
 * - Unit Plans contain strategic context and justification
 * - Lesson Plans house practical 75-minute teaching guidance
 * - Resources are specific supporting materials linked to lessons
 * 
 * USAGE:
 * const hierarchy = new ContentHierarchy();
 * hierarchy.showHierarchyWidget();
 * 
 * ================================================================
 */

class ContentHierarchy {
    constructor() {
        this.contentStructure = this.initContentStructure();
        this.currentPath = [];
        this.init();
    }

    initContentStructure() {
        return {
            units: [
                {
                    id: 'unit-1',
                    title: 'Te Ao Māori - Cultural Identity & Knowledge Systems',
                    description: 'Foundation unit exploring Māori worldviews as basis for all learning',
                    duration: '6-8 weeks',
                    yearLevels: [7, 8, 9, 10],
                    culturalFocus: true,
                    url: 'units/unit-1-te-ao-maori.html',
                    lessons: [
                        {
                            id: 'unit-1-lesson-1',
                            title: 'Whakapapa & Cultural Identity',
                            description: 'Exploring identity through whakapapa and connections',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-1-lesson-1.html',
                            resources: [
                                { type: 'handout', title: 'Whakapapa Reflection Worksheet', url: 'handouts/whakapapa-reflection.html' },
                                { type: 'activity', title: 'Cultural Identity Mapping', url: 'activities.html#identity-mapping' },
                                { type: 'video', title: 'Whakapapa Explained', url: 'youtube.html#whakapapa' }
                            ]
                        },
                        {
                            id: 'unit-1-lesson-2',
                            title: 'Māori Values in Practice',
                            description: 'Understanding and applying core Māori values',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-1-lesson-2.html',
                            resources: [
                                { type: 'handout', title: 'Values in Action Scenarios', url: 'handouts/maori-values-scenarios.html' },
                                { type: 'activity', title: 'Values Sorting Game', url: 'games.html#values-sorting' },
                                { type: 'assessment', title: 'Values Reflection Rubric', url: 'assessment-tools.html#values-rubric' }
                            ]
                        },
                        {
                            id: 'unit-1-lesson-3',
                            title: 'Te Reo Māori in Education',
                            description: 'Integrating Te Reo across all subject learning',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-1-lesson-3.html',
                            resources: [
                                { type: 'handout', title: 'Te Reo Greetings & Phrases', url: 'handouts/te-reo-maori-greetings-handout.html' },
                                { type: 'game', title: 'Te Reo Wordle', url: 'games/te-reo-wordle.html' },
                                { type: 'activity', title: 'Subject Vocabulary Cards', url: 'activities.html#te-reo-vocab' }
                            ]
                        },
                        {
                            id: 'unit-1-lesson-4',
                            title: 'Haka Analysis & Cultural Expression',
                            description: 'Deep analysis of haka as cultural knowledge system',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-1-lesson-4.html',
                            resources: [
                                { type: 'handout', title: 'Haka Comprehension Analysis', url: 'handouts/haka-comprehension-handout.html' },
                                { type: 'video', title: 'Haka Performances & Meanings', url: 'youtube.html#haka-analysis' },
                                { type: 'activity', title: 'Cultural Expression Project', url: 'activities.html#expression-project' }
                            ]
                        },
                        {
                            id: 'unit-1-lesson-5',
                            title: 'Connecting to Contemporary Issues',
                            description: 'Applying Te Ao Māori perspectives to current events',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-1-lesson-5.html',
                            resources: [
                                { type: 'handout', title: 'Current Events Analysis Sheet', url: 'handouts/current-events-maori-lens.html' },
                                { type: 'activity', title: 'Perspective Comparison Tool', url: 'activities.html#perspective-tool' },
                                { type: 'assessment', title: 'Unit Assessment: Cultural Application', url: 'assessment-tools.html#cultural-application' }
                            ]
                        }
                    ]
                },
                {
                    id: 'unit-2',
                    title: 'Decolonized Aotearoa History',
                    description: 'Counter-narratives centering Māori agency and excellence',
                    duration: '8-10 weeks',
                    yearLevels: [8, 9, 10, 11, 12],
                    culturalFocus: true,
                    url: 'units/unit-2-decolonized-history.html',
                    lessons: [
                        {
                            id: 'unit-2-lesson-1',
                            title: 'Pre-Colonial Excellence',
                            description: 'Māori society before European contact',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-2-lesson-1.html',
                            resources: [
                                { type: 'handout', title: 'Pre-Colonial Society Analysis', url: 'handouts/pre-colonial-excellence.html' },
                                { type: 'activity', title: 'Society Comparison Chart', url: 'activities.html#society-comparison' },
                                { type: 'video', title: 'Traditional Māori Innovations', url: 'youtube.html#traditional-innovations' }
                            ]
                        },
                        {
                            id: 'unit-2-lesson-2',
                            title: 'Te Tiriti o Waitangi - The Real Story',
                            description: 'Understanding Te Tiriti from Māori perspective',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-2-lesson-2.html',
                            resources: [
                                { type: 'handout', title: 'Treaty of Waitangi Analysis', url: 'handouts/treaty-of-waitangi-handout.html' },
                                { type: 'activity', title: 'Treaty Promises vs Reality', url: 'activities.html#treaty-analysis' },
                                { type: 'game', title: 'Treaty Decision Points', url: 'games.html#treaty-decisions' }
                            ]
                        },
                        {
                            id: 'unit-2-lesson-3',
                            title: 'Land Wars & Resistance',
                            description: 'Māori resistance and land confiscation impacts',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-2-lesson-3.html',
                            resources: [
                                { type: 'handout', title: 'Land Wars Timeline', url: 'handouts/land-wars-timeline.html' },
                                { type: 'activity', title: 'Resistance Strategies Analysis', url: 'activities.html#resistance-analysis' },
                                { type: 'assessment', title: 'Historical Impact Essay', url: 'assessment-tools.html#impact-essay' }
                            ]
                        },
                        {
                            id: 'unit-2-lesson-4',
                            title: 'Dawn Raids & Urban Migration',
                            description: 'Pacific and Māori experiences in urban centers',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-2-lesson-4.html',
                            resources: [
                                { type: 'handout', title: 'Dawn Raids Impact Analysis', url: 'handouts/dawn-raids-comprehension-handout.html' },
                                { type: 'video', title: 'Personal Stories: Urban Migration', url: 'youtube.html#urban-migration' },
                                { type: 'activity', title: 'Community Impact Mapping', url: 'activities.html#community-impact' }
                            ]
                        },
                        {
                            id: 'unit-2-lesson-5',
                            title: 'Contemporary Sovereignty Movements',
                            description: 'Modern rangatiratanga and self-determination',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-2-lesson-5.html',
                            resources: [
                                { type: 'handout', title: 'Sovereignty Movement Timeline', url: 'handouts/sovereignty-movements.html' },
                                { type: 'activity', title: 'Future Vision Planning', url: 'activities.html#future-vision' },
                                { type: 'assessment', title: 'Unit Project: Change Agent Proposal', url: 'assessment-tools.html#change-agent' }
                            ]
                        }
                    ]
                },
                {
                    id: 'unit-6',
                    title: 'Future Rangatiratanga & Action',
                    description: 'Project-based unit where students lead community change',
                    duration: '4-6 weeks',
                    yearLevels: [10, 11, 12, 13],
                    culturalFocus: true,
                    url: 'units/unit-6-future-rangatiratanga.html',
                    lessons: [
                        {
                            id: 'unit-6-lesson-1',
                            title: 'Visioning Our Future',
                            description: 'Creating compelling visions for 2050 Aotearoa',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-6-lesson-1.html',
                            resources: [
                                { type: 'handout', title: 'Vision 2050 Planning Template', url: 'handouts/vision-2050-template.html' },
                                { type: 'activity', title: 'Future Scenario Building', url: 'activities.html#scenario-building' },
                                { type: 'video', title: 'Rangatiratanga in Practice', url: 'youtube.html#rangatiratanga-practice' }
                            ]
                        },
                        {
                            id: 'unit-6-lesson-2',
                            title: 'Action Planning & Strategy',
                            description: 'Developing concrete action plans for change',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-6-lesson-2.html',
                            resources: [
                                { type: 'handout', title: 'Action Planning Framework', url: 'handouts/action-planning-framework.html' },
                                { type: 'activity', title: 'SMART Goals Workshop', url: 'activities.html#smart-goals' },
                                { type: 'assessment', title: 'Project Proposal Rubric', url: 'assessment-tools.html#project-proposal' }
                            ]
                        },
                        {
                            id: 'unit-6-lesson-3',
                            title: 'Community Engagement Skills',
                            description: 'Building skills for effective community leadership',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-6-lesson-3.html',
                            resources: [
                                { type: 'handout', title: 'Leadership Skills Checklist', url: 'handouts/leadership-skills.html' },
                                { type: 'activity', title: 'Mock Community Meeting', url: 'activities.html#community-meeting' },
                                { type: 'game', title: 'Stakeholder Perspective Game', url: 'games.html#stakeholder-game' }
                            ]
                        },
                        {
                            id: 'unit-6-lesson-4',
                            title: 'Project Implementation',
                            description: 'Putting action plans into practice',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-6-lesson-4.html',
                            resources: [
                                { type: 'handout', title: 'Implementation Tracker', url: 'handouts/implementation-tracker.html' },
                                { type: 'activity', title: 'Peer Support Networks', url: 'activities.html#peer-support' },
                                { type: 'assessment', title: 'Implementation Reflection', url: 'assessment-tools.html#implementation-reflection' }
                            ]
                        },
                        {
                            id: 'unit-6-lesson-5',
                            title: 'Presentation & Celebration',
                            description: 'Sharing achievements and learning with community',
                            duration: '75 minutes',
                            url: 'units/lessons/unit-6-lesson-5.html',
                            resources: [
                                { type: 'handout', title: 'Presentation Planning Guide', url: 'handouts/presentation-guide.html' },
                                { type: 'activity', title: 'Community Showcase Event', url: 'activities.html#community-showcase' },
                                { type: 'assessment', title: 'Final Project Assessment', url: 'assessment-tools.html#final-project' }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    init() {
        this.setupGlobalMethods();
        this.addHierarchyStyles();
        
        // Auto-detect current page and update navigation if needed
        const currentPage = this.detectCurrentPage();
        if (currentPage) {
            this.updatePageNavigation(currentPage);
        }
    }

    setupGlobalMethods() {
        // Make methods available globally for onclick handlers
        window.showContentHierarchy = () => this.showHierarchyModal();
        window.navigateToUnit = (unitId) => this.navigateToUnit(unitId);
        window.navigateToLesson = (unitId, lessonId) => this.navigateToLesson(unitId, lessonId);
        window.showResourceDetails = (resource) => this.showResourceDetails(resource);
    }

    addHierarchyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .content-hierarchy-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(250,251,252,0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }
            
            .hierarchy-content {
                background: white;
                border-radius: 15px;
                padding: 2rem;
                max-width: 90vw;
                width: 1000px;
                max-height: 85vh;
                overflow-y: auto;
                position: relative;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border-light);
            }
            
            .hierarchy-tree {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .unit-node {
                background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
                color: white;
                padding: 1.5rem;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .unit-node:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(44, 95, 65, 0.3);
            }
            
            .unit-node.expanded {
                border-radius: 12px 12px 0 0;
            }
            
            .unit-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .unit-info h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.3rem;
            }
            
            .unit-meta {
                font-size: 0.9rem;
                opacity: 0.9;
                display: flex;
                gap: 1rem;
                margin-top: 0.5rem;
            }
            
            .expand-icon {
                font-size: 1.5rem;
                transition: transform 0.3s ease;
            }
            
            .expand-icon.rotated {
                transform: rotate(180deg);
            }
            
            .lessons-container {
                background: var(--color-surface);
                border: 2px solid var(--color-primary);
                border-top: none;
                border-radius: 0 0 12px 12px;
                padding: 1.5rem;
                display: none;
            }
            
            .lessons-container.visible {
                display: block;
            }
            
            .lesson-list {
                display: grid;
                gap: 1rem;
            }
            
            .lesson-item {
                background: white;
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 1.25rem;
                cursor: pointer;
                transition: all 0.2s ease;
                border-left: 4px solid var(--color-secondary);
            }
            
            .lesson-item:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                transform: translateX(5px);
            }
            
            .lesson-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.75rem;
            }
            
            .lesson-title {
                font-weight: bold;
                color: var(--color-primary);
                margin: 0;
                font-size: 1.1rem;
            }
            
            .lesson-duration {
                background: var(--color-accent);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 500;
            }
            
            .lesson-description {
                color: var(--color-text-secondary);
                font-size: 0.95rem;
                line-height: 1.4;
                margin-bottom: 1rem;
            }
            
            .resources-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 0.5rem;
                margin-top: 0.75rem;
            }
            
            .resource-tag {
                background: var(--color-cultural-light);
                border: 1px solid var(--color-border);
                padding: 0.5rem 0.75rem;
                border-radius: 6px;
                font-size: 0.85rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .resource-tag:hover {
                background: var(--color-secondary);
                color: white;
            }
            
            .resource-tag.handout { border-left-color: var(--color-primary); }
            .resource-tag.activity { border-left-color: var(--color-accent); }
            .resource-tag.video { border-left-color: var(--color-maori-red); }
            .resource-tag.game { border-left-color: var(--color-secondary); }
            .resource-tag.assessment { border-left-color: #ffc107; }
            
            .breadcrumb-nav {
                background: var(--color-cultural-light);
                padding: 1rem 1.5rem;
                border-radius: 8px;
                margin-bottom: 2rem;
                border-left: 4px solid var(--color-secondary);
            }
            
            .breadcrumb-nav h4 {
                margin: 0 0 0.5rem 0;
                color: var(--color-primary);
            }
            
            .breadcrumb-path {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: var(--color-text-secondary);
            }
            
            .breadcrumb-link {
                color: var(--color-secondary);
                text-decoration: none;
                font-weight: 500;
            }
            
            .breadcrumb-link:hover {
                text-decoration: underline;
            }
            
            .hierarchy-controls {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid var(--color-border);
            }
            
            .hierarchy-btn {
                background: var(--color-primary);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .hierarchy-btn:hover {
                background: var(--color-secondary);
                transform: translateY(-2px);
            }
            
            .hierarchy-btn.secondary {
                background: #666;
            }
            
            .hierarchy-widget {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background: var(--color-primary);
                color: white;
                padding: 1rem;
                border-radius: 50px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(44, 95, 65, 0.3);
                transition: all 0.3s ease;
                z-index: 100;
            }
            
            .hierarchy-widget:hover {
                background: var(--color-secondary);
                transform: translateY(-3px);
                box-shadow: 0 6px 25px rgba(44, 95, 65, 0.4);
            }
            
            @media (max-width: 768px) {
                .hierarchy-content {
                    margin: 1rem;
                    padding: 1.5rem;
                    max-width: none;
                    width: auto;
                }
                
                .unit-meta {
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .resources-grid {
                    grid-template-columns: 1fr;
                }
                
                .hierarchy-widget {
                    bottom: 1rem;
                    right: 1rem;
                    padding: 0.75rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    showHierarchyModal() {
        // Remove any existing modal
        document.querySelectorAll('.content-hierarchy-modal').forEach(modal => modal.remove());
        
        const modal = document.createElement('div');
        modal.className = 'content-hierarchy-modal';
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeHierarchyModal();
            }
        });
        
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeHierarchyModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        const content = document.createElement('div');
        content.className = 'hierarchy-content';
        
        content.innerHTML = `
            <button onclick="document.querySelector('.content-hierarchy-modal').remove()" 
                    style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #666; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; border-radius: 4px; transition: all 0.2s ease;">×</button>
            
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: var(--color-primary); margin: 0 0 0.5rem 0; font-size: 2rem;">📚 Content Hierarchy</h2>
                <p style="color: var(--color-text-secondary); margin: 0; font-size: 1.1rem;">Understanding the Unit Plans → Lesson Plans → Resources structure</p>
            </div>
            
            <div class="breadcrumb-nav">
                <h4>🎯 Professional Teaching Workflow</h4>
                <div class="breadcrumb-path">
                    <a href="unit-plans.html" class="breadcrumb-link">Unit Plans</a>
                    <span>→</span>
                    <a href="lessons.html" class="breadcrumb-link">Lesson Plans</a>
                    <span>→</span>
                    <a href="handouts.html" class="breadcrumb-link">Resources</a>
                </div>
                <p style="margin: 0.75rem 0 0 0; font-size: 0.9rem; color: var(--color-text-secondary);">
                    Unit Plans provide strategic context → Lesson Plans offer 75-minute teaching guidance → Resources support specific learning objectives
                </p>
            </div>
            
            <div class="hierarchy-tree" id="hierarchy-tree">
                ${this.renderUnitTree()}
            </div>
            
            <div class="hierarchy-controls">
                <button class="hierarchy-btn" onclick="window.location.href='unit-plans.html'">📚 Browse All Units</button>
                <button class="hierarchy-btn" onclick="window.location.href='lessons.html'">📖 View All Lessons</button>
                <button class="hierarchy-btn secondary" onclick="document.querySelector('.content-hierarchy-modal').remove()">Close</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Attach event listeners after DOM insertion
        this.attachHierarchyEventListeners();
    }

    renderUnitTree() {
        return this.contentStructure.units.map(unit => `
            <div class="unit-container">
                <div class="unit-node" onclick="this.toggleExpanded('${unit.id}')">
                    <div class="unit-header">
                        <div class="unit-info">
                            <h3>${unit.culturalFocus ? '🌟 ' : ''}${unit.title}</h3>
                            <p style="margin: 0; font-size: 0.95rem; opacity: 0.9;">${unit.description}</p>
                            <div class="unit-meta">
                                <span>📅 ${unit.duration}</span>
                                <span>🎓 Years ${unit.yearLevels.join(', ')}</span>
                                <span>📖 ${unit.lessons.length} Lessons</span>
                            </div>
                        </div>
                        <div class="expand-icon" id="expand-${unit.id}">▼</div>
                    </div>
                </div>
                
                <div class="lessons-container" id="lessons-${unit.id}">
                    <h4 style="color: var(--color-primary); margin: 0 0 1rem 0;">📖 Lesson Plans (75-minute teaching instances)</h4>
                    <div class="lesson-list">
                        ${unit.lessons.map(lesson => `
                            <div class="lesson-item" onclick="window.navigateToLesson('${unit.id}', '${lesson.id}')">
                                <div class="lesson-header">
                                    <h5 class="lesson-title">${lesson.title}</h5>
                                    <span class="lesson-duration">${lesson.duration}</span>
                                </div>
                                <p class="lesson-description">${lesson.description}</p>
                                
                                <div>
                                    <h6 style="color: var(--color-secondary); margin: 0 0 0.5rem 0; font-size: 0.9rem;">📄 Supporting Resources:</h6>
                                    <div class="resources-grid">
                                        ${lesson.resources.map(resource => `
                                            <div class="resource-tag ${resource.type}" onclick="event.stopPropagation(); window.showResourceDetails(${JSON.stringify(resource).replace(/"/g, '&quot;')})">
                                                <span>${this.getResourceIcon(resource.type)}</span>
                                                <span>${resource.title}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getResourceIcon(type) {
        const icons = {
            handout: '📄',
            activity: '⚡',
            video: '📺',
            game: '🎮',
            assessment: '📊'
        };
        return icons[type] || '📋';
    }

    attachHierarchyEventListeners() {
        // Add toggle functionality to units
        this.contentStructure.units.forEach(unit => {
            const unitNode = document.querySelector(`.unit-node[onclick*="${unit.id}"]`);
            if (unitNode) {
                unitNode.onclick = () => this.toggleUnitExpansion(unit.id);
            }
        });
    }

    toggleUnitExpansion(unitId) {
        const lessonsContainer = document.getElementById(`lessons-${unitId}`);
        const expandIcon = document.getElementById(`expand-${unitId}`);
        const unitNode = document.querySelector(`.unit-node[onclick*="${unitId}"]`);
        
        if (!lessonsContainer || !expandIcon || !unitNode) return;
        
        const isExpanded = lessonsContainer.classList.contains('visible');
        
        if (isExpanded) {
            lessonsContainer.classList.remove('visible');
            expandIcon.classList.remove('rotated');
            unitNode.classList.remove('expanded');
        } else {
            lessonsContainer.classList.add('visible');
            expandIcon.classList.add('rotated');
            unitNode.classList.add('expanded');
        }
    }

    navigateToUnit(unitId) {
        const unit = this.contentStructure.units.find(u => u.id === unitId);
        if (unit) {
            window.location.href = unit.url;
        }
    }

    navigateToLesson(unitId, lessonId) {
        const unit = this.contentStructure.units.find(u => u.id === unitId);
        if (unit) {
            const lesson = unit.lessons.find(l => l.id === lessonId);
            if (lesson) {
                window.location.href = lesson.url;
            }
        }
    }

    showResourceDetails(resource) {
        // Simple alert for now - could be enhanced with a proper modal
        const message = `📄 ${resource.title}\n\nType: ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}\n\nClick OK to open this resource.`;
        
        if (confirm(message)) {
            window.location.href = resource.url;
        }
    }

    closeHierarchyModal() {
        document.body.style.overflow = '';
        document.querySelectorAll('.content-hierarchy-modal').forEach(modal => modal.remove());
    }

    addHierarchyWidget() {
        // Add floating widget to access hierarchy from any page
        const widget = document.createElement('div');
        widget.className = 'hierarchy-widget';
        widget.innerHTML = '📚';
        widget.title = 'Show Content Hierarchy';
        widget.onclick = () => this.showHierarchyModal();
        
        document.body.appendChild(widget);
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename.includes('unit-')) {
            return { type: 'unit', file: filename };
        } else if (filename.includes('lesson') || path.includes('/lessons/')) {
            return { type: 'lesson', file: filename };
        } else if (filename.includes('handout') || path.includes('/handouts/')) {
            return { type: 'resource', file: filename };
        }
        
        return null;
    }

    updatePageNavigation(currentPage) {
        // Add breadcrumb navigation to show hierarchy context
        const breadcrumb = this.createBreadcrumbNavigation(currentPage);
        if (breadcrumb) {
            // Try to insert after main header
            const header = document.querySelector('.site-header');
            if (header && header.nextSibling) {
                header.parentNode.insertBefore(breadcrumb, header.nextSibling);
            }
        }
    }

    createBreadcrumbNavigation(currentPage) {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'breadcrumb-nav';
        breadcrumb.style.cssText = `
            background: var(--color-cultural-light);
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--color-border);
            margin: 0;
        `;
        
        let breadcrumbContent = '';
        
        if (currentPage.type === 'unit') {
            breadcrumbContent = `
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <a href="unit-plans.html" style="color: var(--color-secondary); text-decoration: none;">📚 Unit Plans</a>
                    <span style="color: var(--color-text-secondary);">→ Current Unit</span>
                    <button onclick="window.showContentHierarchy()" style="margin-left: auto; background: var(--color-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.8rem; cursor: pointer;">View Full Hierarchy</button>
                </div>
            `;
        } else if (currentPage.type === 'lesson') {
            breadcrumbContent = `
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <a href="unit-plans.html" style="color: var(--color-secondary); text-decoration: none;">📚 Unit Plans</a>
                    <span style="color: var(--color-text-secondary);">→</span>
                    <a href="lessons.html" style="color: var(--color-secondary); text-decoration: none;">📖 Lesson Plans</a>
                    <span style="color: var(--color-text-secondary);">→ Current Lesson</span>
                    <button onclick="window.showContentHierarchy()" style="margin-left: auto; background: var(--color-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.8rem; cursor: pointer;">View Full Hierarchy</button>
                </div>
            `;
        } else if (currentPage.type === 'resource') {
            breadcrumbContent = `
                <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                    <a href="unit-plans.html" style="color: var(--color-secondary); text-decoration: none;">📚 Unit Plans</a>
                    <span style="color: var(--color-text-secondary);">→</span>
                    <a href="lessons.html" style="color: var(--color-secondary); text-decoration: none;">📖 Lesson Plans</a>
                    <span style="color: var(--color-text-secondary);">→</span>
                    <a href="handouts.html" style="color: var(--color-secondary); text-decoration: none;">📄 Resources</a>
                    <span style="color: var(--color-text-secondary);">→ Current Resource</span>
                    <button onclick="window.showContentHierarchy()" style="margin-left: auto; background: var(--color-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.8rem; cursor: pointer;">View Full Hierarchy</button>
                </div>
            `;
        }
        
        breadcrumb.innerHTML = breadcrumbContent;
        return breadcrumb;
    }

    enhanceExistingPages() {
        // Add hierarchy navigation to unit plans page
        const unitPlansList = document.querySelector('.resource-grid');
        if (unitPlansList) {
            this.enhanceUnitPlansList(unitPlansList);
        }
        
        // Add lesson connections to lesson pages
        const lessonContent = document.querySelector('.content-area');
        if (lessonContent && window.location.pathname.includes('lesson')) {
            this.addLessonConnections(lessonContent);
        }
    }

    enhanceUnitPlansList(unitPlansList) {
        // Add "View Lessons" buttons to each unit card
        const unitCards = unitPlansList.querySelectorAll('.resource-card');
        unitCards.forEach((card, index) => {
            if (index < this.contentStructure.units.length) {
                const unit = this.contentStructure.units[index];
                const viewLessonsBtn = document.createElement('button');
                viewLessonsBtn.textContent = '📖 View Lessons';
                viewLessonsBtn.style.cssText = `
                    background: var(--color-secondary);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 15px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    margin-top: 1rem;
                    transition: all 0.2s ease;
                `;
                viewLessonsBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showUnitLessons(unit);
                };
                card.appendChild(viewLessonsBtn);
            }
        });
    }

    showUnitLessons(unit) {
        // Quick modal showing unit's lessons
        const modal = document.createElement('div');
        modal.className = 'content-hierarchy-modal';
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        modal.innerHTML = `
            <div class="hierarchy-content" style="max-width: 600px;">
                <button onclick="this.closest('.content-hierarchy-modal').remove()" 
                        style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: #666; font-size: 1.5rem; cursor: pointer;">×</button>
                
                <h3 style="color: var(--color-primary); margin: 0 0 1rem 0;">📖 ${unit.title} - Lesson Plans</h3>
                
                <div style="display: grid; gap: 1rem;">
                    ${unit.lessons.map(lesson => `
                        <div style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; cursor: pointer;" onclick="window.location.href='${lesson.url}'">
                            <h4 style="color: var(--color-secondary); margin: 0 0 0.5rem 0;">${lesson.title}</h4>
                            <p style="color: var(--color-text-secondary); margin: 0 0 0.5rem 0; font-size: 0.9rem;">${lesson.description}</p>
                            <span style="background: var(--color-accent); color: white; padding: 0.25rem 0.5rem; border-radius: 10px; font-size: 0.8rem;">${lesson.duration}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button onclick="window.location.href='${unit.url}'" style="background: var(--color-primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">View Complete Unit</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Auto-initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    if (!window.contentHierarchy) {
        window.contentHierarchy = new ContentHierarchy();
        
        // Add hierarchy widget on key pages
        const shouldShowWidget = ['unit-plans.html', 'lessons.html', 'handouts.html', 'index.html'].some(page => 
            window.location.pathname.includes(page) || window.location.pathname.endsWith(page)
        );
        
        if (shouldShowWidget) {
            window.contentHierarchy.addHierarchyWidget();
        }
        
        // Enhance existing pages
        window.contentHierarchy.enhanceExistingPages();
    }
});