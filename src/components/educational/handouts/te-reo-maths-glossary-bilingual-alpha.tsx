import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface TeReoMathsGlossaryBilingualAlphaProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const TeReoMathsGlossaryBilingualAlpha: React.FC<TeReoMathsGlossaryBilingualAlphaProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="te-reo-maths-glossary-bilingual-alpha">
      <Card title="Te Reo Maths Glossary - Bilingual Mathematical Terms - Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Te Reo Maths Glossary - Bilingual Mathematical Terms - Te Kete Ako</h1>
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
        <h1 class="wiley-hero-title">Te Reo Maths Glossary</h1>
        <h2 class="wiley-section-title">Kuputaka Pāngarau - Mathematical Terms in Te Reo Māori</h2>
        <p><strong>Te Kete Ako</strong> | Mathematics | Years 7-13 | Alpha Build Resource</p>
        <p><em>Supporting bilingual mathematical learning and cultural identity</em></p>
    </div>

    <div class="cultural-note">
        <h3>🌟 Cultural Context - <em>Te Taiao Pāngarau</em> (Mathematical Environment)</h3>
        <p>This glossary honors the rich mathematical traditions within Te Ao Māori while supporting students to engage with mathematical concepts in both English and Te Reo Māori. Mathematics exists in all cultures - from traditional navigation (<em>kaitiaki moana</em>) to architectural patterns in wharenui.</p>
        <p><strong>Usage Protocol:</strong> These terms should be used respectfully and accurately. When in doubt about pronunciation or cultural context, consult with Te Reo Māori speakers or cultural advisors.</p>
    </div>

    <div class="search-container">
        <h3>🔍 Search Terms - <em>Rapu Kupu</em></h3>
        <input type="text" class="search-box" id="searchBox" placeholder="Search in English or Te Reo Māori... / Rapua ki te reo Pākehā, te reo Māori rānei...">
        <div class="usage-guide">
            <strong>How to Use This Glossary: </strong>
            <ul>
                <li><strong>For Students:</strong> Use these terms to build mathematical vocabulary in both languages</li>
                <li><strong>For Teachers:</strong> Incorporate Te Reo mathematical terms to support Māori-medium learners</li>
                <li><strong>For Whānau:</strong> Help support mathematical learning at home in your preferred language</li>
                <li><strong>Pronunciation:</strong> Listen to fluent Te Reo speakers when possible for accurate pronunciation</li>
            </ul>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Basic Operations - Mahi Taketake <span class="year-level-indicator">Years 7-8</span></h3>
        <div class="term-grid" id="basicOperations">
            <div class="term-card">
                <div class="english-term">Addition</div>
                <div class="maori-term">Tāpiri</div>
                <div class="pronunciation">(TAH-pee-ree)</div>
                <div class="definition">The mathematical operation of combining two or more numbers</div>
                <div class="example"><strong>Example:</strong> 5 + 3 = 8 <br><em>Tāpiri: rima me toru, kotahi tekau mā waru</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Subtraction</div>
                <div class="maori-term">Tango</div>
                <div class="pronunciation">(TAHN-goh)</div>
                <div class="definition">The mathematical operation of taking away one number from another</div>
                <div class="example"><strong>Example: </strong> 10 - 4 = 6 <br><em>Tango: kotahi tekau, tango whā, ono</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Multiplication</div>
                <div class="maori-term">Whakarea</div>
                <div class="pronunciation">(fah-kah-REH-ah)</div>
                <div class="definition">The mathematical operation of repeated addition</div>
                <div class="example"><strong>Example: </strong> 4 × 3 = 12 <br><em>Whakarea: whā whakarea e toru, kotahi tekau mā rua</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Division</div>
                <div class="maori-term">Whakawehe</div>
                <div class="pronunciation">(fah-kah-WEH-heh)</div>
                <div class="definition">The mathematical operation of splitting into equal parts</div>
                <div class="example"><strong>Example: </strong> 15 ÷ 3 = 5 <br><em>Whakawehe: kotahi tekau mā rima whakawehe e toru, rima</em></div>
            </div>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Numbers - Tau <span class="year-level-indicator">Years 7-9</span></h3>
        <div class="term-grid">
            <div class="term-card">
                <div class="english-term">Fraction</div>
                <div class="maori-term">Hautanga</div>
                <div class="pronunciation">(HAU-tahn-gah)</div>
                <div class="definition">A number representing part of a whole</div>
                <div class="example"><strong>Example: </strong> ½ = <em>hautanga hawhe</em> (half)</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Decimal</div>
                <div class="maori-term">Ira ā-ira</div>
                <div class="pronunciation">(EE-rah AH ee-rah)</div>
                <div class="definition">Numbers expressed using a decimal point</div>
                <div class="example"><strong>Example:</strong> 3.5 = <em>toru ira ā-ira rima</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Percentage</div>
                <div class="maori-term">Ōrau</div>
                <div class="pronunciation">(OH-rah-oo)</div>
                <div class="definition">A proportion expressed as parts per hundred</div>
                <div class="example"><strong>Example:</strong> 75% = <em>whitu tekau mā rima ōrau</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Integer</div>
                <div class="maori-term">Tau tōpū</div>
                <div class="pronunciation">(TAU toh-POO)</div>
                <div class="definition">Whole numbers including negative numbers</div>
                <div class="example"><strong>Example:</strong> -3, 0, 5 are all <em>tau tōpū</em></div>
            </div>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Geometry - Ahupūngao <span class="year-level-indicator">Years 8-10</span></h3>
        <div class="term-grid">
            <div class="term-card">
                <div class="english-term">Triangle</div>
                <div class="maori-term">Tapatoru</div>
                <div class="pronunciation">(tah-pah-TOH-roo)</div>
                <div class="definition">A polygon with three sides and three angles</div>
                <div class="example"><strong>Example: </strong> Traditional Māori kites often use <em>tapatoru</em> shapes</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Circle</div>
                <div class="maori-term">Porohita</div>
                <div class="pronunciation">(poh-roh-HEE-tah)</div>
                <div class="definition">A round shape where all points are equal distance from the center</div>
                <div class="example"><strong>Example:</strong> The poi ball moves in a <em>porohita</em> path</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Rectangle</div>
                <div class="maori-term">Tapawhā roa</div>
                <div class="pronunciation">(tah-pah-FAH roh-ah)</div>
                <div class="definition">A four-sided shape with opposite sides equal and parallel</div>
                <div class="example"><strong>Example:</strong> Many traditional woven panels show <em>tapawhā roa</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Angle</div>
                <div class="maori-term">Koki</div>
                <div class="pronunciation">(KOH-kee)</div>
                <div class="definition">The space between two lines that meet at a point</div>
                <div class="example"><strong>Example:</strong> The <em>koki</em> of a wharenui roof is carefully calculated</div>
            </div>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Measurement - Inenga <span class="year-level-indicator">Years 7-11</span></h3>
        <div class="term-grid">
            <div class="term-card">
                <div class="english-term">Length</div>
                <div class="maori-term">Roa</div>
                <div class="pronunciation">(ROH-ah)</div>
                <div class="definition">The measurement of how long something is</div>
                <div class="example"><strong>Example:</strong> Te <em>roa</em> o te waka - the length of the canoe</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Area</div>
                <div class="maori-term">Rahi</div>
                <div class="pronunciation">(RAH-hee)</div>
                <div class="definition">The amount of space inside a 2D shape</div>
                <div class="example"><strong>Example:</strong> Te <em>rahi</em> o te māra - the area of the garden</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Volume</div>
                <div class="maori-term">Rōrahi</div>
                <div class="pronunciation">(roh-RAH-hee)</div>
                <div class="definition">The amount of space inside a 3D object</div>
                <div class="example"><strong>Example:</strong> Te <em>rōrahi</em> o te wai - the volume of water</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Weight</div>
                <div class="maori-term">Taumaha</div>
                <div class="pronunciation">(TAU-mah-hah)</div>
                <div class="definition">How heavy something is</div>
                <div class="example"><strong>Example:</strong> Te <em>taumaha</em> o te kūmara - the weight of the kumara</div>
            </div>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Statistics - Tauanga <span class="year-level-indicator">Years 9-13</span></h3>
        <div class="term-grid">
            <div class="term-card">
                <div class="english-term">Data</div>
                <div class="maori-term">Raraunga</div>
                <div class="pronunciation">(rah-rah-OO-ngah)</div>
                <div class="definition">Information collected for analysis</div>
                <div class="example"><strong>Example:</strong> <em>Raraunga</em> about student achievement</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Average/Mean</div>
                <div class="maori-term">Toharite</div>
                <div class="pronunciation">(toh-hah-REE-teh)</div>
                <div class="definition">The sum of values divided by the number of values</div>
                <div class="example"><strong>Example:</strong> Te <em>toharite</em> o nga māka - the average of the marks</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Graph</div>
                <div class="maori-term">Kauwhata</div>
                <div class="pronunciation">(KAU-fah-tah)</div>
                <div class="definition">A visual representation of data</div>
                <div class="example"><strong>Example:</strong> He <em>kauwhata</em> e whakaatu ana i nga hua - a graph showing the results</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Probability</div>
                <div class="maori-term">Tūpono</div>
                <div class="pronunciation">(TOO-poh-noh)</div>
                <div class="definition">The likelihood that something will happen</div>
                <div class="example"><strong>Example:</strong> Te <em>tūpono</em> o te ua - the probability of rain</div>
            </div>
        </div>
    </div>

    <div class="term-category">
        <h3 class="category-header">Algebra - Ariā <span class="year-level-indicator">Years 9-13</span></h3>
        <div class="term-grid">
            <div class="term-card">
                <div class="english-term">Variable</div>
                <div class="maori-term">Taupe</div>
                <div class="pronunciation">(TAU-peh)</div>
                <div class="definition">A symbol (like x) that represents an unknown number</div>
                <div class="example"><strong>Example:</strong> Ki te x = 5, ka kitea te <em>taupe</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Equation</div>
                <div class="maori-term">Whārite</div>
                <div class="pronunciation">(FAH-ree-teh)</div>
                <div class="definition">A mathematical statement showing two expressions are equal</div>
                <div class="example"><strong>Example: </strong> 2x + 3 = 7 he <em>whārite</em></div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Formula</div>
                <div class="maori-term">Tawhā</div>
                <div class="pronunciation">(tah-FAH)</div>
                <div class="definition">A mathematical rule or relationship</div>
                <div class="example"><strong>Example:</strong> Te <em>tawhā</em> mo te rahi: roa × whānui</div>
            </div>
            
            <div class="term-card">
                <div class="english-term">Function</div>
                <div class="maori-term">Taumahi</div>
                <div class="pronunciation">(TAU-mah-hee)</div>
                <div class="definition">A relationship between input and output values</div>
                <div class="example"><strong>Example:</strong> f(x) = 2x he <em>taumahi</em> hoki</div>
            </div>
        </div>
    </div>

    <div class="cultural-note">
        <h3>🏛️ Mathematical Connections in Te Ao Māori</h3>
        <p><strong>Traditional Applications:</strong></p>
        <ul>
            <li><strong>Navigation (Kaitiaki Moana):</strong> Complex calculations using stars, currents, and wind patterns</li>
            <li><strong>Architecture (Whare Whakatū):</strong> Precise geometric principles in wharenui construction</li>
            <li><strong>Weaving (Raranga):</strong> Mathematical patterns in kete, korowai, and tukutuku panels</li>
            <li><strong>Carving (Whakairo):</strong> Proportional relationships and symmetry in traditional designs</li>
            <li><strong>Agriculture (Ahuwhenua):</strong> Seasonal calculations and resource management</li>
            <li><strong>Astronomy (Kōkōrangi):</strong> Calendar systems and celestial mathematics</li>
        </ul>
    </div>

    <div class="usage-guide">
        <h3>📚 Teacher Implementation Guide</h3>
        <h4>Classroom Strategies: </h4>
        <ul>
            <li><strong>Daily Practice:</strong> Use one Te Reo mathematical term each lesson</li>
            <li><strong>Visual Displays:</strong> Create bilingual mathematical word walls</li>
            <li><strong>Cultural Connections:</strong> Link mathematical concepts to Māori cultural practices</li>
            <li><strong>Student Voice:</strong> Encourage students to use both languages in mathematical discourse</li>
            <li><strong>Assessment:</strong> Accept mathematical solutions explained in either language</li>
        </ul>
        
        <h4>Supporting All Learners:</h4>
        <ul>
            <li><strong>Te Reo Māori Speakers:</strong> Validate home language in mathematical contexts</li>
            <li><strong>English Language Learners:</strong> Use visual and contextual supports</li>
            <li><strong>Cultural Diversity:</strong> Encourage sharing of mathematical terms from all cultures</li>
            <li><strong>Special Needs:</strong> Adapt pronunciation guides and provide audio supports</li>
        </ul>
    </div>

    <script>
        // Simple search functionality
document.getElementById('searchBox').addEventListener('input', function(e) {
const searchTerm = e.target.value.toLowerCase()
            const termCards = document.querySelectorAll('.term-card')
            
termCards.forEach(card => {
const text = card.textContent.toLowerCase()
                if (text.includes(searchTerm)) {
card.style.display = 'block'
                    // Highlight matching text
const englishTerm = card.querySelector('.english-term')
                    const maoriTerm = card.querySelector('.maori-term')
                    
if (englishTerm.textContent.toLowerCase().includes(searchTerm)) {
englishTerm.innerHTML = highlightText(englishTerm.textContent, searchTerm)
                    }
if (maoriTerm.textContent.toLowerCase().includes(searchTerm)) {
maoriTerm.innerHTML = highlightText(maoriTerm.textContent, searchTerm)
                    }
                } else {
card.style.display = 'none'
                }
            })
        })
        }
function highlightText(text,   searchTerm) {if (!searchTerm) return text
            const regex = new RegExp(\`(\${searchTerm})\`, 'gi')
            return text.replace(regex, '<span class="search-result-highlight">\$1</span>')
        }
    </script>

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

export default TeReoMathsGlossaryBilingualAlpha
