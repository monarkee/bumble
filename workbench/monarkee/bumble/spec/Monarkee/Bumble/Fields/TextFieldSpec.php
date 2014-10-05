<?php

namespace spec\Monarkee\Bumble\Fields;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class TextFieldSpec extends ObjectBehavior
{
    function let()
    {
        $this->beConstructedWith('title');
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Fields\TextField');
    }

    function it_should_get_its_own_field_type()
    {
        $this->getFieldType();
    }

    function it_should_know_if_it_is_an_image_field()
    {
        $this->isImageField();
    }

    function it_should_get_its_name()
    {
        $this->getName();
    }

    function it_should_get_its_singular_name()
    {
        $this->getSingularName();
    }

    function it_should_get_its_lower_name()
    {
        $this->getLowerName();
    }

    function it_should_get_its_title()
    {
        $this->getTitle();
    }

    function it_should_get_its_description()
    {
        $this->getDescription();
    }

    function it_should_get_if_its_required()
    {
        $this->isRequired();
    }

    function it_should_get_its_column()
    {
        $this->getColumn();
    }

    function it_should_get_if_its_shown_in_the_listing()
    {
        $this->showInListing();
    }

    function it_should_get_its_placeholder()
    {
        $this->getPlaceholder();
    }
}
