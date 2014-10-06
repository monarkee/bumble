<?php

namespace spec\Monarkee\Bumble\Validators;

use Illuminate\Validation\Factory;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class PostValidatorSpec extends ObjectBehavior
{
    function let(Factory $factory)
    {
        $this->beConstructedWith($factory);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Validators\PostValidator');
    }

    function it_should_validate_some_input()
    {
        $rules = [
            'hello' => 'required'
        ];

        $input = [
            'hello' => 'world'
        ];

        $this->validate($input, $rules);
    }
}
