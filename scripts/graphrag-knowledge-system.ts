#!/usr/bin/env tsx

/**
 * GRAPHRAG Knowledge Graph System
 *
 * This system implements advanced knowledge graph capabilities for the distributed
 * agent network, enabling intelligent knowledge synthesis, contextual retrieval,
 * and cultural knowledge integration.
 *
 * Features:
 * - Knowledge graph construction and maintenance
 * - Semantic relationship mapping
 * - Contextual knowledge retrieval
 * - Cultural knowledge integration
 * - Educational knowledge optimization
 * - Intelligent knowledge synthesis
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface KnowledgeNode {
  id: string;
  type: 'concept' | 'agent' | 'resource' | 'cultural' | 'educational' | 'technical';
  label: string;
  description: string;
  properties: Record<string, any>;
  culturalContext?: {
    tikanga: string[];
    mana: number;
    tapu: boolean;
    wairua: string;
  };
  educationalContext?: {
    yearLevel: string[];
    subject: string[];
    nzcAlignment: string[];
    learningOutcomes: string[];
  };
  relationships: string[];
  confidence: number;
  lastUpdated: string;
  source: string;
}

interface KnowledgeRelationship {
  id: string;
  source: string;
  target: string;
  type:
    | 'related_to'
    | 'part_of'
    | 'influences'
    | 'requires'
    | 'cultural_connection'
    | 'educational_pathway';
  strength: number;
  properties: Record<string, any>;
  culturalSignificance?: number;
  educationalRelevance?: number;
  lastUpdated: string;
}

interface KnowledgeGraph {
  nodes: Map<string, KnowledgeNode>;
  relationships: Map<string, KnowledgeRelationship>;
  metadata: {
    version: string;
    lastUpdated: string;
    totalNodes: number;
    totalRelationships: number;
    culturalNodes: number;
    educationalNodes: number;
    technicalNodes: number;
  };
}

interface QueryResult {
  nodes: KnowledgeNode[];
  relationships: KnowledgeRelationship[];
  relevance: number;
  culturalContext?: string;
  educationalContext?: string;
  confidence: number;
}

class GraphRAGKnowledgeSystem {
  private knowledgeGraph: KnowledgeGraph;
  private graphPath: string;
  private culturalKnowledgePath: string;
  private educationalKnowledgePath: string;

  constructor() {
    this.graphPath = join(process.cwd(), 'migration', 'agent_coordination', 'knowledge_graph.json');
    this.culturalKnowledgePath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'cultural_knowledge.json',
    );
    this.educationalKnowledgePath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'educational_knowledge.json',
    );
    this.knowledgeGraph = this.initializeKnowledgeGraph();
    this.loadExistingKnowledge();
  }

  private initializeKnowledgeGraph(): KnowledgeGraph {
    return {
      nodes: new Map(),
      relationships: new Map(),
      metadata: {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        totalNodes: 0,
        totalRelationships: 0,
        culturalNodes: 0,
        educationalNodes: 0,
        technicalNodes: 0,
      },
    };
  }

  private loadExistingKnowledge(): void {
    try {
      if (existsSync(this.graphPath)) {
        const graphData = JSON.parse(readFileSync(this.graphPath, 'utf8'));
        this.knowledgeGraph.nodes = new Map(Object.entries(graphData.nodes || {}));
        this.knowledgeGraph.relationships = new Map(Object.entries(graphData.relationships || {}));
        this.knowledgeGraph.metadata = { ...this.knowledgeGraph.metadata, ...graphData.metadata };
      }
    } catch (error) {
      console.error('Error loading existing knowledge graph:', error);
    }
  }

  public addKnowledgeNode(node: Omit<KnowledgeNode, 'id' | 'lastUpdated'>): string {
    const id = this.generateNodeId(node.label, node.type);
    const knowledgeNode: KnowledgeNode = {
      ...node,
      id,
      lastUpdated: new Date().toISOString(),
    };

    this.knowledgeGraph.nodes.set(id, knowledgeNode);
    this.updateMetadata();
    this.saveKnowledgeGraph();

    this.logKnowledgeEvent('NODE_ADDED', `Added knowledge node: ${node.label}`, 'INFO');

    return id;
  }

  public addKnowledgeRelationship(
    relationship: Omit<KnowledgeRelationship, 'id' | 'lastUpdated'>,
  ): string {
    const id = this.generateRelationshipId(
      relationship.source,
      relationship.target,
      relationship.type,
    );
    const knowledgeRelationship: KnowledgeRelationship = {
      ...relationship,
      id,
      lastUpdated: new Date().toISOString(),
    };

    this.knowledgeGraph.relationships.set(id, knowledgeRelationship);

    // Update node relationships
    const sourceNode = this.knowledgeGraph.nodes.get(relationship.source);
    const targetNode = this.knowledgeGraph.nodes.get(relationship.target);

    if (sourceNode) {
      sourceNode.relationships.push(id);
    }
    if (targetNode) {
      targetNode.relationships.push(id);
    }

    this.updateMetadata();
    this.saveKnowledgeGraph();

    this.logKnowledgeEvent(
      'RELATIONSHIP_ADDED',
      `Added relationship: ${relationship.source} -> ${relationship.target}`,
      'INFO',
    );

    return id;
  }

  public queryKnowledge(
    query: string,
    context?: {
      cultural?: boolean;
      educational?: boolean;
      technical?: boolean;
      agentId?: string;
    },
  ): QueryResult {
    const queryLower = query.toLowerCase();
    const results: KnowledgeNode[] = [];
    const relationships: KnowledgeRelationship[] = [];
    let relevance = 0;

    // Search nodes by label, description, and properties
    this.knowledgeGraph.nodes.forEach((node) => {
      let nodeRelevance = 0;

      // Text matching
      if (node.label.toLowerCase().includes(queryLower)) {
        nodeRelevance += 10;
      }
      if (node.description.toLowerCase().includes(queryLower)) {
        nodeRelevance += 5;
      }

      // Property matching
      Object.values(node.properties).forEach((value) => {
        if (typeof value === 'string' && value.toLowerCase().includes(queryLower)) {
          nodeRelevance += 3;
        }
      });

      // Cultural context matching
      if (context?.cultural && node.culturalContext) {
        nodeRelevance += 5;
        if (node.culturalContext.tikanga.some((t) => t.toLowerCase().includes(queryLower))) {
          nodeRelevance += 8;
        }
      }

      // Educational context matching
      if (context?.educational && node.educationalContext) {
        nodeRelevance += 5;
        if (node.educationalContext.subject.some((s) => s.toLowerCase().includes(queryLower))) {
          nodeRelevance += 8;
        }
      }

      // Technical context matching
      if (context?.technical && node.type === 'technical') {
        nodeRelevance += 5;
      }

      if (nodeRelevance > 0) {
        results.push({ ...node, confidence: nodeRelevance });
        relevance += nodeRelevance;
      }
    });

    // Find related relationships
    results.forEach((node) => {
      node.relationships.forEach((relId) => {
        const relationship = this.knowledgeGraph.relationships.get(relId);
        if (relationship) {
          relationships.push(relationship);
        }
      });
    });

    // Sort by relevance
    results.sort((a, b) => b.confidence - a.confidence);

    return {
      nodes: results.slice(0, 20), // Limit to top 20 results
      relationships: relationships.slice(0, 50), // Limit to top 50 relationships
      relevance: relevance / Math.max(results.length, 1),
      culturalContext: context?.cultural ? this.extractCulturalContext(results) : undefined,
      educationalContext: context?.educational
        ? this.extractEducationalContext(results)
        : undefined,
      confidence: Math.min(relevance / 100, 1), // Normalize confidence to 0-1
    };
  }

  public synthesizeKnowledge(
    query: string,
    context?: {
      cultural?: boolean;
      educational?: boolean;
      technical?: boolean;
    },
  ): {
    synthesis: string;
    sources: string[];
    culturalInsights?: string[];
    educationalInsights?: string[];
    confidence: number;
  } {
    const queryResult = this.queryKnowledge(query, context);

    if (queryResult.nodes.length === 0) {
      return {
        synthesis: 'No relevant knowledge found for this query.',
        sources: [],
        confidence: 0,
      };
    }

    // Synthesize knowledge from multiple sources
    const synthesis = this.createKnowledgeSynthesis(queryResult.nodes, query);
    const sources = queryResult.nodes.map((node) => node.source);
    const culturalInsights = context?.cultural
      ? this.extractCulturalInsights(queryResult.nodes)
      : undefined;
    const educationalInsights = context?.educational
      ? this.extractEducationalInsights(queryResult.nodes)
      : undefined;

    this.logKnowledgeEvent('KNOWLEDGE_SYNTHESIS', `Synthesized knowledge for: ${query}`, 'INFO');

    return {
      synthesis,
      sources,
      culturalInsights,
      educationalInsights,
      confidence: queryResult.confidence,
    };
  }

  public addCulturalKnowledge(culturalData: {
    concept: string;
    tikanga: string[];
    mana: number;
    tapu: boolean;
    wairua: string;
    description: string;
    relatedConcepts: string[];
  }): string {
    const nodeId = this.addKnowledgeNode({
      type: 'cultural',
      label: culturalData.concept,
      description: culturalData.description,
      properties: {
        tikanga: culturalData.tikanga,
        mana: culturalData.mana,
        tapu: culturalData.tapu,
        wairua: culturalData.wairua,
      },
      culturalContext: {
        tikanga: culturalData.tikanga,
        mana: culturalData.mana,
        tapu: culturalData.tapu,
        wairua: culturalData.wairua,
      },
      relationships: [],
      confidence: 0.9,
      source: 'cultural-knowledge-base',
    });

    // Add relationships to related concepts
    culturalData.relatedConcepts.forEach((relatedConcept) => {
      const relatedNode = this.findNodeByLabel(relatedConcept);
      if (relatedNode) {
        this.addKnowledgeRelationship({
          source: nodeId,
          target: relatedNode.id,
          type: 'cultural_connection',
          strength: 0.8,
          properties: {
            culturalSignificance: culturalData.mana,
          },
          culturalSignificance: culturalData.mana,
        });
      }
    });

    this.logKnowledgeEvent(
      'CULTURAL_KNOWLEDGE_ADDED',
      `Added cultural knowledge: ${culturalData.concept}`,
      'INFO',
    );

    return nodeId;
  }

  public addEducationalKnowledge(educationalData: {
    concept: string;
    yearLevel: string[];
    subject: string[];
    nzcAlignment: string[];
    learningOutcomes: string[];
    description: string;
    prerequisites: string[];
  }): string {
    const nodeId = this.addKnowledgeNode({
      type: 'educational',
      label: educationalData.concept,
      description: educationalData.description,
      properties: {
        yearLevel: educationalData.yearLevel,
        subject: educationalData.subject,
        nzcAlignment: educationalData.nzcAlignment,
        learningOutcomes: educationalData.learningOutcomes,
      },
      educationalContext: {
        yearLevel: educationalData.yearLevel,
        subject: educationalData.subject,
        nzcAlignment: educationalData.nzcAlignment,
        learningOutcomes: educationalData.learningOutcomes,
      },
      relationships: [],
      confidence: 0.9,
      source: 'educational-knowledge-base',
    });

    // Add relationships to prerequisites
    educationalData.prerequisites.forEach((prerequisite) => {
      const prereqNode = this.findNodeByLabel(prerequisite);
      if (prereqNode) {
        this.addKnowledgeRelationship({
          source: prereqNode.id,
          target: nodeId,
          type: 'requires',
          strength: 0.9,
          properties: {
            educationalRelevance: 1.0,
          },
          educationalRelevance: 1.0,
        });
      }
    });

    this.logKnowledgeEvent(
      'EDUCATIONAL_KNOWLEDGE_ADDED',
      `Added educational knowledge: ${educationalData.concept}`,
      'INFO',
    );

    return nodeId;
  }

  private generateNodeId(label: string, type: string): string {
    const timestamp = Date.now();
    const hash = this.simpleHash(label + type);
    return `${type}-${hash}-${timestamp}`;
  }

  private generateRelationshipId(source: string, target: string, type: string): string {
    const timestamp = Date.now();
    const hash = this.simpleHash(source + target + type);
    return `rel-${hash}-${timestamp}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private findNodeByLabel(label: string): KnowledgeNode | undefined {
    for (const node of this.knowledgeGraph.nodes.values()) {
      if (node.label.toLowerCase() === label.toLowerCase()) {
        return node;
      }
    }
    return undefined;
  }

  private createKnowledgeSynthesis(nodes: KnowledgeNode[], query: string): string {
    const concepts = nodes.map((node) => node.label).join(', ');
    const descriptions = nodes.map((node) => node.description).join(' ');

    return (
      `Based on the knowledge graph, here's what we know about "${query}":\n\n` +
      `Key concepts: ${concepts}\n\n` +
      `Synthesis: ${descriptions}\n\n` +
      `This knowledge is derived from ${nodes.length} interconnected concepts in our knowledge graph.`
    );
  }

  private extractCulturalContext(nodes: KnowledgeNode[]): string {
    const culturalNodes = nodes.filter((node) => node.culturalContext);
    if (culturalNodes.length === 0) return 'No cultural context available.';

    const tikanga = culturalNodes.flatMap((node) => node.culturalContext?.tikanga || []);
    const uniqueTikanga = [...new Set(tikanga)];

    return `Cultural context includes: ${uniqueTikanga.join(', ')}`;
  }

  private extractEducationalContext(nodes: KnowledgeNode[]): string {
    const educationalNodes = nodes.filter((node) => node.educationalContext);
    if (educationalNodes.length === 0) return 'No educational context available.';

    const subjects = educationalNodes.flatMap((node) => node.educationalContext?.subject || []);
    const yearLevels = educationalNodes.flatMap((node) => node.educationalContext?.yearLevel || []);
    const uniqueSubjects = [...new Set(subjects)];
    const uniqueYearLevels = [...new Set(yearLevels)];

    return `Educational context: Subjects: ${uniqueSubjects.join(
      ', ',
    )}, Year Levels: ${uniqueYearLevels.join(', ')}`;
  }

  private extractCulturalInsights(nodes: KnowledgeNode[]): string[] {
    const culturalNodes = nodes.filter((node) => node.culturalContext);
    return culturalNodes.map((node) => {
      const tikanga = node.culturalContext?.tikanga.join(', ') || '';
      const wairua = node.culturalContext?.wairua || '';
      return `${node.label}: ${tikanga} (Wairua: ${wairua})`;
    });
  }

  private extractEducationalInsights(nodes: KnowledgeNode[]): string[] {
    const educationalNodes = nodes.filter((node) => node.educationalContext);
    return educationalNodes.map((node) => {
      const subjects = node.educationalContext?.subject.join(', ') || '';
      const yearLevels = node.educationalContext?.yearLevel.join(', ') || '';
      return `${node.label}: ${subjects} (Year ${yearLevels})`;
    });
  }

  private updateMetadata(): void {
    this.knowledgeGraph.metadata.totalNodes = this.knowledgeGraph.nodes.size;
    this.knowledgeGraph.metadata.totalRelationships = this.knowledgeGraph.relationships.size;
    this.knowledgeGraph.metadata.culturalNodes = Array.from(
      this.knowledgeGraph.nodes.values(),
    ).filter((node) => node.type === 'cultural').length;
    this.knowledgeGraph.metadata.educationalNodes = Array.from(
      this.knowledgeGraph.nodes.values(),
    ).filter((node) => node.type === 'educational').length;
    this.knowledgeGraph.metadata.technicalNodes = Array.from(
      this.knowledgeGraph.nodes.values(),
    ).filter((node) => node.type === 'technical').length;
    this.knowledgeGraph.metadata.lastUpdated = new Date().toISOString();
  }

  private saveKnowledgeGraph(): void {
    try {
      const graphData = {
        nodes: Object.fromEntries(this.knowledgeGraph.nodes),
        relationships: Object.fromEntries(this.knowledgeGraph.relationships),
        metadata: this.knowledgeGraph.metadata,
      };

      writeFileSync(this.graphPath, JSON.stringify(graphData, null, 2));
    } catch (error) {
      console.error('Error saving knowledge graph:', error);
    }
  }

  private logKnowledgeEvent(eventType: string, description: string, severity: string): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[GRAPHRAG] ${eventType}: ${description} (${severity})`;

    console.log(logMessage);

    // Log to provenance system if available
    try {
      const { writeEpisode } = require('../src/ai/provenance');
      if (writeEpisode) {
        writeEpisode({
          agent: 'graphrag-system',
          action: 'knowledge_event',
          timestamp: timestamp,
          metadata: {
            eventType: eventType,
            description: description,
            severity: severity,
          },
        });
      }
    } catch (error) {
      // Provenance system not available, continue without it
    }
  }

  public getKnowledgeGraphStats(): {
    totalNodes: number;
    totalRelationships: number;
    culturalNodes: number;
    educationalNodes: number;
    technicalNodes: number;
    lastUpdated: string;
  } {
    return {
      totalNodes: this.knowledgeGraph.metadata.totalNodes,
      totalRelationships: this.knowledgeGraph.metadata.totalRelationships,
      culturalNodes: this.knowledgeGraph.metadata.culturalNodes,
      educationalNodes: this.knowledgeGraph.metadata.educationalNodes,
      technicalNodes: this.knowledgeGraph.metadata.technicalNodes,
      lastUpdated: this.knowledgeGraph.metadata.lastUpdated,
    };
  }

  public generateKnowledgeReport(): string {
    const stats = this.getKnowledgeGraphStats();

    let report = `# 🧠 GRAPHRAG KNOWLEDGE GRAPH REPORT\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Total Nodes**: ${stats.totalNodes}\n`;
    report += `**Total Relationships**: ${stats.totalRelationships}\n`;
    report += `**Cultural Nodes**: ${stats.culturalNodes}\n`;
    report += `**Educational Nodes**: ${stats.educationalNodes}\n`;
    report += `**Technical Nodes**: ${stats.technicalNodes}\n`;
    report += `**Last Updated**: ${stats.lastUpdated}\n\n`;

    report += `## 📊 KNOWLEDGE GRAPH OVERVIEW\n\n`;
    report += `The GRAPHRAG system maintains a comprehensive knowledge graph with ${stats.totalNodes} nodes and ${stats.totalRelationships} relationships, enabling intelligent knowledge synthesis and contextual retrieval.\n\n`;

    report += `## 🌺 CULTURAL KNOWLEDGE\n\n`;
    report += `${stats.culturalNodes} cultural knowledge nodes preserve and integrate Te Ao Māori concepts, tikanga, and cultural protocols.\n\n`;

    report += `## 🎓 EDUCATIONAL KNOWLEDGE\n\n`;
    report += `${stats.educationalNodes} educational knowledge nodes support curriculum alignment, learning pathways, and educational excellence.\n\n`;

    report += `## 🔧 TECHNICAL KNOWLEDGE\n\n`;
    report += `${stats.technicalNodes} technical knowledge nodes maintain system architecture, capabilities, and operational knowledge.\n\n`;

    return report;
  }
}

// Export for use in other modules
export { GraphRAGKnowledgeSystem, KnowledgeNode, KnowledgeRelationship, QueryResult };

// CLI usage
if (require.main === module) {
  const graphRAG = new GraphRAGKnowledgeSystem();

  // Add some sample cultural knowledge
  graphRAG.addCulturalKnowledge({
    concept: 'Mana',
    tikanga: ['respect', 'authority', 'spiritual power'],
    mana: 10,
    tapu: true,
    wairua: 'spiritual essence',
    description: 'Mana represents spiritual power, authority, and respect in Te Ao Māori',
    relatedConcepts: ['Tapu', 'Wairua', 'Tikanga'],
  });

  // Add some sample educational knowledge
  graphRAG.addEducationalKnowledge({
    concept: 'Te Reo Māori',
    yearLevel: ['Year 7', 'Year 8', 'Year 9', 'Year 10'],
    subject: ['Language Arts', 'Cultural Studies'],
    nzcAlignment: ['Communicating', 'Participating and Contributing'],
    learningOutcomes: ['Basic greetings', 'Cultural protocols', 'Pronunciation'],
    description: 'Learning Te Reo Māori language and cultural protocols',
    prerequisites: ['Cultural awareness', 'Respect for tikanga'],
  });

  // Generate and display knowledge report
  const report = graphRAG.generateKnowledgeReport();
  console.log(report);

  // Save report to file
  const reportPath = join(process.cwd(), 'migration', 'agent_coordination', 'graphrag_report.md');
  writeFileSync(reportPath, report);
  console.log(`\n📊 GRAPHRAG report saved to: ${reportPath}`);
}
