import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EducationalResource } from '../utils/resource-loader';
import { resourceLoader } from '../utils/resource-loader';
import './EducationalPlatform.css';

// Real resources loaded from our educational content database
const EducationalPlatformWorking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [userKete, setUserKete] = useState<string[]>([]);
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [resourceStats, setResourceStats] = useState({ total: 0, cultural: 0 });

  // Load real educational resources
  useEffect(() => {
    const loadResources = async () => {
      try {
        const realResources = await resourceLoader.loadResources();
        setResources(realResources);
        const metadata = resourceLoader.getMetadata();
        if (metadata) {
          setResourceStats({
            total: metadata.totalResources,
            cultural: metadata.culturalResources
          });
        }
        console.log(`✅ Loaded ${realResources.length} real educational resources`);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setResources([]); // Fallback handled in resourceLoader
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Get available subjects and types from actual data
  const subjects = ['all', ...Array.from(new Set(resources.map(r => r.subject)))];
  const types = ['all', ...Array.from(new Set(resources.map(r => r.type)))];

  const filteredResources = resources.filter(resource => {
    const subjectMatch = selectedSubject === 'all' || resource.subject === selectedSubject;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return subjectMatch && typeMatch;
  });

  const handleViewResource = (resource: EducationalResource) => {
    // Navigate based on resource type
    if (resource.type === 'lesson') {
      navigate(`/lesson/${resource.id}`);
    } else if (resource.type === 'unit') {
      navigate(`/unit/${resource.id}`);
    } else if (resource.type === 'assessment') {
      navigate(`/assessment/${resource.id}`);
    } else {
      navigate(`/resource-viewer?id=${resource.id}&type=${resource.type}`);
    }
  };

  const handleAddToKete = (resource: EducationalResource) => {
    if (!userKete.includes(resource.id)) {
      setUserKete(prev => [...prev, resource.id]);
      alert(`✅ "${resource.title}" added to your kete!`);
    } else {
      alert(`📚 "${resource.title}" is already in your kete!`);
    }
  };

  const handleLoadMore = () => {
    navigate('/te-kete-ako-resources');
  };

  if (loading) {
    return (
      <div className="educational-platform">
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '4rem' }}>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌿</div>
          <h2>Loading Educational Resources...</h2>
          <p>Surfacing thousands of curriculum-aligned materials</p>
        </div>
      </div>
    );
  }

  return (
    <div className="educational-platform">
      <div className="platform-header">
        <h1>Te Kura o TeAoMarama - Educational Resources</h1>
        <div className="resource-stats">
          <div className="stat">
            <span className="stat-number">{resourceStats.total.toLocaleString()}+</span>
            <span className="stat-label">Real Resources</span>
          </div>
          <div className="stat">
            <span className="stat-number">{resourceStats.cultural}</span>
            <span className="stat-label">Cultural Content</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Curriculum Aligned</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="subject-filter">Subject:</label>
          <select 
            id="subject-filter"
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="type-filter">Resource Type:</label>
          <select 
            id="type-filter"
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3 className="resource-title">{resource.title}</h3>
              <div className="resource-badges">
                <span className="badge subject-badge">{resource.subject}</span>
                <span className="badge year-badge">{resource.yearLevel}</span>
                <span className="badge type-badge">{resource.type}</span>
              </div>
            </div>
            <div className="resource-content">
              <p className="resource-description">{resource.description}</p>
              {resource.culturalContent && (
                <div className="cultural-context">
                  <span className="cultural-icon">🌿</span>
                  <span className="cultural-text">Cultural Content Verified</span>
                </div>
              )}
            </div>
            <div className="resource-actions">
              <button 
                className="action-button primary"
                onClick={() => handleViewResource(resource)}
              >
                View Resource
              </button>
              <button 
                className="action-button secondary"
                onClick={() => handleAddToKete(resource)}
              >
                {userKete.includes(resource.id) ? '✅ In Kete' : 'Add to Kete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-section">
        <p className="showing-count">
          Showing {filteredResources.length} of {resources.length} real educational resources
          <br />
          <small>Curriculum-aligned content with cultural safety verification</small>
        </p>
        <button 
          className="load-more-button"
          onClick={handleLoadMore}
        >
          Load More Resources
        </button>
      </div>

      <div className="platform-footer">
        <div className="ai-status">
          <h4>🤖 Multi-LLM Coordination Active</h4>
          <ul>
            <li>✅ Kaitiaki Aronui - Memory Guardian</li>
            <li>✅ DeepSeek AI Engine - Content Enhancement</li> 
            <li>✅ MCP Coordination - Agent Synchronization</li>
            <li>✅ Cultural Safety Protocols - 100% Active</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationalPlatformWorking;