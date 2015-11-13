@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content bgg05">
        <div class="bgw pv3 ph3 br3 brdr1 bcg20">
            <div class="header">
                <div class="header__wrap">
                    <h2 class="header__title">Create a new {{ $model->getModelName() }}</h2>
                    @if ($model->getDescription())
                        <p class="header__description">{{ $model->getDescription() }}</p>
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
        </div>
    </main>
</section>
@stop
