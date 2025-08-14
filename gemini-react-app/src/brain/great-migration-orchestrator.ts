/**
 * Great Migration Orchestrator
 * Coordinates the systematic migration from Te Kete Ako to TeAoMarama
 */

import { writeEpisode } from '../ai/provenance';

export interface AgentRole {
  name: string;
  capability: string;
  status: 'active' | 'dormant' | 'busy' | 'error';
  currentTask?: string;
}

export interface MigrationResource {
  id: string;
  title: string;
  type: 'lesson' | 'unit' | 'assessment' | 'handout' | 'multimedia';
  yearLevel: string;
  subject: string;
  culturalContent: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  assignedAgent?: string;
}

export interface GreatMigrationPlan {
  totalResources: number;
  resourcesCompleted: number;
  resourcesInProgress: number;
  resourcesPending: number;
  collaboratingAgents: AgentRole[];
}

export interface MigrationPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  resources: MigrationResource[];
  estimatedDuration: string;
  culturalSafetyRequired: boolean;
}

export class GreatMigrationOrchestrator {
  private plan: GreatMigrationPlan;
  private phases: MigrationPhase[];
  private isActive: boolean;

  constructor() {
    this.isActive = false;
    this.plan = {
      totalResources: 1061, // From the Great Migration status
      resourcesCompleted: 12,
      resourcesInProgress: 0,
      resourcesPending: 1049,
      collaboratingAgents: []
    };

    this.phases = this.initializeMigrationPhases();
  }

  private initializeMigrationPhases(): MigrationPhase[] {
    return [
      {
        id: 'foundation',
        name: 'Foundation & Infrastructure',
        description: 'Establish technical foundation and cultural protocols',
        status: 'completed',
        resources: [],
        estimatedDuration: '2 weeks',
        culturalSafetyRequired: true
      },
      {
        id: 'priority-content',
        name: 'Priority Content Migration',
        description: 'Migrate high-priority Y7-Y9 resources with cultural oversight',
        status: 'active',
        resources: [],
        estimatedDuration: '4 weeks',
        culturalSafetyRequired: true
      },
      {
        id: 'bulk-migration',
        name: 'Systematic Bulk Migration',
        description: 'Process remaining resources with automated systems',
        status: 'pending',
        resources: [],
        estimatedDuration: '6 weeks',
        culturalSafetyRequired: true
      },
      {
        id: 'validation',
        name: 'Cultural Validation & Quality Assurance',
        description: 'Final review and validation of all migrated content',
        status: 'pending',
        resources: [],
        estimatedDuration: '3 weeks',
        culturalSafetyRequired: true
      }
    ];
  }

  async activate(): Promise<{ success: boolean; message: string }> {
    try {
      console.log('\n🚀 ACTIVATING GREAT MIGRATION ORCHESTRATOR 🚀');
      
      await writeEpisode('migration', {
        agent: 'GreatMigrationOrchestrator',
        context: {
          phase: 'activation',
          details: { totalResources: this.plan.totalResources },
          metadata: { timestamp: new Date().toISOString() }
        },
        outcome: {
          success: true,
          message: 'Great Migration Orchestrator activated',
          data: { plan: this.plan }
        }
      });

      this.isActive = true;
      return {
        success: true,
        message: 'Great Migration Orchestrator is now active and coordinating the migration from Te Kete Ako to TeAoMarama'
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to activate orchestrator: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async registerAgent(agent: AgentRole): Promise<void> {
    this.plan.collaboratingAgents.push(agent);
    
    await writeEpisode('collaboration', {
      agent: 'GreatMigrationOrchestrator',
      context: {
        phase: 'agent-registration',
        details: { agentName: agent.name, capability: agent.capability },
        metadata: { totalAgents: this.plan.collaboratingAgents.length }
      },
      outcome: {
        success: true,
        message: `Agent ${agent.name} registered for collaboration`,
        data: { agent }
      }
    });
  }

  async assignResourceToAgent(resourceId: string, agentName: string): Promise<boolean> {
    // Find resource and assign
    for (const phase of this.phases) {
      const resource = phase.resources.find(r => r.id === resourceId);
      if (resource) {
        resource.assignedAgent = agentName;
        resource.status = 'in-progress';
        this.plan.resourcesInProgress++;
        this.plan.resourcesPending--;
        
        await writeEpisode('migration', {
          agent: 'GreatMigrationOrchestrator',
          context: {
            phase: 'resource-assignment',
            details: { resourceId, agentName, resourceTitle: resource.title },
            metadata: { phase: phase.name }
          },
          outcome: {
            success: true,
            message: `Resource ${resource.title} assigned to ${agentName}`
          }
        });
        
        return true;
      }
    }
    return false;
  }

  getMigrationStatus(): GreatMigrationPlan {
    return { ...this.plan };
  }

  getActivePhase(): MigrationPhase | null {
    return this.phases.find(phase => phase.status === 'active') || null;
  }

  isOperational(): boolean {
    return this.isActive;
  }
}

// Global orchestrator instance
const globalOrchestrator = new GreatMigrationOrchestrator();

export async function beginGreatMigration(): Promise<{ success: boolean; message: string }> {
  console.log('\n🌟 Beginning the Great Migration from Te Kete Ako to TeAoMarama...');
  return await globalOrchestrator.activate();
}

export function getGlobalOrchestrator(): GreatMigrationOrchestrator {
  return globalOrchestrator;
}

export { globalOrchestrator };
