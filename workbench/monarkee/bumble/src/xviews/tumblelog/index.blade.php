@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
            <div class="header">
                <h2 class="header__title">Tumblelog</span></h2>
                <a href="{{ route('admin.tumblelog.create') }}" class="btn-create">Create Post &#8594;</a>
            </div>

            @include('bumble::partials.messages')

            <table class="table">
                <thead>
                    <tr>
                        <th class="id">ID</th>
                        <th>Title</th>
                        <th class="">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($posts as $post)
                    <tr>
                        <td class="id">{{ $post->id }}</td>
                        <td>{{ $post->title }}</td>
                        <td>
                            <a href="{{ route('admin.tumblelog.edit', $post->id) }}" class="btn">Edit</a>
                            {{ Form::open(['method' => 'delete', 'route' => ['admin.tumblelog.destroy', $post->id]]) }}
                            {{ Form::button('Delete', ['type' => 'submit', 'class' => 'btn btn--danger js-delete-post']) }}
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