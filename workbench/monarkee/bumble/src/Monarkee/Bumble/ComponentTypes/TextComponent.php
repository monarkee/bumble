<?php namespace Monarkee\Bumble\ComponentTypes;

use Monarkee\Bumble\ComponentTypes\BaseComponent;

class TextComponent extends BaseComponent
{
    public $name = 'Text';

    public $slug = 'text';

    public $columnType = 'string';

    public $description = 'A single-line text field';
}