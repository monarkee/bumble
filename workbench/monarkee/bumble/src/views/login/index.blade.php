@if (Session::has('login_error'))
    <p>{{ Session::get('login_error') }}</p>
@endif

@foreach ($errors->all() as $error)
    {{ $error }}
@endforeach

{{ Form::open() }}
    <p>
        {{ Form::label('email') }}<br>
        {{ Form::text('email', null, ['placeholder' => 'Your email address'])}}
    </p>

    <p>
        {{ Form::label('password') }}<br>
        {{ Form::password('password', ['placeholder' => 'Your password'])}}
    </p>
    <p>
        {{ Form::submit() }}
    </p>
{{ Form::close() }}