const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Verify authentication
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Authentication required' })
      };
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ success: false, message: 'Invalid authentication token' })
      };
    }

    const userId = user.id;

    // Handle different HTTP methods
    switch (event.httpMethod) {
      case 'GET':
        return await getProgress(userId, event.queryStringParameters);
      
      case 'POST':
        return await createProgress(userId, JSON.parse(event.body));
      
      case 'PUT':
        return await updateProgress(userId, JSON.parse(event.body));
      
      case 'DELETE':
        return await deleteProgress(userId, JSON.parse(event.body));
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ success: false, message: 'Method not allowed' })
        };
    }

  } catch (error) {
    console.error('Progress tracker error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Internal server error',
        error: error.message 
      })
    };
  }
};

// Get user progress data
async function getProgress(userId, queryParams) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Content-Type': 'application/json'
  };

  try {
    let query = supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    // Filter by resource type if specified
    if (queryParams?.resource_type) {
      query = query.eq('resource_type', queryParams.resource_type);
    }
    
    // Filter by resource ID if specified
    if (queryParams?.resource_id) {
      query = query.eq('resource_id', queryParams.resource_id);
    }

    // Filter by completion status
    if (queryParams?.completed !== undefined) {
      query = query.eq('completed', queryParams.completed === 'true');
    }

    const { data, error } = await query.order('updated_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to fetch progress data' })
      };
    }

    // Calculate summary statistics
    const summary = {
      total_items: data.length,
      completed_items: data.filter(item => item.completed).length,
      in_progress_items: data.filter(item => !item.completed && item.progress_percentage > 0).length,
      average_progress: data.length > 0 ? data.reduce((sum, item) => sum + item.progress_percentage, 0) / data.length : 0
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data: data,
        summary: summary
      })
    };

  } catch (error) {
    console.error('Get progress error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Failed to retrieve progress' })
    };
  }
}

// Create new progress entry
async function createProgress(userId, body) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Content-Type': 'application/json'
  };

  try {
    const { resource_type, resource_id, resource_title, progress_percentage = 0, completed = false, activity_data = {} } = body;

    if (!resource_type || !resource_id || !resource_title) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Missing required fields: resource_type, resource_id, resource_title' })
      };
    }

    // Check if progress entry already exists
    const { data: existing } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .single();

    if (existing) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ success: false, message: 'Progress entry already exists. Use PUT to update.' })
      };
    }

    const { data, error } = await supabase
      .from('user_progress')
      .insert({
        user_id: userId,
        resource_type,
        resource_id,
        resource_title,
        progress_percentage: Math.min(100, Math.max(0, progress_percentage)),
        completed,
        activity_data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to create progress entry' })
      };
    }

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Progress entry created successfully',
        data: data
      })
    };

  } catch (error) {
    console.error('Create progress error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Failed to create progress entry' })
    };
  }
}

// Update existing progress entry
async function updateProgress(userId, body) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Content-Type': 'application/json'
  };

  try {
    const { resource_type, resource_id, progress_percentage, completed, activity_data } = body;

    if (!resource_type || !resource_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Missing required fields: resource_type, resource_id' })
      };
    }

    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (progress_percentage !== undefined) {
      updateData.progress_percentage = Math.min(100, Math.max(0, progress_percentage));
    }
    
    if (completed !== undefined) {
      updateData.completed = completed;
      // Auto-set progress to 100% if marked completed
      if (completed && !updateData.progress_percentage) {
        updateData.progress_percentage = 100;
      }
    }
    
    if (activity_data !== undefined) {
      updateData.activity_data = activity_data;
    }

    const { data, error } = await supabase
      .from('user_progress')
      .update(updateData)
      .eq('user_id', userId)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to update progress entry' })
      };
    }

    if (!data) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, message: 'Progress entry not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Progress updated successfully',
        data: data
      })
    };

  } catch (error) {
    console.error('Update progress error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Failed to update progress' })
    };
  }
}

// Delete progress entry
async function deleteProgress(userId, body) {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Content-Type': 'application/json'
  };

  try {
    const { resource_type, resource_id } = body;

    if (!resource_type || !resource_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Missing required fields: resource_type, resource_id' })
      };
    }

    const { data, error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', userId)
      .eq('resource_type', resource_type)
      .eq('resource_id', resource_id)
      .select()
      .single();

    if (error) {
      console.error('Delete error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'Failed to delete progress entry' })
      };
    }

    if (!data) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ success: false, message: 'Progress entry not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Progress entry deleted successfully'
      })
    };

  } catch (error) {
    console.error('Delete progress error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Failed to delete progress entry' })
    };
  }
}