const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// DeepSeek-Powered Adaptive Learning Path Generator
// Evolution: Static resources → Dynamic, personalized learning journeys
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Verify authentication
    const authHeader = event.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Authentication required' }) };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid token' }) };
    }

    const { learning_goal, current_knowledge_level, preferred_modality = 'mixed' } = JSON.parse(event.body);

    // Phase 1: Analyze user's current progress and knowledge gaps
    const userProgress = await analyzeUserProgress(user.id);
    
    // Phase 2: Use DeepSeek to generate adaptive learning path
    const adaptivePath = await generateAdaptivePath({
      userId: user.id,
      learningGoal: learning_goal,
      currentLevel: current_knowledge_level,
      progressData: userProgress,
      preferredModality: preferred_modality
    });

    // Phase 3: Discover resources via EXA.ai based on generated path
    const enrichedPath = await enrichPathWithResources(adaptivePath);

    // Phase 4: Store path for tracking and handoff continuity
    await storeAdaptivePath(user.id, enrichedPath);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        adaptive_path: enrichedPath,
        generation_method: 'deepseek-dynamic',
        next_review: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })
    };

  } catch (error) {
    console.error('Adaptive path generation error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Path generation failed', details: error.message })
    };
  }
};

async function analyzeUserProgress(userId) {
  // Get user's learning history from progress tracker
  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  const { data: profile } = await supabase
    .from('profiles')
    .select('knowledge_vectors, learning_style, last_handoff_agent')
    .eq('user_id', userId)
    .single();

  return {
    completed_topics: progress?.filter(p => p.completed).map(p => p.resource_type) || [],
    struggling_areas: progress?.filter(p => p.progress_percentage < 50).map(p => p.resource_type) || [],
    learning_velocity: calculateLearningVelocity(progress || []),
    preferred_difficulty: profile?.learning_style?.difficulty_preference || 'intermediate',
    last_agent_notes: profile?.last_handoff_agent ? JSON.parse(profile.last_handoff_agent) : null
  };
}

async function generateAdaptivePath({ userId, learningGoal, currentLevel, progressData, preferredModality }) {
  const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
  if (!deepseekApiKey) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'DEEPSEEK_API_KEY environment variable required' }) };
  }
  
  const systemPrompt = `You are an adaptive learning architect for Te Kete Ako, designing personalized educational journeys that honor Te Ao Māori principles.

Create a learning path that:
1. Builds on user's existing knowledge: ${JSON.stringify(progressData.completed_topics)}
2. Addresses knowledge gaps: ${JSON.stringify(progressData.struggling_areas)}
3. Incorporates cultural learning principles (whakatōhea, manaakitanga, ako)
4. Adapts to learning velocity: ${progressData.learning_velocity}
5. Targets goal: ${learningGoal}

Return JSON format:
{
  "path_overview": "brief description",
  "learning_phases": [
    {
      "phase": 1,
      "title": "Foundation Building",
      "duration_weeks": 2,
      "core_concepts": ["concept1", "concept2"],
      "success_criteria": "measurable outcomes",
      "cultural_integration": "Te Ao Māori connection"
    }
  ],
  "adaptive_triggers": {
    "if_struggling": "remediation strategy",
    "if_excelling": "enrichment path",
    "cultural_moments": "opportunities for deeper cultural learning"
  }
}`;

  const response = await axios.post(
    'https://api.deepseek.com/v1/chat/completions',
    {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: `Generate adaptive learning path for ${currentLevel} learner wanting to master: ${learningGoal}. Preferred modality: ${preferredModality}. Previous agent notes: ${JSON.stringify(progressData.last_agent_notes)}` 
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    },
    {
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return JSON.parse(response.data.choices[0].message.content);
}

async function enrichPathWithResources(adaptivePath) {
  // Use EXA.ai to find specific resources for each phase
  try {
    const enrichedPhases = await Promise.all(
      adaptivePath.learning_phases.map(async (phase) => {
        const resources = await findResourcesForPhase(phase);
        return { ...phase, recommended_resources: resources };
      })
    );

    return { ...adaptivePath, learning_phases: enrichedPhases };
  } catch (error) {
    console.error('Resource enrichment failed:', error);
    return adaptivePath; // Return path without enrichment
  }
}

async function findResourcesForPhase(phase) {
  // Call EXA.ai discovery function
  try {
    const response = await axios.post(
      `${process.env.SITE_URL || 'https://tekete.netlify.app'}/.netlify/functions/exa-search`,
      {
        query: `${phase.title} ${phase.core_concepts.join(' ')} New Zealand curriculum`,
        educational_level: 'secondary',
        include_cultural: true
      }
    );

    return response.data.resources?.slice(0, 3) || [];
  } catch (error) {
    console.error('EXA resource discovery failed:', error);
    return [];
  }
}

async function storeAdaptivePath(userId, adaptivePath) {
  // Store for handoff continuity and progress tracking
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      resource_type: 'adaptive_path',
      resource_id: `path_${Date.now()}`,
      resource_title: adaptivePath.path_overview,
      progress_percentage: 0,
      activity_data: {
        adaptive_path: adaptivePath,
        generated_at: new Date().toISOString(),
        generation_method: 'deepseek-dynamic'
      }
    });

  if (error) {
    console.error('Failed to store adaptive path:', error);
  }
}

function calculateLearningVelocity(progressArray) {
  if (!progressArray.length) return 'unknown';
  
  const recentProgress = progressArray.slice(0, 5);
  const avgCompletion = recentProgress.reduce((sum, p) => sum + p.progress_percentage, 0) / recentProgress.length;
  
  if (avgCompletion > 80) return 'fast';
  if (avgCompletion > 50) return 'moderate';
  return 'needs_support';
}