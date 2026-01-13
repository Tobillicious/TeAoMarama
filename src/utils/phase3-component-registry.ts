// Phase 3 Component Registry - Premium and advanced components
// Version: 3.0.0 - King Aronui Coordination Protocol - Phase 3

import { enhancedComponentRegistry } from './enhanced-component-registry';
import { ComponentInfo } from './component-registry';

export class Phase3ComponentRegistry {
  private static instance: Phase3ComponentRegistry;
  private premiumComponents: Map<string, ComponentInfo> = new Map();

  private constructor() {
    this.initializePremiumComponents();
  }

  public static getInstance(): Phase3ComponentRegistry {
    if (!Phase3ComponentRegistry.instance) {
      Phase3ComponentRegistry.instance = new Phase3ComponentRegistry();
    }
    return Phase3ComponentRegistry.instance;
  }

  private initializePremiumComponents(): void {
    // Premium Analytics & Revenue Components - VERIFIED
    const premiumComponents = [
      {
        name: 'AdvancedAnalyticsDashboard',
        path: './components/AdvancedAnalyticsDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'analytics',
        description: 'Advanced analytics and data visualization dashboard',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'BeautifulTeacherDashboard',
        path: './components/BeautifulTeacherDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'premium-ui',
        description: 'Beautiful teacher dashboard with premium UI',
        lastVerified: new Date(),
        exports: ['default']
      },
      {
        name: 'AuthenticCulturalIntegrationDashboard',
        path: './components/AuthenticCulturalIntegrationDashboard',
        type: 'dashboard' as const,
        status: 'verified' as const,
        dependencies: ['react'],
        category: 'cultural',
        description: 'Authentic Māori cultural integration dashboard',
        lastVerified: new Date(),
        exports: ['default']
      }
    ];

    premiumComponents.forEach(component => {
      this.premiumComponents.set(component.name, component);
    });
  }

  public getPhase3Registry(): {
    totalComponents: number;
    verifiedComponents: number;
    categories: Record<string, number>;
    allComponents: ComponentInfo[];
    premiumComponents: number;
  } {
    const enhancedRegistry = enhancedComponentRegistry.getEnhancedRegistry();
    const enhancedComponents = enhancedComponentRegistry.getAllVerifiedComponents();
    
    const allComponents = [...enhancedComponents, ...Array.from(this.premiumComponents.values())];
    
    const categories: Record<string, number> = {};
    allComponents.forEach(component => {
      categories[component.category] = (categories[component.category] || 0) + 1;
    });

    return {
      totalComponents: enhancedRegistry.totalComponents + this.premiumComponents.size,
      verifiedComponents: enhancedRegistry.verifiedComponents + this.premiumComponents.size,
      categories,
      allComponents,
      premiumComponents: this.premiumComponents.size
    };
  }

  public getAllPhase3Components(): ComponentInfo[] {
    const enhancedComponents = enhancedComponentRegistry.getAllVerifiedComponents();
    const premiumComponents = Array.from(this.premiumComponents.values());
    return [...enhancedComponents, ...premiumComponents];
  }

  public generatePhase3Imports(): string {
    const allComponents = this.getAllPhase3Components();
    const imports: string[] = [];

    // Essential components first
    const essentialComponents = ['Navigation', 'SiteBreadcrumbs', 'SimpleStableHomepage'];
    essentialComponents.forEach(name => {
      imports.push(`import ${name} from './components/${name}';`);
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

    // Premium UI Components
    const premiumUIComponents = allComponents.filter(c => c.category === 'premium-ui');
    if (premiumUIComponents.length > 0) {
      imports.push('// ✨ PREMIUM UI COMPONENTS - Beautiful interfaces');
      premiumUIComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Analytics Components
    const analyticsComponents = allComponents.filter(c => c.category === 'analytics');
    if (analyticsComponents.length > 0) {
      imports.push('// 📊 ANALYTICS SYSTEMS - Data visualization');
      analyticsComponents.forEach(component => {
        imports.push(`import ${component.name} from '${component.path}';`);
      });
      imports.push('');
    }

    // Cultural Components
    const culturalComponents = allComponents.filter(c => c.category === 'cultural');
    if (culturalComponents.length > 0) {
      imports.push('// 🌿 CULTURAL SYSTEMS - Māori integration');
      culturalComponents.forEach(component => {
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

  public generatePhase3Routes(): Array<{
    path: string;
    component: string;
    category: string;
    comment?: string;
  }> {
    const allComponents = this.getAllPhase3Components();
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
    if (name.includes('advanced-analytics')) return '/advanced-analytics';
    if (name.includes('beautiful-teacher')) return '/beautiful-teacher';
    if (name.includes('authentic-cultural')) return '/authentic-cultural';
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
    if (name.includes('advanced-analytics')) return '// 📊 Advanced analytics dashboard';
    if (name.includes('beautiful-teacher')) return '// ✨ Beautiful teacher interface';
    if (name.includes('authentic-cultural')) return '// 🌿 Authentic Māori integration';
    if (name.includes('treasure-hunt')) return '// 🏺 Main treasure hunt interface';
    if (name.includes('treasure-inventory')) return '// 💎 Inventory of discovered treasures';
    if (name.includes('treasure-integration')) return '// 🏰 Integration of treasures into platform';
    
    return '';
  }

  public generatePhase3AppTsx(): string {
    const imports = this.generatePhase3Imports();
    const routes = this.generatePhase3Routes();
    
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

  public async generateAndSavePhase3AppTsx(): Promise<void> {
    const appContent = this.generatePhase3AppTsx();
    
    // Create backup of current App.tsx
    const { writeFileSync, copyFileSync, existsSync } = await import('fs');
    const { join } = await import('path');
    
    const appPath = join(process.cwd(), 'src', 'App.tsx');
    const backupPath = join(process.cwd(), 'src', `App-phase3-backup-${Date.now()}.tsx`);
    
    if (existsSync(appPath)) {
      copyFileSync(appPath, backupPath);
      console.log(`📁 Phase 3 backup created: ${backupPath}`);
    }
    
    writeFileSync(appPath, appContent);
    console.log('✅ Phase 3 App.tsx generated successfully');
    console.log(`📊 Total components included: ${this.getAllPhase3Components().length}`);
  }

  public getPhase3SystemStatus(): {
    totalComponents: number;
    verifiedComponents: number;
    categories: Record<string, number>;
    routes: number;
    premiumComponents: number;
  } {
    const phase3Registry = this.getPhase3Registry();
    const routes = this.generatePhase3Routes().length;

    return {
      ...phase3Registry,
      routes,
      premiumComponents: this.premiumComponents.size
    };
  }
}

// Export singleton instance
export const phase3ComponentRegistry = Phase3ComponentRegistry.getInstance();
