import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import PayPalPaymentApis from '../apis/PayPalPaymentApis';

const PayPalButtonComponent = ({ amount, onSuccess }) => {

  const createOrder = async (data, actions) => {
    try {
      const response = await PayPalPaymentApis.createPayment(amount);
      console.log('response', response)
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: amount
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const capture = await actions.order.capture();
      await PayPalPaymentApis.capturePayment(capture.id);

      onSuccess();
    } catch (error) {
      console.error('Error capturing payment:', error);
    }
  };

  const onError = (error) => {
    console.error('PayPal Button Error:', error);
  };

  return (
    <div>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        style={{ layout: 'vertical' }}
      />
    </div>
  );
};

export default PayPalButtonComponent;
