<?php

namespace spec\Monarkee\Bumble\Services;

use Illuminate\Support\Str;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class SlugifyServiceSpec extends ObjectBehavior
{
    function let(Str $str)
    {
        $this->beConstructedWith($str);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Services\SlugifyService');
    }
}
