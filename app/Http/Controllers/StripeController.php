<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    public function createPaymentIntent(Request $request)
    {
        $amount = $request->input('amount');
        $payerName = $request->input('payer_name');

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $amount,
                'currency' => 'usd', // Change to your desired currency
            ]);

            // Save the donation details to the database
            $donation = new Donation();
            $donation->payer_name = $payerName;
            $donation->amount = $amount / 100; // Convert from cents to dollars
            $donation->save();

            return response()->json(['clientSecret' => $paymentIntent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
