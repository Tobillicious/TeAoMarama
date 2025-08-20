import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Unit2ColonialMaoriPerspectiveComparisonProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Unit2ColonialMaoriPerspectiveComparison: React.FC<Unit2ColonialMaoriPerspectiveComparisonProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="unit-2-colonial-maori-perspective-comparison">
      <Card title="Perspective Comparison - Colonial vs. Māori Views of the Aotearoa Wars | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Perspective Comparison - Colonial vs. Māori Views of the Aotearoa Wars | Te Kete Ako</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Colonial vs. Māori Perspective Comparison</h1>
                <p class="page-subtitle">Analysing Two Views of the Same Event in the Aotearoa Wars</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">History is Written by the... Who?</h2>
                <p>
History is not a single story. It is a collection of perspectives, and the "official" version often depends on who held the power and the pen. During the Aotearoa Wars, the same events were described in vastly different ways by colonial newspapers and by Māori oral histories. This activity asks you to be a critical historian by comparing two primary source accounts of the same event and analysing them for bias, purpose, and propaganda.
                </p>
            </article>

            <!-- Comparison Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Case Study: The Battle of Rangiriri, 1863</h2>
                <div class="perspective-comparison-grid">
                    
                    <div class="perspective-card">
                        <div class="perspective-header colonial">
                            <h3>Colonial Perspective</h3>
                            <span>Source: The Daily Southern Cross (Newspaper), 24 November 1863</span>
                        </div>
                        <div class="perspective-content">
                            <blockquote class="primary-source-quote">
                                "A brilliant victory has been achieved by our gallant troops at Rangiriri. After a desperate struggle, the formidable rebel stronghold was stormed and taken. The enemy, who fought with the savage courage of their race, were completely routed. The Queen's flag now flies over their principal fortress, and a severe lesson has been taught to the misguided natives who dared to challenge British authority. The bravery of our soldiers, under the command of General Cameron, was beyond all praise. This decisive action will, we trust, bring a speedy conclusion to this unhappy rebellion."
                            </blockquote>
                        </div>
                    </div>

                    <div class="perspective-card">
                        <div class="perspective-header maori">
                            <h3>Māori Perspective</h3>
                            <span>Source: Oral account from a Waikato warrior, recorded in the 20th century</span>
                        </div>
                        <div class="perspective-content">
                            <blockquote class="primary-source-quote">
                                "We held the line for many hours. The soldiers' cannons tore at the earth, but our pā held strong. They sent their men forward, and we drove them back. They came again, and we drove them back again. We were not defeated. In the night, a white flag was raised by some of our old chiefs, against the wishes of the warriors. They believed the British would honour the flag and treat us as warriors. They were wrong. When the surrender was accepted, we were taken as prisoners, our lands were stolen, and our king was driven into exile. It was not a battle we lost, but a promise that was broken."
                            </blockquote>
                        </div>
                    </div>

                </div>
            </section>

            <!-- Activity Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Analysis</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <h3>Activity 1: Word Choice and Tone</h3>
                        <p>Identify 3-4 key words or phrases from each account that reveal the author's perspective and bias. How does the choice of words (e.g., "gallant troops" vs. "soldiers", "rebel stronghold" vs. "pā") shape the reader's understanding of the event?</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 2: Purpose and Propaganda</h3>
                        <p>What was the main purpose of the newspaper article? What was the purpose of the oral account? Is there evidence of propaganda (information, especially of a biased or misleading nature, used to promote a political cause or point of view) in either source? Explain.</p>
                        <div class="answer-space">
                            <div class="answer-lines"></div>
                        </div>
                    </div>
                    <div class="question-block">
                        <h3>Activity 3: Constructing a Fuller Picture</h3>
                        <p>Neither of these accounts is the "whole truth." As a historian, how would you use both of these sources together to create a more complete and nuanced understanding of what happened at Rangiriri?</p>
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

export default Unit2ColonialMaoriPerspectiveComparison
