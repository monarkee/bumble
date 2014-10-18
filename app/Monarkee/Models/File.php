<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\FileField;
use Monarkee\Bumble\Fields\S3FileField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class File extends BumbleModel
{
    use SoftDeletingTrait;

    public $rules = [
        'title' => 'required',
        'description' => 'required',
//        'file' => 'required',
    ];
    /**
     * @return mixed
     */
    public function setComponents()
    {
        return new Fieldset([
            new TextField('title'),
            new TextareaField('description'),
            new S3FileField('file'),
        ]);
    }

}
