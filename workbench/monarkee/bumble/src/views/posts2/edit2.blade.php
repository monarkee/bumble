@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Editing {{ str_singular($module->name) }}{{ isset($post->title) ? ': '.$post->title : ' #'.$post->id }}</h2>
        </div>
        {{ Form::open(['method' => 'put', 'class' => 'form']) }}
        {{ Form::hidden('id', $post->id) }}
            @include('bumble::partials.form.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop