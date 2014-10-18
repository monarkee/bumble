<?php namespace Monarkee\Models;

use Monarkee\Bumble\Fields\BinaryField;
use Monarkee\Bumble\Fields\PasswordField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Models\User as BumbleUser;

class User extends BumbleUser
{
    public $showInTopNav = true;


    /**
     * @var array
     */
    public $rules = [
        'first_name' => 'required',
        'last_name' => 'required',
    ];

    /**
     *
     */
    public function setComponents()
    {
        return new Fieldset([
            'basics' => [
                new TextField('username'),
                new TextField('email'),
                new PasswordField('password'),
            ],
            'extra' => [
                new TextField('prefix'),
                new TextField('first_name'),
                new TextField('middle_name'),
                new TextField('last_name'),
                new BinaryField('active'),
            ],
        ]);
    }
}
