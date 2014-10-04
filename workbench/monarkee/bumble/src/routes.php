<?php

use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;

Route::group(['prefix' => Config::get('bumble::admin_prefix')], function()
{
    Route::get('/errors', [
        'as' => 'errors',
        'uses' => 'Monarkee\Bumble\Controllers\PostController@errors'
    ]);

    /*
    |--------------------------------------------------------------------------
    | Sort Modules
    |--------------------------------------------------------------------------
    */
    Route::post('api/modules/sort', [
        'as' => 'admin.api.modules.sort',
        'uses' => 'Monarkee\Bumble\Controllers\ApiController@sort'
    ]);

    Route::get(Config::get('bumble::admin.login'), ['as' => 'bumble_login', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogin']);
    Route::post(Config::get('bumble::admin.login'), 'Monarkee\Bumble\Controllers\LoginController@postLogin');
    Route::get(Config::get('bumble::admin.logout'), ['as' => 'bumble_logout', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogout']);

    Route::group(['before' => 'bumble_auth'], function()
    {
        Route::get('/', ['as' => 'bumble_index', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@redirectToIndex']);
        Route::get(Config::get('bumble::admin.dashboard'), ['as' => 'bumble_dashboard', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@getIndex']);

        $modelRepo = App::make('Monarkee\Bumble\Repositories\ModelRepository');

        foreach ($modelRepo->getModels(true) as $modelName)
        {
            Route::resource(resource_name($modelName->getPluralSlug()), 'Monarkee\Bumble\Controllers\PostController');
        }
        });
});
