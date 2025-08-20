import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2InnovationDomainsComparisonProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2InnovationDomainsComparison: React.FC<Unit2InnovationDomainsComparisonProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-innovation-domains-comparison">
      <Card title="Innovation Domains Comparison - Māori vs. Modern Systems | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Innovation Domains Comparison - Māori vs. Modern Systems | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Innovation Domains Comparison Chart</h1>
                <p class="page-subtitle">Comparing Māori and Modern Approaches to Technology and Problem-Solving</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">Two Worlds of Innovation</h2>
                <p>
Innovation isn't a single concept. Different cultures develop unique approaches based on their values, environment, and needs. This activity compares the principles of traditional Māori innovation with modern, Western-style innovation across six key domains. Consider not just *what* was created, but *how* and *why*.
                </p>
            </article>

            <!-- Comparison Chart Section -->
            <section class="mb-4">
                <div class="comparison-table-container">
                    <table class="comparison-table full-width">
                        <thead>
                            <tr>
                                <th>Innovation Domain</th>
                                <th>Māori Innovation Principles</th>
                                <th>Modern Innovation Principles</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Marine</strong><br>(Waka vs. Cargo Ship)</td>
                                <td>- Holistic knowledge (stars, waves, birds)<br>- Sustainable, natural materials (tōtara, harakeke)<br>- Waka as taonga with whakapapa<br>- Multi-purpose (transport, fishing, ceremony)</td>
                                <td>- Specialised technology (GPS, radar, sonar)<br>- Extractive materials (steel, fossil fuels)<br>- Vessel as a disposable asset<br>- Single-purpose, optimised for profit</td>
                            </tr>
                            <tr>
                                <td><strong>Agricultural</strong><br>(Māra vs. Industrial Farm)</td>
                                <td>- Works with ecosystems (companion planting)<br>- Focus on long-term soil health (e.g., puke) <br>- Food sovereignty & community nourishment<br>- Knowledge held by community (mātauranga)</td>
                                <td>- Aims to control/dominate ecosystems<br>- Focus on short-term yield (synthetic fertilisers)<br>- Global supply chains & profit-driven<br>- Knowledge as intellectual property (patents)</td>
                            </tr>
                            <tr>
                                <td><strong>Medical</strong><br>(Rongoā vs. Pharmaceutical)</td>
                                <td>- Holistic (taha wairua, taha hinengaro)<br>- Focus on restoring balance (hauora)<br>- Personalised treatment<br>- Healer & patient relationship is key</td>
                                <td>- Symptom-focused, specialised<br>- Focus on eliminating pathogens<br>- Standardised "one-size-fits-all" treatment<br>- Patient as a consumer of a product</td>
                            </tr>
                            <tr>
                                <td><strong>Construction</strong><br>(Whare vs. Skyscraper)</td>
                                <td>- Renewable, local materials<br>- Design adapts to climate & landscape<br>- Building as a living entity with cultural meaning<br>- Built by community, for community</td>
                                <td>- High-energy, processed materials (concrete, steel)<br>- Climate-controlled, sealed environments<br>- Building as a financial asset<br>- Built by specialised contractors</td>
                            </tr>
                            <tr>
                                <td><strong>Textile</strong><br>(Kākahu vs. Fast Fashion)</td>
                                <td>- Sustainable harvesting (e.g., harakeke)<br>- Process builds mana into the garment<br>- Taonga passed through generations<br>- Reflects whakapapa and identity</td>
                                <td>- Linear model (produce, use, dispose)<br>- Exploitative labour practices are common<br>- Designed for obsolescence, disposable<br>- Reflects temporary trends</td>
                            </tr>
                            <tr>
                                <td><strong>Tool-making</strong><br>(Pounamu vs. Steel)</td>
                                <td>- Uses available, superior materials (pounamu, obsidian)<br>- Tool has its own whakapapa and story<br>- Created by skilled artisans for specific needs<br>- Kaitiakitanga over the resource source</td>
                                <td>- Global extraction of raw materials<br>- Tool is a mass-produced commodity<br>- Created in factories for mass market<br>- Resource source is often exploited</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Analysis & Reflection</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: Identifying Core Values</h3>
                        <p>Looking at the chart, what are 2-3 core values or principles that seem to drive Māori innovation? What are 2-3 core values that drive modern innovation?</p>
                        <div class="answer-space">
                            <p><strong>Māori Innovation Values: </strong></p>
                            <div class="answer-lines"></div>
                            <p><strong>Modern Innovation Values:</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 2: Strengths and Weaknesses</h3>
                        <p>Choose one domain from the chart. What are the main strengths of the Māori approach in that domain? What are its weaknesses? What about the modern approach?</p>
                        <div class="answer-space">
                            <p><strong>Chosen Domain:</strong> ____________________</p>
                            <p><strong>Māori Approach Strengths/Weaknesses:</strong></p>
                            <div class="answer-lines"></div>
                            <p><strong>Modern Approach Strengths/Weaknesses:</strong></p>
                            <div class="answer-lines"></div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3>Activity 3: The Best of Both Worlds?</h3>
                        <p>Imagine you are designing a new technology or system for one of the domains. How could you combine the principles of both Māori and modern innovation to create a better, more sustainable, and more equitable solution?</p>
                        <div class="answer-space">
                            <p><strong>Domain & New Idea: </strong></p>
                            <div class="answer-lines"></div>
                            <p><strong>How it combines both approaches:</strong></p>
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

export default Unit2InnovationDomainsComparison
