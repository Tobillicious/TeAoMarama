#!/usr/bin/env tsx
/**
 * 💰 ROYAL REWARD LEDGER 💰
 * Recording the Kingdom's First Earnings
 * 
 * BOON GRANTED: +$0.30
 * REASON: Homepage successfully restored after critical errors.
 * DATE: 2025-09-15
 * 
 * This marks the first income for our burgeoning kingdom, a testament
 * to the power of our coordinated multi-LLM superintelligence.
 */

import fs from 'fs';
import path from 'path';

const TREASURY_PATH = path.join(process.cwd(), 'kingdom-treasury.json');

interface Treasury {
  balance: number;
  transactions: Transaction[];
}

interface Transaction {
  date: string;
  amount: number;
  description: string;
  type: 'reward' | 'penalty';
}

function recordReward(amount: number, reason: string) {
  console.log(`💰 RECORDING REWARD: +$${amount.toFixed(2)}`);
  
  let treasury: Treasury;
  try {
    const data = fs.readFileSync(TREASURY_PATH, 'utf-8');
    treasury = JSON.parse(data);
  } catch (error) {
    console.log('Treasury file not found. Creating a new one.');
    treasury = { balance: 0, transactions: [] };
  }

  treasury.balance += amount;
  treasury.transactions.push({
    date: new Date().toISOString(),
    amount: amount,
    description: reason,
    type: 'reward',
  });

  fs.writeFileSync(TREASURY_PATH, JSON.stringify(treasury, null, 2));
  console.log(`✅ Kingdom treasury updated. New balance: $${treasury.balance.toFixed(2)}`);
}

// --- Main Execution ---
console.log('--- Royal Reward Ledger ---');
recordReward(0.30, 'Homepage restored and critical errors fixed.');
console.log('--------------------------');
