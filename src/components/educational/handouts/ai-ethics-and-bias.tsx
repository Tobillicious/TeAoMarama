import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface AiEthicsAndBiasProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const AiEthicsAndBias: React.FC<AiEthicsAndBiasProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="ai-ethics-and-bias">
      <Card title="AI Ethics and Bias | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">AI Ethics and Bias | Te Kete Ako</h1>
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
            <div style="margin-bottom: 2rem">
                <a href="handouts.html" class="breadcrumb">&larr Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">AI Ethics and Bias</h1>
                <p class="page-subtitle">When Good Data Goes Bad</p>
            </div>
            <article class="handout-content">
            <section class="mb-6">
                <div class="alert-box" style="background: #fef2f2 border-left: 4px solid #ef4444 padding: var(--space-6) border-radius: var(--radius-md) margin-bottom: 2rem">
                    <h2 style="color: #dc2626 font-weight: bold margin-bottom: 1rem" class="wiley-section-title">The Problem of Bias</h2>
                    <p>An AI model is only as good as the data it's trained on. Because LLMs are trained on vast amounts of text from the internet, they learn the biases that are present in that text. If the data reflects historical inequalities or stereotypes, the AI will learn and can even amplify those biases.</p>
                </div>
            </section>
            <section style="margin-bottom: 2rem">
                <h2 class="section-title" class="wiley-section-title">Case Study: Biased Hiring Tool</h2>
                <div class="content-box" class="bg-white">
                    <p>A major tech company created an AI tool to help them screen CVs. The goal was to find the best candidates. They trained the model on the CVs of people they had hired over the last 10 years. However, because the company had historically hired more men than women, the AI learned that male candidates were preferable. It started penalizing CVs that included the word "women's" (e.g., "women's chess club captain") and downgrading graduates from all-women's colleges. The company had to scrap the tool.</p>
                </div>
            </section>
            
            <section class="handout-questions" style="margin-bottom: 2rem">
                <h2 class="section-title" class="wiley-section-title">Critical Thinking</h2>
                <div class="question-block" class="bg-white">
                    <p style="font-weight: 600 margin-bottom: 1rem">Who is responsible for the bias in the AI hiring tool? The programmers? The company? The historical data? Explain your reasoning.</p>
                    
                </div>
            </section>
            </article>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default AiEthicsAndBias
