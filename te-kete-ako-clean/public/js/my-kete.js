// My Kete page functionality
let currentUser = null;

// Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', async () => {
    await initMyKetePage();
});

async function initMyKetePage() {
    try {
        // Check authentication status using standard client
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        if (!user) {
            showAuthRequired();
            return;
        }

        currentUser = user;
        showKeteContent();
        await loadSavedResources();
        await loadProgressData();
    } catch (error) {
        console.error('Error initializing My Kete page:', error);
        showAuthRequired();
    }
}

function showAuthRequired() {
    document.getElementById('auth-required-message').style.display = 'block';
    document.getElementById('kete-content').style.display = 'none';
}

function showKeteContent() {
    document.getElementById('auth-required-message').style.display = 'none';
    document.getElementById('kete-content').style.display = 'block';
}

async function loadSavedResources() {
    const loadingElement = document.getElementById('kete-loading');
    const emptyElement = document.getElementById('kete-empty');
    const gridElement = document.getElementById('saved-resources-grid');

    try {
        loadingElement.style.display = 'block';
        emptyElement.style.display = 'none';
        gridElement.style.display = 'none';

        // Wait a moment for bookmarks system to be ready
        setTimeout(() => {
            if (window.simpleBookmarks) {
                const bookmarks = window.simpleBookmarks.getBookmarks();
                const stats = window.simpleBookmarks.getBookmarkStats();

                // Update statistics
                document.getElementById('total-resources').textContent = stats.total;
                document.getElementById('handouts-count').textContent = (stats.byType.resource || []).filter(b => b.url.includes('handouts')).length;
                document.getElementById('lessons-count').textContent = (stats.byType.resource || []).filter(b => b.url.includes('lessons')).length;
                document.getElementById('games-count').textContent = (stats.byType.resource || []).filter(b => b.url.includes('games')).length;

                loadingElement.style.display = 'none';

                if (bookmarks.length === 0) {
                    emptyElement.style.display = 'block';
                } else {
                    renderBookmarkedResources(bookmarks);
                    gridElement.style.display = 'grid';
                }
            } else {
                // Fallback if bookmarks system not ready
                loadingElement.style.display = 'none';
                emptyElement.style.display = 'block';
                document.getElementById('total-resources').textContent = '0';
                document.getElementById('handouts-count').textContent = '0';
                document.getElementById('lessons-count').textContent = '0';
                document.getElementById('games-count').textContent = '0';
            }
        }, 500);

        } catch (error) {
        console.error('Error loading saved resources:', error);
        loadingElement.innerHTML = `
            <p style="color: var(--color-error); text-align: center;">
                ❌ Error loading your saved resources. Please try refreshing the page.
            </p>
        `;
    }
}

function renderBookmarkedResources(bookmarks) {
    const gridElement = document.getElementById('saved-resources-grid');
    gridElement.innerHTML = '';

    bookmarks.forEach(bookmark => {
        const card = createBookmarkCard(bookmark);
        gridElement.appendChild(card);
    });
}

function createBookmarkCard(bookmark) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.style.cssText = `
        background: white;
        border: 1px solid #e1e5e9;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    `;

    // Determine icon based on URL
    let icon = '📄';
    if (bookmark.url.includes('games')) icon = '🎮';
    else if (bookmark.url.includes('lessons')) icon = '📖';
    else if (bookmark.url.includes('activities')) icon = '⚡';
    else if (bookmark.url.includes('handouts')) icon = '📄';
    else if (bookmark.url.includes('unit-plans')) icon = '📚';

    const savedDate = new Date(bookmark.savedAt).toLocaleDateString('en-NZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
            <h3 style="margin: 0; color: var(--color-primary); font-size: 1.1rem;">
                ${icon} ${bookmark.title}
            </h3>
            <button class="remove-bookmark-btn" 
                    data-url="${bookmark.url}"
                    style="background: none; border: none; color: #dc3545; font-size: 1.2rem; cursor: pointer; padding: 0.2rem;"
                    title="Remove from kete">
                🗑️
            </button>
        </div>
        
        ${bookmark.description ? `<p style="color: var(--color-text-secondary); font-size: 0.95rem; line-height: 1.4; margin-bottom: 1rem;">${bookmark.description}</p>` : ''}
        
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 1rem;">
            <a href="${bookmark.url}" 
               style="background: var(--color-primary); color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 500;">
                View Resource
            </a>
            <span style="font-size: 0.8rem; color: var(--color-text-secondary);">
                Saved ${savedDate}
            </span>
        </div>
    `;

    // Add remove functionality
    const removeBtn = card.querySelector('.remove-bookmark-btn');
    removeBtn.addEventListener('click', () => {
        if (confirm(`Remove "${bookmark.title}" from your kete?`)) {
            window.simpleBookmarks.removeBookmark(bookmark.url);
            loadSavedResources(); // Refresh the display
        }
    });

    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });

    return card;
}

// NEW: Load progress data and agentic features
async function loadProgressData() {
    try {
        // Initialize progress tracker
        if (window.TeKeteProgressTracker) {
            await window.TeKeteProgressTracker.initialize();
            
            // Load progress summary
            const summary = window.TeKeteProgressTracker.getProgressSummary();
            
            // Show progress dashboard if user has progress
            if (summary.total_resources > 0) {
                document.getElementById('progress-dashboard').style.display = 'block';
                updateProgressDashboard(summary);
            }
            
            // Load AI recommendations
            await loadAIRecommendations();
            
            // Load achievements
            loadAchievements(summary);
        }
    } catch (error) {
        console.error('Error loading progress data:', error);
    }
}

function updateProgressDashboard(summary) {
    document.getElementById('progress-total').textContent = summary.total_resources;
    document.getElementById('progress-completed').textContent = summary.completed_resources;
    document.getElementById('progress-average').textContent = Math.round(summary.average_progress) + '%';
    
    // Calculate achievement count
    let achievements = 0;
    if (summary.completed_resources > 0) achievements++;
    if (summary.completed_resources >= 5) achievements++;
    if (summary.completed_resources >= 10) achievements++;
    if (summary.average_progress >= 50) achievements++;
    document.getElementById('achievement-count').textContent = achievements;
    
    // Show recent activities
    const recentActivities = document.getElementById('recent-activities');
    if (summary.recent_activity && summary.recent_activity.length > 0) {
        recentActivities.innerHTML = summary.recent_activity.map(activity => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                <span>${activity.resource_title}</span>
                <div>
                    <span style="color: var(--color-secondary); font-weight: bold;">${activity.progress_percentage}%</span>
                    ${activity.completed ? '<span style="color: #4CAF50; margin-left: 0.5rem;">✓</span>' : ''}
                </div>
            </div>
        `).join('');
    } else {
        recentActivities.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center;">No recent activity</p>';
    }
}

async function loadAIRecommendations() {
    try {
        // Get personalized recommendations based on user progress
        const recommendations = await generatePersonalizedRecommendations();
        
        if (recommendations && recommendations.length > 0) {
            document.getElementById('ai-recommendations').style.display = 'block';
            
            const container = document.getElementById('recommendations-container');
            container.innerHTML = recommendations.map(rec => `
                <div class="recommendation-card">
                    <h4 style="margin-bottom: 0.5rem; color: white;">${rec.title}</h4>
                    <p style="margin-bottom: 1rem; opacity: 0.9;">${rec.description}</p>
                    <a href="${rec.url}" style="background: rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: bold;">
                        Explore Resource →
                    </a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading AI recommendations:', error);
    }
}

async function generatePersonalizedRecommendations() {
    // Generate intelligent recommendations based on user progress and preferences
    const fallbackRecommendations = [
        {
            title: "🌿 Te Ao Māori Values in Teaching",
            description: "Deepen your understanding of incorporating Māori perspectives into your classroom practice.",
            url: "handouts.html"
        },
        {
            title: "🎮 Interactive Learning Games",
            description: "Engage students with educational games that make learning fun and memorable.",
            url: "games.html"
        },
        {
            title: "📖 Complete Unit Plans",
            description: "Ready-to-use comprehensive unit plans aligned with NZ Curriculum objectives.",
            url: "unit-plans.html"
        }
    ];

    // In future, this would call GraphRAG for personalized recommendations
    // For now, return contextual recommendations
    return fallbackRecommendations;
}

function loadAchievements(summary) {
    const achievements = [];
    
    // Define achievements based on progress
    if (summary.completed_resources >= 1) {
        achievements.push({
            title: "First Steps",
            description: "Completed your first learning activity",
            icon: "🎯",
            earned: true
        });
    }
    
    if (summary.completed_resources >= 5) {
        achievements.push({
            title: "Learning Momentum",
            description: "Completed 5 learning activities",
            icon: "🚀",
            earned: true
        });
    }
    
    if (summary.completed_resources >= 10) {
        achievements.push({
            title: "Dedicated Learner",
            description: "Completed 10 learning activities",
            icon: "🏆",
            earned: true
        });
    }
    
    if (summary.average_progress >= 75) {
        achievements.push({
            title: "Excellence Pursuer",
            description: "Maintained high completion rates",
            icon: "⭐",
            earned: true
        });
    }

    // Show achievements if any exist
    if (achievements.length > 0) {
        document.getElementById('achievements-section').style.display = 'block';
        
        const container = document.getElementById('achievements-container');
        container.innerHTML = achievements.map(achievement => `
            <div class="achievement-badge" style="display: inline-block; margin: 0.5rem;">
                ${achievement.icon} ${achievement.title}
            </div>
        `).join('');
    }
}

// Listen for auth state changes
document.addEventListener('authStateChanged', (event) => {
    if (!event.detail.isLoggedIn) {
        // Show login prompt instead of forcing redirect
        showLoginPrompt();
    } else if (event.detail.isLoggedIn && !currentUser) {
        // User just signed in, reload the page
        window.location.reload();
    }
});

// Show login prompt without forcing navigation
function showLoginPrompt() {
    const loginSection = document.querySelector('.login-section');
    const keteSection = document.querySelector('.kete-section');
    
    if (loginSection && keteSection) {
        loginSection.style.display = 'block';
        keteSection.style.display = 'none';
    }
    
    // Update page title to indicate login needed
    document.title = 'My Kete - Please Sign In | Te Kete Ako';
}