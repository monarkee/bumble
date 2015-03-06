<?php namespace Monarkee\Bumble\Services;

use Aws\S3\S3Client;
use Exception;
use Illuminate\Support\Facades\App;
use League\Flysystem\AwsS3v2\AwsS3Adapter;
use League\Flysystem\File;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as LocalAdapter;

class S3FileService implements UploadInterface
{
    /**
     * The remote filesystem
     *
     * @var $remote
     */
    protected $remote;

    /**
     * The uploaded file
     *
     * @var $file
     */
    protected $file;

    /**
     * The filesystem class
     *
     * @var $filesystem
     */
    private $filesystem;

    /**
     * @param array $attributes
     */
    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;

        $this->create();
        $this->setFile();
    }

    /**
     * @return $this
     */
    public function create()
    {
        $client = S3Client::factory(array(
            'key'    => config('bumble.S3-key'),
            'secret' => config('bumble.S3-secret'),
        ));

        $this->remote = new Filesystem(new AwsS3Adapter($client, $this->attributes['bucket_name']));

        return $this;
    }

    /**
     * Write a file to the filesystem
     */
    public function write()
    {
        // If the local filesystem has the uploaded file
        if (file_exists($this->file->getRealPath()))
        {
            // Read the local uploaded file
            $file = file_get_contents($this->file->getRealPath());

            // Write it to the S3 location
            return $this->remote->write($this->attributes['upload_to'] . '/' . $this->attributes['filename'], $file, ['visibility' => 'public']);
        }

        throw new Exception('The uploaded file was not found on the filesystem');
    }

    /**
     * Set the file instance from the request passed in
     *
     * @return void
     */
    public function setFile()
    {
        $this->file = $this->attributes['file'];
    }

    /**
     * Remove the file from the remote path
     *
     * @return void
     */
    public function delete()
    {
        $this->remote->delete($this->file);
    }
}
