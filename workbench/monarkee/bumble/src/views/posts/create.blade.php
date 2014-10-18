@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="header__wrap">
                <h2 class="header__title">Create a new {{ $model->getModelName() }}</h2>
                @if ($model->getDescription())
                    <p class="header__description">{{ $model->getDescription() }}</p>
                @endif
            </div>
        </div>
        {{ Form::open([
            'files' => true,
            'class' => 'form',
            'route' => Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.store'
        ]) }}
            @include('bumble::posts.partials.form')
        {{ Form::close() }}
    </main>
</section>
@stop
