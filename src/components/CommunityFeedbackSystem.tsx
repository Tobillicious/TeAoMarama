import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Star, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Lightbulb,
  Leaf
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'iwi' | 'educator' | 'student' | 'whānau';
  author: string;
  role: string;
  content: string;
  category: 'cultural_safety' | 'educational_value' | 'technical_issue' | 'enhancement' | 'appreciation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'reviewed' | 'in_progress' | 'implemented' | 'archived';
  culturalConsideration: boolean;
  timestamp: Date;
  responses: FeedbackResponse[];
  votes: number;
}

interface FeedbackResponse {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: Date;
  type: 'acknowledgment' | 'action_taken' | 'clarification' | 'cultural_guidance';
}

interface CommunityStats {
  totalFeedback: number;
  culturalSafetyItems: number;
  implementedSuggestions: number;
  activeDiscussions: number;
  iwi_participation: number;
  educator_participation: number;
}

export function CommunityFeedbackSystem() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [newFeedback, setNewFeedback] = useState({
    type: 'educator' as FeedbackItem['type'],
    author: '',
    role: '',
    content: '',
    category: 'educational_value' as FeedbackItem['category']
  });
  const [stats, setStats] = useState<CommunityStats>({
    totalFeedback: 0,
    culturalSafetyItems: 0,
    implementedSuggestions: 0,
    activeDiscussions: 0,
    iwi_participation: 0,
    educator_participation: 0
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  useEffect(() => {
    // Load existing feedback (in real app, this would come from backend)
    loadMockFeedback();
    updateStats();
  }, []);

  const loadMockFeedback = () => {
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        type: 'iwi',
        author: 'Māori Language Commissioner',
        role: 'Cultural Advisor',
        content: 'The te reo Māori pronunciation guides are excellent. However, we need to ensure the cultural context is properly explained alongside the language learning modules. Mātauranga Māori requires respectful presentation.',
        category: 'cultural_safety',
        priority: 'high',
        status: 'reviewed',
        culturalConsideration: true,
        timestamp: new Date('2025-08-29'),
        responses: [
          {
            id: '1-1',
            author: 'Development Team',
            role: 'Kaitiaki Rangatira',
            content: 'Kia ora, thank you for this important guidance. We are implementing cultural context explanations and will have these reviewed by our cultural advisory panel before release.',
            timestamp: new Date('2025-08-29'),
            type: 'acknowledgment'
          }
        ],
        votes: 12
      },
      {
        id: '2',
        type: 'educator',
        author: 'Sarah Thompson',
        role: 'Year 5 Teacher, Auckland',
        content: 'Love the new mathematics modules! My students are much more engaged with the visual problem-solving activities. Could we have more differentiated activities for students working below/above year level?',
        category: 'educational_value',
        priority: 'medium',
        status: 'in_progress',
        culturalConsideration: false,
        timestamp: new Date('2025-08-28'),
        responses: [],
        votes: 8
      },
      {
        id: '3',
        type: 'student',
        author: 'Tane (Year 8)',
        role: 'Student Voice Representative',
        content: 'The science experiments are cool but some of the videos load really slowly on our school computers. Also, it would be awesome to have more stuff about how Māori used science in traditional ways.',
        category: 'technical_issue',
        priority: 'medium',
        status: 'new',
        culturalConsideration: true,
        timestamp: new Date('2025-08-28'),
        responses: [],
        votes: 15
      },
      {
        id: '4',
        type: 'whānau',
        author: 'Maria Rodriguez-Patel',
        role: 'Parent/Caregiver',
        content: 'As a parent from a migrant family, I appreciate how the platform includes diverse cultural perspectives while honoring Te Tiriti principles. My daughter feels represented and is learning about her own culture alongside Māori culture.',
        category: 'appreciation',
        priority: 'low',
        status: 'archived',
        culturalConsideration: true,
        timestamp: new Date('2025-08-27'),
        responses: [
          {
            id: '4-1',
            author: 'Cultural Team',
            role: 'Diversity Coordinator',
            content: 'This feedback warms our hearts! Creating inclusive spaces where all tamariki can see themselves while learning about Te Ao Māori is exactly our mission.',
            timestamp: new Date('2025-08-27'),
            type: 'acknowledgment'
          }
        ],
        votes: 6
      }
    ];

    setFeedback(mockFeedback);
  };

  const updateStats = () => {
    setStats({
      totalFeedback: 47,
      culturalSafetyItems: 8,
      implementedSuggestions: 23,
      activeDiscussions: 12,
      iwi_participation: 15,
      educator_participation: 32
    });
  };

  const handleSubmitFeedback = () => {
    if (!newFeedback.author || !newFeedback.content) return;

    const feedback_item: FeedbackItem = {
      id: Date.now().toString(),
      ...newFeedback,
      priority: newFeedback.category === 'cultural_safety' ? 'high' : 'medium',
      status: 'new',
      culturalConsideration: newFeedback.category === 'cultural_safety' || newFeedback.content.toLowerCase().includes('māori'),
      timestamp: new Date(),
      responses: [],
      votes: 0
    };

    setFeedback(prev => [feedback_item, ...prev]);
    setNewFeedback({
      type: 'educator',
      author: '',
      role: '',
      content: '',
      category: 'educational_value'
    });
    setShowSubmissionForm(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-amber-100 text-amber-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'iwi': return <Leaf className="w-4 h-4" />;
      case 'educator': return <Users className="w-4 h-4" />;
      case 'student': return <Star className="w-4 h-4" />;
      case 'whānau': return <Heart className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const filteredFeedback = selectedCategory === 'all' 
    ? feedback 
    : feedback.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Users className="w-8 h-8 text-blue-600" />
          Community Voice Integration Portal
        </h1>
        <p className="text-lg text-gray-600">
          Iwi, educators, whānau, and student feedback driving platform development
        </p>
        <div className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-full inline-block">
          🌿 Guided by tikanga principles • Manaakitanga • Whakatōhea
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{stats.totalFeedback}</div>
            <div className="text-sm text-gray-600">Total Feedback</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-orange-600">{stats.culturalSafetyItems}</div>
            <div className="text-sm text-gray-600">Cultural Safety</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{stats.implementedSuggestions}</div>
            <div className="text-sm text-gray-600">Implemented</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-600">{stats.activeDiscussions}</div>
            <div className="text-sm text-gray-600">Active Discussions</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.iwi_participation}</div>
            <div className="text-sm text-gray-600">Iwi Voices</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-indigo-600">{stats.educator_participation}</div>
            <div className="text-sm text-gray-600">Educators</div>
          </CardContent>
        </Card>
      </div>

      {/* Cultural Responsibility Notice */}
      <Alert className="border-green-200 bg-green-50">
        <Leaf className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Kaitiakitanga Commitment:</strong> All feedback is reviewed through a cultural safety lens. 
          Iwi and cultural advisor input receives priority attention to ensure Te Tiriti principles are upheld.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'cultural_safety', 'educational_value', 'technical_issue', 'enhancement', 'appreciation'].map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category.replace('_', ' ')}
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={() => setShowSubmissionForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Share Your Voice
        </Button>
      </div>

      {/* Feedback Submission Form */}
      {showSubmissionForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Share Your Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Role</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newFeedback.type}
                  onChange={e => setNewFeedback(prev => ({...prev, type: e.target.value as FeedbackItem['type']}))}
                >
                  <option value="educator">Educator</option>
                  <option value="student">Student</option>
                  <option value="whānau">Whānau/Parent</option>
                  <option value="iwi">Iwi Representative</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={newFeedback.author}
                  onChange={e => setNewFeedback(prev => ({...prev, author: e.target.value}))}
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newFeedback.category}
                  onChange={e => setNewFeedback(prev => ({...prev, category: e.target.value as FeedbackItem['category']}))}
                >
                  <option value="educational_value">Educational Value</option>
                  <option value="cultural_safety">Cultural Safety</option>
                  <option value="technical_issue">Technical Issue</option>
                  <option value="enhancement">Enhancement Idea</option>
                  <option value="appreciation">Appreciation</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Your Position/School</label>
              <Input
                value={newFeedback.role}
                onChange={e => setNewFeedback(prev => ({...prev, role: e.target.value}))}
                placeholder="e.g., Year 7 Teacher, Hamilton East School"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Feedback</label>
              <Textarea
                value={newFeedback.content}
                onChange={e => setNewFeedback(prev => ({...prev, content: e.target.value}))}
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows={4}
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowSubmissionForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitFeedback}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feedback Items */}
      <div className="space-y-4">
        {filteredFeedback.map(item => (
          <Card key={item.id} className={`${item.culturalConsideration ? 'border-l-4 border-l-green-500' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getTypeIcon(item.type)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.author}</h3>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.culturalConsideration && (
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      <Leaf className="w-3 h-3 mr-1" />
                      Cultural
                    </Badge>
                  )}
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700">{item.content}</p>
              
              {item.responses.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Team Response
                  </h4>
                  {item.responses.map(response => (
                    <div key={response.id} className="border-l-3 border-l-blue-400 pl-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{response.author}</span>
                        <Badge variant="outline" className="text-xs">{response.role}</Badge>
                      </div>
                      <p className="text-sm text-gray-700">{response.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {response.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>❤️ {item.votes} community members find this helpful</span>
                  <span>📅 {item.timestamp.toLocaleDateString()}</span>
                </div>
                
                {item.status === 'implemented' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Implemented</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Your Voice Matters:</strong> Community feedback directly influences platform development. 
          Recent implementations include improved te reo pronunciation guides, enhanced differentiation tools, 
          and better mobile performance based on your suggestions.
        </AlertDescription>
      </Alert>
    </div>
  );
}