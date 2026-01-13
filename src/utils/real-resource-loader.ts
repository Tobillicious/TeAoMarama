/**
 * 🔗 REAL RESOURCE LOADER - Te Ao Mārama Platform
 * Connects 502 JSON lesson files to EducationContext
 */

export interface RealResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: number;
  learningObjectives: string[];
  culturalIntegration: string;
  materials: string[];
  activities: Array<{
    name: string;
    duration: number;
    description: string;
    culturalElements: string[];
  }>;
}

class RealResourceLoader {
  private resources: RealResource[] = [];
  private isLoading = false;

  async loadResourceIndex(): Promise<any[]> {
    try {
      const response = await fetch('/full-deployment-output/full-resource-index.json');
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error loading resource index:', error);
      return [];
    }
  }

  async loadResource(resourceId: string): Promise<RealResource | null> {
    try {
      const response = await fetch(`/generated-lessons/${resourceId}-lesson-plan.json`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error(`❌ Error loading ${resourceId}:`, error);
      return null;
    }
  }

  async loadResourcesBatch(resourceIds: string[]): Promise<RealResource[]> {
    const resources: RealResource[] = [];
    for (const id of resourceIds.slice(0, 20)) {
      // Load first 20 for testing
      const resource = await this.loadResource(id);
      if (resource) resources.push(resource);
    }
    return resources;
  }

  getLoadingStatus() {
    return { isLoading: this.isLoading, loadedResources: this.resources.length };
  }
}

export const realResourceLoader = new RealResourceLoader();
export default realResourceLoader;
