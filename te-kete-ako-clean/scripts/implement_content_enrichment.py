#!/usr/bin/env python3
"""
Te Kete Ako - Content Enrichment Implementation
===============================================

This system adds high-quality external resource links to our educational content
based on the enrichment analysis, creating "External Resources" sections.
"""

import json
import re
from pathlib import Path
from typing import List, Dict, Any
from exa_content_enrichment import TeKeteContentEnricher

class ContentEnrichmentImplementer:
    """
    Implements content enrichment by adding external resource sections to HTML files.
    """
    
    def __init__(self):
        self.enricher = TeKeteContentEnricher()
        self.backup_dir = Path('enrichment_backups')
        self.backup_dir.mkdir(exist_ok=True)
        
    def create_external_resources_section(self, enrichments: List[Dict[str, Any]], cultural_level: str = 'general') -> str:
        """
        Create an HTML section for external resources.
        """
        if not enrichments:
            return ""
            
        # Cultural styling based on content level
        if cultural_level == 'high':
            section_style = 'border-left: 4px solid var(--color-maori-red, #CC0000); background: linear-gradient(135deg, #f0f8f4 0%, #e8f5e8 100%);'
            icon = '🌿'
            title_prefix = 'Nga Rauemi Tauwehe - '
        elif cultural_level == 'medium':
            section_style = 'border-left: 4px solid var(--color-secondary, #FF6B35); background: #f8f9fa;'
            icon = '🔗'
            title_prefix = ''
        else:
            section_style = 'border-left: 4px solid var(--color-primary, #2E8B57); background: #f8f9fa;'
            icon = '📚'  
            title_prefix = ''
            
        # Sort enrichments by relevance score
        sorted_enrichments = sorted(enrichments, key=lambda x: x['relevance_score'], reverse=True)
        
        # Build resource links
        resource_links = []
        for enrichment in sorted_enrichments[:4]:  # Max 4 external resources
            relevance_pct = int(enrichment['relevance_score'] * 100)
            
            # Create structured link with metadata
            link_html = f'''
            <div class="external-resource-item" style="margin: 1rem 0; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h4 style="margin: 0 0 0.5rem 0; color: var(--color-primary, #2E8B57);">
                    <a href="{enrichment['url']}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit;">
                        {enrichment['title']}
                    </a>
                </h4>
                <p style="margin: 0.5rem 0; color: var(--color-text-secondary, #666); font-size: 0.9rem; line-height: 1.4;">
                    {enrichment['description']}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <span style="background: var(--color-accent, #DAA520); color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">
                            Years: {', '.join(enrichment.get('year_levels', ['7-10']))}
                        </span>
                        <span style="background: var(--color-secondary, #FF6B35); color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">
                            {relevance_pct}% Match
                        </span>
                        <span style="background: var(--color-primary, #2E8B57); color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">  
                            Official NZ Resource
                        </span>
                    </div>
                </div> 
            </div>'''
            
            resource_links.append(link_html)
            
        section_html = f'''
    
    <!-- External Resources Section - Added by Te Kete Ako Content Enrichment -->
    <section class="external-resources-section no-print" style="{section_style} padding: 1.5rem; margin: 2rem 0; border-radius: 12px;">
        <h3 style="margin: 0 0 1rem 0; color: var(--color-primary, #2E8B57); display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.5rem;">{icon}</span>
            {title_prefix}External Resources
        </h3>
        <p style="margin: 0 0 1.5rem 0; color: var(--color-text-secondary, #666); font-size: 0.9rem;">
            High-quality resources from official New Zealand education sites to extend and enrich this learning content.
        </p>
        <div class="external-resources-list">
            {''.join(resource_links)}
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.8rem; color: var(--color-text-muted, #888);">
            <p style="margin: 0;">
                🤖 <em>These resources were automatically curated by Te Kete Ako's AI system to complement this content. 
                All external links lead to official New Zealand educational and government websites.</em>
            </p>
        </div>
    </section>'''
        
        return section_html
    
    def backup_file(self, file_path: Path) -> Path:
        """Create a backup of the original file."""
        backup_path = self.backup_dir / f"{file_path.stem}_backup_{file_path.suffix}"
        counter = 1
        while backup_path.exists():
            backup_path = self.backup_dir / f"{file_path.stem}_backup_{counter}{file_path.suffix}"
            counter += 1
            
        backup_path.write_text(file_path.read_text(encoding='utf-8'), encoding='utf-8')
        return backup_path
    
    def enrich_file(self, file_path: Path, analysis: Dict[str, Any], dry_run: bool = False) -> bool:
        """
        Add external resources section to a single file.
        """
        try:
            content = file_path.read_text(encoding='utf-8')
            
            # Check if already enriched
            if '<!-- External Resources Section - Added by Te Kete Ako' in content:
                print(f"⏭️  {file_path.name} - Already enriched, skipping")
                return False
                
            enrichments = analysis.get('enrichments', [])
            if not enrichments:
                print(f"⏭️  {file_path.name} - No enrichments found, skipping")
                return False
            
            # Create external resources section
            external_section = self.create_external_resources_section(
                enrichments, 
                analysis.get('cultural_level', 'general')
            )
            
            # Find insertion point (before footer or end of main content)
            insertion_patterns = [
                r'(\s*<footer\s+class="site-footer)',  # Before footer
                r'(\s*</main>)',  # Before end of main
                r'(\s*</body>)',  # Before end of body (last resort)
            ]
            
            inserted = False
            for pattern in insertion_patterns:
                if re.search(pattern, content, re.IGNORECASE):
                    new_content = re.sub(
                        pattern, 
                        external_section + r'\1', 
                        content, 
                        count=1, 
                        flags=re.IGNORECASE
                    )
                    inserted = True
                    break
            
            if not inserted:
                print(f"⚠️  {file_path.name} - Could not find insertion point, skipping")
                return False
                
            if dry_run:
                print(f"🔍 {file_path.name} - Would add {len(enrichments)} external resources")
                return True
            else:
                # Backup original file
                backup_path = self.backup_file(file_path)
                
                # Write enriched content
                file_path.write_text(new_content, encoding='utf-8')
                print(f"✅ {file_path.name} - Added {len(enrichments)} external resources (backup: {backup_path.name})")
                return True
                
        except Exception as e:
            print(f"❌ {file_path.name} - Error: {e}")
            return False
    
    def enrich_priority_content(self, max_files: int = 50, dry_run: bool = True) -> Dict[str, Any]:
        """
        Enrich the highest-priority content files with external resources.
        """
        print(f"🚀 STARTING CONTENT ENRICHMENT {'(DRY RUN)' if dry_run else '(LIVE)'}")
        print(f"📊 Max files to enrich: {max_files}")
        print("=" * 60)
        
        # Load analysis results
        try:
            with open('content_enrichment_analysis.json', 'r', encoding='utf-8') as f:
                analysis_data = json.load(f)
        except FileNotFoundError:
            print("❌ Analysis file not found. Run exa_content_enrichment.py first.")
            return {}
        
        recommendations = analysis_data.get('enrichment_recommendations', [])
        
        # Priority scoring: cultural content + high relevance + specific subjects
        def priority_score(rec):
            score = 0
            
            # Cultural priority (highest)
            if rec['cultural_level'] == 'high':
                score += 100
            elif rec['cultural_level'] == 'medium':
                score += 50
                
            # Subject priority
            subject_weights = {
                'te_reo_maori': 80,
                'science': 60,
                'english': 50,
                'social_sciences': 40,
                'mathematics': 30,
                'arts': 20,
                'technology': 10
            }
            score += subject_weights.get(rec['primary_subject'], 0)
            
            # Relevance score
            if rec.get('enrichments'):
                avg_relevance = sum(e['relevance_score'] for e in rec['enrichments']) / len(rec['enrichments'])
                score += avg_relevance * 50
                
            return score
        
        # Sort by priority
        prioritized_recommendations = sorted(recommendations, key=priority_score, reverse=True)
        
        # Process files
        results = {
            'processed': 0,
            'enriched': 0,
            'skipped': 0,
            'errors': 0,
            'files_enriched': []
        }
        
        for i, rec in enumerate(prioritized_recommendations[:max_files]):
            file_path = Path(rec['file_path'])
            
            if not file_path.exists():
                print(f"⚠️  {file_path.name} - File not found, skipping")
                results['skipped'] += 1
                continue
                
            results['processed'] += 1
            
            if self.enrich_file(file_path, rec, dry_run):
                results['enriched'] += 1
                results['files_enriched'].append({
                    'file': str(file_path),
                    'title': rec['title'],
                    'subject': rec['primary_subject'],
                    'cultural_level': rec['cultural_level'],
                    'enrichments_added': len(rec.get('enrichments', [])),
                    'priority_score': priority_score(rec)
                })
            else:
                results['errors'] += 1
        
        # Summary
        print("\n" + "=" * 60)
        print(f"📊 ENRICHMENT SUMMARY")
        print(f"📁 Files processed: {results['processed']}")
        print(f"✅ Files enriched: {results['enriched']}")
        print(f"⏭️  Files skipped: {results['skipped']}")
        print(f"❌ Errors: {results['errors']}")
        
        if results['files_enriched']:
            print(f"\n🎯 TOP ENRICHED FILES:")
            for i, file_info in enumerate(results['files_enriched'][:10], 1):
                print(f"{i}. {file_info['title']}")
                print(f"   📁 {Path(file_info['file']).name}")
                print(f"   📚 {file_info['subject']} | 🌿 {file_info['cultural_level']} | ⭐ {file_info['priority_score']:.0f}")
                print(f"   🔗 {file_info['enrichments_added']} external resources added")
                print()
        
        return results

def main():
    """Run the content enrichment implementation."""
    implementer = ContentEnrichmentImplementer()
    
    print("🎯 TE KETE AKO CONTENT ENRICHMENT IMPLEMENTATION")
    print("=" * 60)
    print("This will add high-quality external resources to our educational content.")
    print("External resources are sourced from official NZ government and educational sites.")
    print()
    
    # First run as dry run to show what would be done
    print("🔍 PHASE 1: DRY RUN ANALYSIS (First 50 files)")
    dry_results = implementer.enrich_priority_content(max_files=50, dry_run=True)
    
    if dry_results.get('enriched', 0) > 0:
        print(f"\n✨ Ready to enrich {dry_results['enriched']} files with external resources!")
        print("\n🚀 PHASE 2: IMPLEMENTING ENRICHMENTS ON ALL CONTENT")
        print("📊 Processing ALL 216 files from analysis...")
        live_results = implementer.enrich_priority_content(max_files=250, dry_run=False)
        return live_results
    
    return dry_results

if __name__ == "__main__":
    main()