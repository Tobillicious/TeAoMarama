import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MisleadingGraphsComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MisleadingGraphsComprehensionHandout: React.FC<MisleadingGraphsComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="misleading-graphs-comprehension-handout">
      <Card title="Misleading Graphs Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Misleading Graphs Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: Misleading Data</h1>
                <p class="page-subtitle">asTTle-Style Analysis of Statistical Literacy</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">When Numbers Lie</h2>
                <p>
In a world saturated with information, we often rely on graphs and statistics to help us understand complex topics. From news reports to advertisements, data visualisation is a powerful tool. However, this tool can be used to mislead as well as to inform. A misleading graph is one that distorts data to create a false impression. One of the most common techniques is manipulating the Y-axis (the vertical axis) on a bar or line graph. By starting the axis at a value other than zero, or by stretching or compressing the scale, small differences can be made to look enormous, or significant changes can be made to look trivial.
                </p>
                <p>
Consider two snack food companies. Company A sells 5,200 units and Company B sells 5,000 units. The actual difference is only 200 units, or 4% of Company B's sales. A truthful graph with a Y-axis starting at 0 would show two bars of very similar height. However, if a marketer for Company A creates a graph where the Y-axis starts at 4,800 and ends at 5,400, Company A's bar will appear to be more than twice as tall as Company B's. This visual trick exaggerates the difference and can mislead a consumer into thinking one product is vastly more popular than the other.
                </p>
                <p>
Another common issue is cherry-picking data. This involves selecting only the data that supports a particular argument while ignoring data that contradicts it. For example, a report might claim that "ice cream sales cause an increase in drownings" by showing that both rise in the summer. This ignores the lurking variable—the hot weather—that is the actual cause of both. Being statistically literate is a crucial skill in the modern world. It involves more than just reading the numbers it requires us to question the source of the data, look at the scales on graphs, and think critically about what information might be missing.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. What is the most common technique for creating a misleading graph mentioned in the text?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) Using bright colours to distract the reader.</div>
                            <div class="question-option">B) Manipulating the Y-axis scale.</div>
                            <div class="question-option">C) Presenting too much data at once.</div>
                            <div class="question-option">D) Using a pie chart instead of a bar graph.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) In the example, Company A's sales (5,200) are what percentage higher than Company B's sales (5,000)?</p>
                         <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. What is meant by the term "cherry-picking data"?</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) Selecting only the data that supports your argument.</div>
                            <div class="question-option">B) Making sure all data is from reliable sources.</div>
                            <div class="question-option">C) Using data specifically about fruit sales.</div>
                            <div class="question-option">D) Presenting all available data on a topic.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) Explain in your own words what a "lurking variable" is, using the ice cream and drowning example.</p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) Find an example of a graph online or in a newspaper. Does it show the Y-axis starting at 0? Do you think it presents the data fairly? Explain why or why not.</p>
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

export default MisleadingGraphsComprehensionHandout
