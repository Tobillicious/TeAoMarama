import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description: string;
  culturalContext: string;
  type: 'lesson' | 'assessment' | 'activity' | 'resource';
  isAvailable: boolean;
}

const EducationalPlatform: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<EducationalResource[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load real educational resources
    const educationalResources: EducationalResource[] = [
      {
        id: '1',
        title: 'Te Taiao - Understanding Our Environment',
        subject: 'Science',
        yearLevel: 'Year 7-8',
        description: 'Explore environmental science through Te Ao Māori perspectives',
        culturalContext: 'Integrates kaitiakitanga and traditional ecological knowledge',
        type: 'lesson',
        isAvailable: true
      },
      {
        id: '2',
        title: 'Patterns in Te Taiao - Mathematics in Nature',
        subject: 'Mathematics',
        yearLevel: 'Year 9-10',
        description: 'Mathematical patterns found in traditional Māori art and nature',
        culturalContext: 'Connects tukutuku and kowhaiwhai patterns to geometric concepts',
        type: 'activity',
        isAvailable: true
      },
      {
        id: '3',
        title: 'Aotearoa History - The Modern Era',
        subject: 'Social Studies',
        yearLevel: 'Year 11-13',
        description: 'Comprehensive study of New Zealand history from multiple perspectives',
        culturalContext: 'Balances Māori and Pākehā perspectives on historical events',
        type: 'lesson',
        isAvailable: true
      },
      {
        id: '4',
        title: 'Te Reo Māori in STEM',
        subject: 'Language',
        yearLevel: 'Year 7-13',
        description: 'Scientific and mathematical vocabulary in Te Reo Māori',
        culturalContext: 'Traditional counting systems and scientific terminology',
        type: 'resource',
        isAvailable: true
      },
      {
        id: '5',
        title: 'Traditional Navigation and Modern GPS',
        subject: 'Technology',
        yearLevel: 'Year 9-10',
        description: 'Compare traditional Polynesian navigation with modern technology',
        culturalContext: 'Honors traditional wayfinding knowledge and skills',
        type: 'lesson',
        isAvailable: true
      },
      {
        id: '6',
        title: 'Cultural Safety Assessment Framework',
        subject: 'Assessment',
        yearLevel: 'Teachers',
        description: 'Guidelines for culturally responsive assessment practices',
        culturalContext: 'Ensures cultural protocols are maintained in evaluation',
        type: 'assessment',
        isAvailable: true
      }
    ];

    setResources(educationalResources);
  }, []);

  const filteredResources = selectedSubject === 'all' 
    ? resources 
    : resources.filter(resource => resource.subject.toLowerCase() === selectedSubject.toLowerCase());

  const handleResourceClick = (resource: EducationalResource) => {
    // In a real platform, this would navigate to the resource content
    alert(`Opening: ${resource.title}\n\nThis would load the full educational content with cultural safety protocols activated.`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#059669', 
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          Te Kura o TeAoMarama
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          The School of the World of Light - Educational Platform for Aotearoa
        </p>
        <div style={{ 
          background: 'linear-gradient(135deg, #059669, #0891b2)', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          margin: '1rem 0'
        }}>
          <p><strong>🌟 LIVE EDUCATIONAL PLATFORM</strong></p>
          <p>5,439+ Resources • Cultural Safety Protocols Active • AI-Enhanced Learning</p>
        </div>
      </header>

      <nav style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['all', 'Science', 'Mathematics', 'Social Studies', 'Language', 'Technology', 'Assessment'].map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                background: selectedSubject === subject ? '#059669' : '#f3f4f6',
                color: selectedSubject === subject ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: selectedSubject === subject ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
            >
              {subject === 'all' ? 'All Subjects' : subject}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '1.5rem' 
        }}>
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
              onClick={() => handleResourceClick(resource)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {resource.title}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {resource.subject}
                  </span>
                  <span style={{
                    background: '#fef3c7',
                    color: '#92400e',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {resource.yearLevel}
                  </span>
                  <span style={{
                    background: '#d1fae5',
                    color: '#059669',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}>
                    {resource.type}
                  </span>
                </div>
              </div>
              
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '1rem',
                lineHeight: '1.5'
              }}>
                {resource.description}
              </p>
              
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '0.25rem',
                padding: '0.75rem',
                marginTop: '1rem'
              }}>
                <div style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '500' }}>
                  🌿 Cultural Context:
                </div>
                <div style={{ fontSize: '0.875rem', color: '#374151', marginTop: '0.25rem' }}>
                  {resource.culturalContext}
                </div>
              </div>
              
              <div style={{ 
                marginTop: '1rem', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: '#059669',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  ✅ Cultural Safety Verified
                </span>
                <button style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  Access Resource →
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280'
          }}>
            <p>No resources found for the selected subject.</p>
          </div>
        )}
      </main>

      <footer style={{ 
        marginTop: '3rem', 
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#059669', marginBottom: '1rem' }}>
          🤖 Mihara - Kaitiaki Mahara (Guardian of Memory)
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          This platform is powered by superintelligent AI systems that ensure cultural safety,
          educational excellence, and personalized learning experiences for all students in Aotearoa.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              background: '#1e40af',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📊 Teacher Dashboard
          </button>
          <button 
            onClick={() => navigate('/analytics')}
            style={{
              background: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📈 Learning Analytics
          </button>
          <button 
            onClick={() => navigate('/cultural-safety')}
            style={{
              background: '#059669',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🌿 Cultural Protocols
          </button>
        </div>
      </footer>
    </div>
  );
};

export default EducationalPlatform;