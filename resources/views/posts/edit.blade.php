@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header flex aic acc jcsb pb2 mb3">
            <h2 class="tcg60 ft8">Editing <span class="header__id">#{{ $post->id }} @if ($post->editingTitle()) &ldquo;{{ $post->editingTitle() }}&rdquo;@endif</span></h2>
        </div>
        {!! BumbleForm::model($post, [
            'method' => 'put',
            'files' => 'true',
            'class' => 'form',
            'route' => [
                config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.update', $post->id
                ]]) !!}
        <?php $editing = true; ?>
        {!! BumbleForm::hidden('id', $post->id) !!}
            @include('bumble::posts.partials.form')
        {!! BumbleForm::close() !!}
    </main>
</section>
@stop
