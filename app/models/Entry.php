<?php

use Monarkee\Bumble\Entities\Field;
use Monarkee\Bumble\Entities\TextareaField;
use Monarkee\Bumble\Entities\TextField;
use Monarkee\Bumble\Models\BumbleModel;

class Entry extends BumbleModel
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
            new TextField('slug', [
                'column'        => 'slug',
                'sort'          => '2',
                'description'   => 'This is the slug for the Entry',
                'validation'    => 'required',
            ]),
            new TextareaField('excerpt', [
                'column'        => 'excerpt',
                'sort'          => '3',
                'description'   => 'The is the excerpt of the Entry',
                'validation'    => 'required',
            ]),
            new TextareaField('content', [
                'column'        => 'content',
                'sort'          => '4',
                'description'   => 'The is the content of the Entry',
                'validation'    => 'required',
            ]),
        ];
    }

    public function type()
    {
        return $this->belongsTo('EntryType');
    }

    public function tags()
    {
        return $this->belongsToMany('Tag');
    }
}
