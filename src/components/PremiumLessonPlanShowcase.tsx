import {
  Award,
  BookOpen,
  CheckCircle,
  Crown,
  Heart,
  Search,
  Star,
  Target,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PremiumLessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  culturalElements: number;
  qualityScore: number;
  price: number;
  isPremium: boolean;
  preview: string;
  fullContent: string;
  learningOutcomes: string[];
  culturalConnections: string[];
  resources: {
    type: 'document' | 'image' | 'video' | 'audio' | 'link';
    name: string;
    url: string;
  }[];
  teacherNotes: string;
  assessmentRubric: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviews: number;
  author: string;
  lastUpdated: string;
  nzCurriculumAlignment: string[];
}

const PremiumLessonPlanShowcase: React.FC = () => {
  const [lessonPlans, setLessonPlans] = useState<PremiumLessonPlan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<PremiumLessonPlan[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYearLevel, setSelectedYearLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPlan, setSelectedPlan] = useState<PremiumLessonPlan | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Premium lesson plans with authentic NZ content
  const premiumPlans: PremiumLessonPlan[] = [
    {
      id: 'premium-001',
      title: 'Te Reo Māori: Whakataukī and Cultural Wisdom',
      subject: 'Te Reo Māori',
      yearLevel: 'Year 8',
      duration: '4 weeks',
      culturalElements: 8,
      qualityScore: 98,
      price: 15.0,
      isPremium: true,
      preview: 'Explore traditional Māori proverbs and their cultural significance...',
      fullContent:
        'Complete 4-week unit plan with 20+ activities, assessments, and cultural connections...',
      learningOutcomes: [
        'Understand the cultural context of whakataukī',
        'Apply Māori values in daily life',
        'Create original whakataukī with cultural accuracy',
      ],
      culturalConnections: [
        'Māori worldview (Te Ao Māori)',
        'Traditional knowledge systems',
        'Cultural protocols and respect',
      ],
      resources: [
        { type: 'document', name: 'Teacher Guide', url: '/resources/whakatauki-teacher-guide.pdf' },
        { type: 'video', name: 'Cultural Context Video', url: '/resources/whakatauki-context.mp4' },
        { type: 'image', name: 'Visual Aids', url: '/resources/whakatauki-visuals.zip' },
      ],
      teacherNotes: 'This unit requires cultural sensitivity and ideally Māori community input...',
      assessmentRubric:
        'Holistic assessment focusing on cultural understanding and language use...',
      tags: ['te-reo', 'culture', 'proverbs', 'values', 'traditional-knowledge'],
      downloads: 1247,
      rating: 4.9,
      reviews: 89,
      author: 'Dr. Hine Waitere',
      lastUpdated: '2025-09-10',
      nzCurriculumAlignment: ['Te Reo Māori Level 4', 'Social Sciences Level 4'],
    },
    {
      id: 'premium-002',
      title: 'Mathematics: Māori Patterns in Geometry',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      duration: '3 weeks',
      culturalElements: 6,
      qualityScore: 95,
      price: 12.0,
      isPremium: true,
      preview: 'Discover mathematical patterns in traditional Māori art and architecture...',
      fullContent:
        'Comprehensive unit exploring geometric patterns in kōwhaiwhai, tukutuku, and carving...',
      learningOutcomes: [
        'Identify geometric patterns in Māori art',
        'Apply mathematical concepts to cultural contexts',
        'Create original patterns using mathematical principles',
      ],
      culturalConnections: [
        'Māori art and design',
        'Traditional building techniques',
        'Mathematical thinking in indigenous cultures',
      ],
      resources: [
        { type: 'document', name: 'Pattern Analysis Guide', url: '/resources/maori-patterns.pdf' },
        { type: 'image', name: 'Art Examples', url: '/resources/maori-art-examples.zip' },
        { type: 'link', name: 'Te Papa Collection', url: 'https://collections.tepapa.govt.nz' },
      ],
      teacherNotes: 'Includes field trip suggestions to local marae and museums...',
      assessmentRubric: 'Combines mathematical accuracy with cultural understanding...',
      tags: ['mathematics', 'geometry', 'maori-art', 'patterns', 'culture'],
      downloads: 892,
      rating: 4.8,
      reviews: 67,
      author: 'Prof. Wiremu Smith',
      lastUpdated: '2025-09-08',
      nzCurriculumAlignment: ['Mathematics Level 4', 'The Arts Level 4'],
    },
    {
      id: 'premium-003',
      title: 'Science: Environmental Stewardship - Kaitiakitanga',
      subject: 'Science',
      yearLevel: 'Year 8',
      duration: '5 weeks',
      culturalElements: 9,
      qualityScore: 97,
      price: 18.0,
      isPremium: true,
      preview: 'Explore Māori concepts of environmental guardianship and sustainability...',
      fullContent:
        'In-depth study of kaitiakitanga principles and their application to modern environmental challenges...',
      learningOutcomes: [
        'Understand kaitiakitanga principles',
        'Apply environmental stewardship concepts',
        'Develop sustainable practices',
      ],
      culturalConnections: [
        'Māori environmental philosophy',
        'Traditional resource management',
        'Modern sustainability practices',
      ],
      resources: [
        {
          type: 'document',
          name: 'Kaitiakitanga Study Guide',
          url: '/resources/kaitiakitanga-guide.pdf',
        },
        {
          type: 'video',
          name: 'Environmental Stories',
          url: '/resources/environmental-stories.mp4',
        },
        { type: 'link', name: 'DOC Resources', url: 'https://www.doc.govt.nz' },
      ],
      teacherNotes: 'Includes community consultation guidelines and cultural protocols...',
      assessmentRubric: 'Emphasizes both scientific understanding and cultural respect...',
      tags: ['science', 'environment', 'kaitiakitanga', 'sustainability', 'maori-values'],
      downloads: 1156,
      rating: 4.9,
      reviews: 94,
      author: 'Dr. Aroha Mead',
      lastUpdated: '2025-09-12',
      nzCurriculumAlignment: ['Science Level 4', 'Social Sciences Level 4'],
    },
    {
      id: 'premium-004',
      title: 'English: Contemporary Māori Literature',
      subject: 'English',
      yearLevel: 'Year 8',
      duration: '4 weeks',
      culturalElements: 7,
      qualityScore: 94,
      price: 14.0,
      isPremium: true,
      preview: 'Study contemporary Māori writers and their impact on New Zealand literature...',
      fullContent:
        'Comprehensive analysis of Māori literature with writing activities and cultural context...',
      learningOutcomes: [
        'Analyze Māori literary themes and techniques',
        'Understand cultural perspectives in literature',
        'Create original writing with cultural awareness',
      ],
      culturalConnections: [
        'Māori storytelling traditions',
        'Contemporary Māori identity',
        'Cultural expression through literature',
      ],
      resources: [
        {
          type: 'document',
          name: 'Literature Analysis Guide',
          url: '/resources/maori-literature.pdf',
        },
        { type: 'link', name: 'Author Interviews', url: '/resources/author-interviews' },
        { type: 'audio', name: 'Storytelling Examples', url: '/resources/storytelling.mp3' },
      ],
      teacherNotes: 'Includes sensitivity guidelines for discussing cultural themes...',
      assessmentRubric: 'Balances literary analysis with cultural understanding...',
      tags: ['english', 'literature', 'maori-writers', 'storytelling', 'culture'],
      downloads: 743,
      rating: 4.7,
      reviews: 52,
      author: 'Dr. Tina Makereti',
      lastUpdated: '2025-09-05',
      nzCurriculumAlignment: ['English Level 4', 'Social Sciences Level 4'],
    },
    {
      id: 'premium-005',
      title: 'Social Studies: Treaty of Waitangi - Past and Present',
      subject: 'Social Studies',
      yearLevel: 'Year 8',
      duration: '6 weeks',
      culturalElements: 10,
      qualityScore: 99,
      price: 20.0,
      isPremium: true,
      preview: 'Comprehensive study of the Treaty of Waitangi and its ongoing significance...',
      fullContent:
        'Detailed exploration of Treaty history, principles, and contemporary applications...',
      learningOutcomes: [
        'Understand Treaty history and context',
        'Analyze Treaty principles and their application',
        'Evaluate contemporary Treaty issues',
      ],
      culturalConnections: [
        'Māori-Crown relationships',
        'Historical and contemporary perspectives',
        'Social justice and equity',
      ],
      resources: [
        { type: 'document', name: 'Treaty Study Guide', url: '/resources/treaty-guide.pdf' },
        { type: 'video', name: 'Historical Context', url: '/resources/treaty-history.mp4' },
        { type: 'link', name: 'Waitangi Tribunal', url: 'https://www.waitangitribunal.govt.nz' },
      ],
      teacherNotes: 'Requires careful handling of sensitive historical and contemporary issues...',
      assessmentRubric: 'Emphasizes critical thinking and balanced perspectives...',
      tags: ['social-studies', 'treaty', 'history', 'maori-crown-relations', 'social-justice'],
      downloads: 1589,
      rating: 4.9,
      reviews: 127,
      author: 'Prof. Aroha Harris',
      lastUpdated: '2025-09-14',
      nzCurriculumAlignment: ['Social Sciences Level 4', 'History Level 4'],
    },
  ];

  useEffect(() => {
    setLessonPlans(premiumPlans);
    setFilteredPlans(premiumPlans);
  }, []);

  useEffect(() => {
    let filtered = lessonPlans;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (plan) =>
          plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plan.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    // Subject filter
    if (selectedSubject !== 'All') {
      filtered = filtered.filter((plan) => plan.subject === selectedSubject);
    }

    // Year level filter
    if (selectedYearLevel !== 'All') {
      filtered = filtered.filter((plan) => plan.yearLevel === selectedYearLevel);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'cultural':
          return b.culturalElements - a.culturalElements;
        default:
          return 0;
      }
    });

    setFilteredPlans(filtered);
  }, [searchTerm, selectedSubject, selectedYearLevel, sortBy, lessonPlans]);

  const toggleFavorite = (planId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(planId)) {
      newFavorites.delete(planId);
    } else {
      newFavorites.add(planId);
    }
    setFavorites(newFavorites);
  };

  const purchasePlan = (plan: PremiumLessonPlan) => {
    // This would integrate with Stripe payment system
    console.log(`Purchasing plan: ${plan.title} for $${plan.price}`);
    // Implementation would go here
  };

  const subjects = ['All', ...Array.from(new Set(lessonPlans.map((plan) => plan.subject)))];
  const yearLevels = ['All', ...Array.from(new Set(lessonPlans.map((plan) => plan.yearLevel)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Premium Lesson Plans</h1>
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Professionally crafted, culturally authentic lesson plans for New Zealand teachers
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                NZ Curriculum Aligned
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Cultural Safety Verified
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Teacher Tested
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search lesson plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Level Filter */}
            <div>
              <select
                value={selectedYearLevel}
                onChange={(e) => setSelectedYearLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {yearLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="cultural">Most Cultural</option>
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {filteredPlans.length} of {lessonPlans.length} premium lesson plans
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Plans Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Premium Badge */}
              <div className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </div>
                </div>

                {/* Plan Image/Icon */}
                <div
                  className={`bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-32'
                  }`}
                >
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-12 h-12" />
                  </div>
                </div>
              </div>

              {/* Plan Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{plan.subject}</span>
                      <span>•</span>
                      <span>{plan.yearLevel}</span>
                      <span>•</span>
                      <span>{plan.duration}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(plan.id)}
                    className="text-gray-400 hover:text-pink-500 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(plan.id) ? 'fill-current text-pink-500' : ''
                      }`}
                    />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{plan.preview}</p>

                {/* Cultural Elements */}
                <div className="flex items-center mb-4">
                  <Target className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-gray-600">
                    {plan.culturalElements} cultural elements
                  </span>
                  <div className="ml-auto flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-medium">{plan.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({plan.reviews})</span>
                  </div>
                </div>

                {/* Quality Score */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-blue-500 mr-1" />
                    <span className="text-sm text-gray-600">Quality: {plan.qualityScore}%</span>
                  </div>
                  <div className="text-sm text-gray-500">{plan.downloads} downloads</div>
                </div>

                {/* Price and Purchase */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-gray-900">${plan.price.toFixed(2)}</div>
                  <button
                    onClick={() => purchasePlan(plan)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Purchase
                  </button>
                </div>

                {/* Author */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    By {plan.author} • Updated {plan.lastUpdated}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lesson plans found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PremiumLessonPlanShowcase;
