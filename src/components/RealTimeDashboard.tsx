import React, { useState, useEffect } from 'react';

interface RealTimeData {
  timestamp: string;
  activeUsers: number;
  resourcesAccessed: number;
  lessonsCreated: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  culturalCompliance: number;
  educationalValue: number;
}

const RealTimeDashboard: React.FC = () => {
  const [data, setData] = useState<RealTimeData>({
    timestamp: new Date().toISOString(),
    activeUsers: 0,
    resourcesAccessed: 0,
    lessonsCreated: 0,
    systemHealth: 'excellent',
    culturalCompliance: 0,
    educationalValue: 0,
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setData(prev => ({
          timestamp: new Date().toISOString(),
          activeUsers: Math.floor(Math.random() * 50) + 20,
          resourcesAccessed: prev.resourcesAccessed + Math.floor(Math.random() * 5),
          lessonsCreated: prev.lessonsCreated + Math.floor(Math.random() * 2),
          systemHealth: Math.random() > 0.1 ? 'excellent' : 'good',
          culturalCompliance: Math.min(100, prev.culturalCompliance + Math.floor(Math.random() * 3)),
          educationalValue: Math.min(100, prev.educationalValue + Math.floor(Math.random() * 2)),
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                📊 Real-Time Dashboard
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', margin: 0 }}>
                Live system monitoring • Te Ao Mārama Platform
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '20px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isLive ? '#10b981' : '#ef4444',
                  animation: isLive ? 'pulse 2s infinite' : 'none'
                }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {isLive ? 'LIVE' : 'PAUSED'}
                </span>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                style={{
                  background: isLive ? '#ef4444' : '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isLive ? '⏸️ Pause' : '▶️ Resume'}
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Active Users */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>👥 Active Users</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {data.activeUsers}
              </span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
              Currently online and engaged
            </p>
          </div>

          {/* Resources Accessed */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>📚 Resources Accessed</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {data.resourcesAccessed}
              </span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
              Total resources viewed today
            </p>
          </div>

          {/* Lessons Created */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>📝 Lessons Created</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                {data.lessonsCreated}
              </span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
              New lessons created today
            </p>
          </div>

          {/* System Health */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>🔧 System Health</h3>
              <span style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: getHealthColor(data.systemHealth),
                textTransform: 'uppercase'
              }}>
                {data.systemHealth}
              </span>
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
              Overall system performance
            </p>
          </div>

          {/* Cultural Compliance */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>🌿 Cultural Compliance</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {data.culturalCompliance}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${data.culturalCompliance}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #f59e0b 0%, #10b981 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Educational Value */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#e2e8f0' }}>🎯 Educational Value</h3>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ec4899' }}>
                {data.educationalValue}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${data.educationalValue}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '10px',
          padding: '15px',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.9rem'
        }}>
          Last updated: {new Date(data.timestamp).toLocaleString()}
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default RealTimeDashboard;
