import { BookOpen, Globe, Search, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'lesson' | 'assessment' | 'activity' | 'resource';
  subject: string;
  yearLevel: string;
  culturalElements: string[];
  teReoTerms: string[];
  quality: number;
  verified: boolean;
  externalLinks: number;
}

interface SmartSearchProps {
  onResultSelect: (result: SearchResult) => void;
  className?: string;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ onResultSelect, className = '' }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    subject: 'all',
    yearLevel: 'all',
    type: 'all',
    culturalElements: 'all',
    minQuality: 70,
  });

  // Mock search results - in real implementation, this would connect to AI search
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Algebra and Patterns: Māori Mathematical Thinking',
      description:
        'Students identify mathematical patterns in traditional Māori carving and express them algebraically',
      type: 'lesson',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      culturalElements: ['Whakairo', 'Tātai', 'Raupapa'],
      teReoTerms: ['tātai', 'raupapa', 'whakawhiti', 'tatau', 'tau', 'tauranga'],
      quality: 95,
      verified: true,
      externalLinks: 3,
    },
    {
      id: '2',
      title: 'Environmental Science: Māori Perspectives on Sustainability',
      description:
        'Explore environmental science through Māori environmental knowledge and kaitiakitanga',
      type: 'lesson',
      subject: 'Science',
      yearLevel: 'Year 8',
      culturalElements: ['Kaitiakitanga', 'Taiao', 'Mātauranga taiao'],
      teReoTerms: ['kaitiakitanga', 'taiao', 'mātauranga taiao', 'whenua', 'moana'],
      quality: 92,
      verified: true,
      externalLinks: 4,
    },
    {
      id: '3',
      title: 'Creative Writing: Integrating Te Reo Māori',
      description:
        'Develop creative writing skills while incorporating authentic Te Reo Māori elements',
      type: 'lesson',
      subject: 'English',
      yearLevel: 'Year 8',
      culturalElements: ['Pūrākau', 'Kōrero', 'Whakapapa'],
      teReoTerms: ['pūrākau', 'kōrero', 'whakapapa', 'mana', 'tupuna', 'whenua'],
      quality: 88,
      verified: true,
      externalLinks: 2,
    },
    {
      id: '4',
      title: 'Geometry in Māori Art and Architecture',
      description: 'Explore geometric principles through traditional Māori art and wharenui design',
      type: 'lesson',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      culturalElements: ['Kōwhaiwhai', 'Tukutuku', 'Wharenui'],
      teReoTerms: ['kōwhaiwhai', 'tukutuku', 'maunga', 'tapa', 'pou'],
      quality: 90,
      verified: true,
      externalLinks: 3,
    },
  ];

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate AI search delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Filter results based on query and filters
    const filteredResults = mockResults.filter((result) => {
      const matchesQuery =
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.culturalElements.some((element) =>
          element.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        result.teReoTerms.some((term) => term.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSubject = filters.subject === 'all' || result.subject === filters.subject;
      const matchesYearLevel =
        filters.yearLevel === 'all' || result.yearLevel === filters.yearLevel;
      const matchesType = filters.type === 'all' || result.type === filters.type;
      const matchesQuality = result.quality >= filters.minQuality;

      return matchesQuery && matchesSubject && matchesYearLevel && matchesType && matchesQuality;
    });

    setResults(filteredResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'assessment':
        return <Star className="w-4 h-4" />;
      case 'activity':
        return <Users className="w-4 h-4" />;
      case 'resource':
        return <Globe className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-600 bg-green-100';
    if (quality >= 80) return 'text-blue-600 bg-blue-100';
    if (quality >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for lessons, activities, or cultural elements..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <select
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Social Studies">Social Studies</option>
        </select>

        <select
          value={filters.yearLevel}
          onChange={(e) => setFilters({ ...filters, yearLevel: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Year Levels</option>
          <option value="Year 8">Year 8</option>
          <option value="Year 9">Year 9</option>
          <option value="Year 10">Year 10</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="lesson">Lessons</option>
          <option value="assessment">Assessments</option>
          <option value="activity">Activities</option>
          <option value="resource">Resources</option>
        </select>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Min Quality:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minQuality}
            onChange={(e) => setFilters({ ...filters, minQuality: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm font-medium text-gray-700">{filters.minQuality}%</span>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.length === 0 && query && !isSearching && (
          <div className="text-center py-8">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

        {results.map((result) => (
          <div
            key={result.id}
            onClick={() => onResultSelect(result)}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getTypeIcon(result.type)}
                  <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                  {result.verified && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-3">{result.description}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {result.subject}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {result.yearLevel}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">{result.type}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {result.culturalElements.slice(0, 3).map((element, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                    >
                      {element}
                    </span>
                  ))}
                  {result.culturalElements.length > 3 && (
                    <span className="text-gray-500 text-xs">
                      +{result.culturalElements.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {result.teReoTerms.slice(0, 4).map((term, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs"
                    >
                      {term}
                    </span>
                  ))}
                  {result.teReoTerms.length > 4 && (
                    <span className="text-gray-500 text-xs">
                      +{result.teReoTerms.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="ml-4 flex flex-col items-end space-y-2">
                <div
                  className={`px-2 py-1 rounded text-sm font-medium ${getQualityColor(
                    result.quality,
                  )}`}
                >
                  {result.quality}% Quality
                </div>
                <div className="text-xs text-gray-500">{result.externalLinks} external links</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartSearch;
