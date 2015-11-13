<?php

namespace Monarkee\Bumble\Fields;

use Illuminate\Support\MessageBag;
use Illuminate\Support\Str;
use Monarkee\Bumble\Exceptions\ValidationException;
use Monarkee\Bumble\Interfaces\FieldInterface;
use Monarkee\Bumble\Services\SlugifyService;

class SlugField extends TextField implements FieldInterface
{
    protected $app;

    public function __construct($title, $options = [])
    {
        parent::__construct($title, $options);

        $this->slugifyService = new SlugifyService(new Str);
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

        if (!empty($input[$column])) {
            $model->{$column} = $this->slugifyService->slugify($input[$column]);
            return $model;
        } elseif ($this->getSetFrom()) {
            $model->{$column} = $this->slugifyService->slugify($input[$this->getSetFrom()]);
            return $model;
        } else {
            $message = "The {$column} field is required.";
            $errors = new MessageBag(['slug' => $message]);

            throw new ValidationException($errors, $message);
        }
    }
}
