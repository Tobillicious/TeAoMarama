import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2TechnologyDefinitionChallengeProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2TechnologyDefinitionChallenge: React.FC<Unit2TechnologyDefinitionChallengeProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-technology-definition-challenge">
      <Card title="Technology Definition Challenge - Questioning Colonial Assumptions | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Technology Definition Challenge - Questioning Colonial Assumptions | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Technology Definition Challenge</h1>
                <p class="page-subtitle">Questioning Colonial Assumptions About "Advanced" vs "Primitive"</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Problem with "Primitive" vs "Advanced"</h2>
                <p>
How do we decide if something is "advanced technology" or "primitive tools"? Who gets to make that decision? This activity challenges you to think critically about how colonial perspectives have shaped what we consider "technological progress" - and why that matters for understanding pre-colonial Māori society.
                </p>
            </article>

            <!-- Traditional vs Colonial Definitions -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Competing Definitions of Technology</h2>
                
                <div class="definition-comparison">
                    <div class="definition-card colonial-def">
                        <h3>Colonial Definition of "Advanced Technology"</h3>
                        <ul class="definition-list">
                            <li>Made of metal, not organic materials</li>
                            <li>Complex machinery with many moving parts</li>
                            <li>Powered by external energy sources</li>
                            <li>Mass-produced in factories</li>
                            <li>Generates profit and economic growth</li>
                            <li>Dominates or controls natural environment</li>
                            <li>Requires specialized experts to operate</li>
                            <li>Impressive to look at - shows human power</li>
                        </ul>
                        
                        <div class="def-reflection">
                            <strong>Question: </strong> Whose interests does this definition serve?
                        </div>
                    </div>

                    <div class="definition-card maori-def">
                        <h3>Indigenous Definition of "Advanced Technology"</h3>
                        <ul class="definition-list">
                            <li>Works effectively for its intended purpose</li>
                            <li>Uses sustainable, renewable materials</li>
                            <li>Can be maintained and repaired locally</li>
                            <li>Enhances community wellbeing and relationships</li>
                            <li>Respects and works with natural systems</li>
                            <li>Embeds cultural values and spiritual significance</li>
                            <li>Knowledge is shared and passed down through generations</li>
                            <li>Improves life while maintaining balance</li>
                        </ul>
                        
                        <div class="def-reflection">
                            <strong>Question: </strong> How would this definition change our view of pre-colonial societies?
                        </div>
                    </div>
                </div>
            </section>

            <!-- Technology Evaluation Matrix -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Technology Evaluation Challenge</h2>
                <p>Use both definition systems to evaluate these technologies. Which definition makes more sense for each example?</p>
                
                <div class="eval-grid">
                    <div class="eval-card">
                        <h3>🚗 Modern Car vs 🚤 Traditional Waka</h3>
                        
                        <div class="eval-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evaluation Criteria</th>
                                        <th>Car</th>
                                        <th>Waka</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Effectiveness for transport</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Environmental sustainability</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Community self-reliance</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cultural significance</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Durability and maintenance</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="eval-reflection">
                            <p><strong>Which is more "advanced" and why?</strong></p>
                            <div class="answer-space-sm"></div>
                        </div>
                    </div>

                    <div class="eval-card">
                        <h3>💊 Modern Medicine vs 🌿 Rongoā Māori</h3>
                        
                        <div class="eval-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evaluation Criteria</th>
                                        <th>Modern Medicine</th>
                                        <th>Rongoā Māori</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Effectiveness for healing</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Side effects and safety</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Accessibility to community</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Holistic approach to health</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Preventive vs reactive</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="eval-reflection">
                            <p><strong>Which is more "advanced" and why?</strong></p>
                            <div class="answer-space-sm"></div>
                        </div>
                    </div>

                    <div class="eval-card">
                        <h3>🏭 Factory Farming vs 🌾 Traditional Māori Agriculture</h3>
                        
                        <div class="eval-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Evaluation Criteria</th>
                                        <th>Factory Farming</th>
                                        <th>Traditional Agriculture</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Food production volume</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Long-term sustainability</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Food quality and nutrition</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Environmental impact</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Community food security</strong></td>
                                        <td class="fill-in">____/10</td>
                                        <td class="fill-in">____/10</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="eval-reflection">
                            <p><strong>Which is more "advanced" and why?</strong></p>
                            <div class="answer-space-sm"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Critical Thinking Questions -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Analysis Questions</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>1. Bias in Technology Assessment</h3>
                        <div class="answer-space">
                            <p><strong>a) Why might colonial definitions of "advanced technology" ignore environmental sustainability?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>b) How do colonial definitions justify taking land and resources from indigenous peoples?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>c) Give an example of a "modern" technology that is actually less advanced than a traditional alternative:</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>2. Technology and Values</h3>
                        <div class="answer-space">
                            <p><strong>a) What values are embedded in Māori technology and innovation?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>b) What values are embedded in colonial/industrial technology?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>c) Which set of values do you think is more beneficial for humanity's future? Why?</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>3. Redefining Progress</h3>
                        <div class="answer-space">
                            <p><strong>a) If we used indigenous definitions of "advanced technology," how would this change our view of pre-colonial Māori society?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>b) What would "technological progress" look like if it prioritized sustainability and community wellbeing?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>c) How might this reframing change how we approach modern problems like climate change?</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Design Your Own Definition -->
            <section class="mb-4">
                <div class="creative-challenge-box">
                    <h2 class="section-title" class="wiley-section-title">Creative Challenge: Design Your Definition</h2>
                    <p>Create your own definition of "advanced technology" that incorporates the best aspects of both indigenous and modern thinking.</p>
                    
                    <div class="definition-builder">
                        <h3>My Definition of Advanced Technology:</h3>
                        <div class="answer-space-lg">
                            <p><strong>Advanced technology should be:</strong></p>
                            <ol>
                                <li>_________________________________________________</li>
                                <li>_________________________________________________</li>
                                <li>_________________________________________________</li>
                                <li>_________________________________________________</li>
                                <li>_________________________________________________</li>
                            </ol>
                        </div>
                        
                        <h3>Test Your Definition:</h3>
                        <div class="answer-space">
                            <p><strong>Using your definition, what would be the most "advanced" technology in today's world?</strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>What current technology would you consider least "advanced" by your definition?</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Reflection and Action -->
            <section class="mb-4">
                <div class="action-box">
                    <h2 class="section-title" class="wiley-section-title">From Understanding to Action</h2>
                    <p>How can this new understanding change how we think about technology and progress today?</p>
                    
                    <div class="action-grid">
                        <div class="action-card">
                            <h3>🏫 In School</h3>
                            <p>How could schools better recognize and teach about indigenous innovation?</p>
                            <div class="answer-space-sm"></div>
                        </div>
                        
                        <div class="action-card">
                            <h3>🏘️ In Community</h3>
                            <p>What traditional knowledge exists in your community that should be valued more highly?</p>
                            <div class="answer-space-sm"></div>
                        </div>
                        
                        <div class="action-card">
                            <h3>🌍 In Society</h3>
                            <p>How could society make better technology choices using indigenous principles?</p>
                            <div class="answer-space-sm"></div>
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

export default Unit2TechnologyDefinitionChallenge
