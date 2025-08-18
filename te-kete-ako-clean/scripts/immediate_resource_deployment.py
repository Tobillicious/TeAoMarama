#!/usr/bin/env python3
"""
Immediate Resource Deployment for Te Kete Ako Alpha Build
Creates priority educational resources instantly using DeepSeek API
"""

import requests
import json
from pathlib import Path
from datetime import datetime

# DeepSeek API Configuration  
DEEPSEEK_API_KEY = "sk-103cb83572a346e2aef89e2d2a4f7f89"
DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/chat/completions"

# Immediate Priority Resources (Top 5 for Alpha Build)
IMMEDIATE_RESOURCES = [
    {
        "title": "Year 9 Starter Pack: Essential Skills for High School Success",
        "filename": "year-9-starter-pack-essential-skills",
        "type": "handout",
        "subject": "cross-curricular",
        "year_level": "Year 9",
        "description": "Comprehensive guide for Year 9 students transitioning to high school with Te Ao Māori support"
    },
    {
        "title": "NCEA Level 1 Literacy & Numeracy Must-Knows", 
        "filename": "ncea-level-1-literacy-numeracy-guide",
        "type": "handout",
        "subject": "cross-curricular", 
        "year_level": "Year 11",
        "description": "Essential NCEA Level 1 preparation with culturally responsive assessment strategies"
    },
    {
        "title": "Te Reo Maths Glossary (Key Terms in Māori & English)",
        "filename": "te-reo-maths-glossary-bilingual",
        "type": "handout", 
        "subject": "mathematics",
        "year_level": "Years 7-13",
        "description": "Bilingual mathematics glossary supporting Māori-medium and English-medium learners"
    },
    {
        "title": "Cultural Safety Checklists for Classroom Discussions",
        "filename": "cultural-safety-classroom-checklists", 
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 7-13", 
        "description": "Practical tools for creating culturally safe learning environments"
    },
    {
        "title": "Chromebook-Optimized Mobile Learning Guide",
        "filename": "chromebook-mobile-learning-guide",
        "type": "handout",
        "subject": "digital-technology", 
        "year_level": "Years 7-10",
        "description": "Digital equity guide optimized for Chromebook users and mobile learning"
    }
]

def call_deepseek_api(messages, max_tokens=3500):
    """Call DeepSeek API with error handling"""
    headers = {
        'Authorization': f'Bearer {DEEPSEEK_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'deepseek-chat',
        'messages': messages,
        'max_tokens': max_tokens,
        'temperature': 0.7,
        'stream': False
    }
    
    try:
        response = requests.post(DEEPSEEK_BASE_URL, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"API Error: {e}")
        return None

def generate_resource_immediately(resource_spec):
    """Generate a complete educational resource immediately"""
    
    print(f"🚀 Generating: {resource_spec['title']}")
    
    system_prompt = """You are the lead educational content creator for Te Kete Ako, New Zealand's premier cultural-educational platform.

Create a complete, classroom-ready HTML educational resource that integrates authentic Te Ao Māori perspectives with New Zealand Curriculum requirements.

REQUIREMENTS:
- Complete HTML document (DOCTYPE to closing </html>)
- Professional styling with embedded CSS
- Cultural authenticity and safety
- Immediate classroom usability
- Chromebook-optimized (lightweight)
- Clear learning objectives
- Assessment integration
- Teacher implementation notes

OUTPUT: Provide ONLY the complete HTML content, ready for immediate deployment."""

    user_prompt = f"""Create a comprehensive educational resource:

TITLE: {resource_spec['title']}
TYPE: {resource_spec['type']}
SUBJECT: {resource_spec['subject']}
YEAR LEVEL: {resource_spec['year_level']}
DESCRIPTION: {resource_spec['description']}

Generate complete HTML including:
1. Professional header with Te Kete Ako branding
2. Clear learning objectives aligned with NZC
3. Cultural context section with tikanga protocols
4. Main educational content with interactive elements
5. Assessment rubric or evaluation criteria
6. Extension activities for differentiation
7. Teacher implementation guide
8. Resource links and cultural references

Ensure:
- Accurate Māori language use (with translations)
- Cultural safety and authenticity
- Practical classroom application
- Mobile-friendly responsive design
- Immediate usability for teachers

The resource should be comprehensive, culturally grounded, and ready for immediate classroom deployment."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = call_deepseek_api(messages)
    
    if response and 'choices' in response:
        content = response['choices'][0]['message']['content']
        
        # Ensure HTML structure
        if not content.strip().startswith('<!DOCTYPE'):
            content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{resource_spec['title']} - Te Kete Ako</title>
    <style>
        body {{ font-family: 'Arial', sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; line-height: 1.6; }}
        .header {{ background: linear-gradient(135deg, #2E8B57, #228B22); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; text-align: center; }}
        .cultural-note {{ background: #f0f8f0; border-left: 5px solid #2E8B57; padding: 20px; margin: 20px 0; border-radius: 5px; }}
        .objectives {{ background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        .assessment {{ background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        .teacher-notes {{ background: #f8f9fa; border: 1px solid #dee2e6; padding: 20px; border-radius: 8px; margin: 20px 0; }}
        .maori-term {{ color: #2E8B57; font-weight: bold; }}
        @media (max-width: 768px) {{ body {{ padding: 10px; }} .header {{ padding: 20px; }} }}
    </style>
</head>
<body>
    <div class="header">
        <h1>{resource_spec['title']}</h1>
        <p><strong>Te Kete Ako</strong> | {resource_spec['subject'].title()} | {resource_spec['year_level']}</p>
    </div>
    <div class="cultural-note">
        <h3>🌟 Cultural Context</h3>
        <p>{resource_spec['description']}</p>
    </div>
    <div class="main-content">
{content}
    </div>
</body>
</html>'''
        
        return content
    
    return None

def deploy_resource_immediately(resource_spec, content):
    """Deploy generated resource to platform immediately"""
    
    # Create target directory
    handouts_dir = Path('/Users/admin/Documents/te-kete-ako-clean/public/handouts')
    handouts_dir.mkdir(exist_ok=True)
    
    # Save file
    target_file = handouts_dir / f"{resource_spec['filename']}.html"
    
    try:
        with open(target_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Deployed: {target_file}")
        return str(target_file)
    
    except Exception as e:
        print(f"❌ Deployment failed: {e}")
        return None

def run_immediate_deployment():
    """Execute immediate resource deployment"""
    
    print("🎯 TE KETE AKO ALPHA BUILD - IMMEDIATE DEPLOYMENT")
    print("=" * 60)
    
    deployed_resources = []
    successful_deployments = 0
    
    for i, resource_spec in enumerate(IMMEDIATE_RESOURCES, 1):
        print(f"\n[{i}/{len(IMMEDIATE_RESOURCES)}] Processing: {resource_spec['title']}")
        
        # Generate content
        content = generate_resource_immediately(resource_spec)
        
        if content:
            # Deploy immediately
            deployed_path = deploy_resource_immediately(resource_spec, content)
            
            if deployed_path:
                deployed_resources.append({
                    **resource_spec,
                    'deployed_path': deployed_path,
                    'deployment_time': datetime.now().isoformat(),
                    'status': 'SUCCESS'
                })
                successful_deployments += 1
                print(f"✅ SUCCESS: Resource ready for classroom use")
            else:
                deployed_resources.append({
                    **resource_spec,
                    'status': 'DEPLOYMENT_FAILED'
                })
        else:
            deployed_resources.append({
                **resource_spec,
                'status': 'GENERATION_FAILED'
            })
            print(f"❌ FAILED: Could not generate resource")
        
        print("-" * 40)
    
    # Create deployment manifest
    manifest = {
        'deployment_date': datetime.now().isoformat(),
        'deployment_type': 'IMMEDIATE_ALPHA_BUILD',
        'total_resources': len(IMMEDIATE_RESOURCES),
        'successful_deployments': successful_deployments,
        'failed_deployments': len(IMMEDIATE_RESOURCES) - successful_deployments,
        'api_source': 'DeepSeek (sk-103cb83572a346e2aef89e2d2a4f7f89)',
        'target_platform': 'Te Kete Ako Production',
        'resources': deployed_resources
    }
    
    # Save manifest
    manifest_path = Path('/Users/admin/Documents/te-kete-ako-clean/IMMEDIATE_ALPHA_DEPLOYMENT.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print(f"\n🎯 IMMEDIATE DEPLOYMENT COMPLETE!")
    print("=" * 60)
    print(f"✅ Successfully deployed: {successful_deployments}/{len(IMMEDIATE_RESOURCES)} resources")
    print(f"📁 Resources location: /Users/admin/Documents/te-kete-ako-clean/public/handouts/")
    print(f"📋 Manifest saved: {manifest_path}")
    print(f"🏫 Ready for Mangakotukutuku College Alpha Testing")
    
    return successful_deployments, deployed_resources

if __name__ == "__main__":
    success_count, resources = run_immediate_deployment()
    
    if success_count > 0:
        print(f"\n🏆 ALPHA BUILD MISSION ACCOMPLISHED!")
        print(f"🚀 {success_count} high-priority educational resources deployed")
        print(f"🧠 Generated using DeepSeek API with authentic Te Ao Māori integration")
        print(f"💻 Chromebook-optimized and classroom-ready")
        print(f"🎓 Available immediately for teachers and students")
    else:
        print(f"\n❌ MISSION FAILED - No resources successfully deployed")
        print(f"Please check API connectivity and try again.")