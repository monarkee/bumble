<?php namespace Monarkee\Bumble\Repositories;

class AssetSourceRepository
{
    private $sources;

    public function getSources()
    {
        if (config('bumble.asset_sources'))
        {
            foreach (config('bumble.asset_sources') as $source)
            {
                $this->sources[] = $source;
            }
        }
    }

    public function getSelectValues()
    {
        // Get the asset sources from the config
        $sources = config('bumble.asset_sources');

        foreach ($sources as $name => $source)
        {
            if (isset($source['name']))
            {
                $sourceValues[$name] = $source['name'];
            }
            else
            {
                $sourceValues[$name] = ucwords($name);
            }
        }

        return $sourceValues;
    }
}