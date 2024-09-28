const StripPaymentApis = {};

StripPaymentApis.createPaymentIntent = async(amount, payerName) => {
    try {
        const response = await axios.post('/api/stripe/create-payment-intent', { 
            amount: amount * 100, // Convert to cents
            payer_name: payerName // Send payer name
         });
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        throw error;
    }
};


export default StripPaymentApis;