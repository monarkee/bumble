@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Editing {{ str_singular($module->name) }}{{ isset($post->title) ? ': '.$post->title : ' #'.$post->id }}</h2>
        </div>
        {{ Form::model($post, ['method' => 'patch', 'url' => url(Config::get('bumble::urls.admin_prefix').'/'.module_name($module->system_name).'/'.$post->id), 'class' => 'form']) }}
        {{ Form::hidden('id', $post->id) }}
            @include('bumble::partials.form2.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop