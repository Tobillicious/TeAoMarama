import React, { useState } from 'react';

interface PortfolioItem {
  id: string;
  title: string;
  type:
    | 'assignment'
    | 'project'
    | 'reflection'
    | 'achievement'
    | 'artwork'
    | 'video'
    | 'presentation';
  subject: string;
  description: string;
  content: string;
  attachments: string[];
  grade?: number;
  feedback?: string;
  dateCreated: string;
  dateSubmitted?: string;
  isPublic: boolean;
  tags: string[];
  culturalElements: string[];
}

interface Student {
  id: string;
  name: string;
  yearLevel: string;
  class: string;
  avatar?: string;
  bio: string;
  interests: string[];
  goals: string[];
  culturalBackground: string;
  achievements: string[];
}

const StudentPortfolioSystem: React.FC = () => {
  const [currentStudent] = useState<Student>({
    id: '1',
    name: 'Aroha Thompson',
    yearLevel: 'Year 8',
    class: 'Room 12',
    avatar: '👩‍🎓',
    bio: 'Passionate about Māori culture and environmental science. Loves learning through hands-on activities and connecting with nature.',
    interests: ['Te Reo Māori', 'Environmental Science', 'Art', 'Music'],
    goals: [
      'Improve te reo Māori fluency',
      'Learn more about kaitiakitanga',
      'Create digital art portfolio',
    ],
    culturalBackground: 'Māori',
    achievements: [
      'Te Reo Māori Excellence Award',
      'Environmental Science Project Winner',
      'Art Exhibition Participant',
    ],
  });

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'Māori Settlement Patterns Research Project',
      type: 'project',
      subject: 'Social Studies',
      description:
        'Comprehensive research project exploring early Māori settlement patterns with cultural perspectives and environmental factors.',
      content:
        'This project involved researching traditional Māori settlement patterns, analyzing environmental factors that influenced where communities were established, and creating an interactive map showing the connections between land, water, and community life. I learned about the deep respect Māori have for the environment and how this shaped their way of life.',
      attachments: ['settlement-map.pdf', 'research-notes.docx', 'presentation.pptx'],
      grade: 85,
      feedback:
        'Excellent research with strong cultural perspectives. Well-presented findings with clear connections to environmental factors.',
      dateCreated: '2024-01-10',
      dateSubmitted: '2024-01-19',
      isPublic: true,
      tags: ['Māori history', 'settlement patterns', 'environmental factors', 'research'],
      culturalElements: ['Māori perspectives', 'Environmental connection', 'Traditional knowledge'],
    },
    {
      id: '2',
      title: 'Te Reo Māori Speaking Assessment',
      type: 'presentation',
      subject: 'Te Reo Māori',
      description: 'Oral presentation in te reo Māori about my whānau and cultural connections.',
      content:
        'I presented about my family history, our connection to our marae, and the importance of te reo Māori in our daily lives. I shared stories passed down from my grandparents and explained how we practice tikanga in our home.',
      attachments: ['speaking-video.mp4', 'script.pdf'],
      grade: 90,
      feedback:
        'Strong cultural knowledge and good pronunciation. Keep practicing fluency and sentence structure.',
      dateCreated: '2024-01-15',
      dateSubmitted: '2024-01-17',
      isPublic: true,
      tags: ['te reo Māori', 'oral presentation', 'whānau', 'cultural identity'],
      culturalElements: ['Te reo Māori', 'Cultural protocols', 'Whānau connections'],
    },
    {
      id: '3',
      title: 'Environmental Art - Kaitiakitanga',
      type: 'artwork',
      subject: 'Arts',
      description:
        'Digital artwork representing the concept of kaitiakitanga (environmental guardianship) through Māori artistic traditions.',
      content:
        'I created a digital artwork that combines traditional Māori patterns with modern environmental themes. The piece shows the connection between people and nature, emphasizing our responsibility to care for the environment for future generations.',
      attachments: ['kaitiakitanga-art.png', 'process-video.mp4'],
      grade: 88,
      feedback:
        'Creative interpretation of kaitiakitanga with strong visual impact. Excellent use of traditional patterns.',
      dateCreated: '2024-01-08',
      dateSubmitted: '2024-01-12',
      isPublic: true,
      tags: ['digital art', 'kaitiakitanga', 'Māori patterns', 'environmental themes'],
      culturalElements: ['Māori art', 'Environmental connection', 'Traditional patterns'],
    },
    {
      id: '4',
      title: 'Reflection on Learning Journey',
      type: 'reflection',
      subject: 'General',
      description: 'Personal reflection on my learning journey this term and goals for the future.',
      content:
        'This term I have grown in my understanding of Māori culture and my connection to the environment. I have learned to see the world through different perspectives and appreciate the wisdom of traditional knowledge. My goal is to continue learning te reo Māori and to share what I learn with others.',
      attachments: [],
      dateCreated: '2024-01-20',
      isPublic: false,
      tags: ['reflection', 'learning journey', 'personal growth', 'goals'],
      culturalElements: ['Personal growth', 'Cultural learning', 'Future aspirations'],
    },
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [showPublicOnly, setShowPublicOnly] = useState(false);

  const filteredItems = portfolioItems.filter((item) => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesVisibility = !showPublicOnly || item.isPublic;
    return matchesType && matchesSubject && matchesVisibility;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'project':
        return '📋';
      case 'reflection':
        return '💭';
      case 'achievement':
        return '🏆';
      case 'artwork':
        return '🎨';
      case 'video':
        return '🎬';
      case 'presentation':
        return '🎤';
      default:
        return '📄';
    }
  };

  const getGradeColor = (grade?: number) => {
    if (!grade) return '#718096';
    if (grade >= 80) return '#48bb78';
    if (grade >= 60) return '#ed8936';
    return '#e53e3e';
  };

  const getGradeText = (grade?: number) => {
    if (!grade) return 'Not graded';
    if (grade >= 80) return 'Excellence';
    if (grade >= 60) return 'Merit';
    return 'Achieved';
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
          maxWidth: '1400px',
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
            📚 Student Portfolio
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Showcase your learning journey, achievements, and growth
          </p>
        </div>

        {/* Student Profile */}
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '30px',
            borderRadius: '20px',
            marginBottom: '30px',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '30px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '4rem', textAlign: 'center' }}>{currentStudent.avatar}</div>
          <div>
            <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0', fontWeight: '600' }}>
              {currentStudent.name}
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '15px',
                fontSize: '1.1rem',
                opacity: '0.9',
              }}
            >
              <span>📚 {currentStudent.yearLevel}</span>
              <span>🏠 {currentStudent.class}</span>
              <span>🌿 {currentStudent.culturalBackground}</span>
            </div>
            <p style={{ fontSize: '1.1rem', margin: '0 0 15px 0', lineHeight: '1.5' }}>
              {currentStudent.bio}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {currentStudent.interests.map((interest, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: '#667eea' }}>
              {portfolioItems.length}
            </h3>
            <p style={{ margin: '0', color: '#4a5568' }}>Portfolio Items</p>
          </div>
          <div
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: '#48bb78' }}>
              {portfolioItems.filter((item) => item.grade && item.grade >= 80).length}
            </h3>
            <p style={{ margin: '0', color: '#4a5568' }}>Excellence Grades</p>
          </div>
          <div
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: '#ed8936' }}>
              {currentStudent.achievements.length}
            </h3>
            <p style={{ margin: '0', color: '#4a5568' }}>Achievements</p>
          </div>
          <div
            style={{
              background: 'white',
              border: '2px solid #e2e8f0',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', color: '#9f7aea' }}>
              {portfolioItems.filter((item) => item.isPublic).length}
            </h3>
            <p style={{ margin: '0', color: '#4a5568' }}>Public Items</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div
          style={{
            background: '#f7fafc',
            padding: '25px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid #e2e8f0',
          }}
        >
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
              <label style={{ color: '#4a5568', fontWeight: '500' }}>Filter by:</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  background: 'white',
                }}
              >
                <option value="all">All Types</option>
                <option value="assignment">Assignments</option>
                <option value="project">Projects</option>
                <option value="reflection">Reflections</option>
                <option value="achievement">Achievements</option>
                <option value="artwork">Artwork</option>
                <option value="video">Videos</option>
                <option value="presentation">Presentations</option>
              </select>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  background: 'white',
                }}
              >
                <option value="all">All Subjects</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Te Reo Māori">Te Reo Māori</option>
                <option value="Arts">Arts</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="General">General</option>
              </select>

              <label
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  checked={showPublicOnly}
                  onChange={(e) => setShowPublicOnly(e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <span style={{ color: '#4a5568', fontWeight: '500' }}>Public Only</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
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
                ⊞ Grid
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                style={{
                  padding: '8px 12px',
                  border: `2px solid ${viewMode === 'timeline' ? '#667eea' : '#e2e8f0'}`,
                  borderRadius: '6px',
                  background: viewMode === 'timeline' ? '#667eea' : 'white',
                  color: viewMode === 'timeline' ? 'white' : '#4a5568',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                📅 Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Items */}
        {viewMode === 'grid' ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '2rem' }}>{getTypeIcon(item.type)}</span>
                    <div>
                      <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.3rem' }}>
                        {item.title}
                      </h3>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          color: '#718096',
                          fontSize: '0.9rem',
                        }}
                      >
                        <span>📚 {item.subject}</span>
                        <span>📅 {new Date(item.dateCreated).toLocaleDateString()}</span>
                        {item.isPublic && <span style={{ color: '#48bb78' }}>🌐 Public</span>}
                      </div>
                    </div>
                  </div>
                  {item.grade && (
                    <div
                      style={{
                        background: getGradeColor(item.grade),
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '15px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        textAlign: 'center',
                      }}
                    >
                      <div>{item.grade}%</div>
                      <div style={{ fontSize: '0.7rem' }}>{getGradeText(item.grade)}</div>
                    </div>
                  )}
                </div>

                <p style={{ color: '#4a5568', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                  {item.description}
                </p>

                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}
                >
                  {item.tags.slice(0, 3).map((tag, index) => (
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
                  {item.tags.length > 3 && (
                    <span style={{ color: '#718096', fontSize: '0.8rem' }}>
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>

                {item.culturalElements.length > 0 && (
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '15px' }}
                  >
                    {item.culturalElements.map((element, index) => (
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

                {item.attachments.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: '0 0 8px 0' }}>
                      Attachments ({item.attachments.length}):
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.attachments.map((attachment, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#f7fafc',
                            color: '#4a5568',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          📎 {attachment}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    style={{
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                    }}
                  >
                    View Details
                  </button>
                  <button
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
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '15px',
                    borderRadius: '50%',
                    fontSize: '1.5rem',
                    minWidth: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {getTypeIcon(item.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <h3 style={{ color: '#2d3748', margin: '0', fontSize: '1.4rem' }}>
                      {item.title}
                    </h3>
                    {item.grade && (
                      <div
                        style={{
                          background: getGradeColor(item.grade),
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                        }}
                      >
                        {item.grade}% - {getGradeText(item.grade)}
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '15px',
                      color: '#718096',
                      fontSize: '0.9rem',
                      marginBottom: '10px',
                    }}
                  >
                    <span>📚 {item.subject}</span>
                    <span>📅 {new Date(item.dateCreated).toLocaleDateString()}</span>
                    {item.isPublic && <span style={{ color: '#48bb78' }}>🌐 Public</span>}
                  </div>
                  <p style={{ color: '#4a5568', margin: '0 0 15px 0', lineHeight: '1.5' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      style={{
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      View Details
                    </button>
                    <button
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
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#718096',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📚</div>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>No portfolio items found</h3>
            <p>Try adjusting your filters or add new items to your portfolio.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortfolioSystem;
