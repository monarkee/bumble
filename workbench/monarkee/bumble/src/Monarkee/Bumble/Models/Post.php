<?php namespace Monarkee\Bumble\Models;

use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Validators\PostsValidator;

class Post extends BumbleModel {
	protected $guarded = array();

	public static $rules = array();
}
