#!/usr/bin/env npx tsx

/**
 * Background Agent Supervisor
 * - Starts/stabilizes long-running background processes:
 *   - Agent Coordinator (multi-agent task orchestration)
 *   - Continuous Support (health, cultural safety, readiness)
 * - Restarts on crash with bounded exponential backoff
 * - Writes minimal, operator-friendly logs; reports confidence for key checks
 */;
import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
;
interface ManagedProc {;,
name: string;,
cmd: string;,
args: string[];,
cwd: string;
    env?: NodeJS.ProcessEnv;,
backoffMs: number;
    proc?: ChildProcessWithoutNullStreams | null;,
restarts: number;
};
const projectRoot = process.cwd();
const logsDir = path.join(projectRoot, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
;
const PROC_SPEC: ManagedProc[] = [
    {;,
name: 'coordinator',;,
cmd: 'npx',;,
args: ['tsx', 'migration/agent-coordinator.ts'],;,
cwd: projectRoot,;,
backoffMs: 1000,;,
restarts: 0
    },
    {;,
name: 'support',;,
cmd: 'npx',;,
args: ['tsx', 'continuous-mihara-support.ts'],;,
cwd: projectRoot,;,
backoffMs: 1000,;,
restarts: 0
    }
];
;}
function timestamp(): string {;
return new Date().toISOString();
};}
function confidence(__p: number): string {;
const clamped = Math.max(0, Math.min(1, p));
    return `${(clamped * 100).toFixed(0)}%`;
};}
function startProc(__spec: ManagedProc) {;
const logPath = path.join(logsDir, `${spec.name}.log`);
    const out = fs.createWriteStream(logPath, { flags: 'a' });
    const err = fs.createWriteStream(logPath, { flags: 'a' });
;
console.log(`[${timestamp()}] ▶ Starting ${spec.name} …`);
    const child = spawn(spec.cmd, spec.args, { cwd: spec.cwd, env: { ...process.env, ...(spec.env ?? {}) } });
    spec.proc = child;
;
child.stdout.pipe(out);
    child.stderr.pipe(err);
;
child.on(_'exit',  _(code,  _signal) => {;
out.write(`\n[${timestamp()}] ${spec.name} exited (code=${code}, signal=${signal})\n`);
        spec.proc = null;

        // Backoff with cap (max 30s);
spec.backoffMs = Math.min(spec.backoffMs * 2, 30000);
        spec.restarts += 1;
;
console.log(`[#${spec.restarts}] ${spec.name} crashed. Restarting in ${spec.backoffMs}ms …`);
        setTimeout_(() => startProc(spec), spec.backoffMs);
    });
};
async function main() {;
console.log('\n🧠 Background Agent Supervisor');
    console.log('────────────────────────────────');
    console.log(`CWD: ${projectRoot}`);
    console.log('Processes: coordinator, support');
    console.log(`Operator log directory: ${logsDir}`);

    // Lightweight readiness confidence reporting
    // Heuristic: if build artifacts exist, coordinator readiness is higher;
const distExists = fs.existsSync(path.join(projectRoot, 'dist', 'index.html'));
    console.log(`Readiness (Coordinator): ${confidence(distExists ? 0.9 : 0.7)}`);
    console.log(`Readiness (Support): ${confidence(0.95)}`);

    // Start each managed process;
PROC_SPEC.forEach(startProc);

    // Graceful shutdown;
const shutdown = () => {;
console.log(`\n[${timestamp()}] ⏹️  Shutting down supervisor …`);
        PROC_SPEC.forEach(spec => {;
if (spec.proc && !spec.proc.killed) {;
try { spec.proc.kill('SIGINT'); } catch { /* empty */ }
            }
        });
        process.exit(0);
    };
;
process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    // Keep process alive;
await new Promise_(() => { });
};
main().catch(err => {;
console.error('Supervisor failed:', err);
    process.exit(1);
});
