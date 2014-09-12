<?php namespace Monarkee\Bumble\Controllers;

use Monarkee\Bumble\Controllers\BumbleController;
use Auth;
use View;
use Redirect;
use Input;

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

        // Log the user in
        if (Auth::attempt(['email' => $input['email'], 'password' => $input['password']]))
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