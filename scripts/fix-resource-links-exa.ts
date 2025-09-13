#!/usr/bin/env tsx
/**
 * 🔗 FIX RESOURCE LINKS WITH EXA.AI
 * Uses Exa to find real, working NZ educational resource links
 */

import Exa from 'exa-js';
import { realTeachingResources } from '../src/data/nz-curriculum-year8';

class ResourceLinkFixer {
  private exa: Exa;

  constructor() {
    const exaApiKey = process.env.EXA_API_KEY || 'your-exa-api-key-here';
    this.exa = new Exa(exaApiKey);
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

// Run the fixer if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new ResourceLinkFixer();
  fixer.fixTeKeteAkoLinks()
    .then(() => console.log('\n✅ Link fixing completed!'))
    .catch(error => console.error('❌ Error:', error));
}

export { ResourceLinkFixer };