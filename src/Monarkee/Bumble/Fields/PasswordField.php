<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;
use Monarkee\Bumble\Interfaces\FieldInterface;

class PasswordField extends Field implements FieldInterface
{

    /**
     * The hasher used for processing the password input
     *
     * @var
     */
    private $hasher;

    /**
     * Set up the field with its necessary dependencies
     */
    protected function setUp()
    {
        $this->hasher = app()->make('hash');
    }

    /**
     * By default PasswordFields are hidden from the listing
     *
     * @return bool
     */
    public function showInListing()
    {
        return false;
    }

    /**
     * Check whether this password is to be hashed or not
     *
     * @return bool
     */
    public function getHashOption()
    {
        return isset($this->options['hash']) ? $this->options['hash'] : true;
    }

    /**
     * Process the password input and hash unless otherwise specified
     *
     * @param $model
     * @param $input
     * @return mixed
     */
    public function process($model, $input)
    {
        $column = $this->getColumn();

        // If the column is empty then it means they don't require it
        // and so we can just return the model unchanged.
        if (empty($input[$column])) return $model;

        // Use our built-in hashing using Laravel's Hasher
        if ($this->getHashOption())
        {
            $model->{$column} = $this->hasher->make($input[$column]);
            return $model;
        }

        // The user hasn't disabled hashing or is using their own mutator
        // so just save the value to the model and return it
        $model->{$column} = $input[$column];

        return $model;
    }
}
