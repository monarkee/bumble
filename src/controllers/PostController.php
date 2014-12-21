<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Config\Repository;
use Illuminate\Http\Request;
use Exception;
use Monarkee\Bumble\Repositories\ModelRepository;
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

    /**
     * @var ModelRepository
     */
    private $modelRepo;

    /**
     * @param PostService $postService
     * @param Request     $request
     * @param Repository  $config
     */
    public function __construct(PostService $postService, Request $request, Repository $config, ModelRepository $modelRepo)
    {
        $this->postService = $postService;
        $this->request = $request;
        $this->config = $config;
        $this->modelRepo = $modelRepo;
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $model = $this->modelRepo->get($this->request->segment(2));

        $entries = $model->orderBy('id', 'desc')->paginate($this->config->get('bumble::paginate'));

        return View::make('bumble::posts.index')->with(compact('model', 'entries'));
    }

    /**
     * @return mixed
     */
    public function trashed()
    {
        $model = $this->modelRepo->get($this->request->segment(2));

        $entries = $model->onlyTrashed()->paginate($this->config->get('bumble::paginate'));

        return View::make('bumble::posts.trashed')->with(compact('model', 'entries'));
    }

    public function restore($id)
    {
        $segment = $this->request->segment(2);
        $model = model_name($segment);

        try
        {
            $this->postService->restore($model, $id);

            return Redirect::back()->with('success', 'The entry was successfully restored.');
        }
        catch (Exception $e)
        {
            throw new Exception('Could not restore the post');
        }
    }

    public function annihilate($id)
    {
        $segment = $this->request->segment(2);
        $model = model_name($segment);

        $input = Input::only('id');

        try
        {
            $this->postService->annihilate($model, $input);

            return Redirect::back()->with('success', 'The entry was deleted forever.');
        }
        catch (Exception $e)
        {
            throw new Exception('Could not delete the post');
        }
    }

    /**
     * @return mixed
     */
    public function edit()
    {
        $editing = true;

        $slug = $this->request->segment(2);
        $id = $this->request->segment(3);

        $model = $this->modelRepo->get($this->request->segment(2));
        $post = $model->whereId($id)->first();

        return View::make('bumble::posts.edit')->with(compact('post', 'model', 'editing'));
    }

    /**
     * @return mixed
     */
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
           $this->postService->update($modelName, $id, $input);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }

        return Redirect::route($this->config->get('bumble::admin_prefix').'.'.$resource.'.index')->with('success', 'The entry was successfully updated.');
    }

    /**
     * @return mixed
     */
    public function create()
    {
        $editing = false;

        $model = $this->modelRepo->get($this->request->segment(2));

        return View::make('bumble::posts.create')->with(compact('model', 'editing'));
    }

    /**
     * @return mixed
     */
    public function store()
    {
        $segment = $this->request->segment(2);

        $model = model_name($segment);
        $resource = resource_name($segment);

        $input = Input::all();

        try
        {
            $this->postService->create($model, $input);

            return Redirect::route($this->config->get('bumble::admin_prefix').'.'.$resource.'.index')
                           ->withSuccess('The entry was successfully created');
        }
        catch (ValidationException $e)
        {
            return Redirect::back()
                           ->withInput()
                           ->with('errors', $e->getErrors());
        }
    }

    /**
     * @param $id
     * @throws Exception
     */
    public function destroy($id)
    {
        $segment = $this->request->segment(2);
        $model = model_name($segment);

        $input = Input::only('id');

        try
        {
            $this->postService->delete($model, $input);

            return Redirect::back()->with('success', 'The entry was successfully deleted.');
        }
        catch (Exception $e)
        {
            throw new Exception('Could not delete the post');
        }
    }
}
