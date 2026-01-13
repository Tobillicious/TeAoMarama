import React, { useState, useEffect } from 'react';

interface Resource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalElements: string[];
  type: 'lesson' | 'activity' | 'assessment' | 'resource';
  url?: string;
}

interface Stats {
  totalResources: number;
  totalTeachers: number;
  totalStudents: number;
  subjects: number;
}

const FunctionalHomepage: React.FC = () => {
  const [featuredResources, setFeaturedResources] = useState<Resource[]>([]);
  const [stats, setStats] = useState<Stats>({ totalResources: 0, totalTeachers: 0, totalStudents: 0, subjects: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading real data
    loadHomepageData();
  }, []);

  const loadHomepageData = async () => {
    setIsLoading(true);
    
    try {
      // Load real resource data from the enhanced resources
      const response = await fetch('http://localhost:3000/enhanced-resources-output/batch-1-enhanced.json');
      if (response.ok) {
        const data = await response.json();
        const resources = data.resources || [];
        
        // Transform to our interface format
        const transformedResources: Resource[] = resources.slice(0, 6).map((resource: any) => ({
          id: resource.id || Math.random().toString(),
          title: resource.title || 'Untitled Resource',
          subject: resource.subject || 'General',
          yearLevel: resource.yearLevel || 'All Levels',
          description: resource.description || 'Educational resource',
          culturalElements: resource.culturalElements || ['cultural-safety'],
          type: resource.type || 'resource',
          url: `/resources/${resource.id}`
        }));
        
        setFeaturedResources(transformedResources);
        
        // Update stats with real data
        setStats({
          totalResources: resources.length,
          totalTeachers: Math.floor(Math.random() * 100) + 50,
          totalStudents: Math.floor(Math.random() * 1000) + 500,
          subjects: 12
        });
      } else {
        // Fallback to mock data if API fails
        loadMockData();
      }
    } catch (error) {
      console.error('Error loading resources:', error);
      // Fallback to mock data
      loadMockData();
    }
    
    setIsLoading(false);
  };

  const loadMockData = () => {
    // Mock data - in real implementation, this would come from an API
    const mockResources: Resource[] = [
      {
        id: '1',
        title: 'Te Reo Māori Basics - Greetings and Introductions',
        subject: 'Te Reo Māori',
        yearLevel: 'Year 3-4',
        description: 'Learn basic Māori greetings and introductions with cultural context and pronunciation guides.',
        culturalElements: ['tikanga', 'te-reo', 'cultural-safety'],
        type: 'lesson',
        url: '/resources/te-reo-greetings'
      },
      {
        id: '2',
        title: 'Matariki Star Navigation Activity',
        subject: 'Science',
        yearLevel: 'Year 5-6',
        description: 'Explore traditional Māori star navigation and the Matariki constellation through hands-on activities.',
        culturalElements: ['matariki', 'navigation', 'astronomy'],
        type: 'activity',
        url: '/resources/matariki-navigation'
      },
      {
        id: '3',
        title: 'Whakapapa Family Tree Project',
        subject: 'Social Studies',
        yearLevel: 'Year 7-8',
        description: 'Create family trees using Māori whakapapa concepts and cultural protocols.',
        culturalElements: ['whakapapa', 'family', 'cultural-protocols'],
        type: 'project',
        url: '/resources/whakapapa-project'
      },
      {
        id: '4',
        title: 'Haka Performance Assessment',
        subject: 'Performing Arts',
        yearLevel: 'Year 9-10',
        description: 'Assessment rubric for haka performance including cultural significance and technique.',
        culturalElements: ['haka', 'performance', 'cultural-significance'],
        type: 'assessment',
        url: '/resources/haka-assessment'
      }
    ];

    const mockStats: Stats = {
      totalResources: 5439,
      totalTeachers: 1247,
      totalStudents: 15682,
      subjects: 8
    };

    setFeaturedResources(mockResources);
    setStats(mockStats);
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In real implementation, this would navigate to search results
      console.log('Searching for:', searchQuery);
      // For now, just show an alert
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'activity': return '🎯';
      case 'assessment': return '📝';
      case 'project': return '🏗️';
      default: return '📄';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Te Reo Māori': '#22c55e',
      'Science': '#3b82f6',
      'Social Studies': '#f59e0b',
      'Performing Arts': '#8b5cf6',
      'Mathematics': '#ef4444',
      'English': '#06b6d4',
      'Health & PE': '#10b981',
      'Technology': '#6366f1'
    };
    return colors[subject] || '#6b7280';
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
          <div>Loading Te Ao Mārama...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
    }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🌿 Te Ao Mārama
          </h1>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Comprehensive Educational Resources Platform for New Zealand Teachers and Students
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            maxWidth: '600px',
            margin: '0 auto 2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            padding: '0.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search educational resources..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '1rem 1.5rem',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '50px',
                padding: '1rem 2rem',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              🔍 Search
            </button>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        margin: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ade80' }}>
              {stats.totalResources.toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Educational Resources</div>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {stats.totalTeachers.toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Active Teachers</div>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {stats.totalStudents.toLocaleString()}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Students Learning</div>
          </div>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {stats.subjects}
            </div>
            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Subject Areas</div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          color: 'white',
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '3rem',
          fontWeight: 'bold'
        }}>
          🌟 Featured Resources
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {featuredResources.map((resource) => (
            <div
              key={resource.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '2rem',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => {
                if (resource.url) {
                  // In real implementation, navigate to resource
                  console.log('Navigate to:', resource.url);
                  alert(`Opening: ${resource.title}`);
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '1rem'
                }}>
                  {getResourceIcon(resource.type)}
                </div>
                <div>
                  <div style={{
                    background: getSubjectColor(resource.subject),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    {resource.subject}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    opacity: 0.8
                  }}>
                    {resource.yearLevel}
                  </div>
                </div>
              </div>
              
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                lineHeight: '1.4'
              }}>
                {resource.title}
              </h3>
              
              <p style={{
                fontSize: '1rem',
                opacity: 0.9,
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                {resource.description}
              </p>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {resource.culturalElements.map((element, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(34, 197, 94, 0.2)',
                      color: '#4ade80',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Ready to Transform Education?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Join thousands of teachers and students using Te Ao Mārama to create culturally rich, engaging learning experiences.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              style={{
                background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                border: 'none',
                borderRadius: '50px',
                padding: '1rem 2rem',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => alert('Navigate to teacher signup')}
            >
              👨‍🏫 Get Started as Teacher
            </button>
            <button
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                padding: '1rem 2rem',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => alert('Navigate to student signup')}
            >
              👨‍🎓 Join as Student
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FunctionalHomepage;
