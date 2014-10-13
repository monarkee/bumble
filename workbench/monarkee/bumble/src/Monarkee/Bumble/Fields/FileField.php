<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\FileFieldUploadService;

class FileField extends Field implements FileFieldInterface {

    const DEFAULT_UPLOAD_TO = 'uploads';

    /**
     * @var
     */
    public $driver;

    /**
     * @return boolean
     */
    public function isAnonymized()
    {
        return isset($this->options['anonymize']) ? $this->options['anonymize'] : $this->anonymize;
    }

    /**
     * Whether to anonymize the uploaded file's name
     * @var bool
     */
    public $anonymize = false;

    /**
     * @return mixed
     */
    public function getUploadTo()
    {
        if (isset($this->options['upload_to']))
        {
            if ($this->options['public'])
            {
                return $this->getUploadPath();
            }

            return $this->options['upload_to'];
        }

        return public_path(self::DEFAULT_UPLOAD_TO);
    }

    /**
     * @return string
     */
    public function getUploadPath()
    {
        return public_path($this->options['upload_to']);
    }

    public function unlinkFilesOnDelete()
    {
        return isset($this->options['unlink']) ? $this->options['unlink'] : true;
    }

    /**
     * @var
     */
    public $allowed_types;

    public function isFileField()
    {
        return true;
    }

    public function handleFile($request)
    {
        $filename = $request->file($this->getLowerName());

        $filesystem = new FileFieldUploadService([
            'file' => $filename,
            'upload_to' => $this->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        $filesystem->write();
    }

    public function unlinkFile($filename)
    {
        // Try to delete the file, if it doesn't work it probably doesn't exist
        try
        {
            return unlink($filename);
        }
        catch (Exception $e) {
            return;
        }
    }

}
