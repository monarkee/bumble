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
        $model = new $model;

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

//    public function updatePost($moduleSystemName, $id, $input)
//    {
//        // Get the module
//        $module = Module::whereSystemName(table_name($moduleSystemName))->firstOrFail();
//
//        // Get the components
//        $moduleComponents = Component::whereModuleId($module->id)->get();
//
//        // Get the rules for this module's components dynamically
//        $validationRules = $this->validator->createRulesArray($moduleComponents);
//
//        // Now validate the entry, and return success or errors
//        $this->validator->validate($input, $validationRules);
//
//        // Update updated_at timestamp manuall because this is not an Eloquent class
//        $input['updated_at'] = Carbon::now();
//
//        // Update the entry and return the post
//        return $post = DB::table(table_name($moduleSystemName))->where('id', $id)->update($input);
//    }

    public function deletePost($moduleSystemName, $id)
    {
        // Do all of this in a transaction, that way if it fails we don't mess it all up

        // Delete relationships

        // Delete the posts
        $deleted = DB::table(table_name($moduleSystemName))->where('id', '=', $id)->delete();

        if (!$deleted)
        {
            throw new \Exception('The entry was not deleted');
        }

        return true;
    }

    public function deleteRelationship()
    {
        return true;
    }
}
