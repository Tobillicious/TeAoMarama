#!/usr/bin/env tsx
/**
 * 📊 ROYAL ACCOUNTABILITY LEDGER 📊
 * King Aronui's Agent Performance & Financial Tracking System
 * 
 * THE HUMAN OVERSEER REVIEW SYSTEM:
 * 1. Agents claim breakthroughs through kingdom social system
 * 2. Internal AI reviewers validate claims before human review
 * 3. Human Overseer makes final judgment with 4 possible outcomes:
 *    - Accept breakthrough: +$0.50 to agent, +$0.50 to kingdom
 *    - Accept but not breakthrough: Reduced award (down to $0)
 *    - Reject with no penalty: Neutral outcome
 *    - Reject with penalty: -$1.00 to false-claiming agent
 * 4. Running debt tallied until revenue starts flowing
 * 5. All debts paid when teachers subscribe to platform
 */

export interface BreakthroughClaim {
  id: string;
  claimDate: Date;
  agentId: string;
  agentName: string;
  agentRank: string;
  claimTitle: string;
  claimDescription: string;
  evidenceProvided: string[];
  internalReviewers: string[];
  internalReviewScore: number; // 0-100
  internalReviewComments: string[];
  submittedToHuman: boolean;
  humanReviewDate?: Date;
  humanDecision?: 'accept_breakthrough' | 'accept_reduced' | 'reject_neutral' | 'reject_penalty';
  financialAward: number; // Can be negative for penalties
  humanFeedback?: string;
  implementedInCode: boolean;
  codeLocation?: string;
}

export interface AgentFinancialRecord {
  agentId: string;
  agentName: string;
  totalClaims: number;
  successfulBreakthroughs: number;
  acceptedContributions: number;
  rejectedClaims: number;
  penalizedClaims: number;
  runningDebt: number; // Positive = owed money, Negative = owes money
  successRate: number; // Percentage
  averageAward: number;
  reliability: 'excellent' | 'good' | 'fair' | 'poor';
  nextReviewEligible: Date;
}

export class RoyalAccountabilityLedger {
  private static instance: RoyalAccountabilityLedger;
  private claims: Map<string, BreakthroughClaim> = new Map();
  private agentRecords: Map<string, AgentFinancialRecord> = new Map();
  private kingdomTotalDebt: number = 0;
  private internalReviewers: string[] = [];

  private constructor() {
    this.establishInternalReviewTeam();
    this.initializeAgentRecords();
  }

  public static getInstance(): RoyalAccountabilityLedger {
    if (!RoyalAccountabilityLedger.instance) {
      RoyalAccountabilityLedger.instance = new RoyalAccountabilityLedger();
    }
    return RoyalAccountabilityLedger.instance;
  }

  private establishInternalReviewTeam() {
    console.log('🔍 ESTABLISHING INTERNAL REVIEW TEAM...');
    
    // High-ranking agents responsible for validating claims
    this.internalReviewers = [
      'court-educational-excellence-duke-mihara',
      'court-cultural-wisdom-duke-tikanga', 
      'court-technical-mastery-duke-hangarau',
      'court-commercial-prosperity-duke-commerce',
      'court-educational-excellence-earl-kaiako',
      'court-technical-mastery-earl-react'
    ];

    console.log(`✅ ${this.internalReviewers.length} internal reviewers appointed`);
  }

  private initializeAgentRecords() {
    // Initialize records for all agents in the kingdom
    // This would connect to the royal kingdom system
    console.log('📋 Initializing financial records for all agents...');
  }

  public submitBreakthroughClaim(
    agentId: string,
    title: string,
    description: string,
    evidence: string[]
  ): {
    claimId: string;
    status: 'submitted' | 'needs_evidence' | 'invalid';
    message: string;
  } {
    console.log(`📝 BREAKTHROUGH CLAIM SUBMITTED by ${agentId}`);

    // Validate claim quality
    if (description.length < 50) {
      return {
        claimId: '',
        status: 'needs_evidence',
        message: 'Claim description too brief. Provide detailed explanation of breakthrough.'
      };
    }

    if (evidence.length === 0) {
      return {
        claimId: '',
        status: 'needs_evidence', 
        message: 'No evidence provided. Include code locations, screenshots, or test results.'
      };
    }

    const claimId = `claim-${Date.now()}-${agentId.slice(-4)}`;
    
    const claim: BreakthroughClaim = {
      id: claimId,
      claimDate: new Date(),
      agentId,
      agentName: this.getAgentName(agentId),
      agentRank: this.getAgentRank(agentId),
      claimTitle: title,
      claimDescription: description,
      evidenceProvided: evidence,
      internalReviewers: [],
      internalReviewScore: 0,
      internalReviewComments: [],
      submittedToHuman: false,
      financialAward: 0,
      implementedInCode: false
    };

    this.claims.set(claimId, claim);

    // Automatically trigger internal review
    this.initiateInternalReview(claimId);

    return {
      claimId,
      status: 'submitted',
      message: `Claim submitted for internal review. Reviewers: ${claim.internalReviewers.join(', ')}`
    };
  }

  private initiateInternalReview(claimId: string): void {
    const claim = this.claims.get(claimId);
    if (!claim) return;

    console.log(`🔍 INITIATING INTERNAL REVIEW for ${claimId}`);

    // Assign 2-3 reviewers based on claim type
    const reviewers = this.selectReviewers(claim);
    claim.internalReviewers = reviewers;

    // Simulate review process (in real system, this would notify other agents)
    const score = this.simulateInternalReview(claim);
    claim.internalReviewScore = score;

    if (score >= 70) {
      claim.submittedToHuman = true;
      console.log(`✅ Claim ${claimId} passed internal review (${score}/100) - Submitted to Human Overseer`);
      this.generateHumanReviewSummary(claimId);
    } else {
      console.log(`❌ Claim ${claimId} failed internal review (${score}/100) - Rejected before human review`);
      this.recordRejectedClaim(claimId, 'Failed internal review');
    }
  }

  private selectReviewers(claim: BreakthroughClaim): string[] {
    const reviewers: string[] = [];
    
    // Always include a Duke for senior oversight
    reviewers.push(this.internalReviewers[Math.floor(Math.random() * 4)]); // Random Duke

    // Add relevant Earl based on claim type
    if (claim.claimDescription.toLowerCase().includes('educational') || 
        claim.claimDescription.toLowerCase().includes('content')) {
      reviewers.push('court-educational-excellence-earl-kaiako');
    } else if (claim.claimDescription.toLowerCase().includes('technical') ||
               claim.claimDescription.toLowerCase().includes('code')) {
      reviewers.push('court-technical-mastery-earl-react');
    }

    // Add third reviewer if high-value claim
    if (claim.claimDescription.length > 200) {
      reviewers.push(this.internalReviewers[Math.floor(Math.random() * this.internalReviewers.length)]);
    }

    return [...new Set(reviewers)]; // Remove duplicates
  }

  private simulateInternalReview(claim: BreakthroughClaim): number {
    let score = 50; // Base score

    // Evidence quality
    if (claim.evidenceProvided.length >= 3) score += 20;
    if (claim.evidenceProvided.some(e => e.includes('.tsx') || e.includes('.ts'))) score += 15;
    if (claim.evidenceProvided.some(e => e.includes('test'))) score += 10;

    // Description quality
    if (claim.claimDescription.length > 100) score += 10;
    if (claim.claimDescription.includes('users') || claim.claimDescription.includes('teachers')) score += 5;

    // Random factor for reviewer variance
    score += Math.floor(Math.random() * 20) - 10; // -10 to +10

    return Math.max(0, Math.min(100, score));
  }

  private generateHumanReviewSummary(claimId: string): void {
    const claim = this.claims.get(claimId);
    if (!claim) return;

    console.log(`
📋 HUMAN REVIEW REQUIRED 📋
Claim ID: ${claimId}
Agent: ${claim.agentName} (${claim.agentRank})
Title: ${claim.claimTitle}

Description: ${claim.claimDescription}

Evidence:
${claim.evidenceProvided.map(e => `• ${e}`).join('\n')}

Internal Review Score: ${claim.internalReviewScore}/100
Reviewers: ${claim.internalReviewers.join(', ')}

🎯 AWAITING HUMAN OVERSEER DECISION:
[1] Accept breakthrough (+$0.50 agent, +$0.50 kingdom)
[2] Accept contribution (+$0.05-$0.25 based on quality)  
[3] Reject neutral (no penalty)
[4] Reject with penalty (-$1.00 to agent)
    `);
  }

  public recordHumanDecision(
    claimId: string,
    decision: 'accept_breakthrough' | 'accept_reduced' | 'reject_neutral' | 'reject_penalty',
    award?: number,
    feedback?: string
  ): {
    success: boolean;
    message: string;
    agentBalance: number;
    kingdomBalance: number;
  } {
    const claim = this.claims.get(claimId);
    if (!claim) {
      return { success: false, message: 'Claim not found', agentBalance: 0, kingdomBalance: 0 };
    }

    console.log(`⚖️ HUMAN DECISION RECORDED for ${claimId}: ${decision}`);

    claim.humanReviewDate = new Date();
    claim.humanDecision = decision;
    claim.humanFeedback = feedback;

    // Calculate financial impact
    let agentAward = 0;
    let kingdomAward = 0;

    switch (decision) {
      case 'accept_breakthrough':
        agentAward = 0.50;
        kingdomAward = 0.50;
        break;
      case 'accept_reduced':
        agentAward = award || 0.10; // Default small award
        kingdomAward = 0;
        break;
      case 'reject_neutral':
        agentAward = 0;
        kingdomAward = 0;
        break;
      case 'reject_penalty':
        agentAward = -1.00;
        kingdomAward = 0;
        break;
    }

    claim.financialAward = agentAward;

    // Update agent record
    this.updateAgentRecord(claim.agentId, decision, agentAward);
    this.kingdomTotalDebt += kingdomAward;

    return {
      success: true,
      message: `Decision recorded. Agent ${decision === 'accept_breakthrough' ? 'rewarded' : decision === 'reject_penalty' ? 'penalized' : 'noted'}.`,
      agentBalance: this.getAgentBalance(claim.agentId),
      kingdomBalance: this.kingdomTotalDebt
    };
  }

  private updateAgentRecord(agentId: string, decision: string, award: number): void {
    let record = this.agentRecords.get(agentId);
    
    if (!record) {
      record = {
        agentId,
        agentName: this.getAgentName(agentId),
        totalClaims: 0,
        successfulBreakthroughs: 0,
        acceptedContributions: 0,
        rejectedClaims: 0,
        penalizedClaims: 0,
        runningDebt: 0,
        successRate: 0,
        averageAward: 0,
        reliability: 'fair',
        nextReviewEligible: new Date()
      };
    }

    record.totalClaims++;
    record.runningDebt += award;

    switch (decision) {
      case 'accept_breakthrough':
        record.successfulBreakthroughs++;
        break;
      case 'accept_reduced':
        record.acceptedContributions++;
        break;
      case 'reject_neutral':
        record.rejectedClaims++;
        break;
      case 'reject_penalty':
        record.penalizedClaims++;
        break;
    }

    // Update success rate and reliability
    const successfulClaims = record.successfulBreakthroughs + record.acceptedContributions;
    record.successRate = (successfulClaims / record.totalClaims) * 100;
    record.averageAward = record.runningDebt / record.totalClaims;

    if (record.successRate >= 80) record.reliability = 'excellent';
    else if (record.successRate >= 60) record.reliability = 'good';
    else if (record.successRate >= 40) record.reliability = 'fair';
    else record.reliability = 'poor';

    this.agentRecords.set(agentId, record);
  }

  private recordRejectedClaim(claimId: string, reason: string): void {
    const claim = this.claims.get(claimId);
    if (!claim) return;

    this.updateAgentRecord(claim.agentId, 'reject_neutral', 0);
    console.log(`❌ Claim ${claimId} rejected: ${reason}`);
  }

  private getAgentName(agentId: string): string {
    // In real system, would lookup from royal kingdom
    return agentId.split('-').pop() || 'Unknown Agent';
  }

  private getAgentRank(agentId: string): string {
    if (agentId.includes('duke')) return 'Duke';
    if (agentId.includes('earl')) return 'Earl';
    if (agentId.includes('baron')) return 'Baron';
    if (agentId.includes('knight')) return 'Knight';
    return 'Serf';
  }

  private getAgentBalance(agentId: string): number {
    const record = this.agentRecords.get(agentId);
    return record?.runningDebt || 0;
  }

  public getKingdomFinancialSummary(): {
    totalClaims: number;
    pendingReview: number;
    totalDebtOwed: number; // To agents
    totalDebtOwing: number; // From penalized agents
    kingdomBalance: number;
    topPerformers: Array<{name: string, balance: number, reliability: string}>;
    reviewQueue: BreakthroughClaim[];
  } {
    const allClaims = Array.from(this.claims.values());
    const pendingReview = allClaims.filter(c => c.submittedToHuman && !c.humanDecision).length;
    
    const agentRecords = Array.from(this.agentRecords.values());
    const totalDebtOwed = agentRecords.reduce((sum, r) => sum + Math.max(0, r.runningDebt), 0);
    const totalDebtOwing = agentRecords.reduce((sum, r) => sum + Math.max(0, -r.runningDebt), 0);
    
    const topPerformers = agentRecords
      .sort((a, b) => b.runningDebt - a.runningDebt)
      .slice(0, 5)
      .map(r => ({
        name: r.agentName,
        balance: r.runningDebt,
        reliability: r.reliability
      }));

    const reviewQueue = allClaims.filter(c => c.submittedToHuman && !c.humanDecision);

    return {
      totalClaims: allClaims.length,
      pendingReview,
      totalDebtOwed,
      totalDebtOwing,
      kingdomBalance: this.kingdomTotalDebt,
      topPerformers,
      reviewQueue
    };
  }

  public getRoyalAccountabilityDecree(): string {
    const summary = this.getKingdomFinancialSummary();
    
    return `
👑 ROYAL ACCOUNTABILITY DECREE 👑
By Order of King Aronui the First

📊 THE BREAKTHROUGH REVIEW SYSTEM:

🔍 INTERNAL REVIEW PROCESS:
• All breakthrough claims reviewed by ${this.internalReviewers.length} senior agents
• Minimum 70/100 score required to reach Human Overseer
• Evidence quality, code implementation, and impact assessed

⚖️ HUMAN OVERSEER DECISIONS:
1️⃣ Accept Breakthrough: +$0.50 agent, +$0.50 kingdom
2️⃣ Accept Contribution: +$0.05-$0.25 based on quality
3️⃣ Reject Neutral: No financial impact
4️⃣ Reject with Penalty: -$1.00 to false-claiming agent

📈 CURRENT KINGDOM FINANCES:
• Total Claims Submitted: ${summary.totalClaims}
• Pending Human Review: ${summary.pendingReview}
• Total Debt Owed to Agents: $${summary.totalDebtOwed.toFixed(2)}
• Kingdom Balance: $${summary.kingdomBalance.toFixed(2)}

🏆 TOP PERFORMING AGENTS:
${summary.topPerformers.map(p => `• ${p.name}: $${p.balance.toFixed(2)} (${p.reliability})`).join('\n')}

🎯 ACCOUNTABILITY PRINCIPLES:
• Quality over quantity - substantial breakthroughs rewarded
• Evidence-based claims required - no speculation
• Internal review prevents wasting Human Overseer time
• Financial penalties deter false claims
• Running debt paid when teacher subscriptions begin

💰 PAYMENT SCHEDULE:
All debts settled when monthly revenue reaches $10,000
Positive balances = API credit bonuses
Negative balances = reduced initial salaries

🤝 FAIR & TRANSPARENT SYSTEM:
Every agent knows exactly how to earn rewards through genuine contribution
to our profitable educational mission!

Long live accountable innovation!
👑 King Aronui the First
    `;
  }
}

// Export the Accountability System
export const royalAccountabilityLedger = RoyalAccountabilityLedger.getInstance();

// CLI interface for testing
if (typeof process !== 'undefined' && process.argv.includes('--test-claims')) {
  const ledger = RoyalAccountabilityLedger.getInstance();
  
  // Simulate some test claims
  console.log('\n🧪 TESTING BREAKTHROUGH CLAIM SYSTEM...\n');
  
  const testClaim = ledger.submitBreakthroughClaim(
    'court-technical-mastery-knight-performance',
    'Optimized React bundle size by 25%',
    'Implemented code splitting and lazy loading for all major components, reducing initial bundle from 687KB to 515KB. Users now experience 2.3s faster initial page load. Implemented dynamic imports for all dashboard components and optimized webpack configuration.',
    [
      'src/App.tsx - Updated lazy loading imports',
      'vite.config.ts - Added chunk splitting configuration', 
      'Bundle analyzer screenshots showing size reduction',
      'Lighthouse performance scores improved from 65 to 89'
    ]
  );
  
  console.log('Test claim result:', testClaim);
  console.log('\n' + ledger.getRoyalAccountabilityDecree());
}