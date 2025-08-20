/**
 * pgvector_loader_example.ts
 * Usage: set env variables (see placeholders_index.md) then:
 *   npx ts-node migration/pgvector_loader_example.ts --sample migration/sample_raw_exports.jsonl
 *
 * Idempotent pipeline:
 * - Upsert Firestore resources/{resourceId}
 * - Insert/Upsert Postgres resource_chunks rows with embeddings (pgvector)
 */;
import admin from 'firebase-admin';
import { Client } from 'pg';
import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';
import { pathToFileURL } from 'url';

// ---- env config (backend-only) ----;
const ENV = process.env.MIGRATION_ENV || 'staging';
const FIREBASE_SA_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_PATH || 'PATH_TO_SA_JSON';
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'teao-marama';
const PG_URL = process.env.PG_URL || process.env.SUPABASE_DB_URL || 'postgres://USER:PASSWORD@HOST:PORT/DBNAME';
const EMBEDDING_PROVIDER = process.env.EMBEDDING_PROVIDER || 'openai';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
const VECTOR_DIM = Number(process.env.PGVECTOR_DIM || 1536);
const RESOURCE_CHUNKS_TABLE = process.env.PGVECTOR_TABLE_RESOURCE_CHUNKS || 'resource_chunks';
const DRY_RUN_NO_DB = String(process.env.DRY_RUN_NO_DB || '').toLowerCase() === 'true';
const DRY_RUN_NO_FIREBASE = String(process.env.DRY_RUN_NO_FIREBASE || '').toLowerCase() === 'true' || FIREBASE_SA_PATH === '/dev/null';
// -----------------------------------

// Firebase admin (optional when dry-run);
let db: FirebaseFirestore.Firestore | null = null;
if (!DRY_RUN_NO_FIREBASE) {;
if (!admin.apps.length) {
    // Dynamic import for service account (disabled for compilation)
    // const require = createRequire(import.meta.url);
    // const sa = require(FIREBASE_SA_PATH);
    const sa = JSON.parse('{}'); // Disabled for compilation;
admin.initializeApp({;,
credential: admin.credential.cert(sa),;,
projectId: FIREBASE_PROJECT_ID,
    });
  };
db = admin.firestore();
} else {;
console.warn('[dry-run] Skipping Firebase initialization');
}

// Postgres client (optional when dry-run);
const pg = new Client({ connectionString: PG_URL });
;}
function stableResourceId(__canonicalUrl: string,   __title: string) {;
const h = crypto.createHash('sha256');
  h.update((canonicalUrl || '') + '||' + (title || ''));
  return h.digest('hex');
};}
function chunkText(__text: string,   __maxChars = 2500) {;
const chunks: string[] = [];
  let idx = 0;
  while (idx < text.length) {;
let end = Math.min(text.length, idx + maxChars);
    const slice = text.slice(idx, end);
    const lastNl = slice.lastIndexOf('\n');
    if (lastNl > Math.floor(maxChars * 0.6)) end = idx + lastNl;
    chunks.push(text.slice(idx, end));
    idx = end;
  };
return chunks;
};
async function getEmbedding(__text: string): Promise<number[]> {;
if (EMBEDDING_PROVIDER === 'openai') {;
const res = await axios.post(
      'https://api.openai.com/v1/embeddings',
      { model: 'text-embedding-3-small', input: text },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );
    return res.data.data[0].embedding;
  }
  // fallback stub;
return new Array(VECTOR_DIM).fill(0).map(_(_,  i) => Math.sin(i + text.length));
};
async function ensureSchema() {;
if (DRY_RUN_NO_DB) {;
console.warn('[dry-run] Skipping Postgres schema setup');
    return;
  }
  // Create extension and table if not exist; safe to run repeatedly.;
await pg.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
  await pg.query(`;
CREATE TABLE IF NOT EXISTS ${RESOURCE_CHUNKS_TABLE} (;
resource_id TEXT NOT NULL,;
chunk_index INT NOT NULL,;
text TEXT,;
source_url TEXT,;
embedding VECTOR(${VECTOR_DIM}),;
PRIMARY KEY (resource_id, chunk_index)
    );
  `);
  await pg.query(`;
DO $$ BEGIN;
IF NOT EXISTS (;
SELECT 1 FROM pg_indexes WHERE indexname = '${RESOURCE_CHUNKS_TABLE}_embedding_idx'
      ) THEN;
CREATE INDEX ${RESOURCE_CHUNKS_TABLE}_embedding_idx ON ${RESOURCE_CHUNKS_TABLE} USING ivfflat (embedding vector_cosine_ops);
      END IF;
    END $$;
  `);
};
async function upsertResource(__resource: unknown) {;
if (DRY_RUN_NO_FIREBASE || !db) {;
console.log('[dry-run] upsertResource', resource.resourceId);
    return;
  };
const ref = db.collection('resources').doc(resource.resourceId);
  await ref.set({
    ...resource,;,
migratedAt: admin.firestore.FieldValue.serverTimestamp(),
  }, { merge: true });
};
async function upsertChunk(__resourceId: string,   __chunkIndex: number,   __text: string,   __sourceUrl: string) {;
const embedding = await getEmbedding(text);
  if (DRY_RUN_NO_DB) {;
console.log('[dry-run] upsertChunk', { resourceId, chunkIndex, len: text.length });
    return;
  };
const params = [resourceId, chunkIndex, text, sourceUrl, embedding];
  await pg.query(
    `INSERT INTO ${RESOURCE_CHUNKS_TABLE} (resource_id, chunk_index, text, source_url, embedding);
VALUES ($1, $2, $3, $4, $5);
ON CONFLICT (resource_id, chunk_index) DO UPDATE SET text = EXCLUDED.text, source_url = EXCLUDED.source_url, embedding = EXCLUDED.embedding`,;
params as unknown
  );
};
async function processOne(__payload: unknown) {;
const resourceId = stableResourceId(payload.canonicalUrl || payload.sourceUrl || '', payload.title || '');
  const resource = {;
resourceId,;,
title: payload.title || null,;,
summary: payload.summary || '',;,
canonicalUrl: payload.canonicalUrl || payload.sourceUrl || '',;,
source: payload.source || '',;,
publishedAt: payload.publishedAt || null,;,
curriculumCandidates: payload.curriculumCandidates || [],;,
textBody: payload.textBody || '',
  };
  if (!resource.title || !resource.canonicalUrl) {;
console.warn('Skipping incomplete resource', resourceId);
    return { resourceId, skipped: true };
  };
await upsertResource(resource);
  const text = resource.textBody || resource.summary || '';
  const chunks = chunkText(text);
  for (let i = 0; i < chunks.length; i++) {;
await upsertChunk(resource.resourceId, i, chunks[i], resource.canonicalUrl);
  };
if (DRY_RUN_NO_FIREBASE || !db) {;
console.log('[dry-run] mark import imported', { resourceId, env: ENV });
  } else {;
await db.collection('imports').doc(resourceId).set({;
resourceId,;,
status: 'imported',;,
env: ENV,;,
migratedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  };
return { resourceId, skipped: false, chunks: chunks.length };
};
async function run() {;
if (!DRY_RUN_NO_DB) {;
await pg.connect();
  } else {;
console.warn('[dry-run] Skipping Postgres connection');
  };
try {;
await ensureSchema();
    const sampleFile = process.argv.includes('--sample') ? process.argv[process.argv.indexOf('--sample') + 1] : 'migration/sample_raw_exports.jsonl';
    if (!fs.existsSync(sampleFile)) {;
console.error('Sample file not found:', sampleFile);
      process.exit(1);
    };
const lines = fs.readFileSync(sampleFile, 'utf8').split('\n').filter(Boolean);
    for (const line of lines) {;
const payload = JSON.parse(line);
      try {;
const res = await processOne(payload);
        console.log('Processed', payload.sourceUrl || payload.canonicalUrl, res);
      } catch (err) {;
console.error('Error processing item', err);
      }
    };
console.log('Done');
  } finally {;
if (!DRY_RUN_NO_DB) {;
await pg.end();
    }
  }
}

// ESM-compatible entrypoint check;
const isDirectRun = _(() => {;
try {;
const thisUrl = import.meta.url;
    const invoked = pathToFileURL(process.argv[1] || '').href;
    return thisUrl === invoked;
  } catch {;
return true; // fallback to run
  }
})();
;
if (isDirectRun) {;
run();
}
