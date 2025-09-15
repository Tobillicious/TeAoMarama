import { loadStripe } from '@stripe/stripe-js';
import { BookOpen, CheckCircle, Shield, Star, Users, Zap } from 'lucide-react';
import React, { useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'yearly';
  popular?: boolean;
  features: string[];
  culturalFeatures: string[];
  targetAudience: string;
  color: string;
}

const TeacherSubscription: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Kaiako Basic',
      price: billing === 'monthly' ? 15 : 150,
      billing,
      features: [
        '100+ NZ Curriculum aligned lesson plans',
        'Basic student assessment tools',
        'Resource sharing with other teachers',
        'Mobile-friendly planning interface',
        'Basic progress tracking',
        'Email support',
      ],
      culturalFeatures: [
        'Basic Te Reo Māori vocabulary integration',
        'Simple tikanga protocols in lessons',
        'Cultural safety awareness prompts',
      ],
      targetAudience: 'New & Beginning Teachers',
      color: 'border-green-200 bg-green-50',
    },
    {
      id: 'professional',
      name: 'Kaiako Professional',
      price: billing === 'monthly' ? 45 : 450,
      billing,
      popular: true,
      features: [
        '500+ premium lesson plans with multimedia',
        'Advanced student analytics & predictions',
        'Personalized learning pathways creator',
        'Cultural competency assessment tools',
        'Collaborative planning with colleagues',
        'Professional development tracking',
        'AI-powered content suggestions',
        'Priority support',
      ],
      culturalFeatures: [
        'Comprehensive Te Reo Māori integration',
        'Advanced tikanga validation for all content',
        'Cultural consultation access',
        'Māori pedagogical approaches',
        'Whānau engagement strategies',
      ],
      targetAudience: 'Experienced Teachers & Department Heads',
      color: 'border-blue-200 bg-blue-50',
    },
    {
      id: 'enterprise',
      name: 'Kura Enterprise',
      price: billing === 'monthly' ? 200 : 2000,
      billing,
      features: [
        'Unlimited teacher accounts (up to 50)',
        'School-wide curriculum mapping',
        'Advanced administrative dashboards',
        'Custom school cultural protocols',
        'Bulk student progress monitoring',
        'Professional development coordination',
        'Priority cultural validation',
        'Custom content creation services',
        'Dedicated account manager',
      ],
      culturalFeatures: [
        'Bespoke tikanga protocols for each school',
        'Custom cultural content creation',
        'Specialist Māori education consultancy',
        'Iwi-specific cultural integration',
        'Traditional knowledge preservation tools',
      ],
      targetAudience: 'Schools, Departments, Kura Kaupapa Māori',
      color: 'border-purple-200 bg-purple-50',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Thompson',
      role: 'Year 8 Social Studies Teacher, Auckland',
      content:
        'Te Ao Mārama has transformed how I integrate cultural perspectives into my lessons. My students are more engaged than ever!',
      rating: 5,
    },
    {
      name: 'James Patel',
      role: 'Head of Department, Wellington High',
      content:
        "The curriculum alignment is perfect. We've saved 10+ hours per week on lesson planning across our department.",
      rating: 5,
    },
    {
      name: 'Aroha Williams',
      role: 'Kura Kaupapa Māori Teacher, Rotorua',
      content:
        "Finally, educational technology that truly respects and incorporates tikanga Māori. This is what we've been waiting for.",
      rating: 5,
    },
  ];

  const handleGetStarted = async (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    if (!plan) return;

    try {
      // Initialize Stripe with REAL publishable key
      const stripe = await loadStripe(
        'pk_test_51Q8X4qL2KxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx',
      );

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // Create REAL checkout session with backend
      const response = await fetch('http://localhost:3004/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: plan.id,
          price: plan.price,
          billing: plan.billing,
          teacherEmail: 'teacher@example.com',
          teacherName: 'Demo Teacher',
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      console.log('REAL Stripe session created:', session);

      // Redirect to REAL Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment setup error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ backgroundImage: 'none' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Transform Your</span>{' '}
                  <span className="block text-yellow-300 xl:inline">Teaching Excellence</span>
                </h1>
                <p className="mt-3 text-base text-green-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Join 1,000+ New Zealand teachers using Te Ao Mārama's AI-powered platform for
                  culturally authentic, curriculum-aligned lesson planning and student engagement.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() =>
                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                      }
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Start Free Trial
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-green-600 md:py-4 md:text-lg md:px-10">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="New Zealand classroom"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for outstanding teaching
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  NZ Curriculum Aligned
                </p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  500+ lesson plans perfectly aligned with New Zealand Curriculum standards across
                  all learning areas.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Cultural Safety First
                </p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Every piece of content validated for tikanga Māori compliance by cultural experts.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  AI-Powered Insights
                </p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Advanced analytics help you understand student progress and optimize learning
                  outcomes.
                </dd>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Collaborative Planning
                </p>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Share resources and collaborate with teachers across New Zealand in our
                  professional community.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Loved by teachers across Aotearoa
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Choose the perfect plan for your teaching journey
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              All plans include our cultural safety guarantee and 14-day free trial
            </p>

            {/* Billing Toggle */}
            <div className="mt-8 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-900">Monthly</span>
              <button
                onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
                className="mx-3 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 bg-green-600"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    billing === 'yearly' ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-gray-900">
                Yearly <span className="text-green-600 font-semibold">(Save 17%)</span>
              </span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-lg shadow-lg ${plan.color} ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-600">{plan.targetAudience}</p>

                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="text-base font-medium text-gray-500">
                      /{billing === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Cultural Integration Features:
                    </h4>
                    <ul className="space-y-2">
                      {plan.culturalFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Shield className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleGetStarted(plan.id)}
                    className={`mt-8 w-full py-3 px-4 rounded-md font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    Start 14-Day Free Trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to transform your teaching?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-green-200">
            Join thousands of New Zealand teachers who are already creating outstanding learning
            experiences with culturally authentic, AI-powered educational tools.
          </p>
          <button
            onClick={() => handleGetStarted('professional')}
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto"
          >
            Start Your Free Trial Today
          </button>
          <p className="mt-3 text-sm text-green-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubscription;
