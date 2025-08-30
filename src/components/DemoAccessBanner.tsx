import React from 'react';
import { Link } from 'react-router-dom';

const DemoAccessBanner: React.FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #059669, #10b981)',
        color: 'white',
        padding: '1rem 2rem',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <span>🎭</span>
        <span>
          You're in <strong>DEMO MODE</strong> - Full access to explore all educational features
        </span>
        <Link
          to="/wisdom-accelerator"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          🧠 Wisdom Accelerator
        </Link>
        <Link
          to="/wisdom-evolution"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          🌟 Evolution Dashboard
        </Link>
        <Link
          to="/supreme-coordination"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25))';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15))';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(255, 255, 255, 0.1)';
          }}
        >
          🌌 Supreme Coordination
        </Link>
        <Link
          to="/test"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: '600',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          ⚙️ System Status
        </Link>
      </div>
    </div>
  );
};

export default DemoAccessBanner;