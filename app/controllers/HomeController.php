<?php

use Monarkee\Models\Banner;
use Monarkee\Models\Entry;
use Monarkee\Models\Homepage;
use Monarkee\Models\Page;

class HomeController extends Controller
{

    public function getIndex()
    {
        $banners = Banner::all();
        $homepage = Homepage::find(1);

        return View::make('themes.index')->with(compact('banners', 'homepage'));
    }

    public function getHome()
    {
        return Redirect::to('home');
    }
}
