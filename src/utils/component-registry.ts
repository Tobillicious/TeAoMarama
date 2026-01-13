// Component Registry - Systematic tracking of all available components
// Version: 1.0.0 - King Aronui Coordination Protocol

export interface ComponentInfo {
  name: string;
  path: string;
  type: 'dashboard' | 'page' | 'utility' | 'service' | 'context' | 'test';
  status: 'verified' | 'unverified' | 'broken' | 'deprecated';
  dependencies: string[];
  category: string;
  description: string;
  lastVerified: Date;
  exports: string[];
}

export class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, ComponentInfo> = new Map();
  private verifiedComponents: Set<string> = new Set();
  private brokenComponents: Set<string> = new Set();

  private constructor() {
    this.initializeRegistry();
  }

  public static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  private initializeRegistry(): void {
    // Core Educational Components - VERIFIED
    this.registerComponent({
      name: 'Navigation',
      path: './components/Navigation',
      type: 'utility',
      status: 'verified',
      dependencies: ['react-router-dom'],
      category: 'core',
      description: 'Main navigation component',
      lastVerified: new Date(),
      exports: ['default']
    });

    this.registerComponent({
      name: 'SiteBreadcrumbs',
      path: './components/SiteBreadcrumbs',
      type: 'utility',
      status: 'verified',
      dependencies: ['react-router-dom'],
      category: 'core',
      description: 'Site breadcrumb navigation',
      lastVerified: new Date(),
      exports: ['default']
    });

    this.registerComponent({
      name: 'SimpleStableHomepage',
      path: './components/SimpleStableHomepage',
      type: 'page',
      status: 'verified',
      dependencies: [],
      category: 'core',
      description: 'Stable homepage component',
      lastVerified: new Date(),
      exports: ['default']
    });

    // Working Components - VERIFIED
    const workingComponents = [
      'WorkingAnalyticsDashboard',
      'WorkingAssessmentTools',
      'WorkingClassManagement',
      'WorkingLessonCreator',
      'WorkingParentCommunication',
      'WorkingResourceBrowser',
      'WorkingStudentDashboard',
      'WorkingTeacherDashboard'
    ];

    workingComponents.forEach(componentName => {
      this.registerComponent({
        name: componentName,
        path: `./components/${componentName}`,
        type: 'dashboard',
        status: 'verified',
        dependencies: ['react'],
        category: 'educational',
        description: `Working ${componentName.replace('Working', '')}`,
        lastVerified: new Date(),
        exports: ['default']
      });
    });

    // Treasure Hunt Components - VERIFIED
    const treasureComponents = [
      'TreasureHuntDashboard',
      'TreasureInventoryDashboard',
      'TreasureIntegrationDashboard'
    ];

    treasureComponents.forEach(componentName => {
      this.registerComponent({
        name: componentName,
        path: `./components/${componentName}`,
        type: 'dashboard',
        status: 'verified',
        dependencies: ['react'],
        category: 'treasure-hunt',
        description: `Treasure hunt ${componentName.replace('Treasure', '').replace('Dashboard', '')}`,
        lastVerified: new Date(),
        exports: ['default']
      });
    });

    // Coordination Components - SIMPLE VERSIONS (to avoid export errors)
    const coordinationComponents = [
      { name: 'HarmonyCoordinationDashboardSimple', path: './components/HarmonyCoordinationDashboardSimple' },
      { name: 'MCPCommunicationDashboardSimple', path: './components/MCPCommunicationDashboardSimple' },
      { name: 'IntelligenceKingdomDashboard', path: './components/IntelligenceKingdomDashboard' }
    ];

    coordinationComponents.forEach(component => {
      this.registerComponent({
        name: component.name,
        path: component.path,
        type: 'dashboard',
        status: 'verified',
        dependencies: ['react'],
        category: 'coordination',
        description: `Coordination ${component.name.replace('Dashboard', '').replace('Simple', '')}`,
        lastVerified: new Date(),
        exports: ['default']
      });
    });

    // Test Components
    this.registerComponent({
      name: 'TestComponent',
      path: './components/TestComponent',
      type: 'test',
      status: 'verified',
      dependencies: ['react'],
      category: 'test',
      description: 'Basic test component',
      lastVerified: new Date(),
      exports: ['default']
    });
  }

  public registerComponent(component: ComponentInfo): void {
    this.components.set(component.name, component);
    if (component.status === 'verified') {
      this.verifiedComponents.add(component.name);
    } else if (component.status === 'broken') {
      this.brokenComponents.add(component.name);
    }
  }

  public getComponent(name: string): ComponentInfo | undefined {
    return this.components.get(name);
  }

  public isComponentVerified(name: string): boolean {
    return this.verifiedComponents.has(name);
  }

  public isComponentBroken(name: string): boolean {
    return this.brokenComponents.has(name);
  }

  public getVerifiedComponents(): ComponentInfo[] {
    return Array.from(this.verifiedComponents).map(name => this.components.get(name)!);
  }

  public getComponentsByCategory(category: string): ComponentInfo[] {
    return Array.from(this.components.values()).filter(comp => comp.category === category);
  }

  public getImportStatement(componentName: string): string | null {
    const component = this.getComponent(componentName);
    if (!component || !this.isComponentVerified(componentName)) {
      return null;
    }
    return `import ${componentName} from '${component.path}';`;
  }

  public validateImports(imports: string[]): { valid: string[]; invalid: string[] } {
    const valid: string[] = [];
    const invalid: string[] = [];

    imports.forEach(importName => {
      if (this.isComponentVerified(importName)) {
        valid.push(importName);
      } else {
        invalid.push(importName);
      }
    });

    return { valid, invalid };
  }

  public getRegistryStatus(): {
    totalComponents: number;
    verifiedComponents: number;
    brokenComponents: number;
    categories: Record<string, number>;
  } {
    const categories: Record<string, number> = {};
    
    this.components.forEach(component => {
      categories[component.category] = (categories[component.category] || 0) + 1;
    });

    return {
      totalComponents: this.components.size,
      verifiedComponents: this.verifiedComponents.size,
      brokenComponents: this.brokenComponents.size,
      categories
    };
  }

  public generateSafeImports(): string {
    const verified = this.getVerifiedComponents();
    const imports: string[] = [];

    verified.forEach(component => {
      imports.push(this.getImportStatement(component.name)!);
    });

    return imports.join('\n');
  }

  public generateRouteConfig(): Array<{
    path: string;
    component: string;
    category: string;
  }> {
    const routes: Array<{ path: string; component: string; category: string }> = [];
    
    this.getVerifiedComponents().forEach(component => {
      if (component.type === 'dashboard' || component.type === 'page') {
        const path = this.generateRoutePath(component);
        routes.push({
          path,
          component: component.name,
          category: component.category
        });
      }
    });

    return routes;
  }

  private generateRoutePath(component: ComponentInfo): string {
    const name = component.name.toLowerCase();
    
    // Handle special cases
    if (name.includes('homepage')) return '/';
    if (name.includes('treasure-hunt')) return '/treasure-hunt';
    if (name.includes('treasure-inventory')) return '/treasure-inventory';
    if (name.includes('treasure-integration')) return '/treasure-integration';
    if (name.includes('harmony-coordination')) return '/harmony-coordination';
    if (name.includes('mcp-communication')) return '/mcp-communication';
    if (name.includes('intelligence-kingdom')) return '/intelligence-kingdom';
    if (name.includes('test')) return '/test';
    
    // Default pattern
    return `/${name.replace('dashboard', '').replace('simple', '').replace('working', '')}`;
  }
}

// Export singleton instance
export const componentRegistry = ComponentRegistry.getInstance();
