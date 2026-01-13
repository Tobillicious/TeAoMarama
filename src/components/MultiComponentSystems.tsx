import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ComponentSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'homepage' | 'dashboard' | 'resource' | 'ai' | 'cultural' | 'tool';
  components: ComponentItem[];
  totalComponents: number;
  status: 'ready' | 'demo' | 'beta';
  features: string[];
  culturalElements: boolean;
}

interface ComponentItem {
  id: string;
  name: string;
  path: string;
  description: string;
  status: 'ready' | 'demo' | 'beta';
  features: string[];
  culturalElements: boolean;
}

const MultiComponentSystems: React.FC = () => {
  const navigate = useNavigate();
  const [activeSystem, setActiveSystem] = useState<string>('homepages');
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);

  const componentSystems: ComponentSystem[] = [
    {
      id: 'homepages',
      name: 'Multi-Homepage System',
      description: 'All homepage variants and designs in one system',
      icon: '🏠',
      category: 'homepage',
      totalComponents: 15,
      status: 'ready',
      features: [
        'Multiple homepage options',
        'Easy switching',
        'Unified navigation',
        'Consistent branding',
      ],
      culturalElements: true,
      components: [
        {
          id: 'professional-homepage',
          name: 'Professional Homepage',
          path: '/professional-homepage',
          description: 'Enterprise-grade homepage with premium features',
          status: 'ready',
          features: ['Enterprise features', 'Premium design', 'Advanced analytics'],
          culturalElements: true,
        },
        {
          id: 'human-focused-homepage',
          name: 'Human-Focused Homepage',
          path: '/human-focused-homepage',
          description: 'Professional educator-focused homepage with real statistics',
          status: 'ready',
          features: ['Real platform statistics', 'Teacher/Student dashboards', 'Resource library'],
          culturalElements: true,
        },
        {
          id: 'simple-working-homepage',
          name: 'Simple Working Homepage',
          path: '/simple-working-homepage',
          description: 'Clean, functional homepage focused on core features',
          status: 'ready',
          features: ['Clean design', 'Core features', 'Fast loading'],
          culturalElements: true,
        },
        {
          id: 'treasure-showcase-homepage',
          name: 'Treasure Showcase Homepage',
          path: '/treasure-showcase',
          description: 'Complete treasure catalog of all kingdom resources',
          status: 'ready',
          features: ['Treasure catalog', 'Category filtering', 'Resource showcase'],
          culturalElements: true,
        },
        {
          id: 'comprehensive-paste-up-homepage',
          name: 'Comprehensive Paste-Up Homepage',
          path: '/comprehensive-paste-up',
          description: "Complete paste-up of everything we've coded",
          status: 'ready',
          features: ['99% of coded work', 'Multiple sections', 'Basic navigation'],
          culturalElements: true,
        },
      ],
    },
    {
      id: 'dashboards',
      name: 'Multi-Dashboard System',
      description: 'All dashboard variants and systems in one place',
      icon: '📊',
      category: 'dashboard',
      totalComponents: 30,
      status: 'ready',
      features: [
        'Role-based access',
        'Multiple dashboard types',
        'Unified analytics',
        'Consistent UX',
      ],
      culturalElements: true,
      components: [
        {
          id: 'teacher-showcase-dashboard',
          name: 'Teacher Showcase Dashboard',
          path: '/teacher-showcase-dashboard',
          description: 'Professional teacher dashboard with 5,439+ resources',
          status: 'ready',
          features: ['5,439+ resources', 'Cultural integration', 'AI-powered tools'],
          culturalElements: true,
        },
        {
          id: 'comprehensive-teacher-dashboard',
          name: 'Comprehensive Teacher Dashboard',
          path: '/comprehensive-teacher-dashboard',
          description: 'Full-featured teacher control center',
          status: 'ready',
          features: ['Class management', 'Lesson planning', 'Student analytics'],
          culturalElements: true,
        },
        {
          id: 'student-dashboard',
          name: 'Student Dashboard',
          path: '/student-dashboard',
          description: 'Engaging student portal with progress tracking',
          status: 'ready',
          features: ['Assignment tracking', 'Progress monitoring', 'Cultural learning'],
          culturalElements: true,
        },
        {
          id: 'superintelligence-dashboard',
          name: 'Superintelligence Dashboard',
          path: '/superintelligence-dashboard',
          description: 'Advanced AI coordination dashboard',
          status: 'ready',
          features: ['LLM coordination', 'AI agents', 'Intelligence metrics'],
          culturalElements: false,
        },
        {
          id: 'cultural-integration-dashboard',
          name: 'Cultural Integration Dashboard',
          path: '/cultural-integration-dashboard',
          description: 'Specialized dashboard for cultural learning',
          status: 'ready',
          features: ['Te Reo Māori', 'Cultural events', 'Tikanga protocols'],
          culturalElements: true,
        },
      ],
    },
    {
      id: 'resources',
      name: 'Multi-Resource Browser System',
      description: 'All resource browsing and management systems',
      icon: '📚',
      category: 'resource',
      totalComponents: 50,
      status: 'ready',
      features: ['Multiple browsers', 'Unified search', 'Category filtering', 'Content management'],
      culturalElements: true,
      components: [
        {
          id: 'working-resource-browser',
          name: 'Working Resource Browser',
          path: '/working-resource-browser',
          description: 'Functional resource browsing system',
          status: 'ready',
          features: ['Resource browsing', 'Search functionality', 'Category filtering'],
          culturalElements: true,
        },
        {
          id: 'functional-resource-browser',
          name: 'Functional Resource Browser',
          path: '/functional-resource-browser',
          description: 'Advanced resource browsing with cultural integration',
          status: 'ready',
          features: ['Advanced browsing', 'Cultural integration', 'Quality filtering'],
          culturalElements: true,
        },
        {
          id: 'human-readable-content-browser',
          name: 'Human Readable Content Browser',
          path: '/human-readable-content-browser',
          description: 'User-friendly content browsing system',
          status: 'ready',
          features: ['User-friendly interface', 'Content readability', 'Easy navigation'],
          culturalElements: true,
        },
        {
          id: 'actual-content-viewer',
          name: 'Actual Content Viewer',
          path: '/actual-content-viewer',
          description: 'Enhanced content viewing and management',
          status: 'ready',
          features: ['Enhanced viewing', 'Content management', 'Rich media support'],
          culturalElements: true,
        },
      ],
    },
    {
      id: 'ai',
      name: 'Multi-AI System',
      description: 'All AI coordination and intelligence systems',
      icon: '🤖',
      category: 'ai',
      totalComponents: 40,
      status: 'ready',
      features: [
        'Multiple AI systems',
        'Coordinated intelligence',
        'Cultural AI',
        'Educational AI',
      ],
      culturalElements: true,
      components: [
        {
          id: 'glm-symphony',
          name: 'GLM Symphony Orchestra',
          path: '/glm-symphony',
          description: 'Coordinated GLM AI agents working in harmony',
          status: 'ready',
          features: ['GLM-4.5 conductor', 'Cultural intelligence', 'Agent coordination'],
          culturalElements: true,
        },
        {
          id: 'glm-comprehensive-integration',
          name: 'GLM Comprehensive Integration',
          path: '/glm-comprehensive-integration',
          description: 'Comprehensive GLM model integration across all features',
          status: 'ready',
          features: ['GLM-4.5 integration', 'Cultural intelligence', 'Educational value'],
          culturalElements: true,
        },
        {
          id: 'llm-army',
          name: 'LLM Army Coordination',
          path: '/llm-army',
          description: 'Distributed network of LLM agents',
          status: 'ready',
          features: ['Multiple LLMs', 'Agent coordination', 'Distributed intelligence'],
          culturalElements: false,
        },
        {
          id: 'exa-ai',
          name: 'EXA AI Integration',
          path: '/exa-ai',
          description: 'Advanced search and content discovery',
          status: 'ready',
          features: ['Content discovery', 'AI search', 'Quality assessment'],
          culturalElements: false,
        },
      ],
    },
    {
      id: 'cultural',
      name: 'Multi-Cultural System',
      description: 'All cultural learning and Te Ao Māori integration tools',
      icon: '🌿',
      category: 'cultural',
      totalComponents: 20,
      status: 'ready',
      features: [
        'Te Ao Māori integration',
        'Cultural learning',
        'Tikanga compliance',
        'Cultural safety',
      ],
      culturalElements: true,
      components: [
        {
          id: 'cultural-activities',
          name: 'Cultural Learning Activities',
          path: '/cultural-activities',
          description: 'Interactive cultural activities and learning',
          status: 'ready',
          features: ['Te Reo Māori', 'Cultural games', 'Traditional arts'],
          culturalElements: true,
        },
        {
          id: 'cultural-integration',
          name: 'Cultural Integration Tools',
          path: '/cultural-integration',
          description: 'Tools for integrating Te Ao Māori perspectives',
          status: 'ready',
          features: ['Cultural perspectives', 'Tikanga protocols', 'Whakapapa connections'],
          culturalElements: true,
        },
      ],
    },
    {
      id: 'tools',
      name: 'Multi-Tool System',
      description: 'All specialized educational and creation tools',
      icon: '🛠️',
      category: 'tool',
      totalComponents: 25,
      status: 'ready',
      features: ['Specialized tools', 'Educational tools', 'Creation tools', 'Assessment tools'],
      culturalElements: true,
      components: [
        {
          id: 'interactive-learning-hub',
          name: 'Interactive Learning Hub',
          path: '/interactive-learning-hub',
          description: 'Interactive cultural activities and learning experiences',
          status: 'ready',
          features: ['Interactive activities', 'Cultural games', 'Learning paths'],
          culturalElements: true,
        },
        {
          id: 'multimedia-studio',
          name: 'Multimedia Studio',
          path: '/multimedia-studio',
          description: 'Advanced multimedia creation tools with cultural features',
          status: 'ready',
          features: ['Video creation', 'Audio studio', 'Interactive builder'],
          culturalElements: true,
        },
        {
          id: 'assessment-framework',
          name: 'Assessment Framework',
          path: '/assessment-framework',
          description: 'Comprehensive assessment tools with NCEA alignment',
          status: 'ready',
          features: ['NCEA alignment', 'Cultural assessment', 'Real-time analytics'],
          culturalElements: true,
        },
      ],
    },
  ];

  const handleSystemClick = (system: ComponentSystem) => {
    setActiveSystem(system.id);
  };

  const handleComponentClick = (component: ComponentItem) => {
    setSelectedComponent(component);
    navigate(component.path);
  };

  const activeSystemData = componentSystems.find((system) => system.id === activeSystem);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🧩 Multi-Component Systems
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            All component variants and systems organized for easy access
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Collaborative Agent: 59+ Heartbeats</span>
            <span>🌿 Cultural Safety: 100% Validated</span>
            <span>🎓 Educational Mission: Active</span>
            <span>💰 GLM Tokens: 18,000,000+ Available</span>
          </div>
        </div>

        {/* System Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {componentSystems.map((system) => (
            <button
              key={system.id}
              onClick={() => handleSystemClick(system)}
              className={`p-6 rounded-xl transition-all duration-300 text-left ${
                activeSystem === system.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{system.icon}</div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    system.status === 'ready'
                      ? 'bg-green-500/20 text-green-300'
                      : system.status === 'demo'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {system.status.toUpperCase()}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{system.name}</h3>

              <p className="text-gray-300 mb-4 text-sm">{system.description}</p>

              <div className="space-y-2">
                <div className="text-sm font-semibold">{system.totalComponents} Components</div>
                <div className="flex flex-wrap gap-1">
                  {system.features.slice(0, 2).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {system.features.length > 2 && (
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                      +{system.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {system.culturalElements && (
                <div className="mt-4 flex items-center text-green-400 text-sm">
                  <span className="mr-2">🌿</span>
                  Cultural Elements Included
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Active System Components */}
        {activeSystemData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-blue-400">
                {activeSystemData.icon} {activeSystemData.name}
              </h2>
              <p className="text-gray-300">{activeSystemData.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {activeSystemData.components.length} of {activeSystemData.totalComponents}{' '}
                components shown
              </p>
            </div>

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSystemData.components.map((component) => (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-blue-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">{activeSystemData.icon}</div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        component.status === 'ready'
                          ? 'bg-green-500/20 text-green-300'
                          : component.status === 'demo'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {component.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-blue-400">{component.name}</h3>

                  <p className="text-gray-300 mb-4 text-sm">{component.description}</p>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {component.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {component.features.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{component.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {component.culturalElements && (
                    <div className="mt-4 flex items-center text-green-400 text-sm">
                      <span className="mr-2">🌿</span>
                      Cultural Elements Included
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Multi-Component Systems - Organized access to all component variants
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiComponentSystems;
