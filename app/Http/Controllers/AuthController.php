<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    use CommonTrait;

    public function redirectToGoogle()
    {
        $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();
        return response()->json(['url' => $url]);
    }

    public function handleGoogleCallback()
    {
        // Retrieve user from Google
        $googleUser = Socialite::driver('google')->stateless()->user();
        // Check if the user already exists in the database
        $user = User::updateOrCreate(
            ['google_id' => $googleUser->id],
            [
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'avatar' => $googleUser->avatar,
                'google_token' => $googleUser->token,
                'google_refresh_token' => $googleUser->refreshToken,
            ]
        );
    
        $token = $user->createToken('DownSubtitle')->plainTextToken;
        $frontendUrl = 'http://localhost:3000/auth/google/callback';
        return redirect()->away("{$frontendUrl}?token={$token}");
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return $this->sendResponse(['msg' => 'Logged out successfully']);
    }
}
