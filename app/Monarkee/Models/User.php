<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\PasswordField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\User as BumbleUser;

class User extends BumbleUser
{

    /**
     * @var array
     */
    public $validation = [
        'first_name' => 'required',
        'last_name' => 'required',
    ];

    /**
     *
     */
    public function setComponents()
    {
        $this->components = [
            new TextField('username'),
            new TextField('email'),
            new PasswordField('password'),
            new TextField('prefix'),
            new TextField('first_name'),
            new TextField('middle_name'),
            new TextField('last_name'),
        ];
    }
}
