<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FieldInterface;

class PasswordField extends Field implements FieldInterface
{
    protected function setUp()
    {
        $this->hasher = app()->make('hash');
    }

    public function showInListing()
    {
        return false;
    }

    public function getHashOption()
    {
        return isset($this->options['hash']) ? $this->options['hash'] : true;
    }

    public function register()
    {
        // TODO: Implement register() method.
    }

    public function process($model, $input)
    {
        $column = $this->getColumn();

        // Use our built-in hashing using Laravel's Hasher
        if ($this->getHashOption())
        {
            $model->{$column} = $this->hasher->make($input[$column]);
            return $model;
        }
        // Use the setter the user has specified on the model
        else
        {
            if (method_exists($model, 'set'.studly_case($column).'Attribute'))
            {
                $method = 'set'.studly_case($column).'Attribute';
                $model->{$method}($input[$column]);
                return $model;
            }
            else
            {
                // The user hasn't specified any hashing so just save the value to the model
                $model->{$column} = $input[$column];
                return $model;
            }
        }
    }
}
