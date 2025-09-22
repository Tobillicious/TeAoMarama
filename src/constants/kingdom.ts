// 👑 KINGDOM CONSTANTS
// Te Kura o TeAoMarama - Application Constants

export const KINGDOM_CONFIG = {
  name: 'Te Kura o TeAoMarama',
  overseer: 'King Aronui',
  mission: 'Transform education for ākonga of Mangakootukutuku College',
  culturalPrinciples: [
    'Whakawhanaungatanga',
    'Kaitiakitanga', 
    'Manaakitanga',
    'Rangatiratanga',
    'Wairuatanga'
  ],
  nzcLevels: [1, 2, 3, 4, 5, 6, 7, 8],
  subjects: [
    'Mathematics',
    'English', 
    'Science',
    'Social Studies',
    'Te Reo Māori',
    'Art',
    'Music',
    'Physical Education',
    'Technology',
    'Health'
  ],
  subscriptionTiers: {
    free: { price: 0, features: ['basic'] },
    starter: { price: 29, features: ['basic', 'premium'] },
    professional: { price: 49, features: ['basic', 'premium', 'analytics'] },
    school: { price: 199, features: ['all', 'multi-user'] },
    enterprise: { price: 499, features: ['all', 'custom', 'support'] }
  }
} as const;

export const AI_AGENTS = {
  supremeOverseer: 'King Aronui',
  culturalKaitiaki: 'Kaitiaki Mahara',
  contentGenerator: 'Content-Kōkako',
  analyticsEngine: 'Analytics-Tūī',
  securityGuardian: 'Security-Kaitiaki'
} as const;

export const API_ENDPOINTS = {
  base: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
  auth: '/api/auth',
  lessons: '/api/lessons',
  teachers: '/api/teachers',
  students: '/api/students',
  analytics: '/api/analytics',
  revenue: '/api/revenue'
} as const;

export const CULTURAL_SAFETY_THRESHOLDS = {
  minimum: 7,
  good: 8,
  excellent: 9,
  perfect: 10
} as const;

export const PERFORMANCE_TARGETS = {
  lighthouse: {
    performance: 90,
    accessibility: 95,
    bestPractices: 95,
    seo: 95
  },
  revenue: {
    monthly: 100000,
    subscribers: 5000,
    conversion: 12
  },
  content: {
    lessons: 10000,
    culturalElements: 95,
    nzcAlignment: 100
  }
} as const;
