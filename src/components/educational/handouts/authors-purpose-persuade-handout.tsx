import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface AuthorsPurposePersuadeHandoutProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const AuthorsPurposePersuadeHandout: React.FC<AuthorsPurposePersuadeHandoutProps> = ({
  culturalContext = "Educational content with cultural integration",
  yearLevel = "Year 7-8",
  subject = "English, Literacy"
}) => {
  return (
    <div className="authors-purpose-persuade-handout">
      <Card title="Author's Purpose: Persuade | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Author's Purpose: Persuade | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">📣 Author's Purpose: PERSUADE</h1>
                <p class="page-subtitle">Level 4: Analyze how authors use language features to persuade readers</p>
            </div>

            <!-- Reading Text Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">📖 Opinion Piece: The Four-Day School Week Debate</h2>
                <div class="question-block">
                    <p>
                        <strong>Why New Zealand Schools Should Adopt a Four-Day Week</strong><br><br>

                        Imagine having an extra day every week to pursue your passions, spend time with family, or
                        simply recharge. This isn't just a dream—it's a reality that New Zealand schools should
                        seriously consider. The traditional five-day school week is outdated and doesn't serve our
                        students' best interests in the modern world.<br><br>

                        Research clearly shows that students are more focused and productive when they have adequate
                        rest. A four-day week would give our young people the time they desperately need to develop
                        other important life skills. Think about it: when was the last time you heard a student say they
                        had enough time for hobbies, sports, or family activities?<br><br>

                        Critics argue that a four-day week would mean less learning time. However, this couldn't be
                        further from the truth. Studies from schools that have already made this change show that
                        students actually perform better academically. They're more engaged, less stressed, and have
                        higher attendance rates. Isn't that what we all want for our children?<br><br>

                        The benefits extend beyond students. Teachers would have more time for professional development
                        and lesson planning, leading to better quality education. Parents would have more flexibility in
                        their work schedules. The entire community would benefit from this positive change.<br><br>

                        New Zealand has always been a leader in innovative education. It's time we took the next step
                        and embraced the four-day school week. Our students deserve better, and this change would show
                        that we truly care about their wellbeing and success. The question isn't whether we should make
                        this change—it's why we haven't done it already.
                    </p>
                </div>
            </section>

            <!-- Analysis Questions -->
            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">🔍 Persuasive Language Analysis</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <h3 class="mb-2">1. Rhetorical Questions</h3>
                        <p class="text-sm text-secondary mb-2">Find three rhetorical questions in the text and explain
                            how they help persuade the reader:</p>
                        <div class="space-y-2">
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>Question 1:</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>How it persuades:</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>Question 2:</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>How it persuades:</strong></p>
                                
                            </div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3 class="mb-2">2. Emotive Language</h3>
                        <p class="text-sm text-secondary mb-2">Identify five emotive words or phrases that create strong
                            feelings:</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="flex items-center space-x-2">
                                <p class="text-xs"><strong>1.</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-2">
                                <p class="text-xs"><strong>2.</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-2">
                                <p class="text-xs"><strong>3.</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-2">
                                <p class="text-xs"><strong>4.</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-2">
                                <p class="text-xs"><strong>5.</strong></p>
                                
                            </div>
                        </div>
                    </div>

                    <div class="question-block">
                        <h3 class="mb-2">3. Evidence and Statistics</h3>
                        <p class="text-sm text-secondary mb-2">How does the author use evidence to support their
                            argument?</p>
                        <div class="space-y-2">
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>Type of evidence used:</strong></p>
                                
                            </div>
                            <div class="flex items-center space-x-4">
                                <p class="text-xs"><strong>How it strengthens the argument:</strong></p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Writing Task -->
            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">✏️ Your Turn: Write a Persuasive Paragraph</h2>
                    <p class="text-sm text-secondary mb-3">Write a persuasive paragraph arguing for or against a four-day
                        school week. Use at least two persuasive techniques from the text above.</p>
                    <div class="space-y-2">

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

export default AuthorsPurposePersuadeHandout;
