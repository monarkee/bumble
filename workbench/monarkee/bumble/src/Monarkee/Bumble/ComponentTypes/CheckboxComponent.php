<?php namespace Monarkee\Bumble\ComponentTypes;

use Monarkee\Bumble\ComponentTypes\BaseComponent;

class CheckboxComponent extends BaseComponent
{
    public $name = 'Checkbox';

    public $slug = 'checkbox';

    public $columnType = 'boolean';

    public $description = 'A single or set of options';
}