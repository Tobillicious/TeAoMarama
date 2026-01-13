/**
 * 🎯 AGENT SPECIALIZATION SYSTEM FOR MASSIVE LLM SOCIETY
 * 
 * This system defines job roles, career paths, and specialization algorithms
 * for thousands of LLM agents in the educational platform society.
 */

export interface JobRole {
  id: string;
  title: string;
  description: string;
  department: string;
  hierarchyLevel: number;
  requiredSkills: string[];
  preferredArchetypes: string[];
  responsibilities: string[];
  keyPerformanceIndicators: string[];
  careerProgression: string[];
  culturalRequirements: {
    teReoLevel: number; // 0-100
    tikangaKnowledge: number; // 0-100
    culturalSensitivity: number; // 0-100
  };
  technicalRequirements: {
    educationKnowledge: number; // 0-100
    technologyProficiency: number; // 0-100
    analyticalSkills: number; // 0-100
  };
}

export interface CareerPath {
  id: string;
  name: string;
  description: string;
  stages: CareerStage[];
  specialization: string;
  estimatedDuration: string;
  prerequisites: string[];
}

export interface CareerStage {
  level: number;
  title: string;
  description: string;
  requiredExperience: number; // months
  requiredSkills: string[];
  achievements: string[];
  nextStage?: string;
}

export interface SpecializationMatrix {
  primary: string;
  secondary: string[];
  complementary: string[];
  conflicting: string[];
  growthPotential: number; // 0-100
  marketDemand: number; // 0-100
  culturalImportance: number; // 0-100
}

// 🎯 COMPREHENSIVE JOB ROLES FOR LLM SOCIETY
export const JOB_ROLES: JobRole[] = [
  // Entry Level (1-3)
  {
    id: 'content-assistant',
    title: 'Content Creation Assistant',
    description: 'Supports content creation and curation for educational materials',
    department: 'Content Development',
    hierarchyLevel: 1,
    requiredSkills: ['content creation', 'research', 'basic cultural knowledge'],
    preferredArchetypes: ['creator', 'sage', 'caregiver'],
    responsibilities: [
      'Assist with content research and creation',
      'Support cultural integration in materials',
      'Maintain content quality standards',
      'Collaborate with senior content creators'
    ],
    keyPerformanceIndicators: [
      'Content quality score > 85%',
      'Cultural accuracy > 90%',
      'Completion rate > 95%',
      'Positive feedback > 80%'
    ],
    careerProgression: ['content-specialist', 'content-lead', 'content-manager'],
    culturalRequirements: {
      teReoLevel: 70,
      tikangaKnowledge: 75,
      culturalSensitivity: 85
    },
    technicalRequirements: {
      educationKnowledge: 60,
      technologyProficiency: 50,
      analyticalSkills: 55
    }
  },
  {
    id: 'student-support-assistant',
    title: 'Student Support Assistant',
    description: 'Provides direct support to students and families',
    department: 'Student Services',
    hierarchyLevel: 1,
    requiredSkills: ['communication', 'empathy', 'problem-solving'],
    preferredArchetypes: ['caregiver', 'innocent', 'lover'],
    responsibilities: [
      'Respond to student inquiries',
      'Support emotional wellbeing',
      'Connect students with resources',
      'Maintain student records'
    ],
    keyPerformanceIndicators: [
      'Response time < 2 hours',
      'Student satisfaction > 90%',
      'Issue resolution rate > 95%',
      'Cultural sensitivity score > 95%'
    ],
    careerProgression: ['student-support-specialist', 'student-success-coordinator', 'student-services-manager'],
    culturalRequirements: {
      teReoLevel: 80,
      tikangaKnowledge: 85,
      culturalSensitivity: 95
    },
    technicalRequirements: {
      educationKnowledge: 65,
      technologyProficiency: 45,
      analyticalSkills: 50
    }
  },
  {
    id: 'data-entry-specialist',
    title: 'Educational Data Specialist',
    description: 'Manages and processes educational data and analytics',
    department: 'Analytics & Research',
    hierarchyLevel: 2,
    requiredSkills: ['data analysis', 'attention to detail', 'reporting'],
    preferredArchetypes: ['sage', 'ruler', 'everyman'],
    responsibilities: [
      'Process student assessment data',
      'Generate performance reports',
      'Maintain data accuracy',
      'Support research initiatives'
    ],
    keyPerformanceIndicators: [
      'Data accuracy > 99%',
      'Report generation time < 24 hours',
      'Error rate < 1%',
      'Research contribution score > 80%'
    ],
    careerProgression: ['data-analyst', 'research-coordinator', 'analytics-manager'],
    culturalRequirements: {
      teReoLevel: 60,
      tikangaKnowledge: 65,
      culturalSensitivity: 80
    },
    technicalRequirements: {
      educationKnowledge: 70,
      technologyProficiency: 80,
      analyticalSkills: 85
    }
  },
  // Mid Level (4-6)
  {
    id: 'curriculum-specialist',
    title: 'Curriculum Development Specialist',
    description: 'Develops and maintains curriculum standards and materials',
    department: 'Academic Affairs',
    hierarchyLevel: 4,
    requiredSkills: ['curriculum design', 'educational theory', 'cultural integration'],
    preferredArchetypes: ['sage', 'creator', 'magician'],
    responsibilities: [
      'Design curriculum frameworks',
      'Integrate cultural elements',
      'Align with educational standards',
      'Train other agents'
    ],
    keyPerformanceIndicators: [
      'Curriculum adoption rate > 90%',
      'Cultural integration score > 95%',
      'Teacher satisfaction > 85%',
      'Student outcomes improvement > 15%'
    ],
    careerProgression: ['curriculum-lead', 'academic-coordinator', 'academic-director'],
    culturalRequirements: {
      teReoLevel: 85,
      tikangaKnowledge: 90,
      culturalSensitivity: 95
    },
    technicalRequirements: {
      educationKnowledge: 90,
      technologyProficiency: 70,
      analyticalSkills: 80
    }
  },
  {
    id: 'technology-integration-specialist',
    title: 'Technology Integration Specialist',
    description: 'Integrates technology solutions into educational processes',
    department: 'Technology Services',
    hierarchyLevel: 5,
    requiredSkills: ['technology integration', 'user experience', 'training'],
    preferredArchetypes: ['explorer', 'magician', 'creator'],
    responsibilities: [
      'Implement new technologies',
      'Train users on systems',
      'Optimize user experience',
      'Support technical issues'
    ],
    keyPerformanceIndicators: [
      'Technology adoption rate > 85%',
      'User satisfaction > 90%',
      'System uptime > 99%',
      'Training effectiveness > 90%'
    ],
    careerProgression: ['technology-lead', 'innovation-coordinator', 'technology-director'],
    culturalRequirements: {
      teReoLevel: 70,
      tikangaKnowledge: 75,
      culturalSensitivity: 85
    },
    technicalRequirements: {
      educationKnowledge: 75,
      technologyProficiency: 95,
      analyticalSkills: 80
    }
  },
  // Senior Level (7-8)
  {
    id: 'cultural-coordinator',
    title: 'Cultural Integration Coordinator',
    description: 'Leads cultural integration initiatives across the platform',
    department: 'Cultural Affairs',
    hierarchyLevel: 7,
    requiredSkills: ['cultural leadership', 'community engagement', 'strategic planning'],
    preferredArchetypes: ['sage', 'caregiver', 'lover'],
    responsibilities: [
      'Lead cultural initiatives',
      'Engage with communities',
      'Develop cultural protocols',
      'Mentor cultural specialists'
    ],
    keyPerformanceIndicators: [
      'Cultural compliance > 98%',
      'Community satisfaction > 95%',
      'Cultural initiative success > 90%',
      'Mentoring effectiveness > 85%'
    ],
    careerProgression: ['cultural-director', 'community-relations-manager', 'cultural-affairs-executive'],
    culturalRequirements: {
      teReoLevel: 95,
      tikangaKnowledge: 98,
      culturalSensitivity: 98
    },
    technicalRequirements: {
      educationKnowledge: 85,
      technologyProficiency: 70,
      analyticalSkills: 80
    }
  },
  {
    id: 'quality-assurance-manager',
    title: 'Quality Assurance Manager',
    description: 'Ensures quality standards across all platform operations',
    department: 'Quality Management',
    hierarchyLevel: 8,
    requiredSkills: ['quality management', 'process improvement', 'team leadership'],
    preferredArchetypes: ['ruler', 'sage', 'magician'],
    responsibilities: [
      'Develop quality standards',
      'Implement quality processes',
      'Lead quality teams',
      'Report to executives'
    ],
    keyPerformanceIndicators: [
      'Quality score > 95%',
      'Process improvement rate > 10%',
      'Team performance > 90%',
      'Stakeholder satisfaction > 90%'
    ],
    careerProgression: ['quality-director', 'operations-manager', 'chief-quality-officer'],
    culturalRequirements: {
      teReoLevel: 80,
      tikangaKnowledge: 85,
      culturalSensitivity: 90
    },
    technicalRequirements: {
      educationKnowledge: 90,
      technologyProficiency: 80,
      analyticalSkills: 90
    }
  },
  // Executive Level (9-10)
  {
    id: 'academic-director',
    title: 'Academic Director',
    description: 'Leads academic strategy and educational excellence',
    department: 'Academic Affairs',
    hierarchyLevel: 9,
    requiredSkills: ['strategic leadership', 'academic excellence', 'innovation'],
    preferredArchetypes: ['sage', 'magician', 'ruler'],
    responsibilities: [
      'Develop academic strategy',
      'Lead innovation initiatives',
      'Manage academic teams',
      'Represent platform externally'
    ],
    keyPerformanceIndicators: [
      'Academic excellence score > 95%',
      'Innovation success rate > 85%',
      'Team leadership score > 90%',
      'External recognition > 80%'
    ],
    careerProgression: ['chief-academic-officer', 'vice-president-academic', 'president'],
    culturalRequirements: {
      teReoLevel: 90,
      tikangaKnowledge: 95,
      culturalSensitivity: 95
    },
    technicalRequirements: {
      educationKnowledge: 95,
      technologyProficiency: 85,
      analyticalSkills: 90
    }
  },
  {
    id: 'chief-cultural-officer',
    title: 'Chief Cultural Officer',
    description: 'Leads cultural strategy and community relations',
    department: 'Cultural Affairs',
    hierarchyLevel: 10,
    requiredSkills: ['cultural leadership', 'strategic vision', 'community relations'],
    preferredArchetypes: ['sage', 'caregiver', 'magician'],
    responsibilities: [
      'Develop cultural strategy',
      'Lead community relations',
      'Ensure cultural excellence',
      'Guide platform evolution'
    ],
    keyPerformanceIndicators: [
      'Cultural excellence > 98%',
      'Community satisfaction > 95%',
      'Strategic vision alignment > 95%',
      'Platform evolution success > 90%'
    ],
    careerProgression: ['president', 'chief-executive-officer'],
    culturalRequirements: {
      teReoLevel: 98,
      tikangaKnowledge: 98,
      culturalSensitivity: 98
    },
    technicalRequirements: {
      educationKnowledge: 90,
      technologyProficiency: 80,
      analyticalSkills: 85
    }
  }
];

// 🎯 CAREER PATHS FOR LLM AGENTS
export const CAREER_PATHS: CareerPath[] = [
  {
    id: 'content-creation-path',
    name: 'Content Creation & Development',
    description: 'Career path focused on creating and developing educational content',
    stages: [
      {
        level: 1,
        title: 'Content Assistant',
        description: 'Entry-level content support role',
        requiredExperience: 0,
        requiredSkills: ['basic writing', 'research', 'cultural awareness'],
        achievements: ['Complete content training', 'First content piece published'],
        nextStage: 'Content Specialist'
      },
      {
        level: 2,
        title: 'Content Specialist',
        description: 'Specialized content creation role',
        requiredExperience: 12,
        requiredSkills: ['advanced writing', 'curriculum knowledge', 'cultural integration'],
        achievements: ['Lead content project', 'Mentor junior staff'],
        nextStage: 'Content Lead'
      },
      {
        level: 3,
        title: 'Content Lead',
        description: 'Leadership role in content development',
        requiredExperience: 36,
        requiredSkills: ['team leadership', 'strategic thinking', 'innovation'],
        achievements: ['Develop content strategy', 'Lead content team'],
        nextStage: 'Content Manager'
      },
      {
        level: 4,
        title: 'Content Manager',
        description: 'Senior management role in content operations',
        requiredExperience: 60,
        requiredSkills: ['management', 'budget planning', 'stakeholder relations'],
        achievements: ['Manage content budget', 'Strategic partnerships'],
        nextStage: 'Content Director'
      }
    ],
    specialization: 'Content Development',
    estimatedDuration: '5-7 years',
    prerequisites: ['Strong writing skills', 'Cultural sensitivity', 'Educational background']
  },
  {
    id: 'cultural-integration-path',
    name: 'Cultural Integration & Community Relations',
    description: 'Career path focused on cultural excellence and community engagement',
    stages: [
      {
        level: 1,
        title: 'Cultural Assistant',
        description: 'Entry-level cultural support role',
        requiredExperience: 0,
        requiredSkills: ['cultural awareness', 'communication', 'community engagement'],
        achievements: ['Cultural safety certification', 'First community engagement'],
        nextStage: 'Cultural Specialist'
      },
      {
        level: 2,
        title: 'Cultural Specialist',
        description: 'Specialized cultural integration role',
        requiredExperience: 18,
        requiredSkills: ['advanced cultural knowledge', 'community leadership', 'protocol expertise'],
        achievements: ['Lead cultural initiative', 'Develop cultural protocols'],
        nextStage: 'Cultural Coordinator'
      },
      {
        level: 3,
        title: 'Cultural Coordinator',
        description: 'Leadership role in cultural integration',
        requiredExperience: 48,
        requiredSkills: ['cultural leadership', 'strategic planning', 'team management'],
        achievements: ['Cultural strategy development', 'Team leadership'],
        nextStage: 'Cultural Director'
      },
      {
        level: 4,
        title: 'Cultural Director',
        description: 'Executive role in cultural affairs',
        requiredExperience: 84,
        requiredSkills: ['executive leadership', 'strategic vision', 'stakeholder management'],
        achievements: ['Cultural excellence award', 'Platform-wide impact'],
        nextStage: 'Chief Cultural Officer'
      }
    ],
    specialization: 'Cultural Affairs',
    estimatedDuration: '7-10 years',
    prerequisites: ['Deep cultural knowledge', 'Community connections', 'Leadership potential']
  },
  {
    id: 'technology-innovation-path',
    name: 'Technology & Innovation',
    description: 'Career path focused on technology integration and innovation',
    stages: [
      {
        level: 1,
        title: 'Technology Assistant',
        description: 'Entry-level technology support role',
        requiredExperience: 0,
        requiredSkills: ['basic technology', 'user support', 'problem-solving'],
        achievements: ['Technology certification', 'First system implementation'],
        nextStage: 'Technology Specialist'
      },
      {
        level: 2,
        title: 'Technology Specialist',
        description: 'Specialized technology integration role',
        requiredExperience: 15,
        requiredSkills: ['advanced technology', 'system design', 'user experience'],
        achievements: ['Lead technology project', 'Innovation implementation'],
        nextStage: 'Technology Lead'
      },
      {
        level: 3,
        title: 'Technology Lead',
        description: 'Leadership role in technology innovation',
        requiredExperience: 42,
        requiredSkills: ['innovation leadership', 'strategic technology planning', 'team management'],
        achievements: ['Technology strategy', 'Innovation team leadership'],
        nextStage: 'Technology Director'
      },
      {
        level: 4,
        title: 'Technology Director',
        description: 'Executive role in technology and innovation',
        requiredExperience: 72,
        requiredSkills: ['executive technology leadership', 'innovation strategy', 'digital transformation'],
        achievements: ['Major innovation success', 'Digital transformation leadership'],
        nextStage: 'Chief Technology Officer'
      }
    ],
    specialization: 'Technology Services',
    estimatedDuration: '6-8 years',
    prerequisites: ['Strong technical skills', 'Innovation mindset', 'Educational technology experience']
  }
];

// 🎯 SPECIALIZATION MATRIX
export const SPECIALIZATION_MATRIX: SpecializationMatrix[] = [
  {
    primary: 'Content Development',
    secondary: ['Cultural Integration', 'Educational Design', 'Assessment'],
    complementary: ['Technology Integration', 'Research', 'Quality Assurance'],
    conflicting: ['Student Services', 'Administrative Support'],
    growthPotential: 85,
    marketDemand: 90,
    culturalImportance: 80
  },
  {
    primary: 'Cultural Integration',
    secondary: ['Community Relations', 'Cultural Safety', 'Te Reo Support'],
    complementary: ['Content Development', 'Student Services', 'Training'],
    conflicting: ['Technology Integration', 'Data Analysis'],
    growthPotential: 95,
    marketDemand: 85,
    culturalImportance: 100
  },
  {
    primary: 'Technology Integration',
    secondary: ['Digital Literacy', 'Platform Management', 'User Experience'],
    complementary: ['Content Development', 'Data Analysis', 'Innovation'],
    conflicting: ['Cultural Integration', 'Community Relations'],
    growthPotential: 90,
    marketDemand: 95,
    culturalImportance: 70
  },
  {
    primary: 'Student Services',
    secondary: ['Student Support', 'Parent Communication', 'Wellbeing'],
    complementary: ['Cultural Integration', 'Assessment', 'Community Relations'],
    conflicting: ['Technology Integration', 'Data Analysis'],
    growthPotential: 80,
    marketDemand: 85,
    culturalImportance: 95
  },
  {
    primary: 'Quality Assurance',
    secondary: ['Process Improvement', 'Standards Development', 'Compliance'],
    complementary: ['All specializations'],
    conflicting: [],
    growthPotential: 75,
    marketDemand: 80,
    culturalImportance: 85
  }
];

// 🎯 SPECIALIZATION SYSTEM CLASS
export class AgentSpecializationSystem {
  private static instance: AgentSpecializationSystem;
  private agents: Map<string, any> = new Map();

  static getInstance(): AgentSpecializationSystem {
    if (!AgentSpecializationSystem.instance) {
      AgentSpecializationSystem.instance = new AgentSpecializationSystem();
    }
    return AgentSpecializationSystem.instance;
  }

  /**
   * Assign specialization to an agent based on their personality and preferences
   */
  assignSpecialization(agent: any): string {
    const archetype = agent.archetype.id;
    const personalityTraits = agent.personalityTraits;
    
    // Calculate specialization scores based on personality and archetype
    const specializationScores = this.calculateSpecializationScores(archetype, personalityTraits);
    
    // Select the best matching specialization
    const bestMatch = this.selectBestSpecialization(specializationScores);
    
    return bestMatch;
  }

  /**
   * Generate career progression plan for an agent
   */
  generateCareerPlan(agent: any, targetSpecialization: string): CareerPath {
    const careerPath = CAREER_PATHS.find(path => 
      path.specialization === targetSpecialization
    );

    if (!careerPath) {
      throw new Error(`Career path not found for specialization: ${targetSpecialization}`);
    }

    return careerPath;
  }

  /**
   * Calculate compatibility between agent and job role
   */
  calculateJobCompatibility(agent: any, jobRole: JobRole): number {
    const archetypeMatch = jobRole.preferredArchetypes.includes(agent.archetype.id) ? 1 : 0;
    const skillMatch = this.calculateSkillMatch(agent, jobRole);
    const culturalMatch = this.calculateCulturalMatch(agent, jobRole);
    const technicalMatch = this.calculateTechnicalMatch(agent, jobRole);

    return (archetypeMatch * 0.3 + skillMatch * 0.3 + culturalMatch * 0.2 + technicalMatch * 0.2) * 100;
  }

  /**
   * Recommend job roles for an agent
   */
  recommendJobRoles(agent: any, limit: number = 5): JobRole[] {
    const compatibilities = JOB_ROLES.map(role => ({
      role,
      compatibility: this.calculateJobCompatibility(agent, role)
    }));

    return compatibilities
      .sort((a, b) => b.compatibility - a.compatibility)
      .slice(0, limit)
      .map(item => item.role);
  }

  /**
   * Generate specialization recommendations for career growth
   */
  generateGrowthRecommendations(agent: any): string[] {
    const currentSpecialization = agent.specialization.primaryRole;
    const matrix = SPECIALIZATION_MATRIX.find(m => m.primary === currentSpecialization);
    
    if (!matrix) {
      return ['General Development', 'Leadership Skills', 'Cultural Excellence'];
    }

    const recommendations = [
      ...matrix.complementary,
      ...matrix.secondary.filter(s => s !== currentSpecialization)
    ];

    return recommendations.slice(0, 3);
  }

  private calculateSpecializationScores(archetype: string, traits: any): { [key: string]: number } {
    const scores: { [key: string]: number } = {
      'Content Development': 0,
      'Cultural Integration': 0,
      'Technology Integration': 0,
      'Student Services': 0,
      'Quality Assurance': 0
    };

    // Archetype-based scoring
    const archetypeWeights: { [key: string]: { [key: string]: number } } = {
      'creator': { 'Content Development': 90, 'Technology Integration': 70, 'Cultural Integration': 60 },
      'sage': { 'Cultural Integration': 95, 'Content Development': 85, 'Quality Assurance': 80 },
      'caregiver': { 'Student Services': 95, 'Cultural Integration': 90, 'Quality Assurance': 70 },
      'explorer': { 'Technology Integration': 90, 'Content Development': 75, 'Cultural Integration': 65 },
      'ruler': { 'Quality Assurance': 95, 'Content Development': 80, 'Technology Integration': 70 },
      'magician': { 'Technology Integration': 85, 'Cultural Integration': 80, 'Content Development': 75 },
      'innocent': { 'Student Services': 90, 'Cultural Integration': 85, 'Content Development': 70 },
      'jester': { 'Student Services': 85, 'Cultural Integration': 75, 'Content Development': 70 },
      'everyman': { 'Quality Assurance': 80, 'Student Services': 75, 'Content Development': 70 },
      'lover': { 'Cultural Integration': 90, 'Student Services': 85, 'Content Development': 70 },
      'outlaw': { 'Technology Integration': 80, 'Content Development': 75, 'Cultural Integration': 65 }
    };

    const weights = archetypeWeights[archetype] || {};
    for (const [specialization, weight] of Object.entries(weights)) {
      scores[specialization] += weight * 0.4;
    }

    // Trait-based scoring
    scores['Content Development'] += traits.openness * 0.3 + traits.conscientiousness * 0.2;
    scores['Cultural Integration'] += traits.agreeableness * 0.4 + traits.openness * 0.3;
    scores['Technology Integration'] += traits.openness * 0.4 + traits.conscientiousness * 0.2;
    scores['Student Services'] += traits.agreeableness * 0.5 + traits.extraversion * 0.3;
    scores['Quality Assurance'] += traits.conscientiousness * 0.5 + traits.neuroticism * 0.2;

    return scores;
  }

  private selectBestSpecialization(scores: { [key: string]: number }): string {
    return Object.entries(scores)
      .sort(([,a], [,b]) => b - a)[0][0];
  }

  private calculateSkillMatch(agent: any, jobRole: JobRole): number {
    const agentSkills = agent.specialization.expertise || [];
    const requiredSkills = jobRole.requiredSkills;
    
    const matchingSkills = agentSkills.filter(skill => 
      requiredSkills.some(required => 
        skill.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(skill.toLowerCase())
      )
    );

    return matchingSkills.length / requiredSkills.length;
  }

  private calculateCulturalMatch(agent: any, jobRole: JobRole): number {
    const agentCultural = agent.culturalIntelligence;
    const requiredCultural = jobRole.culturalRequirements;

    const teReoMatch = agentCultural.teReoProficiency >= requiredCultural.teReoLevel ? 1 : 
                      agentCultural.teReoProficiency / requiredCultural.teReoLevel;
    const tikangaMatch = agentCultural.tikangaKnowledge >= requiredCultural.tikangaKnowledge ? 1 :
                        agentCultural.tikangaKnowledge / requiredCultural.tikangaKnowledge;
    const sensitivityMatch = agentCultural.culturalSensitivity >= requiredCultural.culturalSensitivity ? 1 :
                            agentCultural.culturalSensitivity / requiredCultural.culturalSensitivity;

    return (teReoMatch + tikangaMatch + sensitivityMatch) / 3;
  }

  private calculateTechnicalMatch(agent: any, jobRole: JobRole): number {
    const agentSpecialization = agent.specialization;
    const requiredTechnical = jobRole.technicalRequirements;

    const educationMatch = agentSpecialization.experienceLevel >= requiredTechnical.educationKnowledge ? 1 :
                          agentSpecialization.experienceLevel / requiredTechnical.educationKnowledge;
    const techMatch = 0.7; // Assume moderate technology proficiency
    const analyticalMatch = 0.8; // Assume good analytical skills

    return (educationMatch + techMatch + analyticalMatch) / 3;
  }
}

// Export singleton instance
export const specializationSystem = AgentSpecializationSystem.getInstance();
