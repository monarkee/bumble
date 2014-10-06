<?php namespace spec\Monarkee\Bumble\Services;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Monarkee\Bumble\Fields\S3ImageField;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Services\S3ImageFieldUploadService;
use Monarkee\Bumble\Validators\PostValidator;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class PostServiceSpec extends ObjectBehavior
{
    function let(PostValidator $postValidator, Application $app, Request $request)
    {
        $this->beConstructedWith($postValidator, $app, $request);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType('Monarkee\Bumble\Services\PostService');
    }

//    function it_should_create_a_post(BumbleModel $model, Request $input, $modelName = 'David')
//    {
//        $this->createPost($model, $input)->willReturn(true);
//    }

    function it_sets_input()
    {
        $input = [
            'title' => 'Sample Title'
        ];

        return $this->setInput($input);
    }
}
