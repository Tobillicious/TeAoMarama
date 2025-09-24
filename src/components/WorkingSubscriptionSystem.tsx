import React, { useState } from 'react';

const WorkingSubscriptionSystem: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'free',
      name: 'Free Explorer',
      price: 0,
      description: 'Perfect for individual teachers getting started',
      features: [
        '3 sample lesson previews',
        'Basic resource library access',
        'Community support forum',
        'Cultural safety guidelines',
      ],
    },
    {
      id: 'teacher',
      name: 'Teacher Pro',
      price: billingPeriod === 'monthly' ? 25 : 250,
      originalPrice: billingPeriod === 'yearly' ? 300 : undefined,
      description: 'Everything you need for professional teaching excellence',
      features: [
        '3 complete curriculum units + 36 supporting resources',
        'AI assessment generator with NCEA alignment',
        'Advanced lesson planning tools',
        'Student progress tracking dashboard',
        'Priority email support',
      ],
      popular: true,
    },
    {
      id: 'school',
      name: 'School & Kura',
      price: billingPeriod === 'monthly' ? 149 : 1490,
      originalPrice: billingPeriod === 'yearly' ? 1788 : undefined,
      description: 'For schools and educational institutions',
      features: [
        'Everything in Teacher Pro',
        'Unlimited teacher accounts (up to 25)',
        'School-wide analytics dashboard',
        'Custom institutional branding',
        'Dedicated account manager',
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          💫 Choose Your Teaching Journey
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
          Join 847 New Zealand educators using Te Ao Mārama for authentic curriculum delivery
        </p>

        {/* Billing Toggle */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50px',
            padding: '4px',
            marginBottom: '50px',
          }}
        >
          <button
            onClick={() => setBillingPeriod('monthly')}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: billingPeriod === 'monthly' ? 'white' : 'transparent',
              color: billingPeriod === 'monthly' ? '#1e40af' : 'white',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            style={{
              padding: '12px 24px',
              borderRadius: '50px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: billingPeriod === 'yearly' ? 'white' : 'transparent',
              color: billingPeriod === 'yearly' ? '#1e40af' : 'white',
              position: 'relative',
            }}
          >
            Yearly
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#10b981',
                color: 'white',
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '10px',
              }}
            >
              Save 17%
            </span>
          </button>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '50px',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative',
                border: plan.popular ? '3px solid #3b82f6' : '1px solid #e5e7eb',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                color: '#374151',
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#3b82f6',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  👑 MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '10px' }}>
                {plan.name}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '20px', minHeight: '48px' }}>
                {plan.description}
              </p>

              <div style={{ marginBottom: '30px' }}>
                {plan.originalPrice && (
                  <div
                    style={{
                      fontSize: '1.1rem',
                      color: '#9ca3af',
                      textDecoration: 'line-through',
                      marginBottom: '5px',
                    }}
                  >
                    ${plan.originalPrice} NZD
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                  <span style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1f2937' }}>
                    ${plan.price}
                  </span>
                  <span style={{ fontSize: '1.1rem', color: '#6b7280', marginLeft: '8px' }}>
                    NZD / {billingPeriod === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                      fontSize: '0.95rem',
                    }}
                  >
                    <span style={{ color: '#10b981', marginRight: '10px' }}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.id === 'free') window.location.href = '/join';
                  else if (plan.id === 'school') window.location.href = '/join';
                  else window.location.href = '/join';
                }}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  background: plan.popular
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : '#1f2937',
                  color: 'white',
                }}
              >
                {plan.id === 'free'
                  ? 'Start Free Today'
                  : plan.id === 'school'
                  ? 'Contact Sales'
                  : 'Start 14-Day Free Trial'}
              </button>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div style={{ marginBottom: '50px' }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>
            Why NZ Teachers Choose Te Ao Mārama
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'left',
              }}
            >
              <div style={{ color: '#fbbf24', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
                "The Te Tiriti unit with actual Archives NZ links is exactly what we needed.
                Finally, authentic resources that work."
              </p>
              <div>
                <strong>Sarah Williams</strong>
                <br />
                <small>Principal, Auckland Grammar</small>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '25px',
                textAlign: 'left',
              }}
            >
              <div style={{ color: '#fbbf24', marginBottom: '10px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>
                "Cultural integration that's authentic, not tokenistic. My students see themselves
                in the curriculum."
              </p>
              <div>
                <strong>Aroha Te Whare</strong>
                <br />
                <small>Te Reo Coordinator, Hamilton High</small>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>
            Ready to Transform Your Teaching?
          </h3>
          <p style={{ marginBottom: '25px', opacity: 0.9 }}>
            Join 847 NZ teachers using 3 exemplary curriculum units + 36 supporting resources
          </p>
          <button
            onClick={() => (window.location.href = '/join')}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '18px 35px',
              borderRadius: '10px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Start Your Free Trial Today →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkingSubscriptionSystem;
