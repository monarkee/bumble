<?php namespace Monarkee\Bumble\ComponentTypes;

use Monarkee\Bumble\ComponentTypes\BaseComponent;

class DateTimeComponent extends BaseComponent
{
    public $name = 'DateTime';

    public $slug = 'datetime';

    public $columnType = 'datetime';

    public $description = 'A datetime field';
}