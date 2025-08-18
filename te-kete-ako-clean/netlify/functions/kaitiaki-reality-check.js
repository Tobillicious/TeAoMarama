/**
 * KAITIAKI ARONUI REALITY CHECK SERVICE
 * DeepSeek-powered analysis of platform audit reports
 * Prevents AI hallucination by providing ground truth feedback
 */

const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const auditReport = JSON.parse(event.body);
        
        console.log('🔍 Kaitiaki Reality Check - Processing Audit Report:', {
            timestamp: auditReport.timestamp,
            healthScore: calculateHealthScore(auditReport)
        });

        // Analyze the audit report with DeepSeek
        const analysis = await analyzeWithDeepSeek(auditReport);
        
        // Store the analysis for future reference
        const storedAnalysis = await storeAnalysis(auditReport, analysis);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                analysis: analysis,
                healthScore: calculateHealthScore(auditReport),
                recommendations: generateRecommendations(auditReport),
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Reality Check Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to process reality check',
                details: error.message
            })
        };
    }
};

async function analyzeWithDeepSeek(auditReport) {
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    
    if (!DEEPSEEK_API_KEY) {
        console.warn('DeepSeek API key not configured');
        return { error: 'DeepSeek API not configured' };
    }

    const prompt = createAnalysisPrompt(auditReport);
    
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are Kaitiaki Aronui\'s reality auditor. Analyze this platform audit report and provide honest, actionable feedback about what is actually working vs what might be assumed. Focus on identifying real issues, not theoretical ones. Be concise but thorough.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`DeepSeek API error: ${response.status}`);
        }

        const data = await response.json();
        return {
            analysis: data.choices[0].message.content,
            model: data.model,
            usage: data.usage
        };

    } catch (error) {
        console.error('DeepSeek Analysis Error:', error);
        return {
            error: 'Failed to analyze with DeepSeek',
            fallbackAnalysis: generateFallbackAnalysis(auditReport)
        };
    }
}

function createAnalysisPrompt(auditReport) {
    return `
KAITIAKI ARONUI PLATFORM AUDIT REPORT
=====================================

TIMESTAMP: ${auditReport.timestamp}

PAGE HEALTH:
- Broken Links: ${auditReport.pageHealth?.brokenLinks?.length || 0}
- Missing Resources: ${auditReport.pageHealth?.missingResources?.length || 0}
- JavaScript Errors: ${auditReport.pageHealth?.jsErrors?.length || 0}
- CSS Failures: ${auditReport.pageHealth?.cssFailures?.length || 0}
- Image Failures: ${auditReport.pageHealth?.imageFailures?.length || 0}

DESIGN SYSTEM STATUS:
- CSS Variables Loaded: ${auditReport.designSystem?.cssVariablesLoaded}
- Custom Fonts Loaded: ${auditReport.designSystem?.customFontsLoaded}
- Animations Working: ${auditReport.designSystem?.animationsWorking}
- Cultural Components Active: ${auditReport.designSystem?.culturalComponentsActive}

FUNCTIONALITY:
- Navigation Issues: ${auditReport.functionality?.navigation?.issues?.length || 0}
- Form Issues: ${auditReport.functionality?.forms?.issues?.length || 0}
- Button Issues: ${auditReport.functionality?.buttons?.issues?.length || 0}

PERFORMANCE:
- Load Time: ${auditReport.performance?.loadTime}ms
- Render Time: ${auditReport.performance?.renderTime}ms
- Resource Count: ${auditReport.performance?.resourceCount}

CONTENT:
- Cultural Elements: ${auditReport.content?.culturalElements}
- Educational Resources: ${auditReport.content?.educationalResources}
- Missing Content Items: ${auditReport.content?.missingContent?.length || 0}

CULTURAL COMPLIANCE:
- Te Reo Māori Present: ${auditReport.cultural?.teReoMaoriPresent}
- Cultural Colors Used: ${auditReport.cultural?.culturalColorsUsed}
- Respectful Representation: ${auditReport.cultural?.respectfulRepresentation}
- Cultural Issues: ${auditReport.cultural?.issues?.length || 0}

ACCESSIBILITY:
- Alt Text Present: ${auditReport.accessibility?.altTextPresent}
- Focus Indicators: ${auditReport.accessibility?.focusIndicators}
- Issues: ${auditReport.accessibility?.issues?.length || 0}

ANALYSIS REQUIRED:
1. What are the CRITICAL issues that need immediate attention?
2. What might Kaitiaki Aronui be hallucinating about (thinking works but doesn't)?
3. What is actually working well that should be maintained?
4. What are the top 3 priorities for improvement?
5. Any cultural safety concerns?

Provide honest, actionable feedback focusing on reality vs assumptions.
`;
}

function calculateHealthScore(auditReport) {
    let score = 100;
    
    // Page Health penalties
    const pageHealth = auditReport.pageHealth || {};
    score -= (pageHealth.brokenLinks?.length || 0) * 10;
    score -= (pageHealth.jsErrors?.length || 0) * 5;
    score -= (pageHealth.missingResources?.length || 0) * 8;
    score -= (pageHealth.cssFailures?.length || 0) * 7;
    score -= (pageHealth.imageFailures?.length || 0) * 3;
    
    // Design System penalties
    const designSystem = auditReport.designSystem || {};
    if (!designSystem.cssVariablesLoaded) score -= 15;
    if (!designSystem.customFontsLoaded) score -= 10;
    if (!designSystem.culturalComponentsActive) score -= 20;
    
    // Functionality penalties
    const functionality = auditReport.functionality || {};
    score -= (functionality.navigation?.issues?.length || 0) * 8;
    score -= (functionality.forms?.issues?.length || 0) * 6;
    score -= (functionality.buttons?.issues?.length || 0) * 4;
    
    // Cultural compliance penalties
    const cultural = auditReport.cultural || {};
    if (!cultural.teReoMaoriPresent) score -= 15;
    if (!cultural.respectfulRepresentation) score -= 25;
    score -= (cultural.issues?.length || 0) * 10;
    
    // Accessibility penalties
    const accessibility = auditReport.accessibility || {};
    if (!accessibility.altTextPresent) score -= 12;
    if (!accessibility.focusIndicators) score -= 8;
    score -= (accessibility.issues?.length || 0) * 5;
    
    return Math.max(0, Math.round(score));
}

function generateRecommendations(auditReport) {
    const recommendations = [];
    
    // Page Health recommendations
    const pageHealth = auditReport.pageHealth || {};
    if ((pageHealth.brokenLinks?.length || 0) > 0) {
        recommendations.push({
            priority: 'HIGH',
            category: 'Page Health',
            issue: 'Broken Links Detected',
            action: `Fix ${pageHealth.brokenLinks.length} broken links immediately`,
            impact: 'User experience and SEO'
        });
    }
    
    if ((pageHealth.jsErrors?.length || 0) > 0) {
        recommendations.push({
            priority: 'HIGH',
            category: 'Functionality',
            issue: 'JavaScript Errors',
            action: `Debug and fix ${pageHealth.jsErrors.length} JavaScript errors`,
            impact: 'Site functionality may be impaired'
        });
    }
    
    // Design System recommendations
    const designSystem = auditReport.designSystem || {};
    if (!designSystem.culturalComponentsActive) {
        recommendations.push({
            priority: 'MEDIUM',
            category: 'Design System',
            issue: 'Cultural Components Inactive',
            action: 'Verify cultural-components.js is loading correctly',
            impact: 'Beautiful cultural animations not working'
        });
    }
    
    // Cultural compliance recommendations
    const cultural = auditReport.cultural || {};
    if (!cultural.teReoMaoriPresent) {
        recommendations.push({
            priority: 'MEDIUM',
            category: 'Cultural Safety',
            issue: 'Limited Te Reo Māori Content',
            action: 'Add more authentic Te Reo Māori throughout platform',
            impact: 'Cultural authenticity and engagement'
        });
    }
    
    // Performance recommendations
    const performance = auditReport.performance || {};
    if ((performance.loadTime || 0) > 3000) {
        recommendations.push({
            priority: 'MEDIUM',
            category: 'Performance',
            issue: 'Slow Load Times',
            action: 'Optimize images, minify CSS/JS, implement caching',
            impact: 'User experience and engagement'
        });
    }
    
    return recommendations;
}

function generateFallbackAnalysis(auditReport) {
    const healthScore = calculateHealthScore(auditReport);
    
    if (healthScore >= 90) {
        return "Platform health is excellent. Minor optimizations may be beneficial.";
    } else if (healthScore >= 70) {
        return "Platform is generally healthy with some areas for improvement.";
    } else if (healthScore >= 50) {
        return "Platform has significant issues that need attention.";
    } else {
        return "Platform has critical issues requiring immediate attention.";
    }
}

async function storeAnalysis(auditReport, analysis) {
    // In a production system, this would store in a database
    // For now, we'll just log it
    console.log('📊 Storing Analysis:', {
        timestamp: auditReport.timestamp,
        healthScore: calculateHealthScore(auditReport),
        analysisLength: analysis.analysis?.length || 0
    });
    
    return true;
}