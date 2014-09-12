<?php namespace Monarkee\Bumble\Models;

use Monarkee\Bumble\Models\BumbleModel;

class Link extends BumbleModel {
    protected $table = 'posts';

    protected $fillable = ['title', 'slug', 'link', 'content'];
}
