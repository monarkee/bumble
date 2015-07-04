<?php namespace Monarkee\Bumble\Providers;

use Collective\Html\HtmlServiceProvider;
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
        // Publish the config files and public assets
        $this->publishes([__DIR__.'/../config/bumble.php' => config_path('bumble.php')], 'config');

        $this->publishes([__DIR__.'/../public' => public_path('/packages/monarkee/bumble')], 'assets');

        $this->publishes([__DIR__.'/../database/migrations/' => base_path('/database/migrations')], 'migrations');

        $this->publishes([__DIR__.'/../database/seeds/' => base_path('/database/seeds')], 'seeds');

        // Include custom Bumble configuration
        $this->includeCustomConfiguration();
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->registerBindings();

        $this->createAliases();

        // Bootstrap Form and HTML Builders
        $this->bootstrapFormAndHtmlBuilders();

        // Merge the config values so they don't have to have a complete configuration
        $this->mergeConfigFrom(__DIR__.'/../config/bumble.php', 'bumble');

        // Register the default views
        $this->loadViewsFrom(__DIR__ . '/../resources/views/', 'bumble');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return array('assetLoader', 'bumble.bumblestr', 'bumble.bumble-gravatar');
    }

    /**
     * Register the IoC Bindings
     * @return void
     */
    protected function registerBindings()
    {
        $this->app->singleton('assetLoader', 'Monarkee\Bumble\Repositories\FieldAssetRepository');

        $this->app->singleton('bumblestr', function ()
        {
            return $this->app->make('Monarkee\Bumble\Support\BumbleStr');
        });

        $this->app->singleton('bumble-gravatar', function ()
        {
            return $this->app->make('Monarkee\Bumble\Support\Gravatar');
        });

        $this->app->bind('Monarkee\Bumble\Repositories\ModelRepository', 'Monarkee\Bumble\Repositories\ArrayConfigModelRepository');
    }

    /**
     * Create aliases for the dependency.
     * @return void
     */
    protected function createAliases()
    {
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('BumbleStr', 'Monarkee\Bumble\Support\Facades\BumbleStr');
        $loader->alias('BumbleGravatar', 'Monarkee\Bumble\Support\Facades\Gravatar');

        $loader->alias('BumbleForm', 'Collective\Html\FormFacade');
        $loader->alias('BumbleHtml', 'Collective\Html\HtmlFacade');
    }

    /**
     * Include custom filters, validation, helpers, routes, composers, and extensions
     * @return [type] [description]
     */
    protected function includeCustomConfiguration()
    {
        include __DIR__ . '/../filters.php';
        include __DIR__ . '/../validation.php';
        include __DIR__ . '/../helpers.php';
        include __DIR__ . '/../routes.php';
        include __DIR__ . '/../composers.php';
        include __DIR__ . '/../extensions.php';
    }

    protected function bootstrapFormAndHtmlBuilders()
    {
        return (new HtmlServiceProvider($this->app))->register();
    }
}
