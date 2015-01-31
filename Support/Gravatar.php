<?php namespace Monarkee\Bumble\Support;

use thomaswelton\GravatarLib\Gravatar as G;

class Gravatar
{
    /**
     * The Gravatar object
     *
     * @var G
     */
    private $gravatar;

    /**
     * Create a new Gravatar object
     *
     * @param G $gravatar
     */
    function __construct(G $gravatar)
    {
        $this->gravatar = $gravatar;
    }

    /**
     * Get a Gravatar
     *
     * @param $email
     * @return string
     */
    public function get($email)
    {
        return $this->gravatar->get($email);
    }
}
