import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface HousingAffordabilityComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const HousingAffordabilityComprehensionHandout: React.FC<HousingAffordabilityComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="housing-affordability-comprehension-handout">
      <Card title="Housing Affordability Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Housing Affordability Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: The Housing Crisis</h1>
                <p class="page-subtitle">asTTle-Style Analysis of a National Challenge</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Great Aotearoa Home Ownership Dream</h2>
                <p>
For generations, owning a home has been a cornerstone of the New Zealand dream. However, for many young people today, this dream feels increasingly out of reach. New Zealand is currently facing a severe housing affordability crisis, meaning that the cost of buying or renting a home is extremely high relative to average incomes. In 2023, a report from Demographia International found Auckland to be the 9th least affordable city for housing in the world, with the median house price being over 11 times the median household income. A widely accepted benchmark for affordable housing is a ratio of 3.0 or less.
                </p>
                <p>
Several complex factors have contributed to this situation. For decades, the supply of new houses has not kept up with population growth, creating a fundamental shortage. This is partly due to strict planning rules and a lack of available land for development. At the same time, demand has been fuelled by low interest rates (making it cheaper to borrow money) and the view of housing as a secure financial investment. This combination of high demand and low supply has inevitably driven prices skyward, benefiting existing homeowners but creating a major barrier for those trying to enter the market.
                </p>
                <p>
The social consequences of this crisis are profound. High rental costs consume a large portion of household incomes, leaving less money for other essentials like food, healthcare, and education. It can lead to overcrowding and housing instability, which disproportionately affects low-income families and children. In response, various solutions are being debated, including government-led building programs (like KiwiBuild), changes to planning laws to encourage urban density, and policies aimed at discouraging property investment. Tackling this issue is one of the most significant challenges facing Aotearoa, as it strikes at the heart of fairness, equality, and the wellbeing of future generations.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. What is the main definition of a housing affordability crisis according to the text?</strong></p>
                        <ul class="options-list">
                            <li>A) When there are not enough houses for people to live in.</li>
                            <li>B) When the cost of housing is very high compared to average incomes.</li>
                            <li>C) When interest rates for borrowing money are too high.</li>
                            <li>D) When people prefer to rent rather than buy houses.</li>
                        </ul>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) If the median house price in Auckland is 11 times the median income of \$90,000, what is the median house price?</strong></p>
                        <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. Which of these is NOT a factor mentioned in the text as contributing to the housing crisis?</strong></p>
                        <ul class="options-list">
                            <li>A) A lack of new houses being built.</li>
                            <li>B) Low interest rates making borrowing easier.</li>
                            <li>C) A decrease in the country's population.</li>
                            <li>D) Strict planning rules.</li>
                        </ul>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) The text states that the housing crisis "disproportionately affects low-income families." Explain why this would be the case.</strong></p>
                        
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) The text mentions "changes to planning laws to encourage urban density" as a potential solution. What could be one advantage and one disadvantage of building more high-density housing (like apartment buildings) in cities?</strong></p>
                        
                    </div>
                </div>
            </section>
    
    <!-- External Resources Section - Added by Te Kete Ako Content Enrichment -->
    <section class="external-resources-section no-print" style="border-left: 4px solid var(--color-maori-red, #CC0000) background: linear-gradient(135deg, #f0f8f4 0%, #e8f5e8 100%) padding: var(--space-6) margin: var(--space-8) 0 border-radius: var(--radius-lg)">
        <h3 style="margin: 0 0 1rem 0 color: var(--color-primary, #2E8B57) display: flex align-items: center gap: 0.5rem">
            <span style="font-size: 1.5rem">🌿</span>
Nga Rauemi Tauwehe - External Resources
        </h3>
        <p style="margin: 0 0 1.5rem 0 color: var(--color-text-secondary, #666) font-size: var(--text-sm)">
High-quality resources from official New Zealand education sites to extend and enrich this learning content.
        </p>
        <div class="external-resources-list">
            
            <div class="external-resource-item" style="margin: var(--space-4) 0 padding: var(--space-4) background: white border-radius: var(--radius-md) box-shadow: 0 2px 4px var(--shadow-md)">
                <h4 style="margin: 0 0 0.5rem 0 color: var(--color-primary, #2E8B57)">
                    <a href="https: //www.sciencelearn.org.nz/" target="_blank" rel="noopener noreferrer" style="text-decoration: none color: inherit">
Science Learning Hub
                    </a>
                </h4>
                <p style="margin: 0.5rem 0 color: var(--color-text-secondary, #666) font-size: var(--text-sm) line-height: 1.4">
Over 11,550 NZ science education resources for teachers, students and community
                </p>
                <div class="flex">
                    <div class="flex">
                        <span style="background: var(--color-accent, #DAA520) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">,
Years: 1-13
                        </span>
                        <span style="background: var(--color-secondary, #FF6B35) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">
                            60% Match
                        </span>
                        <span style="background: var(--color-primary, #2E8B57) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">  
Official NZ Resource
                        </span>
                    </div>
                </div>
            </div>
            <div class="external-resource-item" style="margin: var(--space-4) 0 padding: var(--space-4) background: white border-radius: var(--radius-md) box-shadow: 0 2px 4px var(--shadow-md)">
                <h4 style="margin: 0 0 0.5rem 0 color: var(--color-primary, #2E8B57)">
                    <a href="https: //newzealandcurriculum.tahurangi.education.govt.nz/new-zealand-curriculum-online/learning-content-resources/literacy-inc-instructional-series/5637144635.c" target="_blank" rel="noopener noreferrer" style="text-decoration: none color: inherit">
Literacy Online Resources
                    </a>
                </h4>
                <p style="margin: 0.5rem 0 color: var(--color-text-secondary, #666) font-size: var(--text-sm) line-height: 1.4">
Instructional series and literacy resources for Years 1-8
                </p>
                <div class="flex">
                    <div class="flex">
                        <span style="background: var(--color-accent, #DAA520) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">,
Years: 1-8
                        </span>
                        <span style="background: var(--color-secondary, #FF6B35) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">
                            32% Match
                        </span>
                        <span style="background: var(--color-primary, #2E8B57) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">  
Official NZ Resource
                        </span>
                    </div>
                </div>
            </div>
            <div class="external-resource-item" style="margin: var(--space-4) 0 padding: var(--space-4) background: white border-radius: var(--radius-md) box-shadow: 0 2px 4px var(--shadow-md)">
                <h4 style="margin: 0 0 0.5rem 0 color: var(--color-primary, #2E8B57)">
                    <a href="https: //tahurangi.education.govt.nz/" target="_blank" rel="noopener noreferrer" style="text-decoration: none color: inherit">
Tāhūrangi - Te Reo Māori Education Hub
                    </a>
                </h4>
                <p style="margin: 0.5rem 0 color: var(--color-text-secondary, #666) font-size: var(--text-sm) line-height: 1.4">
Official NZ government hub for te reo Māori resources, guidance, and teaching support
                </p>
                <div class="flex">
                    <div class="flex">
                        <span style="background: var(--color-accent, #DAA520) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">,
Years: 7-13
                        </span>
                        <span style="background: var(--color-secondary, #FF6B35) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">
                            30% Match
                        </span>
                        <span style="background: var(--color-primary, #2E8B57) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">  
Official NZ Resource
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 1rem padding-top: 1rem border-top: 1px solid #ddd font-size: 0.8rem color: var(--color-text-muted, #888)">
            <p style="margin: 0">
                🤖 <em>These resources were automatically curated by Te Kete Ako's AI system to complement this content. 
All external links lead to official New Zealand educational and government websites.</em>
            </p>
        </div>
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
  )
}

export default HousingAffordabilityComprehensionHandout
