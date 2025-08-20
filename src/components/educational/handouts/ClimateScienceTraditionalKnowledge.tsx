import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ClimateScienceTraditionalKnowledgeProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ClimateScienceTraditionalKnowledge: React.FC<ClimateScienceTraditionalKnowledgeProps> = (_{
culturalContext = "Environmental stewardship and climate action", 
_yearLevel = "Year 9-10", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="climate-science-traditional-knowledge">
      <Card title="Climate Science & Traditional Knowledge" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Climate Science & Traditional Knowledge</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div className="te-kete-content">
            <div style={{marginBottom: '2rem'}}>
              <h2 style={{color: 'var(--color-secondary)', margin: '0.5rem 0', fontWeight: 'normal'}} className="wiley-section-title">Two Ways of Understanding Environmental Change in Aotearoa</h2>
              <p style={{color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)'}}>Exploring how modern climate science and traditional Māori environmental knowledge provide complementary approaches to understanding and responding to environmental change.</p>
            </div>

            {/* Cultural and Scientific Foundation */}
            <section style={{background: 'linear-gradient(135deg, #228B22 0%, var(--color-primary) 30%, var(--color-secondary) 70%, #40E0D0 100%)', color: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem'}}>
              <h2 style={{color: 'white', marginBottom: '1rem'}} className="wiley-section-title">Complementary Ways of Knowing Our Changing Environment</h2>
              <p style={{lineHeight: 1.7, marginBottom: '1rem'}}>Climate change affects everyone, but it particularly threatens indigenous communities who depend directly on natural systems. Understanding environmental change through both modern climate science and traditional knowledge creates more complete understanding and better solutions.</p>
              <p style={{fontStyle: 'italic', fontSize: 'var(--text-lg)'}}>"He taonga te taiao, he taonga hoki te tangata"</p>
              <p style={{fontSize: 'var(--text-sm)', marginTop: '0.5rem'}}>The environment is a treasure, and people are a treasure too - both must be protected</p>
            </section>

            {/* Dual Knowledge Systems */}
            <section style={{marginBottom: '2rem'}}>
              <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Ngā Tahua Mātauranga - Two Knowledge Systems</h2>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem'}}>
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)'}}>
                  <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>Mātauranga Māori - Traditional Environmental Knowledge</h3>
                  <ul style={{lineHeight: 1.8}}>
                    <li><strong>Long-term Observation:</strong> Environmental patterns observed over centuries</li>
                    <li><strong>Holistic Understanding:</strong> Sees connections between all parts of ecosystems</li>
                    <li><strong>Place-based Knowledge:</strong> Deep understanding of specific local environments</li>
                    <li><strong>Cultural Indicators:</strong> Environmental health linked to cultural practices</li>
                    <li><strong>Intergenerational Responsibility:</strong> Decisions consider seven generations ahead</li>
                  </ul>
                </div>
                
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                  <h3 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>Modern Climate Science</h3>
                  <ul style={{lineHeight: 1.8}}>
                    <li><strong>Global Data Collection:</strong> Satellite and sensor networks worldwide</li>
                    <li><strong>Mathematical Modeling:</strong> Computer simulations of climate systems</li>
                    <li><strong>Quantitative Analysis:</strong> Precise measurements and statistical analysis</li>
                    <li><strong>Controlled Experiments:</strong> Laboratory studies of climate processes</li>
                    <li><strong>Predictive Capability:</strong> Models forecast future climate scenarios</li>
                  </ul>
                </div>
              </div>
              
              <div style={{backgroundColor: 'var(--color-accent)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginTop: '1rem', textAlign: 'center'}}>
                <h4 style={{color: 'white', marginBottom: 'var(--space-2)'}}>Integration Strength</h4>
                <p style={{margin: 0}}>Traditional knowledge provides context, local detail, and long-term perspective climate science provides global patterns, precise measurement, and predictive modeling. Together, they create more complete understanding than either alone.</p>
              </div>
            </section>

            {/* Traditional Environmental Indicators */}
            <section style={{marginBottom: '2rem'}}>
              <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Traditional Environmental Indicators - Tohu Taiao</h2>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1.5rem'}}>
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)'}}>
                  <h4 style={{color: 'var(--color-secondary)', marginBottom: '0.5rem'}}>🌸 Plant Phenology</h4>
                  <p style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>Timing of flowering, fruiting, and leaf changes indicates seasonal shifts and climate patterns</p>
                </div>
                
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)'}}>
                  <h4 style={{color: 'var(--color-secondary)', marginBottom: '0.5rem'}}>🐦 Bird Behavior</h4>
                  <p style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>Migration patterns, nesting times, and population changes reflect environmental health</p>
                </div>
                
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)'}}>
                  <h4 style={{color: 'var(--color-secondary)', marginBottom: '0.5rem'}}>🌊 Ocean Conditions</h4>
                  <p style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>Sea temperature, currents, and marine life abundance indicate climate system changes</p>
                </div>
                
                <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)'}}>
                  <h4 style={{color: 'var(--color-secondary)', marginBottom: '0.5rem'}}>⭐ Star Knowledge</h4>
                  <p style={{lineHeight: 1.6, fontSize: 'var(--text-sm)'}}>Seasonal star positions and weather patterns help predict climate cycles</p>
                </div>
              </div>
            </section>

            {/* Integration Activities */}
            <section style={{marginBottom: '2rem'}}>
              <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Learning Activities - Ngā Mahi Ako</h2>
              
              <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginTop: '1.5rem'}}>
                <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>Compare and Contrast Activity</h3>
                <ol style={{lineHeight: 1.8}}>
                  <li>Research a local environmental change (e.g., sea level rise, temperature change, species shifts)</li>
                  <li>Find both traditional Māori observations and modern scientific data about this change</li>
                  <li>Create a comparison chart showing: <ul style={{marginTop: '0.5rem', paddingLeft: '1.5rem'}}>
                      <li>What each knowledge system observes</li>
                      <li>How they measure or describe the change</li>
                      <li>What solutions each suggests</li>
                    </ul>
                  </li>
                  <li>Discuss how combining both perspectives creates better understanding</li>
                </ol>
              </div>

              <div style={{backgroundColor: 'var(--color-accent)', color: 'white', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', marginTop: '1rem'}}>
                <h4 style={{color: 'white', marginBottom: 'var(--space-2)'}}>Reflection Questions</h4>
                <ul style={{lineHeight: 1.6, margin: 0}}>
                  <li>How might traditional environmental knowledge help improve climate science?</li>
                  <li>What can modern climate science offer to traditional environmental management?</li>
                  <li>Why is it important to respect both ways of knowing?</li>
                  <li>How can you contribute to environmental protection using both types of knowledge?</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ClimateScienceTraditionalKnowledge