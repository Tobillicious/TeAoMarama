import React, { useContext, useState } from 'react';
import { EducationContext } from '../contexts/EducationContext';

const RealAssessmentBrowser: React.FC = () => {
  const { resources, loading } = useContext(EducationContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Filter for assessment resources
  const assessmentResources = resources.filter(
    (resource) =>
      resource.type === 'assessment' ||
      resource.title.toLowerCase().includes('assessment') ||
      resource.tags.some((tag) => tag.toLowerCase().includes('assessment')),
  );

  const filteredAssessments = assessmentResources.filter((assessment) => {
    const matchesSearch =
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = selectedSubject === 'all' || assessment.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || assessment.yearLevel === selectedYear;
    const matchesType = selectedType === 'all' || assessment.type === selectedType;

    return matchesSearch && matchesSubject && matchesYear && matchesType;
  });

  const subjects = [...new Set(assessmentResources.map((r) => r.subject))];
  const years = [...new Set(assessmentResources.map((r) => r.yearLevel))];
  const types = [...new Set(assessmentResources.map((r) => r.type))];

  const getAssessmentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'formative':
        return '📝';
      case 'summative':
        return '📊';
      case 'diagnostic':
        return '🔍';
      case 'peer':
        return '👥';
      case 'self':
        return '🤔';
      default:
        return '📋';
    }
  };

  const getAssessmentColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'formative':
        return '#3b82f6';
      case 'summative':
        return '#ef4444';
      case 'diagnostic':
        return '#8b5cf6';
      case 'peer':
        return '#10b981';
      case 'self':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

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
            📊 Assessment Tools Library
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '10px' }}>
            {loading
              ? 'Loading assessments...'
              : `${assessmentResources.length}+ Real Assessment Tools`}
          </p>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            NCEA-aligned assessments with cultural integration and rubrics
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
              placeholder="Search assessments..."
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
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '120px',
              }}
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assessment Type Overview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📝</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Formative</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {
                assessmentResources.filter(
                  (a) => a.type === 'formative' || a.title.toLowerCase().includes('formative'),
                ).length
              }{' '}
              assessments
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Summative</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {
                assessmentResources.filter(
                  (a) => a.type === 'summative' || a.title.toLowerCase().includes('summative'),
                ).length
              }{' '}
              assessments
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔍</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Diagnostic</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {
                assessmentResources.filter(
                  (a) => a.type === 'diagnostic' || a.title.toLowerCase().includes('diagnostic'),
                ).length
              }{' '}
              assessments
            </p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '25px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Peer Assessment</h3>
            <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
              {
                assessmentResources.filter(
                  (a) => a.type === 'peer' || a.title.toLowerCase().includes('peer'),
                ).length
              }{' '}
              assessments
            </p>
          </div>
        </div>

        {/* Assessments Grid */}
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
              <p>Loading assessment tools...</p>
            </div>
          ) : filteredAssessments.length > 0 ? (
            filteredAssessments.map((assessment) => (
              <div
                key={assessment.id}
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
                    {getAssessmentIcon(assessment.type)}
                  </span>
                  <div>
                    <div
                      style={{
                        background: getAssessmentColor(assessment.type),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                      }}
                    >
                      {assessment.type}
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
                      {assessment.yearLevel}
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
                  {assessment.title}
                </h3>

                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '0.95rem',
                    lineHeight: '1.4',
                    marginBottom: '15px',
                  }}
                >
                  {assessment.description}
                </p>

                {/* Cultural Elements */}
                {assessment.culturalElements && assessment.culturalElements.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    {assessment.culturalElements.slice(0, 2).map((element, index) => (
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
                      ⭐ {assessment.rating || '4.8'}
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
                      📥 {assessment.downloads || '0'}
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
                    Use Assessment
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
              <p>No assessments found matching your criteria.</p>
              <p style={{ fontSize: '1rem', marginTop: '10px' }}>
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>

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
            Showing {filteredAssessments.length} of {assessmentResources.length} assessment tools
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

export default RealAssessmentBrowser;
