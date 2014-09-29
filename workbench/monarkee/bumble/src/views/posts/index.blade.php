@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">{{ $model->getPluralName() }}</h2>
            <a href="{{ route(Config::get('bumble::admin_prefix') . '.' . $model->getPluralSlug() . '.create') }}" class="btn-create">Create {{{ str_singular($model->getModelName()) }}} &#8594;</a>
        </div>

        @include('bumble::partials.messages')

        <table class="table">
            <thead>
                <tr>
                    <th class="id">ID</th>

                    @foreach ($model->getComponents() as $field)
                        @unless ($field->showInListing() == false)
                            @if ($field->getColumn() == 'active')
                                <th class="active-status">{{ Str::title($field->getName()) }}</th>
                            @else
                                <th>{{ Str::title($field->getName()) }}</th>
                            @endif
                        @endunless
                    @endforeach

                    <th class="">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $i = 0; ?>
                @foreach ($model->all() as $entry)
                <tr>
                    <td class="id">{{ $entry->id }}</td>
                    @foreach ($model->getComponents() as $field)
                        @unless ($field->showInListing() == false)
                            @if ($field->getFieldType() == 'TextField')
                                @if ($field->getColumn() == 'slug')
                                    <td><code>{{ $entry->{$field->getColumn()} }}</code></td>
                                @else
                                <td>{{ $entry->{$field->getColumn()} }}</td>
                                @endif
                            @elseif ($field->getFieldType() == 'IntField')
                                @if ($field->getColumn() == 'active')
                                    <td class="active-status"><i class="badge {{ active_color($entry->active) }}"></i></td>
                                @endif
                            @elseif ($field->getFieldType() == 'TextareaField')
                                <td>{{ str_limit($entry->{$field->getColumn()}, $limit = 40, $end = '&hellip;') }}</td>
                            @elseif ($field->getFieldType() == 'ImageField')
                                <td>{{ $entry->{$field->getColumn()} }}</td>
                            @elseif ($field->getFieldType() == 'HasOneField')
                                <td>{{ $model->{$field->getLowerName()}()->getRelated()->whereId($entry->{$field->getColumn()})->pluck($field->getTitleOption()) }}</td>
                            @else
                                <td>{{ $entry->{$field->getColumn()} }}</td>
                            @endif
                        @endunless
                    @endforeach
                    <td>
                        <a href="{{ route(Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.edit', ['id' => $entry->id]) }}" class="btn">Edit</a>
                        {{ Form::open(['method' => 'delete', 'route' => [Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.destroy', $entry->id]]) }}
                        {{ Form::hidden('id', $entry->id) }}
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
