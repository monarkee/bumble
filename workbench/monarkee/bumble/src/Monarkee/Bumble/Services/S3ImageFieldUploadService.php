<?php namespace Monarkee\Bumble\Services;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\App;
use League\Flysystem\File;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as LocalAdapter;
use League\Flysystem\Adapter\AwsS3 as Adapter;

class S3ImageFieldUploadService implements UploadInterface
{

    /**
     * @var
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
        $this->config = App::make('config');

        $client = S3Client::factory(array(
            'key'    => $this->config->get('bumble::S3-key'),
            'secret' => $this->config->get('bumble::S3-secret'),
        ));

        $this->local = new Filesystem(new LocalAdapter('/'));

        $this->remote = new Filesystem(new Adapter($client, $this->attributes['bucket_name']));

        return $this;
    }

    /**
     *
     */
    public function write()
    {
        if ($this->local->has($this->file->getRealPath()))
        {
            $file = $this->local->read($this->file->getRealPath());
            $this->remote->write($this->attributes['upload_to'] . '/' . $this->file->getClientOriginalName(), $file, ['visibility' => 'public']);
        }
    }

    public function setFile()
    {
        $this->file = $this->attributes['image'];
    }
}
