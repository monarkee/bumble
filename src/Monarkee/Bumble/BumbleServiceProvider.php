<?php namespace Monarkee\Bumble;

use Illuminate\Support\ServiceProvider;
use League\Flysystem\Adapter\AwsS3 as S3Adapter;
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
        // Merge the config values so they don't have to have a complete configuration
        $this->mergeConfigFrom('bumble', __DIR__.'/../../config/bumble.php');

        // Publish the config files and public assets
        $this->publishes([
            __DIR__.'/../../config/bumble.php' => config_path('bumble.php'),
            __DIR__.'/../../../public/' => public_path().'/packages/monarkee/bumble',
        ]);

        // Register the default views
        $this->loadViewsFrom('bumble', __DIR__ . '/../../views/');

        // Include custom Bumble configuration
        include __DIR__ . '/../../filters.php';
        include __DIR__ . '/../../validation.php';
        include __DIR__ . '/../../helpers.php';
        include __DIR__ . '/../../routes.php';
        include __DIR__ . '/../../composers.php';
        include __DIR__ . '/../../extensions.php';
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('bumblestr', function ()
        {
            return $this->app->make('Monarkee\Bumble\Support\BumbleStr');
        });

        $this->app->singleton('bumble-gravatar', function ()
        {
            return $this->app->make('Monarkee\Bumble\Support\Gravatar');
        });

        $this->app->bind('Monarkee\Bumble\Repositories\ModelRepository', 'Monarkee\Bumble\Repositories\ArrayConfigModelRepository');

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
