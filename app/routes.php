<?php
Route::get('/', [
    'as' => 'home',
    'uses' => 'HomeController@getIndex',
]);
