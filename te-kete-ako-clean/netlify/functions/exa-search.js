/**
 * ================================================================
 * EXA.AI INTELLIGENT SEARCH - TE KETE AKO
 * ================================================================
 * 
 * Powered by EXA.AI for semantic educational resource discovery
 * Integrates with Supabase authentication and user profiles
 * Features cultural safety and NZ curriculum alignment
 * 
 * ================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EXA_API_KEY = process.env.EXA_API_KEY;

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * EXA.AI Search API Integration
 */
class ExaEducationalSearch {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.exa.ai/search';
    }

    /**
     * Intelligent educational search with cultural context
     */
    async searchEducationalContent(query, options = {}) {
        const searchParams = {
            query: this.enhanceEducationalQuery(query, options),
            type: 'neural',
            useAutoprompt: true,
            numResults: options.numResults || 10,
            includeDomains: this.getEducationalDomains(options.region || 'nz'),
            excludeDomains: this.getExcludedDomains(),
            startCrawlDate: options.recency || '2020-01-01',
            endCrawlDate: new Date().toISOString().split('T')[0],
            includeText: true,
            textType: 'text',
            highlights: {
                query: query,
                numSentences: 3
            }
        };

        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(searchParams)
            });

            if (!response.ok) {
                throw new Error(`EXA API error: ${response.status}`);
            }

            const data = await response.json();
            return this.processEducationalResults(data.results, options);

        } catch (error) {
            console.error('EXA search error:', error);
            throw error;
        }
    }

    /**
     * Enhance query with educational context
     */
    enhanceEducationalQuery(query, options) {
        let enhancedQuery = query;

        // Add educational context
        if (options.yearLevel) {
            enhancedQuery += ` Year ${options.yearLevel} New Zealand curriculum`;
        }

        // Add subject area
        if (options.subject) {
            enhancedQuery += ` ${options.subject} education`;
        }

        // Add cultural context
        if (options.culturalContext === 'te-ao-maori') {
            enhancedQuery += ` Te Ao Māori perspective tikanga Māori';
        }

        // Add learning objective
        if (options.learningObjective) {
            enhancedQuery += ` teaching learning objectives ${options.learningObjective}`;
        }

        // Add resource type preference
        if (options.resourceType) {
            enhancedQuery += ` ${options.resourceType} activities worksheets`;
        }

        return enhancedQuery;
    }

    /**
     * Get educational domains for specific regions
     */
    getEducationalDomains(region) {
        const domains = {
            nz: [
                'education.govt.nz',
                'nzqa.govt.nz',
                'tki.org.nz',
                'ncea.education.govt.nz',
                'curriculumguides.education.govt.nz',
                'educationalleaders.govt.nz',
                'tewhariki.tki.org.nz',
                'tereomaori.tki.org.nz',
                'nzhistory.govt.nz',
                'stats.govt.nz',
                'parliament.nz',
                'waitangitribunal.govt.nz'
            ],
            global: [
                'khanacademy.org',
                'ted.com',
                'coursera.org',
                'edutopia.org',
                'teachingchannel.org'
            ]
        };

        return [...domains[region], ...domains.global];
    }

    /**
     * Get domains to exclude (commercial, inappropriate)
     */
    getExcludedDomains() {
        return [
            'pinterest.com',
            'facebook.com',
            'twitter.com',
            'instagram.com',
            'tiktok.com',
            'reddit.com'
        ];
    }

    /**
     * Process and enhance search results
     */
    processEducationalResults(results, options) {
        return results.map(result => ({
            id: this.generateResultId(result.url),
            title: result.title,
            url: result.url,
            description: this.extractDescription(result),
            highlights: result.highlights || [],
            text: result.text,
            domain: new URL(result.url).hostname,
            educationalMetadata: this.extractEducationalMetadata(result, options),
            culturalSafety: this.assessCulturalSafety(result),
            relevanceScore: this.calculateRelevanceScore(result, options),
            publishedDate: result.publishedDate,
            lastCrawled: new Date().toISOString()
        })).sort((a, b) => b.relevanceScore - a.relevanceScore);
    }

    /**
     * Extract educational metadata from results
     */
    extractEducationalMetadata(result, options) {
        const text = (result.text || '').toLowerCase();
        const title = (result.title || '').toLowerCase();

        return {
            yearLevels: this.extractYearLevels(text + ' ' + title),
            subjects: this.extractSubjects(text + ' ' + title),
            resourceTypes: this.extractResourceTypes(text + ' ' + title),
            curriculumAlignment: this.assessCurriculumAlignment(result),
            difficulty: this.assessDifficulty(text),
            timeRequired: this.extractTimeRequired(text)
        };
    }

    /**
     * Extract year levels mentioned in content
     */
    extractYearLevels(text) {
        const yearMatches = text.match(/year\s+(\d+)/gi) || [];
        const levelMatches = text.match(/level\s+(\d+)/gi) || [];
        
        const years = [...new Set([
            ...yearMatches.map(m => parseInt(m.match(/\d+/)[0])),
            ...levelMatches.map(m => parseInt(m.match(/\d+/)[0]))
        ])].filter(y => y >= 1 && y <= 13);

        return years.sort((a, b) => a - b);
    }

    /**
     * Extract subject areas
     */
    extractSubjects(text) {
        const subjects = [
            'english', 'mathematics', 'science', 'social studies', 'te reo māori',
            'technology', 'arts', 'health', 'physical education', 'learning languages'
        ];

        return subjects.filter(subject => 
            text.includes(subject) || text.includes(subject.replace(' ', ''))
        );
    }

    /**
     * Extract resource types
     */
    extractResourceTypes(text) {
        const types = [
            'worksheet', 'activity', 'game', 'video', 'lesson plan',
            'assessment', 'project', 'quiz', 'presentation', 'infographic'
        ];

        return types.filter(type => text.includes(type));
    }

    /**
     * Assess curriculum alignment
     */
    assessCurriculumAlignment(result) {
        const text = (result.text || '').toLowerCase();
        const alignmentIndicators = [
            'achievement objective', 'learning outcome', 'curriculum level',
            'ncea', 'nzqa', 'new zealand curriculum', 'te whāriki'
        ];

        const alignmentScore = alignmentIndicators.reduce((score, indicator) => {
            return score + (text.includes(indicator) ? 1 : 0);
        }, 0);

        return {
            score: alignmentScore,
            indicators: alignmentIndicators.filter(indicator => text.includes(indicator))
        };
    }

    /**
     * Assess cultural safety for Te Ao Māori content
     */
    assessCulturalSafety(result) {
        const text = (result.text || '').toLowerCase();
        const domain = new URL(result.url).hostname;

        // Trusted domains for cultural content
        const trustedDomains = [
            'education.govt.nz',
            'tki.org.nz',
            'tereomaori.tki.org.nz',
            'nzhistory.govt.nz'
        ];

        // Cultural indicators
        const culturalTerms = [
            'tikanga', 'mātauranga', 'whakapapa', 'kōrero', 'whakataukī',
            'te ao māori', 'māori perspective', 'indigenous knowledge'
        ];

        const hasCulturalContent = culturalTerms.some(term => text.includes(term));
        const isTrustedDomain = trustedDomains.some(trusted => domain.includes(trusted));

        return {
            hasCulturalContent,
            isTrustedSource: isTrustedDomain,
            culturalTermsFound: culturalTerms.filter(term => text.includes(term)),
            safetyLevel: isTrustedDomain && hasCulturalContent ? 'high' : 
                        hasCulturalContent ? 'medium' : 'low'
        };
    }

    /**
     * Calculate relevance score
     */
    calculateRelevanceScore(result, options) {
        let score = 0;

        // Base domain authority
        const domain = new URL(result.url).hostname;
        if (domain.includes('.govt.nz')) score += 3;
        if (domain.includes('education')) score += 2;
        if (domain.includes('tki.org.nz')) score += 3;

        // Content quality indicators
        const text = (result.text || '').toLowerCase();
        if (text.length > 500) score += 1;
        if (result.highlights && result.highlights.length > 0) score += 2;

        // Educational metadata bonus
        const metadata = this.extractEducationalMetadata(result, options);
        if (metadata.yearLevels.length > 0) score += 1;
        if (metadata.subjects.length > 0) score += 1;
        if (metadata.curriculumAlignment.score > 0) score += metadata.curriculumAlignment.score;

        // Cultural relevance bonus
        if (options.culturalContext === 'te-ao-maori') {
            const culturalSafety = this.assessCulturalSafety(result);
            if (culturalSafety.safetyLevel === 'high') score += 3;
            if (culturalSafety.safetyLevel === 'medium') score += 1;
        }

        return Math.max(0, Math.min(10, score));
    }

    /**
     * Assess content difficulty
     */
    assessDifficulty(text) {
        // Simple heuristic based on vocabulary complexity
        const complexWords = (text.match(/\b\w{8,}\b/g) || []).length;
        const totalWords = (text.match(/\b\w+\b/g) || []).length;
        
        if (totalWords === 0) return 'unknown';
        
        const complexityRatio = complexWords / totalWords;
        
        if (complexityRatio < 0.1) return 'beginner';
        if (complexityRatio < 0.2) return 'intermediate';
        return 'advanced';
    }

    /**
     * Extract time requirements
     */
    extractTimeRequired(text) {
        const timePatterns = [
            /(\d+)\s*minutes?/gi,
            /(\d+)\s*hours?/gi,
            /(\d+)\s*days?/gi,
            /(\d+)\s*weeks?/gi
        ];

        for (const pattern of timePatterns) {
            const match = text.match(pattern);
            if (match) {
                return match[0];
            }
        }

        return null;
    }

    /**
     * Extract description from result
     */
    extractDescription(result) {
        if (result.highlights && result.highlights.length > 0) {
            return result.highlights.join(' ... ');
        }
        
        if (result.text) {
            return result.text.substring(0, 300) + '...';
        }
        
        return 'No description available';
    }

    /**
     * Generate unique result ID
     */
    generateResultId(url) {
        return Buffer.from(url).toString('base64').substring(0, 12);
    }
}

/**
 * Verify Supabase JWT token and get user data
 */
async function verifySupabaseToken(accessToken) {
    try {
        const { data: { user }, error } = await supabase.auth.getUser(accessToken);
        
        if (error || !user) {
            throw new Error('Invalid or expired token');
        }

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role, display_name, school_name, year_level, learning_preferences')
            .eq('user_id', user.id)
            .single();

        if (profileError) {
            console.warn('Could not fetch user profile:', profileError);
        }

        return {
            id: user.id,
            email: user.email,
            profile: profile || {}
        };

    } catch (error) {
        console.error('Token verification failed:', error);
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

/**
 * Log search activity for analytics
 */
async function logSearchActivity(user, query, results, options) {
    try {
        await supabase
            .from('search_analytics')
            .insert({
                user_id: user.id,
                query: query,
                results_count: results.length,
                search_options: options,
                timestamp: new Date().toISOString()
            });
    } catch (error) {
        console.warn('Failed to log search activity:', error);
    }
}

/**
 * Main Netlify function handler
 */
export async function handler(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Verify authentication
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    error: 'Missing or invalid authorization header'
                })
            };
        }

        const accessToken = authHeader.substring(7);
        const user = await verifySupabaseToken(accessToken);

        // Parse request
        const body = JSON.parse(event.body || '{}');
        const { query, options = {} } = body;

        if (!query) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Search query is required'
                })
            };
        }

        // Enhance options with user profile
        const enhancedOptions = {
            ...options,
            yearLevel: options.yearLevel || user.profile.year_level,
            culturalContext: options.culturalContext || user.profile.learning_preferences?.cultural_context,
            userRole: user.profile.role
        };

        // Initialize EXA search
        const exaSearch = new ExaEducationalSearch(EXA_API_KEY);
        
        // Perform search
        const results = await exaSearch.searchEducationalContent(query, enhancedOptions);

        // Log activity
        await logSearchActivity(user, query, results, enhancedOptions);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                query,
                results,
                count: results.length,
                user: {
                    id: user.id,
                    role: user.profile.role
                },
                searchOptions: enhancedOptions
            })
        };

    } catch (error) {
        console.error('EXA search function error:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Search failed',
                message: error.message
            })
        };
    }
}

console.log('🔍 EXA.AI Educational Search function loaded and ready!');