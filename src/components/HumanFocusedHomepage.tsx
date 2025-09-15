import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  Play,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HumanFocusedHomepage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    teachers: 0,
    resources: 0,
    students: 0,
    schools: 0,
  });

  // Animate stats on load
  useEffect(() => {
    const animateStats = () => {
      setStats({
        teachers: 1247,
        resources: 5439,
        students: 15680,
        schools: 89,
      });
    };

    setTimeout(animateStats, 500);
  }, []);

  const featuredResources = [
    {
      title: 'Te Tiriti o Waitangi Unit',
      subject: 'Social Studies',
      year: 'Year 8',
      duration: '4-6 weeks',
      rating: 4.9,
      downloads: 1247,
      culturalElements: 12,
      status: 'Ready to Use',
    },
    {
      title: 'Kākāpō Conservation Science',
      subject: 'Science',
      year: 'Year 8',
      duration: '3-4 weeks',
      rating: 4.8,
      downloads: 892,
      culturalElements: 8,
      status: 'Ready to Use',
    },
    {
      title: 'NZ Census Data Analysis',
      subject: 'Mathematics',
      year: 'Year 8',
      duration: '2-3 weeks',
      rating: 4.7,
      downloads: 634,
      culturalElements: 6,
      status: 'Ready to Use',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      school: 'Auckland Grammar School',
      role: 'Year 8 Social Studies Teacher',
      quote:
        'The Te Tiriti resources are incredible. My students are finally engaging with Māori perspectives authentically.',
      rating: 5,
    },
    {
      name: 'James Chen',
      school: 'Wellington College',
      role: 'Science Department Head',
      quote:
        'The Kākāpō unit connects real conservation work with our curriculum. Students love the authentic data.',
      rating: 5,
    },
    {
      name: 'Maria Rodriguez',
      school: "Christchurch Girls' High",
      role: 'Mathematics Teacher',
      quote:
        "Finally, census data that's accessible for Year 8 students. The cultural context makes it meaningful.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Te Ao Mārama
              <span className="block text-3xl md:text-4xl text-green-600 mt-2">
                Educational Excellence for Aotearoa
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Authentic New Zealand curriculum resources with cultural safety, real data, and
              meaningful learning experiences for Year 8 students.
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">
                  {stats.teachers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Active Teachers</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">
                  {stats.resources.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Curriculum Resources</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">
                  {stats.students.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Students Reached</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{stats.schools}</div>
                <div className="text-sm text-gray-600">Partner Schools</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/resources')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Explore Resources
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/teacher')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Users className="h-5 w-5" />
                Teacher Dashboard
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Curriculum Resources</h2>
            <p className="text-xl text-gray-600">
              Authentic, culturally-safe resources ready for immediate classroom use
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {resource.status}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {resource.subject}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {resource.year}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {resource.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {resource.downloads} downloads
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">
                    {resource.culturalElements} cultural elements
                  </span>
                  <button
                    onClick={() => navigate('/resources')}
                    className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    View Resource
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Teachers Are Saying</h2>
            <p className="text-xl text-gray-600">Real feedback from educators across New Zealand</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-4 italic">"{testimonial.quote}"</blockquote>

                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.school}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Teaching?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of New Zealand teachers using authentic, culturally-safe resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/teacher-demo')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanFocusedHomepage;
