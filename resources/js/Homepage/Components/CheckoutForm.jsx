// src/components/PaymentForm.js

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, onFinish }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setError(error.message);
        } else {
            // Call your backend to process the payment
            axios.post('/payment/charge', { amount: amount })
                .then((response) => {
                    // Handle successful payment response
                    onFinish(); // Call the onFinish function passed from the parent component
                })
                .catch((error) => {
                    // Handle error
                    setError(error.message);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Pay Now</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default PaymentForm;
