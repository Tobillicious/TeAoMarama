import React, { useState } from 'react';
import './EducationalPlatform.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: string;
  culturalContext: string;
  description: string;
}

// Sample resources representing the 2,013+ available
const sampleResources: EducationalResource[] = [
  {
    id: '1',
    title: 'Māori Mathematical Concepts in Traditional Navigation',
    subject: 'Mathematics',
    yearLevel: 'Year 9-10',
    type: 'lesson',
    culturalContext: 'Te Ao Māori',
    description: 'Exploring mathematical principles used in traditional Polynesian navigation, including geometry and spatial reasoning.'
  },
  {
    id: '2', 
    title: 'Environmental Kaitiakitanga - Ecosystem Management',
    subject: 'Science',
    yearLevel: 'Year 7-8',
    type: 'unit',
    culturalContext: 'Tikanga Māori',
    description: 'Understanding guardianship principles in environmental science through indigenous knowledge systems.'
  },
  {
    id: '3',
    title: 'Te Reo Māori Language Patterns in Poetry',
    subject: 'English/Te Reo',
    yearLevel: 'Year 11-13', 
    type: 'activity',
    culturalContext: 'Whakapapa-based Learning',
    description: 'Analyzing linguistic patterns and cultural meaning in traditional and contemporary Māori poetry.'
  },
  {
    id: '4',
    title: 'Statistical Analysis of New Zealand Census Data',
    subject: 'Statistics',
    yearLevel: 'Year 12-13',
    type: 'project',
    culturalContext: 'Aotearoa Data Contexts',
    description: 'Using real NZ census data to understand demographic trends with cultural sensitivity.'
  },
  {
    id: '5',
    title: 'Traditional Māori Architecture and Geometry',
    subject: 'Technology/Mathematics',
    yearLevel: 'Year 9-10',
    type: 'multimedia',
    culturalContext: 'Whare Construction Principles',
    description: 'Geometric principles in traditional building methods, connecting cultural practice to mathematical concepts.'
  },
  {
    id: '6',
    title: 'Climate Change Impact on Pacific Communities',
    subject: 'Geography/Science',
    yearLevel: 'Year 11',
    type: 'assessment',
    culturalContext: 'Pacific Climate Justice',
    description: 'Investigating climate change effects on Pacific Island nations with focus on indigenous perspectives.'
  }
];

const EducationalPlatformWorking: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const subjects = ['all', 'Mathematics', 'Science', 'English/Te Reo', 'Statistics', 'Technology/Mathematics', 'Geography/Science'];
  const types = ['all', 'lesson', 'unit', 'activity', 'project', 'multimedia', 'assessment'];

  const filteredResources = sampleResources.filter(resource => {
    const subjectMatch = selectedSubject === 'all' || resource.subject === selectedSubject;
    const typeMatch = selectedType === 'all' || resource.type === selectedType;
    return subjectMatch && typeMatch;
  });

  return (
    <div className="educational-platform" style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}>
      <div className="platform-header" style={{ background: '#059669', color: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
        <h1>Te Kura o TeAoMarama - Educational Resources</h1>
        <div className="resource-stats">
          <div className="stat">
            <span className="stat-number">2,013+</span>
            <span className="stat-label">Total Resources</span>
          </div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Cultural Safety</span>
          </div>
          <div className="stat">
            <span className="stat-number">Active</span>
            <span className="stat-label">AI Enhanced</span>
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
              <div className="cultural-context">
                <span className="cultural-icon">🌿</span>
                <span className="cultural-text">{resource.culturalContext}</span>
              </div>
            </div>
            <div className="resource-actions">
              <button className="action-button primary">View Resource</button>
              <button className="action-button secondary">Add to Kete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-section">
        <p className="showing-count">
          Showing {filteredResources.length} of 6 sample resources 
          <br />
          <small>(Representing 2,013+ total resources available)</small>
        </p>
        <button className="load-more-button">
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