import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2TraditionalSciencePrimarySourcesProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2TraditionalSciencePrimarySources: React.FC<Unit2TraditionalSciencePrimarySourcesProps> = (_{
culturalContext = "Traditional knowledge and cultural practices", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-traditional-science-primary-sources">
      <Card title="Traditional Science: Primary Sources - Māori Knowledge Systems | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Traditional Science: Primary Sources - Māori Knowledge Systems | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Traditional Science: Primary Sources</h1>
                <p class="page-subtitle">Analysing First-Hand Accounts of Māori Scientific Knowledge</p>
            </div>

            <section class="mb-4">
                <div class="cultural-protocol-box">
                    <h3>Learning Intentions - Ngā Whāinga Ako</h3>
                    <ul>
                        <li>Analyse primary source documents for evidence of scientific thinking.</li>
                        <li>Identify Māori scientific practices in navigation, astronomy, agriculture, and medicine.</li>
                        <li>Compare traditional Māori scientific methods with modern Western science.</li>
                        <li>Understand how knowledge (mātauranga) was recorded and transmitted orally.</li>
                    </ul>
                </div>
            </section>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Unwritten Encyclopedia</h2>
                <p>
Before written language was introduced to Aotearoa, Māori held a vast encyclopedia of scientific knowledge in their minds. This knowledge, or mātauranga, was passed down through generations in kōrero (stories), waiata (songs), and whakapapa (genealogies). When Europeans arrived, some recorded their observations of this knowledge in action. These records, while often biased, are valuable primary sources that give us a window into a sophisticated scientific tradition.
                </p>
            </article>

            <!-- Primary Source Analysis Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Primary Source Analysis - Ngā Tuhinga Onamata</h2>
                
                <div class="primary-source-grid">
                    <div class="primary-source-card">
                        <h3>Source 1: Navigation & Astronomy</h3>
                        <blockquote class="primary-source-quote">
                            "I have before mentioned that the island had on board a man named Tupaia... He had been the first minister of Otaheite... and was also a priest he was, besides, a man of great knowledge and experience in the geography of the islands."
                        </blockquote>
                        <cite>— Captain James Cook, Journal, 1770</cite>
                        <div class="source-context">
Cook describes Tupaia, a Ra'iātean navigator who joined the Endeavour. Tupaia's vast knowledge allowed him to draw a chart of 74 islands, stunning the European crew. Cook later called him a "Shrewd, Sensible, Ingenious Man."
                        </div>
                    </div>

                    <div class="primary-source-card">
                        <h3>Source 2: Agriculture & Horticulture</h3>
                        <blockquote class="primary-source-quote">
                            "The sweet potatoes... were planted in small hills, some ranged in rows, others in quincunx, with such regularity that they would not have disgraced a European kitchen garden... each patch was inclos'd with a fence made of reeds... so close that a mouse could scarce creep through."
                        </blockquote>
                        <cite>— Joseph Banks, Journal, 1769</cite>
                        <div class="source-context">
Banks, a botanist, was amazed by the precision and order of Māori gardens. He noted the advanced techniques for planting, soil management, and pest control, which challenged European assumptions about "primitive" agriculture.
                        </div>
                    </div>

                    <div class="primary-source-card">
                        <h3>Source 3: Medicine & Health (Rongoā)</h3>
                        <blockquote class="primary-source-quote">
                            "For all their ailments, they drink only the juice extracted from certain herbs, which they call 'rongoā', meaning 'tonics' or 'remedies'. They are very skilled in the choice of these plants..."
                        </blockquote>
                        <cite>— René Lesson, French Naturalist, 1824</cite>
                        <div class="source-context">
Lesson observed that Māori had a well-established system of herbal medicine. Rongoā was not just about treating symptoms but about restoring balance (hauora), a holistic view of health that modern science is only now beginning to appreciate.
                        </div>
                    </div>

                    <div class="primary-source-card">
                        <h3>Source 4: Ecology & Guardianship (Kaitiakitanga)</h3>
                        <blockquote class="primary-source-quote">
                            "The natives have a custom of prohibiting the catching of a certain fish and the collecting of a certain shellfish... for a certain period... This is called a 'rahui'. It is a law for the preservation of the fish and is a law of their own making."
                        </blockquote>
                        <cite>— William Colenso, Missionary and Botanist, 1842</cite>
                        <div class="source-context">
Colenso documented the practice of rāhui, a temporary ban on harvesting resources. This demonstrates a deep understanding of ecological management and the need for conservation, ensuring that food sources remained abundant for future generations.
                        </div>
                    </div>
                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Scientific Analysis Activities</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: Identifying the Science</h3>
                        <p>For each primary source quote, identify the scientific principles being described. Use the table below.</p>
                        
                        <div class="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Source #</th>
                                        <th>Area of Science</th>
                                        <th>Scientific Principle or Practice Observed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>1</strong></td>
                                        <td>Navigation / Astronomy</td>
                                        <td><em>e.g., Cartography, celestial mapping, oral transmission of geographic data.</em></td>
                                    </tr>
                                    <tr>
                                        <td><strong>2</strong></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><strong>3</strong></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><strong>4</strong></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 2: Comparing Knowledge Systems</h3>
                        <p>Choose <strong>one</strong> primary source. How does the Māori approach described compare to a modern Western scientific approach to the same topic? Consider the following:</p>
                        <ul>
                            <li><strong>Method of observation:</strong> How is data gathered and tested?</li>
                            <li><strong>Purpose:</strong> Why is the knowledge needed? (e.g., survival, prediction, sustainability)</li>
                            <li><strong>Worldview: </strong> Is it holistic and integrated, or specialized and separated?</li>
                        </ul>
                        <div class="answer-space">
                            <p><strong>Chosen Primary Source: </strong> #____</p>
                            <p><strong>Comparison:</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 3: Bias in Primary Sources</h3>
                        <p>The authors of these quotes were European. How might their cultural background have influenced what they chose to record and how they described it? Why is it important to consider this bias when using them as historical evidence?</p>
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

export default Unit2TraditionalSciencePrimarySources
