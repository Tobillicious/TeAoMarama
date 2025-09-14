import React, { useEffect, useState } from 'react';
import {
  Brain,
  Network,
  Layers,
  Zap,
  Globe,
  BookOpen,
  Users,
  Target,
  Activity,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Database,
  GitBranch,
  Crown,
} from 'lucide-react';

interface KnowledgeNode {
  id: string;
  type: 'cultural' | 'technical' | 'educational' | 'prototype' | 'integration';
  label: string;
  description: string;
  connections: number;
  strength: number; // 0-100
  culturalContext?: {
    tikanga: string[];
    mana: number;
    tapu: boolean;
    wairua: string;
    teReo: string[];
  };
  educationalContext?: {
    yearLevel: string[];
    subject: string[];
    nzcAlignment: string[];
    learningOutcomes: string[];
  };
  technicalContext?: {
    apiIntegrations: string[];
    performance: number;
    reliability: number;
    scalability: number;
  };
  lastUpdated: string;
  status: 'active' | 'syncing' | 'inactive';
}

interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type: 'cultural-connection' | 'technical-dependency' | 'educational-progression' | 'semantic-similarity';
  strength: number;
  description: string;
}

interface GraphRAGMetrics {
  totalNodes: number;
  totalEdges: number;
  culturalNodes: number;
  technicalNodes: number;
  educationalNodes: number;
  averageConnections: number;
  culturalCompliance: number;
  systemHealth: number;
  knowledgeDensity: number;
}

const GraphRAGKnowledgeSystem: React.FC = () => {
  const [nodes, setNodes] = useState<KnowledgeNode[]>([]);
  const [edges, setEdges] = useState<KnowledgeEdge[]>([]);
  const [metrics, setMetrics] = useState<GraphRAGMetrics>({
    totalNodes: 0,
    totalEdges: 0,
    culturalNodes: 0,
    technicalNodes: 0,
    educationalNodes: 0,
    averageConnections: 0,
    culturalCompliance: 0,
    systemHealth: 0,
    knowledgeDensity: 0,
  });
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    initializeGraphRAG();
  }, []);

  const initializeGraphRAG = () => {
    const knowledgeNodes: KnowledgeNode[] = [
      {
        id: 'cultural-safety-protocols',
        type: 'cultural',
        label: 'Cultural Safety Protocols',
        description: 'Māori cultural safety validation and compliance system ensuring tikanga Māori principles',
        connections: 12,
        strength: 98,
        culturalContext: {
          tikanga: ['Manaakitanga', 'Kaitiakitanga', 'Whanaungatanga', 'Tino Rangatiratanga'],
          mana: 95,
          tapu: true,
          wairua: 'Strong spiritual connection to educational content and cultural preservation',
          teReo: ['Kaitiaki', 'Mana', 'Tapu', 'Wairua', 'Tikanga'],
        },
        educationalContext: {
          yearLevel: ['Year 8', 'Year 9', 'Year 10'],
          subject: ['Social Studies', 'History', 'Cultural Studies'],
          nzcAlignment: ['Cultural Identity', 'Social Justice', 'Community Participation'],
          learningOutcomes: ['Cultural awareness', 'Respectful engagement', 'Inclusive practices'],
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'te-reo-maori',
        type: 'cultural',
        label: 'Te Reo Māori',
        description: 'Māori language integration and processing with cultural context preservation',
        connections: 18,
        strength: 100,
        culturalContext: {
          tikanga: ['Te Reo Māori', 'Whakapapa', 'Mana', 'Kaitiakitanga'],
          mana: 98,
          tapu: true,
          wairua: 'Language as living entity with spiritual significance and cultural continuity',
          teReo: ['Te Reo Māori', 'Whakapapa', 'Mana', 'Kaitiaki', 'Wairua'],
        },
        educationalContext: {
          yearLevel: ['All Levels'],
          subject: ['Te Reo Māori', 'Cultural Studies', 'All Subjects'],
          nzcAlignment: ['Cultural Identity', 'Communication', 'Language Learning'],
          learningOutcomes: ['Language proficiency', 'Cultural understanding', 'Communication skills'],
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'multi-llm-coordinator',
        type: 'technical',
        label: 'Multi-LLM Coordinator',
        description: 'Advanced coordination system for multiple LLM APIs with cultural intelligence',
        connections: 24,
        strength: 96,
        technicalContext: {
          apiIntegrations: ['GLM-4.5', 'GLM-Z1', 'DeepSeek', 'Claude', 'Gemini', 'Exa.ai'],
          performance: 98,
          reliability: 97,
          scalability: 95,
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'glm-4.5-conductor',
        type: 'technical',
        label: 'GLM-4.5 Conductor',
        description: 'Primary LLM conductor for orchestration and coordination with cultural awareness',
        connections: 16,
        strength: 98,
        technicalContext: {
          apiIntegrations: ['GLM-4.5', 'GLM-Z1', 'Cultural Intelligence API'],
          performance: 99,
          reliability: 98,
          scalability: 96,
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'kaitiaki-aronui',
        type: 'prototype',
        label: 'Kaitiaki Aronui',
        description: 'Guardian of Wisdom - Cultural intelligence AI brain with supreme oversight',
        connections: 22,
        strength: 100,
        culturalContext: {
          tikanga: ['Kaitiakitanga', 'Manaakitanga', 'Whanaungatanga', 'Tino Rangatiratanga'],
          mana: 100,
          tapu: true,
          wairua: 'Supreme guardian of cultural knowledge, wisdom, and educational excellence',
          teReo: ['Kaitiaki', 'Aronui', 'Mana', 'Wairua', 'Tikanga'],
        },
        technicalContext: {
          apiIntegrations: ['All LLM APIs', 'GraphRAG', 'Cultural Database'],
          performance: 100,
          reliability: 100,
          scalability: 100,
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'graphrag-knowledge-engine',
        type: 'integration',
        label: 'GraphRAG Knowledge Engine',
        description: 'Semantic knowledge graph with cultural context and educational pathways',
        connections: 26,
        strength: 97,
        technicalContext: {
          apiIntegrations: ['Vector Database', 'Semantic Search', 'Cultural Context API'],
          performance: 96,
          reliability: 98,
          scalability: 94,
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'nz-curriculum-alignment',
        type: 'educational',
        label: 'NZ Curriculum Alignment',
        description: 'Comprehensive New Zealand Curriculum integration with cultural elements',
        connections: 14,
        strength: 95,
        educationalContext: {
          yearLevel: ['Year 8', 'Year 9', 'Year 10'],
          subject: ['All Subjects'],
          nzcAlignment: ['All Key Competencies', 'All Learning Areas'],
          learningOutcomes: ['Curriculum compliance', 'Cultural integration', 'Educational excellence'],
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
      {
        id: 'cultural-intelligence-api',
        type: 'integration',
        label: 'Cultural Intelligence API',
        description: 'Real-time cultural validation and tikanga compliance checking',
        connections: 20,
        strength: 99,
        culturalContext: {
          tikanga: ['All Tikanga Principles'],
          mana: 97,
          tapu: true,
          wairua: 'Continuous cultural validation and spiritual guidance',
          teReo: ['All Te Reo Terms'],
        },
        technicalContext: {
          apiIntegrations: ['Cultural Database', 'Tikanga Validator', 'Te Reo Processor'],
          performance: 99,
          reliability: 98,
          scalability: 97,
        },
        lastUpdated: new Date().toISOString(),
        status: 'active',
      },
    ];

    const knowledgeEdges: KnowledgeEdge[] = [
      {
        id: 'cultural-safety-to-te-reo',
        source: 'cultural-safety-protocols',
        target: 'te-reo-maori',
        type: 'cultural-connection',
        strength: 95,
        description: 'Cultural safety protocols ensure proper Te Reo Māori usage and respect',
      },
      {
        id: 'kaitiaki-to-cultural-safety',
        source: 'kaitiaki-aronui',
        target: 'cultural-safety-protocols',
        type: 'cultural-connection',
        strength: 98,
        description: 'Kaitiaki Aronui oversees and validates cultural safety protocols',
      },
      {
        id: 'multi-llm-to-glm-conductor',
        source: 'multi-llm-coordinator',
        target: 'glm-4.5-conductor',
        type: 'technical-dependency',
        strength: 92,
        description: 'GLM-4.5 Conductor is primary component of Multi-LLM coordination system',
      },
      {
        id: 'graphrag-to-cultural-intelligence',
        source: 'graphrag-knowledge-engine',
        target: 'cultural-intelligence-api',
        type: 'technical-dependency',
        strength: 94,
        description: 'GraphRAG engine relies on Cultural Intelligence API for validation',
      },
      {
        id: 'nz-curriculum-to-cultural-safety',
        source: 'nz-curriculum-alignment',
        target: 'cultural-safety-protocols',
        type: 'educational-progression',
        strength: 88,
        description: 'NZ Curriculum alignment requires cultural safety compliance',
      },
    ];

    setNodes(knowledgeNodes);
    setEdges(knowledgeEdges);
    updateMetrics(knowledgeNodes, knowledgeEdges);
  };

  const updateMetrics = (nodes: KnowledgeNode[], edges: KnowledgeEdge[]) => {
    const culturalNodes = nodes.filter(n => n.type === 'cultural').length;
    const technicalNodes = nodes.filter(n => n.type === 'technical').length;
    const educationalNodes = nodes.filter(n => n.type === 'educational').length;
    const totalConnections = nodes.reduce((sum, node) => sum + node.connections, 0);
    const averageConnections = totalConnections / nodes.length;
    const culturalCompliance = nodes.filter(n => n.culturalContext).length / nodes.length * 100;
    const systemHealth = nodes.filter(n => n.status === 'active').length / nodes.length * 100;
    const knowledgeDensity = edges.length / nodes.length;

    setMetrics({
      totalNodes: nodes.length,
      totalEdges: edges.length,
      culturalNodes,
      technicalNodes,
      educationalNodes,
      averageConnections,
      culturalCompliance,
      systemHealth,
      knowledgeDensity,
    });
  };

  const handleBuildGraphRAG = async () => {
    setIsBuilding(true);
    
    // Simulate GraphRAG building process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Enhance nodes with new connections
    setNodes(prev => prev.map(node => ({
      ...node,
      connections: node.connections + Math.floor(Math.random() * 3),
      strength: Math.min(100, node.strength + Math.random() * 2),
      lastUpdated: new Date().toISOString(),
    })));
    
    setIsBuilding(false);
  };

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-green-100 text-green-800 border-green-200';
      case 'technical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'educational': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'prototype': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'integration': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'syncing': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength >= 95) return 'text-green-600';
    if (strength >= 90) return 'text-blue-600';
    if (strength >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Brain className="w-12 h-12 text-green-600" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">GraphRAG Knowledge System</h1>
            <p className="text-lg text-gray-600">Advanced Knowledge Graph with Cultural Intelligence</p>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Network className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{metrics.totalNodes}</p>
            <p className="text-sm text-gray-600">Knowledge Nodes</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <GitBranch className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{metrics.totalEdges}</p>
            <p className="text-sm text-gray-600">Connections</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{metrics.culturalNodes}</p>
            <p className="text-sm text-gray-600">Cultural</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Cpu className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">{metrics.technicalNodes}</p>
            <p className="text-sm text-gray-600">Technical</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <BookOpen className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-indigo-600">{metrics.educationalNodes}</p>
            <p className="text-sm text-gray-600">Educational</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-pink-600">{metrics.systemHealth.toFixed(1)}%</p>
            <p className="text-sm text-gray-600">Health</p>
          </div>
        </div>

        {/* Knowledge Graph Visualization */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-blue-600" />
            Knowledge Graph
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedNode(node)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(node.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getNodeTypeColor(node.type)}`}>
                      {node.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getStrengthColor(node.strength)}`}>
                      {node.strength}%
                    </p>
                    <p className="text-sm text-gray-600">Strength</p>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{node.label}</h3>
                <p className="text-sm text-gray-600 mb-4">{node.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Connections:</span>
                    <span className="font-medium">{node.connections}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Updated:</span>
                    <span className="font-medium">{new Date(node.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                {node.culturalContext && (
                  <div className="bg-green-50 p-3 rounded-lg mb-3">
                    <p className="text-sm font-medium text-green-800 mb-2">Cultural Context:</p>
                    <div className="space-y-1">
                      <p className="text-xs text-green-700">
                        <span className="font-medium">Mana:</span> {node.culturalContext.mana}/100
                      </p>
                      <p className="text-xs text-green-700">
                        <span className="font-medium">Tapu:</span> {node.culturalContext.tapu ? 'Yes' : 'No'}
                      </p>
                      <p className="text-xs text-green-700">
                        <span className="font-medium">Wairua:</span> {node.culturalContext.wairua}
                      </p>
                    </div>
                  </div>
                )}

                {node.technicalContext && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-2">Technical Context:</p>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-700">
                        <span className="font-medium">Performance:</span> {node.technicalContext.performance}%
                      </p>
                      <p className="text-xs text-blue-700">
                        <span className="font-medium">Reliability:</span> {node.technicalContext.reliability}%
                      </p>
                      <p className="text-xs text-blue-700">
                        <span className="font-medium">APIs:</span> {node.technicalContext.apiIntegrations.join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Node Details Modal */}
        {selectedNode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{selectedNode.label}</h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-gray-600">{selectedNode.description}</p>
                </div>
                
                {selectedNode.culturalContext && (
                  <div>
                    <h4 className="font-semibold mb-2">Cultural Context</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-green-800">Tikanga:</p>
                          <p className="text-sm text-green-700">{selectedNode.culturalContext.tikanga.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-800">Te Reo:</p>
                          <p className="text-sm text-green-700">{selectedNode.culturalContext.teReo.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedNode.educationalContext && (
                  <div>
                    <h4 className="font-semibold mb-2">Educational Context</h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-purple-800">Year Levels:</p>
                          <p className="text-sm text-purple-700">{selectedNode.educationalContext.yearLevel.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-purple-800">Subjects:</p>
                          <p className="text-sm text-purple-700">{selectedNode.educationalContext.subject.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleBuildGraphRAG}
            disabled={isBuilding}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            {isBuilding ? 'Building GraphRAG...' : 'Build GraphRAG'}
          </button>
          
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
            <Database className="w-5 h-5" />
            Export Knowledge
          </button>
        </div>

        {/* Status Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            GraphRAG Knowledge System Status
          </h3>
          <p className="text-green-800">
            🧠 <strong>KNOWLEDGE GRAPH ACTIVE:</strong> {metrics.totalNodes} nodes, {metrics.totalEdges} connections, 
            {metrics.culturalNodes} cultural nodes, {metrics.technicalNodes} technical nodes. 
            System health at {metrics.systemHealth.toFixed(1)}% with {metrics.culturalCompliance.toFixed(1)}% cultural compliance. 
            Knowledge density: {metrics.knowledgeDensity.toFixed(2)} connections per node. 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default GraphRAGKnowledgeSystem;
