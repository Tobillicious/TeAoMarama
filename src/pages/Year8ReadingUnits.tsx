import {useState} from 'react'
import './Year8ReadingUnits.css'

interface TeachingResource {,
id: string,
type: | 'slideshow'
    | 'handout'
    | 'card'
    | 'podcast'
    | 'news-story'
    | 'video'
    | 'worksheet'
    | 'assessment',
title: string,
description: string
  url?: string,
fileType: string
  duration?: string,
targetAudience: 'teacher' | 'student' | 'both',
culturalContext: string}
interface ReadingUnit {,
id: string,
title: string,
subtitle: string,
approach: 'writing-revolution' | 'the-code' | 'structured-literacy' | 'cultural-integration',
duration: string,
difficulty: 'foundation' | 'developing' | 'advanced',
description: string,
learningObjectives: string[],
culturalContext: string,
nceaAlignment: string,
activities: ReadingActivity[],
assessment: AssessmentItem[],
resources: string[],
teachingResources: TeachingResource[],
explicitTeachingStrategies: string[],
multimediaIntegration: string[],
differentiationStrategies: string[]}
interface ReadingActivity {,
id: string,
name: string,
type: | 'before-reading'
    | 'during-reading'
    | 'after-reading'
    | 'vocabulary'
    | 'comprehension'
    | 'writing',
duration: string,
description: string,
steps: string[],
materials: string[],
culturalIntegration: string,
differentiation: string[],
explicitTeaching: string[],
multimediaElements: string[]}
interface AssessmentItem {,
type: 'formative' | 'summative' | 'self-assessment',
description: string,
criteria: string[],
culturalConsiderations: string,
assessmentTools: string[]}
const readingUnits: ReadingUnit[] = [
  {,
id: 'sentence-expansion-revolution',,
title: 'Sentence Expansion Revolution',,
subtitle: 'Building Complex Sentences with Cultural Context',,
approach: 'writing-revolution',,
duration: '6 weeks',,
difficulty: 'foundation',,
description: "Systematic approach to sentence development using Liz Kane's Writing Revolution methodology, integrated with Māori cultural contexts and Te Reo Māori vocabulary.",,
learningObjectives: [
      'Transform simple sentences into complex, detailed sentences',
      'Incorporate cultural knowledge and Te Reo Māori vocabulary',
      'Build sentence variety and sophistication',
      'Develop descriptive writing skills for NCEA preparation',
    ],;,
culturalContext: 'Uses Māori cultural contexts, traditional knowledge, and authentic Te Reo Māori vocabulary to build sentence complexity while honoring cultural protocols.',,
nceaAlignment: 'Builds foundation skills for NCEA Level 1 English writing standards, particularly detailed description and analysis.',,
activities: [
      {,
id: 'kernel-sentence-expansion',,
name: 'Kernel Sentence Expansion',,
type: 'before-reading',,
duration: '20 minutes',,
description: 'Start with basic kernel sentences and systematically add details using the 5W1H framework with cultural integration.',,
steps: [
          'Present a kernel sentence (e.g., "The tūī flew.")',
          'Ask: Who? What? When? Where? Why? How?',
          'Add cultural context: "The native tūī flew through the sacred kōwhai tree."',
          'Add time and place: "Yesterday, the native tūī flew gracefully through the golden kōwhai tree in our school garden."',
          'Add purpose and detail: "Yesterday, the native tūī flew gracefully through the golden kōwhai tree in our school garden, searching for nectar to feed its young."',
        ],;,
materials: [
          'Kernel sentence cards',
          'Cultural vocabulary lists',
          'Question prompts',
          'Whiteboard',
          'Interactive slideshow',
          'Student response cards',
        ],;,
culturalIntegration: 'Incorporates Māori bird species, native plants, and cultural concepts in sentence expansion.',,
differentiation: [
          'Foundation: Focus on 2-3 detail additions',
          'Developing: Add 4-5 details with cultural context',
          'Advanced: Create compound-complex sentences with multiple cultural references',
        ],;,
explicitTeaching: [
          'Direct instruction on sentence structure',
          'Modeling with think-aloud protocols',
          'Guided practice with cultural examples',
          'Independent practice with feedback',
        ],;,
multimediaElements: [
          'Slideshow with animated sentence building',
          'Audio pronunciation of Te Reo Māori words',
          'Video clips of native birds and plants',
          'Interactive whiteboard activities',
        ],
      },
      {,
id: 'appositive-practice',,
name: 'Appositive Practice with Cultural Figures',,
type: 'during-reading',,
duration: '25 minutes',,
description: 'Add detailed information using appositive phrases about Māori cultural figures and concepts.',,
steps: [
          'Identify nouns to elaborate on',
          'Create appositive phrases with cultural information',
          'Place appositives next to nouns with proper punctuation',
          'Check sentence clarity and cultural accuracy',
        ],;,
materials: [
          'Cultural figure cards',
          'Appositive examples',
          'Practice worksheets',
          'Digital sentence builder',
          'Cultural context slideshow',
        ],;,
culturalIntegration: 'Uses Māori historical figures, cultural concepts, and traditional knowledge in appositive practice.',,
differentiation: [
          'Foundation: Simple appositives with basic cultural terms',
          'Developing: Complex appositives with historical context',
          'Advanced: Multiple appositives with detailed cultural explanations',
        ],;,
explicitTeaching: [
          'Step-by-step appositive construction',
          'Cultural context mini-lessons',
          'Peer feedback protocols',
          'Individual conferencing',
        ],;,
multimediaElements: [
          'Biographical slideshows of Māori figures',
          'Podcast interviews with cultural experts',
          'Interactive sentence building games',
          'Digital flashcards with audio',
        ],
      },
    ],;,
assessment: [
      {,
type: 'formative',,
description: 'Sentence expansion checkpoints throughout the unit',,
criteria: [
          'Sentence complexity increases systematically',
          'Cultural context is appropriately integrated',
          'Te Reo Māori vocabulary is used correctly',
          'Grammar and punctuation are accurate',
        ],;,
culturalConsiderations: 'Ensure cultural accuracy and respect in all sentence examples and assessments.',,
assessmentTools: [
          'Sentence complexity rubrics',
          'Cultural accuracy checklists',
          'Peer review protocols',
          'Digital assessment platforms',
        ],
      },
    ],;,
resources: [
      'Liz Kane Writing Revolution materials',
      'Māori cultural vocabulary lists',
      'Sentence pattern cards',
      'Cultural context guides',
    ],;,
teachingResources: [
      {,
id: 'sentence-expansion-slideshow',,
type: 'slideshow',,
title: 'Sentence Expansion Interactive Slideshow',,
description: 'Animated slideshow showing sentence building process with cultural examples',,
fileType: 'PowerPoint/Google Slides',,
targetAudience: 'both',,
culturalContext: 'Māori cultural examples and Te Reo Māori vocabulary',
      },
      {,
id: 'kernel-sentence-cards',,
type: 'card',,
title: 'Kernel Sentence Cards with Cultural Context',,
description: 'Printable cards with basic sentences ready for expansion',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Māori cultural themes and vocabulary',
      },
      {,
id: 'cultural-vocabulary-handout',,
type: 'handout',,
title: 'Te Reo Māori Vocabulary for Sentence Building',,
description: 'Comprehensive vocabulary list with pronunciation guides',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Authentic Te Reo Māori vocabulary and cultural terms',
      },
      {,
id: 'maori-birds-podcast',,
type: 'podcast',,
title: 'Native Birds of Aotearoa',,
description: 'Podcast episode about native birds and their cultural significance',,
url: 'https://example.com/maori-birds-podcast',,
fileType: 'MP3',,
duration: '15 minutes',,
targetAudience: 'both',,
culturalContext: 'Māori cultural knowledge about native birds',
      },
    ],;,
explicitTeachingStrategies: [
      'Direct instruction with modeling',
      'Think-aloud protocols',
      'Guided practice with immediate feedback',
      'Scaffolded sentence building',
      'Cultural context mini-lessons',
      'Peer teaching and collaboration',
    ],;,
multimediaIntegration: [
      'Interactive whiteboard activities',
      'Digital sentence builders',
      'Audio pronunciation guides',
      'Video cultural context clips',
      'Online vocabulary games',
      'Podcast integration for background knowledge',
    ],;,
differentiationStrategies: [
      'Tiered sentence complexity levels',
      'Cultural knowledge pre-teaching',
      'Visual supports and graphic organizers',
      'Audio supports for pronunciation',
      'Extended time for complex tasks',
      'Peer tutoring opportunities',
    ],
  },
  {,
id: 'the-code-phonological',,
title: 'The Code: Phonological Awareness',,
subtitle: 'Systematic Phonics with Cultural Integration',,
approach: 'the-code',,
duration: '4 weeks',,
difficulty: 'foundation',,
description: "Liz Kane's systematic phonics approach integrated with Te Reo Māori phonology and cultural vocabulary building.",,
learningObjectives: [
      'Master systematic phonics patterns',
      'Apply phonics to Te Reo Māori vocabulary',
      'Build phonological awareness across languages',
      'Develop decoding skills for complex texts',
    ],;,
culturalContext: 'Integrates Māori phonology, pronunciation patterns, and cultural vocabulary into systematic phonics instruction.',,
nceaAlignment: 'Builds essential reading skills for NCEA Level 1 text analysis and comprehension.',,
activities: [
      {,
id: 'phoneme-grapheme-mapping',,
name: 'Phoneme-Grapheme Mapping with Māori Words',,
type: 'vocabulary',,
duration: '30 minutes',,
description: 'Map sounds to letters using both English and Te Reo Māori words to build phonological awareness.',,
steps: [
          'Present target phoneme (e.g., /k/)',
          'Show English words: cat, kite, book',
          'Show Māori words: kai, kōwhai, kauri',
          'Map phoneme-grapheme correspondences',
          'Practice blending and segmenting',
        ],;,
materials: [
          'Phoneme cards',
          'Māori vocabulary cards',
          'Mapping grids',
          'Sound boxes',
          'Digital phonics games',
          'Audio pronunciation guides',
        ],;,
culturalIntegration: 'Uses authentic Māori words and proper pronunciation to build phonological awareness.',,
differentiation: [
          'Foundation: Focus on common phonemes',
          'Developing: Include digraphs and blends',
          'Advanced: Complex phoneme patterns and Māori-specific sounds',
        ],;,
explicitTeaching: [
          'Systematic phoneme introduction',
          'Multi-sensory phonics instruction',
          'Immediate feedback and correction',
          'Progressive complexity building',
        ],;,
multimediaElements: [
          'Interactive phoneme-grapheme mapping tools',
          'Audio pronunciation recordings',
          'Digital flashcards with sound',
          'Phonics games and apps',
        ],
      },
      {,
id: 'syllable-division',,
name: 'Syllable Division with Cultural Words',,
type: 'comprehension',,
duration: '25 minutes',,
description: 'Practice syllable division using Māori place names and cultural terms.',,
steps: [
          'Identify syllable patterns in Māori words',
          'Divide words into syllables',
          'Practice reading multisyllabic words',
          'Connect to cultural meanings',
        ],;,
materials: [
          'Syllable cards',
          'Māori place names',
          'Cultural terms list',
          'Digital syllable divider',
          'Interactive whiteboard activities',
        ],;,
culturalIntegration: 'Uses authentic Māori place names and cultural terms to teach syllable division.',,
differentiation: [
          'Foundation: Simple 2-3 syllable words',
          'Developing: Complex multisyllabic words',
          'Advanced: Compound words and phrases',
        ],;,
explicitTeaching: [
          'Syllable division rules instruction',
          'Modeling with cultural examples',
          'Guided practice with feedback',
          'Independent application',
        ],;,
multimediaElements: [
          'Animated syllable division demonstrations',
          'Audio pronunciation of place names',
          'Interactive syllable counting games',
          'Digital word building tools',
        ],
      },
    ],;,
assessment: [
      {,
type: 'summative',,
description: 'Phonological awareness assessment with cultural vocabulary',,
criteria: [
          'Accurate phoneme-grapheme mapping',
          'Correct pronunciation of Māori words',
          'Syllable division accuracy',
          'Cultural vocabulary recognition',
        ],;,
culturalConsiderations: 'Ensure proper pronunciation and cultural respect in all assessments.',,
assessmentTools: [
          'Phonological awareness tests',
          'Pronunciation recording tools',
          'Digital assessment platforms',
          'Cultural accuracy checklists',
        ],
      },
    ],;,
resources: [
      'Liz Kane The Code materials',
      'Māori pronunciation guides',
      'Phonological awareness games',
      'Cultural vocabulary cards',
    ],;,
teachingResources: [
      {,
id: 'phonics-slideshow',,
type: 'slideshow',,
title: 'Systematic Phonics Instruction Slideshow',,
description: 'Step-by-step phonics instruction with Māori cultural integration',,
fileType: 'PowerPoint/Google Slides',,
targetAudience: 'both',,
culturalContext: 'Te Reo Māori phonology and cultural vocabulary',
      },
      {,
id: 'phoneme-cards',,
type: 'card',,
title: 'Phoneme Cards with Māori Examples',,
description: 'Printable cards showing phoneme-grapheme correspondences',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Māori words and pronunciation guides',
      },
      {,
id: 'pronunciation-podcast',,
type: 'podcast',,
title: 'Te Reo Māori Pronunciation Guide',,
description: 'Podcast series on correct pronunciation of Māori words',,
url: 'https://example.com/maori-pronunciation',,
fileType: 'MP3',,
duration: '20 minutes',,
targetAudience: 'both',,
culturalContext: 'Authentic Māori pronunciation and cultural context',
      },
      {,
id: 'phonics-worksheet',,
type: 'worksheet',,
title: 'Phoneme-Grapheme Mapping Worksheets',,
description: 'Printable worksheets for phoneme-grapheme mapping practice',,
fileType: 'PDF',,
targetAudience: 'student',,
culturalContext: 'Māori vocabulary and cultural themes',
      },
    ],;,
explicitTeachingStrategies: [
      'Systematic phonics instruction',
      'Multi-sensory learning approaches',
      'Immediate feedback and correction',
      'Progressive complexity building',
      'Cultural context integration',
      'Individual and small group instruction',
    ],;,
multimediaIntegration: [
      'Digital phonics games and apps',
      'Audio pronunciation guides',
      'Interactive whiteboard activities',
      'Video demonstrations of mouth movements',
      'Online phonics assessment tools',
      'Podcast integration for pronunciation',
    ],;,
differentiationStrategies: [
      'Individualized phonics progression',
      'Multi-sensory learning supports',
      'Extended practice opportunities',
      'Cultural knowledge pre-teaching',
      'Peer tutoring and collaboration',
      'Technology-assisted learning',
    ],
  },
  {,
id: 'structured-literacy-comprehension',,
title: 'Structured Literacy Comprehension',,
subtitle: 'Systematic Reading Strategies with Cultural Texts',,
approach: 'structured-literacy',,
duration: '5 weeks',,
difficulty: 'developing',,
description: 'Comprehensive reading comprehension strategies using structured literacy approaches with authentic Māori and Pacific texts.',,
learningObjectives: [
      'Apply systematic reading strategies',
      'Analyze cultural texts with sensitivity',
      'Build comprehension monitoring skills',
      'Develop critical thinking about diverse perspectives',
    ],;,
culturalContext: 'Uses authentic Māori and Pacific texts, stories, and perspectives to build comprehension skills while honoring cultural protocols.',,
nceaAlignment: 'Develops critical reading skills essential for NCEA Level 1 English text analysis and interpretation.',,
activities: [
      {,
id: 'think-aloud-protocol',,
name: 'Think-Aloud Protocol with Cultural Texts',,
type: 'during-reading',,
duration: '35 minutes',,
description: 'Model thinking processes while reading cultural texts to build comprehension strategies.',,
steps: [
          'Select appropriate cultural text',
          'Model thinking aloud while reading',
          'Share cultural connections and questions',
          'Demonstrate comprehension monitoring',
          'Validate diverse perspectives',
        ],;,
materials: [
          'Cultural text selection',
          'Think-aloud prompts',
          'Comprehension questions',
          'Digital text annotation tools',
          'Audio recording equipment',
        ],;,
culturalIntegration: 'Uses authentic Māori and Pacific texts with proper cultural protocols and respect.',,
differentiation: [
          'Foundation: Simple texts with basic strategies',
          'Developing: Complex texts with multiple strategies',
          'Advanced: Multiple texts with comparative analysis',
        ],;,
explicitTeaching: [
          'Think-aloud modeling and demonstration',
          'Strategy instruction and practice',
          'Cultural sensitivity training',
          'Comprehension monitoring techniques',
        ],;,
multimediaElements: [
          'Digital text annotation tools',
          'Audio recordings of think-alouds',
          'Video modeling of strategies',
          'Interactive comprehension games',
        ],
      },
      {,
id: 'kwa-chart-cultural',,
name: 'KWA Chart with Cultural Knowledge',,
type: 'before-reading',,
duration: '20 minutes',,
description: 'Organize prior knowledge and learning goals using cultural knowledge frameworks.',,
steps: [
          'What do I already Know about this cultural topic?',
          'What do I Want to learn about this culture?',
          'What have I Acquired/learned after reading?',
        ],;,
materials: [
          'KWA chart templates',
          'Cultural context guides',
          'Background information',
          'Digital KWA chart tools',
          'Cultural knowledge databases',
        ],;,
culturalIntegration: 'Incorporates mātauranga Māori and cultural knowledge in the "Know" column.',,
differentiation: [
          'Foundation: Basic cultural concepts',
          'Developing: Historical and contemporary contexts',
          'Advanced: Complex cultural analysis and synthesis',
        ],;,
explicitTeaching: [
          'KWA chart construction instruction',
          'Cultural knowledge activation',
          'Question generation strategies',
          'Knowledge synthesis techniques',
        ],;,
multimediaElements: [
          'Digital KWA chart templates',
          'Cultural knowledge databases',
          'Interactive background information',
          'Video cultural context clips',
        ],
      },
    ],;,
assessment: [
      {,
type: 'self-assessment',,
description: 'Comprehension strategy self-reflection',,
criteria: [
          'Strategy use effectiveness',
          'Cultural sensitivity and respect',
          'Comprehension monitoring',
          'Critical thinking development',
        ],;,
culturalConsiderations: 'Ensure cultural protocols are followed and diverse perspectives are valued.',,
assessmentTools: [
          'Self-reflection rubrics',
          'Strategy use checklists',
          'Cultural sensitivity assessments',
          'Digital portfolio tools',
        ],
      },
    ],;,
resources: [
      'Authentic Māori and Pacific texts',
      'Cultural context guides',
      'Comprehension strategy cards',
      'Graphic organizers',
    ],;,
teachingResources: [
      {,
id: 'comprehension-strategies-slideshow',,
type: 'slideshow',,
title: 'Comprehension Strategies with Cultural Texts',,
description: 'Interactive slideshow teaching comprehension strategies',,
fileType: 'PowerPoint/Google Slides',,
targetAudience: 'both',,
culturalContext: 'Māori and Pacific cultural texts and contexts',
      },
      {,
id: 'cultural-texts-handout',,
type: 'handout',,
title: 'Authentic Cultural Texts Collection',,
description: 'Curated collection of appropriate cultural texts for instruction',,
fileType: 'PDF',,
targetAudience: 'teacher',,
culturalContext: 'Authentic Māori and Pacific literature and texts',
      },
      {,
id: 'maori-stories-podcast',,
type: 'podcast',,
title: 'Māori Stories and Traditions',,
description: 'Podcast series featuring traditional and contemporary Māori stories',,
url: 'https://example.com/maori-stories',,
fileType: 'MP3',,
duration: '25 minutes',,
targetAudience: 'both',,
culturalContext: 'Traditional and contemporary Māori narratives',
      },
      {,
id: 'comprehension-cards',,
type: 'card',,
title: 'Comprehension Strategy Cards',,
description: 'Printable cards with comprehension strategies and prompts',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Cultural sensitivity and respect guidelines',
      },
    ],;,
explicitTeachingStrategies: [
      'Strategy modeling and demonstration',
      'Guided practice with feedback',
      'Cultural sensitivity training',
      'Comprehension monitoring instruction',
      'Critical thinking development',
      'Peer collaboration and discussion',
    ],;,
multimediaIntegration: [
      'Digital text annotation tools',
      'Audio recordings of readings',
      'Video cultural context clips',
      'Interactive comprehension games',
      'Online discussion forums',
      'Podcast integration for background knowledge',
    ],;,
differentiationStrategies: [
      'Text complexity differentiation',
      'Strategy scaffolding',
      'Cultural knowledge pre-teaching',
      'Extended time for complex texts',
      'Peer support and collaboration',
      'Technology-assisted reading',
    ],
  },
  {,
id: 'cultural-vocabulary-integration',,
title: 'Cultural Vocabulary Integration',,
subtitle: 'Building Academic Language with Cultural Context',,
approach: 'cultural-integration',,
duration: '4 weeks',,
difficulty: 'developing',,
description: 'Systematic vocabulary development integrating Te Reo Māori academic terms, cultural concepts, and bilingual language building.',,
learningObjectives: [
      'Master academic vocabulary across subjects',
      'Integrate Te Reo Māori academic terms',
      'Build cultural concept vocabulary',
      'Develop bilingual language skills',
    ],;,
culturalContext: 'Incorporates authentic Te Reo Māori academic terms, cultural concepts, and traditional knowledge into vocabulary instruction.',,
nceaAlignment: 'Builds vocabulary essential for success across all NCEA Level 1 subjects and assessments.',,
activities: [
      {,
id: 'word-analysis-cultural',,
name: 'Word Analysis with Cultural Roots',,
type: 'vocabulary',,
duration: '25 minutes',,
description: 'Analyze word structure and meaning using both English and Māori word origins.',,
steps: [
          'Identify word parts and origins',
          'Connect to cultural meanings',
          'Build word families',
          'Practice in context',
        ],;,
materials: [
          'Word analysis cards',
          'Cultural etymology guides',
          'Context examples',
          'Digital word analysis tools',
          'Interactive vocabulary games',
        ],;,
culturalIntegration: 'Uses Māori word origins and cultural meanings to build vocabulary understanding.',,
differentiation: [
          'Foundation: Basic word analysis',
          'Developing: Complex word origins',
          'Advanced: Comparative language analysis',
        ],;,
explicitTeaching: [
          'Word analysis strategy instruction',
          'Cultural etymology mini-lessons',
          'Context clue strategies',
          'Vocabulary building techniques',
        ],;,
multimediaElements: [
          'Interactive word analysis tools',
          'Digital etymology databases',
          'Audio pronunciation guides',
          'Vocabulary building games',
        ],
      },
      {,
id: 'semantic-mapping',,
name: 'Semantic Mapping with Cultural Concepts',,
type: 'after-reading',,
duration: '30 minutes',,
description: 'Create semantic maps connecting vocabulary to cultural concepts and contexts.',,
steps: [
          'Select key vocabulary words',
          'Identify cultural connections',
          'Create semantic relationships',
          'Build concept networks',
        ],;,
materials: [
          'Semantic mapping templates',
          'Cultural concept cards',
          'Relationship markers',
          'Digital mapping tools',
          'Interactive whiteboard',
        ],;,
culturalIntegration: 'Connects vocabulary to authentic cultural concepts and contexts.',,
differentiation: [
          'Foundation: Simple concept maps',
          'Developing: Complex relationship networks',
          'Advanced: Multi-dimensional concept analysis',
        ],;,
explicitTeaching: [
          'Semantic mapping instruction',
          'Cultural concept exploration',
          'Relationship building strategies',
          'Concept synthesis techniques',
        ],;,
multimediaElements: [
          'Digital semantic mapping tools',
          'Interactive concept databases',
          'Video cultural context clips',
          'Online vocabulary games',
        ],
      },
    ],;,
assessment: [
      {,
type: 'formative',,
description: 'Vocabulary development checkpoints',,
criteria: [
          'Vocabulary acquisition and use',
          'Cultural context understanding',
          'Bilingual language development',
          'Academic language proficiency',
        ],;,
culturalConsiderations: 'Ensure cultural accuracy and appropriate use of Te Reo Māori terms.',,
assessmentTools: [
          'Vocabulary assessment tools',
          'Cultural accuracy checklists',
          'Bilingual proficiency measures',
          'Digital vocabulary games',
        ],
      },
    ],;,
resources: [
      'Te Reo Māori academic glossaries',
      'Cultural concept guides',
      'Vocabulary development games',
      'Bilingual dictionaries',
    ],;,
teachingResources: [
      {,
id: 'vocabulary-slideshow',,
type: 'slideshow',,
title: 'Academic Vocabulary with Cultural Context',,
description: 'Interactive slideshow teaching academic vocabulary with cultural integration',,
fileType: 'PowerPoint/Google Slides',,
targetAudience: 'both',,
culturalContext: 'Te Reo Māori academic terms and cultural concepts',
      },
      {,
id: 'academic-glossary-handout',,
type: 'handout',,
title: 'Te Reo Māori Academic Glossary',,
description: 'Comprehensive glossary of academic terms in Te Reo Māori',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Authentic Te Reo Māori academic vocabulary',
      },
      {,
id: 'cultural-concepts-podcast',,
type: 'podcast',,
title: 'Māori Cultural Concepts Explained',,
description: 'Podcast series explaining key Māori cultural concepts and terms',,
url: 'https://example.com/maori-concepts',,
fileType: 'MP3',,
duration: '30 minutes',,
targetAudience: 'both',,
culturalContext: 'Traditional and contemporary Māori cultural concepts',
      },
      {,
id: 'vocabulary-cards',,
type: 'card',,
title: 'Academic Vocabulary Cards',,
description: 'Printable cards with academic terms and cultural context',,
fileType: 'PDF',,
targetAudience: 'both',,
culturalContext: 'Te Reo Māori academic terms and cultural explanations',
      },
    ],;,
explicitTeachingStrategies: [
      'Direct vocabulary instruction',
      'Cultural context exploration',
      'Bilingual language development',
      'Context clue strategies',
      'Word analysis techniques',
      'Semantic mapping instruction',
    ],;,
multimediaIntegration: [
      'Digital vocabulary games and apps',
      'Audio pronunciation guides',
      'Interactive semantic mapping tools',
      'Video cultural context clips',
      'Online vocabulary databases',
      'Podcast integration for cultural concepts',
    ],;,
differentiationStrategies: [
      'Vocabulary complexity differentiation',
      'Cultural knowledge pre-teaching',
      'Bilingual support strategies',
      'Extended practice opportunities',
      'Peer tutoring and collaboration',
      'Technology-assisted vocabulary building',
    ],
  },
]

const Year8ReadingUnits = () => {
const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [filter, setFilter] = useState<
    'all' | 'writing-revolution' | 'the-code' | 'structured-literacy' | 'cultural-integration'
  >('all')

const filteredUnits = readingUnits.filter(_(unit) => filter === 'all' || unit.approach === filter)

const getApproachIcon = (_approach: string) => {
switch (approach) {
case 'writing-revolution':
return '✍️'
      case 'the-code':
return '🔤'
      case 'structured-literacy':
return '📚'
      case 'cultural-integration':
return '🌿',
default:
return '📖'
    }
  }

const getDifficultyColor = (_difficulty: string) => {
switch (difficulty) {
case 'foundation':
return 'var(--color-primary)'
      case 'developing':
return 'var(--color-pounamu)'
      case 'advanced':
return 'var(--color-deep-purple)',
default:
return 'var(--color-neutral-600)'
    }
  }

const getResourceIcon = (_type: string) => {
switch (type) {
case 'slideshow':
return '📊'
      case 'handout':
return '📄'
      case 'card':
return '🃏'
      case 'podcast':
return '🎧'
      case 'news-story':
return '📰'
      case 'video':
return '🎥'
      case 'worksheet':
return '📝'
      case 'assessment':
return '✅',
default:
return '📎'
    }
  }

return (
_<div className="year8-reading-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
Year 8 Reading Units
            <span className="cultural-accent">Inspired by Liz Kane</span>
          </h1>
          <p className="hero-description">
Comprehensive reading instruction based on "The Writing Revolution" and "The Code"
methodologies,  _integrated with authentic Māori cultural contexts and Te Reo Māori
language development.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4</span>
              <span className="stat-label">Core Units</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Cultural Integration</span>
            </div>
            <div className="stat">
              <span className="stat-number">Liz Kane</span>
              <span className="stat-label">Methodology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="filter-container">
          <button
className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
onClick={() => setFilter('all')}
          >
All Approaches
          </button>
          <button
className={`filter-btn ${filter === 'writing-revolution' ? 'active' : ''}`}
onClick={() => setFilter('writing-revolution')}
          >
Writing Revolution
          </button>
          <button
className={`filter-btn ${filter === 'the-code' ? 'active' : ''}`}
onClick={() => setFilter('the-code')}
          >
The Code
          </button>
          <button
className={`filter-btn ${filter === 'structured-literacy' ? 'active' : ''}`}
onClick={() => setFilter('structured-literacy')}
          >
Structured Literacy
          </button>
          <button
className={`filter-btn ${filter === 'cultural-integration' ? 'active' : ''}`}
onClick={() => setFilter('cultural-integration')}
          >
Cultural Integration
          </button>
        </div>
      </section>

      {/* Units Grid */}
      <section className="units-section">
        <div className="units-grid">
          {filteredUnits.map(_(unit) => (
_<div
key={unit.id}
className={`unit-card ${unit.approach} ${selectedUnit === unit.id ? 'selected' : ''}`}
onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
            >
              <div className="unit-header">
                <div className="unit-icon">{getApproachIcon(unit.approach)}</div>
                <div className="unit-info">
                  <h3 className="unit-title">{unit.title}</h3>
                  <p className="unit-subtitle">{unit.subtitle}</p>
                  <div className="unit-meta">
                    <span className="unit-duration">{unit.duration}</span>
                    <span
className="unit-difficulty"
style={{ color: getDifficultyColor(unit.difficulty) }}
                    >
                      {unit.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="unit-description">{unit.description}</p>

              <div className="unit-objectives">
                <h4>Learning Objectives:</h4>
                <ul>
                  {unit.learningObjectives.map(_(objective,  _index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              {selectedUnit === unit.id && (
_<div className="unit-details">
                  <div className="detail-section">
                    <h4>Cultural Context: </h4>
                    <p>{unit.culturalContext}</p>
                  </div>

                  <div className="detail-section">
                    <h4>NCEA Alignment:</h4>
                    <p>{unit.nceaAlignment}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Explicit Teaching Strategies:</h4>
                    <ul>
                      {unit.explicitTeachingStrategies.map((strategy,  _index) => (
                        <li key={index}>{strategy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Multimedia Integration: </h4>
                    <ul>
                      {unit.multimediaIntegration.map(_(element,  _index) => (
                        <li key={index}>{element}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="detail-section">
                    <h4>Teaching Resources: </h4>
                    <div className="resources-grid">
                      {unit.teachingResources.map(_(resource) => (
                        <div key={resource.id} className="resource-item">
                          <div className="resource-icon">{getResourceIcon(resource.type)}</div>
                          <div className="resource-info">
                            <h5>{resource.title}</h5>
                            <p>{resource.description}</p>
                            <div className="resource-meta">
                              <span className="resource-type">{resource.type}</span>
                              <span className="resource-file">{resource.fileType}</span>
                              {resource.duration && (
                                <span className="resource-duration">{resource.duration}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Key Activities:</h4>
                    <div className="activities-list">
                      {unit.activities.map(_(activity) => (
_<div key={activity.id} className="activity-item">
                          <h5>{activity.name}</h5>
                          <p>{activity.description}</p>
                          <div className="activity-meta">
                            <span className="activity-type">{activity.type}</span>
                            <span className="activity-duration">{activity.duration}</span>
                          </div>
                          <div className="activity-details">
                            <h6>Explicit Teaching: </h6>
                            <ul>
                              {activity.explicitTeaching.map((teaching,  _index) => (
                                <li key={index}>{teaching}</li>
                              ))}
                            </ul>
                            <h6>Multimedia Elements: </h6>
                            <ul>
                              {activity.multimediaElements.map(_(element,  _index) => (
                                <li key={index}>{element}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Assessment: </h4>
                    <div className="assessment-list">
                      {unit.assessment.map(_(item,  _index) => (
_<div key={index} className="assessment-item">
                          <h5>{item.type}</h5>
                          <p>{item.description}</p>
                          <div className="assessment-tools">
                            <h6>Assessment Tools: </h6>
                            <ul>
                              {item.assessmentTools.map((tool,  _toolIndex) => (
                                <li key={toolIndex}>{tool}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h4>Differentiation Strategies: </h4>
                    <ul>
                      {unit.differentiationStrategies.map(_(strategy,  _index) => (
                        <li key={index}>{strategy}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="unit-actions">
                <button
className="expand-btn"
onClick={(_e) => {
e.stopPropagation()
                    setSelectedUnit(selectedUnit === unit.id ? null : unit.id)
                  }}
                >
                  {selectedUnit === unit.id ? 'Show Less' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="methodology-section">
        <div className="methodology-content">
          <h2 className="section-title">
Liz Kane Methodologies
            <span className="maori-text">Ngā Tikanga Ako</span>
          </h2>
          <div className="methodology-grid">
            <div className="methodology-item">
              <h3>✍️ The Writing Revolution</h3>
              <p>
Systematic approach to sentence and paragraph development that builds writing skills
progressively through structured activities.
              </p>
            </div>
            <div className="methodology-item">
              <h3>🔤 The Code</h3>
              <p>
Evidence-based systematic phonics instruction that develops phonological awareness
and decoding skills systematically.
              </p>
            </div>
            <div className="methodology-item">
              <h3>📚 Structured Literacy</h3>
              <p>
Comprehensive approach to reading instruction that integrates phonics, vocabulary,;
comprehension, and fluency.
              </p>
            </div>
            <div className="methodology-item">
              <h3>🌿 Cultural Integration</h3>
              <p>
Authentic integration of Māori cultural contexts, Te Reo Māori vocabulary, and
traditional knowledge into literacy instruction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Implement?</h2>
          <p>Choose a unit to begin your Year 8 reading instruction journey</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Start with Writing Revolution</button>
            <button className="cta-btn secondary">Begin with The Code</button>
            <button className="cta-btn secondary">Explore Structured Literacy</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Year8ReadingUnits
