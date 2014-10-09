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

    public function getSingularName()
    {
        return str_singular(ucwords($this->title));
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

    public function getWidgetType()
    {
        return isset($this->options['widget']) ? $this->options['widget'] : $this->getFieldType();
    }

    public function hasCustomWidget()
    {
        return isset($this->options['widget']);
    }

    public function isBinaryField()
    {
        return false;
    }

    public function isSlugField()
    {
        return false;
    }

    public function isFieldType($type)
    {
        return $type == $this->getFieldType();
    }

    public function isEditable()
    {
        return $this->options['editable'] ?: true;
    }

    public function isDisabled()
    {
        return $this->isEditable() ? false : 'disabled';
    }
}
