<?php namespace Monarkee\Bumble\Repositories;

use Exception;
use Illuminate\Config\Repository;
use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;
use ReflectionClass;
use Symfony\Component\Debug\Exception\FatalErrorException;

class ModelRepository {

    /**
     * @var
     */
    private $models;

    private $objects = [];

    /**
     * @var
     */
    private $config;

    function __construct(Repository $config)
    {
        $this->config = $config;
    }

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
        $namespace = $this->config->get('bumble::models');

        $modelDir = str_replace("\\", "/", $namespace);

        $filesystem = new Filesystem(new Adapter(app_path($modelDir)));

        foreach ($filesystem->listPaths() as $file)
        {
            $key = str_replace('.php', '', $file);
            $this->models[] = $namespace . $key;
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
//            dd($this->getModelNames());
            foreach ($this->getModelNames() as $model)
            {
                $testClass = new ReflectionClass($model);

                if ( ! $testClass->isAbstract())
                {
                    try
                    {
                        $newObject = new $model;

                        if ( ! $newObject->isHidden())
                        {
                            $this->objects[] = $newObject;
                        }
                    }
                    catch (Exception $e)
                    {

                    }
                }
            }
        }
    }

    public function hasModels()
    {
        return !is_null($this->objects) ? true : false;
    }
}
