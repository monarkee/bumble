<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Fields\FileField;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Entry extends BumbleModel
{
    use SoftDeletingTrait;

    public $timestamps = false;

    public $showInTopNav = true;

    protected $description = 'A beautiful place to put your entries';

    public $validation = [
        'title' => 'required',
        'slug' => 'required',
        'content' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title', [
                'sort'        => 1,
                'description' => 'Fun field for the title to live in',
            ]),
            new TextField('slug', [
                'sort'        => 2,
//                'description' => 'This is the slug for the Entry',
            ]),
            new TextareaField('excerpt', [
                'show_in_listing' => false,
                'sort'        => 3,
                'description' => 'The is the excerpt of the Entry',
            ]),
            new TextareaField('content', [
                'show_in_listing' => false,
                'sort'        => 4,
                'description' => 'The is the content of the Entry',
            ]),
            new ImageField('banner_image', [
                'show_in_listing' => false,
                'upload_to'   => 'banner_images',
                'sort'        => 5,
            ]),
        ];
    }

//    public function type()
//    {
//        return $this->belongsTo('EntryType');
//    }
//
//    public function tags()
//    {
//        return $this->belongsToMany('Tag');
//    }
}
