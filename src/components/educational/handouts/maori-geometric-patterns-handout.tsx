import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface MaoriGeometricPatternsHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const MaoriGeometricPatternsHandout: React.FC<MaoriGeometricPatternsHandoutProps> = ({
  culturalContext = "Māori cultural knowledge and Aotearoa context",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="maori-geometric-patterns-handout">
      <Card title="Geometric Patterns in Māori Art Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Geometric Patterns in Māori Art Handout | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">The Mathematics of Toi Māori</h1>
                <p class="page-subtitle">Exploring Geometry in Traditional Māori Art</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">Art, Ancestors, and Algorithms</h2>
                    <p>
                        Traditional Māori art is more than just decoration; it is a visual language rich with meaning, history, and mathematics. The intricate patterns found in kōwhaiwhai (painted rafters), tukutuku (woven panels), and tāniko (weaving) are beautiful examples of geometric principles like <strong>translation, rotation, reflection, and symmetry</strong>. These patterns were carefully constructed, following rules and algorithms passed down through generations of artists and mathematicians.
                    </p>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Core Geometric Patterns</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Kōwhaiwhai: Translation and Reflection</h3>
                        <p>
                            Kōwhaiwhai patterns, often seen on the rafters of a marae, are a perfect example of <strong>translation</strong> (sliding a pattern along a line) and <strong>reflection</strong> (flipping a pattern). The repeating patterns often represent the genealogy of the iwi, with each element flowing from the last.
                        </p>
                        <div class="question-block mt-2">
                            <p class="text-sm text-center font-mono">&lt;-- (Pattern A) --&gt; &lt;-- (Pattern A) --&gt;</p>
                            <p class="text-xs text-secondary text-center">Translation</p>
                        </div>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Tukutuku: Symmetry and Tessellation</h3>
                        <p>
                            Tukutuku panels are woven with flax and other materials to create geometric patterns that often have <strong>rotational symmetry</strong>. The patterns, such as pātiki (flounder) or kaokao (armpit), are tessellated (repeated to fill a space without gaps or overlaps) across the panel.
                        </p>
                         <div class="question-block mt-2">
                            <p class="text-sm text-center font-mono">+ + +<br>+ + +<br>+ + +</p>
                            <p class="text-xs text-secondary text-center">Tessellation</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Deconstructing a Pattern: The Pātiki</h2>
                <div class="question-block flex items-center gap-4">
                    <div>
                        <p>
                            The pātiki (flounder) pattern is a common design in tukutuku panels. It represents hospitality and abundance. Mathematically, it is a simple yet elegant example of <strong>rotational symmetry</strong>. The basic diamond shape is rotated around a central point to create the final design.
                        </p>
                    </div>
                    <div class="text-center font-mono text-2xl text-secondary">
                        <p>+<br>+++<br>+</p>
                    </div>
                </div>
            </section>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Thinking & Design Challenge</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <p><strong>1. Choose one of the geometric principles (translation, rotation, reflection, symmetry). Where do you see examples of this principle in your everyday life?</p>
                        
                    </div>
                    <div class="question-block">
                        <p><strong>2. On the grid below, use the principles of translation and reflection to create your own simple kōwhaiwhai-inspired pattern.</p>
                        <div class="answer-space answer-space-lg grid grid-cols-8 grid-rows-4 gap-1">
                            <!-- Grid lines -->

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

export default MaoriGeometricPatternsHandout;
