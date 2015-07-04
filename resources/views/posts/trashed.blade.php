@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    @include('bumble::partials.sidenav')
    <main class="main-content">
        <div class="header">
            <div class="flex jcc aic acc">
                <h2 class="header__title">{{ $model->getPluralName() }}</h2>
                <a href="{{ route(config('bumble.admin_prefix') . '.' . $model->getPluralSlug() . '.index') }}" class="trashed-link">View Non-Trashed</a>
            </div>
            <a href="{{ route(config('bumble.admin_prefix') . '.' . $model->getPluralSlug() . '.create') }}" class="btn-create">Create {{{ str_singular($model->getModelName()) }}} &#8594;</a>
        </div>

        @include('bumble::partials.messages')

        @unless ($entries->isEmpty())
        <table class="table">
            <thead>
                <tr>
                    <th class="id">ID</th>

                    @foreach ($model->getFields() as $field)
                        @if ($field->showInListing())
                            @if ($field->getColumn() == 'active')
                                <th class="active-status">{{ strtoupper($field->getName()) }}</th>
                            @else
                                <th>{{ strtoupper($field->getName()) }}</th>
                            @endif
                        @endif
                    @endforeach

                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($entries as $entry)
                <tr>
                    <td class="id">{{ $entry->id }}</td>
                    @foreach ($model->getFields() as $field)
                        @unless ($field->showInListing() == false)
                            @if ($field->getFieldType() == 'TextField')
                                <td>{{ $entry->{$field->getColumn()} }}</td>
                            @elseif ($field->getFieldType() == 'SlugField')
                                <td><code>{{ $entry->{$field->getColumn()} }}</code></td>
                            @elseif ($field->getFieldType() == 'DateTimeField')
                                <td><code>{{ $field->display($entry->{$field->getColumn()}) }}</code></td>
                            @elseif ($field->getFieldType() == 'BooleanField')
                                @if ($field->getColumn() == 'active')
                                    <td class="active-status"><i class="badge {{ active_color($entry->active) }}"></i></td>
                                @endif
                            @elseif ($field->getFieldType() == 'DropdownField')
                                <td>{{ $field->getValue($entry->{$field->getColumn()}) }}</td>
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
                        <div class="inline-flex">
                        {!! BumbleForm::open([
                            'method' => 'put',
                            'class' => 'dibe',
                            'route' => [
                                config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.restore', $entry->id
                            ]
                        ]) !!}
                        {!! BumbleForm::hidden('id', $entry->id) !!}
                        {!! BumbleForm::button('Restore', ['type' => 'submit', 'class' => 'dib restore-button']) !!}
                        {!! BumbleForm::close() !!}

                        {!! BumbleForm::open(['method' => 'delete', 'route' => [config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.annihilate', $entry->id]]) !!}
                            {!! BumbleForm::hidden('id', $entry->id) !!}
                            {!! BumbleForm::button('', ['type' => 'submit', 'class' => 'delete-post js-delete-post']) !!}
                        {!! BumbleForm::close() !!}
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="pv">
        {{-- {!! $entries->links() !!} --}}
        </div>
        @else
            <div class="info-box">
                <p>There aren&rsquo;t any trashed {{ strtolower($model->getPluralName()) }} here.</p>
            </div>
        @endunless
    </main>
</section>
@stop
