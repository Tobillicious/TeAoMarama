import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface FutureOfTourismComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const FutureOfTourismComprehensionHandout: React.FC<FutureOfTourismComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="future-of-tourism-comprehension-handout">
      <Card title="The Future of Tourism Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Future of Tourism Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: The Future of Tourism</h1>
                <p class="page-subtitle">asTTle-Style Analysis of a Key Industry</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">Reimagining Tourism in Aotearoa</h2>
                <p>
Before 2020, tourism was New Zealand's largest export industry, contributing nearly \$41 billion to the economy and supporting almost 8.4% of the national workforce. The model was largely based on high volume, with millions of international visitors flocking to iconic destinations like Queenstown and Milford Sound. However, this "high-volume" approach placed significant strain on local infrastructure and the environment. Overcrowding, freedom camping issues, and the carbon footprint of long-haul travel led many to question the sustainability of this model.
                </p>
                <p>
The global pandemic forced a hard reset. With borders closed, New Zealand's tourism industry had to pivot to a domestic-only market. This period of disruption, while economically painful, provided a unique opportunity to rethink the future. The concept of "regenerative tourism" has gained traction, shifting the focus from simply sustaining the environment to actively improving it. This model encourages visitors to connect more deeply with local communities and culture, and to leave a place better than they found it. Examples include tourists participating in native tree planting days or contributing to local conservation projects as part of their visit.
                </p>
                <p>
As international travel resumes, the key challenge is balancing economic recovery with these new sustainable ideals. Some operators are targeting "high-quality" tourists—visitors who stay longer, spend more, and engage in lower-impact activities. This could mean fewer visitors overall, but a greater economic return per person. However, this approach has been criticised as potentially elitist, making New Zealand a destination only for the wealthy. The government and industry must now navigate this complex path, aiming to build a resilient, sustainable, and inclusive tourism model that enriches both the visitors and the unique environment of Aotearoa.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. What was a major negative consequence of the pre-2020 high-volume tourism model?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) It was not popular with international visitors.</div>
                            <div class="question-option">B) It placed significant strain on infrastructure and the environment.</div>
                            <div class="question-option">C) It did not contribute much to the economy.</div>
                            <div class="question-option">D) It only focused on domestic tourists.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) The text states tourism supported 8.4% of the workforce. If the total workforce was 2.5 million people, approximately how many jobs were supported by tourism?</p>
                         <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. What is the core idea behind "regenerative tourism"?</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) To stop international tourism completely.</div>
                            <div class="question-option">B) To return to the high-volume model as quickly as possible.</div>
                            <div class="question-option">C) For tourists to help improve the places they visit.</div>
                            <div class="question-option">D) To only allow tourists to visit major cities.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) Why might the strategy of targeting "high-quality" tourists be considered "elitist"?</p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) Do you think it is possible to build a tourism model that is economically successful, environmentally sustainable, AND inclusive? Explain your reasoning, using ideas from the text.</p>
                        <div class="answer-space answer-space-lg">

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

export default FutureOfTourismComprehensionHandout
