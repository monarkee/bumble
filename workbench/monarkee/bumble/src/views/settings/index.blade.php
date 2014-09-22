@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Site Settings</span></h2>
            <a href="{{ route('admin.settings.create') }}" class="btn-create">Create Setting &#8594;</a>
        </div>

        @include('bumble::...partials.messages')

        <table class="table">
            <thead>
                <tr>
                    <th class="id">ID</th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                    <th class="">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($settings as $setting)
                <tr>
                    <td class="id">{{ $setting->id }}</td>
                    <td><code>{{ $setting->key }}</code></td>
                    <td>{{ $setting->value }}</td>
                    <td>{{ $setting->description }}</td>
                    <td>
                        <a href="{{ route('admin.settings.edit', $setting->id) }}" class="btn">Edit</a>
                        @if ($setting->deletable)
                            {{ Form::open(['method' => 'delete', 'route' => ['admin.settings.destroy', $setting->id]]) }}
                            {{ Form::button('Delete', ['type' => 'submit', 'class' => 'btn btn--danger js-delete-post']) }}
                            {{ Form::close() }}
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
