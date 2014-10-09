<?php namespace Monarkee\Bumble\Fields;

use Monarkee\Bumble\Fields\Field;

class PasswordField extends Field
{
    public function showInListing()
    {
        return false;
    }

    public function getHashOption()
    {
        return isset($this->options['hash']) ? $this->options['hash'] : true;
    }
}
