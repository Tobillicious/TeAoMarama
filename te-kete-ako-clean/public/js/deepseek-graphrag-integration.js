/**
 * DeepSeek-GraphRAG Integration Module for Te Kete Ako
 * Provides advanced AI educational assistance combining DeepSeek reasoning with GraphRAG resource discovery
 */

class DeepSeekGraphRAGIntegration {
    constructor(config = {}) {
        this.config = {
            deepseekEndpoint: config.deepseekEndpoint || '/.netlify/functions/deepseek-agent',
            simpleEndpoint: config.simpleEndpoint || '/.netlify/functions/deepseek-agent-simple',
            defaultAnalysisMode: config.defaultAnalysisMode || 'educational',
            enableGraphRAG: config.enableGraphRAG !== false,
            maxRetries: config.maxRetries || 3,
            timeout: config.timeout || 30000,
            culturalSafetyMode: config.culturalSafetyMode !== false
        };
        
        this.conversationHistory = [];
        this.isProcessing = false;
        this.eventListeners = new Map();
    }

    /**
     * Main query method - intelligently routes to appropriate AI system
     */
    async query(message, options = {}) {
        if (this.isProcessing) {
            throw new Error('Another query is already in progress');
        }

        this.isProcessing = true;
        this.emit('processingStart', { message, options });

        try {
            const queryOptions = {
                useGraphRAG: options.useGraphRAG ?? this.config.enableGraphRAG,
                analysisMode: options.analysisMode || this.config.defaultAnalysisMode,
                includeResources: options.includeResources !== false,
                culturalContext: options.culturalContext || 'te_ao_maori',
                ...options
            };

            const startTime = Date.now();
            let result;

            if (queryOptions.useGraphRAG) {
                result = await this.advancedQuery(message, queryOptions);
            } else {
                result = await this.simpleQuery(message, queryOptions);
            }

            const processingTime = Date.now() - startTime;
            result.processingTime = processingTime;

            // Update conversation history
            this.conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: result.response }
            );

            this.emit('queryComplete', { result, processingTime });
            return result;

        } catch (error) {
            this.emit('queryError', { error, message });
            throw error;
        } finally {
            this.isProcessing = false;
            this.emit('processingEnd');
        }
    }

    /**
     * Advanced query with GraphRAG integration
     */
    async advancedQuery(message, options) {
        const requestBody = {
            message: message,
            conversation_history: this.conversationHistory.slice(-10), // Keep last 10 exchanges
            use_graphrag: true,
            analysis_mode: options.analysisMode,
            cultural_context: options.culturalContext,
            include_resources: options.includeResources
        };

        const response = await this.makeRequest(this.config.deepseekEndpoint, requestBody);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Advanced query failed: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(`DeepSeek processing failed: ${data.error}`);
        }

        return {
            response: data.response,
            enhancedQuery: data.enhanced_query,
            graphragResults: data.graphrag_results,
            usage: data.usage,
            source: 'deepseek-graphrag-enhanced',
            metadata: {
                resourcesFound: data.graphrag_results?.resources_found || 0,
                resourceSource: data.graphrag_results?.source || 'none',
                analysisMode: options.analysisMode
            }
        };
    }

    /**
     * Simple query without GraphRAG
     */
    async simpleQuery(message, options) {
        const requestBody = {
            message: message,
            conversation_history: this.conversationHistory.slice(-10),
            cultural_context: options.culturalContext
        };

        const response = await this.makeRequest(this.config.simpleEndpoint, requestBody);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Simple query failed: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(`DeepSeek processing failed: ${data.error}`);
        }

        return {
            response: data.response,
            usage: data.usage,
            source: 'deepseek-simple',
            metadata: {
                analysisMode: 'simple'
            }
        };
    }

    /**
     * Specialized educational analysis methods
     */
    async analyzeLessonPlan(lessonContent, options = {}) {
        const prompt = `Please analyze this lesson plan for educational effectiveness and cultural responsiveness:

${lessonContent}

Focus on:
1. Learning objectives clarity
2. Cultural integration authenticity  
3. Assessment alignment
4. Engagement strategies
5. Differentiation opportunities

Provide specific, actionable feedback for improvement.`;

        return await this.query(prompt, {
            analysisMode: 'pedagogical',
            useGraphRAG: true,
            ...options
        });
    }

    async findCulturalConnections(topic, yearLevel) {
        const prompt = `Find authentic Te Ao Māori connections for teaching "${topic}" to Year ${yearLevel} students. Focus on:

1. Relevant Māori concepts and knowledge systems
2. Cultural protocols and appropriate integration
3. Specific resources or examples
4. Respectful teaching approaches
5. Community connection opportunities

Ensure cultural authenticity and avoid tokenism.`;

        return await this.query(prompt, {
            analysisMode: 'cultural',
            useGraphRAG: true,
            culturalContext: 'te_ao_maori_focus'
        });
    }

    async suggestAssessmentMethods(topic, yearLevel, culturalLevel = 'medium') {
        const prompt = `Suggest culturally responsive assessment methods for "${topic}" (Year ${yearLevel}, cultural level: ${culturalLevel}).

Include:
1. Traditional and alternative assessment options
2. Cultural appropriateness considerations
3. Differentiation strategies
4. Authentic evaluation approaches
5. Student voice and choice integration

Focus on meaningful assessment that honors both academic and cultural learning.`;

        return await this.query(prompt, {
            analysisMode: 'pedagogical',
            useGraphRAG: true
        });
    }

    async generateLearningPathway(studentInterests, currentLevel, targetGoals) {
        const prompt = `Create a personalized learning pathway for a student with these characteristics:

Current Interests: ${studentInterests}
Current Level: ${currentLevel}
Target Goals: ${targetGoals}

Design a pathway that:
1. Builds on student interests and strengths
2. Incorporates cultural connections where appropriate
3. Provides clear milestones and checkpoints
4. Suggests specific resources and activities
5. Includes extension and support options

Make it engaging, achievable, and culturally responsive.`;

        return await this.query(prompt, {
            analysisMode: 'educational',
            useGraphRAG: true
        });
    }

    /**
     * Utility methods
     */
    async makeRequest(url, body, retryCount = 0) {
        try {
            return await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
                signal: AbortSignal.timeout(this.config.timeout)
            });
        } catch (error) {
            if (retryCount < this.config.maxRetries && !error.name === 'AbortError') {
                console.warn(`Request failed, retrying (${retryCount + 1}/${this.config.maxRetries}):`, error.message);
                await this.delay(1000 * Math.pow(2, retryCount)); // Exponential backoff
                return this.makeRequest(url, body, retryCount + 1);
            }
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Event handling
     */
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
    }

    off(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Conversation management
     */
    clearConversation() {
        this.conversationHistory = [];
        this.emit('conversationCleared');
    }

    getConversationHistory() {
        return [...this.conversationHistory];
    }

    /**
     * Health check
     */
    async healthCheck() {
        try {
            const result = await this.simpleQuery('test', { useGraphRAG: false });
            return {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                responseTime: result.processingTime || 0
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
}

/**
 * Educational Query Builder - helps construct effective queries
 */
class EducationalQueryBuilder {
    constructor() {
        this.queryParts = {
            context: '',
            objective: '',
            constraints: [],
            requirements: [],
            culturalConsiderations: []
        };
    }

    setContext(yearLevel, subject, culturalLevel = 'medium') {
        this.queryParts.context = `Year ${yearLevel} ${subject} (cultural level: ${culturalLevel})`;
        return this;
    }

    setObjective(objective) {
        this.queryParts.objective = objective;
        return this;
    }

    addConstraint(constraint) {
        this.queryParts.constraints.push(constraint);
        return this;
    }

    addRequirement(requirement) {
        this.queryParts.requirements.push(requirement);
        return this;
    }

    addCulturalConsideration(consideration) {
        this.queryParts.culturalConsiderations.push(consideration);
        return this;
    }

    build() {
        let query = '';
        
        if (this.queryParts.context) {
            query += `Context: ${this.queryParts.context}\n\n`;
        }
        
        if (this.queryParts.objective) {
            query += `Objective: ${this.queryParts.objective}\n\n`;
        }
        
        if (this.queryParts.requirements.length > 0) {
            query += `Requirements:\n${this.queryParts.requirements.map(r => `- ${r}`).join('\n')}\n\n`;
        }
        
        if (this.queryParts.constraints.length > 0) {
            query += `Constraints:\n${this.queryParts.constraints.map(c => `- ${c}`).join('\n')}\n\n`;
        }
        
        if (this.queryParts.culturalConsiderations.length > 0) {
            query += `Cultural Considerations:\n${this.queryParts.culturalConsiderations.map(c => `- ${c}`).join('\n')}\n\n`;
        }
        
        return query.trim();
    }

    reset() {
        this.queryParts = {
            context: '',
            objective: '',
            constraints: [],
            requirements: [],
            culturalConsiderations: []
        };
        return this;
    }
}

// Global instance for easy access
window.TeKeteAkoAI = {
    DeepSeekGraphRAGIntegration,
    EducationalQueryBuilder,
    
    // Convenience method to create a configured instance
    createAgent(config = {}) {
        return new DeepSeekGraphRAGIntegration(config);
    },
    
    // Convenience method to create a query builder
    createQueryBuilder() {
        return new EducationalQueryBuilder();
    }
};

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DeepSeekGraphRAGIntegration,
        EducationalQueryBuilder
    };
}