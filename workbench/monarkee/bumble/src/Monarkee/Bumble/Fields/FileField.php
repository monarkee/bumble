<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class FileField extends Field {

    public $driver;

    /**
     * @return mixed
     */
    public function getUploadTo()
    {
        try {
            return $this->options['upload_to'];
        }
        catch (Exception $e)
        {
            throw new Exception('Cannot do that shit');
        }
    }

    public function getUploadPath()
    {
        return public_path($this->options['upload_to']);
    }

    public $allowed_types;
}
