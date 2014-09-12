@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        {{ Form::open(['class' => 'form']) }}
        {{ Form::hidden('id', $module->id) }}
        <div class="header">
            <h2 class="header__title">Editing Module: {{ $module->name }}</h2>
            <a href="{{ url('/') }}" class="btn-create">Publish Mode &#8594;</a>
        </div>
        <div class="main-content__left">
                @include('bumble::partials.messages')

                <div class="form__text">
                    {{ Form::label('name', 'Module Name', ['class' => 'form__text-label']) }}
                    {{ Form::text('name', $module->name, ['class' => 'form__text-input', 'placeholder' => 'Module Name'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('system_name', 'System Name', ['class' => 'form__text-label']) }}
                    {{ Form::text('system_name', $module->system_name, ['class' => 'form__text-input', 'placeholder' => 'System Name'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('sort_column', 'Sort Column', ['class' => 'form__text-label']) }}
                    {{ Form::text('sort_column', $module->sort_column, ['class' => 'form__text-input', 'placeholder' => 'The sort column'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('sort_order', 'Sort Order', ['class' => 'form__text-label']) }}
                    {{ Form::text('sort_order', $module->sort_order, ['class' => 'form__text-input', 'placeholder' => 'The sort column'])}}
                </div>

                <div class="form__textarea">
                    {{ Form::textarea('description', $module->description, ['class' => 'form__textarea-input', 'placeholder' => 'A description for the module']) }}
                </div>

                <div class="form__checkboxes">
                    <div class="checkbox__label">Options:</div>

                    <div class="form__checkbox-wrap--half">
                        <label class="checkbox__input-label">
                            {{ Form::checkbox('active', null, $module->active, ['class' => 'checkbox__input']) }}
                            This Module is Active
                        </label>
                    </div>

                </div>

                <div class="form__btn-row">
                    {{ Form::button('Save Module', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
                </div>
        </div>

        <div class="main-content__right">
            <div class="form__help form__select">
                <span class="form__select-label" for="checkin_class">* Edit the details of a module and how it is used on the front-end.</span>
            </div>
        </div>
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop