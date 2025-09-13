import {
  Bookmark,
  BookOpen,
  ChevronRight,
  Download,
  FileText,
  Play,
  Search,
  Target,
  Users,
  Filter,
  Star,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MāoriFocusedResourceDisplay from './MāoriFocusedResourceDisplay';
import { filterByQuality, getQualityStats } from '../utils/quality-content-filter';
import type { RealResource } from '../types';

// Load resources with actual content function
async function loadRealResourcesWithContent(): Promise<RealResource[]> {
  const realResources: RealResource[] = [
    {
      id: 'y2-visual-arts-maori-design',
      title: 'Y2 Visual Arts Patterns In Nature Maori Design',
      subject: 'Visual Arts',
      yearLevel: 'Year 2',
      type: 'lesson',
      filename: 'Y2_Visual_Arts_Patterns_in_Nature_Maori_Design.md',
      path: 'real-resources/Y2_Visual_Arts_Patterns_in_Nature_Maori_Design.md',
      culturalElements: 4,
      description: 'Explore traditional Māori design patterns through nature observations',
      content: `# Year 2 Visual Arts: Patterns in Nature & Māori Design

## Learning Objectives
- Observe and identify patterns in the natural world
- Learn about traditional Māori design motifs
- Create artwork inspired by natural patterns
- Understand the cultural significance of Māori patterns

## Materials
- Natural objects (leaves, shells, stones)
- Drawing materials
- Examples of Māori patterns (koru, pakura, etc.)

## Activities
### Pattern Hunt (20 mins)
Take students outside to collect natural objects and observe patterns

### Cultural Learning (15 mins)
Introduce traditional Māori patterns:
- **Koru** - unfurling fern frond, new life
- **Pakura** - triangle patterns
- **Pitau** - twisted cord patterns

### Art Creation (30 mins)
Students create their own artwork combining natural patterns with Māori design elements

## Assessment
- Can identify patterns in nature
- Shows understanding of Māori design elements
- Creates original artwork respectfully incorporating cultural elements`,
      duration: '60 mins',
      difficulty: 'beginner',
      tags: ['visual-arts', 'cultural-content', 'māori-perspectives', 'nature'],
    },
    {
      id: 'y5-pe-traditional-maori-games',
      title: 'Y5 Physical Education Traditional Maori Games',
      subject: 'Physical Education',
      yearLevel: 'Year 5',
      type: 'activity',
      filename: 'Y5_Physical_Education_Traditional_Maori_Games.md',
      path: 'real-resources/Y5_Physical_Education_Traditional_Maori_Games.md',
      culturalElements: 5,
      description: 'Learn and play traditional Māori games while developing physical skills',
      content: `# Year 5 PE: Traditional Māori Games (Taonga Takaro)

## Whakataukī (Proverb)
"He aha te mea nui o te ao? He tangata, he tangata, he tangata."
What is the most important thing in the world? It is people, it is people, it is people.

## Learning Objectives
- Learn about traditional Māori games and their cultural significance
- Develop physical skills through traditional activities
- Understand values of teamwork and fair play
- Respect cultural protocols

## Cultural Context
Traditional Māori games were used for:
- Physical fitness and skill development
- Entertainment and social bonding
- Training for warfare
- Teaching cultural values

## Games to Play

### 1. Ki-o-rahi (30 mins)
A traditional ball game combining elements of rugby and touch.
- Teams of 7 players
- Central tupu (goal) and 7 boundary markers (pou)
- Develops teamwork, strategy, and fitness

### 2. Poi Rakau (Stick Games) (15 mins)
- Coordination and rhythm activity
- Pass sticks in time to chanting
- Develops hand-eye coordination

### 3. Kapahaka movements (10 mins)
- Basic haka movements for fitness
- Cultural learning through movement
- Builds strength and coordination

## Cultural Protocols
- Begin with karakia (prayer) if appropriate
- Show respect for the games and their origins
- Emphasize values of manaakitanga (hospitality) and whakatōhea (fair play)

## Assessment
- Participates respectfully in cultural activities
- Demonstrates understanding of game rules
- Shows teamwork and fair play
- Explains cultural significance of activities`,
      duration: '60 mins',
      difficulty: 'intermediate',
      tags: [
        'physical-education',
        'cultural-content',
        'māori-perspectives',
        'traditional-games',
        'teamwork',
      ],
    },
    {
      id: 'y7-english-close-reading-skeleton',
      title: 'Y7 English Close Reading (Template)',
      subject: 'English',
      yearLevel: 'Year 7',
      type: 'handout',
      filename: 'Y7_English_Close_Reading_0018.md',
      path: 'handouts/Y7_English_Close_Reading_0018.md',
      culturalElements: 1,
      description: 'Generic template for close reading activities',
      content: `# English Y7 - Close Reading in Aotearoa

*Te Kura o TeAoMarama - English*

**Year Level**: 7
**Subject**: English  
**Duration**: 45 minutes
**NZ Curriculum**: Language & Literature

**Cultural Context**: None
**Te Reo Integration**: greetings, whakataukī references
**Tikanga Connection**: respectful classroom protocols

---

## 🎯 Learning Intentions

**WALT** (We Are Learning To):
- Connect English concepts to real contexts in Aotearoa
- Apply knowledge to solve problems and explain thinking

**WALA** (We Are Learning About):
- Key ideas in Close Reading
- Strategies for success in English

**Success Criteria**:
- [ ] I can explain key ideas in Close Reading
- [ ] I can apply these ideas to a real New Zealand context
- [ ] I can reflect on my learning and next steps

---

## 📚 Learning Content

### Context
This resource explores close reading through familiar, local examples across Aotearoa.

### Worked Example
A short, scaffolded example demonstrates the concept and models quality working and explanation.

### Practice
A set of tiered practice prompts consolidates understanding and encourages extension.`,
      duration: '45 mins',
      difficulty: 'beginner',
      tags: ['english', 'template', 'skeleton'],
    },
    {
      id: 'y9-science-native-plants-complete',
      title: 'Native Plant Adaptation in Aotearoa Ecosystems',
      subject: 'Science',
      yearLevel: 'Year 9',
      type: 'lesson',
      filename: 'lesson_Science_Y9_native_plant_adaptation_in_aotearoa_ecosystems.md',
      path: 'deepseek-generated/lesson_Science_Y9_native_plant_adaptation_in_aotearoa_ecosystems.md',
      culturalElements: 5,
      description: 'Comprehensive lesson on native plant adaptations with Māori perspectives',
      content: `# Year 9 Science: Native Plant Adaptation in Aotearoa Ecosystems

## Whakataukī (Proverb)
*"Ko te whenua te waiū mō nga uri whakatipu" - The land provides the sustenance for future generations*

## Big Idea
Native plants have evolved sophisticated adaptations through deep relationships with their environment, embodying principles of whakapapa (genealogy) and whanaungatanga (relationships) that sustain entire ecosystems.

---

## Previous Learning Connections
**Explicit links to what students already know:**
- Year 7/8 Living World: Basic plant structure and photosynthesis
- Year 8 Ecology: Simple food webs and habitats
- Year 7 Māori Worldview: Introduction to kaitiakitanga (guardianship)
- Year 8 Geography: New Zealand's unique geological history
- Year 7 Evolution: Basic concept of adaptation to environment

**Bridge Questions:**
- "How might our understanding of basic plant biology help us understand why certain plants only grow in specific places?"
- "Remember when we learned about New Zealand's isolation - how might this have affected our native plants?"
- "Recall our discussion about kaitiakitanga - how might understanding plant adaptations help us be better kaitiaki?"

---

## Deep Investigation: The Harakeke Case Study

### Phase 1: Observational Analysis (2 periods)
**Hands-on examination of harakeke (flax) specimens:**
- Leaf cross-section microscopy (waxy coating, structural fibers)
- Measurement of water retention capabilities
- Fiber strength testing compared to introduced plants
- Root structure examination

**Guiding Questions:**
- What physical features help harakeke survive wetland environments?
- How might these adaptations have developed over time?
- What would happen if we transplanted harakeke to a different ecosystem?

### Phase 2: Ecological Relationships (2 periods)
**Mapping harakeke's role in the ecosystem:**
- Investigate which birds (tūī, korimako) depend on harakeke nectar
- Examine how harakeke provides habitat for insects and lizards
- Analyze soil composition around harakeke and its effect on other plants

**Cultural connection:** Learn proper harvesting protocols (tikanga) for harakeke, understanding why certain harvesting practices ensure plant survival.

### Phase 3: Comparative Adaptation Study (2 periods)
**Compare harakeke with two other native plants from different ecosystems:**
- Kānuka (dry, poor soil adaptations)
- Pūriri (forest canopy adaptations)
- Create adaptation profiles highlighting structural, physiological and behavioral adaptations

---

## Cultural Wisdom Connections

### Mātauranga Māori Perspectives
**Whakapapa of Plants:**
- Understanding plants as ancestors with their own whakapapa
- Traditional classification systems based on use and properties rather than Western taxonomy

**Rongoā Māori (Traditional Medicine):**
- How adaptation features relate to medicinal properties
- The concept of mauri (life force) observable in plant resilience

**Traditional Ecological Knowledge:**
- Lunar calendar planting and harvesting knowledge
- Understanding microclimates through traditional observation
- Stories and pūrākau that encode adaptation knowledge

**Activity:** Work with local kaumātua or cultural advisor to learn traditional uses of adapted plants and how this knowledge informed sustainable practices.

---

## Assessment of Understanding

### Performance Task: "Adaptation Advocates"
Students create an educational resource (choice of format: video, interactive display, podcast, or pamphlet) that:

1. Explains one native plant's key adaptations in depth
2. Connects these adaptations to the plant's ecosystem role
3. Incorporates relevant Māori perspectives and knowledge
4. Predicts how climate change might affect this plant
5. Proposes conservation actions based on understanding of adaptations

### Criteria for Success:
- Depth of adaptation explanation (beyond surface features)
- Accuracy of ecological relationships described
- Cultural understanding and appropriate integration of mātauranga Māori
- Evidence of transfer thinking to new scenarios
- Clarity of communication for intended audience

### Metacognitive Reflection:
- "What was the most surprising connection you discovered?"
- "How has your understanding of 'intelligence' in plants changed?"
- "What questions has this investigation raised for you?"

---

*This lesson was developed in consultation with cultural advisors to ensure appropriate integration of mātauranga Māori. Continued relationship with local iwi and knowledge holders is essential for authentic implementation.*`,
      duration: '6 periods (300 mins)',
      difficulty: 'advanced',
      tags: ['science', 'cultural-content', 'māori-perspectives', 'ecology', 'advanced', 'complete-lesson'],
    },
  ];

  return realResources;
}

// Use the enriched resource interface
type Resource = {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: 'lesson' | 'activity' | 'assessment' | 'unit-plan' | 'multimedia' | 'handout';
  content?: any;
  culturalElements: number;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  path?: string;
};

const FunctionalResourceBrowser: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [qualityFilter, setQualityFilter] = useState(70);
  const [showQualityOnly, setShowQualityOnly] = useState(true);
  const [qualityStats, setQualityStats] = useState<any>(null);

  // Load real resources with actual content
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        // Load comprehensive resources library (thousands of resources)
        const { buildComprehensiveResourceLibrary } = await import('../utils/comprehensive-resource-builder');
        const comprehensiveResources = await buildComprehensiveResourceLibrary();
        console.log(`🚀 Loading ${comprehensiveResources.length} resources from comprehensive library`);

        // Convert to our Resource format
        const resources: Resource[] = comprehensiveResources.map((resource) => ({
          id: resource.id,
          title: resource.title,
          subject: resource.subject,
          yearLevel: resource.yearLevel,
          type: resource.type,
          content: resource.content, // This now has actual content!
          culturalElements: resource.culturalElements,
          description: resource.description,
          duration: resource.duration || 'N/A',
          difficulty: resource.difficulty || 'intermediate',
          tags: resource.tags || [],
        }));

        // Apply initial quality filtering
        const qualityResources = showQualityOnly
          ? filterByQuality(resources, qualityFilter)
          : resources;

        setResources(resources);
        setFilteredResources(qualityResources);
        setQualityStats(getQualityStats(resources));

        console.log(`🎉 Loaded ${resources.length} real resources with content`);
        console.log(`⭐ ${qualityResources.length} quality resources available after filtering`);
        console.log('📊 Quality stats:', getQualityStats(resources));
      } catch (error) {
        console.error('Error loading real resources:', error);
        // Fallback to sample resources with content
        const resourcesWithContent = sampleResources.map((r) => ({
          ...r,
          content: r.content || 'Sample content',
        }));
        setResources(resourcesWithContent);
        setFilteredResources(resourcesWithContent);
        setQualityStats(getQualityStats(resourcesWithContent));
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Sample fallback data (kept for reference)
  const sampleResources: Resource[] = [
    {
      id: '1',
      title: 'Te Reo Māori Greetings & Introductions',
      subject: 'Language Arts',
      yearLevel: 'Year 7-8',
      type: 'lesson',
      description:
        'Learn traditional Māori greetings, introductions, and cultural protocols for meeting new people.',
      content: `# Te Reo Māori Greetings & Introductions

## Learning Objectives
- Master basic Māori greetings and farewells
- Understand cultural protocols for introductions
- Practice pronunciation and intonation

## Vocabulary
- **Kia ora** - Hello/Good health
- **Tēnā koe** - Hello (formal, to one person)
- **Tēnā kōrua** - Hello (to two people)
- **Tēnā koutou** - Hello (to three or more people)
- **Haere mai** - Welcome
- **Haere rā** - Goodbye (to someone leaving)

## Cultural Context
Traditional greetings in Māori culture carry deep meaning and respect...`,
      culturalElements: 5,
      duration: '45 mins',
      difficulty: 'beginner',
      tags: ['te-reo', 'greetings', 'cultural-protocols', 'pronunciation'],
      path: '/resources/te-reo/greetings-introductions',
    },
    {
      id: '2',
      title: 'Māori Perspectives in Science: Native Plants',
      subject: 'Science',
      yearLevel: 'Year 9',
      type: 'lesson',
      description:
        'Explore native Aotearoa plant adaptation through traditional Māori knowledge and modern scientific understanding.',
      content: `# Native Plant Adaptation in Aotearoa Ecosystems

## Māori Knowledge Integration
Traditional understanding of native plants and their ecological relationships...

## Scientific Concepts
- Plant adaptation strategies
- Ecosystem interactions
- Climate influence on evolution

## Featured Plants
- **Kākaho (Toetoe grass)** - Adaptation to wetlands
- **Pōhutukawa** - Coastal environment specialist
- **Rimu** - Ancient forest ecosystem indicator`,
      culturalElements: 4,
      duration: '60 mins',
      difficulty: 'intermediate',
      tags: ['science', 'ecology', 'native-plants', 'traditional-knowledge'],
      path: '/resources/science/native-plants-adaptation',
    },
    {
      id: '3',
      title: 'Traditional Māori Architecture: Ratios & Proportions',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      type: 'handout',
      description:
        'Discover mathematical concepts through the study of traditional Māori building techniques and proportional relationships.',
      content: `# Ratios and Proportions in Traditional Māori Architecture

## Mathematical Concepts
Explore ratios, proportions, and geometric relationships in traditional buildings...

## Cultural Architecture
- **Wharenui** - Meeting house proportions
- **Whare** - Traditional dwelling ratios
- **Palisade structures** - Defensive architecture geometry

## Activities
1. Measure and calculate ratios in architectural photos
2. Design scaled models using traditional proportions
3. Compare with modern architectural principles`,
      culturalElements: 5,
      duration: '50 mins',
      difficulty: 'intermediate',
      tags: ['mathematics', 'architecture', 'ratios', 'cultural-design'],
      path: '/resources/mathematics/traditional-architecture',
    },
    {
      id: '4',
      title: 'Economics of Pre-Colonial Aotearoa',
      subject: 'Social Studies',
      yearLevel: 'Year 10',
      type: 'activity',
      description:
        'Interactive exploration of traditional Māori economic systems, trade networks, and resource management.',
      content: `# Economic Systems in Pre-Colonial Aotearoa

## Traditional Economic Principles
Understanding how Māori communities organized economic life...

## Key Concepts
- **Taonga** - Treasures and valuable resources
- **Utu** - Balance and reciprocity
- **Manaakitanga** - Hospitality and care for others
- **Whakapapa** - Genealogical connections to resources

## Trade Networks
Explore how different iwi traded resources across Aotearoa...

## Activities
1. Map traditional trade routes
2. Role-play resource exchange scenarios
3. Compare with modern economic systems`,
      culturalElements: 4,
      duration: '75 mins',
      difficulty: 'advanced',
      tags: ['social-studies', 'economics', 'trade', 'traditional-systems'],
      path: '/resources/social-studies/pre-colonial-economics',
    },
    {
      id: '5',
      title: 'Statistics Using New Zealand Census Data',
      subject: 'Mathematics',
      yearLevel: 'Year 9',
      type: 'assessment',
      description:
        'Apply statistical analysis to real New Zealand census data, exploring demographic trends and cultural insights.',
      content: `# Statistics Using New Zealand Census Data

## Assessment Overview
Students will analyze real census data to understand statistical concepts...

## Data Sets
- Population demographics by region
- Language use across communities
- Cultural identity statistics
- Educational attainment trends

## Statistical Skills
1. Data collection and organization
2. Graphical representation
3. Measures of central tendency
4. Interpretation and analysis

## Cultural Connections
How statistics help us understand cultural diversity in Aotearoa...`,
      culturalElements: 3,
      duration: '90 mins',
      difficulty: 'intermediate',
      tags: ['mathematics', 'statistics', 'census-data', 'demographics'],
      path: '/resources/mathematics/census-statistics',
    },
  ];

  useEffect(() => {
    // First apply quality filtering if enabled
    const qualityResources = showQualityOnly
      ? filterByQuality(resources, qualityFilter)
      : resources;

    // Then apply other filters
    const filtered = qualityResources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags || []).some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      const matchesYear = selectedYear === 'all' || resource.yearLevel.includes(selectedYear);
      const matchesType = selectedType === 'all' || resource.type === selectedType;

      return matchesSearch && matchesSubject && matchesYear && matchesType;
    });

    setFilteredResources(filtered);
  }, [
    searchTerm,
    selectedSubject,
    selectedYear,
    selectedType,
    resources,
    qualityFilter,
    showQualityOnly,
  ]);

  const subjects = ['all', ...Array.from(new Set(resources.map((r) => r.subject)))];
  const yearLevels = ['all', 'Year 7', 'Year 8', 'Year 9', 'Year 10'];
  const types = ['all', 'lesson', 'handout', 'activity', 'assessment'];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4" />;
      case 'handout':
        return <FileText className="w-4 h-4" />;
      case 'activity':
        return <Play className="w-4 h-4" />;
      case 'assessment':
        return <Target className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return '#3b82f6';
      case 'handout':
        return '#059669';
      case 'activity':
        return '#d97706';
      case 'assessment':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          ></div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Loading 5,000+ comprehensive educational resources from Te Ao Mārama...
          </p>
        </div>
      </div>
    );
  }

  if (selectedResource) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            background: '#f8fafc',
            width: '95%',
            height: '95%',
            borderRadius: '16px',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          {/* Resource Viewer Header */}
          <header
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              color: 'white',
              padding: '20px 0',
              boxShadow: '0 4px 20px rgba(30, 64, 175, 0.15)',
            }}
          >
            <div
              style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <button
                  onClick={() => setSelectedResource(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    marginBottom: '12px',
                  }}
                >
                  ← Back to Resources
                </button>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0 0 8px 0' }}>
                  {selectedResource.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.9 }}>
                  <span>
                    {selectedResource.subject} • {selectedResource.yearLevel}
                  </span>
                  <span>⭐ {selectedResource.culturalElements} cultural elements</span>
                  <span>⏱️ {selectedResource.duration}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Bookmark />
                </button>
                <button
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <Download />
                </button>
              </div>
            </div>
          </header>

          {/* Resource Content */}
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb',
              }}
            >
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      background: getTypeColor(selectedResource.type) + '20',
                      color: getTypeColor(selectedResource.type),
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {getTypeIcon(selectedResource.type)}
                    {selectedResource.type}
                  </span>
                  <span
                    style={{
                      background: getDifficultyColor(selectedResource.difficulty) + '20',
                      color: getDifficultyColor(selectedResource.difficulty),
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                    }}
                  >
                    {selectedResource.difficulty}
                  </span>
                </div>
                <p
                  style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.6', margin: '0' }}
                >
                  {selectedResource.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: '32px' }}>
                <h3
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '12px',
                  }}
                >
                  TAGS
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedResource.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '24px',
                  lineHeight: '1.6',
                  color: '#374151',
                }}
              >
                {selectedResource.content ? (
                  <MāoriFocusedResourceDisplay
                    resource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                  />
                ) : (
                  <div>
                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '16px',
                      }}
                    >
                      📚 {selectedResource.title}
                    </h3>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '16px' }}>
                        {selectedResource.description}
                      </p>
                    </div>

                    <div
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '24px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        🎯 Learning Focus
                      </h4>
                      <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6' }}>
                        This {selectedResource.type} is designed for {selectedResource.yearLevel}{' '}
                        students studying {selectedResource.subject}.
                        {selectedResource.culturalElements > 0 &&
                          ` It includes ${selectedResource.culturalElements} cultural elements that connect learning to Te Ao Māori perspectives.`}
                      </p>
                    </div>

                    {selectedResource.culturalElements > 0 && (
                      <div
                        style={{
                          background: '#f0fdf4',
                          border: '1px solid #22c55e',
                          borderRadius: '8px',
                          padding: '20px',
                          marginBottom: '24px',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#15803d',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          🌿 Cultural Integration
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            fontSize: '1rem',
                            lineHeight: '1.6',
                            color: '#166534',
                          }}
                        >
                          This resource incorporates{' '}
                          {selectedResource.culturalElements === 5
                            ? 'excellent'
                            : selectedResource.culturalElements >= 3
                            ? 'good'
                            : 'some'}{' '}
                          cultural integration, connecting learning objectives with Te Ao Māori
                          worldviews and practices.
                        </p>
                      </div>
                    )}

                    <div
                      style={{
                        background: '#f8fafc',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '24px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#1f2937',
                          marginBottom: '12px',
                        }}
                      >
                        📋 Suggested Learning Activities
                      </h4>
                      <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '1rem' }}>
                        <li style={{ marginBottom: '8px' }}>
                          Introduction and context setting ({Math.floor(Math.random() * 10) + 5}{' '}
                          minutes)
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          Main content exploration and discussion (
                          {Math.floor(Math.random() * 15) + 20} minutes)
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          Hands-on activities and group work ({Math.floor(Math.random() * 10) + 10}{' '}
                          minutes)
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          Reflection and connection to broader themes (
                          {Math.floor(Math.random() * 5) + 5} minutes)
                        </li>
                      </ul>
                    </div>

                    <div
                      style={{
                        background: '#fef3c7',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        padding: '20px',
                        marginBottom: '24px',
                      }}
                    >
                      <h4
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: '#92400e',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        ⭐ Assessment Opportunities
                      </h4>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: '20px',
                          fontSize: '1rem',
                          color: '#92400e',
                        }}
                      >
                        <li style={{ marginBottom: '8px' }}>
                          Formative assessment through questioning and observation
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          Student self-reflection and peer feedback
                        </li>
                        <li style={{ marginBottom: '8px' }}>Portfolio evidence collection</li>
                        {selectedResource.type === 'assessment' && (
                          <li>Formal assessment task included in resource</li>
                        )}
                      </ul>
                    </div>

                    <div
                      style={{
                        background: '#ecfdf5',
                        border: '1px solid #22c55e',
                        borderRadius: '8px',
                        padding: '20px',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontSize: '0.95rem',
                          color: '#166534',
                          fontWeight: '500',
                        }}
                      >
                        📚 This resource is part of our comprehensive educational library designed
                        to support culturally-responsive teaching practices in Aotearoa New
                        Zealand.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid #e5e7eb',
                }}
              >
                <button
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Play className="w-4 h-4" />
                  Start Learning
                </button>
                <button
                  style={{
                    background: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Users className="w-4 h-4" />
                  Share with Class
                </button>
                <button
                  style={{
                    background: 'white',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          color: 'white',
          padding: '20px 0',
          boxShadow: '0 4px 20px rgba(30, 64, 175, 0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 8px 0' }}>
            📚 Educational Resource Library
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9, margin: '0 0 12px 0' }}>
            Access {resources.length > 0 ? `${resources.length.toLocaleString()}` : '5,000+'}{' '}
            culturally-responsive educational resources
          </p>

          {/* Quality Stats Bar */}
          {qualityStats && (
            <div
              style={{
                display: 'flex',
                gap: '16px',
                fontSize: '0.875rem',
                opacity: 0.9,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star className="w-4 h-4" fill="currentColor" />
                {qualityStats.ready} Quality Ready
              </span>
              <span>{qualityStats.enhanced} Enhanced</span>
              <span>{qualityStats.templates} Templates</span>
              <span>{qualityStats.skeletons} Skeletons</span>
              <span style={{ fontWeight: '600' }}>{qualityStats.percentReady}% Production Ready</span>
            </div>
          )}
        </div>
      </header>

      {/* Search and Filters */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '20px 0',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Quality Filter Toggle */}
          <div
            style={{
              background: showQualityOnly ? '#ecfdf5' : '#fef3c7',
              border: `1px solid ${showQualityOnly ? '#22c55e' : '#f59e0b'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter
                className="w-4 h-4"
                style={{ color: showQualityOnly ? '#16a34a' : '#d97706' }}
              />
              <span
                style={{
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  color: showQualityOnly ? '#15803d' : '#92400e',
                }}
              >
                {showQualityOnly
                  ? '⭐ Quality Content Filter: ON'
                  : '⚠️ Showing All Content (including skeletons)'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label
                style={{ fontSize: '0.75rem', color: showQualityOnly ? '#16a34a' : '#d97706' }}
              >
                Min Quality: {qualityFilter}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={qualityFilter}
                onChange={(e) => setQualityFilter(Number(e.target.value))}
                style={{ width: '80px' }}
              />
              <button
                onClick={() => setShowQualityOnly(!showQualityOnly)}
                style={{
                  padding: '4px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: showQualityOnly ? '#16a34a' : '#d97706',
                  color: 'white',
                }}
              >
                {showQualityOnly ? 'Show All' : 'Quality Only'}
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Search
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                }}
              />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'white',
              }}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'white',
              }}
            >
              {yearLevels.map((year) => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All Year Levels' : year}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '0.875rem',
                background: 'white',
              }}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 4px 0' }}>
                Showing {filteredResources.length} of {resources.length} resources
                {showQualityOnly && (
                  <span style={{ color: '#16a34a', fontWeight: '600' }}> (Quality filtered)</span>
                )}
              </p>
              {qualityStats && (
                <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0' }}>
                  {qualityStats.ready} ready • {qualityStats.enhanced} enhanced •{' '}
                  {qualityStats.templates} templates • {qualityStats.skeletons} skeletons
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  background: viewMode === 'grid' ? '#3b82f6' : 'white',
                  color: viewMode === 'grid' ? 'white' : '#374151',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  border: '1px solid #d1d5db',
                  background: viewMode === 'list' ? '#3b82f6' : 'white',
                  color: viewMode === 'list' ? 'white' : '#374151',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              viewMode === 'grid' ? 'repeat(auto-fill, minmax(350px, 1fr))' : '1fr',
            gap: '20px',
          }}
        >
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              onClick={() => {
                console.log('Opening resource:', resource.title);
                setSelectedResource(resource);
              }}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      background: getTypeColor(resource.type) + '20',
                      color: getTypeColor(resource.type),
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {getTypeIcon(resource.type)}
                    {resource.type}
                  </span>
                  <span
                    style={{
                      background: getDifficultyColor(resource.difficulty) + '20',
                      color: getDifficultyColor(resource.difficulty),
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                    }}
                  >
                    {resource.difficulty}
                  </span>
                </div>
                <button
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: 'none',
                    color: '#3b82f6',
                    padding: '6px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 8px 0',
                }}
              >
                {resource.title}
              </h3>

              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: '0 0 12px 0',
                  lineHeight: '1.4',
                }}
              >
                {resource.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '12px',
                }}
              >
                <span>
                  {resource.subject} • {resource.yearLevel}
                </span>
                <span>⭐ {resource.culturalElements} cultural elements</span>
                <span>⏱️ {resource.duration}</span>
                {(resource as any).qualityMetrics && (
                  <span
                    style={{
                      color:
                        (resource as any).qualityMetrics.qualityScore >= 70 ? '#16a34a' : '#d97706',
                      fontWeight: '600',
                    }}
                  >
                    🎯 {(resource as any).qualityMetrics.qualityScore}% quality
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {(resource.tags || []).slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#f3f4f6',
                      color: '#6b7280',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.7rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {(resource.tags || []).length > 3 && (
                  <span
                    style={{
                      color: '#9ca3af',
                      fontSize: '0.7rem',
                      padding: '2px 8px',
                    }}
                  >
                    +{(resource.tags || []).length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280',
            }}
          >
            <FileText
              style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.5 }}
            />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0 0 8px 0' }}>
              No resources found
            </h3>
            <p style={{ margin: '0' }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default FunctionalResourceBrowser;
