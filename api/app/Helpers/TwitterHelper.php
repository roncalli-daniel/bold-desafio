<?php

namespace App\Helpers;

use TwitterAPIExchange;

class TwitterHelper
{
    /*
    |--------------------------------------------------------------------------
    | Twitter Helper
    |--------------------------------------------------------------------------
    |
    | This class helps to use Twitter API.
    |
    */
    static $url_search = 'https://api.twitter.com/1.1/search/tweets.json';

    /**
     * Get tweets from hashtag
     *
     * @param $settings
     * @param $h
     * @return mixed
     */
    public static function getByHashtag($settings, $h) {
        $getField = '?q=#' . $h;
        $requestMethod = 'GET';

        $twitter = new TwitterAPIExchange($settings);
        $response = $twitter->setGetfield($getField)
            ->buildOauth(TwitterHelper::$url_search, $requestMethod)
            ->performRequest();

        return $response;
    }
}