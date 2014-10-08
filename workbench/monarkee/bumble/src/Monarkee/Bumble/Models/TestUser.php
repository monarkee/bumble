<?php namespace Monarkee\Bumble\Models;

use Gravatar;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;
use InvalidArgumentException;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;
use Illuminate\Database\Eloquent\Model as Eloquent;

class TestUser extends User implements UserInterface, RemindableInterface
{
    public $validation = [
        'title' => 'required',
    ];

    public function setComponents()
    {
        $this->components = [
            'title' => new TextField('title'),
        ];
    }
}
