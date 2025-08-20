import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2WarsStrategyAnalysisProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2WarsStrategyAnalysis: React.FC<Unit2WarsStrategyAnalysisProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-wars-strategy-analysis">
      <Card title="Wars Strategy Analysis - Conventional vs. Guerrilla Warfare in Aotearoa | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Wars Strategy Analysis - Conventional vs. Guerrilla Warfare in Aotearoa | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Wars Strategy Analysis</h1>
                <p class="page-subtitle">Conventional vs. Guerrilla Warfare in the Aotearoa Wars</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">Two Armies, Two Worlds</h2>
                <p>
The Aotearoa Wars were a clash of two fundamentally different military systems. The British colonial forces fought a conventional war, based on European traditions of open battles, sieges, and direct confrontation. Māori forces, while capable of fighting on conventional terms, often chose to fight a guerrilla war, using their knowledge of the land and their cultural strengths to their advantage. This handout analyzes the key differences between these two strategic approaches.
                </p>
            </article>

            <!-- Comparison Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Strategic Comparison</h2>
                <div class="comparison-table-container">
                    <table class="comparison-table full-width">
                        <thead>
                            <tr>
                                <th>Strategic Element</th>
                                <th>British Conventional Warfare</th>
                                <th>Māori Guerrilla Warfare</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Primary Goal</strong></td>
                                <td>Capture and hold territory destroy the enemy army in a decisive battle.</td>
                                <td>Undermine the enemy's will to fight exhaust their resources and morale.</td>
                            </tr>
                            <tr>
                                <td><strong>Key Tactics</strong></td>
                                <td>Massed infantry formations, artillery bombardment, sieges of fortified positions.</td>
                                <td>Ambushes, surprise raids, strategic retreats, psychological warfare.</td>
                            </tr>
                            <tr>
                                <td><strong>Use of Terrain</strong></td>
                                <td>Sought open ground for clear lines of fire and troop manoeuvres. The landscape was an obstacle to overcome.</td>
                                <td>Used dense bush, swamps, and hills for cover, concealment, and tactical advantage. The landscape was a weapon.</td>
                            </tr>
                            <tr>
                                <td><strong>Supply Lines</strong></td>
                                <td>Long, vulnerable supply lines from main bases. Required huge logistical effort.</td>
                                <td>Lived off the land. Supply lines were short, flexible, or non-existent.</td>
                            </tr>
                            <tr>
                                <td><strong>Command Structure</strong></td>
                                <td>Hierarchical and rigid. Orders came from the top down.</td>
                                <td>Decentralised and flexible. Individual chiefs and warriors had high levels of autonomy.</td>
                            </tr>
                            <tr>
                                <td><strong>Cultural Factors</strong></td>
                                <td>Based on a European code of "gentlemanly" warfare, which they often failed to uphold.</td>
                                <td>Based on concepts of mana, utu (reciprocity), and kaitiakitanga (guardianship of the land).</td>
                            </tr>
                            <tr>
                                <td><strong>Definition of "Victory"</strong></td>
                                <td>Taking the enemy's fortress, flying the flag over their land.</td>
                                <td>Surviving to fight another day inflicting disproportionate costs on the enemy maintaining mana.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Strategic Thinking</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: The Underdog's Advantage</h3>
                        <p>Guerrilla warfare is often the strategy of the weaker force. How did Māori guerrilla tactics turn the British army's greatest strengths (their numbers, their heavy weapons, their formal training) into weaknesses?</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 2: The Cultural Dimension</h3>
                        <p>How did cultural factors influence the way each side fought? Choose one cultural factor for each side (e.g., the British idea of a "decisive battle" or the Māori concept of mana) and explain how it shaped their strategic decisions.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 3: Why Not Always Guerrilla?</h3>
                        <p>Māori were masters of guerrilla warfare, but they also chose to build and defend pā in more conventional battles. Why might they have chosen to sometimes fight a more conventional style of war, even though it played to British strengths?</p>
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

export default Unit2WarsStrategyAnalysis
