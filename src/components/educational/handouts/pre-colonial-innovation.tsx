import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface PreColonialInnovationProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const PreColonialInnovation: React.FC<PreColonialInnovationProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="pre-colonial-innovation">
      <Card title="Pre-Colonial Innovation" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Pre-Colonial Innovation</h1>
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
            <section class="mb-6">
                <div class="bg-green-50 p-4 rounded-xl border border-green-200">
                    <h2 class="text-xl font-bold text-green-800 mb-2" class="wiley-section-title">Science and Survival</h2>
                    <p class="text-gray-700">Long before European arrival, Aotearoa was a hub of sophisticated technology and engineering. Māori innovation was driven by need, shaped by the environment, and guided by mātauranga Māori. This was not primitive survival it was a story of advanced adaptation.</p>
                </div>
        
            </section>
            <section class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Domains of Innovation</h2>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-cyan-700">1. Pā Construction: Defensive Engineering</h3>
                        <p class="mt-2 text-gray-700">Pā were far more than simple forts. They were complex, multi-layered defensive systems featuring terraces, trenches, and palisades. Their design showed a deep understanding of physics, engineering, and military strategy, often built on strategically chosen hills to maximize defensibility.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-cyan-700">2. Horticulture: The Kūmara Gardens</h3>
                        <p class="mt-2 text-gray-700">Māori adapted the tropical kūmara to a much cooler climate. They developed innovative techniques, such as using sand and gravel to change the soil temperature and improve drainage, creating vast, successful gardens that fed large communities. This was a major feat of agricultural science.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-cyan-700">3. Waka Hourua: Oceanic Navigation</h3>
                        <p class="mt-2 text-gray-700">The double-hulled canoe, or waka hourua, was a masterpiece of naval architecture. These vessels were capable of sailing thousands of kilometres across the open Pacific. Their design, combined with the sophisticated understanding of stars and currents, represents one of the greatest achievements in human exploration.</p>
                    </div>
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //teara.govt.nz/en/maori-technology-and-innovation" target="_blank" rel="noopener noreferrer">Te Ara - The Encyclopedia of New Zealand: Māori Technology and Innovation</a></li>
                        <li><a href="https://www.youtube.com/watch?v=s4-2-1-v-aE" target="_blank" rel="noopener noreferrer">Useful Charts: Polynesian Navigation</a></li>
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

export default PreColonialInnovation
