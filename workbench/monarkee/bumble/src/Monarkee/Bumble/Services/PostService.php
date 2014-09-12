<?php namespace Monarkee\Bumble\Services;

use DB;
use Carbon\Carbon;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Validators\PostValidator;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\Component;

class PostService
{
    public function __construct(PostValidator $validator)
    {
        $this->validator = $validator;
    }

    public function createPost($moduleSystemName, $input)
    {
        // Append timestamps to $input because this is not an Eloquent class
        $input['created_at'] = Carbon::now();
        $input['updated_at'] = Carbon::now();

        // Get the module
        $module = Module::whereSystemName(table_name($moduleSystemName))->firstOrFail();

        // Get the components
        $moduleComponents = Component::whereModuleId($module->id)->get();

        // Get the rules for this module's components dynamically
        $validationRules = $this->validator->createRulesArray($moduleComponents);

        // Now validate the entry, and return success or errors
        $this->validator->validate($input, $validationRules);

        // Save a new entry
        return $post = DB::table(table_name($moduleSystemName))->insert($input);
    }

    public function updatePost($moduleSystemName, $id, $input)
    {
        // Get the module
        $module = Module::whereSystemName(table_name($moduleSystemName))->firstOrFail();

        // Get the components
        $moduleComponents = Component::whereModuleId($module->id)->get();

        // Get the rules for this module's components dynamically
        $validationRules = $this->validator->createRulesArray($moduleComponents);

        // Now validate the entry, and return success or errors
        $this->validator->validate($input, $validationRules);

        // Update updated_at timestamp manuall because this is not an Eloquent class
        $input['updated_at'] = Carbon::now();

        // Update the entry and return the post
        return $post = DB::table(table_name($moduleSystemName))->where('id', $id)->update($input);
    }

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