@extends('bumble::layouts.login')

@section('content')
    {{ Form::open(['route' => 'bumble.login.post', 'class' => 'login-form']) }}

        @if (Session::has('login_error'))
            <div class="message--danger js-message">
                <div class="message__text message__text--full tac">
                    {{ Session::get('login_error') }}
                </div>
            </div>
        @endif

        <div class="control g-row">
            <div class="g-col-3 tar">
                {{ Form::label('email', 'Email', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {{ Form::text('email', null, ['class' => 'input input1', 'placeholder' => 'Your username']) }}
            </div>
        </div>

        <div class="control g-row">
            <div class="g-col-3 tar">
                {{ Form::label('password', 'Password', ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                {{ Form::password('password', ['class' => 'input input1', 'placeholder' => 'Your password']) }}
            </div>
        </div>

        <div class="login-control g-row">
            <div class="g-col-1">
                {{ Form::button('Login', ['type' => 'submit', 'class' => 'btn form__btn--auto-with']) }}
            </div>
            <div class="login-control__link g-col-1 tar">
                <a href="#">Forgot Password</a>
            </div>
        </div>
    {{ Form::close() }}
@stop
