<?php namespace Monarkee\Bumble\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use SoftDeletes;

    public function getUrl()
    {
        // return url(config('bumble.admin_prefix') . '/cache/' . $this->attributes['location'] . '/' . $this->attributes['image']);
    }

    /**
     * Return cached version image link with params
     *
     * @param $path
     * @param $params
     * @return string
     */
    public function getCachedUrl($params)
    {
        $params = http_build_query($params);

        // return url(config('bumble.admin_prefix') . '/cache/' . $this->attributes['location'] . '/' . $this->attributes['image'].'?'.$params);
    }
}
