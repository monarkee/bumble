<?php namespace Monarkee\Bumble\Repositories;

use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;

class ModelRepository {

    /**
     * @var
     */
    private $models;

    private $objects = [];

    /**
     * Get an array of model names from the directory
     */
    public function getModelNames()
    {
        $this->generateArray();

        return $this->models;
    }

    /**
     * Load the array of models
     */
    private function generateArray()
    {
        $filesystem = new Filesystem(new Adapter(app_path() . '/models'));

        foreach ($filesystem->listPaths() as $file)
        {
            $key = str_replace('.php', '', $file);
            $this->models[] = $key;
        }
    }

    public function getModels($hidden = false)
    {
        $this->loadObjects($hidden);

        return $this->objects;
    }

    private function loadObjects($hidden = false)
    {
        if ($this->hasModels())
        {
            foreach ($this->getModelNames() as $model)
            {
                $newObject = new $model;
                if (!$newObject->isHidden())
                {
                    $this->objects[] = $newObject;
                }
            }
        }
    }

    public function hasModels()
    {
        return !is_null($this->objects) ? true : false;
    }
}
