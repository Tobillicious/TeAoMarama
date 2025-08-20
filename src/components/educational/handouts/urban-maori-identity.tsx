import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface UrbanMaoriIdentityProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const UrbanMaoriIdentity: React.FC<UrbanMaoriIdentityProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="urban-maori-identity">
      <Card title="Urban Māori Identity | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Urban Māori Identity | Te Kete Ako</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
className="te-kete-content"
dangerouslySetInnerHTML={{ __html: `
                
                <section class="concept-introduction">
                    <div class="highlight-box cultural-context">
                        <h2 class="wiley-section-title">A Shift in Worlds - He Tahuritanga o nga Taiao</h2>
                        <p>After World War II, a massive wave of Māori migration occurred as people moved from their rural homes to cities like Auckland and Wellington in search of work and opportunities. This was one of the most significant social changes in 20th-century Aotearoa. While it offered economic promise, it also presented huge challenges to maintaining cultural identity away from the marae and traditional lands.</p>
                        
                        <div class="cultural-note">
                            <h3>Cultural Context</h3>
                            <p>This period represents a profound shift in Māori society - from predominantly rural, iwi-based communities to urban, multi-tribal environments. Understanding this migration helps us appreciate the resilience and adaptability of Māori culture.</p>
                        </div>
        
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Historical Background: The Push and Pull Factors</h2>
                    
                    <div class="timeline-section">
                        <div class="timeline-item">
                            <span class="timeline-date">1945-1960s</span>
                            <div class="timeline-content">
                                <h3>Post-War Economic Boom</h3>
                                <p>Manufacturing jobs in cities offered better wages and opportunities than rural employment.</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <span class="timeline-date">1950s-1970s</span>
                            <div class="timeline-content">
                                <h3>The Great Migration</h3>
                                <p>Thousands of Māori families moved to Auckland, Wellington, and other urban centers.</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <span class="timeline-date">1960s onwards</span>
                            <div class="timeline-content">
                                <h3>Cultural Renaissance</h3>
                                <p>Urban Māori began creating new forms of cultural expression and community organization.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Challenges and Innovations</h2>
                    
                    <div class="challenge-innovation-grid">
                        <div class="challenge-card">
                            <div class="challenge-header">
                                <span class="challenge-icon">⚠️</span>
                                <h3>Challenge: Loss of Connection</h3>
                            </div>
                            <div class="challenge-content">
                                <p>Away from their tūrangawaewae (place to stand), many urban Māori felt a sense of disconnection from their language, culture, and community structures.</p>
                                <div class="impact-list">
                                    <h4>Impacts included: </h4>
                                    <ul>
                                        <li>Language loss (te reo Māori decline)</li>
                                        <li>Weakening of iwi connections</li>
                                        <li>Difficulty accessing traditional knowledge</li>
                                        <li>Social isolation and identity confusion</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="innovation-card">
                            <div class="innovation-header">
                                <span class="innovation-icon">💡</span>
                                <h3>Innovation: Urban Marae & Pan-Tribalism</h3>
                            </div>
                            <div class="innovation-content">
                                <p>In response, Māori communities in the cities began to build urban marae. These became vital cultural centres for people from many different iwi. This also fostered a "pan-tribal" identity, where a shared sense of being Māori became just as important as specific iwi affiliations.</p>
                                <div class="innovation-examples">
                                    <h4>Key Developments: </h4>
                                    <ul>
                                        <li>Urban marae as multicultural spaces</li>
                                        <li>Māori cultural groups and clubs</li>
                                        <li>Pan-tribal political organizations</li>
                                        <li>New forms of Māori art and performance</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Key Urban Marae and Cultural Centers</h2>
                    
                    <div class="marae-showcase">
                        <div class="marae-card">
                            <h3>Hoani Waititi Marae, Auckland</h3>
                            <p>Established in 1980, this marae serves people from all iwi living in West Auckland. It represents the pan-tribal approach to urban Māori identity.</p>
                        </div>
                        
                        <div class="marae-card">
                            <h3>Tapu Te Ranga Marae, Wellington</h3>
                            <p>Built from recycled materials by the community, this marae became a symbol of urban Māori innovation and environmental consciousness.</p>
                        </div>
                        
                        <div class="marae-card">
                            <h3>Ngā Hau e Whā, Christchurch</h3>
                            <p>The "four winds" marae represents people from all directions, embodying the inclusive nature of urban Māori communities.</p>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">The Evolution of Māori Identity</h2>
                    
                    <div class="identity-comparison">
                        <div class="identity-column traditional">
                            <h3>Traditional Rural Identity</h3>
                            <div class="identity-features">
                                <div class="feature">
                                    <strong>Iwi-based: </strong> Identity rooted in specific tribal connections
                                </div>
                                <div class="feature">
                                    <strong>Land-based:</strong> Deep connection to ancestral lands
                                </div>
                                <div class="feature">
                                    <strong>Extended whānau:</strong> Large family networks nearby
                                </div>
                                <div class="feature">
                                    <strong>Daily te reo:</strong> Language used in community settings
                                </div>
                            </div>
                        </div>
                        
                        <div class="identity-arrow">
                            <span>→</span>
                        </div>
                        
                        <div class="identity-column urban">
                            <h3>Urban Pan-Tribal Identity</h3>
                            <div class="identity-features">
                                <div class="feature">
                                    <strong>Pan-tribal:</strong> Māori identity beyond specific iwi
                                </div>
                                <div class="feature">
                                    <strong>Adaptable:</strong> New ways of being Māori in cities
                                </div>
                                <div class="feature">
                                    <strong>Chosen whānau:</strong> Creating family from community
                                </div>
                                <div class="feature">
                                    <strong>Cultural revival:</strong> Conscious effort to maintain language
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Impact on Contemporary Aotearoa</h2>
                    
                    <div class="impact-grid">
                        <div class="impact-card political">
                            <h3>🏛️ Political Impact</h3>
                            <p>Urban Māori developed new forms of political organization, leading to national Māori movements and advocacy groups that could mobilize across iwi boundaries.</p>
                        </div>
                        
                        <div class="impact-card cultural">
                            <h3>🎭 Cultural Impact</h3>
                            <p>New forms of Māori art, music, and performance emerged that blended traditional and contemporary influences, creating a distinctive urban Māori culture.</p>
                        </div>
                        
                        <div class="impact-card educational">
                            <h3>📚 Educational Impact</h3>
                            <p>Urban Māori led efforts to establish kōhanga reo, kura kaupapa Māori, and Māori language revitalization programs in cities.</p>
                        </div>
                        
                        <div class="impact-card economic">
                            <h3>💼 Economic Impact</h3>
                            <p>Urban Māori communities developed new economic models, including collective enterprises and urban-based Māori businesses.</p>
                        </div>
                    </div>
                </section>

                <section class="activity-section">
                    <h2 class="wiley-section-title">Critical Thinking Questions</h2>
                    <div class="reflection-questions">
                        <ol>
                            <li>How did urban migration both challenge and strengthen Māori cultural identity?</li>
                            <li>What role did urban marae play in maintaining cultural connections for city-dwelling Māori?</li>
                            <li>How might the experience of urban Māori compare to that of other indigenous peoples globally?</li>
                            <li>What are the ongoing effects of this migration on contemporary Māori society?</li>
                            <li>How did pan-tribalism change the nature of Māori identity and political organization?</li>
                        </ol>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Further Reading & Viewing</h2>
                    
                    <div class="resources-grid">
                        <div class="resource-card authentic">
                            <h3>📖 Te Ara Encyclopedia</h3>
                            <p><a href="https: //teara.govt.nz/en/urban-maori" target="_blank" rel="noopener noreferrer">Urban Māori - The Encyclopedia of New Zealand</a></p>
                            <p class="resource-description">Comprehensive government resource with historical context and statistics.</p>
                        </div>
                        
                        <div class="resource-card documentary">
                            <h3>🎬 Documentary Resources</h3>
                            <p><a href="https://www.nzonscreen.com/title/making-ourselves-at-home-1993" target="_blank" rel="noopener noreferrer">"Making Ourselves at Home" (NZ On Screen)</a></p>
                            <p class="resource-description">1993 documentary about urban Māori communities in Auckland.</p>
                        </div>
                        
                        <div class="resource-card academic">
                            <h3>📚 Academic Perspective</h3>
                            <p><a href="https://www.massey.ac.nz/about/colleges-schools-and-institutes/college-of-humanities-and-social-sciences/school-of-social-work/" target="_blank" rel="noopener noreferrer">Massey University - Social Work Research</a></p>
                            <p class="resource-description">Academic research on urban Māori social issues and community development.</p>
                        </div>
                    </div>
                </section>

                <section class="curriculum-alignment">
                    <h2 class="wiley-section-title">Curriculum Connections</h2>
                    <div class="alignment-grid">
                        <div class="alignment-item">
                            <h3>Social Sciences</h3>
                            <ul>
                                <li>Understanding how people make sense of place and environment</li>
                                <li>How cultural interaction impacts identity and belonging</li>
                                <li>The relationship between social organization and cultural practices</li>
                            </ul>
                        </div>
                        <div class="alignment-item">
                            <h3>History</h3>
                            <ul>
                                <li>Causes and consequences of significant historical events</li>
                                <li>How historical forces shape identity and community</li>
                                <li>The ongoing impacts of colonization and modernization</li>
                            </ul>
                        </div>
                    </div>
                </section>

            ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default UrbanMaoriIdentity
