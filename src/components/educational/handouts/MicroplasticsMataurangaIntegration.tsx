import React, { useState } from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MicroplasticsMataurangaIntegrationProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MicroplasticsMataurangaIntegration: React.FC<MicroplasticsMataurangaIntegrationProps> = (_{
culturalContext = "Environmental guardianship and kaitiakitanga", 
_yearLevel = "Year 9-10", 
_subject = "Science,  _Environmental Studies"
}) => {
const [activeTab, setActiveTab] = useState<'overview' | 'investigation' | 'action'>('overview')

return (
_<div className="microplastics-matauranga-integration">
      <Card title="Ocean Health & Kaitiakitanga" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Ocean Health & Kaitiakitanga</h1>
          <h2 className="handout-subtitle">Understanding Microplastics Through Mātauranga Māori & Modern Science</h2>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌊 {culturalContext}</span>
          </div>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="interactive-tabs">
          <button 
className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
onClick={() => setActiveTab('overview')}
          >
            🌊 Overview
          </button>
          <button 
className={`tab-button ${activeTab === 'investigation' ? 'active' : ''}`}
onClick={() => setActiveTab('investigation')}
          >
            🔍 Investigation
          </button>
          <button 
className={`tab-button ${activeTab === 'action' ? 'active' : ''}`}
onClick={() => setActiveTab('action')}
          >
            ⚡ Action
          </button>
        </div>

        <div className="handout-content">
          <div className="te-kete-content">
            
            {activeTab === 'overview' && (
              <>
                <p style={{color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', marginBottom: '2rem'}}>
Investigating ocean pollution using both traditional Māori environmental knowledge and contemporary scientific methods to understand our responsibilities as kaitiaki (guardians).
                </p>

                {/* Cultural Foundation */}
                <section style={{background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)', color: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-lg)', marginBottom: '2rem'}}>
                  <h2 style={{color: 'white', marginBottom: '1rem'}} className="wiley-section-title">Whakatūwhera - Cultural Foundation</h2>
                  <p style={{lineHeight: 1.7, marginBottom: '1rem'}}>In Te Ao Māori, we understand that the health of te moana (the ocean) directly affects the health of all life. As kaitiaki, we have inherited the responsibility to protect and restore the mauri (life force) of our marine ecosystems. Modern science helps us understand threats like microplastics, while mātauranga Māori guides us in our response as guardians.</p>
                  <p style={{fontStyle: 'italic', fontSize: 'var(--text-lg)'}}>
                    <strong>"Ko au te taiao, ko te taiao ko au"</strong> - I am the environment, the environment is me.
                  </p>
                </section>

                {/* Key Understandings */}
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Ngā Whāinga Matua - Key Understandings</h2>
                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem'}}>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)'}}>
                      <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🌿 Mātauranga Māori</h3>
                      <ul style={{lineHeight: 1.8}}>
                        <li>Understand <strong>kaitiakitanga</strong> as our core responsibility</li>
                        <li>Recognise the <strong>mauri</strong> (life force) in natural systems</li>
                        <li>See the <strong>whakapapa</strong> connecting us to the ocean</li>
                        <li>Apply traditional environmental indicators</li>
                      </ul>
                    </div>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <h3 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>🔬 Modern Science</h3>
                      <ul style={{lineHeight: 1.8}}>
                        <li>Identify what microplastics are and their sources</li>
                        <li>Analyse the impact of pollutants on food webs</li>
                        <li>Use scientific data to inform environmental action</li>
                        <li>Understand bioaccumulation and ecosystem effects</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* What Are Microplastics */}
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Understanding Microplastics</h2>
                  
                  <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginTop: '1.5rem'}}>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
                      <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
                        <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🔬</div>
                        <h4 style={{color: 'var(--color-secondary)'}}>Size: &lt 5mm</h4>
                        <p style={{fontSize: 'var(--text-sm)'}}>Smaller than a grain of rice</p>
                      </div>
                      <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
                        <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🏭</div>
                        <h4 style={{color: 'var(--color-secondary)'}}>Sources</h4>
                        <p style={{fontSize: 'var(--text-sm)'}}>Breakdown of larger plastics, synthetic clothing, car tires</p>
                      </div>
                      <div style={{textAlign: 'center', padding: 'var(--space-4)'}}>
                        <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🐠</div>
                        <h4 style={{color: 'var(--color-secondary)'}}>Impact</h4>
                        <p style={{fontSize: 'var(--text-sm)'}}>Ingested by marine life, enters food chain</p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'investigation' && (
              <>
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Ngā Mahi Rangahau - Investigation Tasks</h2>
                  
                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🌿 1. Traditional Environmental Assessment</h3>
                    <p><strong>Scenario:</strong> You are kaitiaki responsible for a local marine area. Use traditional indicators to assess its health.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Reflection Questions:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>What would healthy conditions look like according to traditional indicators (water clarity, species diversity)?</li>
                        <li>How might microplastic pollution affect each of these natural signs?</li>
                        <li>What traditional management practices (like rāhui) could help address pollution?</li>
                      </ol>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🔬 2. Scientific Data Analysis</h3>
                    <p><strong>Task:</strong> Analyze microplastic concentration data from New Zealand waters.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Data Analysis Questions:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>Which areas show the highest microplastic concentrations?</li>
                        <li>What patterns do you notice in relation to urban areas and currents?</li>
                        <li>How do these findings relate to traditional knowledge about ocean health?</li>
                        <li>What scientific methods could we use to monitor changes over time?</li>
                      </ol>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)', margin: 'var(--space-6) 0'}}>
                    <h3 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🌊 3. Integrated Assessment</h3>
                    <p><strong>Challenge:</strong> Combine mātauranga Māori and scientific approaches to create a comprehensive ocean health assessment.</p>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-4)', borderLeft: '4px solid var(--color-accent)', marginTop: '1rem'}}>
                      <strong>Integration Tasks:</strong>
                      <ol style={{marginTop: '0.5rem', lineHeight: 1.6, paddingLeft: '1.2rem'}}>
                        <li>Design an assessment framework that includes both traditional and scientific indicators</li>
                        <li>Explain how both knowledge systems complement each other</li>
                        <li>Identify areas where traditional knowledge fills gaps in scientific understanding</li>
                        <li>Propose monitoring methods that honor both approaches</li>
                      </ol>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'action' && (
              <>
                <section style={{marginBottom: '2rem'}}>
                  <h2 style={{color: 'var(--color-primary)', borderBottom: '2px solid var(--color-secondary)', paddingBottom: '0.5rem'}} className="wiley-section-title">Ngā Mahi Whakatōhea - Action for Change</h2>
                  
                  <div style={{backgroundColor: 'var(--color-accent)', color: 'white', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginBottom: '2rem'}}>
                    <h3 style={{color: 'white', marginBottom: '1rem'}}>🌟 Kaitiaki Action Plan</h3>
                    <p style={{lineHeight: 1.7}}>As kaitiaki, we must act to protect te moana. Use both traditional wisdom and modern science to develop effective solutions.</p>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)'}}>
                      <h4 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>🌿 Traditional Actions</h4>
                      <ul style={{lineHeight: 1.6}}>
                        <li><strong>Rāhui:</strong> Temporary protection of affected areas</li>
                        <li><strong>Community Education:</strong> Share knowledge through whakapapa</li>
                        <li><strong>Restore Balance:</strong> Support natural recovery processes</li>
                        <li><strong>Collective Responsibility:</strong> Engage whānau and community</li>
                      </ul>
                    </div>

                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <h4 style={{color: 'var(--color-primary)', marginBottom: '1rem'}}>🔬 Scientific Actions</h4>
                      <ul style={{lineHeight: 1.6}}>
                        <li><strong>Source Reduction:</strong> Target major pollution sources</li>
                        <li><strong>Monitoring Programs:</strong> Track pollution levels over time</li>
                        <li><strong>Innovation:</strong> Develop plastic alternatives and cleanup technologies</li>
                        <li><strong>Policy Advocacy:</strong> Support evidence-based regulations</li>
                      </ul>
                    </div>

                    <div style={{backgroundColor: 'var(--color-background)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-accent)'}}>
                      <h4 style={{color: 'var(--color-accent)', marginBottom: '1rem'}}>🤝 Integrated Approach</h4>
                      <ul style={{lineHeight: 1.6}}>
                        <li><strong>Cultural Science:</strong> Research guided by mātauranga Māori</li>
                        <li><strong>Community-Based Monitoring:</strong> Local kaitiaki leading data collection</li>
                        <li><strong>Traditional + Modern Solutions:</strong> Best of both knowledge systems</li>
                        <li><strong>Intergenerational Thinking:</strong> Decisions for seven generations</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{backgroundColor: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-md)', marginTop: '2rem', textAlign: 'center'}}>
                    <h4 style={{color: 'var(--color-secondary)', marginBottom: '1rem'}}>Your Kaitiaki Commitment</h4>
                    <p style={{fontStyle: 'italic', lineHeight: 1.7}}>
                      "As a young kaitiaki, I commit to protecting te moana through both traditional wisdom and modern knowledge. I will take personal actions to reduce plastic pollution and work with my community to restore the mauri of our marine ecosystems."
                    </p>
                  </div>
                </section>
              </>
            )}

          </div>
        </div>
      </Card>
    </div>
  )
}

export default MicroplasticsMataurangaIntegration