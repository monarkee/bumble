<?php namespace Monarkee\Bumble\Composers;

use Monarkee\Bumble\Models\Asset;
use Monarkee\Bumble\Repositories\ModelRepository;

class MasterComposer
{
    /**
     * The Model repository
     * @var
     */
    private $modelRepo;

    function __construct(ModelRepository $modelRepo)
    {
        $this->modelRepo = $modelRepo;
    }

    public function compose($view)
    {
        $cssAssets = app()->make('assetLoader')->getCssAssets();
        $jsAssets = app()->make('assetLoader')->getJsAssets();

        $view->with('cssAssets', $cssAssets);
        $view->with('jsAssets', $jsAssets);

        if (config('bumble.enable_asset_manager'))
        {
            $assetRepo = app()->make('Monarkee\Bumble\Interfaces\AssetInterface');
            $view->with('bumbleAssets', $assetRepo->all());
        }

        $view->with('topModels', $this->modelRepo->getModels());
    }
}
