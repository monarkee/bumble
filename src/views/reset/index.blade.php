@extends('bumble::layouts.login')

@section('content')
    {{ Form::open(['method' => 'post', 'route' => 'bumble.forgot-password.post', 'class' => 'login-form']) }}

        @if (Session::has('success'))
            <div class="message--success js-message">
                <div class="message__text message__text--full tac">
                    {{ Session::get('success') }}
                </div>
            </div>
        @endif

        @if (Session::has('error'))
            <div class="message--danger js-message">
                <div class="message__text message__text--full tac">
                    {{ Session::get('error') }}
                </div>
            </div>
        @endif

        @unless (Session::has('success'))
            <div class="control g-row">
                <div class="g-col-3 tar">
                    {{ Form::label('email', 'Email', ['class' => 'label label--tar']) }}
                </div>
                <div class="g-col-9">
                    {{ Form::text('email', null, ['class' => 'input input1', 'placeholder' => 'Your email address']) }}
                </div>
            </div>

            <div class="login-control g-row">
                <div class="g-col-1">
                    {{ Form::button('Login', ['type' => 'submit', 'class' => 'btn form__btn--auto-with']) }}
                </div>
            </div>
        @endunless
    {{ Form::close() }}
@stop
