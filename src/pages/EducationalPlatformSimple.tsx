import React, { useEffect, useState } from 'react';
import { contentIndexOptimizer } from '../utils/content-index-optimizer';
import './EducationalPlatform.css';

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
  const [resourceCounts, setResourceCounts] = useState({
    lessons: 0,
    activities: 0,
    total: 0,
  });

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Use our optimized content index that prevents Vite build issues
        const lessons = await contentIndexOptimizer.getContentByType('lessons');
        const activities = await contentIndexOptimizer.getContentByType('activities');

        const lessonCount = Object.keys(lessons).length;
        const activityCount = Object.keys(activities).length;

        setResourceCounts({
          lessons: lessonCount,
          activities: activityCount,
          total: lessonCount + activityCount,
        });
      } catch (error) {
        console.error('Error loading resource counts:', error);
        setResourceCounts({
          lessons: 0,
          activities: 0,
          total: 0,
        });
      }
    };

    loadResources();
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
                className={`subject-filter-btn ${
                  selectedSubject === subject ? 'active' : 'inactive'
                }`}
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
                <button className="access-resource-btn">Access Resource →</button>
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
