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

        @foreach(Config::get('bumble::auth_columns') as $column)
        <?php $upper_col = ucwords($column); ?>
        <div class="control g-row">
            <div class="g-col-3 tar">
                {{ Form::label($column, $upper_col, ['class' => 'label label--tar']) }}
            </div>
            <div class="g-col-9">
                @unless ($column === 'password')
                {{ Form::text($column, null, ['class' => 'input input1', 'placeholder' => 'Your '.$upper_col]) }}
                @else
                {{ Form::password($column, ['class' => 'input input1', 'placeholder' => 'Your '.$upper_col]) }}
                @endunless
            </div>
        </div>
        @endforeach

        <div class="login-control g-row">
            <div class="g-col-1">
                {{ Form::button('Login', ['type' => 'submit', 'class' => 'btn form__btn--auto-with']) }}
            </div>
            <div class="login-control__link g-col-1 tar">
                <a href="{{ route('bumble.forgot-password') }}">Forgot Password</a>
            </div>
        </div>
    {{ Form::close() }}
@stop
