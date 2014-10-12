<?php namespace Monarkee\Bumble\Fields;

use Illuminate\Support\MessageBag;
use Monarkee\Bumble\Exceptions\ValidationException;

class SlugField extends TextField
{
    protected function setUp()
    {
        $this->slugifyService = app()->make('Monarkee\Bumble\Services\SlugifyService');
    }

    public function isSlugField()
    {
        return true;
    }

    public function getSetFrom()
    {
        return isset($this->options['set_from']) ? $this->options['set_from'] : false;
    }

    public function isRequired()
    {
        return isset($this->options['set_from']) ? false : true;
    }

    public function process($model, $input)
    {
        $column = $this->getColumn();

        if (!empty($input[$column]))
        {
            $model->{$column} = $this->slugifyService->slugify($input[$column]);
            return $model;
        }
        elseif ($this->getSetFrom())
        {
            $model->{$column} = $this->slugifyService->slugify($input[$this->getSetFrom()]);
            return $model;
        }
        else
        {
            $message = "The {$column} field is required.";
            $errors = new MessageBag(['slug' => $message]);

            throw new ValidationException($errors, $message);
        }
    }

}
