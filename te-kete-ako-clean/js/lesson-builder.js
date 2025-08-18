// Te Kete Ako - Interactive Lesson Builder
// Create comprehensive lesson packages with cultural integration

class LessonBuilder {
    constructor() {
        this.currentLesson = this.initializeLesson();
        this.templates = this.loadTemplates();
        this.culturalResources = this.loadCulturalResources();
        this.init();
    }

    initializeLesson() {
        return {
            title: '',
            subject: '',
            yearLevel: '',
            duration: '50 minutes',
            objectives: [],
            culturalConnections: [],
            activities: [],
            resources: [],
            assessment: {},
            differentiation: [],
            whakataukī: null,
            curriculum: {
                learningArea: '',
                strand: '',
                objectives: []
            }
        };
    }

    init() {
        this.createBuilderInterface();
        this.bindEvents();
        console.log('🏗️ Lesson Builder activated - Ready to create amazing lessons!');
    }

    loadTemplates() {
        return {
            structures: {
                '5E': ['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate'],
                'Traditional': ['Introduction', 'Development', 'Practice', 'Conclusion'],
                'Inquiry': ['Question', 'Investigate', 'Create', 'Discuss', 'Reflect'],
                'Cultural': ['Pōwhiri (Welcome)', 'Whakatōhea (Sharing)', 'Ako (Learning)', 'Whakatau (Closure)']
            },
            activities: {
                engage: [
                    'Hook question or scenario',
                    'Cultural story or whakataukī',
                    'Hands-on demonstration',
                    'Video or multimedia',
                    'Real-world connection'
                ],
                explore: [
                    'Group investigation',
                    'Hands-on experiment',
                    'Research activity',
                    'Field work or observation',
                    'Problem-solving task'
                ],
                explain: [
                    'Direct instruction',
                    'Student presentations',
                    'Guided discussion',
                    'Concept mapping',
                    'Demonstration'
                ]
            }
        };
    }

    loadCulturalResources() {
        return {
            whakataukī: [
                {
                    māori: "Mā te kōrero ka mōhio, mā te mōhio ka mārama, mā te mārama ka mātau",
                    english: "Through discussion comes knowledge, through knowledge comes understanding, through understanding comes wisdom",
                    subjects: ['all'],
                    context: "Perfect for introducing any learning topic"
                },
                {
                    māori: "He aha te mea nui o te ao? He tangata, he tangata, he tangata",
                    english: "What is the most important thing in the world? It is people, it is people, it is people",
                    subjects: ['social-sciences', 'english', 'health'],
                    context: "Emphasizes relationships and community"
                },
                {
                    māori: "Kia whakatomuri te haere whakamua",
                    english: "Walk backwards into the future",
                    subjects: ['history', 'social-sciences'],
                    context: "Learn from the past to move forward"
                }
            ],
            values: [
                { name: 'Manaakitanga', description: 'Hospitality, care, respect', applications: ['classroom environment', 'peer relationships'] },
                { name: 'Whakapapa', description: 'Relationships, connections', applications: ['content connections', 'prior knowledge'] },
                { name: 'Ako', description: 'Reciprocal learning', applications: ['peer teaching', 'collaborative learning'] }
            ]
        };
    }

    createBuilderInterface() {
        // Create floating lesson builder button
        const builderBtn = document.createElement('button');
        builderBtn.id = 'lesson-builder-btn';
        builderBtn.innerHTML = '🏗️';
        builderBtn.title = 'Lesson Builder - Hanga Akoranga';
        builderBtn.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            color: white;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
            transition: all 0.3s ease;
            z-index: 1001;
        `;

        builderBtn.addEventListener('mouseenter', () => {
            builderBtn.style.transform = 'scale(1.1)';
        });

        builderBtn.addEventListener('mouseleave', () => {
            builderBtn.style.transform = 'scale(1)';
        });

        // Create lesson builder modal
        const builderModal = document.createElement('div');
        builderModal.id = 'lesson-builder-modal';
        builderModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: flex-start;
            padding: 20px;
            overflow-y: auto;
        `;

        const builderContent = document.createElement('div');
        builderContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            margin-top: 20px;
        `;

        builderContent.innerHTML = this.createBuilderHTML();
        builderModal.appendChild(builderContent);
        document.body.appendChild(builderBtn);
        document.body.appendChild(builderModal);

        // Event listeners
        builderBtn.addEventListener('click', () => this.openBuilder());
        builderModal.addEventListener('click', (e) => {
            if (e.target === builderModal) this.closeBuilder();
        });

        this.bindBuilderEvents();
    }

    createBuilderHTML() {
        return `
            <div class="lesson-builder-header" style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
                <h2 style="color: #7c3aed; margin: 0; font-size: 2rem;">🏗️ Lesson Builder</h2>
                <p style="color: #6b7280; margin: 10px 0 0 0;">Hanga Akoranga - Create culturally responsive lessons</p>
                <button id="close-builder" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">❌</button>
            </div>

            <div class="lesson-builder-tabs" style="display: flex; margin-bottom: 30px; background: #f3f4f6; border-radius: 10px; padding: 5px;">
                <button class="tab-btn active" data-tab="basics" style="flex: 1; padding: 10px; background: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">📝 Basics</button>
                <button class="tab-btn" data-tab="structure" style="flex: 1; padding: 10px; background: none; border: none; border-radius: 8px; cursor: pointer;">🏗️ Structure</button>
                <button class="tab-btn" data-tab="cultural" style="flex: 1; padding: 10px; background: none; border: none; border-radius: 8px; cursor: pointer;">🌿 Cultural</button>
                <button class="tab-btn" data-tab="activities" style="flex: 1; padding: 10px; background: none; border: none; border-radius: 8px; cursor: pointer;">🎯 Activities</button>
                <button class="tab-btn" data-tab="assessment" style="flex: 1; padding: 10px; background: none; border: none; border-radius: 8px; cursor: pointer;">📊 Assessment</button>
                <button class="tab-btn" data-tab="export" style="flex: 1; padding: 10px; background: none; border: none; border-radius: 8px; cursor: pointer;">📄 Export</button>
            </div>

            <div class="tab-content">
                ${this.createBasicsTab()}
                ${this.createStructureTab()}
                ${this.createCulturalTab()}
                ${this.createActivitiesTab()}
                ${this.createAssessmentTab()}
                ${this.createExportTab()}
            </div>
        `;
    }

    createBasicsTab() {
        return `
            <div class="tab-panel active" id="tab-basics">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Lesson Title</label>
                        <input type="text" id="lesson-title" placeholder="Enter lesson title..." style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                    </div>
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Subject Area</label>
                        <select id="lesson-subject" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="">Select subject...</option>
                            <option value="english">English</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="science">Science</option>
                            <option value="social-sciences">Social Sciences</option>
                            <option value="arts">The Arts</option>
                            <option value="health">Health & PE</option>
                            <option value="technology">Technology</option>
                            <option value="te-reo-maori">Te Reo Māori</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Year Level</label>
                        <select id="lesson-year" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="">Select year level...</option>
                            <option value="1-2">Years 1-2</option>
                            <option value="3-4">Years 3-4</option>
                            <option value="5-6">Years 5-6</option>
                            <option value="7-8">Years 7-8</option>
                            <option value="9-10">Years 9-10</option>
                            <option value="11-13">Years 11-13</option>
                        </select>
                    </div>
                    <div>
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">Duration</label>
                        <select id="lesson-duration" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <option value="30 minutes">30 minutes</option>
                            <option value="45 minutes">45 minutes</option>
                            <option value="50 minutes" selected>50 minutes</option>
                            <option value="60 minutes">60 minutes</option>
                            <option value="90 minutes">90 minutes</option>
                        </select>
                    </div>
                </div>
                
                <div style="margin-top: 20px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">Learning Objectives</label>
                    <div id="objectives-container">
                        <div class="objective-item" style="display: flex; gap: 10px; margin-bottom: 10px;">
                            <input type="text" placeholder="Students will be able to..." style="flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
                            <button type="button" onclick="this.parentElement.remove()" style="background: #ef4444; color: white; border: none; border-radius: 8px; padding: 10px 15px; cursor: pointer;">Remove</button>
                        </div>
                    </div>
                    <button id="add-objective" style="background: #10b981; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer; margin-top: 10px;">+ Add Objective</button>
                </div>
            </div>
        `;
    }

    createStructureTab() {
        return `
            <div class="tab-panel" id="tab-structure" style="display: none;">
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #7c3aed;">Choose Lesson Structure</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        ${Object.entries(this.templates.structures).map(([key, phases]) => `
                            <div class="structure-option" data-structure="${key}" style="border: 2px solid #e5e7eb; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease;">
                                <h4 style="margin: 0 0 10px 0; color: #374151;">${key} Model</h4>
                                <div style="font-size: 0.9rem; color: #6b7280;">
                                    ${phases.map(phase => `<div>• ${phase}</div>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div id="structure-details" style="display: none;">
                    <h3 style="color: #7c3aed;">Lesson Phases</h3>
                    <div id="phases-container"></div>
                </div>
            </div>
        `;
    }

    createCulturalTab() {
        return `
            <div class="tab-panel" id="tab-cultural" style="display: none;">
                <div style="background: linear-gradient(135deg, #f0f8f4, #e8f5e8); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #2E8B57;">
                    <h3 style="color: #2E8B57; margin: 0 0 10px 0;">🌿 Cultural Integration</h3>
                    <p style="margin: 0; color: #374151;">Incorporate Te Ao Māori perspectives to make learning meaningful and culturally responsive.</p>
                </div>

                <div style="margin-bottom: 30px;">
                    <h4>Select a Whakataukī (Proverb)</h4>
                    <div id="whakataukī-options" style="display: grid; gap: 15px;">
                        ${this.culturalResources.whakataukī.map((whaka, index) => `
                            <div class="whakataukī-option" data-index="${index}" style="border: 1px solid #d1d5db; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease;">
                                <div style="font-weight: bold; color: #2E8B57; margin-bottom: 5px;">${whaka.māori}</div>
                                <div style="font-style: italic; color: #6b7280; margin-bottom: 10px;">"${whaka.english}"</div>
                                <div style="font-size: 0.9rem; color: #374151;">${whaka.context}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 30px;">
                    <h4>Māori Values Integration</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                        ${this.culturalResources.values.map(value => `
                            <label style="display: block; border: 1px solid #d1d5db; border-radius: 12px; padding: 15px; cursor: pointer;">
                                <input type="checkbox" name="cultural-values" value="${value.name}" style="margin-right: 10px;">
                                <strong>${value.name}</strong><br>
                                <span style="color: #6b7280; font-size: 0.9rem;">${value.description}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <h4>Cultural Connections</h4>
                    <textarea id="cultural-connections" placeholder="How does this lesson connect to Māori knowledge, perspectives, or experiences?" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical;"></textarea>
                </div>
            </div>
        `;
    }

    createActivitiesTab() {
        return `
            <div class="tab-panel" id="tab-activities" style="display: none;">
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #7c3aed;">Learning Activities</h3>
                    <div id="activities-container">
                        <div class="activity-builder" style="border: 1px solid #d1d5db; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
                            <div style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <div style="flex: 1;">
                                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">Activity Name</label>
                                    <input type="text" placeholder="e.g., Group Investigation" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;">
                                </div>
                                <div style="flex: 1;">
                                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">Duration</label>
                                    <input type="text" placeholder="e.g., 15 minutes" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;">
                                </div>
                                <div>
                                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">Type</label>
                                    <select style="padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;">
                                        <option value="individual">Individual</option>
                                        <option value="pair">Pair Work</option>
                                        <option value="group">Group Work</option>
                                        <option value="whole-class">Whole Class</option>
                                    </select>
                                </div>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Description</label>
                                <textarea placeholder="Describe the activity and instructions..." style="width: 100%; height: 80px; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical;"></textarea>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <label style="display: block; font-weight: bold; margin-bottom: 5px;">Resources Needed</label>
                                <input type="text" placeholder="e.g., Worksheets, markers, poster paper" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;">
                            </div>
                            <button type="button" onclick="this.closest('.activity-builder').remove()" style="background: #ef4444; color: white; border: none; border-radius: 6px; padding: 8px 15px; cursor: pointer;">Remove Activity</button>
                        </div>
                    </div>
                    <button id="add-activity" style="background: #10b981; color: white; border: none; border-radius: 8px; padding: 10px 20px; cursor: pointer;">+ Add Activity</button>
                </div>

                <div>
                    <h4>Differentiation Strategies</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" name="differentiation" value="content">
                            <span>Content Variation</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" name="differentiation" value="process">
                            <span>Process Options</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" name="differentiation" value="product">
                            <span>Product Choices</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 8px;">
                            <input type="checkbox" name="differentiation" value="environment">
                            <span>Learning Environment</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    createAssessmentTab() {
        return `
            <div class="tab-panel" id="tab-assessment" style="display: none;">
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #7c3aed;">Assessment Strategy</h3>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                        <div>
                            <h4>Formative Assessment</h4>
                            <div style="space-y: 10px;">
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="formative" value="observation" style="margin-right: 8px;">
                                    Teacher Observation
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="formative" value="questioning" style="margin-right: 8px;">
                                    Strategic Questioning
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="formative" value="peer-feedback" style="margin-right: 8px;">
                                    Peer Feedback
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="formative" value="exit-ticket" style="margin-right: 8px;">
                                    Exit Tickets
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <h4>Summative Assessment</h4>
                            <div>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="summative" value="project" style="margin-right: 8px;">
                                    Project/Portfolio
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="summative" value="presentation" style="margin-right: 8px;">
                                    Presentation
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="summative" value="written" style="margin-right: 8px;">
                                    Written Assessment
                                </label>
                                <label style="display: block; margin-bottom: 10px;">
                                    <input type="checkbox" name="summative" value="practical" style="margin-right: 8px;">
                                    Practical Demonstration
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4>Success Criteria</h4>
                        <div id="criteria-container">
                            <div class="criteria-item" style="display: flex; gap: 10px; margin-bottom: 10px;">
                                <input type="text" placeholder="Students can demonstrate..." style="flex: 1; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px;">
                                <button type="button" onclick="this.parentElement.remove()" style="background: #ef4444; color: white; border: none; border-radius: 6px; padding: 8px 12px; cursor: pointer;">✕</button>
                            </div>
                        </div>
                        <button id="add-criteria" style="background: #10b981; color: white; border: none; border-radius: 6px; padding: 8px 16px; cursor: pointer; margin-top: 10px;">+ Add Criteria</button>
                    </div>
                </div>
            </div>
        `;
    }

    createExportTab() {
        return `
            <div class="tab-panel" id="tab-export" style="display: none;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3 style="color: #7c3aed;">Export Your Lesson</h3>
                    <p style="color: #6b7280;">Generate a complete lesson package ready for teaching</p>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <button id="export-pdf" style="background: #dc2626; color: white; border: none; border-radius: 12px; padding: 20px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;">
                        📄 Export PDF<br>
                        <span style="font-size: 0.9rem; opacity: 0.9;">Printable lesson plan</span>
                    </button>
                    
                    <button id="export-html" style="background: #2563eb; color: white; border: none; border-radius: 12px; padding: 20px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;">
                        🌐 Save as HTML<br>
                        <span style="font-size: 0.9rem; opacity: 0.9;">Web-ready format</span>
                    </button>
                    
                    <button id="export-docx" style="background: #7c3aed; color: white; border: none; border-radius: 12px; padding: 20px; cursor: pointer; font-size: 1.1rem; transition: all 0.3s ease;">
                        📝 Word Document<br>
                        <span style="font-size: 0.9rem; opacity: 0.9;">Editable format</span>
                    </button>
                </div>

                <div style="background: #f8f9fa; border-radius: 12px; padding: 20px;">
                    <h4 style="margin: 0 0 15px 0;">Lesson Preview</h4>
                    <div id="lesson-preview" style="max-height: 400px; overflow-y: auto; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                        <div style="text-align: center; color: #6b7280; padding: 40px;">
                            Fill in the lesson details to see preview here...
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindBuilderEvents() {
        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Close button
        document.getElementById('close-builder')?.addEventListener('click', () => {
            this.closeBuilder();
        });

        // Add objective button
        document.getElementById('add-objective')?.addEventListener('click', () => {
            this.addObjectiveInput();
        });

        // Add activity button
        document.getElementById('add-activity')?.addEventListener('click', () => {
            this.addActivityBuilder();
        });

        // Add criteria button
        document.getElementById('add-criteria')?.addEventListener('click', () => {
            this.addCriteriaInput();
        });

        // Structure selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.structure-option')) {
                this.selectStructure(e.target.closest('.structure-option').dataset.structure);
            }
        });

        // Whakataukī selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.whakataukī-option')) {
                this.selectWhakataukī(parseInt(e.target.closest('.whakataukī-option').dataset.index));
            }
        });

        // Export buttons
        document.getElementById('export-pdf')?.addEventListener('click', () => this.exportPDF());
        document.getElementById('export-html')?.addEventListener('click', () => this.exportHTML());
        document.getElementById('export-docx')?.addEventListener('click', () => this.exportDocx());

        // Real-time preview updates
        document.addEventListener('input', (e) => {
            if (e.target.closest('#lesson-builder-modal')) {
                this.updatePreview();
            }
        });
    }

    openBuilder() {
        document.getElementById('lesson-builder-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeBuilder() {
        document.getElementById('lesson-builder-modal').style.display = 'none';
        document.body.style.overflow = '';
    }

    switchTab(tabName) {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.style.display = 'none';
            panel.classList.remove('active');
        });

        // Activate selected tab
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        const panel = document.getElementById(`tab-${tabName}`);
        panel.style.display = 'block';
        panel.classList.add('active');

        // Update tab button styling
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if (btn.dataset.tab === tabName) {
                btn.style.background = 'white';
                btn.style.color = '#7c3aed';
            } else {
                btn.style.background = 'none';
                btn.style.color = '#6b7280';
            }
        });
    }

    addObjectiveInput() {
        const container = document.getElementById('objectives-container');
        const objectiveItem = document.createElement('div');
        objectiveItem.className = 'objective-item';
        objectiveItem.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px;';
        objectiveItem.innerHTML = `
            <input type="text" placeholder="Students will be able to..." style="flex: 1; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px;">
            <button type="button" onclick="this.parentElement.remove()" style="background: #ef4444; color: white; border: none; border-radius: 8px; padding: 10px 15px; cursor: pointer;">Remove</button>
        `;
        container.appendChild(objectiveItem);
    }

    selectStructure(structureName) {
        // Highlight selected structure
        document.querySelectorAll('.structure-option').forEach(option => {
            if (option.dataset.structure === structureName) {
                option.style.borderColor = '#7c3aed';
                option.style.background = '#f3f4f6';
            } else {
                option.style.borderColor = '#e5e7eb';
                option.style.background = 'white';
            }
        });

        // Show structure details
        const detailsContainer = document.getElementById('structure-details');
        const phasesContainer = document.getElementById('phases-container');
        
        const phases = this.templates.structures[structureName];
        phasesContainer.innerHTML = phases.map((phase, index) => `
            <div style="border: 1px solid #d1d5db; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 10px 0; color: #7c3aed;">${index + 1}. ${phase}</h4>
                <textarea placeholder="Describe what happens in this phase..." style="width: 100%; height: 80px; padding: 8px; border: 1px solid #d1d5db; border-radius: 6px; resize: vertical;"></textarea>
                <div style="margin-top: 10px;">
                    <label style="display: block; font-size: 0.9rem; font-weight: bold; margin-bottom: 5px;">Duration (minutes):</label>
                    <input type="number" value="10" min="1" max="60" style="width: 80px; padding: 5px; border: 1px solid #d1d5db; border-radius: 4px;">
                </div>
            </div>
        `).join('');
        
        detailsContainer.style.display = 'block';
    }

    selectWhakataukī(index) {
        // Highlight selected whakataukī
        document.querySelectorAll('.whakataukī-option').forEach((option, i) => {
            if (i === index) {
                option.style.borderColor = '#2E8B57';
                option.style.background = '#f0f8f4';
            } else {
                option.style.borderColor = '#d1d5db';
                option.style.background = 'white';
            }
        });

        this.currentLesson.whakataukī = this.culturalResources.whakataukī[index];
    }

    updatePreview() {
        const preview = document.getElementById('lesson-preview');
        if (!preview) return;

        const title = document.getElementById('lesson-title')?.value || 'Untitled Lesson';
        const subject = document.getElementById('lesson-subject')?.value || 'Not selected';
        const year = document.getElementById('lesson-year')?.value || 'Not selected';
        const duration = document.getElementById('lesson-duration')?.value || '50 minutes';

        preview.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
                <h1 style="color: #7c3aed; margin: 0; font-size: 2rem;">${title}</h1>
                <div style="margin: 10px 0; color: #6b7280;">
                    <strong>Subject:</strong> ${subject} | <strong>Year Level:</strong> ${year} | <strong>Duration:</strong> ${duration}
                </div>
            </div>
            
            ${this.currentLesson.whakataukī ? `
                <div style="background: linear-gradient(135deg, #f0f8f4, #e8f5e8); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #2E8B57;">
                    <h3 style="color: #2E8B57; margin: 0 0 10px 0;">🌿 Whakataukī</h3>
                    <div style="font-weight: bold; color: #2E8B57; margin-bottom: 5px;">${this.currentLesson.whakataukī.māori}</div>
                    <div style="font-style: italic; color: #374151;">"${this.currentLesson.whakataukī.english}"</div>
                </div>
            ` : ''}
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: #374151;">Learning Objectives</h3>
                <ul style="color: #6b7280;">
                    ${Array.from(document.querySelectorAll('#objectives-container input'))
                        .map(input => input.value ? `<li>${input.value}</li>` : '')
                        .filter(Boolean)
                        .join('') || '<li>No objectives added yet</li>'}
                </ul>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-style: italic;">
                Complete more tabs to see full lesson preview...
            </div>
        `;
    }

    exportHTML() {
        const lessonHTML = this.generateLessonHTML();
        const blob = new Blob([lessonHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentLesson.title || 'lesson'}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportPDF() {
        // In a real implementation, you'd use a library like jsPDF
        alert('PDF export would be implemented with a PDF generation library');
    }

    exportDocx() {
        // In a real implementation, you'd use a library like docx
        alert('Word document export would be implemented with a DOCX generation library');
    }

    generateLessonHTML() {
        const title = document.getElementById('lesson-title')?.value || 'Untitled Lesson';
        
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} | Te Kete Ako</title>
            <link rel="stylesheet" href="../css/main.css">
        </head>
        <body>
            <div class="lesson-plan-container">
                ${this.updatePreview()}
            </div>
        </body>
        </html>`;
    }

    bindEvents() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + L to open lesson builder
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                this.openBuilder();
            }
        });
    }
}

// Initialize Lesson Builder when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LessonBuilder());
} else {
    new LessonBuilder();
}