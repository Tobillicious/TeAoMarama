import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  userEngagement: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    retentionRate: number;
  };
  contentMetrics: {
    totalResources: number;
    resourcesAccessed: number;
    averageSessionTime: number;
    popularSubjects: Array<{ subject: string; count: number; percentage: number }>;
  };
  learningProgress: {
    totalLessons: number;
    completedLessons: number;
    averageCompletionRate: number;
    topPerformingClasses: Array<{ className: string; completionRate: number; studentCount: number }>;
  };
  culturalIntegration: {
    culturalContentUsage: number;
    teReoEngagement: number;
    culturalSafetyScore: number;
    tikangaCompliance: number;
  };
  systemPerformance: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    userSatisfaction: number;
  };
}

interface TimeSeriesData {
  date: string;
  users: number;
  sessions: number;
  resources: number;
  completions: number;
}

const RealAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'learning' | 'cultural' | 'performance'>('overview');

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeframe]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock comprehensive analytics data
    const mockAnalyticsData: AnalyticsData = {
      userEngagement: {
        totalUsers: 1247,
        activeUsers: 892,
        newUsers: 156,
        retentionRate: 87.3
      },
      contentMetrics: {
        totalResources: 5439,
        resourcesAccessed: 12847,
        averageSessionTime: 24.5,
        popularSubjects: [
          { subject: 'Te Reo Māori', count: 3247, percentage: 25.3 },
          { subject: 'Science', count: 2891, percentage: 22.5 },
          { subject: 'Mathematics', count: 2156, percentage: 16.8 },
          { subject: 'Social Studies', count: 1987, percentage: 15.5 },
          { subject: 'English', count: 1566, percentage: 12.2 },
          { subject: 'Arts', count: 1000, percentage: 7.7 }
        ]
      },
      learningProgress: {
        totalLessons: 1247,
        completedLessons: 1089,
        averageCompletionRate: 87.3,
        topPerformingClasses: [
          { className: 'Room 12 - Te Reo Māori', completionRate: 94.2, studentCount: 24 },
          { className: 'Room 15 - Science', completionRate: 91.8, studentCount: 26 },
          { className: 'Room 8 - Social Studies', completionRate: 89.5, studentCount: 28 },
          { className: 'Hall - Performing Arts', completionRate: 87.1, studentCount: 22 }
        ]
      },
      culturalIntegration: {
        culturalContentUsage: 78.4,
        teReoEngagement: 82.1,
        culturalSafetyScore: 95.7,
        tikangaCompliance: 98.2
      },
      systemPerformance: {
        uptime: 99.8,
        responseTime: 1.2,
        errorRate: 0.1,
        userSatisfaction: 4.6
      }
    };

    // Mock time series data
    const mockTimeSeriesData: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        date: date.toISOString().split('T')[0],
        users: Math.floor(Math.random() * 50) + 800,
        sessions: Math.floor(Math.random() * 200) + 1200,
        resources: Math.floor(Math.random() * 100) + 400,
        completions: Math.floor(Math.random() * 80) + 300
      };
    });

    setAnalyticsData(mockAnalyticsData);
    setTimeSeriesData(mockTimeSeriesData);
    setIsLoading(false);
  };

  const getMetricColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return '#22c55e';
    if (value >= thresholds.warning) return '#f59e0b';
    return '#ef4444';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
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
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
          <div>Loading Analytics Dashboard...</div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
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
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                📊 Analytics Dashboard
              </h1>
              <p style={{
                fontSize: '1.2rem',
                opacity: 0.9
              }}>
                Comprehensive insights into platform performance and user engagement
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as any)}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={loadAnalyticsData}
                style={{
                  background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1.5rem',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                {formatNumber(analyticsData.userEngagement.totalUsers)}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Users</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {formatNumber(analyticsData.userEngagement.activeUsers)}
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Active Users</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {analyticsData.userEngagement.retentionRate}%
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Retention Rate</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {analyticsData.contentMetrics.averageSessionTime}m
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Avg Session</div>
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
          {['overview', 'users', 'content', 'learning', 'cultural', 'performance'].map(tab => (
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
            {/* Time Series Chart */}
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
                📈 Platform Activity Trends
              </h3>
              <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'space-between',
                gap: '2px',
                padding: '1rem 0'
              }}>
                {timeSeriesData.slice(-14).map((data, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flex: 1
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      height: '200px',
                      justifyContent: 'end'
                    }}>
                      <div style={{
                        background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                        height: `${(data.users / 1000) * 100}%`,
                        minHeight: '4px',
                        borderRadius: '2px 2px 0 0',
                        width: '20px'
                      }} />
                      <div style={{
                        background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                        height: `${(data.sessions / 1500) * 100}%`,
                        minHeight: '4px',
                        borderRadius: '0',
                        width: '20px'
                      }} />
                      <div style={{
                        background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                        height: `${(data.resources / 500) * 100}%`,
                        minHeight: '4px',
                        borderRadius: '0 0 2px 2px',
                        width: '20px'
                      }} />
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      transform: 'rotate(-45deg)',
                      whiteSpace: 'nowrap'
                    }}>
                      {new Date(data.date).toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginTop: '1rem',
                fontSize: '0.9rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#4ade80', borderRadius: '2px' }} />
                  <span>Users</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
                  <span>Sessions</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '2px' }} />
                  <span>Resources</span>
                </div>
              </div>
            </div>

            {/* Quick Insights */}
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
                💡 Quick Insights
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ fontSize: '1.5rem' }}>📈</div>
                    <div style={{ fontWeight: 'bold' }}>User Growth</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    +{analyticsData.userEngagement.newUsers} new users this period
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ fontSize: '1.5rem' }}>🎯</div>
                    <div style={{ fontWeight: 'bold' }}>Top Subject</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {analyticsData.contentMetrics.popularSubjects[0].subject} leads with {analyticsData.contentMetrics.popularSubjects[0].percentage}% usage
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ fontSize: '1.5rem' }}>🌿</div>
                    <div style={{ fontWeight: 'bold' }}>Cultural Integration</div>
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    {analyticsData.culturalIntegration.culturalSafetyScore}% cultural safety score
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
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
              👥 User Engagement Analytics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '0.5rem' }}>
                  {formatNumber(analyticsData.userEngagement.totalUsers)}
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Total Users</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🟢</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                  {formatNumber(analyticsData.userEngagement.activeUsers)}
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Active Users</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🆕</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {formatNumber(analyticsData.userEngagement.newUsers)}
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>New Users</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                  {analyticsData.userEngagement.retentionRate}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Retention Rate</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
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
              🌿 Cultural Integration Analytics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80', marginBottom: '0.5rem' }}>
                  {analyticsData.culturalIntegration.culturalContentUsage}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Cultural Content Usage</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗣️</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                  {analyticsData.culturalIntegration.teReoEngagement}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Te Reo Engagement</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {analyticsData.culturalIntegration.culturalSafetyScore}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Cultural Safety Score</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                  {analyticsData.culturalIntegration.tikangaCompliance}%
                </div>
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Tikanga Compliance</div>
              </div>
            </div>
          </div>
        )}

        {/* Add more tabs as needed */}
        {activeTab === 'content' && (
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
              📚 Content Analytics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {analyticsData.contentMetrics.popularSubjects.map((subject, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {subject.subject}
                  </div>
                  <div style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#4ade80',
                    marginBottom: '0.5rem'
                  }}>
                    {subject.percentage}%
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    {formatNumber(subject.count)} accesses
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

export default RealAnalyticsDashboard;
