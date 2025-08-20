import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface AuthorsPurposeInformHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const AuthorsPurposeInformHandout: React.FC<AuthorsPurposeInformHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="authors-purpose-inform-handout">
      <Card title="Author's Purpose: Inform" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Author's Purpose: Inform</h1>
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
            <article class="mb-6 prose max-w-none">
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Kea: The World's Only Alpine Parrot</h2>
                <p class="text-justify">
The kea (*Nestor notabilis*) is a species of large parrot found in the forested and alpine regions of the South Island of New Zealand. Renowned for its intelligence and curiosity, the kea is one of the most unique birds in the world. Measuring up to 48 cm in length and weighing up to 1 kg, its plumage is primarily olive-green, with a brilliant flash of orange-red under its wings. This striking feature is most visible when the bird is in flight. Kea are social birds and typically live in groups of up to 15 individuals.
                </p>
                <p class="text-justify">
Unlike most parrots that prefer tropical climates, the kea has adapted to survive in a harsh alpine environment. Its diet is omnivorous and highly varied, including roots, leaves, berries, nectar, insects, and carrion. This adaptability is a key factor in its survival. Kea possess a strong, curved beak, which is not only used for cracking nuts but also for digging, manipulating objects, and exploring its environment. Scientific studies have demonstrated the kea's remarkable problem-solving abilities, with some researchers comparing its intelligence to that of a young primate. They are known to work together to achieve a common goal and can solve complex puzzles to obtain food.
                </p>
                <p class="text-justify">
The conservation status of the kea is currently listed as 'Nationally Endangered'. The wild population is estimated to be between 3,000 and 7,000 individuals. The primary threats to the species include predation by introduced mammals such as stoats and possums, which prey on eggs and chicks in their nests. Historically, kea were also persecuted by farmers who believed they attacked sheep. A government-sponsored bounty system resulted in the deaths of an estimated 150,000 kea before it was abolished in 1970. Today, conservation efforts focus on predator control and scientific research to better understand and protect this iconic New Zealand species.
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Analysing Informational Techniques</h3>
                
                <div class="space-y-5">
                    <!-- Question 1 -->
                    <div>
                        <p class="font-semibold mb-2">1. What is the author's primary purpose in writing this text?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) To persuade readers to donate to kea conservation.</div>
                            <div class="question-option">B) To inform readers about the characteristics and status of the kea.</div>
                            <div class="question-option">C) To entertain readers with a fictional story about a clever parrot.</div>
                            <div class="question-option">D) To argue that kea are more intelligent than primates.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div>
                        <p class="font-semibold mb-2">2. (Numeracy) What is the range of the estimated wild kea population mentioned in the text?</p>
                         <div class="flex items-center space-x-2">
                            <p class="font-semibold">Answer:</p>
                            
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div>
                        <p class="font-semibold mb-2">3. The text uses the scientific name *Nestor notabilis*. What is the purpose of including this type of specific, technical language?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) To make the text more entertaining and story-like.</div>
                            <div class="question-option">B) To confuse the reader with difficult words.</div>
                            <div class="question-option">C) To add precision and credibility to the information.</div>
                            <div class="question-option">D) To persuade the reader to become a scientist.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) How does the author maintain a neutral, objective tone throughout the text? Provide an example of a sentence that is purely informational.</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) The text presents facts about the threats to kea. While the author's primary purpose is to inform, could this information also have a secondary, persuasive effect on the reader? Explain your reasoning.</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

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

export default AuthorsPurposeInformHandout
