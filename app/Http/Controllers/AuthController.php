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
        $user = User::where('google_id', $googleUser->id)->first();
        // dd($user);

        if ($user) {
            // User exists, generate a Sanctum token
            $token = $user->createToken('DownSubtitle')->plainTextToken;
            // return $this->sendResponse($token);
        } else {
            // Create a new user if they don't exist
            $newUser = User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
            ]);

            $token = $newUser->createToken('DownSubtitle')->plainTextToken;
            // return $this->sendResponse($token);
        }
        $frontendUrl = 'http://127.0.0.1:8000/auth/google/callback';
        return redirect()->away("{$frontendUrl}?token={$token}");
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return $this->sendResponse(['msg' => 'Logged out successfully']);
    }
}
