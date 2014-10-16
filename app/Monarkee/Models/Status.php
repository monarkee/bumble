<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Status extends BumbleModel
{
    public $timestamps = false;

    protected $description = 'Statuses are helpful for creating a content workflow';

    public $rules = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            new TextField('title'),
        ];
    }

    public function entry()
    {
        return $this->hasMany('Monarkee\Models\Entry');
    }
}
