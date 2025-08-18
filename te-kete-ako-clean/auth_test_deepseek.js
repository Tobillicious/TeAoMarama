Here's a concise Supabase auth test script that verifies connection and user state:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Supabase Auth Test</title>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
  <script>
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    async function testAuth() {
      console.log('=== Supabase Auth Test ===');
      
      // Test connection
      try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        console.log('Connection test:', error ? '❌ Failed' : '✅ Success');
        if (error) throw error;
      } catch (err) {
        console.error('Connection error:', err.message);
        return;
      }

      // Check auth state
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Current user:', user ? '✅ Logged in' : '❌ Not logged in');
      
      // Test sign in with dummy credentials
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
      console.log('Auth test:', signInError ? '✅ Auth rejected (expected)' : '❌ Auth should fail');
      
      console.log('=== Test complete ===');
    }

    testAuth();
  </script>
</body>
</html>
```

### How to use:
1. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual values
2. Open browser console to see results
3. Tests:
   - Connection to Supabase
   - Current auth state
   - Auth rejection (expected with wrong credentials)

The script provides clear ✅/❌ status messages in the console. For a real test, you might want to add proper test credentials.