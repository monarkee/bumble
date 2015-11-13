<?php

namespace Monarkee\Bumble\Fields;

class BelongsToManyField extends Field
{
    public function showInListing()
    {
        return false;
    }
}
