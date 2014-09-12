<?php

class HomeController extends Controller {

    public function getIndex()
    {
        $posts = Entry::all();
        return View::make('themes.index')->with(compact('posts'));
    }

    public function getHome()
    {
        return Redirect::to('home');
    }
}
