import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Core educational links - always visible
  const coreLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/resources', label: 'Resources', icon: '📚', highlight: true },
    { to: '/teacher', label: 'Teachers', icon: '👨‍🏫' },
    { to: '/student', label: 'Students', icon: '👨‍🎓' },
  ];

  // AI systems - in dropdown menu
  const aiSystems = [
    // 🏺 TREASURE HUNT MISSION - PRIORITY SYSTEMS
    { to: '/treasure-integration', label: '🏰 Treasure Integration', icon: '🏰', highlight: true, highlightColor: '#f59e0b' },
    { to: '/treasure-hunt', label: '🏺 TREASURE HUNT', icon: '🏺', highlight: true, highlightColor: '#f59e0b' },
    { to: '/treasure-inventory', label: '💎 Treasure Inventory', icon: '💎', highlight: true, highlightColor: '#f59e0b' },
    
    // 👑 SUPREME COORDINATION SYSTEMS
    { to: '/supreme-overseer', label: 'Supreme Overseer', icon: '👑' },
    { to: '/intelligence-kingdom', label: '🧠 Intelligence Kingdom', icon: '🧠' },
    { to: '/glm-symphony', label: 'GLM Symphony', icon: '🎼' },
    { to: '/chain-of-agents', label: 'Chain-of-Agents', icon: '🔗' },
    { to: '/unified-coordination', label: 'Unified Agents', icon: '🤝' },
    { to: '/advanced-ai-orchestration', label: 'Advanced AI Orchestration', icon: '🎭' },
    
    // 🏰 EMPIRE & SOCIETY SYSTEMS
    { to: '/empire-command', label: 'Empire Command', icon: '🏰' },
    { to: '/evolved-society', label: 'Evolved AI Society', icon: '🧬' },
    { to: '/design-team', label: 'Design Team', icon: '🎨' },
    { to: '/supreme-ai-coordination', label: 'Supreme AI Coordination', icon: '👑' },
    { to: '/massive-scale', label: 'Massive Scale Dashboard', icon: '⚡' },
    { to: '/massive-llm-society', label: 'Massive LLM Society', icon: '🤖' },
    
    // 🌿 CULTURAL INTELLIGENCE SYSTEMS
    { to: '/cultural-intelligence', label: 'Cultural Intelligence', icon: '🌿' },
    { to: '/authentic-cultural', label: 'Authentic Cultural Integration', icon: '🎭' },
    { to: '/cultural-integration', label: 'Cultural Integration', icon: '🌺' },
    { to: '/cultural-safety', label: 'Cultural Safety Compliance', icon: '🛡️' },
    
    // 🎛️ SPECIALIZED DASHBOARDS
    { to: '/harmony-coordination', label: 'Harmony Coordination', icon: '🎵' },
    { to: '/ai-model-coordinator', label: 'AI Model Coordinator', icon: '🤖' },
    { to: '/enhanced-glm-symphony', label: 'Enhanced GLM Symphony', icon: '🎼' },
    { to: '/advanced-coordination', label: 'Advanced Coordination', icon: '⚙️' },
    { to: '/llm-coordination', label: 'LLM Coordination', icon: '🔗' },
    { to: '/mcp-communication', label: 'MCP Communication', icon: '📡' },
    
    // 🏆 ENHANCED DASHBOARDS - TREASURE HUNT DISCOVERIES
    { to: '/treasure-integration-dashboard', label: 'Treasure Integration Dashboard', icon: '🏆' },
    { to: '/enhanced-student-dashboard', label: 'Enhanced Student Dashboard', icon: '👨‍🎓' },
    { to: '/brilliant-teacher-dashboard', label: 'Brilliant Teacher Dashboard', icon: '👨‍🏫' },
    { to: '/cultural-integration-dashboard', label: 'Cultural Integration Dashboard', icon: '🌺' },
    { to: '/authentic-cultural-dashboard', label: 'Authentic Cultural Dashboard', icon: '🎭' },
    { to: '/glm-model-dashboard', label: 'GLM Model Dashboard', icon: '🎼' },
    { to: '/teacher-analytics-dashboard', label: 'Teacher Analytics Dashboard', icon: '📊' },
    { to: '/glm-page-tester', label: 'GLM Page Tester', icon: '🧪' },
    { to: '/unified-llm', label: 'Unified LLM Dashboard', icon: '🧠' },
    { to: '/superintelligence', label: 'Superintelligence', icon: '🚀' },
    { to: '/quality-filtering', label: 'Quality Filtering Harmony', icon: '✨' },
    { to: '/platform-audit', label: 'Platform Audit', icon: '🔍' },
    { to: '/glm-model', label: 'GLM Model Dashboard', icon: '🤖' },
  ];

  // Business/action links
  const actionLinks = [
    { to: '/subscription', label: 'Subscribe', icon: '💰', highlight: true },
  ];

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '16px 0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        position: 'relative',
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
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          🌿 Te Ao Mārama
        </Link>

        {/* Desktop Navigation */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px'
          }}
          className="desktop-nav"
        >
          {/* Core Links */}
          {coreLinks.map((link) => (
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
                whiteSpace: 'nowrap',
              }}
            >
              {link.icon} {link.label}
            </Link>
          ))}

          {/* AI Systems Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAIMenu(!showAIMenu)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.9)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              🤖 AI Systems {showAIMenu ? '▲' : '▼'}
            </button>

            {showAIMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  padding: '8px 0',
                  minWidth: '250px',
                  zIndex: 1000,
                  marginTop: '4px',
                }}
              >
                {aiSystems.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setShowAIMenu(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: location.pathname === link.to ? '#1e40af' : '#374151',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      borderLeft: location.pathname === link.to ? '3px solid #3b82f6' : '3px solid transparent',
                    }}
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Links */}
          {actionLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                background: link.highlight ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255, 255, 255, 0.1)',
                border: link.highlight ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          style={{
            display: 'block',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            background: 'white',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            padding: '16px 24px',
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...coreLinks, ...aiSystems, ...actionLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setShowMobileMenu(false)}
                style={{
                  color: location.pathname === link.to ? '#1e40af' : '#374151',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: location.pathname === link.to ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  fontSize: '1rem',
                  fontWeight: location.pathname === link.to ? '600' : '500',
                }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
