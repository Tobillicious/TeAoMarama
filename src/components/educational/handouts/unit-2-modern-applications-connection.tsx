import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2ModernApplicationsConnectionProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2ModernApplicationsConnection: React.FC<Unit2ModernApplicationsConnectionProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-modern-applications-connection">
      <Card title="Modern Applications Connection Guide - Ancient Wisdom, Modern Solutions | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Modern Applications Connection Guide - Ancient Wisdom, Modern Solutions | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Modern Applications Connection Guide</h1>
                <p class="page-subtitle">How Traditional Māori Principles Can Solve Modern Problems</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">Ancient Wisdom for Future Challenges</h2>
                <p>
Some of the most cutting-edge ideas in modern technology and environmental design are not new at all. They are concepts that have been central to indigenous knowledge systems, like mātauranga Māori, for centuries. This guide explores how three of these "modern" ideas—Sustainability, Biomimicry, and the Circular Economy—are deeply embedded in traditional Māori innovation.
                </p>
            </article>

            <!-- Connections Section -->
            <section class="mb-4">
                <div class="connections-grid">
                    <!-- Sustainability -->
                    <div class="connection-card">
                        <div class="connection-header sustainability">
                            <h3>Sustainability</h3>
                        </div>
                        <div class="connection-content">
                            <p><strong>Modern Definition: </strong> Meeting the needs of the present without compromising the ability of future generations to meet their own needs.</p>
                            <hr>
                            <h4>The Māori Principle: Kaitiakitanga</h4>
                            <p>Kaitiakitanga is the principle of guardianship and protection. It's a deep-seated responsibility to care for the sky, the sea, and the land. This is not just about being "eco-friendly" it's a sacred duty that sees the environment and people as deeply interconnected.</p>
                            
                            <h4>Examples in Action: </h4>
                            <ul>
                                <li><strong>Rāhui:</strong> A temporary ban on harvesting a resource to allow it to recover. This is a dynamic, real-time system of resource management.</li>
                                <li><strong>Maramataka: </strong> The Māori lunar calendar dictates the best times for planting, fishing, and hunting, ensuring activities are in harmony with natural cycles.</li>
                                <li><strong>Whakapapa: </strong> By understanding that mountains, rivers, and forests are ancestors, there is a natural incentive to ensure their health for future generations (mokopuna).</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Biomimicry -->
                    <div class="connection-card">
                        <div class="connection-header biomimicry">
                            <h3>Biomimicry</h3>
                        </div>
                        <div class="connection-content">
                            <p><strong>Modern Definition: </strong> An approach to innovation that seeks sustainable solutions to human challenges by emulating nature's time-tested patterns and strategies.</p>
                            <hr>
                            <h4>The Māori Principle: Learning from Nature</h4>
                            <p>Māori innovation comes from generations of close observation of the natural world. Rather than trying to dominate nature, the goal was to understand its systems and patterns and design technologies that worked in harmony with them.</p>
                            
                            <h4>Examples in Action: </h4>
                            <ul>
                                <li><strong>Pā fortifications:</strong> The defensive banks and ditches of a pā were often designed to mimic the contours of the land, using the natural landscape to enhance their effectiveness.</li>
                                <li><strong>Bird-wing sails: </strong> The design of some waka sails was inspired by the shape of bird wings, creating an efficient and resilient structure for catching the wind.</li>
                                <li><strong>Rongoā Māori: </strong> The development of herbal medicine is based on centuries of observing the effects of different plants on both animals and people.</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Circular Economy -->
                    <div class="connection-card">
                        <div class="connection-header circular-economy">
                            <h3>Circular Economy</h3>
                        </div>
                        <div class="connection-content">
                            <p><strong>Modern Definition:</strong> A model of production and consumption which involves sharing, leasing, reusing, repairing, refurbishing and recycling existing materials and products as long as possible. The aim is to eliminate waste.</p>
                            <hr>
                            <h4>The Māori Principle: Nothing is Wasted</h4>
                            <p>In a traditional Māori worldview, there is no concept of "waste." Every part of a resource has a purpose, and materials are treated as precious taonga. The goal is to use and reuse everything, ensuring the life-force (mauri) of the resource is respected.</p>
                            
                            <h4>Examples in Action: </h4>
                            <ul>
                                <li><strong>Harakeke (Flax):</strong> Every part of the plant is used. The leaves (rau) are for weaving, the fibre (muka) for cordage, the stalk (kōrari) for rafts, and the nectar (wai kōrari) as a sweetener.</li>
                                <li><strong>Tool-making: </strong> When a stone adze (toki) broke, the pieces were not thrown away. They were reshaped into smaller tools, drills, or scraping implements.</li>
                                <li><strong>Food Storage: </strong> Kūmara were stored in specially designed underground pits (rua) that used natural materials and geothermal heat to preserve food for long periods, preventing spoilage and waste.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Design Challenge</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity: Design a Modern Solution with Ancient Principles</h3>
                        <p>Choose a modern environmental problem and design a solution inspired by one or more of the Māori principles discussed above (Kaitiakitanga, Learning from Nature, Nothing is Wasted).</p>
                        
                        <div class="answer-space">
                            <p><strong>1. Modern Problem to Solve: </strong> (e.g., Plastic pollution in oceans, fast fashion waste, urban food deserts)</p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>2. Māori Principle(s) to Apply: </strong></p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>3. Your Solution:</strong> (Describe your idea. How does it work? What makes it different from current solutions?)</p>
                            <div class="answer-lines"></div>
                            
                            <p><strong>4. How does your solution reflect the Māori principle(s) you chose?</strong></p>
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

export default Unit2ModernApplicationsConnection
