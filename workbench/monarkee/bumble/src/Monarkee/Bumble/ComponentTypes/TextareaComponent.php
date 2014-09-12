<?php namespace Monarkee\Bumble\ComponentTypes;

use Monarkee\Bumble\ComponentTypes\BaseComponent;

class TextareaComponent extends BaseComponent
{
    public $name = 'Textarea';

    public $slug = 'textarea';

    public $columnType = 'text';

    public $description = 'A multi-line field of text for storing longer pieces of text';
}