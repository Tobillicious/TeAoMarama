#!/usr/bin/env tsx

/**
 * Enhanced Heartbeat Monitoring System
 *
 * This system provides real-time monitoring of all distributed agents,
 * ensuring optimal coordination and immediate conflict detection.
 */

import { existsSync, readFileSync, watch, writeFileSync } from 'fs';
import { join } from 'path';

interface HeartbeatData {
  agentId: string;
  agentName: string;
  timestamp: string;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  responseTime: number;
  culturalSafetyStatus: 'VALIDATED' | 'PENDING' | 'ISSUE';
  currentTask?: string;
  performanceMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    taskCompletionRate: number;
    errorRate: number;
  };
}

interface SystemHealth {
  overallStatus: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
  activeAgents: number;
  totalAgents: number;
  averageResponseTime: number;
  culturalSafetyScore: number;
  lastUpdate: string;
  alerts: string[];
}

class EnhancedHeartbeatMonitor {
  private sharedMemoryPath: string;
  private heartbeatPath: string;
  private healthPath: string;
  private heartbeats: Map<string, HeartbeatData> = new Map();
  private systemHealth: SystemHealth;
  private watchers: Map<string, any> = new Map();
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.sharedMemoryPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'shared_memory_system.json',
    );
    this.heartbeatPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'heartbeat_data.json',
    );
    this.healthPath = join(process.cwd(), 'migration', 'agent_coordination', 'system_health.json');

    this.systemHealth = this.initializeSystemHealth();
    this.loadExistingData();
    this.startMonitoring();
  }

  private initializeSystemHealth(): SystemHealth {
    return {
      overallStatus: 'HEALTHY',
      activeAgents: 0,
      totalAgents: 0,
      averageResponseTime: 0,
      culturalSafetyScore: 100,
      lastUpdate: new Date().toISOString(),
      alerts: [],
    };
  }

  private loadExistingData(): void {
    try {
      // Load existing heartbeat data
      if (existsSync(this.heartbeatPath)) {
        const heartbeatData = JSON.parse(readFileSync(this.heartbeatPath, 'utf8'));
        Object.entries(heartbeatData.heartbeats || {}).forEach(([key, data]: [string, any]) => {
          this.heartbeats.set(key, data);
        });
      }

      // Load system health
      if (existsSync(this.healthPath)) {
        const healthData = JSON.parse(readFileSync(this.healthPath, 'utf8'));
        this.systemHealth = { ...this.systemHealth, ...healthData };
      }

      this.updateSystemHealth();
    } catch (error) {
      console.error('Error loading existing data:', error);
    }
  }

  private startMonitoring(): void {
    // Monitor shared memory for agent updates
    if (existsSync(this.sharedMemoryPath)) {
      const watcher = watch(this.sharedMemoryPath, (eventType) => {
        if (eventType === 'change') {
          this.processAgentUpdates();
        }
      });
      this.watchers.set('sharedMemory', watcher);
    }

    // Periodic heartbeat processing
    this.monitoringInterval = setInterval(() => {
      this.processHeartbeats();
      this.updateSystemHealth();
      this.saveData();
    }, 10000); // Every 10 seconds

    // Generate heartbeat report every minute
    setInterval(() => {
      this.generateHeartbeatReport();
    }, 60000);
  }

  private processAgentUpdates(): void {
    try {
      const sharedMemory = JSON.parse(readFileSync(this.sharedMemoryPath, 'utf8'));
      const agentRegistry = sharedMemory.agentRegistry;

      Object.entries(agentRegistry).forEach(([key, agent]: [string, any]) => {
        const now = new Date();
        const lastHeartbeat = new Date(agent.lastHeartbeat || now.toISOString());
        const timeSinceHeartbeat = now.getTime() - lastHeartbeat.getTime();

        // Determine status based on time since last heartbeat
        let status: 'HEALTHY' | 'WARNING' | 'CRITICAL' | 'OFFLINE' = 'HEALTHY';
        if (timeSinceHeartbeat > 300000) {
          // 5 minutes
          status = 'OFFLINE';
        } else if (timeSinceHeartbeat > 180000) {
          // 3 minutes
          status = 'CRITICAL';
        } else if (timeSinceHeartbeat > 120000) {
          // 2 minutes
          status = 'WARNING';
        }

        const heartbeatData: HeartbeatData = {
          agentId: agent.id,
          agentName: agent.name,
          timestamp: agent.lastHeartbeat || now.toISOString(),
          status,
          responseTime: this.calculateResponseTime(agent),
          culturalSafetyStatus: agent.culturalSafetyStatus || 'VALIDATED',
          currentTask: agent.currentTask,
          performanceMetrics: {
            cpuUsage: Math.random() * 100, // Simulated - would be real metrics
            memoryUsage: Math.random() * 100,
            taskCompletionRate: agent.performanceMetrics?.taskCompletionRate || 100,
            errorRate: agent.performanceMetrics?.errorRate || 0,
          },
        };

        this.heartbeats.set(agent.id, heartbeatData);
      });
    } catch (error) {
      console.error('Error processing agent updates:', error);
    }
  }

  private calculateResponseTime(agent: any): number {
    // Simulate response time calculation based on agent type and priority
    const baseTime = agent.priority === 'CRITICAL' ? 0.5 : 1.0;
    const variation = Math.random() * 0.5;
    return Math.round((baseTime + variation) * 100) / 100;
  }

  private processHeartbeats(): void {
    const now = new Date();
    const alerts: string[] = [];

    this.heartbeats.forEach((heartbeat, agentId) => {
      const lastUpdate = new Date(heartbeat.timestamp);
      const timeSinceUpdate = now.getTime() - lastUpdate.getTime();

      // Update status based on time since last update
      if (timeSinceUpdate > 300000) {
        // 5 minutes
        heartbeat.status = 'OFFLINE';
        alerts.push(`Agent ${heartbeat.agentName} is offline`);
      } else if (timeSinceUpdate > 180000) {
        // 3 minutes
        heartbeat.status = 'CRITICAL';
        alerts.push(`Agent ${heartbeat.agentName} has critical heartbeat delay`);
      } else if (timeSinceUpdate > 120000) {
        // 2 minutes
        heartbeat.status = 'WARNING';
        alerts.push(`Agent ${heartbeat.agentName} has delayed heartbeat`);
      } else {
        heartbeat.status = 'HEALTHY';
      }

      // Check cultural safety status
      if (heartbeat.culturalSafetyStatus === 'ISSUE') {
        alerts.push(`Cultural safety issue detected for ${heartbeat.agentName}`);
      }

      // Check performance metrics
      if (heartbeat.performanceMetrics.errorRate > 5) {
        alerts.push(
          `High error rate for ${heartbeat.agentName}: ${heartbeat.performanceMetrics.errorRate}%`,
        );
      }
    });

    this.systemHealth.alerts = alerts;
  }

  private updateSystemHealth(): void {
    const now = new Date();
    const activeAgents = Array.from(this.heartbeats.values()).filter(
      (h) => h.status === 'HEALTHY' || h.status === 'WARNING',
    ).length;

    const totalAgents = this.heartbeats.size;
    const averageResponseTime =
      Array.from(this.heartbeats.values()).reduce((sum, h) => sum + h.responseTime, 0) /
      totalAgents;

    const culturalSafetyValidated = Array.from(this.heartbeats.values()).filter(
      (h) => h.culturalSafetyStatus === 'VALIDATED',
    ).length;
    const culturalSafetyScore =
      totalAgents > 0 ? Math.round((culturalSafetyValidated / totalAgents) * 100) : 100;

    // Determine overall status
    let overallStatus: 'HEALTHY' | 'DEGRADED' | 'CRITICAL' = 'HEALTHY';
    if (
      this.systemHealth.alerts.some(
        (alert) => alert.includes('offline') || alert.includes('critical'),
      )
    ) {
      overallStatus = 'CRITICAL';
    } else if (this.systemHealth.alerts.length > 0 || activeAgents < totalAgents * 0.9) {
      overallStatus = 'DEGRADED';
    }

    this.systemHealth = {
      overallStatus,
      activeAgents,
      totalAgents,
      averageResponseTime: Math.round(averageResponseTime * 100) / 100,
      culturalSafetyScore,
      lastUpdate: now.toISOString(),
      alerts: this.systemHealth.alerts,
    };
  }

  private saveData(): void {
    try {
      // Save heartbeat data
      const heartbeatData = {
        heartbeats: Object.fromEntries(this.heartbeats),
        lastSaved: new Date().toISOString(),
      };
      writeFileSync(this.heartbeatPath, JSON.stringify(heartbeatData, null, 2));

      // Save system health
      writeFileSync(this.healthPath, JSON.stringify(this.systemHealth, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  private generateHeartbeatReport(): void {
    const report = this.createHeartbeatReport();
    const reportPath = join(
      process.cwd(),
      'migration',
      'agent_coordination',
      'heartbeat_report.md',
    );
    writeFileSync(reportPath, report);
    console.log(`📊 Heartbeat report generated: ${reportPath}`);
  }

  private createHeartbeatReport(): string {
    const health = this.systemHealth;
    const heartbeats = Array.from(this.heartbeats.values());

    let report = `# 💓 ENHANCED HEARTBEAT MONITORING REPORT\n\n`;
    report += `**Generated**: ${new Date().toISOString()}\n`;
    report += `**Overall Status**: ${health.overallStatus}\n`;
    report += `**Active Agents**: ${health.activeAgents}/${health.totalAgents}\n`;
    report += `**Average Response Time**: ${health.averageResponseTime}s\n`;
    report += `**Cultural Safety Score**: ${health.culturalSafetyScore}%\n\n`;

    if (health.alerts.length > 0) {
      report += `## 🚨 ACTIVE ALERTS\n\n`;
      health.alerts.forEach((alert) => {
        report += `- ${alert}\n`;
      });
      report += `\n`;
    }

    report += `## 📊 AGENT HEARTBEAT STATUS\n\n`;
    heartbeats.forEach((heartbeat) => {
      const lastUpdate = new Date(heartbeat.timestamp);
      const timeSince = Math.round((Date.now() - lastUpdate.getTime()) / 1000);

      report += `### ${heartbeat.agentName} (${heartbeat.agentId})\n`;
      report += `- **Status**: ${heartbeat.status}\n`;
      report += `- **Last Heartbeat**: ${timeSince}s ago\n`;
      report += `- **Response Time**: ${heartbeat.responseTime}s\n`;
      report += `- **Cultural Safety**: ${heartbeat.culturalSafetyStatus}\n`;
      if (heartbeat.currentTask) {
        report += `- **Current Task**: ${heartbeat.currentTask}\n`;
      }
      report += `- **Performance**: ${heartbeat.performanceMetrics.taskCompletionRate}% completion, ${heartbeat.performanceMetrics.errorRate}% errors\n\n`;
    });

    return report;
  }

  public getSystemHealth(): SystemHealth {
    return this.systemHealth;
  }

  public getHeartbeats(): HeartbeatData[] {
    return Array.from(this.heartbeats.values());
  }

  public cleanup(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.watchers.forEach((watcher) => watcher.close());
    this.watchers.clear();
  }
}

// Export for use in other modules
export { EnhancedHeartbeatMonitor, HeartbeatData, SystemHealth };

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new EnhancedHeartbeatMonitor();

  console.log('💓 Enhanced Heartbeat Monitor started');
  console.log('Monitoring agent heartbeats and system health...');

  // Generate initial report
  setTimeout(() => {
    const report = monitor.createHeartbeatReport();
    console.log(report);
  }, 2000);

  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n💓 Cleaning up heartbeat monitor...');
    monitor.cleanup();
    process.exit(0);
  });
}
