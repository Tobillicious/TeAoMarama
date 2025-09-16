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

const WorkingSubscription: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '60px',
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      color: 'white',
      marginBottom: '16px',
      textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    subtitle: {
      fontSize: '20px',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '32px',
      maxWidth: '600px',
      margin: '0 auto 32px auto',
    },
    billingToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '40px',
    },
    toggleButton: {
      padding: '12px 24px',
      borderRadius: '25px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '32px',
      marginBottom: '60px',
    },
    planCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '40px 32px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      position: 'relative' as const,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    popularBadge: {
      position: 'absolute' as const,
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
      padding: '8px 24px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '700',
      boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)',
    },
    planHeader: {
      textAlign: 'center' as const,
      marginBottom: '32px',
    },
    planName: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px',
    },
    planPrice: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px',
    },
    planBilling: {
      fontSize: '16px',
      color: '#6b7280',
      marginBottom: '16px',
    },
    planDescription: {
      fontSize: '16px',
      color: '#4b5563',
      lineHeight: '1.6',
    },
    featuresList: {
      marginBottom: '32px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
      fontSize: '15px',
      color: '#374151',
    },
    culturalSection: {
      background:
        'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '32px',
    },
    culturalTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    subscribeButton: {
      width: '100%',
      padding: '16px 32px',
      borderRadius: '16px',
      border: 'none',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
  };

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to payment
      window.location.href = `/join?plan=${planId}`;
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(null);
    }
  };

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
        'AI-powered lesson plan generation',
        'Collaborative planning with colleagues',
        'Custom assessment rubrics',
        'Priority support & training',
        'Integration with school systems',
        'Export to Google Classroom & Microsoft Teams',
      ],
      culturalFeatures: [
        'Comprehensive Te Reo Māori integration',
        'Advanced tikanga protocols & cultural contexts',
        'Māori perspectives in all subjects',
        'Cultural competency tracking',
        'Whānau engagement tools',
      ],
      targetAudience: 'Experienced Teachers & Schools',
      color: 'border-blue-200 bg-blue-50',
    },
    {
      id: 'enterprise',
      name: 'Kaiako Enterprise',
      price: billing === 'monthly' ? 99 : 990,
      billing,
      features: [
        'Unlimited access to all resources',
        'Custom curriculum alignment',
        'Advanced analytics & reporting',
        'White-label options',
        'API access for integrations',
        'Dedicated account manager',
        'Custom training & workshops',
        'SLA guarantee',
        'Multi-school management',
      ],
      culturalFeatures: [
        'Full Te Ao Māori integration',
        'Custom cultural protocols',
        'Iwi-specific content development',
        'Advanced whakapapa mapping',
        'Cultural impact assessment tools',
      ],
      targetAudience: 'Schools & Educational Organizations',
      color: 'border-purple-200 bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Teaching Journey</h1>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of New Zealand teachers transforming education with TeKeteAkoClient
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-lg font-medium ${
                billing === 'monthly' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billing === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-lg font-medium ${
                billing === 'yearly' ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              Yearly
            </span>
            {billing === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-xl border-2 p-8 ${
                plan.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.targetAudience}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{billing === 'monthly' ? 'month' : 'year'}</span>
                </div>
                {billing === 'yearly' && (
                  <p className="text-sm text-green-600 font-medium">
                    ${(plan.price * 12 - plan.price) / 12} savings per month
                  </p>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  Core Features
                </h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Cultural Integration
                </h4>
                <ul className="space-y-3">
                  {plan.culturalFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Start Free Trial
              </button>

              <p className="text-center text-sm text-gray-500 mt-3">
                14-day free trial • No credit card required
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold text-gray-900">Secure & Private</p>
                <p className="text-sm text-gray-600">Bank-level security</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-900">Trusted by 1,000+ Teachers</p>
                <p className="text-sm text-gray-600">Across New Zealand</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold text-gray-900">Cancel Anytime</p>
                <p className="text-sm text-gray-600">No long-term contracts</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                Full access to all features for 14 days. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">
                No setup fees. You only pay the monthly or yearly subscription.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer school discounts?</h3>
              <p className="text-gray-600">
                Yes, contact us for volume pricing for schools and districts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingSubscription;
