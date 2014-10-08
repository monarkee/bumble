<?php namespace Monarkee\Bumble\Services;

use Illuminate\Support\Str;

class SlugifyService
{

    /**
     * @var Str
     */
    private $str;

    function __construct(Str $str)
    {
        $this->str = $str;
    }

    public function slugify($string, $separator = '-')
    {
        return $this->str->slug($string, $separator);
    }
}
