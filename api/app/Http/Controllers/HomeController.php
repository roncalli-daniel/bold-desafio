<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\Token;

class HomeController extends Controller
{
    /**
     * Home API
     *
     * @return void
     */
    public function index()
    {
        return view('home.index');
    }
}
