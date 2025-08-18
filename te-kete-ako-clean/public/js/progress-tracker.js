/**
 * Te Kete Ako Progress Tracker - Frontend Module
 * Integrates with Supabase progress tracking and GraphRAG recommendations
 * Provides agentic learning experience with personalized tips and guidance
 */

class TeKeteProgressTracker {
    constructor() {
        this.baseUrl = '/.netlify/functions';
        this.currentUser = null;
        this.progressCache = new Map();
        this.graphragTips = new Map();
        this.initialized = false;
    }

    /**
     * Initialize the progress tracker
     */
    async initialize() {
        if (this.initialized) return;
        
        try {
            // Get current user from Supabase auth
            this.currentUser = await window.authHelpers?.getCurrentUser();
            if (!this.currentUser) {
                return false;
            }

            this.initialized = true;
            
            // Load existing progress
            await this.loadUserProgress();
            
            // Set up automatic progress saving
            this.setupAutoSave();
            
            return true;
        } catch (error) {
            console.error('Progress tracker initialization error:', error);
            return false;
        }
    }

    /**
     * Get authentication token for API calls
     */
    async getAuthToken() {
        if (!window.supabase) return null;
        
        const { data: { session } } = await window.supabase.auth.getSession();
        return session?.access_token || null;
    }

    /**
     * Load all user progress from backend
     */
    async loadUserProgress() {
        try {
            const token = await this.getAuthToken();
            if (!token) return [];

            const response = await fetch(`${this.baseUrl}/progress-tracker`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Cache progress data
                    result.data.forEach(progress => {
                        const key = `${progress.resource_type}:${progress.resource_id}`;
                        this.progressCache.set(key, progress);
                    });
                    
                    return result.data;
                }
            }
            
            return [];
        } catch (error) {
            console.error('Failed to load user progress:', error);
            return [];
        }
    }

    /**
     * Track progress for a specific resource
     */
    async trackProgress(resourceType, resourceId, resourceTitle, progressPercentage = 0, additionalData = {}) {
        if (!this.initialized) {
            await this.initialize();
            if (!this.initialized) return false;
        }

        try {
            const token = await this.getAuthToken();
            if (!token) return false;

            const progressData = {
                resource_type: resourceType,
                resource_id: resourceId,
                resource_title: resourceTitle,
                progress_percentage: Math.min(100, Math.max(0, progressPercentage)),
                completed: progressPercentage >= 100,
                activity_data: {
                    ...additionalData,
                    timestamp: new Date().toISOString(),
                    user_agent: navigator.userAgent.substring(0, 100)
                }
            };

            // Check if progress exists
            const key = `${resourceType}:${resourceId}`;
            const method = this.progressCache.has(key) ? 'PUT' : 'POST';

            const response = await fetch(`${this.baseUrl}/progress-tracker`, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(progressData)
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Update cache
                    this.progressCache.set(key, result.data);
                    
                    // Get GraphRAG tips based on progress
                    await this.getGraphRAGTips(resourceType, resourceId, progressPercentage);
                    
                    // Trigger progress events
                    this.triggerProgressEvent(resourceType, resourceId, progressPercentage);
                    
                    `);
                    return true;
                }
            }

            return false;
        } catch (error) {
            console.error('Failed to track progress:', error);
            return false;
        }
    }

    /**
     * Get personalized tips from GraphRAG based on current progress
     */
    async getGraphRAGTips(resourceType, resourceId, progressPercentage) {
        try {
            const token = await this.getAuthToken();
            if (!token) return null;

            // Create context for GraphRAG query
            const context = {
                resource_type: resourceType,
                resource_id: resourceId,
                progress_percentage: progressPercentage,
                user_profile: this.currentUser,
                recent_progress: Array.from(this.progressCache.values()).slice(-5)
            };

            const graphragQuery = this.buildGraphRAGQuery(context);

            const response = await fetch(`${this.baseUrl}/fetch-graphrag`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: graphragQuery,
                    context: context
                })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    const tips = this.parseGraphRAGTips(result.response);
                    const key = `${resourceType}:${resourceId}`;
                    this.graphragTips.set(key, tips);
                    
                    return tips;
                }
            }

            return null;
        } catch (error) {
            console.error('Failed to get GraphRAG tips:', error);
            return null;
        }
    }

    /**
     * Build GraphRAG query based on user context and progress
     */
    buildGraphRAGQuery(context) {
        const { resource_type, progress_percentage, recent_progress } = context;
        
        let query = `Based on my progress in ${resource_type} (${progress_percentage}% complete), `;
        
        if (progress_percentage < 25) {
            query += "provide getting started tips and foundational concepts I should focus on.";
        } else if (progress_percentage < 50) {
            query += "suggest intermediate strategies and common challenges to watch out for.";
        } else if (progress_percentage < 75) {
            query += "recommend advanced techniques and ways to deepen my understanding.";
        } else {
            query += "suggest mastery activities and ways to apply this knowledge in new contexts.";
        }

        // Add context about recent learning patterns
        if (recent_progress.length > 0) {
            const recentTypes = [...new Set(recent_progress.map(p => p.resource_type))];
            query += ` I've recently been working on: ${recentTypes.join(', ')}.`;
        }

        query += " Provide 3 specific, actionable tips that align with NZ curriculum objectives and Te Ao Māori principles.";
        
        return query;
    }

    /**
     * Parse GraphRAG response into structured tips
     */
    parseGraphRAGTips(response) {
        try {
            // Extract tips from GraphRAG response
            const tips = [];
            const lines = response.split('\n').filter(line => line.trim());
            
            let currentTip = '';
            for (const line of lines) {
                if (line.match(/^\d+\./) || line.match(/^[•\-\*]/)) {
                    if (currentTip) {
                        tips.push(currentTip.trim());
                    }
                    currentTip = line.replace(/^\d+\./, '').replace(/^[•\-\*]/, '').trim();
                } else if (currentTip) {
                    currentTip += ' ' + line.trim();
                }
            }
            
            if (currentTip) {
                tips.push(currentTip.trim());
            }

            return {
                tips: tips.slice(0, 3), // Limit to 3 tips
                generated_at: new Date().toISOString(),
                source: 'graphrag'
            };
        } catch (error) {
            console.error('Error parsing GraphRAG tips:', error);
            return {
                tips: ['Keep exploring and learning!', 'Practice regularly for best results.', 'Connect with other learners for support.'],
                generated_at: new Date().toISOString(),
                source: 'fallback'
            };
        }
    }

    /**
     * Get progress for specific resource
     */
    getProgress(resourceType, resourceId) {
        const key = `${resourceType}:${resourceId}`;
        return this.progressCache.get(key) || null;
    }

    /**
     * Get all progress data
     */
    getAllProgress() {
        return Array.from(this.progressCache.values());
    }

    /**
     * Get tips for specific resource
     */
    getTips(resourceType, resourceId) {
        const key = `${resourceType}:${resourceId}`;
        return this.graphragTips.get(key) || null;
    }

    /**
     * Mark resource as completed
     */
    async completeResource(resourceType, resourceId, resourceTitle, completionData = {}) {
        return await this.trackProgress(resourceType, resourceId, resourceTitle, 100, {
            ...completionData,
            completion_type: 'manual',
            completed_at: new Date().toISOString()
        });
    }

    /**
     * Set up automatic progress saving
     */
    setupAutoSave() {
        // Save progress when user navigates away
        window.addEventListener('beforeunload', () => {
            this.saveProgressToLocalStorage();
        });

        // Periodic save every 30 seconds if there are changes
        setInterval(() => {
            this.saveProgressToLocalStorage();
        }, 30000);
    }

    /**
     * Save progress to localStorage as backup
     */
    saveProgressToLocalStorage() {
        try {
            const progressData = {
                progress: Array.from(this.progressCache.entries()),
                tips: Array.from(this.graphragTips.entries()),
                lastSync: new Date().toISOString()
            };
            
            localStorage.setItem('te_kete_progress', JSON.stringify(progressData));
        } catch (error) {
            console.error('Failed to save progress to localStorage:', error);
        }
    }

    /**
     * Load progress from localStorage
     */
    loadProgressFromLocalStorage() {
        try {
            const stored = localStorage.getItem('te_kete_progress');
            if (stored) {
                const data = JSON.parse(stored);
                this.progressCache = new Map(data.progress || []);
                this.graphragTips = new Map(data.tips || []);
                return true;
            }
        } catch (error) {
            console.error('Failed to load progress from localStorage:', error);
        }
        return false;
    }

    /**
     * Trigger progress events for UI updates
     */
    triggerProgressEvent(resourceType, resourceId, progressPercentage) {
        const event = new CustomEvent('progress-updated', {
            detail: {
                resourceType,
                resourceId,
                progressPercentage,
                completed: progressPercentage >= 100
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Get progress summary statistics
     */
    getProgressSummary() {
        const allProgress = this.getAllProgress();
        
        return {
            total_resources: allProgress.length,
            completed_resources: allProgress.filter(p => p.completed).length,
            in_progress_resources: allProgress.filter(p => !p.completed && p.progress_percentage > 0).length,
            average_progress: allProgress.length > 0 
                ? allProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / allProgress.length 
                : 0,
            resource_types: [...new Set(allProgress.map(p => p.resource_type))],
            recent_activity: allProgress
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 5)
        };
    }
}

// Global instance
window.TeKeteProgressTracker = new TeKeteProgressTracker();

// Auto-initialize when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
    await window.TeKeteProgressTracker.initialize();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeKeteProgressTracker;
}

