<?php namespace spec\Monarkee\Bumble\Services;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;
use Monarkee\Bumble\Fields\S3ImageField;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Services\S3FileService;
use Monarkee\Bumble\Support\BumbleStr;
use Monarkee\Bumble\Validators\PostValidator;
use Monarkee\Models\Tag;
use Monarkee\Bumble\Models\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use stdClass;

class PostServiceSpec extends ObjectBehavior
{
    function let(PostValidator $postValidator, Application $app, Request $request, BumbleStr $str)
    {
        $this->beConstructedWith($postValidator, $app, $request, $str);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Services\PostService');
    }

    function it_sets_input()
    {
        $input = [
            'title' => 'Sample Title'
        ];

        return $this->setInput($input);
    }

    function it_should_create_a_post(BumbleStr $str, Application $app, Tag $tag)
    {
        $class = "Tag";
//        $model = $app->make('Monarkee\Models\Tag');

        $input = [
            'title' => 'Hello',
        ];

        $rules = [
            'title' => 'required',
        ];

//        $model = $this->getNewModel($class)->willBeCalled();

//        $tag->getValidationRules()->shouldBeCalled()->willReturn($rules);

//        $this->createPost($model, $input)->shouldReturn(true);
    }
}
