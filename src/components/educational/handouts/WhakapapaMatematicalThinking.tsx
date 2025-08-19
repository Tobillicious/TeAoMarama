import React, { useState } from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WhakapapaMatematicalThinkingProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WhakapapaMatematicalThinking: React.FC<WhakapapaMatematicalThinkingProps> = ({
  culturalContext = "Mathematical concepts in cultural context",
  yearLevel = "Year 9-10", 
  subject = "Mathematics, Social Studies"
}) => {
  const [activeView, setActiveView] = useState<'concept' | 'exploration' | 'application'>('concept');

  return (
    <div className="whakapapa-mathematical-thinking">
      <Card title="Whakapapa & Mathematical Thinking" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Whakapapa & Mathematical Thinking</h1>
          <h2 className="handout-subtitle">Genealogy, Networks & Exponential Growth | Mangakōtukutuku College</h2>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        {/* Interactive Navigation */}
        <div className="interactive-tabs">
          <button 
            className={`tab-button ${activeView === 'concept' ? 'active' : ''}`}
            onClick={() => setActiveView('concept')}
          >
            🌿 Te Tiriti o Whakapapa
          </button>
          <button 
            className={`tab-button ${activeView === 'exploration' ? 'active' : ''}`}
            onClick={() => setActiveView('exploration')}
          >
            🔢 Mathematical Exploration
          </button>
          <button 
            className={`tab-button ${activeView === 'application' ? 'active' : ''}`}
            onClick={() => setActiveView('application')}
          >
            🎯 Real Applications
          </button>
        </div>

        <div className="handout-content">
          <div className="te-kete-content">

            {activeView === 'concept' && (
              <>
                <p style={{color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', marginBottom: '2rem'}}>
                  Explore how whakapapa (genealogy) demonstrates fundamental mathematical concepts including exponential growth, network theory, and geometric sequences - connecting traditional knowledge with mathematical understanding.
                </p>

                {/* Cultural Foundation */}
                <section style={{background: 'linear-gradient(135deg, #8B4513 0%, var(--color-primary) 50%, #DAA520 100%)', color: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem'}}>
                  <h2 style={{color: 'white', marginBottom: '1rem'}} className="wiley-section-title">Te Tiriti o Whakapapa - The Foundation of Connection</h2>
                  <p style={{lineHeight: 1.7, marginBottom: '1rem'}}>
                    Whakapapa is more than genealogy - it is the fundamental structure that connects all things in Te Ao Māori. Every person, animal, plant, and natural feature has whakapapa that links them to all of creation. This web of relationships follows mathematical patterns that help us understand growth, connection, and interdependence.
                  </p>
                  <p style={{fontStyle: 'italic', fontSize: 'var(--text-lg)'}}>
                    <strong>"Ko wai koe?" "Who are you?"</strong> - Understanding identity through mathematical relationships
                  </p>
                </section>

                {/* Mathematical Concepts in Whakapapa */}
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Mathematical Patterns in Whakapapa</h2>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)'}}>
                      <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
                        <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>📈</span>
                        Exponential Growth
                      </h3>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Each generation doubles the number of ancestors:</p>
                      <ul style={{lineHeight: 1.8, fontSize: 'var(--text-sm)'}}>
                        <li><strong>You:</strong> 1 person</li>
                        <li><strong>Parents:</strong> 2 people (2¹)</li>
                        <li><strong>Grandparents:</strong> 4 people (2²)</li>
                        <li><strong>Great-grandparents:</strong> 8 people (2³)</li>
                        <li><strong>10 generations back:</strong> 1,024 people (2¹⁰)</li>
                      </ul>
                    </div>
                    
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <h3 style={{color: 'var(--color-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
                        <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>🕸️</span>
                        Network Theory
                      </h3>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Whakapapa creates complex networks:</p>
                      <ul style={{lineHeight: 1.8, fontSize: 'var(--text-sm)'}}>
                        <li><strong>Nodes:</strong> Individual people</li>
                        <li><strong>Edges:</strong> Family relationships</li>
                        <li><strong>Paths:</strong> Ways people connect</li>
                        <li><strong>Clusters:</strong> Iwi and hapū groups</li>
                        <li><strong>Bridges:</strong> Inter-iwi connections</li>
                      </ul>
                    </div>

                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-accent)'}}>
                      <h3 style={{color: 'var(--color-accent)', marginBottom: '1rem', display: 'flex', alignItems: 'center'}}>
                        <span style={{fontSize: '1.5rem', marginRight: '0.5rem'}}>🌳</span>
                        Tree Structures
                      </h3>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Family trees show hierarchical organization:</p>
                      <ul style={{lineHeight: 1.8, fontSize: 'var(--text-sm)'}}>
                        <li><strong>Root:</strong> Ancestral tīpuna</li>
                        <li><strong>Branches:</strong> Lineage lines</li>
                        <li><strong>Leaves:</strong> Current generation</li>
                        <li><strong>Height:</strong> Number of generations</li>
                        <li><strong>Breadth:</strong> Size of each generation</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Whakataukī Integration */}
                <section style={{backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: '2rem'}}>
                  <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>Whakataukī: Mathematical Wisdom</h3>
                  <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginBottom: '1rem'}}>
                    <p style={{fontStyle: 'italic', color: 'var(--color-secondary)', fontSize: 'var(--text-lg)', marginBottom: '0.5rem'}}>
                      "He tangata takitahi, he tangata kino; he tangata takitini, he tangata pai."
                    </p>
                    <p style={{fontSize: 'var(--text-sm)'}}>
                      A single person is bad; many people together are good.
                    </p>
                  </div>
                  <p style={{lineHeight: 1.7}}>
                    This whakataukī reflects network effects - the mathematical principle that the value of a network increases exponentially with the number of connections. In whakapapa terms, our strength comes from our many relationships and connections to others.
                  </p>
                </section>
              </>
            )}

            {activeView === 'exploration' && (
              <>
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Mathematical Exploration Tasks</h2>
                  
                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🔢 Task 1: Exponential Ancestor Calculation</h3>
                    <p><strong>Challenge:</strong> Calculate how many ancestors you would have going back different numbers of generations.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Mathematical Questions:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>Complete the formula: Number of ancestors = 2ⁿ, where n = ?</li>
                        <li>How many ancestors would you have 15 generations back?</li>
                        <li>At what generation would you have over 1 million ancestors?</li>
                        <li>Why might this theoretical number be different from reality?</li>
                      </ol>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🌐 Task 2: Network Analysis</h3>
                    <p><strong>Investigation:</strong> Analyze the mathematical properties of family networks.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Network Theory Questions:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>If every person has an average of 2.5 children, what is the growth rate?</li>
                        <li>How does intermarriage between iwi affect network connectivity?</li>
                        <li>What mathematical concept explains why "everyone is related"?</li>
                        <li>How do you calculate degrees of separation in whakapapa?</li>
                      </ol>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🎯 Task 3: Probability in Whakapapa</h3>
                    <p><strong>Real-world Application:</strong> Use probability to understand genetic inheritance and cultural transmission.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Probability Questions:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>What is the probability of inheriting a specific trait from a great-grandparent?</li>
                        <li>How do we calculate the likelihood of cultural knowledge being passed down?</li>
                        <li>What factors affect the probability of maintaining iwi connections?</li>
                        <li>How does geography influence whakapapa probability distributions?</li>
                      </ol>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeView === 'application' && (
              <>
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Real-World Applications</h2>
                  
                  <div style={{backgroundColor: 'var(--color-accent)', color: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: '2rem'}}>
                    <h3 style={{color: 'white', marginBottom: '1rem'}}>🌟 Mathematics in Cultural Practice</h3>
                    <p style={{lineHeight: 1.7}}>Understanding the mathematical patterns in whakapapa helps us appreciate both the complexity of our relationships and the practical applications of mathematical thinking in cultural contexts.</p>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)'}}>
                      <h4 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🏛️ Iwi Registration & Census</h4>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Mathematical models help iwi:</p>
                      <ul style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>
                        <li>Estimate population sizes and growth</li>
                        <li>Allocate resources based on whakapapa connections</li>
                        <li>Plan for future generations</li>
                        <li>Understand demographic trends</li>
                      </ul>
                    </div>

                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <h4 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>🧬 Genetic Research</h4>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Whakapapa supports scientific research:</p>
                      <ul style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>
                        <li>Tracking genetic variations through generations</li>
                        <li>Understanding population genetics</li>
                        <li>Medical research with cultural protocols</li>
                        <li>Biodiversity and conservation genetics</li>
                      </ul>
                    </div>

                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-accent)'}}>
                      <h4 style={{color: 'var(--color-accent)', marginBottom: '1rem'}}>💡 Technology & Data</h4>
                      <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>Digital whakapapa platforms use:</p>
                      <ul style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>
                        <li>Database design for relationship storage</li>
                        <li>Graph algorithms for connection discovery</li>
                        <li>Privacy mathematics for data protection</li>
                        <li>Network visualization techniques</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginTop: '2rem'}}>
                    <h4 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🎓 Reflection & Integration</h4>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Think About:</strong>
                      <ul style={{marginTop: '0.5rem', lineHeight: 1.6}}>
                        <li>How does understanding the mathematics of whakapapa change your perspective on family relationships?</li>
                        <li>What other cultural practices might have hidden mathematical patterns?</li>
                        <li>How can mathematical thinking enhance rather than replace traditional knowledge?</li>
                        <li>What responsibility do we have to preserve both mathematical and cultural knowledge for future generations?</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </>
            )}

          </div>
        </div>
      </Card>
    </div>
  );
};

export default WhakapapaMatematicalThinking;