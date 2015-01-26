@extends('bumble::layouts.login')

@section('content')
    {!! Form::open(['method' => 'post', 'route' => 'bumble.reset-password.post', 'class' => 'login-form']) }}
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
                {!! Form::label('email', 'Email', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! Form::email('email', null, ['class' => 'input input1', 'placeholder' => 'Your email address']) }}
            </div>
        </div>

        <div class="control g-row">
            <div class="g-col-3 tar">
                {!! Form::label('password', 'Password', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! Form::password('password', ['class' => 'input input1', 'placeholder' => 'Your new password']) }}
            </div>
        </div>

        <div class="control g-row">
            <div class="g-col-3 tar">
                {!! Form::label('password_confirmation', 'Confirm', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {!! Form::password('password_confirmation', ['class' => 'input input1', 'placeholder' => 'The password again']) }}
            </div>
        </div>

        <div class="login-control g-row">
            <div class="g-col-1">
                {!! Form::button('Reset Password', ['type' => 'submit', 'class' => 'btn form__btn--auto-with']) }}
            </div>
        </div>
    {!! Form::close() }}
@stop
