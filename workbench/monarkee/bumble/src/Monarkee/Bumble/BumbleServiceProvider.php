<?php namespace Monarkee\Bumble;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\Module;

class BumbleServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		$this->package('monarkee/bumble');

        include __DIR__.'/../../filters.php';
        include __DIR__.'/../../validation_rules.php';
        include __DIR__.'/../../helpers.php';
        include __DIR__.'/../../routes.php';
        include __DIR__.'/../../composers.php';
        include __DIR__.'/../../extensions.php';
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
        // Make the facade work without adding it to app/config/app.php
        $this->app->booting(function()
        {
            $loader = \Illuminate\Foundation\AliasLoader::getInstance();
            $loader->alias('Posts', 'Monarkee\Bumble\Facades\Posts');
            $loader->alias('Bumble', 'Monarkee\Bumble\Facades\Bumble');
            $loader->alias('Setting', 'Monarkee\Bumble\Facades\Setting');
        });

        $this->app->bind('bumble', function()
        {
            return new \Monarkee\Bumble\Bumble;
        });

        $this->app->bind('posts', function()
        {
            return new \Monarkee\Bumble\Posts;
        });

        $this->app->bind('setting', function()
        {
            return new \Monarkee\Bumble\Repositories\DbSettingsRepository;
        });
        $this->app->bind('Monarkee\Bumble\Repositories\SettingsInterface', 'Monarkee\Bumble\Repositories\DbSettingsRepository');
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('posts', 'bumble', 'markdown', 'setting');
	}

}
