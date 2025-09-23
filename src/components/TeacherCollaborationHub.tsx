import React, { useState } from 'react';

interface SharedResource {
  id: string;
  title: string;
  type: 'lesson-plan' | 'assessment' | 'resource' | 'activity';
  subject: string;
  yearLevel: string;
  author: string;
  school: string;
  description: string;
  tags: string[];
  culturalElements: string[];
  downloads: number;
  rating: number;
  createdAt: string;
  isPublic: boolean;
}

interface CollaborationRequest {
  id: string;
  fromTeacher: string;
  fromSchool: string;
  resourceId: string;
  message: string;
  status: 'pending' | 'approved' | 'declined';
  createdAt: string;
}

const TeacherCollaborationHub: React.FC = () => {
  const [sharedResources, setSharedResources] = useState<SharedResource[]>([
    {
      id: '1',
      title: 'Māori Settlement Patterns - Interactive Lesson',
      type: 'lesson-plan',
      subject: 'Social Studies',
      yearLevel: 'Year 7-8',
      author: 'Sarah Mitchell',
      school: 'Auckland Grammar School',
      description:
        'Comprehensive lesson plan exploring early Māori settlement patterns with interactive maps and cultural perspectives.',
      tags: [
        'Māori history',
        'settlement patterns',
        'interactive learning',
        'cultural integration',
      ],
      culturalElements: ['Māori perspectives', 'Environmental connection', 'Community values'],
      downloads: 45,
      rating: 4.8,
      createdAt: '2024-01-15',
      isPublic: true,
    },
    {
      id: '2',
      title: 'Te Reo Māori Assessment Rubric',
      type: 'assessment',
      subject: 'Te Reo Māori',
      yearLevel: 'Year 5-6',
      author: 'Hemi Williams',
      school: 'Te Kura Kaupapa Māori o Te Whānau Tahi',
      description:
        'Detailed assessment rubric for te reo Māori speaking and listening skills with cultural competency indicators.',
      tags: ['assessment', 'te reo Māori', 'rubric', 'cultural competency'],
      culturalElements: ['Te reo Māori', 'Cultural protocols', 'Traditional knowledge'],
      downloads: 32,
      rating: 4.9,
      createdAt: '2024-01-12',
      isPublic: true,
    },
    {
      id: '3',
      title: 'Pacific Island Migration Timeline',
      type: 'resource',
      subject: 'Social Studies',
      yearLevel: 'Year 9-10',
      author: 'Losa Tupou',
      school: 'Mangere College',
      description:
        'Interactive timeline showing Pacific Island migration patterns to New Zealand with personal stories and cultural context.',
      tags: ['Pacific migration', 'timeline', 'personal stories', 'cultural context'],
      culturalElements: ['Pacific perspectives', 'Migration stories', 'Cultural identity'],
      downloads: 28,
      rating: 4.7,
      createdAt: '2024-01-10',
      isPublic: true,
    },
  ]);

  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([
    {
      id: '1',
      fromTeacher: 'Emma Thompson',
      fromSchool: 'Wellington High School',
      resourceId: '1',
      message:
        'Would love to collaborate on adapting this lesson for Year 9 students. I have some additional resources that might complement it.',
      status: 'pending',
      createdAt: '2024-01-16',
    },
    {
      id: '2',
      fromTeacher: 'James Chen',
      fromSchool: 'Christchurch Boys High School',
      resourceId: '2',
      message:
        'Great assessment rubric! Would you be interested in creating a similar one for Year 7-8 students?',
      status: 'pending',
      createdAt: '2024-01-14',
    },
  ]);

  const [newResource, setNewResource] = useState<Partial<SharedResource>>({
    title: '',
    type: 'lesson-plan',
    subject: '',
    yearLevel: '',
    description: '',
    tags: [''],
    culturalElements: [''],
    isPublic: true,
  });

  const [showShareForm, setShowShareForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredResources = sharedResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = !filterSubject || resource.subject === filterSubject;
    const matchesType = !filterType || resource.type === filterType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleShareResource = () => {
    if (newResource.title && newResource.subject && newResource.yearLevel) {
      const resource: SharedResource = {
        id: Date.now().toString(),
        title: newResource.title,
        type: newResource.type as any,
        subject: newResource.subject,
        yearLevel: newResource.yearLevel,
        author: 'Current User',
        school: 'Your School',
        description: newResource.description || '',
        tags: newResource.tags?.filter((tag) => tag.trim()) || [],
        culturalElements: newResource.culturalElements?.filter((el) => el.trim()) || [],
        downloads: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0],
        isPublic: newResource.isPublic || false,
      };

      setSharedResources((prev) => [resource, ...prev]);
      setNewResource({
        title: '',
        type: 'lesson-plan',
        subject: '',
        yearLevel: '',
        description: '',
        tags: [''],
        culturalElements: [''],
        isPublic: true,
      });
      setShowShareForm(false);
    }
  };

  const handleCollaborationRequest = (requestId: string, status: 'approved' | 'declined') => {
    setCollaborationRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status } : req)),
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
            🤝 Teacher Collaboration Hub
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Share resources, collaborate on lessons, and build a community of New Zealand educators
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{sharedResources.length}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Shared Resources</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {sharedResources.reduce((acc, resource) => acc + resource.downloads, 0)}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Total Downloads</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {collaborationRequests.filter((req) => req.status === 'pending').length}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Pending Requests</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {Math.round(
                (sharedResources.reduce((acc, resource) => acc + resource.rating, 0) /
                  sharedResources.length) *
                  10,
              ) / 10}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Average Rating</p>
          </div>
        </div>

        {/* Search and Filter */}
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
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Search Resources
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or tags..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Subject
              </label>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              >
                <option value="">All Subjects</option>
                <option value="English">English</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Te Reo Māori">Te Reo Māori</option>
                <option value="Arts">Arts</option>
                <option value="Health & PE">Health & PE</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              >
                <option value="">All Types</option>
                <option value="lesson-plan">Lesson Plan</option>
                <option value="assessment">Assessment</option>
                <option value="resource">Resource</option>
                <option value="activity">Activity</option>
              </select>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setShowShareForm(!showShareForm)}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
              }}
            >
              {showShareForm ? 'Cancel' : '+ Share Your Resource'}
            </button>
          </div>
        </div>

        {/* Share Resource Form */}
        {showShareForm && (
          <div
            style={{
              background: '#f7fafc',
              padding: '30px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #e2e8f0',
            }}
          >
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Share Your Resource</h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '20px',
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
                  Resource Title
                </label>
                <input
                  type="text"
                  value={newResource.title || ''}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                  placeholder="Enter resource title"
                />
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
                  Type
                </label>
                <select
                  value={newResource.type || 'lesson-plan'}
                  onChange={(e) =>
                    setNewResource((prev) => ({ ...prev, type: e.target.value as any }))
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="lesson-plan">Lesson Plan</option>
                  <option value="assessment">Assessment</option>
                  <option value="resource">Resource</option>
                  <option value="activity">Activity</option>
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
                  Subject
                </label>
                <select
                  value={newResource.subject || ''}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, subject: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Subject</option>
                  <option value="English">English</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Te Reo Māori">Te Reo Māori</option>
                  <option value="Arts">Arts</option>
                  <option value="Health & PE">Health & PE</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600',
                  color: '#4a5568',
                }}
              >
                Description
              </label>
              <textarea
                value={newResource.description || ''}
                onChange={(e) =>
                  setNewResource((prev) => ({ ...prev, description: e.target.value }))
                }
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
                placeholder="Describe your resource..."
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleShareResource}
                style={{
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '25px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(72, 187, 120, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(72, 187, 120, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(72, 187, 120, 0.3)';
                }}
              >
                Share Resource
              </button>
            </div>
          </div>
        )}

        {/* Collaboration Requests */}
        {collaborationRequests.filter((req) => req.status === 'pending').length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Collaboration Requests</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {collaborationRequests
                .filter((req) => req.status === 'pending')
                .map((request) => (
                  <div
                    key={request.id}
                    style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '20px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div>
                        <h3 style={{ color: '#2d3748', margin: '0 0 5px 0' }}>
                          From: {request.fromTeacher} ({request.fromSchool})
                        </h3>
                        <p style={{ color: '#4a5568', margin: '0 0 10px 0' }}>{request.message}</p>
                        <p style={{ color: '#718096', fontSize: '0.9rem', margin: '0' }}>
                          Requested: {request.createdAt}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleCollaborationRequest(request.id, 'approved')}
                          style={{
                            background: '#48bb78',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleCollaborationRequest(request.id, 'declined')}
                          style={{
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                          }}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Shared Resources */}
        <div>
          <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Shared Resources</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
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
                  <div>
                    <h3 style={{ color: '#2d3748', margin: '0 0 5px 0', fontSize: '1.4rem' }}>
                      {resource.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        gap: '15px',
                        color: '#718096',
                        fontSize: '0.95rem',
                        marginBottom: '10px',
                      }}
                    >
                      <span>📚 {resource.subject}</span>
                      <span>👥 {resource.yearLevel}</span>
                      <span>📁 {resource.type.replace('-', ' ')}</span>
                      <span>⭐ {resource.rating}/5</span>
                      <span>⬇️ {resource.downloads} downloads</span>
                    </div>
                    <p style={{ color: '#4a5568', margin: '0 0 10px 0' }}>{resource.description}</p>
                    <p style={{ color: '#718096', fontSize: '0.9rem', margin: '0' }}>
                      By {resource.author} from {resource.school} • {resource.createdAt}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      style={{
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                    >
                      Download
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
                      }}
                    >
                      Collaborate
                    </button>
                  </div>
                </div>

                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}
                >
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#e2e8f0',
                        color: '#4a5568',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.85rem',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {resource.culturalElements.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {resource.culturalElements.map((element, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                        }}
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCollaborationHub;
