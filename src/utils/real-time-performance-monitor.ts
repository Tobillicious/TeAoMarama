import { unifiedSuperintelligenceAPI } from './unified-superintelligence-api';
import { advancedEducationalCollaboration } from './advanced-educational-collaboration';
import { terminalCoordination } from './terminal-coordination';

export interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
  lastUpdated: Date;
  history: Array<{
    timestamp: Date;
    value: number;
  }>;
}

export interface SystemPerformanceSnapshot {
  timestamp: Date;
  overallHealth: number;
  superintelligenceMetrics: {
    totalIntelligences: number;
    activeIntelligences: number;
    averageCollaborationScore: number;
    averageEfficiency: number;
    culturalCompliance: number;
    educationalExcellence: number;
  };
  collaborationMetrics: {
    activeProtocols: number;
    activeSessions: number;
    completedSessions: number;
    averageCulturalSafety: number;
    averageEducationalQuality: number;
  };
  terminalMetrics: {
    activeTerminals: number;
    totalTasks: number;
    completedTasks: number;
    systemHealth: number;
  };
  resourceMetrics: {
    memoryUsage: number;
    cpuUsage: number;
    networkLatency: number;
    storageUsage: number;
  };
}

export interface PerformanceAlert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  metricId: string;
  currentValue: number;
  threshold: number;
  timestamp: Date;
  acknowledged: boolean;
  resolvedAt?: Date;
}

export interface OptimizationSuggestion {
  id: string;
  category: 'performance' | 'collaboration' | 'cultural' | 'educational';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  estimatedImprovement: number;
  createdAt: Date;
  implemented: boolean;
}

export class RealTimePerformanceMonitor {
  private static instance: RealTimePerformanceMonitor;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private alerts: Map<string, PerformanceAlert> = new Map();
  private optimizationSuggestions: Map<string, OptimizationSuggestion> = new Map();
  private performanceHistory: SystemPerformanceSnapshot[] = [];
  private monitoringInterval: NodeJS.Timeout | null = null;
  private isMonitoring = false;

  private constructor() {
    this.initializeMetrics();
  }

  public static getInstance(): RealTimePerformanceMonitor {
    if (!RealTimePerformanceMonitor.instance) {
      RealTimePerformanceMonitor.instance = new RealTimePerformanceMonitor();
    }
    return RealTimePerformanceMonitor.instance;
  }

  private initializeMetrics(): void {
    const baseMetrics: Omit<PerformanceMetric, 'value' | 'trend' | 'lastUpdated' | 'history'>[] = [
      {
        id: 'overall-system-health',
        name: 'Overall System Health',
        unit: '%',
        threshold: { warning: 80, critical: 60 },
      },
      {
        id: 'superintelligence-harmony',
        name: 'Superintelligence Harmony',
        unit: '%',
        threshold: { warning: 85, critical: 70 },
      },
      {
        id: 'cultural-compliance',
        name: 'Cultural Compliance Score',
        unit: '%',
        threshold: { warning: 90, critical: 80 },
      },
      {
        id: 'educational-excellence',
        name: 'Educational Excellence',
        unit: '%',
        threshold: { warning: 88, critical: 75 },
      },
      {
        id: 'collaboration-efficiency',
        name: 'Collaboration Efficiency',
        unit: '%',
        threshold: { warning: 85, critical: 70 },
      },
      {
        id: 'response-time',
        name: 'Average Response Time',
        unit: 'ms',
        threshold: { warning: 500, critical: 1000 },
      },
      {
        id: 'memory-usage',
        name: 'System Memory Usage',
        unit: '%',
        threshold: { warning: 80, critical: 90 },
      },
      {
        id: 'cpu-usage',
        name: 'System CPU Usage',
        unit: '%',
        threshold: { warning: 75, critical: 85 },
      },
      {
        id: 'active-sessions',
        name: 'Active Collaboration Sessions',
        unit: 'count',
        threshold: { warning: 10, critical: 15 },
      },
      {
        id: 'content-generation-rate',
        name: 'Content Generation Rate',
        unit: 'per hour',
        threshold: { warning: 5, critical: 2 },
      },
    ];

    baseMetrics.forEach(metric => {
      this.metrics.set(metric.id, {
        ...metric,
        value: 0,
        trend: 'stable',
        lastUpdated: new Date(),
        history: [],
      });
    });

    console.log('📊 Performance monitoring metrics initialized');
  }

  public startMonitoring(): void {
    if (this.isMonitoring) return;

    this.isMonitoring = true;
    console.log('🚀 Starting real-time performance monitoring');

    // Update metrics every 15 seconds
    this.monitoringInterval = setInterval(() => {
      this.updateMetrics();
    }, 15000);

    // Generate optimization suggestions every 2 minutes
    setInterval(() => {
      this.generateOptimizationSuggestions();
    }, 120000);

    // Cleanup old data every 10 minutes
    setInterval(() => {
      this.cleanupOldData();
    }, 600000);

    // Initial metrics update
    this.updateMetrics();
  }

  public stopMonitoring(): void {
    if (!this.isMonitoring) return;

    this.isMonitoring = false;
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    console.log('🛑 Performance monitoring stopped');
  }

  private async updateMetrics(): Promise<void> {
    try {
      // Gather data from various systems
      const superintelligenceStatus = unifiedSuperintelligenceAPI.getIntelligenceStatus();
      const collaborationMetrics = unifiedSuperintelligenceAPI.getCollaborationMetrics();
      const systemHealth = unifiedSuperintelligenceAPI.getSystemHealth();
      const terminalStatus = terminalCoordination.getSystemStatus();
      const educationCollabMetrics = advancedEducationalCollaboration.getCollaborationMetrics();

      // Update individual metrics
      this.updateMetric('overall-system-health', systemHealth.overall);
      this.updateMetric('superintelligence-harmony', collaborationMetrics.overallHarmony);
      this.updateMetric('cultural-compliance', collaborationMetrics.culturalCompliance);
      this.updateMetric('educational-excellence', collaborationMetrics.educationalExcellence);
      this.updateMetric('collaboration-efficiency', educationCollabMetrics.averageCollaboration);
      
      // Simulate system resource metrics
      this.updateMetric('response-time', 150 + Math.random() * 200);
      this.updateMetric('memory-usage', 60 + Math.random() * 20);
      this.updateMetric('cpu-usage', 40 + Math.random() * 30);
      this.updateMetric('active-sessions', educationCollabMetrics.activeSessions);
      this.updateMetric('content-generation-rate', 8 + Math.random() * 4);

      // Create system snapshot
      const snapshot: SystemPerformanceSnapshot = {
        timestamp: new Date(),
        overallHealth: systemHealth.overall,
        superintelligenceMetrics: {
          totalIntelligences: collaborationMetrics.totalIntelligences,
          activeIntelligences: superintelligenceStatus.filter(s => s.status === 'active').length,
          averageCollaborationScore: superintelligenceStatus.reduce((sum, s) => sum + s.collaborationScore, 0) / superintelligenceStatus.length,
          averageEfficiency: superintelligenceStatus.reduce((sum, s) => sum + s.performance.efficiency, 0) / superintelligenceStatus.length,
          culturalCompliance: collaborationMetrics.culturalCompliance,
          educationalExcellence: collaborationMetrics.educationalExcellence,
        },
        collaborationMetrics: {
          activeProtocols: educationCollabMetrics.activeProtocols,
          activeSessions: educationCollabMetrics.activeSessions,
          completedSessions: educationCollabMetrics.completedSessions,
          averageCulturalSafety: educationCollabMetrics.averageCulturalSafety,
          averageEducationalQuality: educationCollabMetrics.averageEducationalQuality,
        },
        terminalMetrics: {
          activeTerminals: terminalStatus.activeTerminals,
          totalTasks: terminalStatus.totalTasks,
          completedTasks: terminalStatus.completedTasks,
          systemHealth: terminalStatus.systemHealth,
        },
        resourceMetrics: {
          memoryUsage: this.metrics.get('memory-usage')?.value || 0,
          cpuUsage: this.metrics.get('cpu-usage')?.value || 0,
          networkLatency: this.metrics.get('response-time')?.value || 0,
          storageUsage: 45 + Math.random() * 15, // Simulated
        },
      };

      // Add to performance history (keep last 100 snapshots)
      this.performanceHistory.push(snapshot);
      if (this.performanceHistory.length > 100) {
        this.performanceHistory.shift();
      }

      // Check for alerts
      this.checkAlerts();

      console.log(`📊 Metrics updated - Overall Health: ${systemHealth.overall.toFixed(1)}%`);

    } catch (error) {
      console.error('❌ Failed to update performance metrics:', error);
    }
  }

  private updateMetric(metricId: string, newValue: number): void {
    const metric = this.metrics.get(metricId);
    if (!metric) return;

    const oldValue = metric.value;
    metric.value = newValue;
    metric.lastUpdated = new Date();

    // Add to history
    metric.history.push({
      timestamp: new Date(),
      value: newValue,
    });

    // Keep only last 50 history points
    if (metric.history.length > 50) {
      metric.history.shift();
    }

    // Determine trend
    if (metric.history.length >= 3) {
      const recentValues = metric.history.slice(-3).map(h => h.value);
      const increasing = recentValues.every((val, i) => i === 0 || val >= recentValues[i - 1]);
      const decreasing = recentValues.every((val, i) => i === 0 || val <= recentValues[i - 1]);
      
      if (increasing && !decreasing) {
        metric.trend = 'increasing';
      } else if (decreasing && !increasing) {
        metric.trend = 'decreasing';
      } else {
        metric.trend = 'stable';
      }
    }
  }

  private checkAlerts(): void {
    this.metrics.forEach((metric, metricId) => {
      const existingAlert = Array.from(this.alerts.values()).find(
        alert => alert.metricId === metricId && !alert.acknowledged
      );

      let alertType: 'warning' | 'critical' | null = null;
      
      if (metric.value <= metric.threshold.critical) {
        alertType = 'critical';
      } else if (metric.value <= metric.threshold.warning) {
        alertType = 'warning';
      }

      if (alertType && !existingAlert) {
        // Create new alert
        const alertId = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
        const alert: PerformanceAlert = {
          id: alertId,
          type: alertType,
          title: `${metric.name} ${alertType.toUpperCase()}`,
          message: `${metric.name} has ${alertType === 'critical' ? 'critically' : ''} dropped to ${metric.value.toFixed(1)}${metric.unit}`,
          metricId,
          currentValue: metric.value,
          threshold: alertType === 'critical' ? metric.threshold.critical : metric.threshold.warning,
          timestamp: new Date(),
          acknowledged: false,
        };

        this.alerts.set(alertId, alert);
        console.warn(`⚠️ Performance Alert: ${alert.title} - ${alert.message}`);
      }

      if (!alertType && existingAlert) {
        // Resolve existing alert
        existingAlert.resolvedAt = new Date();
        console.log(`✅ Performance alert resolved: ${existingAlert.title}`);
      }
    });
  }

  private generateOptimizationSuggestions(): void {
    const suggestions: Omit<OptimizationSuggestion, 'id' | 'createdAt' | 'implemented'>[] = [];

    // Analyze current performance
    const overallHealth = this.metrics.get('overall-system-health')?.value || 0;
    const culturalCompliance = this.metrics.get('cultural-compliance')?.value || 0;
    const collaborationEfficiency = this.metrics.get('collaboration-efficiency')?.value || 0;
    const memoryUsage = this.metrics.get('memory-usage')?.value || 0;
    const cpuUsage = this.metrics.get('cpu-usage')?.value || 0;

    if (overallHealth < 85) {
      suggestions.push({
        category: 'performance',
        title: 'Optimize System Performance',
        description: 'Overall system health is below optimal levels. Consider optimizing resource usage and collaboration protocols.',
        impact: 'high',
        effort: 'medium',
        estimatedImprovement: 15,
      });
    }

    if (culturalCompliance < 95) {
      suggestions.push({
        category: 'cultural',
        title: 'Enhance Cultural Compliance',
        description: 'Cultural compliance score could be improved. Activate additional cultural validation protocols.',
        impact: 'critical',
        effort: 'low',
        estimatedImprovement: 8,
      });
    }

    if (collaborationEfficiency < 80) {
      suggestions.push({
        category: 'collaboration',
        title: 'Improve Collaboration Efficiency',
        description: 'Collaboration between superintelligences could be more efficient. Consider activating advanced protocols.',
        impact: 'high',
        effort: 'medium',
        estimatedImprovement: 12,
      });
    }

    if (memoryUsage > 75) {
      suggestions.push({
        category: 'performance',
        title: 'Optimize Memory Usage',
        description: 'Memory usage is approaching high levels. Consider implementing memory optimization strategies.',
        impact: 'medium',
        effort: 'high',
        estimatedImprovement: 20,
      });
    }

    if (cpuUsage > 70) {
      suggestions.push({
        category: 'performance',
        title: 'Reduce CPU Load',
        description: 'CPU usage is elevated. Consider distributing computational load more evenly across systems.',
        impact: 'medium',
        effort: 'medium',
        estimatedImprovement: 15,
      });
    }

    // Add new suggestions
    suggestions.forEach(suggestion => {
      const suggestionId = `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      this.optimizationSuggestions.set(suggestionId, {
        ...suggestion,
        id: suggestionId,
        createdAt: new Date(),
        implemented: false,
      });
    });

    if (suggestions.length > 0) {
      console.log(`💡 Generated ${suggestions.length} optimization suggestions`);
    }
  }

  private cleanupOldData(): void {
    const oneHourAgo = new Date(Date.now() - 3600000);
    
    // Remove old resolved alerts
    Array.from(this.alerts.entries()).forEach(([alertId, alert]) => {
      if (alert.resolvedAt && alert.resolvedAt < oneHourAgo) {
        this.alerts.delete(alertId);
      }
    });

    // Remove old implemented suggestions
    const oneDayAgo = new Date(Date.now() - 86400000);
    Array.from(this.optimizationSuggestions.entries()).forEach(([suggestionId, suggestion]) => {
      if (suggestion.implemented && suggestion.createdAt < oneDayAgo) {
        this.optimizationSuggestions.delete(suggestionId);
      }
    });

    console.log('🧹 Cleaned up old performance data');
  }

  public getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  public getMetric(metricId: string): PerformanceMetric | undefined {
    return this.metrics.get(metricId);
  }

  public getAlerts(): PerformanceAlert[] {
    return Array.from(this.alerts.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public getUnacknowledgedAlerts(): PerformanceAlert[] {
    return this.getAlerts().filter(alert => !alert.acknowledged);
  }

  public acknowledgeAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    if (!alert) return false;

    alert.acknowledged = true;
    console.log(`✅ Alert acknowledged: ${alert.title}`);
    return true;
  }

  public getOptimizationSuggestions(): OptimizationSuggestion[] {
    return Array.from(this.optimizationSuggestions.values())
      .filter(s => !s.implemented)
      .sort((a, b) => {
        const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return impactOrder[b.impact] - impactOrder[a.impact];
      });
  }

  public implementSuggestion(suggestionId: string): boolean {
    const suggestion = this.optimizationSuggestions.get(suggestionId);
    if (!suggestion) return false;

    suggestion.implemented = true;
    console.log(`⚡ Optimization suggestion implemented: ${suggestion.title}`);
    return true;
  }

  public getPerformanceHistory(): SystemPerformanceSnapshot[] {
    return [...this.performanceHistory];
  }

  public getCurrentSnapshot(): SystemPerformanceSnapshot | null {
    return this.performanceHistory.length > 0 ? this.performanceHistory[this.performanceHistory.length - 1] : null;
  }

  public getPerformanceTrends(): {
    metricId: string;
    name: string;
    trend: 'improving' | 'declining' | 'stable';
    changeRate: number;
  }[] {
    return Array.from(this.metrics.values()).map(metric => {
      const history = metric.history.slice(-10); // Last 10 data points
      if (history.length < 3) {
        return {
          metricId: metric.id,
          name: metric.name,
          trend: 'stable',
          changeRate: 0,
        };
      }

      const firstValue = history[0].value;
      const lastValue = history[history.length - 1].value;
      const changeRate = ((lastValue - firstValue) / firstValue) * 100;

      let trend: 'improving' | 'declining' | 'stable' = 'stable';
      if (Math.abs(changeRate) > 5) {
        trend = changeRate > 0 ? 'improving' : 'declining';
      }

      return {
        metricId: metric.id,
        name: metric.name,
        trend,
        changeRate,
      };
    });
  }
}

export const realTimePerformanceMonitor = RealTimePerformanceMonitor.getInstance();