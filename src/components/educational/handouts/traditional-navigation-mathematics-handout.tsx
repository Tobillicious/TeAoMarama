import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface TraditionalNavigationMathematicsHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const TraditionalNavigationMathematicsHandout: React.FC<TraditionalNavigationMathematicsHandoutProps> = ({
  culturalContext = "Traditional knowledge and cultural practices",
  yearLevel = "Year 8-10",
  subject = "Mathematics, Science"
}) => {
  return (
    <div className="traditional-navigation-mathematics-handout">
      <Card title="Traditional Navigation & Mathematics | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Traditional Navigation & Mathematics | Te Kete Ako</h1>
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
            <div style="margin-bottom: 2rem;">
                <a href="handouts.html" style="color: var(--color-secondary); text-decoration: none;">&larr; Back to Handouts</a>
                <h1 style="color: var(--color-primary); margin: var(--space-4) 0;" class="wiley-hero-title">Traditional Navigation & Mathematics</h1>
                <h2 style="color: var(--color-secondary); margin: 0.5rem 0; font-weight: normal;" class="wiley-section-title">Exploring Polynesian Navigation Through Mathematical Thinking</h2>
            </div>

            <!-- Cultural Opening -->
            <section style="background: linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent) 100%); color: white; padding: var(--space-8); border-radius: var(--radius-lg); margin-bottom: 2rem;">
                <div class="text-center">
                    <p style="font-style: italic; font-size: var(--text-xl); margin-bottom: var(--space-2);">"Kia whakatōmuri te haere whakamua"</p>
                    <p style="font-size: 1rem; opacity: 0.9;">I walk backwards into the future with my eyes fixed on my past</p>
                </div>
                <p style="line-height: 1.7; margin-top: 1.5rem;">Traditional Polynesian navigation was one of humanity's greatest achievements in mathematics, astronomy, and environmental science. Navigators could sail thousands of kilometers across open ocean using only observations of stars, waves, and wildlife.</p>
            </section>

            <!-- Activity 1: Star Compass Mathematics -->
            <section id="star-compass" class="lesson-section">
                <h2 class="wiley-section-title">⭐ Activity 1: The Star Compass (15 minutes)</h2>
                
                <div class="activity-box">
                    <div class="instruction-box">
                        <h4>Instructions</h4>
                        <p>Traditional navigators divided the horizon into 32 directions using star positions. This created a mental "star compass" for navigation. Let's explore the mathematics behind this system.</p>
                    </div>

                    <p><strong>Mathematical Foundation:</strong> A circle has 360°. Traditional navigators divided this into 32 equal sections.</p>

                    <div class="math-formula">
                        360° ÷ 32 directions = _____ degrees per direction
                    </div>

                    <div class="calculation-space">
                        <h5>Show your calculation:</h5>
                        
                    </div>

                    <div class="challenge-box">
                        <h5>Star Direction Challenge</h5>
                        <p>If a navigator knows that a particular star rises at the 8th direction on their star compass, what angle is this from North?</p>
                        
                        <div class="step-by-step">
                            <p><strong>Step 1:</strong> Each direction = <span class="answer-line">_____</span> degrees</p>
                            <p><strong>Step 2:</strong> 8th direction = 8 × <span class="answer-line">_____</span> = <span class="answer-line">_____</span> degrees from North</p>
                        </div>
                    </div>

                    <p style="font-style: italic; font-size: var(--text-sm);">Use the grid above to draw a simple star compass showing North and the 8th direction.</p>
                </div>
            </section>

            <!-- Activity 2: Ocean Journey Mathematics -->
            <section id="ocean-journey" class="lesson-section">
                <h2 class="wiley-section-title">🚢 Activity 2: Ocean Journey Mathematics (20 minutes)</h2>
                
                <div class="activity-box">
                    <div class="instruction-box">
                        <h4>Scenario</h4>
                        <p>A traditional navigator plans a journey from Tahiti to Hawaii (approximately 4,000 km). Their voyaging canoe travels at an average speed of 8 km/hour when sailing.</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin: var(--space-4) 0;">
                        <thead>
                            <tr style="background: var(--color-secondary); color: white;">
                                <th style="padding: var(--space-4); border: 1px solid #ddd;">Journey Information</th>
                                <th style="padding: var(--space-4); border: 1px solid #ddd;">Your Calculation</th>
                                <th style="padding: var(--space-4); border: 1px solid #ddd;">Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;">Total distance: 4,000 km<br>Canoe speed: 8 km/hour<br><strong>Calculate: Total sailing time</strong></td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd; min-height: 60px; background: #fafafa;"></td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;"><span class="answer-line">_____</span> hours</td>
                            </tr>
                            <tr>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;"><strong>Convert to days:</strong><br>(Remember: 24 hours = 1 day)</td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd; min-height: 60px; background: #fafafa;"></td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;"><span class="answer-line">_____</span> days</td>
                            </tr>
                            <tr>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;"><strong>Food planning:</strong><br>If crew of 12 people each need 2 kg food per day, how much food needed?</td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd; min-height: 60px; background: #fafafa;"></td>
                                <td style="padding: var(--space-4); border: 1px solid #ddd;"><span class="answer-line">_____</span> kg</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="cultural-note">
                        <h5>Cultural Insight</h5>
                        <p>Traditional navigators had to plan not just routes, but also food, water, and seasonal timing. Getting these calculations wrong could mean death at sea, so mathematical accuracy was literally a matter of survival.</p>
                    </div>
                </div>
            </section>

            <!-- Activity 3: Wave Pattern Geometry -->
            <section id="wave-patterns" class="lesson-section">
                <h2 class="wiley-section-title">🌊 Activity 3: Wave Pattern Mathematics (15 minutes)</h2>
                
                <div class="activity-box">
                    <div class="instruction-box">
                        <h4>Background</h4>
                        <p>Traditional navigators could detect land by reading wave patterns. When ocean swells hit an island, they create interference patterns that trained navigators could feel and interpret.</p>
                    </div>

                    <p><strong>Wave Mathematics:</strong> Ocean swells travel in predictable patterns. If the main swell has a wavelength of 150 meters and travels at 15 meters per second, we can calculate wave frequency.</p>

                    <div class="math-formula">
                        Wave frequency (Hz) = Wave speed ÷ Wavelength
                    </div>

                    <div class="calculation-space">
                        <h5>Calculate the wave frequency:</h5>
                        <p>Wave frequency = <span class="answer-line">_____</span> ÷ <span class="answer-line">_____</span> = <span class="answer-line">_____</span> Hz</p>
                        <p><strong>This means:</strong> <span class="answer-line">_____</span> waves pass a point every second</p>
                    </div>

                    <div class="challenge-box">
                        <h5>Island Detection Challenge</h5>
                        <p>When waves hit an island, they reflect back. If you're 30 km from an island, and waves travel at 15 m/s, how long does it take for reflected waves to reach you?</p>
                        
                        <div class="step-by-step">
                            <p><strong>Step 1:</strong> Convert distance to meters: 30 km = <span class="answer-line">_____</span> meters</p>
                            <p><strong>Step 2:</strong> Calculate time: Time = Distance ÷ Speed</p>
                            <p>Time = <span class="answer-line">_____</span> ÷ 15 = <span class="answer-line">_____</span> seconds = <span class="answer-line">_____</span> minutes</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Activity 4: Stellar Navigation -->
            <section id="stellar-navigation" class="lesson-section">
                <h2 class="wiley-section-title">⭐ Activity 4: Stellar Navigation Mathematics (20 minutes)</h2>
                
                <div class="activity-box">
                    <div class="instruction-box">
                        <h4>Traditional Method</h4>
                        <p>Navigators used the height of stars above the horizon to determine latitude. They measured star height using their hands and fingers as measuring tools.</p>
                    </div>

                    <div class="measurement-system">
                        <h5>Hand Measurement System:</h5>
                        <ul>
                            <li><strong>Fist at arm's length:</strong> approximately 10°</li>
                            <li><strong>Palm width:</strong> approximately 20°</li>
                            <li><strong>Finger width:</strong> approximately 2°</li>
                        </ul>
                    </div>

                    <div class="practical-exercise">
                        <h5>Measurement Practice</h5>
                        <p>Use your hand to "measure" angles in the classroom:</p>
                        <ul style="list-style: none; padding-left: 0;">
                            <li style="margin: var(--space-4) 0;">☐ Measure the angle from one corner of the room to the opposite corner using your fist.<br>
                            Record: <span class="answer-line">_____</span> fists = <span class="answer-line">_____</span> degrees</li>
                            
                            <li style="margin: var(--space-4) 0;">☐ Measure the width of a window using finger widths.<br>
                            Record: <span class="answer-line">_____</span> fingers = <span class="answer-line">_____</span> degrees</li>
                            
                            <li style="margin: var(--space-4) 0;">☐ Estimate the angle from floor to ceiling where you're sitting: <span class="answer-line">_____</span> degrees</li>
                        </ul>
                    </div>

                    <div class="navigation-calculation">
                        <h5>Navigation Calculation</h5>
                        <p>If a navigator measures a key star at 3 fists + 1 palm above the horizon, what is the total angle?</p>
                        
                        <div class="calculation-space">
                            <p>3 fists = 3 × 10° = <span class="answer-line">_____</span>°</p>
                            <p>1 palm = <span class="answer-line">_____</span>°</p>
                            <p>Total angle = <span class="answer-line">_____</span>° + <span class="answer-line">_____</span>° = <span class="answer-line">_____</span>°</p>
                        </div>
                    </div>

                    <div class="cultural-note">
                        <h5>Amazing Fact</h5>
                        <p>Using these hand measurements, traditional navigators could determine their latitude to within 50-100 km accuracy - incredible precision using only their bodies as instruments!</p>
                    </div>
                </div>
            </section>

            <!-- Activity 5: Traditional vs Modern -->
            <section id="modern-comparison" class="lesson-section">
                <h2 class="wiley-section-title">🛰️ Activity 5: Traditional vs Modern Navigation (10 minutes)</h2>
                
                <div class="activity-box">
                    <div class="instruction-box">
                        <h4>Comparison Task</h4>
                        <p>Compare traditional navigation methods with modern GPS technology. Consider accuracy, reliability, and what happens when technology fails.</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin: var(--space-4) 0;">
                        <thead>
                            <tr style="background: var(--color-secondary); color: white;">
                                <th style="padding: 0.8rem; border: 1px solid #ddd;">Navigation Method</th>
                                <th style="padding: 0.8rem; border: 1px solid #ddd;">Accuracy</th>
                                <th style="padding: 0.8rem; border: 1px solid #ddd;">Advantages</th>
                                <th style="padding: 0.8rem; border: 1px solid #ddd;">Disadvantages</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 0.8rem; border: 1px solid #ddd;"><strong>Traditional</strong><br>(Stars, waves, wildlife)</td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd;">±50-100 km</td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd; min-height: 80px; background: #fafafa;"></td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd; min-height: 80px; background: #fafafa;"></td>
                            </tr>
                            <tr>
                                <td style="padding: 0.8rem; border: 1px solid #ddd;"><strong>Modern GPS</strong><br>(Satellite navigation)</td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd;">±3-5 meters</td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd; min-height: 80px; background: #fafafa;"></td>
                                <td style="padding: 0.8rem; border: 1px solid #ddd; min-height: 80px; background: #fafafa;"></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="critical-thinking">
                        <h5>Critical Thinking Question</h5>
                        <p>Modern ships now carry GPS, but many also train crew in traditional navigation methods. Why might this be important?</p>
                        
                    </div>
                </div>
            </section>

            <!-- Reflection Section -->
            <section class="lesson-section" class="bg-cultural-light">
                <h2 style="color: var(--color-secondary);" class="wiley-section-title">🤔 Reflection: Mathematics and Cultural Knowledge</h2>
                
                <div class="reflection-questions">
                    <div class="reflection-item">
                        <h4>1. Mathematical Thinking</h4>
                        <p>What mathematical concepts did traditional navigators use that we still use today?</p>
                        
                    </div>

                    <div class="reflection-item">
                        <h4>2. Problem Solving</h4>
                        <p>How did traditional navigators solve the problem of long-distance ocean travel without modern instruments?</p>
                        
                    </div>

                    <div class="reflection-item">
                        <h4>3. Integration</h4>
                        <p>How could traditional navigation knowledge help improve modern navigation systems?</p>
                        
                    </div>

                    <div class="reflection-item">
                        <h4>4. Personal Connection</h4>
                        <p>What did you learn today that changed your perspective on mathematics or traditional knowledge?</p>
                        
                    </div>
                </div>
            </section>

            <!-- Extension Activities -->
            <section class="lesson-section">
                <h2 class="wiley-section-title">🚀 Extension Activities (Optional)</h2>
                
                <div class="activity-box">
                    <ul style="list-style: none; padding-left: 0;">
                        <li style="margin: var(--space-4) 0;">☐ <strong>Research Project:</strong> Investigate one specific traditional navigation technique and create a poster showing the mathematics involved</li>
                        <li style="margin: var(--space-4) 0;">☐ <strong>Practical Application:</strong> Use traditional hand measurements to create a map of your school grounds</li>
                        <li style="margin: var(--space-4) 0;">☐ <strong>Cultural Investigation:</strong> Interview family members about traditional knowledge of stars, weather, or directions</li>
                        <li style="margin: var(--space-4) 0;">☐ <strong>Modern Connections:</strong> Research how modern sailing races now incorporate traditional navigation techniques</li>
                    </ul>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default TraditionalNavigationMathematicsHandout;
