const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Stripe checkout session creation
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { planId, price, billing, teacherEmail, teacherName } = req.body;

    // Create Stripe price ID based on plan
    const priceId = getStripePriceId(planId, billing);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/subscribe`,
      customer_email: teacherEmail,
      metadata: {
        planId,
        teacherName,
        billing,
      },
      subscription_data: {
        metadata: {
          planId,
          teacherName,
          billing,
        },
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to get Stripe price IDs
function getStripePriceId(planId, billing) {
  const priceIds = {
    basic: {
      monthly: 'price_basic_monthly', // Replace with actual Stripe price IDs
      yearly: 'price_basic_yearly',
    },
    professional: {
      monthly: 'price_professional_monthly',
      yearly: 'price_professional_yearly',
    },
    enterprise: {
      monthly: 'price_enterprise_monthly',
      yearly: 'price_enterprise_yearly',
    },
  };

  return priceIds[planId]?.[billing] || 'price_placeholder';
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment server running on port ${PORT}`);
  console.log(`💳 Stripe integration ready for NZ teachers`);
});
