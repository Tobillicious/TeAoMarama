#!/usr/bin/env npx tsx

/**
 * Agent Terminal Bus (Live Collaboration View)
 * - Streams logs from background agents into one terminal with labels/colors
 * - Minimal TUI controls:
 *   h = health snapshot  •  d = build+deploy (prompt)  •  q = quit
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { spawn } from 'node:child_process';

const projectRoot = process.cwd();
const logsDir = path.join(projectRoot, 'logs');
const files = [
    { label: 'coordinator', file: path.join(logsDir, 'coordinator.log'), color: '\x1b[36m' }, // cyan
    { label: 'support', file: path.join(logsDir, 'support.log'), color: '\x1b[35m' } // magenta
];

function ts() { return new Date().toISOString(); }
const RESET = '\x1b[0m';

const offsets: Record<string, number> = {};

function ensureLog(file: string) {
    if (!fs.existsSync(file)) {
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, '');
    }
}

function readDelta(file: string, from: number, to: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const len = to - from;
        if (len <= 0) return resolve('');
        const buffer = Buffer.alloc(len);
        const fd = fs.openSync(file, 'r');
        fs.read(fd, buffer, 0, len, from, (err) => {
            fs.closeSync(fd);
            if (err) return reject(err);
            resolve(buffer.toString('utf8'));
        });
    });
}

async function tail(file: string, label: string, color: string) {
    ensureLog(file);
    const stat = fs.statSync(file);
    offsets[file] = stat.size; // start from EOF

    fs.watch(file, { persistent: true }, async (event) => {
        try {
            const s = fs.statSync(file);
            const from = offsets[file] ?? 0;
            const to = s.size;
            if (to > from) {
                const chunk = await readDelta(file, from, to);
                offsets[file] = to;
                chunk.split(/\r?\n/).filter(Boolean).forEach((line) => {
                    process.stdout.write(`${color}[${label}]${RESET} ${line}\n`);
                });
            }
        } catch {
            // file might be rotating; ignore
        }
    });
}

function healthSnapshot() {
    const distOk = fs.existsSync(path.join(projectRoot, 'dist', 'index.html'));
    const coordLog = path.join(logsDir, 'coordinator.log');
    const suppLog = path.join(logsDir, 'support.log');
    const coordOk = fs.existsSync(coordLog) && (Date.now() - fs.statSync(coordLog).mtimeMs) < 120000;
    const suppOk = fs.existsSync(suppLog) && (Date.now() - fs.statSync(suppLog).mtimeMs) < 120000;

    const readiness = (distOk ? 0.9 : 0.7) * (coordOk ? 1 : 0.8) * (suppOk ? 1 : 0.85);
    console.log(`\n[${ts()}] Health: dist=${distOk ? 'ok' : 'missing'}, coord=${coordOk ? 'ok' : 'stale'}, support=${suppOk ? 'ok' : 'stale'}  → readiness ${(readiness * 100).toFixed(0)}%\n`);
}

async function promptDeploy() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q: string) => new Promise<string>(res => rl.question(q, res));
    const ans = (await ask('Deploy to Netlify now? (y/N) ')).trim().toLowerCase();
    rl.close();
    if (ans !== 'y') return;

    const child = spawn('npm', ['run', 'build:deploy'], { stdio: 'inherit' });
    child.on('exit', (code) => {
        console.log(`\n[${ts()}] build:deploy finished with code ${code}\n`);
    });
}

async function main() {
    console.log('\n🧵 Agent Terminal Bus — live collaboration');
    console.log('────────────────────────────────────────');
    console.log('Keys: h = health  •  d = build+deploy  •  q = quit');

    files.forEach(f => tail(f.file, f.label, f.color));

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    process.stdin.on('keypress', async (_str, key: any) => {
        if (!key) return;
        if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
            console.log('\nExiting terminal bus…');
            process.exit(0);
        }
        if (key.name === 'h') healthSnapshot();
        if (key.name === 'd') await promptDeploy();
    });
}

main().catch(err => {
    console.error('Terminal bus failed:', err);
    process.exit(1);
});
