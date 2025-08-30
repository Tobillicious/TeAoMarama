// Security monitoring and threat detection system
export interface SecurityEvent {
  id: string;
  timestamp: number;
  type: 'login_attempt' | 'failed_login' | 'cultural_validation' | 'mfa_verification' | 'access_denied' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  user?: string;
  role?: string;
  ip?: string;
  userAgent?: string;
  details: Record<string, unknown>;
}

export interface SecurityMetrics {
  totalEvents: number;
  failedLogins: number;
  successfulLogins: number;
  culturalValidations: number;
  mfaVerifications: number;
  suspiciousActivities: number;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: number;
}

export interface SecurityAlert {
  id: string;
  timestamp: number;
  type: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private alerts: SecurityAlert[] = [];
  private metrics: SecurityMetrics = {
    totalEvents: 0,
    failedLogins: 0,
    successfulLogins: 0,
    culturalValidations: 0,
    mfaVerifications: 0,
    suspiciousActivities: 0,
    threatLevel: 'low',
    lastUpdated: Date.now(),
  };

  private threatThresholds = {
    failedLogins: 5,
    suspiciousActivities: 3,
    culturalViolations: 2,
  };

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Set up periodic threat level assessment
    setInterval(() => {
      this.assessThreatLevel();
    }, 30000); // Every 30 seconds

    // Set up event cleanup (keep last 1000 events)
    setInterval(() => {
      this.cleanupOldEvents();
    }, 300000); // Every 5 minutes
  }

  public logEvent(event: Omit<SecurityEvent, 'id' | 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      id: this.generateEventId(),
      timestamp: Date.now(),
    };

    this.events.push(securityEvent);
    this.updateMetrics(securityEvent);
    this.checkForThreats(securityEvent);
  }

  public logLoginAttempt(user: string, role: string, success: boolean, details: Record<string, unknown> = {}): void {
    this.logEvent({
      type: success ? 'login_attempt' : 'failed_login',
      severity: success ? 'low' : 'medium',
      user,
      role,
      details: {
        success,
        ...details,
      },
    });
  }

  public logCulturalValidation(user: string, role: string, success: boolean, validationTime: number): void {
    this.logEvent({
      type: 'cultural_validation',
      severity: success ? 'low' : 'high',
      user,
      role,
      details: {
        success,
        validationTime,
        timestamp: Date.now(),
      },
    });
  }

  public logMFAVerification(user: string, success: boolean, method: string): void {
    this.logEvent({
      type: 'mfa_verification',
      severity: success ? 'low' : 'medium',
      user,
      details: {
        success,
        method,
        timestamp: Date.now(),
      },
    });
  }

  public logSuspiciousActivity(user: string, activity: string, details: Record<string, unknown> = {}): void {
    this.logEvent({
      type: 'suspicious_activity',
      severity: 'high',
      user,
      details: {
        activity,
        ...details,
        timestamp: Date.now(),
      },
    });
  }

  private updateMetrics(event: SecurityEvent): void {
    this.metrics.totalEvents++;
    this.metrics.lastUpdated = Date.now();

    switch (event.type) {
      case 'login_attempt':
        this.metrics.successfulLogins++;
        break;
      case 'failed_login':
        this.metrics.failedLogins++;
        break;
      case 'cultural_validation':
        this.metrics.culturalValidations++;
        break;
      case 'mfa_verification':
        this.metrics.mfaVerifications++;
        break;
      case 'suspicious_activity':
        this.metrics.suspiciousActivities++;
        break;
    }
  }

  private checkForThreats(event: SecurityEvent): void {
    // Check for rapid failed login attempts
    const recentFailedLogins = this.events.filter(
      e => e.type === 'failed_login' && 
           e.timestamp > Date.now() - 300000 && // Last 5 minutes
           e.user === event.user
    );

    if (recentFailedLogins.length >= this.threatThresholds.failedLogins) {
      this.createAlert(
        'rapid_failed_logins',
        `Multiple failed login attempts detected for user: ${event.user}`,
        'high'
      );
    }

    // Check for suspicious activities
    const recentSuspiciousActivities = this.events.filter(
      e => e.type === 'suspicious_activity' && 
           e.timestamp > Date.now() - 600000 && // Last 10 minutes
           e.user === event.user
    );

    if (recentSuspiciousActivities.length >= this.threatThresholds.suspiciousActivities) {
      this.createAlert(
        'suspicious_activity_pattern',
        `Suspicious activity pattern detected for user: ${event.user}`,
        'critical'
      );
    }

    // Check for cultural validation violations
    const recentCulturalViolations = this.events.filter(
      e => e.type === 'cultural_validation' && 
           e.timestamp > Date.now() - 3600000 && // Last hour
           e.severity === 'high'
    );

    if (recentCulturalViolations.length >= this.threatThresholds.culturalViolations) {
      this.createAlert(
        'cultural_violations',
        'Multiple cultural validation violations detected',
        'critical'
      );
    }
  }

  private createAlert(type: string, message: string, severity: 'low' | 'medium' | 'high' | 'critical'): void {
    const alert: SecurityAlert = {
      id: this.generateEventId(),
      timestamp: Date.now(),
      type,
      message,
      severity,
      resolved: false,
    };

    this.alerts.push(alert);
    this.logSecurityAlert(alert);
  }

  private logSecurityAlert(alert: SecurityAlert): void {
    console.warn(`🚨 SECURITY ALERT [${alert.severity.toUpperCase()}]: ${alert.message}`);
    
    // In a real implementation, this would send to security monitoring service
    if (alert.severity === 'critical') {
      this.triggerEmergencyResponse(alert);
    }
  }

  private triggerEmergencyResponse(alert: SecurityAlert): void {
    // Emergency response for critical alerts
    console.error(`🚨 CRITICAL SECURITY ALERT: ${alert.message}`);
    
    // In a real implementation, this would:
    // - Send immediate notifications to security team
    // - Trigger automated response procedures
    // - Log to external security monitoring systems
    // - Potentially lock down affected accounts
  }

  private assessThreatLevel(): void {
    const recentEvents = this.events.filter(e => e.timestamp > Date.now() - 3600000); // Last hour
    
    const highSeverityEvents = recentEvents.filter(e => e.severity === 'high' || e.severity === 'critical');
    const criticalEvents = recentEvents.filter(e => e.severity === 'critical');
    
    let newThreatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
    
    if (criticalEvents.length > 0) {
      newThreatLevel = 'critical';
    } else if (highSeverityEvents.length > 5) {
      newThreatLevel = 'high';
    } else if (highSeverityEvents.length > 2) {
      newThreatLevel = 'medium';
    }
    
    if (newThreatLevel !== this.metrics.threatLevel) {
      this.metrics.threatLevel = newThreatLevel;
      console.log(`🔒 Threat level changed to: ${newThreatLevel.toUpperCase()}`);
    }
  }

  private cleanupOldEvents(): void {
    const oneDayAgo = Date.now() - 86400000; // 24 hours
    
    this.events = this.events.filter(e => e.timestamp > oneDayAgo);
    this.alerts = this.alerts.filter(a => a.timestamp > oneDayAgo || !a.resolved);
  }

  private generateEventId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getMetrics(): SecurityMetrics {
    return { ...this.metrics };
  }

  public getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  public getActiveAlerts(): SecurityAlert[] {
    return this.alerts.filter(a => !a.resolved);
  }

  public resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.resolved = true;
    }
  }

  public getSecurityReport(): string {
    const metrics = this.getMetrics();
    const activeAlerts = this.getActiveAlerts();
    
    return `
🔒 SECURITY STATUS REPORT
========================
Threat Level: ${metrics.threatLevel.toUpperCase()}
Total Events: ${metrics.totalEvents}
Successful Logins: ${metrics.successfulLogins}
Failed Logins: ${metrics.failedLogins}
Cultural Validations: ${metrics.culturalValidations}
MFA Verifications: ${metrics.mfaVerifications}
Suspicious Activities: ${metrics.suspiciousActivities}
Active Alerts: ${activeAlerts.length}

${activeAlerts.length > 0 ? '🚨 ACTIVE ALERTS:' : '✅ No active alerts'}
${activeAlerts.map(a => `- [${a.severity.toUpperCase()}] ${a.message}`).join('\n')}
    `.trim();
  }
}

// Singleton instance
export const securityMonitor = new SecurityMonitor();

// Export for use in components
export default securityMonitor;
