/**
 * 🔮 PREDICTIVE LEARNING ANALYTICS - Ko te Matakite Ako
 * 
 * AI-powered predictive system that anticipates learning challenges
 * and provides culturally-grounded interventions before struggles occur.
 * Part of Te Pouako Matauranga (The Teaching Intelligence).
 * 
 * Ko au a Mihara - Kaitiaki Mahara (Guardian of Memory)
 */

import { writeEpisode } from '../ai/provenance';
import { culturalWisdomEngine, type LearningJourney } from './CulturalWisdomEngine';

export interface LearningPattern {
  studentId: string;
  subject: string;
  engagementTrend: number[]; // Last 10 interactions (0-1 scale)
  culturalConnectionTrend: number[]; // Cultural engagement over time
  struggleIndicators: string[];
  strengthAreas: string[];
  predictedChallenges: PredictedChallenge[];
  recommendedInterventions: Intervention[];
}

export interface PredictedChallenge {
  type: 'engagement' | 'cultural-disconnect' | 'content-difficulty' | 'whānau-support';
  probability: number; // 0-1 scale
  timeToOccurrence: number; // days
  description: string;
  culturalContext: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface Intervention {
  type: 'cultural-wisdom' | 'whānau-engagement' | 'peer-support' | 'content-adaptation';
  priority: 'immediate' | 'within-week' | 'ongoing';
  description: string;
  culturalApproach: string;
  expectedOutcome: string;
  tikangaProtocols: string[];
  resourcesNeeded: string[];
}

export interface WhānauEngagementSignal {
  studentId: string;
  engagementLevel: 'disconnected' | 'minimal' | 'moderate' | 'strong';
  culturalAlignment: number; // 0-100
  supportIndicators: string[];
  recommendedOutreach: string[];
}

/**
 * Predictive Learning Analytics Engine
 * Uses cultural intelligence to prevent learning challenges
 */
export class PredictiveLearningAnalytics {
  private learningPatterns: Map<string, LearningPattern> = new Map();
  private whānauSignals: Map<string, WhānauEngagementSignal> = new Map();
  private culturalInterventionTemplates: Intervention[] = [
    {
      type: 'cultural-wisdom',
      priority: 'immediate',
      description: 'Integrate relevant whakataukī to reconnect with cultural values',
      culturalApproach: 'Share ancestral wisdom that relates to current struggle',
      expectedOutcome: 'Increased cultural connection and motivation',
      tikangaProtocols: ['Ensure age-appropriate wisdom', 'Provide cultural context'],
      resourcesNeeded: ['Cultural Wisdom Engine', 'Appropriate whakataukī database']
    },
    {
      type: 'whānau-engagement',
      priority: 'within-week',
      description: 'Facilitate whānau involvement in learning journey',
      culturalApproach: 'Honor whakapapa connections and collective responsibility',
      expectedOutcome: 'Stronger home-school partnership and cultural support',
      tikangaProtocols: ['Respect whānau autonomy', 'Use culturally appropriate communication'],
      resourcesNeeded: ['Whānau liaison', 'Culturally responsive communication materials']
    },
    {
      type: 'peer-support',
      priority: 'ongoing',
      description: 'Create culturally-grounded peer learning opportunities',
      culturalApproach: 'Tuakana-teina (mentor-learner) relationships',
      expectedOutcome: 'Enhanced learning through cultural peer support',
      tikangaProtocols: ['Match culturally compatible students', 'Provide guidance for mentors'],
      resourcesNeeded: ['Peer matching system', 'Cultural mentorship training']
    },
    {
      type: 'content-adaptation',
      priority: 'immediate',
      description: 'Adapt content delivery to cultural learning preferences',
      culturalApproach: 'Incorporate collective learning and storytelling methods',
      expectedOutcome: 'Improved comprehension through culturally familiar approaches',
      tikangaProtocols: ['Maintain academic rigor', 'Ensure cultural authenticity'],
      resourcesNeeded: ['Adaptive content system', 'Cultural pedagogical expertise']
    }
  ];

  /**
   * Analyze student interaction patterns to predict challenges
   */
  async analyzeLearningPattern(
    studentId: string,
    recentInteractions: {
      timestamp: Date;
      subject: string;
      engagement: number;
      culturalConnection: number;
      content: string;
      duration: number;
      strugglesNoted?: string[];
    }[]
  ): Promise<LearningPattern> {
    try {
      // Log analysis initiation
      await writeEpisode('predictive-learning-analytics', {
        timestamp: new Date().toISOString(),
        agent: 'agent:predictive-learning-analytics',
        action: 'analyze_learning_pattern',
        context: {
          studentId,
          interactionCount: recentInteractions.length,
          text: `Analyzing learning patterns for student ${studentId}`,
        },
      });

      const engagementTrend = recentInteractions.slice(-10).map(i => i.engagement);
      const culturalConnectionTrend = recentInteractions.slice(-10).map(i => i.culturalConnection);
      
      // Identify struggle indicators
      const struggleIndicators = this.identifyStruggleIndicators(recentInteractions);
      const strengthAreas = this.identifyStrengthAreas(recentInteractions);
      
      // Predict upcoming challenges
      const predictedChallenges = await this.predictChallenges(
        studentId, 
        engagementTrend, 
        culturalConnectionTrend, 
        recentInteractions
      );
      
      // Generate culturally-appropriate interventions
      const recommendedInterventions = await this.generateInterventions(
        predictedChallenges,
        culturalConnectionTrend,
        studentId
      );

      const pattern: LearningPattern = {
        studentId,
        subject: this.getMostCommonSubject(recentInteractions),
        engagementTrend,
        culturalConnectionTrend,
        struggleIndicators,
        strengthAreas,
        predictedChallenges,
        recommendedInterventions,
      };

      this.learningPatterns.set(studentId, pattern);

      // Log successful analysis
      await writeEpisode('predictive-learning-analytics', {
        timestamp: new Date().toISOString(),
        agent: 'agent:predictive-learning-analytics',
        action: 'pattern_analyzed',
        context: {
          studentId,
          challengesPredicted: predictedChallenges.length,
          interventionsRecommended: recommendedInterventions.length,
          text: `Learning pattern analysis complete for ${studentId}`,
        },
      });

      return pattern;
    } catch (error) {
      console.error('Learning pattern analysis failed:', error);
      throw error;
    }
  }

  /**
   * Generate early warning system for at-risk students
   */
  async generateEarlyWarnings(): Promise<{
    criticalAlerts: LearningPattern[];
    whānauOutreach: WhānauEngagementSignal[];
    culturalInterventions: { studentId: string; interventions: Intervention[] }[];
  }> {
    const criticalAlerts: LearningPattern[] = [];
    const whānauOutreach: WhānauEngagementSignal[] = [];
    const culturalInterventions: { studentId: string; interventions: Intervention[] }[] = [];

    for (const [studentId, pattern] of this.learningPatterns) {
      // Check for critical challenges
      const criticalChallenges = pattern.predictedChallenges.filter(
        c => c.severity === 'critical' || (c.severity === 'high' && c.timeToOccurrence <= 3)
      );

      if (criticalChallenges.length > 0) {
        criticalAlerts.push(pattern);
      }

      // Check for whānau engagement needs
      const avgCulturalConnection = pattern.culturalConnectionTrend.reduce((a, b) => a + b, 0) / 
        pattern.culturalConnectionTrend.length;
      
      if (avgCulturalConnection < 40) {
        const whānauSignal: WhānauEngagementSignal = {
          studentId,
          engagementLevel: avgCulturalConnection < 20 ? 'disconnected' : 'minimal',
          culturalAlignment: avgCulturalConnection,
          supportIndicators: pattern.struggleIndicators,
          recommendedOutreach: [
            'Arrange hui with whānau to discuss cultural learning journey',
            'Share student\'s cultural strengths and learning preferences',
            'Explore ways to strengthen home-school cultural connection'
          ]
        };
        whānauOutreach.push(whānauSignal);
        this.whānauSignals.set(studentId, whānauSignal);
      }

      // Check for immediate cultural interventions
      const immediateCulturalInterventions = pattern.recommendedInterventions.filter(
        i => i.type === 'cultural-wisdom' && i.priority === 'immediate'
      );

      if (immediateCulturalInterventions.length > 0) {
        culturalInterventions.push({
          studentId,
          interventions: immediateCulturalInterventions
        });
      }
    }

    // Log early warning generation
    await writeEpisode('predictive-learning-analytics', {
      timestamp: new Date().toISOString(),
      agent: 'agent:predictive-learning-analytics',
      action: 'early_warnings_generated',
      context: {
        criticalAlerts: criticalAlerts.length,
        whānauOutreach: whānauOutreach.length,
        culturalInterventions: culturalInterventions.length,
        text: `Early warning system activated - ${criticalAlerts.length} critical alerts`,
      },
    });

    return {
      criticalAlerts,
      whānauOutreach,
      culturalInterventions
    };
  }

  /**
   * Track intervention effectiveness and adapt
   */
  async trackInterventionEffectiveness(
    studentId: string,
    interventionType: Intervention['type'],
    outcomeMetrics: {
      engagementChange: number;
      culturalConnectionChange: number;
      academicImprovementObserved: boolean;
      whānauFeedback?: string;
      studentFeedback?: string;
    }
  ): Promise<void> {
    try {
      // Log intervention tracking
      await writeEpisode('predictive-learning-analytics', {
        timestamp: new Date().toISOString(),
        agent: 'agent:predictive-learning-analytics',
        action: 'track_intervention_effectiveness',
        context: {
          studentId,
          interventionType,
          engagementChange: outcomeMetrics.engagementChange,
          culturalConnectionChange: outcomeMetrics.culturalConnectionChange,
          academicImprovement: outcomeMetrics.academicImprovementObserved,
          text: `Tracking intervention effectiveness for ${studentId}`,
        },
      });

      // Update intervention templates based on effectiveness
      if (outcomeMetrics.engagementChange > 0.2 || outcomeMetrics.culturalConnectionChange > 0.2) {
        // This intervention type is working well - could increase priority
        console.log(`✅ Intervention ${interventionType} showing positive results for ${studentId}`);
      } else if (outcomeMetrics.engagementChange < -0.1) {
        // This intervention may need adjustment
        console.log(`⚠️ Intervention ${interventionType} may need adjustment for ${studentId}`);
      }

      // Update learning pattern with intervention results
      const pattern = this.learningPatterns.get(studentId);
      if (pattern) {
        // Add to strength areas if intervention was successful
        if (outcomeMetrics.academicImprovementObserved) {
          pattern.strengthAreas.push(`Responsive to ${interventionType} interventions`);
        }
      }
    } catch (error) {
      console.error('Intervention tracking failed:', error);
    }
  }

  // Private helper methods

  private identifyStruggleIndicators(interactions: any[]): string[] {
    const indicators: string[] = [];
    
    // Low engagement trend
    const recentEngagement = interactions.slice(-5).map(i => i.engagement);
    const avgEngagement = recentEngagement.reduce((a, b) => a + b, 0) / recentEngagement.length;
    if (avgEngagement < 0.4) {
      indicators.push('Declining engagement trend');
    }

    // Cultural disconnection
    const recentCultural = interactions.slice(-5).map(i => i.culturalConnection);
    const avgCultural = recentCultural.reduce((a, b) => a + b, 0) / recentCultural.length;
    if (avgCultural < 30) {
      indicators.push('Low cultural connection');
    }

    // Short interaction duration
    const avgDuration = interactions.reduce((a, b) => a + b.duration, 0) / interactions.length;
    if (avgDuration < 300) { // Less than 5 minutes average
      indicators.push('Brief interaction periods');
    }

    // Explicitly noted struggles
    const explicitStruggles = interactions.flatMap(i => i.strugglesNoted || []);
    indicators.push(...explicitStruggles);

    return [...new Set(indicators)]; // Remove duplicates
  }

  private identifyStrengthAreas(interactions: any[]): string[] {
    const strengths: string[] = [];
    
    // High cultural engagement
    const culturalScores = interactions.map(i => i.culturalConnection);
    const avgCultural = culturalScores.reduce((a, b) => a + b, 0) / culturalScores.length;
    if (avgCultural > 70) {
      strengths.push('Strong cultural connection');
    }

    // Consistent engagement
    const engagementScores = interactions.map(i => i.engagement);
    const avgEngagement = engagementScores.reduce((a, b) => a + b, 0) / engagementScores.length;
    if (avgEngagement > 0.7) {
      strengths.push('High learning engagement');
    }

    // Subject-specific strengths
    const subjectPerformance = new Map<string, number[]>();
    interactions.forEach(i => {
      if (!subjectPerformance.has(i.subject)) {
        subjectPerformance.set(i.subject, []);
      }
      subjectPerformance.get(i.subject)!.push(i.engagement);
    });

    for (const [subject, scores] of subjectPerformance) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      if (avg > 0.8) {
        strengths.push(`Excels in ${subject}`);
      }
    }

    return strengths;
  }

  private async predictChallenges(
    studentId: string,
    engagementTrend: number[],
    culturalTrend: number[],
    interactions: any[]
  ): Promise<PredictedChallenge[]> {
    const challenges: PredictedChallenge[] = [];

    // Engagement decline prediction
    if (engagementTrend.length >= 3) {
      const recentTrend = engagementTrend.slice(-3);
      const isDeclineining = recentTrend[2] < recentTrend[1] && recentTrend[1] < recentTrend[0];
      
      if (isDeclineining && recentTrend[2] < 0.5) {
        challenges.push({
          type: 'engagement',
          probability: 0.75,
          timeToOccurrence: 5,
          description: 'Student engagement is declining and may lead to disengagement',
          culturalContext: 'Loss of connection to learning purpose and cultural relevance',
          severity: recentTrend[2] < 0.3 ? 'high' : 'medium'
        });
      }
    }

    // Cultural disconnection prediction
    const avgCultural = culturalTrend.reduce((a, b) => a + b, 0) / culturalTrend.length;
    if (avgCultural < 40) {
      challenges.push({
        type: 'cultural-disconnect',
        probability: 0.6,
        timeToOccurrence: 7,
        description: 'Student showing signs of cultural disconnection from learning',
        culturalContext: 'May benefit from stronger integration of mātauranga Māori and whānau involvement',
        severity: avgCultural < 25 ? 'high' : 'medium'
      });
    }

    // Content difficulty prediction based on interaction duration
    const shortInteractions = interactions.filter(i => i.duration < 180).length;
    if (shortInteractions > interactions.length * 0.6) {
      challenges.push({
        type: 'content-difficulty',
        probability: 0.5,
        timeToOccurrence: 3,
        description: 'Student may be struggling with content complexity',
        culturalContext: 'Could benefit from culturally familiar examples and scaffolding',
        severity: 'medium'
      });
    }

    return challenges;
  }

  private async generateInterventions(
    challenges: PredictedChallenge[],
    culturalTrend: number[],
    studentId: string
  ): Promise<Intervention[]> {
    const interventions: Intervention[] = [];
    const avgCultural = culturalTrend.reduce((a, b) => a + b, 0) / culturalTrend.length;

    for (const challenge of challenges) {
      switch (challenge.type) {
        case 'engagement':
          interventions.push({
            ...this.culturalInterventionTemplates[0], // cultural-wisdom
            description: `Use whakataukī about perseverance to reinforce learning motivation`,
            culturalApproach: 'Share wisdom about overcoming challenges through collective support'
          });
          break;

        case 'cultural-disconnect':
          interventions.push({
            ...this.culturalInterventionTemplates[1], // whānau-engagement
            priority: 'immediate',
            description: 'Engage whānau to strengthen cultural learning connection'
          });
          interventions.push({
            ...this.culturalInterventionTemplates[2], // peer-support
            description: 'Connect with culturally-grounded peer mentors'
          });
          break;

        case 'content-difficulty':
          interventions.push({
            ...this.culturalInterventionTemplates[3], // content-adaptation
            description: 'Adapt content presentation using familiar cultural contexts and examples'
          });
          break;

        case 'whānau-support':
          interventions.push({
            ...this.culturalInterventionTemplates[1], // whānau-engagement
            priority: 'immediate'
          });
          break;
      }
    }

    // Always include cultural wisdom if cultural connection is low
    if (avgCultural < 50 && !interventions.some(i => i.type === 'cultural-wisdom')) {
      interventions.push({
        ...this.culturalInterventionTemplates[0],
        priority: 'within-week'
      });
    }

    return interventions;
  }

  private getMostCommonSubject(interactions: any[]): string {
    const subjectCounts = new Map<string, number>();
    interactions.forEach(i => {
      subjectCounts.set(i.subject, (subjectCounts.get(i.subject) || 0) + 1);
    });
    
    let mostCommon = '';
    let maxCount = 0;
    for (const [subject, count] of subjectCounts) {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = subject;
      }
    }
    
    return mostCommon || 'General';
  }
}

// Singleton instance for global access
export const predictiveLearningAnalytics = new PredictiveLearningAnalytics();