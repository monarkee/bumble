<?php namespace Monarkee\Bumble\Repositories;

use Exception;
use Illuminate\Config\Repository;
use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Filesystem;
use Monarkee\Bumble\Support\BumbleStr;
use ReflectionClass;
use Symfony\Component\Debug\Exception\FatalErrorException;

class ModelRepository {

    /**
     * @var
     */
    private $models;

    /**
     * @var array
     */
    private $objects = [];

    /**
     * @var
     */
    private $config;

    protected $modelConfig;

    /**
     * @var BumbleStr
     */
    private $str;

    function __construct(Repository $config, BumbleStr $str)
    {
        $this->config = $config;
        $this->str = $str;

        $this->modelConfig = $this->config->get('bumble::models');
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
    public function generateArray()
    {
        foreach ($this->modelConfig as $key => $class)
        {
            $this->models[] = $class;
        }
    }

    /**
     * @return array
     */
    public function getModels()
    {
        $this->loadObjects();

        return $this->objects;
    }

    /**
     *
     */
    private function loadObjects()
    {
        if ($this->hasModels())
        {
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

    /**
     * @return bool
     */
    public function hasModels()
    {
        return !is_null($this->objects) ? true : false;
    }

    /**
     * Format the namespace config variable for use
     *
     * @param $namespace
     * @return mixed
     */
    private function getFormattedModelsDirectory($namespace)
    {
        return str_replace('\\', '/', $namespace) . '/';
    }

    /**
     * @param $modelName
     * @return mixed
     */
    public function get($modelName)
    {
        $modelClass = $this->modelConfig[str_singular($modelName)];

        return new $modelClass;
    }
}
