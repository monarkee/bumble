<?php namespace Monarkee\Bumble\Repositories;

class FieldAssetRepository
{
    /**
     * The JavaScript assets for the field
     * @var array
     */
    private $jsAssets = [];

    /**
     * The CSS assets for the field
     * @var array
     */
    private $cssAssets = [];

    /**
     * Register a CSS asset
     * @param  path
     * @return void
     */
    public function registerCssAsset($asset)
    {
        $this->cssAssets[] = $asset;
    }

    /**
     * Register a JavaScript asset
     * @param  path
     * @return void
     */
    public function registerJsAsset($asset)
    {
        $this->jsAssets[] = $asset;
    }

    /**
     * Get the CSS assets for the request
     * @return array
     */
    public function getCssAssets()
    {
        return array_unique($this->cssAssets);
    }

    /**
     * Get the JavaScript assets for the request
     * @return array
     */
    public function getJsAssets()
    {
        return array_unique($this->jsAssets);
    }
}