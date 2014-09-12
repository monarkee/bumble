<?php

use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;

Route::group(['prefix' => Config::get('bumble::urls.admin_prefix')], function()
{
    $modelRepo = App::make('Monarkee\Bumble\Repositories\ModelRepository');

    foreach ($modelRepo->getModelNames() as $modelName)
    {
        Route::resource(resource_name($modelName), 'Monarkee\Bumble\Controllers\PostController');
    }

    /*
    |--------------------------------------------------------------------------
    | Sort Modules
    |--------------------------------------------------------------------------
    */
    Route::post('api/modules/sort', [
        'as' => 'admin.api.modules.sort',
        'uses' => 'Monarkee\Bumble\Controllers\ApiController@sort'
    ]);

    Route::get(Config::get('bumble::urls.admin.login'), ['as' => 'bumble_login', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogin']);
    Route::post(Config::get('bumble::urls.admin.login'), 'Monarkee\Bumble\Controllers\LoginController@postLogin');
    Route::get(Config::get('bumble::urls.admin.logout'), ['as' => 'bumble_logout', 'uses' => 'Monarkee\Bumble\Controllers\LoginController@getLogout']);

    Route::group(['before' => 'bumble_auth'], function()
    {
        Route::get('/', ['as' => 'bumble_index', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@redirectToIndex']);
        Route::get(Config::get('bumble::urls.admin.dashboard'), ['as' => 'bumble_dashboard', 'uses' => 'Monarkee\Bumble\Controllers\DashboardController@getIndex']);

        // Modules
        Route::get('modules', ['as' => 'bumble_modules', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@getIndex']);
        Route::get('modules/create', ['as' => 'bumble_modules_create', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@getCreate']);
        Route::post('modules/create', ['as' => 'bumble_modules_create_post', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@postCreate']);
        Route::get('modules/edit/{id}', ['as' => 'bumble_modules_edit', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@getEdit']);
        Route::post('modules/edit/{id}', 'Monarkee\Bumble\Controllers\ModuleController@postEdit');
        Route::get('modules/delete/{id}', ['as' => 'bumble_modules_delete', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@getDelete']);
        Route::post('modules/delete/{id}', ['as' => 'bumble_modules_delete_post', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@postDelete']);
        Route::get('modules/{id}/components', ['as' => 'bumble_modules_components', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@getComponents']);
        Route::post('modules/{id}/components', ['as' => 'bumble_modules_components_post', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@postComponents']);
        Route::put('modules/{id}/components', ['as' => 'bumble_modules_components_put', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@putComponent']);
        Route::delete('modules/{id}/components', ['as' => 'bumble_modules_components_delete', 'uses' => 'Monarkee\Bumble\Controllers\ModuleController@deleteComponent']);

        Route::resource('tumblelog', 'Monarkee\Bumble\Controllers\TumblelogController');
        Route::resource('settings', 'Monarkee\Bumble\Controllers\SettingsController', ['except' => ['show']]);

        // Dynamically create routes for every module in the system
//        foreach (Monarkee\Bumble\Models\Module::all() as $module)
//        {
//            if (!($module->system_name == 'posts'))
//            Route::resource(module_name($module->system_name), 'Monarkee\Bumble\Controllers\PostController');
//        }
    });
});
