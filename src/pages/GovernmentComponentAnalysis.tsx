import { useState } from 'react';
import './TeKeteHandout.css';

// TypeScript interfaces for government analysis
interface GovernmentSystem {
  id: string;
  name: string;
  location: string;
  timePeriod: string;
  type: 'preferred' | 'contrasting';
  components: GovernmentComponents;
  strengths: string[];
  challenges: string[];
  uniqueFeatures: string[];
}

interface GovernmentComponents {
  authorityStructure: string;
  decisionMaking: string;
  representation: string;
  accountability: string;
  conflictResolution: string;
  powerDistribution: string;
}

interface AnalysisData {
  system1: Partial<GovernmentSystem>;
  system2: Partial<GovernmentSystem>;
  comparison: {
    majorDifferences: string;
    sharedStrengths: string;
    commonProblems: string;
    preferredSystem: string;
  };
  culturalInsights: {
    culturalInfluence: string;
    indigenousLearnings: string;
    maoriPrinciples: string;
  };
  societyApplication: {
    authorityStructure: string;
    decisionProcess: string;
    representationAccountability: string;
    uniqueFeatures: string;
  };
  unifiedPurposeReflection: string;
}

const governmentComponents = [
  {
    id: 'authority',
    icon: '👑',
    name: 'Authority Structure',
    description: 'Who has power and how is it gained/maintained? (Single leader, council, democratic election, inheritance, etc.)'
  },
  {
    id: 'decision-making',
    icon: '🗳️',
    name: 'Decision-Making Process',
    description: 'How are important choices made? (Consensus, majority vote, expert panels, leader decree, etc.)'
  },
  {
    id: 'representation',
    icon: '🎤',
    name: 'Representation System',
    description: 'How are different groups\' voices included? (Direct democracy, representatives, councils, etc.)'
  },
  {
    id: 'accountability',
    icon: '⚖️',
    name: 'Accountability Mechanisms',
    description: 'How are leaders held responsible? (Elections, impeachment, community oversight, traditional protocols, etc.)'
  },
  {
    id: 'conflict-resolution',
    icon: '🤝',
    name: 'Conflict Resolution',
    description: 'How are disputes and disagreements handled? (Courts, mediation, traditional justice, restorative practices, etc.)'
  },
  {
    id: 'power-distribution',
    icon: '🌐',
    name: 'Power Distribution',
    description: 'How is authority spread across different levels/groups? (Federal, unitary, confederate, tribal councils, etc.)'
  }
];

export default function GovernmentComponentAnalysis() {
  const [currentPage, setCurrentPage] = useState(1);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    system1: { type: 'preferred', components: {} as GovernmentComponents },
    system2: { type: 'contrasting', components: {} as GovernmentComponents },
    comparison: {
      majorDifferences: '',
      sharedStrengths: '',
      commonProblems: '',
      preferredSystem: ''
    },
    culturalInsights: {
      culturalInfluence: '',
      indigenousLearnings: '',
      maoriPrinciples: ''
    },
    societyApplication: {
      authorityStructure: '',
      decisionProcess: '',
      representationAccountability: '',
      uniqueFeatures: ''
    },
    unifiedPurposeReflection: ''
  });
  const [studentInfo, setStudentInfo] = useState({
    groupNames: '',
    date: new Date().toLocaleDateString('en-NZ'),
    period: ''
  });

  const updateSystemData = (systemKey: 'system1' | 'system2', field: string, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      [systemKey]: {
        ...prev[systemKey],
        [field]: value
      }
    }));
  };

  const updateSystemComponent = (systemKey: 'system1' | 'system2', component: string, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      [systemKey]: {
        ...prev[systemKey],
        components: {
          ...prev[systemKey].components,
          [component]: value
        }
      }
    }));
  };

  const updateComparison = (field: string, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      comparison: {
        ...prev.comparison,
        [field]: value
      }
    }));
  };

  const updateCulturalInsights = (field: string, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      culturalInsights: {
        ...prev.culturalInsights,
        [field]: value
      }
    }));
  };

  const updateSocietyApplication = (field: string, value: string) => {
    setAnalysisData(prev => ({
      ...prev,
      societyApplication: {
        ...prev.societyApplication,
        [field]: value
      }
    }));
  };

  const renderPageNavigation = () => (
    <div className="page-navigation">
      {[1, 2, 3, 4].map(pageNum => (
        <button
          key={pageNum}
          className={`page-nav-btn ${currentPage === pageNum ? 'active' : ''}`}
          onClick={() => setCurrentPage(pageNum)}
        >
          Page {pageNum}
        </button>
      ))}
    </div>
  );

  const renderPage1 = () => (
    <div className="worksheet-page">
      <div className="worksheet-header">
        <h1>🏛️ Government Component Analysis Worksheet</h1>
        <div className="student-info-grid">
          <div className="info-field">
            <label>Group Names:</label>
            <input
              type="text"
              value={studentInfo.groupNames}
              onChange={(e) => setStudentInfo(prev => ({...prev, groupNames: e.target.value}))}
              placeholder="Enter group member names"
            />
          </div>
          <div className="info-field">
            <label>Date:</label>
            <input
              type="text"
              value={studentInfo.date}
              onChange={(e) => setStudentInfo(prev => ({...prev, date: e.target.value}))}
            />
          </div>
          <div className="info-field">
            <label>Period:</label>
            <input
              type="text"
              value={studentInfo.period}
              onChange={(e) => setStudentInfo(prev => ({...prev, period: e.target.value}))}
              placeholder="Class period"
            />
          </div>
        </div>
      </div>

      <div className="cultural-element">
        <h3>Whakataukī | Proverb</h3>
        <p><em>"Kia kotahi te hoe, kia ū ki te rau"</em></p>
        <p>Paddle as one, hold fast to the purpose.</p>
      </div>

      <div className="instruction-box">
        <h3>🎯 Analysis Purpose</h3>
        <p>
          Understanding how different governance systems work helps you design thoughtful, effective 
          government structures for your society. This worksheet guides you through analyzing two 
          contrasting systems to identify their strengths, challenges, and key components.
        </p>
        
        <h4>Your Task:</h4>
        <ol>
          <li>Choose two governance systems from your research that interest your group</li>
          <li>Analyze how each system handles the six core government components</li>
          <li>Compare their approaches and identify what might work for your society</li>
          <li>Use this analysis to inform your society's government design</li>
        </ol>
      </div>

      <div className="analysis-section">
        <div className="section-title">🔍 Government System Components Framework</div>
        
        <div className="component-grid">
          {governmentComponents.map(component => (
            <div key={component.id} className="component-box">
              <div className="component-header">
                {component.icon} {component.name}
              </div>
              <p>{component.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="analysis-section">
        <div className="section-title">📝 System Selection</div>
        
        <div className="system-selection">
          <h4>System 1 (That interests you for your society design):</h4>
          <div className="selection-fields">
            <input
              type="text"
              placeholder="System Name"
              value={analysisData.system1.name || ''}
              onChange={(e) => updateSystemData('system1', 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Where/When"
              value={analysisData.system1.location || ''}
              onChange={(e) => updateSystemData('system1', 'location', e.target.value)}
            />
            <textarea
              placeholder="Why this system interests your group:"
              value={analysisData.system1.uniqueFeatures?.[0] || ''}
              onChange={(e) => updateSystemData('system1', 'uniqueFeatures', [e.target.value])}
              rows={3}
            />
          </div>
        </div>

        <div className="system-selection">
          <h4>System 2 (That contrasts with your preferred approach):</h4>
          <div className="selection-fields">
            <input
              type="text"
              placeholder="System Name"
              value={analysisData.system2.name || ''}
              onChange={(e) => updateSystemData('system2', 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Where/When"
              value={analysisData.system2.location || ''}
              onChange={(e) => updateSystemData('system2', 'location', e.target.value)}
            />
            <textarea
              placeholder="How this system differs from System 1:"
              value={analysisData.system2.uniqueFeatures?.[0] || ''}
              onChange={(e) => updateSystemData('system2', 'uniqueFeatures', [e.target.value])}
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemAnalysisPage = (systemKey: 'system1' | 'system2', pageNumber: number) => {
    const system = analysisData[systemKey];
    const systemTitle = systemKey === 'system1' ? 'Your Preferred System' : 'Contrasting System';
    
    return (
      <div className="worksheet-page">
        <div className="worksheet-header">
          <h2>🏛️ Government Component Analysis - Page {pageNumber}</h2>
          <p><strong>Group Names:</strong> {studentInfo.groupNames || '__________________________'}</p>
        </div>

        <div className="system-analysis">
          <div className="system-title">
            {systemKey === 'system1' ? 'System 1' : 'System 2'}: {system.name || '_______________________'} ({systemTitle})
          </div>
          
          <div className="analysis-table">
            {governmentComponents.map(component => (
              <div key={component.id} className="component-analysis-row">
                <div className="component-label">
                  <strong>{component.icon} {component.name}</strong>
                </div>
                <textarea
                  className="component-response"
                  placeholder={`How does this system handle ${component.name.toLowerCase()}?`}
                  value={system.components?.[component.id as keyof GovernmentComponents] || ''}
                  onChange={(e) => updateSystemComponent(systemKey, component.id, e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </div>
          
          <div className="system-evaluation">
            <div className="evaluation-question">
              <label><strong>What are the main benefits/strengths of this system?</strong></label>
              <textarea
                className="large-response-box"
                value={system.strengths?.join('\n') || ''}
                onChange={(e) => updateSystemData(systemKey, 'strengths', e.target.value.split('\n'))}
                rows={4}
              />
            </div>
            
            <div className="evaluation-question">
              <label><strong>What are the main challenges/weaknesses of this system?</strong></label>
              <textarea
                className="large-response-box"
                value={system.challenges?.join('\n') || ''}
                onChange={(e) => updateSystemData(systemKey, 'challenges', e.target.value.split('\n'))}
                rows={4}
              />
            </div>
            
            <div className="evaluation-question">
              <label><strong>What makes this system unique or distinctive?</strong></label>
              <textarea
                className="response-box"
                value={system.uniqueFeatures?.slice(1).join('\n') || ''}
                onChange={(e) => updateSystemData(systemKey, 'uniqueFeatures', [system.uniqueFeatures?.[0] || '', ...e.target.value.split('\n')])}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPage4 = () => (
    <div className="worksheet-page">
      <div className="worksheet-header">
        <h2>🏛️ Government Component Analysis - Page 4</h2>
        <p><strong>Group Names:</strong> {studentInfo.groupNames || '__________________________'}</p>
      </div>

      <div className="analysis-section">
        <div className="section-title">⚖️ System Comparison</div>
        
        <div className="comparison-questions">
          <div className="question-section">
            <label><strong>What are the biggest differences between these two systems?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.comparison.majorDifferences}
              onChange={(e) => updateComparison('majorDifferences', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>What do both systems do well that you might want to include in your society?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.comparison.sharedStrengths}
              onChange={(e) => updateComparison('sharedStrengths', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>What problems do both systems face? How might your society avoid these issues?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.comparison.commonProblems}
              onChange={(e) => updateComparison('commonProblems', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>Which system better matches your group's values and society goals? Why?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.comparison.preferredSystem}
              onChange={(e) => updateComparison('preferredSystem', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="analysis-section">
        <div className="section-title">🌺 Cultural Context & Indigenous Perspectives</div>
        
        <div className="cultural-questions">
          <div className="question-section">
            <label><strong>How do cultural values and traditions influence each system's design?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.culturalInsights.culturalInfluence}
              onChange={(e) => updateCulturalInsights('culturalInfluence', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>If you studied any Indigenous governance systems, what did you learn about different approaches to authority and decision-making?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.culturalInsights.indigenousLearnings}
              onChange={(e) => updateCulturalInsights('indigenousLearnings', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>How might traditional Māori governance principles (like rangatiratanga) inform your society design?</strong></label>
            <textarea
              className="large-response-box"
              value={analysisData.culturalInsights.maoriPrinciples}
              onChange={(e) => updateCulturalInsights('maoriPrinciples', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="synthesis-section">
        <h3>🏗️ Applying Analysis to Your Society Design</h3>
        
        <div className="application-questions">
          <div className="question-section">
            <label><strong>Based on this analysis, what type of authority structure might work best for your society?</strong></label>
            <textarea
              className="response-box"
              value={analysisData.societyApplication.authorityStructure}
              onChange={(e) => updateSocietyApplication('authorityStructure', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>What decision-making process will you likely use, and why?</strong></label>
            <textarea
              className="response-box"
              value={analysisData.societyApplication.decisionProcess}
              onChange={(e) => updateSocietyApplication('decisionProcess', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>How will you ensure different voices are represented and leaders are accountable?</strong></label>
            <textarea
              className="response-box"
              value={analysisData.societyApplication.representationAccountability}
              onChange={(e) => updateSocietyApplication('representationAccountability', e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="question-section">
            <label><strong>What unique features from your analysis might you adapt for your society?</strong></label>
            <textarea
              className="response-box"
              value={analysisData.societyApplication.uniqueFeatures}
              onChange={(e) => updateSocietyApplication('uniqueFeatures', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <div className="cultural-element">
        <h4>🌿 Reflection on Unified Purpose</h4>
        <div className="question-section">
          <label><strong>How does "Kia kotahi te hoe, kia ū ki te rau" (paddle as one, hold fast to the purpose) relate to effective governance systems?</strong></label>
          <textarea
            className="response-box"
            value={analysisData.unifiedPurposeReflection}
            onChange={(e) => setAnalysisData(prev => ({...prev, unifiedPurposeReflection: e.target.value}))}
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="te-kete-handout-container">
      <header className="ero-demonstration-header">
        <div className="ero-badge">🌟 ERO HUI DEMONSTRATION READY</div>
        <h1 className="handout-title">
          🏛️ Government Component Analysis Worksheet - Tātaritanga Kāwanatanga
        </h1>
        <p className="handout-subtitle">
          Analyzing governance systems to design effective society structures with cultural wisdom
        </p>
      </header>

      {renderPageNavigation()}

      <main className="worksheet-content">
        {currentPage === 1 && renderPage1()}
        {currentPage === 2 && renderSystemAnalysisPage('system1', 2)}
        {currentPage === 3 && renderSystemAnalysisPage('system2', 3)}
        {currentPage === 4 && renderPage4()}
      </main>

      <section className="related-resources-section">
        <h3>📚 Related Educational Resources</h3>
        <div className="resources-grid">
          <div className="resource-card high-priority">
            <div className="resource-header">
              <span className="priority-badge">🔥 High Priority</span>
              <span className="subject-badge">Social Studies</span>
            </div>
            <h4>Governance Systems Analysis - NZ Curriculum</h4>
            <p>Official resources for understanding government structures and democratic processes</p>
            <p><strong>🌿 Cultural Relevance:</strong> Includes Māori governance and rangatiratanga principles</p>
            <div className="resource-meta">
              <span>Year 8-10 Social Studies</span>
              <span>Achievement Standards 2.1, 2.3</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="handout-footer">
        <p className="cultural-motto">
          🌿 "Kia kotahi te hoe, kia ū ki te rau" - Paddle as one, hold fast to the purpose
        </p>
        <p className="platform-info">
          TeAoMarama - Government Analysis Excellence • Cultural Integration Priority
        </p>
      </footer>
    </div>
  );
}