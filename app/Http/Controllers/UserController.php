<?php

namespace App\Http\Controllers;

use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use CommonTrait;

    public function index()
    {
        $user = Auth::user();
        return $this->sendResponse($user);
    }
}
