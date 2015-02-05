<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FileFieldInterface;
use Monarkee\Bumble\Services\FileFieldUploadService;

class FileField extends Field implements FileFieldInterface {

    /**
     * The default location to upload the file
     */
    const DEFAULT_UPLOAD_TO = 'uploads';

    /**
     * Whether to anonymize the uploaded file's name
     * @var bool
     */
    private $anonymize = false;

    /**
     * Check if this field is a FileField
     *
     * @return bool
     */
    public function isFileField()
    {
        return true;
    }

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
    public function getUploadTo($path = '')
    {
        if (isset($this->options['upload_to'])) return $this->options['upload_to'];

        return public_path($this->addSlashes(self::DEFAULT_UPLOAD_TO)) . $path;
    }

    /**
     * Add trailing slashes if not present
     * @param string $value
     */
    protected function addSlashes($value)
    {
        return rtrim($value, '/') . '/';
    }

    /**
     * Check whether to delete the files when the Model is deleted from the database
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
     * @param $file
     * @param $filename
     */
    public function handleFile($request, $file, $filename)
    {
        $filesystem = new FileFieldUploadService([
            'file' => $file,
            'filename' => $filename,
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
