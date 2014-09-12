<?php namespace Monarkee\Bumble\Entities;

abstract class Field {

    public function __construct($title, $options)
    {
        $this->title = $title;
        $this->options = $options;
    }

    public function getFieldType()
    {
        return class_basename($this);
    }

    public function getName()
    {
        return ucwords($this->title);
    }

    public function isRequired()
    {
        return str_contains($this->options['validation'], 'required');
    }
}