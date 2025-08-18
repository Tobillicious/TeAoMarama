/**
 * =================================================================
 * YOUTUBE LIBRARY API - NETLIFY SERVERLESS FUNCTION
 * =================================================================
 * 
 * PURPOSE: Backend API for YouTube Educational Library
 * - YouTube Data API v3 integration
 * - Video metadata enrichment
 * - Content moderation and approval
 * - User interaction management
 * - Analytics and reporting
 * 
 * ENDPOINTS:
 * - GET /videos - Search and filter videos
 * - POST /videos - Add new video for review
 * - PUT /videos/:id - Update video metadata
 * - DELETE /videos/:id - Remove video
 * - POST /interactions - Track user interactions
 * - GET /analytics - Retrieve usage analytics
 * 
 * =================================================================
 */

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

/**
 * Main handler function
 */
exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    try {
        const { httpMethod, path, body, headers } = event;
        const pathSegments = path.split('/').filter(segment => segment);
        const endpoint = pathSegments[pathSegments.length - 1];

        console.log(`YouTube Library API: ${httpMethod} ${endpoint}`);

        switch (httpMethod) {
            case 'GET':
                return await handleGet(endpoint, event.queryStringParameters || {});
            case 'POST':
                return await handlePost(endpoint, JSON.parse(body || '{}'), headers);
            case 'PUT':
                return await handlePut(endpoint, JSON.parse(body || '{}'), headers);
            case 'DELETE':
                return await handleDelete(endpoint, event.queryStringParameters || {}, headers);
            default:
                return createResponse(405, { error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('YouTube Library API Error:', error);
        return createResponse(500, { 
            error: 'Internal server error', 
            details: error.message 
        });
    }
};

/**
 * Handle GET requests
 */
async function handleGet(endpoint, queryParams) {
    switch (endpoint) {
        case 'videos':
            return await getVideos(queryParams);
        case 'video-details':
            return await getVideoDetails(queryParams.id);
        case 'collections':
            return await getCollections(queryParams);
        case 'analytics':
            return await getAnalytics(queryParams);
        case 'search-youtube':
            return await searchYouTube(queryParams);
        default:
            return createResponse(404, { error: 'Endpoint not found' });
    }
}

/**
 * Handle POST requests
 */
async function handlePost(endpoint, data, headers) {
    const user = await authenticateUser(headers);
    
    switch (endpoint) {
        case 'videos':
            return await addVideo(data, user);
        case 'interactions':
            return await recordInteraction(data, user);
        case 'collections':
            return await createCollection(data, user);
        case 'moderate-video':
            return await moderateVideo(data, user);
        case 'enrich-metadata':
            return await enrichVideoMetadata(data, user);
        default:
            return createResponse(404, { error: 'Endpoint not found' });
    }
}

/**
 * Handle PUT requests
 */
async function handlePut(endpoint, data, headers) {
    const user = await authenticateUser(headers);
    
    switch (endpoint) {
        case 'videos':
            return await updateVideo(data, user);
        case 'collections':
            return await updateCollection(data, user);
        default:
            return createResponse(404, { error: 'Endpoint not found' });
    }
}

/**
 * Handle DELETE requests
 */
async function handleDelete(endpoint, queryParams, headers) {
    const user = await authenticateUser(headers);
    
    switch (endpoint) {
        case 'videos':
            return await deleteVideo(queryParams.id, user);
        case 'collections':
            return await deleteCollection(queryParams.id, user);
        default:
            return createResponse(404, { error: 'Endpoint not found' });
    }
}

/**
 * Get videos with filtering and search
 */
async function getVideos(params) {
    const {
        search = '',
        subjects = '',
        year_levels = '',
        content_type = '',
        duration_min = 0,
        duration_max = 999999,
        cultural_only = false,
        curriculum_only = false,
        assessment_only = false,
        page = 1,
        limit = 20
    } = params;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const subjectArray = subjects ? subjects.split(',') : [];
    const yearLevelArray = year_levels ? year_levels.split(',').map(Number) : [];

    try {
        const { data, error } = await supabase.rpc('search_videos', {
            search_query: search,
            subject_filter: subjectArray,
            year_level_filter: yearLevelArray,
            content_type_filter: content_type,
            duration_min: parseInt(duration_min),
            duration_max: parseInt(duration_max),
            cultural_only: cultural_only === 'true',
            curriculum_only: curriculum_only === 'true',
            assessment_only: assessment_only === 'true',
            limit_results: parseInt(limit),
            offset_results: offset
        });

        if (error) throw error;

        // Get total count for pagination
        const { count } = await supabase
            .from('youtube_videos')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'approved');

        return createResponse(200, {
            videos: data,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: count,
                total_pages: Math.ceil(count / parseInt(limit))
            }
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        return createResponse(500, { error: 'Failed to fetch videos' });
    }
}

/**
 * Get detailed video information
 */
async function getVideoDetails(videoId) {
    try {
        const { data, error } = await supabase
            .from('youtube_videos')
            .select(`
                *,
                user_video_interactions (
                    bookmarked,
                    watched,
                    rating
                )
            `)
            .eq('id', videoId)
            .single();

        if (error) throw error;

        return createResponse(200, { video: data });
    } catch (error) {
        console.error('Error fetching video details:', error);
        return createResponse(404, { error: 'Video not found' });
    }
}

/**
 * Add new video for review
 */
async function addVideo(videoData, user) {
    if (!user) {
        return createResponse(401, { error: 'Authentication required' });
    }

    try {
        // Enrich video metadata from YouTube API
        const enrichedData = await enrichFromYouTubeAPI(videoData);
        
        const { data, error } = await supabase
            .from('youtube_videos')
            .insert({
                ...enrichedData,
                created_by: user.id,
                status: 'pending'
            })
            .select()
            .single();

        if (error) throw error;

        // Log moderation action
        await logModerationAction(data.id, user.id, 'submitted', 'Video submitted for review');

        return createResponse(201, { 
            message: 'Video submitted for review',
            video: data 
        });
    } catch (error) {
        console.error('Error adding video:', error);
        return createResponse(500, { error: 'Failed to add video' });
    }
}

/**
 * Record user interaction with video
 */
async function recordInteraction(interactionData, user) {
    if (!user) {
        return createResponse(401, { error: 'Authentication required' });
    }

    try {
        const { data, error } = await supabase
            .from('user_video_interactions')
            .upsert({
                user_id: user.id,
                video_id: interactionData.video_id,
                ...interactionData,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;

        return createResponse(200, { 
            message: 'Interaction recorded',
            interaction: data 
        });
    } catch (error) {
        console.error('Error recording interaction:', error);
        return createResponse(500, { error: 'Failed to record interaction' });
    }
}

/**
 * Moderate video content
 */
async function moderateVideo(moderationData, user) {
    if (!user || !isModeratorOrAdmin(user)) {
        return createResponse(403, { error: 'Insufficient permissions' });
    }

    const { video_id, action, reason, cultural_approval, educational_approval } = moderationData;

    try {
        // Update video status
        const { data: video, error: videoError } = await supabase
            .from('youtube_videos')
            .update({
                status: action,
                approved_by: user.id,
                approved_at: new Date().toISOString(),
                moderation_notes: reason
            })
            .eq('id', video_id)
            .select()
            .single();

        if (videoError) throw videoError;

        // Log moderation action
        await logModerationAction(video_id, user.id, action, reason, {
            cultural_approval,
            educational_approval
        });

        return createResponse(200, { 
            message: `Video ${action} successfully`,
            video: video 
        });
    } catch (error) {
        console.error('Error moderating video:', error);
        return createResponse(500, { error: 'Failed to moderate video' });
    }
}

/**
 * Enrich video metadata using YouTube API
 */
async function enrichVideoMetadata(data, user) {
    if (!user || !isModeratorOrAdmin(user)) {
        return createResponse(403, { error: 'Insufficient permissions' });
    }

    try {
        const { video_id } = data;
        const enrichedData = await enrichFromYouTubeAPI({ video_id });
        
        const { data: updatedVideo, error } = await supabase
            .from('youtube_videos')
            .update(enrichedData)
            .eq('video_id', video_id)
            .select()
            .single();

        if (error) throw error;

        return createResponse(200, { 
            message: 'Video metadata enriched',
            video: updatedVideo 
        });
    } catch (error) {
        console.error('Error enriching metadata:', error);
        return createResponse(500, { error: 'Failed to enrich metadata' });
    }
}

/**
 * Search YouTube using the Data API
 */
async function searchYouTube(params) {
    if (!YOUTUBE_API_KEY) {
        return createResponse(500, { error: 'YouTube API not configured' });
    }

    const { q, maxResults = 10, type = 'video' } = params;

    try {
        const response = await fetch(
            `${YOUTUBE_API_BASE}/search?part=snippet&q=${encodeURIComponent(q)}&type=${type}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();
        return createResponse(200, data);
    } catch (error) {
        console.error('YouTube API error:', error);
        return createResponse(500, { error: 'Failed to search YouTube' });
    }
}

/**
 * Get analytics data
 */
async function getAnalytics(params) {
    const { 
        start_date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_date = new Date().toISOString().split('T')[0],
        video_id = null
    } = params;

    try {
        let query = supabase
            .from('video_analytics')
            .select('*')
            .gte('analytics_date', start_date)
            .lte('analytics_date', end_date);

        if (video_id) {
            query = query.eq('video_id', video_id);
        }

        const { data, error } = await query;
        if (error) throw error;

        return createResponse(200, { analytics: data });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return createResponse(500, { error: 'Failed to fetch analytics' });
    }
}

/**
 * Enrich video data from YouTube API
 */
async function enrichFromYouTubeAPI(videoData) {
    if (!YOUTUBE_API_KEY) {
        return videoData;
    }

    try {
        const videoId = extractVideoId(videoData.youtube_url || videoData.video_id);
        if (!videoId) return videoData;

        const response = await fetch(
            `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );

        if (!response.ok) {
            console.warn('YouTube API request failed:', response.status);
            return videoData;
        }

        const data = await response.json();
        const video = data.items[0];

        if (!video) return videoData;

        // Parse duration from ISO 8601 format
        const duration = parseDuration(video.contentDetails.duration);
        
        return {
            ...videoData,
            video_id: videoId,
            title: video.snippet.title,
            description: video.snippet.description,
            duration: formatDuration(duration),
            duration_seconds: duration,
            thumbnail_url: video.snippet.thumbnails.maxres?.url || 
                          video.snippet.thumbnails.high?.url ||
                          video.snippet.thumbnails.medium?.url,
            youtube_url: `https://www.youtube.com/watch?v=${videoId}`,
            channel_name: video.snippet.channelTitle,
            channel_id: video.snippet.channelId,
            view_count: parseInt(video.statistics.viewCount || 0),
            published_date: video.snippet.publishedAt.split('T')[0]
        };
    } catch (error) {
        console.error('Error enriching from YouTube API:', error);
        return videoData;
    }
}

/**
 * Log moderation actions
 */
async function logModerationAction(videoId, moderatorId, action, reason, additionalData = {}) {
    try {
        await supabase
            .from('content_moderation_log')
            .insert({
                video_id: videoId,
                moderator_id: moderatorId,
                action: action,
                reason: reason,
                ...additionalData
            });
    } catch (error) {
        console.error('Error logging moderation action:', error);
    }
}

/**
 * Authentication helper
 */
async function authenticateUser(headers) {
    const token = headers.authorization?.replace('Bearer ', '');
    if (!token) return null;

    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) return null;
        return user;
    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

/**
 * Check if user is moderator or admin
 */
function isModeratorOrAdmin(user) {
    const role = user.app_metadata?.role || user.user_metadata?.role;
    return ['admin', 'moderator'].includes(role);
}

/**
 * Extract video ID from YouTube URL
 */
function extractVideoId(url) {
    if (!url) return null;
    
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
        /^[a-zA-Z0-9_-]{11}$/ // Direct video ID
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1] || match[0];
    }

    return null;
}

/**
 * Parse ISO 8601 duration to seconds
 */
function parseDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);
    
    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

/**
 * Create standardized API response
 */
function createResponse(statusCode, data) {
    return {
        statusCode,
        headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}