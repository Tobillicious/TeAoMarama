import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface EnvironmentalTextAnalysisHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const EnvironmentalTextAnalysisHandout: React.FC<EnvironmentalTextAnalysisHandoutProps> = (_{
culturalContext = "Environmental stewardship and climate action", 
_yearLevel = "Year 8-9", 
_subject = "Science,  _Social Studies"
}) => {
return (
    <div className="environmental-text-analysis-handout">
      <Card title="Environmental Text Analysis - Critical Literacy | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Environmental Text Analysis - Critical Literacy | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Critical Analysis: Environmental Texts</h1>
                <p class="page-subtitle">Deconstructing Scientific & Policy Discourse</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Reading Like a Detective: Environmental Texts</h2>
                <p>
Environmental issues are complex, involving science, politics, economics, and culture. When we read about environmental topics, we need to be critical detectives, asking: Who wrote this? What's their purpose? What evidence do they use? What voices are missing? This analysis framework helps you decode environmental texts, from scientific papers to government policies to media reports.
                </p>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">The CREDIBLE Analysis Framework</h2>
                <div class="question-block">
                    <div class="analysis-box">
                        <h3 class="mb-2">C - Credibility (Pono)</h3>
                        <p class="text-sm text-secondary">Who wrote this? What are their qualifications? Do they have vested interests? Are they peer-reviewed scientists, government officials, or company representatives?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">R - Recency (Tawhito/Hou)</h3>
                        <p class="text-sm text-secondary">When was this published? Environmental science moves fast - data from 10 years ago might be outdated. Policy changes rapidly too.</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">E - Evidence (Taunakitanga)</h3>
                        <p class="text-sm text-secondary">What evidence supports their claims? Is it data, expert opinion, case studies? Can you verify their sources? Do they cite peer-reviewed research?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">D - Diversity (Kanorau)</h3>
                        <p class="text-sm text-secondary">Whose voices are included? Whose are missing? Do they include indigenous knowledge, community perspectives, or just expert opinion?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">I - Intent (Whāinga)</h3>
                        <p class="text-sm text-secondary">What's the author's purpose? To inform, persuade, or sell something? Are they promoting a particular solution or agenda?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">B - Bias (Whakapae)</h3>
                        <p class="text-sm text-secondary">What assumptions underlie the text? Do they present multiple viewpoints? What language choices reveal their position?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">L - Language (Reo)</h3>
                        <p class="text-sm text-secondary">How do they use technical terms? Is the language accessible or exclusive? Do they use emotional appeals or neutral description?</p>
                    </div>
                    <div class="analysis-box">
                        <h3 class="mb-2">E - Ethics (Tikanga)</h3>
                        <p class="text-sm text-secondary">What ethical frameworks inform the text? Do they consider environmental justice, intergenerational equity, and cultural values?</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Practice Text: Climate Policy Excerpt</h2>
                <div class="question-block">
                    <p class="text-secondary mb-2"><strong>New Zealand's Climate Action Framework: Economic Opportunities</strong></p>
                    <p>"New Zealand's transition to a low-carbon economy presents significant economic opportunities. Our analysis suggests that green technology investments could create up to 100,000 new jobs by 2030. The government's carbon pricing mechanism incentivizes innovation while ensuring business competitiveness. However, transitional support for traditional industries remains essential. Critics argue that the timeline is too aggressive, but international commitments under the Paris Agreement require decisive action. The framework prioritizes market-based solutions that balance environmental goals with economic growth."</p>
                </div>
            </section>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Applying CREDIBLE Analysis</h2>
                
                <div class="space-y-4">
                    <div>
                        <p><strong>1. Credibility: </strong> What questions would you ask about the author of this text?</p>
                        
                    </div>

                    <div>
                        <p><strong>2. Evidence:</strong> What evidence does the text provide? What evidence is missing?</p>
                        
                    </div>

                    <div>
                        <p><strong>3. Diversity:</strong> Whose perspectives are represented? Whose voices might be missing?</p>
                        
                    </div>

                    <div>
                        <p><strong>4. Language:</strong> Identify three examples of language that reveals the author's position or assumptions.</p>
                        
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
                            66% Match
                        </span>
                        <span style="background: var(--color-primary, #2E8B57) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">  
Official NZ Resource
                        </span>
                    </div>
                </div>
            </div>
            <div class="external-resource-item" style="margin: var(--space-4) 0 padding: var(--space-4) background: white border-radius: var(--radius-md) box-shadow: 0 2px 4px var(--shadow-md)">
                <h4 style="margin: 0 0 0.5rem 0 color: var(--color-primary, #2E8B57)">
                    <a href="https: //newzealandcurriculum.tahurangi.education.govt.nz/new-zealand-curriculum-online/learning-content-resources/english/5637144622.c" target="_blank" rel="noopener noreferrer" style="text-decoration: none color: inherit">
English - The New Zealand Curriculum
                    </a>
                </h4>
                <p style="margin: 0.5rem 0 color: var(--color-text-secondary, #666) font-size: var(--text-sm) line-height: 1.4">
Official English curriculum resources for oral, written, and visual texts
                </p>
                <div class="flex">
                    <div class="flex">
                        <span style="background: var(--color-accent, #DAA520) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">,
Years: 0-13
                        </span>
                        <span style="background: var(--color-secondary, #FF6B35) color: white padding: 0.25rem 0.5rem border-radius: var(--radius-lg) font-size: 0.75rem">
                            65% Match
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

export default EnvironmentalTextAnalysisHandout
