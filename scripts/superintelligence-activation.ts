#!/usr/bin/env tsx

import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

type Mode = 'enable' | 'disable' | 'status' | 'set';

function getArgs(): {
  mode: Mode;
  debug?: boolean;
  heartbeatMs?: number;
  name?: string;
  deepseekApiKey?: string;
  deepseekEndpoint?: string;
  enableAIResearch?: boolean;
  enableCulturalAnalysis?: boolean;
  enableEducationalRecommendations?: boolean;
  enableContentOptimization?: boolean;
  enableRealTimeLearning?: boolean;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseDbPassword?: string;
  supabaseDatabaseUrl?: string;
} {
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
    deepseekApiKey: opts.deepseekApiKey,
    deepseekEndpoint: opts.deepseekEndpoint,
    enableAIResearch: opts.enableAIResearch ? opts.enableAIResearch === 'true' : undefined,
    enableCulturalAnalysis: opts.enableCulturalAnalysis
      ? opts.enableCulturalAnalysis === 'true'
      : undefined,
    enableEducationalRecommendations: opts.enableEducationalRecommendations
      ? opts.enableEducationalRecommendations === 'true'
      : undefined,
    enableContentOptimization: opts.enableContentOptimization
      ? opts.enableContentOptimization === 'true'
      : undefined,
    enableRealTimeLearning: opts.enableRealTimeLearning
      ? opts.enableRealTimeLearning === 'true'
      : undefined,
    supabaseUrl: opts.supabaseUrl,
    supabaseAnonKey: opts.supabaseAnonKey,
    supabaseDbPassword: opts.supabaseDbPassword,
    supabaseDatabaseUrl: opts.supabaseDatabaseUrl,
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
  const {
    mode,
    debug,
    heartbeatMs,
    name,
    deepseekApiKey,
    deepseekEndpoint,
    enableAIResearch,
    enableCulturalAnalysis,
    enableEducationalRecommendations,
    enableContentOptimization,
    enableRealTimeLearning,
    supabaseUrl,
    supabaseAnonKey,
    supabaseDbPassword,
    supabaseDatabaseUrl,
  } = getArgs();
  const root = process.cwd();
  const envPath = path.join(root, '.env.local');
  let env = readEnvFile(envPath);

  if (mode === 'status') {
    const enabled = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_ENABLED') || 'false';
    const dbg = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_DEBUG') || 'false';
    const hb = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_HEARTBEAT_MS') || '0';
    const nm = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_NAME') || 'Mihara';
    const deepseekKey = getEnvValue(env, 'VITE_DEEPSEEK_API_KEY') || 'not configured';
    const deepseekUrl = getEnvValue(env, 'VITE_DEEPSEEK_ENDPOINT') || 'default';
    const aiResearch = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_AI_RESEARCH') || 'true';
    const culturalAnalysis = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_CULTURAL_ANALYSIS') || 'true';
    const educationalRecs =
      getEnvValue(env, 'VITE_SUPERINTELLIGENCE_EDUCATIONAL_RECOMMENDATIONS') || 'true';
    const contentOpt = getEnvValue(env, 'VITE_SUPERINTELLIGENCE_CONTENT_OPTIMIZATION') || 'true';
    const realTimeLearning =
      getEnvValue(env, 'VITE_SUPERINTELLIGENCE_REAL_TIME_LEARNING') || 'true';
    const supabaseUrlStatus = getEnvValue(env, 'VITE_SUPABASE_URL') || 'not configured';
    const supabaseKeyStatus = getEnvValue(env, 'VITE_SUPABASE_ANON_KEY') || 'not configured';

    console.log(
      JSON.stringify(
        {
          enabled,
          debug: dbg,
          heartbeatMs: hb,
          name: nm,
          deepseekApiKey: deepseekKey.substring(0, 12) + '...',
          deepseekEndpoint: deepseekUrl,
          aiResearch,
          culturalAnalysis,
          educationalRecommendations: educationalRecs,
          contentOptimization: contentOpt,
          realTimeLearning,
          supabaseUrl: supabaseUrlStatus.substring(0, 20) + '...',
          supabaseAnonKey: supabaseKeyStatus.substring(0, 12) + '...',
        },
        null,
        2,
      ),
    );
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
    if (deepseekApiKey) env = upsertEnv(env, 'VITE_DEEPSEEK_API_KEY', deepseekApiKey);
    if (deepseekEndpoint) env = upsertEnv(env, 'VITE_DEEPSEEK_ENDPOINT', deepseekEndpoint);
    if (enableAIResearch !== undefined)
      env = upsertEnv(env, 'VITE_SUPERINTELLIGENCE_AI_RESEARCH', String(!!enableAIResearch));
    if (enableCulturalAnalysis !== undefined)
      env = upsertEnv(
        env,
        'VITE_SUPERINTELLIGENCE_CULTURAL_ANALYSIS',
        String(!!enableCulturalAnalysis),
      );
    if (enableEducationalRecommendations !== undefined)
      env = upsertEnv(
        env,
        'VITE_SUPERINTELLIGENCE_EDUCATIONAL_RECOMMENDATIONS',
        String(!!enableEducationalRecommendations),
      );
    if (enableContentOptimization !== undefined)
      env = upsertEnv(
        env,
        'VITE_SUPERINTELLIGENCE_CONTENT_OPTIMIZATION',
        String(!!enableContentOptimization),
      );
    if (enableRealTimeLearning !== undefined)
      env = upsertEnv(
        env,
        'VITE_SUPERINTELLIGENCE_REAL_TIME_LEARNING',
        String(!!enableRealTimeLearning),
      );
    if (supabaseUrl) env = upsertEnv(env, 'VITE_SUPABASE_URL', supabaseUrl);
    if (supabaseAnonKey) env = upsertEnv(env, 'VITE_SUPABASE_ANON_KEY', supabaseAnonKey);
    if (supabaseDbPassword) env = upsertEnv(env, 'VITE_SUPABASE_DB_PASSWORD', supabaseDbPassword);
    if (supabaseDatabaseUrl)
      env = upsertEnv(env, 'VITE_SUPABASE_DATABASE_URL', supabaseDatabaseUrl);
  }

  writeFileSync(envPath, env, 'utf8');
  console.log(`Updated ${envPath}`);
}

main();
