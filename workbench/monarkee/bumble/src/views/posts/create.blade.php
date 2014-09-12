@extends('bumble::...layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new {{ $model->getModelName() }}</h2>
        </div>
        {{ Form::open(['class' => 'form']) }}
            <div class="main-content__left">
                @include('bumble::partials.messages')

                @foreach ($model->fields as $field)
                    @include ('bumble::fieldTypes.'.$field->getFieldType())
                @endforeach
                <div class="form__btn-row">
                    {{ Form::button('Save Entry', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
                </div>
            </div>

            <div class="main-content__right">
                <div class="form__help form__select">
                    <span class="form__select-label" for="checkin_class">* Save</span>
                </div>
            </div>
        {{ Form::close() }}
    </main>


</section>
@stop