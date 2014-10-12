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

        $this->validator->validate($this->input, $rules);

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
            $this->validator->validate($this->input, $rules);
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

        // TODO: Handle deletion of images from the filesystem
        // and know whether the model is soft-deletable
        if (!$model->isSoftDeleting())
        {
            foreach ($model->getComponents() as $component)
            {
                if ($component->isFileField())
                {
                    $column = $component->getColumn();
                    $location = $component->getUploadTo();

                    // Try to delete the file, if it doesn't work it probably doesn't exist
                    try
                    {
                        unlink($location . '/' . $post->{$column});
                    }
                    catch (Exception $e)
                    {
                        return;
                    }
                }
            }
        }

        return $post->delete();
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
     * @param $model
     */
    private function saveEntry($model)
    {
        $model = $this->handleComponents($model);

        // Finally, save the model
        return $model->save();
    }

    public function handleComponents($model)
    {
        foreach ($model->getComponents() as $component)
        {
            $column = $component->getColumn();

            // This include ImageFields as well because the inherit from FileField
            if ($component->isFileField() && $this->request->hasFile($column))
            {
                // Handle the upload by calling the object's handleFile() method
                $component->handleFile($this->request);
                $model->{$column} = $this->request->file($component->getLowerName())->getClientOriginalName();
            }
            else
            {
                // Process the input data for this component type
                $model = $component->process($model, $this->input);
            }
        }

        return $model;
    }
}
