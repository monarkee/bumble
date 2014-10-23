<?php

Route::filter('bumble_auth', function()
{
    if (Auth::guest()) return Redirect::guest(route('bumble_login'));
});