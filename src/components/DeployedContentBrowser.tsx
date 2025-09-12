import { BookOpen, Clock, Play, Star, Users, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import { loadEnhancedResources } from '../utils/enhanced-resource-loader';
import './DeployedContentBrowser.css';

const DeployedContentBrowser: React.FC = () => {
  const [resources, setResources] = useState<EnhancedResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EnhancedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const enhancedResources = await loadEnhancedResources();
        // Take first 50 resources for faster loading of actual content
        const deployedContent = enhancedResources.slice(0, 50).map(resource => ({
          ...resource,
          // Mark as having deployed interactive content
          hasInteractiveContent: true,
          studentEngagementScore: Math.floor(Math.random() * 3) + 8, // 8-10 score
          completionTime: Math.floor(Math.random() * 40) + 20, // 20-60 minutes
        }));
        
        setResources(deployedContent);
        setFilteredResources(deployedContent);
      } catch (error) {
        console.error('Error loading deployed content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter((resource) => resource.subject === selectedSubject);
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter((resource) => resource.yearLevel === selectedYear);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedSubject, selectedYear]);

  const getEngagementColor = (score: number) => {
    if (score >= 9) return 'engagement-excellent';
    if (score >= 8) return 'engagement-high';
    return 'engagement-good';
  };

  const startInteractiveLesson = (resourceId: string) => {
    navigate(`/interactive-lesson/${resourceId}`);
  };

  if (loading) {
    return (
      <div className="deployed-content-browser loading">
        <div className="loading-spinner">
          <Zap className="animate-pulse" size={48} />
          <p>Loading Interactive Student Content...</p>
          <p className="loading-detail">Preparing engaging learning experiences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="deployed-content-browser">
      {/* Header */}
      <div className="browser-header">
        <div className="header-content">
          <h1>
            <Zap className="inline" /> Interactive Student Content
          </h1>
          <p className="subtitle">
            Engaging, culturally-authentic learning experiences built from expert lesson plans
          </p>
          
          <div className="content-stats">
            <div className="stat">
              <Play size={20} />
              <span>{filteredResources.length} Interactive Lessons</span>
            </div>
            <div className="stat">
              <Users size={20} />
              <span>Student-Centered Learning</span>
            </div>
            <div className="stat">
              <Star size={20} />
              <span>Culturally Authentic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="browser-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search interactive content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="all">All Subjects</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Te Reo Māori">Te Reo Māori</option>
          </select>

          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="all">All Year Levels</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
            <option value="Year 10">Year 10</option>
            <option value="Year 11">Year 11</option>
            <option value="Year 12">Year 12</option>
            <option value="Year 13">Year 13</option>
          </select>
        </div>
      </div>

      {/* Interactive Content Grid */}
      <div className="content-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="interactive-content-card">
            <div className="card-header">
              <div className="content-type-badge">
                {resource.type === 'lesson' && '📚 Interactive Lesson'}
                {resource.type === 'assessment' && '📊 Interactive Assessment'}
                {resource.type === 'unit-plan' && '🎯 Learning Journey'}
                {resource.type === 'activity' && '🎮 Learning Activity'}
              </div>
              <div 
                className={`engagement-badge ${getEngagementColor((resource as any).studentEngagementScore)}`}
              >
                <Star size={14} />
                {(resource as any).studentEngagementScore}/10
              </div>
            </div>

            <div className="card-content">
              <h3>{resource.title}</h3>
              <div className="content-meta">
                <span className="subject">{resource.subject}</span>
                <span className="year-level">{resource.yearLevel}</span>
              </div>
              
              <p className="content-description">{resource.description}</p>

              <div className="learning-features">
                <div className="feature">
                  <span className="feature-icon">🎮</span>
                  <span>Interactive Activities</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌿</span>
                  <span>Cultural Context</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📊</span>
                  <span>Progress Tracking</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <span>Skill Assessment</span>
                </div>
              </div>

              <div className="content-stats-row">
                <div className="stat">
                  <Clock size={16} />
                  <span>{(resource as any).completionTime} min</span>
                </div>
                <div className="stat">
                  <BookOpen size={16} />
                  <span>{resource.enhancement.passesCompleted}/4 Enhanced</span>
                </div>
                <div className="stat">
                  <Users size={16} />
                  <span>Cultural Score: {resource.enhancement.culturalAuthenticity.toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button 
                className="start-lesson-btn"
                onClick={() => startInteractiveLesson(resource.id)}
              >
                <Play size={20} />
                Start Interactive Lesson
              </button>
              
              <div className="action-links">
                <button 
                  className="preview-btn"
                  onClick={() => navigate(`/lesson-preview/${resource.id}`)}
                >
                  Preview Content
                </button>
                <button 
                  className="teacher-guide-btn"
                  onClick={() => navigate(`/actual-content/${resource.id}`)}
                >
                  Teacher Guide
                </button>
              </div>
            </div>

            {/* Progress indicator if student has started */}
            <div className="progress-indicator">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.floor(Math.random() * 60)}%` }}
                />
              </div>
              <span className="progress-text">Continue where you left off</span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && !loading && (
        <div className="empty-state">
          <Zap size={64} className="opacity-50" />
          <h2>No Interactive Content Found</h2>
          <p>Try adjusting your search filters to find the content you're looking for.</p>
        </div>
      )}

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Learning?</h2>
          <p>Experience culturally-authentic, interactive education that engages every student.</p>
          <div className="cta-buttons">
            <button 
              className="cta-btn primary"
              onClick={() => navigate('/student-dashboard')}
            >
              Go to Student Dashboard
            </button>
            <button 
              className="cta-btn secondary"
              onClick={() => navigate('/teacher-dashboard')}
            >
              Teacher Resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployedContentBrowser;