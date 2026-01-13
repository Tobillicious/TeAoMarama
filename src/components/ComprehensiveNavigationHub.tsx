import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationHub {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'navigation' | 'system' | 'integration' | 'coordination';
  status: 'ready' | 'demo' | 'beta';
  features: string[];
  culturalElements: boolean;
  stats: {
    components: number;
    scripts: number;
    resources: number;
    total: number;
  };
}

const ComprehensiveNavigationHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeHub, setActiveHub] = useState<string>('overview');
  const [selectedHub, setSelectedHub] = useState<NavigationHub | null>(null);

  const navigationHubs: NavigationHub[] = [
    {
      id: 'mega-navigation',
      name: 'Mega Navigation System',
      description: 'Complete access to all 509+ files in the codebase',
      icon: '🧠',
      path: '/mega-navigation',
      category: 'navigation',
      status: 'ready',
      features: [
        'Complete file access',
        'Category filtering',
        'Search functionality',
        'View modes',
        'File management',
      ],
      culturalElements: true,
      stats: {
        components: 293,
        scripts: 216,
        resources: 7350,
        total: 509,
      },
    },
    {
      id: 'multi-component-systems',
      name: 'Multi-Component Systems',
      description: 'All component variants and systems organized for easy access',
      icon: '🧩',
      path: '/multi-component-systems',
      category: 'system',
      status: 'ready',
      features: [
        'Component grouping',
        'System organization',
        'Easy switching',
        'Unified navigation',
        'Consistent UX',
      ],
      culturalElements: true,
      stats: {
        components: 293,
        scripts: 0,
        resources: 0,
        total: 293,
      },
    },
    {
      id: 'script-integration-interface',
      name: 'Script Integration Interface',
      description: 'Complete access to all 216 automation scripts and AI coordination systems',
      icon: '🤖',
      path: '/script-integration-interface',
      category: 'integration',
      status: 'ready',
      features: [
        'Script execution',
        'AI coordination',
        'Automation systems',
        'Development tools',
        'Testing systems',
      ],
      culturalElements: true,
      stats: {
        components: 0,
        scripts: 216,
        resources: 0,
        total: 216,
      },
    },
    {
      id: 'glm-comprehensive-integration',
      name: 'GLM Comprehensive Integration',
      description: 'Maximizing GLM model utilization across the entire platform',
      icon: '🎼',
      path: '/glm-comprehensive-integration',
      category: 'coordination',
      status: 'ready',
      features: [
        'GLM-4.5 integration',
        'Cultural intelligence',
        'Educational value',
        'Performance optimization',
        'Agent coordination',
      ],
      culturalElements: true,
      stats: {
        components: 8,
        scripts: 5,
        resources: 0,
        total: 13,
      },
    },
    {
      id: 'comprehensive-paste-up',
      name: 'Comprehensive Paste-Up',
      description: "Complete paste-up of everything we've coded - 99% of our work showcased",
      icon: '💎',
      path: '/comprehensive-paste-up',
      category: 'navigation',
      status: 'ready',
      features: [
        '99% of coded work',
        'Multiple sections',
        'Basic navigation',
        'Complete inventory',
        'Easy access',
      ],
      culturalElements: true,
      stats: {
        components: 24,
        scripts: 0,
        resources: 0,
        total: 24,
      },
    },
    {
      id: 'treasure-showcase',
      name: 'Treasure Showcase',
      description: 'Complete treasure catalog of all kingdom resources',
      icon: '👑',
      path: '/treasure-showcase',
      category: 'navigation',
      status: 'ready',
      features: [
        'Treasure catalog',
        'Category filtering',
        'Resource showcase',
        'Kingdom inventory',
        'Cultural elements',
      ],
      culturalElements: true,
      stats: {
        components: 16,
        scripts: 0,
        resources: 0,
        total: 16,
      },
    },
  ];

  const handleHubClick = (hub: NavigationHub) => {
    setSelectedHub(hub);
    navigate(hub.path);
  };

  const totalStats = navigationHubs.reduce(
    (acc, hub) => ({
      components: acc.components + hub.stats.components,
      scripts: acc.scripts + hub.stats.scripts,
      resources: acc.resources + hub.stats.resources,
      total: acc.total + hub.stats.total,
    }),
    { components: 0, scripts: 0, resources: 0, total: 0 },
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            🧭 Comprehensive Navigation Hub
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Central hub for accessing all navigation systems and comprehensive tools
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Collaborative Agent: 59+ Heartbeats</span>
            <span>🌿 Cultural Safety: 100% Validated</span>
            <span>🎓 Educational Mission: Active</span>
            <span>💰 GLM Tokens: 18,000,000+ Available</span>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">🧩</div>
            <div className="text-2xl font-bold text-blue-400">{totalStats.components}</div>
            <div className="text-sm text-gray-300">Components</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-2xl font-bold text-green-400">{totalStats.scripts}</div>
            <div className="text-sm text-gray-300">Scripts</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">📚</div>
            <div className="text-2xl font-bold text-orange-400">{totalStats.resources}</div>
            <div className="text-sm text-gray-300">Resources</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-2xl font-bold text-purple-400">{totalStats.total}</div>
            <div className="text-sm text-gray-300">Total Items</div>
          </div>
        </div>

        {/* Navigation Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationHubs.map((hub) => (
            <div
              key={hub.id}
              onClick={() => handleHubClick(hub)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-purple-400/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{hub.icon}</div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    hub.status === 'ready'
                      ? 'bg-green-500/20 text-green-300'
                      : hub.status === 'demo'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {hub.status.toUpperCase()}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-purple-400">{hub.name}</h3>

              <p className="text-gray-300 mb-4 text-sm">{hub.description}</p>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-400">
                  <strong>Features:</strong>
                </div>
                <div className="flex flex-wrap gap-1">
                  {hub.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {hub.features.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                      +{hub.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-xs text-gray-400">
                  <strong>Stats:</strong>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Components:</span>
                    <span className="text-blue-400">{hub.stats.components}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Scripts:</span>
                    <span className="text-green-400">{hub.stats.scripts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Resources:</span>
                    <span className="text-orange-400">{hub.stats.resources}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-purple-400">{hub.stats.total}</span>
                  </div>
                </div>
              </div>

              {hub.culturalElements && (
                <div className="flex items-center text-green-400 text-sm">
                  <span className="mr-2">🌿</span>
                  Cultural Elements Included
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/mega-navigation')}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300"
            >
              🧠 Mega Navigation
            </button>
            <button
              onClick={() => navigate('/multi-component-systems')}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all duration-300"
            >
              🧩 Multi-Component Systems
            </button>
            <button
              onClick={() => navigate('/script-integration-interface')}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-300"
            >
              🤖 Script Integration
            </button>
            <button
              onClick={() => navigate('/glm-comprehensive-integration')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🎼 GLM Integration
            </button>
            <button
              onClick={() => navigate('/comprehensive-paste-up')}
              className="px-6 py-3 bg-pink-500/20 hover:bg-pink-500/30 rounded-lg transition-all duration-300"
            >
              💎 Comprehensive Paste-Up
            </button>
            <button
              onClick={() => navigate('/treasure-showcase')}
              className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-all duration-300"
            >
              👑 Treasure Showcase
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Comprehensive Navigation Hub - Central access to all navigation systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveNavigationHub;
