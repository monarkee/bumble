<?php namespace Monarkee\Bumble\Composers;

use Monarkee\Bumble\Models\Module;

class SidenavComposer {

    public function compose($view)
    {
        $view->with('sideModules', Module::orderBy('sort_order')->active()->get());
    }
}
