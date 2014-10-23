<?php

namespace spec\Monarkee\Bumble\Fieldset;

use Monarkee\Bumble\Fields\SlugField;
use Monarkee\Bumble\Fields\TextareaField;
use Monarkee\Bumble\Fields\TextField;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class FieldsetSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Fieldset\Fieldset');
    }

    function let()
    {
        $this->beConstructedWith([
            'content' => [
                new TextField('title'),
                new SlugField('slug'),
            ],
            'scheduling' => [
                new TextareaField('content', [
                    'widget' => 'WYSIWYGField',
                    'description' => 'Your entry content goes here'
                ]),
            ],
        ]);
    }

    function it_should_get_its_fields()
    {
    }

    function it_should_set_its_tabs()
    {
        $this->assignTabs();
    }

    function it_should_get_its_tab_fields()
    {
    }

    function it_should_get_its_tabs()
    {
    }
}
