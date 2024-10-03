import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripPaymentApis from '../apis/StripPaymentApis';

const StripePaymentComponent = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [payerName, setPayerName] = useState(''); // State to hold payer name

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Call your backend to create a payment intent with payer name
            const { clientSecret } = await StripPaymentApis.createPaymentIntent(amount, payerName);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (stripeError) {
                setError(stripeError.message);
                setSuccess(false);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess(true);
                setError('');
            }
        } catch (error) {
            setError('Payment failed. Please try again.');
            console.error('Payment Intent Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handlePayment}>
                <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Enter your name"
                    className="dark:bg-black dark:text-white border border-gray-300 p-2 rounded mb-4 w-full"
                    required
                />
                <CardElement className="border border-gray-300 p-2 rounded mb-4 dark:bg-white w-96" />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success ? (
                    <h2 className='dark:text-white'>Thank you for your donation!</h2>
                ) : (
                    <div className='grid justify-center'>
                        <button
                            type="submit"
                            className="text-white px-5 py-2 bg-[#008b66] rounded my-4 md:my-0 font-semibold"
                            disabled={!stripe}>
                            Donate with Stripe
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default StripePaymentComponent;
