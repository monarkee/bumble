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
//        'slug' => 'required',
        'active' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title', [
                'sort'          => '1',
                'description'   => 'Fun field for the title to live in',
            ]),
//            new TextField('slug', [
//                'sort'          => '2',
//                'description'   => 'short slug for the entry',
//            ]),
            new IntField('active', [
                'show_in_listing' => false,
                'sort'          => '3',
                'description'   => 'Is this Entry activated?',
            ]),
        ];
    }
}
