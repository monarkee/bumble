<?php namespace Monarkee\Bumble\Fields;

use Illuminate\Config\Repository;
use Illuminate\Support\Facades\App;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\S3ImageFieldUploadService;

class S3ImageField extends ImageField implements FileFieldInterface {

    /**
     * @var Repository
     */
    private $config;

    public function getAdaptor()
    {
        return 'S3';
    }

    public function getBucketName()
    {
        $config = App::make('Illuminate\Config\Repository');

        return isset($this->options['bucket_name']) ? $this->options['bucket_name'] : $config->get('bumble::bucket_name');
    }

    public function process($model, $input)
    {
        return $model;
    }

    public function handleFile($request)
    {
        $filesystem = new S3ImageFieldUploadService([
            'bucket_name' => $this->getBucketName(),
            'image' => $this->request->file($this->getLowerName()),
            'adapter' => $this->getAdapter(),
            'upload_to' => $this->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        return $filesystem->write();
    }
}
