import { ArrowRight, CheckCircle, Crown, Sparkles, Star, Zap } from 'lucide-react';
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

const BeautifulSubscription: React.FC = () => {
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
        'Advanced reporting & insights',
      ],
      culturalFeatures: [
        'Comprehensive Te Reo Māori integration',
        'Advanced tikanga protocols & ceremonies',
        'Cultural competency assessment tools',
        'Māori worldview integration in all subjects',
        'Community consultation frameworks',
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
        'Unlimited lesson plans & resources',
        'School-wide analytics & reporting',
        'Custom curriculum development',
        'Multi-school collaboration tools',
        'Advanced security & compliance',
        'Dedicated account manager',
        'Custom integrations & APIs',
        'Professional development programs',
        'White-label options',
      ],
      culturalFeatures: [
        'Full Te Reo Māori immersion support',
        'Custom cultural protocols per iwi',
        'Advanced mātauranga Māori integration',
        'Cultural competency certification',
        'Community partnership frameworks',
        'Traditional knowledge preservation tools',
      ],
      targetAudience: 'Schools & Educational Organizations',
      color: 'border-purple-200 bg-purple-50',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Choose Your Teaching Journey</h1>
          <p style={styles.subtitle}>
            Join thousands of New Zealand teachers transforming education with Te Ao Mārama
          </p>

          {/* Billing Toggle */}
          <div style={styles.billingToggle}>
            <button
              onClick={() => setBilling('monthly')}
              style={{
                ...styles.toggleButton,
                background:
                  billing === 'monthly'
                    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    : 'rgba(255,255,255,0.2)',
                color: billing === 'monthly' ? 'white' : 'rgba(255,255,255,0.8)',
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              style={{
                ...styles.toggleButton,
                background:
                  billing === 'yearly'
                    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    : 'rgba(255,255,255,0.2)',
                color: billing === 'yearly' ? 'white' : 'rgba(255,255,255,0.8)',
              }}
            >
              Yearly
            </button>
            <div
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              }}
            >
              Save 17%
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div style={styles.plansGrid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                ...styles.planCard,
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                boxShadow: plan.popular
                  ? '0 25px 50px rgba(0,0,0,0.15)'
                  : '0 20px 40px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = plan.popular ? 'scale(1.05)' : 'scale(1)';
                e.currentTarget.style.boxShadow = plan.popular
                  ? '0 25px 50px rgba(0,0,0,0.15)'
                  : '0 20px 40px rgba(0,0,0,0.1)';
              }}
            >
              {plan.popular && (
                <div style={styles.popularBadge}>
                  <Crown size={16} style={{ marginRight: '8px' }} />
                  Most Popular
                </div>
              )}

              <div style={styles.planHeader}>
                <h3 style={styles.planName}>{plan.name}</h3>
                <div style={styles.planPrice}>
                  ${plan.price}
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>
                    /{billing === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <p style={styles.planBilling}>
                  {billing === 'yearly' && 'Billed annually • '}
                  Perfect for {plan.targetAudience.toLowerCase()}
                </p>
              </div>

              <div style={styles.featuresList}>
                {plan.features.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <CheckCircle size={16} color="#10b981" />
                    {feature}
                  </div>
                ))}
              </div>

              <div style={styles.culturalSection}>
                <div style={styles.culturalTitle}>
                  <Sparkles size={16} color="#3b82f6" />
                  Cultural Integration Features
                </div>
                {plan.culturalFeatures.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <Star size={14} color="#8b5cf6" />
                    {feature}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                style={{
                  ...styles.subscribeButton,
                  background:
                    loading === plan.id
                      ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                      : plan.popular
                      ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                      : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  boxShadow:
                    loading === plan.id
                      ? 'none'
                      : plan.popular
                      ? '0 10px 25px rgba(59, 130, 246, 0.3)'
                      : '0 10px 25px rgba(16, 185, 129, 0.3)',
                  opacity: loading === plan.id ? 0.7 : 1,
                  cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                }}
              >
                {loading === plan.id ? (
                  <>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Start Free Trial
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  🔒 14-day free trial • Cancel anytime
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>
            Trusted by 1,247+ teachers across New Zealand
          </p>
          <p style={{ fontSize: '14px' }}>
            All plans include NZ GST • Secure payment processing • 24/7 support
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BeautifulSubscription;
