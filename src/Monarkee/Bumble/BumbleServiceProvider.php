<?php namespace Monarkee\Bumble;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as LocalAdapter;
use League\Flysystem\Adapter\AwsS3 as S3Adapter;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Support\BumbleStr;

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
        include __DIR__.'/../../validation.php';
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
        $this->app->singleton('bumblestr', function()
        {
            return $this->app->make('Monarkee\Bumble\Support\BumbleStr');
        });

        $this->app->singleton('bumble-gravatar', function()
        {
            return $this->app->make('Monarkee\Bumble\Support\Gravatar');
        });

        /*
         * Create aliases for the dependency.
         */
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('BumbleStr', 'Monarkee\Bumble\Support\Facades\BumbleStr');
        $loader->alias('BumbleGravatar', 'Monarkee\Bumble\Support\Facades\Gravatar');
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return array('bumble.bumblestr', 'bumble.bumble-gravatar');
	}

}
