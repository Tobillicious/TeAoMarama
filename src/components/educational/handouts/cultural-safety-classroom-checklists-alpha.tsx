import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface CulturalSafetyClassroomChecklistsAlphaProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const CulturalSafetyClassroomChecklistsAlpha: React.FC<CulturalSafetyClassroomChecklistsAlphaProps> = ({
  culturalContext = "Cultural practices and traditional knowledge",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="cultural-safety-classroom-checklists-alpha">
      <Card title="Cultural Safety Checklists for Classroom Discussions - Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Cultural Safety Checklists for Classroom Discussions - Te Kete Ako</h1>
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
        <h1 class="wiley-hero-title">Cultural Safety Checklists for Classroom Discussions</h1>
        <p><strong>Te Kete Ako</strong> | Social Sciences | Years 7-13 | Alpha Build Resource</p>
        <p><em>Creating Safe Learning Environments for All Students</em></p>
    </div>

    <div class="cultural-protocol">
        <h3>🌟 <span class="maori-term">Tikanga</span> Foundation - Cultural Safety Principles</h3>
        <p><strong><span class="maori-term">Manaakitanga</span> (Hospitality & Care):</strong> Every student deserves to feel welcomed, respected, and valued in classroom discussions.</p>
        <p><strong><span class="maori-term">Whakatōhea</span> (Collective Responsibility):</strong> Creating cultural safety is everyone's responsibility - teacher and students together.</p>
        <p><strong><span class="maori-term">Whakapapa</span> (Connections):</strong> Recognize that students bring rich cultural knowledge and experiences to learning.</p>
        
        <div class="warning-box">
            <strong>⚠️ Critical Understanding:</strong> Cultural safety goes beyond cultural awareness. It means that no one is diminished, demotivated, or disempowered because of their cultural identity.
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>📋 Pre-Discussion Planning Checklist</h3>
        <p><strong>Complete before facilitating any cultural content discussion:</strong></p>
        
        <ul class="checklist">
            <li>Review topic for potential cultural sensitivities and biases</li>
            <li>Identify diverse perspectives that should be included</li>
            <li>Prepare culturally accurate information and resources</li>
            <li>Plan discussion ground rules with cultural safety in mind</li>
            <li>Consider which students might be directly affected by the topic</li>
            <li>Prepare alternative activities for students who need to opt out</li>
            <li>Have support contacts ready (counselor, cultural advisor)</li>
            <li>Check your own cultural assumptions and potential biases</li>
            <li>Ensure visual materials represent diverse cultures accurately</li>
            <li>Plan how to handle inappropriate comments or questions</li>
        </ul>
        
        <div class="tip-box">
            <strong>💡 Teacher Reflection:</strong> Ask yourself - "Would I feel comfortable if this discussion was about my own cultural background?" Use this as a guide for cultural sensitivity.
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>🗣️ During Discussion - Active Monitoring Checklist</h3>
        <p><strong>Monitor these elements throughout the discussion:</strong></p>
        
        <ul class="checklist">
            <li>All students feel safe to participate or remain silent</li>
            <li>No student is expected to represent their entire culture</li>
            <li>Stereotypes are challenged immediately and respectfully</li>
            <li>Multiple perspectives are actively sought and valued</li>
            <li>Students use respectful language when discussing differences</li>
            <li>Cultural practices are discussed without judgment</li>
            <li>Historical context is provided for cultural issues</li>
            <li>Power imbalances in the room are acknowledged</li>
            <li>Students' emotional responses are acknowledged</li>
            <li>Discussion stays focused on learning, not personal experiences</li>
        </ul>
        
        <div class="scenario-box">
            <strong>⚠️ Red Flag Situations:</strong>
            <ul>
                <li>Student becomes withdrawn or visibly upset</li>
                <li>Inappropriate jokes or comments about cultural groups</li>
                <li>One cultural perspective dominates the discussion</li>
                <li>Students making assumptions based on appearance</li>
                <li>Discussion becomes argumentative rather than educational</li>
            </ul>
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>🎯 Discussion Ground Rules - Student Version</h3>
        <p><strong>Share these with students before cultural discussions:</strong></p>
        
        <div style="background: #e7f3ff; padding: 20px; border-radius: var(--radius-md); margin: 15px 0;">
            <h4>Our Classroom <span class="maori-term">Whakataukī</span> (Values):</h4>
            <ul class="checklist">
                <li><strong>Respect (</strong><span class="maori-term">Whakatōhea</span><strong>):</strong> All cultures and perspectives are valued</li>
                <li><strong>Listen (</strong><span class="maori-term">Whakarongo</span><strong>):</strong> Truly hear what others are sharing</li>
                <li><strong>Learn (</strong><span class="maori-term">Ako</span><strong>):</strong> Be open to new understanding</li>
                <li><strong>Support (</strong><span class="maori-term">Awhi</span><strong>):</strong> Help create safety for everyone</li>
                <li><strong>Speak Thoughtfully:</strong> Consider impact before speaking</li>
                <li><strong>Ask Respectfully:</strong> Questions should come from genuine curiosity</li>
                <li><strong>Share Appropriately:</strong> Only share what feels safe and relevant</li>
                <li><strong>Step Up, Step Back:</strong> Ensure everyone has space to participate</li>
            </ul>
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>🛡️ Intervention Strategies Checklist</h3>
        <p><strong>When cultural safety is compromised, use these strategies:</strong></p>
        
        <table>
            <thead>
                <tr>
                    <th>Situation</th>
                    <th>Immediate Response</th>
                    <th>Follow-up Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Stereotype voiced</td>
                    <td>"Let's pause and think about that. What other perspectives might there be?"</td>
                    <td>Provide accurate information, discuss stereotypes privately</td>
                </tr>
                <tr>
                    <td>Student becomes upset</td>
                    <td>"Thank you for sharing your perspective. Let's take a brief pause."</td>
                    <td>Check in privately, offer support, adjust discussion</td>
                </tr>
                <tr>
                    <td>Inappropriate joke/comment</td>
                    <td>"That comment doesn't align with our classroom values. Let's refocus."</td>
                    <td>Private conversation, restorative process if needed</td>
                </tr>
                <tr>
                    <td>One voice dominating</td>
                    <td>"Thank you [Name]. Let's hear from someone who hasn't shared yet."</td>
                    <td>Adjust participation strategies, individual guidance</td>
                </tr>
                <tr>
                    <td>Factual misinformation</td>
                    <td>"I want to check that information. Let me provide some context."</td>
                    <td>Research and follow up with accurate information</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="checklist-container print-friendly">
        <h3>✅ Post-Discussion Reflection Checklist</h3>
        <p><strong>After each cultural discussion, reflect on:</strong></p>
        
        <ul class="checklist">
            <li>Did all students appear comfortable and engaged?</li>
            <li>Were multiple cultural perspectives represented?</li>
            <li>Was accurate information shared about different cultures?</li>
            <li>Were stereotypes challenged appropriately?</li>
            <li>Did the discussion enhance understanding rather than reinforce biases?</li>
            <li>Do any students need individual follow-up support?</li>
            <li>What could be improved for next time?</li>
            <li>Should I consult with cultural advisors about this topic?</li>
            <li>Were learning objectives met in a culturally safe way?</li>
            <li>How can I build on this discussion in future lessons?</li>
        </ul>
        
        <div class="success-box">
            <strong>🎉 Signs of Success:</strong>
            <ul>
                <li>Students ask thoughtful, respectful questions</li>
                <li>Multiple perspectives are shared and valued</li>
                <li>Students challenge stereotypes respectfully</li>
                <li>Cultural knowledge is treated as valuable</li>
                <li>Students express appreciation for learning about differences</li>
            </ul>
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>🌍 Subject-Specific Cultural Considerations</h3>
        
        <h4>Social Sciences</h4>
        <ul class="checklist">
            <li>Present colonization from multiple perspectives</li>
            <li>Include indigenous voices in historical narratives</li>
            <li>Discuss ongoing impacts, not just past events</li>
            <li>Avoid deficit discourse about any cultural group</li>
        </ul>
        
        <h4>English/Literature</h4>
        <ul class="checklist">
            <li>Include diverse authors and cultural stories</li>
            <li>Discuss cultural context of texts</li>
            <li>Avoid cultural appropriation in creative writing</li>
            <li>Respect oral traditions and storytelling protocols</li>
        </ul>
        
        <h4>Science</h4>
        <ul class="checklist">
            <li>Include indigenous knowledge systems</li>
            <li>Discuss diverse contributions to scientific discovery</li>
            <li>Avoid presenting Western science as the only valid knowledge</li>
            <li>Explore cultural applications of scientific concepts</li>
        </ul>
        
        <h4>Mathematics</h4>
        <ul class="checklist">
            <li>Include diverse mathematical traditions</li>
            <li>Use culturally relevant contexts for problems</li>
            <li>Discuss mathematics in different cultural contexts</li>
            <li>Avoid assumptions about mathematical ability based on culture</li>
        </ul>
    </div>

    <div class="cultural-protocol">
        <h3>🤝 Building Cultural Competence - Teacher Development</h3>
        
        <div class="tip-box">
            <strong>Ongoing Professional Development:</strong>
            <ul>
                <li>Engage in cultural competency training regularly</li>
                <li>Build relationships with cultural communities</li>
                <li>Reflect on your own cultural identity and biases</li>
                <li>Seek feedback from culturally diverse colleagues</li>
                <li>Stay updated on culturally responsive pedagogy</li>
            </ul>
        </div>
        
        <div class="warning-box">
            <strong>Remember:</strong> Cultural safety is an ongoing practice, not a one-time achievement. It requires constant reflection, learning, and adaptation.
        </div>
    </div>

    <div class="checklist-container print-friendly">
        <h3>📞 Support Network - Who to Contact</h3>
        
        <table>
            <thead>
                <tr>
                    <th>Situation</th>
                    <th>Contact Person</th>
                    <th>When to Contact</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Student distress</td>
                    <td>School Counselor</td>
                    <td>Immediately if student is upset</td>
                </tr>
                <tr>
                    <td>Cultural protocol questions</td>
                    <td>Cultural Advisor/Kaumātua</td>
                    <td>Before discussing sensitive cultural topics</td>
                </tr>
                <tr>
                    <td>Serious cultural incident</td>
                    <td>Deputy Principal</td>
                    <td>If cultural safety is significantly compromised</td>
                </tr>
                <tr>
                    <td>Parent/Whānau concerns</td>
                    <td>Whānau Liaison</td>
                    <td>When families express cultural concerns</td>
                </tr>
                <tr>
                    <td>Professional development</td>
                    <td>HOD/Professional Learning Leader</td>
                    <td>To improve cultural competency</td>
                </tr>
            </tbody>
        </table>
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
  );
};

export default CulturalSafetyClassroomChecklistsAlpha;
