const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const { accessToken, password } = JSON.parse(event.body);

    if (!accessToken || !password) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Access token and password are required' }) };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // The accessToken from the client is a short-lived JWT.
    // We use it to get a session, which proves the user is who they say they are.
    const { data: { user }, error: sessionError } = await supabase.auth.getUser(accessToken);

    if (sessionError) {
      return { statusCode: 401, body: JSON.stringify({ message: 'Invalid or expired token' }) };
    }

    // Now, as an admin, update the user's password.
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      { password: password }
    );

    if (updateError) {
      throw updateError;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Password updated successfully' }),
    };

  } catch (error) {
    console.error('Update password function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};