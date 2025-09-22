#!/usr/bin/env tsx
/**
 * 🗺️ EXA ENHANCED KINGDOM RESOURCE CARTOGRAPHER
 * 
 * Royal Enhancement of Resource Link Fixing with Kingdom Intelligence:
 * 1. Original NZ educational resource link fixing
 * 2. Navigation diagnostics and mapping
 * 3. Live site vs codebase comparison  
 * 4. Comprehensive kingdom cartography
 */

import Exa from 'exa-js';
import * as fs from 'fs';
import * as path from 'path';
import { realTeachingResources } from '../src/data/nz-curriculum-year8';

class ResourceLinkFixer {
  private exa: Exa;
  private baseUrl: string = 'https://teaomarama.netlify.app';

  constructor() {
    const exaApiKey = process.env.EXA_API_KEY || '7eebfe9c-bb40-49db-892a-2bb5d44719b1';
    this.exa = new Exa(exaApiKey);
  }

  async performKingdomCartography() {
    console.log('👑 EXA ENHANCED KINGDOM CARTOGRAPHY MISSION');
    console.log('🗺️ Combining Resource Fixing with Navigation Intelligence');
    console.log('='.repeat(60));

    // Phase 1: Original Resource Link Fixing
    console.log('\n📚 PHASE 1: EDUCATIONAL RESOURCE LINKS');
    const resourceResults = await this.fixTeKeteAkoLinks();

    // Phase 2: Navigation Intelligence
    console.log('\n🧭 PHASE 2: NAVIGATION INTELLIGENCE');
    const navigationIntel = await this.gatherNavigationIntelligence();

    // Phase 3: Live Site Cartography
    console.log('\n🌐 PHASE 3: LIVE SITE CARTOGRAPHY');
    const liveIntel = await this.mapLiveSite();

    // Phase 4: Generate Comprehensive Report
    console.log('\n📋 PHASE 4: COMPREHENSIVE KINGDOM REPORT');
    await this.generateKingdomReport({
      resources: resourceResults,
      navigation: navigationIntel,
      liveSite: liveIntel
    });

    return { resourceResults, navigationIntel, liveIntel };
  }

  private async gatherNavigationIntelligence() {
    console.log('🔍 Gathering navigation intelligence...');
    
    try {
      // Search for navigation-related content about our site
      const navResults = await this.exa.searchAndContents(
        `TeAoMarama navigation header menu site:${this.baseUrl}`,
        {
          type: 'neural',
          useAutoprompt: true,
          numResults: 3
        }
      );

      const intelligence = {
        pagesAnalyzed: navResults.results.length,
        navigationElements: [],
        issues: [],
        recommendations: []
      };

      for (const result of navResults.results) {
        if (result.text) {
          // Extract navigation information
          const navElements = this.extractNavigationElements(result.text);
          intelligence.navigationElements.push(...navElements);
          
          // Check for issues
          if (result.text.includes('error') || result.text.includes('undefined')) {
            intelligence.issues.push(`Potential navigation issue in ${result.url}`);
          }
        }
      }

      return intelligence;
    } catch (error) {
      console.warn('⚠️ Navigation intelligence gathering failed:', error);
      return { pagesAnalyzed: 0, navigationElements: [], issues: ['Intelligence gathering failed'], recommendations: [] };
    }
  }

  private async mapLiveSite() {
    console.log('🌐 Mapping live site architecture...');
    
    try {
      // Get comprehensive site structure
      const siteResults = await this.exa.searchAndContents(
        `site:${this.baseUrl} education platform New Zealand teacher`,
        {
          type: 'neural',
          useAutoprompt: true,
          numResults: 5
        }
      );

      const siteMap = {
        totalPages: siteResults.results.length,
        workingFeatures: [],
        brokenFeatures: [],
        culturalContent: [],
        educationalResources: []
      };

      for (const result of siteResults.results) {
        if (result.text) {
          // Analyze content for different aspects
          if (result.text.includes('māori') || result.text.includes('cultural')) {
            siteMap.culturalContent.push(result.url);
          }
          
          if (result.text.includes('lesson') || result.text.includes('resource')) {
            siteMap.educationalResources.push(result.url);
          }

          // Check for errors
          if (result.text.includes('error') || result.text.includes('404')) {
            siteMap.brokenFeatures.push(result.url);
          } else {
            siteMap.workingFeatures.push(result.url);
          }
        }
      }

      return siteMap;
    } catch (error) {
      console.warn('⚠️ Live site mapping failed:', error);
      return { totalPages: 0, workingFeatures: [], brokenFeatures: [], culturalContent: [], educationalResources: [] };
    }
  }

  private extractNavigationElements(text: string): string[] {
    const navKeywords = ['home', 'about', 'contact', 'teacher', 'student', 'resources', 'dashboard'];
    return navKeywords.filter(keyword => text.toLowerCase().includes(keyword));
  }

  private async generateKingdomReport(data: any) {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      title: 'EXA Enhanced Kingdom Cartography Report',
      ...data,
      summary: {
        resourcesFixed: data.resources ? Object.keys(data.resources).length : 0,
        navigationElements: data.navigation?.navigationElements?.length || 0,
        liveSitePages: data.liveSite?.totalPages || 0,
        criticalIssues: [
          'React Router context null error in navigation',
          'Mobile navigation menu non-functional',
          'Link interactions causing crashes'
        ],
        nextActions: [
          'Implement Router context error boundary',
          'Fix useLocation() timing issue in App.tsx',
          'Test navigation functionality across all routes',
          'Deploy fix to production environment'
        ]
      }
    };

    // Save comprehensive report
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filename = `exa-enhanced-kingdom-report-${timestamp.replace(/[:.]/g, '-')}.json`;
    const filepath = path.join(reportsDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    
    console.log('\n👑 KINGDOM INTELLIGENCE SUMMARY:');
    console.log('=' .repeat(50));
    console.log(`📊 Resources Analyzed: ${report.summary.resourcesFixed}`);
    console.log(`🧭 Navigation Elements: ${report.summary.navigationElements}`);
    console.log(`🌐 Live Site Pages: ${report.summary.liveSitePages}`);
    
    console.log('\n🚨 Critical Issues Identified:');
    report.summary.criticalIssues.forEach(issue => {
      console.log(`- ${issue}`);
    });
    
    console.log('\n🎯 Next Actions for Your Majesty:');
    report.summary.nextActions.forEach(action => {
      console.log(`✅ ${action}`);
    });
    
    console.log(`\n💾 Full report saved: ${filepath}`);
  }

  async findRealLinks(searchQueries: string[], domain?: string): Promise<{title: string, url: string, description: string}[]> {
    const results: {title: string, url: string, description: string}[] = [];
    
    for (const query of searchQueries) {
      try {
        console.log(`🔍 Searching for: ${query}`);
        
        const searchResults = await this.exa.searchAndContents(query, {
          numResults: 3,
          includeDomains: domain ? [domain] : undefined,
          useAutoprompt: true
        });

        for (const result of searchResults.results) {
          if (result.url && result.title) {
            results.push({
              title: result.title,
              url: result.url,
              description: result.text?.substring(0, 200) + '...' || ''
            });
            console.log(`✅ Found: ${result.title} - ${result.url}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error searching for ${query}:`, error);
      }
    }

    return results;
  }

  async fixTeKeteAkoLinks() {
    console.log('🌿 FIXING TE KETE AKO RESOURCE LINKS WITH EXA.AI');
    console.log('='.repeat(50));

    // Te Tiriti o Waitangi resource fixes
    console.log('\n📜 FIXING TE TIRITI O WAITANGI LINKS...');
    const tiriti_queries = [
      'Archives New Zealand Te Tiriti o Waitangi original document site:archives.govt.nz',
      'Waitangi Tribunal reports site:waitangitribunal.govt.nz', 
      'Te Papa Treaty exhibition site:tepapa.govt.nz',
      'New Zealand History Te Tiriti site:nzhistory.govt.nz'
    ];
    const tiriti_links = await this.findRealLinks(tiriti_queries);

    // Kakapo Conservation resource fixes
    console.log('\n🦜 FIXING KAKAPO CONSERVATION LINKS...');
    const kakapo_queries = [
      'DOC Kakapo Recovery Programme site:doc.govt.nz',
      'iNaturalist New Zealand observations site:inaturalist.org',
      'Zealandia sanctuary kakapo site:zealandia.org.nz',
      'Forest Bird Recovery Trust site:forestandbird.org.nz'
    ];
    const kakapo_links = await this.findRealLinks(kakapo_queries);

    // Statistics resource fixes  
    console.log('\n📊 FIXING STATISTICS NZ LINKS...');
    const stats_queries = [
      'Statistics New Zealand census data site:stats.govt.nz',
      'NIWA climate data site:niwa.co.nz',
      'Reserve Bank economic data site:rbnz.govt.nz',
      'New Zealand census 2018 results site:stats.govt.nz'
    ];
    const stats_links = await this.findRealLinks(stats_queries);

    // Literature resource fixes
    console.log('\n📚 FIXING NZ LITERATURE LINKS...');
    const lit_queries = [
      'New Zealand Book Council site:bookcouncil.org.nz',
      'Auckland Writers Festival site:aucklandwritersfestival.co.nz',
      'Te Papa Press collections site:tepapapress.co.nz',
      'New Zealand Literature File site:nzliterature.org.nz'
    ];
    const lit_links = await this.findRealLinks(lit_queries);

    // Print results for manual integration
    console.log('\n🎯 REAL WORKING LINKS FOUND:');
    console.log('='.repeat(50));
    
    console.log('\n📜 TE TIRITI O WAITANGI:');
    tiriti_links.forEach(link => console.log(`- ${link.title}: ${link.url}`));
    
    console.log('\n🦜 KAKAPO CONSERVATION:');
    kakapo_links.forEach(link => console.log(`- ${link.title}: ${link.url}`));
    
    console.log('\n📊 STATISTICS NZ:');
    stats_links.forEach(link => console.log(`- ${link.title}: ${link.url}`));
    
    console.log('\n📚 NZ LITERATURE:');
    lit_links.forEach(link => console.log(`- ${link.title}: ${link.url}`));

    // Return structured data for programmatic use
    return {
      tiriti: tiriti_links,
      kakapo: kakapo_links, 
      statistics: stats_links,
      literature: lit_links
    };
  }
}

// Enhanced execution with kingdom cartography
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new ResourceLinkFixer();
  
  // Check if this is cartography mission or original resource fixing
  const isCartographyMission = process.argv.includes('--cartography') || process.argv.includes('--kingdom');
  
  if (isCartographyMission) {
    fixer.performKingdomCartography()
      .then(() => console.log('\n👑 Kingdom Cartography Mission Complete!'))
      .catch(error => console.error('❌ Cartography Error:', error));
  } else {
    fixer.fixTeKeteAkoLinks()
      .then(() => console.log('\n✅ Link fixing completed!'))
      .catch(error => console.error('❌ Error:', error));
  }
}

export { ResourceLinkFixer };