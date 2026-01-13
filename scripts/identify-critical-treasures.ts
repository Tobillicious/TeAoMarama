#!/usr/bin/env tsx

/**
 * 🔍 CRITICAL TREASURE IDENTIFIER
 * 
 * This script analyzes the treasure inventory to identify critical systems
 * that need immediate activation for the educational platform.
 */

import { readFileSync, writeFileSync } from 'fs';

interface Treasure {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  path: string;
  priority: string;
  agents: string[];
  lastModified: string;
  dependencies: string[];
  tags: string[];
  estimatedValue: number;
  integrationComplexity: string;
}

class CriticalTreasureIdentifier {
  private treasures: Treasure[] = [];

  constructor() {
    console.log('🔍 CRITICAL TREASURE IDENTIFIER INITIALIZED');
    this.loadTreasureInventory();
  }

  private loadTreasureInventory(): void {
    try {
      const data = readFileSync('TREASURE_INVENTORY.json', 'utf8');
      this.treasures = JSON.parse(data);
      console.log(`📦 Loaded ${this.treasures.length} treasures for analysis`);
    } catch (error) {
      console.error('❌ Failed to load treasure inventory:', error);
      process.exit(1);
    }
  }

  /**
   * Identify critical treasures based on keywords and patterns
   */
  identifyCriticalTreasures(): void {
    console.log('\n🔍 ANALYZING TREASURES FOR CRITICAL SYSTEMS...\n');

    const criticalKeywords = [
      'overseer', 'supreme', 'coordination', 'symphony', 'glm', 'orchestrator',
      'royal', 'superintelligence', 'empire', 'command', 'master', 'control',
      'unified', 'agent', 'ai', 'llm', 'cultural', 'maori', 'education',
      'teacher', 'student', 'dashboard', 'system', 'core', 'essential'
    ];

    const highValueKeywords = [
      'enhanced', 'advanced', 'professional', 'real', 'authentic', 'comprehensive',
      'integration', 'coordination', 'management', 'monitoring', 'analytics'
    ];

    const criticalTreasures: Treasure[] = [];
    const highValueTreasures: Treasure[] = [];
    const mediumTreasures: Treasure[] = [];

    for (const treasure of this.treasures) {
      const searchText = `${treasure.name} ${treasure.description} ${treasure.path}`.toLowerCase();
      
      // Check for critical keywords
      const hasCriticalKeywords = criticalKeywords.some(keyword => 
        searchText.includes(keyword)
      );

      // Check for high-value keywords
      const hasHighValueKeywords = highValueKeywords.some(keyword => 
        searchText.includes(keyword)
      );

      // Check for specific critical patterns
      const isCriticalPattern = this.isCriticalPattern(treasure);

      if (isCriticalPattern || hasCriticalKeywords) {
        treasure.priority = 'critical';
        criticalTreasures.push(treasure);
      } else if (hasHighValueKeywords || treasure.type === 'dashboard' || treasure.type === 'system') {
        treasure.priority = 'high';
        highValueTreasures.push(treasure);
      } else {
        treasure.priority = 'medium';
        mediumTreasures.push(treasure);
      }
    }

    // Update the treasure inventory with new priorities
    this.updateTreasurePriorities(criticalTreasures, highValueTreasures, mediumTreasures);

    // Generate report
    this.generateCriticalTreasureReport(criticalTreasures, highValueTreasures, mediumTreasures);
  }

  private isCriticalPattern(treasure: Treasure): boolean {
    // Specific patterns that indicate critical systems
    const criticalPatterns = [
      /overseer/i,
      /supreme/i,
      /symphony/i,
      /coordination/i,
      /unified.*agent/i,
      /glm.*symphony/i,
      /royal.*development/i,
      /superintelligence/i,
      /empire.*command/i,
      /master.*control/i
    ];

    const searchText = `${treasure.name} ${treasure.description} ${treasure.path}`;
    return criticalPatterns.some(pattern => pattern.test(searchText));
  }

  private updateTreasurePriorities(
    criticalTreasures: Treasure[],
    highValueTreasures: Treasure[],
    mediumTreasures: Treasure[]
  ): void {
    // Create updated treasure inventory
    const updatedTreasures = [...criticalTreasures, ...highValueTreasures, ...mediumTreasures];
    
    // Save updated inventory
    writeFileSync('TREASURE_INVENTORY_UPDATED.json', JSON.stringify(updatedTreasures, null, 2));
    
    console.log('✅ Updated treasure inventory saved to TREASURE_INVENTORY_UPDATED.json');
  }

  private generateCriticalTreasureReport(
    criticalTreasures: Treasure[],
    highValueTreasures: Treasure[],
    mediumTreasures: Treasure[]
  ): void {
    console.log('🏆 CRITICAL TREASURE ANALYSIS REPORT');
    console.log('=====================================');
    console.log(`🔥 Critical Priority: ${criticalTreasures.length}`);
    console.log(`⚡ High Priority: ${highValueTreasures.length}`);
    console.log(`📊 Medium Priority: ${mediumTreasures.length}`);
    console.log(`📚 Low Priority: 0 (All reclassified)`);
    
    console.log('\n🎯 TOP CRITICAL TREASURES:');
    criticalTreasures.slice(0, 10).forEach((treasure, index) => {
      console.log(`${index + 1}. ${treasure.name} (${treasure.type})`);
      console.log(`   Path: ${treasure.path}`);
      console.log(`   Description: ${treasure.description}`);
      console.log(`   Tags: ${treasure.tags.join(', ')}`);
      console.log('');
    });

    console.log('🚀 TOP HIGH-VALUE TREASURES:');
    highValueTreasures.slice(0, 10).forEach((treasure, index) => {
      console.log(`${index + 1}. ${treasure.name} (${treasure.type})`);
      console.log(`   Path: ${treasure.path}`);
      console.log('');
    });

    // Generate integration recommendations
    this.generateIntegrationRecommendations(criticalTreasures, highValueTreasures);
  }

  private generateIntegrationRecommendations(
    criticalTreasures: Treasure[],
    highValueTreasures: Treasure[]
  ): void {
    console.log('\n🚀 INTEGRATION RECOMMENDATIONS:');
    console.log('================================');
    
    const recommendations = [];

    // Critical system activation
    if (criticalTreasures.length > 0) {
      recommendations.push(`🚨 IMMEDIATE: Activate ${criticalTreasures.length} critical systems`);
    }

    // Dashboard integration
    const dashboards = highValueTreasures.filter(t => t.type === 'dashboard');
    if (dashboards.length > 0) {
      recommendations.push(`📊 HIGH PRIORITY: Integrate ${dashboards.length} dashboard components`);
    }

    // Script activation
    const scripts = criticalTreasures.filter(t => t.type === 'script');
    if (scripts.length > 0) {
      recommendations.push(`🚀 CRITICAL: Activate ${scripts.length} development scripts`);
    }

    // System coordination
    const systems = criticalTreasures.filter(t => t.type === 'system');
    if (systems.length > 0) {
      recommendations.push(`🧠 CRITICAL: Coordinate ${systems.length} AI systems`);
    }

    // Educational content
    const educationalContent = highValueTreasures.filter(t => 
      t.tags.includes('education') || t.tags.includes('teacher') || t.tags.includes('student')
    );
    if (educationalContent.length > 0) {
      recommendations.push(`📚 HIGH PRIORITY: Surface ${educationalContent.length} educational components`);
    }

    // Cultural integration
    const culturalContent = highValueTreasures.filter(t => 
      t.tags.includes('cultural') || t.tags.includes('maori')
    );
    if (culturalContent.length > 0) {
      recommendations.push(`🌿 HIGH PRIORITY: Integrate ${culturalContent.length} cultural components`);
    }

    recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    // Save recommendations
    const report = {
      timestamp: new Date().toISOString(),
      criticalTreasures: criticalTreasures.length,
      highValueTreasures: highValueTreasures.length,
      mediumTreasures: mediumTreasures.length,
      recommendations,
      criticalList: criticalTreasures.slice(0, 20).map(t => ({
        name: t.name,
        type: t.type,
        path: t.path,
        description: t.description
      })),
      highValueList: highValueTreasures.slice(0, 20).map(t => ({
        name: t.name,
        type: t.type,
        path: t.path,
        description: t.description
      }))
    };

    writeFileSync('CRITICAL_TREASURE_REPORT.json', JSON.stringify(report, null, 2));
    console.log('\n✅ Detailed report saved to CRITICAL_TREASURE_REPORT.json');
  }
}

// Execute the critical treasure identification
const identifier = new CriticalTreasureIdentifier();
identifier.identifyCriticalTreasures();

console.log('\n🎉 CRITICAL TREASURE IDENTIFICATION COMPLETE!');
console.log('Ready for integration phase!');
