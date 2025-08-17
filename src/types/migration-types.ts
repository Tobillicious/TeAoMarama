// Migration and Content Validation Types

export interface EnrichmentSuggestion {
  type: string;
  description: string;
  implementation: string;
  priority: 'high' | 'medium' | 'low';
  estimated_impact: number;
}

export interface CulturalFlag {
  type: string;
  severity: string;
  description: string;
  recommendation: string;
}

export interface CulturalContentFlag extends CulturalFlag {
  content_id: string;
  content_title: string;
  content_type: string;
  flagged_at: string;
  resolution_status: 'pending' | 'resolved' | 'escalated';
}

export interface ResourceRecommendation {
  resource: TeachingResource;
  relevance_score: number;
  match_reasons: string[];
  subject_alignment: number;
  year_level_alignment: number;
}

// Import the TeachingResource interface from ResourceService
import type { TeachingResource } from '../services/ResourceService';

export interface CulturalContentFlag {
  flag_id: string;
  content_id: string;
  content_title: string;
  content_type: string;
  flagged_at: string;
  resolution_status: 'pending' | 'resolved' | 'escalated';
}

export interface ContentValidationResult {
  quality_score: number;
  cultural_safety_score: number;
  curriculum_alignment_score: number;
  accessibility_score: number;
  enrichments: EnrichmentSuggestion[];
  cultural_flags: CulturalFlag[];
  recommendations: string[];
  validation_date: string;
  validator_id?: string;
}

export interface MigrationMetadata {
  migration_id: string;
  original_path: string;
  migration_date: string;
  quality_checked: boolean;
  source_system?: string;
  validation_status?: 'pending' | 'passed' | 'failed';
  cultural_review_status?: 'pending' | 'approved' | 'requires_changes';
}

export interface ContentInventory {
  total_resources: number;
  by_subject: Record<string, number>;
  by_type: Record<string, number>;
  by_year_level: Record<string, number>;
  cultural_content_count: number;
  pending_reviews: number;
  quality_issues: number;
  broken_links?: number;
}

export interface ExplorationReport {
  content_inventory: ContentInventory;
  cultural_flags: CulturalContentFlag[];
  quality_metrics: {
    average_quality_score: number;
    cultural_safety_score: number;
    curriculum_alignment_score: number;
  };
  recommendations: string[];
  generated_at: string;
}

// Agent and Orchestration Types
export interface AgentRouting {
  llm?: {
    name: string;
    provider: string;
    model: string;
  };
  fallback?: {
    name: string;
    provider: string;
    model: string;
  };
}

export interface AgentResult {
  success: boolean;
  data?: unknown;
  error?: string;
  tokensOut?: number;
  latencyMs?: number;
  agent_used?: string;
}

export interface TaskContext {
  hasMedia?: boolean;
  complexity?: 'low' | 'medium' | 'high';
  cultural_sensitivity?: 'low' | 'medium' | 'high';
  subject_area?: string;
  year_level?: string;
}

// Database and Vector Types
export interface VectorSearchResult {
  id: string;
  score: number;
  metadata: Record<string, unknown>;
  content: string;
}

export interface DatabaseConnection {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export interface QueryResult<T = unknown> {
  rows: T[];
  rowCount: number;
  command: string;
  fields: unknown[];
}

// Utility Types
export type CulturalSeverity = 'critical' | 'high' | 'medium' | 'low';
export type CulturalType =
  | 'appropriation'
  | 'misrepresentation'
  | 'missing_attribution'
  | 'sacred_content'
  | 'stereotype';
export type ValidationStatus = 'pending' | 'passed' | 'failed';
export type CulturalReviewStatus = 'pending' | 'approved' | 'requires_changes';
