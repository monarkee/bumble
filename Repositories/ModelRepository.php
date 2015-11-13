<?php

namespace Monarkee\Bumble\Repositories;

interface ModelRepository
{
    /**
     * Get an list of model names
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
     * Set the model config
     *
     * @throws Exception
     */

    public function get($modelName);
}
