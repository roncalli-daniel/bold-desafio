<?php

namespace App\Http\Controllers;

use App\Classes\JsonReturn;
use App\Services\TweetsService;
use App\Http\Controllers\Controller;


class SyncController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Sync Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible to syncronize tweets with database.
    |
    */

    /**
     * Syncronize last tweets (from Twitter) with database
     * and return count of tweets storaged
     *
     * @return void
     */
    public function syncTweets()
    {

        return new JsonReturn(true, TweetsService::sync(config('twitter.settings'), config('twitter.hashtag')));
        
    }
}
