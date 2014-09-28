<?php namespace Monarkee\Bumble\Fields;

use Illuminate\Config\Repository;
use Illuminate\Support\Facades\App;
use Monarkee\Bumble\Fields\ImageField;

class S3ImageField extends ImageField {

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
}
