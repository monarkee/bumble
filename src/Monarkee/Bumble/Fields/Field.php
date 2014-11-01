<?php namespace Monarkee\Bumble\Fields;

abstract class Field {

    /**
     * The array of options passed to the field
     *
     * @var array
     */
    protected $options;

    /**
     * @param       $title
     * @param array $options
     */
    public function __construct($title, $options = [])
    {
        $this->title = $title;
        $this->options = $options;

        if (method_exists($this, 'setUp')) $this->setUp();
    }

    /**
     * Get the field's class
     *
     * @return string
     */
    public function getFieldType()
    {
        return class_basename($this);
    }

    /**
     * Check if this field is an image field
     *
     * @return bool
     */
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

    /**
     * Get the name for this field
     *
     * @return string
     */
    public function getName()
    {
        $string = str_replace('_', ' ', $this->title);
        return ucwords($string);
    }

    /**
     * Get the singular name for this field
     *
     * @return string
     */
    public function getSingularName()
    {
        return str_singular(ucwords($this->title));
    }

    /**
     * Get the lower name for this field
     *
     * @return string
     */
    public function getLowerName()
    {
        return lcfirst($this->title);
    }

    /**
     * Get the title for this field
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->getName();
    }

    /**
     * Get the description for this field
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->hasOption('description') ? $this->getOption('description') : '';
    }

    /**
     * Get the column associated with this field
     *
     * @return mixed
     */
    public function getColumn()
    {
        return $this->hasOption('column') ? $this->getOption('column') : $this->title;
    }

    /**
     * Check if this field should show in the table listing
     *
     * @return bool
     */
    public function showInListing()
    {
        return $this->hasOption('show_in_listing') ? $this->getOption('show_in_listing') : true;
    }

    /**
     * Return the placeholder for this field
     *
     * @return string
     */
    public function getPlaceholder()
    {
        if ($this->hasOption('placeholder'))
        {
            return $this->getOption('placeholder');
        }
        elseif ($this->hasOption('description'))
        {
            return $this->getDescription();
        }
        else
        {
            return "This is the {$this->getColumn()}.";
        }
    }

    /**
     * Return the widget type to be used for this field
     *
     * @return string
     */
    public function getWidgetType()
    {
        return $this->hasOption('widget') ? $this->getOption('widget') : $this->getFieldType();
    }

    /**
     * Check if this field uses a custom widget
     *
     * @return bool
     */
    public function hasCustomWidget()
    {
        return $this->hasOption('widget');
    }

    /**
     * Return the fieldtype
     *
     * @param $type
     * @return bool
     */
    public function isFieldType($type)
    {
        return $type == $this->getFieldType();
    }

    /**
     * Check if this field is editable in the admin
     *
     * @return bool
     */
    public function isEditable()
    {
        return $this->getOption('editable') ?: true;
    }

    /**
     * Check if this field disabled
     *
     * @return bool|string
     */
    public function isDisabled()
    {
        return $this->isEditable() ? false : 'disabled';
    }

    /**
     * The default process action is to just return the passed
     * model back to the caller
     *
     * @param $model
     * @param $input
     * @return BumbleModel
     */
    public function process($model, $input)
    {
        $column = $this->getColumn();

        if(isset($input[$column])) {
            $model->{$column} = $input[$column];
        }

        return $model;
    }

    /**
     * Check if this field is a file field
     *
     * @return bool
     */
    public function isFileField()
    {
        return false;
    }

    /**
     * Get all of the options set on the field
     *
     * @return array
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Check to see if an option exists
     *
     * @param $key
     * @return bool
     */
    public function hasOption($key)
    {
        return array_key_exists($key, $this->options);
    }

    /**
     * Get the specified key from the options provided
     *
     * @param $key
     * @return mixed
     */
    public function getOption($key)
    {
        return $this->options[$key];
    }

    /**
     * Get the default value for the field if set
     *
     * @return mixed|string
     */
    public function getDefaultValue()
    {
        return $this->hasOption('default_value') ? $this->getOption('default_value') : '';
    }
}
