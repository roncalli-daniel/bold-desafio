<?php

namespace App\Services;

use App\Tweet;
use App\Helpers\TwitterHelper;

class TweetsService
{
    /*
    |--------------------------------------------------------------------------
    | Tweets Service
    |--------------------------------------------------------------------------
    |
    | This class provides operations about Tweets
    |
    */

    /**
     * Syncronize the last tweets from a hashtag.
     *
     * @param $settings
     * @param $hashtag
     * @return int
     */
    static function sync($settings, $hashtag)
    {
        // Get the last tweets from hastag
        $json = json_decode(TwitterHelper::getByHashtag($settings, $hashtag));

        $count = 0;

        foreach($json->statuses as $tweet) {
            // Check if tweet already exists in database
            if(!Tweet::exist($tweet->id_str)) {
                $t = new Tweet();

                // Save a new tweet
                $t->tid = $tweet->id_str;
                $t->name = $tweet->user->name;
                $t->tcreated_at = $tweet->created_at;
                $t->text = $tweet->text;

                if(property_exists($tweet->entities, 'media') && count($tweet->entities->media) > 0) {
                    $t->media_url = $tweet->entities->media[0]->media_url;
                }

                $t->json = json_encode($tweet);

                $t->save();

                // Increase counter
                $count++;
            }
        }

        return $count;
    }

    /**
     * Get Tweets
     *
     * @param $skip
     * @param $take
     * @param $query
     * @return array(\Illuminate\Database\Eloquent\Collection|static[], integer)
     */
    static function get($skip = 0, $take = 3, $query = '')
    {
        $skip = ($skip == null || $skip <= 0 ? 0 : $skip);
        $take = ($take == null || $take < 0 ? 3 : $take);
        $query = ($query == '' ? null : $query);

        if($query != null) {
            $c = Tweet::where('text', 'like', '%' . $query . '%')->count();
            $t = Tweet::where('text', 'like', '%' . $query . '%')->skip($skip)->take($take)->orderBy('id', 'desc')->get();
        }
        else {
            $c = Tweet::all()->count();
            $t = Tweet::skip($skip)->take($take)->orderBy('id', 'desc')->get();
        }


        return array('tweets' => $t, 'count' => $c);
    }

    /**
     * Get the last $limit of tweets that contains image (media_url)
     *
     * @param int $limit
     * @return array
     */
    static function medias($query, $limit = 20)
    {
        $query = ($query == '' ? null : $query);

        if($query != null)  {
            $c = Tweet::where('media_url', '!=', '')->where('text', 'like', '%' . $query . '%')->count();
            $t = Tweet::where('media_url', '!=', '')->where('text', 'like', '%' . $query . '%')->take($limit)->orderBy('id', 'desc')->get();
        }
        else {
            $c = Tweet::where('media_url', '!=', '')->count();
            $t = Tweet::where('media_url', '!=', '')->take($limit)->orderBy('id', 'desc')->get();
        }

        return array('tweets' => $t, 'count' => $c);
    }
}