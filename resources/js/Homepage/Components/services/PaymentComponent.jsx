// src/components/Payment.js

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import stripePromise from '../services/stripe';

const stripePromise = loadStripe('your_stripe_publishable_key');

const Payment = ({ amount }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
        </Elements>
    );
};

export default Payment;
