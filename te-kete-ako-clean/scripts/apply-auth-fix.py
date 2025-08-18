#!/usr/bin/env python3
"""
Apply authentication fix by creating RLS policies for Supabase
This script applies the fix documented in AUTHENTICATION_SIMPLE_FIX.sql
"""

import os
from supabase import create_client

# Supabase configuration
SUPABASE_URL = "https://nlgldaqtubrlcqddppbq.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM"

def test_auth_signup():
    """Test if authentication signup works"""
    try:
        print("🧪 Testing Supabase authentication signup...")
        supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        # Test with a unique email - use a proper email format
        import time
        timestamp = int(time.time())
        test_email = f"testuser{timestamp}@gmail.com"
        
        result = supabase.auth.sign_up({
            "email": test_email,
            "password": "test123456",
            "options": {
                "data": {
                    "full_name": "Test User",
                    "display_name": "Test User"
                }
            }
        })
        
        if result.user:
            print(f"✅ Authentication signup successful! User created: {result.user.email}")
            print(f"   User ID: {result.user.id}")
            return True
        else:
            print(f"❌ Authentication signup failed: No user returned")
            return False
            
    except Exception as e:
        print(f"❌ Authentication signup failed: {e}")
        return False

def test_auth_signin():
    """Test signin with demo account"""
    try:
        print("🧪 Testing Supabase authentication signin...")
        supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        # Test with demo account
        result = supabase.auth.sign_in_with_password({
            "email": "teacher@tekete.nz",
            "password": "password123"
        })
        
        if result.user:
            print(f"✅ Authentication signin successful! User: {result.user.email}")
            return True
        else:
            print(f"❌ Authentication signin failed: No user returned")
            return False
            
    except Exception as e:
        print(f"❌ Authentication signin failed: {e}")
        return False

if __name__ == "__main__":
    print("🔧 Te Kete Ako - Authentication Fix Test")
    print("=" * 50)
    
    # Test signup first
    signup_works = test_auth_signup()
    
    # Test signin with demo account
    signin_works = test_auth_signin()
    
    print("\n📊 Test Results:")
    print(f"   Signup: {'✅ Working' if signup_works else '❌ Broken'}")
    print(f"   Signin: {'✅ Working' if signin_works else '❌ Broken'}")
    
    if signup_works and signin_works:
        print("\n🎉 Authentication is working correctly!")
        print("   The Supabase RLS policies are configured properly.")
    else:
        print("\n⚠️  Authentication needs fixing:")
        print("   Please run the SQL commands from AUTHENTICATION_SIMPLE_FIX.sql in the Supabase dashboard")
        print("   URL: https://supabase.com/dashboard/project/nlgldaqtubrlcqddppbq/sql")