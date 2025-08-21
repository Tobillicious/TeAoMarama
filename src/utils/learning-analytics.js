
// Learning Pathway Analytics Engine - Te Kura o TeAoMarama
class LearningPathwayAnalytics {
  constructor() {
    this.learningData = {
      pathways: new Map(),
      interactions: [],
      achievements: [],
      culturalEngagement: 0,
      preferences: {}
    };
    
    this.init();
  }

  init() {
    this.setupLearningTracking();
    this.initializePersonalization();
    this.createAnalyticsDashboard();
  }

  setupLearningTracking() {
    // Track learning interactions
    this.trackResourceAccess();
    this.trackTimeSpent();
    this.trackCulturalContent();
    this.trackAchievements();
  }

  trackResourceAccess() {
    const resourceLinks = document.querySelectorAll('[data-resource-id]');
    resourceLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const resourceId = event.target.dataset.resourceId;
        const timestamp = new Date().toISOString();
        
        this.logInteraction({
          type: 'resource_access',
          resourceId,
          timestamp,
          pathway: this.getCurrentPathway()
        });
        
        this.updateLearningProgress(resourceId);
      });
    });
  }

  trackTimeSpent() {
    let startTime = Date.now();
    let currentResource = this.getCurrentResource();
    
    // Track time on page/resource
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - startTime;
      this.logInteraction({
        type: 'time_spent',
        resource: currentResource,
        duration: timeSpent,
        timestamp: new Date().toISOString()
      });
    });
    
    // Track engagement patterns
    this.trackScrollDepth();
    this.trackInteractionFrequency();
  }

  trackScrollDepth() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      maxScroll = Math.max(maxScroll, scrollPercent);
    });
    
    window.addEventListener('beforeunload', () => {
      this.logInteraction({
        type: 'scroll_depth',
        maxScroll: Math.round(maxScroll),
        timestamp: new Date().toISOString()
      });
    });
  }

  trackCulturalContent() {
    const culturalElements = document.querySelectorAll('[data-cultural="true"], .maori-content, .cultural-content');
    
    culturalElements.forEach(element => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.culturalEngagement += 1;
            this.logInteraction({
              type: 'cultural_engagement',
              element: entry.target.className,
              timestamp: new Date().toISOString()
            });
          }
        });
      });
      
      observer.observe(element);
    });
  }

  logInteraction(interaction) {
    this.learningData.interactions.push(interaction);
    
    // Persist to localStorage with cultural context
    const learningHistory = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    learningHistory.push(interaction);
    
    // Keep only last 1000 interactions for performance
    if (learningHistory.length > 1000) {
      learningHistory.splice(0, learningHistory.length - 1000);
    }
    
    localStorage.setItem('learningHistory', JSON.stringify(learningHistory));
    
    // Trigger real-time analytics
    this.updateRealtimeAnalytics(interaction);
  }

  updateRealtimeAnalytics(interaction) {
    // Update live dashboard if visible
    const dashboard = document.getElementById('learning-analytics-dashboard');
    if (dashboard) {
      this.refreshDashboard();
    }
    
    // Adaptive recommendations
    this.generatePersonalizedRecommendations();
  }

  createAnalyticsDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'learning-analytics-dashboard';
    dashboard.innerHTML = `
      <div class="analytics-panel">
        <h3>🎯 Your Learning Journey</h3>
        <div class="analytics-grid">
          <div class="metric-card">
            <span class="metric-value" id="resources-accessed">0</span>
            <span class="metric-label">Resources Explored</span>
          </div>
          <div class="metric-card cultural-metric">
            <span class="metric-value" id="cultural-engagement">0</span>
            <span class="metric-label">Cultural Content Engaged</span>
          </div>
          <div class="metric-card">
            <span class="metric-value" id="time-learning">0h</span>
            <span class="metric-label">Time Learning</span>
          </div>
          <div class="metric-card achievement-metric">
            <span class="metric-value" id="achievements-earned">0</span>
            <span class="metric-label">Achievements Earned</span>
          </div>
        </div>
        
        <div class="pathway-visualization">
          <h4>📈 Learning Pathway</h4>
          <div id="pathway-chart"></div>
        </div>
        
        <div class="recommendations">
          <h4>🌟 Personalized Recommendations</h4>
          <div id="recommendation-list"></div>
        </div>
      </div>
    `;
    
    // Add to page (hidden by default)
    dashboard.style.cssText = `
      position: fixed;
      top: 50px;
      right: -400px;
      width: 380px;
      height: calc(100vh - 100px);
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 1rem 0 0 1rem;
      padding: 1.5rem;
      overflow-y: auto;
      box-shadow: -5px 0 20px rgba(0,0,0,0.1);
      transition: right 0.3s ease;
      z-index: 1000;
    `;
    
    document.body.appendChild(dashboard);
    
    // Add toggle button
    this.createDashboardToggle(dashboard);
    
    // Initial data load
    this.refreshDashboard();
  }

  createDashboardToggle(dashboard) {
    const toggle = document.createElement('button');
    toggle.innerHTML = '📊 Analytics';
    toggle.className = 'analytics-toggle';
    toggle.style.cssText = `
      position: fixed;
      top: 120px;
      right: 20px;
      background: var(--color-pounamu);
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      z-index: 1001;
      font-size: 0.875rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    `;
    
    let isOpen = false;
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      dashboard.style.right = isOpen ? '0' : '-400px';
      toggle.innerHTML = isOpen ? '✕ Close' : '📊 Analytics';
    });
    
    document.body.appendChild(toggle);
  }

  refreshDashboard() {
    const history = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    
    // Update metrics
    const resourceAccesses = history.filter(h => h.type === 'resource_access').length;
    const culturalEngagements = history.filter(h => h.type === 'cultural_engagement').length;
    const totalTime = history
      .filter(h => h.type === 'time_spent')
      .reduce((sum, h) => sum + (h.duration || 0), 0);
    
    const resourcesEl = document.getElementById('resources-accessed');
    const culturalEl = document.getElementById('cultural-engagement');
    const timeEl = document.getElementById('time-learning');
    
    if (resourcesEl) resourcesEl.textContent = resourceAccesses;
    if (culturalEl) culturalEl.textContent = culturalEngagements;
    if (timeEl) timeEl.textContent = `${Math.round(totalTime / 3600000)}h`;
    
    this.updateRecommendations();
  }

  updateRecommendations() {
    const recommendationEl = document.getElementById('recommendation-list');
    if (!recommendationEl) return;
    
    const recommendations = this.generatePersonalizedRecommendations();
    recommendationEl.innerHTML = recommendations.map(rec => `
      <div class="recommendation-item">
        <span class="rec-emoji">${rec.emoji}</span>
        <div class="rec-content">
          <strong>${rec.title}</strong>
          <p>${rec.description}</p>
        </div>
      </div>
    `).join('');
  }

  generatePersonalizedRecommendations() {
    const history = JSON.parse(localStorage.getItem('learningHistory') || '[]');
    const culturalEngagement = history.filter(h => h.type === 'cultural_engagement').length;
    const recommendations = [];
    
    if (culturalEngagement > 5) {
      recommendations.push({
        emoji: '🌿',
        title: 'Advanced Tikanga Studies',
        description: 'Explore deeper cultural protocols and practices'
      });
    }
    
    if (history.length > 20) {
      recommendations.push({
        emoji: '🎓',
        title: 'Learning Achievement Badge',
        description: 'You are ready for the next level certification'
      });
    }
    
    recommendations.push({
      emoji: '📚',
      title: 'Continue Your Journey',
      description: 'Explore mathematics with cultural integration'
    });
    
    return recommendations;
  }

  getCurrentPathway() {
    return window.location.pathname;
  }

  getCurrentResource() {
    return document.title || window.location.href;
  }
}

// Initialize Learning Analytics
window.learningAnalytics = new LearningPathwayAnalytics();
