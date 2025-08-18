const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  try {
    const { email } = JSON.parse(event.body);
    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Email is required' }) };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.URL}/reset-password.html`,
    });

    if (error) {
      // Do not reveal if an email is registered or not for security reasons
      console.error('Password reset error:', error.message);
    }

    // Always return a generic success message to prevent email enumeration
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'If an account with that email exists, a password reset link has been sent.' }),
    };

  } catch (error) {
    console.error('Forgot password function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};