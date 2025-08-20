import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface DawnRaidsComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const DawnRaidsComprehensionHandout: React.FC<DawnRaidsComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="dawn-raids-comprehension-handout">
      <Card title="The Dawn Raids Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Dawn Raids Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: The Dawn Raids</h1>
                <p class="page-subtitle">A Painful Chapter in New Zealand's History</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">A Shadow in New Zealand's History</h2>
                <p>
In the mid-1970s, New Zealand faced an economic downturn. In this climate of uncertainty, some politicians and media began to blame Pasifika peoples for economic problems, despite many having been encouraged to migrate to New Zealand in the 1950s and 60s to fill labour shortages. This created a hostile environment where people of Pacific Island descent were unfairly targeted. The government of the time began to crack down on "overstayers"—people who had remained in the country after their visas had expired.
                </p>
                <p>
This crackdown took the form of aggressive and discriminatory immigration raids, which came to be known as the "Dawn Raids." Police and immigration officials would conduct raids on the homes of suspected overstayers, often in the early hours of the morning. While people of many nationalities were overstaying their visas, statistics show that Pasifika peoples were disproportionately targeted. Between 1974 and 1976, while Pacific Islanders made up only about one-third of overstayers, they accounted for over 85% of all prosecutions. People were stopped in the street and asked for proof of their right to be in the country, creating a climate of fear for the entire Pasifika community. One person recalled, <em class="text-secondary">"You were scared to walk on the street. You were scared to go to the factory. The police could just stop you and ask for your passport. We felt like criminals in our own country."</em>
                </p>
                <p>
The Dawn Raids are now widely condemned as a racist and unjust chapter in New Zealand's history. They inflicted lasting trauma (māfuiʻe) on families (aiga) and communities, and damaged the relationship between the government and Pasifika peoples. In 2021, the New Zealand government formally apologised for the raids. Prime Minister Jacinda Ardern acknowledged the actions were "discriminatory and have had a lasting and negative impact." The apology was a significant step towards healing and reconciliation, recognising the deep hurt caused and affirming the contribution of Pasifika communities to the fabric of Aotearoa.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <div class="question-block">
                        <p><strong>1. According to the text, why were Pasifika peoples originally encouraged to come to New Zealand?</strong></p>
                        <p>To fill labour shortages during a time of economic growth.</p>
                    </div>

                    <div class="question-block">
                        <p><strong>2. (Numeracy) The text states Pasifika peoples accounted for over 85% of prosecutions for overstaying. If there were 1,000 prosecutions in total, approximately how many would have involved Pacific Islanders?</strong></p>
                         <p>At least 850 (1000 * 0.85).</p>
                    </div>

                    <div class="question-block">
                        <p><strong>3. What does the term "disproportionately targeted" mean in the context of the second paragraph?</strong></p>
                        <p>It means that Pasifika peoples were targeted far more often than other ethnic groups, even though they were not the only group with overstayers.</p>
                    </div>

                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) The text describes a government policy that resulted in a specific ethnic group being targeted. Is this an example of individual prejudice or systemic racism? Explain your answer.</strong></p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) Why was the formal government apology in 2021 an important step? What does an apology like this achieve?</p>
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

export default DawnRaidsComprehensionHandout
