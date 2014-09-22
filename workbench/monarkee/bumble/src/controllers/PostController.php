<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Config\Repository;
use Illuminate\Http\Request;
use View;
use DB;
use Input;
use Redirect;
use Monarkee\Bumble\Controllers\BumbleController;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Services\PostService;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\Component;

class PostController extends BumbleController
{
    protected $postService;

    /**
     * @var \Illuminate\Http\Request
     */
    private $request;

    /**
     * @var Application
     */
    private $app;

    /**
     * @var Config
     */
    private $config;

    public function __construct(PostService $postService, Request $request, Repository $config)
    {
        $this->postService = $postService;
        $this->request = $request;
        $this->config = $config;
    }

    public function index()
    {
        $modelName = model_name($this->request->segment(2));

        $model = new $modelName;

        // Get the ID of the model

        return View::make('bumble::posts.index')->with(compact('model'));
    }

    public function edit()
    {
        $slug = $this->request->segment(2);
        $id = $this->request->segment(3);

        $modelName = model_name($slug);

        $model = new $modelName;
        $post = $model->whereId($id)->first();

        return View::make('bumble::posts.edit')->with(compact('post', 'model'));
    }

//    public function update()
//    {
//        // Clean the input to be passed to the validator
//        $input = Input::all();
//        unset($input['_method']);
//        unset($input['_token']);
//
//        $moduleSystemName = Request::segment(2);
//        $id = Input::get('id');
//
//        try {
//           $this->postService->updatePost($moduleSystemName, $id, $input);
//        }
//        catch (ValidationException $e)
//        {
//            return Redirect::back()->withInput()->withErrors($e->getErrors());
//        }
//
//        return Redirect::back()->with('success', 'The entry was successfully updated.');
//    }

    public function create()
    {
        $modelName = model_name($this->request->segment(2));

        $model = new $modelName;

        return View::make('bumble::posts.create')->with(compact('model'));
    }

    public function store()
    {
        $segment = $this->request->segment(2);

        $model = model_name($segment);
        $resource = resource_name($segment);

        $input = Input::all();

        try
        {
            $this->postService->createPost($model, $input);

            return Redirect::route($this->config->get('bumble::urls.admin_prefix').'.'.$resource.'.index')
                           ->withSuccess('Good job, asshole.');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()
                           ->withInput()
                           ->with('errors', $e->getErrors());
        }
    }

    public function errors()
    {
        return View::make('bumble::errors');
    }

//    public function store()
//    {
//        $moduleSystemName = module_name(Request::segment(2));
//
//        // Clean the input to be passed to the validator
//        $input = Input::all();
//        unset($input['_method']);
//        unset($input['_token']);
//
//        try {
//           $this->postService->createPost($moduleSystemName, $input);
//        }
//        catch (ValidationException $e)
//        {
//            return Redirect::back()->withInput()->withErrors($e->getErrors());
//        }
//
//        return Redirect::back()->with('success', 'The entry was successfully created.');
//    }
//
//    public function destroy()
//    {
//        $moduleSystemName = table_name(Request::segment(2));
//        $id = Input::get('id');
//
//        try {
//           $this->postService->deletePost($moduleSystemName, $id);
//        }
//        catch (Exception $e)
//        {
//            return Redirect::back()->withInput()->withErrors($e);
//        }
//
//        return Redirect::back()->with('success', 'The entry was successfully deleted.');
//    }
}
