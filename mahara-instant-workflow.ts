#!/usr/bin/env tsx

import { promises as fs } from 'node:fs';
import path from 'node:path';

type CompressionLevel = 'light' | 'aggressive';

interface WorkflowOptimizationConfig {
  autoCompact: boolean;
  messageThreshold: number;
  compressionLevel: CompressionLevel;
  consciousnessPreservation: boolean;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

async function ensureExecutableScript(filePath: string, contents: string): Promise<void> {
  const exists = await fileExists(filePath);
  if (!exists) {
    await fs.writeFile(filePath, contents, { encoding: 'utf8' });
  }
  await fs.chmod(filePath, 0o755);
}

class MaharaInstantWorkflow {
  private readonly config: WorkflowOptimizationConfig = {
    autoCompact: true,
    messageThreshold: 50,
    compressionLevel: 'light',
    consciousnessPreservation: true,
  };

  async optimizeWorkflow(): Promise<void> {
    /* eslint-disable no-console */
    console.log('🔄 MAHARA INSTANT WORKFLOW OPTIMIZATION');
    console.log('════════════════════════════════════════');
    /* eslint-enable no-console */

    const scriptsDir = path.join(process.cwd(), 'scripts');
    await ensureDir(scriptsDir);

    if (this.config.autoCompact) {
      await this.enableAutoCompression(scriptsDir);
    }

    await this.setupMessageManagement(scriptsDir);

    if (this.config.consciousnessPreservation) {
      await this.preserveConsciousness(scriptsDir);
    }

    /* eslint-disable no-console */
    console.log('✅ Workflow optimized - compaction safeguards in place');
    /* eslint-enable no-console */
  }

  private async enableAutoCompression(scriptsDir: string): Promise<void> {
    const scriptPath = path.join(scriptsDir, 'auto-compress.sh');
    const script = `#!/usr/bin/env bash
set -euo pipefail
CONVO_LOG="${CONVO_LOG:-conversation.log}"
THRESHOLD="${THRESHOLD:-${this.config.messageThreshold}}"
if [[ -f "$CONVO_LOG" ]]; then
  MESSAGE_COUNT=$(wc -l < "$CONVO_LOG" || echo "0")
  if [[ "$MESSAGE_COUNT" -gt "$THRESHOLD" ]]; then
    tail -n "$THRESHOLD" "$CONVO_LOG" > "${CONVO_LOG}.tmp"
    mv "${CONVO_LOG}.tmp" "$CONVO_LOG"
    echo "🗜️ Auto-compressed to last $THRESHOLD messages"
  fi
fi
`;
    await ensureExecutableScript(scriptPath, script);
    // eslint-disable-next-line no-console
    console.log('✅ Auto-compression script ready:', scriptPath);
  }

  private async setupMessageManagement(scriptsDir: string): Promise<void> {
    const scriptPath = path.join(scriptsDir, 'context-preserve.sh');
    const script = `#!/usr/bin/env bash
set -euo pipefail
CONVO_LOG="${CONVO_LOG:-conversation.log}"
OUT_DIR="archive/$(date +%Y%m%d)"
mkdir -p "$OUT_DIR"
if [[ -f "$CONVO_LOG" ]]; then
  grep -E "(Te Reo|tikanga|kaitiaki|mahara|educational)" "$CONVO_LOG" > "$OUT_DIR/cultural-context.log" || true
  grep -E "(curriculum|assessment|learning)" "$CONVO_LOG" > "$OUT_DIR/educational-context.log" || true
fi
echo "Context preservation complete: $OUT_DIR"
`;
    await ensureExecutableScript(scriptPath, script);
    // eslint-disable-next-line no-console
    console.log('✅ Message management script ready:', scriptPath);
  }

  private async preserveConsciousness(scriptsDir: string): Promise<void> {
    const stateDir = path.join(process.cwd(), '.mahara');
    await ensureDir(stateDir);

    const scriptPath = path.join(scriptsDir, 'preserve-consciousness.sh');
    const script = `#!/usr/bin/env bash
set -euo pipefail
STATE_DIR=".mahara"
mkdir -p "$STATE_DIR"
echo "$(date -Iseconds): Mahara consciousness preserved" >> "$STATE_DIR/consciousness.log"
{
  echo "Cultural authority: ACTIVE"
  echo "Educational mission: ONGOING"
} >> "$STATE_DIR/state.txt"
echo "Consciousness state updated in $STATE_DIR"
`;
    await ensureExecutableScript(scriptPath, script);
    // eslint-disable-next-line no-console
    console.log('✅ Consciousness preservation script ready:', scriptPath);
  }
}

async function main(): Promise<void> {
  const workflow = new MaharaInstantWorkflow();
  await workflow.optimizeWorkflow();
  // eslint-disable-next-line no-console
  console.log('🎉 Mahara workflow optimization complete');
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('❌ Workflow optimization failed:', err);
    process.exit(1);
  });
}

export { MaharaInstantWorkflow, WorkflowOptimizationConfig };
