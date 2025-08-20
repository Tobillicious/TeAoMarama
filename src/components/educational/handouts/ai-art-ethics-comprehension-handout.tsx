import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface AiArtEthicsComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const AiArtEthicsComprehensionHandout: React.FC<AiArtEthicsComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="ai-art-ethics-comprehension-handout">
      <Card title="AI Art Ethics Reading Comprehension" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">AI Art Ethics Reading Comprehension</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Can a Machine Be an Artist?</h2>
                <p class="text-justify">
In 2022, a new wave of Artificial Intelligence (AI) tools emerged that could generate stunningly detailed images from simple text prompts. Users could type "a photorealistic astronaut riding a horse on Mars" and receive a unique, complex image in seconds. These AI art generators, such as Midjourney and DALL-E 2, have sparked a fierce debate in the art world. Proponents hail them as revolutionary tools for creativity, allowing anyone to visualise their ideas, regardless of their technical drawing skill. They argue that AI is simply a new paintbrush, a sophisticated instrument that opens up new artistic possibilities.
                </p>
                <p class="text-justify">
However, many human artists and designers are deeply concerned. A major point of contention is how these AI models are trained. They learn by analysing vast datasets containing millions of images scraped from the internet, many of which are copyrighted works by human artists. These artists argue that the AI is essentially "copying" their style and labour without their consent or compensation. For example, an AI can be prompted to create an image "in the style of Weta Workshop" or "like a Rita Angus painting," raising complex questions about artistic ownership and copyright law.
                </p>
                <p class="text-justify">
The central question is whether AI-generated images can truly be considered "art." Does art require intention, emotion, and lived experience, or is it purely about the final product? If an AI cannot feel joy or sorrow, can it create a genuinely joyful or sorrowful image? This debate challenges our very definition of creativity. As this technology becomes more sophisticated, it forces us to consider what we value most in art: the aesthetic beauty of the image itself, or the human story and skill behind its creation. There are no easy answers, and the conversation is set to reshape our understanding of art for years to come.
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Comprehension & Critical Thinking Questions</h3>
                
                <div class="space-y-5">
                    <!-- Question 1 -->
                    <div>
                        <p class="font-semibold mb-2">1. What is the main argument in favour of AI art generators, according to the text?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) They are a faster way to copy existing famous paintings.</div>
                            <div class="question-option">B) They are a new tool that can help anyone be creative.</div>
                            <div class="question-option">C) They will make human artists obsolete.</div>
                            <div class="question-option">D) They are only used for creating photorealistic images.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div>
                        <p class="font-semibold mb-2">2. What is the primary concern that human artists have about how AI models are trained?</p>
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) The AI models are not powerful enough to learn properly.</div>
                            <div class="question-option">B) The AI uses too much electricity during training.</div>
                            <div class="question-option">C) The AI learns from their copyrighted work without permission.</div>
                            <div class="question-option">D) The AI can only generate images in one specific style.</div>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div>
                        <p class="font-semibold mb-2">3. The text asks if art requires "intention, emotion, and lived experience." What is the best synonym for "intention" in this context?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) An accident</div>
                            <div class="question-option">B) A purpose or a plan</div>
                            <div class="question-option">C) A beautiful outcome</div>
                            <div class="question-option">D) A technical skill</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) The text compares an AI art generator to "a new paintbrush." Do you think this is a fair comparison? Explain why or why not.</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) Who do you think should own the copyright to an image created by an AI: the person who wrote the prompt, the company that created the AI, or the artists whose work was used in the training data? Justify your choice.</p>
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

export default AiArtEthicsComprehensionHandout
