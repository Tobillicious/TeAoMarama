#!/usr/bin/env tsx
/**
 * 🛣️ ADD MISSING ROUTES SCRIPT
 *
 * Adds routes for all the orphaned components that were migrated from Te Kete Ako
 * but don't have routes configured in App.tsx
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { basename, extname } from 'path';
interface RouteConfig {
  componentName: string;
  importPath: string;
  routePath: string;
}

class RouteManager {
  private componentsDir = 'src/components/educational/handouts';
  private pagesDir = 'src/pages';
  private appTsxPath = 'src/App.tsx';

  async addMissingRoutes(): Promise<void> {
    console.log('🛣️ Adding missing routes for orphaned components...\n');

    // Get all component files
    const _componentFiles = await this.getComponentFiles();
    const _existingRoutes = await this.getExistingRoutes();

    // Find missing routes
    const _missingRoutes = componentFiles.filter(
      (comp) => !existingRoutes.includes(comp.componentName),
    );

    console.log(`📊 Found ${componentFiles.length} total components`);
    console.log(`📊 Found ${existingRoutes.length} existing routes`);
    console.log(`📊 Found ${missingRoutes.length} missing routes`);

    if (missingRoutes.length === 0) {
      console.log('✅ All components have routes!');
      return;
    }

    // Add missing routes to App.tsx
    await this.updateAppTsx(missingRoutes);

    console.log(`✅ Added ${missingRoutes.length} missing routes!`);
  }

  private async getComponentFiles(): Promise<RouteConfig[]> {
    const components: RouteConfig[] = [];

    try {
      // Get educational components
      const _componentFiles = await readdir(this.componentsDir);
      for (const file of componentFiles) {
        if (extname(file) === '.tsx') {
          const _componentName = basename(file, '.tsx');
          const _importPath = `./components/educational/handouts/${componentName}`;
          const _routePath = `/${componentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

          components.push({
            componentName,
            importPath,
            routePath,
          });
        }
      }

      // Get pages
      const _pageFiles = await readdir(this.pagesDir);
      for (const file of pageFiles) {
        if (extname(file) === '.tsx') {
          const _componentName = basename(file, '.tsx');
          const _importPath = `./pages/${componentName}`;
          const _routePath = `/${componentName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

          components.push({
            componentName,
            importPath,
            routePath,
          });
        }
      }
    } catch (error) {
      console.error('Error reading component files:', error);
    }

    return components;
  }

  private async getExistingRoutes(): Promise<string[]> {
    try {
      const _appContent = await readFile(this.appTsxPath, 'utf8');
      const existingRoutes: string[] = [];

      // Extract component names from lazy imports
      const _lazyImportRegex = /const (\w+) = lazy(/g;
      let match;
      while ((match = lazyImportRegex.exec(appContent)) !== null) {
        existingRoutes.push(match[1]);
      }

      return existingRoutes;
    } catch (error) {
      console.error('Error reading existing routes:', error);
      return [];
    }
  }

  private async updateAppTsx(missingRoutes: RouteConfig[]): Promise<void> {
    try {
      let appContent = await readFile(this.appTsxPath, 'utf8');

      // Add lazy imports for missing components
      const _lazyImports = missingRoutes
        .map((route) => `const ${route.componentName} = lazy(() => import('${route.importPath}'));`)
        .join('\n');

      // Find the position to insert new imports (after existing lazy imports)
      const _importEndIndex = appContent.lastIndexOf(
        '// Newly migrated components from Te Kete Ako',
      );
      if (importEndIndex !== -1) {
        const _insertPosition = appContent.indexOf('\n', importEndIndex) + 1;
        appContent =
          appContent.slice(0, insertPosition) +
          lazyImports +
          '\n\n' +
          appContent.slice(insertPosition);
      } else {
        // Fallback: insert before the LoadingSpinner
        const _spinnerIndex = appContent.indexOf('// Optimized loading component');
        if (spinnerIndex !== -1) {
          appContent =
            appContent.slice(0, spinnerIndex) +
            lazyImports +
            '\n\n' +
            appContent.slice(spinnerIndex);
        }
      }

      // Add routes to the routes array
      const _routeEntries = missingRoutes
        .map(
          (route) => `      { path: '${route.routePath}', element: <${route.componentName} /> },`,
        )
        .join('\n');

      // Find the routes array and add new routes
      const _routesEndIndex = appContent.lastIndexOf('    ],');
      if (routesEndIndex !== -1) {
        appContent =
          appContent.slice(0, routesEndIndex) +
          routeEntries +
          '\n' +
          appContent.slice(routesEndIndex);
      }

      // Write the updated content
      await writeFile(this.appTsxPath, appContent, 'utf8');
      console.log('✅ Updated App.tsx with missing routes');
    } catch (error) {
      console.error('Error updating App.tsx:', error);
    }
  }
}

// Run the route manager
const _routeManager = new RouteManager();
routeManager
  .addMissingRoutes()
  .then(() => {
    console.log('\n🛣️ Route addition complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Route addition failed:', error);
    process.exit(1);
  });
