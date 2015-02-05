<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Intervention\Image\ImageManager;

class ImageField extends FileField implements FileFieldInterface
{
    /**
     * The default public path to the image
     */
    const DEFAULT_PUBLIC_PATH = 'uploads';

    /**
     * Get the public path to the image
     * @param  string $path
     * @return string
     */
    public function getPublicUrl($path = '')
    {
        if (isset($this->options['public_url'])) return $this->options['public_url'];

        return url() . '/' . $this->addSlashes(self::DEFAULT_PUBLIC_PATH) . $path;
    }

    /**
     * Get the cached version of an image
     * @param  string $image
     * @param  array $params
     * @return string
     */
    public function getCachedUrl($image, array $params = ['w' => 300])
    {
        if (str_contains($this->getUploadTo(), 'public'))
        {
            $pieces = explode('public', $this->getUploadTo());
            $base = $pieces[1];

            $params = http_build_query($params);
            return asset('admin/cache'.$base.$image.'?'.$params);
        }
    }
}
