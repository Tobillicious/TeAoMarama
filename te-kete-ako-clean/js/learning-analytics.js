// Te Kete Ako - Learning Analytics Dashboard
// Track engagement, usage patterns, and educational impact

class LearningAnalytics {
    constructor() {
        this.analytics = {
            pageViews: new Map(),
            resourceUsage: new Map(),
            culturalEngagement: new Map(),
            learningPaths: [],
            sessionData: {},
            achievements: new Set()
        };
        this.culturalMetrics = this.initializeCulturalMetrics();
        this.init();
    }

    init() {
        this.loadStoredAnalytics();
        this.startTracking();
        this.createAnalyticsDashboard();
        this.bindEvents();
        console.log('📊 Learning Analytics system activated!');
    }

    initializeCulturalMetrics() {
        return {
            maoriContentViews: 0,
            whakataukiEncounters: 0,
            culturalResourceAccess: 0,
            teReoExposure: 0,
            tikangaLearning: 0
        };
    }

    loadStoredAnalytics() {
        const stored = localStorage.getItem('te-kete-analytics');
        if (stored) {
            const data = JSON.parse(stored);
            this.analytics.pageViews = new Map(data.pageViews || []);
            this.analytics.resourceUsage = new Map(data.resourceUsage || []);
            this.analytics.culturalEngagement = new Map(data.culturalEngagement || []);
            this.analytics.achievements = new Set(data.achievements || []);
            this.culturalMetrics = { ...this.culturalMetrics, ...data.culturalMetrics };
        }
    }

    saveAnalytics() {
        const data = {
            pageViews: Array.from(this.analytics.pageViews.entries()),
            resourceUsage: Array.from(this.analytics.resourceUsage.entries()),
            culturalEngagement: Array.from(this.analytics.culturalEngagement.entries()),
            achievements: Array.from(this.analytics.achievements),
            culturalMetrics: this.culturalMetrics,
            lastUpdated: Date.now()
        };
        localStorage.setItem('te-kete-analytics', JSON.stringify(data));
    }

    startTracking() {
        // Track page views
        this.trackPageView();
        
        // Track resource interactions
        this.trackResourceInteractions();
        
        // Track cultural content engagement
        this.trackCulturalEngagement();
        
        // Track learning patterns
        this.trackLearningPatterns();
        
        // Track achievements
        this.checkAchievements();
        
        // Save analytics periodically
        setInterval(() => this.saveAnalytics(), 30000); // Every 30 seconds
    }

    trackPageView() {
        const pageName = this.getCurrentPageName();
        const currentCount = this.analytics.pageViews.get(pageName) || 0;
        this.analytics.pageViews.set(pageName, currentCount + 1);

        // Track session data
        this.analytics.sessionData = {
            startTime: Date.now(),
            page: pageName,
            referrer: document.referrer,
            userAgent: navigator.userAgent.substring(0, 100)
        };
    }

    getCurrentPageName() {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';
        return fileName.replace('.html', '');
    }

    trackResourceInteractions() {
        // Track clicks on resource cards
        document.addEventListener('click', (e) => {
            const resourceCard = e.target.closest('.resource-card, .handout-card, .lesson-card');
            if (resourceCard) {
                const resourceTitle = resourceCard.querySelector('h3, h2, .resource-title')?.textContent || 'Unknown Resource';
                const currentCount = this.analytics.resourceUsage.get(resourceTitle) || 0;
                this.analytics.resourceUsage.set(resourceTitle, currentCount + 1);
                
                this.trackResourceType(resourceTitle);
            }
        });

        // Track downloads
        document.addEventListener('click', (e) => {
            if (e.target.textContent.includes('Download') || e.target.textContent.includes('Print')) {
                this.recordEvent('resource_download', {
                    type: e.target.textContent.includes('Print') ? 'print' : 'download',
                    timestamp: Date.now()
                });
            }
        });
    }

    trackResourceType(resourceTitle) {
        const title = resourceTitle.toLowerCase();
        if (title.includes('māori') || title.includes('maori') || title.includes('te reo')) {
            this.culturalMetrics.maoriContentViews++;
        }
        if (title.includes('whakataukī') || title.includes('proverb')) {
            this.culturalMetrics.whakataukiEncounters++;
        }
    }

    trackCulturalEngagement() {
        // Look for cultural content badges and track interactions
        const culturalBadges = document.querySelectorAll('[title*="Māori"], [title*="cultural"]');
        culturalBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                this.culturalMetrics.culturalResourceAccess++;
                this.recordEvent('cultural_engagement', {
                    type: 'badge_click',
                    timestamp: Date.now()
                });
            });
        });

        // Track time spent on cultural content
        const culturalElements = document.querySelectorAll('[lang="mi"], .cultural-content, .maori-content');
        if (culturalElements.length > 0) {
            this.culturalMetrics.teReoExposure += culturalElements.length;
        }
    }

    trackLearningPatterns() {
        // Track learning journey through pages
        const learningPath = {
            timestamp: Date.now(),
            page: this.getCurrentPageName(),
            timeSpent: 0,
            interactions: 0
        };

        // Track interactions on page
        let interactionCount = 0;
        const trackInteraction = () => {
            interactionCount++;
            learningPath.interactions = interactionCount;
        };

        document.addEventListener('click', trackInteraction);
        document.addEventListener('scroll', trackInteraction);

        // Track time spent when user leaves page
        window.addEventListener('beforeunload', () => {
            learningPath.timeSpent = Date.now() - learningPath.timestamp;
            this.analytics.learningPaths.push(learningPath);
            
            // Limit stored learning paths to last 50
            if (this.analytics.learningPaths.length > 50) {
                this.analytics.learningPaths = this.analytics.learningPaths.slice(-50);
            }
        });
    }

    checkAchievements() {
        const achievements = [
            {
                id: 'first_visit',
                name: 'Kia Ora!',
                description: 'First visit to Te Kete Ako',
                condition: () => true
            },
            {
                id: 'cultural_explorer',
                name: 'Cultural Explorer',
                description: 'Viewed 5 Māori cultural resources',
                condition: () => this.culturalMetrics.maoriContentViews >= 5
            },
            {
                id: 'wisdom_seeker',
                name: 'Wisdom Seeker',
                description: 'Encountered 3 whakataukī',
                condition: () => this.culturalMetrics.whakataukiEncounters >= 3
            },
            {
                id: 'resource_master',
                name: 'Resource Master',
                description: 'Used 10 different teaching resources',
                condition: () => this.analytics.resourceUsage.size >= 10
            },
            {
                id: 'dedicated_educator',
                name: 'Dedicated Educator',
                description: 'Visited platform 10 times',
                condition: () => Array.from(this.analytics.pageViews.values()).reduce((a, b) => a + b, 0) >= 10
            }
        ];

        achievements.forEach(achievement => {
            if (!this.analytics.achievements.has(achievement.id) && achievement.condition()) {
                this.analytics.achievements.add(achievement.id);
                this.showAchievementNotification(achievement);
            }
        });
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.5s ease-out, fadeOut 0.5s ease-in 4s forwards;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="font-size: 2rem;">🏆</div>
                <div>
                    <div style="font-weight: bold; font-size: 1.1rem;">Achievement Unlocked!</div>
                    <div style="font-size: 1rem; margin: 5px 0;">${achievement.name}</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">${achievement.description}</div>
                </div>
            </div>
        `;

        // Add animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; pointer-events: none; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }

    createAnalyticsDashboard() {
        // Create analytics dashboard button
        const dashboardBtn = document.createElement('button');
        dashboardBtn.id = 'analytics-dashboard-btn';
        dashboardBtn.innerHTML = '📊';
        dashboardBtn.title = 'Learning Analytics - Tauanga Ako';
        dashboardBtn.style.cssText = `
            position: fixed;
            bottom: 260px;
            left: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
            z-index: 1001;
        `;

        // Create dashboard modal
        const dashboardModal = document.createElement('div');
        dashboardModal.id = 'analytics-dashboard-modal';
        dashboardModal.style.cssText = `
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

        const dashboardContent = document.createElement('div');
        dashboardContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 1000px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            margin-top: 20px;
        `;

        dashboardContent.innerHTML = this.createDashboardHTML();
        dashboardModal.appendChild(dashboardContent);
        document.body.appendChild(dashboardBtn);
        document.body.appendChild(dashboardModal);

        // Event listeners
        dashboardBtn.addEventListener('click', () => this.openDashboard());
        dashboardModal.addEventListener('click', (e) => {
            if (e.target === dashboardModal) this.closeDashboard();
        });

        this.bindDashboardEvents();
    }

    createDashboardHTML() {
        const totalPageViews = Array.from(this.analytics.pageViews.values()).reduce((a, b) => a + b, 0);
        const totalResources = this.analytics.resourceUsage.size;
        const achievementsCount = this.analytics.achievements.size;

        return `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px;">
                <h2 style="color: #3b82f6; margin: 0; font-size: 2rem;">📊 Learning Analytics</h2>
                <p style="color: #6b7280; margin: 10px 0 0 0;">Tauanga Ako - Your learning journey insights</p>
                <button id="close-analytics" style="position: absolute; top: 15px; right: 15px; background: none; border: none; font-size: 1.5rem; cursor: pointer;">❌</button>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold;">${totalPageViews}</div>
                    <div style="opacity: 0.9;">Total Page Views</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold;">${totalResources}</div>
                    <div style="opacity: 0.9;">Resources Used</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold;">${this.culturalMetrics.maoriContentViews}</div>
                    <div style="opacity: 0.9;">Cultural Interactions</div>
                </div>
                
                <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold;">${achievementsCount}</div>
                    <div style="opacity: 0.9;">Achievements</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
                    <h3 style="color: #374151; margin: 0 0 15px 0;">🌿 Cultural Engagement</h3>
                    <div style="space-y: 10px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Māori Content Views:</span>
                            <strong>${this.culturalMetrics.maoriContentViews}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Whakataukī Encounters:</span>
                            <strong>${this.culturalMetrics.whakataukiEncounters}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Cultural Resources:</span>
                            <strong>${this.culturalMetrics.culturalResourceAccess}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span>Te Reo Exposure:</span>
                            <strong>${this.culturalMetrics.teReoExposure}</strong>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 12px;">
                    <h3 style="color: #374151; margin: 0 0 15px 0;">📚 Most Used Resources</h3>
                    <div>
                        ${Array.from(this.analytics.resourceUsage.entries())
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([resource, count], index) => 
                                `<div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 8px; background: white; border-radius: 6px;">
                                    <span style="font-size: 0.9rem;">${index + 1}. ${resource.substring(0, 30)}...</span>
                                    <strong>${count}</strong>
                                </div>`
                            ).join('') || '<div style="color: #6b7280; text-align: center;">No resources tracked yet</div>'}
                    </div>
                </div>
            </div>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h3 style="color: #374151; margin: 0 0 15px 0;">🏆 Achievements</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                    ${this.getAchievementsHTML()}
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #f0f8f4, #e8f5e8); padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                <h3 style="color: #059669; margin: 0 0 10px 0;">🌟 Learning Insights</h3>
                <div style="color: #374151;">
                    ${this.generateLearningInsights()}
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button id="export-analytics" style="background: #3b82f6; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer; margin-right: 10px;">
                    📊 Export Data
                </button>
                <button id="reset-analytics" style="background: #ef4444; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer;">
                    🔄 Reset Analytics
                </button>
            </div>
        `;
    }

    getAchievementsHTML() {
        const allAchievements = [
            { id: 'first_visit', name: 'Kia Ora!', description: 'First visit to Te Kete Ako', icon: '👋' },
            { id: 'cultural_explorer', name: 'Cultural Explorer', description: 'Viewed 5 Māori cultural resources', icon: '🌿' },
            { id: 'wisdom_seeker', name: 'Wisdom Seeker', description: 'Encountered 3 whakataukī', icon: '📜' },
            { id: 'resource_master', name: 'Resource Master', description: 'Used 10 different teaching resources', icon: '📚' },
            { id: 'dedicated_educator', name: 'Dedicated Educator', description: 'Visited platform 10 times', icon: '🎓' }
        ];

        return allAchievements.map(achievement => {
            const isUnlocked = this.analytics.achievements.has(achievement.id);
            return `
                <div style="background: ${isUnlocked ? 'white' : '#f3f4f6'}; border: 2px solid ${isUnlocked ? '#10b981' : '#d1d5db'}; border-radius: 12px; padding: 15px; text-align: center; opacity: ${isUnlocked ? '1' : '0.6'};">
                    <div style="font-size: 2rem; margin-bottom: 10px;">${isUnlocked ? achievement.icon : '🔒'}</div>
                    <div style="font-weight: bold; color: #374151; margin-bottom: 5px;">${achievement.name}</div>
                    <div style="font-size: 0.9rem; color: #6b7280;">${achievement.description}</div>
                    ${isUnlocked ? '<div style="color: #10b981; font-size: 0.8rem; margin-top: 5px; font-weight: bold;">✅ UNLOCKED</div>' : ''}
                </div>
            `;
        }).join('');
    }

    generateLearningInsights() {
        const insights = [];
        
        if (this.culturalMetrics.maoriContentViews > 5) {
            insights.push("🌿 You're actively engaging with Māori cultural content - ka pai!");
        }
        
        if (this.analytics.resourceUsage.size > 8) {
            insights.push("📚 You're exploring diverse teaching resources across subjects.");
        }
        
        const totalViews = Array.from(this.analytics.pageViews.values()).reduce((a, b) => a + b, 0);
        if (totalViews > 15) {
            insights.push("🎯 You're a dedicated educator - your commitment to quality teaching shows!");
        }
        
        if (this.culturalMetrics.whakataukiEncounters > 2) {
            insights.push("📜 You're connecting with traditional Māori wisdom through whakataukī.");
        }

        if (insights.length === 0) {
            insights.push("🚀 Keep exploring! Your learning journey is just beginning.");
        }

        return insights.map(insight => `<div style="margin-bottom: 8px;">${insight}</div>`).join('');
    }

    bindDashboardEvents() {
        // Close button
        document.getElementById('close-analytics')?.addEventListener('click', () => {
            this.closeDashboard();
        });

        // Export analytics
        document.getElementById('export-analytics')?.addEventListener('click', () => {
            this.exportAnalytics();
        });

        // Reset analytics
        document.getElementById('reset-analytics')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
                this.resetAnalytics();
            }
        });
    }

    openDashboard() {
        // Refresh dashboard content
        const dashboardContent = document.querySelector('#analytics-dashboard-modal > div');
        dashboardContent.innerHTML = this.createDashboardHTML();
        this.bindDashboardEvents();
        
        document.getElementById('analytics-dashboard-modal').style.display = 'flex';
    }

    closeDashboard() {
        document.getElementById('analytics-dashboard-modal').style.display = 'none';
    }

    exportAnalytics() {
        const data = {
            summary: {
                totalPageViews: Array.from(this.analytics.pageViews.values()).reduce((a, b) => a + b, 0),
                uniqueResources: this.analytics.resourceUsage.size,
                achievements: this.analytics.achievements.size,
                culturalEngagement: this.culturalMetrics
            },
            detailed: {
                pageViews: Object.fromEntries(this.analytics.pageViews),
                resourceUsage: Object.fromEntries(this.analytics.resourceUsage),
                achievements: Array.from(this.analytics.achievements),
                culturalMetrics: this.culturalMetrics
            },
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `te-kete-ako-analytics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    resetAnalytics() {
        localStorage.removeItem('te-kete-analytics');
        this.analytics = {
            pageViews: new Map(),
            resourceUsage: new Map(),
            culturalEngagement: new Map(),
            learningPaths: [],
            sessionData: {},
            achievements: new Set()
        };
        this.culturalMetrics = this.initializeCulturalMetrics();
        this.closeDashboard();
        
        // Show reset confirmation
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #10b981;
            color: white;
            padding: 20px;
            border-radius: 12px;
            z-index: 10000;
            text-align: center;
        `;
        notification.innerHTML = '✅ Analytics data has been reset successfully!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    recordEvent(eventType, data) {
        // Record custom events for detailed analytics
        const event = {
            type: eventType,
            timestamp: Date.now(),
            page: this.getCurrentPageName(),
            ...data
        };
        
        // Store in learning paths for pattern analysis
        this.analytics.learningPaths.push(event);
    }

    bindEvents() {
        // Keyboard shortcut: Ctrl/Cmd + Shift + A for analytics
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.openDashboard();
            }
        });

        // Save analytics before page unload
        window.addEventListener('beforeunload', () => {
            this.saveAnalytics();
        });
    }
}

// Initialize Learning Analytics when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new LearningAnalytics());
} else {
    new LearningAnalytics();
}