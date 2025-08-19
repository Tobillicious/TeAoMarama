import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitRhetoricalDevicesHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitRhetoricalDevicesHandout: React.FC<WritersToolkitRhetoricalDevicesHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-rhetorical-devices-handout">
      <Card title="The Writer's Toolkit: Rhetorical Devices" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Rhetorical Devices</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">What are Rhetorical Devices?</h2>
                <p class="text-justify">
                    Beyond a well-structured PEEL paragraph, skilled writers use specific techniques to make their arguments more compelling. These are called rhetorical devices. Over 2,000 years ago, the Greek philosopher Aristotle identified three primary modes of persuasion that are still incredibly relevant today: Ethos, Pathos, and Logos. Understanding these three "artistic proofs" allows you to both analyse persuasive texts more deeply and to make your own writing far more effective.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">The Three Artistic Proofs</h3>
                <div class="space-y-4">
                    <div class="device-box">
                        <h4 class="font-bold text-purple-700 mb-1">ETHOS (Appeal to Authority & Credibility)</h4>
                        <p class="text-sm text-gray-600">This is about building trust with your audience. An author uses Ethos to convince the reader that they are a credible, trustworthy, and knowledgeable source. This makes the audience more likely to believe their argument.</p>
                        <p class="text-sm mt-1"><strong class="font-semibold">How it's done:</strong> Citing experts, using professional language, highlighting relevant personal experience, showing fairness and respect for opposing views.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> "As a marine biologist with 20 years of experience studying the Hauraki Gulf, I can attest to the devastating impact of overfishing."</p>
                    </div>
                    <div class="device-box">
                        <h4 class="font-bold text-purple-700 mb-1">PATHOS (Appeal to Emotion)</h4>
                        <p class="text-sm text-gray-600">This is about connecting with the reader's emotions. An author uses Pathos to evoke feelings like anger, sympathy, joy, or fear to make the audience feel personally connected to the issue.</p>
                        <p class="text-sm mt-1"><strong class="font-semibold">How it's done:</strong> Using vivid, emotionally charged language; telling personal stories (anecdotes); using figurative language like metaphors.</p>
                         <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> "Imagine the heartbreak of a family forced from their home, their belongings packed into a single suitcase, all because of a landlord's greedy rent increase."</p>
                    </div>
                    <div class="device-box">
                        <h4 class="font-bold text-purple-700 mb-1">LOGOS (Appeal to Logic & Reason)</h4>
                        <p class="text-sm text-gray-600">This is about appealing to the audience's intellect. An author uses Logos to present a logical, well-reasoned argument based on facts and evidence.</p>
                        <p class="text-sm mt-1"><strong class="font-semibold">How it's done:</strong> Presenting facts and statistics, using if/then statements, citing research, creating a clear, structured argument (like PEEL).</p>
                         <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> "The data is undeniable: over the past five years, communities that invested in youth programmes saw a 40% reduction in petty crime."</p>
                    </div>
                </div>
            </section>

            <!-- Interactive Mini-Game -->

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Deconstruction & Application</h3>
                
                <div class="space-y-5">
                    <!-- Deconstruction -->
                    <div>
                        <p class="font-semibold mb-2">1. Deconstruction: Read the sentences below and identify the primary rhetorical appeal being used (Ethos, Pathos, or Logos).</p>
                        <div class="space-y-2 text-sm">
                            <div class="bg-gray-50 p-2 rounded-lg border">
                                <p class="italic">"Every year, thousands of helpless kittens are abandoned on the street. Can you really turn your back on a shivering, hungry animal in need?"</p>
                                <p class="font-bold mt-1">Appeal: ____________________</p>
                            </div>
                             <div class="bg-gray-50 p-2 rounded-lg border">
                                <p class="italic">"A survey of 1,500 New Zealand employees showed that 82% favoured a four-day work week, indicating a clear preference for a better work-life balance."</p>
                                <p class="font-bold mt-1">Appeal: ____________________</p>
                            </div>
                        </div>
                    </div>

                    <!-- Application -->
                    <div>
                        <p class="font-semibold mb-2">2. Application: Your task is to write three separate sentences to persuade your principal to build a new school library. Write one sentence for each appeal.</p>
                        <div class="h-28 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm">
                            <p><strong class="text-purple-700">Ethos:</strong></p>
                            <p><strong class="text-purple-700 pt-2">Pathos:</strong></p>
                            <p><strong class="text-purple-700 pt-2">Logos:</strong></p>
                        </div>
                    </div>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default WritersToolkitRhetoricalDevicesHandout;
