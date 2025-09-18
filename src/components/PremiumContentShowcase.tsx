import {
  BookOpen,
  Download,
  Eye,
  Filter,
  Globe,
  Heart,
  Play,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface Resource {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: string;
  rating: number;
  downloads: number;
  preview: string;
  type: 'lesson' | 'assessment' | 'activity' | 'multimedia';
  featured: boolean;
  cultural: boolean;
}

const PremiumContentShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Te Tiriti o Waitangi: Foundation of Modern NZ',
      description: 'Comprehensive exploration of the Treaty of Waitangi with interactive timeline and cultural perspectives',
      subject: 'Social Studies',
      level: 'Year 8',
      rating: 4.9,
      downloads: 2847,
      preview: 'Interactive lesson with multimedia elements, primary source documents, and assessment rubrics',
      type: 'lesson',
      featured: true,
      cultural: true
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Science Project',
      description: 'Real-world conservation science using Kākāpō population data and breeding programs',
      subject: 'Science',
      level: 'Year 7-8',
      rating: 4.8,
      downloads: 1923,
      preview: 'Hands-on data analysis with graphs, calculations, and conservation strategy development',
      type: 'activity',
      featured: true,
      cultural: false
    },
    {
      id: '3',
      title: 'Māori Mathematical Concepts in Modern Statistics',
      description: 'Exploring traditional Māori counting systems and their applications in contemporary mathematics',
      subject: 'Mathematics',
      level: 'Year 8-9',
      rating: 4.7,
      downloads: 1456,
      preview: 'Cultural mathematics integration with practical problem-solving exercises',
      type: 'lesson',
      featured: true,
      cultural: true
    },
    {
      id: '4',
      title: 'Early New Zealand History Documentary Series',
      description: 'Student-created documentary project exploring pre-European Māori society',
      subject: 'Social Studies',
      level: 'Year 7-10',
      rating: 4.6,
      downloads: 3241,
      preview: 'Video production guidelines, research templates, and presentation rubrics',
      type: 'multimedia',
      featured: false,
      cultural: true
    },
    {
      id: '5',
      title: 'Climate Change Impact Assessment NZ',
      description: 'Local climate data analysis focusing on New Zealand\'s unique environmental challenges',
      subject: 'Science',
      level: 'Year 8-10',
      rating: 4.8,
      downloads: 1789,
      preview: 'Real climate data, graphing exercises, and future prediction modeling',
      type: 'assessment',
      featured: false,
      cultural: false
    },
    {
      id: '6',
      title: 'Te Reo Māori Language Integration Toolkit',
      description: 'Cross-curricular Māori language integration for all subject areas',
      subject: 'Language',
      level: 'All Levels',
      rating: 4.9,
      downloads: 4123,
      preview: 'Pronunciation guides, vocabulary cards, and cultural context materials',
      type: 'lesson',
      featured: true,
      cultural: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesFilter = activeFilter === 'all' || resource.subject.toLowerCase() === activeFilter;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const filters = [
    { id: 'all', label: 'All Resources', icon: Globe },
    { id: 'social studies', label: 'Social Studies', icon: Users },
    { id: 'science', label: 'Science', icon: Zap },
    { id: 'mathematics', label: 'Mathematics', icon: TrendingUp },
    { id: 'language', label: 'Language', icon: BookOpen },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Premium Content Showcase
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Discover 500+ NZ Curriculum aligned resources crafted by expert educators
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg mb-12"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon className="h-4 w-4 mr-2" />
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Resources */}
        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="h-8 w-8 text-yellow-500 mr-3" />
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredResources.filter(r => r.featured).map((resource, index) => (
              <motion.div
                key={resource.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${
                    resource.cultural 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {resource.type === 'lesson' && <BookOpen className="h-6 w-6 text-white" />}
                    {resource.type === 'assessment' && <TrendingUp className="h-6 w-6 text-white" />}
                    {resource.type === 'activity' && <Zap className="h-6 w-6 text-white" />}
                    {resource.type === 'multimedia' && <Play className="h-6 w-6 text-white" />}
                  </div>
                  {resource.cultural && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Cultural
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {resource.subject}
                    </span>
                    <span className="text-gray-500 text-sm">{resource.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span className="ml-1 text-sm text-gray-600">{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                  <motion.button
                    className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Resources Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            All Resources ({filteredResources.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="bg-white/80 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    resource.type === 'lesson' ? 'bg-blue-100 text-blue-800' :
                    resource.type === 'assessment' ? 'bg-purple-100 text-purple-800' :
                    resource.type === 'activity' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                  {resource.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>

                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{resource.subject} • {resource.level}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-gray-600">{resource.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Access Premium Content?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 1,000+ NZ teachers already transforming their classrooms
          </p>
          <motion.button
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center mx-auto shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="h-6 w-6 mr-3" />
            Start Your Free Trial
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Resource Preview Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedResource.title}</h2>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedResource.description}</p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Preview Content:</h3>
                <p className="text-gray-700">{selectedResource.preview}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedResource.subject}
                  </span>
                  <span className="text-gray-500">{selectedResource.level}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-gray-600">{selectedResource.rating}</span>
                  </div>
                </div>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resource
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumContentShowcase;