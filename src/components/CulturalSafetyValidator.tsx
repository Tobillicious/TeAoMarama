import React, { useState, useEffect } from 'react';

interface CulturalElement {
  id: string;
  name: string;
  description: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  status: 'compliant' | 'needs-review' | 'non-compliant';
  tikanga: string[];
  teReo: string[];
}

interface ValidationResult {
  overallScore: number;
  criticalIssues: number;
  recommendations: string[];
  culturalElements: CulturalElement[];
}

const CulturalSafetyValidator: React.FC = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string>('');

  const culturalElements: CulturalElement[] = [
    {
      id: '1',
      name: 'Te Reo Māori Integration',
      description: 'Proper use and integration of Te Reo Māori language',
      importance: 'critical',
      status: 'compliant',
      tikanga: ['mana', 'tapu', 'noa'],
      teReo: ['māori', 'pākehā', 'tangata whenua']
    },
    {
      id: '2',
      name: 'Cultural Context',
      description: 'Appropriate cultural context and understanding',
      importance: 'high',
      status: 'compliant',
      tikanga: ['whakapapa', 'manaakitanga', 'kotahitanga'],
      teReo: ['whānau', 'hapu', 'iwi']
    },
    {
      id: '3',
      name: 'Historical Accuracy',
      description: 'Accurate representation of Māori history and culture',
      importance: 'critical',
      status: 'needs-review',
      tikanga: ['tikanga', 'kawa', 'marae'],
      teReo: ['tūrangawaewae', 'whenua', 'moana']
    },
    {
      id: '4',
      name: 'Respectful Imagery',
      description: 'Use of respectful and culturally appropriate imagery',
      importance: 'high',
      status: 'compliant',
      tikanga: ['mana', 'tapu', 'respect'],
      teReo: ['mana', 'tapu', 'manaakitanga']
    },
    {
      id: '5',
      name: 'Community Consultation',
      description: 'Evidence of community consultation and approval',
      importance: 'medium',
      status: 'needs-review',
      tikanga: ['manaakitanga', 'kotahitanga', 'whanaungatanga'],
      teReo: ['hapū', 'iwi', 'kaumātua']
    }
  ];

  const validateResource = async () => {
    setIsValidating(true);
    
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const criticalIssues = culturalElements.filter(el => 
      el.importance === 'critical' && el.status !== 'compliant'
    ).length;
    
    const overallScore = Math.round(
      (culturalElements.filter(el => el.status === 'compliant').length / culturalElements.length) * 100
    );
    
    const recommendations = [
      'Review historical content for accuracy',
      'Consult with local iwi for cultural guidance',
      'Ensure proper Te Reo Māori pronunciation guides',
      'Add more cultural context to activities'
    ];
    
    setValidationResult({
      overallScore,
      criticalIssues,
      recommendations,
      culturalElements
    });
    
    setIsValidating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#10b981';
      case 'needs-review': return '#f59e0b';
      case 'non-compliant': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0' }}>
                🌿 Cultural Safety Validator
              </h1>
              <p style={{ color: '#d1fae5', fontSize: '1.1rem', margin: 0 }}>
                Ensuring cultural authenticity and safety in educational resources
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <select
                value={selectedResource}
                onChange={(e) => setSelectedResource(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '10px 15px',
                  borderRadius: '10px',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select Resource...</option>
                <option value="lesson-1">Te Reo Māori Basics</option>
                <option value="lesson-2">Māori History & Culture</option>
                <option value="lesson-3">Traditional Arts & Crafts</option>
              </select>
              <button
                onClick={validateResource}
                disabled={!selectedResource || isValidating}
                style={{
                  background: isValidating ? '#6b7280' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  cursor: isValidating ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {isValidating ? '🔄 Validating...' : '🔍 Validate Resource'}
              </button>
            </div>
          </div>
        </div>

        {validationResult && (
          <>
            {/* Overall Score */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 20px 0', color: '#d1fae5' }}>Cultural Safety Score</h2>
              <div style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: validationResult.overallScore >= 80 ? '#10b981' : 
                       validationResult.overallScore >= 60 ? '#f59e0b' : '#ef4444',
                marginBottom: '10px'
              }}>
                {validationResult.overallScore}%
              </div>
              <p style={{ color: '#94a3b8', margin: 0 }}>
                {validationResult.criticalIssues > 0 ? 
                  `${validationResult.criticalIssues} critical issues found` : 
                  'No critical issues found'
                }
              </p>
            </div>

            {/* Cultural Elements */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              {validationResult.culturalElements.map((element) => (
                <div key={element.id} style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  padding: '25px',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#d1fae5' }}>{element.name}</h3>
                      <p style={{ color: '#94a3b8', margin: '0 0 10px 0', fontSize: '0.9rem' }}>
                        {element.description}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                      <span style={{
                        background: getStatusColor(element.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {element.status.replace('-', ' ')}
                      </span>
                      <span style={{
                        background: getImportanceColor(element.importance),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                      }}>
                        {element.importance}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ margin: '0 0 8px 0', color: '#d1fae5', fontSize: '0.9rem' }}>Tikanga Elements:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {element.tikanga.map((tikanga, index) => (
                        <span key={index} style={{
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#10b981',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {tikanga}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#d1fae5', fontSize: '0.9rem' }}>Te Reo Elements:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {element.teReo.map((reo, index) => (
                        <span key={index} style={{
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>
                          {reo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '15px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#d1fae5' }}>📋 Recommendations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {validationResult.recommendations.map((recommendation, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '15px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                    <span style={{ color: '#e2e8f0' }}>{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Instructions */}
        {!validationResult && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#d1fae5' }}>🌿 Cultural Safety Validation</h3>
            <p style={{ color: '#94a3b8', margin: '0 0 20px 0', fontSize: '1.1rem' }}>
              Select a resource above to begin cultural safety validation. Our system will check for:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
              {[
                'Te Reo Māori Integration',
                'Cultural Context Accuracy',
                'Historical Authenticity',
                'Respectful Imagery',
                'Community Consultation',
                'Tikanga Compliance'
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <span style={{ color: '#10b981', fontSize: '1.5rem' }}>🌿</span>
                  <p style={{ color: '#e2e8f0', margin: '10px 0 0 0', fontSize: '0.9rem' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalSafetyValidator;
