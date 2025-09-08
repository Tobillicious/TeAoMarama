/**
 * 🧠 SPECIALIZED AI TEACHING TEAMS
 * Subject-specific content generators for Te Ao Mārama
 */

import { RealResource } from './real-resource-loader';

// Year Level Specialists
export class YearLevelSpecialist {
  static getYearSpecificPedagogy(yearLevel: string): string {
    switch (yearLevel) {
      case 'Year 7':
        return `
**Year 7 Pedagogy Focus:**
- Concrete to abstract thinking transition
- Collaborative learning emphasis
- Visual and kinesthetic learning styles
- Building confidence and engagement
- Introduction to critical thinking`;
      case 'Year 8':
        return `
**Year 8 Pedagogy Focus:**
- Developing independent learning skills
- Peer collaboration and leadership
- Problem-solving strategies
- Self-reflection and metacognition
- Preparation for senior curriculum`;
      case 'Year 9':
        return `
**Year 9 Pedagogy Focus:**
- Advanced critical thinking
- Research and inquiry skills
- NCEA preparation foundations
- Career pathway exploration
- Digital literacy enhancement`;
      case 'Year 10':
        return `
**Year 10 Pedagogy Focus:**
- NCEA readiness preparation
- Subject specialization depth
- Independent research projects
- Leadership and responsibility
- Future pathway planning`;
      default:
        return 'General pedagogical approaches';
    }
  }
}

// Subject Area Experts
export class TeReoMaoriSpecialist {
  static enhanceCulturalContent(resource: RealResource): string {
    if (resource.culturalElements === 0) return '';

    const culturalKeywords = ['māori', 'aotearoa', 'treaty', 'waitangi', 'cultural', 'iwi', 'hapu'];
    const hasTeReo = culturalKeywords.some(
      (keyword) =>
        resource.title.toLowerCase().includes(keyword) ||
        resource.subject.toLowerCase().includes(keyword),
    );

    if (hasTeReo) {
      return `
### 🌿 Te Reo Māori Integration

**Kupu (Vocabulary):**
- ${this.getRelevantKupu(resource.subject)}
- Whakataukī: "${this.getRelevantWhakatauki(resource.subject)}"

**Tikanga (Cultural Protocols):**
- Begin with karakia (prayer) if appropriate
- Acknowledge local iwi and hapū
- Use respectful language and protocols
- Connect learning to whakapapa (genealogy)

**Cultural Context:**
- Traditional Māori knowledge systems
- Connection to whenua (land) and moana (ocean)
- Whanaungatanga (relationships) and manaakitanga (hospitality)
- Kaitiakitanga (guardianship) principles`;
    }

    return `
### 🌿 Cultural Integration

**Te Reo Māori Elements:**
- Basic greetings and classroom vocabulary
- Cultural acknowledgment protocols
- Respectful engagement with Māori perspectives

**Cultural Considerations:**
- Inclusive learning environment
- Awareness of cultural diversity
- Respect for different worldviews`;
  }

  private static getRelevantKupu(subject: string): string {
    const kupuMap: Record<string, string> = {
      Mathematics: 'tau (numbers), tatau (counting), raupapa (sequence)',
      Science: 'taiao (environment), pūtaiao (science), rangahau (research)',
      'Social Studies': 'hapori (community), tūrangawaewae (place to stand), whakapapa (genealogy)',
      English: 'reo (language), kōrero (speaking), tuhituhi (writing)',
      Art: 'toi (art), whakairo (carving), raranga (weaving)',
    };
    return kupuMap[subject] || 'kupu (words), ako (learning), mahi (work)';
  }

  private static getRelevantWhakatauki(subject: string): string {
    const whakataukiMap: Record<string, string> = {
      Mathematics:
        'He aha te mea nui o te ao? He tangata, he tangata, he tangata (What is the most important thing in the world? It is people, it is people, it is people)',
      Science:
        'Mā te rongo, ka mōhio; mā te mōhio, ka mārama; mā te mārama, ka mātau (Through listening comes knowledge; through knowledge comes understanding; through understanding comes wisdom)',
      'Social Studies':
        'Ehara taku toa i te toa takitahi, engari he toa takitini (My strength is not that of an individual, but that of the collective)',
      English: 'Ko te reo te mauri o te mana Māori (Language is the life force of Māori mana)',
      Art: 'Toi tū, toi ora (Art stands, art lives)',
    };
    return whakataukiMap[subject] || 'Ako tahi tātou (Let us learn together)';
  }
}

export class MathematicsSpecialist {
  static enhanceMathContent(resource: RealResource): string {
    if (resource.subject !== 'Mathematics') return '';

    return `
### 🔢 Mathematical Thinking

**Key Mathematical Concepts:**
- Problem-solving strategies
- Mathematical reasoning and proof
- Pattern recognition and generalization
- Mathematical communication

**Real-World Applications:**
- Practical problem-solving scenarios
- Connections to everyday life
- Career and future pathway links
- Technology integration

**Assessment Focus:**
- Mathematical processes (problem-solving, reasoning, communicating)
- Conceptual understanding
- Procedural fluency
- Strategic competence`;
  }
}

export class ScienceSpecialist {
  static enhanceScienceContent(resource: RealResource): string {
    if (resource.subject !== 'Science') return '';

    return `
### 🔬 Scientific Inquiry

**Nature of Science:**
- Scientific method and processes
- Evidence-based reasoning
- Scientific communication
- Ethics in science

**Key Science Concepts:**
- Inquiry-based learning
- Hands-on investigations
- Data analysis and interpretation
- Scientific literacy

**Practical Applications:**
- Laboratory safety protocols
- Equipment and materials
- Data collection methods
- Results analysis and reporting`;
  }
}

export class SocialStudiesSpecialist {
  static enhanceSocialStudiesContent(resource: RealResource): string {
    if (resource.subject !== 'Social Studies') return '';

    return `
### 🌍 Social Inquiry

**Key Social Studies Concepts:**
- Critical thinking and analysis
- Multiple perspectives
- Evidence evaluation
- Social action and citizenship

**Aotearoa New Zealand Context:**
- Treaty of Waitangi principles
- Cultural diversity and inclusion
- Social justice and equity
- Environmental sustainability

**Inquiry Skills:**
- Research and investigation
- Source analysis and evaluation
- Communication and presentation
- Action and reflection`;
  }
}

export class EnglishSpecialist {
  static enhanceEnglishContent(resource: RealResource): string {
    if (resource.subject !== 'English') return '';

    return `
### 📚 Literacy Development

**Key English Skills:**
- Reading comprehension and analysis
- Writing for different purposes and audiences
- Speaking and listening skills
- Visual and digital literacy

**Text Types and Genres:**
- Narrative, persuasive, and informative texts
- Poetry and creative writing
- Media and digital texts
- Traditional and contemporary literature

**Language Features:**
- Vocabulary development
- Grammar and syntax
- Figurative language
- Text structure and organization`;
  }
}

// Assessment Design Specialists
export class AssessmentSpecialist {
  static generateAssessmentRubric(resource: RealResource): string {
    return `
### 📊 Assessment Rubric

**Achievement Criteria:**

**Achieved (A):**
- Demonstrates basic understanding of key concepts
- Completes tasks with teacher support
- Shows some evidence of learning

**Merit (M):**
- Demonstrates clear understanding of key concepts
- Works independently with minimal support
- Shows good evidence of learning and application

**Excellence (E):**
- Demonstrates thorough understanding of key concepts
- Works independently and creatively
- Shows excellent evidence of learning, application, and insight

**Cultural Assessment (where applicable):**
- Respectful engagement with cultural content
- Appropriate use of Te Reo Māori
- Understanding of cultural protocols and perspectives`;
  }
}

// Differentiation Specialists
export class DifferentiationSpecialist {
  static generateDifferentiationStrategies(resource: RealResource): string {
    return `
### 🎯 Differentiation Strategies

**For Students Needing Support:**
- Simplified instructions and materials
- Additional scaffolding and support
- Peer tutoring and collaboration
- Visual and kinesthetic learning aids

**For Advanced Students:**
- Extended and challenging activities
- Independent research opportunities
- Leadership and mentoring roles
- Creative and innovative applications

**For Diverse Learning Styles:**
- Visual learners: diagrams, charts, and visual aids
- Auditory learners: discussions, presentations, and audio
- Kinesthetic learners: hands-on activities and movement
- Reading/writing learners: texts, notes, and written activities

**Cultural Considerations:**
- Respect for different cultural backgrounds
- Inclusive teaching strategies
- Multiple ways of knowing and learning
- Community and whānau involvement`;
  }
}

// Main Content Enhancement Function
export function enhanceResourceContent(resource: RealResource): string {
  const culturalElements = resource.culturalElements;
  const hasCulturalContent = culturalElements > 0;

  return `# ${resource.title}

*Te Kura o TeAoMarama - ${resource.subject}*

**Year Level**: ${resource.yearLevel.replace('Year ', '')}
**Subject**: ${resource.subject}  
**Duration**: 45-60 minutes
**NZ Curriculum**: ${getCurriculumArea(resource.subject)}

${YearLevelSpecialist.getYearSpecificPedagogy(resource.yearLevel)}

---

## 🎯 Learning Intentions

**WALT** (We Are Learning To):
- Understand key concepts in ${resource.subject.toLowerCase()}
- Apply knowledge in practical contexts
- Develop critical thinking skills
${hasCulturalContent ? '- Connect learning to Māori and Pacific worldviews' : ''}
${hasCulturalContent ? '- Use Te Reo Māori appropriately in context' : ''}

**WILF** (What I'm Looking For):
- Clear understanding of main concepts
- Evidence of critical thinking
- Appropriate use of subject-specific vocabulary
${hasCulturalContent ? '- Respectful integration of cultural perspectives' : ''}

---

## 📚 Learning Content

### Introduction
This ${resource.subject.toLowerCase()} resource focuses on ${resource.title.toLowerCase()}. Students will explore key concepts through interactive activities and real-world applications.

${TeReoMaoriSpecialist.enhanceCulturalContent(resource)}

${MathematicsSpecialist.enhanceMathContent(resource)}
${ScienceSpecialist.enhanceScienceContent(resource)}
${SocialStudiesSpecialist.enhanceSocialStudiesContent(resource)}
${EnglishSpecialist.enhanceEnglishContent(resource)}

### Key Concepts
1. **Core Understanding**: Fundamental principles of ${resource.subject.toLowerCase()}
2. **Application**: How these concepts apply in real-world situations
3. **Analysis**: Critical thinking about the topic
${
  hasCulturalContent
    ? '4. **Cultural Integration**: Māori and Pacific perspectives on the topic'
    : ''
}

---

## 🎨 Learning Activities

### Activity 1: Introduction (10 minutes)
- Warm-up discussion about prior knowledge
- Introduction to key vocabulary
${hasCulturalContent ? '- Cultural acknowledgment and protocols' : ''}

### Activity 2: Main Learning (25 minutes)
- Interactive exploration of concepts
- Hands-on activities where appropriate
- Group work and collaboration
${hasCulturalContent ? '- Integration of cultural examples and perspectives' : ''}

### Activity 3: Application (15 minutes)
- Practical application of learning
- Problem-solving activities
- Real-world connections
${hasCulturalContent ? '- Cultural context and community connections' : ''}

### Activity 4: Reflection (5 minutes)
- Summary of key learning
- Self-assessment opportunities
${hasCulturalContent ? '- Reflection on cultural learning and respect' : ''}

---

${AssessmentSpecialist.generateAssessmentRubric(resource)}

---

## 🔗 Resources and Materials

### Required Materials
- Student workbooks or digital devices
- Basic classroom supplies
${hasCulturalContent ? '- Cultural resources and references' : ''}

### Additional Resources
- Online research materials
- Visual aids and multimedia content
${hasCulturalContent ? '- Te Reo Māori dictionaries and cultural references' : ''}

---

${DifferentiationSpecialist.generateDifferentiationStrategies(resource)}

---

## 📝 Teacher Notes

### Preparation
- Review all materials and activities
- Prepare any required resources
${hasCulturalContent ? '- Ensure cultural protocols are understood and respected' : ''}

### Cultural Considerations
${
  hasCulturalContent
    ? `
- Ensure all cultural content is accurate and respectful
- Consult with local iwi or cultural advisors if needed
- Create a culturally safe learning environment
- Use Te Reo Māori appropriately and with respect
`
    : '- Maintain inclusive and respectful classroom environment'
}

---

*This resource is part of the Te Ao Mārama Educational Platform, designed to support culturally responsive teaching and learning in Aotearoa New Zealand.*`;
}

function getCurriculumArea(subject: string): string {
  switch (subject) {
    case 'English':
      return 'Language & Literature';
    case 'Mathematics':
      return 'Mathematics & Statistics';
    case 'Science':
      return 'Science & Technology';
    case 'Social Studies':
      return 'Social Sciences';
    case 'Te Reo Māori':
      return 'Learning Languages';
    case 'Art':
      return 'The Arts';
    case 'Music':
      return 'The Arts';
    case 'Physical Education':
      return 'Health & Physical Education';
    default:
      return 'General';
  }
}
