<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use View;
use Redirect;
use App;

class DashboardController extends BumbleController
{
    /**
     * Dashboard View
     * @return \Illuminate\View\View
     */
    public function getIndex()
    {
        $models = App::make('Monarkee\Bumble\Repositories\ModelRepository')->getModels();

        return View::make('bumble::dashboard.index')->with(compact('models'));
    }

    /**
     * Redirect to Index
     * @return void
     */
    public function redirectToIndex()
    {
        return Redirect::route('bumble.dashboard');
    }
}
