@extends('bumble::...layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new {{ $model->getModelName() }}</h2>
        </div>
        {{ Form::open(['class' => 'form']) }}
            @include('bumble::new.form.form')
        {{ Form::close() }}
    </main>


</section>
@stop