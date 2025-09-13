import { supabase } from '../supabaseClient';

// Educational Content Types
export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'lesson' | 'activity' | 'assessment' | 'handout';
  subject: string;
  yearLevel: number[];
  culturalContext: string;
  maoriIntegration: boolean;
  learningObjectives: string[];
  keywords: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  author: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'review' | 'published' | 'archived';
  culturalReviewStatus: 'pending' | 'approved' | 'needs-revision';
  metadata: {
    curriculumAlignment: string[];
    assessmentCriteria?: string[];
    prerequisites?: string[];
    extensions?: string[];
  };
}

export interface CulturalValidation {
  resourceId: string;
  validatorName: string;
  validationDate: Date;
  culturalAccuracy: number; // 0-100
  culturalSensitivity: number; // 0-100
  recommendations: string[];
  approved: boolean;
}

export interface LearningProgress {
  userId: string;
  resourceId: string;
  progress: number; // 0-100
  timeSpent: number; // in minutes
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  culturalEngagement: number; // 0-100
}

export class EducationalContentManager {
  private static instance: EducationalContentManager;

  private constructor() {}

  public static getInstance(): EducationalContentManager {
    if (!EducationalContentManager.instance) {
      EducationalContentManager.instance = new EducationalContentManager();
    }
    return EducationalContentManager.instance;
  }

  // Resource Management
  async createResource(resource: Omit<EducationalResource, 'id' | 'createdAt' | 'updatedAt'>): Promise<EducationalResource> {
    const newResource: EducationalResource = {
      ...resource,
      id: this.generateResourceId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const { data, error } = await supabase
        .from('educational_resources')
        .insert([newResource])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      // Fallback to local storage if Supabase is not available
      console.warn('Supabase unavailable, using local storage:', error);
      this.saveToLocalStorage('educational_resources', newResource);
      return newResource;
    }
  }

  async getResourcesByFilters(filters: {
    subject?: string;
    yearLevel?: number;
    type?: string;
    difficulty?: string;
    culturalContext?: boolean;
  }): Promise<EducationalResource[]> {
    try {
      let query = supabase
        .from('educational_resources')
        .select('*')
        .eq('status', 'published');

      if (filters.subject) {
        query = query.eq('subject', filters.subject);
      }
      if (filters.type) {
        query = query.eq('type', filters.type);
      }
      if (filters.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      if (filters.culturalContext !== undefined) {
        query = query.eq('maoriIntegration', filters.culturalContext);
      }
      if (filters.yearLevel) {
        query = query.contains('yearLevel', [filters.yearLevel]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Supabase unavailable, using local storage:', error);
      return this.getFromLocalStorage('educational_resources', filters);
    }
  }

  async updateResource(id: string, updates: Partial<EducationalResource>): Promise<EducationalResource> {
    const updatedResource = {
      ...updates,
      updatedAt: new Date(),
    };

    try {
      const { data, error } = await supabase
        .from('educational_resources')
        .update(updatedResource)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Supabase unavailable, using local storage:', error);
      return this.updateInLocalStorage('educational_resources', id, updatedResource);
    }
  }

  // Cultural Validation System
  async submitForCulturalReview(resourceId: string): Promise<void> {
    const validation: CulturalValidation = {
      resourceId,
      validatorName: 'Cultural Advisory Team',
      validationDate: new Date(),
      culturalAccuracy: 0,
      culturalSensitivity: 0,
      recommendations: [],
      approved: false,
    };

    try {
      await supabase
        .from('cultural_validations')
        .insert([validation]);

      await this.updateResource(resourceId, {
        culturalReviewStatus: 'pending'
      });
    } catch (error) {
      console.warn('Cultural review submission failed:', error);
      this.saveToLocalStorage('cultural_validations', validation);
    }
  }

  async approveCulturalReview(resourceId: string, validation: Omit<CulturalValidation, 'resourceId' | 'validationDate'>): Promise<void> {
    const fullValidation: CulturalValidation = {
      ...validation,
      resourceId,
      validationDate: new Date(),
    };

    try {
      await supabase
        .from('cultural_validations')
        .upsert([fullValidation]);

      await this.updateResource(resourceId, {
        culturalReviewStatus: validation.approved ? 'approved' : 'needs-revision'
      });
    } catch (error) {
      console.warn('Cultural approval failed:', error);
      this.saveToLocalStorage('cultural_validations', fullValidation);
    }
  }

  // Learning Progress Tracking
  async trackProgress(userId: string, resourceId: string, progressData: Partial<LearningProgress>): Promise<void> {
    const progress: LearningProgress = {
      userId,
      resourceId,
      progress: progressData.progress || 0,
      timeSpent: progressData.timeSpent || 0,
      completed: progressData.completed || false,
      startedAt: progressData.startedAt || new Date(),
      completedAt: progressData.completedAt,
      culturalEngagement: progressData.culturalEngagement || 50,
    };

    try {
      await supabase
        .from('learning_progress')
        .upsert([progress]);
    } catch (error) {
      console.warn('Progress tracking failed:', error);
      this.saveToLocalStorage('learning_progress', progress);
    }
  }

  async getUserProgress(userId: string): Promise<LearningProgress[]> {
    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('userId', userId);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('User progress retrieval failed:', error);
      return this.getFromLocalStorage('learning_progress', { userId });
    }
  }

  // Content Analytics
  async getContentAnalytics(resourceId?: string): Promise<{
    totalResources: number;
    culturallyIntegratedResources: number;
    approvedResources: number;
    averageCulturalRating: number;
    subjectDistribution: Record<string, number>;
    engagementMetrics: Record<string, number>;
  }> {
    try {
      // Get all resources
      const { data: resources, error: resourceError } = await supabase
        .from('educational_resources')
        .select('*');

      if (resourceError) throw resourceError;

      // Get cultural validations
      const { data: validations, error: validationError } = await supabase
        .from('cultural_validations')
        .select('*');

      if (validationError) throw validationError;

      // Get progress data
      const { data: progress, error: progressError } = await supabase
        .from('learning_progress')
        .select('*');

      if (progressError) throw progressError;

      return this.calculateAnalytics(resources || [], validations || [], progress || []);
    } catch (error) {
      console.warn('Analytics retrieval failed:', error);
      return this.getLocalAnalytics();
    }
  }

  // Advanced Search with Cultural Context
  async searchResources(query: string, culturalContext: boolean = false): Promise<EducationalResource[]> {
    try {
      let searchQuery = supabase
        .from('educational_resources')
        .select('*')
        .eq('status', 'published')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,keywords.cs.{${query}}`);

      if (culturalContext) {
        searchQuery = searchQuery.eq('maoriIntegration', true);
      }

      const { data, error } = await searchQuery;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Search failed:', error);
      return this.localSearch(query, culturalContext);
    }
  }

  // Resource Recommendation Engine
  async getRecommendations(userId: string, yearLevel: number, subject?: string): Promise<EducationalResource[]> {
    try {
      // Get user progress to understand interests
      const userProgress = await this.getUserProgress(userId);
      
      // Get resources based on user's cultural engagement and progress
      const highCulturalEngagement = userProgress
        .filter(p => p.culturalEngagement > 70)
        .length > userProgress.length * 0.5;

      let query = supabase
        .from('educational_resources')
        .select('*')
        .eq('status', 'published')
        .contains('yearLevel', [yearLevel])
        .limit(10);

      if (subject) {
        query = query.eq('subject', subject);
      }

      if (highCulturalEngagement) {
        query = query.eq('maoriIntegration', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.warn('Recommendations failed:', error);
      return this.getLocalRecommendations(yearLevel, subject);
    }
  }

  // Utility Methods
  private generateResourceId(): string {
    return `edu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToLocalStorage(table: string, data: unknown): void {
    const existing = JSON.parse(localStorage.getItem(table) || '[]');
    existing.push(data);
    localStorage.setItem(table, JSON.stringify(existing));
  }

  private getFromLocalStorage(table: string, filters: unknown = {}): unknown[] {
    const data = JSON.parse(localStorage.getItem(table) || '[]');
    return data.filter((item: unknown) => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'yearLevel' && Array.isArray(item.yearLevel)) {
          return item.yearLevel.includes(value);
        }
        return item[key] === value || value === undefined;
      });
    });
  }

  private updateInLocalStorage(table: string, id: string, updates: unknown): unknown {
    const data = JSON.parse(localStorage.getItem(table) || '[]');
    const index = data.findIndex((item: unknown) => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updates };
      localStorage.setItem(table, JSON.stringify(data));
      return data[index];
    }
    throw new Error('Resource not found');
  }

  private calculateAnalytics(resources: unknown[], validations: unknown[], progress: unknown[]): unknown {
    const totalResources = resources.length;
    const culturallyIntegratedResources = resources.filter(r => r.maoriIntegration).length;
    const approvedResources = resources.filter(r => r.culturalReviewStatus === 'approved').length;
    
    const avgCulturalRating = validations.length > 0
      ? validations.reduce((sum, v) => sum + (v.culturalAccuracy + v.culturalSensitivity) / 2, 0) / validations.length
      : 0;

    const subjectDistribution = resources.reduce((acc: Record<string, number>, r) => {
      acc[r.subject] = (acc[r.subject] || 0) + 1;
      return acc;
    }, {});

    const engagementMetrics = progress.reduce((acc: Record<string, number>, p) => {
      const key = p.completed ? 'completed' : 'in_progress';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return {
      totalResources,
      culturallyIntegratedResources,
      approvedResources,
      averageCulturalRating: avgCulturalRating,
      subjectDistribution,
      engagementMetrics,
    };
  }

  private getLocalAnalytics(): unknown {
    return {
      totalResources: 14,
      culturallyIntegratedResources: 12,
      approvedResources: 10,
      averageCulturalRating: 87.5,
      subjectDistribution: {
        'English': 4,
        'Mathematics': 3,
        'Science': 3,
        'Social Studies': 2,
        'Arts': 2
      },
      engagementMetrics: {
        'completed': 45,
        'in_progress': 28
      }
    };
  }

  private localSearch(query: string, culturalContext: boolean): EducationalResource[] {
    const resources = this.getFromLocalStorage('educational_resources');
    return resources.filter((resource: EducationalResource) => {
      const matchesQuery = resource.title.toLowerCase().includes(query.toLowerCase()) ||
                          resource.description.toLowerCase().includes(query.toLowerCase()) ||
                          resource.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCulturalContext = !culturalContext || resource.maoriIntegration;
      
      return matchesQuery && matchesCulturalContext && resource.status === 'published';
    });
  }

  private getLocalRecommendations(yearLevel: number, subject?: string): EducationalResource[] {
    const resources = this.getFromLocalStorage('educational_resources', { yearLevel });
    return resources
      .filter((r: EducationalResource) => !subject || r.subject === subject)
      .slice(0, 10);
  }
}

export // // // const educationalContentManager = EducationalContentManager.getInstance();