<?php namespace Monarkee\Bumble\Services;

use Exception;

class ImageFieldUploadService implements UploadInterface {

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
            $this->attributes['image']->move($this->attributes['upload_to'], $this->attributes['image']->getClientOriginalName());
        }
        catch (Exception $e)
        {
            return false;
        }
    }
}
