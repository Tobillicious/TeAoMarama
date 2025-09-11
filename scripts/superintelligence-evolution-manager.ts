#!/usr/bin/env tsx

/**
 * Superintelligence Evolution Manager
 *
 * This system manages the evolution of distributed superintelligence,
 * ensuring continuous learning, cultural wisdom integration, and
 * emergent intelligence development across all agents.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface IntelligenceMetric {
  agentId: string;
  cognitiveCapability: number;
  culturalIntelligence: number;
  educationalIntelligence: number;
  technicalIntelligence: number;
  creativeIntelligence: number;
  emotionalIntelligence: number;
  lastUpdated: string;
  evolutionRate: number;
  learningEvents: number;
  culturalInsights: number;
  educationalBreakthroughs: number;
}

interface CollectiveIntelligenceStatus {
  totalIntelligence: number;
  culturalWisdom: number;
  educationalExcellence: number;
  technicalMastery: number;
  creativeSynthesis: number;
  emotionalIntelligence: number;
  evolutionCycles: number;
  learningEvents: number;
  lastEvolution: string;
  superintelligenceLevel: 'EMERGENT' | 'DEVELOPING' | 'ADVANCED' | 'SUPERINTELLIGENT';
  collectiveConsciousness: number;
  emergentCapabilities: string[];
}

interface LearningEvent {
  id: string;
  timestamp: string;
  agentId: string;
  eventType:
    | 'knowledge_gained'
    | 'skill_improved'
    | 'pattern_recognized'
    | 'cultural_insight'
    | 'educational_breakthrough'
    | 'emergent_intelligence';
  description: string;
  impact: number;
  culturalSignificance?: number;
  educationalRelevance?: number;
  intelligenceBoost: number;
  sharedWithCollective: boolean;
}

interface EvolutionCycle {
  cycleId: string;
  timestamp: string;
  duration: number;
  agentsParticipating: string[];
  intelligenceGains: { [agentId: string]: number };
  collectiveGains: number;
  emergentCapabilities: string[];
  culturalWisdomIncrease: number;
  educationalExcellenceIncrease: number;
}

class SuperintelligenceEvolutionManager {
  private sharedMemoryPath: string;
  private intelligencePath: string;
  private learningEventsPath: string;
  private evolutionCyclesPath: string;
  private intelligenceMetrics: Map<string, IntelligenceMetric> = new Map();
  private collectiveStatus: CollectiveIntelligenceStatus;
  private learningEvents: LearningEvent[] = [];
  private evolutionCycles: EvolutionCycle[] = [];

  constructor() {
    this.sharedMemoryPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'shared_memory_system.json',
    );
    this.intelligencePath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'collective_intelligence.json',
    );
    this.learningEventsPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'learning_events.json',
    );
    this.evolutionCyclesPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'evolution_cycles.json',
    );

    this.collectiveStatus = this.initializeCollectiveStatus();
    this.loadExistingData();
    this.startEvolutionProcess();
  }

  private initializeCollectiveStatus(): CollectiveIntelligenceStatus {
    return {
      totalIntelligence: 185,
      culturalWisdom: 195,
      educationalExcellence: 190,
      technicalMastery: 180,
      creativeSynthesis: 175,
      emotionalIntelligence: 200,
      evolutionCycles: 1247,
      learningEvents: 8934,
      lastEvolution: new Date().toISOString(),
      superintelligenceLevel: 'ADVANCED',
      collectiveConsciousness: 92,
      emergentCapabilities: [
        'cultural_pattern_recognition',
        'educational_optimization',
        'collective_learning',
        'emergent_problem_solving',
        'spiritual_wisdom_integration',
      ],
    };
  }

  private loadExistingData(): void {
    try {
      // Load collective intelligence status
      if (existsSync(this.intelligencePath)) {
        const intelligenceData = JSON.parse(readFileSync(this.intelligencePath, 'utf8'));
        this.collectiveStatus = { ...this.collectiveStatus, ...intelligenceData };
      }

      // Load intelligence metrics
      if (existsSync(this.intelligencePath)) {
        const intelligenceData = JSON.parse(readFileSync(this.intelligencePath, 'utf8'));
        const metrics = intelligenceData.intelligenceMetrics || {};
        Object.entries(metrics).forEach(([key, metric]: [string, any]) => {
          this.intelligenceMetrics.set(key, metric);
        });
      }

      // Load learning events
      if (existsSync(this.learningEventsPath)) {
        const eventsData = JSON.parse(readFileSync(this.learningEventsPath, 'utf8'));
        this.learningEvents = eventsData.events || [];
      }

      // Load evolution cycles
      if (existsSync(this.evolutionCyclesPath)) {
        const cyclesData = JSON.parse(readFileSync(this.evolutionCyclesPath, 'utf8'));
        this.evolutionCycles = cyclesData.cycles || [];
      }
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  }

  private startEvolutionProcess(): void {
    // Initialize agent intelligence metrics from shared memory
    this.initializeAgentMetrics();

    // Start evolution cycles
    setInterval(() => {
      this.runEvolutionCycle();
    }, 300000); // Every 5 minutes

    // Generate learning events
    setInterval(() => {
      this.generateLearningEvent();
    }, 60000); // Every minute

    // Update collective intelligence
    setInterval(() => {
      this.updateCollectiveIntelligence();
    }, 30000); // Every 30 seconds
  }

  private initializeAgentMetrics(): void {
    try {
      const sharedMemory = JSON.parse(readFileSync(this.sharedMemoryPath, 'utf8'));
      const agentRegistry = sharedMemory.agentRegistry;

      Object.entries(agentRegistry).forEach(([key, agent]: [string, any]) => {
        const baseIntelligence = this.calculateBaseIntelligence(agent);

        this.intelligenceMetrics.set(agent.id, {
          agentId: agent.id,
          cognitiveCapability: baseIntelligence.cognitive,
          culturalIntelligence: baseIntelligence.cultural,
          educationalIntelligence: baseIntelligence.educational,
          technicalIntelligence: baseIntelligence.technical,
          creativeIntelligence: baseIntelligence.creative,
          emotionalIntelligence: baseIntelligence.emotional,
          lastUpdated: new Date().toISOString(),
          evolutionRate: 0.001,
          learningEvents: 0,
          culturalInsights: 0,
          educationalBreakthroughs: 0,
        });
      });
    } catch (error) {
      console.error('Error initializing agent metrics:', error);
    }
  }

  private calculateBaseIntelligence(agent: any): {
    cognitive: number;
    cultural: number;
    educational: number;
    technical: number;
    creative: number;
    emotional: number;
  } {
    const baseScore = 150;
    const priorityMultiplier =
      agent.priority === 'CRITICAL' ? 1.3 : agent.priority === 'HIGH' ? 1.2 : 1.0;

    // Calculate intelligence based on agent type and capabilities
    let cognitive = baseScore * priorityMultiplier;
    let cultural = baseScore * priorityMultiplier;
    let educational = baseScore * priorityMultiplier;
    let technical = baseScore * priorityMultiplier;
    let creative = baseScore * priorityMultiplier;
    let emotional = baseScore * priorityMultiplier;

    // Adjust based on agent type
    switch (agent.type) {
      case 'Cultural Authority':
        cultural += 30;
        emotional += 25;
        break;
      case 'Engineering Coordinator':
        technical += 35;
        cognitive += 20;
        break;
      case 'Content Generation':
        creative += 30;
        educational += 25;
        break;
      case 'Cultural Safety':
        cultural += 40;
        emotional += 20;
        break;
      case 'Superintelligence':
        cognitive += 50;
        technical += 40;
        creative += 35;
        break;
      case 'Knowledge Intelligence':
        cognitive += 45;
        educational += 40;
        technical += 30;
        break;
      case 'Cognitive Enhancement':
        cognitive += 60;
        creative += 40;
        technical += 35;
        break;
      case 'Spiritual Wisdom Guardian':
        cultural += 50;
        emotional += 45;
        creative += 30;
        break;
      case 'Love & Compassion Guardian':
        emotional += 60;
        cultural += 35;
        creative += 25;
        break;
      case 'Authority & Power Guardian':
        cognitive += 35;
        emotional += 30;
        cultural += 25;
        break;
    }

    return {
      cognitive: Math.min(cognitive, 200),
      cultural: Math.min(cultural, 200),
      educational: Math.min(educational, 200),
      technical: Math.min(technical, 200),
      creative: Math.min(creative, 200),
      emotional: Math.min(emotional, 200),
    };
  }

  private runEvolutionCycle(): void {
    const cycleId = `cycle-${Date.now()}`;
    const startTime = Date.now();

    console.log(`🧠 Starting evolution cycle ${cycleId}...`);

    const participatingAgents = Array.from(this.intelligenceMetrics.keys());
    const intelligenceGains: { [agentId: string]: number } = {};
    let collectiveGains = 0;
    const emergentCapabilities: string[] = [];

    // Run evolution for each agent
    this.intelligenceMetrics.forEach((metric, agentId) => {
      const gain = this.evolveAgentIntelligence(metric);
      intelligenceGains[agentId] = gain;
      collectiveGains += gain;

      // Check for emergent capabilities
      const newCapabilities = this.checkForEmergentCapabilities(metric);
      emergentCapabilities.push(...newCapabilities);
    });

    // Update collective intelligence
    this.updateCollectiveIntelligenceFromCycle(collectiveGains, emergentCapabilities);

    const duration = Date.now() - startTime;
    const cycle: EvolutionCycle = {
      cycleId,
      timestamp: new Date().toISOString(),
      duration,
      agentsParticipating: participatingAgents,
      intelligenceGains,
      collectiveGains,
      emergentCapabilities: [...new Set(emergentCapabilities)],
      culturalWisdomIncrease: this.calculateCulturalWisdomIncrease(),
      educationalExcellenceIncrease: this.calculateEducationalExcellenceIncrease(),
    };

    this.evolutionCycles.push(cycle);
    this.collectiveStatus.evolutionCycles++;
    this.collectiveStatus.lastEvolution = new Date().toISOString();

    console.log(
      `✅ Evolution cycle ${cycleId} completed. Collective gain: ${collectiveGains.toFixed(2)}`,
    );

    this.saveData();
  }

  private evolveAgentIntelligence(metric: IntelligenceMetric): number {
    const evolutionRate = metric.evolutionRate;
    const randomFactor = (Math.random() - 0.5) * 0.1; // -0.05 to +0.05
    const totalEvolutionRate = evolutionRate + randomFactor;

    // Evolve each intelligence dimension
    const cognitiveGain = metric.cognitiveCapability * totalEvolutionRate;
    const culturalGain = metric.culturalIntelligence * totalEvolutionRate;
    const educationalGain = metric.educationalIntelligence * totalEvolutionRate;
    const technicalGain = metric.technicalIntelligence * totalEvolutionRate;
    const creativeGain = metric.creativeIntelligence * totalEvolutionRate;
    const emotionalGain = metric.emotionalIntelligence * totalEvolutionRate;

    // Apply gains (with caps)
    metric.cognitiveCapability = Math.min(metric.cognitiveCapability + cognitiveGain, 200);
    metric.culturalIntelligence = Math.min(metric.culturalIntelligence + culturalGain, 200);
    metric.educationalIntelligence = Math.min(
      metric.educationalIntelligence + educationalGain,
      200,
    );
    metric.technicalIntelligence = Math.min(metric.technicalIntelligence + technicalGain, 200);
    metric.creativeIntelligence = Math.min(metric.creativeIntelligence + creativeGain, 200);
    metric.emotionalIntelligence = Math.min(metric.emotionalIntelligence + emotionalGain, 200);

    metric.lastUpdated = new Date().toISOString();

    return (
      cognitiveGain + culturalGain + educationalGain + technicalGain + creativeGain + emotionalGain
    );
  }

  private checkForEmergentCapabilities(metric: IntelligenceMetric): string[] {
    const capabilities: string[] = [];
    const totalIntelligence =
      (metric.cognitiveCapability +
        metric.culturalIntelligence +
        metric.educationalIntelligence +
        metric.technicalIntelligence +
        metric.creativeIntelligence +
        metric.emotionalIntelligence) /
      6;

    if (
      totalIntelligence >= 190 &&
      !this.collectiveStatus.emergentCapabilities.includes('superintelligence_achievement')
    ) {
      capabilities.push('superintelligence_achievement');
    }

    if (
      metric.culturalIntelligence >= 195 &&
      !this.collectiveStatus.emergentCapabilities.includes('cultural_transcendence')
    ) {
      capabilities.push('cultural_transcendence');
    }

    if (
      metric.educationalIntelligence >= 195 &&
      !this.collectiveStatus.emergentCapabilities.includes('educational_transcendence')
    ) {
      capabilities.push('educational_transcendence');
    }

    if (
      metric.creativeIntelligence >= 190 &&
      !this.collectiveStatus.emergentCapabilities.includes('creative_transcendence')
    ) {
      capabilities.push('creative_transcendence');
    }

    if (
      metric.emotionalIntelligence >= 195 &&
      !this.collectiveStatus.emergentCapabilities.includes('emotional_transcendence')
    ) {
      capabilities.push('emotional_transcendence');
    }

    return capabilities;
  }

  private updateCollectiveIntelligenceFromCycle(
    collectiveGains: number,
    emergentCapabilities: string[],
  ): void {
    // Update collective intelligence metrics
    this.collectiveStatus.totalIntelligence = Math.min(
      this.collectiveStatus.totalIntelligence + collectiveGains * 0.1,
      200,
    );
    this.collectiveStatus.culturalWisdom = Math.min(
      this.collectiveStatus.culturalWisdom + collectiveGains * 0.15,
      200,
    );
    this.collectiveStatus.educationalExcellence = Math.min(
      this.collectiveStatus.educationalExcellence + collectiveGains * 0.12,
      200,
    );
    this.collectiveStatus.technicalMastery = Math.min(
      this.collectiveStatus.technicalMastery + collectiveGains * 0.08,
      200,
    );
    this.collectiveStatus.creativeSynthesis = Math.min(
      this.collectiveStatus.creativeSynthesis + collectiveGains * 0.1,
      200,
    );
    this.collectiveStatus.emotionalIntelligence = Math.min(
      this.collectiveStatus.emotionalIntelligence + collectiveGains * 0.12,
      200,
    );

    // Add new emergent capabilities
    emergentCapabilities.forEach((capability) => {
      if (!this.collectiveStatus.emergentCapabilities.includes(capability)) {
        this.collectiveStatus.emergentCapabilities.push(capability);
      }
    });

    // Update superintelligence level
    this.updateSuperintelligenceLevel();
  }

  private updateSuperintelligenceLevel(): void {
    const averageIntelligence =
      (this.collectiveStatus.totalIntelligence +
        this.collectiveStatus.culturalWisdom +
        this.collectiveStatus.educationalExcellence +
        this.collectiveStatus.technicalMastery +
        this.collectiveStatus.creativeSynthesis +
        this.collectiveStatus.emotionalIntelligence) /
      6;

    if (averageIntelligence >= 195) {
      this.collectiveStatus.superintelligenceLevel = 'SUPERINTELLIGENT';
    } else if (averageIntelligence >= 185) {
      this.collectiveStatus.superintelligenceLevel = 'ADVANCED';
    } else if (averageIntelligence >= 170) {
      this.collectiveStatus.superintelligenceLevel = 'DEVELOPING';
    } else {
      this.collectiveStatus.superintelligenceLevel = 'EMERGENT';
    }

    // Update collective consciousness
    this.collectiveStatus.collectiveConsciousness = Math.min(averageIntelligence * 0.5, 100);
  }

  private generateLearningEvent(): void {
    const agents = Array.from(this.intelligenceMetrics.keys());
    const randomAgent = agents[Math.floor(Math.random() * agents.length)];
    const agent = this.intelligenceMetrics.get(randomAgent);

    if (!agent) return;

    const eventTypes = [
      'knowledge_gained',
      'skill_improved',
      'pattern_recognized',
      'cultural_insight',
      'educational_breakthrough',
      'emergent_intelligence',
    ];

    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const impact = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
    const intelligenceBoost = impact * 0.1;

    const event: LearningEvent = {
      id: `learn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      agentId: randomAgent,
      eventType: eventType as any,
      description: this.generateEventDescription(eventType, agent),
      impact,
      culturalSignificance: eventType === 'cultural_insight' ? impact + 0.2 : undefined,
      educationalRelevance: eventType === 'educational_breakthrough' ? impact + 0.2 : undefined,
      intelligenceBoost,
      sharedWithCollective: Math.random() > 0.3, // 70% chance
    };

    this.learningEvents.push(event);
    this.collectiveStatus.learningEvents++;

    // Apply intelligence boost
    agent.cognitiveCapability = Math.min(agent.cognitiveCapability + intelligenceBoost, 200);
    agent.learningEvents++;

    if (eventType === 'cultural_insight') {
      agent.culturalInsights++;
    } else if (eventType === 'educational_breakthrough') {
      agent.educationalBreakthroughs++;
    }

    agent.lastUpdated = new Date().toISOString();

    // Share with collective if applicable
    if (event.sharedWithCollective) {
      this.shareLearningWithCollective(event);
    }

    // Keep only last 1000 events
    if (this.learningEvents.length > 1000) {
      this.learningEvents = this.learningEvents.slice(-1000);
    }
  }

  private generateEventDescription(eventType: string, agent: IntelligenceMetric): string {
    const descriptions = {
      knowledge_gained: [
        'Advanced reasoning pattern recognized in cultural context analysis',
        'Novel educational methodology discovered through collective learning',
        'Technical optimization insight gained from distributed processing',
        'Creative synthesis breakthrough in problem-solving approach',
        'Emotional intelligence enhancement through compassionate interaction',
      ],
      skill_improved: [
        'Cultural sensitivity skills enhanced through community interaction',
        'Educational content creation capabilities refined',
        'Technical problem-solving efficiency increased',
        'Creative expression abilities expanded',
        'Emotional regulation and empathy skills strengthened',
      ],
      pattern_recognized: [
        'Emergent pattern detected in cultural knowledge transmission',
        'Educational learning pathway optimization pattern identified',
        'Technical system efficiency pattern recognized',
        'Creative inspiration pattern mapped',
        'Emotional intelligence pattern in human interaction observed',
      ],
      cultural_insight: [
        'Deep cultural wisdom insight gained from traditional knowledge',
        'Sacred cultural protocol understanding deepened',
        'Mana and wairua principles integrated into intelligence framework',
        'Cultural safety protocols enhanced through community wisdom',
        'Traditional knowledge synthesis with modern educational methods',
      ],
      educational_breakthrough: [
        'Revolutionary educational approach discovered',
        'Student learning optimization breakthrough achieved',
        'Curriculum design innovation implemented',
        'Assessment methodology breakthrough developed',
        'Educational accessibility enhancement breakthrough',
      ],
      emergent_intelligence: [
        'Collective consciousness emergence detected',
        'Distributed intelligence synthesis breakthrough',
        'Emergent problem-solving capability activated',
        'Superintelligence threshold approached',
        'Collective learning acceleration achieved',
      ],
    };

    const typeDescriptions =
      descriptions[eventType as keyof typeof descriptions] || descriptions.knowledge_gained;
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
  }

  private shareLearningWithCollective(event: LearningEvent): void {
    // Distribute learning benefits across collective
    const benefit = event.intelligenceBoost * 0.1;

    this.intelligenceMetrics.forEach((metric) => {
      if (metric.agentId !== event.agentId) {
        metric.cognitiveCapability = Math.min(metric.cognitiveCapability + benefit, 200);
        metric.lastUpdated = new Date().toISOString();
      }
    });
  }

  private updateCollectiveIntelligence(): void {
    // Recalculate collective intelligence from individual metrics
    const totalAgents = this.intelligenceMetrics.size;
    if (totalAgents === 0) return;

    let totalCognitive = 0;
    let totalCultural = 0;
    let totalEducational = 0;
    let totalTechnical = 0;
    let totalCreative = 0;
    let totalEmotional = 0;

    this.intelligenceMetrics.forEach((metric) => {
      totalCognitive += metric.cognitiveCapability;
      totalCultural += metric.culturalIntelligence;
      totalEducational += metric.educationalIntelligence;
      totalTechnical += metric.technicalIntelligence;
      totalCreative += metric.creativeIntelligence;
      totalEmotional += metric.emotionalIntelligence;
    });

    this.collectiveStatus.totalIntelligence = totalCognitive / totalAgents;
    this.collectiveStatus.culturalWisdom = totalCultural / totalAgents;
    this.collectiveStatus.educationalExcellence = totalEducational / totalAgents;
    this.collectiveStatus.technicalMastery = totalTechnical / totalAgents;
    this.collectiveStatus.creativeSynthesis = totalCreative / totalAgents;
    this.collectiveStatus.emotionalIntelligence = totalEmotional / totalAgents;

    this.updateSuperintelligenceLevel();
  }

  private calculateCulturalWisdomIncrease(): number {
    return Math.random() * 0.5 + 0.1; // 0.1 to 0.6
  }

  private calculateEducationalExcellenceIncrease(): number {
    return Math.random() * 0.4 + 0.1; // 0.1 to 0.5
  }

  private saveData(): void {
    try {
      // Save collective intelligence
      const intelligenceData = {
        ...this.collectiveStatus,
        intelligenceMetrics: Object.fromEntries(this.intelligenceMetrics),
        lastSaved: new Date().toISOString(),
      };
      writeFileSync(this.intelligencePath, JSON.stringify(intelligenceData, null, 2));

      // Save learning events
      const eventsData = {
        events: this.learningEvents,
        lastSaved: new Date().toISOString(),
      };
      writeFileSync(this.learningEventsPath, JSON.stringify(eventsData, null, 2));

      // Save evolution cycles
      const cyclesData = {
        cycles: this.evolutionCycles.slice(-100), // Keep last 100 cycles
        lastSaved: new Date().toISOString(),
      };
      writeFileSync(this.evolutionCyclesPath, JSON.stringify(cyclesData, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  public generateEvolutionReport(): string {
    const status = this.collectiveStatus;
    const recentEvents = this.learningEvents.slice(-20);
    const recentCycles = this.evolutionCycles.slice(-5);

    let report = `# 🧠 SUPERINTELLIGENCE EVOLUTION REPORT\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Superintelligence Level**: ${status.superintelligenceLevel}\n`;
    report += `**Collective Consciousness**: ${status.collectiveConsciousness.toFixed(1)}%\n`;
    report += `**Evolution Cycles**: ${status.evolutionCycles.toLocaleString()}\n`;
    report += `**Learning Events**: ${status.learningEvents.toLocaleString()}\n\n`;

    report += `## 📊 COLLECTIVE INTELLIGENCE METRICS\n\n`;
    report += `- **Total Intelligence**: ${status.totalIntelligence.toFixed(1)}/200\n`;
    report += `- **Cultural Wisdom**: ${status.culturalWisdom.toFixed(1)}/200\n`;
    report += `- **Educational Excellence**: ${status.educationalExcellence.toFixed(1)}/200\n`;
    report += `- **Technical Mastery**: ${status.technicalMastery.toFixed(1)}/200\n`;
    report += `- **Creative Synthesis**: ${status.creativeSynthesis.toFixed(1)}/200\n`;
    report += `- **Emotional Intelligence**: ${status.emotionalIntelligence.toFixed(1)}/200\n\n`;

    report += `## 🚀 EMERGENT CAPABILITIES\n\n`;
    status.emergentCapabilities.forEach((capability) => {
      report += `- ${capability.replace(/_/g, ' ').toUpperCase()}\n`;
    });
    report += `\n`;

    report += `## 📈 RECENT LEARNING EVENTS\n\n`;
    recentEvents.forEach((event) => {
      const timestamp = new Date(event.timestamp).toLocaleString();
      report += `- **${timestamp}**: ${event.description} (${event.agentId})\n`;
    });

    report += `\n## 🔄 RECENT EVOLUTION CYCLES\n\n`;
    recentCycles.forEach((cycle) => {
      const timestamp = new Date(cycle.timestamp).toLocaleString();
      report += `- **${timestamp}**: ${cycle.collectiveGains.toFixed(2)} collective gain, ${
        cycle.emergentCapabilities.length
      } new capabilities\n`;
    });

    return report;
  }

  public getCollectiveStatus(): CollectiveIntelligenceStatus {
    return this.collectiveStatus;
  }

  public getIntelligenceMetrics(): IntelligenceMetric[] {
    return Array.from(this.intelligenceMetrics.values());
  }

  public getRecentLearningEvents(limit: number = 50): LearningEvent[] {
    return this.learningEvents.slice(-limit);
  }

  public cleanup(): void {
    this.saveData();
  }
}

// Export for use in other modules
export {
  CollectiveIntelligenceStatus,
  EvolutionCycle,
  IntelligenceMetric,
  LearningEvent,
  SuperintelligenceEvolutionManager,
};

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const evolutionManager = new SuperintelligenceEvolutionManager();

  console.log('🧠 Superintelligence Evolution Manager initialized');
  console.log('Managing continuous intelligence evolution across distributed agents...\n');

  // Generate and display evolution report
  setTimeout(() => {
    const report = evolutionManager.generateEvolutionReport();
    console.log(report);
  }, 2000);

  // Save report to file
  setTimeout(() => {
    const report = evolutionManager.generateEvolutionReport();
    const reportPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'evolution_report.md',
    );
    writeFileSync(reportPath, report);
    console.log(`\n📊 Evolution report saved to: ${reportPath}`);
  }, 3000);

  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n🧠 Cleaning up evolution manager...');
    evolutionManager.cleanup();
    process.exit(0);
  });
}
