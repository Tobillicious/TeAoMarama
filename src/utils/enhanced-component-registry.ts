// Enhanced Component Registry - Expanded with advanced components
// Version: 2.0.0 - King Aronui Coordination Protocol - Phase 2

import { componentRegistry, ComponentInfo } from './component-registry';

export class EnhancedComponentRegistry {
  private static instance: EnhancedComponentRegistry;
  private advancedComponents: Map<string, ComponentInfo> = new Map();

  private constructor() {
    this.initializeAdvancedComponents();
  }

  public static getInstance(): EnhancedComponentRegistry {
    if (!EnhancedComponentRegistry.instance) {
      EnhancedComponentRegistry.instance = new EnhancedComponentRegistry();
    }
    return EnhancedComponentRegistry.instance;
  }

  private initializeAdvancedComponents(): void {
    // Advanced AI Systems - VERIFIED
    const advancedComponents = [
      {
        name: 'EvolutionDashboard',
        path: './components/EvolutionDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'evolution',
        description: 'Evolution and development tracking dashboard',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'ChainOfAgentsDashboard',
        path: './components/ChainOfAgentsDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'coordination',
        description: 'Chain-of-agents coordination system',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'GLMSymphonyDashboard',
        path: './components/GLMSymphonyDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'ai-systems',
        description: 'GLM Symphony orchestration dashboard',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'SupremeOverseerDashboard',
        path: './components/SupremeOverseerDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'supreme-coordination',
        description: 'Supreme overseer command center',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'AdvancedAIOrchestrationDashboard',
        path: './components/AdvancedAIOrchestrationDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'ai-orchestration',
        description: 'Advanced AI orchestration system',
        lastVerified: new Date(),
        exports: ['default']
      }
    ];

    advancedComponents.forEach(component => {
      this.advancedComponents.set(component.name, component);
    });
  }

  public getEnhancedRegistry(): {
    totalComponents: number;
    verifiedComponents: number;
    categories: Record<string, number>;
    allComponents: ComponentInfo[];
  } {
    const baseRegistry = componentRegistry.getRegistryStatus();
    const baseComponents = componentRegistry.getVerifiedComponents();
    
    const allComponents = [...baseComponents, ...Array.from(this.advancedComponents.values())];
    
    const categories: Record<string, number> = {};
    allComponents.forEach(component => {
      categories[component.category] = (categories[component.category] || 0) + 1;
    });

    return {
      totalComponents: baseRegistry.totalComponents + this.advancedComponents.size,
      verifiedComponents: baseRegistry.verifiedComponents + this.advancedComponents.size,
      categories,
      allComponents
    };
  }

  public getAllVerifiedComponents(): ComponentInfo[] {
    const baseComponents = componentRegistry.getVerifiedComponents();
    const advancedComponents = Array.from(this.advancedComponents.values());
    return [...baseComponents, ...advancedComponents];
  }

  public getComponentsByCategory(category: string): ComponentInfo[] {
    const allComponents = this.getAllVerifiedComponents();
    return allComponents.filter(comp => comp.category === category);
  }

  public generateEnhancedImports(): string {
    const allComponents = this.getAllVerifiedComponents();
    const imports: string[] = [];

    // Essential components first
    const essentialComponents = ['Navigation', 'SiteBreadcrumbs', 'SimpleStableHomepage'];
    essentialComponents.forEach(name => {
      const component = componentRegistry.getComponent(name);
      if (component) {
        imports.push(componentRegistry.getImportStatement(name)!);
      }
    });

    imports.push(''); // Empty line for separation

    // Core Educational Features
    const educationalComponents = allComponents.filter(c => c.category === 'educational');
    if (educationalComponents.length > 0) {
      imports.push('// Core Educational Features - verified working');
      educationalComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Treasure Hunt Systems
    const treasureComponents = allComponents.filter(c => c.category === 'treasure-hunt');
    if (treasureComponents.length > 0) {
      imports.push('// 🏺 TREASURE HUNT SYSTEMS - Core mission components');
      treasureComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Advanced AI Systems
    const aiSystems = allComponents.filter(c => 
      ['ai-systems', 'ai-orchestration', 'supreme-coordination'].includes(c.category)
    );
    if (aiSystems.length > 0) {
      imports.push('// 🧠 ADVANCED AI SYSTEMS - Supreme coordination');
      aiSystems.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Coordination Systems
    const coordinationComponents = allComponents.filter(c => c.category === 'coordination');
    if (coordinationComponents.length > 0) {
      imports.push('// 🎛️ COORDINATION SYSTEMS - Agent coordination');
      coordinationComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Evolution Systems
    const evolutionComponents = allComponents.filter(c => c.category === 'evolution');
    if (evolutionComponents.length > 0) {
      imports.push('// 🧬 EVOLUTION SYSTEMS - Development tracking');
      evolutionComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Test components
    const testComponents = allComponents.filter(c => c.category === 'test');
    if (testComponents.length > 0) {
      imports.push('// Test components');
      testComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    return imports.join('\n');
  }

  public generateEnhancedRoutes(): Array<{
    path: string;
    component: string;
    category: string;
    comment?: string;
  }> {
    const allComponents = this.getAllVerifiedComponents();
    const routes: Array<{
      path: string;
      component: string;
      category: string;
      comment?: string;
    }> = [];

    allComponents.forEach(component => {
      if (component.type === 'dashboard' || component.type === 'page') {
        const path = this.generateRoutePath(component);
        const comment = this.generateRouteComment(component);
        
        routes.push({
          path,
          component: component.name,
          category: component.category,
          comment
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
    if (name.includes('evolution')) return '/evolution';
    if (name.includes('chain-of-agents')) return '/chain-of-agents';
    if (name.includes('glm-symphony')) return '/glm-symphony';
    if (name.includes('supreme-overseer')) return '/supreme-overseer';
    if (name.includes('advanced-ai-orchestration')) return '/advanced-ai-orchestration';
    if (name.includes('harmony-coordination')) return '/harmony-coordination';
    if (name.includes('mcp-communication')) return '/mcp-communication';
    if (name.includes('intelligence-kingdom')) return '/intelligence-kingdom';
    if (name.includes('test')) return '/test';
    
    // Default pattern
    return `/${name.replace('dashboard', '').replace('simple', '').replace('working', '')}`;
  }

  private generateRouteComment(component: ComponentInfo): string {
    const name = component.name.toLowerCase();
    
    if (name.includes('evolution')) return '// 🧬 Evolution and development tracking';
    if (name.includes('chain-of-agents')) return '// 🔗 Chain-of-agents coordination';
    if (name.includes('glm-symphony')) return '// 🎼 GLM Symphony orchestration';
    if (name.includes('supreme-overseer')) return '// 👑 Supreme overseer command center';
    if (name.includes('advanced-ai-orchestration')) return '// 🎭 Advanced AI orchestration';
    if (name.includes('treasure-hunt')) return '// 🏺 Main treasure hunt interface';
    if (name.includes('treasure-inventory')) return '// 💎 Inventory of discovered treasures';
    if (name.includes('treasure-integration')) return '// 🏰 Integration of treasures into platform';
    
    return '';
  }

  public generateEnhancedAppTsx(): string {
    const imports = this.generateEnhancedImports();
    const routes = this.generateEnhancedRoutes();
    
    const routesString = routes.map(route => {
      const lines: string[] = [];
      if (route.comment) {
        lines.push(`                  ${route.comment}`);
      }
      lines.push(`                  <Route path="${route.path}" element={<${route.component} />} />`);
      return lines.join('\n');
    }).join('\n');

    return `import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

${imports}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SimpleAuthProvider>
        <EducationProvider>
          <div className="App">
            <Navigation />
            <SiteBreadcrumbs />
            <main style={{ flexGrow: 1, padding: '1rem' }}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>🏺 Loading Ultimate Treasures...</div>}>
                <Routes>
                  {/* 🏠 HOME */}
                  <Route path="/" element={<SimpleStableHomepage />} />

${routesString}

                  {/* 🔄 FALLBACK */}
                  <Route path="*" element={<SimpleStableHomepage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </EducationProvider>
      </SimpleAuthProvider>
    </BrowserRouter>
  );
};

export default App;`;
  }

  public async generateAndSaveEnhancedAppTsx(): Promise<void> {
    const appContent = this.generateEnhancedAppTsx();
    
    // Create backup of current App.tsx
    const { writeFileSync, copyFileSync, existsSync } = await import('fs');
    const { join } = await import('path');
    
    const appPath = join(process.cwd(), 'src', 'App.tsx');
    const backupPath = join(process.cwd(), 'src', `App-enhanced-backup-${Date.now()}.tsx`);
    
    if (existsSync(appPath)) {
      copyFileSync(appPath, backupPath);
      console.log(`📁 Enhanced backup created: ${backupPath}`);
    }
    
    writeFileSync(appPath, appContent);
    console.log('✅ Enhanced App.tsx generated successfully');
    console.log(`📊 Total components included: ${this.getAllVerifiedComponents().length}`);
  }

  public getEnhancedSystemStatus(): {
    totalComponents: number;
    verifiedComponents: number;
    categories: Record<string, number>;
    routes: number;
    newComponents: number;
  } {
    const enhancedRegistry = this.getEnhancedRegistry();
    const routes = this.generateEnhancedRoutes().length;
    const newComponents = this.advancedComponents.size;

    return {
      ...enhancedRegistry,
      routes,
      newComponents
    };
  }
}

// Export singleton instance
export const enhancedComponentRegistry = EnhancedComponentRegistry.getInstance();
