import axios from "axios";
import { globalConfig } from "../Global";

const PayPalPaymentApis = {};

PayPalPaymentApis.createPayment = async(amount) => {
    console.log('amount333', amount)
    try {
        const response = await axios.post(`${globalConfig.apiUrl}/api/paypal/create-payment`, { amount });
        return response.data;
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        throw error;
    }
};

PayPalPaymentApis.capturePayment = async (token) => {
    try {
        const response = await axios.post('/api/paypal/capture-payment', { token });
        return response.data;
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        throw error;
    }
};


export default PayPalPaymentApis;