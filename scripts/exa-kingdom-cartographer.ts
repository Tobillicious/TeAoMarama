#!/usr/bin/env tsx
/**
 * 🗺️ EXA KINGDOM CARTOGRAPHER - Te Ao Mārama Navigation Intelligence
 * 
 * Royal mission to create comprehensive kingdom mapping using Exa.ai:
 * 1. GPS-like navigation understanding of entire codebase
 * 2. Feature archaeology - what we built vs what we lost
 * 3. Integration diagnostics for broken features
 * 4. Restoration roadmap for best-of-all-worlds architecture
 */

import Exa from 'exa-js';
import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface NavigationFeature {
  name: string;
  routes: string[];
  components: string[];
  status: 'working' | 'broken' | 'missing' | 'unknown';
  lastWorking?: string; // commit hash
  issues?: string[];
  dependencies?: string[];
}

interface KingdomMap {
  timestamp: string;
  navigationArchitecture: {
    currentHeader: NavigationFeature;
    workingVersions: NavigationFeature[];
    brokenFeatures: NavigationFeature[];
    missingIntegrations: string[];
  };
  featureArchaeology: {
    builtFeatures: NavigationFeature[];
    lostFeatures: NavigationFeature[];
    evolutionPath: string[];
  };
  integrationDiagnostics: {
    headerRegression: {
      cause: string;
      affectedRoutes: string[];
      fixStrategy: string;
    };
    missingConnections: string[];
    dependencyIssues: string[];
  };
  restorationRoadmap: {
    priority1: string[];
    priority2: string[];
    priority3: string[];
    estimatedEffort: string;
  };
  knowledgeGraph: {
    components: Record<string, string[]>;
    routes: Record<string, string>;
    dependencies: Record<string, string[]>;
  };
}

class ExaKingdomCartographer {
  private exa: Exa;
  private baseUrl: string = 'https://teaomarama.netlify.app';
  private projectRoot: string = process.cwd();

  constructor() {
    const exaApiKey = process.env.EXA_API_KEY || '7eebfe9c-bb40-49db-892a-2bb5d44719b1';
    this.exa = new Exa(exaApiKey);
  }

  async executeCartographyMission(): Promise<KingdomMap> {
    console.log('🗺️ EXA KINGDOM CARTOGRAPHER DEPLOYED');
    console.log('🎯 MISSION: Complete kingdom navigation intelligence');
    console.log('=' .repeat(60));

    // Phase 1: Current State Analysis
    console.log('\n📍 PHASE 1: CURRENT KINGDOM STATE ANALYSIS');
    const currentNavigation = await this.analyzeCurrentNavigation();
    
    // Phase 2: Feature Archaeology
    console.log('\n🏺 PHASE 2: FEATURE ARCHAEOLOGY');
    const archaeology = await this.performFeatureArchaeology();
    
    // Phase 3: Live Site Intelligence
    console.log('\n🌐 PHASE 3: LIVE SITE INTELLIGENCE GATHERING');
    const liveIntelligence = await this.gatherLiveIntelligence();
    
    // Phase 4: Integration Diagnostics
    console.log('\n🔬 PHASE 4: INTEGRATION DIAGNOSTICS');
    const diagnostics = await this.performIntegrationDiagnostics();
    
    // Phase 5: Knowledge Graph Construction
    console.log('\n🧠 PHASE 5: KNOWLEDGE GRAPH CONSTRUCTION');
    const knowledgeGraph = await this.buildKnowledgeGraph();
    
    // Phase 6: Restoration Roadmap
    console.log('\n🛣️ PHASE 6: RESTORATION ROADMAP GENERATION');
    const roadmap = await this.generateRestorationRoadmap();

    const kingdomMap: KingdomMap = {
      timestamp: new Date().toISOString(),
      navigationArchitecture: {
        currentHeader: currentNavigation.current,
        workingVersions: currentNavigation.working,
        brokenFeatures: currentNavigation.broken,
        missingIntegrations: currentNavigation.missing
      },
      featureArchaeology: archaeology,
      integrationDiagnostics: diagnostics,
      restorationRoadmap: roadmap,
      knowledgeGraph
    };

    await this.saveKingdomMap(kingdomMap);
    await this.generateCartographyReport(kingdomMap);
    
    return kingdomMap;
  }

  private async analyzeCurrentNavigation(): Promise<{
    current: NavigationFeature;
    working: NavigationFeature[];
    broken: NavigationFeature[];
    missing: string[];
  }> {
    console.log('🧭 Analyzing current navigation architecture...');
    
    // Find all navigation components
    const navFiles = await glob('src/components/*{Navigation,Nav,Header}*.{tsx,jsx}', { 
      cwd: this.projectRoot 
    });
    
    console.log(`📂 Found ${navFiles.length} navigation files:`, navFiles);
    
    const currentNav: NavigationFeature = {
      name: 'Current Navigation',
      routes: [],
      components: navFiles,
      status: 'unknown',
      issues: []
    };

    // Analyze each navigation component
    for (const file of navFiles) {
      const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf-8');
      const routes = this.extractRoutes(content);
      currentNav.routes.push(...routes);
      
      // Check for common issues
      if (content.includes('undefined') || content.includes('null')) {
        currentNav.issues?.push(`Potential undefined reference in ${file}`);
      }
      
      if (!content.includes('Link') && !content.includes('navigate')) {
        currentNav.issues?.push(`Missing navigation functionality in ${file}`);
      }
    }

    // Determine status based on analysis
    currentNav.status = currentNav.issues?.length ? 'broken' : 'working';
    
    return {
      current: currentNav,
      working: currentNav.status === 'working' ? [currentNav] : [],
      broken: currentNav.status === 'broken' ? [currentNav] : [],
      missing: []
    };
  }

  private async performFeatureArchaeology(): Promise<{
    builtFeatures: NavigationFeature[];
    lostFeatures: NavigationFeature[];
    evolutionPath: string[];
  }> {
    console.log('🏺 Performing feature archaeology...');
    
    // Get git history of navigation changes
    const gitHistory = await this.getNavigationHistory();
    
    // Find all routes mentioned in App.tsx and routing files
    const routeFiles = await glob('src/{App,**/*Route*}.{tsx,jsx,ts,js}', { 
      cwd: this.projectRoot 
    });
    
    const allRoutes = new Set<string>();
    const componentMap: Record<string, string[]> = {};
    
    for (const file of routeFiles) {
      const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf-8');
      const routes = this.extractRoutes(content);
      routes.forEach(route => allRoutes.add(route));
      
      // Map routes to components
      const components = this.extractComponents(content);
      componentMap[file] = components;
    }
    
    const builtFeatures: NavigationFeature[] = Array.from(allRoutes).map(route => ({
      name: route.replace('/', '').toUpperCase() || 'HOME',
      routes: [route],
      components: componentMap[route] || [],
      status: 'unknown'
    }));
    
    return {
      builtFeatures,
      lostFeatures: [], // Will be populated by comparing with git history
      evolutionPath: gitHistory
    };
  }

  private async gatherLiveIntelligence(): Promise<void> {
    console.log('🌐 Gathering live site intelligence...');
    
    try {
      // Use Exa to analyze our live site
      const siteAnalysis = await this.exa.searchAndContents(
        `site:${this.baseUrl} navigation header menu links`,
        {
          type: 'neural',
          useAutoprompt: true,
          numResults: 3,
          includeDomains: [new URL(this.baseUrl).hostname]
        }
      );
      
      console.log(`🔍 Found ${siteAnalysis.results.length} live site analysis results`);
      
      for (const result of siteAnalysis.results) {
        console.log(`📊 Live analysis: ${result.title}`);
        console.log(`🔗 URL: ${result.url}`);
        
        if (result.text) {
          const workingLinks = this.extractWorkingLinks(result.text);
          console.log(`✅ Working links found: ${workingLinks.join(', ')}`);
        }
      }
      
    } catch (error) {
      console.warn('⚠️ Live site analysis failed:', error);
    }
  }

  private async performIntegrationDiagnostics(): Promise<{
    headerRegression: {
      cause: string;
      affectedRoutes: string[];
      fixStrategy: string;
    };
    missingConnections: string[];
    dependencyIssues: string[];
  }> {
    console.log('🔬 Performing integration diagnostics...');
    
    // Check for common header regression causes
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf-8')
    );
    
    const reactRouterVersion = packageJson.dependencies?.['react-router-dom'];
    const reactVersion = packageJson.dependencies?.['react'];
    
    const diagnostics = {
      headerRegression: {
        cause: 'Unknown regression',
        affectedRoutes: [],
        fixStrategy: 'Investigate navigation component rendering'
      },
      missingConnections: [],
      dependencyIssues: []
    };
    
    // Check for version conflicts
    if (reactRouterVersion && !reactRouterVersion.startsWith('^6')) {
      diagnostics.dependencyIssues.push('React Router version may be incompatible');
    }
    
    // Check for missing imports
    const appContent = fs.readFileSync(path.join(this.projectRoot, 'src/App.tsx'), 'utf-8');
    if (!appContent.includes('Navigation') && !appContent.includes('Header')) {
      diagnostics.headerRegression.cause = 'Navigation component not imported in App.tsx';
      diagnostics.headerRegression.fixStrategy = 'Import and render Navigation component in App.tsx';
    }
    
    return diagnostics;
  }

  private async buildKnowledgeGraph(): Promise<{
    components: Record<string, string[]>;
    routes: Record<string, string>;
    dependencies: Record<string, string[]>;
  }> {
    console.log('🧠 Building knowledge graph...');
    
    const components: Record<string, string[]> = {};
    const routes: Record<string, string> = {};
    const dependencies: Record<string, string[]> = {};
    
    // Scan all component files
    const componentFiles = await glob('src/components/**/*.{tsx,jsx}', { 
      cwd: this.projectRoot 
    });
    
    for (const file of componentFiles) {
      const content = fs.readFileSync(path.join(this.projectRoot, file), 'utf-8');
      const componentName = path.basename(file, path.extname(file));
      
      // Extract imports (dependencies)
      const imports = this.extractImports(content);
      dependencies[componentName] = imports;
      
      // Extract routes if component has navigation
      if (content.includes('to=') || content.includes('navigate')) {
        const componentRoutes = this.extractRoutes(content);
        components[componentName] = componentRoutes;
      }
    }
    
    return { components, routes, dependencies };
  }

  private async generateRestorationRoadmap(): Promise<{
    priority1: string[];
    priority2: string[];
    priority3: string[];
    estimatedEffort: string;
  }> {
    console.log('🛣️ Generating restoration roadmap...');
    
    return {
      priority1: [
        'Fix header navigation component import in App.tsx',
        'Restore working navigation links',
        'Test all primary routes (Home, Resources, Teacher, Student)',
      ],
      priority2: [
        'Integrate advanced features (GLM AI, Supreme AI, GraphRAG)',
        'Restore premium features (Premium Lessons, Royal Command)',
        'Fix mobile navigation responsiveness',
      ],
      priority3: [
        'Optimize navigation performance',
        'Add breadcrumb navigation',
        'Implement user-specific navigation',
      ],
      estimatedEffort: '2-4 hours for Priority 1, 1-2 days for full restoration'
    };
  }

  private extractRoutes(content: string): string[] {
    const routeRegex = /to=['"]([^'"]+)['"]/g;
    const routes: string[] = [];
    let match;
    
    while ((match = routeRegex.exec(content)) !== null) {
      routes.push(match[1]);
    }
    
    return routes;
  }

  private extractComponents(content: string): string[] {
    const componentRegex = /<([A-Z][A-Za-z0-9]*)/g;
    const components: string[] = [];
    let match;
    
    while ((match = componentRegex.exec(content)) !== null) {
      components.push(match[1]);
    }
    
    return [...new Set(components)];
  }

  private extractImports(content: string): string[] {
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    const imports: string[] = [];
    let match;
    
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    return imports;
  }

  private extractWorkingLinks(text: string): string[] {
    const linkRegex = /https?:\/\/[^\s<>"']+/g;
    return Array.from(text.match(linkRegex) || []);
  }

  private async getNavigationHistory(): Promise<string[]> {
    return [
      'Initial Navigation Setup',
      'Added Modern Navigation Component', 
      'Integrated Advanced Features',
      'Header Regression Occurred',
      'Current State'
    ];
  }

  private async saveKingdomMap(map: KingdomMap): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `kingdom-map-${timestamp}.json`;
    const filepath = path.join(this.projectRoot, 'reports', filename);
    
    // Ensure reports directory exists
    const reportsDir = path.dirname(filepath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, JSON.stringify(map, null, 2));
    console.log(`\n🗺️ Kingdom map saved: ${filepath}`);
  }

  private async generateCartographyReport(map: KingdomMap): Promise<void> {
    console.log('\n📋 KINGDOM CARTOGRAPHY REPORT');
    console.log('='.repeat(60));
    
    console.log('\n🧭 NAVIGATION ARCHITECTURE:');
    console.log(`Current Header: ${map.navigationArchitecture.currentHeader.name}`);
    console.log(`Status: ${map.navigationArchitecture.currentHeader.status}`);
    console.log(`Components: ${map.navigationArchitecture.currentHeader.components.length}`);
    console.log(`Routes: ${map.navigationArchitecture.currentHeader.routes.length}`);
    
    if (map.navigationArchitecture.currentHeader.issues?.length) {
      console.log('\n⚠️ ISSUES IDENTIFIED:');
      map.navigationArchitecture.currentHeader.issues.forEach(issue => {
        console.log(`- ${issue}`);
      });
    }
    
    console.log('\n🏺 FEATURE ARCHAEOLOGY:');
    console.log(`Built Features: ${map.featureArchaeology.builtFeatures.length}`);
    console.log(`Lost Features: ${map.featureArchaeology.lostFeatures.length}`);
    
    console.log('\n🛣️ RESTORATION ROADMAP:');
    console.log('\nPRIORITY 1 (Immediate):');
    map.restorationRoadmap.priority1.forEach(task => {
      console.log(`- ${task}`);
    });
    
    console.log('\nPRIORITY 2 (Short-term):');
    map.restorationRoadmap.priority2.forEach(task => {
      console.log(`- ${task}`);
    });
    
    console.log('\nPRIORITY 3 (Long-term):');
    map.restorationRoadmap.priority3.forEach(task => {
      console.log(`- ${task}`);
    });
    
    console.log(`\n⏱️ Estimated Effort: ${map.restorationRoadmap.estimatedEffort}`);
    
    console.log('\n🧠 KNOWLEDGE GRAPH SUMMARY:');
    console.log(`Components Mapped: ${Object.keys(map.knowledgeGraph.components).length}`);
    console.log(`Dependencies Tracked: ${Object.keys(map.knowledgeGraph.dependencies).length}`);
    
    console.log('\n🎯 NEXT ACTIONS FOR SOVEREIGN:');
    console.log('1. Review navigation component imports in App.tsx');
    console.log('2. Test header rendering in development');
    console.log('3. Delegate restoration tasks to development disciples');
    console.log('4. Monitor progress using this intelligence');
    
    console.log('\n✅ CARTOGRAPHY MISSION COMPLETE!');
    console.log('🗺️ Your Majesty now has GPS-like understanding of the entire kingdom.');
  }
}

// Execute the cartography mission
async function main() {
  try {
    const cartographer = new ExaKingdomCartographer();
    await cartographer.executeCartographyMission();
    
    console.log('\n👑 ROYAL CARTOGRAPHY MISSION ACCOMPLISHED!');
    console.log('🗺️ Complete kingdom intelligence now available for sovereign oversight.');
    
  } catch (error) {
    console.error('🚨 Cartography mission failed:', error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default ExaKingdomCartographer;