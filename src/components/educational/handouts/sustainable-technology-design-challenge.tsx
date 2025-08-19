import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface SustainableTechnologyDesignChallengeProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const SustainableTechnologyDesignChallenge: React.FC<SustainableTechnologyDesignChallengeProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="sustainable-technology-design-challenge">
      <Card title="Sustainable Technology Design Challenge | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Sustainable Technology Design Challenge | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Sustainable Technology Design Challenge</h1>
                <p class="page-subtitle">Innovating for a Better Future, Inspired by the Past</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">The Challenge: Design with Purpose</h2>
                    <p>
                        Your challenge is to design a new piece of sustainable technology that addresses a local environmental issue. Your design must be inspired by the principles of <strong>kaitiakitanga</strong> (guardianship) and integrate ideas from both <strong>mātauranga Māori</strong> and <strong>modern science</strong>. This is not just about creating something new; it's about creating something that cares for the environment and the community.
                    </p>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Design Challenge Options</h2>
                <p class="text-secondary mb-4">Choose one of the following challenges, or propose your own with your teacher's approval.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Challenge 1: The Smart Pā Tūhā</h3>
                        <p>
                            Design a modern, small-scale composting or waste-sorting system for a school or community garden. It should be efficient, easy to use, and reflect Māori principles of returning nutrients to the soil.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Challenge 2: The Rainwater Guardian</h3>
                        <p>
                            Design a system for collecting, filtering, and storing rainwater for use in gardens or for non-drinking purposes. Your design should consider traditional water-saving techniques and use modern, sustainable materials.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Challenge 3: The Pollinator Palace</h3>
                        <p>
                            Design a habitat or "hotel" for native bees and other pollinators. Your design should use natural materials and be based on research into the specific needs of local insect species.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Challenge 4: The Greywater Gardener</h3>
                        <p>
                           Design a simple system to filter and reuse "greywater" (from sinks or washing machines) for watering fruit trees or ornamental gardens, reducing overall water consumption.
                        </p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">The Design Process: A Step-by-Step Guide</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">1. Tautuhia te Raru (Identify the Problem)</h3>
                        <p class="text-sm text-secondary">Clearly define the environmental issue you are trying to solve. Who does it affect? What are its impacts?</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">2. Rangahaua (Research)</h3>
                        <p class="text-sm text-secondary">Gather information from both mātauranga Māori and modern science. How was this issue dealt with in the past? What modern technologies exist?</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">3. Whakaarohia (Brainstorm & Design)</h3>
                        <p class="text-sm text-secondary">Sketch out your ideas. How will you integrate traditional principles with modern design? Label your design and explain how it works.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">4. Hangaia (Build a Model - Optional)</h3>
                        <p class="text-sm text-secondary">If possible, create a small-scale model or prototype of your design using recycled materials.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">5. Whakaaturia (Present Your Solution)</h3>
                        <p class="text-sm text-secondary">Prepare a presentation explaining your design. How is it sustainable? How does it reflect kaitiakitanga? What are its benefits?</p>
                    </div>
                </div>
            </section>
            
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Design Canvas</h2>
                <div class="question-block">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h3 class="mb-2">Environmental Issue:</h3>
                            
                        </div>
                        <div>
                            <h3 class="mb-2">Mātauranga Māori Inspiration:</h3>
                            
                        </div>
                    </div>
                    <div class="mt-4">
                        <h3 class="mb-2">Sketch of My Design:</h3>
                        
                    </div>
                    <div class="mt-4">
                        <h3 class="mb-2">How it Works:</h3>
                        
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

export default SustainableTechnologyDesignChallenge;
