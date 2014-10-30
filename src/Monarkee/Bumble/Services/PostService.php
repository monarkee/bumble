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

    public function __construct(PostValidator $validator, Application $app, Request $request, BumbleStr $str)
    {
        $this->validator = $validator;
        $this->app = $app;
        $this->request = $request;
        $this->str = $str;
    }

    /**
     * @param $class
     * @param $input
     * @return bool
     * @throws ValidationException
     */
    public function create($class, $input)
    {
        $this->setInput($input);

        $model = $this->getNewModel($class);

        $rules = $model->getValidationRules();

        if ($rules) $this->validator->validate($this->input, $rules);

        return $this->save($model);
    }

    /**
     * @param $model
     * @param $id
     * @param $input
     * @return mixed
     * @throws ValidationException
     */
    public function update($class, $id, $input)
    {
        $this->setInput($input);

        $model = $this->getNewModel($class);

        // Get the rules for this model
        $rules = $model->getEditValidationRules();

        if ($rules) $this->validator->validate($this->input, $rules);

        $input = $this->filterEmptyInput($input);

        // Get the model to be saved
        $entry = $model->find($id);

        // Save the entry
        return $this->save($entry);
    }

    /**
     * @param $model
     * @param $id
     * @return mixed
     */
    public function delete($model, $id)
    {
        $modelName = model_name($model);
        $modelClass = full_model_name($modelName);
        $model = new $modelClass;

        $post = $model->find($id)->first();

        // TODO: Handle deletion of images from the filesystem
        // and know whether the model is soft-deletable
        foreach ($model->getComponents() as $component)
        {
            if ($component->isFileField())
            {
                $this->unlinkFile($component, $post);
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
     * @return mixed
     */
    public function getNewModel($class)
    {
        $modelClass = $this->str->full_model_name($class);
        return $this->app->make($modelClass);
    }

    /**
     * @param $model
     */
    private function save($model)
    {
        $model = $this->handleComponents($model);

        // Finally, save the model
        return $model->save();
    }

    /**
     * @param $model
     * @return mixed
     */
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

    /**
     * @param $component
     * @param $post
     */
    private function unlinkFile($component, $post)
    {
        if ($component->unlinkFilesOnDelete()) {

            $column = $component->getColumn();
            $location = $component->getUploadTo();

            $component->unlinkFile($location . '/' . $post->{$column});
        }
    }
}
