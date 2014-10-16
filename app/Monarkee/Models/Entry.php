<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\BelongsToManyField;
use Monarkee\Bumble\Fields\DateTimeField;
use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Fields\FileField;
use Monarkee\Bumble\Fields\HasOneField;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\BinaryField;
use Monarkee\Bumble\Fields\S3FileField;
use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Entry extends BumbleModel
{
    use SoftDeletingTrait;

    public $showInTopNav = true;

    public $dates = [
        'published_at',
    ];

    protected $description = 'A beautiful place to put your entries';

    public $rules = [
        'title' => 'required',
        'content' => 'required',
//        'entry_type_id' => 'required|exists:entry_types,id',
        'published_at' => 'required|date',
    ];

    public function setComponents()
    {
        $this->fieldset = new Fieldset([
          'first_tab' => [
                new TextField('title'),
                new SlugField('slug', [
                    'set_from' => 'title'
                ]),
            ],
            'second_tab' => [
                new TextareaField('excerpt', [
                    'show_in_listing' => false,
                ]),
                new TextareaField('content', [
                    'show_in_listing' => false,
                ]),
                new S3FileField('banner_image', [
                    'show_in_listing' => false,
                    'upload_to'   => 'banner_images',
                ]),
                new HasOneField('status'),
                new DateTimeField('published_at', [
                    'format' => 'D F Y'
                ]),
                new HasOneField('category'),
                new BelongsToManyField('tags', [
                    'widget' => 'TagField',
                ]),
                new BinaryField('active'),
            ],
        ]);
    }

    public function category()
    {
        return $this->belongsTo('Monarkee\Models\Category');
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
