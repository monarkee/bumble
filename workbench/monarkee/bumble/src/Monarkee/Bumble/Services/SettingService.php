<?php namespace Monarkee\Bumble\Services;

use Monarkee\Bumble\Validators\SettingsValidator;
use Monarkee\Bumble\Repositories\SettingsInterface;
use Monarkee\Bumble\Exceptions\ValidationException;

class SettingService
{
    protected $validation;

    protected $settings;

    function __construct(SettingsValidator $validation, SettingsInterface $settings)
    {
        $this->validation = $validation;
        $this->settings = $settings;
    }

    function createSetting($input)
    {
        // Validate the data
        $this->validation->validateForCreate($input);

        $this->settings->create($input);
    }

    function updateSetting($id, $input)
    {
        // Validate the data
        $this->validation->validateForUpdate($input);

        $this->settings->update($id, $input);
    }

    function deleteSetting($id)
    {
        $setting = $this->settings->find($id);

        if ($setting->deletable) {
            $setting->delete();
        }
        else {
            throw new ValidationException(['Users aren\'t able to delete settings specified as not deletable'], '', $code = 0);
        }
    }
}