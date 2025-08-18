// Te Kete Ako - Quick Wins Enhancement System
// Immediate UX improvements that make the platform shine ✨

class TeKeteQuickWins {
    constructor() {
        this.init();
    }

    init() {
        this.addDarkModeToggle();
        this.addPrintAllButton();
        this.addSmartSearch();
        this.addRecentlyViewed();
        this.addProgressIndicators();
        this.addCulturalBadges();
        this.addFavoritesBar();
        this.addSmartNotifications();
        
        console.log('🚀 Te Kete Ako Quick Wins activated!');
    }

    // 🌙 DARK MODE TOGGLE
    addDarkModeToggle() {
        const darkModeCSS = `
            .dark-mode {
                --color-primary: #4ade80;
                --color-secondary: #f59e0b;
                --color-background: #1f2937;
                --color-surface: #374151;
                --color-text: #f9fafb;
                --color-text-secondary: #d1d5db;
            }
            .dark-mode body {
                background-color: var(--color-background);
                color: var(--color-text);
                transition: all 0.3s ease;
            }
            .dark-mode .site-header {
                background: var(--color-surface);
                border-bottom: 1px solid #4b5563;
            }
            .dark-mode .resource-card, .dark-mode .handout-card {
                background: var(--color-surface);
                border-color: #4b5563;
                color: var(--color-text);
            }
            .dark-mode-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--color-primary, #2E8B57);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                font-size: 1.5rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .dark-mode-toggle:hover {
                transform: scale(1.1);
            }
        `;
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = darkModeCSS;
        document.head.appendChild(style);
        
        // Add toggle button
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = localStorage.getItem('darkMode') === 'true' ? '☀️' : '🌙';
        toggle.title = 'Toggle Dark Mode';
        
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            toggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDark);
        });
        
        // Apply saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
        
        document.body.appendChild(toggle);
    }

    // 📄 PRINT ALL BUTTON
    addPrintAllButton() {
        const printAllCSS = `
            .print-all-btn {
                position: fixed;
                bottom: 20px;
                right: 80px;
                background: #dc2626;
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 20px;
                cursor: pointer;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                transition: all 0.3s ease;
                z-index: 999;
            }
            .print-all-btn:hover {
                background: #b91c1c;
                transform: translateY(-2px);
            }
            .print-all-btn:active {
                transform: translateY(0);
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = printAllCSS;
        document.head.appendChild(style);
        
        // Only add on pages with multiple resources
        const resourceCards = document.querySelectorAll('.resource-card, .handout-card, .lesson-card');
        if (resourceCards.length > 1) {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-all-btn';
            printBtn.innerHTML = '🖨️ Print All';
            printBtn.title = 'Print all resources on this page';
            
            printBtn.addEventListener('click', () => {
                // Hide navigation and other non-essential elements
                const hideElements = document.querySelectorAll('.site-header, .site-footer, .print-all-btn, .dark-mode-toggle, .no-print');
                hideElements.forEach(el => el.style.display = 'none');
                
                // Show success message
                const msg = document.createElement('div');
                msg.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #10b981; color: white; padding: 20px; border-radius: 10px; z-index: 9999; font-size: 1.2rem;';
                msg.innerHTML = '📄 Preparing all resources for printing...';
                document.body.appendChild(msg);
                
                setTimeout(() => {
                    window.print();
                    msg.remove();
                    hideElements.forEach(el => el.style.display = '');
                }, 1000);
            });
            
            document.body.appendChild(printBtn);
        }
    }

    // 🔍 SMART SEARCH ENHANCEMENT
    addSmartSearch() {
        const searchInputs = document.querySelectorAll('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
        
        searchInputs.forEach(input => {
            // Add smart autocomplete suggestions
            const suggestions = [
                'Year 8 science experiments',
                'Māori cultural activities',
                'Treaty of Waitangi resources',
                'Mathematics worksheets',
                'Writing frameworks',
                'Art project ideas',
                'STEM activities',
                'Reading comprehension',
                'Assessment rubrics',
                'Te Reo Māori lessons'
            ];
            
            const dropdown = document.createElement('div');
            dropdown.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #d1d5db;
                border-top: none;
                border-radius: 0 0 8px 8px;
                max-height: 200px;
                overflow-y: auto;
                z-index: 1000;
                display: none;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `;
            
            input.parentElement.style.position = 'relative';
            input.parentElement.appendChild(dropdown);
            
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length < 2) {
                    dropdown.style.display = 'none';
                    return;
                }
                
                const matches = suggestions.filter(s => s.toLowerCase().includes(query));
                if (matches.length > 0) {
                    dropdown.innerHTML = matches.map(match => 
                        `<div style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f3f4f6;" 
                              onmouseover="this.style.background='#f9fafb'" 
                              onmouseout="this.style.background='white'"
                              onclick="this.closest('input').value='${match}'; this.parentElement.style.display='none'">
                            ${match}
                        </div>`
                    ).join('');
                    dropdown.style.display = 'block';
                } else {
                    dropdown.style.display = 'none';
                }
            });
            
            // Hide dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
        });
    }

    // 🕒 RECENTLY VIEWED TRACKER
    addRecentlyViewed() {
        // Track page visits
        const currentPage = {
            url: window.location.href,
            title: document.title,
            timestamp: Date.now()
        };
        
        let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        
        // Remove if already exists and add to front
        recentlyViewed = recentlyViewed.filter(item => item.url !== currentPage.url);
        recentlyViewed.unshift(currentPage);
        
        // Keep only last 10
        recentlyViewed = recentlyViewed.slice(0, 10);
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        
        // Add recently viewed section to navigation
        if (recentlyViewed.length > 1) {
            const nav = document.querySelector('.main-nav ul');
            if (nav) {
                const recentItem = document.createElement('li');
                recentItem.innerHTML = `
                    <a href="#" class="recent-dropdown">
                        <span class="nav-icon">🕒</span>
                        <span class="nav-text-en">Recent</span>
                        <span class="nav-text-mi">Mutunga</span>
                    </a>
                    <div class="recent-dropdown-content" style="display: none; position: absolute; background: white; min-width: 300px; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border-radius: 8px; padding: 10px; margin-top: 5px; z-index: 1000;">
                        ${recentlyViewed.slice(1, 6).map(item => 
                            `<a href="${item.url}" style="display: block; padding: 8px; text-decoration: none; color: #374151; border-radius: 4px;" 
                               onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='transparent'">
                                📄 ${item.title.substring(0, 40)}...
                            </a>`
                        ).join('')}
                    </div>
                `;
                
                const dropdown = recentItem.querySelector('.recent-dropdown');
                const content = recentItem.querySelector('.recent-dropdown-content');
                
                dropdown.addEventListener('click', (e) => {
                    e.preventDefault();
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                });
                
                nav.appendChild(recentItem);
            }
        }
    }

    // 📊 PROGRESS INDICATORS
    addProgressIndicators() {
        const resourceCards = document.querySelectorAll('.resource-card, .handout-card');
        
        resourceCards.forEach(card => {
            // Add completion status
            const cardUrl = card.querySelector('a')?.href || card.onclick;
            if (cardUrl) {
                const visited = localStorage.getItem(`visited_${btoa(cardUrl)}`) === 'true';
                
                const progressBadge = document.createElement('div');
                progressBadge.style.cssText = `
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: ${visited ? '#10b981' : '#e5e7eb'};
                    border: 2px solid white;
                    z-index: 10;
                `;
                progressBadge.title = visited ? 'Visited' : 'Not visited yet';
                
                card.style.position = 'relative';
                card.appendChild(progressBadge);
                
                // Mark as visited when clicked
                card.addEventListener('click', () => {
                    localStorage.setItem(`visited_${btoa(cardUrl)}`, 'true');
                    progressBadge.style.background = '#10b981';
                    progressBadge.title = 'Visited';
                });
            }
        });
    }

    // 🌿 CULTURAL CONTENT BADGES
    addCulturalBadges() {
        const culturalKeywords = ['māori', 'maori', 'te reo', 'tikanga', 'whakapapa', 'kaitiakitanga', 'treaty', 'waitangi'];
        
        document.querySelectorAll('.resource-card, .handout-card, h1, h2, h3').forEach(element => {
            const text = element.textContent.toLowerCase();
            const hasCulturalContent = culturalKeywords.some(keyword => text.includes(keyword));
            
            if (hasCulturalContent) {
                const badge = document.createElement('span');
                badge.innerHTML = '🌿';
                badge.style.cssText = `
                    display: inline-block;
                    margin-left: 8px;
                    font-size: 1.2em;
                    filter: drop-shadow(0 0 3px rgba(46, 139, 87, 0.5));
                `;
                badge.title = 'Contains Māori cultural content';
                
                if (element.classList.contains('resource-card') || element.classList.contains('handout-card')) {
                    const title = element.querySelector('h3, h2, .resource-title, .handout-title');
                    if (title) title.appendChild(badge);
                } else {
                    element.appendChild(badge);
                }
            }
        });
    }

    // ⭐ FAVORITES QUICK ACCESS BAR
    addFavoritesBar() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (favorites.length > 0) {
            const favBar = document.createElement('div');
            favBar.style.cssText = `
                position: fixed;
                top: 80px;
                left: 20px;
                background: rgba(46, 139, 87, 0.95);
                color: white;
                padding: 10px;
                border-radius: 25px;
                z-index: 998;
                max-width: 300px;
                backdrop-filter: blur(10px);
            `;
            
            favBar.innerHTML = `
                <div style="font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">⭐ Quick Access</div>
                ${favorites.slice(0, 3).map(fav => 
                    `<a href="${fav.url}" style="display: block; color: white; text-decoration: none; padding: 4px 0; font-size: 0.8rem; opacity: 0.9;">
                        📋 ${fav.title.substring(0, 25)}...
                    </a>`
                ).join('')}
            `;
            
            document.body.appendChild(favBar);
        }
        
        // Add favorite buttons to resource cards
        document.querySelectorAll('.resource-card, .handout-card').forEach(card => {
            const favBtn = document.createElement('button');
            favBtn.innerHTML = '⭐';
            favBtn.style.cssText = `
                position: absolute;
                top: 10px;
                left: 10px;
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.3s ease;
                z-index: 10;
            `;
            
            const cardTitle = card.querySelector('h3, h2, .resource-title')?.textContent || 'Resource';
            const cardUrl = card.querySelector('a')?.href || window.location.href;
            
            const isFavorited = favorites.some(fav => fav.url === cardUrl);
            if (isFavorited) {
                favBtn.style.opacity = '1';
                favBtn.style.color = '#fbbf24';
            }
            
            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                let updatedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const favIndex = updatedFavorites.findIndex(fav => fav.url === cardUrl);
                
                if (favIndex > -1) {
                    updatedFavorites.splice(favIndex, 1);
                    favBtn.style.opacity = '0.6';
                    favBtn.style.color = '';
                } else {
                    updatedFavorites.unshift({ title: cardTitle, url: cardUrl });
                    favBtn.style.opacity = '1';
                    favBtn.style.color = '#fbbf24';
                }
                
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            });
            
            card.style.position = 'relative';
            card.appendChild(favBtn);
        });
    }

    // 🔔 SMART NOTIFICATIONS
    addSmartNotifications() {
        // Show welcome notification for first-time visitors
        if (!localStorage.getItem('hasVisited')) {
            setTimeout(() => {
                this.showNotification('🌟 Kia ora! Welcome to Te Kete Ako - your digital basket of educational resources!', 'success', 5000);
                localStorage.setItem('hasVisited', 'true');
            }, 2000);
        }
        
        // Show tips for power users
        const tipShown = localStorage.getItem('tipShown') || '0';
        const tips = [
            '💡 Tip: Use the dark mode toggle (🌙) in the top-right corner for comfortable evening planning!',
            '💡 Tip: Click ⭐ on any resource to add it to your quick access favorites!',
            '💡 Tip: Your recently viewed resources are available in the Recent menu 🕒',
            '💡 Tip: Look for the 🌿 badge - it marks authentic Māori cultural content!',
        ];
        
        if (parseInt(tipShown) < tips.length && Math.random() > 0.7) {
            setTimeout(() => {
                this.showNotification(tips[parseInt(tipShown)], 'info', 4000);
                localStorage.setItem('tipShown', (parseInt(tipShown) + 1).toString());
            }, 5000);
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type]};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideDown 0.3s ease-out;
        `;
        
        // Add slide animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        notification.innerHTML = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new TeKeteQuickWins());
} else {
    new TeKeteQuickWins();
}