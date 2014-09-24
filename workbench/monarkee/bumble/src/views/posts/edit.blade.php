@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Editing {{ str_singular($model->name) }}{{ isset($post->title) ? ': '.$post->title : ' #'.$post->id }}</h2>
        </div>
        {{ Form::model($post, [
            'method' => 'put',
            'files' => 'true',
            'class' => 'form',
            'route' => [
                Config::get('bumble::urls.admin_prefix').'.'.$model->getPluralSlug().'.update', $post->id
                ]]) }}
        {{ Form::hidden('id', $post->id) }}
            @include('bumble::posts.partials.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
