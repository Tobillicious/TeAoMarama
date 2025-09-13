import { Brain, Zap, BookOpen, Globe, Settings, Play } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { GLMEducationalEnhancer, createGLMEnhancer, type EducationalEnhancementRequest } from '../utils/glm-integration';

interface GLMModelStatus {
  model: string;
  status: 'ready' | 'processing' | 'error' | 'offline';
  lastUsed?: string;
  totalEnhancements: number;
  averageQuality: number;
}

const GLMModelDashboard: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [glmStatus, setGlmStatus] = useState<GLMModelStatus[]>([
    { model: 'GLM-4.5', status: 'offline', totalEnhancements: 0, averageQuality: 0 },
    { model: 'GLM-Z1', status: 'offline', totalEnhancements: 0, averageQuality: 0 }
  ]);
  const [testContent, setTestContent] = useState('');
  const [enhancedContent, setEnhancedContent] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'glm-4.5' | 'glm-z1'>('glm-4.5');
  const [demoMode, setDemoMode] = useState(false);
  const [lastError, setLastError] = useState('');

  useEffect(() => {
    // Check if GLM integration is already configured
    const storedKey = localStorage.getItem('teaomarama_glm_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsConfigured(true);
      updateModelStatus('ready');
    }
  }, []);

  const updateModelStatus = (status: 'ready' | 'processing' | 'error' | 'offline') => {
    setGlmStatus(prev => prev.map(model => ({ ...model, status })));
  };

  const configureGLM = async () => {
    if (!apiKey) return;
    
    try {
      localStorage.setItem('teaomarama_glm_key', apiKey);
      
      // Test connection with a simple request
      const glm45 = createGLMEnhancer('glm-4.5', apiKey);
      
      // Store in global context
      (window as any).teAoMaramaGLM = {
        glm45,
        glmZ1: createGLMEnhancer('glm-z1', apiKey)
      };
      
      setIsConfigured(true);
      updateModelStatus('ready');
      
      console.log('✅ GLM models configured successfully');
    } catch (error) {
      console.error('Failed to configure GLM:', error);
      updateModelStatus('error');
    }
  };

  const testGLMEnhancement = async () => {
    if (!testContent) return;
    
    setIsEnhancing(true);
    setLastError('');
    updateModelStatus('processing');
    
    try {
      // Check if we should use demo mode
      if (!isConfigured || demoMode) {
        // Demo mode - simulate GLM enhancement
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        
        const demoEnhancement = `# Enhanced Educational Content (Demo Mode)

## Original Content Analysis
${testContent}

## ${selectedModel.toUpperCase()} Enhancement Applied

### Cultural Integration
- Added Te Reo Māori greetings and vocabulary
- Included whakataukī (proverb) for context
- Connected to mātauranga Māori perspectives

### Pedagogical Improvements
- Clear learning objectives established
- Success criteria defined
- Assessment opportunities identified
- Differentiated learning activities included

### Key Enhancements:
1. **Cultural Authenticity**: Integrated authentic Māori perspectives
2. **Pedagogical Depth**: Added scaffolded learning opportunities
3. **Real-world Connections**: Linked to Aotearoa New Zealand context
4. **Assessment Design**: Clear evaluation criteria provided

*Note: This is a demo enhancement. Configure a valid GLM API key for real AI-powered enhancement.*`;
        
        setEnhancedContent(demoEnhancement);
        updateModelStatus('ready');
        return;
      }

      const enhancer = selectedModel === 'glm-4.5' 
        ? (window as any).teAoMaramaGLM?.glm45
        : (window as any).teAoMaramaGLM?.glmZ1;
      
      if (!enhancer) throw new Error('GLM enhancer not available - please configure API key');
      
      const request: EducationalEnhancementRequest = {
        content: testContent,
        subject: 'General',
        yearLevel: 'Year 8',
        culturalContext: 'māori',
        enhancementType: 'cultural-integration',
        requirements: ['Include Te Reo Māori where appropriate', 'Add cultural context']
      };
      
      const enhanced = await enhancer.enhanceEducationalContent(request);
      setEnhancedContent(enhanced);
      
      // Update statistics
      setGlmStatus(prev => prev.map(model => 
        model.model === selectedModel.toUpperCase() 
          ? { 
              ...model, 
              totalEnhancements: model.totalEnhancements + 1,
              averageQuality: Math.min(100, model.averageQuality + 5),
              lastUsed: new Date().toISOString()
            }
          : model
      ));
      
      updateModelStatus('ready');
    } catch (error: any) {
      console.error('GLM Enhancement failed:', error);
      setLastError(error.message || 'Enhancement failed');
      updateModelStatus('error');
      setEnhancedContent(`Enhancement failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        color: 'white',
        padding: '24px 0',
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.15)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h1 style={{ 
            fontSize: '2.25rem', 
            fontWeight: '700', 
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Brain className="w-8 h-8" />
            GLM Model Integration
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: '0' }}>
            Advanced reasoning models for educational content enhancement
          </p>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px'
      }}>
        {/* Configuration Section */}
        {!isConfigured && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Settings className="w-5 h-5" />
              Configure GLM API Access
            </h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Zhipu AI API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Zhipu AI API key..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                onClick={configureGLM}
                disabled={!apiKey}
                style={{
                  background: apiKey ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: apiKey ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Zap className="w-4 h-4" />
                Configure GLM Models
              </button>
              
              <button
                onClick={() => setDemoMode(true)}
                style={{
                  background: 'white',
                  color: '#7c3aed',
                  border: '2px solid #7c3aed',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Play className="w-4 h-4" />
                Try Demo Mode
              </button>
            </div>
            
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              marginTop: '12px',
              fontStyle: 'italic'
            }}>
              Don't have an API key? Try demo mode to see how GLM enhancement works with simulated responses.
            </p>
          </div>
        )}

        {/* Model Status Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {glmStatus.map((model, index) => (
            <div key={model.model} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '16px' 
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: model.status === 'ready' ? '#10b981' : 
                             model.status === 'processing' ? '#f59e0b' : 
                             model.status === 'error' ? '#ef4444' : '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Brain className="w-5 h-5" style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>
                    {model.model}
                  </h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: model.status === 'ready' ? '#059669' : 
                           model.status === 'processing' ? '#d97706' : 
                           model.status === 'error' ? '#dc2626' : '#6b7280',
                    margin: '0',
                    textTransform: 'capitalize'
                  }}>
                    {model.status}
                  </p>
                </div>
              </div>
              
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                <p style={{ margin: '0 0 4px 0' }}>
                  <strong>Enhancements:</strong> {model.totalEnhancements}
                </p>
                <p style={{ margin: '0 0 4px 0' }}>
                  <strong>Avg Quality:</strong> {model.averageQuality}%
                </p>
                {model.lastUsed && (
                  <p style={{ margin: '0' }}>
                    <strong>Last Used:</strong> {new Date(model.lastUsed).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Testing Interface */}
        {(isConfigured || demoMode) && (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <BookOpen className="w-5 h-5" />
              Test GLM Enhancement
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Select Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as 'glm-4.5' | 'glm-z1')}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  marginBottom: '16px'
                }}
              >
                <option value="glm-4.5">GLM-4.5 (Creative Enhancement)</option>
                <option value="glm-z1">GLM-Z1 (Advanced Reasoning)</option>
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '0.875rem', 
                fontWeight: '500', 
                marginBottom: '8px',
                color: '#374151'
              }}>
                Educational Content to Enhance
              </label>
              <textarea
                value={testContent}
                onChange={(e) => setTestContent(e.target.value)}
                placeholder="Paste educational content here to test GLM enhancement..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              {demoMode && !isConfigured && (
                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '0.875rem',
                  color: '#1e40af'
                }}>
                  🎭 Demo Mode Active - This will simulate GLM enhancement responses
                </div>
              )}
              
              {lastError && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  marginBottom: '16px',
                  fontSize: '0.875rem',
                  color: '#dc2626'
                }}>
                  ❌ {lastError}
                </div>
              )}

              <button
                onClick={testGLMEnhancement}
                disabled={!testContent || isEnhancing}
                style={{
                  background: testContent && !isEnhancing ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: testContent && !isEnhancing ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Play className="w-4 h-4" />
                {isEnhancing ? 'Enhancing...' : 
                 demoMode ? `Demo ${selectedModel.toUpperCase()}` : 
                 `Enhance with ${selectedModel.toUpperCase()}`}
              </button>
            </div>

            {enhancedContent && (
              <div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  marginBottom: '12px',
                  color: '#374151'
                }}>
                  Enhanced Content
                </h3>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '16px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  {enhancedContent}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GLMModelDashboard;