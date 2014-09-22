<?php namespace Monarkee\Bumble\Models;

use Gravatar;
use Monarkee\Bumble\Models\BumbleModel;
use InvalidArgumentException;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableInterface;
use Illuminate\Database\Eloquent\Model as Eloquent;

class User extends Eloquent implements UserInterface, RemindableInterface
{
    protected $fillable = ['username', 'email'];

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password');

	/**
	 * Get the unique identifier for the user.
	 *
	 * @return mixed
	 */
	public function getAuthIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Get the password for the user.
	 *
	 * @return string
	 */
	public function getAuthPassword()
	{
		return $this->password;
	}

	/**
	 * Get the e-mail address where password reminders are sent.
	 *
	 * @return string
	 */
	public function getReminderEmail()
	{
		return $this->email;
	}

    /**
     *
     *
     * @return mixed
     */
    public function getRememberToken()
    {
        return $this->remember_token;
    }

    /**
     *
     *
     * @param $value
     * @return void
     */
    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    /**
     *
     *
     * @return string
     */
    public function getRememberTokenName()
    {
        return 'remember_token';
    }

    /**
     *
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return trim($this->first_name .' '.$this->last_name);
    }

    /**
     *
     *
     * @return mixed
     */
    public function getAvatarAttribute()
    {
        return Gravatar::src($this->email);
    }

    /**
     *
     *
     * @param $value
     * @return mixed
     */
    public function getSettingsAttribute($value)
    {
        return json_decode($value);
    }

    /**
     *
     *
     * @param array $value
     * @return void
     */
    public function setSettingsAttribute(array $value)
    {
        $jsonSetting = json_encode($value);

        if ($jsonSetting)
        {
            $this->attributes['setting'] = $jsonSetting;
        }
        else
        {
            throw new InvalidArgumentException("Unable to convert settings object to JSON");
        }
    }

    /**
     *
     *
     * @param $key
     * @return bool|null
     */
    public function getSetting($key)
    {
        return (isset($this->settings[$key])) ? $this->settings[$key] : null;
        return true;
    }

    /**
     *
     *
     * @param $key
     * @param $value
     * @return $this
     */
    public function setSetting($key, $value)
    {
        if (isset($this->settings[$key]))
        {
            $this->settings[$key] = $value;
        }
        else
        {
            throw new InvalidArgumentException("The setting [$key] does not exist.");
        }

        return $this;
    }
}
