import React, { useState } from 'react';

const WorkingAssessmentTools: React.FC = () => {
  const [assessments, setAssessments] = useState([
    {
      id: 1,
      title: 'Mathematics Assessment - Year 8',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      type: 'Summative',
      dueDate: '2024-02-15',
      status: 'Draft',
      questions: 15,
      totalMarks: 50,
    },
    {
      id: 2,
      title: 'Science Inquiry Project',
      subject: 'Science',
      yearLevel: 'Year 9',
      type: 'Project',
      dueDate: '2024-02-20',
      status: 'Published',
      questions: 8,
      totalMarks: 100,
    },
  ]);

  const [newAssessment, setNewAssessment] = useState({
    title: '',
    subject: '',
    yearLevel: '',
    type: 'Formative',
    dueDate: '',
    questions: 0,
    totalMarks: 0,
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateAssessment = () => {
    if (newAssessment.title && newAssessment.subject && newAssessment.yearLevel) {
      const assessment = {
        id: assessments.length + 1,
        ...newAssessment,
        status: 'Draft',
      };
      setAssessments([...assessments, assessment]);
      setNewAssessment({
        title: '',
        subject: '',
        yearLevel: '',
        type: 'Formative',
        dueDate: '',
        questions: 0,
        totalMarks: 0,
      });
      setShowCreateForm(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
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
              fontWeight: 'bold',
            }}
          >
            📊 Assessment Tools
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Create, manage, and grade assessments aligned with NZ Curriculum
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
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>12</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Active Assessments</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>156</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Students Assessed</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>87%</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Average Score</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>24</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Pending Reviews</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setShowCreateForm(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => (e.target.style.transform = 'translateY(0)')}
          >
            ➕ Create New Assessment
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(79, 172, 254, 0.4)',
            }}
          >
            📊 View Analytics
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(67, 233, 123, 0.4)',
            }}
          >
            📋 Grade Assessments
          </button>
        </div>

        {/* Create Assessment Form */}
        {showCreateForm && (
          <div
            style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #667eea',
            }}
          >
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Create New Assessment</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Assessment Title
                </label>
                <input
                  type="text"
                  value={newAssessment.title}
                  onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                  placeholder="Enter assessment title..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Subject
                </label>
                <select
                  value={newAssessment.subject}
                  onChange={(e) => setNewAssessment({ ...newAssessment, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Te Reo Māori">Te Reo Māori</option>
                  <option value="Art">Art</option>
                  <option value="Physical Education">Physical Education</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Year Level
                </label>
                <select
                  value={newAssessment.yearLevel}
                  onChange={(e) =>
                    setNewAssessment({ ...newAssessment, yearLevel: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Year Level</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Year 5">Year 5</option>
                  <option value="Year 6">Year 6</option>
                  <option value="Year 7">Year 7</option>
                  <option value="Year 8">Year 8</option>
                  <option value="Year 9">Year 9</option>
                  <option value="Year 10">Year 10</option>
                  <option value="Year 11">Year 11</option>
                  <option value="Year 12">Year 12</option>
                  <option value="Year 13">Year 13</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Assessment Type
                </label>
                <select
                  value={newAssessment.type}
                  onChange={(e) => setNewAssessment({ ...newAssessment, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="Formative">Formative</option>
                  <option value="Summative">Summative</option>
                  <option value="Project">Project</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Presentation">Presentation</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={newAssessment.dueDate}
                  onChange={(e) => setNewAssessment({ ...newAssessment, dueDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Total Marks
                </label>
                <input
                  type="number"
                  value={newAssessment.totalMarks}
                  onChange={(e) =>
                    setNewAssessment({
                      ...newAssessment,
                      totalMarks: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="Enter total marks..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleCreateAssessment}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Create Assessment
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                style={{
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Assessments List */}
        <div>
          <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Your Assessments</h3>
          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
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
                    <h4
                      style={{
                        margin: '0 0 5px 0',
                        fontSize: '1.3rem',
                        color: '#2d3748',
                      }}
                    >
                      {assessment.title}
                    </h4>
                    <p
                      style={{
                        margin: '0',
                        color: '#4a5568',
                        fontSize: '1rem',
                      }}
                    >
                      {assessment.subject} • {assessment.yearLevel} • {assessment.type}
                    </p>
                  </div>
                  <div
                    style={{
                      background: assessment.status === 'Published' ? '#48bb78' : '#ed8936',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {assessment.status}
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <strong style={{ color: '#4a5568' }}>Due Date:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#2d3748' }}>{assessment.dueDate}</p>
                  </div>
                  <div>
                    <strong style={{ color: '#4a5568' }}>Questions:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#2d3748' }}>{assessment.questions}</p>
                  </div>
                  <div>
                    <strong style={{ color: '#4a5568' }}>Total Marks:</strong>
                    <p style={{ margin: '5px 0 0 0', color: '#2d3748' }}>{assessment.totalMarks}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    View
                  </button>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Grade
                  </button>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Safety Note */}
        <div
          style={{
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
            🌿 Cultural Safety in Assessment
          </h4>
          <p style={{ margin: '0', color: '#4a5568', fontSize: '1rem' }}>
            All assessments are designed with cultural safety principles, ensuring inclusive and
            respectful evaluation methods that honor Te Ao Māori and Pacific perspectives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingAssessmentTools;
