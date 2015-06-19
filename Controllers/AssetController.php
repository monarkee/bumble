<?php namespace Monarkee\Bumble\Controllers;

use Illuminate\Config\Repository;
use Illuminate\Http\Request;
use Exception;
use View;
use DB;
use Input;
use Redirect;
use Monarkee\Bumble\Interfaces\AssetInterface;
use Monarkee\Bumble\Controllers\BumbleController;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Services\PostService;
use Monarkee\Bumble\Models\Module;
use Monarkee\Bumble\Models\Component;

class AssetController extends BumbleController
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
     * @param PostService $postService
     * @param Request     $request
     * @param Repository  $config
     */
    public function __construct(PostService $postService, Request $request, Repository $config, AssetInterface $assetRepo)
    {
        $this->postService = $postService;
        $this->request = $request;
        $this->config = $config;
        $this->assetRepo = $assetRepo;
    }

    /**
     * @return mixed
     */
    public function index()
    {
        $model = $this->assetRepo->getInstance();

        $entries = $model->orderBy('id', 'desc')->paginate($this->config->get('bumble.paginate'));

        return View::make('bumble::assets.index')->with(compact('model', 'entries'));
    }

    /**
     * @return mixed
     */
    public function trashed()
    {
        $model = $this->assetRepo->getInstance();

        $entries = $model->onlyTrashed()->paginate($this->config->get('bumble.paginate'));

        return View::make('bumble::assets.trashed')->with(compact('model', 'entries'));
    }

    public function restore($id)
    {
        $segment = $this->request->segment(2);

        try
        {
            $this->postService->restore($segment, $id);

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

        $input = Input::only('id');

        try
        {
            $this->postService->annihilate($segment, $input);

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

        $model = $this->assetRepo->getInstance();
        $post = $model->whereId($id)->first();

        return View::make('bumble::assets.edit')->with(compact('post', 'model', 'editing'));
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

        $segment = $this->request->segment(2);

        try {
           $this->postService->update($segment, $id, $input);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withInput()->withErrors($e->getErrors());
        }

        return Redirect::route($this->config->get('bumble.admin_prefix').'.'.$segment.'.index')
                                            ->with('success', 'The entry was successfully updated.');
    }

    /**
     * @return mixed
     */
    public function create()
    {
        $editing = false;

        $model = $this->assetRepo->getInstance();

        $sourceValues = app()->make('Monarkee\Bumble\Repositories\AssetSourceRepository')->getSelectValues();

        return View::make('bumble::assets.create')->with(compact('model', 'sourceValues', 'editing'));
    }

    /**
     * @return mixed
     */
    public function store()
    {
        $segment = $this->request->segment(2);

        $model = $this->assetRepo->getInstance();
        $input = Input::all();

        try
        {
            $this->postService->create($model, $input);

            return Redirect::route($this->config->get('bumble.admin_prefix').'.'.$segment.'.index')
                           ->withSuccess('The asset was successfully uploaded');
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

        $input = Input::only('id');

        try
        {
            $this->postService->delete($segment, $input);

            return Redirect::back()->with('success', 'The entry was successfully deleted.');
        }
        catch (Exception $e)
        {
            throw new Exception('Could not delete the post');
        }
    }
}
