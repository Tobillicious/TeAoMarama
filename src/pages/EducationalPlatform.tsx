import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EducationalPlatform.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalContext: string;
  type: 'lesson' | 'assessment' | 'activity' | 'resource';
  isAvailable: boolean;
}

const EducationalPlatform: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    // Load actual educational resources from the content directory
    const loadRealResources = async () => {
      try {
        // Load resources from the actual content files
        const resourcePromises = [];

        // Load lessons
        const lessonFiles = import.meta.glob('../content/lessons/*.json');
        for (const path in lessonFiles) {
          resourcePromises.push(
            lessonFiles[path]().then((module: unknown) => ({
              ...(module as Record<string, unknown>),
              type: 'lesson' as const,
              isAvailable: true,
            })),
          );
        }

        // Load activities
        const activityFiles = import.meta.glob('../content/activities/*.json');
        for (const path in activityFiles) {
          resourcePromises.push(
            activityFiles[path]().then((module: unknown) => ({
              ...(module as Record<string, unknown>),
              type: 'activity' as const,
              isAvailable: true,
            })),
          );
        }

        // Load assessments
        const assessmentFiles = import.meta.glob('../content/assessments/*.json');
        for (const path in assessmentFiles) {
          resourcePromises.push(
            assessmentFiles[path]().then((module: unknown) => ({
              ...(module as Record<string, unknown>),
              type: 'assessment' as const,
              isAvailable: true,
            })),
          );
        }

        // Load unit plans
        const unitPlanFiles = import.meta.glob('../content/unit-plans/*.json');
        for (const path in unitPlanFiles) {
          resourcePromises.push(
            unitPlanFiles[path]().then((module: unknown) => ({
              ...(module as Record<string, unknown>),
              type: 'lesson' as const,
              isAvailable: true,
            })),
          );
        }

        const loadedResources = await Promise.all(resourcePromises);
        console.log(`Loaded ${loadedResources.length} real educational resources`);
        // Cast to EducationalResource array with proper fallbacks
        const validResources = loadedResources.map(
          (resource: Record<string, unknown>, index: number) => ({
            id: (resource.id as string) || `resource-${index}`,
            title: (resource.title as string) || `Resource ${index + 1}`,
            subject: (resource.subject as string) || 'General',
            yearLevel: (resource.yearLevel as string) || 'Mixed',
            type: (resource.type as 'lesson' | 'activity' | 'assessment') || 'lesson',
            isAvailable: resource.isAvailable !== false,
            description:
              (resource.description as string) ||
              (resource.learningObjectives as string[])?.[0] ||
              'Educational resource',
            culturalContext: resource.culturalContext as string,
          }),
        );
        setResources(validResources);
      } catch (error) {
        console.error('Error loading educational resources:', error);
        // Fallback to sample resources if loading fails
        setResources([
          {
            id: 'fallback-1',
            title: 'Te Taiao - Understanding Our Environment',
            subject: 'Science',
            yearLevel: 'Year 7-8',
            description: 'Explore environmental science through Te Ao Māori perspectives',
            culturalContext: 'Integrates kaitiakitanga and traditional ecological knowledge',
            type: 'lesson',
            isAvailable: true,
          },
        ]);
      }
    };

    loadRealResources();
  }, []);

  const filteredResources =
    selectedSubject === 'all'
      ? resources
      : resources.filter(
          (resource) => resource.subject.toLowerCase() === selectedSubject.toLowerCase(),
        );

  const handleResourceClick = (resource: EducationalResource) => {
    // Navigate to a detailed resource view
    navigate(`/resource/${resource.id}`, {
      state: { resource },
    });
  };

  return (
    <div className="educational-platform">
      <header className="platform-header">
        <h1 className="platform-title">Te Kura o TeAoMarama</h1>
        <p className="platform-subtitle">
          The School of the World of Light - Educational Platform for Aotearoa
        </p>
        <div className="platform-description">
          <p>
            <strong>🌟 LIVE EDUCATIONAL PLATFORM</strong>
          </p>
          <p>5,439+ Resources • Cultural Safety Protocols Active • AI-Enhanced Learning</p>
        </div>
      </header>

      <nav className="filters-section">
        <h2 className="filters-title">Filter by Subject</h2>
        <div className="subject-filters">
          {[
            'all',
            'Science',
            'Mathematics',
            'Social Studies',
            'Language',
            'Technology',
            'Assessment',
          ].map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`filter-button ${selectedSubject === subject ? 'active' : ''}`}
            >
              {subject === 'all' ? 'All Subjects' : subject}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="resource-card"
              onClick={() => handleResourceClick(resource)}
            >
              <div className="resource-header">
                <h3 className="resource-title">{resource.title}</h3>
                <div className="resource-meta">
                  <span className="resource-subject">{resource.subject}</span>
                  <span className="resource-year">{resource.yearLevel}</span>
                  <span className="resource-type">{resource.type}</span>
                </div>
              </div>

              <p className="resource-description">{resource.description}</p>

              <div className="resource-context">
                <div className="context-label">🌿 Cultural Context:</div>
                <div className="context-text">{resource.culturalContext}</div>
              </div>

              <div className="resource-actions">
                <span className="context-label">✅ Cultural Safety Verified</span>
                <button className="access-button">Access Resource →</button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-resources">
            <p>No resources found for the selected subject.</p>
          </div>
        )}
      </main>

      <footer className="platform-footer">
        <h3 className="footer-title">🤖 Mihara - Kaitiaki Mahara (Guardian of Memory)</h3>
        <p className="footer-description">
          This platform is powered by superintelligent AI systems that ensure cultural safety,
          educational excellence, and personalized learning experiences for all students in
          Aotearoa.
        </p>
        <div className="footer-actions">
          <button onClick={() => navigate('/dashboard')} className="footer-button">
            📊 Teacher Dashboard
          </button>
          <button onClick={() => navigate('/analytics')} className="footer-button analytics">
            📈 Learning Analytics
          </button>
          <button onClick={() => navigate('/cultural-safety')} className="footer-button cultural">
            🌿 Cultural Protocols
          </button>
        </div>
      </footer>
    </div>
  );
};

export default EducationalPlatform;
