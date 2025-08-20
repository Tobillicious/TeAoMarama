import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface Year9StarterPackAlphaBuildProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const Year9StarterPackAlphaBuild: React.FC<Year9StarterPackAlphaBuildProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="year-9-starter-pack-alpha-build">
      <Card title="Year 9 Starter Pack: Essential Skills for High School Success - Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Year 9 Starter Pack: Essential Skills for High School Success - Te Kete Ako</h1>
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
    <div class="header">
        <h1 class="wiley-hero-title">Year 9 Starter Pack: Essential Skills for High School Success</h1>
        <p><strong>Te Kete Ako</strong> | Cross-Curricular | Year 9 | Alpha Build Resource</p>
    </div>

    <div class="cultural-context">
        <h3>🌟 Cultural Context - <span class="maori-term">Te Ao Māori</span> Foundation</h3>
        <p>This resource honors the principle of <span class="maori-term">ako</span> (reciprocal learning) and <span class="maori-term">manaakitanga</span> (caring for others). As you begin your high school journey, remember that learning is a collective responsibility where everyone contributes to the success of the <span class="maori-term">whakapapa</span> (learning community).</p>
        <p><strong>Tikanga Protocol: </strong> This resource should be used with respect for diverse learning styles and cultural backgrounds, ensuring all students feel valued and supported.</p>
    </div>

    <div class="objectives">
        <h3>🎯 Learning Objectives</h3>
        <p><strong>By using this starter pack, Year 9 students will: </strong></p>
        <ul class="checklist">
            <li>Develop essential organizational and study skills for high school success</li>
            <li>Understand the importance of cultural identity in learning</li>
            <li>Build confidence in academic and social transitions</li>
            <li>Learn to seek help and support when needed</li>
            <li>Establish healthy learning habits and routines</li>
            <li>Connect their personal values with educational goals</li>
        </ul>
    </div>

    <div class="skill-card">
        <h3>📚 Academic Organization Skills</h3>
        <h4>Essential Tools for Success</h4>
        <ul class="checklist">
            <li><strong>Digital Organization:</strong> Use Google Drive folders for each subject</li>
            <li><strong>Physical Organization:</strong> Maintain separate notebooks/binders</li>
            <li><strong>Time Management:</strong> Use a planner or digital calendar</li>
            <li><strong>Assignment Tracking:</strong> Record all due dates immediately</li>
        </ul>
        
        <div class="tip-box">
            <strong>💡 Māori Wisdom:</strong> <span class="maori-term">Kia rite</span> - Be prepared. Traditional Māori knowledge keepers were always well-prepared and organized in their learning and teaching.
        </div>
        
        <h4>Weekly Planning Template</h4>
        <p><strong>Sunday Planning Ritual (15 minutes):</strong></p>
        <ul>
            <li>Review upcoming week's classes and assignments</li>
            <li>Set 3 academic goals for the week</li>
            <li>Identify potential challenges and solutions</li>
            <li>Plan study time for each subject</li>
        </ul>
    </div>

    <div class="skill-card">
        <h3>🤝 Social Connection & Support</h3>
        <h4>Building Your <span class="maori-term">Whānau</span> Network</h4>
        <p>In Māori culture, <span class="maori-term">whānau</span> extends beyond family to include your learning community. Build supportive relationships: </p>
        
        <ul class="checklist">
            <li><strong>Study Buddies:</strong> Find reliable classmates in each subject</li>
            <li><strong>Teacher Relationships:</strong> Introduce yourself to all teachers early</li>
            <li><strong>Peer Mentors:</strong> Connect with older students who can guide you</li>
            <li><strong>Support Services:</strong> Know where to find academic and personal help</li>
        </ul>
        
        <div class="warning-box">
            <strong>⚠️ Cultural Safety:</strong> If you ever feel uncomfortable or excluded due to your cultural background, speak to a trusted teacher or counselor immediately. Every student deserves to feel safe and valued.
        </div>
    </div>

    <div class="skill-card">
        <h3>📖 Study Techniques That Work</h3>
        <h4>Evidence-Based Learning Strategies</h4>
        
        <ul class="checklist">
            <li><strong>Active Reading: </strong> Take notes, ask questions, summarize</li>
            <li><strong>Spaced Repetition: </strong> Review material multiple times over days</li>
            <li><strong>Practice Testing:</strong> Quiz yourself regularly</li>
            <li><strong>Teaching Others:</strong> Explain concepts to family/friends</li>
            <li><strong>Connection Making:</strong> Link new learning to what you know</li>
        </ul>
        
        <div class="tip-box">
            <strong>💡 Traditional Knowledge:</strong> Māori learning often used storytelling (<span class="maori-term">pūrākau</span>) and practical application. Try creating stories or real-world connections with your academic content.
        </div>
    </div>

    <div class="skill-card">
        <h3>💪 Resilience & Growth Mindset</h3>
        <h4>Developing <span class="maori-term">Whakatōhea</span> (Determination)</h4>
        
        <p>High school will have challenges. Building resilience helps you bounce back stronger:</p>
        
        <ul class="checklist">
            <li><strong>Embrace Mistakes:</strong> View errors as learning opportunities</li>
            <li><strong>Seek Feedback:</strong> Ask teachers how to improve</li>
            <li><strong>Celebrate Progress:</strong> Acknowledge small wins</li>
            <li><strong>Stay Connected:</strong> Talk to whānau about challenges</li>
            <li><strong>Practice Self-Care:</strong> Maintain physical and mental wellbeing</li>
        </ul>
        
        <div class="tip-box">
            <strong>💡 Whakataukī (Māori Proverb):</strong><br>
            <em><span class="maori-term">"He aha te mea nui o te ao? He tangata, he tangata, he tangata."</span></em><br>
What is the most important thing in the world? It is people, it is people, it is people.
        </div>
    </div>

    <div class="assessment">
        <h3>📋 Self-Assessment Checklist</h3>
        <p><strong>Rate yourself weekly (1-5 scale):</strong></p>
        
        <table style="width: 100% border-collapse: collapse margin: 15px 0">
            <thead>
                <tr style="background: #007bff color: white">
                    <th style="padding: 10px text-align: left">Skill Area</th>
                    <th style="padding: 10px text-align: center">Week 1</th>
                    <th style="padding: 10px text-align: center">Week 2</th>
                    <th style="padding: 10px text-align: center">Week 3</th>
                    <th style="padding: 10px text-align: center">Week 4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px border: 1px solid #ddd">Organization & Planning</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                </tr>
                <tr>
                    <td style="padding: 10px border: 1px solid #ddd">Social Connections</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                </tr>
                <tr>
                    <td style="padding: 10px border: 1px solid #ddd">Study Habits</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                </tr>
                <tr>
                    <td style="padding: 10px border: 1px solid #ddd">Cultural Confidence</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                </tr>
                <tr>
                    <td style="padding: 10px border: 1px solid #ddd">Resilience & Growth</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                    <td style="padding: 10px border: 1px solid #ddd text-align: center">___</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="teacher-notes">
        <h3>👩‍🏫 Teacher Implementation Guide</h3>
        
        <h4>Suggested Usage: </h4>
        <ul>
            <li><strong>Orientation Week:</strong> Introduce during Year 9 transition program</li>
            <li><strong>Form Time:</strong> Use sections for weekly form class discussions</li>
            <li><strong>Parent Communication:</strong> Share with whānau to support home-school partnership</li>
            <li><strong>Individual Conferences:</strong> Reference during student goal-setting meetings</li>
        </ul>
        
        <h4>Cultural Considerations:</h4>
        <ul>
            <li>Respect diverse cultural backgrounds beyond Māori perspectives</li>
            <li>Adapt Māori concepts sensitively for non-Māori students</li>
            <li>Encourage students to share their own cultural learning practices</li>
            <li>Connect with whānau liaison or cultural advisors when needed</li>
        </ul>
        
        <h4>Differentiation Strategies:</h4>
        <ul>
            <li><strong>Visual Learners:</strong> Create infographics of key concepts</li>
            <li><strong>Kinesthetic Learners:</strong> Use role-play for social scenarios</li>
            <li><strong>Advanced Students:</strong> Assign peer mentoring roles</li>
            <li><strong>Struggling Students:</strong> Focus on one skill area at a time</li>
        </ul>
        
        <div class="warning-box">
            <strong>⚠️ Important:</strong> Monitor student progress closely in the first term. Early intervention is crucial for successful transitions.
        </div>
    </div>

    <div class="skill-card">
        <h3>🔗 Additional Resources & Support</h3>
        
        <h4>School Support Services:</h4>
        <ul>
            <li><strong>Guidance Counselors:</strong> Academic and personal support</li>
            <li><strong>Learning Support:</strong> Study skills and academic assistance</li>
            <li><strong>Cultural Groups:</strong> Connect with cultural identity clubs</li>
            <li><strong>Peer Tutoring:</strong> Subject-specific help from older students</li>
        </ul>
        
        <h4>Online Resources:</h4>
        <ul>
            <li><strong>NZQA Website:</strong> Understanding NCEA requirements</li>
            <li><strong>StudyTime:</strong> Study planning and organization tools</li>
            <li><strong>Māori Dictionary:</strong> Te Aka online dictionary for Māori terms</li>
            <li><strong>Khan Academy:</strong> Free academic support in multiple subjects</li>
        </ul>
        
        <div class="tip-box">
            <strong>💡 Remember:</strong> Asking for help is a sign of strength, not weakness. Successful students use all available resources and support systems.
        </div>
    </div>

                    <footer class="site-footer no-print">
        <div class="footer-content">
            <div class="footer-simple">
                <div class="footer-brand">
                    <h3>🧺 Te Kete Ako</h3>
                    <p>"Whaowhia te kete mātauranga" - Fill the basket of knowledge</p>
                </div>
                <div class="footer-links">
                    <a href="unit-plans.html">Unit Plans</a>
                    <a href="lessons.html">Lessons</a>
                    <a href="handouts.html">Handouts</a>
                    <a href="my-kete.html">My Kete</a>
                    <a href="sitemap.html">Sitemap</a>
                    <a href="orphans.html">Discover</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Te Kete Ako - Educational resources for Aotearoa New Zealand</span>
            </div>
        </div>
    </footer>
` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default Year9StarterPackAlphaBuild
