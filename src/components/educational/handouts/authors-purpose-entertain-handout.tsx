import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface AuthorsPurposeEntertainHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const AuthorsPurposeEntertainHandout: React.FC<AuthorsPurposeEntertainHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-8",
  subject = "English, Literacy"
}) => {
  return (
    <div className="authors-purpose-entertain-handout">
      <Card title="Author's Purpose: Entertain" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Author's Purpose: Entertain</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">The Carver of Okarito</h2>
                <p class="text-justify">
                    The fog rolled in off the Tasman Sea, thick and silent, swallowing the already-grey sand of Ōkārito beach. Leo clutched the piece of pounamu in his pocket, its smooth surface the only thing that felt real in the disorienting mist. He was meant to be meeting his grandfather back at the cottage half an hour ago, but every direction looked the same—an endless swirl of white. The only sound was the rhythmic sigh of the waves, a slow breath in the throat of the fog. He was, he reluctantly admitted, completely and utterly lost.
                </p>
                <p class="text-justify">
                    It was then that he saw it. A flicker of light, warm and orange, dancing in the distance. It wasn't the harsh beam of a torch, but the gentle, unsteady glow of a fire. As he stumbled towards it, the shape of a person emerged from the gloom, sitting on a huge piece of driftwood, back to the sea. The figure was hunched over a piece of wood, and the air filled with the scent of salt and burning mānuka. The person didn't seem to notice him approach. They were focused on their work, a small, sharp tool moving with hypnotic grace, peeling away curls of wood to reveal a shape within.
                </p>
                <p class="text-justify">
                    Leo stopped a few metres away, his heart a frantic drum against his ribs. The carver looked up, and his eyes, dark and ancient, seemed to hold the same swirling mystery as the fog itself. He wasn't smiling, but there was no menace in his gaze. He simply nodded towards the fire, an unspoken invitation. "You're a long way from the track, boy," the carver said, his voice a low rumble like stones shifting in the tide. He held up the piece of wood. In its centre, a perfect, intricate spiral—a koru—was taking shape. "Sometimes," the old man murmured, more to the wood than to Leo, "you have to get a little lost to find out what you're really looking for."
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Analysing Entertaining Techniques</h3>
                
                <div class="space-y-5">
                    <!-- Question 1 -->
                    <div>
                        <p class="font-semibold mb-2">1. What is the author's primary purpose in writing this text?</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) To inform the reader about the dangers of getting lost in the fog.</div>
                            <div class="question-option">B) To persuade the reader to take up wood carving.</div>
                            <div class="question-option">C) To entertain the reader with a mysterious and atmospheric story.</div>
                            <div class="question-option">D) To provide a factual report on the history of Ōkārito.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div>
                        <p class="font-semibold mb-2">2. (Numeracy) Leo was meant to be at the cottage half an hour ago. If it is now 4:15 PM, what time was he supposed to meet his grandfather?</p>
                         <div class="flex items-center space-x-2">
                            <p class="font-semibold">Answer:</p>
                            
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div>
                        <p class="font-semibold mb-2">3. The author writes, "his heart a frantic drum against his ribs." This is an example of what kind of figurative language?</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) A simile (using 'like' or 'as').</div>
                            <div class="question-option">B) A metaphor (a direct comparison).</div>
                            <div class="question-option">C) Personification (giving human qualities to an object).</div>
                            <div class="question-option">D) Onomatopoeia (a word that imitates a sound).</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) How does the author use the setting (the fog, the sea) to create a specific mood or atmosphere in the story? Describe the mood in your own words.</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) The story ends on a mysterious note. What do you think the carver's final words mean? What might Leo be "really looking for"?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-xl border border-emerald-200">
                <h2 class="text-lg font-bold text-emerald-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-emerald-100">
                        <h3 class="font-semibold text-emerald-700 mb-2">English - Reading/Viewing</h3>
                        <p class="text-emerald-600 mb-1"><strong>Achievement Objective:</strong> RV4-2</p>
                        <p class="text-gray-700 text-xs">Identify author's purpose and how it affects meaning</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <h3 class="font-semibold text-blue-700 mb-2">Key Competencies</h3>
                        <ul class="text-blue-600 text-xs space-y-1">
                            <li>• Using language symbols and texts</li>
                            <li>• Thinking critically about texts</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                        📋 View Full Curriculum Framework
                    </a>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default AuthorsPurposeEntertainHandout;
