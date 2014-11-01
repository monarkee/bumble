<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\FileFieldUploadService;

class FileField extends Field implements FileFieldInterface {

    const DEFAULT_UPLOAD_TO = 'uploads';

    /**
     * Whether to anonymize the uploaded file's name
     * @var bool
     */
    public $anonymize = false;

    /**
     * Check whether the uploaded filename is to be anonymized when saved
     *
     * @return boolean
     */
    public function isAnonymized()
    {
        return isset($this->options['anonymize']) ? $this->options['anonymize'] : $this->anonymize;
    }

    /**
     * Get where the file is to be uploaded to
     *
     * @return mixed
     */
    public function getUploadTo()
    {
        if (isset($this->options['upload_to'])) return $this->options['upload_to'];

        return public_path(self::DEFAULT_UPLOAD_TO);
    }

    /**
     * Check wether to delete the files when the Model is deleted from the database
     *
     * @return bool
     */
    public function unlinkFilesOnDelete()
    {
        return isset($this->options['unlink_on_delete']) ? $this->options['unlink_on_delete'] : false;
    }

    /**
     * Upload the file to the server
     *
     * @param $request
     */
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

    /**
     * Delete the file from the server
     *
     * @param $filename
     * @return bool
     */
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
