import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Zap, Users, Heart, Star, TrendingUp, Target } from 'lucide-react';
import './AdvancedWisdomAccelerator.css';

interface WisdomMetric {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  culturalContext: string;
}

interface LearningAccelerator {
  id: string;
  name: string;
  maoriName: string;
  description: string;
  progress: number;
  impact: number;
  culturalAlignment: number;
}

const AdvancedWisdomAccelerator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'overview' | 'cultural' | 'performance'>('overview');
  const [wisdomMetrics, setWisdomMetrics] = useState<WisdomMetric[]>([]);
  const [accelerators, setAccelerators] = useState<LearningAccelerator[]>([]);

  useEffect(() => {
    // Initialize wisdom metrics with cultural context
    const initialMetrics: WisdomMetric[] = [
      {
        id: 'cultural-integration',
        title: 'Cultural Integration (Te Ao Māori)',
        value: 94.2,
        target: 95.0,
        unit: '%',
        trend: 'up',
        culturalContext: 'Alignment with tikanga Māori principles'
      },
      {
        id: 'learning-velocity',
        title: 'Learning Velocity (Ako)',
        value: 87.5,
        target: 90.0,
        unit: '%',
        trend: 'up',
        culturalContext: 'Student engagement and knowledge acquisition'
      },
      {
        id: 'wisdom-synthesis',
        title: 'Wisdom Synthesis (Mātauranga)',
        value: 91.8,
        target: 92.0,
        unit: '%',
        trend: 'up',
        culturalContext: 'Integration of traditional and contemporary knowledge'
      },
      {
        id: 'community-impact',
        title: 'Community Impact (Whakawhanaungatanga)',
        value: 89.3,
        target: 85.0,
        unit: '%',
        trend: 'up',
        culturalContext: 'Building relationships and community connections'
      }
    ];

    const initialAccelerators: LearningAccelerator[] = [
      {
        id: 'te-reo-integration',
        name: 'Te Reo Māori Integration',
        maoriName: 'Te Whakaurunga Reo Māori',
        description: 'Advanced language integration across all educational content',
        progress: 92.5,
        impact: 95.2,
        culturalAlignment: 98.7
      },
      {
        id: 'tikanga-learning',
        name: 'Cultural Protocols Learning',
        maoriName: 'Te Ako Tikanga',
        description: 'Deep understanding of Māori cultural practices and protocols',
        progress: 88.7,
        impact: 91.4,
        culturalAlignment: 96.8
      },
      {
        id: 'whakatohinga-framework',
        name: 'Holistic Assessment Framework',
        maoriName: 'Te Anga Whakatohinga',
        description: 'Comprehensive assessment that honors cultural knowledge systems',
        progress: 85.3,
        impact: 89.6,
        culturalAlignment: 94.2
      },
      {
        id: 'whakapapa-connections',
        name: 'Knowledge Genealogy Mapping',
        maoriName: 'Te Whakapapa Mātauranga',
        description: 'Connecting contemporary learning to ancestral knowledge',
        progress: 79.8,
        impact: 87.1,
        culturalAlignment: 92.5
      }
    ];

    setWisdomMetrics(initialMetrics);
    setAccelerators(initialAccelerators);
  }, []);

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600';
    if (progress >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="advanced-wisdom-accelerator">
      <div className="wisdom-header">
        <div className="header-content">
          <Brain className="header-icon" />
          <div>
            <h1>Advanced Wisdom Accelerator</h1>
            <h2 className="maori-title">Te Whakatere Mātauranga</h2>
            <p>Intelligent learning acceleration with cultural excellence</p>
          </div>
        </div>
        
        <div className="mode-selector">
          <button 
            onClick={() => setActiveMode('overview')}
            className={activeMode === 'overview' ? 'active' : ''}
          >
            <Target size={16} />
            Overview
          </button>
          <button 
            onClick={() => setActiveMode('cultural')}
            className={activeMode === 'cultural' ? 'active' : ''}
          >
            <Heart size={16} />
            Cultural
          </button>
          <button 
            onClick={() => setActiveMode('performance')}
            className={activeMode === 'performance' ? 'active' : ''}
          >
            <TrendingUp size={16} />
            Performance
          </button>
        </div>
      </div>

      {activeMode === 'overview' && (
        <div className="overview-section">
          <div className="wisdom-metrics-grid">
            {wisdomMetrics.map(metric => (
              <div key={metric.id} className="wisdom-metric-card">
                <div className="metric-header">
                  <h3>{metric.title}</h3>
                  <span className={`trend-indicator ${metric.trend}`}>
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
                <div className="metric-value">
                  <span className="value">{metric.value}</span>
                  <span className="unit">{metric.unit}</span>
                </div>
                <div className="metric-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(metric.value / metric.target) * 100}%` }}
                    />
                  </div>
                  <span className="target">Target: {metric.target}{metric.unit}</span>
                </div>
                <div className="cultural-context">
                  <Heart size={14} />
                  <span>{metric.culturalContext}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMode === 'cultural' && (
        <div className="cultural-section">
          <div className="cultural-wisdom-panel">
            <div className="section-header">
              <Heart className="section-icon" />
              <h2>Cultural Wisdom Integration</h2>
              <p className="maori-subtitle">Te Whakaurunga Mātauranga Māori</p>
            </div>
            
            <div className="cultural-metrics">
              <div className="cultural-principle">
                <div className="principle-header">
                  <h3>Whakatōhea (Kinship)</h3>
                  <span className="alignment-score">96.8%</span>
                </div>
                <p>Building connections and relationships within learning communities</p>
                <div className="principle-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '96.8%' }} />
                  </div>
                </div>
              </div>
              
              <div className="cultural-principle">
                <div className="principle-header">
                  <h3>Manaakitanga (Hospitality)</h3>
                  <span className="alignment-score">94.3%</span>
                </div>
                <p>Creating welcoming and inclusive learning environments</p>
                <div className="principle-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '94.3%' }} />
                  </div>
                </div>
              </div>
              
              <div className="cultural-principle">
                <div className="principle-header">
                  <h3>Kaitiakitanga (Guardianship)</h3>
                  <span className="alignment-score">92.7%</span>
                </div>
                <p>Caring for knowledge and ensuring its preservation for future generations</p>
                <div className="principle-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '92.7%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeMode === 'performance' && (
        <div className="performance-section">
          <div className="accelerators-grid">
            {accelerators.map(accelerator => (
              <div key={accelerator.id} className="accelerator-card">
                <div className="accelerator-header">
                  <Zap className="accelerator-icon" />
                  <div>
                    <h3>{accelerator.name}</h3>
                    <h4 className="maori-name">{accelerator.maoriName}</h4>
                  </div>
                </div>
                
                <p className="accelerator-description">{accelerator.description}</p>
                
                <div className="accelerator-metrics">
                  <div className="metric">
                    <span className="metric-label">Progress</span>
                    <span className={`metric-value ${getProgressColor(accelerator.progress)}`}>
                      {accelerator.progress}%
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Impact</span>
                    <span className={`metric-value ${getProgressColor(accelerator.impact)}`}>
                      {accelerator.impact}%
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Cultural Alignment</span>
                    <span className={`metric-value ${getProgressColor(accelerator.culturalAlignment)}`}>
                      {accelerator.culturalAlignment}%
                    </span>
                  </div>
                </div>
                
                <div className="overall-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${accelerator.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="wisdom-insights">
        <div className="insight-card">
          <BookOpen className="insight-icon" />
          <div>
            <h3>Continuous Learning Enhancement</h3>
            <p>AI-powered optimization of educational pathways based on cultural principles and individual needs.</p>
          </div>
        </div>
        
        <div className="insight-card">
          <Users className="insight-icon" />
          <div>
            <h3>Community-Driven Knowledge</h3>
            <p>Fostering collaborative learning environments that honor both traditional wisdom and contemporary innovation.</p>
          </div>
        </div>
        
        <div className="insight-card">
          <Star className="insight-icon" />
          <div>
            <h3>Excellence Through Balance</h3>
            <p>Achieving educational excellence by maintaining harmony between cultural authenticity and academic rigor.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedWisdomAccelerator;