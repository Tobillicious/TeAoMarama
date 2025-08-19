import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitSuspenseHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitSuspenseHandout: React.FC<WritersToolkitSuspenseHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-suspense-handout">
      <Card title="The Writer's Toolkit: Suspense & Foreshadowing" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Suspense & Foreshadowing</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">What is Suspense?</h2>
                <p class="text-justify">
                    Suspense is the feeling of anticipation or anxiety that a reader feels while waiting to find out what will happen next. It's the engine of any good thriller, mystery, or adventure story. As a writer, creating suspense is about making promises to your reader—promises of conflict, danger, or a shocking revelation—and then making them wait for the payoff. It's about controlling information, giving the reader just enough to make them ask questions, but not enough to give them the answers right away.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Techniques for Building Suspense</h3>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h4 class="font-bold text-sky-700 mb-1">1. Foreshadowing (Dropping Hints)</h4>
                        <p class="text-sm text-gray-600">Foreshadowing is the technique of hinting at future events without giving the whole story away. It plants a seed of unease or curiosity in the reader's mind. This can be done through dialogue, symbols, or even the setting.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> A character in a horror story might notice that the old house they just moved into has a single, freshly boarded-up window. The author doesn't explain it, but the reader's mind starts to wonder what could be behind it.</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-sky-700 mb-1">2. Pacing (Controlling the Speed)</h4>
                        <p class="text-sm text-gray-600">Pacing is the speed at which the story unfolds. To build suspense, a writer often slows the pace right down. They use short, simple sentences and focus on tiny, specific details to stretch out a moment of tension, making the reader wait for the action to happen.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> Instead of "He opened the door," a writer might use: "His hand trembled. The doorknob was cold. Ice-cold. He took a breath. Turned the knob. It clicked. The door creaked open."</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-sky-700 mb-1">3. A Sense of Danger</h4>
                        <p class="text-sm text-gray-600">The reader needs to know that the stakes are high. By showing that the character is in real physical or emotional danger, the reader becomes invested in their survival and feels anxious about the outcome.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> The character isn't just exploring a cave; they are exploring a cave with a dwindling torch battery and the sound of something scraping in the darkness ahead.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Deconstruction & Application</h3>
                
                <div class="space-y-5">
                    <!-- Deconstruction -->
                    <div>
                        <p class="font-semibold mb-2">1. Deconstruction: Read the short paragraph below. Identify one technique the author uses to create suspense and explain how it works.</p>
                        <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 italic mb-2">
                            <p>The floorboard upstairs creaked. Sarah froze, her fork halfway to her mouth. It was probably just the old house settling, she told herself. But then she heard it again, this time slower, more deliberate. A soft, dragging sound, like a heavy sack being pulled across the floor. And it was moving towards the stairs.</p>
                        </div>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>

                    <!-- Application -->
                    <div>
                        <p class="font-semibold mb-2">2. Application: Rewrite the simple sentence below into a short paragraph (3-4 sentences) that is full of suspense. Use at least two of the techniques described above.</p>
                        <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 italic mb-2">
                            <p>A character finds a mysterious box in their locker.</p>
                        </div>
                        <div class="h-28 bg-gray-50 border border-gray-300 rounded-md p-2">

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

export default WritersToolkitSuspenseHandout;
