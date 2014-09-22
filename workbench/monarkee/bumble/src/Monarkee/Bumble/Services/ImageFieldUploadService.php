<?php namespace Monarkee\Bumble\Services;

use League\Flysystem\Adapter\Local as Adapter;
use League\Flysystem\Adapter\AwsS3 as S3Adapter;
use League\Flysystem\Filesystem;
use SebastianBergmann\Exporter\Exception;

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
        $adapterClass = 'League\\Flysystem\\Adapter\\' . $this->attributes['adapter'];
        $this->filesystem = new Filesystem(new $adapterClass($this->attributes['upload_to']));

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
