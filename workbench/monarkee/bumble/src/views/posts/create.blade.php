@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new {{ $model->getModelName() }}</h2>
        </div>
        {{ Form::open(['files' => true, 'class' => 'form', 'route' => Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.store']) }}
            @include('bumble::posts.partials.form')
        {{ Form::close() }}
    </main>

    @include ('bumble::partials.sidenav')
</section>
@stop
