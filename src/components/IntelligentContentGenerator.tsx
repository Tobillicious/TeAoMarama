import React, { useState, useEffect } from 'react';

interface ContentRequest {
  id: string;
  type: 'lesson' | 'assessment' | 'resource' | 'activity';
  subject: string;
  yearLevel: string;
  culturalFocus: string[];
  requirements: string[];
  status: 'pending' | 'generating' | 'completed' | 'failed';
  progress: number;
  generatedContent?: any;
  timestamp: Date;
}

interface AICapability {
  name: string;
  description: string;
  culturalSafety: boolean;
  performance: number;
  specializations: string[];
}

const IntelligentContentGenerator: React.FC = () => {
  const [contentRequests, setContentRequests] = useState<ContentRequest[]>([
    {
      id: 'req-1',
      type: 'lesson',
      subject: 'Mathematics',
      yearLevel: 'Year 7-8',
      culturalFocus: ['Te Ao Māori', 'Pacific Perspectives'],
      requirements: ['NZ Curriculum aligned', 'Cultural integration', 'Interactive activities'],
      status: 'generating',
      progress: 75,
      timestamp: new Date()
    },
    {
      id: 'req-2',
      type: 'assessment',
      subject: 'Science',
      yearLevel: 'Year 9-10',
      culturalFocus: ['Environmental kaitiakitanga', 'Mātauranga Māori'],
      requirements: ['Formative assessment', 'Cultural context', 'Student self-reflection'],
      status: 'pending',
      progress: 0,
      timestamp: new Date()
    }
  ]);

  const [aiCapabilities] = useState<AICapability[]>([
    {
      name: 'Claude Content Architect',
      description: 'Advanced content structure and pedagogical design',
      culturalSafety: true,
      performance: 95,
      specializations: ['Curriculum alignment', 'Pedagogical design', 'Cultural integration']
    },
    {
      name: 'Gemini Resource Curator',
      description: 'Educational resource creation and curation',
      culturalSafety: true,
      performance: 96,
      specializations: ['Resource creation', 'Content curation', 'Visual design']
    },
    {
      name: 'GLM Cultural Validator',
      description: 'Cultural safety validation and Te Reo integration',
      culturalSafety: true,
      performance: 100,
      specializations: ['Cultural validation', 'Te Reo translation', 'Tikanga compliance']
    },
    {
      name: 'DeepSeek Assessment Designer',
      description: 'Intelligent assessment and evaluation design',
      culturalSafety: true,
      performance: 89,
      specializations: ['Assessment design', 'Rubric creation', 'Performance analytics']
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    type: 'lesson' as const,
    subject: '',
    yearLevel: '',
    culturalFocus: [] as string[],
    requirements: [] as string[]
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const culturalFocusOptions = [
    'Te Ao Māori', 'Pacific Perspectives', 'Environmental kaitiakitanga',
    'Mātauranga Māori', 'Cultural storytelling', 'Community connections',
    'Historical perspectives', 'Contemporary issues'
  ];

  const requirementOptions = [
    'NZ Curriculum aligned', 'Cultural integration', 'Interactive activities',
    'Formative assessment', 'Student self-reflection', 'Digital literacy',
    'Inclusive design', 'Accessibility features'
  ];

  const handleGenerateContent = async () => {
    if (!newRequest.subject || !newRequest.yearLevel) return;

    setIsGenerating(true);
    
    const request: ContentRequest = {
      id: `req-${Date.now()}`,
      ...newRequest,
      status: 'generating',
      progress: 0,
      timestamp: new Date()
    };

    setContentRequests(prev => [request, ...prev]);

    // Simulate AI content generation
    const interval = setInterval(() => {
      setContentRequests(prev => prev.map(req => 
        req.id === request.id 
          ? { ...req, progress: Math.min(req.progress + 10, 100) }
          : req
      ));
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setContentRequests(prev => prev.map(req => 
        req.id === request.id 
          ? { 
              ...req, 
              status: 'completed', 
              progress: 100,
              generatedContent: {
                title: `${newRequest.subject} Lesson - ${newRequest.yearLevel}`,
                content: 'AI-generated educational content with cultural integration...',
                culturalElements: newRequest.culturalFocus,
                assessments: 'Formative assessment activities included...'
              }
            }
          : req
      ));
      setIsGenerating(false);
      setNewRequest({
        type: 'lesson',
        subject: '',
        yearLevel: '',
        culturalFocus: [],
        requirements: []
      });
    }, 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#6b7280';
      case 'generating': return '#3b82f6';
      case 'completed': return '#10b981';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      color: 'white',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🎨 Intelligent Content Generator
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#94a3b8' }}>
            AI-Powered Educational Content Creation with Cultural Integration
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Content Generation Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#06b6d4' }}>🎯 Generate New Content</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Content Type */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                  Content Type
                </label>
                <select
                  value={newRequest.type}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, type: e.target.value as any }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  <option value="lesson">Lesson Plan</option>
                  <option value="assessment">Assessment</option>
                  <option value="resource">Educational Resource</option>
                  <option value="activity">Learning Activity</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={newRequest.subject}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="e.g., Mathematics, Science, English"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                />
              </div>

              {/* Year Level */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                  Year Level
                </label>
                <select
                  value={newRequest.yearLevel}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, yearLevel: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white'
                  }}
                >
                  <option value="">Select Year Level</option>
                  <option value="Year 1-3">Year 1-3</option>
                  <option value="Year 4-6">Year 4-6</option>
                  <option value="Year 7-8">Year 7-8</option>
                  <option value="Year 9-10">Year 9-10</option>
                  <option value="Year 11-13">Year 11-13</option>
                </select>
              </div>

              {/* Cultural Focus */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                  Cultural Focus
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {culturalFocusOptions.map((focus) => (
                    <button
                      key={focus}
                      onClick={() => {
                        setNewRequest(prev => ({
                          ...prev,
                          culturalFocus: prev.culturalFocus.includes(focus)
                            ? prev.culturalFocus.filter(f => f !== focus)
                            : [...prev.culturalFocus, focus]
                        }));
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: newRequest.culturalFocus.includes(focus) 
                          ? 'rgba(16, 185, 129, 0.3)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      {focus}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e2e8f0' }}>
                  Requirements
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {requirementOptions.map((requirement) => (
                    <button
                      key={requirement}
                      onClick={() => {
                        setNewRequest(prev => ({
                          ...prev,
                          requirements: prev.requirements.includes(requirement)
                            ? prev.requirements.filter(r => r !== requirement)
                            : [...prev.requirements, requirement]
                        }));
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: newRequest.requirements.includes(requirement) 
                          ? 'rgba(6, 182, 212, 0.3)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      {requirement}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateContent}
                disabled={isGenerating || !newRequest.subject || !newRequest.yearLevel}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  background: isGenerating 
                    ? 'rgba(107, 114, 128, 0.5)' 
                    : 'linear-gradient(45deg, #06b6d4, #8b5cf6)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  opacity: isGenerating ? 0.6 : 1
                }}
              >
                {isGenerating ? '🤖 Generating Content...' : '🎨 Generate AI Content'}
              </button>
            </div>
          </div>

          {/* AI Capabilities */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#06b6d4' }}>🤖 AI Capabilities</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {aiCapabilities.map((capability, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: 'white' }}>{capability.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                        {capability.performance}%
                      </span>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: capability.culturalSafety ? '#10b981' : '#ef4444'
                      }}></div>
                    </div>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {capability.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {capability.specializations.map((spec, specIndex) => (
                      <span key={specIndex} style={{
                        padding: '0.125rem 0.5rem',
                        background: 'rgba(6, 182, 212, 0.2)',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#e2e8f0'
                      }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Requests */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          marginTop: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#06b6d4' }}>📋 Content Generation Queue</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {contentRequests.map((request) => (
              <div key={request.id} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'white' }}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)} - {request.subject}
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                      {request.yearLevel} • {request.culturalFocus.join(', ')}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      background: getStatusColor(request.status),
                      color: 'white'
                    }}>
                      {request.status}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                      {request.progress}%
                    </span>
                  </div>
                </div>
                
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: `${request.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {request.requirements.map((req, index) => (
                    <span key={index} style={{
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(139, 92, 246, 0.2)',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      color: '#e2e8f0'
                    }}>
                      {req}
                    </span>
                  ))}
                </div>

                {request.generatedContent && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <h4 style={{ color: '#06b6d4', marginBottom: '0.5rem' }}>Generated Content:</h4>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ color: '#e2e8f0', margin: 0 }}>
                        ✅ {request.generatedContent.title}
                      </p>
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
                        Cultural elements: {request.generatedContent.culturalElements.join(', ')}
                      </p>
                    </div>
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

export default IntelligentContentGenerator;
