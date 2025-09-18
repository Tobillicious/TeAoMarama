import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Users, 
  BookOpen, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Play,
  Download,
  Shield,
  Clock,
  Zap,
  Heart,
  Globe,
  Award,
  Target
} from 'lucide-react';

const HighConvertingLandingPage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      title: "500+ Curriculum Resources",
      description: "NZC-aligned lesson plans with deep cultural integration"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "AI-Powered Analytics",
      description: "Track student progress with intelligent insights"
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-500" />,
      title: "Te Ao Māori Integration",
      description: "Authentic cultural perspectives in every resource"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Teacher Community",
      description: "Connect with thousands of NZ educators"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Year 8 Teacher, Auckland",
      content: "TeKeteAkoClient has transformed my teaching. The resources are incredible and the analytics help me understand my students better than ever.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Principal, Wellington",
      content: "Our entire school uses TeKeteAkoClient. The cultural integration is authentic and the student engagement has increased dramatically.",
      rating: 5
    },
    {
      name: "Lisa Brown",
      role: "Year 7 Teacher, Christchurch",
      content: "The AI analytics are game-changing. I can now identify struggling students early and provide targeted support.",
      rating: 5
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Teachers" },
    { number: "15,000+", label: "Students Impacted" },
    { number: "500+", label: "Resources Available" },
    { number: "98%", label: "Teacher Satisfaction" }
  ];

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to onboarding
    window.location.href = '/onboarding';
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  <Star className="h-4 w-4 mr-2 fill-current" />
                  Trusted by 2,500+ NZ Teachers
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your Teaching with
                  <span className="text-blue-600"> AI-Powered</span> Education
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of New Zealand teachers using TeKeteAkoClient to create engaging, 
                  culturally-rich lessons and track student progress with intelligent analytics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => window.location.href = '/onboarding'}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  No credit card required
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Student Progress Dashboard</h3>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">+23% this month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {['Emma Thompson', 'James Wilson', 'Sarah Mitchell'].map((name, index) => (
                      <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{name}</p>
                            <p className="text-sm text-gray-500">Year 8 Student</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{85 + index * 5}%</p>
                          <p className="text-sm text-green-600">On track</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <Award className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg">
                <Heart className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to excel as a teacher
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TeKeteAkoClient combines cutting-edge AI technology with deep cultural understanding 
              to create the most comprehensive teaching platform in New Zealand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by teachers across New Zealand
            </h2>
            <p className="text-xl text-gray-600">
              See what your colleagues are saying about TeKeteAkoClient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to transform your teaching?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teachers who are already using TeKeteAkoClient to create 
            engaging, culturally-rich learning experiences.
          </p>
          
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? 'Starting...' : 'Start Free Trial'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </form>

          <p className="text-blue-100 text-sm mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">TeKeteAkoClient Demo</h3>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Demo video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighConvertingLandingPage;

