<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use Auth;
use View;
use Redirect;
use Input;
use Config;

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
            return Redirect::route('bumble_dashboard');
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
        $columns = Config::get('bumble::auth_columns');

        $creds = [];

        foreach ($columns as $column)
        {
            $creds[$column] = $input[$column];
        }

        // Log the user in
        if (Auth::attempt($creds))
        {
            return Redirect::route('bumble_dashboard');
        }

        return Redirect::back()->with('login_error', 'There was something wrong with your credentials')->withInput();
    }

    public function getLogout()
    {
        Auth::logout();
        return Redirect::route('bumble_login');
    }
}