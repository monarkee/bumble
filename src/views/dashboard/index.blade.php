@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="flex jcc aic acc">
                <h2 class="header__title">Dashboard</h2>
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th class="uppercase fwbold ls-2 ft-2">Model Name</th>
                    <th class="uppercase fwbold ls-2 ft-2">Description</th>
                    <th class="uppercase fwbold ls-2 ft-2"># of Entries</th>
                    <th class="uppercase fwbold ls-2 ft-2">Trashed Entries</th>
                    <th class="uppercase fwbold ls-2 ft-2">Actions</th>
                </tr>
            </thead>
        @foreach($models as $model)
        <tr>
            <td>{{{ $model->getPluralName() }}}</td>
            <td>{{ $model->getDescription() }}</td>
            <td>{{{ $model::count() }}} {{{ Str::plural($model->getModelName(), $model::count()) }}}</td>
            <td>
                @if ($model->isSoftDeleting())
                    {{ $model::onlyTrashed()->count() }} trashed entries
                @endif
            </td>
            <td>
                <div class="inline-flex">
                    <a href="{{ route(Config::get('bumble::admin_prefix') . '.' . $model->getPluralSlug() . '.create') }}" class="btn-create">Create {{{ str_singular($model->getModelName()) }}} &#8594;</a>
                </div>
            </td>
        </tr>
        @endforeach
        </table>
    </main>
</section>
@stop
