import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface DataSovereigntyMaoriProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const DataSovereigntyMaori: React.FC<DataSovereigntyMaoriProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="data-sovereignty-maori">
      <Card title="Māori Data Sovereignty | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Māori Data Sovereignty | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Te Mana Raraunga: Māori Data Sovereignty</h1>
                <p class="page-subtitle">Who Owns Our Information?</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">What is Data Sovereignty?</h2>
                    <p>Māori data sovereignty is the inherent right of Māori to govern the collection, ownership, and application of their own data. It asserts that data about Māori people, their lands, and their culture is a taonga (treasure) and must be protected and controlled by Māori, for Māori.</p>
                </div>
            </section>
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Why Does it Matter for AI?</h2>
                <div class="technique-box">
                    <p>Large Language Models are trained on data. If Māori data (e.g., Te Reo Māori, historical records, cultural stories) is used to train an AI without permission or context, the benefits of that AI may not flow back to the Māori community. There is a risk that corporations could profit from Māori knowledge while the community itself loses control over how its cultural treasures are used. Data sovereignty is about ensuring that Māori decide how their data is used and that they share in the benefits.</p>
                </div>
            </section>
             <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Thinking</h2>
                <div class="question-block">
                    <p><strong>Imagine a company wants to create an AI that can translate ancient Māori chants. What are the potential benefits and risks of this project from a data sovereignty perspective?</p>
                    
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //www.temanararaunga.maori.nz/" target="_blank" rel="noopener noreferrer">Te Mana Raraunga - Māori Data Sovereignty Network</a></li>
                        <li><a href="https://www.data.govt.nz/maori-data-sovereignty/" target="_blank" rel="noopener noreferrer">Māori Data Sovereignty - data.govt.nz</a></li>
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

export default DataSovereigntyMaori
