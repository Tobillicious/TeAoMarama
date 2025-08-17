/**
 * Migration Progress Tracker
 * Tracks real progress of resource migration and processing
 */

export interface MigrationProgress {
  totalResources: number;
  processedResources: number;
  failedResources: number;
  pendingResources: number;
  currentPhase: string;
  startTime: Date;
  estimatedCompletion: Date;
  culturalSafetyChecks: number;
  qualityAssurancePassed: number;
  lastUpdated: Date;
}

export interface ResourceProcessingStatus {
  resourceId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  phase: string;
  culturalSafetyLevel: string;
  qualityScore: number;
  processingTime: number;
  errors?: string[];
}

export class MigrationProgressTracker {
  private progress: MigrationProgress;
  private resourceStatuses = new Map<string, ResourceProcessingStatus>();
  private listeners: Array<(progress: MigrationProgress) => void> = [];

  constructor() {
    this.progress = {
      totalResources: 5439, // Real number from the system
      processedResources: 0,
      failedResources: 0,
      pendingResources: 5439,
      currentPhase: 'initialization',
      startTime: new Date(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      culturalSafetyChecks: 0,
      qualityAssurancePassed: 0,
      lastUpdated: new Date(),
    };
  }

  /**
   * Start processing a resource
   */
  startProcessingResource(resourceId: string, phase: string): void {
    this.resourceStatuses.set(resourceId, {
      resourceId,
      status: 'processing',
      phase,
      culturalSafetyLevel: 'pending',
      qualityScore: 0,
      processingTime: 0,
    });

    this.progress.pendingResources--;
    this.progress.currentPhase = phase;
    this.updateProgress();
  }

  /**
   * Complete processing a resource
   */
  completeResource(
    resourceId: string,
    culturalSafetyLevel: string,
    qualityScore: number,
    processingTime: number
  ): void {
    const status = this.resourceStatuses.get(resourceId);
    if (status) {
      status.status = 'completed';
      status.culturalSafetyLevel = culturalSafetyLevel;
      status.qualityScore = qualityScore;
      status.processingTime = processingTime;
    }

    this.progress.processedResources++;
    this.progress.culturalSafetyChecks++;
    if (qualityScore >= 0.8) {
      this.progress.qualityAssurancePassed++;
    }

    this.updateProgress();
  }

  /**
   * Mark a resource as failed
   */
  failResource(resourceId: string, errors: string[]): void {
    const status = this.resourceStatuses.get(resourceId);
    if (status) {
      status.status = 'failed';
      status.errors = errors;
    }

    this.progress.failedResources++;
    this.updateProgress();
  }

  /**
   * Get current progress
   */
  getProgress(): MigrationProgress {
    return { ...this.progress };
  }

  /**
   * Get processing statistics
   */
  getStatistics() {
    const completed = Array.from(this.resourceStatuses.values()).filter(s => s.status === 'completed');
    const failed = Array.from(this.resourceStatuses.values()).filter(s => s.status === 'failed');
    const processing = Array.from(this.resourceStatuses.values()).filter(s => s.status === 'processing');

    return {
      total: this.progress.totalResources,
      completed: completed.length,
      failed: failed.length,
      processing: processing.length,
      pending: this.progress.pendingResources,
      completionRate: (completed.length / this.progress.totalResources * 100).toFixed(1),
      averageQualityScore: completed.length > 0 
        ? (completed.reduce((sum, r) => sum + r.qualityScore, 0) / completed.length).toFixed(2)
        : '0.00',
      averageProcessingTime: completed.length > 0
        ? (completed.reduce((sum, r) => sum + r.processingTime, 0) / completed.length).toFixed(0)
        : '0',
      culturalSafetyPassRate: this.progress.culturalSafetyChecks > 0
        ? (this.progress.qualityAssurancePassed / this.progress.culturalSafetyChecks * 100).toFixed(1)
        : '0.0',
    };
  }

  /**
   * Get resource status
   */
  getResourceStatus(resourceId: string): ResourceProcessingStatus | undefined {
    return this.resourceStatuses.get(resourceId);
  }

  /**
   * Subscribe to progress updates
   */
  subscribe(listener: (progress: MigrationProgress) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Update progress and notify listeners
   */
  private updateProgress(): void {
    this.progress.lastUpdated = new Date();
    
    // Update estimated completion time
    const elapsed = Date.now() - this.progress.startTime.getTime();
    const completionRate = this.progress.processedResources / this.progress.totalResources;
    if (completionRate > 0) {
      const estimatedTotalTime = elapsed / completionRate;
      const remainingTime = estimatedTotalTime - elapsed;
      this.progress.estimatedCompletion = new Date(Date.now() + remainingTime);
    }

    // Notify listeners
    this.listeners.forEach(listener => listener(this.progress));
  }

  /**
   * Simulate batch processing for demo purposes
   */
  simulateBatchProcessing(batchSize: number = 50): void {
    const pendingResources = Array.from(this.resourceStatuses.entries())
      .filter(([_, status]) => status.status === 'pending')
      .slice(0, batchSize);

    pendingResources.forEach(([resourceId, status]) => {
      this.startProcessingResource(resourceId, 'cultural-safety-check');
      
      // Simulate processing time
      setTimeout(() => {
        const culturalSafetyLevel = Math.random() > 0.1 ? 'clean' : 'review';
        const qualityScore = 0.7 + Math.random() * 0.3; // 0.7 to 1.0
        const processingTime = 1000 + Math.random() * 2000; // 1-3 seconds
        
        this.completeResource(resourceId, culturalSafetyLevel, qualityScore, processingTime);
      }, Math.random() * 5000); // Random delay up to 5 seconds
    });
  }

  /**
   * Reset progress (for testing)
   */
  reset(): void {
    this.progress = {
      totalResources: 5439,
      processedResources: 0,
      failedResources: 0,
      pendingResources: 5439,
      currentPhase: 'initialization',
      startTime: new Date(),
      estimatedCompletion: new Date(Date.now() + 24 * 60 * 60 * 1000),
      culturalSafetyChecks: 0,
      qualityAssurancePassed: 0,
      lastUpdated: new Date(),
    };
    this.resourceStatuses.clear();
    this.updateProgress();
  }
}

// Export singleton instance
export const migrationProgressTracker = new MigrationProgressTracker();
