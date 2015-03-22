<?php namespace Monarkee\Bumble\Repositories;

class FieldAssetRepository
{
    private $jsAssets = [];

    private $cssAssets = [];

    public function registerCssAsset($asset)
    {
        $this->cssAssets[] = $asset;
    }

    public function registerJsAsset($asset)
    {
        $this->jsAssets[] = $asset;
    }

    public function getCssAssets()
    {
        return array_unique($this->cssAssets);
    }

    public function getJsAssets()
    {
        return array_unique($this->jsAssets);
    }
}