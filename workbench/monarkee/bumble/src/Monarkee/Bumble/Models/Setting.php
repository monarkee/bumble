<?php namespace Monarkee\Bumble\Models;

use Eloquent;

class Setting extends Eloquent
{
    protected $fillable = ['key', 'value', 'description'];
}