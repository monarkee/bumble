<?php

namespace Monarkee\Bumble\Interfaces;

interface FieldInterface
{
    /**
     * Process the model, assign its input and return the model to the user
     * @param $model
     * @param $input
     * @return mixed
     */
    public function process($model, $input);
}
