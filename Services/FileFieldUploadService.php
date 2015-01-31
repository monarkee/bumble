<?php namespace Monarkee\Bumble\Services;

use Exception;

class FileFieldUploadService implements UploadInterface {

    /**
     * @var
     */
    private $attributes;

    /**
     * @var
     */
    private $filesystem;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;

        $this->create();
    }

    /**
     * @return $this
     */
    public function create()
    {
        return $this;
    }

    /**
     *
     */
    public function write()
    {
        try
        {
            $this->attributes['file']->move($this->attributes['upload_to'], $this->attributes['filename']);
        }
        catch (Exception $e)
        {
            return false;
        }
    }
}
