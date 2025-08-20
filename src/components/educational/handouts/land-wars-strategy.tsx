import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface LandWarsStrategyProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const LandWarsStrategy: React.FC<LandWarsStrategyProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="land-wars-strategy">
      <Card title="The Strategy of the Land Wars | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Strategy of the Land Wars | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">He Pakanga Whakaaro: The Strategy of the Aotearoa Wars</h1>
                <p class="page-subtitle">Beyond the Battlefield: A Clash of Strategies</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">A War of Wits</h2>
                    <p>The Aotearoa Wars of the 19th century were not just a series of chaotic battles. They were a strategic contest between two vastly different military traditions. To view Māori simply as "brave warriors" is to miss their brilliance as strategists, engineers, and tacticians who repeatedly out-thought a global superpower.</p>
                </div>
            </section>
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Key Strategic Innovations</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">1. The "Modern Pā": The Artillery-Proof Fortress</h3>
                        <p>When the British arrived with cannons, the high-hill pā became obsolete. In response, Māori engineers designed a new type of pā. Built on flat land, it featured deep trenches, anti-artillery bunkers, and camouflaged palisades. These fortresses were designed to absorb cannon fire and draw the British forces into a deadly, close-quarters fight. The British were shocked by their effectiveness.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">2. Guerrilla Warfare: The Strategy of Tītokowaru</h3>
                        <p>Riwha Tītokowaru, a leader from Ngāti Ruanui, perfected a hit-and-run strategy. He refused to engage the British in large, set-piece battles where they had the advantage. Instead, he launched surprise raids on their supply lines and forts, causing maximum disruption with minimum casualties. He used his deep knowledge of the land to appear and disappear, creating fear and uncertainty among the colonial troops.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">3. Psychological Warfare: The Empty Pā</h3>
                        <p>At the famous battle of Ruapekapeka, Māori built an incredibly complex fortress. The British spent weeks bombarding it. When they finally stormed the pā, they found it mostly empty. The defenders had slipped out the back through a series of hidden trenches and escape routes, leaving the British to capture a worthless position at great cost. This was a strategic victory designed to exhaust the enemy's resources and morale.</p>
                    </div>
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //nzhistory.govt.nz/war/new-zealand-wars" target="_blank" rel="noopener noreferrer">NZ History - The New Zealand Wars</a></li>
                        <li><a href="https://teara.govt.nz/en/new-zealand-wars" target="_blank" rel="noopener noreferrer">Te Ara - The Encyclopedia of New Zealand: The New Zealand Wars</a></li>
                        <li><a href="https://www.youtube.com/watch?v=p_g_N3_1-nQ" target="_blank" rel="noopener noreferrer">RNZ: The New Zealand Wars</a></li>
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

export default LandWarsStrategy
