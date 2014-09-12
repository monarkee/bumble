@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Modules</h2>
            <a href="{{ route('bumble_modules_create') }}" class="btn-create">Create Module &#8594;</a>
        </div>

        @include('bumble::partials.messages')

        <table class="table">
            <thead>
                <tr>
                    <th class="id">ID</th>
                    <th class="active-status">Active</th>
                    <th>Module Name</th>
                    <th>System Name</th>
                    <th>Description</th>
                    <th>Sort Order</th>
                    <th class="actions">Actions</th>
                </tr>
            </thead>
            <tbody>
            @foreach ($modules as $module)
            <tr>
                <td class="id">{{ $module->id }}</td>
                <td class="active-status"><span class="badge {{ $module->color }}"></span></td>
                <td>{{ $module->name }}</td>
                <td><code>{{ $module->system_name }}</code></td>
                <td>{{ $module->description }}</td>
                <td>{{ $module->sort_order }}</td>
                <td>
                    <a href="{{ route('bumble_modules_components', ['id' => $module->id]) }}" class="btn">Components</a>
                    <a href="{{ route('bumble_modules_edit', ['id' => $module->id]) }}" class="btn">Edit</a>
                    {{ Form::open(['method' => 'post', 'route' => ['bumble_modules_delete', $module->id]]) }}
                    <a class="btn btn--danger js-delete-module" data-module-id="{{ $module->id }}" data-action-url="{{ route('bumble_modules_delete', ['id', $module->id]) }}">Delete</a>
                    {{ Form::close() }}
                </td>
            </tr>
            @endforeach
            </tbody>
        </table>
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop