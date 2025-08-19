import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitInformStructureHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitInformStructureHandout: React.FC<WritersToolkitInformStructureHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-inform-structure-handout">
      <Card title="The Writer's Toolkit: Informational Structures | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Informational Structures | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">The Writer's Toolkit: Structuring for Clarity</h1>
                <p class="page-subtitle">Organising Informational Texts</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Why Does Structure Matter?</h2>
                <p>
                    When you write to inform, your primary goal is clarity. You want your reader to understand the information easily and accurately. The way you structure your text is one of the most important tools for achieving this. A logical structure acts like a roadmap, guiding your reader through the information step-by-step. Choosing the right structure depends on your topic and what you want to explain. We will explore three common and effective structures for informational writing.
                </p>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Common Informational Text Structures</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">1. Chronological Order (Time Order)</h3>
                        <p class="text-sm text-secondary">Information is presented in the order that it happened. This is perfect for historical accounts, biographies, or explaining a process.</p>
                        <p class="text-sm mt-2"><strong>Signal words:</strong> First, next, then, finally, before, after, on (date).</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">2. Compare and Contrast</h3>
                        <p class="text-sm text-secondary">This structure is used to explain the similarities and differences between two or more things. It's useful for reviews, analysis, and decision-making.</p>
                        <p class="text-sm mt-2"><strong>Signal words:</strong> Similarly, likewise, on the other hand, however, both, in contrast.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">3. Cause and Effect</h3>
                        <p class="text-sm text-secondary">This structure explains why something happened (the cause) and what happened as a result (the effect). It is ideal for scientific and historical explanations.</p>
                        <p class="text-sm mt-2"><strong>Signal words:</strong> Because, as a result, therefore, consequently, due to, led to.</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Deconstruction & Application</h2>
                
                <div class="space-y-4">
                    <!-- Deconstruction -->
                    <div class="question-block">
                        <p><strong>1. Deconstruction: Read the short paragraphs below and identify which text structure is being used (Chronological, Compare/Contrast, or Cause/Effect).</p>
                        <div class="space-y-4 text-sm">
                            <div class="question-block">
                                <p class="text-italic">"Due to a lack of rainfall, the region's reservoirs became dangerously low. Consequently, the local council was forced to implement strict water restrictions for all residents."</p>
                                <p class="mt-2"><strong>Structure:</strong> ____________________</p>
                            </div>
                             <div class="question-block">
                                <p class="text-italic">"The iPhone 15 features a USB-C port for charging. On the other hand, the iPhone 14 still used the older Lightning connector. Both models, however, have excellent camera systems."</p>
                                <p class="mt-2"><strong>Structure:</strong> ____________________</p>
                            </div>
                        </div>
                    </div>

                    <!-- Application -->
                    <div class="question-block">
                        <p><strong>2. Application: Choose ONE of the topics below and write a short informational paragraph using the specified structure.</p>
                        <ul class="text-sm mb-2">
                            <li>Topic A: The main events of the 1981 Springbok Tour (<strong>Chronological</strong>)</li>
                            <li>Topic B: The reasons for the decline in kiwi populations (<strong>Cause and Effect</strong>)</li>
                        </ul>
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

export default WritersToolkitInformStructureHandout;
