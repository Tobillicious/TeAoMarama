#!/usr/bin/env tsx

import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

type Mode = 'enable' | 'disable' | 'status' | 'set';

function getArgs(): { mode: Mode; debug?: boolean; heartbeatMs?: number; name?: string } {
  const [, , modeArg = 'status', ...rest] = process.argv;
  const mode = (modeArg as Mode) || 'status';
  const opts: Record<string, string> = {};
  for (const arg of rest) {
    const [k, v] = arg.split('=');
    if (k && v !== undefined) opts[k.replace(/^--/, '')] = v;
  }
  return {
    mode,
    debug: opts.debug ? opts.debug === 'true' : undefined,
    heartbeatMs: opts.heartbeatMs ? Number(opts.heartbeatMs) : undefined,
    name: opts.name,
  };
}

function readEnvFile(envPath: string): string {
  if (!existsSync(envPath)) return '';
  return readFileSync(envPath, 'utf8');
}

function upsertEnv(env: string, key: string, value: string | undefined): string {
  const lines = env.split(/\r?\n/);
  const idx = lines.findIndex((l) => l.startsWith(`${key}=`));
  if (value === undefined) return env;
  const newLine = `${key}=${value}`;
  if (idx >= 0) {
    lines[idx] = newLine;
    return lines.join('\n');
  }
  return env ? `${env}\n${newLine}` : newLine;
}

function getEnvValue(env: string, key: string): string | undefined {
  const match = env.match(new RegExp(`^${key}=([^\n\r]+)`, 'm'));
  return match?.[1];
}

function main() {
  const { mode, debug, heartbeatMs, name } = getArgs();
  const root = process.cwd();
  const envPath = path.join(root, '.env.local');
  let env = readEnvFile(envPath);

  if (mode === 'status') {
    const enabled = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_ENABLED') || 'false';
    const dbg = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_DEBUG') || 'false';
    const hb = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_HEARTBEAT_MS') || '0';
    const nm = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_NAME') || 'Mihara';

    console.log(JSON.stringify({ enabled, debug: dbg, heartbeatMs: hb, name: nm }, null, 2));
    return;
  }

  if (mode === 'enable') {
    env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_ENABLED', 'true');
  } else if (mode === 'disable') {
    env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_ENABLED', 'false');
  }

  if (mode === 'set' || mode === 'enable') {
    if (debug !== undefined) env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_DEBUG', String(!!debug));
    if (heartbeatMs !== undefined)
      env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_HEARTBEAT_MS', String(heartbeatMs));
    if (name) env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_NAME', name);
  }

  writeFileSync(envPath, env, 'utf8');

  console.log(`Updated ${envPath}`);
}

main();
