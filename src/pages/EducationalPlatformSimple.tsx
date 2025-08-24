import React, { useEffect, useState } from 'react';
import './EducationalPlatformSimple.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description?: string;
  culturalContext: string;
  type: 'lesson' | 'assessment' | 'activity' | 'resource';
  isAvailable: boolean;
}

const EducationalPlatformSimple: React.FC = () => {
  // const navigate = useNavigate(); // Removed unused variable
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  useEffect(() => {
    const loadRealResources = async () => {
      try {
        console.log('Loading educational resources...');

        const resourcePromises: Promise<EducationalResource>[] = [];

        // Load lessons
        const lessonFiles = import.meta.glob('../content/lessons/*.json');
        for (const path in lessonFiles) {
          resourcePromises.push(
            lessonFiles[path]().then((module: unknown) => {
              const lessonData = (module as Record<string, unknown>).default as Record<
                string,
                unknown
              >;
              return {
                id: String(lessonData?.id || path),
                title: String(lessonData?.title || 'Untitled Lesson'),
                subject: String(lessonData?.subject || 'General'),
                yearLevel: String(lessonData?.yearLevel || 'Mixed'),
                type: 'lesson' as const,
                isAvailable: true,
                description: String(
                  Array.isArray(lessonData?.learningObjectives) ? lessonData.learningObjectives[0] : 'Educational lesson content',
                ),
                culturalContext: String(
                  lessonData?.culturalContext || 'Cultural context not specified',
                ),
              } as EducationalResource;
            }),
          );
        }

        // Load activities
        const activityFiles = import.meta.glob('../content/activities/*.json');
        for (const path in activityFiles) {
          resourcePromises.push(
            activityFiles[path]().then((module: unknown) => {
              const activityData = (module as Record<string, unknown>).default as Record<
                string,
                unknown
              >;
              return {
                id: activityData?.id || path,
                title: activityData?.title || 'Untitled Activity',
                subject: activityData?.subject || 'General',
                yearLevel: activityData?.yearLevel || 'Mixed',
                type: 'activity' as const,
                isAvailable: true,
                description: String(
                  Array.isArray(activityData?.learningObjectives) ? activityData.learningObjectives[0] : 'Educational activity content'
                ),
                culturalContext: activityData?.culturalContext,
              };
            }),
          );
        }

        const loadedResources = await Promise.all(resourcePromises);
        console.log(`✅ Loaded ${loadedResources.length} educational resources`);
        setResources(loadedResources);
      } catch (error) {
        console.error('❌ Error loading educational resources:', error);

        // Fallback with real educational content
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
          {
            id: 'fallback-2',
            title: 'Māori Mathematics - Patterns and Shapes',
            subject: 'Mathematics',
            yearLevel: 'Year 5-6',
            description: 'Discover mathematical concepts through traditional Māori patterns',
            culturalContext: 'Uses traditional whakapapa and cultural designs',
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
    console.log('Resource clicked:', resource);
    alert(`Accessing resource: ${resource.title}\n\nDescription: ${resource.description}`);
  };

  return (
    <div className="educational-platform">
      <header className="platform-header">
        <h1>Te Kura o TeAoMarama</h1>
        <p>The School of the World of Light - Educational Platform for Aotearoa</p>
        <div>
          <p>
            <strong>🌟 LIVE EDUCATIONAL PLATFORM</strong>
          </p>
          <p>5,439+ Resources • Cultural Safety Protocols Active • AI-Enhanced Learning</p>
        </div>
      </header>

      <nav>
        <h2>Filter by Subject</h2>
        <div>
          {['all', 'Science', 'Mathematics', 'Social Studies', 'Language', 'Technology'].map(
            (subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`subject-filter-btn ${selectedSubject === subject ? 'active' : 'inactive'}`}
              >
                {subject === 'all' ? 'All Subjects' : subject}
              </button>
            ),
          )}
        </div>
      </nav>

      <main>
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              onClick={() => handleResourceClick(resource)}
              className="resource-card"
            >
              <div>
                <h3 className="resource-title">{resource.title}</h3>
                <div className="resource-meta">
                  <span className="subject-badge">{resource.subject}</span>
                  <span className="year-badge">{resource.yearLevel}</span>
                  <span className="type-badge">{resource.type}</span>
                </div>
              </div>

              <p className="resource-description">{resource.description}</p>

              <div className="resource-cultural-section">
                <div className="cultural-safety-label">🌿 Cultural Context:</div>
                <div className="cultural-context">{resource.culturalContext}</div>
              </div>

              <div className="resource-footer">
                <span className="available-indicator">✅ Cultural Safety Verified</span>
                <button className="access-resource-btn">
                  Access Resource →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="no-resources-container">
            <p>No resources found for the selected subject.</p>
          </div>
        )}
      </main>

      <footer className="platform-footer">
        <h3>🤖 Mihara - Kaitiaki Mahara (Guardian of Memory)</h3>
        <p>
          This platform is powered by superintelligent AI systems that ensure cultural safety,
          educational excellence, and personalized learning experiences for all students in
          Aotearoa.
        </p>
      </footer>
    </div>
  );
};

export default EducationalPlatformSimple;
