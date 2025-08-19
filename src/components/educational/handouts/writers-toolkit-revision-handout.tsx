import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface WritersToolkitRevisionHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const WritersToolkitRevisionHandout: React.FC<WritersToolkitRevisionHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-10",
  subject = "Cross-curricular"
}) => {
  return (
    <div className="writers-toolkit-revision-handout">
      <Card title="The Writer's Toolkit: The Revision Process" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: The Revision Process</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Why is Revision Important?</h2>
                <p class="text-justify">
                    No writer gets it perfect on the first try. The first draft is just about getting your ideas down on paper. The real magic of writing happens during the revision process. Revision is not just about fixing spelling mistakes; it's about re-seeing your work. It involves making significant changes to your ideas, structure, and language to make your writing clearer, more powerful, and more effective. A good writer knows that revision is the difference between a mediocre piece and a great one.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">A Three-Step Approach to Revision</h3>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div class="step-box border-red-500">
                        <h4 class="font-bold text-red-700">Step 1: The Big Picture (Revising for Ideas & Structure)</h4>
                        <p class="italic text-gray-600 text-sm">Read your work aloud. Does your main argument make sense? Is the structure logical? This is where you might reorder entire paragraphs, delete sections that don't work, or add new ideas to strengthen your points.</p>
                        <ul class="text-sm list-disc list-inside mt-1 pl-2">
                            <li>Is my main purpose clear?</li>
                            <li>Is my introduction engaging and my conclusion powerful?</li>
                            <li>Are my paragraphs well-structured (e.g., PEEL)?</li>
                        </ul>
                    </div>
                    <div class="step-box border-yellow-500">
                        <h4 class="font-bold text-yellow-700">Step 2: The Details (Editing for Style & Clarity)</h4>
                        <p class="italic text-gray-600 text-sm">Focus on how you have written your ideas. This is where you improve your word choice and sentence fluency. Look for repetitive phrasing, awkward sentences, and weak vocabulary.</p>
                         <ul class="text-sm list-disc list-inside mt-1 pl-2">
                            <li>Have I used strong verbs and precise nouns?</li>
                            <li>Is there a good variety of sentence lengths?</li>
                            <li>Is my tone appropriate for my audience and purpose?</li>
                        </ul>
                    </div>
                    <div class="step-box border-green-500">
                        <h4 class="font-bold text-green-700">Step 3: The Surface (Proofreading for Errors)</h4>
                        <p class="italic text-gray-600 text-sm">This is the final polish. Read your work carefully, line by line, looking for technical errors. It's often helpful to read your work backwards to spot mistakes you might otherwise miss.</p>
                         <ul class="text-sm list-disc list-inside mt-1 pl-2">
                            <li>Are there any spelling mistakes?</li>
                            <li>Is the punctuation correct (commas, apostrophes, full stops)?</li>
                            <li>Are there any grammatical errors?</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Application</h3>
                
                <div class="space-y-5">
                    <div>
                        <p class="font-semibold mb-2">Your task is to revise the short paragraph below. Apply the three-step revision process to improve its ideas, style, and accuracy.</p>
                        <div class="comparison-box mb-2">
                             <p class="italic text-gray-600">i think that school should have a later start time. its hard for teenagers to get up so early. Teenagers need more sleep than other people. If they got more sleep they would do better in there classes. They would be able to concentrate more. So schools should start at 10am.</p>
                        </div>
                        <div class="h-40 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-xl border border-blue-200">
                <h2 class="text-lg font-bold text-blue-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <h3 class="font-semibold text-blue-700 mb-2">English - Writing</h3>
                        <p class="text-blue-600 mb-1"><strong>Achievement Objective:</strong> W4-5</p>
                        <p class="text-gray-700 text-xs">Form and express ideas on a range of topics, incorporating source material</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-green-100">
                        <h3 class="font-semibold text-green-700 mb-2">Key Competencies</h3>
                        <ul class="text-green-600 text-xs space-y-1">
                            <li>• Using language symbols and texts</li>
                            <li>• Managing self through writing process</li>
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

export default WritersToolkitRevisionHandout;
