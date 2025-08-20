import React from 'react'
import '../../../styles/te-kete-synthesis.css'
import {Card} from '../../Card'

interface AiArtEthicsComprehensionProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const AiArtEthicsComprehension: React.FC<AiArtEthicsComprehensionProps> = (_{
culturalContext = 'Contemporary technology and cultural expression', 
_yearLevel = 'Year 9-10', 
_subject = 'English,  _Digital Technologies', 
_}) => {
return (
    <div className="ai-art-ethics-comprehension">
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
          <section className="reading-passage">
            <h2 className="section-title">Can a Machine Be an Artist?</h2>

            <div className="passage-text">
              <p>
In 2022, a new wave of Artificial Intelligence (AI) tools emerged that could
generate stunningly detailed images from simple text prompts. Users could type "a
photorealistic astronaut riding a horse on Mars" and receive a unique, complex image
in seconds. These AI art generators, such as Midjourney and DALL-E 2, have sparked a
fierce debate in the art world. Proponents hail them as revolutionary tools for
creativity, allowing anyone to visualise their ideas, regardless of their technical
drawing skill. They argue that AI is simply a new paintbrush, a sophisticated
instrument that opens up new artistic possibilities.
              </p>

              <p>
However, many human artists and designers are deeply concerned. A major point of
contention is how these AI models are trained. They learn by analysing vast datasets
containing millions of images scraped from the internet, many of which are
copyrighted works by human artists. These artists argue that the AI is essentially
                "copying" their style and labour without their consent or compensation. For example,;
an AI can be prompted to create an image "in the style of Weta Workshop" or "like a
Rita Angus painting," raising complex questions about artistic ownership and
copyright law.
              </p>

              <p>
The central question is whether AI-generated images can truly be considered "art."
Does art require intention, emotion, and lived experience, or is it purely about the
final product? If an AI cannot feel joy or sorrow, can it create a genuinely joyful
or sorrowful image? This debate challenges our very definition of creativity. As
this technology becomes more sophisticated, it forces us to consider what we value
most in art: the aesthetic beauty of the image itself, or the human story and skill
behind its creation. There are no easy answers, and the conversation is set to
reshape our understanding of art for years to come.
              </p>
            </div>
          </section>

          <section className="comprehension-questions">
            <h3 className="section-title">Comprehension & Critical Thinking Questions</h3>

            <div className="questions-container">
              <div className="question-item">
                <p className="question-text">
                  1. What is the main argument in favour of AI art generators, according to the
text?
                </p>
                <div className="options-grid">
                  <div className="option">
A) They are a faster way to copy existing famous paintings.
                  </div>
                  <div className="option correct">
B) They are a new tool that can help anyone be creative.
                  </div>
                  <div className="option">C) They will make human artists obsolete.</div>
                  <div className="option">
D) They are only used for creating photorealistic images.
                  </div>
                </div>
              </div>

              <div className="question-item">
                <p className="question-text">
                  2. What is the primary concern that human artists have about how AI models are
trained?
                </p>
                <div className="options-grid">
                  <div className="option">
A) The AI models are not powerful enough to learn properly.
                  </div>
                  <div className="option">B) The AI uses too much electricity during training.</div>
                  <div className="option correct">
C) The AI learns from their copyrighted work without permission.
                  </div>
                  <div className="option">
D) The AI can only generate images in one specific style.
                  </div>
                </div>
              </div>

              <div className="question-item">
                <p className="question-text">
                  3. The text asks if art requires "intention, emotion, and lived experience." What
is the best synonym for "intention" in this context?
                </p>
                <div className="options-grid">
                  <div className="option">A) An accident</div>
                  <div className="option correct">B) A purpose or a plan</div>
                  <div className="option">C) A beautiful outcome</div>
                  <div className="option">D) A technical skill</div>
                </div>
              </div>

              <div className="question-item">
                <p className="question-text">
                  4. (Critical Thinking) The text compares an AI art generator to "a new
paintbrush." Do you think this is a fair comparison? Explain why or why not.
                </p>
                <div className="response-area">
                  <textarea
className="response-textarea"
placeholder="Write your response here..."
rows={4}
                  />
                </div>
              </div>

              <div className="question-item">
                <p className="question-text">
                  5. (Critical Thinking) Who do you think should own the copyright to an image
created by an AI: the person who wrote the prompt, the company that created the
AI, or the artists whose work was used in the training data? Justify your choice.
                </p>
                <div className="response-area">
                  <textarea
className="response-textarea"
placeholder="Write your response here..."
rows={5}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="external-resources">
            <h3 className="section-title">
              <span className="cultural-icon">🌿</span>
Ngā Rauemi Tauwehe - External Resources
            </h3>
            <p className="resources-description">
High-quality resources from official New Zealand education sites to extend and enrich
this learning content.
            </p>

            <div className="resource-item">
              <h4 className="resource-title">
                <a
href="https: //www.sciencelearn.org.nz/"
target="_blank"
rel="noopener noreferrer"
                >
Science Learning Hub
                </a>
              </h4>
              <p className="resource-description">
Over 11,550 NZ science education resources for teachers, students and community
              </p>
              <div className="resource-tags">
                <span className="tag year-tag">Years: 1-13</span>
                <span className="tag match-tag">60% Match</span>
                <span className="tag subject-tag">Science</span>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  )
}

export default AiArtEthicsComprehension
