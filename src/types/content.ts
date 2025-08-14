// Content model TypeScript interfaces for TeAoMarama
// Keep in sync with migration/content_schema.json (draft-07 schema)

export interface CurriculumNode {
  code: string;
  title: string;
  description?: string;
  level?: string;
}

export interface Asset {
  url: string;
  mimeType?: string;
  sizeBytes?: number;
}

export interface Resource {
  resourceId: string;
  title: string;
  summary?: string;
  canonicalUrl: string;
  source?: string;
  publishedAt?: string; // ISO8601
  assets?: Asset[];
  curriculumCandidates?: { code: string; score: number }[];
  textBody?: string;
}

export interface ImportJob {
  jobId: string;
  env: string; // staging | prod
  batchId: string;
  startedAt?: string; // ISO8601
  finishedAt?: string; // ISO8601
  status?: 'pending' | 'running' | 'partial' | 'failed' | 'completed';
  stats?: Record<string, unknown>;
}
