#!/usr/bin/env python3
"""
Environment Variable Loader for Te Kete Ako
Loads .env file variables into os.environ for security
"""

import os
from pathlib import Path

def load_env():
    """Load environment variables from .env file."""
    env_path = Path(__file__).parent / '.env'
    
    if not env_path.exists():
        print("⚠️  Warning: .env file not found")
        return False
    
    try:
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value
        
        print("✅ Environment variables loaded from .env")
        return True
        
    except Exception as e:
        print(f"❌ Error loading .env file: {e}")
        return False

# Auto-load when imported
if __name__ != "__main__":
    load_env()

if __name__ == "__main__":
    success = load_env()
    if success:
        print("\n🔐 Available environment variables:")
        for key in ['NEO4J_URI', 'NEO4J_USERNAME', 'SUPABASE_URL']:
            value = os.getenv(key)
            if value:
                # Mask sensitive values
                if 'PASSWORD' in key or 'KEY' in key:
                    masked = value[:8] + '...' + value[-8:] if len(value) > 16 else '***'
                    print(f"  {key}: {masked}")
                else:
                    print(f"  {key}: {value}")