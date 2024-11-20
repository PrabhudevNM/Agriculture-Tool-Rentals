import Payment from "../Models/payment-model.js";
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const paymentsCltr = {};

paymentsCltr.pay = async (req, res) => {
  try {
    const { productId, productName, rentalPriceForTime, customerName, customerAddress } = req.body;

    // Validate required fields
    if (!productId || !productName || !rentalPriceForTime?.[0]?.price) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required payment information' 
      });
    }

    const amount = rentalPriceForTime[0].price;

    // Create a customer
    const customer = await stripe.customers.create({
      name: customerName || 'Guest Customer',
      address: customerAddress || {
        line1: 'India',
        postal_code: '560004',
        city: 'Bengaluru',
        state: 'KA',
        country: 'IN'
      }
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: productName
          },
          unit_amount: Math.round(amount * 100) // Convert to paise
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: "https://agriculture-tool-rentals.onrender.com/success" || process.env.SUCCESS_URL ,
      cancel_url: "https://agriculture-tool-rentals.onrender.com/cancel" || process.env.CANCEL_URL ,
      customer: customer.id,
    });

    // Save payment record
    const payment = new Payment({
      productId,
      productName,
      amount,
      transactionId: session.id,
      paymentStatus: 'pending',
      paymentType: 'card',
      customerId: customer.id
    });

    await payment.save();

    res.status(200).json({ 
      success: true,
      id: session.id,
      url: session.url
    });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Payment processing failed',
      message: error.message
    });
  }
}

// Edit Payment
paymentsCltr.edit = async (req, res) => {
  const { id } = req.params;  //  transactionId

  try {
    // Find payment by the transaction ID
    const payment = await Payment.findOne({ transactionId: id });
    
    if (!payment) {
      return res.status(404).json({ error: "Payment not found or you're not authorized to edit" });
    }

    const body = req.body;    
    // Update the payment status
    payment.paymentStatus = body.paymentStatus; // Ensure the key matches

    await payment.save();
    
    return res.status(200)
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



export default paymentsCltr;
