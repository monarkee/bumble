<?php namespace Monarkee\Bumble\Controllers;

use Config;
use Redirect;
use View;
use Input;
use Setting;
use Monarkee\Bumble\Services\SettingService;
use Monarkee\Bumble\Exceptions\ValidationException;

class SettingsController extends BumbleController
{
    protected $service;

    public function __construct(SettingService $service) {
        $this->service = $service;
    }

    public function index() {
        $settings = Setting::all();
        return View::make('bumble::settings.index', compact('settings'));
    }

    public function create() {
        return View::make('bumble::settings.create');
    }

    public function store() {
        try {
            $this->service->createSetting(Input::all());
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withErrors($e->getErrors())->withInput();
        }

        return Redirect::route('admin.settings.index')->with('success', 'The setting was saved successfully.');
    }

    public function edit($id) {
        $setting = Setting::findOrFail($id);

        return View::make('bumble::settings.edit', compact('setting'));
    }

    public function update($id) {
        try {
            $this->service->updateSetting($id, Input::all());
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withErrors($e->getErrors())->withInput();
        }

        return Redirect::route('admin.settings.index')->with('success', 'The setting was saved successfully.');
    }

    public function destroy($id) {
        try {
            $this->service->deleteSetting($id);
        }
        catch (ValidationException $e)
        {
            return Redirect::back()->withErrors($e->getErrors())->withInput();
        }

        return Redirect::route('admin.settings.index')->with('success', 'The setting was deleted.');
    }
}