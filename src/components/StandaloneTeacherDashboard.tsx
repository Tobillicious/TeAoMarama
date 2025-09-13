import React, { useState } from 'react';
import { 
  BookOpen, Users, BarChart3, FileText, Calendar, Settings, 
  Plus, Search, Filter, Download, Upload, Bell, Star,
  TrendingUp, Clock, Target, Award, MessageCircle, Eye,
  ChevronRight, Activity, PieChart, AlertTriangle, CheckCircle
} from 'lucide-react';

const StandaloneTeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // All sample data built-in - NO external dependencies
  const stats = {
    totalStudents: 28,
    activeStudents: 24,
    averageProgress: 73,
    pendingAssessments: 6,
    culturalResourcesUsed: 42,
    lessonPlansCreated: 12,
    weeklyEngagement: 89,
    parentNotifications: 3,
  };

  const studentProgress = [
    {
      id: '1',
      name: 'Aroha Williams',
      yearLevel: 'Year 8',
      overallProgress: 85,
      recentActivity: 'Completed Te Reo vocabulary assessment',
      culturalEngagement: 92,
      strengths: ['Cultural knowledge', 'Critical thinking'],
      needsSupport: ['Mathematics application'],
    },
    {
      id: '2', 
      name: 'James Thompson',
      yearLevel: 'Year 8',
      overallProgress: 67,
      recentActivity: 'Started social studies project',
      culturalEngagement: 58,
      strengths: ['Writing skills', 'Research'],
      needsSupport: ['Cultural connections', 'Engagement'],
    },
    {
      id: '3',
      name: 'Mere Patel',
      yearLevel: 'Year 8', 
      overallProgress: 91,
      recentActivity: 'Completed advanced literacy module',
      culturalEngagement: 87,
      strengths: ['Leadership', 'Te Reo Māori', 'Academic excellence'],
      needsSupport: ['Peer collaboration'],
    },
  ];

  const lessonPlans = [
    {
      id: '1',
      title: 'Māori Perspectives in Science',
      subject: 'Science',
      yearLevel: 'Year 8',
      duration: '50 mins',
      status: 'published' as const,
      culturalElements: 4,
      lastModified: '2 hours ago',
    },
    {
      id: '2',
      title: 'Critical Literacy: Media Representation',
      subject: 'English',
      yearLevel: 'Year 8', 
      duration: '60 mins',
      status: 'draft' as const,
      culturalElements: 3,
      lastModified: '1 day ago',
    },
    {
      id: '3',
      title: 'Statistical Analysis with NZ Data',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      duration: '45 mins', 
      status: 'in-progress' as const,
      culturalElements: 2,
      lastModified: '3 hours ago',
    },
  ];

  const quickActions = [
    {
      title: 'Create Lesson Plan',
      icon: <Plus />,
      description: 'Design culturally-responsive lessons',
      action: () => alert('Lesson Planner - Ready for implementation'),
      color: '#059669',
    },
    {
      title: 'View Student Progress', 
      icon: <Users />,
      description: 'Monitor class performance',
      action: () => setActiveTab('students'),
      color: '#3b82f6',
    },
    {
      title: 'Cultural Resources',
      icon: <BookOpen />,
      description: 'Access Te Ao Mārama content',
      action: () => window.location.href = '/resources',
      color: '#7c3aed',
    },
    {
      title: 'Assessment Tools',
      icon: <Target />,
      description: 'Create and manage assessments',
      action: () => alert('Assessment Creator - Professional Tools Ready'),
      color: '#dc2626',
    },
    {
      title: 'Parent Communication',
      icon: <MessageCircle />,
      description: 'Connect with families',
      action: () => alert('Parent Communication System - Alpha Ready'),
      color: '#059669',
    },
    {
      title: 'Professional Development',
      icon: <Award />,
      description: 'Enhance cultural competency',
      action: () => alert('Professional Development - Cultural Training Modules'),
      color: '#d97706',
    },
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return '#059669';
    if (progress >= 60) return '#d97706';
    return '#dc2626';
  };

  const getStatusColor = (status: 'published' | 'in-progress' | 'draft') => {
    switch (status) {
      case 'published': return '#059669';
      case 'in-progress': return '#d97706';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const filteredStudents = studentProgress.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div /* TODO: Move to external CSS */ style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header /* TODO: Move to external CSS */ style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '20px 0',
        boxShadow: '0 4px 20px rgba(30, 64, 175, 0.15)'
      }}>
        <div /* TODO: Move to external CSS */ style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div>
            <h1 /* TODO: Move to external CSS */ style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0 0 8px 0' }}>
              Kia ora, Professional Kaiako! 👨‍🏫
            </h1>
            <p /* TODO: Move to external CSS */ style={{ fontSize: '1rem', opacity: 0.9, margin: '0' }}>
              Professional Teaching Dashboard - Alpha Testing School
            </p>
          </div>
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button /* TODO: Move to external CSS */ style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Bell />
              {stats.parentNotifications > 0 && (
                <span /* TODO: Move to external CSS */ style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#dc2626',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  {stats.parentNotifications}
                </span>
              )}
            </button>
            <button /* TODO: Move to external CSS */ style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              <Settings />
            </button>
            <button /* TODO: Move to external CSS */ style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav /* TODO: Move to external CSS */ style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0',
        display: 'flex',
        overflowX: 'auto'
      }}>
        {[
          { id: 'overview', icon: <Activity />, label: 'Overview' },
          { id: 'students', icon: <Users />, label: `Students (${stats.totalStudents})` },
          { id: 'lessons', icon: <BookOpen />, label: `Lesson Plans (${lessonPlans.length})` },
          { id: 'analytics', icon: <BarChart3 />, label: 'Analytics' },
          { id: 'resources', icon: <FileText />, label: 'Resources' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            /* TODO: Move to external CSS */ style={{
              background: 'none',
              border: 'none',
              padding: '16px 20px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: activeTab === tab.id ? '600' : '500',
              color: activeTab === tab.id ? '#1e40af' : '#6b7280',
              borderBottom: activeTab === tab.id ? '3px solid #1e40af' : '3px solid transparent',
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
      <main /* TODO: Move to external CSS */ style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Stats Grid */}
            <div /* TODO: Move to external CSS */ style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              <div /* TODO: Move to external CSS */ style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                padding: '24px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div /* TODO: Move to external CSS */ style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users />
                </div>
                <div>
                  <h3 /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Active Students
                  </h3>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {stats.activeStudents}/{stats.totalStudents}
                  </div>
                  <p /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: 'rgba(255, 255, 255, 0.8)' }}>
                    +2 this week
                  </p>
                </div>
              </div>
              
              <div /* TODO: Move to external CSS */ style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div /* TODO: Move to external CSS */ style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp /* TODO: Move to external CSS */ style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Average Progress
                  </h3>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {stats.averageProgress}%
                  </div>
                  <p /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: '#059669' }}>
                    +5% this month
                  </p>
                </div>
              </div>

              <div /* TODO: Move to external CSS */ style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div /* TODO: Move to external CSS */ style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Star /* TODO: Move to external CSS */ style={{ color: '#3b82f6' }} />
                </div>
                <div>
                  <h3 /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', fontWeight: '500', margin: '0 0 4px 0', opacity: 0.8 }}>
                    Cultural Resources
                  </h3>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                    {stats.culturalResourcesUsed}
                  </div>
                  <p /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', fontWeight: '500', margin: '0', color: '#059669' }}>
                    Used this term
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <section>
              <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0' }}>
                Quick Actions
              </h2>
              <div /* TODO: Move to external CSS */ style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    style={{
                      background: 'white',
                      padding: '24px',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      borderTop: `4px solid ${action.color}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div /* TODO: Move to external CSS */ style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: action.color
                    }}>
                      {action.icon}
                    </div>
                    <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                      {action.title}
                    </h3>
                    <p /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0', lineHeight: '1.4' }}>
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
                Student Progress Overview
              </h2>
              <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div /* TODO: Move to external CSS */ style={{ position: 'relative', minWidth: '200px' }}>
                  <Search /* TODO: Move to external CSS */ style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    /* TODO: Move to external CSS */ style={{
                      width: '100%',
                      padding: '8px 12px 8px 36px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
                <button /* TODO: Move to external CSS */ style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  <Filter /* TODO: Move to external CSS */ style={{ width: '16px', height: '16px' }} />
                  Filter
                </button>
                <button /* TODO: Move to external CSS */ style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}>
                  <Download /* TODO: Move to external CSS */ style={{ width: '16px', height: '16px' }} />
                  Export
                </button>
              </div>
            </div>

            <div /* TODO: Move to external CSS */ style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {filteredStudents.map((student) => (
                <div key={student.id} /* TODO: Move to external CSS */ style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {student.name}
                      </h3>
                      <p /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0' }}>
                        {student.yearLevel}
                      </p>
                    </div>
                    <button /* TODO: Move to external CSS */ style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: 'none',
                      color: '#3b82f6',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <Eye /* TODO: Move to external CSS */ style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ marginBottom: '16px' }}>
                    <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#374151', minWidth: '120px' }}>
                        Overall Progress
                      </span>
                      <div /* TODO: Move to external CSS */ style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${student.overallProgress}%`,
                          backgroundColor: getProgressColor(student.overallProgress),
                          transition: 'width 0.3s ease',
                          borderRadius: '4px'
                        }} />
                      </div>
                      <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', minWidth: '40px', textAlign: 'right' }}>
                        {student.overallProgress}%
                      </span>
                    </div>

                    <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#374151', minWidth: '120px' }}>
                        Cultural Engagement
                      </span>
                      <div /* TODO: Move to external CSS */ style={{ flex: 1, height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${student.culturalEngagement}%`,
                          backgroundColor: '#7c3aed',
                          transition: 'width 0.3s ease',
                          borderRadius: '4px'
                        }} />
                      </div>
                      <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', minWidth: '40px', textAlign: 'right' }}>
                        {student.culturalEngagement}%
                      </span>
                    </div>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ marginBottom: '16px' }}>
                    <p /* TODO: Move to external CSS */ style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      margin: '0'
                    }}>
                      <Clock /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} />
                      {student.recentActivity}
                    </p>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <h4 /* TODO: Move to external CSS */ style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        margin: '0 0 6px 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: '#059669'
                      }}>
                        Strengths:
                      </h4>
                      <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {student.strengths.map((strength, index) => (
                          <span key={index} /* TODO: Move to external CSS */ style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            background: 'rgba(5, 150, 105, 0.1)',
                            color: '#059669'
                          }}>
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {student.needsSupport.length > 0 && (
                      <div>
                        <h4 /* TODO: Move to external CSS */ style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          margin: '0 0 6px 0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          color: '#dc2626'
                        }}>
                          Needs Support:
                        </h4>
                        <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {student.needsSupport.map((need, index) => (
                            <span key={index} /* TODO: Move to external CSS */ style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              background: 'rgba(220, 38, 38, 0.1)',
                              color: '#dc2626'
                            }}>
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
              Class Analytics & Insights
            </h2>
            
            <div /* TODO: Move to external CSS */ style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div /* TODO: Move to external CSS */ style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 16px 0' }}>
                  Weekly Engagement
                </h3>
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div /* TODO: Move to external CSS */ style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
                    <PieChart size={80} />
                    <div /* TODO: Move to external CSS */ style={{
                      position: 'absolute',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>
                      {stats.weeklyEngagement}%
                    </div>
                  </div>
                  <p /* TODO: Move to external CSS */ style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.875rem', margin: '0' }}>
                    Students actively engaged this week
                  </p>
                </div>
              </div>

              <div /* TODO: Move to external CSS */ style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 16px 0' }}>
                  Cultural Integration Success
                </h3>
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280' }}>Resources Used</span>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                      {stats.culturalResourcesUsed}
                    </span>
                  </div>
                  <div /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280' }}>Te Reo Engagement</span>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>87%</span>
                  </div>
                  <div /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0'
                  }}>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280' }}>Cultural Competency</span>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>92%</span>
                  </div>
                </div>
              </div>

              <div /* TODO: Move to external CSS */ style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                gridColumn: '1 / -1'
              }}>
                <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 16px 0' }}>
                  Subject Performance Trends
                </h3>
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { subject: 'English', percentage: 85 },
                    { subject: 'Mathematics', percentage: 73 },
                    { subject: 'Science', percentage: 79 },
                    { subject: 'Social Studies', percentage: 91 }
                  ].map((item, index) => (
                    <div key={index} /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span /* TODO: Move to external CSS */ style={{
                        minWidth: '100px',
                        fontSize: '0.875rem',
                        color: '#374151',
                        fontWeight: '500'
                      }}>
                        {item.subject}
                      </span>
                      <div /* TODO: Move to external CSS */ style={{
                        flex: 1,
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, #3b82f6, #1e40af)',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease',
                          width: `${item.percentage}%`
                        }} />
                      </div>
                      <span /* TODO: Move to external CSS */ style={{
                        minWidth: '40px',
                        textAlign: 'right',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
              Teaching Resources & Materials
            </h2>
            <p /* TODO: Move to external CSS */ style={{ fontSize: '1rem', color: '#6b7280', margin: '0' }}>
              Access to 3,063+ culturally-responsive educational resources
            </p>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button
                onClick={() => window.location.href = '/resources'}
                /* TODO: Move to external CSS */ style={{
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
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <BookOpen /* TODO: Move to external CSS */ style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <span /* TODO: Move to external CSS */ style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Te Kete Ako Collection
                </span>
                <ChevronRight /* TODO: Move to external CSS */ style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
              
              <button
                onClick={() => alert('Cultural Learning Modules - Deep Inquiry-Based Learning Ready!')}
                /* TODO: Move to external CSS */ style={{
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
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <Star /* TODO: Move to external CSS */ style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <span /* TODO: Move to external CSS */ style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Cultural Learning Modules
                </span>
                <ChevronRight /* TODO: Move to external CSS */ style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
              
              <button
                onClick={() => alert('Assessment Tools - Professional Alpha Testing Suite Ready!')}
                /* TODO: Move to external CSS */ style={{
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
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <Target /* TODO: Move to external CSS */ style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
                <span /* TODO: Move to external CSS */ style={{ flex: 1, fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>
                  Assessment Tools
                </span>
                <ChevronRight /* TODO: Move to external CSS */ style={{ width: '20px', height: '20px', color: '#6b7280' }} />
              </button>
            </div>
          </div>
        )}

        {/* Lessons Tab */}
        {activeTab === 'lessons' && (
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>
                Lesson Plans
              </h2>
              <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button /* TODO: Move to external CSS */ style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <Plus /* TODO: Move to external CSS */ style={{ width: '16px', height: '16px' }} />
                  Create New Lesson
                </button>
              </div>
            </div>

            <div /* TODO: Move to external CSS */ style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '20px'
            }}>
              {lessonPlans.map((lesson) => (
                <div key={lesson.id} /* TODO: Move to external CSS */ style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px'
                }}>
                  <div /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 /* TODO: Move to external CSS */ style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {lesson.title}
                      </h3>
                      <p /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0' }}>
                        {lesson.subject} • {lesson.yearLevel}
                      </p>
                    </div>
                    <span /* TODO: Move to external CSS */ style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      color: 'white',
                      backgroundColor: getStatusColor(lesson.status)
                    }}>
                      {lesson.status}
                    </span>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ marginBottom: '16px' }}>
                    <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                      <span /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6b7280' }}>
                        <Clock /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} /> {lesson.duration}
                      </span>
                      <span /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6b7280' }}>
                        <Star /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} /> {lesson.culturalElements} cultural elements
                      </span>
                    </div>
                    
                    <p /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#9ca3af', margin: '0' }}>
                      Modified {lesson.lastModified}
                    </p>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '8px' }}>
                    <button /* TODO: Move to external CSS */ style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <Eye /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} />
                      View
                    </button>
                    <button /* TODO: Move to external CSS */ style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <FileText /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} />
                      Edit
                    </button>
                    <button /* TODO: Move to external CSS */ style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <Users /* TODO: Move to external CSS */ style={{ width: '14px', height: '14px' }} />
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StandaloneTeacherDashboard;