<?php namespace Monarkee\Bumble\Fields;

use Aws\S3\S3Client;
use Illuminate\Config\Repository;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use League\Flysystem\Adapter\Local;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
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
        $config = App::make('Illuminate\Config\Repository');

        return isset($this->options['bucket_name']) ? $this->options['bucket_name'] : $config->get('bumble::bucket_name');
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
        // If the image doesn't exist in the cache, create it
        $client = S3Client::factory(array(
            'key'    => Config::get('bumble::S3-key'),
            'secret' => Config::get('bumble::S3-secret'),
        ));

        // Setup Glide server
        $server = ServerFactory::create([
            'source' => new Filesystem(new AwsS3Adapter($client, $this->getUploadTo())),
            'cache' => new Filesystem(new Local(public_path('s3/cache'))),
        ]);

        dd($server->sourceFileExists('uploads/aBcMwAXK.jpg'));

        // Or better yet, output the image based on the current URL
//        $server->makeImage();

//        if (str_contains($this->getUploadTo(), 'public'))
//        {
//            $pieces = explode('public', $this->getUploadTo());
//            $base = $pieces[1];
//
            $params = http_build_query($params);
            return asset(config('bumble.admin_prefix').'/s3/cache/'.$this->getUploadTo().'/'.$image.'?'.$params);
//        }
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
