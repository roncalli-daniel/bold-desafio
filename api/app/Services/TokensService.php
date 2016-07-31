<?php

namespace App\Services;

use App\Token;
use Illuminate\Support\Facades\Hash;

class TokensService
{
    /*
    |--------------------------------------------------------------------------
    | Tokens Service
    |--------------------------------------------------------------------------
    |
    | This class provides operations about Tokens
    |
    */

    /**
     * Generate a new Hash
     *
     * @return mixed
     */
    static function hash() {
        return Hash::make(time());
    }

    /**
     * Generate a new token to access API
     *
     * @return int
     */
    static function generate()
    {
        $token = new Token();
        
        $token->token = self::hash();
        $token->save();

        return $token;
    }
}