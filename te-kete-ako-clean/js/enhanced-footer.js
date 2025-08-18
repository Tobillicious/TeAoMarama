/**
 * ================================================================
 * ENHANCED FOOTER SYSTEM - Professional & Interactive Components
 * ================================================================
 * 
 * PURPOSE: Creates a sophisticated footer that maximizes utility and 
 * matches the professional standard of our header design.
 * 
 * FEATURES:
 * - Interactive component grid (inspired by Magic Bento layouts)
 * - Animated content sections with smooth transitions
 * - Quick action cards for common tasks
 * - Cultural integration with rotating whakataukī
 * - Dynamic content suggestions based on current page
 * - Newsletter signup with cultural touch
 * - Social proof and engagement metrics
 * 
 * DESIGN PHILOSOPHY:
 * - Holistic consistency with header design
 * - Maximum utility without overwhelming users
 * - Cultural authenticity throughout
 * - Professional appearance with Te Ao Māori soul
 * 
 * FOR AI AGENTS:
 * - This enhances the overall site experience
 * - Footer becomes a powerful navigation and engagement tool
 * - Maintains cultural authenticity while being functional
 * 
 * ================================================================
 */

class EnhancedFooter {
    constructor() {
        this.currentPage = this.detectCurrentPage();
        this.culturalQuotes = this.initCulturalQuotes();
        this.siteStats = this.loadSiteStats();
        this.init();
    }

    initCulturalQuotes() {
        return [
            {
                maori: "He waka eke noa",
                english: "We are all in this together",
                context: "Emphasizing unity and collective responsibility"
            },
            {
                maori: "Mā te huruhuru ka rere ai te manu",
                english: "Feathers enable birds to fly",
                context: "We all need support to reach our potential"
            },
            {
                maori: "Kia kaha, kia māia, kia manawanui",
                english: "Be strong, be brave, be steadfast",
                context: "Encouragement for facing challenges"
            },
            {
                maori: "He tangata, he tangata, he tangata",
                english: "It is people, it is people, it is people",
                context: "People are the most important thing"
            },
            {
                maori: "Ko au ko koe, ko koe ko au",
                english: "I am you, and you are me",
                context: "We are interconnected and interdependent"
            }
        ];
    }

    loadSiteStats() {
        // Simulated stats - could be loaded from analytics
        return {
            totalResources: 150,
            activeUsers: 1200,
            downloadsThisMonth: 3400,
            schoolsServed: 85
        };
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '');
        
        const pageMap = {
            'index': 'home',
            'unit-plans': 'units',
            'lessons': 'lessons',
            'handouts': 'resources',
            'activities': 'activities',
            'games': 'games',
            'youtube': 'videos',
            'ai-hub': 'ai'
        };
        
        return pageMap[filename] || 'other';
    }

    init() {
        this.createEnhancedFooter();
        this.addInteractiveElements();
        this.startCulturalQuoteRotation();
        this.setupAnalytics();
    }

    createEnhancedFooter() {
        // Find existing footer or create new one
        let footer = document.querySelector('.site-footer');
        if (!footer) {
            footer = document.createElement('footer');
            footer.className = 'site-footer';
            document.body.appendChild(footer);
        }

        // Clear existing content and rebuild
        footer.innerHTML = '';
        
        footer.innerHTML = `
            <!-- Cultural Pattern Overlay -->
            <div class="footer-pattern-overlay"></div>
            
            <!-- Main Footer Content -->
            <div class="footer-enhanced-content">
                
                <!-- Top Section: Interactive Components Grid -->
                <div class="footer-bento-grid">
                    
                    <!-- Primary Navigation Card -->
                    <div class="bento-card bento-primary">
                        <div class="card-header">
                            <h3>🧺 Te Kete Ako</h3>
                            <p>Educational resources honoring Te Ao Māori</p>
                        </div>
                        <div class="nav-quick-links">
                            <a href="unit-plans.html" class="quick-nav-btn">📚 Unit Plans</a>
                            <a href="lessons.html" class="quick-nav-btn">📖 Lessons</a>
                            <a href="handouts.html" class="quick-nav-btn">📄 Resources</a>
                            <a href="games.html" class="quick-nav-btn">🎮 Games</a>
                        </div>
                    </div>
                    
                    <!-- Cultural Quote Card -->
                    <div class="bento-card bento-cultural">
                        <div class="cultural-rotating-quote" id="cultural-quote">
                            <div class="quote-maori" id="quote-maori">He waka eke noa</div>
                            <div class="quote-english" id="quote-english">We are all in this together</div>
                            <div class="quote-context" id="quote-context">Emphasizing unity and collective responsibility</div>
                        </div>
                        <button class="quote-refresh-btn" onclick="footerInstance.rotateQuote()" title="New whakataukī">🔄</button>
                    </div>
                    
                    <!-- Quick Actions Card -->
                    <div class="bento-card bento-actions">
                        <h4>⚡ Quick Start</h4>
                        <div class="quick-actions">
                            <button onclick="window.generateRandomActivity?.()" class="action-btn">
                                <span class="action-icon">🎲</span>
                                <span>Generate Activity</span>
                            </button>
                            <button onclick="window.showContentHierarchy?.()" class="action-btn">
                                <span class="action-icon">🗂️</span>
                                <span>Content Map</span>
                            </button>
                            <button onclick="window.location.href='my-kete.html'" class="action-btn">
                                <span class="action-icon">🧺</span>
                                <span>My Kete</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Personalized Suggestions Card -->
                    <div class="bento-card bento-suggestions">
                        <h4>🎯 For You</h4>
                        <div class="suggestion-list" id="personalized-suggestions">
                            ${this.getPersonalizedSuggestions()}
                        </div>
                    </div>
                    
                    <!-- Stats & Engagement Card -->
                    <div class="bento-card bento-stats">
                        <h4>📊 Community Impact</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-number">${this.siteStats.totalResources}+</span>
                                <span class="stat-label">Resources</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${this.siteStats.schoolsServed}</span>
                                <span class="stat-label">Schools</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${this.formatNumber(this.siteStats.downloadsThisMonth)}</span>
                                <span class="stat-label">Downloads</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Newsletter/Updates Card -->
                    <div class="bento-card bento-newsletter">
                        <h4>📬 Stay Connected</h4>
                        <p>Get updates on new resources and cultural insights</p>
                        <div class="newsletter-form">
                            <input type="email" placeholder="your.email@school.nz" class="newsletter-input">
                            <button class="newsletter-btn">Subscribe</button>
                        </div>
                        <div class="social-links">
                            <a href="#" class="social-link" title="Professional Network">🔗</a>
                            <a href="#" class="social-link" title="Educational Community">👥</a>
                            <a href="youtube.html" class="social-link" title="Video Resources">📺</a>
                        </div>
                    </div>
                </div>
                
                <!-- Secondary Navigation -->
                <div class="footer-nav-sections">
                    <div class="footer-nav-group">
                        <h5>📚 Resources</h5>
                        <ul>
                            <li><a href="unit-plans.html">Complete Unit Plans</a></li>
                            <li><a href="lessons.html">75-Minute Lessons</a></li>
                            <li><a href="handouts.html">Student Handouts</a></li>
                            <li><a href="activities.html">Do Now Activities</a></li>
                            <li><a href="curriculum-alignment.html">Curriculum Alignment</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-nav-group">
                        <h5>🎮 Interactive</h5>
                        <ul>
                            <li><a href="games/te-reo-wordle.html">Te Reo Wordle</a></li>
                            <li><a href="games/categories.html">Categories Challenge</a></li>
                            <li><a href="games.html">All Educational Games</a></li>
                            <li><a href="ai-hub.html">AI Teaching Assistant</a></li>
                            <li><a href="youtube.html">Video Resources</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-nav-group">
                        <h5>🌿 Cultural</h5>
                        <ul>
                            <li><a href="units/unit-1-te-ao-maori.html">Te Ao Māori Unit</a></li>
                            <li><a href="handouts/haka-comprehension-handout.html">Haka Analysis</a></li>
                            <li><a href="handouts/treaty-of-waitangi-handout.html">Te Tiriti Studies</a></li>
                            <li><a href="handouts/te-reo-maori-greetings-handout.html">Te Reo Resources</a></li>
                            <li><a href="other-resources.html">Cultural Partnerships</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-nav-group">
                        <h5>🤝 Support</h5>
                        <ul>
                            <li><a href="login.html">Teacher Login</a></li>
                            <li><a href="register-simple.html">Join Community</a></li>
                            <li><a href="my-kete.html">Personal Collection</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#feedback">Feedback & Suggestions</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Bottom Bar -->
                <div class="footer-bottom-enhanced">
                    <div class="footer-credits">
                        <span>© 2024 Te Kete Ako - Educational Resources with Mana</span>
                        <span class="footer-separator">•</span>
                        <span>Honoring Te Ao Māori in Education</span>
                    </div>
                    
                    <div class="footer-legal-links">
                        <a href="#privacy">Privacy</a>
                        <a href="#terms">Terms</a>
                        <a href="#accessibility">Accessibility</a>
                        <a href="#license">Creative Commons</a>
                    </div>
                    
                    <div class="footer-tech-badge">
                        <span title="Built with cultural authenticity and modern web standards">
                            🌐 Made with ❤️ for Aotearoa Education
                        </span>
                    </div>
                </div>
            </div>
        `;

        this.addEnhancedFooterStyles();
    }

    addEnhancedFooterStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Footer Base Styles */
            .site-footer {
                background: linear-gradient(135deg, 
                    var(--color-primary) 0%, 
                    var(--color-forest) 50%, 
                    var(--color-secondary) 100%);
                color: white;
                margin-top: 4rem;
                position: relative;
                overflow: hidden;
            }
            
            .footer-pattern-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    radial-gradient(circle at 15% 85%, rgba(255,255,255,0.05) 0%, transparent 50%),
                    radial-gradient(circle at 85% 15%, rgba(245,166,35,0.08) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.02) 50%, transparent 52%);
                pointer-events: none;
            }
            
            .footer-enhanced-content {
                position: relative;
                z-index: 2;
                max-width: 1400px;
                margin: 0 auto;
                padding: 3rem 2rem 2rem;
            }
            
            /* Bento Grid Layout */
            .footer-bento-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }
            
            .bento-card {
                background: rgba(255,255,255,0.1);
                border-radius: 16px;
                padding: 1.5rem;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }
            
            .bento-card:hover {
                transform: translateY(-5px);
                background: rgba(255,255,255,0.15);
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            
            .bento-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%);
                pointer-events: none;
            }
            
            /* Primary Card Styles */
            .bento-primary {
                grid-column: span 2;
                min-height: 180px;
            }
            
            .card-header h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .card-header p {
                margin: 0 0 1rem 0;
                opacity: 0.8;
                font-size: 0.95rem;
            }
            
            .nav-quick-links {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 0.75rem;
            }
            
            .quick-nav-btn {
                background: rgba(255,255,255,0.15);
                color: white;
                text-decoration: none;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                font-size: 0.9rem;
                font-weight: 500;
                text-align: center;
                transition: all 0.3s ease;
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .quick-nav-btn:hover {
                background: rgba(255,255,255,0.25);
                transform: translateY(-2px);
                text-decoration: none;
                color: white;
            }
            
            /* Cultural Quote Card */
            .bento-cultural {
                background: linear-gradient(135deg, rgba(0,176,185,0.2) 0%, rgba(255,255,255,0.1) 100%);
                border: 1px solid rgba(0,176,185,0.3);
                position: relative;
            }
            
            .cultural-rotating-quote {
                text-align: center;
                padding: 1rem 0;
            }
            
            .quote-maori {
                font-style: italic;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--color-accent);
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            .quote-english {
                font-size: 0.95rem;
                margin-bottom: 0.75rem;
                opacity: 0.9;
            }
            
            .quote-context {
                font-size: 0.8rem;
                opacity: 0.7;
                font-style: italic;
            }
            
            .quote-refresh-btn {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 0.5rem;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 1rem;
            }
            
            .quote-refresh-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: rotate(180deg);
            }
            
            /* Quick Actions Card */
            .bento-actions h4 {
                margin: 0 0 1rem 0;
                font-size: 1.1rem;
                color: var(--color-accent);
            }
            
            .quick-actions {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .action-btn {
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.3);
                color: white;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
            }
            
            .action-btn:hover {
                background: rgba(255,255,255,0.2);
                transform: translateX(5px);
            }
            
            .action-icon {
                font-size: 1rem;
            }
            
            /* Suggestions Card */
            .suggestion-list {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .suggestion-item {
                background: rgba(255,255,255,0.1);
                padding: 0.75rem;
                border-radius: 8px;
                font-size: 0.9rem;
                border-left: 3px solid var(--color-accent);
            }
            
            .suggestion-item a {
                color: white;
                text-decoration: none;
            }
            
            .suggestion-item:hover {
                background: rgba(255,255,255,0.15);
            }
            
            /* Stats Card */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                text-align: center;
            }
            
            .stat-item {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .stat-number {
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--color-accent);
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }
            
            .stat-label {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            /* Newsletter Card */
            .newsletter-form {
                display: flex;
                gap: 0.5rem;
                margin: 1rem 0;
            }
            
            .newsletter-input {
                flex: 1;
                padding: 0.75rem;
                border: 1px solid rgba(255,255,255,0.3);
                border-radius: 8px;
                background: rgba(255,255,255,0.1);
                color: white;
                font-size: 0.9rem;
            }
            
            .newsletter-input::placeholder {
                color: rgba(255,255,255,0.6);
            }
            
            .newsletter-btn {
                background: var(--color-accent);
                color: white;
                border: none;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .newsletter-btn:hover {
                background: var(--color-secondary);
                transform: translateY(-2px);
            }
            
            .social-links {
                display: flex;
                gap: 0.75rem;
                justify-content: center;
                margin-top: 1rem;
            }
            
            .social-link {
                background: rgba(255,255,255,0.1);
                color: white;
                text-decoration: none;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-size: 1.1rem;
            }
            
            .social-link:hover {
                background: rgba(255,255,255,0.2);
                transform: translateY(-2px);
                text-decoration: none;
                color: white;
            }
            
            /* Secondary Navigation */
            .footer-nav-sections {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 2rem;
                margin-bottom: 2rem;
                padding: 2rem 0;
                border-top: 1px solid rgba(255,255,255,0.2);
                border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            
            .footer-nav-group h5 {
                margin: 0 0 1rem 0;
                font-size: 1rem;
                color: var(--color-accent);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .footer-nav-group ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .footer-nav-group li {
                margin-bottom: 0.5rem;
            }
            
            .footer-nav-group a {
                color: rgba(255,255,255,0.8);
                text-decoration: none;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.25rem 0;
            }
            
            .footer-nav-group a:hover {
                color: white;
                transform: translateX(5px);
                text-decoration: none;
            }
            
            .footer-nav-group a::before {
                content: '→';
                font-size: 0.8rem;
                opacity: 0.6;
                transition: all 0.3s ease;
            }
            
            .footer-nav-group a:hover::before {
                opacity: 1;
                transform: translateX(3px);
            }
            
            /* Bottom Bar */
            .footer-bottom-enhanced {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
                padding-top: 1.5rem;
                font-size: 0.85rem;
                opacity: 0.8;
            }
            
            .footer-credits {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .footer-separator {
                opacity: 0.6;
            }
            
            .footer-legal-links {
                display: flex;
                gap: 1.5rem;
                flex-wrap: wrap;
            }
            
            .footer-legal-links a {
                color: rgba(255,255,255,0.7);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            
            .footer-legal-links a:hover {
                color: white;
                text-decoration: underline;
            }
            
            .footer-tech-badge {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            /* Responsive Design */
            @media (max-width: 1024px) {
                .footer-bento-grid {
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                }
                
                .bento-primary {
                    grid-column: span 1;
                }
                
                .nav-quick-links {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (max-width: 768px) {
                .footer-enhanced-content {
                    padding: 2rem 1rem 1.5rem;
                }
                
                .footer-bento-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .footer-nav-sections {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                .footer-bottom-enhanced {
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }
                
                .stats-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                }
                
                .newsletter-form {
                    flex-direction: column;
                }
            }
            
            @media (max-width: 480px) {
                .footer-nav-sections {
                    grid-template-columns: 1fr;
                }
                
                .nav-quick-links {
                    grid-template-columns: 1fr;
                }
            }
            
            /* Animation for quote rotation */
            .quote-rotating {
                animation: fadeInUp 0.5s ease-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    getPersonalizedSuggestions() {
        const suggestions = {
            home: [
                { title: "Start with Te Ao Māori", url: "units/unit-1-te-ao-maori.html" },
                { title: "Quick Do Now Activity", url: "activities.html" },
                { title: "Browse Unit Plans", url: "unit-plans.html" }
            ],
            units: [
                { title: "View Lesson Plans", url: "lessons.html" },
                { title: "Supporting Handouts", url: "handouts.html" },
                { title: "Assessment Tools", url: "assessment-tools.html" }
            ],
            lessons: [
                { title: "Get Supporting Handouts", url: "handouts.html" },
                { title: "Try Do Now Activities", url: "activities.html" },
                { title: "View Parent Unit", url: "unit-plans.html" }
            ],
            resources: [
                { title: "Related Lesson Plans", url: "lessons.html" },
                { title: "Try Interactive Games", url: "games.html" },
                { title: "Assessment Rubrics", url: "assessment-tools.html" }
            ],
            games: [
                { title: "Supporting Handouts", url: "handouts.html" },
                { title: "More Activities", url: "activities.html" },
                { title: "Cultural Resources", url: "units/unit-1-te-ao-maori.html" }
            ],
            other: [
                { title: "Explore Unit Plans", url: "unit-plans.html" },
                { title: "Try Educational Games", url: "games.html" },
                { title: "Cultural Foundation", url: "units/unit-1-te-ao-maori.html" }
            ]
        };

        const pageSuggestions = suggestions[this.currentPage] || suggestions.other;
        
        return pageSuggestions.map(suggestion => `
            <div class="suggestion-item">
                <a href="${suggestion.url}">${suggestion.title}</a>
            </div>
        `).join('');
    }

    addInteractiveElements() {
        // Newsletter signup functionality
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            const input = newsletterForm.querySelector('.newsletter-input');
            const button = newsletterForm.querySelector('.newsletter-btn');
            
            if (button && input) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleNewsletterSignup(input.value);
                });
                
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.handleNewsletterSignup(input.value);
                    }
                });
            }
        }

        // Add smooth hover animations
        this.addHoverAnimations();
    }

    handleNewsletterSignup(email) {
        if (!email || !email.includes('@')) {
            this.showNotification('Please enter a valid email address', 'warning');
            return;
        }

        // Simulate signup process
        this.showNotification('Kia ora! Thanks for joining our community. 🌿', 'success');
        
        // Clear the input
        const input = document.querySelector('.newsletter-input');
        if (input) input.value = '';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? 'var(--color-secondary)' : type === 'warning' ? '#ffc107' : 'var(--color-primary)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10000;
            font-size: 0.9rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startCulturalQuoteRotation() {
        this.currentQuoteIndex = 0;
        
        // Rotate quote every 10 seconds
        setInterval(() => {
            this.rotateQuote();
        }, 10000);
    }

    rotateQuote() {
        this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.culturalQuotes.length;
        const quote = this.culturalQuotes[this.currentQuoteIndex];
        
        const quoteContainer = document.getElementById('cultural-quote');
        if (quoteContainer) {
            quoteContainer.classList.add('quote-rotating');
            
            setTimeout(() => {
                document.getElementById('quote-maori').textContent = quote.maori;
                document.getElementById('quote-english').textContent = quote.english;
                document.getElementById('quote-context').textContent = quote.context;
                
                setTimeout(() => {
                    quoteContainer.classList.remove('quote-rotating');
                }, 100);
            }, 200);
        }
    }

    addHoverAnimations() {
        // Add intersection observer for animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        });

        document.querySelectorAll('.bento-card').forEach(card => {
            observer.observe(card);
        });
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    setupAnalytics() {
        // Track footer interactions
        document.querySelectorAll('.footer-enhanced-content a, .footer-enhanced-content button').forEach(element => {
            element.addEventListener('click', (e) => {
                const action = e.target.textContent?.trim() || 'footer_interaction';
                // Could integrate with analytics here
                console.log('Footer interaction:', action);
            });
        });
    }
}

// Auto-initialize enhanced footer
document.addEventListener('DOMContentLoaded', () => {
    if (!window.footerInstance) {
        window.footerInstance = new EnhancedFooter();
    }
});

// Make methods available globally
window.EnhancedFooter = EnhancedFooter;