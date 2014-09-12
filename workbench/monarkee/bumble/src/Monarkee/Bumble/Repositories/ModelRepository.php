<?php namespace Monarkee\Bumble\Repositories;

use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;

class ModelRepository {

    /**
     * @var
     */
    private $models;

    private $objects;

    /**
     * Get an array of model names from the directory
     */
    public function getModelNames()
    {
        $this->generateArray();

        return $this->models;
    }

    /**
     * Dynamically Create Routes For Every Model
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

    public function getModels()
    {
        $this->loadObjects();

        return $this->objects;
    }

    private function loadObjects()
    {
        foreach ($this->getModelNames() as $model)
        {
            $newObject = new $model;
            $this->objects[] = $newObject;
        }
    }
} 