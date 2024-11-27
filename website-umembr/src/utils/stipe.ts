// Import the loadStripe function from the Stripe.js library
import { loadStripe } from '@stripe/stripe-js';
import { stripe_public_key } from './path';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(stripe_public_key); // Replace with your own Stripe publishable key

// Export the stripePromise so that it can be used in other parts of the app
export default stripePromise;
