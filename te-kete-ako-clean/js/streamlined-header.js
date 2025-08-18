/**
 * ================================================================
 * STREAMLINED HEADER SYSTEM - Clean Professional Navigation
 * ================================================================
 * 
 * PURPOSE: Simplifies the header to focus on core teaching workflow
 * without overwhelming users with too many navigation options.
 * 
 * DESIGN PRINCIPLES:
 * - Keep to essential 4-5 main navigation items
 * - Group related items into logical dropdowns
 * - Maintain beautiful design while reducing cognitive load
 * - Focus on Unit Plans → Lesson Plans → Resources workflow
 * 
 * STREAMLINED NAVIGATION:
 * 1. Unit Plans (main strategic content)
 * 2. Lesson Plans (detailed teaching instances) 
 * 3. Resources (handouts, activities, games grouped together)
 * 4. My Kete (personal collections)
 * 5. Login/Profile (authentication)
 * 
 * ================================================================
 */

class StreamlinedHeader {
    constructor() {
        this.init();
    }

    init() {
        this.streamlineExistingHeader();
        this.addCleanDropdowns();
        this.setupSimpleInteractions();
    }

    streamlineExistingHeader() {
        const headers = document.querySelectorAll('.site-header .main-nav ul');
        
        headers.forEach(navList => {
            // Clear existing navigation
            navList.innerHTML = '';
            
            // Add streamlined navigation structure
            navList.innerHTML = `
                <li class="nav-item-main">
                    <a href="unit-plans.html" class="nav-link-main">
                        <span class="nav-icon">📚</span>
                        <span class="nav-text">Unit Plans</span>
                    </a>
                    <div class="clean-dropdown" id="units-dropdown">
                        <div class="dropdown-header">
                            <h4>Complete Teaching Units</h4>
                            <p>Strategic 6-8 week teaching sequences</p>
                        </div>
                        <div class="dropdown-content">
                            <a href="units/unit-1-te-ao-maori.html" class="dropdown-item featured">
                                <span class="item-icon">🌟</span>
                                <div class="item-content">
                                    <div class="item-title">Te Ao Māori Foundation</div>
                                    <div class="item-description">Cultural identity & knowledge systems</div>
                                </div>
                            </a>
                            <a href="y8-systems-unit.html" class="dropdown-item">
                                <span class="item-icon">🏛️</span>
                                <div class="item-content">
                                    <div class="item-title">Systems & Government (Y8)</div>
                                    <div class="item-description">Civic participation & democracy</div>
                                </div>
                            </a>
                            <a href="units/unit-6-future-rangatiratanga.html" class="dropdown-item">
                                <span class="item-icon">🚀</span>
                                <div class="item-content">
                                    <div class="item-title">Future Rangatiratanga</div>
                                    <div class="item-description">Student-led change projects</div>
                                </div>
                            </a>
                        </div>
                        <div class="dropdown-footer">
                            <a href="unit-plans.html" class="view-all-link">View All Unit Plans →</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item-main">
                    <a href="lessons.html" class="nav-link-main">
                        <span class="nav-icon">📖</span>
                        <span class="nav-text">Lesson Plans</span>
                    </a>
                    <div class="clean-dropdown" id="lessons-dropdown">
                        <div class="dropdown-header">
                            <h4>75-Minute Teaching Instances</h4>
                            <p>Ready-to-teach lesson plans with resources</p>
                        </div>
                        <div class="dropdown-content">
                            <a href="units/lessons/unit-1-lesson-1.html" class="dropdown-item">
                                <span class="item-icon">🌟</span>
                                <div class="item-content">
                                    <div class="item-title">Ko Wai Au? - Identity</div>
                                    <div class="item-description">Personal whakapapa exploration</div>
                                </div>
                            </a>
                            <a href="units/lessons/unit-1-lesson-3.html" class="dropdown-item">
                                <span class="item-icon">💪</span>
                                <div class="item-content">
                                    <div class="item-title">Haka & Cultural Expression</div>
                                    <div class="item-description">Voice, power & collective identity</div>
                                </div>
                            </a>
                            <a href="lesson-plans/lessons.html" class="dropdown-item">
                                <span class="item-icon">📝</span>
                                <div class="item-content">
                                    <div class="item-title">Critical Literacy Unit</div>
                                    <div class="item-description">10-lesson writing & analysis sequence</div>
                                </div>
                            </a>
                        </div>
                        <div class="dropdown-footer">
                            <a href="lessons.html" class="view-all-link">Browse All Lessons →</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item-main">
                    <a href="handouts.html" class="nav-link-main">
                        <span class="nav-icon">📋</span>
                        <span class="nav-text">Resources</span>
                    </a>
                    <div class="clean-dropdown" id="resources-dropdown">
                        <div class="dropdown-header">
                            <h4>Teaching Resources</h4>
                            <p>Handouts, activities, games & tools</p>
                        </div>
                        <div class="dropdown-content">
                            <div class="dropdown-section">
                                <h5>📄 Student Handouts</h5>
                                <a href="handouts/haka-comprehension-handout.html" class="dropdown-item compact">Haka Analysis</a>
                                <a href="handouts/treaty-of-waitangi-handout.html" class="dropdown-item compact">Treaty of Waitangi</a>
                                <a href="handouts/writers-toolkit-peel-argument-handout.html" class="dropdown-item compact">PEEL Method</a>
                            </div>
                            <div class="dropdown-section">
                                <h5>⚡ Quick Activities</h5>
                                <a href="activities.html" class="dropdown-item compact">Do Now Generator</a>
                                <a href="games/te-reo-wordle.html" class="dropdown-item compact">Te Reo Wordle</a>
                                <a href="games.html" class="dropdown-item compact">Educational Games</a>
                            </div>
                        </div>
                        <div class="dropdown-footer">
                            <a href="handouts.html" class="view-all-link">All Resources →</a>
                        </div>
                    </div>
                </li>

                <li class="nav-item-auth my-kete-link" style="display: none;">
                    <a href="my-kete.html" class="nav-link-main">
                        <span class="nav-icon">🧺</span>
                        <span class="nav-text">My Kete</span>
                    </a>
                </li>

                <li class="nav-item-auth login-link">
                    <a href="login.html" class="nav-link-auth login-btn">
                        <span class="nav-icon">🔐</span>
                        <span class="nav-text">Login</span>
                    </a>
                </li>

                <li class="nav-item-auth register-link">
                    <a href="register-simple.html" class="nav-link-auth register-btn">
                        <span class="nav-icon">📝</span>
                        <span class="nav-text">Join</span>
                    </a>
                </li>
            `;
        });
    }

    addCleanDropdowns() {
        // Add styles for clean dropdown design
        const style = document.createElement('style');
        style.textContent = `
            /* Streamlined Navigation Styles */
            .main-nav ul {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            
            .nav-item-main {
                position: relative;
            }
            
            .nav-link-main {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: white;
                text-decoration: none;
                padding: 0.75rem 1rem;
                border-radius: 10px;
                font-weight: 500;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
            }
            
            .nav-link-main:hover {
                background: rgba(255,255,255,0.2);
                text-decoration: none;
                color: white;
                transform: translateY(-2px);
            }
            
            .nav-link-auth {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: rgba(255,255,255,0.9);
                text-decoration: none;
                padding: 0.5rem 0.75rem;
                border-radius: 8px;
                font-weight: 500;
                font-size: 0.85rem;
                transition: all 0.3s ease;
            }
            
            .nav-link-auth:hover {
                color: white;
                text-decoration: none;
                background: rgba(255,255,255,0.15);
            }
            
            .nav-icon {
                font-size: 1rem;
                flex-shrink: 0;
            }
            
            /* Clean Dropdown Styles */
            .clean-dropdown {
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                border-radius: 16px;
                box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                border: 1px solid var(--color-border);
                z-index: 1000;
                min-width: 400px;
                max-width: 500px;
                display: none;
                margin-top: 0.5rem;
            }
            
            .dropdown-header {
                padding: 1.5rem 1.5rem 1rem;
                border-bottom: 1px solid var(--color-border);
                text-align: center;
            }
            
            .dropdown-header h4 {
                margin: 0 0 0.5rem 0;
                color: var(--color-primary);
                font-size: 1.1rem;
                font-weight: 600;
            }
            
            .dropdown-header p {
                margin: 0;
                color: var(--color-text-secondary);
                font-size: 0.85rem;
            }
            
            .dropdown-content {
                padding: 1rem 1.5rem;
            }
            
            .dropdown-item {
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
            
            .dropdown-item:hover {
                background: var(--color-surface);
                border-color: var(--color-secondary);
                text-decoration: none;
                color: var(--color-text-primary);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .dropdown-item.featured {
                background: linear-gradient(135deg, var(--color-cultural-light) 0%, #e8f4f8 100%);
                border-color: var(--color-secondary);
            }
            
            .dropdown-item.compact {
                padding: 0.5rem 0.75rem;
                font-size: 0.85rem;
                margin-bottom: 0.5rem;
                border: none;
                background: var(--color-surface);
            }
            
            .item-icon {
                font-size: 1.3rem;
                flex-shrink: 0;
            }
            
            .item-content {
                flex: 1;
            }
            
            .item-title {
                font-weight: 500;
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
            }
            
            .item-description {
                font-size: 0.8rem;
                color: var(--color-text-secondary);
                line-height: 1.3;
            }
            
            .dropdown-section {
                margin-bottom: 1.5rem;
            }
            
            .dropdown-section h5 {
                margin: 0 0 0.75rem 0;
                font-size: 0.8rem;
                color: var(--color-secondary);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .dropdown-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid var(--color-border);
                text-align: center;
            }
            
            .view-all-link {
                color: var(--color-secondary);
                text-decoration: none;
                font-weight: 500;
                font-size: 0.9rem;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .view-all-link:hover {
                background: var(--color-cultural-light);
                text-decoration: none;
                color: var(--color-primary);
            }
            
            /* Show dropdown on hover */
            .nav-item-main:hover .clean-dropdown {
                display: block;
                animation: fadeInDown 0.3s ease-out;
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .main-nav ul {
                    gap: 0.25rem;
                }
                
                .nav-link-main {
                    padding: 0.6rem 0.8rem;
                    font-size: 0.8rem;
                }
                
                .nav-text {
                    display: none;
                }
                
                .clean-dropdown {
                    min-width: 320px;
                    left: 0;
                    transform: none;
                }
                
                .dropdown-header {
                    padding: 1rem;
                }
                
                .dropdown-content {
                    padding: 0.75rem 1rem;
                }
            }
            
            @media (max-width: 480px) {
                .nav-item-auth.register-link {
                    display: none;
                }
                
                .clean-dropdown {
                    min-width: 280px;
                    max-width: 90vw;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupSimpleInteractions() {
        // Simple hover interactions for dropdowns
        document.querySelectorAll('.nav-item-main').forEach(item => {
            const dropdown = item.querySelector('.clean-dropdown');
            if (!dropdown) return;

            let timeout;
            
            item.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                dropdown.style.display = 'block';
            });
            
            item.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 200);
            });
            
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                timeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 200);
            });
        });

        // Check authentication status for nav items
        const checkAuthStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const isLoggedIn = !!user;
            const myKeteLink = document.querySelector('.my-kete-link');
            const loginLink = document.querySelector('.login-link');
            const registerLink = document.querySelector('.register-link');
            
            if (isLoggedIn) {
                if (myKeteLink) myKeteLink.style.display = 'block';
                if (loginLink) loginLink.style.display = 'none';
                if (registerLink) registerLink.style.display = 'none';
            } else {
                if (myKeteLink) myKeteLink.style.display = 'none';
                if (loginLink) loginLink.style.display = 'block';
                if (registerLink) registerLink.style.display = 'block';
            }
        };
        
        checkAuthStatus();
    }
}

// Auto-initialize streamlined header - DISABLED 
// Navigation now handled by static HTML for better consistency
document.addEventListener('DOMContentLoaded', () => {
    // DISABLED: This was overriding the standardized navigation
    // const existingNav = document.querySelector('.nav-link-main');
    // if (!existingNav) {
    //     window.streamlinedHeader = new StreamlinedHeader();
    // }
    console.log('Streamlined header initialization disabled - using static navigation');
});

// Make available globally
window.StreamlinedHeader = StreamlinedHeader;