<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class ImageField extends FileField {

    /**
     * @return string
     */
    public function getAdapter()
    {
        switch ($this->getFieldType())
        {
            case 'ImageField':
                return 'Local';
                break;
            case 'S3ImageField':
                return 'S3';
                break;
        }
    }
}
