@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        {{ Form::open(['class' => 'form']) }}
        <div class="header">
            <h2 class="header__title">Create a New Module</h2>
        </div>
        <div class="main-content__left">
                @include('bumble::partials.messages')

                <div class="form__text">
                    {{ Form::label('name', 'Module Name', ['class' => 'form__text-label']) }}
                    {{ Form::text('name', null, ['class' => 'form__text-input', 'placeholder' => 'Module Name'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('system_name', 'System Name', ['class' => 'form__text-label']) }}
                    {{ Form::text('system_name', null, ['class' => 'form__text-input', 'placeholder' => 'System Name'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('sort_column', 'Sort Column', ['class' => 'form__text-label']) }}
                    {{ Form::text('sort_column', null, ['class' => 'form__text-input', 'placeholder' => 'The sort column'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('sort_order', 'Sort Order', ['class' => 'form__text-label']) }}
                    {{ Form::text('sort_order', null, ['class' => 'form__text-input', 'placeholder' => '10'])}}
                </div>

                <div class="form__textarea">
                    {{ Form::textarea('description', null, ['class' => 'form__textarea-input', 'placeholder' => 'A description for the module']) }}
                </div>

                <div class="form__checkboxes">
                    <div class="checkbox__label">Options:</div>

                    <div class="form__checkbox-wrap--half">
                        <label class="checkbox__input-label">
                            {{ Form::checkbox('active', null, null, ['class' => 'checkbox__input']) }}
                            Activate this module
                        </label>
                    </div>
                </div>

                <div class="form__btn-row">
                    {{ Form::button('Create Module', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
                </div>
        </div>

        <div class="main-content__right">
            <div class="form__help form__select">
                <span class="form__select-label" for="checkin_class">* Create a new module and how it is used on the front-end.</span>
            </div>
        </div>
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
