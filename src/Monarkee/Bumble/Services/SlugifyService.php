<?php namespace Monarkee\Bumble\Services;

use Illuminate\Support\Str;

class SlugifyService
{

    /**
     * @var Str
     */
    protected $str;

    function __construct(Str $str)
    {
        $this->str = $str;
    }

    /**
     * @param        $string
     * @param string $separator
     * @return string
     */
    public function slugify($string, $separator = '-')
    {
        return $this->str->slug($string, $separator);
    }
}
