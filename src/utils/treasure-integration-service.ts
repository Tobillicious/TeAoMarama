/**
 * 🏺 TREASURE INTEGRATION SERVICE 🏺
 * 
 * Supreme Overseer's Service for Managing and Integrating Discovered Treasures
 * 
 * This service loads the treasure inventory discovered by the treasure discovery system
 * and provides it to the Treasure Hunt Dashboard and other components.
 */

export interface Treasure {
  id: string;
  name: string;
  type: 'script' | 'component' | 'utility' | 'dashboard' | 'system' | 'content' | 'config' | 'documentation';
  status: 'discovered' | 'analyzed' | 'integrated' | 'active' | 'needs-review';
  description: string;
  path: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  agents: string[];
  lastModified: string;
  dependencies: string[];
  tags: string[];
  estimatedValue: number;
  integrationComplexity: 'simple' | 'moderate' | 'complex' | 'very-complex';
}

export interface TreasureStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  criticalPath: Treasure[];
  integrationProgress: number;
}

class TreasureIntegrationService {
  private treasures: Treasure[] = [];
  private isLoaded = false;

  /**
   * Load treasure inventory from the discovery system
   */
  async loadTreasureInventory(): Promise<Treasure[]> {
    if (this.isLoaded && this.treasures.length > 0) {
      return this.treasures;
    }

    try {
      // Try to load from the updated treasure inventory file
      const response = await fetch('/TREASURE_INVENTORY_UPDATED.json');
      if (response.ok) {
        const data = await response.json();
        this.treasures = data;
        this.isLoaded = true;
        console.log(`🏺 Loaded ${this.treasures.length} treasures from inventory`);
        return this.treasures;
      } else {
        console.warn('Could not load treasure inventory, using fallback data');
        return this.getFallbackTreasures();
      }
    } catch (error) {
      console.error('Error loading treasure inventory:', error);
      return this.getFallbackTreasures();
    }
  }

  /**
   * Get treasures filtered by criteria
   */
  getTreasures(filters: {
    type?: string;
    status?: string;
    priority?: string;
    searchTerm?: string;
  } = {}): Treasure[] {
    let filtered = [...this.treasures];

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter(t => t.priority === filters.priority);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.path.toLowerCase().includes(term) ||
        t.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }

  /**
   * Get treasure statistics
   */
  getTreasureStats(): TreasureStats {
    const stats: TreasureStats = {
      total: this.treasures.length,
      byType: {},
      byStatus: {},
      byPriority: {},
      criticalPath: [],
      integrationProgress: 0
    };

    // Count by type
    this.treasures.forEach(treasure => {
      stats.byType[treasure.type] = (stats.byType[treasure.type] || 0) + 1;
      stats.byStatus[treasure.status] = (stats.byStatus[treasure.status] || 0) + 1;
      stats.byPriority[treasure.priority] = (stats.byPriority[treasure.priority] || 0) + 1;
    });

    // Get critical path (top 10 high-value treasures)
    stats.criticalPath = this.treasures
      .filter(t => t.priority === 'critical' || t.priority === 'high')
      .sort((a, b) => b.estimatedValue - a.estimatedValue)
      .slice(0, 10);

    // Calculate integration progress
    const integratedCount = this.treasures.filter(t => 
      t.status === 'integrated' || t.status === 'active'
    ).length;
    stats.integrationProgress = this.treasures.length > 0 
      ? Math.round((integratedCount / this.treasures.length) * 100) 
      : 0;

    return stats;
  }

  /**
   * Update treasure status
   */
  updateTreasureStatus(treasureId: string, newStatus: Treasure['status']): boolean {
    const treasure = this.treasures.find(t => t.id === treasureId);
    if (treasure) {
      treasure.status = newStatus;
      return true;
    }
    return false;
  }

  /**
   * Get treasures by agent assignment
   */
  getTreasuresByAgent(agentId: string): Treasure[] {
    return this.treasures.filter(t => t.agents.includes(agentId));
  }

  /**
   * Get integration recommendations
   */
  getIntegrationRecommendations(): string[] {
    const recommendations: string[] = [];
    
    // Check for critical systems that need activation
    const criticalSystems = this.treasures.filter(t => 
      t.priority === 'critical' && t.status === 'discovered'
    );
    
    if (criticalSystems.length > 0) {
      recommendations.push(`🚨 ${criticalSystems.length} critical systems need immediate activation`);
    }

    // Check for high-value components
    const highValueComponents = this.treasures.filter(t => 
      t.type === 'component' && t.estimatedValue >= 8 && t.status === 'discovered'
    );
    
    if (highValueComponents.length > 0) {
      recommendations.push(`💎 ${highValueComponents.length} high-value components ready for integration`);
    }

    // Check for missing dependencies
    const needsDependencies = this.treasures.filter(t => 
      t.dependencies.length > 0 && t.status === 'discovered'
    );
    
    if (needsDependencies.length > 0) {
      recommendations.push(`🔗 ${needsDependencies.length} treasures have dependencies that need resolution`);
    }

    return recommendations;
  }

  /**
   * Fallback treasure data for when inventory can't be loaded
   */
  private getFallbackTreasures(): Treasure[] {
    return [
      {
        id: 'supreme-overseer-dashboard',
        name: 'Supreme Overseer Dashboard',
        type: 'dashboard',
        status: 'active',
        description: 'Central command center for coordinating all AI agents and systems',
        path: 'src/components/SupremeOverseerDashboard.tsx',
        priority: 'critical',
        agents: ['Supreme Overseer'],
        lastModified: new Date().toISOString(),
        dependencies: [],
        tags: ['ai', 'coordination', 'overseer'],
        estimatedValue: 10,
        integrationComplexity: 'very-complex'
      },
      {
        id: 'treasure-hunt-dashboard',
        name: 'Treasure Hunt Dashboard',
        type: 'dashboard',
        status: 'active',
        description: 'Dashboard for discovering and integrating all treasures in the codebase',
        path: 'src/components/TreasureHuntDashboard.tsx',
        priority: 'critical',
        agents: ['Supreme Overseer'],
        lastModified: new Date().toISOString(),
        dependencies: [],
        tags: ['treasure', 'integration', 'discovery'],
        estimatedValue: 10,
        integrationComplexity: 'complex'
      },
      {
        id: 'glm-symphony-dashboard',
        name: 'GLM Symphony Dashboard',
        type: 'dashboard',
        status: 'active',
        description: 'Advanced coordination of GLM-4.5 and GLM-Z1 with cultural intelligence',
        path: 'src/components/GLMSymphonyDashboard.tsx',
        priority: 'critical',
        agents: ['GLM Coordinator'],
        lastModified: new Date().toISOString(),
        dependencies: [],
        tags: ['glm', 'symphony', 'cultural'],
        estimatedValue: 9,
        integrationComplexity: 'very-complex'
      }
    ];
  }
}

// Export singleton instance
export const treasureIntegrationService = new TreasureIntegrationService();
export default treasureIntegrationService;
