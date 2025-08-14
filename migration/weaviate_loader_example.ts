/**
 * weaviate_loader_example.ts
 * Usage: set env variables (see placeholders_index.md) then:
 *   node dist/weaviate_loader_example.js --env=staging --batch=batch-001
 *
 * Notes:
 * - Idempotency via stable resourceId (sha256 of canonicalUrl + title).
 * - This uses firebase-admin to upsert a Firestore resource doc and Weaviate to upsert objects.
 */

import admin from 'firebase-admin';
import weaviate from 'weaviate-client';
import type { WeaviateClient } from 'weaviate-client';
import crypto from 'crypto';
import axios from 'axios';
import fs from 'fs';
// import path from 'path';

// ----- placeholder-driven config (see placeholders_index.md) -----
const ENV = process.env.MIGRATION_ENV || 'staging'; // staging or prod
const FIREBASE_SA_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_PATH || 'PATH_TO_SA_JSON';
const WEAVIATE_URL = process.env.WEAVIATE_URL || 'xxwx3wwvtri7kb2glncy1q.c0.us-west3.gcp.weaviate.cloud';
const WEAVIATE_API_KEY = process.env.WEAVIATE_API_KEY || 'YOUR_WEAVIATE_API_KEY';
const EMBEDDING_PROVIDER = process.env.EMBEDDING_PROVIDER || 'openai'; // or other
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
// ----------------------------------------------------------------

// init firebase-admin
if (!admin.apps.length) {
  const sa = require(FIREBASE_SA_PATH);
  admin.initializeApp({
    credential: admin.credential.cert(sa),
    projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_FIREBASE_PROJECT_ID'
  });
}
const db = admin.firestore();

// init weaviate with proper cloud connection
let client: WeaviateClient | null = null;

async function initWeaviate(): Promise<WeaviateClient> {
  if (!client) {
    client = await weaviate.connectToWeaviateCloud(WEAVIATE_URL, {
      authCredentials: new weaviate.ApiKey(WEAVIATE_API_KEY),
    });
    
    const isReady = await client.isReady();
    console.log("Weaviate client is ready?", isReady);
    
    if (!isReady) {
      throw new Error('Weaviate client failed to initialize');
    }
  }
  return client;
}

// simple chunker
function chunkText(text: string, maxChars = 2500) {
  const chunks: string[] = [];
  let idx = 0;
  while (idx < text.length) {
    let end = idx + maxChars;
    if (end >= text.length) { chunks.push(text.slice(idx)); break; }
    // try to split by newline
    const slice = text.slice(idx, end);
    const lastNl = slice.lastIndexOf('\n');
    if (lastNl > Math.floor(maxChars*0.6)) {
      end = idx + lastNl;
    }
    chunks.push(text.slice(idx, end));
    idx = end;
  }
  return chunks;
}

function stableResourceId(canonicalUrl: string, title: string) {
  const h = crypto.createHash('sha256');
  h.update((canonicalUrl || '') + '||' + (title || ''));
  return h.digest('hex');
}

// Placeholder embedding function - replace with your provider call
async function getEmbedding(text: string): Promise<number[]> {
  if (EMBEDDING_PROVIDER === 'openai') {
    const res = await axios.post('https://api.openai.com/v1/embeddings', {
      model: 'text-embedding-3-small',
      input: text
    }, {
      headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
    });
    return res.data.data[0].embedding;
  }
  // fallback stub (not useful for real retrieval)
  return new Array(1536).fill(0).map((_,i)=>Math.sin(i+text.length));
}

async function upsertResource(resource: any) {
  const resourceRef = db.collection('resources').doc(resource.resourceId);
  const _doc = await resourceRef.get();
  
  // idempotent upsert
  await resourceRef.set({
    ...resource,
    migratedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

async function upsertWeaviateObjects(resource: any) {
  // Initialize Weaviate client
  const weaviateClient = await initWeaviate();
  // upsert Resource object
  const resourceObj = {
    class: 'Resource',
    id: resource.resourceId,
    properties: {
      resourceId: resource.resourceId,
      title: resource.title,
      summary: resource.summary || '',
      canonicalUrl: resource.canonicalUrl,
      source: resource.source || '',
      publishedAt: resource.publishedAt || null,
      curriculumCandidates: (resource.curriculumCandidates || []).map((c:any)=>c.code)
    }
  };
  // weaviate client upsert (create or merge)
  try {
    await weaviateClient.collections.get('Resource').data.insert({
      id: resource.resourceId,
      properties: resourceObj.properties
    });
    console.log('✅ Resource upserted to Weaviate:', resource.resourceId);
  } catch (e: any) {
    console.warn('Weaviate create failed, fallback update', e?.message || e);
  }

  // chunk text, create ResourceChunk objects with vector embeddings
  const fullText = resource.textBody || resource.summary || '';
  const chunks = chunkText(fullText);
  for (let i=0;i<chunks.length;i++){
    const chunkId = `${resource.resourceId}_c${i}`;
    const embedding = await getEmbedding(chunks[i]);
    const chunkObj = {
      class: 'ResourceChunk',
      id: chunkId,
      vector: embedding,
      properties: {
        resourceId: resource.resourceId,
        chunkIndex: i,
        text: chunks[i],
        sourceUrl: resource.canonicalUrl
      }
    };
    // upsert chunk to Weaviate with embeddings
    try {
      await weaviateClient.collections.get('ResourceChunk').data.insert({
        id: chunkId,
        properties: chunkObj.properties,
        vectors: chunkObj.vector
      });
      console.log(`✅ Chunk ${i+1}/${chunks.length} upserted for resource ${resource.resourceId}`);
    } catch (e: any) {
      console.warn('Chunk create failed', e?.message || e);
    }
    // optionally create an edge between Resource -> ResourceChunk (pseudo; weaviate uses references)
    // create reference from Resource to chunk (update Resource)
    // try {
    //   await weaviate.data.referrer().withClassName('Resource').withId(resource.resourceId)
    //     .withReferenceProperty('chunks') // requires schema with property 'chunks' as ref
    //     .withReference({
    //       beacon: `weaviate://localhost/ResourceChunk/${chunkId}`
    //     }).do();
    // } catch (err) {
    //   // ignore if schema doesn't include property
    // }
  }
}

async function processOne(resourcePayload: any) {
  const resourceId = stableResourceId(resourcePayload.canonicalUrl || resourcePayload.sourceUrl || '', resourcePayload.title || '');
  const resource = {
    resourceId,
    title: resourcePayload.title || null,
    summary: resourcePayload.summary || '',
    canonicalUrl: resourcePayload.canonicalUrl || resourcePayload.sourceUrl || '',
    source: resourcePayload.source || '',
    publishedAt: resourcePayload.publishedAt || null,
    curriculumCandidates: resourcePayload.curriculumCandidates || [],
    textBody: resourcePayload.textBody || ''
  };

  // Skip incomplete resources
  if (!resource.title || !resource.canonicalUrl) {
    console.warn('Skipping incomplete resource', resourceId);
    return {resourceId, skipped:true};
  }

  await upsertResource(resource);
  await upsertWeaviateObjects(resource);
  // write import job log
  await db.collection('imports').doc(resourceId).set({
    resourceId,
    status: 'imported',
    env: ENV,
    migratedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });

  return {resourceId, skipped:false};
}

// Example driver: load from local JSONL sample file
async function run() {
  const sampleFile = process.argv.includes('--sample') ? process.argv[process.argv.indexOf('--sample')+1] : 'migration/sample_raw_exports.jsonl';
  if (!fs.existsSync(sampleFile)) {
    console.error('Sample file not found:', sampleFile);
    process.exit(1);
  }
  const lines = fs.readFileSync(sampleFile, 'utf8').split('\n').filter(Boolean);
  for (const line of lines) {
    const payload = JSON.parse(line);
    try {
      await processOne(payload);
      console.log('Processed', payload.sourceUrl || payload.canonicalUrl);
    } catch (err) {
      console.error('Error processing', err);
    }
  }
  console.log('Done');
}

if (require.main === module) {
  run();
}
