@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Editing Setting</h2>
        </div>
        @include('bumble::...partials.messages')
        {{ Form::model($setting, ['method' => 'patch', 'route' => ['admin.settings.update', $setting->id], 'class' => 'form']) }}
        {{ Form::hidden('id', $setting->id) }}
            @include('bumble::settings.partials.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
