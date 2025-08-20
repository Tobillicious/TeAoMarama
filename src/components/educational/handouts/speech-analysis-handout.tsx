import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface SpeechAnalysisHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const SpeechAnalysisHandout: React.FC<SpeechAnalysisHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="speech-analysis-handout">
      <Card title="Analysing a Speech | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Analysing a Speech | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Critical Literacy: Analysing a Speech</h1>
                <p class="page-subtitle">Deconstructing the Art of Oratory</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">More Than Just Words</h2>
                <p>
A speech is a unique form of communication, designed to be heard rather than read. A great speaker does more than just present information they use a combination of a well-structured argument and powerful delivery to connect with their audience on both an intellectual and an emotional level. To analyse a speech effectively, we need to consider not only <em>what</em> is being said, but <em>how</em> it is being said. This involves looking at the argument's structure, the persuasive techniques used, and the speaker's tone and body language.
                </p>
            </section>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">Speech Excerpt: "The Empty Playground"</h2>
                <p class="text-italic">
                   "Friends, colleagues, fellow citizens. I want you to picture something with me. Picture the local park on a Saturday morning. But instead of the usual sounds—the laughter, the shouting, the joyful chaos—there is only silence. The swings hang motionless. The slide is empty. This is the future we are building for our children if we continue to allow digital devices to replace outdoor play. A silent, empty future.
                   <br><br>
Now, I'm not an anti-technology dinosaur. I understand the value of these tools for learning and connection. But as a parent and a former teacher, I have seen the change with my own eyes. I have seen the boundless energy of a child replaced by the vacant stare of a screen. Studies from the Ministry of Health are clear: outdoor play is essential for physical development, for social skills, and for mental wellbeing. The data shows a 40% increase in childhood obesity in the last decade alone, a statistic that should alarm every single one of us.
                   <br><br>
We stand at a crossroads. One path leads to a generation of children who know how to swipe and scroll, but not how to climb and create. The other path, the harder path, leads to a future where technology serves us, not the other way around. It is a future where our parks are once again filled with the sound of laughter. So I ask you: which future will you choose for your children? Let's choose the one with more scraped knees and less screen time. Thank you."
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Deconstruction & Application</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. Identify an example of each rhetorical appeal in the speech.</p>
                        <div class="answer-space answer-space-lg">
                            <p><strong>Ethos (Credibility):</strong></p>
                            <p><strong>Pathos (Emotion):</strong></p>
                            <p><strong>Logos (Logic):</strong></p>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. The speaker uses a rhetorical question at the end. What is the intended effect of this question on the audience?</p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. (Critical Thinking) The speaker contrasts two futures: one with "scraped knees" and one with "screen time." Why is this an effective persuasive technique?</p>
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

export default SpeechAnalysisHandout
