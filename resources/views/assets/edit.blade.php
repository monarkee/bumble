@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="header__wrap">
                <h2 class="header__title">Editing <span class="header__id">#{{ $post->id }} @if ($post->editingTitle()) &ldquo;{{ $post->editingTitle() }}&rdquo;@endif</span></h2>
                <a href="#" class="media-browser-open _media-browser-open br2 bg1 uppercase ft1 ls1 fwbold tcw dib">Media Browser</a>
            </div>
        </div>
        {!! Form::model($post, [
            'method' => 'put',
            'files' => 'true',
            'class' => 'form',
            'route' => [
                config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.update', $post->id
                ]]) !!}
        <?php $editing = true; ?>
        {!! Form::hidden('id', $post->id) !!}
            @include('bumble::assets.partials.form')
        {!! Form::close() !!}
    </main>
</section>
@stop
