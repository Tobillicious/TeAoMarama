import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TreasureItem {
  id: string;
  name: string;
  type: 'component' | 'dashboard' | 'navigation' | 'system' | 'utility';
  category: string;
  description: string;
  status: 'discovered' | 'linked' | 'reviewed' | 'master';
  duplicateCount: number;
  lastModified: string;
  agent: string;
  path: string;
  size: string;
}

const TreasureInventoryDashboard: React.FC = () => {
  const [treasures, setTreasures] = useState<TreasureItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [agentStats, setAgentStats] = useState<Record<string, number>>({});

  // Simulate treasure discovery
  useEffect(() => {
    const discoveredTreasures: TreasureItem[] = [
      // Navigation Systems
      {
        id: 'nav-1',
        name: 'ModernNavigation',
        type: 'navigation',
        category: 'Navigation',
        description: 'Professional educator-focused navigation with AI tools integration',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-1',
        path: '/src/components/ModernNavigation.tsx',
        size: '15.2 KB'
      },
      {
        id: 'nav-2',
        name: 'ProfessionalNavigation',
        type: 'navigation',
        category: 'Navigation',
        description: 'Clean professional navigation for educational platform',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-2',
        path: '/src/components/ProfessionalNavigation.tsx',
        size: '12.8 KB'
      },
      {
        id: 'nav-3',
        name: 'Navigation',
        type: 'navigation',
        category: 'Navigation',
        description: 'Core navigation with AI systems dropdown',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-3',
        path: '/src/components/Navigation.tsx',
        size: '8.9 KB'
      },
      {
        id: 'nav-4',
        name: 'SiteBreadcrumbs',
        type: 'navigation',
        category: 'Navigation',
        description: 'Advanced breadcrumb system with route mapping',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-4',
        path: '/src/components/SiteBreadcrumbs.tsx',
        size: '10.1 KB'
      },

      // Dashboard Systems
      {
        id: 'dash-1',
        name: 'AICoordinationMaximizationHub',
        type: 'dashboard',
        category: 'AI Coordination',
        description: 'Supreme AI coordination and maximization hub',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-1',
        path: '/src/components/AICoordinationMaximizationHub.tsx',
        size: '45.2 KB'
      },
      {
        id: 'dash-2',
        name: 'AdvancedAIOrchestrationDashboard',
        type: 'dashboard',
        category: 'AI Coordination',
        description: 'Advanced AI orchestration and coordination dashboard',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-2',
        path: '/src/components/AdvancedAIOrchestrationDashboard.tsx',
        size: '38.7 KB'
      },
      {
        id: 'dash-3',
        name: 'AdvancedAnalyticsDashboard',
        type: 'dashboard',
        category: 'Analytics',
        description: 'Comprehensive analytics and performance monitoring',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-3',
        path: '/src/components/AdvancedAnalyticsDashboard.tsx',
        size: '42.1 KB'
      },
      {
        id: 'dash-4',
        name: 'AdvancedCoordinationDashboard',
        type: 'dashboard',
        category: 'AI Coordination',
        description: 'Advanced coordination patterns and agent management',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-4',
        path: '/src/components/AdvancedCoordinationDashboard.tsx',
        size: '35.8 KB'
      },

      // Educational Systems
      {
        id: 'edu-1',
        name: 'AdvancedEducationalFeatures',
        type: 'system',
        category: 'Education',
        description: 'Advanced educational features and tools',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-1',
        path: '/src/components/AdvancedEducationalFeatures.tsx',
        size: '28.3 KB'
      },
      {
        id: 'edu-2',
        name: 'AuthenticCulturalIntegrationDashboard',
        type: 'dashboard',
        category: 'Cultural Integration',
        description: 'Authentic Māori cultural integration dashboard',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-2',
        path: '/src/components/AuthenticCulturalIntegrationDashboard.tsx',
        size: '31.5 KB'
      },
      {
        id: 'edu-3',
        name: 'AssessmentFramework',
        type: 'system',
        category: 'Assessment',
        description: 'Comprehensive assessment framework and tools',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-3',
        path: '/src/components/AssessmentFramework.tsx',
        size: '26.7 KB'
      },

      // AI Systems
      {
        id: 'ai-1',
        name: 'IntelligenceKingdomDashboard',
        type: 'dashboard',
        category: 'AI Intelligence',
        description: 'Supreme intelligence kingdom coordination dashboard',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-4',
        path: '/src/components/IntelligenceKingdomDashboard.tsx',
        size: '52.4 KB'
      },
      {
        id: 'ai-2',
        name: 'ChainOfAgentsDashboard',
        type: 'dashboard',
        category: 'AI Coordination',
        description: 'Chain-of-agents coordination and management',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-1',
        path: '/src/components/ChainOfAgentsDashboard.tsx',
        size: '41.2 KB'
      },
      {
        id: 'ai-3',
        name: 'EmpireCommandCenter',
        type: 'dashboard',
        category: 'AI Command',
        description: 'Empire command center for supreme coordination',
        status: 'discovered',
        duplicateCount: 1,
        lastModified: '2024-10-03',
        agent: 'Claude-2',
        path: '/src/components/EmpireCommandCenter.tsx',
        size: '38.9 KB'
      }
    ];

    setTreasures(discoveredTreasures);

    // Calculate agent statistics
    const stats = discoveredTreasures.reduce((acc, treasure) => {
      acc[treasure.agent] = (acc[treasure.agent] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    setAgentStats(stats);
  }, []);

  const filteredTreasures = treasures.filter(treasure => {
    const matchesFilter = filter === 'all' || treasure.type === filter || treasure.category === filter;
    const matchesSearch = treasure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treasure.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'discovered': return '#fbbf24';
      case 'linked': return '#3b82f6';
      case 'reviewed': return '#10b981';
      case 'master': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'navigation': return '🧭';
      case 'dashboard': return '📊';
      case 'system': return '⚙️';
      case 'utility': return '🔧';
      default: return '📦';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(45deg, #f59e0b, #f97316, #ea580c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          🏺 Treasure Inventory Dashboard
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9,
          margin: 0
        }}>
          Collaborative Discovery of Educational Platform Treasures
        </p>
      </div>

      {/* Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '2px solid rgba(245, 158, 11, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#f59e0b' }}>🏺 Total Treasures</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{treasures.length}</p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>Components Discovered</p>
        </div>

        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '2px solid rgba(59, 130, 246, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#3b82f6' }}>🤖 Active Agents</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>4</p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>Claude Agents</p>
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#10b981' }}>📊 Categories</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>
            {new Set(treasures.map(t => t.category)).size}
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>Unique Categories</p>
        </div>

        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#8b5cf6' }}>📈 Progress</h3>
          <p style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>
            {Math.round((treasures.filter(t => t.status === 'linked').length / treasures.length) * 100)}%
          </p>
          <p style={{ opacity: 0.8, margin: '0.5rem 0 0 0' }}>Linked to Navigation</p>
        </div>
      </div>

      {/* Agent Statistics */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          margin: '0 0 2rem 0',
          textAlign: 'center',
          color: '#f59e0b'
        }}>
          🤖 Agent Discovery Statistics
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {Object.entries(agentStats).map(([agent, count]) => (
            <div key={agent} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#3b82f6' }}>{agent}</h4>
              <p style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>{count}</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>Treasures Found</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '3rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <input
            type="text"
            placeholder="🔍 Search treasures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '1rem',
              minWidth: '250px'
            }}
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: 'white',
              fontSize: '1rem'
            }}
          >
            <option value="all">All Types</option>
            <option value="navigation">🧭 Navigation</option>
            <option value="dashboard">📊 Dashboard</option>
            <option value="system">⚙️ System</option>
            <option value="utility">🔧 Utility</option>
          </select>
        </div>
      </div>

      {/* Treasures Grid */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '2rem',
        borderRadius: '20px'
      }}>
        <h2 style={{
          fontSize: '2rem',
          margin: '0 0 2rem 0',
          textAlign: 'center',
          color: '#10b981'
        }}>
          🏺 Discovered Treasures ({filteredTreasures.length})
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredTreasures.map((treasure) => (
            <div key={treasure.id} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: `2px solid ${getStatusColor(treasure.status)}`,
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
              }}>
                <div>
                  <h3 style={{
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    {getTypeIcon(treasure.type)} {treasure.name}
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    color: '#f59e0b'
                  }}>
                    {treasure.category}
                  </p>
                </div>
                <div style={{
                  background: getStatusColor(treasure.status),
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {treasure.status.toUpperCase()}
                </div>
              </div>

              <p style={{
                margin: '0 0 1rem 0',
                fontSize: '0.9rem',
                opacity: 0.9,
                lineHeight: '1.4'
              }}>
                {treasure.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                fontSize: '0.8rem',
                opacity: 0.8
              }}>
                <span>Agent: {treasure.agent}</span>
                <span>Size: {treasure.size}</span>
                <span>Modified: {treasure.lastModified}</span>
              </div>

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}>
                <Link
                  to={treasure.path}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    flex: 1,
                    textAlign: 'center'
                  }}
                >
                  🔗 Link to Navigation
                </Link>
                <button style={{
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.5)',
                  color: '#f59e0b',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  📝 Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '15px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '1.1rem',
          opacity: 0.8
        }}>
          🏺 Treasure Hunt Mission - Te Ao Mārama Educational Platform
        </p>
        <p style={{
          margin: '0.5rem 0 0 0',
          fontSize: '0.9rem',
          opacity: 0.6
        }}>
          Collaborative Discovery • Agent Coordination • Educational Excellence
        </p>
      </div>
    </div>
  );
};

export default TreasureInventoryDashboard;