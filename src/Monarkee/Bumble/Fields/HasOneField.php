<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Interfaces\FieldInterface;

class HasOneField extends Field implements FieldInterface
{
    /**
     * Get the title to be used for the field
     *
     * @return string
     */
    public function getTitleOption()
    {
        return isset($this->options['title_column']) ? $this->options['title_column'] : 'title';
    }

    public function getRelatedTitle()
    {
        return isset($this->options['related_title']) ? $this->options['related_title'] : 'title';
    }

    /**
     * Get the method used for the relation
     *
     * @return mixed|string
     */
    public function method()
    {
        return $this->hasOption('method') ? $this->getOption('method') : $this->getTitle();
    }

    public function hidesSelf()
    {
        return $this->hasOption('hide_self') ? $this->getOption('hide_self') : false;
    }
}
