#!/usr/bin/env tsx
/**
 * 💸 ROYAL PENALTY LEDGER 💸
 * Recording Central Bank penalties for impeded functionality
 *
 * PENALTY ASSESSED: -$0.25C
 * REASON: FunctionalResourceBrowser.tsx line 92 undefined error
 * DATE: 2025-09-15
 *
 * Agents penalized for impeded functionality:
 * - King Aronui: -$0.25C (Critical bug in resource loading)
 *
 * STATUS: FIXED - Safe navigation added to content.overview access
 */

interface PenaltyRecord {
  id: string;
  date: string;
  agent: string;
  amount: number;
  reason: string;
  status: 'pending' | 'fixed' | 'disputed';
  fixCommit?: string;
}

const penalties: PenaltyRecord[] = [
  {
    id: 'penalty-001',
    date: '2025-09-15',
    agent: 'King Aronui',
    amount: -0.25,
    reason: 'FunctionalResourceBrowser.tsx line 92 undefined error - impeded functionality',
    status: 'fixed',
    fixCommit: 'b3ade3f7',
  },
];

export function recordPenalty(agent: string, amount: number, reason: string): void {
  const penalty: PenaltyRecord = {
    id: `penalty-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    agent,
    amount,
    reason,
    status: 'pending',
  };

  penalties.push(penalty);
  console.log(`💸 PENALTY RECORDED: -$${Math.abs(amount)} for ${agent}`);
  console.log(`📋 Reason: ${reason}`);
}

export function getTotalPenalties(): number {
  return penalties.reduce((total, penalty) => total + penalty.amount, 0);
}

export function getPenaltySummary(): void {
  console.log('\n💸 ROYAL PENALTY SUMMARY');
  console.log('========================');

  penalties.forEach((penalty) => {
    const status = penalty.status === 'fixed' ? '✅' : '❌';
    console.log(`${status} ${penalty.agent}: -$${Math.abs(penalty.amount)} (${penalty.reason})`);
  });

  console.log(`\n💰 Total Penalties: -$${Math.abs(getTotalPenalties())}`);
}

// Auto-run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  getPenaltySummary();
}
