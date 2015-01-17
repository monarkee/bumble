<?php namespace Monarkee\Bumble\Repositories;

interface ModelRepository
{
    /**
     * Get an array of model names from the directory
     */
    public function getModelNames();

    /**
     * Get the list of models as an array
     */
    public function generateArray();

    /**
     * Get a list of models
     * @return array
     */
    public function getModels();

    /**
     * Determine if the repo has any models
     * @return bool
     */
    public function hasModels();

    /**
     * @param $modelName
     * @return mixed
     */
    public function get($modelName);
}
