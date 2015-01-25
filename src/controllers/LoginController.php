<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use Auth;
use View;
use Redirect;
use Input;
use Config;
use Password;
use Hash;

class LoginController extends BumbleController
{
    /**
     * Dashboard View
     * @return View
     */
    public function getLogin()
    {
        if (Auth::check())
        {
            return Redirect::route('bumble.dashboard');
        }
        return View::make('bumble::login.index');
    }

    /**
     * Process the Login
     * @return Response
     */
    public function postLogin()
    {
        $input = Input::all();

        // Get the columns we will authenticate against
        $columns = config('bumble.auth_columns');

        $creds = [];

        foreach ($columns as $column)
        {
            $creds[$column] = $input[$column];
        }

        // Log the user in
        if (Auth::attempt($creds))
        {
            return Redirect::route('bumble.dashboard');
        }

        return Redirect::back()->with('login_error', 'There was something wrong with your credentials')->withInput();
    }

    public function getLogout()
    {
        Auth::logout();
        return Redirect::route('bumble.login');
    }

    public function getForgotPassword()
    {
        return View::make('bumble::reset.index');
    }

    public function postForgotPassword()
    {
        switch ($response = Password::remind(Input::only('email')))
        {
            case Password::INVALID_USER:
                return Redirect::back()->with('error', 'A user could not be found with that email address.');

            case Password::REMINDER_SENT:
                return Redirect::back()->with('success', 'A reminder email will be sent shortly.');
        }
    }

    /**
     * Display the password reset view for the given token.
     *
     * @param  string  $token
     * @return Response
     */
    public function getReset($token = null)
    {
        if (is_null($token)) App::abort(404);

        return View::make('bumble::reset.reset')->with('token', $token);
    }

    /**
     * Handle a POST request to reset a user's password.
     *
     * @return Response
     */
    public function postReset()
    {
        $credentials = Input::only(
            'email', 'password', 'password_confirmation', 'token'
        );

        $response = Password::reset($credentials, function($user, $password)
        {
            $user->password = Hash::make($password);
            $user->save();
        });

        switch ($response)
        {
            case Password::INVALID_PASSWORD:
            case Password::INVALID_TOKEN:
            case Password::INVALID_USER:
                return Redirect::back()->with('error', 'Something was wrong with the input you provided.');

            case Password::PASSWORD_RESET:
                return Redirect::route('bumble.login');
        }
    }
}
