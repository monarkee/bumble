<?php

Route::group(['prefix' => config('bumble.admin_prefix'), 'namespace' => 'Monarkee\Bumble\Controllers'], function()
{
    Route::get(config('bumble.admin.login'), ['as' => 'bumble.login', 'uses' => 'LoginController@getLogin']);
    Route::post(config('bumble.admin.login'), ['as' => 'bumble.login.post', 'uses' => 'LoginController@postLogin']);
    Route::get(config('bumble.admin.logout'), ['as' => 'bumble.logout', 'uses' => 'LoginController@getLogout']);
    Route::get(config('bumble.admin.forgot_password'), ['as' => 'bumble.forgot-password', 'uses' => 'LoginController@getForgotPassword']);
    Route::post(config('bumble.admin.forgot_password'), ['as' => 'bumble.forgot-password.post', 'uses' => 'LoginController@postForgotPassword']);
    Route::get(config('bumble.admin.reset_password').'/{token}', ['as' => 'bumble.reset-password', 'uses' => 'LoginController@getReset']);
    Route::post(config('bumble.admin.reset_password'), ['as' => 'bumble.reset-password.post', 'uses' => 'LoginController@postReset']);

    Route::group(['before' => 'bumble_auth'], function()
    {
        Route::get('/', ['as' => 'bumble_index', 'uses' => 'DashboardController@redirectToIndex']);
        Route::get(config('bumble.admin.dashboard'), ['as' => 'bumble.dashboard', 'uses' => 'DashboardController@getIndex']);

        $modelRepo = App::make('Monarkee\Bumble\Repositories\ModelRepository');

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
