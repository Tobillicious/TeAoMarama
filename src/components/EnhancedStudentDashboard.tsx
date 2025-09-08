import React, { useState } from 'react';
import { 
  BookOpen, Target, TrendingUp, Calendar, Star, Clock, 
  ChevronRight, Play, CheckCircle, Award, MessageCircle,
  Search, Filter, Heart, Users, BarChart3, FileText
} from 'lucide-react';

const EnhancedStudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Student progress data
  const studentStats = {
    overallProgress: 78,
    culturalEngagement: 92,
    completedLessons: 47,
    totalLessons: 63,
    currentStreak: 12,
    achievements: 8,
    timeSpentToday: 85, // minutes
    upcomingAssignments: 3
  };

  const currentModules = [
    {
      id: '1',
      title: 'Ngā Tikanga Māori',
      description: 'Traditional Māori customs and cultural practices',
      progress: 85,
      timeRemaining: '15 mins',
      type: 'tikanga',
      difficulty: 'intermediate',
      culturalElements: 5,
      thumbnail: '🌿',
      lastActivity: 'Completed: Pōwhiri protocol',
      nextLesson: 'Hongi and traditional greetings'
    },
    {
      id: '2',
      title: 'Ngā Pūrākau Kōrero',
      description: 'Storytelling traditions and oral histories',
      progress: 67,
      timeRemaining: '25 mins',
      type: 'te-reo',
      difficulty: 'intermediate',
      culturalElements: 4,
      thumbnail: '📚',
      lastActivity: 'Started: Creation stories',
      nextLesson: 'Tangaroa and the ocean realm'
    },
    {
      id: '3',
      title: 'Te Rangatahi Whakapapa',
      description: 'Understanding genealogy and family connections',
      progress: 91,
      timeRemaining: '8 mins',
      type: 'whakapapa',
      difficulty: 'intermediate',
      culturalElements: 5,
      thumbnail: '🌳',
      lastActivity: 'Nearly complete!',
      nextLesson: 'Final assessment: Family tree presentation'
    }
  ];

  const achievements = [
    { id: '1', title: 'Cultural Explorer', description: 'Completed 5 cultural modules', icon: '🌿', unlocked: true },
    { id: '2', title: 'Te Reo Champion', description: 'Maintained 10-day streak', icon: '⭐', unlocked: true },
    { id: '3', title: 'Storyteller', description: 'Shared 3 pūrākau', icon: '📖', unlocked: true },
    { id: '4', title: 'Whakapapa Keeper', description: 'Traced family lineage', icon: '🌳', unlocked: false },
    { id: '5', title: 'Community Leader', description: 'Helped 5 classmates', icon: '🤝', unlocked: false },
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'completion',
      title: 'Completed Te Reo vocabulary quiz',
      description: 'Scored 94% on traditional greetings',
      time: '2 hours ago',
      icon: CheckCircle,
      color: '#059669'
    },
    {
      id: '2',
      type: 'discovery',
      title: 'Discovered new cultural resource',
      description: 'Added "Traditional Māori Games" to favorites',
      time: '5 hours ago',
      icon: Star,
      color: '#d97706'
    },
    {
      id: '3',
      type: 'social',
      title: 'Peer collaboration',
      description: 'Helped classmate with whakataukī meanings',
      time: '1 day ago',
      icon: Users,
      color: '#3b82f6'
    }
  ];

  const upcomingAssignments = [
    {
      id: '1',
      title: 'Whakapapa Presentation',
      subject: 'Cultural Studies',
      dueDate: 'Tomorrow',
      priority: 'high',
      progress: 75,
      description: 'Present your family genealogy with cultural context'
    },
    {
      id: '2',
      title: 'Te Reo Conversation Practice',
      subject: 'Language Arts',
      dueDate: 'Friday',
      priority: 'medium',
      progress: 40,
      description: '10-minute recorded conversation in Te Reo Māori'
    },
    {
      id: '3',
      title: 'Traditional Games Research',
      subject: 'Physical Education',
      dueDate: 'Next week',
      priority: 'low',
      progress: 20,
      description: 'Research and demonstrate 3 traditional Māori games'
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#059669';
    if (progress >= 60) return '#d97706';
    return '#dc2626';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#059669';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 4px 20px rgba(5, 150, 105, 0.15)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0 0 8px 0' }}>
              Kia ora, Rangatahi! 👨‍🎓
            </h1>
            <p style={{ fontSize: '1rem', opacity: 0.9, margin: '0' }}>
              Your Learning Journey - {studentStats.currentStreak} day streak! 🔥
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0' }}>
                {studentStats.overallProgress}%
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Progress</div>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '12px',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0' }}>
                {studentStats.achievements}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Achievements</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0',
        display: 'flex',
        overflowX: 'auto'
      }}>
        {[
          { id: 'overview', icon: <BarChart3 />, label: 'Overview' },
          { id: 'learning', icon: <BookOpen />, label: 'My Learning' },
          { id: 'assignments', icon: <Target />, label: `Assignments (${studentStats.upcomingAssignments})` },
          { id: 'achievements', icon: <Award />, label: 'Achievements' },
          { id: 'resources', icon: <FileText />, label: 'Resources' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: '16px 20px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab.id ? '600' : '500',
              color: activeTab === tab.id ? '#059669' : '#6b7280',
              borderBottom: activeTab === tab.id ? '3px solid #059669' : '3px solid transparent',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              minWidth: 'fit-content'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  background: 'rgba(5, 150, 105, 0.1)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp style={{ color: '#059669' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Overall Progress
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {studentStats.overallProgress}%
                  </div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: '#059669' }}>
                    Excellent progress!
                  </p>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  background: 'rgba(124, 58, 237, 0.1)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star style={{ color: '#7c3aed' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Cultural Engagement
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {studentStats.culturalEngagement}%
                  </div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: '#7c3aed' }}>
                    Outstanding connection!
                  </p>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  background: 'rgba(217, 119, 6, 0.1)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock style={{ color: '#d97706' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Time Today
                  </h3>
                  <div style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {studentStats.timeSpentToday}m
                  </div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: '#d97706' }}>
                    Great focus!
                  </p>
                </div>
              </div>
            </div>

            {/* Current Modules */}
            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0' }}>
                Continue Learning
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '20px'
              }}>
                {currentModules.map((module) => (
                  <div key={module.id} style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                      <div style={{
                        fontSize: '2.5rem',
                        background: 'rgba(5, 150, 105, 0.1)',
                        padding: '12px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px',
                        height: '60px'
                      }}>
                        {module.thumbnail}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                            {module.title}
                          </h3>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            background: `${getDifficultyColor(module.difficulty)}20`,
                            color: getDifficultyColor(module.difficulty)
                          }}>
                            {module.difficulty}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 8px 0' }}>
                          {module.description}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#9ca3af' }}>
                          <span>⭐ {module.culturalElements} cultural elements</span>
                          <span>⏱️ {module.timeRemaining} left</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.875rem', color: '#374151' }}>Progress</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                          {module.progress}%
                        </span>
                      </div>
                      <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${module.progress}%`,
                          background: 'linear-gradient(90deg, #059669, #10b981)',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px 0' }}>
                        Last activity: {module.lastActivity}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#374151', margin: '0', fontWeight: '500' }}>
                        Next: {module.nextLesson}
                      </p>
                    </div>

                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <Play style={{ width: '16px', height: '16px' }} />
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0' }}>
                Recent Activity
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentActivity.map((activity) => (
                  <div key={activity.id} style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      background: `${activity.color}20`,
                      padding: '8px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <activity.icon style={{ width: '20px', height: '20px', color: activity.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {activity.title}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 4px 0' }}>
                        {activity.description}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
              Upcoming Assignments
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {upcomingAssignments.map((assignment) => (
                <div key={assignment.id} style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {assignment.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0' }}>
                        {assignment.subject}
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: `${getPriorityColor(assignment.priority)}20`,
                      color: getPriorityColor(assignment.priority)
                    }}>
                      {assignment.priority}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0 0 16px 0' }}>
                    {assignment.description}
                  </p>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>Progress</span>
                      <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                        {assignment.progress}%
                      </span>
                    </div>
                    <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${assignment.progress}%`,
                        background: getProgressColor(assignment.progress),
                        borderRadius: '4px',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Due: {assignment.dueDate}
                    </span>
                    <button style={{
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}>
                      Continue Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
              Your Achievements
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {achievements.map((achievement) => (
                <div key={achievement.id} style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  opacity: achievement.unlocked ? 1 : 0.5,
                  transform: achievement.unlocked ? 'scale(1)' : 'scale(0.95)',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '16px',
                    background: achievement.unlocked ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : '#e5e7eb',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    {achievement.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: achievement.unlocked ? '#1f2937' : '#9ca3af',
                    margin: '0 0 8px 0'
                  }}>
                    {achievement.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: achievement.unlocked ? '#6b7280' : '#9ca3af',
                    margin: '0'
                  }}>
                    {achievement.description}
                  </p>
                  {achievement.unlocked && (
                    <div style={{
                      marginTop: '12px',
                      background: 'rgba(5, 150, 105, 0.1)',
                      color: '#059669',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      ✓ Unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
              Learning Resources
            </h2>
            <p style={{ fontSize: '1rem', color: '#6b7280', margin: '0' }}>
              Access 3,063+ culturally-responsive educational resources
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                onClick={() => window.location.href = '/resources'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <BookOpen style={{ width: '24px', height: '24px', color: '#059669' }} />
                <span style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Cultural Learning Library
                </span>
                <ChevronRight style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>

              <button
                onClick={() => alert('Interactive Modules - Hands-on Cultural Experiences!')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <Play style={{ width: '24px', height: '24px', color: '#059669' }} />
                <span style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Interactive Cultural Modules
                </span>
                <ChevronRight style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>

              <button
                onClick={() => alert('Study Groups - Connect with Cultural Learning Partners!')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px',
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <Users style={{ width: '24px', height: '24px', color: '#059669' }} />
                <span style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Cultural Study Groups
                </span>
                <ChevronRight style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EnhancedStudentDashboard;