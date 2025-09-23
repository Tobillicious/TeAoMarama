import React, { useState } from 'react';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: number;
  learningObjectives: string[];
  activities: string[];
  assessment: string;
  culturalElements: string[];
  resources: string[];
  createdAt: string;
}

const AdvancedLessonPlanner: React.FC = () => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([
    {
      id: '1',
      title: 'Māori Settlement Patterns',
      subject: 'Social Studies',
      yearLevel: 'Year 7-8',
      duration: 60,
      learningObjectives: [
        'Understand early Māori settlement patterns',
        'Analyze environmental factors in settlement decisions',
        'Connect historical patterns to modern communities',
      ],
      activities: [
        'Map analysis of early settlements',
        'Group discussion on environmental factors',
        'Create modern settlement comparison',
      ],
      assessment: 'Written reflection on settlement patterns',
      culturalElements: ['Māori history', 'Environmental connection', 'Community values'],
      resources: ['Historical maps', 'Māori legends', 'Environmental data'],
      createdAt: '2024-01-15',
    },
  ]);

  const [newPlan, setNewPlan] = useState<Partial<LessonPlan>>({
    title: '',
    subject: '',
    yearLevel: '',
    duration: 60,
    learningObjectives: [''],
    activities: [''],
    assessment: '',
    culturalElements: [''],
    resources: [''],
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddObjective = () => {
    setNewPlan((prev) => ({
      ...prev,
      learningObjectives: [...(prev.learningObjectives || []), ''],
    }));
  };

  const handleAddActivity = () => {
    setNewPlan((prev) => ({
      ...prev,
      activities: [...(prev.activities || []), ''],
    }));
  };

  const handleAddCulturalElement = () => {
    setNewPlan((prev) => ({
      ...prev,
      culturalElements: [...(prev.culturalElements || []), ''],
    }));
  };

  const handleAddResource = () => {
    setNewPlan((prev) => ({
      ...prev,
      resources: [...(prev.resources || []), ''],
    }));
  };

  const handleSavePlan = () => {
    if (newPlan.title && newPlan.subject && newPlan.yearLevel) {
      const plan: LessonPlan = {
        id: Date.now().toString(),
        title: newPlan.title,
        subject: newPlan.subject,
        yearLevel: newPlan.yearLevel,
        duration: newPlan.duration || 60,
        learningObjectives: newPlan.learningObjectives?.filter((obj) => obj.trim()) || [],
        activities: newPlan.activities?.filter((act) => act.trim()) || [],
        assessment: newPlan.assessment || '',
        culturalElements: newPlan.culturalElements?.filter((el) => el.trim()) || [],
        resources: newPlan.resources?.filter((res) => res.trim()) || [],
        createdAt: new Date().toISOString().split('T')[0],
      };

      setLessonPlans((prev) => [plan, ...prev]);
      setNewPlan({
        title: '',
        subject: '',
        yearLevel: '',
        duration: 60,
        learningObjectives: [''],
        activities: [''],
        assessment: '',
        culturalElements: [''],
        resources: [''],
      });
      setShowForm(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#2d3748',
              margin: '0 0 10px 0',
              fontWeight: '700',
            }}
          >
            📚 Advanced Lesson Planner
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Create comprehensive, culturally-integrated lesson plans for New Zealand curriculum
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{lessonPlans.length}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Total Plans</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {lessonPlans.reduce((acc, plan) => acc + plan.learningObjectives.length, 0)}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Learning Objectives</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {lessonPlans.reduce((acc, plan) => acc + plan.culturalElements.length, 0)}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Cultural Elements</p>
          </div>
        </div>

        {/* Create New Plan Button */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
            }}
          >
            {showForm ? 'Cancel' : '+ Create New Lesson Plan'}
          </button>
        </div>

        {/* New Plan Form */}
        {showForm && (
          <div
            style={{
              background: '#f7fafc',
              padding: '30px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #e2e8f0',
            }}
          >
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Create New Lesson Plan</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Lesson Title
                </label>
                <input
                  type="text"
                  value={newPlan.title || ''}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                  placeholder="Enter lesson title"
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Subject
                </label>
                <select
                  value={newPlan.subject || ''}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, subject: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Subject</option>
                  <option value="English">English</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Te Reo Māori">Te Reo Māori</option>
                  <option value="Arts">Arts</option>
                  <option value="Health & PE">Health & PE</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Year Level
                </label>
                <select
                  value={newPlan.yearLevel || ''}
                  onChange={(e) => setNewPlan((prev) => ({ ...prev, yearLevel: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Year Level</option>
                  <option value="Year 1-2">Year 1-2</option>
                  <option value="Year 3-4">Year 3-4</option>
                  <option value="Year 5-6">Year 5-6</option>
                  <option value="Year 7-8">Year 7-8</option>
                  <option value="Year 9-10">Year 9-10</option>
                  <option value="Year 11-13">Year 11-13</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Duration (minutes)
              </label>
              <input
                type="number"
                value={newPlan.duration || 60}
                onChange={(e) =>
                  setNewPlan((prev) => ({ ...prev, duration: parseInt(e.target.value) }))
                }
                style={{
                  width: '200px',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>

            {/* Learning Objectives */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Learning Objectives</label>
                <button
                  onClick={handleAddObjective}
                  style={{
                    background: '#48bb78',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  + Add Objective
                </button>
              </div>
              {newPlan.learningObjectives?.map((objective, index) => (
                <input
                  key={index}
                  type="text"
                  value={objective}
                  onChange={(e) => {
                    const newObjectives = [...(newPlan.learningObjectives || [])];
                    newObjectives[index] = e.target.value;
                    setNewPlan((prev) => ({ ...prev, learningObjectives: newObjectives }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                  }}
                  placeholder={`Learning objective ${index + 1}`}
                />
              ))}
            </div>

            {/* Activities */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Activities</label>
                <button
                  onClick={handleAddActivity}
                  style={{
                    background: '#4299e1',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  + Add Activity
                </button>
              </div>
              {newPlan.activities?.map((activity, index) => (
                <input
                  key={index}
                  type="text"
                  value={activity}
                  onChange={(e) => {
                    const newActivities = [...(newPlan.activities || [])];
                    newActivities[index] = e.target.value;
                    setNewPlan((prev) => ({ ...prev, activities: newActivities }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                  }}
                  placeholder={`Activity ${index + 1}`}
                />
              ))}
            </div>

            {/* Cultural Elements */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Cultural Elements</label>
                <button
                  onClick={handleAddCulturalElement}
                  style={{
                    background: '#ed8936',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  + Add Element
                </button>
              </div>
              {newPlan.culturalElements?.map((element, index) => (
                <input
                  key={index}
                  type="text"
                  value={element}
                  onChange={(e) => {
                    const newElements = [...(newPlan.culturalElements || [])];
                    newElements[index] = e.target.value;
                    setNewPlan((prev) => ({ ...prev, culturalElements: newElements }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                  }}
                  placeholder={`Cultural element ${index + 1}`}
                />
              ))}
            </div>

            {/* Assessment */}
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Assessment
              </label>
              <textarea
                value={newPlan.assessment || ''}
                onChange={(e) => setNewPlan((prev) => ({ ...prev, assessment: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
                placeholder="Describe how students will be assessed"
              />
            </div>

            {/* Resources */}
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Resources</label>
                <button
                  onClick={handleAddResource}
                  style={{
                    background: '#9f7aea',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >
                  + Add Resource
                </button>
              </div>
              {newPlan.resources?.map((resource, index) => (
                <input
                  key={index}
                  type="text"
                  value={resource}
                  onChange={(e) => {
                    const newResources = [...(newPlan.resources || [])];
                    newResources[index] = e.target.value;
                    setNewPlan((prev) => ({ ...prev, resources: newResources }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    marginBottom: '8px',
                  }}
                  placeholder={`Resource ${index + 1}`}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSavePlan}
                style={{
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(72, 187, 120, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(72, 187, 120, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(72, 187, 120, 0.3)';
                }}
              >
                Save Lesson Plan
              </button>
            </div>
          </div>
        )}

        {/* Lesson Plans List */}
        <div>
          <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Your Lesson Plans</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            {lessonPlans.map((plan) => (
              <div
                key={plan.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  <div>
                    <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.4rem' }}>
                      {plan.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '15px',
                        color: '#718096',
                        fontSize: '0.95rem',
                      }}
                    >
                      <span>📚 {plan.subject}</span>
                      <span>👥 {plan.yearLevel}</span>
                      <span>⏱️ {plan.duration} min</span>
                      <span>📅 {plan.createdAt}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      style={{
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        background: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Learning Objectives</h4>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {plan.learningObjectives.map((objective, index) => (
                        <li key={index} style={{ marginBottom: '5px', color: '#2d3748' }}>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Activities</h4>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {plan.activities.map((activity, index) => (
                        <li key={index} style={{ marginBottom: '5px', color: '#2d3748' }}>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {plan.culturalElements.length > 0 && (
                  <div style={{ marginTop: '15px' }}>
                    <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Cultural Elements</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {plan.culturalElements.map((element, index) => (
                        <span
                          key={index}
                          style={{
                            background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '0.85rem',
                            fontWeight: '500',
                          }}
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {plan.assessment && (
                  <div style={{ marginTop: '15px' }}>
                    <h4 style={{ color: '#4a5568', marginBottom: '10px' }}>Assessment</h4>
                    <p style={{ color: '#2d3748', margin: '0' }}>{plan.assessment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedLessonPlanner;
