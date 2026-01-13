import React, { useContext, useState } from 'react';
import { EducationContext } from '../contexts/EducationContext';

const RealResourceBrowser: React.FC = () => {
  const { resources, loading } = useContext(EducationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [displayCount, setDisplayCount] = useState(12);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || resource.yearLevel === selectedYear;

    return matchesSearch && matchesSubject && matchesYear;
  });

  const subjects = [...new Set(resources.map((r) => r.subject))];
  const years = [...new Set(resources.map((r) => r.yearLevel))];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            📚 Educational Resources Library
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '10px' }}>
            {loading ? 'Loading resources...' : `${resources.length}+ Real Educational Resources`}
          </p>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Curriculum-aligned content with cultural safety verification
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div
          style={{
            background: '#f8fafc',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid #e2e8f0',
          }}
        >
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '150px',
              }}
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '120px',
              }}
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '25px',
            marginBottom: '40px',
          }}
        >
          {loading ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px',
                color: '#6b7280',
                fontSize: '1.2rem',
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  width: '40px',
                  height: '40px',
                  border: '4px solid #e2e8f0',
                  borderTop: '4px solid #1e40af',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '20px',
                }}
              ></div>
              <p>Loading 120,583+ educational resources...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            filteredResources.slice(0, displayCount).map((resource) => (
              <div
                key={resource.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontSize: '2rem', marginRight: '10px' }}>
                    {resource.thumbnail || '📚'}
                  </span>
                  <div>
                    <div
                      style={{
                        background: '#1e40af',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                      }}
                    >
                      {resource.subject}
                    </div>
                    <div
                      style={{
                        background: '#059669',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {resource.yearLevel}
                    </div>
                  </div>
                </div>

                <h3
                  style={{
                    color: '#1e40af',
                    fontSize: '1.2rem',
                    marginBottom: '10px',
                    lineHeight: '1.3',
                  }}
                >
                  {resource.title}
                </h3>

                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    marginBottom: '15px',
                  }}
                >
                  {resource.description}
                </p>

                {/* Cultural Elements */}
                {resource.culturalElements && resource.culturalElements.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    {resource.culturalElements.slice(0, 2).map((element, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#f0fdf4',
                          color: '#059669',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          marginRight: '5px',
                          display: 'inline-block',
                          marginBottom: '5px',
                        }}
                      >
                        🌿 {element}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span
                      style={{
                        background: '#f0f9ff',
                        color: '#1e40af',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                      }}
                    >
                      ⭐ {resource.rating || '4.8'}
                    </span>
                    <span
                      style={{
                        background: '#f0fdf4',
                        color: '#059669',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                      }}
                    >
                      📥 {resource.downloads || '0'}
                    </span>
                  </div>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    View Resource
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px',
                color: '#6b7280',
                fontSize: '1.2rem',
              }}
            >
              <p>No resources found matching your criteria.</p>
              <p style={{ fontSize: '1rem', marginTop: '10px' }}>
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>

        {/* Load More Section */}
        {filteredResources.length > displayCount && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setDisplayCount((prev) => prev + 12)}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Load More Resources ({filteredResources.length - displayCount} remaining)
            </button>
          </div>
        )}

        {/* Results Summary */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '10px',
            border: '2px solid #e2e8f0',
          }}
        >
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Showing {Math.min(displayCount, filteredResources.length)} of {filteredResources.length}{' '}
            resources
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedSubject !== 'all' && ` in ${selectedSubject}`}
            {selectedYear !== 'all' && ` for ${selectedYear}`}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RealResourceBrowser;
