<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\View;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;

class NewController extends BumbleController
{
    private $files;

    private $excludedFiles = [
        '.DS_Store'
    ];

    public function getIndex()
    {
        $filesystem = new Filesystem(new Adapter(app_path() . '/models'));

        foreach ($filesystem->listPaths() as $file)
        {
            if ($this->checkIfAllowed($file))
            {
                $key = str_replace('.php', '', $file);
                $models[] = (new $key);
            }
        }

        return View::make('bumble::new.index')->with(compact('models'));
    }

    private function checkIfAllowed($file)
    {
        return (!in_array($file, $this->excludedFiles));
    }
}