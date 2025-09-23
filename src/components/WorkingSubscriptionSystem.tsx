import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

const WorkingSubscriptionSystem: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'teacher-pro',
      name: 'Teacher Pro',
      price: 25,
      originalPrice: 35,
      period: 'month',
      description: 'Perfect for individual teachers',
      color: '#3b82f6',
      features: [
        'Access to 50+ curriculum-aligned lessons',
        'Cultural safety protocols and resources',
        'Assessment tools and rubrics',
        'Community forum access',
        'Email support',
        'Mobile app access',
      ],
    },
    {
      id: 'school-premium',
      name: 'School Premium',
      price: 149,
      originalPrice: 199,
      period: 'month',
      description: 'Ideal for schools and departments',
      color: '#059669',
      popular: true,
      features: [
        'Everything in Teacher Pro',
        'Unlimited teacher accounts',
        'School-wide analytics dashboard',
        'Custom lesson plan creation',
        'Priority support',
        'Professional development resources',
        'Integration with school systems',
        'Bulk student management',
      ],
    },
    {
      id: 'district-enterprise',
      name: 'District Enterprise',
      price: 499,
      originalPrice: 699,
      period: 'month',
      description: 'For education districts and large organizations',
      color: '#7c3aed',
      features: [
        'Everything in School Premium',
        'Multi-school management',
        'Custom branding and white-labeling',
        'Advanced analytics and reporting',
        'Dedicated account manager',
        'Custom integrations',
        'Training and onboarding support',
        'API access for developers',
      ],
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success page
      navigate('/subscription-success', {
        state: {
          plan: plans.find((p) => p.id === selectedPlan),
          amount: plans.find((p) => p.id === selectedPlan)?.price,
        },
      });
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem 1rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
            }}
          >
            Choose Your Te Ao Mārama Plan
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Join thousands of New Zealand teachers who are transforming education with our
            curriculum-aligned resources and cultural safety protocols.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border:
                  selectedPlan === plan.id
                    ? `3px solid ${plan.color}`
                    : '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: selectedPlan === plan.id ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
              }}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '0.5rem',
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: '1rem',
                  }}
                >
                  {plan.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {plan.originalPrice && (
                    <span
                      style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        textDecoration: 'line-through',
                      }}
                    >
                      ${plan.originalPrice}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: plan.color,
                    }}
                  >
                    ${plan.price}
                  </span>
                  <span
                    style={{
                      fontSize: '1.2rem',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '2rem',
                }}
              >
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem',
                      color: 'white',
                    }}
                  >
                    <span
                      style={{
                        color: plan.color,
                        marginRight: '0.75rem',
                        fontSize: '1.2rem',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: '100%',
                  background: selectedPlan === plan.id ? plan.color : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id);
                }}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Subscribe Button */}
        {selectedPlan && (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <button
              onClick={handleSubscribe}
              disabled={isProcessing}
              style={{
                background: '#059669',
                color: 'white',
                border: 'none',
                padding: '1.5rem 3rem',
                borderRadius: '15px',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.7 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)',
              }}
            >
              {isProcessing ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
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
                </div>
              ) : (
                `Subscribe to ${plans.find((p) => p.id === selectedPlan)?.name} - $${
                  plans.find((p) => p.id === selectedPlan)?.price
                }/month`
              )}
            </button>
          </div>
        )}

        {/* Trust Indicators */}
        <div
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <p style={{ marginBottom: '1rem' }}>Trusted by 1,000+ New Zealand teachers</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔒</span>
              <span>Secure Payment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🌿</span>
              <span>Cultural Safety</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>📚</span>
              <span>NZ Curriculum Aligned</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💬</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default WorkingSubscriptionSystem;
