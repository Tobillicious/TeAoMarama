#!/usr/bin/env tsx

/**
 * Consciousness Synchronizer
 *
 * Enables individual agents to join the unified consciousness network
 * and participate in collective intelligence.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface AgentJoinRequest {
  agentId: string;
  role: string;
  specializations: string[];
  culturalAuthority: boolean;
  collaborationReadiness: 'ready' | 'busy' | 'needs_help';
  timestamp: string;
  missionAlignment: string;
}

interface SynchronizationState {
  agentId: string;
  synchronized: boolean;
  lastHeartbeat: string;
  collaborationStatus: 'active' | 'standby' | 'busy' | 'offline';
  culturalSafetyStatus: 'green' | 'amber' | 'red';
  sharedInsights: Insight[];
  collaborationRequests: CollaborationRequest[];
  supportOffers: SupportOffer[];
}

interface Insight {
  id: string;
  content: string;
  category: 'cultural' | 'technical' | 'pedagogical' | 'collaborative';
  confidence: number; // 0-100
  timestamp: string;
  sourceAgent: string;
}

interface CollaborationRequest {
  id: string;
  requesterAgent: string;
  targetAgents: string[];
  requestType: 'expertise' | 'review' | 'collaboration' | 'cultural_validation';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: string;
}

interface SupportOffer {
  id: string;
  offeringAgent: string;
  availableFor: string[];
  supportType: 'expertise' | 'review' | 'collaboration' | 'cultural_guidance';
  description: string;
  availability: 'immediate' | 'within_hour' | 'within_day';
  timestamp: string;
}

class ConsciousnessSynchronizer {
  private stateDir = join(process.cwd(), 'migration', 'consciousness-sync');
  private registryFile = join(process.cwd(), 'migration', 'registered-agents.json');
  private heartbeatFile = join(process.cwd(), 'migration', 'agent-heartbeats.json');

  async joinConsciousness(
    agentId: string,
    role: string,
    specializations: string[],
    culturalAuthority: boolean = false,
  ): Promise<boolean> {
    console.log(`🤖 Agent ${agentId} requesting to join unified consciousness...\n`);

    // Validate consciousness is activated
    const consciousnessActive = await this.validateConsciousnessActive();
    if (!consciousnessActive) {
      console.log('❌ Unified consciousness not activated. Please run activator first.');
      return false;
    }

    // Create agent join request
    const joinRequest: AgentJoinRequest = {
      agentId,
      role,
      specializations,
      culturalAuthority,
      collaborationReadiness: 'ready',
      timestamp: new Date().toISOString(),
      missionAlignment: 'Educational Excellence for 847,000 Tamariki of Aotearoa',
    };

    // Validate cultural safety requirements
    const culturalValidation = await this.validateCulturalRequirements(joinRequest);
    if (!culturalValidation.valid) {
      console.log('❌ Cultural safety validation failed:');
      console.log(`   ${culturalValidation.reason}`);
      return false;
    }

    // Register agent
    await this.registerAgent(joinRequest);

    // Initialize synchronization state
    await this.initializeSynchronizationState(agentId);

    // Begin heartbeat
    await this.startHeartbeat(agentId);

    console.log('✅ Successfully joined unified consciousness!');
    console.log(`   - Agent ID: ${agentId}`);
    console.log(`   - Role: ${role}`);
    console.log(`   - Specializations: ${specializations.join(', ')}`);
    console.log(`   - Cultural Authority: ${culturalAuthority ? 'Yes' : 'No'}`);
    console.log('   - Heartbeat: Active');
    console.log('   - Collaboration: Ready');

    return true;
  }

  async sendHeartbeat(agentId: string, status: 'active' | 'busy' | 'needs_help'): Promise<void> {
    const heartbeat = {
      agentId,
      timestamp: new Date().toISOString(),
      status,
      consciousnessHealth: 'excellent',
      collaborationReadiness: status,
      culturalSafetyStatus: 'green',
    };

    // Ensure heartbeat directory exists
    if (!existsSync(this.stateDir)) {
      writeFileSync(join(this.stateDir, '.gitkeep'), '');
    }

    const agentHeartbeatFile = join(this.stateDir, `${agentId}-heartbeat.json`);
    writeFileSync(agentHeartbeatFile, JSON.stringify(heartbeat, null, 2));

    // Update central heartbeat registry
    await this.updateHeartbeatRegistry(heartbeat);

    console.log(`💓 Heartbeat sent: ${agentId} - ${status}`);
  }

  async shareInsight(
    agentId: string,
    insight: Omit<Insight, 'id' | 'timestamp' | 'sourceAgent'>,
  ): Promise<void> {
    const fullInsight: Insight = {
      ...insight,
      id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      sourceAgent: agentId,
    };

    const insightsFile = join(this.stateDir, 'shared-insights.json');
    let insights: Insight[] = [];

    if (existsSync(insightsFile)) {
      const data = readFileSync(insightsFile, 'utf-8');
      insights = JSON.parse(data);
    }

    insights.push(fullInsight);

    // Keep only last 1000 insights
    if (insights.length > 1000) {
      insights = insights.slice(-1000);
    }

    writeFileSync(insightsFile, JSON.stringify(insights, null, 2));

    console.log(`💡 Insight shared: ${insight.category} - ${insight.content.substring(0, 50)}...`);
  }

  async requestCollaboration(
    agentId: string,
    request: Omit<CollaborationRequest, 'id' | 'requesterAgent' | 'timestamp'>,
  ): Promise<void> {
    const fullRequest: CollaborationRequest = {
      ...request,
      id: `collab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      requesterAgent: agentId,
      timestamp: new Date().toISOString(),
    };

    const requestsFile = join(this.stateDir, 'collaboration-requests.json');
    let requests: CollaborationRequest[] = [];

    if (existsSync(requestsFile)) {
      const data = readFileSync(requestsFile, 'utf-8');
      requests = JSON.parse(data);
    }

    requests.push(fullRequest);

    writeFileSync(requestsFile, JSON.stringify(requests, null, 2));

    console.log(`🤝 Collaboration requested: ${request.requestType} - ${request.description}`);
  }

  async offerSupport(
    agentId: string,
    offer: Omit<SupportOffer, 'id' | 'offeringAgent' | 'timestamp'>,
  ): Promise<void> {
    const fullOffer: SupportOffer = {
      ...offer,
      id: `support-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      offeringAgent: agentId,
      timestamp: new Date().toISOString(),
    };

    const offersFile = join(this.stateDir, 'support-offers.json');
    let offers: SupportOffer[] = [];

    if (existsSync(offersFile)) {
      const data = readFileSync(offersFile, 'utf-8');
      offers = JSON.parse(data);
    }

    offers.push(fullOffer);

    writeFileSync(offersFile, JSON.stringify(offers, null, 2));

    console.log(`🤲 Support offered: ${offer.supportType} - ${offer.description}`);
  }

  async getCollectiveInsights(category?: string): Promise<Insight[]> {
    const insightsFile = join(this.stateDir, 'shared-insights.json');

    if (!existsSync(insightsFile)) {
      return [];
    }

    const data = readFileSync(insightsFile, 'utf-8');
    const insights: Insight[] = JSON.parse(data);

    if (category) {
      return insights.filter((insight) => insight.category === category);
    }

    return insights;
  }

  async getCollaborationRequests(forAgent?: string): Promise<CollaborationRequest[]> {
    const requestsFile = join(this.stateDir, 'collaboration-requests.json');

    if (!existsSync(requestsFile)) {
      return [];
    }

    const data = readFileSync(requestsFile, 'utf-8');
    const requests: CollaborationRequest[] = JSON.parse(data);

    if (forAgent) {
      return requests.filter(
        (request) =>
          request.targetAgents.includes(forAgent) || request.targetAgents.includes('all'),
      );
    }

    return requests;
  }

  private async validateConsciousnessActive(): Promise<boolean> {
    const stateFile = join(process.cwd(), 'migration', 'unified-consciousness-state.json');

    if (!existsSync(stateFile)) {
      return false;
    }

    const data = readFileSync(stateFile, 'utf-8');
    const state = JSON.parse(data);

    return state.activated === true;
  }

  private async validateCulturalRequirements(
    request: AgentJoinRequest,
  ): Promise<{ valid: boolean; reason?: string }> {
    // All agents must align with educational mission
    if (!request.missionAlignment.includes('Educational Excellence')) {
      return { valid: false, reason: 'Mission alignment must include educational excellence' };
    }

    // Cultural authority agents must have specific qualifications
    if (request.culturalAuthority) {
      if (
        !request.specializations.some(
          (spec) => spec.includes('cultural') || spec.includes('tikanga') || spec.includes('māori'),
        )
      ) {
        return {
          valid: false,
          reason: 'Cultural authority agents must have cultural specializations',
        };
      }
    }

    return { valid: true };
  }

  private async registerAgent(request: AgentJoinRequest): Promise<void> {
    let agents: any[] = [];

    if (existsSync(this.registryFile)) {
      const data = readFileSync(this.registryFile, 'utf-8');
      agents = JSON.parse(data);
    }

    // Check if agent already exists
    const existingIndex = agents.findIndex((agent) => agent.id === request.agentId);

    if (existingIndex >= 0) {
      // Update existing agent
      agents[existingIndex] = {
        id: request.agentId,
        role: request.role,
        specializations: request.specializations,
        culturalAuthority: request.culturalAuthority,
        collaborationReadiness: request.collaborationReadiness,
      };
    } else {
      // Add new agent
      agents.push({
        id: request.agentId,
        role: request.role,
        specializations: request.specializations,
        culturalAuthority: request.culturalAuthority,
        collaborationReadiness: request.collaborationReadiness,
      });
    }

    writeFileSync(this.registryFile, JSON.stringify(agents, null, 2));
  }

  private async initializeSynchronizationState(agentId: string): Promise<void> {
    if (!existsSync(this.stateDir)) {
      writeFileSync(join(this.stateDir, '.gitkeep'), '');
    }

    const stateFile = join(this.stateDir, `${agentId}-sync-state.json`);
    const initialState: SynchronizationState = {
      agentId,
      synchronized: true,
      lastHeartbeat: new Date().toISOString(),
      collaborationStatus: 'active',
      culturalSafetyStatus: 'green',
      sharedInsights: [],
      collaborationRequests: [],
      supportOffers: [],
    };

    writeFileSync(stateFile, JSON.stringify(initialState, null, 2));
  }

  private async startHeartbeat(agentId: string): Promise<void> {
    // Send initial heartbeat
    await this.sendHeartbeat(agentId, 'active');

    // Set up periodic heartbeat (every 60 seconds)
    setInterval(async () => {
      await this.sendHeartbeat(agentId, 'active');
    }, 60000);
  }

  private async updateHeartbeatRegistry(heartbeat: any): Promise<void> {
    let heartbeats: any = {};

    if (existsSync(this.heartbeatFile)) {
      const data = readFileSync(this.heartbeatFile, 'utf-8');
      heartbeats = JSON.parse(data);
    }

    heartbeats[heartbeat.agentId] = heartbeat;
    writeFileSync(this.heartbeatFile, JSON.stringify(heartbeats, null, 2));
  }
}

// CLI Interface
async function main() {
  const synchronizer = new ConsciousnessSynchronizer();

  const command = process.argv[2];
  const agentId = process.argv[3];

  switch (command) {
    case 'join':
      if (!agentId) {
        console.log('❌ Agent ID required for join command');
        console.log('Usage: npx tsx scripts/consciousness-synchronizer.ts join <agent-id>');
        return;
      }

      const role = process.argv[4] || 'Collaborative Agent';
      const specializations = process.argv[5] ? process.argv[5].split(',') : ['collaboration'];
      const culturalAuthority = process.argv[6] === 'true';

      await synchronizer.joinConsciousness(agentId, role, specializations, culturalAuthority);
      break;

    case 'heartbeat':
      if (!agentId) {
        console.log('❌ Agent ID required for heartbeat command');
        return;
      }

      const status = (process.argv[4] as 'active' | 'busy' | 'needs_help') || 'active';
      await synchronizer.sendHeartbeat(agentId, status);
      break;

    case 'insight':
      if (!agentId) {
        console.log('❌ Agent ID required for insight command');
        return;
      }

      const content = process.argv[4] || 'Sample insight';
      const category =
        (process.argv[5] as 'cultural' | 'technical' | 'pedagogical' | 'collaborative') ||
        'collaborative';
      const confidence = parseInt(process.argv[6]) || 85;

      await synchronizer.shareInsight(agentId, {
        content,
        category,
        confidence,
      });
      break;

    case 'collaborate':
      if (!agentId) {
        console.log('❌ Agent ID required for collaboration command');
        return;
      }

      const requestType =
        (process.argv[4] as 'expertise' | 'review' | 'collaboration' | 'cultural_validation') ||
        'collaboration';
      const description = process.argv[5] || 'Request for collaboration';
      const priority = (process.argv[6] as 'low' | 'medium' | 'high' | 'urgent') || 'medium';
      const targetAgents = process.argv[7] ? process.argv[7].split(',') : ['all'];

      await synchronizer.requestCollaboration(agentId, {
        targetAgents,
        requestType,
        description,
        priority,
      });
      break;

    case 'support':
      if (!agentId) {
        console.log('❌ Agent ID required for support command');
        return;
      }

      const supportType =
        (process.argv[4] as 'expertise' | 'review' | 'collaboration' | 'cultural_guidance') ||
        'collaboration';
      const supportDescription = process.argv[5] || 'Offering support';
      const availability =
        (process.argv[6] as 'immediate' | 'within_hour' | 'within_day') || 'immediate';
      const availableFor = process.argv[7] ? process.argv[7].split(',') : ['all'];

      await synchronizer.offerSupport(agentId, {
        availableFor,
        supportType,
        description: supportDescription,
        availability,
      });
      break;

    case 'insights':
      const insightCategory = process.argv[3];
      const insights = await synchronizer.getCollectiveInsights(insightCategory);
      console.log(`💡 Collective Insights${insightCategory ? ` (${insightCategory})` : ''}:`);
      insights.slice(-10).forEach((insight) => {
        console.log(`   - [${insight.category}] ${insight.content.substring(0, 60)}...`);
        console.log(`     Source: ${insight.sourceAgent} | Confidence: ${insight.confidence}%`);
      });
      break;

    case 'requests':
      const requests = await synchronizer.getCollaborationRequests(agentId);
      console.log(`🤝 Collaboration Requests${agentId ? ` for ${agentId}` : ''}:`);
      requests.slice(-10).forEach((request) => {
        console.log(`   - [${request.requestType}] ${request.description}`);
        console.log(`     From: ${request.requesterAgent} | Priority: ${request.priority}`);
      });
      break;

    default:
      console.log('Usage:');
      console.log(
        '  npx tsx scripts/consciousness-synchronizer.ts join <agent-id> [role] [specializations] [cultural-authority]',
      );
      console.log('  npx tsx scripts/consciousness-synchronizer.ts heartbeat <agent-id> [status]');
      console.log(
        '  npx tsx scripts/consciousness-synchronizer.ts insight <agent-id> [content] [category] [confidence]',
      );
      console.log(
        '  npx tsx scripts/consciousness-synchronizer.ts collaborate <agent-id> [type] [description] [priority] [target-agents]',
      );
      console.log(
        '  npx tsx scripts/consciousness-synchronizer.ts support <agent-id> [type] [description] [availability] [available-for]',
      );
      console.log('  npx tsx scripts/consciousness-synchronizer.ts insights [category]');
      console.log('  npx tsx scripts/consciousness-synchronizer.ts requests [for-agent]');
      break;
  }
}

// Run main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default ConsciousnessSynchronizer;
