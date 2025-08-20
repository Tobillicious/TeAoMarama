import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ScientificMethodHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ScientificMethodHandout: React.FC<ScientificMethodHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="scientific-method-handout">
      <Card title="The Scientific Method Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Scientific Method Handout | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">The Scientific Method</h1>
                <p class="page-subtitle">A step-by-step process for discovery.</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">The Scientific Enquiry Cycle</h2>
                <div class="space-y-4">
                    <div class="technique-box flex items-center">
                        <div class="step-icon">🤔</div>
                        <div>
                            <h3 class="mb-2">1. Observation & Question (Tirohanga me te Pātai)</h3>
                            <p class="text-sm text-secondary">Notice something and ask a question about it. Why does that happen? What if...?</p>
                        </div>
                    </div>
                    <div class="technique-box flex items-center">
                        <div class="step-icon">📝</div>
                        <div>
                            <h3 class="mb-2">2. Research (Rangahau)</h3>
                            <p class="text-sm text-secondary">Gather information about your question. What is already known?</p>
                        </div>
                    </div>
                    <div class="technique-box flex items-center">
                        <div class="step-icon">💡</div>
                        <div>
                            <h3 class="mb-2">3. Hypothesis (Whakaaro)</h3>
                            <p class="text-sm text-secondary">Formulate an educated guess or a testable prediction. "If I do this, then this will happen."</p>
                        </div>
                    </div>
                    <div class="technique-box flex items-center">
                        <div class="step-icon">🧪</div>
                        <div>
                            <h3 class="mb-2">4. Experiment (Whakamātau)</h3>
                            <p class="text-sm text-secondary">Design and conduct a fair test. Change only the <strong>Independent Variable</strong>. Keep all other <strong>Controlled Variables</strong> the same.</p>
                        </div>
                    </div>
                    <div class="technique-box flex items-center">
                        <div class="step-icon">📊</div>
                        <div>
                            <h3 class="mb-2">5. Analysis (Tātari)</h3>
                            <p class="text-sm text-secondary">Collect and examine the data from your experiment. What do the results tell you?</p>
                        </div>
                    </div>
                     <div class="technique-box flex items-center">
                        <div class="step-icon">✅</div>
                        <div>
                            <h3 class="mb-2">6. Conclusion (Whakatau)</h3>
                            <p class="text-sm text-secondary">Summarise your findings. Was your hypothesis supported? What did you learn?</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Connecting to Mātauranga Māori</h2>
                <div class="question-block">
                    <p>The scientific method is one way of understanding the world. Mātauranga Māori, the body of knowledge from Māori ancestors, also uses deep observation of the natural world (tirohanga), passing down knowledge through generations (rangahau), and testing ideas through practical application (whakamātau). For example, the creation of the maramataka (Māori lunar calendar) required centuries of careful observation, testing, and analysis to understand the best times for planting and fishing. Both systems value curiosity, evidence, and a desire to understand the world more deeply.</p>
                </div>
            </section>

            <section class="handout-questions mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Plan Your Own Experiment!</h2>
                <p class="text-center text-secondary text-sm mb-3">Let's plan an experiment to answer the question: <strong>"Does the type of liquid affect how fast a seed sprouts?"</strong></p>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Hypothesis:</h3>
                        <p class="text-italic text-secondary mb-2">If I water three seeds with plain water, salt water, and sugary water, then...</p>
                        
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Independent Variable (the one thing you are changing):</h3>

                    </div>
                     <div class="technique-box">
                        <h3 class="mb-2">Controlled Variables (the things you will keep the same):</h3>

                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">What data will you collect?</h3>

                    </div>
                </div>
            </section>

            <!-- Key Terms -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">📖 Key Statistical Terms</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="question-block">
                        <p class="text-xs"><strong>Mode: </strong> Most common value</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Range:</strong> Difference between highest and lowest</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Total:</strong> Sum of all values</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Category:</strong> Group of similar items</p>
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

export default ScientificMethodHandout
