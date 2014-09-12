<?php namespace Monarkee\Bumble\Repositories;

use Monarkee\Bumble\Models\Setting;

class DbSettingsRepository implements SettingsInterface
{
    public function all()
    {
        return Setting::all();
    }

    public function create($input)
    {
        return Setting::create([
            'key' => (string) $input['key'],
            'value' => (string) $input['value'],
            'description' => (string) $input['description'],
            'deletable' => true,
        ]);
    }

    public function update($id, $input)
    {
        return Setting::find($id)->update($input);
    }

    public function get($key)
    {
        Setting::whereKey($key)->first();
    }

    public function find($id)
    {
        return Setting::find($id);
    }

    public function delete($id)
    {
        return Setting::find($id)->delete();
    }

    public function findOrFail($id)
    {
        if ( ! is_null($model = Setting::find($id))) return $model;

        throw new ModelNotFoundException;
    }

}