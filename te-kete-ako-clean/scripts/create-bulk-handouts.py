#!/usr/bin/env python3
"""
Te Kete Ako Bulk Handout Generator
Creates template handouts for Gemini to populate
"""

import json
from pathlib import Path

class HandoutGenerator:
    def __init__(self, root_dir):
        self.root_dir = Path(root_dir)
        self.handouts_dir = self.root_dir / "handouts"
        self.templates_dir = self.root_dir / "templates"
        
        # Ensure directories exist
        self.handouts_dir.mkdir(exist_ok=True)
        self.templates_dir.mkdir(exist_ok=True)
    
    def get_handout_template(self, handout_type="general"):
        """Get HTML template for handout type"""
        templates = {
            "general": self.get_general_template(),
            "writers-toolkit": self.get_writers_toolkit_template(),
            "comprehension": self.get_comprehension_template(),
            "analysis": self.get_analysis_template(),
            "cultural": self.get_cultural_template()
        }
        return templates.get(handout_type, templates["general"])
    
    def get_general_template(self):
        return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Te Kete Ako</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:ital,wght@0,400;1,300&family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/main.css">
</head>

<body>
    <!-- Header auto-injected by script -->
    
    <div class="main-container">
        <aside class="left-sidebar no-print">
            <div class="sidebar-widget">
                <h3 class="sidebar-widget-title">Quick Navigation</h3>
                <ul>
                    <li><a href="#{anchor_1}">{section_1}</a></li>
                    <li><a href="#{anchor_2}">{section_2}</a></li>
                    <li><a href="#{anchor_3}">{section_3}</a></li>
                </ul>
            </div>
            
            <div class="sidebar-widget cultural-accent">
                <h3 class="sidebar-widget-title">Te Reo Māori</h3>
                <ul>
                    <li><strong>{maori_term_1}:</strong> {maori_definition_1}</li>
                    <li><strong>{maori_term_2}:</strong> {maori_definition_2}</li>
                    <li><strong>{maori_term_3}:</strong> {maori_definition_3}</li>
                </ul>
            </div>
        </aside>

        <main class="content-area">
            <div class="handout-container">
                <div class="page-header">
                    <h1 class="page-title">{title}</h1>
                    <p class="cultural-emphasis" lang="mi">{maori_subtitle}</p>
                    <p class="handout-description">{description}</p>
                </div>

                <section id="{anchor_1}" class="content-section">
                    <h2 class="section-title">{section_1}</h2>
                    <div class="technique-box">
                        <h3>{technique_name_1}</h3>
                        <p>{technique_explanation_1}</p>
                        <div class="example-box">
                            <strong>Example:</strong> {example_1}
                        </div>
                    </div>
                </section>

                <section id="{anchor_2}" class="content-section">
                    <h2 class="section-title">{section_2}</h2>
                    <div class="grid grid-cols-2">
                        <div class="technique-box">
                            <h3>{technique_name_2}</h3>
                            <p>{technique_explanation_2}</p>
                        </div>
                        <div class="example-box">
                            <h3>Cultural Connection</h3>
                            <p>{cultural_connection}</p>
                        </div>
                    </div>
                </section>

                <section id="{anchor_3}" class="assessment-box">
                    <h2>{section_3}</h2>
                    <div class="grid grid-cols-2">
                        <div class="question-box">
                            <h3>Critical Thinking Questions</h3>
                            <ol>
                                <li>{question_1}</li>
                                <li>{question_2}</li>
                                <li>{question_3}</li>
                            </ol>
                        </div>
                        <div class="reflection-box">
                            <h3>Cultural Reflection</h3>
                            <p>{reflection_prompt}</p>
                            <div class="cultural-protocol-box">
                                <p class="whakataukī" lang="mi">"{whakataukī}"</p>
                                <p class="proverb-translation">{whakataukī_translation}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
    
    <!-- Footer auto-injected by script -->
</body>
</html>'''

    def get_writers_toolkit_template(self):
        return '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Writer's Toolkit: {title} | Te Kete Ako</title>
    <link rel="stylesheet" href="../css/main.css">
</head>

<body>
    <div class="main-container">
        <main class="content-area">
            <div class="handout-container">
                <div class="page-header">
                    <h1 class="page-title">Writer's Toolkit: {title}</h1>
                    <p class="cultural-emphasis" lang="mi">{maori_subtitle}</p>
                    <p class="handout-description">{description}</p>
                </div>

                <section class="content-section">
                    <h2>Definition & Purpose</h2>
                    <div class="technique-box">
                        <p><strong>{title}</strong> is {definition}</p>
                        <p><strong>Purpose:</strong> {purpose}</p>
                    </div>
                </section>

                <section class="content-section">
                    <h2>How to Use {title}</h2>
                    <div class="grid grid-cols-2">
                        <div class="technique-box">
                            <h3>Technique Steps</h3>
                            <ol>
                                <li>{step_1}</li>
                                <li>{step_2}</li>
                                <li>{step_3}</li>
                                <li>{step_4}</li>
                            </ol>
                        </div>
                        <div class="example-box">
                            <h3>Example in Action</h3>
                            <p>{example_context}</p>
                            <blockquote>{example_text}</blockquote>
                            <p><em>{example_explanation}</em></p>
                        </div>
                    </div>
                </section>

                <section class="assessment-box">
                    <h2>Practice & Application</h2>
                    <div class="activity-box">
                        <h3>Your Turn</h3>
                        <p>{practice_prompt}</p>
                        <div class="reflection-box">
                            <h4>Cultural Integration</h4>
                            <p>{cultural_integration_prompt}</p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</body>
</html>'''

    def create_gemini_prompts(self, subject, year_level, count=5):
        """Create structured prompts for Gemini to fill templates"""
        prompts = []
        
        base_prompt = f"""
Create a {subject} handout for Year {year_level} students following Te Kete Ako format.

REQUIREMENTS:
- Include cultural connections to Te Ao Māori
- Use age-appropriate language for Year {year_level}
- Include both English and Te Reo Māori key terms
- Add critical thinking questions
- Include practical examples from Aotearoa/New Zealand context
- Format: Fill the provided HTML template variables

TEMPLATE VARIABLES TO FILL:
- title: [Main handout title]
- maori_subtitle: [Te Reo Māori subtitle]
- description: [Brief description of what students will learn]
- section_1: [First main section title]
- section_2: [Second main section title] 
- section_3: [Third section title - usually "Assessment" or "Practice"]
- technique_name_1: [First key concept name]
- technique_explanation_1: [Explanation of first concept]
- example_1: [Relevant example from NZ context]
- cultural_connection: [Connection to Māori culture/values]
- question_1, question_2, question_3: [Critical thinking questions]
- reflection_prompt: [Cultural reflection activity]
- whakataukī: [Relevant Māori proverb]
- whakataukī_translation: [English translation of proverb]
- maori_term_1, maori_definition_1: [Key Māori terms with definitions]

TOPIC: {{topic}}
"""
        
        topics = self.get_subject_topics(subject, year_level)
        for i, topic in enumerate(topics[:count]):
            prompt = base_prompt.format(topic=topic)
            prompts.append({
                "id": f"{subject.lower()}_y{year_level}_{i+1}",
                "subject": subject,
                "year_level": year_level,
                "topic": topic,
                "prompt": prompt,
                "template_type": self.get_template_type_for_subject(subject),
                "filename": f"{subject.lower()}-{topic.lower().replace(' ', '-')}-handout.html"
            })
        
        return prompts
    
    def get_subject_topics(self, subject, year_level):
        """Get relevant topics for subject and year level"""
        topics_db = {
            "English": {
                9: ["Persuasive Writing", "Character Analysis", "Poetry Techniques", "Media Literacy", "Narrative Structure"],
                10: ["Argumentative Essays", "Literary Devices", "Script Analysis", "Visual Texts", "Creative Writing"],
                11: ["Critical Analysis", "Research Methods", "Comparative Essays", "Language Features", "Text Structure"],
                12: ["Academic Writing", "Textual Analysis", "Essay Structure", "Literary Criticism", "Creative Portfolio"],
                13: ["University Preparation", "Advanced Analysis", "Independent Research", "Professional Writing", "Literary Theory"]
            },
            "Social Studies": {
                9: ["New Zealand Identity", "Human Rights", "Economic Systems", "Environmental Issues", "Cultural Diversity"],
                10: ["Global Citizenship", "Social Justice", "Government Systems", "Historical Inquiry", "Contemporary Issues"],
                11: ["Research Methods", "Political Systems", "Economic Development", "Social Movements", "Cultural Studies"],
                12: ["Policy Analysis", "Comparative Government", "Economic Theory", "Social Research", "Global Issues"],
                13: ["Advanced Research", "Political Philosophy", "Economic Analysis", "Social Theory", "Independent Study"]
            },
            "Science": {
                9: ["Scientific Method", "Ecosystem Studies", "Chemical Reactions", "Force and Motion", "Cell Biology"],
                10: ["Environmental Science", "Atomic Structure", "Genetics", "Physics Principles", "Earth Science"],
                11: ["Research Design", "Organic Chemistry", "Human Biology", "Wave Properties", "Climate Science"],
                12: ["Advanced Biology", "Chemical Analysis", "Physics Applications", "Scientific Writing", "Lab Techniques"],
                13: ["Independent Research", "Advanced Chemistry", "Biophysics", "Scientific Communication", "Ethics in Science"]
            }
        }
        
        return topics_db.get(subject, {}).get(year_level, ["General Topic 1", "General Topic 2", "General Topic 3"])
    
    def get_template_type_for_subject(self, subject):
        """Determine best template type for subject"""
        template_map = {
            "English": "writers-toolkit",
            "Social Studies": "analysis", 
            "Science": "general",
            "Mathematics": "general"
        }
        return template_map.get(subject, "general")
    
    def save_gemini_batch(self, prompts, output_file="gemini_batch_prompts.json"):
        """Save batch of prompts for Gemini processing"""
        output_path = self.templates_dir / output_file
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(prompts, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Saved {len(prompts)} prompts to {output_path}")
        return output_path

def main():
    generator = HandoutGenerator("/Users/admin/Documents/te-kete-ako-clean")
    
    # Generate batch prompts for different subjects
    all_prompts = []
    
    subjects = ["English", "Social Studies", "Science"]
    year_levels = [9, 10, 11]
    
    for subject in subjects:
        for year_level in year_levels:
            prompts = generator.create_gemini_prompts(subject, year_level, count=3)
            all_prompts.extend(prompts)
    
    # Save all prompts
    batch_file = generator.save_gemini_batch(all_prompts)
    
    print(f"📝 Generated {len(all_prompts)} handout prompts for Gemini")
    print("📁 Templates available: general, writers-toolkit, comprehension, analysis, cultural")
    print("🎯 Ready for Gemini content generation!")
    
    return batch_file

if __name__ == "__main__":
    main()