import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2FortificationEngineeringProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2FortificationEngineering: React.FC<Unit2FortificationEngineeringProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-fortification-engineering">
      <Card title="Fortification Engineering - A Technical Analysis of Pā Design | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Fortification Engineering - A Technical Analysis of Pā Design | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Fortification Engineering Handout</h1>
                <p class="page-subtitle">A Technical Analysis of Gunfighter Pā Design</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Pā: A Fortress of Innovation</h2>
                <p>
The gunfighter pā was one of the most sophisticated and effective fortification systems of its time, anywhere in the world. It was not a single design, but a set of engineering principles that could be adapted to any landscape. This handout provides a technical analysis of the key design features of the gunfighter pā and compares it to the standard European fortifications of the same era.
                </p>
            </article>

            <!-- Technical Analysis Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Anatomy of a Gunfighter Pā</h2>
                <div class="technical-diagram-container">
                    <!-- Placeholder for a diagram -->
                    <div class="diagram-placeholder">
                        <p><strong>[Diagram: Cross-section of a gunfighter pā, showing the features below]</strong></p>
                        <p>Features to illustrate: 1. Palisade with flax screen, 2. Firing trench, 3. Communication trench, 4. Anti-artillery bunker (rua), 5. Earth ramparts.</p>
                    </div>
                </div>
                <div class="technical-features-grid">
                    <div class="feature-card">
                        <h4>1. The Palisade (Tūwatawata)</h4>
                        <p>The outer wall was not a solid barrier. It was a screen designed to absorb impact. It was often covered in woven flax (harakeke), which caught cannonballs and musket shots, preventing deadly wood splinters. Gaps were left for defenders to fire through.</p>
                    </div>
                    <div class="feature-card">
                        <h4>2. Firing Trenches (Aramoana)</h4>
                        <p>Immediately behind the palisade was a deep trench where warriors could stand and fire through the gaps, protected from enemy fire. This allowed for a continuous and well-aimed defence.</p>
                    </div>
                    <div class="feature-card">
                        <h4>3. Communication Trenches</h4>
                        <p>A network of deeper trenches connected the firing lines to the rest of the pā, allowing warriors, ammunition, and information to move safely and quickly without being exposed to enemy fire.</p>
                    </div>
                    <div class="feature-card">
                        <h4>4. Anti-Artillery Bunkers (Rua)</h4>
                        <p>These were the pā's secret weapon. Deep, timber-reinforced bunkers were dug into the ground, where defenders could shelter during an artillery bombardment. When the cannons stopped, they would emerge unharmed to defend the pā against the infantry assault.</p>
                    </div>
                    <div class="feature-card">
                        <h4>5. Earth Ramparts</h4>
                        <p>The soil dug from the trenches and bunkers was piled up into thick earth walls. These were incredibly effective at absorbing cannon fire, unlike the stone walls of European forts which would shatter and create deadly shrapnel.</p>
                    </div>
                    <div class="feature-card">
                        <h4>6. Strategic Layout</h4>
                        <p>The pā was often designed as a trap. There was rarely a single, obvious entrance. Instead, attackers were channelled into narrow, exposed pathways (kill zones) where they would be caught in crossfire from multiple angles.</p>
                    </div>
                </div>
            </section>

            <!-- Comparison Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Pā vs. European Fort: A Comparison</h2>
                <div class="comparison-table-container">
                    <table class="comparison-table full-width">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Māori Gunfighter Pā</th>
                                <th>European Fort (19th Century)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Main Material</strong></td>
                                <td>Earth, timber, flax (flexible, absorbent)</td>
                                <td>Stone, brick (rigid, brittle)</td>
                            </tr>
                            <tr>
                                <td><strong>Defence against Artillery</strong></td>
                                <td>Absorbs impact. Bunkers provide total protection.</td>
                                <td>Walls shatter, creating deadly shrapnel.</td>
                            </tr>
                            <tr>
                                <td><strong>Defence against Infantry</strong></td>
                                <td>Complex trench system with overlapping fields of fire.</td>
                                <td>High walls and bastions for clear firing lines.</td>
                            </tr>
                            <tr>
                                <td><strong>Cost & Construction</strong></td>
                                <td>Low material cost, high labour. Built quickly by the community.</td>
                                <td>High material cost, high labour. Took years to build.</td>
                            </tr>
                            <tr>
                                <td><strong>Purpose</strong></td>
                                <td>Often a temporary tactical position, designed to be abandoned. A trap.</td>
                                <td>A permanent symbol of power, designed to be held at all costs.</td>
                            </tr>
                            <tr>
                                <td><strong>Weakness</strong></td>
                                <td>Vulnerable to siege and starvation if supply lines are cut.</td>
                                <td>Vulnerable to modern artillery internal spaces are exposed.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Engineering Analysis</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: Form Follows Function</h3>
                        <p>Explain how the materials used in a gunfighter pā (earth, wood, flax) were perfectly suited to defending against the specific weapons used by the British army.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 2: A New Way of Thinking</h3>
                        <p>The British military was used to attacking fortresses that were designed to be held. How did the Māori strategy of building pā as disposable traps challenge the British way of thinking about warfare?</p>
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

export default Unit2FortificationEngineering
