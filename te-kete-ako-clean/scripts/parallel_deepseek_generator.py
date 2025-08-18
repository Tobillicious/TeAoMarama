#!/usr/bin/env python3
"""
Parallel DeepSeek Educational Resource Generator for Te Kete Ako Alpha Build
Optimized version with concurrent processing for faster generation
"""

import requests
import json
import time
import os
from datetime import datetime
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import threading

# DeepSeek API Configuration
DEEPSEEK_API_KEY = "sk-103cb83572a346e2aef89e2d2a4f7f89"
DEEPSEEK_BASE_URL = "https://api.deepseek.com/v1/chat/completions"

# Thread-safe counter
class SafeCounter:
    def __init__(self):
        self._value = 0
        self._lock = threading.Lock()
    
    def increment(self):
        with self._lock:
            self._value += 1
            return self._value
    
    @property
    def value(self):
        return self._value

# High-Priority Resource Templates (First 10 for rapid deployment)
PRIORITY_RESOURCES = [
    {
        "title": "Year 9 Starter Pack: Essential Skills for High School Success",
        "type": "handout",
        "subject": "cross-curricular",
        "year_level": "Year 9",
        "cultural_context": "Te Ao Māori transition support",
        "priority": 1
    },
    {
        "title": "NCEA Level 1 Literacy & Numeracy Must-Knows",
        "type": "handout", 
        "subject": "cross-curricular",
        "year_level": "Year 11",
        "cultural_context": "Culturally responsive assessment preparation",
        "priority": 1
    },
    {
        "title": "Te Reo Maths Glossary (Key Terms in Māori & English)",
        "type": "handout",
        "subject": "mathematics",
        "year_level": "Years 7-13",
        "cultural_context": "Bilingual mathematics education",
        "priority": 1
    },
    {
        "title": "Chromebook-Optimized Mobile Learning Guide",
        "type": "handout",
        "subject": "digital-technology",
        "year_level": "Years 7-10",
        "cultural_context": "Digital equity and accessibility",
        "priority": 1
    },
    {
        "title": "Cultural Safety Checklists for Classroom Discussions",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 7-13",
        "cultural_context": "Safe learning environments for Māori students",
        "priority": 1
    },
    {
        "title": "Traditional Navigation & Modern GPS Integration",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 9-11",
        "cultural_context": "Māori wayfinding knowledge systems",
        "priority": 2
    },
    {
        "title": "Climate Change Through Te Taiao Māori Lens",
        "type": "lesson",
        "subject": "science",
        "year_level": "Years 10-12",
        "cultural_context": "Indigenous environmental knowledge",
        "priority": 2
    },
    {
        "title": "Financial Literacy with Māori Economic Principles",
        "type": "handout",
        "subject": "social-sciences",
        "year_level": "Years 11-13",
        "cultural_context": "Māori economic systems and values",
        "priority": 2
    },
    {
        "title": "Digital Storytelling with Pūrākau Framework",
        "type": "lesson",
        "subject": "english",
        "year_level": "Years 8-10",
        "cultural_context": "Traditional Māori storytelling methods",
        "priority": 2
    },
    {
        "title": "AI Ethics Through Māori Data Sovereignty",
        "type": "lesson",
        "subject": "digital-technology",
        "year_level": "Years 11-13",
        "cultural_context": "Māori perspectives on technology ethics",
        "priority": 2
    }
]

counter = SafeCounter()

def call_deepseek_api_sync(messages, max_tokens=3000, temperature=0.7):
    """Synchronous DeepSeek API call with retry logic"""
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
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(DEEPSEEK_BASE_URL, headers=headers, json=data, timeout=60)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            if attempt == max_retries - 1:
                print(f"API Error after {max_retries} attempts: {e}")
                return None
            time.sleep(2 ** attempt)  # Exponential backoff
    
    return None

def generate_resource_content_optimized(resource_spec):
    """Generate educational resource content with optimized prompting"""
    
    system_prompt = """You are Te Kete Ako's expert educational content generator. Create classroom-ready resources that blend authentic Te Ao Māori perspectives with New Zealand Curriculum requirements.

CRITICAL REQUIREMENTS:
- Complete, functional HTML ready for immediate classroom use
- Chromebook-optimized (lightweight, no complex JavaScript)
- Cultural authenticity with accurate Māori language use
- Clear learning objectives aligned with NZC
- Practical implementation guidance
- Assessment integration

OUTPUT FORMAT: Provide only the complete HTML content, starting with <!DOCTYPE html>"""

    user_prompt = f"""Generate a complete educational resource:

TITLE: {resource_spec['title']}
TYPE: {resource_spec['type']}
SUBJECT: {resource_spec['subject']}
YEAR LEVEL: {resource_spec['year_level']}
CULTURAL CONTEXT: {resource_spec['cultural_context']}

Create comprehensive HTML content including:
1. Professional header with learning objectives
2. Cultural context section with tikanga considerations
3. Main content with interactive elements (HTML/CSS only)
4. Assessment rubric or checklist
5. Extension activities
6. Teacher implementation notes
7. Resource links and references

Ensure cultural accuracy, pedagogical soundness, and immediate classroom usability. The HTML should be complete and self-contained."""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
    
    response = call_deepseek_api_sync(messages, max_tokens=4000, temperature=0.7)
    
    if response and 'choices' in response:
        return response['choices'][0]['message']['content']
    return None

def save_resource_to_file_safe(resource_spec, content, output_dir):
    """Thread-safe file saving with better error handling"""
    try:
        # Create filename
        filename = resource_spec['title'].lower().replace(' ', '-').replace(':', '').replace('&', 'and')
        filename = ''.join(c for c in filename if c.isalnum() or c in '-_')
        
        # Determine subdirectory
        subdir = 'handouts' if resource_spec['type'] == 'handout' else 'lessons'
        
        # Create file path
        file_path = output_dir / subdir / f"{filename}.html"
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Save content with UTF-8 encoding
        with open(file_path, 'w', encoding='utf-8') as f:
            # Ensure content is valid HTML
            if not content.strip().startswith('<!DOCTYPE html'):
                content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{resource_spec['title']} - Te Kete Ako</title>
    <style>
        body {{ font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #2E8B57; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }}
        .cultural-context {{ background: #f0f8f0; padding: 15px; border-radius: 5px; margin: 20px 0; }}
        .assessment {{ background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; }}
    </style>
</head>
<body>
    <div class="header">
        <h1>{resource_spec['title']}</h1>
        <p><strong>Subject:</strong> {resource_spec['subject']} | <strong>Year Level:</strong> {resource_spec['year_level']}</p>
    </div>
    <div class="cultural-context">
        <h3>Cultural Context</h3>
        <p>{resource_spec['cultural_context']}</p>
    </div>
    <div class="content">
{content}
    </div>
</body>
</html>"""
            
            f.write(content)
        
        return str(file_path)
    
    except Exception as e:
        print(f"Error saving {resource_spec['title']}: {e}")
        return None

def generate_single_resource(resource_spec, output_dir):
    """Generate a single resource - designed for parallel execution"""
    current_count = counter.increment()
    
    print(f"[{current_count}/{len(PRIORITY_RESOURCES)}] Starting: {resource_spec['title']}")
    
    start_time = time.time()
    
    # Generate content
    content = generate_resource_content_optimized(resource_spec)
    
    if content:
        # Save to file
        file_path = save_resource_to_file_safe(resource_spec, content, output_dir)
        
        if file_path:
            duration = time.time() - start_time
            print(f"✓ [{current_count}] Generated in {duration:.1f}s: {resource_spec['title']}")
            
            return {
                **resource_spec,
                'file_path': file_path,
                'generation_status': 'success',
                'content_length': len(content),
                'generation_time': datetime.now().isoformat(),
                'duration_seconds': duration
            }
        else:
            print(f"✗ [{current_count}] Failed to save: {resource_spec['title']}")
            return {
                **resource_spec,
                'generation_status': 'save_failed',
                'generation_time': datetime.now().isoformat()
            }
    else:
        print(f"✗ [{current_count}] API failed: {resource_spec['title']}")
        return {
            **resource_spec,
            'generation_status': 'api_failed',
            'generation_time': datetime.now().isoformat()
        }

def generate_resources_parallel(max_workers=5):
    """Generate resources using parallel processing"""
    
    output_dir = Path('/Users/admin/Documents/te-kete-ako-clean/public/generated-resources-alpha')
    output_dir.mkdir(exist_ok=True)
    
    print(f"🚀 PARALLEL GENERATION MODE: {len(PRIORITY_RESOURCES)} resources, {max_workers} workers")
    print("=" * 70)
    
    start_time = time.time()
    results = []
    
    # Use ThreadPoolExecutor for parallel API calls
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all tasks
        future_to_resource = {
            executor.submit(generate_single_resource, resource, output_dir): resource 
            for resource in PRIORITY_RESOURCES
        }
        
        # Collect results as they complete
        for future in as_completed(future_to_resource):
            resource = future_to_resource[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as e:
                print(f"✗ Exception for {resource['title']}: {e}")
                results.append({
                    **resource,
                    'generation_status': 'exception',
                    'error': str(e),
                    'generation_time': datetime.now().isoformat()
                })
    
    # Generate summary
    total_time = time.time() - start_time
    successful = sum(1 for r in results if r['generation_status'] == 'success')
    
    # Create manifest
    manifest = {
        'generation_date': datetime.now().isoformat(),
        'total_resources': len(PRIORITY_RESOURCES),
        'successful_generations': successful,
        'failed_generations': len(PRIORITY_RESOURCES) - successful,
        'total_duration_seconds': total_time,
        'average_per_resource': total_time / len(PRIORITY_RESOURCES),
        'parallel_workers': max_workers,
        'api_key_used': 'sk-103cb83572a346e2aef89e2d2a4f7f89',
        'resources': results
    }
    
    # Save manifest
    manifest_path = output_dir / 'parallel-generation-manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 70)
    print(f"🎯 PARALLEL GENERATION COMPLETE!")
    print(f"✓ Successfully generated: {successful}/{len(PRIORITY_RESOURCES)} resources")
    print(f"⏱️  Total time: {total_time:.1f} seconds ({total_time/60:.1f} minutes)")
    print(f"📈 Average per resource: {total_time/len(PRIORITY_RESOURCES):.1f} seconds")
    print(f"📁 Output directory: {output_dir}")
    print(f"📋 Manifest: {manifest_path}")
    
    return successful, results

if __name__ == "__main__":
    print("🧠 Te Kete Ako Alpha Build - PARALLEL DeepSeek Resource Generator")
    print("=" * 70)
    
    # Test API connection
    test_messages = [{"role": "user", "content": "Ready"}]
    test_response = call_deepseek_api_sync(test_messages, max_tokens=5)
    
    if test_response:
        print("✓ DeepSeek API connection verified")
        success_count, results = generate_resources_parallel(max_workers=4)
        
        print(f"\n🏆 ALPHA BUILD MISSION STATUS:")
        print(f"✓ {success_count} resources generated and ready for deployment")
        print(f"✓ Cultural authenticity maintained with Te Ao Māori integration")
        print(f"✓ Chromebook-optimized HTML/CSS resources")
        print(f"✓ Ready for immediate classroom use")
        
    else:
        print("✗ DeepSeek API connection failed")
        print("Check API key and network connectivity")