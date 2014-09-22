<?php namespace Monarkee\Bumble\Fields;

abstract class Field {

    public function __construct($title, $options = [])
    {
        $this->title = $title;
        $this->options = $options;
    }

    public function getFieldType()
    {
        return class_basename($this);
    }

    public function isImageField()
    {
        switch ($this->getFieldType())
        {
            case 'ImageField':
                return true;
                break;
            case 'S3ImageField':
                return true;
                break;
        }

        return false;
    }

    public function getName()
    {
        $string = str_replace('_', ' ', $this->title);
        return ucwords($string);
    }

    public function getLowerName()
    {
        return lcfirst($this->title);
    }

    public function getTitle()
    {
        return $this->getName();
    }

    public function getDescription()
    {
        return isset($this->options['description']) ? $this->options['description'] : '';
    }

    public function isRequired()
    {
        return str_contains($this->options['validation'], 'required');
    }

    public function getColumn()
    {
        return isset($this->options['column']) ? $this->options['column'] : $this->title;
    }

    public function showInListing()
    {
        return isset($this->options['show_in_listing']) ? $this->options['show_in_listing'] : true;
    }

    public function getPlaceholder()
    {
        if (isset($this->options['placeholder']))
        {
            return $this->options['placeholder'];
        }
        elseif (isset($this->options['description']))
        {
            return $this->getDescription();
        }
        else
        {
            return "This is the {$this->getColumn()}.";
        }
    }
}
