@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new setting</h2>
        </div>
        @include('bumble::partials.messages')
        {{ Form::open(['route' => 'admin.settings.store', 'class' => 'form']) }}
            @include('bumble::settings.partials.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
