<?php
Route::group(['prefix' => Config::get('bumble::admin_prefix')], function()
{
    Route::get(Config::get('bumble::admin.login'), ['as' => 'bumble.login', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogin']);
    Route::post(Config::get('bumble::admin.login'), ['as' => 'bumble.login.post', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@postLogin']);
    Route::get(Config::get('bumble::admin.logout'), ['as' => 'bumble.logout', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogout']);
    Route::get(Config::get('bumble::admin.forgot_password'), ['as' => 'bumble.forgot-password', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getForgotPassword']);
    Route::post(Config::get('bumble::admin.forgot_password'), ['as' => 'bumble.forgot-password.post', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@postForgotPassword']);
    Route::get(Config::get('bumble::admin.reset_password').'/{token}', ['as' => 'bumble.reset-password', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getReset']);
    Route::post(Config::get('bumble::admin.reset_password'), ['as' => 'bumble.reset-password.post', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@postReset']);

    Route::group(['before' => 'bumble_auth'], function()
    {
        Route::get('/', ['as' => 'bumble_index', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@redirectToIndex']);
        Route::get(Config::get('bumble::admin.dashboard'), ['as' => 'bumble.dashboard', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@getIndex']);

        $modelRepo = App::make('Monarkee\Bumble\Repositories\ModelRepository');

        foreach ($modelRepo->getModels() as $model)
        {
            Route::resource(resource_name($model->getPluralSlug()), 'Monarkee\Bumble\Controllers\PostController', [
                'except' => ['show']
            ]);

            if ($model->isSoftDeleting())
            {
                Route::get(resource_name($model->getPluralSlug()).'/trashed', [
                    'as' => Config::get('bumble::admin_prefix').'.'.resource_name($model->getPluralSlug()).'.trashed',
                    'uses' => 'Monarkee\Bumble\Controllers\PostController@trashed'
                ]);

                Route::put(resource_name($model->getPluralSlug()).'/restore/{id}', [
                    'as' => Config::get('bumble::admin_prefix').'.'.resource_name($model->getPluralSlug()).'.restore',
                    'uses' => 'Monarkee\Bumble\Controllers\PostController@restore'
                ]);

                Route::delete(resource_name($model->getPluralSlug()).'/annihilate/{id}', [
                    'as' => Config::get('bumble::admin_prefix').'.'.resource_name($model->getPluralSlug()).'.annihilate',
                    'uses' => 'Monarkee\Bumble\Controllers\PostController@annihilate'
                ]);
            }
        }
        });
});
