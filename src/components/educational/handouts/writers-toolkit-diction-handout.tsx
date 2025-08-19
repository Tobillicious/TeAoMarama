import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitDictionHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitDictionHandout: React.FC<WritersToolkitDictionHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-diction-handout">
      <Card title="The Writer's Toolkit: Word Choice (Diction)" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Word Choice (Diction)</h1>
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
            <section class="mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">What is Diction?</h2>
                <p class="text-justify">
                    Diction simply means "word choice." While it sounds simple, it's one of the most important skills a writer can develop. The specific words you choose have a massive impact on your writing's clarity, tone, and overall effect. A strong writer doesn't just choose a word that is "correct"; they choose the word that is "perfect." This involves thinking about not just the literal meaning of a word, but also the feelings and ideas it suggests.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Denotation vs. Connotation</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="comparison-box">
                        <h4 class="font-bold text-green-700 mb-2">Denotation (The Dictionary Definition)</h4>
                        <p class="text-sm text-gray-600">This is the literal, dictionary definition of a word. It's the core meaning without any emotion attached.</p>
                        <p class="mt-2 text-sm italic">For example, the words "house" and "home" have the same denotation: a building where someone lives.</p>
                    </div>
                    <div class="comparison-box">
                        <h4 class="font-bold text-green-700 mb-2">Connotation (The Emotional Meaning)</h4>
                        <p class="text-sm text-gray-600">This is the emotional or cultural association a word carries. It's the "vibe" the word gives off.</p>
                        <p class="mt-2 text-sm italic">While "house" is neutral, the word "home" has a positive connotation of warmth, family, and comfort.</p>
                    </div>
                </div>
                 <p class="text-sm text-center mt-3 text-gray-600">A good writer chooses words with the right connotation for their purpose. For example, would you describe a character as "confident" (positive connotation) or "arrogant" (negative connotation)?</p>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Deconstruction & Application</h3>
                
                <div class="space-y-5">
                    <!-- Deconstruction -->
                    <div>
                        <p class="font-semibold mb-2">1. Deconstruction: For each pair of words below, identify which has a more positive connotation and which has a more negative one.</p>
                        <div class="space-y-2 text-sm">
                            <div class="bg-gray-50 p-2 rounded-lg border">
                                <p>A) A <strong class="font-semibold">mob</strong> of people / A <strong class="font-semibold">crowd</strong> of people</p>
                            </div>
                             <div class="bg-gray-50 p-2 rounded-lg border">
                                <p>B) A <strong class="font-semibold">slender</strong> cat / A <strong class="font-semibold">scrawny</strong> cat</p>
                            </div>
                        </div>
                    </div>

                    <!-- Application -->
                    <div>
                        <p class="font-semibold mb-2">2. Application: Rewrite the sentence below twice. First, use words with a positive connotation. Second, use words with a negative connotation to describe the same basic event.</p>
                        <div class="comparison-box mb-2">
                             <p class="italic text-gray-600">"The person walked into the room."</p>
                        </div>
                        <div class="h-24 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm">
                            <p><strong class="text-green-700">Positive:</strong></p>
                            
                            <p><strong class="text-red-700 pt-2">Negative:</strong></p>
                             
                        </div>
                    </div>
                    
                    <!-- Critical Thinking -->
                    <div>
                        <p class="font-semibold mb-2">3. (Critical Thinking) How could a politician use diction to their advantage when describing an opponent's policy? Provide a brief example.</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                <h2 class="text-lg font-bold text-blue-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <h3 class="font-semibold text-blue-700 mb-2">English - Reading/Viewing</h3>
                        <p class="text-blue-600 mb-1"><strong>Achievement Objective:</strong> RV4-4</p>
                        <p class="text-gray-700 text-xs">Evaluate language choices and their effects on meaning</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-purple-100">
                        <h3 class="font-semibold text-purple-700 mb-2">Key Competencies</h3>
                        <ul class="text-purple-600 text-xs space-y-1">
                            <li>• Thinking critically about language use</li>
                            <li>• Using language symbols and texts</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
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

export default WritersToolkitDictionHandout;
