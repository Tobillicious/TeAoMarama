import React, { useEffect, useState } from 'react';
import './EducationalPlatform.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: string;
  culturalContext: string;
  description?: string;
  learningObjectives?: string[];
  activities?: string[];
}

const EducationalPlatformWorking: React.FC = () => {
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    const loadRealAndSampleResources = async () => {
      try {
        setLoading(true);
        
        // Try to load real content first
        const realResources: EducationalResource[] = [];
        
        try {
          // Load a few real lessons from the content directory
          const lessonFiles = import.meta.glob('../content/lessons/*.json', { eager: false });
          const lessonPaths = Object.keys(lessonFiles).slice(0, 10);
          
          for (const path of lessonPaths) {
            try {
              const module: any = await lessonFiles[path]();
              const lesson = module.default || module;
              if (lesson && lesson.title) {
                realResources.push({
                  id: lesson.id || `real-${realResources.length}`,
                  title: lesson.title,
                  subject: lesson.subject || 'General',
                  yearLevel: lesson.yearLevel || 'Mixed',
                  type: lesson.type || 'lesson',
                  culturalContext: lesson.culturalContext || 'New Zealand context',
                  description: lesson.description || lesson.learningObjectives?.[0] || 'Educational resource',
                  learningObjectives: lesson.learningObjectives || [],
                  activities: lesson.activities || []
                });
              }
            } catch (err) {
              console.warn('Failed to load lesson:', path, err);
            }
          }
        } catch (err) {
          console.warn('Failed to load real content, using samples:', err);
        }

        // Add sample resources to fill out the display
        const sampleResources: EducationalResource[] = [
        {
          id: '1',
          title: 'Year 8 Mathematics: Understanding Cultural Context',
          subject: 'Mathematics',
          yearLevel: 'Year 8',
          type: 'lesson',
          culturalContext: 'Cultural rights and community responsibilities',
          description: 'Develop deep understanding of mathematics concepts in cultural context',
          learningObjectives: [
            'Apply traditional knowledge to modern mathematics challenges',
            'Analyze environmental impacts through mathematics frameworks',
            'Engage with community perspectives on mathematics issues'
          ],
          activities: [
            'Cultural mapping and mathematics analysis',
            'Traditional knowledge workshop',
            'Community interview project'
          ]
        },
        {
          id: '2', 
          title: 'Te Reo Māori Integration in Science',
          subject: 'Science',
          yearLevel: 'Year 7',
          type: 'activity',
          culturalContext: 'Traditional Māori knowledge systems',
          description: 'Explore scientific concepts through Te Reo Māori and tikanga',
          learningObjectives: [
            'Connect traditional knowledge with modern science',
            'Use Te Reo Māori scientific terminology',
            'Understand cultural perspectives on environmental science'
          ]
        },
        {
          id: '3',
          title: 'New Zealand History Assessment Framework',
          subject: 'Social Studies',
          yearLevel: 'Year 9',
          type: 'assessment',
          culturalContext: 'Aotearoa New Zealand history and identity',
          description: 'Assessment framework for understanding NZ historical contexts',
          learningObjectives: [
            'Analyze historical events from multiple perspectives',
            'Understand the impact of colonization',
            'Explore concepts of identity and belonging'
          ]
        }
      ];
        
        // Combine real and sample resources
        const allResources = [...realResources, ...sampleResources];
        console.log(`Loaded ${realResources.length} real resources and ${sampleResources.length} sample resources`);
        
        setResources(allResources);
        setLoading(false);
      } catch (err) {
        console.error('Error loading resources:', err);
        setError('Failed to load educational resources');
        setLoading(false);
      }
    };

    loadRealAndSampleResources();
  }, []);

  const filteredResources = resources.filter(resource => 
    selectedSubject === 'all' || resource.subject === selectedSubject
  );

  const subjects = ['all', ...Array.from(new Set(resources.map(r => r.subject)))];

  if (loading) {
    return (
      <div className="educational-platform">
        <div className="platform-header">
          <h1>📚 Te Kura o TeAoMarama</h1>
          <p>Loading educational resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="educational-platform">
        <div className="platform-header">
          <h1>📚 Te Kura o TeAoMarama</h1>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="educational-platform">
      <div className="platform-header">
        <h1>📚 Te Kura o TeAoMarama</h1>
        <p>Educational Resources for Aotearoa New Zealand</p>
        <div className="resource-stats">
          <span className="stat-item">
            <strong>{resources.length}</strong> Resources Available
          </span>
          <span className="stat-item">
            <strong>{subjects.length - 1}</strong> Subjects
          </span>
        </div>
      </div>

      <div className="platform-controls">
        <div className="subject-filter">
          <label htmlFor="subject-select">Filter by Subject:</label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3>{resource.title}</h3>
              <div className="resource-meta">
                <span className="subject-tag">{resource.subject}</span>
                <span className="year-tag">{resource.yearLevel}</span>
                <span className="type-tag">{resource.type}</span>
              </div>
            </div>
            
            <div className="resource-content">
              {resource.description && (
                <p className="resource-description">{resource.description}</p>
              )}
              
              <div className="cultural-context">
                <strong>Cultural Context:</strong>
                <p>{resource.culturalContext}</p>
              </div>

              {resource.learningObjectives && (
                <div className="learning-objectives">
                  <strong>Learning Objectives:</strong>
                  <ul>
                    {resource.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              )}

              {resource.activities && (
                <div className="activities">
                  <strong>Activities:</strong>
                  <ul>
                    {resource.activities.slice(0, 3).map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="resource-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Download</button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="no-resources">
          <h3>No resources found</h3>
          <p>Try selecting a different subject filter.</p>
        </div>
      )}
    </div>
  );
};

export default EducationalPlatformWorking;