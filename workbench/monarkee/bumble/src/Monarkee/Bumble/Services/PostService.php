<?php namespace Monarkee\Bumble\Services;

use DB;
use Carbon\Carbon;
use Exception;
use Illuminate\Foundation\Application;
use Illuminate\Hashing\HasherInterface;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Support\BumbleStr;
use Monarkee\Bumble\Validators\PostValidator;
use Tag;

class PostService
{

    /**
     * @var Application
     */
    private $app;

    /**
     * @var PostValidator
     */
    private $validator;

    /**
     * @var Request
     */
    private $input;

    /**
     * @var BumbleStr
     */
    private $str;

    /**
     * @var SlugifyService
     */
    private $slugifyService;

    /**
     * @var HasherInterface
     */
    private $hasher;

    public function __construct(PostValidator $validator, Application $app, Request $request, BumbleStr $str, SlugifyService $slugifyService, HasherInterface $hasher)
    {
        $this->validator = $validator;
        $this->app = $app;
        $this->request = $request;
        $this->str = $str;
        $this->slugifyService = $slugifyService;
        $this->hasher = $hasher;
    }

    /**
     * @param $class
     * @param $input
     * @return bool
     * @throws ValidationException
     */
    public function createPost($class, $input)
    {
        $this->setInput($input);

        $model = $this->getNewModel($class);

        $rules = $model->getValidationRules();

        $this->validator->validate($input, $rules);

        return $this->saveEntry($model);
    }

    /**
     * @param $model
     * @param $id
     * @param $input
     * @return mixed
     * @throws ValidationException
     */
    public function updatePost($class, $id, $input)
    {
        $this->setInput($input);

        $model = $this->getNewModel($class);

        // Get the rules for this model
        $rules = $model->getEditValidationRules();

        if (!empty($rules))
        {
            // Now validate the entry, and return success or errors
            $this->validator->validate($input, $rules);
        }

        $input = $this->filterEmptyInput($input);

        // Get the model to be saved
        $entry = $model->find($id);

        // Save the entry
        return $this->saveEntry($entry);
    }

    /**
     * @param $model
     * @param $id
     * @return mixed
     */
    public function deletePost($model, $id)
    {
        $modelName = model_name($model);
        $modelClass = full_model_name($modelName);
        $model = new $modelClass;

        $post = $model->find($id)->first();

        return $post->delete();
    }

    /**
     * @return bool
     */
    public function deleteRelationship()
    {
        return true;
    }

    /**
     * @param $imageField
     * @return bool
     */
    public function handleLocalFiles($imageField)
    {
        $filesystem = new ImageFieldUploadService([
            'image' => $this->request->file($imageField->getLowerName()),
            'adapter' => $imageField->getAdapter(),
            'upload_to' => $imageField->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        return $filesystem->write();;
    }

    /**
     * @param $imageField
     */
    public function handleS3Files($imageField)
    {
        $filesystem = new S3ImageFieldUploadService([
            'bucket_name' => $imageField->getBucketName(),
            'image' => $this->request->file($imageField->getLowerName()),
            'adapter' => $imageField->getAdapter(),
            'upload_to' => $imageField->getUploadTo(),
        ]);

        // Write the image to the file system and move it in place
        return $filesystem->write();
    }

    /**
     * @param $model
     * @param $field
     */
    private function handleImageFields($model)
    {
        foreach ($model->getImageFields() as $imageField) {
            if ($this->request->hasFile($imageField->getLowerName())) {
                switch ($imageField->getAdaptor()) {
                    case 'Local':
                        $this->handleLocalFiles($imageField);
                        break;
                    case 'S3':
                        $this->handleS3Files($imageField);
                        break;
                }

                // Change the attribute on the model
                $model->{$imageField->getColumn()} = $this->request->file($imageField->getLowerName())->getClientOriginalName();
            }

            // Remove the imageField from input
            $this->removeFieldFromInput($imageField->getColumn());
        }
    }

    /**
     * @param $field
     * @return array
     */
    public function removeFieldFromInput($field)
    {
        return $this->input = array_except($this->input, [$field]);
    }

    /**
     * @param $input
     */
    public function setInput($input)
    {
        $this->input = $input;
    }

    /**
     * @param $model
     * @param $field
     */
    private function setFields($model, $field)
    {
        if (isset($this->input[$field->getColumn()])) {
            $model->{$field->getColumn()} = $this->input[$field->getColumn()];
        }
    }

    /**
     * Loop through the input and remove any key that has an empty value
     *
     * @param $input
     */
    private function filterEmptyInput($input)
    {
        foreach ($input as $key => $value) {
            if (empty($value)) {
                unset($input[$key]);
            }
        }

        return $input;
    }

    /**
     * @param $class
     */
    public function getNewModel($class)
    {
        $modelClass = $this->str->full_model_name($class);
        return $this->app->make($modelClass);
    }

    /**
     * @param $input
     * @param $model
     */
    private function handleBinaryFields($model)
    {
        foreach ($model->getBinaryFields() as $binaryField) {

            if (isset($this->input[$binaryField->getColumn()]))
            {
                $model->{$binaryField->getColumn()} = true;

                // Remove the binaryFields from the input
                $this->removeFieldFromInput($binaryField->getColumn());
            }
            else
            {
                $model->{$binaryField->getColumn()} = false;
            }
        }
    }

    /**
     * @param $model
     * @throws ValidationException
     */
    public function handleSlugFields($model)
    {
        foreach ($model->getSlugFields() as $slugField)
        {
            if (!empty($this->input[$slugField->getColumn()]))
            {
                $model->{$slugField->getColumn()} = $this->slugifyService->slugify($this->input[$slugField->getColumn()]);
            }
            elseif ($slugField->getSetFrom())
            {
                $model->{$slugField->getColumn()} = $this->slugifyService->slugify($this->input[$slugField->getSetFrom()]);
            }
            else
            {
                $message = "The {$slugField->getColumn()} field is required.";
                $errors = new MessageBag(['slug' => $message]);

                throw new ValidationException($errors, $message);
            }

            // Remove the slugFields from the input
            $this->removeFieldFromInput($slugField->getColumn());
        }
    }

    /**
     * @param $model
     */
    public function handlePasswordFields($model)
    {
        foreach ($model->getPasswordFields() as $passwordField)
        {
            // Use our built-in hashing using Laravel's Hasher
            if ($passwordField->getHashOption())
            {
                $model->{$passwordField->getColumn()} = $this->hasher->make($this->input[$passwordField->getColumn()]);
            }
            // Use the setter the user has specified on the model
            else
            {
                if (method_exists($model, 'set'.studly_case($passwordField->getColumn()).'Attribute'))
                {
                    $method = 'set'.studly_case($passwordField->getColumn()).'Attribute';
                    $model->{$method}($this->input[$passwordField->getColumn()]);
                }
                else
                {
                    // The user hasn't specified any hashing so just save the value to the model
                    $model->{$passwordField->getColumn()} = $this->input[$passwordField->getColumn()];
                }
            }

            // Remove the slugFields from the input
            $this->removeFieldFromInput($passwordField->getColumn());
        }
    }

    /**
     * @param $model
     */
    private function saveEntry($model)
    {
        if ($model->hasBinaryFields()) {
            $this->handleBinaryFields($model);
        }

        if ($model->hasSlugFields()) {
            $this->handleSlugFields($model);
        }

        // If there are image fields, then we need to upload them
        // We will save the entry afterwards because we will rewrite
        // attributes on the model before the save
        if ($model->hasImageFields()) {
            $this->handleImageFields($model);
        }

        if ($model->hasFieldTypes('PasswordField')) {
            $this->handlePasswordFields($model);
        }

        // Save the other components to the model
        foreach ($model->getComponents() as $field) {
            $this->setFields($model, $field);
        }

        // Finally, save the model
        return $model->save();
    }
}
