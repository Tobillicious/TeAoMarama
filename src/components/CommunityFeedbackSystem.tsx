import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Heart, Star, Send, ThumbsUp, Filter, Globe } from 'lucide-react';
import './CommunityFeedbackSystem.css';

interface FeedbackItem {
  id: string;
  type: 'cultural-review' | 'educational-content' | 'platform-improvement' | 'community-suggestion';
  title: string;
  description: string;
  author: string;
  authorRole: 'teacher' | 'student' | 'whānau' | 'community' | 'cultural-advisor';
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'critical';
  culturalSensitivity: number;
  communitySupport: number;
  responses: FeedbackResponse[];
  tags: string[];
  status: 'open' | 'in-review' | 'implemented' | 'declined';
}

interface FeedbackResponse {
  id: string;
  author: string;
  role: string;
  message: string;
  timestamp: Date;
  supportLevel: number;
}

interface NewFeedback {
  type: string;
  title: string;
  description: string;
  priority: string;
  tags: string[];
}

const CommunityFeedbackSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'view' | 'submit' | 'cultural'>('view');
  const [filterType, setFilterType] = useState<string>('all');
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [newFeedback, setNewFeedback] = useState<NewFeedback>({
    type: 'educational-content',
    title: '',
    description: '',
    priority: 'medium',
    tags: []
  });

  useEffect(() => {
    // Initialize with sample feedback data
    const initialFeedback: FeedbackItem[] = [
      {
        id: 'fb-001',
        type: 'cultural-review',
        title: 'Te Reo Māori pronunciation guides needed',
        description: 'Kia ora! Would love to see more audio pronunciation guides for Te Reo Māori terms throughout the platform. This would help non-native speakers learn correct pronunciation and show respect for the language.',
        author: 'Aroha Patel',
        authorRole: 'teacher',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        priority: 'high',
        culturalSensitivity: 95,
        communitySupport: 87,
        responses: [
          {
            id: 'resp-001',
            author: 'Māori Cultural Advisor',
            role: 'cultural-advisor',
            message: 'This is an excellent suggestion. Proper pronunciation is crucial for cultural respect. We can work with local iwi to provide authentic audio recordings.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            supportLevel: 98
          }
        ],
        tags: ['te-reo-maori', 'pronunciation', 'cultural-respect', 'accessibility'],
        status: 'in-review'
      },
      {
        id: 'fb-002',
        type: 'educational-content',
        title: 'More hands-on science experiments for Year 5-8',
        description: 'Students are really engaging with the current science content, but we need more practical experiments that can be done with everyday materials. Especially ones that connect to traditional Māori knowledge of the natural world.',
        author: 'James Wilson',
        authorRole: 'teacher',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        culturalSensitivity: 78,
        communitySupport: 92,
        responses: [],
        tags: ['science', 'practical-learning', 'traditional-knowledge', 'year-5-8'],
        status: 'open'
      },
      {
        id: 'fb-003',
        type: 'platform-improvement',
        title: 'Mobile app for offline access in rural areas',
        description: 'Many of our students in rural communities have limited internet access. A mobile app with offline capabilities would be transformative for ensuring equity in education access.',
        author: 'Sarah Te Kanawa',
        authorRole: 'community',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        priority: 'critical',
        culturalSensitivity: 85,
        communitySupport: 96,
        responses: [
          {
            id: 'resp-002',
            author: 'Technical Team',
            role: 'teacher',
            message: 'We are actively developing offline capabilities. This is a priority for us to ensure educational equity across all communities.',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            supportLevel: 94
          }
        ],
        tags: ['mobile', 'offline', 'rural-access', 'equity'],
        status: 'in-review'
      }
    ];

    setFeedback(initialFeedback);
  }, []);

  const handleSubmitFeedback = () => {
    if (!newFeedback.title.trim() || !newFeedback.description.trim()) return;

    const feedbackItem: FeedbackItem = {
      id: `fb-${Date.now()}`,
      type: newFeedback.type as any,
      title: newFeedback.title,
      description: newFeedback.description,
      author: 'Current User',
      authorRole: 'community',
      timestamp: new Date(),
      priority: newFeedback.priority as any,
      culturalSensitivity: 80,
      communitySupport: 75,
      responses: [],
      tags: newFeedback.tags,
      status: 'open'
    };

    setFeedback(prev => [feedbackItem, ...prev]);
    setNewFeedback({
      type: 'educational-content',
      title: '',
      description: '',
      priority: 'medium',
      tags: []
    });
    setActiveTab('view');
  };

  const filteredFeedback = filterType === 'all' 
    ? feedback 
    : feedback.filter(item => item.type === filterType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural-review': return <Heart className="type-icon cultural" />;
      case 'educational-content': return <Star className="type-icon educational" />;
      case 'platform-improvement': return <Globe className="type-icon platform" />;
      case 'community-suggestion': return <Users className="type-icon community" />;
      default: return <MessageCircle className="type-icon default" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'status-implemented';
      case 'in-review': return 'status-in-review';
      case 'declined': return 'status-declined';
      case 'open': return 'status-open';
      default: return 'status-open';
    }
  };

  return (
    <div className="community-feedback-system">
      <div className="feedback-header">
        <div className="header-content">
          <MessageCircle className="header-icon" />
          <div>
            <h1>Community Feedback System</h1>
            <h2 className="maori-title">Te Pūnaha Whakahoki Kōrero</h2>
            <p>Building our educational platform together through community voice</p>
          </div>
        </div>

        <div className="tab-navigation">
          <button 
            type="button"
            onClick={() => setActiveTab('view')}
            className={activeTab === 'view' ? 'active' : ''}
          >
            <MessageCircle size={16} />
            View Feedback
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('submit')}
            className={activeTab === 'submit' ? 'active' : ''}
          >
            <Send size={16} />
            Submit Feedback
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('cultural')}
            className={activeTab === 'cultural' ? 'active' : ''}
          >
            <Heart size={16} />
            Cultural Guidance
          </button>
        </div>
      </div>

      {activeTab === 'view' && (
        <div className="feedback-view">
          <div className="feedback-filters">
            <Filter className="filter-icon" />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Feedback</option>
              <option value="cultural-review">Cultural Reviews</option>
              <option value="educational-content">Educational Content</option>
              <option value="platform-improvement">Platform Improvements</option>
              <option value="community-suggestion">Community Suggestions</option>
            </select>
          </div>

          <div className="feedback-grid">
            {filteredFeedback.map(item => (
              <div key={item.id} className="feedback-card">
                <div className="feedback-header-section">
                  <div className="feedback-type">
                    {getTypeIcon(item.type)}
                    <span className="type-label">
                      {item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <div className={`priority-badge ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </div>
                </div>

                <h3 className="feedback-title">{item.title}</h3>
                <p className="feedback-description">{item.description}</p>

                <div className="feedback-meta">
                  <div className="author-info">
                    <span className="author-name">{item.author}</span>
                    <span className="author-role">({item.authorRole.replace('-', ' ')})</span>
                  </div>
                  <div className="timestamp">
                    {item.timestamp.toLocaleDateString()}
                  </div>
                </div>

                <div className="feedback-metrics">
                  <div className="metric">
                    <Heart className="metric-icon" />
                    <span>Cultural Sensitivity: {item.culturalSensitivity}%</span>
                  </div>
                  <div className="metric">
                    <ThumbsUp className="metric-icon" />
                    <span>Community Support: {item.communitySupport}%</span>
                  </div>
                </div>

                <div className="feedback-tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className={`status-badge ${getStatusColor(item.status)}`}>
                  {item.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>

                {item.responses.length > 0 && (
                  <div className="responses-section">
                    <h4>Community Responses ({item.responses.length})</h4>
                    {item.responses.map(response => (
                      <div key={response.id} className="response">
                        <div className="response-header">
                          <strong>{response.author}</strong>
                          <span className="response-role">({response.role})</span>
                          <span className="response-time">
                            {response.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="response-message">{response.message}</p>
                        <div className="response-support">
                          Support Level: {response.supportLevel}%
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'submit' && (
        <div className="feedback-submit">
          <div className="submit-form">
            <h2>Submit New Feedback</h2>
            <p className="form-description">
              Share your thoughts, suggestions, or concerns to help improve our educational platform.
            </p>

            <div className="form-group">
              <label htmlFor="feedback-type">Feedback Type</label>
              <select 
                id="feedback-type"
                value={newFeedback.type}
                onChange={(e) => setNewFeedback(prev => ({...prev, type: e.target.value}))}
                className="form-select"
              >
                <option value="educational-content">Educational Content</option>
                <option value="cultural-review">Cultural Review</option>
                <option value="platform-improvement">Platform Improvement</option>
                <option value="community-suggestion">Community Suggestion</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="feedback-title">Title</label>
              <input
                type="text"
                id="feedback-title"
                value={newFeedback.title}
                onChange={(e) => setNewFeedback(prev => ({...prev, title: e.target.value}))}
                placeholder="Brief summary of your feedback"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedback-description">Description</label>
              <textarea
                id="feedback-description"
                value={newFeedback.description}
                onChange={(e) => setNewFeedback(prev => ({...prev, description: e.target.value}))}
                placeholder="Provide detailed information about your feedback, suggestions, or concerns"
                rows={6}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedback-priority">Priority</label>
              <select 
                id="feedback-priority"
                value={newFeedback.priority}
                onChange={(e) => setNewFeedback(prev => ({...prev, priority: e.target.value}))}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <button 
              type="button"
              onClick={handleSubmitFeedback}
              className="submit-button"
              disabled={!newFeedback.title.trim() || !newFeedback.description.trim()}
            >
              <Send size={16} />
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {activeTab === 'cultural' && (
        <div className="cultural-guidance">
          <div className="guidance-panel">
            <h2>Cultural Guidance</h2>
            <h3 className="maori-subtitle">Ngā Aratohu Ahurea</h3>
            
            <div className="guidance-content">
              <div className="principle-card">
                <Heart className="principle-icon" />
                <h4>Manaakitanga - Hospitality & Care</h4>
                <p>When providing feedback, approach with kindness and respect for all community members. Consider how your words might impact others and frame suggestions constructively.</p>
              </div>
              
              <div className="principle-card">
                <Users className="principle-icon" />
                <h4>Whakatōhea - Building Relationships</h4>
                <p>Remember that feedback is about strengthening our educational whānau. Focus on collaborative solutions that benefit the entire community.</p>
              </div>
              
              <div className="principle-card">
                <Star className="principle-icon" />
                <h4>Kaitiakitanga - Guardianship</h4>
                <p>We are all guardians of this educational platform. When suggesting improvements, consider the long-term impact on future learners and cultural preservation.</p>
              </div>
            </div>
            
            <div className="cultural-review-process">
              <h4>Cultural Review Process</h4>
              <div className="process-steps">
                <div className="step">
                  <span className="step-number">1</span>
                  <span className="step-text">All cultural feedback is reviewed by our cultural advisory team</span>
                </div>
                <div className="step">
                  <span className="step-number">2</span>
                  <span className="step-text">Community consultation for significant cultural matters</span>
                </div>
                <div className="step">
                  <span className="step-number">3</span>
                  <span className="step-text">Implementation with ongoing cultural monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityFeedbackSystem;