<?php namespace Monarkee\Bumble\Services;

use DB;
use Carbon\Carbon;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Validators\TumblelogValidator;
use Monarkee\Bumble\Models\Post;

class TumblelogService
{
    public function __construct(TumblelogValidator $validator)
    {
        $this->validator = $validator;
    }

    public function savePost()
    {
    }
}