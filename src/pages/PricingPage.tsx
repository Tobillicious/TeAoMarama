import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Crown, Shield, Star } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  culturalFeatures: string[];
  buttonText: string;
  popular?: boolean;
  highlight?: boolean;
  color: string;
}

const PricingPage: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const navigate = useNavigate();

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free Explorer',
      price: 0,
      period: 'forever',
      description: 'Perfect for trying our authentic NZ resources.',
      features: [
        'Sample from 3 complete units',
        'Te Tiriti unit preview',
        'Basic resource library (5 items)',
        'Community support',
        'Mobile app access',
      ],
      culturalFeatures: [
        'Basic Te Reo Māori vocabulary',
        'Cultural awareness prompts',
        'Tikanga introduction guides',
      ],
      buttonText: 'Start Free Today',
      color: 'gray',
    },
    {
      id: 'teacher',
      name: 'Teacher Pro',
      price: billingPeriod === 'monthly' ? 25 : 250,
      originalPrice: billingPeriod === 'yearly' ? 300 : undefined,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      description: 'For individual teachers transforming their practice.',
      features: [
        '3 complete curriculum units',
        'Te Tiriti, Kākāpō & Census studies',
        'AI assessment generator',
        'All external links working',
        'Progress tracking dashboard',
        'Priority support',
        'Mobile & offline access',
      ],
      culturalFeatures: [
        'Comprehensive Te Reo Māori integration',
        'Authentic tikanga validation',
        'Cultural consultation access',
        'Iwi-specific content guidance',
      ],
      buttonText: 'Start 14-Day Free Trial',
      popular: true,
      color: 'blue',
    },
    {
      id: 'school',
      name: 'School & Kura',
      price: billingPeriod === 'monthly' ? 149 : 1490,
      originalPrice: billingPeriod === 'yearly' ? 1788 : undefined,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      description: 'For schools embracing cultural transformation.',
      features: [
        'Everything in Teacher Pro',
        'Up to 25 teacher accounts',
        'School-wide analytics dashboard',
        'Bulk resource management',
        'Professional development support',
        'Priority feature requests',
        'Dedicated account manager',
        'Custom cultural protocols',
      ],
      culturalFeatures: [
        'Bespoke tikanga protocols',
        'Iwi-specific cultural integration',
        'Whānau engagement strategies',
        'Community liaison support',
        'Cultural advisory board access',
      ],
      buttonText: 'Contact Education Specialist',
      highlight: true,
      color: 'purple',
    },
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'school') {
      navigate('/contact');
    } else {
      navigate(`/checkout?plan=${planId}&billing=${billingPeriod}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6"
          >
            Choose the right plan for your teaching journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl opacity-90 max-w-3xl mx-auto"
          >
            Join 847 New Zealand educators using Te Ao Mārama to create culturally responsive,
            curriculum-aligned educational content.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-lg"
          >
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all relative text-sm sm:text-base ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-400 text-xs text-green-900 px-2 py-1 rounded-full font-bold">
                Save 17%
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-emerald-400 mb-2">3 + 36</div>
              <div className="text-white font-medium">Complete Units + Resources</div>
              <div className="text-blue-200 text-sm">Exemplary lessons + supporting materials</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">847</div>
              <div className="text-white font-medium">NZ Teachers</div>
              <div className="text-blue-200 text-sm">Using our platform</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-white font-medium">Culturally Authentic</div>
              <div className="text-blue-200 text-sm">Reviewed by advisors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Money-Back Guarantee */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Shield className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold text-white">30-Day Money-Back Guarantee</span>
          </div>
          <p className="text-blue-200">
            Not satisfied with our authentic NZ resources? Get a full refund within 30 days, no
            questions asked.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
              className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-200'
              } ${plan.id === 'school' ? 'lg:order-last' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Crown size={16} /> MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 h-12">{plan.description}</p>

                  <div className="mb-4">
                    {plan.originalPrice && (
                      <div className="text-lg text-gray-400 line-through mb-1">
                        ${plan.originalPrice} NZD
                      </div>
                    )}
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-lg text-gray-600 ml-2">
                        NZD / {plan.period.replace('per ', '')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Core Features</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Cultural Integration</h4>
                  <ul className="space-y-3">
                    {plan.culturalFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.buttonText} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Teacher Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-white mb-12">
          Why NZ Teachers Choose Te Kura o TeAoMarama
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-white mb-4">
              "The Te Tiriti unit with actual Archives NZ links is exactly what we needed. Finally,
              authentic resources that work."
            </blockquote>
            <div className="text-blue-200">
              <div className="font-medium">Sarah Williams</div>
              <div className="text-sm">Principal, Auckland Grammar</div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-white mb-4">
              "Cultural integration that's authentic, not tokenistic. My students see themselves in
              the curriculum."
            </blockquote>
            <div className="text-blue-200">
              <div className="font-medium">Aroha Te Whare</div>
              <div className="text-sm">Te Reo Coordinator, Hamilton High</div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h3>
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-3">
              Are all external links actually working?
            </h4>
            <p className="text-blue-200">
              Yes! We verify all external links monthly. Our resources connect to Archives NZ, DOC
              research data, Stats NZ databases, and other official sources - all tested working as
              of September 2025.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-3">
              How authentic is the cultural integration?
            </h4>
            <p className="text-blue-200">
              Our content is reviewed by cultural advisors and created in partnership with Te Taura
              Whiri i te Reo Māori. We ensure tikanga is woven naturally into curriculum, not added
              as an afterthought.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-3">
              What if our school needs custom cultural protocols?
            </h4>
            <p className="text-blue-200">
              School & Kura plans include bespoke cultural protocol development. We work with your
              iwi and community to ensure resources respect local tikanga and perspectives.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h4 className="text-xl font-bold text-white mb-3">Can I cancel anytime?</h4>
            <p className="text-blue-200">
              Absolutely. Cancel anytime with no penalties. Plus, we offer a 30-day money-back
              guarantee if you're not completely satisfied with our resources.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/30 rounded-xl p-12">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Teaching?</h3>
          <p className="text-xl text-blue-200 mb-8">
            Join 847 NZ teachers using 3 exemplary curriculum units + 36 supporting resources
          </p>
          <button
            onClick={() => handlePlanSelect('teacher')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-3 mx-auto"
          >
            Start Your Free Trial Today
            <ArrowRight size={20} />
          </button>
          <p className="text-blue-300 text-sm mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
