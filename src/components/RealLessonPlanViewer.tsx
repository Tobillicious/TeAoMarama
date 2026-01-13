import React, { useState, useEffect } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  objectives: string[];
  culturalIntegration: string[];
  activities: Activity[];
  resources: string[];
  assessment: AssessmentCriteria;
  author: string;
  createdAt: Date;
  lastModified: Date;
  culturalSafetyScore: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'individual' | 'group' | 'class';
  culturalElements: string[];
  materials: string[];
}

interface AssessmentCriteria {
  achieved: string[];
  merit: string[];
  excellence: string[];
}

const RealLessonPlanViewer: React.FC = () => {
  const { resources } = useEducation();
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonPlan | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterYearLevel, setFilterYearLevel] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  // Convert resources to lesson plans
  useEffect(() => {
    const lessonPlanResources = resources.filter(r => r.type === 'lesson-plan');
    const convertedPlans: LessonPlan[] = lessonPlanResources.map(resource => ({
      id: resource.id,
      title: resource.title,
      subject: resource.subject,
      yearLevel: resource.yearLevel || 'Year 7-8',
      duration: '60 minutes',
      objectives: [
        'Understand key concepts in the topic',
        'Apply knowledge to real-world situations',
        'Develop critical thinking skills'
      ],
      culturalIntegration: resource.culturalElements || ['Te Ao Māori perspectives'],
      activities: [
        {
          id: '1',
          title: 'Introduction Activity',
          description: 'Engage students with a culturally relevant hook',
          duration: '10 minutes',
          type: 'class',
          culturalElements: ['Whakataukī (Māori proverbs)'],
          materials: ['Whiteboard', 'Markers']
        },
        {
          id: '2',
          title: 'Main Learning Activity',
          description: 'Core learning experience with hands-on engagement',
          duration: '35 minutes',
          type: 'group',
          culturalElements: ['Collaborative learning (whanaungatanga)'],
          materials: ['Worksheets', 'Digital devices']
        },
        {
          id: '3',
          title: 'Reflection and Assessment',
          description: 'Students reflect on learning and demonstrate understanding',
          duration: '15 minutes',
          type: 'individual',
          culturalElements: ['Self-reflection (whakaaro)'],
          materials: ['Reflection sheets']
        }
      ],
      resources: ['Digital presentation', 'Student worksheets', 'Assessment rubrics'],
      assessment: {
        achieved: ['Basic understanding of concepts', 'Completion of activities'],
        merit: ['Clear explanation of ideas', 'Application to examples'],
        excellence: ['Critical analysis', 'Creative connections', 'Cultural integration']
      },
      author: resource.author || 'Te Ao Mārama Teacher',
      createdAt: new Date(),
      lastModified: new Date(),
      culturalSafetyScore: 85
    }));
    setLessonPlans(convertedPlans);
  }, [resources]);

  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || plan.subject === filterSubject;
    const matchesYearLevel = filterYearLevel === 'all' || plan.yearLevel === filterYearLevel;
    return matchesSearch && matchesSubject && matchesYearLevel;
  });

  const subjects = [...new Set(lessonPlans.map(p => p.subject))];
  const yearLevels = [...new Set(lessonPlans.map(p => p.yearLevel))];

  const handleCreateLesson = () => {
    setIsCreating(true);
    // This would open a lesson creation modal or navigate to creation page
    setTimeout(() => setIsCreating(false), 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ color: '#1e40af', fontSize: '2.5rem', margin: 0 }}>
              📚 Lesson Plan Library
            </h1>
            <button
              onClick={handleCreateLesson}
              disabled={isCreating}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: isCreating ? 'not-allowed' : 'pointer',
                opacity: isCreating ? 0.7 : 1
              }}
            >
              {isCreating ? '⏳ Creating...' : '➕ Create New Lesson'}
            </button>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
            Browse and use curriculum-aligned lesson plans with cultural integration
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedLesson ? '1fr 2fr' : '1fr', gap: '2rem' }}>
          {/* Lesson List */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            {/* Search and Filters */}
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                placeholder="Search lesson plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  marginBottom: '1rem'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <select
                  value={filterYearLevel}
                  onChange={(e) => setFilterYearLevel(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="all">All Levels</option>
                  {yearLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lesson List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filteredPlans.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedLesson(plan)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: selectedLesson?.id === plan.id ? '2px solid #1e40af' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    background: selectedLesson?.id === plan.id ? '#eff6ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.1rem' }}>
                    {plan.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {plan.subject}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      background: '#dcfce7',
                      color: '#059669',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {plan.yearLevel}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      {plan.duration}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <span style={{ color: '#059669', fontSize: '0.75rem' }}>
                        {plan.culturalSafetyScore}%
                      </span>
                      <span style={{ fontSize: '0.75rem' }}>🌿</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Detail */}
          {selectedLesson && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ color: '#1f2937', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                  {selectedLesson.title}
                </h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedLesson.subject}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dcfce7',
                    color: '#059669',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedLesson.yearLevel}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#fef3c7',
                    color: '#d97706',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedLesson.duration}
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  By {selectedLesson.author} • Cultural Safety Score: {selectedLesson.culturalSafetyScore}%
                </p>
              </div>

              {/* Learning Objectives */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  🎯 Learning Objectives
                </h3>
                <ul style={{ color: '#4b5563', paddingLeft: '1.5rem' }}>
                  {selectedLesson.objectives.map((objective, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>{objective}</li>
                  ))}
                </ul>
              </div>

              {/* Cultural Integration */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  🌿 Cultural Integration
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedLesson.culturalIntegration.map((element, index) => (
                    <span key={index} style={{
                      padding: '0.5rem 1rem',
                      background: '#ecfdf5',
                      color: '#059669',
                      borderRadius: '0.5rem',
                      fontSize: '0.9rem',
                      border: '1px solid #a7f3d0'
                    }}>
                      {element}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  📋 Activities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedLesson.activities.map((activity) => (
                    <div key={activity.id} style={{
                      padding: '1.5rem',
                      background: '#f9fafb',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ margin: 0, color: '#1f2937' }}>{activity.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: '#dbeafe',
                            color: '#1e40af',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            {activity.duration}
                          </span>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            background: '#fef3c7',
                            color: '#d97706',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                      <p style={{ color: '#4b5563', margin: '0 0 1rem 0' }}>{activity.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {activity.materials.map((material, index) => (
                          <span key={index} style={{
                            padding: '0.25rem 0.5rem',
                            background: '#f3f4f6',
                            color: '#374151',
                            borderRadius: '0.25rem',
                            fontSize: '0.75rem'
                          }}>
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Criteria */}
              <div>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  📊 Assessment Criteria
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
                    <h4 style={{ color: '#dc2626', margin: '0 0 0.5rem 0' }}>Achieved</h4>
                    <ul style={{ color: '#7f1d1d', fontSize: '0.875rem', paddingLeft: '1rem', margin: 0 }}>
                      {selectedLesson.assessment.achieved.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #fed7aa' }}>
                    <h4 style={{ color: '#d97706', margin: '0 0 0.5rem 0' }}>Merit</h4>
                    <ul style={{ color: '#92400e', fontSize: '0.875rem', paddingLeft: '1rem', margin: 0 }}>
                      {selectedLesson.assessment.merit.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem', border: '1px solid #bbf7d0' }}>
                    <h4 style={{ color: '#059669', margin: '0 0 0.5rem 0' }}>Excellence</h4>
                    <ul style={{ color: '#14532d', fontSize: '0.875rem', paddingLeft: '1rem', margin: 0 }}>
                      {selectedLesson.assessment.excellence.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealLessonPlanViewer;
