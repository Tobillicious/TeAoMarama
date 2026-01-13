import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Treasure {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  category: 'homepage' | 'dashboard' | 'tool' | 'ai' | 'cultural';
  status: 'ready' | 'demo' | 'beta';
  features: string[];
  culturalElements: boolean;
}

const TreasureShowcaseHomepage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTreasure, setSelectedTreasure] = useState<Treasure | null>(null);

  const treasures: Treasure[] = [
    // HOMEPAGE OPTIONS
    {
      id: 'human-focused',
      title: 'Human-Focused Homepage',
      description: 'Professional educator-focused homepage with real statistics and comprehensive feature showcase',
      icon: '👥',
      path: '/human-focused-homepage',
      category: 'homepage',
      status: 'ready',
      features: ['Real platform statistics', 'Teacher/Student dashboards', 'Resource library', 'Assessment tools'],
      culturalElements: true
    },
    {
      id: 'professional',
      title: 'Professional Homepage',
      description: 'Enterprise-grade homepage with premium features and professional design',
      icon: '💼',
      path: '/professional-homepage',
      category: 'homepage',
      status: 'ready',
      features: ['Enterprise features', 'Premium design', 'Advanced analytics', 'Professional branding'],
      culturalElements: true
    },
    {
      id: 'simple-working',
      title: 'Simple Working Homepage',
      description: 'Clean, functional homepage focused on core educational features',
      icon: '✨',
      path: '/simple-working-homepage',
      category: 'homepage',
      status: 'ready',
      features: ['Clean design', 'Core features', 'Fast loading', 'User-friendly'],
      culturalElements: true
    },
    {
      id: 'educational-overview',
      title: 'Educational Platform Overview',
      description: 'Comprehensive overview of all educational features and cultural elements',
      icon: '📚',
      path: '/educational-platform-overview',
      category: 'homepage',
      status: 'ready',
      features: ['Feature showcase', 'Cultural elements', 'Educational tools', 'Platform overview'],
      culturalElements: true
    },

    // DASHBOARD TREASURES
    {
      id: 'teacher-showcase',
      title: 'Teacher Showcase Dashboard',
      description: 'Professional teacher dashboard with 5,439+ resources and cultural integration',
      icon: '👩‍🏫',
      path: '/teacher-showcase-dashboard',
      category: 'dashboard',
      status: 'ready',
      features: ['5,439+ resources', 'Cultural integration', 'AI-powered tools', 'Real-time analytics'],
      culturalElements: true
    },
    {
      id: 'comprehensive-teacher',
      title: 'Comprehensive Teacher Dashboard',
      description: 'Full-featured teacher control center with class management and analytics',
      icon: '🎯',
      path: '/comprehensive-teacher-dashboard',
      category: 'dashboard',
      status: 'ready',
      features: ['Class management', 'Lesson planning', 'Student analytics', 'Assessment tools'],
      culturalElements: true
    },
    {
      id: 'student-dashboard',
      title: 'Student Dashboard',
      description: 'Engaging student portal with assignments, progress tracking, and cultural learning',
      icon: '👨‍🎓',
      path: '/student-dashboard',
      category: 'dashboard',
      status: 'ready',
      features: ['Assignment tracking', 'Progress monitoring', 'Cultural learning', 'Interactive content'],
      culturalElements: true
    },
    {
      id: 'superintelligence',
      title: 'Superintelligence Dashboard',
      description: 'Advanced AI coordination dashboard with multiple LLM agents',
      icon: '🧠',
      path: '/superintelligence-dashboard',
      category: 'ai',
      status: 'ready',
      features: ['LLM coordination', 'AI agents', 'Intelligence metrics', 'System health'],
      culturalElements: false
    },
    {
      id: 'cultural-integration',
      title: 'Cultural Integration Dashboard',
      description: 'Specialized dashboard for cultural learning and Te Ao Māori integration',
      icon: '🌿',
      path: '/cultural-integration-dashboard',
      category: 'cultural',
      status: 'ready',
      features: ['Te Reo Māori', 'Cultural events', 'Tikanga protocols', 'Community connections'],
      culturalElements: true
    },

    // SPECIALIZED TOOLS
    {
      id: 'interactive-learning',
      title: 'Interactive Learning Hub',
      description: 'Interactive cultural activities and learning experiences',
      icon: '🎮',
      path: '/interactive-learning-hub',
      category: 'tool',
      status: 'ready',
      features: ['Interactive activities', 'Cultural games', 'Learning paths', 'Engagement tools'],
      culturalElements: true
    },
    {
      id: 'multimedia-studio',
      title: 'Multimedia Studio',
      description: 'Advanced multimedia creation tools with cultural features',
      icon: '🎥',
      path: '/multimedia-studio',
      category: 'tool',
      status: 'ready',
      features: ['Video creation', 'Audio studio', 'Interactive builder', 'Cultural templates'],
      culturalElements: true
    },
    {
      id: 'assessment-framework',
      description: 'Comprehensive assessment tools with NCEA alignment and cultural responsiveness',
      icon: '📊',
      path: '/assessment-framework',
      category: 'tool',
      status: 'ready',
      features: ['NCEA alignment', 'Cultural assessment', 'Real-time analytics', 'AI grading'],
      culturalElements: true
    },
    {
      id: 'quality-filtering',
      title: 'Quality Filtering Harmony Dashboard',
      description: 'Advanced quality control and content filtering system',
      icon: '🔍',
      path: '/quality-filtering-harmony-dashboard',
      category: 'tool',
      status: 'ready',
      features: ['Quality metrics', 'Content filtering', 'Harmony analysis', 'Quality assurance'],
      culturalElements: false
    },

    // AI TREASURES
    {
      id: 'glm-symphony',
      title: 'GLM Symphony Orchestra',
      description: 'Coordinated GLM AI agents working in harmony for educational excellence',
      icon: '🎼',
      path: '/glm-symphony',
      category: 'ai',
      status: 'ready',
      features: ['GLM-4.5 conductor', 'Cultural intelligence', 'Agent coordination', 'Performance optimization'],
      culturalElements: true
    },
    {
      id: 'llm-army',
      title: 'LLM Army Coordination',
      description: 'Distributed network of LLM agents for comprehensive educational support',
      icon: '🚀',
      path: '/llm-army',
      category: 'ai',
      status: 'ready',
      features: ['Multiple LLMs', 'Agent coordination', 'Distributed intelligence', 'Scalable support'],
      culturalElements: false
    },
    {
      id: 'exa-ai',
      title: 'EXA AI Integration',
      description: 'Advanced search and content discovery with AI-powered recommendations',
      icon: '🔍',
      path: '/exa-ai',
      category: 'ai',
      status: 'ready',
      features: ['Content discovery', 'AI search', 'Quality assessment', 'Recommendations'],
      culturalElements: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Treasures', icon: '💎' },
    { id: 'homepage', name: 'Homepage Options', icon: '🏠' },
    { id: 'dashboard', name: 'Dashboards', icon: '📊' },
    { id: 'tool', name: 'Specialized Tools', icon: '🛠️' },
    { id: 'ai', name: 'AI Systems', icon: '🤖' },
    { id: 'cultural', name: 'Cultural Tools', icon: '🌿' }
  ];

  const filteredTreasures = selectedCategory === 'all' 
    ? treasures 
    : treasures.filter(treasure => treasure.category === selectedCategory);

  const handleTreasureClick = (treasure: Treasure) => {
    setSelectedTreasure(treasure);
    navigate(treasure.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            👑 Te Ao Mārama Kingdom Treasures
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover all the treasures and resources we've built for educational excellence
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Collaborative Agent: 46+ Heartbeats</span>
            <span>🌿 Cultural Safety: Validated</span>
            <span>🎓 Educational Mission: Active</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Treasures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreasures.map(treasure => (
            <div
              key={treasure.id}
              onClick={() => handleTreasureClick(treasure)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-yellow-400/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{treasure.icon}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  treasure.status === 'ready' ? 'bg-green-500/20 text-green-300' :
                  treasure.status === 'demo' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {treasure.status.toUpperCase()}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-yellow-400">
                {treasure.title}
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm">
                {treasure.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-400">
                  <strong>Features:</strong>
                </div>
                <div className="flex flex-wrap gap-1">
                  {treasure.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                  {treasure.features.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                      +{treasure.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              {treasure.culturalElements && (
                <div className="mt-4 flex items-center text-green-400 text-sm">
                  <span className="mr-2">🌿</span>
                  Cultural Elements Included
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            All treasures are ready for deployment and testing. Choose your preferred homepage and tools!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreasureShowcaseHomepage;
