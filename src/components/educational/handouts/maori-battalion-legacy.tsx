import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MaoriBattalionLegacyProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MaoriBattalionLegacy: React.FC<MaoriBattalionLegacyProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="maori-battalion-legacy">
      <Card title="The Legacy of the Māori Battalion | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Legacy of the Māori Battalion | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">"Ake Ake Kia Kaha E!": The Legacy of the 28th (Māori) Battalion</h1>
                <p class="page-subtitle">Service, Sacrifice, and the Fight for Citizenship</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">The Price of Citizenship</h2>
                    <p>During World War II, thousands of Māori men volunteered to fight for New Zealand. They formed the 28th (Māori) Battalion, which became one of the most celebrated and feared infantry units in the Allied forces. Their service was driven by a complex mix of loyalty, warrior tradition (mana), and the belief that their sacrifice on the battlefield would earn them equal citizenship and respect back home in Aotearoa.</p>
                </div>
            </section>
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">A Paradox of Service</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Fighting for Freedom Abroad</h3>
                        <p>The Battalion fought with incredible bravery in Greece, Crete, North Africa, and Italy. They earned a formidable reputation for their courage and skill in close-quarters combat. Their motto, "Ake Ake Kia Kaha E!" (For ever and ever, be strong!), embodied their fierce determination.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Fighting for Rights at Home</h3>
                        <p>When the soldiers returned, they were often denied the same rights and opportunities as their Pākehā comrades. Many were unable to get loans to buy farms or houses, and they returned to a society where racial discrimination was still common. This created a bitter paradox: they had fought against tyranny overseas, only to face injustice in their own homeland.</p>
                    </div>
                </div>
            </section>
             <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Thinking</h2>
                <div class="question-block">
                    <p><strong>The government was reluctant to create a separate Māori battalion. Why do you think Māori leaders pushed so hard for it? What did having their own battalion represent?</p>
                    
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //www.28maoribattalion.org.nz/" target="_blank" rel="noopener noreferrer">28th Māori Battalion Official Website</a></li>
                        <li><a href="https://teara.govt.nz/en/28-maori-battalion" target="_blank" rel="noopener noreferrer">Te Ara - The Encyclopedia of New Zealand</a></li>
                        <li><a href="https://nzhistory.govt.nz/war/maori-in-second-world-war/maori-battalion" target="_blank" rel="noopener noreferrer">NZ History - The 28th (Māori) Battalion</a></li>
                    </ul>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default MaoriBattalionLegacy
