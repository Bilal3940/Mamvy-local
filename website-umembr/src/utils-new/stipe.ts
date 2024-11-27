// Import the loadStripe function from the Stripe.js library
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PgM3ERrXZMuJmTGxuePJkqFCbXYgnV35djshusb2zYOQlydY7LqxBMVZJxYJ9zyCEOooyjo91mKyzf6TUERzvoz001jFYTYq6'); // Replace with your own Stripe publishable key

// Export the stripePromise so that it can be used in other parts of the app
export default stripePromise;
