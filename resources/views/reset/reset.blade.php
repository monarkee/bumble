@extends('bumble::layouts.login')

@section('content')
    {!! BumbleForm::open(['method' => 'post', 'route' => 'bumble.reset-password.post', 'class' => 'login-form']) }}
        <input type="hidden" name="token" value="{{ $token }}">

        @if (Session::has('error'))
            <div class="message--danger js-message">
                <div class="message__text message__text--full tac">
                    {{ Session::get('error') }}
                </div>
            </div>
        @endif

        <div class="control g-row">
            <div class="g-col-3 tar">
                {!! BumbleForm::label('email', 'Email', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! BumbleForm::email('email', null, ['class' => 'input input1', 'placeholder' => 'Your email address']) }}
            </div>
        </div>

        <div class="control g-row">
            <div class="g-col-3 tar">
                {!! BumbleForm::label('password', 'Password', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! BumbleForm::password('password', ['class' => 'input input1', 'placeholder' => 'Your new password']) }}
            </div>
        </div>

        <div class="control g-row">
            <div class="g-col-3 tar">
                {!! BumbleForm::label('password_confirmation', 'Confirm', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! BumbleForm::password('password_confirmation', ['class' => 'input input1', 'placeholder' => 'The password again']) }}
            </div>
        </div>

        <div class="login-control g-row">
            <div class="g-col-1">
                {!! BumbleForm::button('Reset Password', ['type' => 'submit', 'class' => 'btn form__btn--auto-with']) }}
            </div>
        </div>
    {!! BumbleForm::close() }}
@stop
