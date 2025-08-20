import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface HakaComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const HakaComprehensionHandout: React.FC<HakaComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="haka-comprehension-handout">
      <Card title="The Role of Haka Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Role of Haka Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: The Power of Haka</h1>
                <p class="page-subtitle">An Exploration of Aotearoa's Most Famous Cultural Performance</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">More Than a "War Dance"</h2>
                <p>
For many around the world, haka is synonymous with the All Blacks. While the national rugby team has given haka a global stage, its roots and purposes are far deeper and more varied. Haka is a powerful and diverse form of Māori cultural expression. There are many types of haka, from the fierce <strong>haka peruperu</strong> performed with weapons on the battlefield, to the <strong>haka taparahi</strong> performed without weapons as a ceremonial challenge or welcome. Haka can be used to welcome distinguished guests (pōwhiri), to acknowledge great achievements, to mark funerals (tangi), or to express a political point. Each haka tells a story, expressing passion, identity, and unity through a combination of powerful words (kupu), energetic body movements (wiri), and fierce facial expressions (pūkana).
                </p>
                <p>
The performance of haka is central to Māori identity and is a highlight of national kapa haka competitions like Te Matatini. A full kapa haka group typically consists of up to 40 members, who train for years to perfect their synchronicity and storytelling. The performance is not just about aggression it is an outpouring of emotion, a vehicle for social and political commentary, and a way of honouring whakapapa (ancestry). The leader of the haka, the <strong>kaea</strong>, guides the group, and their knowledge and passion are crucial for a powerful performance. This demonstrates that haka is a disciplined art form requiring immense skill, knowledge, and respect.
                </p>
                <p>
The global visibility of haka has also sparked important conversations about cultural appropriation—the act of taking or using things from a culture that is not your own, without showing that you understand or respect this culture. When is it appropriate for non-Māori to perform haka? What is the difference between appreciation and exploitation? Schools, sports teams, and even the New Zealand Defence Force perform haka, but this is generally done with guidance from Māori elders (kaumātua) and with a deep respect for the tikanga (customs) involved. The challenge lies in ensuring that this taonga (treasure) is always treated with the reverence it deserves, and that its stories are not diluted or disrespected for commercial gain or entertainment.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <p><strong>1. What is the main purpose of this text?</strong></p>
                        <p>To explain that haka is a diverse and important cultural expression with many purposes beyond its use in sports.</p>
                    </div>

                    <div class="question-block">
                        <p><strong>2. (Numeracy) If a kapa haka group has 40 members and three-quarters (3/4) of them are female, how many female performers are in the group?</strong></p>
                         <p>(40 / 4) * 3 = 30 female performers.</p>
                    </div>

                    <div class="question-block">
                        <p><strong>3. What does the term "cultural appropriation" mean in the context of this article?</strong></p>
                        <p>Using elements of a culture, like haka, without understanding, respecting, or having permission to use them.</p>
                    </div>

                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) According to the text, what is the difference between a respectful performance of haka by a non-Māori group and a disrespectful one?</strong></p>
                        
                    </div>
                    
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) The text calls haka a "taonga" (treasure). Based on the information provided, explain why haka is considered such a valuable treasure to Māori.</strong></p>
                        
                    </div>
                </div>
            </section>

            <!-- Dynamic Recommendations Section -->
            <section class="recommendations-container" id="recommendations-container">
                <div class="recommendations-header">
                    <div>
                        <h2 class="recommendations-title" class="wiley-section-title">Explore Related Resources</h2>
                        <p class="recommendations-subtitle">Based on your interests and this content</p>
                    </div>
                </div>
                <div class="recommendations-grid" id="recommendations-grid">
                    <div class="recommendations-loading">Loading intelligent suggestions...</div>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default HakaComprehensionHandout
