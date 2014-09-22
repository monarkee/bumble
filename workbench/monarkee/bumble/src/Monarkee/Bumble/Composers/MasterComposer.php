<?php namespace Monarkee\Bumble\Composers;

use Monarkee\Bumble\Repositories\ModelRepository;

class MasterComposer {

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
        $view->with('topModels', $this->modelRepo->getModels());
    }
}
