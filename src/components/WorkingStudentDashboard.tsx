import { Award, CheckCircle, Clock, Play, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const WorkingStudentDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Research',
      subject: 'Social Studies',
      dueDate: '2025-09-20',
      status: 'in-progress',
      progress: 65,
      points: 50,
      difficulty: 'medium',
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Report',
      subject: 'Science',
      dueDate: '2025-09-18',
      status: 'completed',
      progress: 100,
      points: 75,
      difficulty: 'hard',
    },
    {
      id: '3',
      title: 'Census Data Analysis',
      subject: 'Mathematics',
      dueDate: '2025-09-25',
      status: 'not-started',
      progress: 0,
      points: 40,
      difficulty: 'easy',
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Research Master',
      description: 'Complete 5 research assignments',
      icon: '🔍',
      earned: true,
      earnedDate: '2025-09-10',
    },
    {
      id: '2',
      title: 'Science Explorer',
      description: 'Finish a science project',
      icon: '🧪',
      earned: true,
      earnedDate: '2025-09-15',
    },
    {
      id: '3',
      title: 'Math Whiz',
      description: 'Score 90%+ on 3 math tests',
      icon: '📊',
      earned: false,
    },
    {
      id: '4',
      title: 'Cultural Learner',
      description: 'Complete Te Tiriti unit',
      icon: '🌿',
      earned: false,
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedAssignments = assignments.filter((a) => a.status === 'completed').length;
  const totalPoints = assignments.reduce(
    (sum, a) => sum + (a.status === 'completed' ? a.points : 0),
    0,
  );
  const earnedAchievements = achievements.filter((a) => a.earned).length;
  const upcomingDeadlines = assignments.filter((a) => a.status !== 'completed').length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#16a34a';
      case 'medium':
        return '#d97706';
      case 'hard':
        return '#dc2626';
      default:
        return '#64748b';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#16a34a';
      case 'in-progress':
        return '#3b82f6';
      case 'not-started':
        return '#64748b';
      default:
        return '#64748b';
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f9ff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px 40px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              color: '#1e40af',
              fontSize: '2rem',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            👨‍🎓 Student Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>
            Keep learning and growing! Here's your progress.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e40af' }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {currentTime.toLocaleDateString()}
            </div>
          </div>
          <div
            style={{
              backgroundColor: '#1e40af',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Award size={16} />
            {totalPoints} Points
          </div>
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        {/* Stats Overview */}
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
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#dcfce7',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <CheckCircle style={{ color: '#16a34a', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
                  {completedAssignments}
                </div>
                <div style={{ color: '#64748b' }}>Completed</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#fef3c7',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <Award style={{ color: '#d97706', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
                  {totalPoints}
                </div>
                <div style={{ color: '#64748b' }}>Total Points</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#e0e7ff',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <Star style={{ color: '#7c3aed', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {earnedAchievements}
                </div>
                <div style={{ color: '#64748b' }}>Achievements</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#fecaca',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <Clock style={{ color: '#dc2626', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {upcomingDeadlines}
                </div>
                <div style={{ color: '#64748b' }}>Due Soon</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '30px',
          }}
        >
          {/* Assignments Section */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2 style={{ color: '#1e40af', fontSize: '1.5rem', margin: '0 0 25px 0' }}>
              📚 My Assignments
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: assignment.status === 'completed' ? '#f0fdf4' : '#fefefe',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: '#1e40af',
                          fontSize: '1.2rem',
                          margin: '0 0 5px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {assignment.title}
                        {assignment.status === 'completed' && (
                          <CheckCircle size={16} style={{ color: '#16a34a' }} />
                        )}
                      </h3>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {assignment.subject} • Due:{' '}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          backgroundColor: getDifficultyColor(assignment.difficulty),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                        }}
                      >
                        {assignment.difficulty}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {assignment.points} pts
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Progress: {assignment.progress}%
                    </div>
                    <div
                      style={{
                        color: getStatusColor(assignment.status),
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                      }}
                    >
                      {assignment.status.replace('-', ' ')}
                    </div>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${assignment.progress}%`,
                        height: '100%',
                        backgroundColor: getStatusColor(assignment.status),
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>

                  {assignment.status !== 'completed' && (
                    <button
                      style={{
                        marginTop: '10px',
                        backgroundColor: '#1e40af',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9rem',
                      }}
                    >
                      <Play size={14} />
                      {assignment.status === 'not-started' ? 'Start Assignment' : 'Continue'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2 style={{ color: '#1e40af', fontSize: '1.5rem', margin: '0 0 25px 0' }}>
              🏆 Achievements
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    padding: '15px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: achievement.earned ? '#f0fdf4' : '#fefefe',
                    opacity: achievement.earned ? 1 : 0.6,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2rem',
                        opacity: achievement.earned ? 1 : 0.4,
                      }}
                    >
                      {achievement.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: '600',
                          color: achievement.earned ? '#16a34a' : '#64748b',
                          marginBottom: '4px',
                        }}
                      >
                        {achievement.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          color: '#64748b',
                          marginBottom: '4px',
                        }}
                      >
                        {achievement.description}
                      </div>
                      {achievement.earned && achievement.earnedDate && (
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#16a34a',
                          }}
                        >
                          Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    {achievement.earned && <CheckCircle size={20} style={{ color: '#16a34a' }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingStudentDashboard;
