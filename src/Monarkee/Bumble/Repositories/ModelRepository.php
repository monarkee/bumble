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

    /**
     * @var BumbleStr
     */
    private $str;

    function __construct(Repository $config, BumbleStr $str)
    {
        $this->config = $config;
        $this->str = $str;
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
        $namespace = $this->config->get('bumble::models');

        // If the model namespace config setting is empty
        // we'll assume they're using the default models
        // folder that Laravel provides. If that folder doesn't exist
        // we'll throw an Exception
        if (empty($namespace))
        {
            // Check to see if the default models directory is there
            if (file_exists(app_path('models')))
            {
                $modelDir = 'models/';
            }
            else {
                throw new Exception('No models directory found');
            }
        }
        else {
            $modelDir = $this->getFormattedModelsDirectory($namespace);
        }

        $filesystem = new Filesystem(new Adapter(app_path($modelDir)));

        foreach ($filesystem->listPaths() as $file)
        {
            $key = str_replace('.php', '', $file);
            $this->models[] = $namespace . '\\' . $key;
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
        $modelName = $this->str->model_name($modelName);
        $modelClass = $this->str->full_model_name($modelName);

        return new $modelClass;
    }
}
