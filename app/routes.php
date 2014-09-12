<?php
// Your index route, leave this here
//Route::get('/', 'HomeController@getIndex');

//// Cycle through the pages and dynamically generate routes for them
//foreach (Bumble::get('page')->getItems() as $page)
//{
//    Route::get($page->get('slug'), $page->get('title').'Controller@getIndex');
//}

$user = \Monarkee\Bumble\Models\User::find(1);
$user->password = Hash::make('Matt10:29');
$user->save();