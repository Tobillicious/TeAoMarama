import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2MilitaryInnovationStudyProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2MilitaryInnovationStudy: React.FC<Unit2MilitaryInnovationStudyProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-military-innovation-study">
      <Card title="Māori Military Innovation - Strategy and Technology in the Aotearoa Wars | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Māori Military Innovation - Strategy and Technology in the Aotearoa Wars | Te Kete Ako</h1>
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
            <div class="mb-4">
                <a href="handouts.html" class="breadcrumb">&larr Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">Māori Military Innovation Study</h1>
                <p class="page-subtitle">Analysing the Sophisticated Technology and Tactics of the Aotearoa Wars</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">A Battle of Wits, Not Just Weapons</h2>
                <p>
The Aotearoa Wars were a clash of technologies and worldviews. Colonial forces arrived with the industrial might of the British Empire: cannons, rifles, and a professional army. They expected a swift victory. What they encountered was a highly adaptable and innovative Māori military system that challenged European assumptions and, on many occasions, defeated a technologically superior foe. This handout explores the key military innovations that defined Māori resistance.
                </p>
            </article>

            <!-- Innovations Section -->
            <section class="mb-4">
                <div class="innovations-grid">
                    
                    <div class="innovation-card-long">
                        <div class="innovation-header">
                            <h3>The "Modern Pā": A Revolution in Fortification</h3>
                        </div>
                        <div class="innovation-content">
                            <p>Early pā were designed for inter-tribal warfare with hand-to-hand weapons. The arrival of muskets and cannons made these obsolete. In response, Māori engineers developed the "gunfighter pā," a revolutionary design that neutralized the British advantage in firepower.</p>
                            <h4>Key Features: </h4>
                            <ul>
                                <li><strong>Anti-artillery Bunkers:</strong> Deep, timber-reinforced bunkers (rua) protected warriors from cannon fire. They could wait out a bombardment in safety and emerge to fight on their own terms.</li>
                                <li><strong>Trench Systems: </strong> A complex network of trenches and communication tunnels allowed warriors to move safely within the pā and fire from covered positions.</li>
                                <li><strong>Flax-covered Palisade:</strong> The outer walls were often covered with woven flax (harakeke), which absorbed the shock of cannonballs and prevented deadly wood splinters.</li>
                                <li><strong>Strategic Siting: </strong> Pā were often built to lure the British into a kill zone, with carefully planned lines of fire and escape routes. The British might "take" the pā, only to find it empty, having expended huge amounts of ammunition and effort for no gain.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="innovation-card-long">
                        <div class="innovation-header">
                            <h3>Guerrilla Warfare: Fighting on Māori Terms</h3>
                        </div>
                        <div class="innovation-content">
                            <p>Māori commanders understood that they could not win a conventional war against a larger, better-equipped army. Instead, they used their intimate knowledge of the land to fight a guerrilla war, frustrating and demoralizing the colonial forces.</p>
                            <h4>Key Tactics: </h4>
                            <ul>
                                <li><strong>Hit-and-Run Attacks:</strong> Small, mobile war parties (taua) would launch surprise attacks on supply lines, isolated outposts, and marching columns, then melt back into the forest.</li>
                                <li><strong>Use of Terrain: </strong> The dense bush, swamps, and rugged hills of Aotearoa were a significant advantage. Māori warriors could move quickly and silently through landscapes where British soldiers struggled.</li>
                                <li><strong>Scorched Earth: </strong> In some cases, Māori would destroy crops and resources to deny them to the advancing enemy, making it harder for the British to sustain their campaigns.</li>
                                <li><strong>Psychological Warfare: </strong> The use of the haka, surprise attacks, and the ability to disappear into the landscape had a significant psychological impact on the morale of colonial troops.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="innovation-card-long">
                        <div class="innovation-header">
                            <h3>Alliance Strategies: Unity in Resistance</h3>
                        </div>
                        <div class="innovation-content">
                            <p>While Māori society was often seen by Europeans as fragmented, the Aotearoa Wars saw the formation of powerful alliances and coalitions to resist the colonial threat. These alliances were complex and required sophisticated diplomacy.</p>
                            <h4>Key Elements: </h4>
                            <ul>
                                <li><strong>The Kīngitanga (King Movement):</strong> The formation of the Kīngitanga was a major political innovation, creating a unified Māori authority to rival the British Crown and coordinate resistance across different iwi.</li>
                                <li><strong>Inter-iwi Cooperation: </strong> Leaders like Te Kooti and Tītokowaru were able to build alliances with different iwi, sharing resources, fighters, and strategic knowledge.</li>
                                <li><strong>Diplomatic Messengers: </strong> Runners and messengers travelled vast distances to carry strategic information, requests for support, and diplomatic proposals between different leaders and iwi.</li>
                                <li><strong>Shared Grievances: </strong> The shared experience of land confiscation and attacks on sovereignty became a powerful unifying force, overcoming traditional rivalries in the face of a common enemy.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Analysis & Critical Thinking</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: Innovation vs. Invention</h3>
                        <p>The modern pā was an <em>innovation</em>, not an invention. It adapted an existing idea for a new context. Explain how the design of the gunfighter pā specifically responds to the threat of British artillery and rifles.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 2: Asymmetric Warfare</h3>
                        <p>Guerrilla warfare is a form of "asymmetric warfare" – a conflict between opponents of unequal strength. How did Māori guerrilla tactics turn the strengths of the British army (size, firepower) into weaknesses?</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 3: The Biggest Innovation?</h3>
                        <p>Of the three areas of innovation described (pā design, guerrilla warfare, and alliances), which do you think was the most significant or effective in the Māori resistance effort? Justify your answer with reasoning.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
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

export default Unit2MilitaryInnovationStudy
