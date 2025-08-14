/**
 * TeAoMarama Knowledge Architecture - The Foundation for the Great Migration
 * 
 * This defines the hierarchical, searchable, and culturally-aware system 
 * that will receive and organize all knowledge from Te Kete Ako's spaghetti code.
 * 
 * Philosophy:
 * - Every piece of knowledge has whakapapa (lineage)
 * - Fast access to critical teaching resources
 * - Deep access to nuanced pedagogical wisdom  
 * - Cultural safety embedded at the data model level
 * - Provenance and confidence tracked for every node
 */

import type { CurriculumNode, Resource, ImportJob } from '../types/content';

// Core knowledge hierarchy - designed for both speed and depth
export interface KnowledgeNode {
  id: string;
  type: KnowledgeType;
  title: string;
  body?: string;
  
  // Hierarchical organization
  level: KnowledgeLevel;
  parentId?: string;
  childIds?: string[];
  
  // NZC alignment and metadata  
  nzcCodes?: string[];
  yearLevels?: number[];
  subjects?: string[];
  keywords?: string[];
  
  // Cultural considerations
  cultural: {
    requiresIwiReview: boolean;
    maoriContent: boolean;
    tikangaFlags?: string[];
    localContext?: string; // e.g., "Mangakōtukutuku College specific"
  };
  
  // Provenance and quality
  provenance: {
    sourceSystem: 'te-kete-ako' | 'manual' | 'agent-generated' | 'consolidated';
    sourceIds?: string[];
    confidence: number; // 0-1
    lastReviewed?: string; // ISO date
    reviewedBy?: string;
  };
  
  // For fast/slow thinking optimization
  queryOptimization: {
    accessFrequency: number;
    avgQueryLatency?: number;
    indexPriority: 'hot' | 'warm' | 'cold';
    embeddings?: {
      fast: number[]; // smaller, faster embedding
      deep?: number[]; // larger, richer embedding
    };
  };
  
  // Relationships for GraphRAG
  relationships?: KnowledgeRelationship[];
  
  createdAt: string;
  updatedAt: string;
}

export type KnowledgeType = 
  | 'nzc_outcome'
  | 'curriculum_strand' 
  | 'year_plan'
  | 'term_plan'
  | 'unit_plan'
  | 'lesson_plan'
  | 'activity'
  | 'assessment'
  | 'resource'
  | 'handout'
  | 'worksheet'
  | 'game'
  | 'pedagogical_pattern'
  | 'cultural_note'
  | 'teaching_reflection'
  | 'student_feedback'
  | 'system_insight';

export type KnowledgeLevel = 
  | 'meta'        // System-level insights, pedagogical patterns
  | 'strategic'   // Year plans, curriculum mapping  
  | 'tactical'    // Unit plans, assessments
  | 'operational' // Lessons, activities, worksheets
  | 'atomic';     // Individual resources, specific handouts

export interface KnowledgeRelationship {
  targetId: string;
  type: RelationshipType;
  strength: number; // 0-1, how strong is this connection
  evidence?: string; // Why this relationship exists
  bidirectional?: boolean;
}

export type RelationshipType = 
  | 'contains'      // Year plan contains unit plans
  | 'supports'      // Activity supports learning outcome
  | 'precedes'      // Unit A comes before Unit B
  | 'requires'      // Needs prerequisite knowledge
  | 'assesses'      // Assessment measures outcome
  | 'exemplifies'   // Example of broader pattern
  | 'adapts'        // Modified version of another resource
  | 'conflicts'     // Contradicts or replaces
  | 'references'    // Cites or links to
  | 'culturally_contextualizes'; // Adds Māori/local perspective

// Migration-specific tracking
export interface MigrationManifest {
  sourceSystemSnapshot: {
    capturedAt: string;
    teKeteAkoVersion: string;
    totalResources: number;
    knownIssues: string[];
  };
  
  extractionBatches: ExtractionBatch[];
  consolidationPhases: ConsolidationPhase[];
  qualityGates: QualityGate[];
  
  culturalReviewQueue: {
    pendingNodes: string[];
    reviewedNodes: string[];
    flaggedForEscalation: string[];
  };
}

export interface ExtractionBatch {
  id: string;
  sourcePattern: string; // What we're extracting (e.g., "all lesson plans")
  extractedCount: number;
  successRate: number;
  commonFailures: string[];
  estimatedQuality: 'high' | 'medium' | 'low' | 'needs_manual_review';
}

export interface ConsolidationPhase {
  id: string;
  description: string;
  inputNodeCount: number;
  outputNodeCount: number;
  deduplicationRate: number;
  qualityImprovement: number; // 0-1
  culturalSafetyScore: number; // 0-1
}

export interface QualityGate {
  id: string;
  criteria: string;
  passed: boolean;
  score?: number;
  blockers?: string[];
  recommendations?: string[];
}

// Query optimization system for fast/slow thinking
export interface QueryStrategy {
  // Fast path - for immediate teacher needs
  hotCache: {
    mostAccessedNodes: string[];
    recentlyUsedNodes: string[];
    currentTermResources: string[];
    emergencyFallbacks: string[];
  };
  
  // Slow path - for deep exploration and planning
  deepIndex: {
    semanticClusters: SemanticCluster[];
    crossCurriculumPatterns: CrossCurriculumPattern[];
    culturalWisdomNodes: string[];
    pedagogicalInsights: string[];
  };
}

export interface SemanticCluster {
  id: string;
  centroid: number[]; // Embedding centroid
  nodeIds: string[];
  primaryThemes: string[];
  confidence: number;
}

export interface CrossCurriculumPattern {
  id: string;
  pattern: string; // e.g., "Māori perspectives in science"
  nodeIds: string[];
  strength: number;
  applicableSubjects: string[];
  yearLevelRange: [number, number];
}

// Safety and governance
export interface CulturalSafetyCheck {
  nodeId: string;
  flags: CulturalFlag[];
  reviewLevel: 'auto_approve' | 'peer_review' | 'iwi_consultation' | 'escalate';
  status: 'pending' | 'approved' | 'needs_changes' | 'rejected';
  reviewer?: string;
  reviewedAt?: string;
  notes?: string;
}

export interface CulturalFlag {
  type: 'tikanga_reference' | 'sacred_knowledge' | 'regional_specific' | 'pronunciation_guide' | 'context_needed';
  severity: 'info' | 'warning' | 'critical';
  description: string;
  suggestion?: string;
}

/**
 * The intelligence layer that will orchestrate the great migration
 */
export interface MigrationIntelligence {
  // Phase 1: Extract and understand existing knowledge
  extract: (source: TeKeteAkoSource) => Promise<RawKnowledgeChunk[]>;
  
  // Phase 2: Classify and enrich with metadata
  classify: (chunks: RawKnowledgeChunk[]) => Promise<ClassifiedNode[]>;
  
  // Phase 3: Build relationships and detect patterns
  relate: (nodes: ClassifiedNode[]) => Promise<KnowledgeNode[]>;
  
  // Phase 4: Consolidate duplicates and improve quality
  consolidate: (nodes: KnowledgeNode[]) => Promise<KnowledgeNode[]>;
  
  // Phase 5: Cultural safety review and approval
  review: (nodes: KnowledgeNode[]) => Promise<KnowledgeNode[]>;
  
  // Phase 6: Index for optimal query performance
  index: (nodes: KnowledgeNode[]) => Promise<QueryStrategy>;
}

export interface TeKeteAkoSource {
  type: 'database' | 'file_system' | 'api_export';
  connection: any; // Database connection or file path
  extractionRules: ExtractionRule[];
}

export interface ExtractionRule {
  pattern: string;
  targetType: KnowledgeType;
  confidence: number;
  requiredFields: string[];
  optionalFields: string[];
}

export interface RawKnowledgeChunk {
  sourceId: string;
  sourceType: string;
  rawData: any;
  extractedAt: string;
  extractionRule: string;
}

export interface ClassifiedNode {
  rawChunk: RawKnowledgeChunk;
  proposedType: KnowledgeType;
  proposedLevel: KnowledgeLevel;
  confidence: number;
  metadata: Partial<KnowledgeNode>;
  issues: string[];
}