// App.tsx Generator - Systematic application generation using component registry
// Version: 1.0.0 - King Aronui Coordination Protocol

import { componentRegistry } from './component-registry';

export class AppGenerator {
  private static instance: AppGenerator;

  private constructor() {}

  public static getInstance(): AppGenerator {
    if (!AppGenerator.instance) {
      AppGenerator.instance = new AppGenerator();
    }
    return AppGenerator.instance;
  }

  public generateAppTsx(): string {
    const imports = this.generateImports();
    const routes = this.generateRoutes();
    
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
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>🏺 Loading Treasures...</div>}>
                <Routes>
${routes}
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

  private generateImports(): string {
    const verifiedComponents = componentRegistry.getVerifiedComponents();
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

    // Working components
    const workingComponents = verifiedComponents.filter(c => c.category === 'educational');
    if (workingComponents.length > 0) {
      imports.push('// Core Educational Features - verified working');
      workingComponents.forEach(component => {
        imports.push(componentRegistry.getImportStatement(component.name)!);
      });
      imports.push('');
    }

    // Treasure hunt components
    const treasureComponents = verifiedComponents.filter(c => c.category === 'treasure-hunt');
    if (treasureComponents.length > 0) {
      imports.push('// 🏺 TREASURE HUNT SYSTEMS - Core mission components');
      treasureComponents.forEach(component => {
        imports.push(componentRegistry.getImportStatement(component.name)!);
      });
      imports.push('');
    }

    // Coordination components
    const coordinationComponents = verifiedComponents.filter(c => c.category === 'coordination');
    if (coordinationComponents.length > 0) {
      imports.push('// 🎛️ COORDINATION SYSTEMS - Simple versions to avoid export errors');
      coordinationComponents.forEach(component => {
        imports.push(componentRegistry.getImportStatement(component.name)!);
      });
      imports.push('');
    }

    // Test components
    const testComponents = verifiedComponents.filter(c => c.category === 'test');
    if (testComponents.length > 0) {
      imports.push('// Test components');
      testComponents.forEach(component => {
        imports.push(componentRegistry.getImportStatement(component.name)!);
      });
      imports.push('');
    }

    return imports.join('\n');
  }

  private generateRoutes(): string {
    const routeConfig = componentRegistry.generateRouteConfig();
    const routes: string[] = [];

    // Home route
    routes.push('                  {/* 🏠 HOME */}');
    routes.push('                  <Route path="/" element={<SimpleStableHomepage />} />');
    routes.push('');

    // Group routes by category
    const categories = this.groupRoutesByCategory(routeConfig);

    Object.entries(categories).forEach(([category, categoryRoutes]) => {
      const categoryComment = this.getCategoryComment(category);
      if (categoryComment) {
        routes.push(`                  ${categoryComment}`);
      }
      
      categoryRoutes.forEach(route => {
        const element = `<${route.component} />`;
        const comment = this.getRouteComment(route.component);
        if (comment) {
          routes.push(`                  ${comment}`);
        }
        routes.push(`                  <Route path="${route.path}" element={${element}} />`);
      });
      
      if (categoryRoutes.length > 0) {
        routes.push('');
      }
    });

    return routes.join('\n');
  }

  private groupRoutesByCategory(routeConfig: Array<{ path: string; component: string; category: string }>): Record<string, Array<{ path: string; component: string; category: string }>> {
    const grouped: Record<string, Array<{ path: string; component: string; category: string }>> = {};

    routeConfig.forEach(route => {
      if (!grouped[route.category]) {
        grouped[route.category] = [];
      }
      grouped[route.category].push(route);
    });

    return grouped;
  }

  private getCategoryComment(category: string): string {
    const comments: Record<string, string> = {
      'educational': '/* 📚 CORE EDUCATIONAL FEATURES */',
      'treasure-hunt': '/* 🏺 TREASURE HUNT MISSION - PRIORITY SYSTEMS */',
      'coordination': '/* 🎛️ COORDINATION SYSTEMS */',
      'test': '/* 🧪 TEST SYSTEMS */'
    };

    return comments[category] || '';
  }

  private getRouteComment(componentName: string): string {
    // Add specific comments for important routes
    if (componentName.includes('TreasureHunt')) {
      return '// 🏺 Main treasure hunt interface';
    }
    if (componentName.includes('TreasureInventory')) {
      return '// 💎 Inventory of discovered treasures';
    }
    if (componentName.includes('TreasureIntegration')) {
      return '// 🏰 Integration of treasures into platform';
    }
    
    return '';
  }

  public async generateAndSaveAppTsx(): Promise<void> {
    const appContent = this.generateAppTsx();
    
    // Create backup of current App.tsx
    const { writeFileSync, copyFileSync, existsSync } = await import('fs');
    const { join } = await import('path');
    
    const appPath = join(process.cwd(), 'src', 'App.tsx');
    const backupPath = join(process.cwd(), 'src', `App-backup-${Date.now()}.tsx`);
    
    if (existsSync(appPath)) {
      copyFileSync(appPath, backupPath);
      console.log(`📁 Backup created: ${backupPath}`);
    }
    
    writeFileSync(appPath, appContent);
    console.log('✅ App.tsx generated successfully');
    console.log(`📊 Components included: ${componentRegistry.getVerifiedComponents().length}`);
  }

  public getSystemStatus(): {
    totalComponents: number;
    verifiedComponents: number;
    categories: Record<string, number>;
    routes: number;
  } {
    const registryStatus = componentRegistry.getRegistryStatus();
    const routes = componentRegistry.generateRouteConfig().length;

    return {
      ...registryStatus,
      routes
    };
  }
}

// Export singleton instance
export const appGenerator = AppGenerator.getInstance();
