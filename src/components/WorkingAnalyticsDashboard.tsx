import React, { useState } from 'react';

const WorkingAnalyticsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  const [selectedClass, setSelectedClass] = useState('all');

  const analyticsData = {
    studentProgress: [
      { name: 'Aroha Williams', subject: 'Mathematics', progress: 87, trend: 'up' },
      { name: 'James Mitchell', subject: 'Science', progress: 72, trend: 'up' },
      { name: 'Sofia Chen', subject: 'English', progress: 94, trend: 'stable' },
      { name: 'Hemi Thompson', subject: 'Te Reo Māori', progress: 89, trend: 'up' },
      { name: 'Emma Wilson', subject: 'Mathematics', progress: 76, trend: 'down' },
    ],
    classPerformance: [
      { class: 'Year 8 Mathematics', averageScore: 82, completionRate: 94, engagement: 88 },
      { class: 'Year 9 Science', averageScore: 78, completionRate: 91, engagement: 85 },
      { class: 'Year 7 English', averageScore: 85, completionRate: 96, engagement: 92 },
    ],
    assessmentResults: [
      { assessment: 'Mathematics Test 1', averageScore: 78, totalStudents: 24, passRate: 87 },
      { assessment: 'Science Project', averageScore: 85, totalStudents: 22, passRate: 95 },
      { assessment: 'English Essay', averageScore: 82, totalStudents: 26, passRate: 92 },
    ],
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return '#48bb78';
      case 'down':
        return '#f56565';
      case 'stable':
        return '#4299e1';
      default:
        return '#a0aec0';
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
          maxWidth: '1400px',
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
            📊 Analytics Dashboard
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Track student progress, class performance, and educational outcomes
          </p>
        </div>

        {/* Filter Controls */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
              Timeframe
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              style={{
                padding: '10px 15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white',
              }}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="year">This Year</option>
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
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '10px 15px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white',
              }}
            >
              <option value="all">All Classes</option>
              <option value="year8math">Year 8 Mathematics</option>
              <option value="year9science">Year 9 Science</option>
              <option value="year7english">Year 7 English</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
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
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>87%</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Average Student Progress</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>94%</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Assignment Completion</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>89%</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Class Engagement</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>72</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Total Students</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px',
          }}
        >
          {/* Student Progress */}
          <div>
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Student Progress</h3>
            <div
              style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gap: '15px',
                }}
              >
                {analyticsData.studentProgress.map((student, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      background: '#f7fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div>
                      <h5 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>{student.name}</h5>
                      <p style={{ margin: '0', color: '#4a5568', fontSize: '0.9rem' }}>
                        {student.subject}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          marginBottom: '5px',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{getTrendIcon(student.trend)}</span>
                        <span
                          style={{
                            color: getTrendColor(student.trend),
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                          }}
                        >
                          {student.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Class Performance */}
          <div>
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Class Performance</h3>
            <div
              style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gap: '15px',
                }}
              >
                {analyticsData.classPerformance.map((classData, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '15px',
                      background: '#f7fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <h5 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>{classData.class}</h5>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div>
                        <strong style={{ color: '#4a5568' }}>Avg Score:</strong>
                        <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                          {classData.averageScore}%
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#4a5568' }}>Completion:</strong>
                        <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                          {classData.completionRate}%
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#4a5568' }}>Engagement:</strong>
                        <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                          {classData.engagement}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Results */}
        <div>
          <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Recent Assessment Results</h3>
          <div
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gap: '15px',
              }}
            >
              {analyticsData.assessmentResults.map((assessment, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    background: '#f7fafc',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div>
                    <h5 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>
                      {assessment.assessment}
                    </h5>
                    <p style={{ margin: '0', color: '#4a5568', fontSize: '0.9rem' }}>
                      {assessment.totalStudents} students
                    </p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      textAlign: 'right',
                    }}
                  >
                    <div>
                      <strong style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                        Average Score
                      </strong>
                      <p style={{ margin: '5px 0 0 0', color: '#2d3748', fontSize: '1.1rem' }}>
                        {assessment.averageScore}%
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#4a5568', fontSize: '0.9rem' }}>Pass Rate</strong>
                      <p style={{ margin: '5px 0 0 0', color: '#2d3748', fontSize: '1.1rem' }}>
                        {assessment.passRate}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginTop: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
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
          >
            📊 Export Report
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
            📈 Detailed Analytics
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
            🎯 Set Goals
          </button>
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
          <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>🌿 Holistic Student Assessment</h4>
          <p style={{ margin: '0', color: '#4a5568', fontSize: '1rem' }}>
            Our analytics respect the whole student, acknowledging cultural identity, community
            connections, and individual learning journeys beyond traditional metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingAnalyticsDashboard;
