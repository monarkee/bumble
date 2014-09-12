<?php namespace Monarkee\Bumble\Entities;

abstract class Field {

    function __construct($title, $options)
    {
        $this->title = $title;
        $this->options = $options;
    }
}