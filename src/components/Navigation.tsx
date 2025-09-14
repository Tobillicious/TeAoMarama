import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SimpleNavigationWorking: React.FC = () => {
  const location = useLocation();

  const mainLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    {
      to: '/resources',
      label: '✅ REAL RESOURCES',
      icon: '📚',
      highlight: true,
      highlightColor: '#10b981',
    },
    { to: '/teacher', label: 'TEACHER', icon: '👨‍🏫' },
    { to: '/student', label: 'STUDENT', icon: '👨‍🎓' },
    { to: '/glm-symphony', label: 'GLM AI', icon: '🎼' },
    {
      to: '/supreme-ai',
      label: 'SUPREME AI',
      icon: '👑',
      highlight: true,
      highlightColor: '#8b5cf6',
    },
    {
      to: '/graphrag',
      label: 'GRAPHRAG',
      icon: '🧠',
      highlight: true,
      highlightColor: '#10b981',
    },
    {
      to: '/llm-army',
      label: 'LLM ARMY',
      icon: '🚀',
      highlight: true,
      highlightColor: '#f59e0b',
    },
    {
      to: '/exa-ai',
      label: 'EXA.AI',
      icon: '🔍',
      highlight: true,
      highlightColor: '#3b82f6',
    },
    {
      to: '/teacher-demo',
      label: 'TEACHER DEMO',
      icon: '🎯',
      highlight: true,
      highlightColor: '#8b5cf6',
    },
  ];

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '16px 0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            to="/"
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            🌿 Te Ao Mārama
          </Link>

          <div style={{ display: 'flex', gap: '24px' }}>
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  color: location.pathname === link.to ? '#fbbf24' : 'rgba(255, 255, 255, 0.9)',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: link.highlight ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  border: link.highlight ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  fontWeight: location.pathname === link.to ? '600' : '500',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavigationWorking;
