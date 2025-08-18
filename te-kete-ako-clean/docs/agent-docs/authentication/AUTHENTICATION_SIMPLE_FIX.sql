-- SIMPLE AUTHENTICATION FIX
-- The problem: RLS is blocking profile creation when users sign up
-- The solution: Allow authenticated users to create their own profiles

-- 1. Allow users to insert their own profile during signup
CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 2. Allow users to view their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

-- 3. Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- 4. Make sure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Grant necessary permissions for the trigger function
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL ON public.profiles TO postgres;

-- Test the fix by temporarily allowing signup
-- This policy allows the trigger to work during user creation
CREATE POLICY "Allow signup trigger" ON public.profiles
  FOR INSERT WITH CHECK (true);

-- After signup works, we can remove this and rely on the user-specific policy above