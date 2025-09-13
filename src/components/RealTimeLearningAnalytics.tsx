import React, { useEffect, useState } from 'react';
import { Activity, TrendingUp, Users, Brain, Heart, Target } from 'lucide-react';

interface LearningMetric {
  id: string;
  studentName: string;
  currentActivity: string;
  engagementLevel: number;
  culturalConnection: number;
  learningVelocity: number;
  timeOnTask: number;
  strugglingAreas: string[];
  strengths: string[];
  lastActive: Date;
}

interface ClassroomInsight {
  totalStudents: number;
  activeNow: number;
  averageEngagement: number;
  culturalParticipation: number;
  needsSupport: number;
  excelling: number;
  groupDynamics: 'collaborative' | 'individual' | 'mixed';
  recommendedAction: string;
}

const RealTimeLearningAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<LearningMetric[]>([]);
  const [insights, setInsights] = useState<ClassroomInsight | null>(null);
  const [isLive, setIsLive] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  // Generate realistic real-time data
  const generateLiveData = () => {
    const studentNames = [
      'Aroha Williams', 'James Thompson', 'Mere Patel', 'Te Koha Smith', 
      'Sarah Johnson', 'Rawiri Brown', 'Emily Chen', 'Kai Wilson',
      'Isabella Davis', 'Tane Robinson', 'Grace Anderson', 'Hemi Taylor'
    ];

    const activities = [
      'Te Reo Vocabulary Practice',
      'Mathematics Problem Solving',
      'Science Investigation',
      'Cultural Story Reading',
      'Art Creation Project',
      'Music Composition',
      'Environmental Study',
      'History Research',
      'Literature Analysis',
      'Geography Mapping'
    ];

    const strugglingAreas = [
      'Mathematical reasoning', 'Reading comprehension', 'Cultural connections',
      'Writing fluency', 'Scientific method', 'Critical thinking'
    ];

    const strengths = [
      'Creative thinking', 'Cultural knowledge', 'Leadership', 'Collaboration',
      'Problem solving', 'Communication', 'Te Reo proficiency', 'Artistic expression'
    ];

    const newMetrics: LearningMetric[] = studentNames.map((name, index) => ({
      id: `student-${index}`,
      studentName: name,
      currentActivity: activities[Math.floor(Math.random() * activities.length)],
      engagementLevel: Math.floor(Math.random() * 30) + 70, // 70-100
      culturalConnection: Math.floor(Math.random() * 40) + 60, // 60-100
      learningVelocity: Math.floor(Math.random() * 50) + 50, // 50-100
      timeOnTask: Math.floor(Math.random() * 45) + 5, // 5-50 minutes
      strugglingAreas: strugglingAreas.slice(0, Math.floor(Math.random() * 3)),
      strengths: strengths.slice(0, Math.floor(Math.random() * 4) + 1),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 300000)) // Within last 5 minutes
    }));

    setMetrics(newMetrics);

    // Calculate classroom insights
    const totalStudents = newMetrics.length;
    const activeNow = newMetrics.filter(m => Date.now() - m.lastActive.getTime() < 120000).length; // Active in last 2 minutes
    const averageEngagement = Math.floor(newMetrics.reduce((sum, m) => sum + m.engagementLevel, 0) / totalStudents);
    const culturalParticipation = Math.floor(newMetrics.reduce((sum, m) => sum + m.culturalConnection, 0) / totalStudents);
    const needsSupport = newMetrics.filter(m => m.engagementLevel < 75 || m.strugglingAreas.length > 1).length;
    const excelling = newMetrics.filter(m => m.engagementLevel > 90 && m.culturalConnection > 85).length;

    const newInsights: ClassroomInsight = {
      totalStudents,
      activeNow,
      averageEngagement,
      culturalParticipation,
      needsSupport,
      excelling,
      groupDynamics: Math.random() > 0.5 ? 'collaborative' : 'individual',
      recommendedAction: needsSupport > 3 
        ? 'Consider providing additional support to struggling students'
        : averageEngagement > 85 
        ? 'Class is highly engaged - great time for challenging activities'
        : 'Maintain current teaching approach'
    };

    setInsights(newInsights);
  };

  useEffect(() => {
    generateLiveData();
    
    if (isLive) {
      const interval = setInterval(generateLiveData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [isLive, refreshInterval]);

  const getEngagementColor = (level: number) => {
    if (level >= 90) return 'text-green-600 bg-green-100';
    if (level >= 75) return 'text-blue-600 bg-blue-100';
    if (level >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getActivityStatus = (lastActive: Date) => {
    const minutesAgo = Math.floor((Date.now() - lastActive.getTime()) / 60000);
    if (minutesAgo < 2) return { status: 'Active now', color: 'text-green-600' };
    if (minutesAgo < 5) return { status: `${minutesAgo}m ago`, color: 'text-blue-600' };
    return { status: `${minutesAgo}m ago`, color: 'text-gray-600' };
  };

  return (
    <div /* TODO: Move to external CSS */ style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
      padding: '2rem'
    }}>
      <div /* TODO: Move to external CSS */ style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div /* TODO: Move to external CSS */ style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h1 /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', color: '#1a365d', margin: '0 0 0.5rem 0' }}>
                📊 Real-Time Learning Analytics
              </h1>
              <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: 0 }}>
                Live classroom insights with cultural intelligence integration
              </p>
            </div>
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => setIsLive(!isLive)}
                /* TODO: Move to external CSS */ style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isLive ? '#dc2626' : '#059669',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isLive ? '⏸️ Pause Live' : '▶️ Resume Live'}
              </button>
              <div /* TODO: Move to external CSS */ style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: isLive ? '#059669' : '#6b7280',
                fontWeight: '600'
              }}>
                <div /* TODO: Move to external CSS */ style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isLive ? '#10b981' : '#6b7280'
                }} />
                {isLive ? 'LIVE' : 'PAUSED'}
              </div>
            </div>
          </div>
        </div>

        {/* Classroom Overview */}
        {insights && (
          <div /* TODO: Move to external CSS */ style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Users size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{insights.activeNow}</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Active Now</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Activity size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{insights.averageEngagement}%</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Avg Engagement</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Heart size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{insights.culturalParticipation}%</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Cultural Connection</div>
            </div>

            <div /* TODO: Move to external CSS */ style={{ 
              background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)',
              color: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <Target size={32} /* TODO: Move to external CSS */ style={{ marginBottom: '0.5rem' }} />
              <div /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700' }}>{insights.needsSupport}</div>
              <div /* TODO: Move to external CSS */ style={{ opacity: 0.9 }}>Need Support</div>
            </div>
          </div>
        )}

        {/* Recommended Action */}
        {insights && (
          <div /* TODO: Move to external CSS */ style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Brain size={20} /* TODO: Move to external CSS */ style={{ color: '#d97706' }} />
              <span /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#92400e' }}>
                Recommendation: {insights.recommendedAction}
              </span>
            </div>
          </div>
        )}

        {/* Student Metrics */}
        <div /* TODO: Move to external CSS */ style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h2 /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1a365d', marginBottom: '1.5rem' }}>
            Individual Student Analytics
          </h2>
          
          <div /* TODO: Move to external CSS */ style={{ 
            display: 'grid',
            gap: '1rem'
          }}>
            {metrics.map((metric) => {
              const activityStatus = getActivityStatus(metric.lastActive);
              return (
                <div 
                  key={metric.id}
                  /* TODO: Move to external CSS */ style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 150px 120px 120px',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748', marginBottom: '0.25rem' }}>
                      {metric.studentName}
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '0.5rem' }}>
                      {metric.currentActivity}
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: activityStatus.color }}>
                      {activityStatus.status}
                    </div>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.25rem' }}>
                      Engagement
                    </div>
                    <div style={{
                      ...getEngagementColor(metric.engagementLevel).split(' ').reduce((acc, cls) => {
                        if (cls.includes('text-')) acc.color = cls.replace('text-', '').replace('-600', '');
                        if (cls.includes('bg-')) acc.background = cls.replace('bg-', '').replace('-100', '');
                        return acc;
                      }, {} as any),
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {metric.engagementLevel}%
                    </div>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.25rem' }}>
                      Cultural
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748' }}>
                      {metric.culturalConnection}%
                    </div>
                  </div>

                  <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '0.25rem' }}>
                      Time on Task
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748' }}>
                      {metric.timeOnTask}m
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeLearningAnalytics;