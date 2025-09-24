import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { PAYMENT_CONFIG } from '../config/payment-config';

const FunctionalSubscriptionSystem: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [stripe, setStripe] = useState<any>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(PAYMENT_CONFIG.stripe.publishableKey);
      setStripe(stripeInstance);
    };
    initializeStripe();
  }, []);

  const plans = [
    {
      id: 'free',
      name: 'Free Explorer',
      description: 'Perfect for getting started',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        'Access to 10 curriculum lessons',
        'Basic teacher dashboard',
        'Community support',
        'Cultural safety guidelines'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      id: 'teacher-pro',
      name: 'Teacher Pro',
      description: 'For individual teachers',
      priceMonthly: 25,
      priceYearly: 250,
      features: [
        'Access to all 36+ curriculum lessons',
        'Advanced teacher dashboard',
        'AI-powered lesson planning',
        'Assessment tools & rubrics',
        'Cultural integration guides',
        'Priority support'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      id: 'school-kura',
      name: 'School & Kura',
      description: 'For schools and institutions',
      priceMonthly: 149,
      priceYearly: 1490,
      features: [
        'Everything in Teacher Pro',
        'Unlimited teacher accounts',
        'School-wide analytics',
        'Custom curriculum alignment',
        'Professional development resources',
        'Dedicated account manager',
        'Bulk user management'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (planId === 'free') {
      // Redirect to free signup
      window.location.href = '/onboarding?plan=free';
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          billingPeriod,
          successUrl: PAYMENT_CONFIG.urls.success,
          cancelUrl: PAYMENT_CONFIG.urls.cancel
        })
      });

      const { sessionId } = await response.json();
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = (price: number) => {
    if (price === 0) return 'Free';
    const finalPrice = billingPeriod === 'yearly' ? price : Math.round(price / 12);
    return `${PAYMENT_CONFIG.pricing.currency.toUpperCase()} ${finalPrice}`;
  };

  const calculateSavings = (monthlyPrice: number) => {
    if (billingPeriod === 'yearly' && monthlyPrice > 0) {
      const savings = (monthlyPrice * 12) - (monthlyPrice * 10);
      return `Save ${PAYMENT_CONFIG.pricing.currency.toUpperCase()} ${savings}`;
    }
    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        color: 'white'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Choose Your Plan
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Empowering New Zealand educators with curriculum-aligned resources
          </p>
          
          {/* Billing Toggle */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <span style={{ opacity: billingPeriod === 'monthly' ? 1 : 0.6 }}>Monthly</span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              style={{
                width: '60px',
                height: '30px',
                borderRadius: '15px',
                border: 'none',
                background: billingPeriod === 'yearly' ? '#4ade80' : '#ccc',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
            <span style={{ opacity: billingPeriod === 'yearly' ? 1 : 0.6 }}>Yearly</span>
            {billingPeriod === 'yearly' && (
              <span style={{
                background: '#4ade80',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}>
                Save 17%
              </span>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '2rem',
                border: plan.popular ? '2px solid #4ade80' : '1px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#4ade80',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Most Popular
                </div>
              )}
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {plan.name}
              </h3>
              <p style={{ opacity: 0.8, marginBottom: '1rem' }}>
                {plan.description}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {calculatePrice(plan.priceMonthly)}
                </div>
                {billingPeriod === 'yearly' && plan.priceMonthly > 0 && (
                  <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                    {billingPeriod === 'yearly' ? 'per year' : 'per month'}
                  </div>
                )}
                {calculateSavings(plan.priceMonthly) && (
                  <div style={{
                    color: '#4ade80',
                    fontSize: '0.9rem',
                    marginTop: '0.5rem'
                  }}>
                    {calculateSavings(plan.priceMonthly)}
                  </div>
                )}
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: plan.popular 
                    ? 'linear-gradient(45deg, #4ade80, #22c55e)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                {loading ? 'Processing...' : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>Trusted by New Zealand Educators</h3>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>20,000+</div>
              <div style={{ opacity: 0.8 }}>Teachers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>500+</div>
              <div style={{ opacity: 0.8 }}>Schools</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>36+</div>
              <div style={{ opacity: 0.8 }}>Curriculum Lessons</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>99.9%</div>
              <div style={{ opacity: 0.8 }}>Uptime</div>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <div style={{
          textAlign: 'center',
          fontSize: '0.9rem',
          opacity: 0.7
        }}>
          <p>🔒 Secure payments powered by Stripe • NZ GST compliant • 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSubscriptionSystem;
