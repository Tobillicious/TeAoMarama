import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitFluencyHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitFluencyHandout: React.FC<WritersToolkitFluencyHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-fluency-handout">
      <Card title="The Writer's Toolkit: Sentence Fluency | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Sentence Fluency | Mangakōtukutuku College</h1>
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
                <a href="handouts.html" class="breadcrumb">&larr; Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">The Writer's Toolkit: Sentence Fluency</h1>
                <p class="page-subtitle">Creating Rhythm and Flow in Your Writing</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">What is Sentence Fluency?</h2>
                <p>
                    Sentence fluency is the rhythm and flow of the language. It's the way sentences work together to create a smooth, pleasant reading experience. Writing with good fluency is easy to read aloud; the sentences seem to glide effortlessly from one to the next. Poor fluency, on the other hand, can make writing feel choppy, repetitive, and difficult to read. The key to achieving fluency is variety. By using a mix of different sentence lengths and structures, you can make your writing more mature, engaging, and powerful.
                </p>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">The Power of Variety: An Example</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Choppy & Repetitive 👎</h3>
                        <p class="text-italic text-secondary">The dog ran. He was a big dog. He barked loudly. He chased the ball. The ball was red.</p>
                        <p class="text-sm">All the sentences are short and start the same way. It's boring and sounds robotic.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Fluent & Engaging 👍</h3>
                        <p class="text-italic text-secondary">The big dog ran, his bark echoing across the park. With a surge of excitement, he chased after the red ball. It bounced. He pounced.</p>
                        <p class="text-sm">This version uses a mix of long, descriptive sentences and short, punchy ones to create rhythm and emphasis.</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Deconstruction & Application</h2>
                
                <div class="space-y-4">
                    <!-- Deconstruction -->
                    <div class="question-block">
                        <p><strong>1. Deconstruction: Read the fluent paragraph below. Identify one long sentence and one short sentence. What is the effect of placing the short sentence after the long one?</p>
                        <div class="technique-box mb-2">
                            <p class="text-italic text-secondary">"After hours of climbing through the dense, tangled undergrowth of the forest, scratching his arms on thorny vines and sweating under the humid canopy, he finally reached the clearing. The view was breathtaking. Below him, the entire valley stretched out, a patchwork of green fields and silver rivers under the vast, blue sky."</p>
                        </div>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>

                    <!-- Application -->
                    <div class="question-block">
                        <p><strong>2. Application: Combine the simple sentences below into one or two more complex, fluent sentences. Experiment with different sentence beginnings.</p>
                        <div class="technique-box mb-2">
                             <p class="text-italic text-secondary">The storm arrived. It was sudden. The wind howled. The rain fell hard. The lights flickered.</p>
                        </div>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Critical Thinking -->
                    <div class="question-block">
                        <p><strong>3. (Critical Thinking) In what type of writing might a writer deliberately use short, choppy sentences? What kind of mood or feeling would this create?</p>
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
  );
};

export default WritersToolkitFluencyHandout;
