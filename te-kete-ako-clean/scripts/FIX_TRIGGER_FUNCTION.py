#!/usr/bin/env python3
"""
Fix the trigger function that creates profiles during signup
"""

import os
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://nlgldaqtubrlcqddppbq.supabase.co')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

def fix_trigger_function():
    """Fix the trigger function and ensure it works"""
    try:
        print("🔧 Fixing trigger function for profile creation...")
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        
        # Recreate the trigger function with better error handling
        trigger_function_sql = """
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          -- Log the attempt
          RAISE LOG 'Creating profile for user: %', new.id;
          
          -- Insert profile with proper error handling
          INSERT INTO public.profiles (
            user_id, 
            email, 
            role, 
            display_name, 
            school_name, 
            year_level,
            created_at,
            updated_at
          )
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
          
          RAISE LOG 'Profile created successfully for user: %', new.id;
          RETURN new;
        EXCEPTION WHEN OTHERS THEN
          -- Log the error but don't fail the user creation
          RAISE LOG 'Error creating profile for user %: %', new.id, SQLERRM;
          RETURN new;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
        """
        
        result = supabase.rpc('exec_sql', {'sql': trigger_function_sql})
        print("✅ Trigger function updated successfully")
        
        # Recreate the trigger
        trigger_sql = """
        DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
        """
        
        result = supabase.rpc('exec_sql', {'sql': trigger_sql})
        print("✅ Trigger recreated successfully")
        
        # Add additional RLS policy for trigger access
        rls_sql = """
        -- Ensure trigger can access profiles table
        CREATE POLICY IF NOT EXISTS "trigger_can_insert_profiles" ON public.profiles
          FOR INSERT WITH CHECK (true);
        """
        
        result = supabase.rpc('exec_sql', {'sql': rls_sql})
        print("✅ Additional RLS policy created")
        
        return True
        
    except Exception as e:
        print(f"❌ Failed to fix trigger function: {e}")
        return False

def test_signup_with_profile():
    """Test signup and verify profile creation"""
    try:
        print("🧪 Testing signup with profile creation...")
        supabase = create_client(SUPABASE_URL, os.getenv('SUPABASE_ANON_KEY'))
        
        import time
        timestamp = int(time.time())
        test_email = f"triggertest{timestamp}@gmail.com"
        
        # Sign up new user
        result = supabase.auth.sign_up({
            "email": test_email,
            "password": "test123456",
            "options": {
                "data": {
                    "role": "student",
                    "display_name": "Trigger Test User",
                    "school_name": "Mangakōtukutuku College",
                    "year_level": 10
                }
            }
        })
        
        if result.user:
            print(f"✅ User created: {result.user.email}")
            
            # Wait a moment for trigger to execute
            import time
            time.sleep(2)
            
            # Check if profile was created using service role
            admin_supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
            profiles = admin_supabase.table('profiles').select('*').eq('user_id', result.user.id).execute()
            
            if profiles.data:
                profile = profiles.data[0]
                print(f"✅ Profile created successfully!")
                print(f"   Role: {profile.get('role')}")
                print(f"   Display Name: {profile.get('display_name')}")
                print(f"   School: {profile.get('school_name')}")
                return True
            else:
                print(f"❌ Profile not created - trigger failed")
                return False
        else:
            print(f"❌ User creation failed")
            return False
            
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

if __name__ == "__main__":
    print("🔧 FIXING TRIGGER FUNCTION")
    print("=" * 40)
    
    # Fix the trigger function
    if fix_trigger_function():
        print("\n🧪 Testing the fix...")
        
        # Test signup with profile creation
        test_result = test_signup_with_profile()
        
        if test_result:
            print("\n🎉 SUCCESS!")
            print("   Trigger function is working correctly")
            print("   Users can now signup and profiles are created automatically")
        else:
            print("\n⚠️  Still having issues with profile creation")
            print("   May need manual investigation in Supabase dashboard")
    else:
        print("\n❌ Failed to fix trigger function")