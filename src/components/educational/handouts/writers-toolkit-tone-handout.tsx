import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface WritersToolkitToneHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const WritersToolkitToneHandout: React.FC<WritersToolkitToneHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="writers-toolkit-tone-handout">
      <Card title="The Writer's Toolkit: Formal vs. Informal Tone" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Formal vs. Informal Tone</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">What is Tone?</h2>
                <p class="text-justify">
In writing, tone is the author's attitude toward the subject and the audience. It's conveyed through word choice (diction), sentence structure (syntax), and overall style. Just as you would change your tone of voice when speaking to your principal versus your best friend, a good writer must adapt their tone to suit their purpose and audience. The two most common tones are formal and informal. Mastering the difference is essential for effective communication in any context.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Formal vs. Informal Tone</h3>
                <div class="grid grid-cols-1 md: grid-cols-2 gap-4">
                    <div class="comparison-box">
                        <h4 class="font-bold text-gray-800 mb-2">Formal Tone 🧐</h4>
                        <p class="text-sm text-gray-600"><strong>Purpose:</strong> To inform, persuade, or present a serious argument. Used in academic essays, official reports, and professional emails.</p>
                        <ul class="text-sm list-disc list-inside mt-2 space-y-1">
                            <li>Uses complex sentences.</li>
                            <li>Avoids slang and contractions (e.g., "do not" instead of "don't").</li>
                            <li>Maintains an objective, third-person perspective (avoids "I" or "you").</li>
                            <li>Features precise, technical vocabulary.</li>
                        </ul>
                    </div>
                    <div class="comparison-box">
                        <h4 class="font-bold text-gray-800 mb-2">Informal Tone 😎</h4>
                        <p class="text-sm text-gray-600"><strong>Purpose: </strong> To entertain, connect personally, or express excitement. Used in friendly emails, blog posts, social media, and creative stories.</p>
                         <ul class="text-sm list-disc list-inside mt-2 space-y-1">
                            <li>Uses simpler, shorter sentences.</li>
                            <li>May include slang, contractions, and colloquialisms.</li>
                            <li>Often uses a first-person ("I") or second-person ("you") perspective.</li>
                            <li>Features everyday, conversational language.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Deconstruction & Application</h3>
                
                <div class="space-y-5">
                    <!-- Deconstruction -->
                    <div>
                        <p class="font-semibold mb-2">1. Deconstruction: Read the two sentences below. Which one has a formal tone and which has an informal tone? Explain your reasoning.</p>
                        <div class="space-y-2 text-sm">
                            <div class="bg-gray-50 p-2 rounded-lg border">
                                <p class="italic">A) "It's a pretty big deal that the research showed the new medicine works."</p>
                            </div>
                             <div class="bg-gray-50 p-2 rounded-lg border">
                                <p class="italic">B) "The research findings indicate that the new medication is highly effective."</p>
                            </div>
                        </div>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2 mt-2">

                        </div>
                    </div>

                    <!-- Application -->
                    <div>
                        <p class="font-semibold mb-2">2. Application: Rewrite the following informal sentence into a formal one. Focus on changing the word choice and sentence structure.</p>
                        <div class="comparison-box mb-2">
                             <p class="italic text-gray-600">"I reckon we should get on with the project soon or we're gonna run out of time."</p>
                        </div>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Critical Thinking -->
                    <div>
                        <p class="font-semibold mb-2">3. (Critical Thinking) Imagine you are writing an email to your local MP to persuade them to fund a new skatepark. Which tone would be more effective? Why?</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

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

export default WritersToolkitToneHandout
