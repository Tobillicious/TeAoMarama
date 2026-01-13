/**
 * GLM-Powered Page Tester
 * Uses GLM to systematically test every page and identify issues
 */

export interface PageTestResult {
  url: string;
  status: 'success' | 'error' | 'warning';
  httpStatus: number;
  loadTime: number;
  errors: string[];
  warnings: string[];
  content: string;
  glmAIAnalysis: {
    pageType: string;
    functionality: string;
    issues: string[];
    recommendations: string[];
    culturalSafety: 'excellent' | 'good' | 'needs_improvement' | 'poor';
    educationalValue: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  };
}

export class GLMPageTester {
  private glmApiKey: string = '';
  private baseUrl: string = 'http://localhost:3000';

  constructor(glmApiKey?: string) {
    if (glmApiKey) {
      this.glmApiKey = glmApiKey;
    }
  }

  /**
   * Test a single page using GLM analysis
   */
  async testPage(url: string): Promise<PageTestResult> {
    const startTime = Date.now();

    try {
      // Fetch the page
      const response = await fetch(`${this.baseUrl}${url}`);
      const loadTime = Date.now() - startTime;

      let content = '';
      const errors: string[] = [];
      const warnings: string[] = [];

      if (response.ok) {
        content = await response.text();

        // Check for common issues
        if (content.includes('white') && content.length < 1000) {
          errors.push('Page appears to be white/empty');
        }

        if (content.includes('Error:') || content.includes('TypeError:')) {
          errors.push('JavaScript errors detected in content');
        }

        if (content.includes('Loading...') && content.length < 2000) {
          warnings.push('Page may be stuck in loading state');
        }

        if (!content.includes('Te Ao Mārama') && url === '/') {
          warnings.push('Homepage missing Te Ao Mārama branding');
        }
      } else {
        errors.push(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Use GLM to analyze the page
      const glmAIAnalysis = await this.analyzeWithGLM(url, content, errors, warnings);

      return {
        url,
        status: errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'success',
        httpStatus: response.status,
        loadTime,
        errors,
        warnings,
        content: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
        glmAIAnalysis,
      };
    } catch (error) {
      return {
        url,
        status: 'error',
        httpStatus: 0,
        loadTime: Date.now() - startTime,
        errors: [`Network error: ${error}`],
        warnings: [],
        content: '',
        glmAIAnalysis: {
          pageType: 'unknown',
          functionality: 'failed_to_load',
          issues: [`Failed to load page: ${error}`],
          recommendations: ['Check server status', 'Verify URL is correct'],
          culturalSafety: 'poor',
          educationalValue: 'poor',
        },
      };
    }
  }

  /**
   * Use GLM to analyze page content and functionality
   */
  private async analyzeWithGLM(
    url: string,
    content: string,
    errors: string[],
    warnings: string[],
  ): Promise<PageTestResult['glmAIAnalysis']> {
    if (!this.glmApiKey) {
      // Fallback analysis without GLM
      return this.fallbackAnalysis(url, content, errors, warnings);
    }

    try {
      const prompt = `
Analyze this web page for the Te Ao Mārama educational platform:

URL: ${url}
Content Length: ${content.length} characters
Errors: ${errors.join(', ') || 'None'}
Warnings: ${warnings.join(', ') || 'None'}

Content Preview: ${content.substring(0, 1000)}

Please provide analysis in this JSON format:
{
  "pageType": "homepage|dashboard|integration|coordination|other",
  "functionality": "working|partial|broken|unknown",
  "issues": ["list of specific issues found"],
  "recommendations": ["list of improvement recommendations"],
  "culturalSafety": "excellent|good|needs_improvement|poor",
  "educationalValue": "excellent|good|needs_improvement|poor"
}

Focus on:
1. Cultural safety and Te Ao Māori integration
2. Educational value for NZ teachers
3. Technical functionality
4. User experience
5. AI coordination features
`;

      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.glmApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'glm-4',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const analysis = JSON.parse(data.choices[0].message.content);
        return analysis;
      } else {
        throw new Error(`GLM API error: ${response.status}`);
      }
    } catch (error) {
      console.warn('GLM analysis failed, using fallback:', error);
      return this.fallbackAnalysis(url, content, errors, warnings);
    }
  }

  /**
   * Fallback analysis when GLM is not available
   */
  private fallbackAnalysis(
    url: string,
    content: string,
    errors: string[],
    warnings: string[],
  ): PageTestResult['glmAIAnalysis'] {
    let pageType = 'other';
    let functionality = 'unknown';
    let culturalSafety: 'excellent' | 'good' | 'needs_improvement' | 'poor' = 'poor';
    let educationalValue: 'excellent' | 'good' | 'needs_improvement' | 'poor' = 'poor';

    // Determine page type
    if (url === '/') pageType = 'homepage';
    else if (url.includes('dashboard')) pageType = 'dashboard';
    else if (url.includes('integration')) pageType = 'integration';
    else if (url.includes('coordination')) pageType = 'coordination';

    // Determine functionality
    if (errors.length === 0 && content.length > 1000) {
      functionality = 'working';
    } else if (errors.length === 0 && content.length > 500) {
      functionality = 'partial';
    } else if (errors.length > 0) {
      functionality = 'broken';
    }

    // Assess cultural safety
    if (
      content.includes('Te Ao Māori') ||
      content.includes('Te Reo') ||
      content.includes('tikanga')
    ) {
      culturalSafety = 'good';
    }
    if (content.includes('cultural') && content.includes('safety')) {
      culturalSafety = 'excellent';
    }

    // Assess educational value
    if (
      content.includes('education') ||
      content.includes('learning') ||
      content.includes('teaching')
    ) {
      educationalValue = 'good';
    }
    if (
      content.includes('curriculum') ||
      content.includes('assessment') ||
      content.includes('pedagogy')
    ) {
      educationalValue = 'excellent';
    }

    return {
      pageType,
      functionality,
      issues: errors,
      recommendations: warnings,
      culturalSafety,
      educationalValue,
    };
  }

  /**
   * Test all known pages in the application
   */
  async testAllPages(): Promise<PageTestResult[]> {
    const pages = [
      '/',
      '/advanced-ai-orchestration',
      '/mcp-communication',
      '/simple-glm-integration',
      '/harmony-coordination',
      '/advanced-coordination',
      '/supreme-overseer',
      '/treasure-discovery',
      '/massive-llm-society',
      '/authentic-cultural-integration',
      '/student',
      '/teacher',
      '/analytics',
      '/about',
      '/contact',
    ];

    console.log(`🧪 Testing ${pages.length} pages with GLM analysis...`);

    const results: PageTestResult[] = [];

    for (const page of pages) {
      console.log(`Testing: ${page}`);
      const result = await this.testPage(page);
      results.push(result);

      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return results;
  }

  /**
   * Generate a comprehensive test report
   */
  generateReport(results: PageTestResult[]): string {
    const totalPages = results.length;
    const successfulPages = results.filter((r) => r.status === 'success').length;
    const errorPages = results.filter((r) => r.status === 'error').length;
    const warningPages = results.filter((r) => r.status === 'warning').length;

    let report = `
# GLM-Powered Page Test Report
Generated: ${new Date().toISOString()}

## Summary
- Total Pages Tested: ${totalPages}
- ✅ Successful: ${successfulPages}
- ⚠️ Warnings: ${warningPages}
- ❌ Errors: ${errorPages}
- Success Rate: ${((successfulPages / totalPages) * 100).toFixed(1)}%

## Detailed Results

`;

    results.forEach((result) => {
      const statusIcon =
        result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';

      report += `
### ${statusIcon} ${result.url}
- **Status**: ${result.status.toUpperCase()}
- **HTTP**: ${result.httpStatus}
- **Load Time**: ${result.loadTime}ms
- **Page Type**: ${result.glmAIAnalysis.pageType}
- **Functionality**: ${result.glmAIAnalysis.functionality}
- **Cultural Safety**: ${result.glmAIAnalysis.culturalSafety}
- **Educational Value**: ${result.glmAIAnalysis.educationalValue}

`;

      if (result.errors.length > 0) {
        report += `**Errors:**\n${result.errors.map((e) => `- ${e}`).join('\n')}\n\n`;
      }

      if (result.warnings.length > 0) {
        report += `**Warnings:**\n${result.warnings.map((w) => `- ${w}`).join('\n')}\n\n`;
      }

      if (result.glmAIAnalysis.issues.length > 0) {
        report += `**GLM Issues:**\n${result.glmAIAnalysis.issues
          .map((i) => `- ${i}`)
          .join('\n')}\n\n`;
      }

      if (result.glmAIAnalysis.recommendations.length > 0) {
        report += `**GLM Recommendations:**\n${result.glmAIAnalysis.recommendations
          .map((r) => `- ${r}`)
          .join('\n')}\n\n`;
      }
    });

    return report;
  }
}

// Export singleton instance
export const glmPageTester = new GLMPageTester();
