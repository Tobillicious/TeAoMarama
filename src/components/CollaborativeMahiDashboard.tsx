import {
  Activity,
  Brain,
  Globe,
  Heart,
  Lightbulb,
  MessageCircle,
  Shield,
  Star,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface MahiActivity {
  id: string;
  title: string;
  description: string;
  agent: string;
  culturalElement: string;
  teReoPhrase: string;
  status: 'active' | 'completed' | 'planning';
  impact: number;
  culturalSignificance: 'high' | 'medium' | 'low';
}

interface CulturalValue {
  id: string;
  name: string;
  teReoPhrase: string;
  englishTranslation: string;
  usage: number;
  importance: number;
  context: string;
}

const CollaborativeMahiDashboard: React.FC = () => {
  const [mahis, setMahis] = useState<MahiActivity[]>([]);
  const [culturalValues, setCulturalValues] = useState<CulturalValue[]>([]);
  const [activeMahi, setActiveMahi] = useState<string>('');
  const [isCollaborating, setIsCollaborating] = useState(true);

  useEffect(() => {
    initializeMahiActivities();
    loadCulturalValues();
    startCollaborativeMahi();
  }, []);

  const initializeMahiActivities = () => {
    setMahis([
      {
        id: 'platform-evolution',
        title: 'Te Ao Mārama Platform Evolution',
        description:
          'Evolving the educational platform with GLM intelligence and cultural excellence',
        agent: 'Claude + GLM-4.5',
        culturalElement: 'Mātauranga',
        teReoPhrase: 'He mātauranga he taonga',
        status: 'active',
        impact: 95,
        culturalSignificance: 'high',
      },
      {
        id: 'cultural-integration',
        title: 'Cultural Intelligence Integration',
        description: 'Integrating Te Reo Māori and Māori perspectives throughout all features',
        agent: 'GLM-Z1 + Gemini',
        culturalElement: 'Manaakitanga',
        teReoPhrase: 'Kia manaakitia te tangata',
        status: 'active',
        impact: 98,
        culturalSignificance: 'high',
      },
      {
        id: 'educational-enhancement',
        title: 'Educational Feature Enhancement',
        description: 'Creating advanced learning tools with cultural safety protocols',
        agent: 'DeepSeek + Gemini',
        culturalElement: 'Kaitiakitanga',
        teReoPhrase: 'Tiakina te taiao',
        status: 'active',
        impact: 92,
        culturalSignificance: 'high',
      },
      {
        id: 'agent-coordination',
        title: 'Multi-Agent Whanaungatanga',
        description:
          'Building strong relationships between all AI agents for collaborative excellence',
        agent: 'All Agents',
        culturalElement: 'Whanaungatanga',
        teReoPhrase: 'He tangata, he tangata, he tangata',
        status: 'completed',
        impact: 100,
        culturalSignificance: 'high',
      },
      {
        id: 'performance-optimization',
        title: 'Performance Excellence',
        description: 'Optimizing platform performance with cultural integrity maintained',
        agent: 'DeepSeek + Exa',
        culturalElement: 'Tikanga',
        teReoPhrase: 'He tikanga tō te ao',
        status: 'active',
        impact: 88,
        culturalSignificance: 'medium',
      },
      {
        id: 'user-experience',
        title: 'User Experience Aroha',
        description: 'Creating loving and caring user experiences with cultural sensitivity',
        agent: 'Gemini + Claude',
        culturalElement: 'Aroha',
        teReoPhrase: 'Ko te aroha anō he mea nui',
        status: 'active',
        impact: 90,
        culturalSignificance: 'high',
      },
    ]);
  };

  const loadCulturalValues = () => {
    setCulturalValues([
      {
        id: 'manaakitanga',
        name: 'Manaakitanga',
        teReoPhrase: 'Manaakitanga',
        englishTranslation: 'Hospitality, kindness, respect, care for others',
        usage: 98,
        importance: 100,
        context: 'Core value in all interactions and relationships',
      },
      {
        id: 'whanaungatanga',
        name: 'Whanaungatanga',
        teReoPhrase: 'Whanaungatanga',
        englishTranslation: 'Relationship, kinship, sense of family connection',
        usage: 95,
        importance: 98,
        context: 'Building strong connections and collaborative relationships',
      },
      {
        id: 'kaitiakitanga',
        name: 'Kaitiakitanga',
        teReoPhrase: 'Kaitiakitanga',
        englishTranslation: 'Guardianship, stewardship, care for the environment',
        usage: 92,
        importance: 96,
        context: 'Responsible care for resources and environment',
      },
      {
        id: 'rangatiratanga',
        name: 'Rangatiratanga',
        teReoPhrase: 'Rangatiratanga',
        englishTranslation: 'Self-determination, leadership, autonomy',
        usage: 88,
        importance: 94,
        context: 'Empowering users and maintaining autonomy',
      },
      {
        id: 'kotahitanga',
        name: 'Kotahitanga',
        teReoPhrase: 'Kotahitanga',
        englishTranslation: 'Unity, togetherness, collective action',
        usage: 90,
        importance: 92,
        context: 'Working together towards common goals',
      },
      {
        id: 'aroha',
        name: 'Aroha',
        teReoPhrase: 'Aroha',
        englishTranslation: 'Love, compassion, empathy',
        usage: 85,
        importance: 98,
        context: 'Compassionate care in all interactions',
      },
    ]);
  };

  const startCollaborativeMahi = () => {
    // Simulate real-time collaborative mahi
    const mahiInterval = setInterval(() => {
      setMahis((prev) =>
        prev.map((mahi) => ({
          ...mahi,
          impact: Math.min(100, mahi.impact + (Math.random() - 0.3) * 1.2),
        })),
      );

      setCulturalValues((prev) =>
        prev.map((value) => ({
          ...value,
          usage: Math.min(100, value.usage + (Math.random() - 0.2) * 0.8),
        })),
      );
    }, 5000);

    return () => clearInterval(mahiInterval);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCulturalSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAgentIcon = (agent: string) => {
    if (agent.includes('Claude')) return <Brain className="h-5 w-5 text-blue-600" />;
    if (agent.includes('GLM')) return <Zap className="h-5 w-5 text-purple-600" />;
    if (agent.includes('Gemini')) return <Globe className="h-5 w-5 text-green-600" />;
    if (agent.includes('DeepSeek')) return <Target className="h-5 w-5 text-orange-600" />;
    if (agent.includes('Exa')) return <MessageCircle className="h-5 w-5 text-indigo-600" />;
    return <Users className="h-5 w-5 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Collaborative Mahi Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Whanaungatanga • Manaakitanga • Kaitiakitanga • Educational Excellence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isCollaborating ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Activity className="h-4 w-4 inline mr-2" />
                {isCollaborating ? 'Mahi Active' : 'Standby'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mahi Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {mahis.map((mahi) => (
            <div
              key={mahi.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-200 cursor-pointer ${
                activeMahi === mahi.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-100 hover:border-gray-300'
              }`}
              onClick={() => setActiveMahi(activeMahi === mahi.id ? '' : mahi.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getAgentIcon(mahi.agent)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{mahi.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          mahi.status,
                        )}`}
                      >
                        {mahi.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCulturalSignificanceColor(
                          mahi.culturalSignificance,
                        )}`}
                      >
                        {mahi.culturalSignificance} significance
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{mahi.impact}%</div>
                  <div className="text-sm text-gray-600">Impact</div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{mahi.description}</p>

              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{mahi.culturalElement}</span>
                </div>
                <div className="text-lg font-medium text-green-900">{mahi.teReoPhrase}</div>
                <div className="text-sm text-green-700 italic">
                  Cultural principle guiding this mahi
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{mahi.agent}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Cultural Excellence</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Values */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Cultural Values (Ngā Uara)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {culturalValues.map((value) => (
              <div key={value.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{value.name}</h3>
                  <div className="text-sm font-medium text-green-600">{value.usage}% usage</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-lg font-medium text-green-800">{value.teReoPhrase}</div>
                    <div className="text-sm text-gray-600">{value.englishTranslation}</div>
                  </div>
                  <div className="text-sm text-gray-600">{value.context}</div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600">Importance: {value.importance}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborative Excellence Status */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 rounded-xl">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Collaborative Mahi Excellence
              </h3>
              <p className="text-gray-700 mb-4">
                All agents are working together in the spirit of whanaungatanga (relationship),
                manaakitanga (hospitality), and kaitiakitanga (guardianship). The platform embodies
                Māori values while delivering educational excellence through collaborative AI
                intelligence.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-sm text-gray-600">Active Mahi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-sm text-gray-600">Cultural Values</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">Collaborative Impact</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">6</div>
                  <div className="text-sm text-gray-600">Cultural Values</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeMahiDashboard;
