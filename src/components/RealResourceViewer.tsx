import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, Target, Globe, Star } from 'lucide-react';
import { type NZCResource } from '../data/nz-curriculum-year8';

interface RealResourceViewerProps {
  resource: any;
  onBack: () => void;
}

const RealResourceViewer: React.FC<RealResourceViewerProps> = ({ resource, onBack }) => {
  // Check if this is one of our real NZ Curriculum resources
  const isRealNZCResource = resource.content && typeof resource.content === 'object' && resource.content.overview;
  const nzcContent = isRealNZCResource ? resource.content as NZCResource['content'] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        color: 'white',
        padding: '24px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <button
                onClick={onBack}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <ArrowLeft size={16} /> Back to Resources
              </button>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 8px 0' }}>
                {resource.title}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.9 }}>
                <span>{resource.subject} • {resource.yearLevel}</span>
                <span>⭐ {resource.culturalElements} cultural elements</span>
                <span><Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />{resource.duration}</span>
                <span style={{ 
                  background: 'rgba(16, 185, 129, 0.2)', 
                  color: '#10b981', 
                  padding: '4px 8px', 
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  🎯 95% Quality
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          
          {nzcContent ? (
            // Show real NZ Curriculum content
            <div>
              {/* Overview */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                  📋 Unit Overview
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#4b5563' }}>
                  {nzcContent.overview}
                </p>
              </section>

              {/* Learning Objectives */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                  🎯 Learning Objectives
                </h2>
                <ul style={{ paddingLeft: '20px', fontSize: '1rem', lineHeight: '1.6' }}>
                  {(resource as any).objectives?.map((objective: string, index: number) => (
                    <li key={index} style={{ marginBottom: '8px' }}>{objective}</li>
                  ))}
                </ul>
              </section>

              {/* Activities */}
              {nzcContent.activities && nzcContent.activities.length > 0 && (
                <section style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    🛠️ Learning Activities
                  </h2>
                  {nzcContent.activities.map((activity, index) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '24px',
                      marginBottom: '20px'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
                        Activity {index + 1}: {activity.title}
                      </h3>
                      <p style={{ marginBottom: '12px', color: '#4b5563' }}>
                        <Clock size={16} style={{ display: 'inline', marginRight: '4px' }} />
                        Duration: {activity.duration}
                      </p>
                      <p style={{ marginBottom: '16px', fontSize: '1rem', lineHeight: '1.6' }}>
                        {activity.description}
                      </p>
                      
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Materials Needed:</h4>
                      <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.9rem' }}>
                        {activity.materials.map((material, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{material}</li>
                        ))}
                      </ul>

                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Instructions:</h4>
                      <ol style={{ paddingLeft: '20px', fontSize: '0.9rem' }}>
                        {activity.instructions.map((instruction, idx) => (
                          <li key={idx} style={{ marginBottom: '6px' }}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </section>
              )}

              {/* Assessments */}
              {nzcContent.assessments && nzcContent.assessments.length > 0 && (
                <section style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    📊 Assessment Tools
                  </h2>
                  {nzcContent.assessments.map((assessment, index) => (
                    <div key={index} style={{
                      background: '#fff7ed',
                      border: '1px solid #fed7aa',
                      borderRadius: '8px',
                      padding: '24px',
                      marginBottom: '20px'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px', color: '#c2410c' }}>
                        {assessment.title}
                      </h3>
                      <p style={{ marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>
                        Type: <span style={{ textTransform: 'capitalize' }}>{assessment.type}</span>
                      </p>
                      <p style={{ marginBottom: '16px', fontSize: '1rem', lineHeight: '1.6' }}>
                        {assessment.description}
                      </p>
                      
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Assessment Criteria:</h4>
                      <ul style={{ paddingLeft: '20px', fontSize: '0.9rem' }}>
                        {assessment.criteria.map((criterion, idx) => (
                          <li key={idx} style={{ marginBottom: '4px' }}>{criterion}</li>
                        ))}
                      </ul>

                      {assessment.rubric && (
                        <div style={{ marginTop: '16px' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>Achievement Levels:</h4>
                          {assessment.rubric.map((level, idx) => (
                            <div key={idx} style={{ marginBottom: '12px', padding: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '4px' }}>
                              <h5 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#92400e' }}>{level.level}</h5>
                              <p style={{ fontSize: '0.8rem', marginBottom: '4px' }}>{level.description}</p>
                              <ul style={{ paddingLeft: '16px', fontSize: '0.75rem' }}>
                                {level.indicators.map((indicator, i) => (
                                  <li key={i} style={{ marginBottom: '2px' }}>{indicator}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* External Resources */}
              {nzcContent.resources && nzcContent.resources.length > 0 && (
                <section style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    🔗 External Resources & Sources
                  </h2>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {nzcContent.resources.map((resource, index) => (
                      <div key={index} style={{
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '6px',
                        padding: '16px'
                      }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px', color: '#0c4a6e' }}>
                          <Globe size={16} style={{ display: 'inline', marginRight: '6px' }} />
                          {resource.title}
                        </h4>
                        <p style={{ fontSize: '0.875rem', marginBottom: '8px', color: '#4b5563' }}>
                          {resource.description}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            Source: {resource.source}
                          </span>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                              color: '#2563eb',
                              fontSize: '0.875rem',
                              textDecoration: 'none',
                              fontWeight: '500'
                            }}
                          >
                            Visit Resource →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Cultural Connections */}
              {nzcContent.culturalConnections && nzcContent.culturalConnections.length > 0 && (
                <section style={{ marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px', color: '#1f2937' }}>
                    🌿 Cultural Connections (Te Ao Māori)
                  </h2>
                  {nzcContent.culturalConnections.map((connection, index) => (
                    <div key={index} style={{
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      borderRadius: '8px',
                      padding: '20px',
                      marginBottom: '16px'
                    }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '8px', color: '#15803d' }}>
                        {connection.title}
                      </h3>
                      <p style={{ marginBottom: '12px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        {connection.description}
                      </p>
                      <div style={{ marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>Tikanga Aspect:</h4>
                        <p style={{ fontSize: '0.85rem' }}>{connection.tikangaAspect}</p>
                      </div>
                      <div style={{ marginBottom: '12px' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>Te Reo Vocabulary:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {connection.teReoVocabulary.map((term, idx) => (
                            <span key={idx} style={{
                              background: '#dcfce7',
                              color: '#166534',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: '500'
                            }}>
                              {term}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              )}

            </div>
          ) : (
            // Fallback for non-NZC resources
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
                {resource.title}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '24px' }}>
                {resource.description}
              </p>
              <div style={{
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  This resource is part of the existing collection. For full detailed content with lesson plans, 
                  assessments, and activities, look for resources marked with 🎯 95% Quality scores.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default RealResourceViewer;