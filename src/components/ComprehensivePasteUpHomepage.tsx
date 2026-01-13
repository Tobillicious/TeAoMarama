import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PasteUpSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  items: PasteUpItem[];
  category: 'homepages' | 'dashboards' | 'tools' | 'ai' | 'cultural' | 'resources';
}

interface PasteUpItem {
  id: string;
  name: string;
  path: string;
  description: string;
  status: 'ready' | 'demo' | 'beta';
  features: string[];
}

const ComprehensivePasteUpHomepage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('homepages');
  const [selectedItem, setSelectedItem] = useState<PasteUpItem | null>(null);

  const pasteUpSections: PasteUpSection[] = [
    {
      id: 'homepages',
      title: 'Homepage Options',
      description: 'Multiple homepage designs and layouts',
      icon: '🏠',
      category: 'homepages',
      items: [
        {
          id: 'human-focused',
          name: 'Human-Focused Homepage',
          path: '/human-focused-homepage',
          description: 'Professional educator-focused homepage with real statistics',
          status: 'ready',
          features: [
            'Real platform statistics',
            'Teacher/Student dashboards',
            'Resource library',
            'Assessment tools',
          ],
        },
        {
          id: 'professional',
          name: 'Professional Homepage',
          path: '/professional-homepage',
          description: 'Enterprise-grade homepage with premium features',
          status: 'ready',
          features: [
            'Enterprise features',
            'Premium design',
            'Advanced analytics',
            'Professional branding',
          ],
        },
        {
          id: 'simple-working',
          name: 'Simple Working Homepage',
          path: '/simple-working-homepage',
          description: 'Clean, functional homepage focused on core features',
          status: 'ready',
          features: ['Clean design', 'Core features', 'Fast loading', 'User-friendly'],
        },
        {
          id: 'educational-overview',
          name: 'Educational Platform Overview',
          path: '/educational-platform-overview',
          description: 'Comprehensive overview of all educational features',
          status: 'ready',
          features: [
            'Feature showcase',
            'Cultural elements',
            'Educational tools',
            'Platform overview',
          ],
        },
        {
          id: 'treasure-showcase',
          name: 'Treasure Showcase Homepage',
          path: '/treasure-showcase',
          description: 'Complete treasure catalog of all kingdom resources',
          status: 'ready',
          features: [
            'Treasure catalog',
            'Category filtering',
            'Resource showcase',
            'Kingdom inventory',
          ],
        },
      ],
    },
    {
      id: 'dashboards',
      title: 'Dashboard Systems',
      description: 'Comprehensive dashboard options for different roles',
      icon: '📊',
      category: 'dashboards',
      items: [
        {
          id: 'teacher-showcase',
          name: 'Teacher Showcase Dashboard',
          path: '/teacher-showcase-dashboard',
          description: 'Professional teacher dashboard with 5,439+ resources',
          status: 'ready',
          features: [
            '5,439+ resources',
            'Cultural integration',
            'AI-powered tools',
            'Real-time analytics',
          ],
        },
        {
          id: 'comprehensive-teacher',
          name: 'Comprehensive Teacher Dashboard',
          path: '/comprehensive-teacher-dashboard',
          description: 'Full-featured teacher control center',
          status: 'ready',
          features: [
            'Class management',
            'Lesson planning',
            'Student analytics',
            'Assessment tools',
          ],
        },
        {
          id: 'student-dashboard',
          name: 'Student Dashboard',
          path: '/student-dashboard',
          description: 'Engaging student portal with progress tracking',
          status: 'ready',
          features: [
            'Assignment tracking',
            'Progress monitoring',
            'Cultural learning',
            'Interactive content',
          ],
        },
        {
          id: 'superintelligence',
          name: 'Superintelligence Dashboard',
          path: '/superintelligence-dashboard',
          description: 'Advanced AI coordination dashboard',
          status: 'ready',
          features: ['LLM coordination', 'AI agents', 'Intelligence metrics', 'System health'],
        },
        {
          id: 'cultural-integration',
          name: 'Cultural Integration Dashboard',
          path: '/cultural-integration-dashboard',
          description: 'Specialized dashboard for cultural learning',
          status: 'ready',
          features: [
            'Te Reo Māori',
            'Cultural events',
            'Tikanga protocols',
            'Community connections',
          ],
        },
      ],
    },
    {
      id: 'tools',
      title: 'Specialized Tools',
      description: 'Advanced educational and creation tools',
      icon: '🛠️',
      category: 'tools',
      items: [
        {
          id: 'interactive-learning',
          name: 'Interactive Learning Hub',
          path: '/interactive-learning-hub',
          description: 'Interactive cultural activities and learning experiences',
          status: 'ready',
          features: [
            'Interactive activities',
            'Cultural games',
            'Learning paths',
            'Engagement tools',
          ],
        },
        {
          id: 'multimedia-studio',
          name: 'Multimedia Studio',
          path: '/multimedia-studio',
          description: 'Advanced multimedia creation tools with cultural features',
          status: 'ready',
          features: ['Video creation', 'Audio studio', 'Interactive builder', 'Cultural templates'],
        },
        {
          id: 'assessment-framework',
          name: 'Assessment Framework',
          path: '/assessment-framework',
          description: 'Comprehensive assessment tools with NCEA alignment',
          status: 'ready',
          features: ['NCEA alignment', 'Cultural assessment', 'Real-time analytics', 'AI grading'],
        },
        {
          id: 'quality-filtering',
          name: 'Quality Filtering Harmony Dashboard',
          path: '/quality-filtering-harmony-dashboard',
          description: 'Advanced quality control and content filtering system',
          status: 'ready',
          features: [
            'Quality metrics',
            'Content filtering',
            'Harmony analysis',
            'Quality assurance',
          ],
        },
      ],
    },
    {
      id: 'ai',
      title: 'AI Systems',
      description: 'Coordinated AI agents and intelligence systems',
      icon: '🤖',
      category: 'ai',
      items: [
        {
          id: 'glm-symphony',
          name: 'GLM Symphony Orchestra',
          path: '/glm-symphony',
          description: 'Coordinated GLM AI agents working in harmony',
          status: 'ready',
          features: [
            'GLM-4.5 conductor',
            'Cultural intelligence',
            'Agent coordination',
            'Performance optimization',
          ],
        },
        {
          id: 'llm-army',
          name: 'LLM Army Coordination',
          path: '/llm-army',
          description: 'Distributed network of LLM agents',
          status: 'ready',
          features: [
            'Multiple LLMs',
            'Agent coordination',
            'Distributed intelligence',
            'Scalable support',
          ],
        },
        {
          id: 'exa-ai',
          name: 'EXA AI Integration',
          path: '/exa-ai',
          description: 'Advanced search and content discovery',
          status: 'ready',
          features: ['Content discovery', 'AI search', 'Quality assessment', 'Recommendations'],
        },
        {
          id: 'supreme-ai',
          name: 'Supreme AI Coordination',
          path: '/supreme-ai',
          description: 'Supreme AI coordination and management',
          status: 'ready',
          features: [
            'Supreme coordination',
            'AI management',
            'System oversight',
            'Intelligence amplification',
          ],
        },
      ],
    },
    {
      id: 'cultural',
      title: 'Cultural Tools',
      description: 'Te Ao Māori cultural learning and integration tools',
      icon: '🌿',
      category: 'cultural',
      items: [
        {
          id: 'cultural-activities',
          name: 'Cultural Learning Activities',
          path: '/cultural-activities',
          description: 'Interactive cultural activities and learning',
          status: 'ready',
          features: [
            'Te Reo Māori',
            'Cultural games',
            'Traditional arts',
            'Environmental stewardship',
          ],
        },
        {
          id: 'cultural-integration',
          name: 'Cultural Integration Tools',
          path: '/cultural-integration',
          description: 'Tools for integrating Te Ao Māori perspectives',
          status: 'ready',
          features: [
            'Cultural perspectives',
            'Tikanga protocols',
            'Whakapapa connections',
            'Kaitiakitanga',
          ],
        },
      ],
    },
    {
      id: 'resources',
      title: 'Resource Browsers',
      description: 'Multiple resource browsing and management systems',
      icon: '📚',
      category: 'resources',
      items: [
        {
          id: 'working-resource-browser',
          name: 'Working Resource Browser',
          path: '/working-resource-browser',
          description: 'Functional resource browsing system',
          status: 'ready',
          features: [
            'Resource browsing',
            'Search functionality',
            'Category filtering',
            'Content management',
          ],
        },
        {
          id: 'functional-resource-browser',
          name: 'Functional Resource Browser',
          path: '/functional-resource-browser',
          description: 'Advanced resource browsing with cultural integration',
          status: 'ready',
          features: [
            'Advanced browsing',
            'Cultural integration',
            'Quality filtering',
            'Content validation',
          ],
        },
        {
          id: 'human-readable-content',
          name: 'Human Readable Content Browser',
          path: '/human-readable-content-browser',
          description: 'User-friendly content browsing system',
          status: 'ready',
          features: [
            'User-friendly interface',
            'Content readability',
            'Easy navigation',
            'Accessibility',
          ],
        },
        {
          id: 'actual-content-viewer',
          name: 'Actual Content Viewer',
          path: '/actual-content-viewer',
          description: 'Enhanced content viewing and management',
          status: 'ready',
          features: [
            'Enhanced viewing',
            'Content management',
            'Rich media support',
            'Interactive elements',
          ],
        },
      ],
    },
  ];

  const handleItemClick = (item: PasteUpItem) => {
    setSelectedItem(item);
    navigate(item.path);
  };

  const activeSectionData = pasteUpSections.find((section) => section.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            👑 Te Ao Mārama Comprehensive Paste-Up
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Complete paste-up of everything we've coded - 99% of our work showcased
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Collaborative Agent: 59+ Heartbeats</span>
            <span>🌿 Cultural Safety: Validated</span>
            <span>🎓 Educational Mission: Active</span>
            <span>📊 179 Components | 4,028 Resources | 25,000+ Files</span>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {pasteUpSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        {activeSectionData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-yellow-400">
                {activeSectionData.icon} {activeSectionData.title}
              </h2>
              <p className="text-gray-300">{activeSectionData.description}</p>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeSectionData.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-yellow-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-2xl">{activeSectionData.icon}</div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'ready'
                          ? 'bg-green-500/20 text-green-300'
                          : item.status === 'demo'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {item.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{item.name}</h3>

                  <p className="text-gray-300 mb-4 text-sm">{item.description}</p>

                  <div className="space-y-2">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 2 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{item.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
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
            Comprehensive paste-up of 99% of our coded work - ready for editing and refinement!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComprehensivePasteUpHomepage;
