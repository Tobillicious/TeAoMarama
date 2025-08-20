import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface KaitiakitangaFieldJournalProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const KaitiakitangaFieldJournal: React.FC<KaitiakitangaFieldJournalProps> = (_{
culturalContext = "Environmental guardianship and kaitiakitanga", 
_yearLevel = "Year 7-9", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="kaitiakitanga-field-journal">
      <Card title="Kaitiakitanga Field Journal (Y7)" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Kaitiakitanga Field Journal (Y7)</h1>
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
        <h1 class="heading" class="wiley-hero-title">Kaitiakitanga Field Journal</h1>
        <p class="small">Use this journal to record observations and decisions during your ecosystem study. Be
respectful and follow local tikanga.</p>
        <section class="grid">
            <div class="box">
                <h3 class="heading">Site & Conditions</h3>
                <p>Date/Time: __________ Weather: __________ Tide/Flow: __________</p>
                <p>Location (English & Māori names): ____________________________________</p>
            </div>
            <div class="box">
                <h3 class="heading">Roles & Whakawhanaungatanga</h3>
                <p>Our group roles: ___________________________________________</p>
                <p>Karakia / safety notes: ______________________________________</p>
            </div>
        </section>
        <section class="box" style="margin-top:1rem">
            <h3 class="heading">Observations (biotic & abiotic)</h3>
            <p style="min-height:220pxborder: 1px dashed #e1e5e9border-radius: var(--radius-md)padding: .5rem">Sketches, counts,;
tracks, plants, insects, water clarity, substrate, sounds, signs of stress...</p>
        </section>
        <section class="grid" style="margin-top: 1rem">
            <div class="box">
                <h3 class="heading">Food Web Notes</h3>
                <p>Key species and interactions (arrows for energy flow):</p>
                <div style="min-height:160pxborder: 1px dashed #e1e5e9border-radius: var(--radius-md)"></div>
            </div>
            <div class="box">
                <h3 class="heading">Kaitiaki Reflections</h3>
                <p>What responsibilities do we have here? Who should we consult (iwi/hapū, community)?</p>
                <div style="min-height: 160pxborder: 1px dashed #e1e5e9border-radius: var(--radius-md)"></div>
            </div>
        </section>
        <section class="box" style="margin-top:1rem">
            <h3 class="heading">Action Ideas</h3>
            <ul>
                <li>What evidence suggests a pressure or imbalance?</li>
                <li>What small actions could help (monitoring, restoration, behaviour change)?</li>
                <li>How will we uphold tikanga and community partnerships?</li>
            </ul>
        </section>
    ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default KaitiakitangaFieldJournal
