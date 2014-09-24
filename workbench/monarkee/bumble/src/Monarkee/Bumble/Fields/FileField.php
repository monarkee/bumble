<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class FileField extends Field {

    /**
     * @var
     */
    public $driver;

    /**
     * @return boolean
     */
    public function isAnonymized()
    {
        return isset($this->options['anonymize']) ? $this->options['anonymize'] : $this->anonymize;
    }

    /**
     * Whether to anonymize the uploaded file's name
     * @var bool
     */
    public $anonymize = false;

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

    /**
     * @return string
     */
    public function getUploadPath()
    {
        return public_path($this->options['upload_to']);
    }

    /**
     * @var
     */
    public $allowed_types;
}
