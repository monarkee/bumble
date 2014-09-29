<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Monarkee\Bumble\Fields\IntField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class EntryType extends BumbleModel
{
    use SoftDeletingTrait;

    public $timestamps = false;

    protected $description = 'Every entry has a type';

    public $validation = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
        ];
    }

    public function entries()
    {
        return $this->hasMany('Monarkee\Models\Entry');
    }
}
