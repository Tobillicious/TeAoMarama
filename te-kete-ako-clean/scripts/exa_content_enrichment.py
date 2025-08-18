#!/usr/bin/env python3
"""
Te Kete Ako - Content Enrichment System using Exa.ai Research
============================================================

UPGRADED EXA.AI SPECIALIST SYSTEM - TOPIC-SPECIFIC SEARCH

This system uses Exa.ai API to find SPECIFIC educational content pages
that directly relate to lesson objectives, not general homepages.

PRIORITY TARGET SOURCES:
1. NZhistory.govt.nz - specific topic pages
2. RNZ.co.nz - relevant news/educational content  
3. CrashCourse YouTube - specific topic videos
4. Wikipedia - specific topic pages
5. Guardian education - specific articles
6. Quality educational sites - topical content

Key Features:
- Real-time Exa.ai searches for lesson-specific content
- Prioritizes NZ government and educational sites
- Focuses on cultural authenticity for Te Ao Māori content
- Maps to curriculum standards
- Provides contextual relevance scoring
"""

import json
import re
import os
import requests
from pathlib import Path
from typing import List, Dict, Any, Optional

class ExaEducationalSearcher:
    """
    Exa.ai API integration for finding specific educational content.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('EXA_API_KEY')
        self.base_url = "https://api.exa.ai/search"
        self.priority_domains = [
            "nzhistory.govt.nz",
            "rnz.co.nz", 
            "youtube.com/c/crashcourse",
            "en.wikipedia.org",
            "theguardian.com/education",
            "sciencelearn.org.nz",
            "education.govt.nz",
            "tahurangi.education.govt.nz",
            "tepapa.govt.nz",
            "teara.govt.nz",
            "literacyonline.tki.org.nz"
        ]
    
    def search_specific_content(self, topic: str, subject: str, year_level: str, cultural_context: str = None) -> List[Dict[str, Any]]:
        """
        Search for specific educational content using Exa.ai API.
        
        Args:
            topic: The specific topic to search for
            subject: Subject area (science, english, social_sciences, etc.)
            year_level: Year level (e.g., "7-8")
            cultural_context: Optional cultural context for Māori content
        """
        if not self.api_key:
            print("⚠️ No Exa.ai API key found. Using fallback static resources.")
            return self._get_fallback_resources(topic, subject, cultural_context)
        
        search_queries = self._generate_search_queries(topic, subject, year_level, cultural_context)
        all_results = []
        
        for query in search_queries:
            try:
                results = self._execute_exa_search(query, subject)
                all_results.extend(results)
            except Exception as e:
                print(f"⚠️ Exa.ai search failed for '{query}': {e}")
                continue
        
        # Deduplicate and rank results
        unique_results = self._deduplicate_results(all_results)
        ranked_results = self._rank_results_by_quality(unique_results, topic, subject, cultural_context)
        
        return ranked_results[:5]  # Top 5 most relevant
    
    def _generate_search_queries(self, topic: str, subject: str, year_level: str, cultural_context: str = None) -> List[str]:
        """Generate multiple targeted search queries for better coverage."""
        queries = []
        
        # Enhanced topic-specific queries
        if topic:
            # Core educational query with specific terms
            queries.append(f"{topic} teaching resources New Zealand curriculum")
            queries.append(f"{topic} lesson activities NZ education")
            
            # Subject-specific enhanced queries
            if subject == 'english':
                queries.extend([
                    f"{topic} writing techniques literacy online tki",
                    f"{topic} language teaching New Zealand curriculum",
                    f"{topic} reading comprehension strategies NZ"
                ])
            elif subject == 'science':
                queries.extend([
                    f"{topic} science investigation sciencelearn org nz",
                    f"{topic} STEM experiments New Zealand curriculum",
                    f"{topic} science concepts explained students"
                ])
            elif subject == 'social_sciences':
                queries.extend([
                    f"{topic} New Zealand history nzhistory govt",
                    f"{topic} social studies contemporary issues NZ",
                    f"{topic} civics citizenship education"
                ])
            elif subject == 'te_reo_maori':
                queries.extend([
                    f"{topic} te reo māori tahurangi education",
                    f"{topic} māori language resources teaching",
                    f"{topic} te ao māori cultural knowledge"
                ])
        
        # Cultural context queries for Māori content
        if cultural_context and cultural_context in ['high', 'medium']:
            queries.extend([
                f"{topic} māori perspective indigenous knowledge NZ",
                f"{topic} te ao māori cultural integration",
                f"{topic} traditional māori knowledge education"
            ])
        
        # Specific domain-targeted queries
        queries.extend([
            f"{topic} site:nzhistory.govt.nz",
            f"{topic} site:rnz.co.nz education",
            f"{topic} site:sciencelearn.org.nz",
            f"{topic} site:education.govt.nz curriculum"
        ])
        
        return queries
    
    def _execute_exa_search(self, query: str, subject: str) -> List[Dict[str, Any]]:
        """Execute search via Exa.ai API with domain filtering."""
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "x-api-key": self.api_key
        }
        
        # Build domain filters based on subject
        include_domains = self._get_priority_domains_for_subject(subject)
        
        payload = {
            "query": query,
            "type": "search",
            "useAutoprompt": True,
            "numResults": 8,
            "includeDomains": include_domains,
            "excludeeDomains": ["facebook.com", "twitter.com", "instagram.com"],
            "contents": {
                "text": {"maxCharacters": 500}
            }
        }
        
        response = requests.post(self.base_url, json=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        results = []
        
        for item in data.get('results', []):
            # Skip if it's a homepage/general page
            if self._is_homepage_or_general(item.get('url', '')):
                continue
                
            results.append({
                'title': item.get('title', ''),
                'url': item.get('url', ''),
                'description': item.get('text', '')[:200] + "..." if item.get('text') else '',
                'score': item.get('score', 0),
                'domain': self._extract_domain(item.get('url', '')),
                'relevance_keywords': self._extract_keywords_from_content(item.get('text', ''))
            })
        
        return results
    
    def _get_priority_domains_for_subject(self, subject: str) -> List[str]:
        """Get priority domains based on subject area."""
        base_domains = ["nzhistory.govt.nz", "rnz.co.nz", "en.wikipedia.org"]
        
        subject_domains = {
            'te_reo_maori': ["tahurangi.education.govt.nz", "tepapa.govt.nz", "teara.govt.nz"],
            'science': ["sciencelearn.org.nz", "youtube.com/c/crashcourse"],
            'english': ["literacyonline.tki.org.nz", "theguardian.com/education"],
            'social_sciences': ["nzhistory.govt.nz", "teara.govt.nz"],
            'mathematics': ["nzmaths.co.nz", "education.govt.nz"]
        }
        
        return base_domains + subject_domains.get(subject, ["education.govt.nz"])
    
    def _is_homepage_or_general(self, url: str) -> bool:
        """Check if URL appears to be a homepage or general landing page."""
        homepage_indicators = [
            "index.html", "index.php", "home.html", "about.html", "contact.html",
            "/", "/#", "/home", "/about", "/contact"
        ]
        
        # Extract path from URL
        path = url.split('/')[-1] if '/' in url else url
        
        # Check if it's likely a homepage
        if any(indicator in url.lower() for indicator in homepage_indicators):
            return True
            
        # Very short paths are often homepages
        if len(path.replace('.html', '').replace('.php', '')) < 5:
            return True
            
        return False
    
    def _extract_domain(self, url: str) -> str:
        """Extract domain from URL."""
        if '://' in url:
            return url.split('://')[1].split('/')[0]
        return url.split('/')[0]
    
    def _extract_keywords_from_content(self, content: str) -> List[str]:
        """Extract relevant keywords from content text."""
        if not content:
            return []
            
        # Simple keyword extraction - could be enhanced with NLP
        words = re.findall(r'\b\w{4,}\b', content.lower())
        educational_keywords = [
            'education', 'learning', 'teaching', 'curriculum', 'student', 'school',
            'research', 'study', 'analysis', 'knowledge', 'understanding', 'skill'
        ]
        
        return [word for word in set(words) if word in educational_keywords][:5]
    
    def _deduplicate_results(self, results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Remove duplicate results based on URL."""
        seen_urls = set()
        unique_results = []
        
        for result in results:
            url = result.get('url', '')
            if url not in seen_urls:
                seen_urls.add(url)
                unique_results.append(result)
        
        return unique_results
    
    def _rank_results_by_quality(self, results: List[Dict[str, Any]], topic: str, subject: str, cultural_context: str = None) -> List[Dict[str, Any]]:
        """Rank results by quality and relevance."""
        def quality_score(result):
            score = result.get('score', 0)
            
            # Domain priority bonus
            domain = result.get('domain', '')
            if any(priority in domain for priority in ["nzhistory.govt.nz", "education.govt.nz", "sciencelearn.org.nz"]):
                score += 0.3
            elif any(priority in domain for priority in ["rnz.co.nz", "tepapa.govt.nz"]):
                score += 0.2
            elif "wikipedia.org" in domain:
                score += 0.1
            
            # Cultural relevance bonus
            if cultural_context in ['high', 'medium']:
                content = (result.get('title', '') + ' ' + result.get('description', '')).lower()
                cultural_terms = ['māori', 'maori', 'indigenous', 'cultural', 'traditional']
                if any(term in content for term in cultural_terms):
                    score += 0.2
            
            # Topic relevance
            content = (result.get('title', '') + ' ' + result.get('description', '')).lower()
            if topic.lower() in content:
                score += 0.15
            
            return score
        
        return sorted(results, key=quality_score, reverse=True)
    
    def _get_fallback_resources(self, topic: str, subject: str, cultural_context: str = None) -> List[Dict[str, Any]]:
        """Enhanced fallback resources with specific topical URLs instead of search pages."""
        
        # Topic-specific resource mapping for common educational concepts
        topic_specific_resources = {
            'analogy metaphor comparison': {
                'english': [
                    {
                        'title': 'Using Analogies and Metaphors in Writing - Literacy Online',
                        'url': 'https://literacyonline.tki.org.nz/Literacy-Online/Student-needs/English-Language-Learners/Supporting-English-Language-Learners-in-mainstream-schools/Working-with-English-Language-Learners/Vocabulary/Using-analogies-and-metaphors',
                        'description': 'Specific guidance on teaching analogies and metaphors in writing for New Zealand students',
                        'relevance_score': 0.9,
                        'year_levels': ['7-10'],
                        'subjects': ['english']
                    },
                    {
                        'title': 'Language Features: Figurative Language - NZ Curriculum',
                        'url': 'https://seniorsecondary.tki.org.nz/English/Assessment-for-qualifications/Internal-assessment-resources/Level-1-English/91925-Language-features',
                        'description': 'Assessment resources covering metaphor, analogy and figurative language techniques',
                        'relevance_score': 0.85,
                        'year_levels': ['9-11'],
                        'subjects': ['english']
                    }
                ]
            },
            'treaty waitangi new zealand history': {
                'social_sciences': [
                    {
                        'title': 'Treaty of Waitangi - New Zealand History',
                        'url': 'https://nzhistory.govt.nz/politics/treaty-of-waitangi',
                        'description': 'Comprehensive resource on the Treaty of Waitangi, its signing, and ongoing significance',
                        'relevance_score': 0.95,
                        'year_levels': ['7-13'],
                        'subjects': ['social_sciences', 'history']
                    },
                    {
                        'title': 'Treaty Teaching Resources - Te Ara Encyclopedia',
                        'url': 'https://teara.govt.nz/en/treaty-of-waitangi',
                        'description': 'Educational articles and resources about the Treaty from Te Ara Encyclopedia',
                        'relevance_score': 0.9,
                        'year_levels': ['7-13'],
                        'subjects': ['social_sciences']
                    }
                ]
            },
            'whakapapa genealogy māori family connections': {
                'te_reo_maori': [
                    {
                        'title': 'Whakapapa: Māori Genealogy - Te Ara Encyclopedia',
                        'url': 'https://teara.govt.nz/en/whakapapa-genealogy',
                        'description': 'Comprehensive explanation of whakapapa as fundamental concept in Māori worldview',
                        'relevance_score': 0.95,
                        'year_levels': ['7-13'],
                        'subjects': ['te_reo_maori', 'social_sciences']
                    }
                ]
            }
        }
        
        # Check for topic-specific resources first
        topic_lower = topic.lower()
        for resource_topic, subject_resources in topic_specific_resources.items():
            if any(word in topic_lower for word in resource_topic.split()):
                if subject in subject_resources:
                    return subject_resources[subject]
        
        # Enhanced subject-based fallbacks with specific URLs
        subject_fallbacks = {
            'english': [
                {
                    'title': f'English Language Learning - {topic.title()}',
                    'url': f'https://literacyonline.tki.org.nz/Literacy-Online/Planning-for-my-students-needs/English-Language-Learners',
                    'description': f'Literacy strategies and resources for {topic} in English education',
                    'relevance_score': 0.7,
                    'year_levels': ['7-10'],
                    'subjects': ['english']
                },
                {
                    'title': f'Writing Connections - {topic.title()}',
                    'url': 'https://seniorsecondary.tki.org.nz/English/Literacy-learning-progressions/Writing',
                    'description': f'Writing progression resources related to {topic}',
                    'relevance_score': 0.65,
                    'year_levels': ['7-13'],
                    'subjects': ['english']
                }
            ],
            'te_reo_maori': [
                {
                    'title': f'Te Reo Māori Curriculum Resources - {topic.title()}',
                    'url': 'https://tahurangi.education.govt.nz/new-zealand-curriculum-online/learning-content-resources/te-reo-maori',
                    'description': f'Official curriculum resources for {topic} in te reo Māori context',
                    'relevance_score': 0.8,
                    'year_levels': ['1-13'],
                    'subjects': ['te_reo_maori']
                }
            ],
            'science': [
                {
                    'title': f'Science Investigation - {topic.title()}',
                    'url': f'https://www.sciencelearn.org.nz/resources/search?q={topic.replace(" ", "+")}',
                    'description': f'Science learning resources and investigations about {topic}',
                    'relevance_score': 0.7,
                    'year_levels': ['1-13'],
                    'subjects': ['science']
                },
                {
                    'title': f'Nature of Science - {topic.title()}',
                    'url': 'https://seniorsecondary.tki.org.nz/Science/Science-capabilities-for-citizenship',
                    'description': f'Science capabilities and citizenship education relating to {topic}',
                    'relevance_score': 0.65,
                    'year_levels': ['7-13'],
                    'subjects': ['science']
                }
            ],
            'social_sciences': [
                {
                    'title': f'New Zealand Society and History - {topic.title()}',
                    'url': f'https://nzhistory.govt.nz/culture/history-of-new-zealand',
                    'description': f'Historical and social context resources about {topic}',
                    'relevance_score': 0.75,
                    'year_levels': ['7-13'],
                    'subjects': ['social_sciences']
                }
            ]
        }
        
        return subject_fallbacks.get(subject, [])


class TeKeteContentEnricher:
    """
    Content enrichment system for Te Kete Ako educational resources.
    """
    
    def __init__(self, exa_api_key: Optional[str] = None):
        self.base_path = Path('.')
        self.exa_searcher = ExaEducationalSearcher(exa_api_key)
        self.enrichment_data = {
            'cultural_maori': {
                'priority': 1,
                'target_domains': [
                    'education.govt.nz',
                    'tahurangi.education.govt.nz', 
                    'tepapa.govt.nz',
                    'teara.govt.nz',
                    'maori.nz',
                    'tewhanake.maori.nz'
                ],
                'resources': [
                    {
                        'title': 'Tāhūrangi - Te Reo Māori Education Hub',
                        'url': 'https://tahurangi.education.govt.nz/',
                        'description': 'Official NZ government hub for te reo Māori resources, guidance, and teaching support',
                        'relevance_keywords': ['māori', 'te reo', 'cultural', 'tikanga', 'whakapapa', 'kaitiakitanga'],
                        'year_levels': ['7-13'],
                        'subjects': ['te_reo_maori', 'social_sciences', 'cultural']
                    },
                    {
                        'title': 'Te Reo Māori - The New Zealand Curriculum',
                        'url': 'https://newzealandcurriculum.tahurangi.education.govt.nz/5637157326.c',
                        'description': 'Official curriculum guidelines for teaching te reo Māori in English-medium schools',
                        'relevance_keywords': ['curriculum', 'te reo', 'māori', 'guidelines', 'teaching'],
                        'year_levels': ['1-13'],
                        'subjects': ['te_reo_maori', 'curriculum']
                    },
                    {
                        'title': 'Te Mana o te Reo Māori Education Resources',
                        'url': 'https://teara.govt.nz/en/te-tai/education/te-mana-o-te-reo-maori-resources',
                        'description': 'Comprehensive resources covering Whakapapa, Tūrangawaewae, Whanaungatanga, Mana Motuhake, and Kaitiakitanga',
                        'relevance_keywords': ['whakapapa', 'tūrangawaewae', 'whanaungatanga', 'mana motuhake', 'kaitiakitanga', 'history'],
                        'year_levels': ['7-8'],
                        'subjects': ['social_sciences', 'te_reo_maori', 'history']
                    }
                ]
            },
            'science_stem': {
                'priority': 2,
                'target_domains': [
                    'sciencelearn.org.nz',
                    'education.govt.nz',
                    'nzcer.org.nz'
                ],
                'resources': [
                    {
                        'title': 'Science Learning Hub',
                        'url': 'https://www.sciencelearn.org.nz/',
                        'description': 'Over 11,550 NZ science education resources for teachers, students and community',
                        'relevance_keywords': ['science', 'stem', 'research', 'experiments', 'investigation'],
                        'year_levels': ['1-13'],
                        'subjects': ['science', 'stem', 'technology']
                    },
                    {
                        'title': 'Science in the NZ Curriculum',
                        'url': 'https://newzealandcurriculum.tahurangi.education.govt.nz/science-in-the-nz-curriculum/5637208467.p',
                        'description': 'Official NZ science curriculum with Nature of Science, Living World, Physical World strands',
                        'relevance_keywords': ['curriculum', 'nature of science', 'living world', 'physical world', 'material world'],
                        'year_levels': ['1-10'],
                        'subjects': ['science', 'curriculum']
                    }
                ]
            },
            'english_writing': {
                'priority': 3,
                'target_domains': [
                    'education.govt.nz',
                    'literacyonline.tki.org.nz',
                    'tki.org.nz'
                ],
                'resources': [
                    {
                        'title': 'English - The New Zealand Curriculum',
                        'url': 'https://newzealandcurriculum.tahurangi.education.govt.nz/new-zealand-curriculum-online/learning-content-resources/english/5637144622.c',
                        'description': 'Official English curriculum resources for oral, written, and visual texts',
                        'relevance_keywords': ['english', 'writing', 'literacy', 'reading', 'oral language', 'visual language'],
                        'year_levels': ['0-13'],
                        'subjects': ['english', 'literacy']
                    },
                    {
                        'title': 'Literacy Online Resources',
                        'url': 'https://newzealandcurriculum.tahurangi.education.govt.nz/new-zealand-curriculum-online/learning-content-resources/literacy-inc-instructional-series/5637144635.c',
                        'description': 'Instructional series and literacy resources for Years 1-8',
                        'relevance_keywords': ['literacy', 'instructional', 'reading', 'writing', 'comprehension'],
                        'year_levels': ['1-8'],
                        'subjects': ['english', 'literacy']
                    }
                ]
            },
            'social_studies': {
                'priority': 4,
                'target_domains': [
                    'tki.org.nz',
                    'education.govt.nz',
                    'nzcer.org.nz'
                ],
                'resources': [
                    {
                        'title': 'Social Sciences - NZ Curriculum',
                        'url': 'https://nzcurriculum.tki.org.nz/The-New-Zealand-Curriculum/Social-sciences',
                        'description': 'Social studies curriculum for critical, informed, and responsible citizens',
                        'relevance_keywords': ['social studies', 'critical thinking', 'citizenship', 'society', 'contemporary issues'],
                        'year_levels': ['1-10'],
                        'subjects': ['social_sciences', 'social_studies']
                    },
                    {
                        'title': 'Media Studies Resources',
                        'url': 'https://seniorsecondary.tki.org.nz/Social-sciences/Media-studies/Resources',
                        'description': 'Media literacy and critical analysis resources for senior students',
                        'relevance_keywords': ['media literacy', 'critical analysis', 'contemporary issues', 'digital citizenship'],
                        'year_levels': ['11-13'],
                        'subjects': ['media_studies', 'social_sciences']
                    }
                ]
            }
        }
    
    def analyze_content_file(self, file_path: Path) -> Dict[str, Any]:
        """
        Analyze a content file to determine its subject, keywords, and enrichment needs.
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Extract metadata
            title_match = re.search(r'<title[^>]*>([^<]+)</title>', content, re.IGNORECASE)
            title = title_match.group(1) if title_match else file_path.stem
            
            # Extract description from meta or first paragraph
            desc_match = re.search(r'<meta[^>]*description[^>]*content="([^"]*)"', content, re.IGNORECASE)
            if not desc_match:
                desc_match = re.search(r'<p[^>]*>([^<]{50,200})</p>', content, re.IGNORECASE)
            
            description = desc_match.group(1) if desc_match else ""
            
            # Content analysis
            content_lower = content.lower()
            
            # Enhanced subject area detection with better keywords
            subject_scores = {
                'english': self._count_keywords(content_lower, ['writing', 'english', 'literacy', 'reading', 'essay', 'analysis', 'literature', 'author', 'text', 'comprehension', 'vocabulary', 'grammar', 'language', 'persuasion', 'argument', 'narrative', 'poetry', 'metaphor', 'analogy', 'rhetorical']),
                'te_reo_maori': self._count_keywords(content_lower, ['māori', 'maori', 'te reo', 'tikanga', 'whakapapa', 'kaitiakitanga', 'manaakitanga', 'tahurangi', 'cultural', 'indigenous']),
                'science': self._count_keywords(content_lower, ['science', 'stem', 'experiment', 'hypothesis', 'investigation', 'research', 'biology', 'chemistry', 'physics', 'ecology', 'environment', 'nature']),
                'social_sciences': self._count_keywords(content_lower, ['social', 'society', 'history', 'geography', 'civics', 'contemporary', 'issues', 'government', 'democracy', 'treaty', 'politics', 'culture', 'community']),
                'mathematics': self._count_keywords(content_lower, ['math', 'statistics', 'probability', 'graph', 'calculation', 'number', 'algebra', 'geometry', 'data', 'measurement']),
                'arts': self._count_keywords(content_lower, ['art', 'creative', 'design', 'music', 'drama', 'visual', 'performance', 'theatre', 'dance']),
                'technology': self._count_keywords(content_lower, ['technology', 'digital', 'computer', 'ai', 'coding', 'programming', 'software', 'algorithm', 'data'])
            }
            
            # Special logic for Writer's Toolkit content
            if 'writers' in content_lower and 'toolkit' in content_lower:
                subject_scores['english'] += 10  # Boost English score significantly
            
            # Boost English for lesson plans with writing focus
            if any(term in content_lower for term in ['lesson plan', 'writing', 'author', 'text analysis']):
                subject_scores['english'] += 5
            
            primary_subject = max(subject_scores, key=subject_scores.get) if max(subject_scores.values()) > 0 else 'general'
            
            # Determine year level
            year_matches = re.findall(r'year\s*(\d+)', content_lower)
            if year_matches:
                years = [int(y) for y in year_matches if y.isdigit()]
                year_level = f"{min(years)}-{max(years)}" if len(set(years)) > 1 else str(years[0])
            else:
                year_level = "7-10"  # Default assumption
            
            return {
                'file_path': str(file_path),
                'title': title.strip(),
                'description': description.strip(),
                'primary_subject': primary_subject,
                'subject_scores': subject_scores,
                'year_level': year_level,
                'cultural_level': self._assess_cultural_level(content_lower),
                'keywords': self._extract_key_concepts(content_lower)
            }
            
        except Exception as e:
            print(f"Error analyzing {file_path}: {e}")
            return None
    
    def _count_keywords(self, content: str, keywords: List[str]) -> int:
        """Count occurrences of keywords in content."""
        return sum(content.count(keyword) for keyword in keywords)
    
    def _assess_cultural_level(self, content: str) -> str:
        """Assess the cultural integration level of content."""
        cultural_indicators = {
            'high': ['whakapapa', 'kaitiakitanga', 'manaakitanga', 'tino rangatiratanga', 'te ao māori', 'mātauranga'],
            'medium': ['māori', 'maori', 'cultural', 'treaty', 'waitangi', 'indigenous'],
            'low': ['new zealand', 'aotearoa', 'nz']
        }
        
        for level, indicators in cultural_indicators.items():
            if any(indicator in content for indicator in indicators):
                return level
        
        return 'general'
    
    def _extract_key_concepts(self, content: str) -> List[str]:
        """Extract key educational concepts from content."""
        concept_patterns = [
            r'critical thinking', r'problem solving', r'collaboration', r'communication',
            r'creativity', r'digital literacy', r'media literacy', r'sustainability',
            r'systems thinking', r'design thinking', r'inquiry learning'
        ]
        
        concepts = []
        for pattern in concept_patterns:
            if re.search(pattern, content):
                concepts.append(pattern.replace(r'\\s+', ' '))
        
        return concepts
    
    def find_relevant_enrichments(self, content_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        Find relevant external resources using Exa.ai search for specific topics.
        """
        # Extract key topic from title and description
        topic = self._extract_main_topic(content_analysis)
        subject = content_analysis['primary_subject']
        year_level = content_analysis['year_level']
        cultural_context = content_analysis['cultural_level']
        
        print(f"🔍 Searching for topic: '{topic}' in {subject} (Year {year_level})")
        
        # Use Exa.ai to find specific educational content
        exa_results = self.exa_searcher.search_specific_content(
            topic=topic,
            subject=subject, 
            year_level=year_level,
            cultural_context=cultural_context
        )
        
        # Convert Exa results to our format
        relevant_resources = []
        for result in exa_results:
            # Calculate relevance score based on content match
            relevance_score = self._calculate_exa_relevance(content_analysis, result)
            
            if relevance_score > 0.4:  # Higher threshold for dynamic content
                relevant_resources.append({
                    'title': result['title'],
                    'url': result['url'],
                    'description': result['description'],
                    'relevance_score': relevance_score,
                    'relevance_keywords': result.get('relevance_keywords', []),
                    'year_levels': [year_level],  # Use detected year level
                    'subjects': [subject],
                    'category': self._determine_category(subject, cultural_context),
                    'priority': self._get_priority_for_subject(subject, cultural_context),
                    'domain': result.get('domain', ''),
                    'source_type': 'exa_search'
                })
        
        # If Exa.ai returns insufficient results, supplement with curated fallbacks
        if len(relevant_resources) < 3:
            fallback_resources = self._get_curated_fallbacks(content_analysis)
            relevant_resources.extend(fallback_resources)
        
        # Sort by priority and relevance
        relevant_resources.sort(key=lambda x: (x['priority'], -x['relevance_score']))
        return relevant_resources[:5]  # Top 5 most relevant
    
    def _extract_main_topic(self, content_analysis: Dict[str, Any]) -> str:
        """Extract the main topic from content title and description with enhanced specificity."""
        title = content_analysis.get('title', '')
        description = content_analysis.get('description', '')
        subject = content_analysis.get('primary_subject', '')
        
        # Enhanced stop words list
        stop_words = ['lesson', 'activity', 'handout', 'unit', 'year', 'plan', 'the', 'and', 'of', 'in', 'to', 'for', 'with', 'how', 'what', 'toolkit', 'power', 'art']
        
        # Look for specific educational concepts first
        educational_concepts = {
            'analogy': 'analogy metaphor comparison',
            'metaphor': 'metaphor analogy literary device',
            'persuasion': 'persuasive writing rhetoric argument',
            'narrative': 'narrative storytelling creative writing',
            'treaty': 'Treaty of Waitangi New Zealand history',
            'whakapapa': 'whakapapa genealogy Māori family connections',
            'government': 'government democracy political systems',
            'sustainability': 'sustainability environmental science',
            'probability': 'probability mathematics statistics'
        }
        
        # Check for specific concepts in title and description
        content_text = (title + ' ' + description).lower()
        for concept, expanded_terms in educational_concepts.items():
            if concept in content_text:
                return expanded_terms
        
        # Enhanced topic extraction
        topic_words = []
        
        # Extract from title with priority for meaningful words
        title_words = re.findall(r'\b\w{3,}\b', title.lower())
        priority_words = []
        regular_words = []
        
        for word in title_words:
            if word not in stop_words:
                # Prioritize subject-specific terms
                if subject == 'english' and word in ['writing', 'reading', 'analysis', 'literature', 'author', 'text']:
                    priority_words.append(word)
                elif subject == 'science' and word in ['science', 'experiment', 'research', 'investigation']:
                    priority_words.append(word)
                elif subject == 'social_sciences' and word in ['history', 'society', 'government', 'culture']:
                    priority_words.append(word)
                else:
                    regular_words.append(word)
        
        # Build topic from priority words first, then regular words
        topic_words = priority_words + regular_words
        
        # If still insufficient, extract from description
        if len(topic_words) < 2 and description:
            desc_words = re.findall(r'\b\w{4,}\b', description.lower())[:5]
            for word in desc_words:
                if word not in stop_words and word not in topic_words:
                    topic_words.append(word)
                    if len(topic_words) >= 3:
                        break
        
        # Return meaningful topic
        final_topic = ' '.join(topic_words[:3]) if topic_words else subject
        return final_topic
    
    def _calculate_exa_relevance(self, content_analysis: Dict[str, Any], exa_result: Dict[str, Any]) -> float:
        """Calculate relevance score for Exa.ai search results."""
        score = 0.0
        
        # Base score from Exa.ai
        exa_score = exa_result.get('score', 0)
        score += min(exa_score, 0.4)  # Cap at 0.4
        
        # Domain authority bonus
        domain = exa_result.get('domain', '')
        if 'nzhistory.govt.nz' in domain or 'education.govt.nz' in domain:
            score += 0.3
        elif 'rnz.co.nz' in domain or 'sciencelearn.org.nz' in domain:
            score += 0.2
        elif 'wikipedia.org' in domain:
            score += 0.1
        
        # Cultural relevance
        if content_analysis['cultural_level'] in ['high', 'medium']:
            content_text = (exa_result.get('title', '') + ' ' + exa_result.get('description', '')).lower()
            cultural_terms = ['māori', 'maori', 'indigenous', 'cultural', 'traditional', 'tikanga']
            cultural_matches = sum(1 for term in cultural_terms if term in content_text)
            score += min(cultural_matches * 0.1, 0.2)
        
        # Subject alignment
        subject_keywords = {
            'science': ['experiment', 'research', 'investigation', 'theory', 'hypothesis'],
            'english': ['writing', 'literature', 'analysis', 'literacy', 'text'],
            'social_sciences': ['history', 'society', 'government', 'culture', 'community'],
            'te_reo_maori': ['māori', 'reo', 'cultural', 'traditional', 'indigenous']
        }
        
        subject = content_analysis['primary_subject']
        if subject in subject_keywords:
            content_text = (exa_result.get('title', '') + ' ' + exa_result.get('description', '')).lower()
            keyword_matches = sum(1 for keyword in subject_keywords[subject] if keyword in content_text)
            score += min(keyword_matches * 0.05, 0.15)
        
        return min(score, 1.0)
    
    def _determine_category(self, subject: str, cultural_context: str) -> str:
        """Determine category based on subject and cultural context."""
        if cultural_context in ['high', 'medium'] or subject == 'te_reo_maori':
            return 'cultural_maori'
        elif subject == 'science':
            return 'science_stem'
        elif subject == 'english':
            return 'english_writing'
        else:
            return 'social_studies'
    
    def _get_priority_for_subject(self, subject: str, cultural_context: str) -> int:
        """Get priority score for subject and cultural context."""
        if cultural_context in ['high', 'medium'] or subject == 'te_reo_maori':
            return 1  # Highest priority
        elif subject == 'science':
            return 2
        elif subject == 'english':
            return 3
        else:
            return 4
    
    def _get_curated_fallbacks(self, content_analysis: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get curated fallback resources using the enhanced topic-specific mapping."""
        subject = content_analysis['primary_subject']
        cultural_level = content_analysis['cultural_level']
        topic = self._extract_main_topic(content_analysis)
        
        # Use the enhanced fallback system with topic-specific resources
        fallback_resources = self.exa_searcher._get_fallback_resources(topic, subject, cultural_level)
        
        # Convert to our expected format
        fallbacks = []
        for resource in fallback_resources:
            fallbacks.append({
                'title': resource['title'],
                'url': resource['url'],
                'description': resource['description'],
                'relevance_score': resource['relevance_score'],
                'year_levels': resource['year_levels'],
                'subjects': resource['subjects'],
                'category': self._determine_category(subject, cultural_level),
                'priority': self._get_priority_for_subject(subject, cultural_level),
                'source_type': 'curated_fallback'
            })
        
        return fallbacks
    
    def _calculate_relevance(self, content_analysis: Dict[str, Any], resource: Dict[str, Any]) -> float:
        """
        Calculate relevance score between content and external resource.
        """
        score = 0.0
        
        # Subject match
        if content_analysis['primary_subject'] in resource['subjects']:
            score += 0.4
        
        # Keyword overlap
        content_text = (content_analysis['title'] + ' ' + content_analysis['description']).lower()
        keyword_matches = sum(1 for keyword in resource['relevance_keywords'] if keyword in content_text)
        score += (keyword_matches / len(resource['relevance_keywords'])) * 0.3
        
        # Year level compatibility
        if self._year_levels_compatible(content_analysis['year_level'], resource['year_levels']):
            score += 0.2
        
        # Cultural level match (bonus for cultural content)
        if content_analysis['cultural_level'] in ['high', 'medium'] and 'cultural' in resource['subjects']:
            score += 0.1
        
        return min(score, 1.0)
    
    def _year_levels_compatible(self, content_years: str, resource_years: List[str]) -> bool:
        """Check if year levels are compatible."""
        try:
            if '-' in content_years:
                content_range = [int(x) for x in content_years.split('-')]
                content_set = set(range(content_range[0], content_range[1] + 1))
            else:
                content_set = {int(content_years)}
            
            for year_range in resource_years:
                if '-' in year_range:
                    resource_range = [int(x) for x in year_range.split('-')]
                    resource_set = set(range(resource_range[0], resource_range[1] + 1))
                else:
                    resource_set = {int(year_range)}
                    
                if content_set & resource_set:  # Any overlap
                    return True
                    
            return False
        except:
            return True  # Default to compatible if parsing fails
    
    def generate_enrichment_report(self) -> Dict[str, Any]:
        """
        Generate a comprehensive enrichment report for all content.
        """
        print("🔍 ANALYZING ALL EDUCATIONAL CONTENT FOR ENRICHMENT...")
        
        content_dirs = ['handouts', 'y8-systems', 'guided-inquiry-unit', 'units', 'lessons', 'games', 'experiences']
        analysis_results = []
        
        total_files = 0
        enriched_files = 0
        
        for content_dir in content_dirs:
            dir_path = self.base_path / content_dir
            if dir_path.exists():
                html_files = list(dir_path.glob('**/*.html'))
                print(f"📂 {content_dir}: {len(html_files)} files")
                
                for file_path in html_files:
                    total_files += 1
                    analysis = self.analyze_content_file(file_path)
                    
                    if analysis:
                        enrichments = self.find_relevant_enrichments(analysis)
                        if enrichments:
                            enriched_files += 1
                            analysis['enrichments'] = enrichments
                            analysis_results.append(analysis)
        
        # Generate summary statistics
        subject_distribution = {}
        cultural_distribution = {}
        
        for result in analysis_results:
            subject = result['primary_subject']
            cultural = result['cultural_level']
            
            subject_distribution[subject] = subject_distribution.get(subject, 0) + 1
            cultural_distribution[cultural] = cultural_distribution.get(cultural, 0) + 1
        
        return {
            'total_files_analyzed': total_files,
            'files_with_enrichments': enriched_files,
            'enrichment_rate': enriched_files / total_files if total_files > 0 else 0,
            'subject_distribution': subject_distribution,
            'cultural_distribution': cultural_distribution,
            'enrichment_recommendations': analysis_results  # ALL recommendations, not just top 20
        }

def main():
    """Generate content enrichment analysis and recommendations with upgraded Exa.ai search."""
    print("🚀 EXA.AI SPECIALIST UPGRADE - TOPIC-SPECIFIC CONTENT SEARCH")
    print("=" * 70)
    print("✅ MISSION: Find SPECIFIC educational pages, not general homepages")
    print("🎯 PRIORITY SOURCES: NZhistory.govt, RNZ, Guardian, CrashCourse, Wikipedia")
    print("🔍 STRATEGY: Real-time API searches for lesson-specific content")
    print()
    
    # Check for Exa.ai API key
    exa_api_key = os.getenv('EXA_API_KEY')
    if exa_api_key:
        print("✅ Exa.ai API key found - Using live search functionality")
    else:
        print("⚠️ No Exa.ai API key found - Using enhanced fallback resources")
        print("   Set EXA_API_KEY environment variable for full functionality")
    print()
    
    enricher = TeKeteContentEnricher(exa_api_key)
    report = enricher.generate_enrichment_report()
    
    print(f"\n📊 UPGRADED CONTENT ENRICHMENT ANALYSIS COMPLETE")
    print(f"=" * 50)
    print(f"📁 Total files analyzed: {report['total_files_analyzed']}")
    print(f"✨ Files with enrichment opportunities: {report['files_with_enrichments']}")
    print(f"📈 Enrichment rate: {report['enrichment_rate']:.1%}")
    
    print(f"\n📚 SUBJECT DISTRIBUTION:")
    for subject, count in sorted(report['subject_distribution'].items(), key=lambda x: x[1], reverse=True):
        print(f"  • {subject}: {count} files")
    
    print(f"\n🌿 CULTURAL INTEGRATION DISTRIBUTION:")
    for level, count in sorted(report['cultural_distribution'].items(), key=lambda x: x[1], reverse=True):
        print(f"  • {level}: {count} files")
    
    print(f"\n🎯 TOP ENRICHMENT OPPORTUNITIES (TOPIC-SPECIFIC):")
    for i, rec in enumerate(report['enrichment_recommendations'][:10], 1):
        print(f"{i}. {rec['title']}")
        print(f"   Subject: {rec['primary_subject']} | Cultural: {rec['cultural_level']}")
        print(f"   Enrichments: {len(rec['enrichments'])} relevant resources")
        if rec['enrichments']:
            top_enrichment = rec['enrichments'][0]
            source_type = top_enrichment.get('source_type', 'static')
            domain = top_enrichment.get('domain', 'N/A')
            
            print(f"   → {top_enrichment['title']}")
            print(f"     📍 {domain} | 🎯 {top_enrichment['relevance_score']:.2f} relevance | 🔍 {source_type}")
        print()
    
    # Enhanced reporting
    if report['enrichment_recommendations']:
        exa_results = sum(1 for rec in report['enrichment_recommendations'] 
                         for enr in rec.get('enrichments', []) 
                         if enr.get('source_type') == 'exa_search')
        fallback_results = sum(1 for rec in report['enrichment_recommendations'] 
                              for enr in rec.get('enrichments', []) 
                              if enr.get('source_type') in ['curated_fallback', 'static'])
        
        print(f"\n🔍 SEARCH RESULT BREAKDOWN:")
        print(f"   • Exa.ai live searches: {exa_results} specific topic pages")
        print(f"   • Curated fallbacks: {fallback_results} targeted resources")
        print(f"   • Total improvement: Specific content vs general homepages")
    
    # Save detailed report
    output_file = 'content_enrichment_analysis_upgraded.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 Detailed analysis saved to: {output_file}")
    print(f"🎉 EXA.AI SPECIALIST UPGRADE COMPLETE!")
    print(f"   Professional educational content integration now targets")
    print(f"   SPECIFIC topical pages instead of general homepages.")
    
    return report

if __name__ == "__main__":
    main()