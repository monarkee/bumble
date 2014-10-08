<?php namespace Monarkee\Bumble\Support;

use Illuminate\Config\Repository;

class BumbleStr
{

    /**
     * @var Repository
     */
    private $config;

    function __construct(Repository $config)
    {
        $this->config = $config;
    }

    /**
     * @param $value
     * @return string
     */
    public function slug_case($value)
    {
        return ctype_lower($value) ? $value : strtolower(preg_replace('/(.)([A-Z])/', '$1-$2', $value));
    }

    /**
     * @param $value
     * @return string
     */
    public function resource_name($value)
    {
        return str_plural(slug_case($value));
    }

    /**
     * @param $value
     * @return string
     */
    public function model_name($value)
    {
        return str_singular(studly_case($value));
    }

    /**
     * @param $value
     * @return string
     */
    public function full_model_name($value)
    {
        $models = $this->config->get("bumble::models");
        return $models . $value;
    }

    /**
     * @param $value
     * @return mixed
     */
    public function sentence_name($value)
    {
        return preg_replace('/(?!^)[A-Z]{2,}(?=[A-Z][a-z])|[A-Z][a-z]|[0-9]{1,}/', ' $0', $value);
    }
}
