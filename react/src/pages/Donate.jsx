import React, {useState} from 'react'
import PayPalPaymentApis from '../apis/PayPalPaymentApis';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButtonComponent from '../components/PayPalButtonComponent';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentComponent from '../components/StripePaymentComponent';

const stripePromise = loadStripe('pk_test_51Q3t1UBQe0eFeUhhb0Ok0NvNF7pwpbgL4kA9XPtaWjKNwt4Y5rVehBoOtM3NJL3dJaqY2wyEWbPM0ebN99YrO51L0013c6Momj');

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    };

    console.log('amount', amount)

    // const createOrder = async () => {
    //     try {
    //         const res = await PayPalPaymentApis.createPayment(amount);
    //         return res.approval_url;
    //     } catch (error) {
    //         console.error('Error Creating Order:', error)
    //     }
    // }

    // const onApprove = async (data) => {
    //     try {
    //         const res = await PayPalPaymentApis.capturePayment(data.orderID);
    //         if (res.success) {
    //             setSuccess(true);
    //         } else {
    //             console.error('Payment Failed:', res.error)
    //         }
    //     } catch (error) {
    //         console.error('Error Capturing Payment:', error)
    //     }
    // }

    const handleSuccess = () => {
        setSuccess(true);
    };

    const handleShowPaymentMethod = () => {
        if (!showPaymentMethod) {
            setShowPaymentMethod(true);
        } else {
            setShowPaymentMethod(false);
        }
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='border dark:border-slate-600 dark:bg-[#161616] bg-white p-4 rounded my-4'>
            <div className='flex items-center text-xl font-semibold justify-center mt-2'>
                <span className='dark:text-white text-black font-bold text-2xl'>Make a donation to support us</span>
            </div>
            <div className='grid justify-center my-4'>
                <button className='text-white px-5 py-2 bg-[#008b66] rounded my-4 md:my-0 font-semibold' onClick={handleShowPaymentMethod}>Donate</button>
            </div>
            {!showPaymentMethod && (
                <div className='grid justify-center'>
                    <img src="https://downsub.com/img/paypal.png" alt="" />
                </div>
            )}
            {showPaymentMethod ? (
                <div className='grid justify-center'>
                        <input type="number" value={amount} onChange={handleAmountChange} className='dark:bg-black dark:text-white focus:outline-none focus:border-[#008b66] text-black border px-3 py-2 rounded mb-4 mt-2 w-96' placeholder='Enter Donation Amount' />
                        <div className='dark:text-white text-center font-medium'>Choose a payment method</div>
                        <div className='flex justify-center my-4'>
                            <button
                                onClick={() => handlePaymentMethodChange('paypal')}
                                className={`px-4 py-2 rounded-l ${paymentMethod === 'paypal' ? 'bg-[#008b66] text-white' : 'bg-gray-200 text-black'}`}>
                                PayPal
                            </button>
                            <button
                                onClick={() => handlePaymentMethodChange('stripe')}
                                className={`px-4 py-2 rounded-r ${paymentMethod === 'stripe' ? 'bg-[#008b66] text-white' : 'bg-gray-200 text-black'}`}>
                                Stripe
                            </button>
                        </div>
                    {success ? (
                        <h2>Thank you for your donation!</h2>
                    ) : (
                        <>
                            {paymentMethod === 'paypal' ? (
                                <PayPalScriptProvider options={{ 'client-id': 'AWjupKGA-YfZQhoFQ9d1WBCUlh-HEDEx51NsMhk3KaAcAy3cqF0fyCp5aRCjZAQvlGzZfWCiIg15cFhk' }}>
                                    <PayPalButtonComponent
                                        amount={amount}
                                        onSuccess={handleSuccess}
                                    />
                                </PayPalScriptProvider>
                            ) : (
                                <Elements stripe={stripePromise}>
                                    <StripePaymentComponent amount={amount} />
                                </Elements>
                            )}
                        </>
                    )}
                </div>
            ) : ''}
        </div>
    </div>
  )
}

export default Donate