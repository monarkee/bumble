<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Config\Repository;
use Illuminate\Http\Request;
use SebastianBergmann\Exporter\Exception;
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

        // Somehow we have to get the full namespace of the Model
        // or else we won't be able to instantiate them.
        $modelClass = full_model_name($modelName);

        $model = new $modelClass;

        return View::make('bumble::posts.index')->with(compact('model'));
    }

    public function edit()
    {
        $slug = $this->request->segment(2);
        $id = $this->request->segment(3);

        $modelName = model_name($slug);

        $modelClass = full_model_name($modelName);

        $model = new $modelClass;
        $post = $model->whereId($id)->first();

        return View::make('bumble::posts.edit')->with(compact('post', 'model'));
    }

    public function update()
    {
        // Clean the input to be passed to the validator
        $input = Input::all();
        unset($input['_method']);
        unset($input['_token']);

        $id = Input::get('id');

        $modelName = model_name($this->request->segment(2));

        $resource = resource_name($modelName);

        try {
           $this->postService->updatePost($modelName, $id, $input);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }

        return Redirect::route($this->config->get('bumble::admin_prefix').'.'.$resource.'.index')->with('success', 'The entry was successfully updated.');
    }

    public function create()
    {
        $modelName = model_name($this->request->segment(2));

        $modelClass = full_model_name($modelName);

        $model = new $modelClass;

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

            return Redirect::route($this->config->get('bumble::admin_prefix').'.'.$resource.'.index')
                           ->withSuccess('Good job, asshole.');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()
                           ->withInput()
                           ->with('errors', $e->getErrors());
        }
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

    public function show($id)
    {
        dd($id);
    }

    public function destroy($id)
    {
        $segment = $this->request->segment(2);
        $model = model_name($segment);

        $input = Input::only('id');

        try
        {
            $this->postService->deletePost($model, $input);
        }
        catch (Exception $e)
        {
            dd("Nope");
        }


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
        return Redirect::back()->with('success', 'The entry was successfully deleted.');
    }
}
