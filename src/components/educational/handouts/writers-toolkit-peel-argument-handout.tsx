import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface WritersToolkitPeelArgumentHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const WritersToolkitPeelArgumentHandout: React.FC<WritersToolkitPeelArgumentHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="writers-toolkit-peel-argument-handout">
      <Card title="The Writer's Toolkit: The PEEL Method" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: The PEEL Method</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Writer's Toolkit: The PEEL Paragraph</h1>
                <p class="page-subtitle">Building Strong, Persuasive Arguments</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">What is the PEEL Method?</h2>
                <p>
How do you build an argument that is logical, convincing, and easy for your reader to follow? A powerful tool used in persuasive writing is the PEEL paragraph structure. PEEL is an acronym that stands for Point, Evidence, Explanation, and Link. It provides a clear framework for each paragraph, ensuring that you don't just state your opinion, but you support it with facts and connect it back to your main argument. Using PEEL helps to create well-structured, persuasive essays and speeches.
                </p>
            </article>

            <section class="mb-4">
                <h3 class="section-title">Deconstructing a PEEL Paragraph</h3>
                <div class="technique-box">
                    <div class="peel-component peel-point">
                        <h4><strong>P - Point (Te Take)</strong></h4>
                        <p class="text-italic">The main idea of your paragraph. It should be a clear topic sentence that states the argument you are about to make.</p>
                        <div class="example-box">
                            <strong>Example: </strong> Integrating traditional Māori games into school sports programmes is essential for honouring Te Tiriti o Waitangi.
                        </div>
                    </div>
                    <div class="peel-component peel-evidence">
                        <h4><strong>E - Evidence (Taunakitanga)</strong></h4>
                        <p class="text-italic">The facts, statistics, examples, or quotes that support your point. This is your proof.</p>
                        <div class="example-box">
                            <strong>Example: </strong> The Ministry of Education's 2023 report, 'Ka Ora, Ka Ako', highlighted that only 15% of schools have a dedicated programme for Tākararo (traditional Māori games).
                        </div>
                    </div>
                    <div class="peel-component peel-explanation">
                        <h4><strong>E - Explanation (Whakamārama)</strong></h4>
                        <p class="text-italic">Explain how your evidence proves your point. This is where you analyse the information and show your thinking.</p>
                        <div class="example-box">
                            <strong>Example: </strong> This statistic demonstrates a significant gap in fulfilling our partnership obligations under Te Tiriti. By actively teaching and playing games like Kī-o-rahi, schools can validate Māori culture and provide a space for Māori students to excel.
                        </div>
                    </div>
                    <div class="peel-component peel-link">
                        <h4><strong>L - Link (Hononga)</strong></h4>
                        <p class="text-italic">Connect your point back to the main topic or thesis of your essay. It summarises the paragraph's argument.</p>
                        <div class="example-box">
                            <strong>Example: </strong> Therefore, making Tākararo a core part of the physical education curriculum is a vital step towards creating a truly bicultural learning environment.
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">He Whakamārama Anō (Deeper Explanation)</h2>
                <p>
The PEEL structure is more than just a formula it's a tool for building <strong>mana</strong> in your writing. When you state a clear <strong>Point</strong>, you show confidence. When you provide strong <strong>Evidence</strong>, you show that your argument is based on more than just your own opinion. Your <strong>Explanation</strong> is where you demonstrate your own thinking (whakaaro), and the <strong>Link</strong> ensures your reader never gets lost. A well-crafted PEEL paragraph leaves no room for doubt.
                </p>
            </section>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Whakamātauria! (Try it!)</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <p><strong>1. Deconstruction: Read the paragraph below and identify the P, E, E, and L components.</strong></p>
                        <div class="cultural-protocol-box mb-2">
                            <p class="text-italic">Allowing cell phones in classrooms can be a major distraction from learning. For example, a recent survey showed that students spend an average of 25 minutes per day on non-academic activities on their phones during class time. This time spent on social media or games is time taken directly away from valuable instruction and focused work, ultimately hindering academic progress. Consequently, to maintain a productive learning environment, cell phone use must be restricted during lessons.</p>
                        </div>
                        <div class="answer-space">
                            <p><strong>Point: </strong> ___________________________________________________</p>
                            <p><strong>Evidence:</strong> ___________________________________________________</p>
                            <p><strong>Explanation:</strong> ___________________________________________________</p>
                            <p><strong>Link:</strong> ___________________________________________________</p>
                        </div>
                    </div>

                    <div class="question-block">
                        <p><strong>2. Application: Use the PEEL framework to write a paragraph arguing that all students should be required to learn Te Reo Māori. (You can invent reasonable evidence for this task).</strong></p>
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

export default WritersToolkitPeelArgumentHandout
