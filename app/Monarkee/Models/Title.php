<?php namespace Monarkee\Models;

use Illuminate\Database\Eloquent\SoftDeletingTrait;
use Illuminate\Support\Facades\Hash;
use Monarkee\Bumble\Fields\BinaryField;
use Monarkee\Bumble\Fields\DropdownField;
use Monarkee\Bumble\Fields\ImageField;
use Monarkee\Bumble\Fields\PasswordField;
use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextField;
use Monarkee\Bumble\Fieldset\Fieldset;
use Monarkee\Bumble\Models\BumbleModel;

class Title extends BumbleModel
{
    use SoftDeletingTrait;

    public $rules = [
        'options' => 'required',
    ];

    protected $dropdownOptions = [
        'open' => 'Open',
        'closed' => 'Closed',
        'review' =>'In Review',
    ];

    public function setComponents()
    {
        return new Fieldset([
            //            new TextField('title'),
            //            new SlugField('slug', ['set_from' => 'title']),
            //            new PasswordField('password'),
            //            new BinaryField('active'),
            //            new ImageField('banner'),
            new DropdownField('status', [
                'options' => $this->dropdownOptions,
                'default' => 'review'
            ]),
        ]);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
