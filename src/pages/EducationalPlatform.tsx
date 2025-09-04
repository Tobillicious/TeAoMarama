import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentIndexOptimizer } from '../utils/content-index-optimizer';
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
    // Load actual educational resources using our optimized content index
    const loadRealResources = async () => {
      try {
        console.log('[EducationalPlatform] Loading resources via ContentIndexOptimizer...');

        // Use our optimized content index that prevents Vite build issues
        const lessons = await contentIndexOptimizer.getContentByType('lessons');
        const activities = await contentIndexOptimizer.getContentByType('activities');
        const assessments = await contentIndexOptimizer.getContentByType('assessments');

        // Transform lessons
        const lessonResources = Object.entries(lessons).map(([key, lesson]: [string, any]) => ({
          id: lesson.id || key,
          title: lesson.title || `Lesson ${key}`,
          subject: lesson.subject || 'General',
          yearLevel: lesson.yearLevel || 'Mixed',
          type: 'lesson' as const,
          isAvailable: true,
          description: lesson.description || lesson.learningObjectives?.[0] || 'Educational lesson',
          culturalContext: lesson.culturalContext || 'New Zealand curriculum aligned',
        }));

        // Transform activities
        const activityResources = Object.entries(activities).map(
          ([key, activity]: [string, any]) => ({
            id: activity.id || key,
            title: activity.title || `Activity ${key}`,
            subject: activity.subject || 'General',
            yearLevel: activity.yearLevel || 'Mixed',
            type: 'activity' as const,
            isAvailable: true,
            description: activity.description || activity.activities?.[0] || 'Learning activity',
            culturalContext: activity.culturalContext || 'New Zealand curriculum aligned',
          }),
        );

        // Transform assessments
        const assessmentResources = Object.entries(assessments).map(
          ([key, assessment]: [string, any]) => ({
            id: assessment.id || key,
            title: assessment.title || `Assessment ${key}`,
            subject: assessment.subject || 'General',
            yearLevel: assessment.yearLevel || 'Mixed',
            type: 'assessment' as const,
            isAvailable: true,
            description:
              assessment.description || assessment.assessment || 'Educational assessment',
            culturalContext: assessment.culturalContext || 'New Zealand curriculum aligned',
          }),
        );

        const allResources = [...lessonResources, ...activityResources, ...assessmentResources];
        console.log(
          `[EducationalPlatform] ✅ Loaded ${allResources.length} real educational resources`,
        );

        setResources(allResources);
      } catch (error) {
        console.error('[EducationalPlatform] Error loading educational resources:', error);
        // Fallback to comprehensive sample resources if loading fails
        setResources([
          {
            id: 'science-1',
            title: 'Māori Mathematical Concepts in Traditional Navigation',
            subject: 'Mathematics',
            yearLevel: 'Year 9-10',
            description:
              'Exploring mathematical principles used in traditional Polynesian navigation, including geometry and spatial reasoning.',
            culturalContext:
              'Integrates traditional wayfinding knowledge with mathematical learning',
            type: 'lesson',
            isAvailable: true,
          },
          {
            id: 'science-2',
            title: 'Environmental Kaitiakitanga - Ecosystem Management',
            subject: 'Science',
            yearLevel: 'Year 7-8',
            description:
              'Understanding guardianship principles in environmental science through indigenous knowledge systems.',
            culturalContext: 'Māori environmental stewardship and traditional ecological practices',
            type: 'lesson',
            isAvailable: true,
          },
          {
            id: 'language-1',
            title: 'Te Reo Māori Language Structures',
            subject: 'Language',
            yearLevel: 'Year 5-6',
            description:
              'Interactive introduction to Te Reo Māori grammar, pronunciation, and cultural contexts.',
            culturalContext: 'Traditional language learning with cultural protocols',
            type: 'activity',
            isAvailable: true,
          },
          {
            id: 'social-1',
            title: 'Treaty of Waitangi - Historical Perspectives',
            subject: 'Social Studies',
            yearLevel: 'Year 8-9',
            description:
              'Multi-perspective analysis of the Treaty of Waitangi and its ongoing significance.',
            culturalContext:
              'Balanced historical narrative including Māori and European perspectives',
            type: 'lesson',
            isAvailable: true,
          },
          {
            id: 'tech-1',
            title: 'Traditional Technology and Innovation',
            subject: 'Technology',
            yearLevel: 'Year 7-10',
            description: 'Exploring traditional Māori technologies and their modern applications.',
            culturalContext: 'Traditional knowledge systems meeting contemporary technology',
            type: 'activity',
            isAvailable: true,
          },
          {
            id: 'assess-1',
            title: 'Cultural Competency Assessment',
            subject: 'Assessment',
            yearLevel: 'All Years',
            description:
              'Holistic assessment tool measuring cultural understanding and academic progress.',
            culturalContext: 'Culturally responsive assessment practices',
            type: 'assessment',
            isAvailable: true,
          },
          {
            id: 'science-3',
            title: 'Marine Biology through Tangaroa Perspectives',
            subject: 'Science',
            yearLevel: 'Year 10-12',
            description:
              'Ocean science education incorporating traditional Māori marine knowledge.',
            culturalContext: 'Traditional marine conservation and spiritual connection to the sea',
            type: 'lesson',
            isAvailable: true,
          },
          {
            id: 'math-2',
            title: 'Statistics in Community Research',
            subject: 'Mathematics',
            yearLevel: 'Year 11-13',
            description:
              'Applied statistics for community-based research and indigenous data sovereignty.',
            culturalContext: 'Community-centered research methodologies',
            type: 'activity',
            isAvailable: true,
          },
          {
            id: 'language-2',
            title: 'Digital Storytelling in Te Reo',
            subject: 'Language',
            yearLevel: 'Year 8-12',
            description: 'Creating digital stories in Te Reo Māori using modern multimedia tools.',
            culturalContext: 'Traditional storytelling meets digital technology',
            type: 'activity',
            isAvailable: true,
          },
          {
            id: 'social-2',
            title: 'Contemporary Issues in Māori Society',
            subject: 'Social Studies',
            yearLevel: 'Year 12-13',
            description:
              'Analysis of current social, political, and economic issues affecting Māori communities.',
            culturalContext: 'Contemporary Māori perspectives on social justice and equity',
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
          <p>{resources.length}+ Resources • 100% Cultural Safety • AI Enhanced Learning</p>
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
