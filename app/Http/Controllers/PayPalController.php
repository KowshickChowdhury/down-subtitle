<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController extends Controller
{
    use CommonTrait;

    public function createPayment(Request $request)
    {
        $provider = new PayPalClient();
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $request->amount
                    ]
                ]
            ]
        ]);

        // dd($response);

        if (isset($response['id'])) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return $this->sendResponse(['approval_url' => $link['href']]);
                }
            }
        }

        return $this->sendError(['error' => 'Something went wrong'], 500);
    }

    public function paymentSuccess(Request $request)
    {
        $provider = new PayPalClient();
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();

        $response = $provider->showOrderDetails($request->token);

        // dd($response);

        if ($response['status'] == 'COMPLETED') {
            $payerName = $response['payer']['name']['given_name'];
            $amount = $response['purchase_units'][0]['amount']['value'];

            $donation = new Donation();
            $donation->payer_name = $payerName;
            $donation->amount = $amount;
            $donation->save();

            return $this->sendResponse(['message' => 'Thank You!']);
        }

        return $this->sendError(['error' => 'Payment Failed.']);
    }

    public function paymentCancel()
    {
        return $this->sendResponse(['message' => 'Payment canceled.']);
    }

}
