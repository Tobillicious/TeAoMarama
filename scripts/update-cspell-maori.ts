#!/usr/bin/env tsx

/**
 * Update CSpell dictionary with Māori kupu from maoridictionary.co.nz using Exa.ai
 *
 * Usage:
 *   EXA_API_KEY=... tsx scripts/update-cspell-maori.ts --limit 50 --dry-run
 *   npm run cspell:update:maori
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface ExaResult {
  url: string;
  title?: string;
}

interface CSpellConfig {
  enabled?: boolean;
  allowCompoundWords?: boolean;
  words?: string[];
  languageSettings?: unknown;
  ignoreWords?: string[];
}

function getArg(_flag: string, _fallback?: string): string | undefined {
  const _idx = process.argv.indexOf(flag);
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return fallback;
}

async function exaSearch(_query: string, _limit, _apiKey?: string): Promise<ExaResult[]> {
  if (!apiKey) throw new Error('EXA_API_KEY not set');
  const _res = await axios.post(
    'https://api.exa.ai/search',
    { query, numResults: limit },
    { headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey } },
  );
  const results = (res.data?.results || []) as Array<{ url: string; title?: string }>;
  return results.map((r) => ({ url: r.url, title: r.title }));
}

async function fetchHtml(_url: string): Promise<string> {
  const _res = await axios.get(url, { timeout: 10000 });
  return String(res.data ?? '');
}

function extractKupuFromHtml(_html: string): string[] {
  // Remove scripts/styles
  const _cleaned = html
    .replace(/<script[\s\S]*?</script>/gi, '')
    .replace(/<style[\s\S]*?</style>/gi, '');
  const text = cleaned.replace(/<[^>]+>/g, ' ').replace(/&[a-zA-Z#0-9]+;/g, ' ');
  // Tokenize words, keep macrons and hyphens (hyphen at end of class so no escape needed)
  const _tokens = text.match(/[A-Za-zĀĒĪŌŪāēīōū-]{2,}/g) || [];
  // Normalize to lowercase and dedupe
  const _kupu = new Set(tokens.map((t) => t.toLowerCase()));
  return Array.from(kupu);
}

function mergeIntoCSpell(_words: string[], _cspellPath: string, _dryRun) {
  const _json = JSON.parse(fs.readFileSync(cspellPath, 'utf8')) as CSpellConfig;
  if (!Array.isArray(json.words)) json.words = [];
  const _existing = new Set<string>(json.words);

  let added = 0;
  for (const w of words) {
    if (!existing.has(w)) {
      json.words.push(w);
      existing.add(w);
      added++;
    }
  }
  // Keep sorted for diff stability
  const _sorted = Array.from(new Set(json.words as string[])).sort((a, b) => a.localeCompare(b));
  json.words = sorted;

  if (dryRun) {
    console.log(`[dry-run] Would add ${added} kupu to cspell.json`);
  } else {
    fs.writeFileSync(cspellPath, JSON.stringify(json, null, 2) + '\n');
    console.log(`Added ${added} kupu to cspell.json`);
  }
}

async function main() {
  const _apiKey = process.env.EXA_API_KEY;
  const _limit = Number(getArg('--_limit', '25'));
  const _dryRun = process.argv.includes('--dry-run') || getArg('--dry-run') === 'true';

  if (!apiKey) {
    console.warn('EXA_API_KEY not set. Exiting.');
    process.exit(0);
  }

  const _query = 'site:maoridictionary.co.nz';
  console.log(`Querying Exa.ai: "${query}" (limit=${limit})`);
  const _results = await exaSearch(query, limit, apiKey);

  const _urls = results.map((r) => r.url);
  console.log(`Fetched ${urls.length} result URLs from Exa.`);

  const _allKupu = new Set<string>();
  for (const url of urls) {
    try {
      const _html = await fetchHtml(url);
      const _kupu = extractKupuFromHtml(html);
      kupu.forEach((k) => allKupu.add(k));
    } catch {
      console.warn(`Skip URL (fetch error): ${url}`);
    }
  }

  console.log(`Extracted ${allKupu.size} unique tokens.`);
  const _repoRoot = path.resolve(__dirname, '..');
  const _cspellPath = path.join(repoRoot, 'cspell.json');
  mergeIntoCSpell(Array.from(allKupu), cspellPath, dryRun);
}

main().catch((e) => {
  console.error('Failed to update cspell dictionary:', e);
  process.exit(1);
});
