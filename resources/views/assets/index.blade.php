@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="flex jcc aic acc">
                <h2 class="header__title">Assets</h2>
                <a href="{{ route(config('bumble.admin_prefix') . '.assets.trashed') }}" class="trashed-link">View Trashed</a>
            </div>
            <a href="{{ route(config('bumble.admin_prefix') . '.assets.create') }}" class="btn-create">Create Asset &#8594;</a>
        </div>

        @include('bumble::partials.messages')

        @unless ($entries->isEmpty())
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <td>Title</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Created At</td>
                    <td>Updated At</td>
                    <th class="">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($entries as $entry)
                <tr>
                    <td>{{ $entry->id }}</td>
                    <td>{{ $entry->title }}</td>
                    <td>{{ $entry->description }}</td>
                    <td>{{ $entry->image }}</td>
                    <td>{{ $entry->created_at }}</td>
                    <td>{{ $entry->updated_at }}</td>
                    <td width="90">
                        <div class="inline-flex">
                            <a href="{{ route(config('bumble.admin_prefix').'.assets.edit', ['id' => $entry->id]) }}" class="edit-post">Edit</a>
                            {!! Form::open(['method' => 'delete', 'route' => [config('bumble.admin_prefix').'.assets.destroy', $entry->id]]) !!}
                            {!! Form::hidden('id', $entry->id) !!}
                            {!! Form::button('', ['type' => 'submit', 'class' => 'delete-post js-delete-post']) !!}
                            {!! Form::close() !!}
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="pv">
            {!! $entries->render() !!}
        </div>
        @else
            <div class="info-box">
                <p>You haven&rsquo;t create any Assets yet.
                    <a href="{{ route(config('bumble.admin_prefix') . '.assets.create') }}">Create a new Asset &#8594;</a>
                </p>
            </div>
        @endunless
    </main>
</section>
@stop
