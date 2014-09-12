@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new {{ str_singular($module->name) }}</h2>
        </div>
        {{ Form::open(['route' => 'admin.'.module_name($module->system_name).'.store', 'class' => 'form']) }}
            @include('bumble::partials.form2.form')
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop