<?php namespace Monarkee\Bumble\Repositories;

use Exception;
use Illuminate\Config\Repository;
use ReflectionClass;

final class ArrayConfigModelRepository implements ModelRepository {

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
     *
     *
     * @var $modelConfig
     */
    protected $modelConfig;

    public function __construct(Repository $config)
    {
        $this->config = $config;

        $this->setModelConfig();
    }

    /**
     * Get an list of model names
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
     * Return an array of models
     *
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
    protected function loadObjects()
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
     * @param $modelName
     * @return mixed
     */
    public function get($modelName)
    {
        $className = str_singular($modelName);

        $modelClass = $this->modelConfig[$className];

        return new $modelClass;
    }

    /**
     * Set the model config
     *
     * @throws Exception
     */
    private function setModelConfig()
    {
        try {
            $this->modelConfig = $this->config->get('bumble.models');
        }
        catch (Exception $e)
        {
            throw new Exception("Model configuration hasn't been set.");
        }
    }
}
