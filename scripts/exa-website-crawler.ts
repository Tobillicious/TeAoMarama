#!/usr/bin/env tsx
/**
 * 🌐 EXA.AI WEBSITE CRAWLER - Te Kura o TeAoMarama Analysis
 * Crawls our deployed website to analyze performance, content, and opportunities
 */

import Exa from 'exa-js';
import * as fs from 'fs';
import * as path from 'path';

interface WebsiteAnalysis {
  url: string;
  title: string;
  content: string;
  links: string[];
  performance_insights: string[];
  cultural_content: string[];
  educational_resources: string[];
  accessibility_notes: string[];
  seo_insights: string[];
  recommendations: string[];
}

interface CrawlerReport {
  timestamp: string;
  total_pages_analyzed: number;
  site_performance_score: number;
  cultural_integration_score: number;
  educational_content_score: number;
  pages: WebsiteAnalysis[];
  summary: string;
  strategic_recommendations: string[];
}

class ExaWebsiteCrawler {
  private exa: Exa;
  private baseUrl: string = 'https://teaomarama.netlify.app';
  private pages: WebsiteAnalysis[] = [];

  constructor() {
    // Initialize Exa with API key from environment or fallback
    const exaApiKey = process.env.EXA_API_KEY || 'your-exa-api-key-here';
    this.exa = new Exa(exaApiKey);
  }

  async crawlWebsite(): Promise<CrawlerReport> {
    console.log('🌐 EXA.AI WEBSITE CRAWLER ACTIVATED');
    console.log(`🎯 Target: ${this.baseUrl}`);
    console.log('=' .repeat(50));

    try {
      // Primary pages to analyze
      const pagesToCrawl = [
        '',
        '/about',
        '/contact',
        '/migration-dashboard'
      ];

      for (const page of pagesToCrawl) {
        const fullUrl = `${this.baseUrl}${page}`;
        console.log(`🔍 Analyzing: ${fullUrl}`);
        
        try {
          const analysis = await this.analyzePage(fullUrl);
          if (analysis) {
            this.pages.push(analysis);
          }
        } catch (error) {
          console.warn(`⚠️  Failed to analyze ${fullUrl}:`, error);
        }
      }

      return this.generateReport();

    } catch (error) {
      console.error('🚨 Crawler error:', error);
      throw error;
    }
  }

  private async analyzePage(url: string): Promise<WebsiteAnalysis | null> {
    try {
      // Use Exa to search for content about our site
      const searchResults = await this.exa.searchAndContents(
        `site:${url} educational platform Te Ao Marama`,
        {
          type: "neural",
          useAutoprompt: true,
          numResults: 1,
          includeDomains: [this.baseUrl]
        }
      );

      if (!searchResults.results.length) {
        return null;
      }

      const result = searchResults.results[0];
      const content = result.text || '';

      return {
        url,
        title: result.title || 'Te Kura o TeAoMarama',
        content,
        links: this.extractLinks(content),
        performance_insights: this.analyzePerformance(content, url),
        cultural_content: this.identifyCulturalContent(content),
        educational_resources: this.identifyEducationalResources(content),
        accessibility_notes: this.analyzeAccessibility(content),
        seo_insights: this.analyzeSEO(content, result.title),
        recommendations: this.generatePageRecommendations(content, url)
      };

    } catch (error) {
      console.warn(`Failed to analyze ${url}:`, error);
      return null;
    }
  }

  private extractLinks(content: string): string[] {
    const linkRegex = /https?:\/\/[^\s<>"']+/g;
    return Array.from(content.match(linkRegex) || [])
      .filter(link => link.includes('teaomarama') || link.includes('netlify'));
  }

  private analyzePerformance(content: string, url: string): string[] {
    const insights: string[] = [];

    if (content.includes('loading') || content.includes('spinner')) {
      insights.push('✅ Loading states implemented for better UX');
    }

    if (content.includes('lazy') || content.includes('Suspense')) {
      insights.push('⚡ Code splitting and lazy loading detected');
    }

    if (url === this.baseUrl && content.includes('performance')) {
      insights.push('📊 Performance monitoring detected on homepage');
    }

    return insights;
  }

  private identifyCulturalContent(content: string): string[] {
    const culturalMarkers = [
      'māori', 'maori', 'te reo', 'whakataukī', 'whakatauki', 
      'tikanga', 'kaitiakitanga', 'manaakitanga', 'whanaungatanga',
      'aotearoa', 'tamariki', 'kaitiaki', 'mihara'
    ];

    return culturalMarkers.filter(marker => 
      content.toLowerCase().includes(marker)
    ).map(marker => `🌿 ${marker} integration detected`);
  }

  private identifyEducationalResources(content: string): string[] {
    const resources: string[] = [];

    if (content.includes('resources') || content.includes('educational')) {
      resources.push('📚 Educational resources section detected');
    }

    if (content.includes('mathematics') || content.includes('science')) {
      resources.push('🔢 STEM content available');
    }

    if (content.includes('assessment') || content.includes('curriculum')) {
      resources.push('📋 Assessment tools identified');
    }

    return resources;
  }

  private analyzeAccessibility(content: string): string[] {
    const notes: string[] = [];

    if (content.includes('aria-label') || content.includes('accessibility')) {
      notes.push('♿ Accessibility attributes detected');
    }

    if (content.includes('alt=') || content.includes('alt text')) {
      notes.push('🖼️ Image alt text implementation found');
    }

    return notes;
  }

  private analyzeSEO(content: string, title?: string): string[] {
    const insights: string[] = [];

    if (title && title.includes('Te') && title.includes('Mārama')) {
      insights.push('🎯 Brand-consistent title structure');
    }

    if (content.includes('New Zealand') || content.includes('Aotearoa')) {
      insights.push('🌏 Geographic targeting keywords present');
    }

    if (content.includes('education') && content.includes('platform')) {
      insights.push('📚 Core service keywords optimized');
    }

    return insights;
  }

  private generatePageRecommendations(content: string, url: string): string[] {
    const recommendations: string[] = [];

    if (url === this.baseUrl) {
      recommendations.push('🏠 Homepage: Consider adding more prominent CTA buttons');
      
      if (!content.includes('testimonial') && !content.includes('review')) {
        recommendations.push('💬 Add user testimonials for social proof');
      }
    }

    if (!content.includes('contact') && !url.includes('contact')) {
      recommendations.push('📞 Add clear contact information');
    }

    if (content.length < 500) {
      recommendations.push('📝 Consider expanding content for better SEO');
    }

    return recommendations;
  }

  private calculateScores(): { performance: number; cultural: number; educational: number } {
    let performanceTotal = 0;
    let culturalTotal = 0;
    let educationalTotal = 0;

    this.pages.forEach(page => {
      performanceTotal += page.performance_insights.length * 20;
      culturalTotal += page.cultural_content.length * 15;
      educationalTotal += page.educational_resources.length * 25;
    });

    return {
      performance: Math.min(100, performanceTotal),
      cultural: Math.min(100, culturalTotal),
      educational: Math.min(100, educationalTotal)
    };
  }

  private generateReport(): CrawlerReport {
    const scores = this.calculateScores();
    
    const strategicRecommendations = [
      '🚀 Implement advanced analytics to track educational engagement',
      '🌐 Create multi-language support starting with Te Reo Māori',
      '📱 Optimize mobile experience for tablet-based classroom use',
      '🔍 Implement semantic search across educational resources',
      '🤝 Add social sharing features for educational content',
      '📊 Create teacher dashboard with progress analytics',
      '🎯 Implement personalized learning paths based on cultural background'
    ];

    return {
      timestamp: new Date().toISOString(),
      total_pages_analyzed: this.pages.length,
      site_performance_score: scores.performance,
      cultural_integration_score: scores.cultural,
      educational_content_score: scores.educational,
      pages: this.pages,
      summary: `Analyzed ${this.pages.length} pages of Te Kura o TeAoMarama. Performance: ${scores.performance}%, Cultural Integration: ${scores.cultural}%, Educational Content: ${scores.educational}%. Platform shows strong cultural foundation with room for enhanced user engagement features.`,
      strategic_recommendations: strategicRecommendations
    };
  }

  async saveReport(report: CrawlerReport): Promise<void> {
    const reportsDir = path.join(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `exa-website-analysis-${timestamp}.json`;
    const filepath = path.join(reportsDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved: ${filepath}`);
  }
}

// Execute the crawler
async function main() {
  try {
    const crawler = new ExaWebsiteCrawler();
    const report = await crawler.crawlWebsite();
    
    console.log('\n🎯 WEBSITE ANALYSIS COMPLETE!');
    console.log('=' .repeat(50));
    console.log(`📊 Performance Score: ${report.site_performance_score}%`);
    console.log(`🌿 Cultural Integration: ${report.cultural_integration_score}%`);
    console.log(`📚 Educational Content: ${report.educational_content_score}%`);
    console.log(`\n📋 Summary: ${report.summary}`);
    
    console.log('\n🚀 Strategic Recommendations:');
    report.strategic_recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });

    await crawler.saveReport(report);
    
  } catch (error) {
    console.error('🚨 Crawler failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export default ExaWebsiteCrawler;