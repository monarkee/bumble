<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use View;
use Redirect;

class DashboardController extends BumbleController
{
    /**
     * Dashboard View
     * @return [type] [description]
     */
    public function getIndex()
    {
        return View::make('bumble::dashboard.index');
    }

    /**
     * Redirect to Index
     * @return void
     */
    public function redirectToIndex()
    {
        return Redirect::route('bumble_dashboard');
    }
}