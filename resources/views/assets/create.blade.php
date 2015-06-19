@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include ('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="header__wrap">
                <h2 class="header__title">Upload a new Asset</h2>
            </div>
        </div>
        {!! Form::open([
            'files' => true,
            'class' => 'form',
            'route' => config('bumble.admin_prefix').'.assets.store'
        ]) !!}
            {{-- @include('bumble::assets.partials.form') --}}
        {!! Form::close() !!}
    </main>
</section>
@stop
