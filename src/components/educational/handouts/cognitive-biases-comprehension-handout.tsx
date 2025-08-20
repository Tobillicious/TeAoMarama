import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface CognitiveBiasesComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const CognitiveBiasesComprehensionHandout: React.FC<CognitiveBiasesComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="cognitive-biases-comprehension-handout">
      <Card title="Cognitive Biases | Critical Literacy Unit" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Cognitive Biases | Critical Literacy Unit</h1>
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
            <article class="mb-6 prose max-w-none">
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Why Your Brain Takes Shortcuts</h2>
                <p class="text-justify">
The human brain processes an incredible amount of information every second. To cope with this overload, it relies on mental shortcuts, or "heuristics," to make quick judgments and decisions. While these shortcuts are often useful, they can also lead to systematic errors in thinking known as cognitive biases. These biases are not a sign of low intelligence they are a normal feature of how the human brain works. Understanding these biases is a key part of media literacy, as they can explain why we are often vulnerable to misinformation and flawed arguments.
                </p>
                <p class="text-justify">
One of the most common is **Confirmation Bias**, which is the tendency to search for, interpret, and recall information in a way that confirms our pre-existing beliefs. If you believe that a certain political party is untrustworthy, you are more likely to notice, remember, and share news stories that support that view, while ignoring stories that show the party in a positive light. Social media "echo chambers" greatly amplify this bias, as algorithms feed us a constant stream of content that validates our opinions.
                </p>
                <p class="text-justify">
Another powerful shortcut is the **Availability Heuristic**. This is where we overestimate the importance of information that is most easily recalled in our memory—which is often recent, shocking, or emotionally charged information. For example, after seeing several dramatic news reports about shark attacks, you might believe that shark attacks are far more common than they actually are, even though the statistical risk is incredibly low. The dramatic stories are more "available" in your mind than the boring statistics. Recognising these biases in ourselves and others is the first step toward becoming a more critical and rational thinker.
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Comprehension & Critical Thinking Questions</h3>
                
                <div class="space-y-5">
                    <!-- Question 1 -->
                    <div>
                        <p class="font-semibold mb-2">1. What is the primary reason the brain uses mental shortcuts?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) To make us more emotional.</div>
                            <div class="question-option">B) To cope with information overload.</div>
                            <div class="question-option">C) To ensure all our decisions are perfectly logical.</div>
                            <div class="question-option">D) To help us remember every detail of our day.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div>
                        <p class="font-semibold mb-2">2. Which of the following is the best example of Confirmation Bias?</p>
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) Changing your opinion after hearing a strong counter-argument.</div>
                            <div class="question-option">B) Searching for a wide range of different sources before making a decision.</div>
                            <div class="question-option">C) Only paying attention to news stories that support your favourite sports team.</div>
                            <div class="question-option">D) Believing a story because it is recent and easy to remember.</div>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div>
                        <p class="font-semibold mb-2">3. A person sees a news report about a plane crash and becomes afraid of flying, even though flying is statistically very safe. Which bias is most likely at play?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) Confirmation Bias</div>
                            <div class="question-option">B) The Availability Heuristic</div>
                            <div class="question-option">C) Both A and B</div>
                            <div class="question-option">D) Neither A nor B</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) How do social media "echo chambers" make Confirmation Bias worse? Explain in your own words.</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) Describe a time when you might have been influenced by the Availability Heuristic in your own life. What made that particular memory so powerful or easy to recall?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

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

export default CognitiveBiasesComprehensionHandout
