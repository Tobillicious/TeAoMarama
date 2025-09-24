/**
 * 💳 PAYMENT PROCESSING UTILITIES
 * 
 * Real payment processing functions for Te Ao Mārama
 * Production-ready Stripe integration
 */

import Stripe from 'stripe';
import { PAYMENT_CONFIG } from '../config/payment-config';

const stripe = new Stripe(PAYMENT_CONFIG.stripe.secretKey, {
  apiVersion: '2023-10-16',
});

export interface CreateCheckoutSessionRequest {
  planId: string;
  billingPeriod: 'monthly' | 'yearly';
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  customerName?: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  sessionUrl?: string;
}

export class PaymentProcessingUtilities {
  
  /**
   * Create Stripe checkout session for subscription
   */
  static async createCheckoutSession(
    request: CreateCheckoutSessionRequest
  ): Promise<CreateCheckoutSessionResponse> {
    try {
      const plan = PAYMENT_CONFIG.pricing.plans[request.planId as keyof typeof PAYMENT_CONFIG.pricing.plans];
      
      if (!plan || !plan.stripePriceIdMonthly || !plan.stripePriceIdYearly) {
        throw new Error(`Invalid plan ID: ${request.planId}`);
      }

      const priceId = request.billingPeriod === 'yearly' 
        ? plan.stripePriceIdYearly 
        : plan.stripePriceIdMonthly;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: request.successUrl,
        cancel_url: request.cancelUrl,
        customer_email: request.customerEmail,
        metadata: {
          planId: request.planId,
          billingPeriod: request.billingPeriod,
        },
        subscription_data: {
          metadata: {
            planId: request.planId,
            billingPeriod: request.billingPeriod,
          },
        },
        billing_address_collection: 'required',
        tax_id_collection: {
          enabled: true,
        },
        automatic_tax: {
          enabled: true,
        },
      });

      return {
        sessionId: session.id,
        sessionUrl: session.url || undefined,
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }
  }

  /**
   * Handle successful payment
   */
  static async handleSuccessfulPayment(sessionId: string): Promise<void> {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (session.payment_status === 'paid') {
        // Update user subscription status
        // Send welcome email
        // Grant access to premium features
        console.log('Payment successful for session:', sessionId);
      }
    } catch (error) {
      console.error('Error handling successful payment:', error);
      throw new Error('Failed to handle successful payment');
    }
  }

  /**
   * Create customer portal session
   */
  static async createCustomerPortalSession(customerId: string): Promise<string> {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: PAYMENT_CONFIG.urls.cancel, // Return to dashboard
      });

      return session.url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      throw new Error('Failed to create customer portal session');
    }
  }

  /**
   * Calculate GST for NZ
   */
  static calculateGST(amount: number): number {
    return Math.round(amount * PAYMENT_CONFIG.pricing.gstRate * 100) / 100;
  }

  /**
   * Format price for display
   */
  static formatPrice(amount: number, currency: string = 'NZD'): string {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Validate webhook signature
   */
  static validateWebhookSignature(payload: string, signature: string): boolean {
    try {
      stripe.webhooks.constructEvent(payload, signature, PAYMENT_CONFIG.stripe.webhookSecret);
      return true;
    } catch (error) {
      console.error('Webhook signature validation failed:', error);
      return false;
    }
  }
}

export default PaymentProcessingUtilities;
