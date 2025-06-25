import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';

const CheckoutForm = ({ cart_items_ids }) => {

    const createStripeSession = async () => {
        try {
            let formValues = new FormData();
            formValues.append('cart_items_ids', cart_items_ids);

            const response = await axios.post('/session', formValues);

            window.location.href = response.data.url;
        } catch (error) {
            console.error('Error creating Stripe session:', error);
        }
    };

    const handleCheckout = () => {
        createStripeSession();
    };

    return (
        <div className="checkout">
            <Button className='btn btn-primary btn-home-primary' onClick={handleCheckout}>
                Checkout
            </Button>
        </div>
    );
};

export default CheckoutForm;
