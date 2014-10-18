<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\S3FileField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Image extends BumbleModel
{

    use SoftDeletingTrait;

    public $rules = [
        'title' => 'required',
        'content' => 'description',
        'image' => 'required',
    ];

    public $editRules = [
//        'title' => 'required',
    ];

    public function setComponents()
    {
        return new Fieldset([
            new TextField('title'),
            new TextareaField('content', [
                'description' => 'Describe the image'
            ]),
            new S3FileField('image', [
                //                'bucket_name'     => 'bumblecms',
                'upload_to'       => 'uploads/images',
                'sort'            => 5,
                'anonymize'       => true
            ]),
        ]);
    }
}
