import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface FinancialLiteracyComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const FinancialLiteracyComprehensionHandout: React.FC<FinancialLiteracyComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="financial-literacy-comprehension-handout">
      <Card title="Financial Literacy Reading Comprehension | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Financial Literacy Reading Comprehension | Mangakōtukutuku College</h1>
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
                <a href="handouts.html" class="breadcrumb">&larr Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">Reading Comprehension: Financial Literacy</h1>
                <p class="page-subtitle">asTTle-Style Analysis of Compound Interest</p>
            </div>

            <article class="handout-content mb-4">
                <h2 class="section-title" class="wiley-section-title">The Eighth Wonder of the World</h2>
                <p>
Albert Einstein reportedly called compound interest the "eighth wonder of the world," adding, "He who understands it, earns it he who doesn't, pays it." Compound interest is the interest you earn not only on your initial amount of money (the principal), but also on the accumulated interest from previous periods. In simple terms, it's "interest on interest," and it creates a snowball effect that can dramatically grow your savings over time. The two key ingredients for compounding are time and a consistent rate of return.
                </p>
                <p>
Imagine you invest \$1,000 in an account with a 10% annual interest rate. After the first year, you will have earned \$100 in interest, bringing your total to \$1,100. In the second year, you don't just earn interest on the original \$1,000 you earn it on the full \$1,100. This means you earn \$110 in interest, bringing your total to \$1,210. While this might seem like a small difference initially, over decades, the growth becomes exponential. This is why financial advisors stress the importance of starting to save early, even with small amounts, to give your money the maximum amount of time to grow.
                </p>
                <p>
However, compounding is a double-edged sword. Just as it can powerfully grow your savings, it can also rapidly increase your debt. High-interest debt, such as from credit cards or payday loans, also uses compound interest. If you owe \$1,000 on a credit card with a 20% annual interest rate and don't make payments, the amount you owe will quickly spiral. The interest is added to your debt, and you then start paying interest on the new, larger debt. Understanding this principle is fundamental to making smart financial decisions, whether that's investing for the future or avoiding the trap of high-interest debt.
                </p>
            </article>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Comprehension & Critical Thinking Questions</h2>
                
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p><strong>1. What is the best definition of compound interest?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) A fixed fee you pay to the bank every year.</div>
                            <div class="question-option">B) Interest earned only on the initial amount of money saved.</div>
                            <div class="question-option">C) Interest earned on both the principal and the accumulated interest.</div>
                            <div class="question-option">D) A type of high-risk investment.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p><strong>2. (Numeracy) Based on the example in the text, how much interest would be earned in the third year on the \$1,210 balance at a 10% interest rate?</p>
                         <div class="answer-space">
                            <p>Answer: </p>
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p><strong>3. The text describes compound interest as a "double-edged sword." What does this phrase mean?</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) It is a very complicated idea to understand.</div>
                            <div class="question-option">B) It can be both very beneficial (for savings) and very harmful (for debt).</div>
                            <div class="question-option">C) It only applies to two types of financial products.</div>
                            <div class="question-option">D) It was invented by a person who also made swords.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div class="question-block">
                        <p><strong>4. (Critical Thinking) Why is starting to save early in life so important for taking advantage of compound interest?</p>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div class="question-block">
                        <p><strong>5. (Critical Thinking) The text mentions credit cards as an example of high-interest debt. Why do you think banks charge much higher interest rates on credit card debt than they pay on savings accounts?</p>
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
  )
}

export default FinancialLiteracyComprehensionHandout
