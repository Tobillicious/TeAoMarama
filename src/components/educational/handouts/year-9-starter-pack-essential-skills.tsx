import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface Year9StarterPackEssentialSkillsProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const Year9StarterPackEssentialSkills: React.FC<Year9StarterPackEssentialSkillsProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="year-9-starter-pack-essential-skills">
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
                    <header class="site-header no-print">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">Te Kete Ako</a>
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="unit-plans.html">
                            <span class="nav-icon">📚</span>
                            <span class="nav-text-en">Unit Plans</span>
                            <span class="nav-text-mi" lang="mi">Ngā Waehere</span>
                        </a>
                    </li>
                    <li>
                        <a href="teachers/index.html">
                            <span class="nav-icon">🧑‍🏫</span>
                            <span class="nav-text-en">Teachers</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kaiako</span>
                        </a>
                    </li>
                    <li>
                        <a href="lessons.html">
                            <span class="nav-icon">🎓</span>
                            <span class="nav-text-en">Lessons</span>
                            <span class="nav-text-mi" lang="mi">Ngā Akoranga</span>
                        </a>
                    </li>
                    <li>
                        <a href="handouts.html">
                            <span class="nav-icon">📄</span>
                            <span class="nav-text-en">Handouts</span>
                            <span class="nav-text-mi" lang="mi">Ngā Rauemi</span>
                        </a>
                    </li>
                    <li>
                        <a href="games.html">
                            <span class="nav-icon">🎮</span>
                            <span class="nav-text-en">Games</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kēmu</span>  
                        </a>
                    </li>
                    <li class="auth-nav my-kete-link" style="display: none;">
                        <a href="my-kete.html">
                            <span class="nav-icon">🧺</span>
                            My Kete
                        </a>
                    </li>
                    <li class="auth-nav">
                        <a href="login.html" class="login-btn">
                            <span class="nav-icon">👤</span>
                            Login
                        </a>
                    </li>
                    <li class="auth-nav" style="display: none;">
                        <a href="register-simple.html" class="register-btn">
                            <span class="nav-icon">📝</span>
                            Register
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="breadcrumbs no-print" aria-label="Breadcrumb">
                <ol id="breadcrumbs" class="breadcrumbs-list"></ol>
            </nav>
        </div>
    </header>

    <section>
        <h2 class="wiley-section-title">Learning Objectives</h2>
        <p>By engaging with this resource, students will:</p>
        <ul class="checklist">
            <li>Develop effective organizational strategies for high school</li>
            <li>Understand key tikanga (protocols) for school environments</li>
            <li>Apply time management techniques to balance academic and personal commitments</li>
            <li>Build positive relationships with peers and teachers</li>
            <li>Navigate digital learning platforms confidently</li>
            <li>Develop strategies for seeking help when needed</li>
        </ul>
        <p><strong>NZ Curriculum Alignment:</strong> Key Competencies - Managing Self, Relating to Others, Participating and Contributing</p>
    </section>

    <section class="maori-section">
        <h2 class="wiley-section-title">Te Ao Māori Context</h2>
        <p><span class="maori-term">Whakataukī (Proverb):</span> "Ehara taku toa i te toa takitahi, engari he toa takitini" - My success is not mine alone, but the success of many.</p>
        
        <h3>Tikanga for School Success</h3>
        <ul>
            <li><span class="maori-term">Manaakitanga:</span> Show respect and care for others in your learning community</li>
            <li><span class="maori-term">Whanaungatanga:</span> Build positive relationships with teachers and classmates</li>
            <li><span class="maori-term">Ako:</span> Embrace being both a learner and teacher in different situations</li>
            <li><span class="maori-term">Kaitiakitanga:</span> Take responsibility for your learning environment and resources</li>
        </ul>
        
        <div class="activity-box">
            <h3>Reflection Activity: Pepeha</h3>
            <p>Create your personal <span class="maori-term">pepeha</span> (introduction) to share with your class:</p>
            <ol>
                <li>Your mountain (<span class="maori-term">maunga</span>)</li>
                <li>Your river/lake (<span class="maori-term">awa/moana</span>)</li>
                <li>Your family/whānau</li>
                <li>Your name and something special about you</li>
            </ol>
            <p><em>Tip: This helps teachers and classmates understand who you are and where you come from.</em></p>
        </div>
    </section>

    <section>
        <h2 class="wiley-section-title">Essential Skills for High School</h2>
        
        <div class="activity-box">
            <h3>1. Organization Systems</h3>
            <p>Create systems that work for you:</p>
            <ul class="checklist">
                <li>Use a physical planner or digital calendar</li>
                <li>Color-code subjects for easy identification</li>
                <li>Set up subject folders (digital and physical)</li>
                <li>Pack your bag the night before</li>
            </ul>
            
            <h4>Weekly Planning Challenge</h4>
            <p>Complete this table for your first week:</p>
            <table>
                <tr>
                    <th>Day</th>
                    <th>Morning Preparation</th>
                    <th>After School</th>
                    <th>Evening</th>
                </tr>
                <tr>
                    <td>Monday</td>
                    <td><input type="text" style="width:100%"></td>
                    <td><input type="text" style="width:100%"></td>
                    <td><input type="text" style="width:100%"></td>
                </tr>
                <tr>
                    <td>Tuesday</td>
                    <td><input type="text" style="width:100%"></td>
                    <td><input type="text" style="width:100%"></td>
                    <td><input type="text" style="width:100%"></td>
                </tr>
                <!-- Additional rows for each day -->
            </table>
        </div>
        
        <div class="activity-box">
            <h3>2. Digital Literacy</h3>
            <p>Master these essential digital skills:</p>
            <ul class="checklist">
                <li>Logging into school systems (email, LMS)</li>
                <li>File management (naming, organizing)</li>
                <li>Basic troubleshooting (restart, check connections)</li>
                <li>Digital citizenship (appropriate online behavior)</li>
            </ul>
            
            <h4>Tech Scavenger Hunt</h4>
            <p>Find and document these school tech resources:</p>
            <ol>
                <li>Where is the IT help desk?</li>
                <li>What's the school's WiFi network name?</li>
                <li>How do you access the library catalog?</li>
                <li>Where can you print documents?</li>
            </ol>
        </div>
    </section>

    <section>
        <h2 class="wiley-section-title">Assessment Rubric</h2>
        <table>
            <tr>
                <th>Criteria</th>
                <th>Developing (1-2)</th>
                <th>Achieving (3-4)</th>
                <th>Excelling (5-6)</th>
            </tr>
            <tr>
                <td>Organization</td>
                <td>Basic systems in place</td>
                <td>Effective systems used regularly</td>
                <td>Sophisticated systems supporting learning</td>
            </tr>
            <tr>
                <td>Time Management</td>
                <td>Occasionally meets deadlines</td>
                <td>Consistently meets deadlines</td>
                <td>Plans ahead and balances commitments</td>
            </tr>
            <tr>
                <td>Participation</td>
                <td>Minimal engagement</td>
                <td>Active in class discussions</td>
                <td>Leads discussions and supports peers</td>
            </tr>
            <tr>
                <td>Seeking Help</td>
                <td>Rarely asks for assistance</td>
                <td>Seeks help when needed</td>
                <td>Proactively identifies support needs</td>
            </tr>
        </table>
    </section>

    <section>
        <h2 class="wiley-section-title">Extension Activities</h2>
        <div class="activity-box">
            <h3>1. Leadership Challenge</h3>
            <p>Identify one area where you can demonstrate leadership:</p>
            <ul>
                <li>Peer mentoring for new students</li>
                <li>Organizing a study group</li>
                <li>Starting a club or initiative</li>
            </ul>
        </div>
        
        <div class="activity-box">
            <h3>2. Cultural Connections</h3>
            <p>Research and present on one of these topics:</p>
            <ul>
                <li>The history of your school's local area (<span class="maori-term">rohe</span>)</li>
                <li>Traditional Māori learning methods (<span class="maori-term">ako</span>)</li>
                <li>Significant Māori leaders in education</li>
            </ul>
        </div>
    </section>

    <section>
        <h2 class="wiley-section-title">Teacher Implementation Guide</h2>
        <h3>Suggested Timeline</h3>
        <ul>
            <li><strong>Week 1:</strong> Introduce resource, complete pepeha and organization activities</li>
            <li><strong>Week 2:</strong> Focus on digital literacy and time management</li>
            <li><strong>Week 3:</strong> Relationship building and support systems</li>
            <li><strong>Ongoing:</strong> Revisit sections as needed throughout term</li>
        </ul>
        
        <h3>Differentiation Strategies</h3>
        <ul>
            <li>Provide templates for students needing additional support</li>
            <li>Pair students for peer mentoring activities</li>
            <li>Offer digital and paper-based options for activities</li>
        </ul>
        
        <h3>Assessment Suggestions</h3>
        <ul>
            <li>Student self-assessment using the rubric</li>
            <li>Teacher observation of organizational systems</li>
            <li>Peer feedback on participation</li>
        </ul>
    </section>

    <section>
        <h2 class="wiley-section-title">Additional Resources</h2>
        <h3>Cultural References</h3>
        <ul>
            <li>Te Ara - Encyclopedia of New Zealand: <a href="https://teara.govt.nz" target="_blank" rel="noopener">teara.govt.nz</a></li>
            <li>Māori Dictionary: <a href="https://maoridictionary.co.nz" target="_blank" rel="noopener">maoridictionary.co.nz</a></li>
        </ul>
        
        <h3>Learning Tools</h3>
        <ul>
            <li>StudyTime NZ: <a href="https://studytime.co.nz" target="_blank" rel="noopener">studytime.co.nz</a></li>
            <li>NZQA Study Guides: <a href="https://www.nzqa.govt.nz" target="_blank" rel="noopener">nzqa.govt.nz</a></li>
        </ul>
    </section>

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

export default Year9StarterPackEssentialSkills;
