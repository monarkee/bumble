<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class ImageField extends FileField
{

    /**
     * @return string
     */
    public function getAdapter()
    {
        return 'Local';
    }
}
