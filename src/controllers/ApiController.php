<?php  namespace Monarkee\Bumble\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Monarkee\Bumble\Models\Component;

class ApiController extends BumbleController
{
    public function sort()
    {
        // Loop through the post array and update each item
        $i = 1;

        foreach ($_POST['component'] as $value)
        {
            $component = Component::find($value);
            $component->sort_order = $i;
            $component->save();
            $i++;
        }

        return 'success';
    }
}
