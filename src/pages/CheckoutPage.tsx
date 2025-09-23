import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, User, BookOpen, Shield, Lock, ArrowLeft } from 'lucide-react';
import { stripeProcessor, PaymentPlan, calculateNZPricing } from '../services/stripe-integration';
import styles from './CheckoutPage.module.css';
import LoadingSpinner from '../components/LoadingSpinner';

const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    goals: [] as string[],
  });

  useEffect(() => {
    const planId = searchParams.get('plan');
    const billing = searchParams.get('billing');

    if (billing === 'monthly' || billing === 'yearly') {
      setBillingPeriod(billing);
    }

    if (planId) {
      const allPlans = stripeProcessor.getPaymentPlans();
      const planDetails = allPlans.find(p => p.id.startsWith(planId) && p.interval === (billing || 'yearly'));
      if (planDetails) {
        setSelectedPlan(planDetails);
      } else {
        // Handle case where plan is not found, maybe redirect
        navigate('/pricing');
      }
    } else {
      navigate('/pricing');
    }
    setIsLoading(false);
  }, [searchParams, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handlePayment = async () => {
    if (!selectedPlan) return;
    setIsProcessing(true);
    try {
      await stripeProcessor.initialize();
      const sessionId = await stripeProcessor.createCheckoutSession(
        selectedPlan.id,
        formData.email,
        formData.name
      );
      await stripeProcessor.redirectToCheckout(sessionId);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("An error occurred during checkout. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isLoading || !selectedPlan) {
    return <LoadingSpinner />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepUserInfo formData={formData} onInputChange={handleInputChange} />;
      case 2:
        return <StepGoals formData={formData} onGoalToggle={handleGoalToggle} />;
      case 3:
        return <StepReview plan={selectedPlan} formData={formData} />;
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1) {
      return !formData.name || !formData.email;
    }
    if (currentStep === 2) {
      return formData.goals.length === 0;
    }
    return false;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.checkoutBox}>
        <div className={styles.header}>
          <h1 className={styles.title}>Te Ao Mārama Checkout</h1>
          <p className={styles.subtitle}>You're just a few steps away from transforming your teaching.</p>
        </div>

        <div className={styles.progressIndicator}>
          {[1, 2, 3].map(step => (
            <React.Fragment key={step}>
              <div className={`${styles.step} ${currentStep >= step ? styles.active : ''}`}>
                {currentStep > step ? <CheckCircle size={20} /> : step}
              </div>
              {step < 3 && <div className={`${styles.connector} ${currentStep > step ? styles.active : ''}`} />}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          {currentStep > 1 && (
            <button onClick={prevStep} className={styles.prevButton}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          {currentStep < 3 ? (
            <button onClick={nextStep} className={styles.nextButton} disabled={isNextDisabled()}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handlePayment} className={styles.payButton} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : (
                <>
                  <Lock size={16} /> Proceed to Payment
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const StepUserInfo = ({ formData, onInputChange }: any) => (
  <div>
    <h2 className={styles.stepTitle}><User /> Your Details</h2>
    <div className={styles.formGroup}>
      <label>Full Name</label>
      <input type="text" value={formData.name} onChange={e => onInputChange('name', e.target.value)} placeholder="e.g., Jane Smith" />
    </div>
    <div className={styles.formGroup}>
      <label>Email Address</label>
      <input type="email" value={formData.email} onChange={e => onInputChange('email', e.target.value)} placeholder="e.g., jane.smith@school.nz" />
    </div>
    <div className={styles.formGroup}>
      <label>School / Kura (Optional)</label>
      <input type="text" value={formData.school} onChange={e => onInputChange('school', e.target.value)} placeholder="e.g., Te Kura o Te Ao Mārama" />
    </div>
  </div>
);

const StepGoals = ({ formData, onGoalToggle }: any) => {
  const goals = [
    'Boost Student Engagement',
    'Enhance Cultural Integration',
    'Utilize Data-Driven Insights',
    'Improve Planning Efficiency',
  ];
  return (
    <div>
      <h2 className={styles.stepTitle}><BookOpen /> Your Goals</h2>
      <p className={styles.stepDescription}>Select your primary goals to help us personalize your experience.</p>
      <div className={styles.goalsGrid}>
        {goals.map(goal => (
          <button
            key={goal}
            onClick={() => onGoalToggle(goal)}
            className={`${styles.goalButton} ${formData.goals.includes(goal) ? styles.selected : ''}`}
          >
            {formData.goals.includes(goal) && <CheckCircle size={16} />}
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
};

const StepReview = ({ plan, formData }: any) => {
  const pricing = calculateNZPricing(plan);
  return (
    <div>
      <h2 className={styles.stepTitle}><Shield /> Review Your Order</h2>
      <div className={styles.summaryBox}>
        <div className={styles.summaryHeader}>
          <h3>{plan.name}</h3>
          <p>{plan.interval === 'year' ? 'Billed Annually' : 'Billed Monthly'}</p>
        </div>
        <div className={styles.priceDetails}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>{stripeProcessor.formatPrice(pricing.subtotal, plan.currency)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>GST (15%)</span>
            <span>{stripeProcessor.formatPrice(pricing.gst, plan.currency)}</span>
          </div>
          <div className={`${styles.priceRow} ${styles.total}`}>
            <span>Total</span>
            <span>{stripeProcessor.formatPrice(pricing.total, plan.currency)}</span>
          </div>
        </div>
        <div className={styles.userInfo}>
          <h4>Account Details</h4>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          {formData.school && <p><strong>School:</strong> {formData.school}</p>}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
