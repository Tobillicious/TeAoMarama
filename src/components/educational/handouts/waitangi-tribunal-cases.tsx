import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface WaitangiTribunalCasesProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const WaitangiTribunalCases: React.FC<WaitangiTribunalCasesProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="waitangi-tribunal-cases">
      <Card title="Key Cases of the Waitangi Tribunal" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Key Cases of the Waitangi Tribunal</h1>
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
                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h2 class="text-xl font-bold text-indigo-800 mb-2" class="wiley-section-title">A Forum for Justice</h2>
                    <p class="text-gray-700">Established in 1975, the Waitangi Tribunal is a permanent commission of inquiry. Its purpose is to hear claims brought by Māori relating to breaches of the promises made in the Treaty of Waitangi. The Tribunal's findings are not binding, but its reports have had a profound influence on law, policy, and the process of reconciliation in Aotearoa.</p>
                </div>
        
            </section>
            <section class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Landmark Reports</h2>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg">The Te Reo Māori Report (1986)</h3>
                        <p class="mt-2 text-gray-700">This groundbreaking report found that Te Reo Māori was a taonga (treasure) that the Crown was obligated to protect under the Treaty. The Tribunal recommended a range of measures to protect and promote the language. This led directly to Te Reo Māori becoming an official language of New Zealand in 1987.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg">The Ngāi Tahu Report (1991)</h3>
                        <p class="mt-2 text-gray-700">This was one of the largest and most complex claims, covering most of the South Island. The Tribunal found that the Crown had acted unconscionably in its land dealings with the Ngāi Tahu iwi, failing to set aside the promised reserves. This report paved the way for a major Treaty settlement in 1998.</p>
                    </div>
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //waitangitribunal.govt.nz/claims/remedies-and-settlements/" target="_blank" rel="noopener noreferrer">Waitangi Tribunal - Remedies and Settlements</a></li>
                        <li><a href="https://nzhistory.govt.nz/politics/treaty-of-waitangi/waitangi-tribunal-and-treaty-settlements" target="_blank" rel="noopener noreferrer">NZ History - The Waitangi Tribunal and Treaty Settlements</a></li>
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

export default WaitangiTribunalCases
