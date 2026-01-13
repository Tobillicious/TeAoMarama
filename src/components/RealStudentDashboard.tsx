import React, { useState, useEffect } from 'react';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  description: string;
  points: number;
  type: 'homework' | 'project' | 'quiz' | 'assessment';
}

interface LearningPath {
  id: string;
  title: string;
  subject: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  estimatedTime: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'academic' | 'cultural' | 'participation' | 'creativity';
}

const RealStudentDashboard: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'learning' | 'achievements'>('overview');

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock student data
    const mockAssignments: Assignment[] = [
      {
        id: '1',
        title: 'Te Reo Māori Greetings Practice',
        subject: 'Te Reo Māori',
        dueDate: '2024-01-25',
        status: 'in_progress',
        description: 'Practice basic Māori greetings and record yourself speaking',
        points: 25,
        type: 'homework'
      },
      {
        id: '2',
        title: 'Matariki Constellation Research',
        subject: 'Science',
        dueDate: '2024-01-28',
        status: 'not_started',
        description: 'Research the Matariki constellation and create a presentation',
        points: 50,
        type: 'project'
      },
      {
        id: '3',
        title: 'Whakapapa Family Tree',
        subject: 'Social Studies',
        dueDate: '2024-01-22',
        status: 'completed',
        description: 'Create a family tree using Māori whakapapa concepts',
        points: 40,
        type: 'project'
      },
      {
        id: '4',
        title: 'Haka Performance Quiz',
        subject: 'Performing Arts',
        dueDate: '2024-01-20',
        status: 'completed',
        description: 'Quiz on haka performance techniques and cultural significance',
        points: 20,
        type: 'quiz'
      }
    ];

    const mockLearningPaths: LearningPath[] = [
      {
        id: '1',
        title: 'Te Reo Māori Basics',
        subject: 'Te Reo Māori',
        progress: 75,
        totalLessons: 12,
        completedLessons: 9,
        nextLesson: 'Numbers and Counting',
        estimatedTime: '2 weeks'
      },
      {
        id: '2',
        title: 'Māori Culture and Traditions',
        subject: 'Social Studies',
        progress: 45,
        totalLessons: 15,
        completedLessons: 7,
        nextLesson: 'Traditional Arts and Crafts',
        estimatedTime: '3 weeks'
      },
      {
        id: '3',
        title: 'New Zealand History',
        subject: 'History',
        progress: 20,
        totalLessons: 20,
        completedLessons: 4,
        nextLesson: 'Early Māori Settlement',
        estimatedTime: '4 weeks'
      }
    ];

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Te Reo Champion',
        description: 'Completed 5 Te Reo Māori lessons',
        icon: '🏆',
        earnedDate: '2024-01-18',
        category: 'cultural'
      },
      {
        id: '2',
        title: 'Project Master',
        description: 'Submitted 3 excellent projects',
        icon: '⭐',
        earnedDate: '2024-01-15',
        category: 'academic'
      },
      {
        id: '3',
        title: 'Cultural Explorer',
        description: 'Explored Māori traditions and customs',
        icon: '🌿',
        earnedDate: '2024-01-12',
        category: 'cultural'
      }
    ];

    setAssignments(mockAssignments);
    setLearningPaths(mockLearningPaths);
    setAchievements(mockAchievements);
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in_progress': return '#f59e0b';
      case 'not_started': return '#6b7280';
      case 'overdue': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'not_started': return '⏳';
      case 'overdue': return '⚠️';
      default: return '📄';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'homework': return '📝';
      case 'project': return '🏗️';
      case 'quiz': return '❓';
      case 'assessment': return '📊';
      default: return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NZ', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🎓</div>
          <div>Loading Student Dashboard...</div>
        </div>
      </div>
    );
  }

  const completedAssignments = assignments.filter(a => a.status === 'completed').length;
  const inProgressAssignments = assignments.filter(a => a.status === 'in_progress').length;
  const overdueAssignments = assignments.filter(a => a.status === 'overdue').length;
  const totalPoints = assignments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.points, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            👨‍🎓 Student Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Welcome! Track your learning progress and assignments.
          </p>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                {completedAssignments}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Completed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {inProgressAssignments}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>In Progress</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                {overdueAssignments}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Overdue</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {totalPoints}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Points Earned</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '0.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {['overview', 'assignments', 'learning', 'achievements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '1rem 2rem',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === tab ? 'rgba(74, 222, 128, 0.3)' : 'transparent',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Recent Assignments */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                📝 Recent Assignments
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {assignments.slice(0, 4).map(assignment => (
                  <div
                    key={assignment.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    onClick={() => alert(`Opening assignment: ${assignment.title}`)}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.5rem' }}>
                          {getTypeIcon(assignment.type)}
                        </div>
                        <div>
                          <h4 style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            margin: 0,
                            marginBottom: '0.25rem'
                          }}>
                            {assignment.title}
                          </h4>
                          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            {assignment.subject} • {assignment.points} points
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span style={{
                          background: getStatusColor(assignment.status),
                          color: 'white',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {getStatusIcon(assignment.status)} {assignment.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '1rem',
                      opacity: 0.9,
                      marginBottom: '1rem',
                      lineHeight: '1.4'
                    }}>
                      {assignment.description}
                    </p>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      Due: {formatDate(assignment.dueDate)} 
                      {getDaysUntilDue(assignment.dueDate) > 0 && (
                        <span style={{ color: '#f59e0b', marginLeft: '0.5rem' }}>
                          ({getDaysUntilDue(assignment.dueDate)} days left)
                        </span>
                      )}
                      {getDaysUntilDue(assignment.dueDate) < 0 && (
                        <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>
                          (Overdue by {Math.abs(getDaysUntilDue(assignment.dueDate))} days)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Progress */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                📚 Learning Progress
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {learningPaths.map(path => (
                  <div
                    key={path.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    onClick={() => alert(`Opening learning path: ${path.title}`)}
                  >
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {path.title}
                    </h4>
                    <div style={{
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      marginBottom: '1rem'
                    }}>
                      {path.subject}
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      height: '8px',
                      marginBottom: '0.5rem'
                    }}>
                      <div style={{
                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                        height: '100%',
                        borderRadius: '10px',
                        width: `${path.progress}%`,
                        transition: 'width 0.3s'
                      }} />
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      opacity: 0.8
                    }}>
                      <span>{path.completedLessons}/{path.totalLessons} lessons</span>
                      <span>{path.progress}% complete</span>
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      opacity: 0.7,
                      marginTop: '0.5rem'
                    }}>
                      Next: {path.nextLesson}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assignments' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              📝 All Assignments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {assignments.map(assignment => (
                <div
                  key={assignment.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => alert(`Opening assignment: ${assignment.title}`)}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: '2rem',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>
                          {getTypeIcon(assignment.type)}
                        </div>
                        <h4 style={{
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          margin: 0
                        }}>
                          {assignment.title}
                        </h4>
                      </div>
                      <div style={{
                        fontSize: '1rem',
                        opacity: 0.8,
                        marginBottom: '0.5rem'
                      }}>
                        {assignment.subject} • {assignment.points} points
                      </div>
                      <p style={{
                        fontSize: '1rem',
                        opacity: 0.9,
                        lineHeight: '1.4'
                      }}>
                        {assignment.description}
                      </p>
                    </div>
                    <div style={{
                      background: getStatusColor(assignment.status),
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}>
                      {getStatusIcon(assignment.status)} {assignment.status.replace('_', ' ')}
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        style={{
                          background: 'rgba(74, 222, 128, 0.3)',
                          border: '1px solid rgba(74, 222, 128, 0.5)',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Start assignment');
                        }}
                      >
                        🚀 Start
                      </button>
                      <button
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '8px',
                          padding: '0.5rem 1rem',
                          color: 'white',
                          fontSize: '0.9rem',
                          cursor: 'pointer'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('View details');
                        }}
                      >
                        👁️ View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'learning' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              📚 Learning Paths
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {learningPaths.map(path => (
                <div
                  key={path.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => alert(`Opening learning path: ${path.title}`)}
                >
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {path.title}
                  </h4>
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.8,
                    marginBottom: '1rem'
                  }}>
                    {path.subject}
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    height: '10px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                      height: '100%',
                      borderRadius: '10px',
                      width: `${path.progress}%`,
                      transition: 'width 0.3s'
                    }} />
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{path.completedLessons}/{path.totalLessons}</div>
                      <div>Lessons Complete</div>
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{path.progress}%</div>
                      <div>Progress</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '1.5rem'
                  }}>
                    Next: {path.nextLesson}
                  </div>
                  <button
                    style={{
                      width: '100%',
                      background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '1rem',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Continue learning path');
                    }}
                  >
                    🚀 Continue Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              marginBottom: '2rem'
            }}>
              🏆 Achievements
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  onClick={() => alert(`View achievement: ${achievement.title}`)}
                >
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {achievement.icon}
                  </div>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    margin: '0 0 0.5rem 0'
                  }}>
                    {achievement.title}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    opacity: 0.9,
                    marginBottom: '1rem',
                    lineHeight: '1.4'
                  }}>
                    {achievement.description}
                  </p>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.7
                  }}>
                    Earned: {formatDate(achievement.earnedDate)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealStudentDashboard;
