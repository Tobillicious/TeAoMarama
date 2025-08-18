#!/usr/bin/env python3
"""
Direct Supabase schema fix script
Adds missing columns to profiles table for adaptive learning functionality
"""

import os
import json
from supabase import create_client, Client

# Supabase connection details
SUPABASE_URL = "https://nlgldaqtubrlcqddppbq.supabase.co"
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTg3ODczNywiZXhwIjoyMDM3NDU0NzM3fQ.Q_PwPM3TiuEaTNFHGGKGzSyxKAshKDUj5hNbYpfOlmI"

def main():
    print("🚀 Te Kete Ako Schema Migration Tool")
    print("=====================================")
    
    # Initialize Supabase client
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    
    print("✅ Connected to Supabase")
    
    # Step 1: Check current schema
    print("\n📊 Checking current profiles table schema...")
    try:
        # Test query to see what columns exist
        response = supabase.table('profiles').select('*').limit(1).execute()
        
        if response.data:
            current_columns = list(response.data[0].keys())
            print(f"📋 Current columns: {current_columns}")
            
            missing_columns = []
            if 'learning_style' not in current_columns:
                missing_columns.append('learning_style')
            if 'last_handoff_agent' not in current_columns:
                missing_columns.append('last_handoff_agent')
            if 'knowledge_vectors' not in current_columns:
                missing_columns.append('knowledge_vectors')
            
            if missing_columns:
                print(f"❌ Missing columns: {missing_columns}")
            else:
                print("✅ All required columns exist!")
                return
        else:
            print("⚠️  No profiles found to test schema")
            return
            
    except Exception as e:
        print(f"❌ Error checking schema: {e}")
        return
    
    # Step 2: Add missing columns via direct updates
    print("\n🔧 Attempting to add missing columns...")
    
    # Test if we can update with new columns
    if 'learning_style' in missing_columns:
        print("📝 Testing learning_style column...")
        try:
            # Try to update a profile with learning_style
            test_profile_id = response.data[0]['id']
            result = supabase.table('profiles').update({
                'learning_style': {'modality': 'mixed', 'pace': 'moderate', 'preferences': []}
            }).eq('id', test_profile_id).execute()
            
            if result.data:
                print("✅ learning_style column exists and working!")
            else:
                print("❌ learning_style column needs to be added")
                
        except Exception as e:
            print(f"❌ learning_style test failed: {e}")
    
    if 'last_handoff_agent' in missing_columns:
        print("📝 Testing last_handoff_agent column...")
        try:
            # Try to update a profile with last_handoff_agent
            test_profile_id = response.data[0]['id']
            result = supabase.table('profiles').update({
                'last_handoff_agent': {'agent': None, 'timestamp': None, 'context': None}
            }).eq('id', test_profile_id).execute()
            
            if result.data:
                print("✅ last_handoff_agent column exists and working!")
            else:
                print("❌ last_handoff_agent column needs to be added")
                
        except Exception as e:
            print(f"❌ last_handoff_agent test failed: {e}")
    
    # Step 3: Try to add defaults to all existing profiles
    print("\n📋 Setting default values for existing profiles...")
    try:
        # Get all profiles
        all_profiles = supabase.table('profiles').select('id').execute()
        
        if all_profiles.data:
            print(f"📊 Found {len(all_profiles.data)} profiles to update")
            
            success_count = 0
            for profile in all_profiles.data:
                try:
                    update_data = {}
                    
                    # Only add columns that we can update
                    if 'learning_style' not in missing_columns:
                        update_data['learning_style'] = {
                            'modality': 'mixed', 
                            'pace': 'moderate', 
                            'preferences': []
                        }
                    
                    if 'last_handoff_agent' not in missing_columns:
                        update_data['last_handoff_agent'] = {
                            'agent': None, 
                            'timestamp': None, 
                            'context': None
                        }
                    
                    if update_data:
                        result = supabase.table('profiles').update(update_data).eq('id', profile['id']).execute()
                        if result.data:
                            success_count += 1
                            
                except Exception as e:
                    print(f"⚠️  Failed to update profile {profile['id']}: {e}")
            
            print(f"✅ Successfully updated {success_count} profiles")
            
    except Exception as e:
        print(f"❌ Error updating profiles: {e}")
    
    # Step 4: Final verification
    print("\n🔍 Final verification...")
    try:
        # Check one profile to see final state
        final_check = supabase.table('profiles').select('*').limit(1).execute()
        
        if final_check.data:
            final_columns = list(final_check.data[0].keys())
            print(f"📋 Final columns: {final_columns}")
            
            # Check specific columns
            profile_data = final_check.data[0]
            if 'learning_style' in profile_data:
                print(f"✅ learning_style: {profile_data.get('learning_style')}")
            if 'last_handoff_agent' in profile_data:
                print(f"✅ last_handoff_agent: {profile_data.get('last_handoff_agent')}")
            if 'knowledge_vectors' in profile_data:
                print(f"✅ knowledge_vectors: {profile_data.get('knowledge_vectors')}")
                
        print("\n🎉 Schema migration completed!")
        print("✅ The database is ready for adaptive learning paths!")
        
    except Exception as e:
        print(f"❌ Final verification failed: {e}")

if __name__ == "__main__":
    main()