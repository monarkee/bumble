<?php namespace Monarkee\Bumble\Repositories;

use Monarkee\Bumble\Models\Asset;
use Monarkee\Bumble\Interfaces\AssetInterface;

class AssetRepository implements AssetInterface
{
    /**
     * Return all the Assets
     * @return Collection
     */
    public function all()
    {
        return Asset::all();
    }

    /**
     * Return all the Assets from a given source
     * @param  string
     * @return Collection
     */
    public function allFromSource($source)
    {
        return Asset::whereSource($source)->get();
    }

    /**
     * Get a new instance of the Asset model
     * @return Model
     */
    public function getInstance()
    {
        return new Asset;
    }
}