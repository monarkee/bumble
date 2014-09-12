<?php

use Monarkee\Bumble\Entities\IntField;
use Monarkee\Bumble\Entities\TextareaField;
use Monarkee\Bumble\Entities\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class EntryType extends BumbleModel
{
    public function setFields()
    {
        $this->fields = [
            new TextField('title', [
                'column'        => 'title',
                'sort'          => '1',
                'description'   => 'Fun field for the title to live in',
                'validation'    => 'required',
            ]),
            new IntField('Activated', [
                'column'        => 'active',
                'sort'          => '2',
                'description'   => 'Is this Entry activated?',
                'validation'    => 'required',
            ]),
        ];
    }
}
