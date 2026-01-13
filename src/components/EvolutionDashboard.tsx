import React, { useState, useEffect } from 'react';
import { componentRegistry } from '../utils/component-registry';
import { appGenerator } from '../utils/app-generator';

const EvolutionDashboard: React.FC = () => {
  const [componentStats, setComponentStats] = useState({
    total: 0,
    verified: 0,
    broken: 0,
    categories: [] as string[]
  });

  const [evolutionPhase, setEvolutionPhase] = useState('Phase 3: Advanced Systems');

  useEffect(() => {
    // Get component registry statistics
    const stats = {
      total: componentRegistry.getComponentCount(),
      verified: componentRegistry.getVerifiedCount(),
      broken: componentRegistry.getBrokenCount(),
      categories: componentRegistry.getCategories()
    };
    setComponentStats(stats);
  }, []);

  const evolutionPhases = [
    {
      phase: 'Phase 1',
      title: 'Foundation Systems',
      status: '✅ Complete',
      description: 'Core educational features, navigation, and basic functionality',
      components: ['Navigation', 'Working Dashboards', 'Core Features']
    },
    {
      phase: 'Phase 2', 
      title: 'Treasure Integration',
      status: '✅ Complete',
      description: 'Treasure hunt systems, coordination protocols, and component discovery',
      components: ['Treasure Hunt', 'Harmony Coordination', 'Component Discovery']
    },
    {
      phase: 'Phase 3',
      title: 'Advanced Systems',
      status: '🚀 Active',
      description: 'Component registry, app generator, brain/cortex, and multi-LLM coordination',
      components: ['Component Registry', 'App Generator', 'Brain/Cortex', 'Multi-LLM Coordination']
    },
    {
      phase: 'Phase 4',
      title: 'Intelligence Evolution',
      status: '🔮 Planned',
      description: 'AI-powered content generation, predictive analytics, and autonomous optimization',
      components: ['AI Content Generation', 'Predictive Analytics', 'Autonomous Optimization']
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #f59e0b, #10b981, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 Evolution Dashboard
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
            Advanced Capability Development & System Evolution
          </p>
        </div>

        {/* Current Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#f59e0b' }}>🎯 Current Evolution Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                {componentStats.total}
              </div>
              <div style={{ color: '#94a3b8' }}>Total Components</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {componentStats.verified}
              </div>
              <div style={{ color: '#94a3b8' }}>Verified Components</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                {componentStats.broken}
              </div>
              <div style={{ color: '#94a3b8' }}>Broken Components</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                {componentStats.categories.length}
              </div>
              <div style={{ color: '#94a3b8' }}>Categories</div>
            </div>
          </div>
        </div>

        {/* Evolution Phases */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#f59e0b' }}>🧬 Evolution Phases</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {evolutionPhases.map((phase, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderLeft: `4px solid ${phase.status.includes('Complete') ? '#10b981' : phase.status.includes('Active') ? '#f59e0b' : '#6b7280'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, color: 'white' }}>{phase.phase}: {phase.title}</h3>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem', 
                    fontSize: '0.875rem',
                    background: phase.status.includes('Complete') ? '#10b981' : phase.status.includes('Active') ? '#f59e0b' : '#6b7280',
                    color: 'white'
                  }}>
                    {phase.status}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{phase.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {phase.components.map((component, compIndex) => (
                    <span key={compIndex} style={{
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      color: '#e2e8f0'
                    }}>
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Systems Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#f59e0b' }}>🧠 Advanced Systems Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧠</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Component Registry</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Systematic component tracking and management</p>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Active</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚡</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>App Generator</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Automated app generation and capability expansion</p>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Active</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Brain/Cortex</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Intelligent content processing and knowledge extraction</p>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Active</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Multi-LLM Coordination</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Advanced agent coordination and communication</p>
              <div style={{ color: '#10b981', fontWeight: 'bold' }}>✅ Active</div>
            </div>
          </div>
        </div>

        {/* Evolution Progress */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div style={{ 
            background: 'linear-gradient(90deg, #10b981 0%, #10b981 75%, #6b7280 75%, #6b7280 100%)',
            height: '0.5rem',
            borderRadius: '1rem',
            marginBottom: '1rem'
          }}></div>
          <p style={{ color: '#94a3b8' }}>
            Evolution Progress: 75% Complete - Phase 3 Advanced Systems Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvolutionDashboard;
