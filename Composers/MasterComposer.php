<?php namespace Monarkee\Bumble\Composers;

use Monarkee\Bumble\Repositories\ModelRepository;

class MasterComposer
{
    /**
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

        $view->with('topModels', $this->modelRepo->getModels());
    }
}
