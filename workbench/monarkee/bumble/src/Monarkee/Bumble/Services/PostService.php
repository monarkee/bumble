<?php namespace Monarkee\Bumble\Services;

use DB;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Monarkee\Bumble\Exceptions\ValidationException;
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

    public function __construct(PostValidator $validator, Application $app, Request $request)
    {
        $this->validator = $validator;
        $this->app = $app;
        $this->request = $request;
    }

    public function createPost($model, $input)
    {
        $this->setInput($input);

        $modelName = model_name($model);
        $modelClass = full_model_name($modelName);
        $model = new $modelClass;

        $rules = $model->getValidationRules();

        $this->validator->validate($this->input, $rules);

        // If there are image fields, then we need to upload them
        // We will save the entry afterwards because we will rewrite
        // attributes on the model before the save
        if ($model->hasImageFields())
        {
            $this->handleImageFields($model);
        }

        // Save each component to the model minus the ImageFields, which get unset from the array
        foreach ($model->getComponents() as $field)
        {
            if (isset($this->input[$field->getColumn()])) {
                $model->{$field->getColumn()} = $this->input[$field->getColumn()];
            }
        }

        // Finally, save the model
        $model->save();
    }

    public function updatePost($model, $id, $input)
    {
        // Get the rules for this model
        $rules = $model->validation;

        // Now validate the entry, and return success or errors
        $this->validator->validate($input, $rules);

        // Update the entry and return the post
        return $post = $model->whereId($id)->update($input);
    }

    public function deletePost($model, $id)
    {
        $modelName = model_name($model);
        $modelClass = full_model_name($modelName);
        $model = new $modelClass;


        $post = $model->find($id)->first();

        return $post->delete();
    }

    public function deleteRelationship()
    {
        return true;
    }

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

            // Remove the ImageField from the input
            $this->input = array_except($this->input, [$imageField->getColumn()]);
        }
    }

    public function setInput($input)
    {
        $this->input = $input;
    }
}
