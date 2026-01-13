import React, { useState, useEffect } from 'react';
import { treasureIntegrationService, type Treasure, type TreasureStats } from '../utils/treasure-integration-service';

const TreasureHuntDashboard: React.FC = () => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [stats, setStats] = useState<TreasureStats | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'scripts' | 'components' | 'utilities' | 'systems' | 'content' | 'config' | 'documentation'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Load treasure inventory on component mount
  useEffect(() => {
    const loadTreasures = async () => {
      setLoading(true);
      try {
        const treasureData = await treasureIntegrationService.loadTreasureInventory();
        setTreasures(treasureData);
        
        const treasureStats = treasureIntegrationService.getTreasureStats();
        setStats(treasureStats);
        
        const integrationRecs = treasureIntegrationService.getIntegrationRecommendations();
        setRecommendations(integrationRecs);
      } catch (error) {
        console.error('Failed to load treasure inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTreasures();
  }, []);

  // Get filtered treasures based on current filters
  const filteredTreasures = treasureIntegrationService.getTreasures({
    type: activeTab === 'all' ? undefined : activeTab,
    searchTerm: searchTerm || undefined
  });

  // Fallback treasure data for demonstration
  const fallbackTreasures: Treasure[] = [
    {
      id: 'royal-campaign',
      name: 'Royal Development Campaign',
      type: 'script',
      status: 'discovered',
      description: 'Profitable website development system with revenue generation',
      path: 'scripts/activate-royal-development-campaign.ts',
      priority: 'critical',
      agents: ['Cursor Agent 1'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['revenue', 'development'],
      estimatedValue: 9,
      integrationComplexity: 'complex'
    },
    {
      id: 'superintelligence',
      name: 'Superintelligence System',
      type: 'system',
      status: 'discovered',
      description: 'Multi-LLM coordination and activation system',
      path: 'scripts/activate-superintelligence-system.ts',
      priority: 'critical',
      agents: ['Cursor Agent 2'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['ai', 'coordination'],
      estimatedValue: 10,
      integrationComplexity: 'very-complex'
    },
    {
      id: 'cultural-dashboard',
      name: 'Cultural Integration Dashboard',
      type: 'dashboard',
      status: 'discovered',
      description: 'Māori cultural protocols and safety validation',
      path: 'src/components/CulturalIntegrationDashboard.tsx',
      priority: 'high',
      agents: ['Cursor Agent 3'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['cultural', 'maori'],
      estimatedValue: 8,
      integrationComplexity: 'complex'
    },
    {
      id: 'unified-llm',
      name: 'Unified LLM Coordinator',
      type: 'utility',
      status: 'discovered',
      description: 'Single source of truth for all LLM coordination',
      path: 'src/utils/unified-llm-coordinator.ts',
      priority: 'critical',
      agents: ['Cursor Agent 4'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['llm', 'coordination'],
      estimatedValue: 9,
      integrationComplexity: 'very-complex'
    },
    {
      id: 'enhanced-teacher',
      name: 'Enhanced Teacher Dashboard',
      type: 'component',
      status: 'discovered',
      description: 'Advanced teacher management and monetization',
      path: 'src/components/EnhancedTeacherDashboard.tsx',
      priority: 'high',
      agents: ['Cursor Agent 1'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['education', 'teacher'],
      estimatedValue: 7,
      integrationComplexity: 'moderate'
    },
    {
      id: 'real-lesson-viewer',
      name: 'Real Lesson Viewer',
      type: 'component',
      status: 'discovered',
      description: 'Authentic content viewing system',
      path: 'src/components/RealLessonViewer.tsx',
      priority: 'high',
      agents: ['Cursor Agent 2'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['education', 'lesson'],
      estimatedValue: 7,
      integrationComplexity: 'moderate'
    },
    {
      id: 'comprehensive-testing',
      name: 'Comprehensive Testing Specialist',
      type: 'script',
      status: 'discovered',
      description: 'Automated quality assurance and testing',
      path: 'scripts/comprehensive-testing-specialist.ts',
      priority: 'medium',
      agents: ['Cursor Agent 3'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['testing', 'quality'],
      estimatedValue: 6,
      integrationComplexity: 'moderate'
    },
    {
      id: 'api-config-manager',
      name: 'API Configuration Manager',
      type: 'utility',
      status: 'discovered',
      description: 'Centralized API configuration management',
      path: 'src/utils/api-config-manager.ts',
      priority: 'medium',
      agents: ['Cursor Agent 4'],
      lastModified: '2024-01-15',
      dependencies: [],
      tags: ['api', 'config'],
      estimatedValue: 5,
      integrationComplexity: 'simple'
    }
  ];

  // Use the filtered treasures from the service
  const displayTreasures = filteredTreasures.length > 0 ? filteredTreasures : fallbackTreasures;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'discovered': return 'bg-yellow-100 text-yellow-800';
      case 'integrated': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'needs-review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'script': return '🚀';
      case 'component': return '🎨';
      case 'utility': return '⚙️';
      case 'dashboard': return '📊';
      case 'system': return '🧠';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl text-gray-500">
        🏺 Loading treasure inventory...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🏺 TREASURE HUNT DASHBOARD 🏺
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Unearthing the Greatest Educational Platform Ever Built
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">{stats?.total || treasures.length}</div>
              <div className="text-blue-200">Treasures Discovered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-green-400">{stats?.byStatus.active || 0}</div>
              <div className="text-blue-200">Active Systems</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-yellow-400">{stats?.byStatus.discovered || 0}</div>
              <div className="text-blue-200">Awaiting Integration</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-red-400">{stats?.byPriority.critical || 0}</div>
              <div className="text-blue-200">Critical Priority</div>
            </div>
          </div>
        </div>

        {/* Integration Recommendations */}
        {recommendations.length > 0 && (
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 backdrop-blur-lg rounded-xl p-6 border border-green-500/30 mb-8">
            <h3 className="text-green-400 text-xl font-bold mb-4 flex items-center">
              🚀 INTEGRATION RECOMMENDATIONS
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <div className="text-green-100">{rec}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search treasures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {['all', 'scripts', 'components', 'utilities', 'systems'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-blue-200 hover:bg-white/30'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Treasures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTreasures.map((treasure) => (
            <div
              key={treasure.id}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getTypeIcon(treasure.type)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{treasure.name}</h3>
                    <p className="text-sm text-blue-200">{treasure.path}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treasure.status)}`}>
                    {treasure.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(treasure.priority)}`}>
                    {treasure.priority}
                  </span>
                </div>
              </div>

              <p className="text-blue-200 text-sm mb-4">{treasure.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white font-medium">Agents:</span>
                  <span className="text-blue-200">{treasure.agents.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white font-medium">Modified:</span>
                  <span className="text-blue-200">{treasure.lastModified}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Integrate
                </button>
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Review
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Link
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Status */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">🎯 Mission Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">233+</div>
              <div className="text-blue-200">Treasures to Unearth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4</div>
              <div className="text-blue-200">Cursor Agents Coordinating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-blue-200">AI Tools Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreasureHuntDashboard;
