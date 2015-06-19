<?php

use Aws\S3\S3Client;
use League\Flysystem\AwsS3v2\AwsS3Adapter;
use League\Flysystem\Filesystem;

Route::group(['prefix' => config('bumble.admin_prefix'), 'namespace' => 'Monarkee\Bumble\Controllers'], function()
{
    Route::get(config('bumble.admin.login'), ['as' => 'bumble.login', 'uses' => 'LoginController@getLogin']);
    Route::post(config('bumble.admin.login'), ['as' => 'bumble.login.post', 'uses' => 'LoginController@postLogin']);
    Route::get(config('bumble.admin.logout'), ['as' => 'bumble.logout', 'uses' => 'LoginController@getLogout']);
    Route::get(config('bumble.admin.forgot_password'), ['as' => 'bumble.forgot-password', 'uses' => 'LoginController@getForgotPassword']);
    Route::post(config('bumble.admin.forgot_password'), ['as' => 'bumble.forgot-password.post', 'uses' => 'LoginController@postForgotPassword']);
    Route::get(config('bumble.admin.reset_password').'/{token}', ['as' => 'bumble.reset-password', 'uses' => 'LoginController@getReset']);
    Route::post(config('bumble.admin.reset_password'), ['as' => 'bumble.reset-password.post', 'uses' => 'LoginController@postReset']);

    // Image Cache Routes
    Route::get('cache/s3/{path?}', function($path)
    {
        $client = S3Client::factory(array(
            'key'    => config('bumble.S3-key'),
            'secret' => config('bumble.S3-secret'),
        ));

        // Setup Glide server
        $server = League\Glide\ServerFactory::create([
            'base_url' => config("bumble.admin_prefix") . '/cache/s3/',
            'source' => new Filesystem(new AwsS3Adapter($client, config('bumble.bucket_name'))),
            'cache' => public_path('cache'),
        ]);

        // Or better yet, output the image based on the current URL
        $server->outputImage($path, $_GET);
    })->where('path', '(.*)');

    Route::get('cache/{path?}', function($path)
    {
        // Setup Glide server
        $server = League\Glide\ServerFactory::create([
            'base_url' => config("bumble.admin_prefix") . '/cache/',
            'source' => public_path(),
            'cache' => public_path('cache'),
        ]);

        // Or better yet, output the image based on the current URL
        $server->outputImage($path, $_GET);
    })->where('path', '(.*)');

    Route::group(['before' => 'bumble_auth'], function()
    {
        Route::get('/', ['as' => 'bumble_index', 'uses' => 'DashboardController@redirectToIndex']);
        Route::get(config('bumble.admin.dashboard'), ['as' => 'bumble.dashboard', 'uses' => 'DashboardController@getIndex']);

        /*
        |--------------------------------------------------------------------------
        | Assets Routes
        |--------------------------------------------------------------------------
        */
        Route::resource('assets', 'AssetController', ['except' => ['show']]);

        Route::get('assets/trashed', [
            'as' => config('bumble.admin_prefix').'.'.'assets.trashed',
            'uses' => 'AssetController@trashed'
        ]);

        Route::put('assets/restore/{id}', [
            'as' => config('bumble.admin_prefix').'.'.'assets.restore',
            'uses' => 'AssetController@restore'
        ]);

        Route::delete('assets/annihilate/{id}', [
            'as' => config('bumble.admin_prefix').'.'.'assets.annihilate',
            'uses' => 'AssetController@annihilate'
        ]);

        /*
        |--------------------------------------------------------------------------
        | Model Routes
        |--------------------------------------------------------------------------
        */

        $modelRepo = app()->make('Monarkee\Bumble\Repositories\ModelRepository');

        foreach ($modelRepo->getModels() as $model)
        {
            Route::resource(resource_name($model->getPluralSlug()), 'PostController', [
                'except' => ['show']
            ]);

            if ($model->isSoftDeleting())
            {
                Route::get(resource_name($model->getPluralSlug()).'/trashed', [
                    'as' => config('bumble.admin_prefix').'.'.resource_name($model->getPluralSlug()).'.trashed',
                    'uses' => 'PostController@trashed'
                ]);

                Route::put(resource_name($model->getPluralSlug()).'/restore/{id}', [
                    'as' => config('bumble.admin_prefix').'.'.resource_name($model->getPluralSlug()).'.restore',
                    'uses' => 'PostController@restore'
                ]);

                Route::delete(resource_name($model->getPluralSlug()).'/annihilate/{id}', [
                    'as' => config('bumble.admin_prefix').'.'.resource_name($model->getPluralSlug()).'.annihilate',
                    'uses' => 'PostController@annihilate'
                ]);
            }
        }
    });
});
