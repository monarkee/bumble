<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\S3ImageField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Image extends BumbleModel
{

    use SoftDeletingTrait;

    public $validation = [
        'title' => 'required',
        'content' => 'description',
        'image' => 'required',
    ];

    public $editValidation = [
//        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
            new TextareaField('content', [
                'description' => 'Describe the image'
            ]),
            new S3ImageField('image', [
//                'bucket_name'     => 'bumblecms',
                'upload_to'       => 'uploads/images',
                'sort'            => 5,
                'anonymize'       => true
            ]),
        ];
    }
}
