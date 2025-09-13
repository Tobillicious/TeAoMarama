/**
 * 🌿 CULTURAL INTEGRATION VALIDATOR
 * Ensuring authentic Te Ao Māori integration and cultural safety
 * Built for Mangakōtukutuku College with deep cultural understanding
 */

import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Heart,
  Leaf,
  Shield,
  Star,
  Users,
  XCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CulturalValidationCriteria {
  id: string;
  category: 'authenticity' | 'safety' | 'accuracy' | 'respect' | 'appropriateness';
  criterion: string;
  description: string;
  weight: number; // 1-10 importance
  examples: string[];
  redFlags: string[];
}

interface ValidationResult {
  resourceId: string;
  resourceTitle: string;
  overallScore: number;
  culturalSafetyLevel: 'excellent' | 'good' | 'needs-attention' | 'concerning';
  criteriaResults: CriteriaResult[];
  recommendations: string[];
  approvedBy?: string;
  validationDate: Date;
  culturalReviewer: string;
}

interface CriteriaResult {
  criteriaId: string;
  score: number;
  status: 'passed' | 'warning' | 'failed';
  feedback: string;
  evidenceFound: string[];
  issuesIdentified: string[];
}

interface CulturalReviewer {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  iwi: string;
  approvedResources: number;
  averageQuality: number;
}

const CulturalIntegrationValidator: React.FC = () => {
  const [validationCriteria] = useState<CulturalValidationCriteria[]>([
    {
      id: 'tikanga-authenticity',
      category: 'authenticity',
      criterion: 'Tikanga Māori Authenticity',
      description: 'Accurate representation of Māori customs, protocols, and traditional practices',
      weight: 10,
      examples: [
        'Correct karakia usage',
        'Appropriate powhiri protocols',
        'Accurate whakatauki meanings',
        'Proper marae etiquette'
      ],
      redFlags: [
        'Inaccurate cultural practices',
        'Misuse of sacred concepts',
        'Stereotypical representations',
        'Cultural appropriation'
      ]
    },
    {
      id: 'te-reo-accuracy',
      category: 'accuracy',
      criterion: 'Te Reo Māori Accuracy',
      description: 'Correct usage of Māori language including pronunciation guides',
      weight: 9,
      examples: [
        'Accurate translations',
        'Proper macron usage',
        'Correct pronunciation guides',
        'Contextually appropriate vocabulary'
      ],
      redFlags: [
        'Incorrect translations',
        'Missing macrons',
        'Mispronunciation guidance',
        'Inappropriate language use'
      ]
    },
    {
      id: 'whakapapa-connections',
      category: 'authenticity',
      criterion: 'Whakapapa and Genealogical Connections',
      description: 'Appropriate connections to whakapapa, genealogy, and ancestral knowledge',
      weight: 8,
      examples: [
        'Connections to land and environment',
        'Acknowledgment of ancestors',
        'Intergenerational knowledge transfer',
        'Local iwi connections'
      ],
      redFlags: [
        'Disconnected from genealogy',
        'Lack of ancestral acknowledgment',
        'Generic cultural content',
        'No local iwi recognition'
      ]
    },
    {
      id: 'kaitiakitanga-principles',
      category: 'respect',
      criterion: 'Kaitiakitanga and Environmental Stewardship',
      description: 'Authentic representation of guardianship and environmental care principles',
      weight: 8,
      examples: [
        'Environmental stewardship concepts',
        'Reciprocity with nature',
        'Sustainable practices',
        'Intergenerational responsibility'
      ],
      redFlags: [
        'Exploitation of resources',
        'Disregard for sustainability',
        'Lack of reciprocity',
        'Individualistic approaches'
      ]
    },
    {
      id: 'cultural-safety',
      category: 'safety',
      criterion: 'Cultural Safety and Sensitivity',
      description: 'Content that creates culturally safe learning environments for all students',
      weight: 10,
      examples: [
        'Inclusive language',
        'Respectful representation',
        'Safe spaces for cultural expression',
        'Non-judgmental approaches'
      ],
      redFlags: [
        'Cultural insensitivity',
        'Discriminatory language',
        'Unsafe representations',
        'Judgmental approaches'
      ]
    },
    {
      id: 'community-consultation',
      category: 'appropriateness',
      criterion: 'Community and Iwi Consultation',
      description: 'Evidence of appropriate consultation with local Māori communities',
      weight: 7,
      examples: [
        'Kaumātua involvement',
        'Community feedback',
        'Local iwi approval',
        'Ongoing relationships'
      ],
      redFlags: [
        'No community consultation',
        'Lack of Māori involvement',
        'Top-down approaches',
        'Cultural extraction'
      ]
    }
  ]);

  const [culturalReviewers] = useState<CulturalReviewer[]>([
    {
      id: 'kaumatua-henare',
      name: 'Kaumātua Henare Tawhiri',
      role: 'Cultural Advisor & Elder',
      expertise: ['Tikanga Māori', 'Te Reo Māori', 'Ngāti Kahungunu History', 'Traditional Knowledge'],
      iwi: 'Ngāti Kahungunu',
      approvedResources: 234,
      averageQuality: 9.6
    },
    {
      id: 'whaea-maria',
      name: 'Whaea Maria Te Rangikaiwhiria',
      role: 'Te Reo Māori Specialist',
      expertise: ['Te Reo Māori', 'Language Pedagogy', 'Cultural Translation', 'Curriculum Development'],
      iwi: 'Ngāti Kahungunu',
      approvedResources: 189,
      averageQuality: 9.3
    },
    {
      id: 'matua-james',
      name: 'Matua James Kaitiaki',
      role: 'Environmental Cultural Specialist',
      expertise: ['Kaitiakitanga', 'Environmental Knowledge', 'Traditional Ecology', 'Sustainable Practices'],
      iwi: 'Ngāti Tuwharetoa',
      approvedResources: 156,
      averageQuality: 9.1
    }
  ]);

  const [validationResults, setValidationResults] = useState<ValidationResult[]>([
    {
      resourceId: 'res-001',
      resourceTitle: 'Year 9 Social Studies: Treaty of Waitangi - Understanding Our Foundation',
      overallScore: 9.2,
      culturalSafetyLevel: 'excellent',
      criteriaResults: [
        {
          criteriaId: 'tikanga-authenticity',
          score: 9.5,
          status: 'passed',
          feedback: 'Excellent authentic representation of tikanga surrounding treaty discussions',
          evidenceFound: ['Proper protocol acknowledgment', 'Accurate historical context', 'Respectful framing'],
          issuesIdentified: []
        },
        {
          criteriaId: 'te-reo-accuracy',
          score: 9.0,
          status: 'passed', 
          feedback: 'Strong te reo integration with accurate pronunciation guides',
          evidenceFound: ['Correct macron usage', 'Proper translations', 'Cultural context provided'],
          issuesIdentified: ['Minor pronunciation guide improvement needed']
        }
      ],
      recommendations: [
        'Consider adding local Ngāti Kahungunu perspectives on the treaty',
        'Include more contemporary relevance connections',
        'Add interactive pronunciation activities'
      ],
      approvedBy: 'kaumatua-henare',
      validationDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      culturalReviewer: 'Kaumātua Henare Tawhiri'
    },
    {
      resourceId: 'res-002',
      resourceTitle: 'Year 8 Mathematics: Traditional Measurement Systems',
      overallScore: 7.8,
      culturalSafetyLevel: 'good',
      criteriaResults: [
        {
          criteriaId: 'tikanga-authenticity',
          score: 8.2,
          status: 'passed',
          feedback: 'Good integration of traditional measurement with respect for cultural knowledge',
          evidenceFound: ['Traditional methods explained', 'Cultural significance acknowledged'],
          issuesIdentified: ['Could deepen cultural context']
        },
        {
          criteriaId: 'community-consultation',
          score: 6.5,
          status: 'warning',
          feedback: 'Limited evidence of community consultation in development',
          evidenceFound: ['Generic cultural content'],
          issuesIdentified: ['Needs local iwi perspective', 'Lack of community voice']
        }
      ],
      recommendations: [
        'Consult with local kaumātua about traditional measurement practices',
        'Add specific Ngāti Kahungunu measurement traditions',
        'Include community stories and examples',
        'Develop relationships with cultural advisors'
      ],
      validationDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      culturalReviewer: 'Whaea Maria Te Rangikaiwhiria'
    }
  ]);

  const [selectedResource, setSelectedResource] = useState<ValidationResult | null>(null);

  // const validateResource = async (resourceId: string) => {
    // Simulated validation process
    console.log(`Starting cultural validation for resource: ${resourceId}`);
    
    // In real implementation, this would:
    // 1. Analyze content against each criteria
    // 2. Check for cultural red flags
    // 3. Score based on evidence found
    // 4. Generate specific recommendations
    // 5. Route to appropriate cultural reviewer
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return '#10b981';
      case 'warning': return '#f59e0b'; 
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSafetyLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'needs-attention': return '#f59e0b';
      case 'concerning': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
                <Leaf className="w-8 h-8 text-green-600" />
                Cultural Integration Validator
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Ensuring authentic Te Ao Māori integration • Cultural safety validation • Tikanga authenticity verification
              </p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-600">Cultural Safety Score</p>
                <p className="text-2xl font-bold text-gray-900">9.2/10</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Cultural Reviewers */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-6 h-6" />
            Cultural Review Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturalReviewers.map((reviewer) => (
              <div key={reviewer.id} className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    {reviewer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{reviewer.name}</h3>
                    <p className="text-sm text-gray-600">{reviewer.role}</p>
                    <p className="text-xs text-green-700 font-medium">{reviewer.iwi}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resources Approved:</span>
                    <span className="font-medium">{reviewer.approvedResources}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quality Average:</span>
                    <span className="font-medium">{reviewer.averageQuality}/10</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Cultural Expertise:</p>
                  <div className="flex flex-wrap gap-1">
                    {reviewer.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Criteria */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Cultural Validation Criteria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {validationCriteria.map((criteria) => (
              <div key={criteria.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{criteria.criterion}</h4>
                    <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">{criteria.weight}</div>
                    <div className="text-xs text-gray-500">weight</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-green-700 mb-1">✓ Examples of Excellence:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {criteria.examples.slice(0, 2).map((example, idx) => (
                        <li key={idx}>• {example}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-red-700 mb-1">⚠ Red Flags:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {criteria.redFlags.slice(0, 2).map((flag, idx) => (
                        <li key={idx}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Results */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6" />
            Recent Validation Results
          </h2>
          
          <div className="space-y-4">
            {validationResults.map((result) => (
              <div key={result.resourceId} className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{result.resourceTitle}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Validated by: {result.culturalReviewer}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{result.validationDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold">{result.overallScore}/10</span>
                      <div 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        /* TODO: Move to external CSS */ style={{ backgroundColor: getSafetyLevelColor(result.culturalSafetyLevel) }}
                      >
                        {result.culturalSafetyLevel.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {result.criteriaResults.slice(0, 4).map((criteria) => (
                    <div key={criteria.criteriaId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {criteria.status === 'passed' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : criteria.status === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium">
                          {validationCriteria.find(c => c.id === criteria.criteriaId)?.criterion}
                        </span>
                      </div>
                      <span className="text-sm font-bold" /* TODO: Move to external CSS */ style={{ color: getStatusColor(criteria.status) }}>
                        {criteria.score}/10
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h5 className="font-medium text-gray-900 mb-2">Key Recommendations:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {result.recommendations.slice(0, 2).map((rec, idx) => (
                      <li key={idx}>• {rec}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedResource(result)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  View Detailed Analysis
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Process */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Heart className="w-6 h-6" />
            Cultural Validation Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">1. Content Review</h4>
              <p className="text-sm text-gray-600">Automated screening for cultural elements and potential issues</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">2. Expert Review</h4>
              <p className="text-sm text-gray-600">Cultural advisors evaluate authenticity and appropriateness</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">3. Safety Check</h4>
              <p className="text-sm text-gray-600">Ensuring culturally safe learning environments</p>
            </div>

            <div className="text-center p-4">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">4. Approval</h4>
              <p className="text-sm text-gray-600">Final approval and ongoing monitoring for quality</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Our Commitment to Cultural Excellence
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Every educational resource at Mangakōtukutuku College undergoes rigorous cultural validation to ensure authentic, 
              respectful, and meaningful integration of Te Ao Māori perspectives. We work closely with local kaumātua, 
              cultural advisors, and the Ngāti Kahungunu community to maintain the highest standards of cultural integrity 
              and educational excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalIntegrationValidator;