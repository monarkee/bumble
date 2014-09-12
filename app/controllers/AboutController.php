<?php

class AboutController extends Controller {

    public function getIndex()
    {
        $page = Page::whereSlug('about')->first();
        return View::make('themes.about.index')->with(compact('page'));
    }
}
