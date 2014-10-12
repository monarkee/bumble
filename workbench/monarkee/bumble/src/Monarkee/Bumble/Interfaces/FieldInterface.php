<?php namespace Monarkee\Bumble\Interfaces;

interface FieldInterface
{
    public function register();
    public function process($model, $input);
}
