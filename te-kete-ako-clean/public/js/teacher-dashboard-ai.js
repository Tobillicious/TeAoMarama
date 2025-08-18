// Teacher Dashboard AI functionality

// Initialize AI agent
document.addEventListener('DOMContentLoaded', function() {
    // Initialize when TeKeteAkoAI is available
    if (window.TeKeteAkoAI) {
        initializeAI();
    } else {
        // Wait for the TeKeteAkoAI to be available
        const checkInterval = setInterval(() => {
            if (window.TeKeteAkoAI) {
                clearInterval(checkInterval);
                initializeAI();
            }
        }, 100);
    }
});

let aiAgent;
let selectedAssessmentType = null;
let generatedContent = [];

function initializeAI() {
    aiAgent = window.TeKeteAkoAI.createAgent({
        enableGraphRAG: true,
        defaultAnalysisMode: 'educational'
    });

    // Test AI connection
    aiAgent.healthCheck().then(status => {
        console.log('AI Agent status:', status);
    });
}

// Assessment type selection
function selectAssessmentType(element) {
    document.querySelectorAll('.assessment-type').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    selectedAssessmentType = element.dataset.type;
}

// Generate lesson plan
async function generateLessonPlan() {
    const subject = document.getElementById('subject').value;
    const yearLevel = document.getElementById('year-level').value;
    const culturalLevel = document.getElementById('cultural-level').value;
    const duration = document.getElementById('lesson-duration').value;
    const objectives = document.getElementById('learning-objectives').value;

    if (!subject || !yearLevel || !objectives) {
        alert('Please fill in all required fields');
        return;
    }

    const loading = document.getElementById('lesson-loading');
    loading.classList.add('show');

    try {
        if (!aiAgent) {
            throw new Error('AI Agent not initialized');
        }

        const query = window.TeKeteAkoAI.createQueryBuilder()
            .setContext(yearLevel, subject, culturalLevel)
            .setObjective(`Create a ${duration}-minute lesson plan for: ${objectives}`)
            .addRequirement('Include authentic Te Ao Māori integration')
            .addRequirement('Provide clear learning objectives and success criteria')
            .addRequirement('Include differentiated activities for diverse learners')
            .addRequirement('Suggest culturally responsive assessment methods')
            .addConstraint('Age-appropriate content and activities')
            .addConstraint('Align with New Zealand Curriculum')
            .addCulturalConsideration('Respect for mātauranga Māori')
            .addCulturalConsideration('Authentic cultural representation')
            .build();

        const result = await aiAgent.query(query, {
            analysisMode: 'pedagogical',
            useGraphRAG: true
        });

        displayResult('Lesson Plan', result.response, result.metadata);
        generatedContent.push({
            type: 'lesson-plan',
            content: result.response,
            metadata: result.metadata
        });

    } catch (error) {
        console.error('Lesson planning error:', error);
        displayResult('Error', 'Unable to generate lesson plan. Please try again later.', null);
    } finally {
        loading.classList.remove('show');
    }
}

// Check cultural integration
async function checkCulturalIntegration() {
    const content = document.getElementById('cultural-content').value;
    
    if (!content.trim()) {
        alert('Please enter content to analyze');
        return;
    }

    const loading = document.getElementById('cultural-loading');
    loading.classList.add('show');

    try {
        if (!aiAgent) {
            throw new Error('AI Agent not initialized');
        }

        const query = `Please analyze this educational content for cultural appropriateness and authenticity:

${content}

Provide:
1. Cultural appropriateness assessment
2. Authenticity evaluation for Te Ao Māori elements
3. Specific improvement suggestions
4. Recommendations for deeper cultural integration
5. Any concerns about tokenism or misrepresentation

Focus on respectful, authentic integration of mātauranga Māori.`;

        const result = await aiAgent.query(query, {
            analysisMode: 'cultural',
            useGraphRAG: true
        });

        displayResult('Cultural Integration Analysis', result.response, result.metadata);

    } catch (error) {
        console.error('Cultural analysis error:', error);
        displayResult('Error', 'Unable to analyze cultural integration. Please try again later.', null);
    } finally {
        loading.classList.remove('show');
    }
}

// Generate assessment
async function generateAssessment() {
    const topic = document.getElementById('assessment-topic').value;
    const subject = document.getElementById('subject').value;
    const yearLevel = document.getElementById('year-level').value;
    
    if (!selectedAssessmentType || !topic || !subject || !yearLevel) {
        alert('Please select assessment type and fill in all fields');
        return;
    }

    const loading = document.getElementById('assessment-loading');
    loading.classList.add('show');

    try {
        if (!aiAgent) {
            throw new Error('AI Agent not initialized');
        }

        const result = await aiAgent.suggestAssessmentMethods(
            topic, 
            yearLevel, 
            document.getElementById('cultural-level').value
        );

        displayResult(`${selectedAssessmentType.charAt(0).toUpperCase() + selectedAssessmentType.slice(1)} Assessment`, result.response, result.metadata);

    } catch (error) {
        console.error('Assessment generation error:', error);
        displayResult('Error', 'Unable to generate assessment. Please try again later.', null);
    } finally {
        loading.classList.remove('show');
    }
}

// Search resources
async function searchResources() {
    const query = document.getElementById('resource-search').value;
    
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }

    const loading = document.getElementById('search-loading');
    const resultsContainer = document.getElementById('resource-results');
    
    loading.classList.add('show');

    try {
        // Use GraphRAG search directly
        const response = await fetch('/.netlify/functions/find-similar-resources', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: query,
                match_threshold: 0.3,
                match_count: 8
            })
        });

        const data = await response.json();
        
        if (data.success || data.results) {
            displayResources(data.results || []);
        } else {
            resultsContainer.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 2rem;">No resources found. Try different search terms.</div>';
        }

    } catch (error) {
        console.error('Resource search error:', error);
        resultsContainer.innerHTML = '<div style="text-align: center; color: var(--error-red); padding: 2rem;">Search error. Please try again.</div>';
    } finally {
        loading.classList.remove('show');
    }
}

// Display search results
function displayResources(resources) {
    const container = document.getElementById('resource-results');
    
    if (!resources.length) {
        container.innerHTML = '<div style="text-align: center; color: var(--text-light); padding: 2rem;">No resources found</div>';
        return;
    }

    container.innerHTML = resources.map(resource => `
        <div class="resource-item">
            <div class="resource-title">${resource.title || resource.filename}</div>
            <div class="resource-meta">
                <span>📚 ${Array.isArray(resource.subject_areas) ? resource.subject_areas.join(', ') : resource.subject_areas || 'General'}</span>
                <span>🌟 ${resource.cultural_level || 'Medium'}</span>
                ${resource.similarity ? `<span>📊 ${Math.round(resource.similarity * 100)}% match</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Display generated content
function displayResult(title, content, metadata) {
    const container = document.getElementById('results-container');
    const resultsContent = document.getElementById('results-content');
    
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-content';
    resultDiv.innerHTML = `
        <h3>${title}</h3>
        <pre>${content}</pre>
        ${metadata ? `
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(46, 139, 87, 0.1); border-radius: 8px;">
                <strong>AI Analysis:</strong> 
                ${metadata.resourcesFound ? `Found ${metadata.resourcesFound} relevant resources. ` : ''}
                Analysis mode: ${metadata.analysisMode || 'educational'}
            </div>
        ` : ''}
        <button class="copy-btn" onclick="copyToClipboard(this)">📋 Copy Content</button>
    `;
    
    resultsContent.appendChild(resultDiv);
    container.classList.add('show');
    container.scrollIntoView({ behavior: 'smooth' });
}

// Copy to clipboard
function copyToClipboard(button) {
    const content = button.parentElement.querySelector('pre').textContent;
    navigator.clipboard.writeText(content).then(() => {
        button.textContent = '✅ Copied!';
        setTimeout(() => {
            button.innerHTML = '📋 Copy Content';
        }, 2000);
    });
}

// Export results
function exportResults() {
    if (!generatedContent.length) {
        alert('No content to export. Generate some lesson plans or assessments first.');
        return;
    }

    const exportContent = generatedContent.map((item, index) => 
        `=== ${item.type.toUpperCase()} ${index + 1} ===\n\n${item.content}\n\n`
    ).join('\n');

    const blob = new Blob([exportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `te-kete-ako-lesson-plans-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}