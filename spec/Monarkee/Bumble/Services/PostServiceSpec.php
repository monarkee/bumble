<?php namespace spec\Monarkee\Bumble\Services;

use Illuminate\Foundation\Application;
use Illuminate\Hashing\HasherInterface;
use Illuminate\Http\Request;
use Illuminate\Validation\Factory;
use Monarkee\Bumble\Fields\S3ImageField;
use Monarkee\Bumble\Models\BumbleModel;
use Monarkee\Bumble\Services\S3FileService;
use Monarkee\Bumble\Services\SlugifyService;
use Monarkee\Bumble\Support\BumbleStr;
use Monarkee\Bumble\Validators\PostValidator;
use Monarkee\Models\Tag;
use Monarkee\Bumble\Models\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use stdClass;

class PostServiceSpec extends ObjectBehavior
{
    function let(PostValidator $postValidator, Application $app, Request $request, BumbleStr $str, SlugifyService $slugifyService, HasherInterface $hash)
    {
        $this->beConstructedWith($postValidator, $app, $request, $str, $slugifyService, $hash);
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
}
