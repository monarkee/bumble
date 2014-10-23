<?php namespace Monarkee\Bumble\Controllers;

use View;
use Monarkee\Bumble\Models\Post;
use Monarkee\Bumble\Services\TumblelogService;
use Monarkee\Bumble\Controllers\BumbleController;
use Monarkee\Bumble\Exceptions\ValidationException;

class TumblelogController extends BumbleController {

    protected $postService;

    public function __construct(TumblelogService $postService)
    {
        $this->postService = $postService;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $posts = Post::all();

        return View::make('bumble::tumblelog.index', compact('posts'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        return View::make('bumble::tumblelog.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        return View::make('bumble::tumblelog.show');
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
        return View::make('bumble::tumblelog.edit');
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        try {
            $this->postService->delete($id);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withErrors($e->getErrors());
        }
	}

}
