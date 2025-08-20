import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2MaoriBattalionLegacyProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2MaoriBattalionLegacy: React.FC<Unit2MaoriBattalionLegacyProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-maori-battalion-legacy">
      <Card title="Māori Battalion Legacy Expansion - Service, Identity, and Urbanisation | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Māori Battalion Legacy Expansion - Service, Identity, and Urbanisation | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">The Māori Battalion Legacy Expanded</h1>
                <p class="page-subtitle">How Service in WWII Shaped Modern Māori Identity and Accelerated Urbanisation</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">More Than a War Story</h2>
                <p>
The story of the 28th (Māori) Battalion is one of legendary courage and sacrifice on the battlefields of Europe and North Africa. But their impact stretched far beyond the war. The Battalion became a powerful symbol of Māori pride and capability, and the experiences of its soldiers profoundly shaped the future of Māori society. Their service acted as a catalyst, accelerating the great urban migration and forging a new, confident Māori identity for the post-war era.
                </p>
            </article>

            <!-- Key Impacts Section -->
            <section class="mb-4">
                <div class="impacts-grid">
                    
                    <div class="impact-card">
                        <div class="impact-header">
                            <h3>A New Sense of Mana and Confidence</h3>
                        </div>
                        <div class="impact-content">
                            <p>The Battalion's fierce reputation and battlefield successes gave Māori a renewed sense of collective pride and mana. They had proven themselves equal to, and often better than, any soldiers in the world. This created a generation of young men who were confident, worldly, and less willing to accept the second-class status they were often assigned back home. They returned with new skills, new expectations, and a belief in their own potential.</p>
                        </div>
                    </div>

                    <div class="impact-card">
                        <div class="impact-header">
                            <h3>The "Last Great Adventure" and the Pull of the City</h3>
                        </div>
                        <div class="impact-content">
                            <p>For many young Māori, joining the Battalion was a chance to escape the confines of rural life. The war exposed them to new countries, cultures, and technologies. After experiencing the cities of Europe and the Middle East, returning to a quiet rural life was difficult for many. The skills they had learned in the army – as drivers, mechanics, and leaders – were in high demand in the growing cities of post-war New Zealand. The Battalion experience effectively acted as a bridge between the old world and the new, making the move to the city seem less daunting.</p>
                        </div>
                    </div>

                    <div class="impact-card">
                        <div class="impact-header">
                            <h3>Pan-Tribal Identity: From Iwi to "Māori"</h3>
                        </div>
                        <div class="impact-content">
                            <p>The Battalion was organised along tribal lines (A, B, C, and D companies), but in the heat of battle, men from different iwi had to rely on each other for survival. This forged powerful bonds that transcended tribal affiliations. They were not just Ngāpuhi or Ngāti Porou they were the Māori Battalion. This experience helped to foster a shared, pan-tribal Māori identity that became crucial for political and social organisation in the post-war urban environment.</p>
                        </div>
                    </div>

                    <div class="impact-card">
                        <div class="impact-header">
                            <h3>The Returned Serviceman's Paradox</h3>
                        </div>
                        <div class="impact-content">
                            <p>Despite their heroic service, many returned Māori servicemen faced a difficult reality. They were celebrated as warriors but often denied the same access to housing loans, farm ballots, and rehabilitation support as their Pākehā comrades. This injustice, experienced by a generation of confident and capable young men, became a major catalyst for the Māori protest movements of the 1960s and 70s. The very soldiers who had fought for freedom overseas came home to find they had to fight for equality in their own land.</p>
                        </div>
                    </div>

                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Analysis and Connection</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: A Bridge to the City</h3>
                        <p>In your own words, explain how the experience of serving in the Māori Battalion could have made a young man more likely to move to the city after the war.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 2: The Seeds of Protest</h3>
                        <p>The "Returned Serviceman's Paradox" describes the unfair treatment many Māori soldiers received after the war. How could this experience have contributed to the rise of Māori activism in the decades that followed?</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 3: A National Symbol</h3>
                        <p>The Māori Battalion remains a powerful symbol in New Zealand today. What do you think the Battalion represents to Māori? What does it represent to Pākehā? Are these the same? Discuss.</p>
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

export default Unit2MaoriBattalionLegacy
