import { Award, BookOpen, Brain, Heart, Star, Users, Zap } from 'lucide-react';
import React, { useState } from 'react';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import './ResourceContentDisplay.css';

interface ResourceContentDisplayProps {
  resource: EnhancedResource;
  activePass: number;
  onPassChange: (pass: number) => void;
}

const ResourceContentDisplay: React.FC<ResourceContentDisplayProps> = ({
  resource,
  activePass,
  onPassChange,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'enhancement' | 'cultural' | 'pedagogical'
  >('overview');

  const getQualityColor = (score: number, max: number = 10): string => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return '#10b981'; // Green
    if (percentage >= 70) return '#f59e0b'; // Yellow
    if (percentage >= 50) return '#3b82f6'; // Blue
    return '#ef4444'; // Red
  };

  const getQualityLevel = (score: number, max: number = 10): string => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'Excellence';
    if (percentage >= 70) return 'High Quality';
    if (percentage >= 50) return 'Good Quality';
    return 'Developing';
  };

  const currentPass = resource.enhancement.passes[activePass];

  return (
    <div className="resource-content-display">
      {/* Header with Quality Metrics */}
      <div className="content-header">
        <div className="quality-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <Star className="w-6 h-6" />
            </div>
            <div className="metric-content">
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(resource.enhancement.qualityScore, 15) }}
              >
                {resource.enhancement.qualityScore.toFixed(1)}/15
              </div>
              <div className="metric-label">Overall Quality</div>
              <div className="metric-level">
                {getQualityLevel(resource.enhancement.qualityScore, 15)}
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Heart className="w-6 h-6" />
            </div>
            <div className="metric-content">
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(resource.enhancement.culturalAuthenticity) }}
              >
                {resource.enhancement.culturalAuthenticity.toFixed(1)}/10
              </div>
              <div className="metric-label">Cultural Authenticity</div>
              <div className="metric-level">
                {getQualityLevel(resource.enhancement.culturalAuthenticity)}
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Brain className="w-6 h-6" />
            </div>
            <div className="metric-content">
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(resource.enhancement.pedagogicalDepth) }}
              >
                {resource.enhancement.pedagogicalDepth.toFixed(1)}/10
              </div>
              <div className="metric-label">Pedagogical Depth</div>
              <div className="metric-level">
                {getQualityLevel(resource.enhancement.pedagogicalDepth)}
              </div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <Zap className="w-6 h-6" />
            </div>
            <div className="metric-content">
              <div
                className="metric-value"
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getQualityColor(resource.enhancement.progressiveIndex) }}
              >
                {resource.enhancement.progressiveIndex.toFixed(1)}/10
              </div>
              <div className="metric-label">Progressive Index</div>
              <div className="metric-level">
                {getQualityLevel(resource.enhancement.progressiveIndex)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="content-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BookOpen className="w-4 h-4" />
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'enhancement' ? 'active' : ''}`}
          onClick={() => setActiveTab('enhancement')}
        >
          <Award className="w-4 h-4" />
          Enhancement Journey
        </button>
        <button
          className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
          onClick={() => setActiveTab('cultural')}
        >
          <Heart className="w-4 h-4" />
          Cultural Integration
        </button>
        <button
          className={`tab-button ${activeTab === 'pedagogical' ? 'active' : ''}`}
          onClick={() => setActiveTab('pedagogical')}
        >
          <Users className="w-4 h-4" />
          Pedagogical Approach
        </button>
      </div>

      {/* Content Sections */}
      <div className="content-sections">
        {activeTab === 'overview' && (
          <div className="content-section">
            <h3>📚 Resource Overview</h3>
            <div className="overview-grid">
              <div className="overview-card">
                <h4>Basic Information</h4>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Subject:</span>
                    <span className="info-value">{resource.subject}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Year Level:</span>
                    <span className="info-value">{resource.yearLevel}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Type:</span>
                    <span className="info-value">{resource.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Cultural Elements:</span>
                    <span className="info-value">{resource.culturalElements}</span>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h4>Learning Details</h4>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Difficulty:</span>
                    <span className="info-value">{resource.metadata.difficulty}/10</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Duration:</span>
                    <span className="info-value">
                      {resource.metadata.estimatedDuration} minutes
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Current Pass:</span>
                    <span className="info-value">{resource.currentPass}/4</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Enhancement Status:</span>
                    <span className="info-value">
                      {resource.enhancement.passesCompleted}/4 Complete
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="description-section">
              <h4>📖 Description</h4>
              <p className="description-text">{resource.description}</p>
            </div>

            <div className="tags-section">
              <h4>🏷️ Tags</h4>
              <div className="tags-container">
                {resource.metadata.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'enhancement' && (
          <div className="content-section">
            <h3>🔄 Enhancement Journey</h3>
            <div className="enhancement-timeline">
              {resource.enhancement.passes.map((pass, index) => (
                <div
                  key={index}
                  className={`timeline-item ${index === activePass ? 'active' : ''} ${
                    index < activePass ? 'completed' : ''
                  }`}
                  onClick={() => onPassChange(index)}
                >
                  <div className="timeline-marker">
                    <div className="marker-number">{pass.passNumber}</div>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{pass.specialization}</h4>
                      <span className="kaiako-name">Enhanced by {pass.kaiako}</span>
                    </div>
                    <div className="timeline-metrics">
                      <div className="metric">
                        <span className="metric-label">Quality Improvement:</span>
                        <span className="metric-value">+{pass.qualityImprovement.toFixed(1)}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Completed:</span>
                        <span className="metric-value">
                          {new Date(pass.timeCompleted).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {index === activePass && (
                      <div className="timeline-details">
                        <h5>Enhanced Content Highlights:</h5>
                        <div className="enhanced-content-preview">
                          {pass.enhancedContent &&
                            Object.entries(pass.enhancedContent)
                              .slice(0, 3)
                              .map(([key, value]) => (
                                <div key={key} className="content-highlight">
                                  <strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>
                                  <span>
                                    {typeof value === 'object'
                                      ? 'Complex content structure'
                                      : String(value).substring(0, 100)}
                                    ...
                                  </span>
                                </div>
                              ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="content-section">
            <h3>🌿 Cultural Integration</h3>
            <div className="cultural-content">
              <div className="cultural-overview">
                <h4>
                  Cultural Authenticity Score:{' '}
                  {resource.enhancement.culturalAuthenticity.toFixed(1)}/10
                </h4>
                <p>
                  This resource incorporates {resource.culturalElements} cultural elements
                  connecting learning to Te Ao Māori perspectives.
                </p>
              </div>

              {currentPass?.enhancedContent && (
                <div className="cultural-details">
                  <h4>Cultural Elements in Current Pass:</h4>
                  {Object.entries(currentPass.enhancedContent).map(([key, value]) => {
                    if (
                      key.toLowerCase().includes('cultural') ||
                      key.toLowerCase().includes('tikanga') ||
                      key.toLowerCase().includes('māori')
                    ) {
                      return (
                        <div key={key} className="cultural-element">
                          <h5>{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                          <div className="cultural-content-detail">
                            {typeof value === 'object' ? (
                              <pre>{JSON.stringify(value, null, 2)}</pre>
                            ) : (
                              <p>{String(value)}</p>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'pedagogical' && (
          <div className="content-section">
            <h3>🎓 Pedagogical Approach</h3>
            <div className="pedagogical-content">
              <div className="pedagogical-overview">
                <h4>
                  Pedagogical Depth Score: {resource.enhancement.pedagogicalDepth.toFixed(1)}/10
                </h4>
                <p>
                  This resource employs progressive pedagogical approaches designed to enhance
                  learning outcomes through innovative teaching methods.
                </p>
              </div>

              {currentPass?.enhancedContent && (
                <div className="pedagogical-details">
                  <h4>Pedagogical Elements in Current Pass:</h4>
                  {Object.entries(currentPass.enhancedContent).map(([key, value]) => {
                    if (
                      key.toLowerCase().includes('pedagogical') ||
                      key.toLowerCase().includes('learning') ||
                      key.toLowerCase().includes('teaching') ||
                      key.toLowerCase().includes('student')
                    ) {
                      return (
                        <div key={key} className="pedagogical-element">
                          <h5>{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                          <div className="pedagogical-content-detail">
                            {typeof value === 'object' ? (
                              <pre>{JSON.stringify(value, null, 2)}</pre>
                            ) : (
                              <p>{String(value)}</p>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceContentDisplay;
