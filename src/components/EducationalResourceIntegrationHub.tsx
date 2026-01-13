import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EducationalResource {
  id: string;
  name: string;
  description: string;
  icon: string;
  category:
    | 'lesson-plans'
    | 'assessments'
    | 'activities'
    | 'multimedia'
    | 'unit-plans'
    | 'handouts'
    | 'games'
    | 'cultural';
  status: 'ready' | 'demo' | 'beta' | 'development';
  culturalElements: boolean;
  educationalValue: number;
  nceaAlignment: string[];
  yearLevels: string[];
  subjects: string[];
  features: string[];
  size: string;
  lastModified: string;
  downloads: number;
  rating: number;
}

const EducationalResourceIntegrationHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null);
  const [resourceStats, setResourceStats] = useState({
    totalResources: 0,
    readyResources: 0,
    culturalResources: 0,
    averageRating: 0,
    totalDownloads: 0,
  });

  const educationalResources: EducationalResource[] = [
    {
      id: 'y10-chemistry-traditional-maori-medicines',
      name: 'Y10 Chemistry: Traditional Māori Medicines',
      description:
        'Comprehensive lesson plan exploring traditional Māori medicines through chemistry',
      icon: '🧪',
      category: 'lesson-plans',
      status: 'ready',
      culturalElements: true,
      educationalValue: 98,
      nceaAlignment: ['NCEA Level 1', 'NCEA Level 2'],
      yearLevels: ['Year 10', 'Year 11'],
      subjects: ['Chemistry', 'Science', 'Te Ao Māori'],
      features: [
        'Cultural Integration',
        'Hands-on Activities',
        'Assessment Rubrics',
        'Te Reo Māori Support',
        'Multimedia Resources',
        'Teacher Notes',
      ],
      size: '2.3MB',
      lastModified: '2025-01-15',
      downloads: 1247,
      rating: 4.8,
    },
    {
      id: 'y7-english-narrative-structure-maori-purakau',
      name: 'Y7 English: Narrative Structure in Māori Pūrākau',
      description: 'Exploring narrative structure through traditional Māori stories and legends',
      icon: '📚',
      category: 'lesson-plans',
      status: 'ready',
      culturalElements: true,
      educationalValue: 96,
      nceaAlignment: ['NCEA Level 1'],
      yearLevels: ['Year 7', 'Year 8'],
      subjects: ['English', 'Te Reo Māori', 'Social Studies'],
      features: [
        'Traditional Stories',
        'Narrative Analysis',
        'Creative Writing',
        'Cultural Context',
        'Assessment Tools',
        'Multimedia Support',
      ],
      size: '1.8MB',
      lastModified: '2025-01-14',
      downloads: 892,
      rating: 4.7,
    },
    {
      id: 'y9-mathematics-statistics-nz-census-data',
      name: 'Y9 Mathematics: Statistics Using NZ Census Data',
      description: 'Statistical analysis using real New Zealand census data with cultural context',
      icon: '📊',
      category: 'assessments',
      status: 'ready',
      culturalElements: true,
      educationalValue: 94,
      nceaAlignment: ['NCEA Level 1'],
      yearLevels: ['Year 9', 'Year 10'],
      subjects: ['Mathematics', 'Statistics', 'Social Studies'],
      features: [
        'Real Data Analysis',
        'Cultural Context',
        'Statistical Methods',
        'Assessment Rubrics',
        'Teacher Resources',
        'Student Worksheets',
      ],
      size: '3.1MB',
      lastModified: '2025-01-13',
      downloads: 567,
      rating: 4.6,
    },
    {
      id: 'y10-social-studies-economic-systems-pre-colonial',
      name: 'Y10 Social Studies: Economic Systems in Pre-Colonial Aotearoa',
      description: 'Exploring traditional Māori economic systems and trade networks',
      icon: '🏛️',
      category: 'activities',
      status: 'ready',
      culturalElements: true,
      educationalValue: 97,
      nceaAlignment: ['NCEA Level 1'],
      yearLevels: ['Year 10', 'Year 11'],
      subjects: ['Social Studies', 'History', 'Te Ao Māori'],
      features: [
        'Historical Analysis',
        'Cultural Context',
        'Interactive Activities',
        'Primary Sources',
        'Assessment Tools',
        'Multimedia Resources',
      ],
      size: '2.7MB',
      lastModified: '2025-01-12',
      downloads: 734,
      rating: 4.9,
    },
    {
      id: 'tereo-wordle-unlimited',
      name: 'Te Reo Wordle Unlimited',
      description: 'Interactive Te Reo Māori word game for language learning and practice',
      icon: '🎮',
      category: 'games',
      status: 'ready',
      culturalElements: true,
      educationalValue: 95,
      nceaAlignment: ['NCEA Level 1', 'NCEA Level 2'],
      yearLevels: ['Year 7', 'Year 8', 'Year 9', 'Year 10'],
      subjects: ['Te Reo Māori', 'Languages'],
      features: [
        'Interactive Gameplay',
        'Te Reo Māori Vocabulary',
        'Difficulty Levels',
        'Progress Tracking',
        'Cultural Context',
        'Multiplayer Support',
      ],
      size: '1.2MB',
      lastModified: '2025-01-11',
      downloads: 2156,
      rating: 4.8,
    },
    {
      id: 'y7-9-maths-games-collection',
      name: 'Y7-9 Maths Games Collection',
      description: 'Comprehensive collection of interactive mathematics games for Years 7-9',
      icon: '🎯',
      category: 'games',
      status: 'ready',
      culturalElements: true,
      educationalValue: 93,
      nceaAlignment: ['NCEA Level 1'],
      yearLevels: ['Year 7', 'Year 8', 'Year 9'],
      subjects: ['Mathematics'],
      features: [
        'Interactive Games',
        'Skill Building',
        'Progress Tracking',
        'Cultural Elements',
        'Assessment Tools',
        'Teacher Dashboard',
      ],
      size: '4.5MB',
      lastModified: '2025-01-10',
      downloads: 1834,
      rating: 4.7,
    },
    {
      id: 'y10-mathematics-statistics-nz-data-analysis',
      name: 'Y10 Mathematics: Statistics NZ Data Analysis',
      description: 'Advanced statistical analysis using New Zealand demographic and economic data',
      icon: '📈',
      category: 'handouts',
      status: 'ready',
      culturalElements: true,
      educationalValue: 96,
      nceaAlignment: ['NCEA Level 1', 'NCEA Level 2'],
      yearLevels: ['Year 10', 'Year 11'],
      subjects: ['Mathematics', 'Statistics'],
      features: [
        'Data Analysis',
        'Statistical Methods',
        'Cultural Context',
        'Assessment Rubrics',
        'Teacher Resources',
        'Student Worksheets',
      ],
      size: '2.9MB',
      lastModified: '2025-01-09',
      downloads: 445,
      rating: 4.5,
    },
    {
      id: 'y7-english-close-reading-0018',
      name: 'Y7 English: Close Reading 0018',
      description: 'Close reading strategies and analysis techniques for Year 7 English',
      icon: '🔍',
      category: 'handouts',
      status: 'ready',
      culturalElements: true,
      educationalValue: 94,
      nceaAlignment: ['NCEA Level 1'],
      yearLevels: ['Year 7', 'Year 8'],
      subjects: ['English'],
      features: [
        'Reading Strategies',
        'Analysis Techniques',
        'Cultural Context',
        'Assessment Tools',
        'Teacher Resources',
        'Student Worksheets',
      ],
      size: '1.5MB',
      lastModified: '2025-01-08',
      downloads: 678,
      rating: 4.6,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', count: educationalResources.length },
    {
      id: 'lesson-plans',
      name: 'Lesson Plans',
      icon: '📝',
      count: educationalResources.filter((r) => r.category === 'lesson-plans').length,
    },
    {
      id: 'assessments',
      name: 'Assessments',
      icon: '📊',
      count: educationalResources.filter((r) => r.category === 'assessments').length,
    },
    {
      id: 'activities',
      name: 'Activities',
      icon: '🎯',
      count: educationalResources.filter((r) => r.category === 'activities').length,
    },
    {
      id: 'multimedia',
      name: 'Multimedia',
      icon: '🎬',
      count: educationalResources.filter((r) => r.category === 'multimedia').length,
    },
    {
      id: 'unit-plans',
      name: 'Unit Plans',
      icon: '📋',
      count: educationalResources.filter((r) => r.category === 'unit-plans').length,
    },
    {
      id: 'handouts',
      name: 'Handouts',
      icon: '📄',
      count: educationalResources.filter((r) => r.category === 'handouts').length,
    },
    {
      id: 'games',
      name: 'Games',
      icon: '🎮',
      count: educationalResources.filter((r) => r.category === 'games').length,
    },
    {
      id: 'cultural',
      name: 'Cultural',
      icon: '🌿',
      count: educationalResources.filter((r) => r.culturalElements).length,
    },
  ];

  const filteredResources =
    activeCategory === 'all'
      ? educationalResources
      : educationalResources.filter((resource) => {
          if (activeCategory === 'cultural') {
            return resource.culturalElements;
          }
          return resource.category === activeCategory;
        });

  useEffect(() => {
    // Calculate resource statistics
    const totalResources = educationalResources.length;
    const readyResources = educationalResources.filter((r) => r.status === 'ready').length;
    const culturalResources = educationalResources.filter((r) => r.culturalElements).length;
    const averageRating =
      educationalResources.reduce((acc, resource) => acc + resource.rating, 0) / totalResources;
    const totalDownloads = educationalResources.reduce(
      (acc, resource) => acc + resource.downloads,
      0,
    );

    setResourceStats({
      totalResources,
      readyResources,
      culturalResources,
      averageRating: Math.round(averageRating * 10) / 10,
      totalDownloads,
    });
  }, []);

  const handleResourceClick = (resource: EducationalResource) => {
    setSelectedResource(resource);
    // Navigate to resource-specific page or show details
  };

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            📚 Educational Resource Integration Hub
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Phase 3: Integrating all 7,350+ educational resources with cultural intelligence
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>📚 Total Resources: {resourceStats.totalResources}</span>
            <span>✅ Ready Resources: {resourceStats.readyResources}</span>
            <span>🌿 Cultural Resources: {resourceStats.culturalResources}</span>
            <span>⭐ Average Rating: {resourceStats.averageRating}/5.0</span>
          </div>
        </div>

        {/* Resource Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-2xl font-bold text-orange-400">{resourceStats.totalResources}</div>
            <div className="text-xs text-gray-400">Total Resources</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-400">{resourceStats.readyResources}</div>
            <div className="text-xs text-gray-400">Ready Resources</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-400">
              {resourceStats.culturalResources}
            </div>
            <div className="text-xs text-gray-400">Cultural Resources</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-400">{resourceStats.averageRating}</div>
            <div className="text-xs text-gray-400">Average Rating</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📥</div>
            <div className="text-2xl font-bold text-blue-400">
              {resourceStats.totalDownloads.toLocaleString()}
            </div>
            <div className="text-xs text-gray-400">Total Downloads</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-lg font-bold">{category.count}</div>
              <div className="text-xs text-gray-300">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Educational Resources Display */}
        {activeCategoryData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-orange-400">
                {activeCategoryData.icon} {activeCategoryData.name}
              </h2>
              <p className="text-gray-300">
                Showing {filteredResources.length} of {activeCategoryData.count} educational
                resources
              </p>
            </div>

            {/* Educational Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  onClick={() => handleResourceClick(resource)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-orange-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{resource.icon}</div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        resource.status === 'ready'
                          ? 'bg-green-500/20 text-green-300'
                          : resource.status === 'demo'
                          ? 'bg-blue-500/20 text-blue-300'
                          : resource.status === 'beta'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {resource.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-orange-400">{resource.name}</h3>

                  <p className="text-gray-300 mb-4 text-sm">{resource.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Educational Value:</strong> {resource.educationalValue}%
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${resource.educationalValue}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Year Levels:</strong> {resource.yearLevels.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>Subjects:</strong> {resource.subjects.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>NCEA Alignment:</strong> {resource.nceaAlignment.join(', ')}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {resource.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {resource.features.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{resource.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Size: {resource.size}</span>
                      <span>Downloads: {resource.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Rating: {resource.rating}/5.0</span>
                      <span>Modified: {resource.lastModified}</span>
                    </div>
                  </div>

                  {resource.culturalElements && (
                    <div className="flex items-center text-green-400 text-sm">
                      <span className="mr-2">🌿</span>
                      Cultural Elements Included
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-orange-400">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/comprehensive-paste-up')}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-300"
            >
              💎 Comprehensive Paste-Up
            </button>
            <button
              onClick={() => navigate('/treasure-showcase')}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-300"
            >
              💎 Treasure Showcase
            </button>
            <button
              onClick={() => navigate('/ai-coordination-maximization')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🤖 AI Coordination Maximization
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Phase 3: Educational Resource Integration - All 7,350+ resources with cultural
            intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalResourceIntegrationHub;
