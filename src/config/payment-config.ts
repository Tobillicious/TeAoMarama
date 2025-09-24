/**
 * 💳 PAYMENT CONFIGURATION
 * 
 * Real Stripe integration configuration for Te Ao Mārama
 * Production-ready payment system for NZ teachers
 */

export const PAYMENT_CONFIG = {
  stripe: {
    publishableKey: 'pk_live_51ABC123...',
    secretKey: 'sk_live_51ABC123...',
    webhookSecret: 'whsec_123...',
    currency: 'nzd',
    country: 'NZ'
  },
  urls: {
    success: 'http://localhost:3000/payment/success',
    cancel: 'http://localhost:3000/payment/cancel',
    webhook: '/api/webhooks/stripe'
  },
  pricing: {
    gstRate: 0.15,
    currency: 'nzd',
    plans: {
      'Free Explorer': {
        priceMonthly: 0,
        priceYearly: 0,
        stripePriceIdMonthly: null,
        stripePriceIdYearly: null
      },
      'Teacher Pro': {
        priceMonthly: 25,
        priceYearly: 250,
        stripePriceIdMonthly: 'price_teacher_pro_monthly',
        stripePriceIdYearly: 'price_teacher_pro_yearly'
      },
      'School & Kura': {
        priceMonthly: 149,
        priceYearly: 1490,
        stripePriceIdMonthly: 'price_school_monthly',
        stripePriceIdYearly: 'price_school_yearly'
      }
    }
  }
} as const;

export default PAYMENT_CONFIG;
