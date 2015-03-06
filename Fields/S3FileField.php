<?php namespace Monarkee\Bumble\Fields;

use Aws\S3\S3Client;
use Illuminate\Config\Repository;
use Illuminate\Support\Facades\App;
use League\Flysystem\Adapter\Local;
use League\Flysystem\AwsS3v2\AwsS3Adapter;
use League\Flysystem\Filesystem;
use League\Glide\ServerFactory;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\S3FileService;

class S3FileField extends ImageField implements FileFieldInterface {

    /**
     * @var S3FileService
     */
    private $filesystem;

    /**
     * @var Repository
     */
    private $config;

    public function getBucketName()
    {
        return isset($this->options['bucket_name']) ? $this->options['bucket_name'] : config('bumble.bucket_name');
    }

    public function getUploadTo($path = '')
    {
        return isset($this->options['upload_to']) ? $this->options['upload_to'] : self::DEFAULT_UPLOAD_TO;
    }

    /**
     * Get the cached version of an image
     * @param  string $image
     * @param  array $params
     * @return string
     */
    public function getCachedUrl($image, array $params = ['w' => 300])
    {
        $params = http_build_query($params);
        return asset(config('bumble.admin_prefix').'/cache/s3/'.$this->getUploadTo().'/'.$image.'?'.$params);
    }

    public function handleFile($request, $file, $filename)
    {
        $filesystem = new S3FileService([
            'bucket_name' => $this->getBucketName(),
            'file' => $request->file($this->getLowerName()),
            'filename' => $filename,
            'upload_to' => $this->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        return $filesystem->write();
    }

    public function unlinkFile($filename)
    {
        $filesystem = new S3FileService([
            'bucket_name' => $this->getBucketName(),
            'file' => $filename,
            'upload_to' => $this->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        return $filesystem->delete();
    }
}
