import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MicroplasticsComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MicroplasticsComprehensionHandout: React.FC<MicroplasticsComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="microplastics-comprehension-handout">
      <Card title="Microplastics Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Microplastics Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: The Unseen Invasion</h1>
                <p class="page-subtitle">asTTle-Style Analysis of Microplastics in Aotearoa</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Challenge of Microplastics in Aotearoa</h2>
                <p>
An invisible threat is silently accumulating in New Zealand's pristine waters. Microplastics, tiny plastic particles less than 5mm in size, are now found everywhere from the peaks of the Southern Alps to the depths of the Kermadec Trench. These fragments originate from two main sources: primary microplastics, such as microbeads in cosmetics, and secondary microplastics, which result from the breakdown of larger plastic items like bottles and fishing nets. A 2022 study by the University of Canterbury revealed that some urban rivers in Christchurch contain over 400 microplastic particles per square metre of riverbed.
                </p>
                <p>
The impact of these particles is a growing concern for scientists. Due to their small size, microplastics are easily ingested by marine life. Plankton, the base of the marine food web, consume these plastics, which then travel up the food chain to fish, birds, and eventually, humans. Research from NIWA (National Institute of Water and Atmospheric Research) has found microplastics in over 75% of commercially caught fish species in New Zealand. While the full health effects on humans are still being investigated, chemicals in plastics and the toxins they absorb from the water are known to be harmful.
                </p>
                <p>
Tackling this issue is a complex challenge. While New Zealand banned the sale of products containing plastic microbeads in 2018, the larger problem of secondary microplastics from single-use plastics and industrial waste remains. Community-led initiatives, such as beach clean-ups, play a vital role, but scientists argue that systemic change is needed. This includes investing in advanced wastewater treatment plants, which could potentially filter out more than 90% of microplastics, and promoting a circular economy where plastic waste is significantly reduced and repurposed. The future of New Zealand's clean, green image may depend on how we confront this microscopic menace.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. According to the text, what is the primary difference between primary and secondary microplastics?</strong></p>
                        <ul class="options-list">
                            <li>A) Their size</li>
                            <li>B) Their colour</li>
                            <li>C) Their origin</li>
                            <li>D) Their location</li>
                        </ul>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) Based on the NIWA research mentioned, if you caught 20 fish, how many would you expect to contain microplastics?</strong></p>
                        <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. What does the author mean by the phrase "systemic change"?</strong></p>
                        <ul class="options-list">
                            <li>A) Relying only on community beach clean-ups.</li>
                            <li>B) Large-scale changes to infrastructure and economic policies.</li>
                            <li>C) Banning all plastic products immediately.</li>
                            <li>D) Focusing only on the effects on the marine food web.</li>
                        </ul>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) The text states that advanced wastewater treatment could filter "more than 90% of microplastics". Why is this not a complete solution to the problem?</strong></p>
                        
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) In your opinion, what is the most significant challenge mentioned in the text for tackling microplastic pollution in New Zealand? Justify your answer with evidence from the text.</strong></p>
                        
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

export default MicroplasticsComprehensionHandout
