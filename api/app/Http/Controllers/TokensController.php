<?php

namespace App\Http\Controllers;

use App\Classes\JsonReturn;
use App\Helpers\TwitterHelper;
use App\Http\Controllers\Controller;
use App\Services\TokensService;
use App\Token;
use Mockery\CountValidator\Exception;

class TokensController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Tokens Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for generate tokens to access the App's api.
    |
    */

    /**
     * Get a new token to access API
     *
     * @return JsonReturn
     */
    public function get()
    {

        return new JsonReturn(true, array('token' => TokensService::generate()->token, 'hashtag' => config('twitter.hashtag')));

    }

}
