import React, {useState} from 'react'
import PayPalPaymentApis from '../apis/PayPalPaymentApis';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButtonComponent from '../components/PayPalButtonComponent';

const Donate = () => {
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    };

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
                        <input type="number" value={amount} onChange={handleAmountChange} className='dark:bg-black dark:text-white focus:outline-none focus:border-[#008b66] text-black border px-3 py-2 w-full rounded mb-4 mt-2' placeholder='Enter Donation' />
                    {success ? (
                        <h2>Thank you for your donation!</h2>
                    ) : (
                        <PayPalScriptProvider options={{ 'client-id': 'AWjupKGA-YfZQhoFQ9d1WBCUlh-HEDEx51NsMhk3KaAcAy3cqF0fyCp5aRCjZAQvlGzZfWCiIg15cFhk' }}>
                            <PayPalButtonComponent
                                amount={amount}
                                onSuccess={handleSuccess}
                            />
                        </PayPalScriptProvider>
                    )}
                </div>
            ) : ''}
        </div>
    </div>
  )
}

export default Donate