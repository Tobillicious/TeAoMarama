import React, { useEffect, useState } from 'react';

interface Resource {
  id: string;
  title: string;
  type:
    | 'lesson-plan'
    | 'assessment'
    | 'activity'
    | 'worksheet'
    | 'video'
    | 'interactive'
    | 'document';
  subject: string;
  yearLevel: string;
  description: string;
  tags: string[];
  culturalElements: string[];
  author: string;
  school: string;
  rating: number;
  downloads: number;
  fileSize: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  isPremium: boolean;
  thumbnail?: string;
}

const ProfessionalResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Māori Settlement Patterns - Interactive Map Activity',
      type: 'interactive',
      subject: 'Social Studies',
      yearLevel: 'Year 7-8',
      description:
        'Interactive digital map showing early Māori settlement patterns with clickable regions, cultural information, and environmental factors.',
      tags: [
        'Māori history',
        'settlement patterns',
        'interactive learning',
        'maps',
        'environmental factors',
      ],
      culturalElements: [
        'Māori perspectives',
        'Environmental connection',
        'Community values',
        'Traditional knowledge',
      ],
      author: 'Sarah Mitchell',
      school: 'Auckland Grammar School',
      rating: 4.8,
      downloads: 245,
      fileSize: '15.2 MB',
      duration: '45 minutes',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-15',
      isPremium: false,
      thumbnail: '🗺️',
    },
    {
      id: '2',
      title: 'Te Reo Māori Assessment Rubric - Speaking & Listening',
      type: 'assessment',
      subject: 'Te Reo Māori',
      yearLevel: 'Year 5-6',
      description:
        'Comprehensive assessment rubric for te reo Māori speaking and listening skills with cultural competency indicators and achievement criteria.',
      tags: [
        'assessment',
        'te reo Māori',
        'rubric',
        'cultural competency',
        'speaking',
        'listening',
      ],
      culturalElements: [
        'Te reo Māori',
        'Cultural protocols',
        'Traditional knowledge',
        'Māori perspectives',
      ],
      author: 'Hemi Williams',
      school: 'Te Kura Kaupapa Māori o Te Whānau Tahi',
      rating: 4.9,
      downloads: 189,
      fileSize: '2.1 MB',
      duration: '30 minutes',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-12',
      isPremium: false,
      thumbnail: '📋',
    },
    {
      id: '3',
      title: 'Pacific Island Migration Timeline - Digital Storytelling',
      type: 'video',
      subject: 'Social Studies',
      yearLevel: 'Year 9-10',
      description:
        'Interactive timeline with personal migration stories, cultural context, and historical events from Pacific Island communities.',
      tags: [
        'Pacific migration',
        'timeline',
        'personal stories',
        'cultural context',
        'digital storytelling',
      ],
      culturalElements: [
        'Pacific perspectives',
        'Migration stories',
        'Cultural identity',
        'Community values',
      ],
      author: 'Losa Tupou',
      school: 'Mangere College',
      rating: 4.7,
      downloads: 156,
      fileSize: '89.3 MB',
      duration: '60 minutes',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-10',
      isPremium: true,
      thumbnail: '🎬',
    },
    {
      id: '4',
      title: 'Mathematical Problem Solving - Māori Context',
      type: 'worksheet',
      subject: 'Mathematics',
      yearLevel: 'Year 4-5',
      description:
        'Problem-solving worksheets using Māori cultural contexts, traditional counting methods, and real-world applications.',
      tags: [
        'mathematics',
        'problem solving',
        'Māori context',
        'traditional counting',
        'real-world applications',
      ],
      culturalElements: ['Māori perspectives', 'Traditional knowledge', 'Cultural context'],
      author: 'Aroha Thompson',
      school: 'Te Kura o Te Whānau Tahi',
      rating: 4.6,
      downloads: 98,
      fileSize: '5.7 MB',
      duration: '40 minutes',
      difficulty: 'beginner',
      lastUpdated: '2024-01-08',
      isPremium: false,
      thumbnail: '🔢',
    },
    {
      id: '5',
      title: 'Environmental Science - Kaitiakitanga Principles',
      type: 'lesson-plan',
      subject: 'Science',
      yearLevel: 'Year 6-7',
      description:
        'Comprehensive lesson plan exploring environmental stewardship through Māori concepts of kaitiakitanga and sustainable practices.',
      tags: [
        'environmental science',
        'kaitiakitanga',
        'sustainability',
        'Māori concepts',
        'stewardship',
      ],
      culturalElements: [
        'Māori perspectives',
        'Environmental connection',
        'Traditional knowledge',
        'Kaitiakitanga',
      ],
      author: 'Tama Rangi',
      school: 'Rotorua Intermediate',
      rating: 4.9,
      downloads: 167,
      fileSize: '8.4 MB',
      duration: '90 minutes',
      difficulty: 'intermediate',
      lastUpdated: '2024-01-05',
      isPremium: false,
      thumbnail: '🌿',
    },
  ]);

  const [filteredResources, setFilteredResources] = useState<Resource[]>(resources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'downloads' | 'newest'>(
    'relevance',
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const subjects = [
    'All Subjects',
    'English',
    'Mathematics',
    'Science',
    'Social Studies',
    'Te Reo Māori',
    'Arts',
    'Health & PE',
    'Technology',
  ];
  const yearLevels = [
    'All Levels',
    'Year 1-2',
    'Year 3-4',
    'Year 5-6',
    'Year 7-8',
    'Year 9-10',
    'Year 11-13',
  ];
  const types = [
    'All Types',
    'lesson-plan',
    'assessment',
    'activity',
    'worksheet',
    'video',
    'interactive',
    'document',
  ];
  const difficulties = ['All Levels', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    const filtered = resources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSubject =
        !selectedSubject ||
        selectedSubject === 'All Subjects' ||
        resource.subject === selectedSubject;
      const matchesYearLevel =
        !selectedYearLevel ||
        selectedYearLevel === 'All Levels' ||
        resource.yearLevel === selectedYearLevel;
      const matchesType =
        !selectedType || selectedType === 'All Types' || resource.type === selectedType;
      const matchesDifficulty =
        !selectedDifficulty ||
        selectedDifficulty === 'All Levels' ||
        resource.difficulty === selectedDifficulty;
      const matchesPremium = !showPremiumOnly || resource.isPremium;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesYearLevel &&
        matchesType &&
        matchesDifficulty &&
        matchesPremium
      );
    });

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        filtered.sort(
          (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
        );
        break;
      default:
        // Relevance - keep original order for now
        break;
    }

    setFilteredResources(filtered);
  }, [
    searchTerm,
    selectedSubject,
    selectedYearLevel,
    selectedType,
    selectedDifficulty,
    showPremiumOnly,
    sortBy,
    resources,
  ]);

  const handleDownload = (resourceId: string) => {
    const resource = resources.find((r) => r.id === resourceId);
    if (resource) {
      // Simulate download
      console.log(`Downloading: ${resource.title}`);
      setResources((prev) =>
        prev.map((r) => (r.id === resourceId ? { ...r, downloads: r.downloads + 1 } : r)),
      );
    }
  };

  const handleRate = (resourceId: string, rating: number) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, rating: (r.rating + rating) / 2 } : r)),
    );
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#2d3748',
              margin: '0 0 10px 0',
              fontWeight: '700',
            }}
          >
            📚 Professional Resource Library
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Discover, search, and access thousands of curriculum-aligned educational resources
          </p>
        </div>

        {/* Search and Filters */}
        <div
          style={{
            background: '#f7fafc',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid #e2e8f0',
          }}
        >
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search resources by title, description, or tags..."
                style={{
                  width: '100%',
                  padding: '15px 20px 15px 50px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  background: 'white',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '1.2rem',
                  color: '#718096',
                }}
              >
                🔍
              </span>
            </div>
          </div>

          {/* Filters */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                }}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject === 'All Subjects' ? '' : subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Year Level
              </label>
              <select
                value={selectedYearLevel}
                onChange={(e) => setSelectedYearLevel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                }}
              >
                {yearLevels.map((level) => (
                  <option key={level} value={level === 'All Levels' ? '' : level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Resource Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                }}
              >
                {types.map((type) => (
                  <option key={type} value={type === 'All Types' ? '' : type}>
                    {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                }}
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty === 'All Levels' ? '' : difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px',
            }}
          >
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  checked={showPremiumOnly}
                  onChange={(e) => setShowPremiumOnly(e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: '#4a5568', fontWeight: '500' }}>Premium Only</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <label style={{ color: '#4a5568', fontWeight: '500' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  background: 'white',
                }}
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="downloads">Downloads</option>
                <option value="newest">Newest</option>
              </select>

              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '8px 12px',
                    border: `2px solid ${viewMode === 'grid' ? '#667eea' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    background: viewMode === 'grid' ? '#667eea' : 'white',
                    color: viewMode === 'grid' ? 'white' : '#4a5568',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ⊞
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 12px',
                    border: `2px solid ${viewMode === 'list' ? '#667eea' : '#e2e8f0'}`,
                    borderRadius: '6px',
                    background: viewMode === 'list' ? '#667eea' : 'white',
                    color: viewMode === 'list' ? 'white' : '#4a5568',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div
          style={{
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ color: '#4a5568', fontSize: '1.1rem', margin: '0' }}>
            Showing {filteredResources.length} of {resources.length} resources
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {filteredResources.slice(0, 5).map((resource, index) => (
              <span
                key={resource.id}
                style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                }}
              >
                {resource.thumbnail} {resource.title.split(' ').slice(0, 2).join(' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Resources Grid/List */}
        <div
          style={{
            display: viewMode === 'grid' ? 'grid' : 'block',
            gridTemplateColumns:
              viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : 'none',
            gap: '20px',
          }}
        >
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                display: viewMode === 'list' ? 'flex' : 'block',
                gap: viewMode === 'list' ? '20px' : '0',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
              }}
            >
              {viewMode === 'list' && (
                <div
                  style={{ flexShrink: 0, fontSize: '3rem', textAlign: 'center', minWidth: '80px' }}
                >
                  {resource.thumbnail}
                </div>
              )}

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        color: '#2d3748',
                        margin: '0 0 5px 0',
                        fontSize: '1.3rem',
                        lineHeight: '1.3',
                      }}
                    >
                      {viewMode === 'grid' && (
                        <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>
                          {resource.thumbnail}
                        </span>
                      )}
                      {resource.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '12px',
                        color: '#718096',
                        fontSize: '0.9rem',
                        marginBottom: '8px',
                      }}
                    >
                      <span>📚 {resource.subject}</span>
                      <span>👥 {resource.yearLevel}</span>
                      <span>📁 {resource.type.replace('-', ' ')}</span>
                      <span>⭐ {resource.rating.toFixed(1)}</span>
                      <span>⬇️ {resource.downloads}</span>
                      {resource.isPremium && (
                        <span style={{ color: '#f59e0b', fontWeight: '600' }}>👑 Premium</span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleDownload(resource.id)}
                      style={{
                        background: '#48bb78',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Download
                    </button>
                    <button
                      style={{
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Preview
                    </button>
                  </div>
                </div>

                <p style={{ color: '#4a5568', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {resource.description}
                </p>

                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}
                >
                  {resource.tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#e2e8f0',
                        color: '#4a5568',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 4 && (
                    <span style={{ color: '#718096', fontSize: '0.8rem' }}>
                      +{resource.tags.length - 4} more
                    </span>
                  )}
                </div>

                {resource.culturalElements.length > 0 && (
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}
                  >
                    {resource.culturalElements.map((element, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '0.8rem',
                          fontWeight: '500',
                        }}
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    color: '#718096',
                  }}
                >
                  <span>
                    By {resource.author} from {resource.school}
                  </span>
                  <span>
                    {resource.lastUpdated} • {resource.fileSize}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#718096',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>No resources found</h3>
            <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalResourceLibrary;
