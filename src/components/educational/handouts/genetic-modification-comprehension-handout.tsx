import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface GeneticModificationComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const GeneticModificationComprehensionHandout: React.FC<GeneticModificationComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="genetic-modification-comprehension-handout">
      <Card title="Genetic Modification Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Genetic Modification Reading Comprehension | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: Genetic Modification</h1>
                <p class="page-subtitle">asTTle-Style Analysis of Science and Society</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Contentious World of GE in Aotearoa</h2>
                <p>
Genetic modification (GM), also known as genetic engineering (GE), is the process of altering the genetic makeup of an organism. In New Zealand, this technology is at the centre of a fierce debate, particularly concerning its use in primary industries like agriculture and conservation. Proponents, including many scientists and agricultural companies, argue that GM could unlock significant benefits. For example, researchers at AgResearch are developing genetically modified ryegrass that could reduce methane emissions from livestock by up to 23% and grow faster, potentially boosting farm productivity and helping New Zealand meet its climate change targets.
                </p>
                <p>
On the conservation front, GM is being explored as a tool for pest control. The "Predator Free 2050" initiative is investigating technologies like gene drives, which could spread a specific trait—such as infertility—through a pest population, causing it to collapse. This could offer a powerful alternative to traditional methods like traps and toxins for eradicating pests such as stoats, rats, and possums that devastate native wildlife. The potential to protect vulnerable species like the kiwi and kākāpō is a compelling argument for its use.
                </p>
                <p>
However, there is strong opposition to the use of GM technology in Aotearoa. Opponents raise concerns about the unknown long-term effects on ecosystems and human health. There are fears that genetically modified organisms could escape into the wild and interbreed with native species, with unpredictable consequences. From a Māori perspective, there are significant cultural and spiritual concerns regarding the modification of whakapapa (genealogy) of living things. Furthermore, New Zealand's "clean, green" brand is a vital part of its export identity, and many worry that embracing GM could damage this reputation and alienate international consumers. Currently, the use of GM is tightly restricted to research within secure labs, but the debate over releasing GM organisms into the environment continues to intensify.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. What is one potential benefit of genetically modified ryegrass mentioned in the text?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) It is resistant to all pests.</div>
                            <div class="question-option">B) It requires no water to grow.</div>
                            <div class="question-option">C) It can reduce methane emissions from livestock.</div>
                            <div class="question-option">D) It changes the colour of the animals that eat it.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) If a farm's livestock produce 1,000 tonnes of methane annually, what is the maximum potential reduction in methane (in tonnes) if they switch to the new ryegrass?</p>
                         <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. The text states that from a Māori perspective, there are concerns about modifying the "whakapapa" of living things. What is the best meaning of whakapapa in this context?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) The physical appearance of an organism.</div>
                            <div class="question-option">B) The genealogy and inherent identity of an organism.</div>
                            <div class="question-option">C) The economic value of an organism.</div>
                            <div class="question-option">D) The location where an organism is found.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) Why might some people be concerned about using a "gene drive" for pest control, even if it is effective?</p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) The text presents both potential benefits and risks of GM technology. Which argument do you find more persuasive, for or against its wider use in New Zealand? Justify your position using two different points from the text.</p>
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

export default GeneticModificationComprehensionHandout
