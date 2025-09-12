import React, { useEffect, useState } from 'react';
import { loadEnhancedResources } from '../utils/enhanced-resource-loader';
import './DeployedContentBrowser.css';

interface DeployedResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  qualityScore: number;
  culturalAuthenticity: number;
  enhancementPasses: string[];
  hasInteractiveContent: boolean;
  estimatedTime: number;
  completionTime: number;
  culturalElements: string[];
  learningObjectives: string[];
  activities: string[];
  materials: string[];
}

const DeployedContentBrowser: React.FC = () => {
  const [resources, setResources] = useState<DeployedResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<DeployedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const enhancedResources = await loadEnhancedResources();

        // Transform enhanced resources to deployed content format
        const deployedContent: DeployedResource[] = enhancedResources
          .slice(0, 50)
          .map((resource) => ({
            id: resource.id,
            title: resource.title,
            subject: resource.subject,
            yearLevel: resource.yearLevel,
            description: resource.description,
            qualityScore: resource.qualityScore || 8.5,
            culturalAuthenticity: resource.culturalAuthenticity || 8.0,
            enhancementPasses: resource.enhancementPasses || [
              'Cultural Authenticity',
              'Progressive Pedagogy',
            ],
            hasInteractiveContent: true,
            estimatedTime: Math.floor(Math.random() * 40) + 20, // 20-60 minutes
            completionTime: Math.floor(Math.random() * 40) + 20, // 20-60 minutes
            culturalElements: resource.culturalElements || ['Tikanga', 'Manaakitanga'],
            learningObjectives: resource.learningObjectives || [
              'Understand key concepts',
              'Apply knowledge',
            ],
            activities: resource.activities || ['Introduction', 'Core Activity', 'Reflection'],
            materials: resource.materials || ['Resource materials', 'Assessment tools'],
          }));

        setResources(deployedContent);
        setFilteredResources(deployedContent);
      } catch (error) {
        console.error('Error loading deployed content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    let filtered = [...resources];

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedSubject) {
      filtered = filtered.filter((resource) => resource.subject === selectedSubject);
    }

    if (selectedYear) {
      filtered = filtered.filter((resource) => resource.yearLevel === selectedYear);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedSubject, selectedYear]);

  const subjects = Array.from(new Set(resources.map((r) => r.subject)));
  const yearLevels = Array.from(new Set(resources.map((r) => r.yearLevel)));

  if (loading) {
    return (
      <div className="deployed-content-browser">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading deployed content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="deployed-content-browser">
      <div className="browser-header">
        <h1>📚 Deployed Content Browser</h1>
        <p>Explore our complete library of deployed educational resources</p>
      </div>

      <div className="browser-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option value="">All Year Levels</option>
            {yearLevels.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3>{resource.title}</h3>
              <div className="resource-meta">
                <span className="subject">{resource.subject}</span>
                <span className="year-level">{resource.yearLevel}</span>
              </div>
            </div>

            <div className="resource-content">
              <p className="description">{resource.description}</p>

              <div className="resource-stats">
                <div className="stat">
                  <span className="stat-label">Quality Score:</span>
                  <span className="stat-value">{resource.qualityScore}/15</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Cultural Authenticity:</span>
                  <span className="stat-value">{resource.culturalAuthenticity}/10</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Estimated Time:</span>
                  <span className="stat-value">{resource.estimatedTime} min</span>
                </div>
              </div>

              <div className="enhancement-passes">
                <h4>Enhancement Passes:</h4>
                <div className="passes-list">
                  {resource.enhancementPasses.map((pass, index) => (
                    <span key={index} className="pass-badge">
                      {pass}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cultural-elements">
                <h4>Cultural Elements:</h4>
                <div className="elements-list">
                  {resource.culturalElements.map((element, index) => (
                    <span key={index} className="element-badge">
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="resource-actions">
              <button className="action-button primary">View Full Content</button>
              <button className="action-button secondary">Download</button>
              <button className="action-button secondary">Share</button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && !loading && (
        <div className="no-resources">
          <h3>No resources found</h3>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      )}

      <div className="browser-footer">
        <div className="resource-summary">
          <p>
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        <div className="browser-actions">
          <button className="action-button">Export Results</button>
          <button className="action-button">Advanced Search</button>
        </div>
      </div>
    </div>
  );
};

export default DeployedContentBrowser;
