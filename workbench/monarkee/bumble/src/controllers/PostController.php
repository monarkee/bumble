<?php namespace Monarkee\Bumble\Controllers;

use View;
use DB;
use Input;
use Redirect;
use Request;
use Monarkee\Bumble\Controllers\BumbleController;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Services\PostService;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\Component;

class PostController extends BumbleController
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function index()
    {
        $moduleSystemName = Request::segment(2);

        // Get the ID of the module
        $modules = Module::all();
        $module = Module::whereSystemName(swap_sep($moduleSystemName))->firstOrFail();
        $moduleComponents = Component::whereModuleId($module->id)->ordered()->displayInListing()->get();
        $posts = DB::table($module->system_name)->get();

        if ($modules and $module)
        {
            return View::make('bumble::posts2.index')
                       ->with(compact('posts', 'moduleComponents', 'module', 'modules'));
        }
    }

    public function edit()
    {
        $moduleSystemName = Request::segment(2);
        $id = Request::segment(3);

        // Get the module
        $module = Module::whereSystemName(swap_sep($moduleSystemName))->firstOrFail();

        // Get the components
        $moduleComponents = Component::whereModuleId($module->id)->ordered()->get();

        // Get the post data
        $post = DB::table(swap_sep($moduleSystemName))->whereId($id)->first();

        return View::make('bumble::posts2.edit')->with(compact('module', 'moduleComponents', 'post'));
    }

    public function update()
    {
        // Clean the input to be passed to the validator
        $input = Input::all();
        unset($input['_method']);
        unset($input['_token']);

        $moduleSystemName = Request::segment(2);
        $id = Input::get('id');

        try {
           $this->postService->updatePost($moduleSystemName, $id, $input);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }

        return Redirect::back()->with('success', 'The entry was successfully updated.');
    }

    public function create()
    {
        $moduleSystemName = Request::segment(2);
        // Get the module
        $module = Module::whereSystemName(swap_sep($moduleSystemName))->firstOrFail();

        // Get the components
        $moduleComponents = Component::whereModuleId($module->id)->ordered()->get();

        return View::make('bumble::posts2.create')->with(compact('module', 'moduleComponents'));
    }

    public function store()
    {
        $moduleSystemName = module_name(Request::segment(2));

        // Clean the input to be passed to the validator
        $input = Input::all();
        unset($input['_method']);
        unset($input['_token']);

        try {
           $this->postService->createPost($moduleSystemName, $input);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }

        return Redirect::back()->with('success', 'The entry was successfully created.');
    }

    public function destroy()
    {
        $moduleSystemName = table_name(Request::segment(2));
        $id = Input::get('id');

        try {
           $this->postService->deletePost($moduleSystemName, $id);
        }
        catch (Exception $e)
        {
            return Redirect::back()->withInput()->withErrors($e);
        }

        return Redirect::back()->with('success', 'The entry was successfully deleted.');
    }
}