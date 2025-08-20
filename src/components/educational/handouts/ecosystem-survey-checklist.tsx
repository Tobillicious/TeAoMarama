import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface EcosystemSurveyChecklistProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const EcosystemSurveyChecklist: React.FC<EcosystemSurveyChecklistProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="ecosystem-survey-checklist">
      <Card title="Ecosystem Survey Checklist (Y7)" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Ecosystem Survey Checklist (Y7)</h1>
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
        <h1 class="wiley-hero-title">Ecosystem Survey Checklist</h1>
        <p>Use with the Kaitiakitanga Field Journal. Tally observations and note evidence.</p>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Observed?</th>
                    <th>Evidence/Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Water clarity (clear / cloudy / algal bloom)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Native plants present (list)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Introduced/invasive species (list)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Invertebrates (e.g., kōura, kākahi, mayfly)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Birdlife (species, behaviour)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Human impacts (litter, erosion, runoff, barriers)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Evidence of restoration (planting, fencing, traps)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Tikanga upheld (karakia, access permission, respect)</td>
                    <td>[ ]</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default EcosystemSurveyChecklist
