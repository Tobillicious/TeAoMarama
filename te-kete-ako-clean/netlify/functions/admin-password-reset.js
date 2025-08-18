const { createClient } = require('@supabase/supabase-js');

// ADMIN PASSWORD RESET - FOR DEVELOPMENT/TESTING ONLY
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

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
    const { email, newPassword, adminKey } = JSON.parse(event.body);

    // Simple admin check (in production, this would be more secure)
    if (adminKey !== 'te-kete-ako-reset-2025') {
      return {
        statusCode: 403,
        headers,
        body: JSON.stringify({ success: false, message: 'Unauthorized' })
      };
    }

    if (!email || !newPassword) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Email and new password required' })
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Update user password using admin API
    const { data, error } = await supabase.auth.admin.updateUserById(
      // First get user by email
      await getUserIdByEmail(supabase, email),
      { password: newPassword }
    );

    if (error) {
      console.error('Password reset error:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: error.message })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: `Password updated for ${email}` 
      })
    };

  } catch (error) {
    console.error('Admin password reset error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Internal server error' })
    };
  }
};

async function getUserIdByEmail(supabase, email) {
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users.users.find(u => u.email === email);
  return user ? user.id : null;
}