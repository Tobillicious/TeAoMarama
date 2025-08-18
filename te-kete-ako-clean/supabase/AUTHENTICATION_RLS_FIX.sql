-- EMERGENCY AUTHENTICATION FIX
-- CRITICAL ISSUE: RLS policies blocking signup trigger from creating profiles
-- SOLUTION: Fix RLS policies to allow signup trigger to work

-- First, check current state and clean up any conflicting policies
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Allow signup trigger" ON public.profiles;

-- CRITICAL FIX: Allow the trigger function to insert profiles
-- The trigger runs as the SECURITY DEFINER (postgres role)
-- We need to allow profile creation during the auth trigger execution

-- 1. Primary policy: Allow authenticated users to manage their own profiles
CREATE POLICY "authenticated_users_own_profile" ON public.profiles
  FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. CRITICAL: Allow the signup trigger to create profiles
-- This policy allows the trigger function to insert new profile records
CREATE POLICY "allow_signup_trigger_insert" ON public.profiles
  FOR INSERT 
  WITH CHECK (true);

-- 3. Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Grant necessary permissions for the trigger function
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL ON public.profiles TO postgres;
GRANT USAGE ON SCHEMA auth TO postgres;

-- 5. Ensure the trigger function has proper permissions
-- Re-create the trigger function with explicit permissions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert profile with proper error handling
  INSERT INTO public.profiles (user_id, email, role, display_name, school_name, year_level, created_at, updated_at)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'school_name', 'Mangakōtukutuku College'),
    CASE 
      WHEN new.raw_user_meta_data->>'year_level' IS NOT NULL 
      THEN (new.raw_user_meta_data->>'year_level')::integer 
      ELSE NULL 
    END,
    NOW(),
    NOW()
  );
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Log the error but don't fail the user creation
  RAISE LOG 'Error creating profile for user %: %', new.id, SQLERRM;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Test policy: Create a test policy to verify everything works
-- This will be removed after testing
CREATE POLICY "emergency_test_access" ON public.profiles
  FOR SELECT 
  USING (true);

-- VERIFICATION QUERIES (for testing):
-- SELECT * FROM auth.users LIMIT 1;
-- SELECT * FROM public.profiles LIMIT 5;
-- SELECT current_user, session_user;

COMMIT;