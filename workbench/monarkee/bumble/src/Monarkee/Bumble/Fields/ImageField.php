<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\ImageFieldUploadService;

class ImageField extends FileField implements FileFieldInterface
{
    /**
     * @return string
     */
    public function getAdapter()
    {
        return 'Local';
    }

    public function register()
    {
        // TODO: Implement register() method.
    }

    public function process($model, $input)
    {
        return $model;
    }

    public function handleFile($request)
    {
        $filesystem = new ImageFieldUploadService([
            'image' => $request->file($this->getLowerName()),
            'adapter' => $this->getAdapter(),
            'upload_to' => $this->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        $filesystem->write();
    }
}
