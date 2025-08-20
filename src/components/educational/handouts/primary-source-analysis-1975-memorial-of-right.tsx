import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface PrimarySourceAnalysis1975MemorialOfRightProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const PrimarySourceAnalysis1975MemorialOfRight: React.FC<PrimarySourceAnalysis1975MemorialOfRightProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="primary-source-analysis-1975-memorial-of-right">
      <Card title="Primary Source Analysis: 1975 Memorial of Right" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Primary Source Analysis: 1975 Memorial of Right</h1>
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
                <a href="/arguments-of-tino-rangatiratanga-handout.html" class="breadcrumb">&larr Back to Case Study</a>
                <h1 class="page-title" class="wiley-hero-title">Primary Source Analysis: The 1975 Memorial of Right</h1>
                <p class="page-subtitle">He Mahi Tātaritanga (An Analysis Activity)</p>
            </div>
        

            <section class="mb-4">
                <div class="cultural-highlight">
                    <h2 class="section-title" class="wiley-section-title">He Whakamārama (Introduction)</h2>
                    <p>When Dame Whina Cooper and the marchers of the 1975 Land March arrived at Parliament, they did not come with empty hands. They carried a "Memorial of Right," a formal petition signed by thousands. This document was their evidence. It was a carefully constructed argument, grounded in law and history, designed to persuade the government to act.</p>
                    <p>Below are selected (recreated) excerpts from this powerful primary source. Your task is to use them to construct your own PEEL paragraph.</p>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Excerpts from the Memorial of Right</h2>
                <div class="technique-box">
                    <p><strong>Excerpt A: On the Treaty of Waitangi</strong><br>
                    <em>"...the Treaty of Waitangi, signed in 1840, guaranteed to the Māori people the full, exclusive, and undisturbed possession of their lands and estates, forests, and fisheries. This solemn promise, which forms the basis of this nation's laws, has been systematically eroded by subsequent legislation..."</em></p>
                </div>
                <div class="technique-box">
                    <p><strong>Excerpt B: On Land Alienation</strong><br>
                    <em>"...through such legislative devices as the Native Land Court, the Public Works Act, and other Crown purchasing policies, Māori land holdings have been reduced from 66 million acres in 1840 to fewer than 3 million acres today. This represents a loss of over 95% of our ancestral estate, often for minimal or no compensation..."</em></p>
                </div>
                <div class="technique-box">
                    <p><strong>Excerpt C: On Cultural Impact</strong><br>
                    <em>"...the loss of our land is not merely an economic grievance. It is an attack on our mana, our whakapapa, and our very identity as a people. When the land is lost, our connection to our tūrangawaewae is severed, and our culture is left without a home. We assert that the health of our people is tied inextricably to the health of our land..."</em></p>
                </div>
            </section>

             <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Your Turn: Build the Argument</h2>
                <p>Using the excerpts above and your knowledge of the Land March, construct a PEEL paragraph that answers the question: <strong>What was the core argument of the 1975 Land March?</strong></p>
                
                <div class="worksheet-box">
                    <p class="worksheet-prompt">P - Point: State the main point of the argument in a single, clear sentence.</p>
                    
                </div>
                <div class="worksheet-box">
                    <p class="worksheet-prompt">E - Evidence: Quote or reference specific details from the excerpts to support your point.</p>
                    
                </div>
                <div class="worksheet-box">
                    <p class="worksheet-prompt">E - Explanation: Explain how your evidence proves your point. What is the significance of the evidence?</p>
                    
                </div>
                <div class="worksheet-box">
                    <p class="worksheet-prompt">L - Link: Link your argument back to the broader goals of the protest and its impact on New Zealand.</p>
                    
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default PrimarySourceAnalysis1975MemorialOfRight
