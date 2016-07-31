<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Classes\JsonReturn;
use App\Services\TweetsService;
use App\Tweet;

class TweetsController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Tweets Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for operations about Tweets
    |
    */

    /**
     * Get Tweets
     *
     * @return JsonReturn
     */
    public function get(Request $request)
    {

        return new JsonReturn(true, TweetsService::get( $request->input('skip'),
                                                        $request->input('take'),
                                                        $request->input('query')));

    }

    /**
     * Get tweets that contains image (media_url)
     *
     * @return JsonReturn
     */
    public function medias(Request $request)
    {

        return new JsonReturn(true, TweetsService::medias($request->input('query'), $request->input('limit')));

    }

}
