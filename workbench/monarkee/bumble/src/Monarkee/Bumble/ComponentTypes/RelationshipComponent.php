<?php namespace Monarkee\Bumble\ComponentTypes;

use Monarkee\Bumble\ComponentTypes\BaseComponent;

class RelationshipComponent extends BaseComponent
{
    public $name = 'Relationship';

    public $slug = 'relationship';

    public $columnType = 'string';

    public $description = 'A relationship to another module in the system';
}