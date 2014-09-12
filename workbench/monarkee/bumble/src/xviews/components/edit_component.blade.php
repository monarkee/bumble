@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        {{ Form::open(['class' => 'form']) }}
        <div class="header">
            <h2 class="header__title">Editing Component: {{ $module->name }}</h2>
            <a href="{{ url('/') }}" class="btn-create">Publish Mode &#8594;</a>
        </div>
        <div class="main-content__left">
                @if (Session::has('login_error'))
                    <p>{{ Session::get('login_error') }}</p>
                @endif

                @foreach ($errors->all() as $error)
                    {{ $error }}
                @endforeach

                <h1>Components</h1>

                @foreach ($module->components as $component)
                    @if ($component->type->slug === 'text')
                        <p>Component Name:<br>
                        {{ Form::text($component->name, $component->name) }}
                        </p>
                    @elseif ($component->type->slug === 'textarea')
                        <p>Component Name:<br>
                        {{ Form::text($component->name, $component->name) }}
                        </p>
                    @endif

                    <p>Column Name:<br>
                    {{ Form::text($component->column, $component->column) }}
                    </p>

                    <p>Description:<br>
                    {{ Form::textarea('description', $component->description) }}
                    </p>
                    <hr>
                @endforeach

                <div class="form__btn-row">
                    {{ Form::button('Save Entry', ['class' => 'btn']) }}
                </div>
        </div>

        <div class="main-content__right">
            <div class="form__select">
                <span class="form__select-label" for="checkin_class">Publish Date:</span>
                <select name="checkin_class" id="checkin_class" class="form__select-box">
                    <option value="Jiu Jitsu">Draft</option>
                    <option value="Muay Thai">Published</option>
                </select>
            </div>
            <div class="form__select">
                <span class="form__select-label" for="checkin_class">Status:</span>
                <select name="checkin_class" id="checkin_class" class="form__select-box">
                    <option value="Jiu Jitsu">Draft</option>
                    <option value="Muay Thai">Published</option>
                </select>
            </div>

            <div class="form__btn-row">
                <button class="btn">Save Entry</button>
            </div>
        </div>
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop