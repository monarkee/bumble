<?php

namespace spec\Monarkee\Bumble\Fields;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class TextFieldSpec extends ObjectBehavior
{
    function let()
    {
        $this->beConstructedWith('title', [
            'show_in_listing' => false,
            'placeholder'   => 'A Title Field'
        ]);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Fields\TextField');
    }

    function it_should_get_its_own_field_type()
    {
        $this->getFieldType();
    }

    function it_should_have_the_correct_field_type()
    {
        $this->getFieldType()->shouldReturn('TextField');
    }

    function it_should_know_if_it_is_an_image_field()
    {
        $this->isImageField()->shouldReturn(false);
    }

    function it_should_get_its_name()
    {
        $this->getName()->shouldReturn('Title');
    }

    function it_should_get_its_singular_name()
    {
        $this->getSingularName()->shouldReturn('Title');
    }

    function it_should_get_its_lower_name()
    {
        $this->getLowerName()->shouldReturn('title');
    }

    function it_should_get_its_title()
    {
        $this->getTitle()->shouldReturn('Title');
    }

    function it_should_get_its_description()
    {
        $this->getDescription()->shouldReturn('');
    }

    function it_should_get_its_column()
    {
        $this->getColumn()->shouldReturn('title');
    }

    function it_should_get_if_its_shown_in_the_listing()
    {
        $this->showInListing()->shouldReturn(false);
    }

    function it_should_get_its_placeholder()
    {
        $this->getPlaceholder()->shouldReturn('A Title Field');
    }

    function it_should_get_its_widget_type()
    {
        $this->getWidgetType()->shouldReturn('TextField');
    }

    function it_should_know_if_it_has_a_custom_widget()
    {
        $this->hasCustomWidget()->shouldReturn(false);
    }
}
