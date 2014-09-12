<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Routing\Controller;

class BumbleController extends Controller
{
    /**
     * Setup the layout used by the controller.
     *
     * @return void
     */
    protected function setupLayout()
    {
        if ( ! is_null($this->layout))
        {
            $this->layout = View::make($this->layout);
        }
    }
}