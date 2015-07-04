<?php namespace Monarkee\Bumble\Composers;

use Illuminate\Http\Request;
use Monarkee\Bumble\Presenters\UserPresenter;
use Monarkee\Bumble\Repositories\ModelRepository;

class MasterComposer
{
    /**
     * @var
     */
    private $modelRepo;

    function __construct(ModelRepository $modelRepo, Request $request)
    {
        $this->modelRepo = $modelRepo;
        $this->request = $request;
    }

    public function compose($view)
    {
        $cssAssets = app()->make('assetLoader')->getCssAssets();
        $jsAssets = app()->make('assetLoader')->getJsAssets();

        $view->with('cssAssets', $cssAssets);
        $view->with('jsAssets', $jsAssets);

        // Register the logged-in user and decorate it with special methods
        $authUser = new UserPresenter($this->request->user());
        $view->with('authUser', $authUser);

        $view->with('topModels', $this->modelRepo->getModels());
    }
}
