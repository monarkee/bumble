@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">{{{ $module->name }}} <span class="header__id">#{{ $module->id }}</span></h2>
            <a href="{{ route('admin.'.module_name($module->system_name).'.create') }}" class="btn-create">Create {{{ str_singular($module->name) }}} &#8594;</a>
        </div>

        @include('bumble::partials.messages')

        <table class="table">
            <thead>
                <tr>
                    <th class="id">ID</th>
                    <th class="active-status">Active</th>

                    @foreach ($moduleComponents as $component)
                        <th>{{ Str::title($component->name) }}</th>
                    @endforeach

                    <th class="">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $i = 0; ?>
                @foreach ($posts as $post)
                <tr>
                    <td class="id">{{ $posts[$i]->id }}</td>
                    <td class="active-status"><i class="badge {{ active_color($post->active) }}"></i></td>
                    @foreach ($moduleComponents as $component)
                    <?php $columnName = $component->column; ?>
                    {{-- Foreach column name, grab the value from the database row --}}
                        @if ($component->component_type == 'Text')
                            @if ($columnName == 'slug')
                                <td><code>{{ $posts[$i]->$columnName }}</code></td>
                            @else
                                <td>{{ $posts[$i]->$columnName }}</td>
                            @endif
                        @elseif ($component->component_type == 'Textarea')
                                <td>{{ $posts[$i]->$columnName }}</td>
                        @elseif ($component->component_type == 'Checkbox')
                            @if (int_column($posts[$i]->$columnName))
                                <td>{{ published_status($posts[$i]->$columnName) }}</td>
                            @endif
                        @elseif ($component->component_type == 'DateTime')
                            @if (timestamp_column($posts[$i]->$columnName))
                                <td>{{ carbon_date($posts[$i]->$columnName)->diffForHumans() }}</td>
                            @endif
                        @elseif ($component->component_type == 'Relationship')
                                <td><code>{{ get_relation_display_value($posts[$i]->$columnName, $component->options) }}</code></td>
                        @endif
                    @endforeach
                    <td>
                        {{-- $component->module->system_name --}}
                        {{-- $posts[$i]->id --}}
                        <a href="{{ url(Config::get('bumble::urls.admin_prefix').'/'.module_name($component->module->system_name).'/'.$posts[$i]->id.'/edit') }}" class="btn">Edit</a>
                        {{ Form::open(['method' => 'delete', 'url' => [url(Config::get('bumble::urls.admin_prefix').'/'.module_name($component->module->system_name).'/'.$posts[$i]->id), $posts[$i]->id]]) }}
                        {{ Form::hidden('id', $posts[$i]->id) }}
                        {{-- Form::button('doobin', ['class' => 'btn']) --}}
                        {{ Form::button('Delete', ['type' => 'submit', 'class' => 'btn btn--danger js-delete-post']) }}
                        {{ Form::close() }}
                    </td>
                </tr>
                <?php $i++; ?>
                @endforeach
            </tbody>
        </table>
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop