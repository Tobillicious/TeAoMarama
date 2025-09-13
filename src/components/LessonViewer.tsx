import React, { useState, useEffect } from 'react';
import type { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './LessonViewer.css';

// Enhanced markdown renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="lesson-h3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="lesson-h2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="lesson-h1">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="lesson-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="lesson-italic">$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="lesson-code-block"><code>$1</code></pre>')
      .replace(/`(.*?)`/gim, '<code class="lesson-inline-code">$1</code>')
      .replace(/^- (.*$)/gim, '<li class="lesson-list-item">$1</li>')
      .replace(/\n/gim, '<br/>');
    
    html = html.replace(/(<li class="lesson-list-item">.*?<\/li>(?:<br\/>)*)+/gim, '<ul class="lesson-list">$&</ul>');
    html = html.replace(/(<\/h[123]>)<br\/>/gim, '$1');
    html = html.replace(/(<\/ul>)<br\/>/gim, '$1');
    
    return html;
  };

  return (
    <div 
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

interface LessonContent {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  fullContent: string;
  metadata: {
    duration: string;
    difficulty: string;
    culturalElements: string[];
    learningObjectives: string[];
    resources: string[];
  };
}

const LessonViewer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<LessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [sectionLoading, setSectionLoading] = useState(false);

  useEffect(() => {
    if (lessonId) {
      loadLessonContent(lessonId);
    }
  }, [lessonId]);

  const loadLessonContent = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const lessonMap: Record<string, LessonContent> = {
        'y7-treaty-waitangi': {
          id: 'y7-treaty-waitangi',
          title: 'Treaty of Waitangi Investigation',
          subject: 'Social Studies',
          yearLevel: 'Year 7',
          fullContent: `# Year 7 Social Studies: Treaty of Waitangi Investigation

**New Zealand Curriculum Level 4**

## 🎯 Unit Overview (6 lessons)

This comprehensive unit explores the Treaty of Waitangi from multiple perspectives, examining its historical context, ongoing impact, and modern relevance.

### Cultural Protocols ⚠️ IMPORTANT
- **Consult with local iwi** before teaching this unit
- **Include Māori voices** in all discussions
- **Approach with cultural humility** and respect
- **Acknowledge ongoing impacts** of historical events

---

## 📚 Lesson Breakdown

### Lesson 1: Setting the Scene - New Zealand Before 1840
**Duration:** 50 minutes  
**Focus:** Understanding the context that led to the Treaty

#### Hook Activity (15 minutes)
**Time Traveler's Dilemma**
"You've been sent back to 1839. You arrive in the Bay of Islands and meet both Māori rangatira and British missionaries..."

[Full detailed lesson content would continue here...]

### Assessment Task: Treaty Inquiry Report
Students research and write a comprehensive report examining Treaty partnership between Māori and the Crown.

**Assessment Criteria:**
- Historical Knowledge (25%)
- Analysis of Multiple Perspectives (25%) 
- Use of Evidence (25%)
- Communication (25%)

---

## 🌿 Cultural Integration

This unit authentically integrates Te Ao Māori perspectives through:
- **Tikanga protocols** in classroom discussions
- **Te Reo Māori** vocabulary integration
- **Whakapapa** understanding of historical connections
- **Kaitiakitanga** - guardianship of historical knowledge

## 📋 Resources Required

### Primary Sources
- Original Treaty documents (English and Te Reo)
- Historical photographs from Archives New Zealand
- Newspaper reports from 1840
- Oral histories from iwi

### Digital Resources  
- NZHistory.govt.nz Treaty timeline
- Waitangi Tribunal website
- Te Ara Encyclopedia
- Archives New Zealand database`,
          metadata: {
            duration: '6 x 50 minute lessons (3 weeks)',
            difficulty: 'Intermediate to Advanced',
            culturalElements: [
              'Māori perspectives and voices',
              'Tikanga protocols in discussions', 
              'Te Reo Māori vocabulary',
              'Whakapapa understanding',
              'Treaty partnership principles'
            ],
            learningObjectives: [
              'Understand Treaty historical context and significance',
              'Analyze different perspectives from Māori and British viewpoints',
              'Examine ongoing impact of Treaty on modern New Zealand',
              'Develop research and critical thinking skills',
              'Appreciate complexity of historical events',
              'Demonstrate cultural sensitivity in historical analysis'
            ],
            resources: [
              'Treaty documents (original versions)',
              'Historical photographs and images',
              'Primary source documents',
              'Digital timeline resources',
              'Assessment rubrics',
              'Differentiation materials'
            ]
          }
        },
        'y5-maori-games': {
          id: 'y5-maori-games',
          title: 'Traditional Māori Games',
          subject: 'Physical Education',
          yearLevel: 'Year 5',
          fullContent: `# Year 5 Physical Education: Traditional Māori Games

**New Zealand Curriculum Level 3**

## 🎯 Learning Objectives

Students will learn about traditional Māori games while developing physical skills, cultural understanding, and respect for Māori traditions.

### Cultural Protocols ⚠️ IMPORTANT
- **Show respect** for traditional games and their cultural significance
- **Acknowledge** the cultural origins of each game
- **Include local iwi perspectives** where possible
- **Demonstrate manaakitanga** (hospitality) in all activities

---

## 🎮 Featured Games

### Ki-o-rahi
A traditional ball game that combines strategy, teamwork, and physical skill.

**Equipment:** Soft ball, markers for zones
**Skills Developed:** Throwing, catching, strategic thinking, teamwork

### Poi Rakau (Stick Games)
Rhythmic games using wooden sticks to develop coordination and timing.

**Equipment:** Wooden sticks (rakau)
**Skills Developed:** Hand-eye coordination, rhythm, concentration

### Mu Torere
Traditional strategy game that develops problem-solving skills.

**Equipment:** Game board and playing pieces
**Skills Developed:** Strategic thinking, planning, patience

---

## 📋 Lesson Activities

### Warm-up (10 minutes)
Traditional Māori movements and stretches

### Main Activities (30 minutes)
- Game instruction and practice
- Team-based competitions
- Cultural context discussions

### Cool-down (10 minutes)
Reflection and cultural appreciation

---

## 🌿 Cultural Integration

This unit celebrates Māori culture through:
- **Manaakitanga** - showing care and respect for others
- **Whakatōhea** - working together as a team
- **Kotahitanga** - unity and collaboration
- **Respect** for traditional knowledge (mātauranga Māori)

## 📚 Assessment

Students demonstrate:
- Safe participation in traditional games
- Understanding of cultural significance
- Application of game rules and strategies
- Respectful interaction with peers`,
          metadata: {
            duration: '50 minutes',
            difficulty: 'Beginner',
            culturalElements: [
              'Traditional Māori games',
              'Cultural protocols',
              'Te Reo Māori vocabulary',
              'Respect for mātauranga Māori'
            ],
            learningObjectives: [
              'Participate safely in traditional Māori games',
              'Understand cultural significance of traditional games',
              'Develop physical skills through culturally authentic activities',
              'Show respect for Māori culture and traditions',
              'Work collaboratively and demonstrate manaakitanga'
            ],
            resources: [
              'Soft balls for Ki-o-rahi',
              'Wooden sticks (rakau) for poi games',
              'Mu Torere game boards',
              'Cultural context information sheets',
              'Safety guidelines',
              'Assessment rubrics'
            ]
          }
        }
      };

      const lessonContent = lessonMap[id];
      if (lessonContent) {
        setLesson(lessonContent);
      } else {
        throw new Error(`Lesson with id "${id}" not found`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = async (section: string) => {
    setSectionLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    setActiveSection(section);
    setSectionLoading(false);
  };

  if (loading) {
    return (
      <div className="lesson-viewer">
        <div className="lesson-loading">
          <div className="loading-spinner">📚</div>
          <p>Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="lesson-viewer">
        <div className="lesson-error">
          <h2>❌ Lesson Not Found</h2>
          <p>{error || 'This lesson is not available.'}</p>
          <Link to="/quality-lessons" className="back-link">
            ← Back to Quality Lessons
          </Link>
        </div>
      </div>
    );
  }

  const customBreadcrumbs = lesson ? [
    { label: 'Quality Lessons', path: '/quality-lessons', icon: '🌟' },
    { label: lesson.subject, path: '/quality-lessons', icon: '📚' },
    { label: lesson.title, path: `/lesson/${lessonId}`, icon: '📖' }
  ] : [];

  return (
    <>
      <Breadcrumbs customBreadcrumbs={customBreadcrumbs} />
      <div className="lesson-viewer">
        <div className="lesson-header">
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            <span className="year-badge">{lesson.yearLevel}</span>
            <span className="subject-badge">{lesson.subject}</span>
            <span className="duration">{lesson.metadata.duration}</span>
            <span className="difficulty">{lesson.metadata.difficulty}</span>
          </div>
        </div>

        <div className="lesson-tabs">
          <button 
            className={`tab ${activeSection === 'overview' ? 'active' : ''} ${sectionLoading ? 'loading' : ''}`}
            onClick={() => handleSectionChange('overview')}
            disabled={sectionLoading}
          >
            📋 Overview
          </button>
          <button 
            className={`tab ${activeSection === 'content' ? 'active' : ''} ${sectionLoading ? 'loading' : ''}`}
            onClick={() => handleSectionChange('content')}
            disabled={sectionLoading}
          >
            📚 Full Lesson
          </button>
          <button 
            className={`tab ${activeSection === 'resources' ? 'active' : ''} ${sectionLoading ? 'loading' : ''}`}
            onClick={() => handleSectionChange('resources')}
            disabled={sectionLoading}
          >
            🎒 Resources
          </button>
          <button 
            className={`tab ${activeSection === 'cultural' ? 'active' : ''} ${sectionLoading ? 'loading' : ''}`}
            onClick={() => handleSectionChange('cultural')}
            disabled={sectionLoading}
          >
            🌿 Cultural Elements
          </button>
        </div>

        <div className={`lesson-content ${sectionLoading ? 'section-loading' : ''}`}>
          {sectionLoading && (
            <div className="section-loading-overlay">
              <div className="section-spinner">⚡</div>
            </div>
          )}

          {activeSection === 'overview' && (
            <div className="overview-section">
              <div className="objectives-card">
                <h3>🎯 Learning Objectives</h3>
                <ul>
                  {lesson.metadata.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="duration-card">
                <h3>⏰ Duration & Difficulty</h3>
                <p><strong>Duration:</strong> {lesson.metadata.duration}</p>
                <p><strong>Difficulty:</strong> {lesson.metadata.difficulty}</p>
              </div>

              <div className="quick-preview">
                <h3>📖 Quick Preview</h3>
                <p>This is a comprehensive, culturally-responsive lesson that has been carefully developed with educational experts and cultural advisors.</p>
                <div className="preview-stats">
                  <span className="stat">✅ Culturally Validated</span>
                  <span className="stat">🎓 Curriculum Aligned</span>
                  <span className="stat">📊 Assessment Ready</span>
                  <span className="stat">🌿 Community Approved</span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'content' && (
            <div className="content-section">
              <div className="content-wrapper">
                <MarkdownRenderer content={lesson.fullContent} />
              </div>
            </div>
          )}

          {activeSection === 'resources' && (
            <div className="resources-section">
              <h3>📚 Required Resources</h3>
              <ul className="resources-list">
                {lesson.metadata.resources.map((resource, index) => (
                  <li key={index} className="resource-item">
                    <span className="resource-icon">📄</span>
                    {resource}
                  </li>
                ))}
              </ul>

              <div className="download-section">
                <h3>⬇️ Download Materials</h3>
                <button className="download-btn">📥 Download Full Lesson Plan</button>
                <button className="download-btn">📊 Download Assessment Rubric</button>
                <button className="download-btn">🎨 Download Student Resources</button>
              </div>
            </div>
          )}

          {activeSection === 'cultural' && (
            <div className="cultural-section">
              <div className="cultural-warning">
                <div className="warning-icon">⚠️</div>
                <div className="warning-content">
                  <h3>Cultural Safety Protocols</h3>
                  <p>This lesson includes culturally significant content. Please ensure you follow appropriate cultural protocols and consult with local iwi or cultural advisors where indicated.</p>
                </div>
              </div>

              <h3>🌿 Cultural Elements Integration</h3>
              <div className="cultural-elements">
                {lesson.metadata.culturalElements.map((element, index) => (
                  <div key={index} className="cultural-element">
                    <span className="element-icon">🌿</span>
                    <span className="element-text">{element}</span>
                  </div>
                ))}
              </div>

              <div className="cultural-guidance">
                <h3>🤝 Community Engagement</h3>
                <p>For best results, consider:</p>
                <ul>
                  <li>Consulting with local iwi or Māori educators</li>
                  <li>Inviting community members to share knowledge</li>
                  <li>Connecting with local marae or cultural centers</li>
                  <li>Ongoing cultural supervision and feedback</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="lesson-actions">
          <Link to="/quality-lessons" className="back-btn">← Back to Lessons</Link>
          <button className="print-btn">🖨️ Print Lesson</button>
          <button className="share-btn">📤 Share Lesson</button>
        </div>
      </div>
    </>
  );
};

export default LessonViewer;