import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface CulturalStemAssessmentRubricProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const CulturalStemAssessmentRubric: React.FC<CulturalStemAssessmentRubricProps> = (_{
culturalContext = "Cultural practices and traditional knowledge", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="cultural-stem-assessment-rubric">
      <Card title="Cultural STEM Assessment Rubric | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Cultural STEM Assessment Rubric | Te Kete Ako</h1>
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
        <div class="breadcrumb">
            <a href="index.html">Home</a> >
            <a href="handouts.html">Handouts</a> >
            <span>Cultural STEM Assessment Rubric</span>
        </div>
        

        <div class="rubric-header">
            <h1 class="wiley-hero-title">📊 Cultural STEM Assessment Rubric</h1>
            <p class="unit-subtitle">Holistic Assessment for Culturally-Integrated Mathematics and Science Learning</p>
            <p><em>"Assessment that honors both scientific excellence and cultural wisdom."</em></p>
        </div>

        <section class="rubric-introduction">
            <div class="assessment-framework">
                <h2 class="wiley-section-title">🌟 Assessment Philosophy: Beyond Traditional Measurement</h2>
                <p>This rubric represents a revolutionary approach to STEM assessment that:</p>

                <div
style="display: grid grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) gap: 1.5rem margin: var(--space-8) 0">
                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">🔬 Values Scientific Rigor</h4>
                        <p>Maintains high standards for mathematical and scientific understanding</p>
                    </div>
                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">🌿 Honors Cultural Knowledge</h4>
                        <p>Recognizes indigenous knowledge systems as sophisticated and valid</p>
                    </div>
                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">🔗 Assesses Integration</h4>
                        <p>Evaluates students' ability to connect scientific and cultural concepts</p>
                    </div>
                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">👥 Promotes Community Connection</h4>
                        <p>Recognizes learning that extends beyond individual achievement</p>
                    </div>
                </div>

                <p><strong>Applicable to: </strong> Y9 Mathematics (Geometry Through Māori Patterns), Y10 Physics
                    (Navigation & Ocean Sciences), and other culturally-integrated STEM units</p>
            </div>
        </section>

        <section class="scoring-overview">
            <h2 class="wiley-section-title">📈 Scoring Levels Overview</h2>

            <div class="scoring-guide">
                <div class="score-level score-excellent">
                    <h3>Excellent (4)</h3>
                    <p>Demonstrates sophisticated understanding of both scientific concepts and cultural knowledge with
innovative integration</p>
                </div>
                <div class="score-level score-proficient">
                    <h3>Proficient (3)</h3>
                    <p>Shows solid understanding of scientific concepts with respectful and accurate cultural
connections</p>
                </div>
                <div class="score-level score-developing">
                    <h3>Developing (2)</h3>
                    <p>Displays basic scientific understanding with emerging awareness of cultural connections</p>
                </div>
                <div class="score-level score-beginning">
                    <h3>Beginning (1)</h3>
                    <p>Shows limited scientific understanding with minimal cultural awareness or connection</p>
                </div>
            </div>
        </section>

        <section class="main-rubric">
            <h2 class="wiley-section-title">🔍 Detailed Assessment Criteria</h2>

            <table class="rubric-table">
                <thead>
                    <tr>
                        <th style="width: 20%">Assessment Criterion</th>
                        <th style="width: 20%">Excellent (4)</th>
                        <th style="width: 20%">Proficient (3)</th>
                        <th style="width: 20%">Developing (2)</th>
                        <th style="width: 20%">Beginning (1)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="criterion-header">
                            <strong>🔬 Scientific/Mathematical Understanding</strong><br>
                            <em>Demonstrates mastery of core STEM concepts</em>
                        </td>
                        <td class="level-excellent">
                            • Shows deep conceptual understanding of mathematical/scientific principles<br>
                            • Applies concepts accurately to solve complex problems<br>
                            • Uses precise scientific vocabulary and notation<br>
                            • Makes connections between different STEM areas<br>
                            • Demonstrates ability to extend learning to new situations
                        </td>
                        <td class="level-proficient">
                            • Understands key mathematical/scientific concepts<br>
                            • Applies concepts correctly to standard problems<br>
                            • Uses appropriate scientific vocabulary<br>
                            • Shows some connections within subject area<br>
                            • Can explain reasoning clearly
                        </td>
                        <td class="level-developing">
                            • Shows basic understanding of core concepts<br>
                            • Applies concepts with some guidance<br>
                            • Uses scientific vocabulary inconsistently<br>
                            • Makes limited connections<br>
                            • Explanation needs improvement
                        </td>
                        <td class="level-beginning">
                            • Limited understanding of concepts<br>
                            • Requires significant support to apply learning<br>
                            • Minimal use of scientific vocabulary<br>
                            • Few or no connections made<br>
                            • Difficulty explaining reasoning
                        </td>
                    </tr>

                    <tr>
                        <td class="criterion-header">
                            <strong>🌿 Cultural Knowledge & Respect</strong><br>
                            <em>Demonstrates understanding of and respect for mātauranga Māori</em>
                        </td>
                        <td class="level-excellent">
                            • Shows deep appreciation for traditional knowledge systems<br>
                            • Accurately represents cultural concepts and practices<br>
                            • Demonstrates understanding of cultural protocols<br>
                            • Recognizes sophistication of indigenous knowledge<br>
                            • Shows personal connection to cultural learning
                        </td>
                        <td class="level-proficient">
                            • Shows respect for traditional knowledge<br>
                            • Represents cultural concepts accurately<br>
                            • Follows cultural protocols appropriately<br>
                            • Recognizes value of indigenous knowledge<br>
                            • Engages thoughtfully with cultural content
                        </td>
                        <td class="level-developing">
                            • Shows basic respect for cultural knowledge<br>
                            • Represents cultural concepts with some accuracy<br>
                            • Generally follows cultural protocols<br>
                            • Beginning to recognize value of indigenous knowledge<br>
                            • Shows interest in cultural learning
                        </td>
                        <td class="level-beginning">
                            • Limited awareness of cultural significance<br>
                            • Inaccurate representation of cultural concepts<br>
                            • Inconsistent with cultural protocols<br>
                            • Minimal recognition of indigenous knowledge value<br>
                            • Superficial engagement with cultural content
                        </td>
                    </tr>

                    <tr>
                        <td class="criterion-header">
                            <strong>🔗 Integration & Synthesis</strong><br>
                            <em>Connects scientific and cultural knowledge meaningfully</em>
                        </td>
                        <td class="level-excellent">
                            • Creates innovative connections between science and culture<br>
                            • Explains how traditional knowledge embeds scientific principles<br>
                            • Synthesizes multiple perspectives effectively<br>
                            • Demonstrates how each domain enriches the other<br>
                            • Proposes new applications or insights
                        </td>
                        <td class="level-proficient">
                            • Makes clear connections between science and culture<br>
                            • Explains how traditional practices involve scientific principles<br>
                            • Integrates both perspectives in explanations<br>
                            • Shows how each domain supports understanding<br>
                            • Applies integrated knowledge appropriately
                        </td>
                        <td class="level-developing">
                            • Makes some connections between science and culture<br>
                            • Beginning to see scientific principles in traditional practices<br>
                            • Attempts to integrate both perspectives<br>
                            • Shows emerging understanding of connections<br>
                            • Limited application of integrated knowledge
                        </td>
                        <td class="level-beginning">
                            • Few or superficial connections made<br>
                            • Minimal recognition of science in traditional practices<br>
                            • Treats science and culture as separate<br>
                            • Little understanding of how domains connect<br>
                            • Unable to apply integrated knowledge
                        </td>
                    </tr>

                    <tr>
                        <td class="criterion-header">
                            <strong>💬 Communication & Application</strong><br>
                            <em>Effectively shares learning and applies knowledge</em>
                        </td>
                        <td class="level-excellent">
                            • Communicates complex ideas clearly to diverse audiences<br>
                            • Uses multiple modes of expression effectively<br>
                            • Adapts communication style to context and audience<br>
                            • Creates teaching resources for others<br>
                            • Applies learning to solve real-world problems
                        </td>
                        <td class="level-proficient">
                            • Communicates ideas clearly and accurately<br>
                            • Uses appropriate modes of expression<br>
                            • Considers audience in communication<br>
                            • Shares learning effectively with peers<br>
                            • Applies knowledge to practical situations
                        </td>
                        <td class="level-developing">
                            • Communicates basic ideas with some clarity<br>
                            • Uses limited modes of expression<br>
                            • Beginning to consider audience<br>
                            • Some sharing of learning with others<br>
                            • Limited application to practical situations
                        </td>
                        <td class="level-beginning">
                            • Communication lacks clarity or accuracy<br>
                            • Uses very limited modes of expression<br>
                            • Little consideration of audience<br>
                            • Minimal sharing of learning<br>
                            • Unable to apply knowledge practically
                        </td>
                    </tr>

                    <tr>
                        <td class="criterion-header">
                            <strong>👥 Community Connection & Engagement</strong><br>
                            <em>Demonstrates learning beyond individual achievement</em>
                        </td>
                        <td class="level-excellent">
                            • Actively seeks connections with cultural knowledge holders<br>
                            • Contributes meaningfully to community knowledge<br>
                            • Demonstrates leadership in cultural learning<br>
                            • Supports others' cultural and scientific learning<br>
                            • Plans to continue learning beyond classroom
                        </td>
                        <td class="level-proficient">
                            • Engages respectfully with cultural knowledge holders<br>
                            • Shares learning appropriately with community<br>
                            • Participates actively in cultural learning opportunities<br>
                            • Helps peers with learning<br>
                            • Shows interest in continued learning
                        </td>
                        <td class="level-developing">
                            • Shows some interest in community connections<br>
                            • Beginning to share learning with others<br>
                            • Participates in some cultural learning activities<br>
                            • Occasionally helps peers<br>
                            • Emerging interest in continued learning
                        </td>
                        <td class="level-beginning">
                            • Limited interest in community connections<br>
                            • Minimal sharing of learning<br>
                            • Reluctant participation in cultural activities<br>
                            • Rarely helps peers<br>
                            • No expressed interest in continued learning
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="cultural-considerations">
            <div class="cultural-consideration">
                <h2 class="wiley-section-title">🌿 Important Cultural Assessment Considerations</h2>

                <h3>Protocols for Respectful Assessment</h3>
                <ul>
                    <li><strong>Community Consultation: </strong> Involve cultural advisors in assessment design and
implementation</li>
                    <li><strong>Cultural Sensitivity: </strong> Ensure assessment methods respect cultural protocols and
values</li>
                    <li><strong>Multiple Ways of Knowing: </strong> Recognize that different cultures may express
knowledge differently</li>
                    <li><strong>Avoiding Appropriation: </strong> Assess appreciation and respect, not performance of
cultural practices</li>
                    <li><strong>Celebrating Diversity: </strong> Value different cultural perspectives students bring to
learning</li>
                </ul>

                <h3>🚫 What NOT to Assess</h3>
                <div
style="background: rgba(244, 67, 54, 0.1) padding: var(--space-4) border-radius: var(--radius-md) border-left: 4px solid #f44336">
                    <ul>
                        <li>Students' personal cultural identity or background</li>
                        <li>Pronunciation or performance of cultural practices they don't belong to</li>
                        <li>Memorization of cultural facts without understanding</li>
                        <li>Comparison between different cultural knowledge systems</li>
                        <li>Students' family or community connections (or lack thereof)</li>
                    </ul>
                </div>

                <h3>✅ What TO Assess</h3>
                <div
style="background: rgba(76, 175, 80, 0.1) padding: var(--space-4) border-radius: var(--radius-md) border-left: 4px solid #4caf50">
                    <ul>
                        <li>Understanding of how traditional knowledge contains scientific principles</li>
                        <li>Respectful engagement with cultural learning opportunities</li>
                        <li>Ability to connect scientific concepts with cultural contexts</li>
                        <li>Growth in cultural awareness and appreciation</li>
                        <li>Application of integrated knowledge to solve problems</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="implementation-guidance">
            <div class="implementation-guide">
                <h2 class="wiley-section-title">🛠️ Implementation Guidance for Teachers</h2>

                <h3>Using This Rubric Effectively</h3>

                <div
style="display: grid grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) gap: 1.5rem margin: var(--space-8) 0">
                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">📋 Before Assessment</h4>
                        <ul>
                            <li>Share rubric with students at unit beginning</li>
                            <li>Discuss what each criterion means in practice</li>
                            <li>Provide examples of work at different levels</li>
                            <li>Clarify cultural expectations and protocols</li>
                        </ul>
                    </div>

                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">📊 During Assessment</h4>
                        <ul>
                            <li>Use multiple forms of evidence (written, oral, practical)</li>
                            <li>Observe students in cultural learning contexts</li>
                            <li>Include self and peer assessment opportunities</li>
                            <li>Document growth over time, not just final achievement</li>
                        </ul>
                    </div>

                    <div class="bg-white">
                        <h4 style="color: var(--color-accent)">💭 After Assessment</h4>
                        <ul>
                            <li>Provide specific feedback aligned to criteria</li>
                            <li>Celebrate both scientific and cultural growth</li>
                            <li>Set goals for continued learning</li>
                            <li>Share successes with community when appropriate</li>
                        </ul>
                    </div>
                </div>

                <h3>Adaptation for Different Contexts</h3>
                <p>This rubric can be adapted for: </p>
                <ul>
                    <li><strong>Different Year Levels:</strong> Adjust expectations while maintaining core criteria</li>
                    <li><strong>Various Cultural Contexts:</strong> Replace Māori examples with locally relevant
indigenous knowledge</li>
                    <li><strong>Different STEM Subjects: </strong> Apply framework to chemistry, biology, engineering,;
etc.</li>
                    <li><strong>Project-Based Learning: </strong> Use for long-term integrated projects and
investigations</li>
                </ul>
            </div>
        </section>

        <section class="practical-applications">
            <div class="practical-application">
                <h2 class="wiley-section-title">📝 Practical Assessment Applications</h2>

                <h3>Sample Assessment Tasks</h3>

                <div
style="display: grid grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)) gap: 1.5rem margin: var(--space-8) 0">
                    <div class="bg-white">
                        <h4>📐 Mathematics: Tukutuku Pattern Analysis</h4>
                        <p><strong>Task:</strong> Create an original tukutuku pattern and write a mathematical analysis
explaining the geometric transformations used.</p>
                        <p><strong>Assessment Focus: </strong></p>
                        <ul>
                            <li>Accurate application of transformation mathematics</li>
                            <li>Respectful representation of cultural design principles</li>
                            <li>Clear explanation of how traditional patterns demonstrate mathematical concepts</li>
                            <li>Creative integration of both domains</li>
                        </ul>
                    </div>

                    <div class="bg-white">
                        <h4>🌊 Physics: Navigation Challenge</h4>
                        <p><strong>Task:</strong> Plan a traditional navigation route between two Pacific islands using
wave physics, celestial mechanics, and traditional knowledge.</p>
                        <p><strong>Assessment Focus: </strong></p>
                        <ul>
                            <li>Correct application of physics principles to navigation</li>
                            <li>Understanding of traditional navigation techniques</li>
                            <li>Integration of scientific calculations with cultural knowledge</li>
                            <li>Practical problem-solving using both approaches</li>
                        </ul>
                    </div>
                </div>

                <h3>Student Self-Assessment Questions</h3>
                <div class="reflection-prompts">
                    <h4>🤔 Reflection Prompts for Students</h4>
                    <ul>
                        <li><strong>Scientific Understanding:</strong> "How has learning about traditional knowledge
changed my understanding of mathematics/science?"</li>
                        <li><strong>Cultural Appreciation: </strong> "What did I learn about the sophistication of
traditional knowledge systems?"</li>
                        <li><strong>Integration: </strong> "How do traditional practices demonstrate scientific
principles I'm learning?"</li>
                        <li><strong>Application: </strong> "How can I use this integrated knowledge to solve real-world
problems?"</li>
                        <li><strong>Future Learning: </strong> "What aspects of cultural science knowledge am I most
interested in exploring further?"</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="scoring-sheets">
            <div class="assessment-framework">
                <h2 class="wiley-section-title">📊 Quick Reference Scoring Sheet</h2>

                <div
class="bg-white">
                    <h3>Student: _______________ Date: ___________ Task: ___________________</h3>

                    <div
style="display: grid grid-template-columns: 2fr 1fr 1fr 1fr 1fr gap: 1rem margin: var(--space-4) 0 font-size: var(--text-sm)">
                        <div><strong>Assessment Criteria</strong></div>
                        <div><strong>Excellent (4)</strong></div>
                        <div><strong>Proficient (3)</strong></div>
                        <div><strong>Developing (2)</strong></div>
                        <div><strong>Beginning (1)</strong></div>

                        <div>🔬 Scientific/Mathematical Understanding</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>

                        <div>🌿 Cultural Knowledge & Respect</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>

                        <div>🔗 Integration & Synthesis</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>

                        <div>💬 Communication & Application</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>

                        <div>👥 Community Connection & Engagement</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                        <div class="text-center">☐</div>
                    </div>

                    <p><strong>Overall Performance Level: </strong> ________________</p>
                    <p><strong>Key Strengths:</strong> _________________________________________________</p>
                    <p><strong>Areas for Growth:</strong> _______________________________________________</p>
                    <p><strong>Next Steps:</strong> ____________________________________________________</p>
                </div>
            </div>
        </section>

        <div class="rubric-header">
            <h2 class="wiley-section-title">🎯 Impact of Culturally-Responsive Assessment</h2>
            <p>This rubric supports learning that is:</p>
            <ul style="text-align: left max-width: 700px margin: 0 auto font-size: var(--text-lg)">
                <li>🔬 <strong>Scientifically rigorous</strong> while culturally affirming</li>
                <li>🌿 <strong>Respectful of diverse knowledge systems</strong> and ways of knowing</li>
                <li>🔗 <strong>Integrative and holistic</strong> rather than compartmentalized</li>
                <li>👥 <strong>Community-connected</strong> and socially relevant</li>
                <li>🚀 <strong>Empowering for all students</strong> regardless of cultural background</li>
            </ul>
            <br>
            <p><em>"When we assess what we value, students learn that both scientific excellence and cultural wisdom
matter."</em></p>
        </div>

        <div class="print-friendly-note">
            <p><strong>Print-Friendly Version: </strong> This rubric prints clearly for easy classroom use and
professional development.</p>
        </div>
    ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default CulturalStemAssessmentRubric
