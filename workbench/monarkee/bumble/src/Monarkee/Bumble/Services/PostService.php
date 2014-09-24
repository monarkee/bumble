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
        $modelName = model_name($model);
        $modelClass = full_model_name($modelName);
        $model = new $modelClass;

        $rules = $model->validation;

        $this->validator->validate($input, $rules);

        // Save each component to the model
        foreach ($model->getComponents() as $field)
        {
            if (isset($input[$field->getColumn()])) $model->{$field->getColumn()} = $input[$field->getColumn()];
        }

        // If there are image fields, then we need to upload them
        // We will save the entry afterwards because we will rewrite
        // attributes on the model before the save
        if ($model->hasImageFields())
        {
            foreach ($model->getImageFields() as $imageField)
            {
                if ($this->request->hasFile($imageField->getLowerName()))
                {
                    $filesystem = new ImageFieldUploadService([
                        'image' => $this->request->file($imageField->getLowerName()),
                        'adapter' => $imageField->getAdapter(),
                        'upload_to' => $imageField->getUploadTo(),
                    ]);

                    // Write the image to the file system and move it in place
                    $filesystem->write();

                    // Change the attribute on the model
                    $model->{$field->getColumn()} = $this->request->file($imageField->getLowerName())->getClientOriginalName();
                }
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
        $post = $model->find($id);
        return $post->delete();
    }

    public function deleteRelationship()
    {
        return true;
    }
}
