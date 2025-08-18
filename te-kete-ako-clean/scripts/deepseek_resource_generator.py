#!/usr/bin/env python3
"""
DeepSeek Educational Resource Generator for Te Kete Ako Alpha Build
Generates 50 high-priority educational resources using DeepSeek API
"""

import requests
import json
import time
import os
from datetime import datetime
from pathlib import Path

# DeepSeek API Configuration
DEEPSEEK_API_KEY = "sk-103cb83572a346e2aef89e2d2a4f7f89"
DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/chat/completions"

# 50 High-Priority Educational Resources (from strategic analysis)
RESOURCE_TARGETS = [
    {
        "title": "Year 9 Starter Pack: Essential Skills for High School Success",
        "type": "handout",
        "subject": "cross-curricular",
        "year_level": "Year 9",
        "cultural_context": "Te Ao Māori transition support"
    },
    {
        "title": "NCEA Level 1 Literacy & Numeracy Must-Knows",
        "type": "handout", 
        "subject": "cross-curricular",
        "year_level": "Year 11",
        "cultural_context": "Culturally responsive assessment preparation"
    },
    {
        "title": "Te Reo Maths Glossary (Key Terms in Māori & English)",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 7-13",
        "cultural_context": "Bilingual mathematics education"
    },
    {
        "title": "Chromebook-Optimized Mobile Learning Guide",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 7-10",
        "cultural_context": "Digital equity and accessibility"
    },
    {
        "title": "Cultural Safety Checklists for Classroom Discussions",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 7-13",
        "cultural_context": "Safe learning environments for Māori students"
    },
    {
        "title": "Traditional Navigation & Modern GPS Integration",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 9-11",
        "cultural_context": "Māori wayfinding knowledge systems"
    },
    {
        "title": "Climate Change Through Te Taiao Māori Lens",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 10-12",
        "cultural_context": "Indigenous environmental knowledge"
    },
    {
        "title": "Financial Literacy with Māori Economic Principles",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 11-13",
        "cultural_context": "Māori economic systems and values"
    },
    {
        "title": "Digital Storytelling with Pūrākau Framework",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 8-10",
        "cultural_context": "Traditional Māori storytelling methods"
    },
    {
        "title": "Statistical Analysis of Treaty Settlement Data",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 12-13",
        "cultural_context": "Contemporary Māori issues through data"
    },
    {
        "title": "AI Ethics Through Māori Data Sovereignty",
        "type": "lesson",
        "subject": "digital-technology",
        "year_level": "Years 11-13",
        "cultural_context": "Māori perspectives on technology ethics"
    },
    {
        "title": "Sustainable Energy Solutions from Traditional Knowledge",
        "type": "handout",
        "subject": "science",
        "year_level": "Years 10-12",
        "cultural_context": "Traditional ecological knowledge applications"
    },
    {
        "title": "Media Literacy: Analyzing Māori Representation",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 9-11",
        "cultural_context": "Critical media analysis with cultural lens"
    },
    {
        "title": "Geometric Patterns in Māori Art and Architecture",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 7-9",
        "cultural_context": "Mathematical concepts in Māori design"
    },
    {
        "title": "Workplace Readiness with Cultural Competency",
        "type": "handout",
        "subject": "cross-curricular",
        "year_level": "Years 12-13",
        "cultural_context": "Bicultural workplace preparation"
    },
    {
        "title": "Scientific Method Using Traditional Māori Practices",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 7-9",
        "cultural_context": "Indigenous knowledge validation methods"
    },
    {
        "title": "Creative Writing Inspired by Whakataukī",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 8-10",
        "cultural_context": "Traditional wisdom in modern expression"
    },
    {
        "title": "Probability and Chance in Māori Games",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 8-10",
        "cultural_context": "Traditional games as learning tools"
    },
    {
        "title": "Digital Citizenship with Tikanga Māori Principles",
        "type": "lesson",
        "subject": "digital-technology",
        "year_level": "Years 7-10",
        "cultural_context": "Cultural values in digital spaces"
    },
    {
        "title": "Food Security Through Traditional Knowledge Systems",
        "type": "handout",
        "subject": "science",
        "year_level": "Years 9-11",
        "cultural_context": "Māori agricultural practices and sustainability"
    },
    {
        "title": "Argumentative Writing on Contemporary Māori Issues",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 10-12",
        "cultural_context": "Critical thinking on current events"
    },
    {
        "title": "Data Visualization of Cultural Demographics",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 11-13",
        "cultural_context": "Understanding population and cultural data"
    },
    {
        "title": "Renewable Energy and Māori Innovation",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 10-13",
        "cultural_context": "Indigenous innovation in sustainable technology"
    },
    {
        "title": "Social Media and Cultural Identity",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 9-12",
        "cultural_context": "Maintaining cultural identity online"
    },
    {
        "title": "Poetry Analysis Through Māori Literary Traditions",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 9-11",
        "cultural_context": "Traditional and contemporary Māori poetry"
    },
    {
        "title": "Mathematical Modeling of Ecological Systems",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 12-13",
        "cultural_context": "Traditional ecological knowledge through mathematics"
    },
    {
        "title": "Health and Wellbeing: Te Whare Tapa Whā Model",
        "type": "lesson",
        "subject": "cross-curricular",
        "year_level": "Years 7-10",
        "cultural_context": "Holistic Māori health model"
    },
    {
        "title": "Coding Projects Inspired by Māori Patterns",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 8-11",
        "cultural_context": "Programming with cultural design elements"
    },
    {
        "title": "Research Skills Using Traditional and Digital Sources",
        "type": "lesson",
        "subject": "cross-curricular",
        "year_level": "Years 8-12",
        "cultural_context": "Validating traditional knowledge alongside academic sources"
    },
    {
        "title": "Chemistry of Traditional Māori Medicine",
        "type": "handout",
        "subject": "science",
        "year_level": "Years 11-13",
        "cultural_context": "Scientific analysis of rongoā Māori"
    },
    {
        "title": "Debate Skills with Māori Oratory Traditions",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 9-12",
        "cultural_context": "Whaikōrero and contemporary debate skills"
    },
    {
        "title": "Economic Systems Comparison: Traditional vs Modern",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 10-13",
        "cultural_context": "Economic models from Māori and global perspectives"
    },
    {
        "title": "Physics of Traditional Māori Instruments",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 9-11",
        "cultural_context": "Sound science through cultural instruments"
    },
    {
        "title": "Digital Portfolio Development Guide",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 10-13",
        "cultural_context": "Showcasing cultural identity in digital portfolios"
    },
    {
        "title": "Critical Analysis of Historical Documents",
        "type": "lesson",
        "subject": "social-sciences",
        "year_level": "Years 11-13",
        "cultural_context": "Analyzing colonial and Māori historical perspectives"
    },
    {
        "title": "Algebraic Thinking in Traditional Māori Games",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 8-10",
        "cultural_context": "Mathematical reasoning through cultural games"
    },
    {
        "title": "Environmental Science Field Study Guide",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 9-12",
        "cultural_context": "Māori environmental monitoring methods"
    },
    {
        "title": "Public Speaking with Cultural Confidence",
        "type": "handout",
        "subject": "english",
        "year_level": "Years 8-11",
        "cultural_context": "Building confidence through cultural grounding"
    },
    {
        "title": "Statistical Analysis of Sports Performance",
        "type": "lesson",
        "subject": "mathematics",
        "year_level": "Years 10-12",
        "cultural_context": "Including traditional Māori sports and games"
    },
    {
        "title": "Biotechnology Ethics Through Māori Worldview",
        "type": "handout",
        "subject": "science",
        "year_level": "Years 12-13",
        "cultural_context": "Ethical frameworks from Māori perspectives"
    },
    {
        "title": "Creative Problem Solving with Design Thinking",
        "type": "lesson",
        "subject": "cross-curricular",
        "year_level": "Years 9-12",
        "cultural_context": "Incorporating Māori innovation approaches"
    },
    {
        "title": "Information Literacy in the Digital Age",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 8-11",
        "cultural_context": "Evaluating sources with cultural awareness"
    },
    {
        "title": "Narrative Writing Using Māori Story Structures",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 7-9",
        "cultural_context": "Traditional narrative frameworks in modern writing"
    },
    {
        "title": "Calculus Applications in Environmental Modeling",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 12-13",
        "cultural_context": "Mathematical modeling of traditional ecological practices"
    },
    {
        "title": "Genetics and Whakapapa: Scientific and Cultural Perspectives",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 11-13",
        "cultural_context": "Bridging scientific and cultural understandings of ancestry"
    },
    {
        "title": "Leadership Development Through Cultural Values",
        "type": "handout",
        "subject": "cross-curricular",
        "year_level": "Years 10-13",
        "cultural_context": "Māori leadership principles for young people"
    },
    {
        "title": "Game Development with Cultural Themes",
        "type": "lesson",
        "subject": "digital-technology",
        "year_level": "Years 9-12",
        "cultural_context": "Creating games that celebrate Māori culture"
    },
    {
        "title": "Visual Arts Analysis with Cultural Context",
        "type": "handout",
        "subject": "arts",
        "year_level": "Years 8-11",
        "cultural_context": "Analyzing art through Māori aesthetic principles"
    },
    {
        "title": "Career Pathways in STEM for Māori Students",
        "type": "lesson",
        "subject": "cross-curricular",
        "year_level": "Years 11-13",
        "cultural_context": "STEM careers with cultural connection and support"
    },
    {
        "title": "Global Citizenship with Tangata Whenua Perspective",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 10-13",
        "cultural_context": "Indigenous perspectives on global citizenship"
    }
]

def call_deepseek_api(messages, max_tokens=3000, temperature=0.7):
    """Call DeepSeek API with specified parameters"""
    headers = {
        'Authorization': f'Bearer {DEEPSEEK_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'deepseek-chat',
        'messages': messages,
        'max_tokens': max_tokens,
        'temperature': temperature,
        'stream': False
    }
    
    try:
        response = requests.post(DEEPSEEK_BASE_URL, headers=headers, json=data, timeout=60)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"API Error: {e}")
        return None

def generate_resource_content(resource_spec):
    """Generate educational resource content using DeepSeek API"""
    
    system_prompt = """You are an expert educational content creator for Te Kete Ako, specializing in culturally responsive New Zealand education.

Your task is to create high-quality educational resources that:
1. Integrate authentic Te Ao Māori perspectives respectfully
2. Meet New Zealand Curriculum requirements
3. Are optimized for Chromebook performance (lightweight, accessible)
4. Support diverse learning needs
5. Include practical classroom applications

For each resource, provide:
- Complete HTML content ready for classroom use
- Cultural context and safety considerations
- Learning objectives aligned with NZC
- Assessment suggestions
- Extension activities
- Teacher implementation notes

Ensure all Māori language use is accurate and culturally appropriate. Include tikanga Māori protocols where relevant."""

    user_prompt = f"""Create a complete educational resource with the following specifications:

Title: {resource_spec['title']}
Type: {resource_spec['type']}
Subject: {resource_spec['subject']}
Year Level: {resource_spec['year_level']}
Cultural Context: {resource_spec['cultural_context']}

Please generate:
1. Complete HTML content suitable for direct classroom use
2. Clear learning objectives
3. Cultural context and safety notes
4. Step-by-step implementation guide for teachers
5. Assessment rubric or suggestions
6. Extension activities for advanced learners
7. Adaptations for different learning needs

The content should be engaging, culturally authentic, and ready for immediate deployment in New Zealand classrooms. Include interactive elements where appropriate and ensure accessibility for all students."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = call_deepseek_api(messages, max_tokens=4000, temperature=0.7)
    
    if response and 'choices' in response:
        return response['choices'][0]['message']['content']
    else:
        return None

def save_resource_to_file(resource_spec, content, output_dir):
    """Save generated resource to appropriate file structure"""
    
    # Create filename from title
    filename = resource_spec['title'].lower().replace(' ', '-').replace(':', '').replace('&', 'and')
    filename = ''.join(c for c in filename if c.isalnum() or c in '-')
    
    # Determine subdirectory based on resource type
    if resource_spec['type'] == 'handout':
        subdir = 'handouts'
    elif resource_spec['type'] == 'lesson':
        subdir = 'lessons'
    else:
        subdir = 'resources'
    
    # Create full path
    file_path = output_dir / subdir / f"{filename}.html"
    file_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Save content
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return str(file_path)
    except Exception as e:
        print(f"Error saving file {file_path}: {e}")
        return None

def generate_all_resources():
    """Generate all 50 educational resources"""
    
    output_dir = Path('/Users/admin/Documents/te-kete-ako-clean/public/generated-resources-alpha')
    output_dir.mkdir(exist_ok=True)
    
    # Create manifest file to track generated resources
    manifest = {
        'generation_date': datetime.now().isoformat(),
        'total_resources': len(RESOURCE_TARGETS),
        'api_key_used': 'sk-103cb83572a346e2aef89e2d2a4f7f89',
        'resources': []
    }
    
    successful_generations = 0
    
    print(f"Starting generation of {len(RESOURCE_TARGETS)} educational resources...")
    print("=" * 60)
    
    for i, resource_spec in enumerate(RESOURCE_TARGETS, 1):
        print(f"\n[{i}/{len(RESOURCE_TARGETS)}] Generating: {resource_spec['title']}")
        print(f"Type: {resource_spec['type']} | Subject: {resource_spec['subject']} | Level: {resource_spec['year_level']}")
        
        # Generate content
        content = generate_resource_content(resource_spec)
        
        if content:
            # Save to file
            file_path = save_resource_to_file(resource_spec, content, output_dir)
            
            if file_path:
                resource_record = {
                    **resource_spec,
                    'file_path': file_path,
                    'generation_status': 'success',
                    'content_length': len(content),
                    'generation_time': datetime.now().isoformat()
                }
                manifest['resources'].append(resource_record)
                successful_generations += 1
                print(f"✓ Successfully generated: {file_path}")
            else:
                resource_record = {
                    **resource_spec,
                    'file_path': None,
                    'generation_status': 'save_failed',
                    'generation_time': datetime.now().isoformat()
                }
                manifest['resources'].append(resource_record)
                print("✗ Failed to save resource")
        else:
            resource_record = {
                **resource_spec,
                'file_path': None,
                'generation_status': 'api_failed',
                'generation_time': datetime.now().isoformat()
            }
            manifest['resources'].append(resource_record)
            print("✗ Failed to generate content")
        
        # Rate limiting - pause between API calls
        if i < len(RESOURCE_TARGETS):
            time.sleep(2)
    
    # Save manifest
    manifest_path = output_dir / 'generation-manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print(f"GENERATION COMPLETE!")
    print(f"Successfully generated: {successful_generations}/{len(RESOURCE_TARGETS)} resources")
    print(f"Output directory: {output_dir}")
    print(f"Manifest saved: {manifest_path}")
    
    return successful_generations

if __name__ == "__main__":
    print("Te Kete Ako Alpha Build - DeepSeek Resource Generator")
    print("=" * 60)
    
    # Test API connection first
    test_messages = [{"role": "user", "content": "Test connection - respond with 'API Ready'"}]
    test_response = call_deepseek_api(test_messages, max_tokens=10)
    
    if test_response:
        print("✓ DeepSeek API connection successful")
        success_count = generate_all_resources()
        print(f"\n🎯 MISSION ACCOMPLISHED: {success_count} resources generated for Alpha Build")
    else:
        print("✗ Failed to connect to DeepSeek API")
        print("Please check API key and network connection")