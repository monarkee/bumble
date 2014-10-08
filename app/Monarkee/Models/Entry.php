<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\BelongsToManyField;
use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Fields\FileField;
use Monarkee\Bumble\Fields\HasOneField;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\BinaryField;
use Monarkee\Bumble\Fields\S3ImageField;
use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Entry extends BumbleModel
{
    use SoftDeletingTrait;

    public $showInTopNav = true;

    public $dates = [
        'published_at',
    ];

    protected $description = 'A beautiful place to put your entries';

    public $validation = [
        'title' => 'required',
        'content' => 'required',
//        'entry_type_id' => 'required|exists:entry_types,id',
        'published_at' => 'required|date',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
            new SlugField('slug', [
                'set_from' => 'title'
            ]),
            new TextareaField('excerpt', [
                'show_in_listing' => false,
            ]),
            new TextareaField('content', [
                'show_in_listing' => false,
            ]),
            new S3ImageField('banner_image', [
                'show_in_listing' => false,
                'upload_to'   => 'banner_images',
            ]),
            new HasOneField('status'),
            new TextField('published_at'),
//            new BelongsToManyField('tags', [
//                'widget' => 'TagField',
//            ]),
            new BinaryField('active'),
        ];
    }

    public function status()
    {
        return $this->belongsTo('Monarkee\Models\Status');
    }

    public function tags()
    {
        return $this->belongsToMany('Monarkee\Models\Tag');
    }
}
