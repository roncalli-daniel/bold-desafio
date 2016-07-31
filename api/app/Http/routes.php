<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', ['middleware'=>'cors', 'uses' => 'HomeController@index']);

Route::get('/tokens', ['middleware'=>'cors', 'uses' => 'TokensController@get']);

Route::put('/sync', ['middleware'=>'cors', 'uses' => 'SyncController@syncTweets']);

Route::get('/tweets', ['middleware'=>'cors', 'uses' => 'TweetsController@get']);

Route::get('/tweets/medias', ['middleware'=>'cors', 'uses' => 'TweetsController@medias']);