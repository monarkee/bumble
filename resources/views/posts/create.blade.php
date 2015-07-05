@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header flex aic acc jcsb pb2 mb3">
            <div>
                <h2 class="tcg60 ft8 mb1">Create a new {{ $model->getModelName() }}</h2>
                @if ($model->getDescription())
                    <p class="tcg40 ft4">{{ $model->getDescription() }}</p>
                @endif
            </div>
        </div>
        {!! BumbleForm::open([
            'files' => true,
            'class' => 'form',
            'route' => config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.store'
        ]) !!}
            @include('bumble::posts.partials.form')
        {!! BumbleForm::close() !!}
    </main>
</section>
@stop
