@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">{{ str_singular($module->name) }} Components</h2>
            <a href="{{ $module->createLink }}" class="btn-create">Publish Mode &#8594;</a>
            <a href="{{ $module->createLink }}" class="btn js-show-fields">Show all fields</a>
        </div>
        @include('bumble::partials.messages')

        <div class="module-details">
        {{ Form::open(['url' => route('bumble_modules_components_post', [$module->id]), 'class' => 'small-form component-form js-component-form']) }}
            {{ Form::hidden('module_id', $module->id) }}

            <h1>Add a Component to the &ldquo;{{{ $module->name }}}&rdquo; module</h1>

            <p>{{ Form::label('component_type') }}<br>
            {{ Form::select('component_type', $componentTypes, 'Text', ['class' => 'funtimes'] ) }}
            </p>

            <p>{{ Form::label('name') }}<br>
            {{ Form::text('name', null, ['class' => 'funtimes', 'placeholder' => 'Component Name']) }}
            </p>

            <p>{{ Form::label('column') }}<br>
            {{ Form::text('column', null, ['class' => 'funtimes', 'placeholder' => 'Column Name']) }}
            </p>

            <p>{{ Form::label('display_listing', 'Display on Table Listing') }}<br>
            {{ Form::checkbox('display_listing', null, ['class' => 'funtimes']) }}
            </p>

            <p>{{ Form::label('sort_order') }}<br>
            {{ Form::text('sort_order', null, ['class' => 'funtimes', 'placeholder' => '10']) }}
            </p>

            <p>{{ Form::label('validation_string') }}<br>
            {{ Form::text('validation_string', null, ['class' => 'funtimes', 'placeholder' => 'required|unique']) }}
            </p>

            <p>{{ Form::label('description') }}<br>
            {{ Form::textarea('description', null, ['class' => 'funtimes', 'placeholder' => 'The text to use as help text']) }}
            </p>

            <div class="form__btn-row">
                {{ Form::button('Add Component', ['type' => 'submit', 'class' => 'btn js-add-component']) }}
            </div>
        {{ Form::close() }}
        </div>
        <div class="module-components sortable">

            @foreach ($moduleComponents as $component)
            {{ Form::open(['method' => 'put', 'url' => route('bumble_modules_components_put', [$module->id]), 'class' => 'form-collapse', 'id' => 'component-' . $component->id]) }}
                {{ Form::hidden('id', $component->id) }}
                {{ Form::hidden('component_type', $component->component_type_id) }}
                {{ Form::hidden('module_id', $component->module_id) }}
                <div class="form-header form-header--small">
                    <h2 class="form-header__text">{{ $component->type()->name }}: {{ $component->name }}</h2>
                </div>
                <div class="form-content">
                    <p>Component Name:<br>
                    {{ Form::text('name', $component->name) }}
                    </p>

                    <p>Column Name:<br>
                    {{ Form::text('column', $component->column) }}
                    </p>

                    <p>Sort Order:<br>
                    {{ Form::text('sort_order', $component->sort_order) }}
                    </p>

                    <p>Validation String:<br>
                    {{ Form::text('validation_string', $component->validationString) }}
                    </p>

                    <p>Description:<br>
                    {{ Form::textarea('description', $component->description) }}
                    </p>
                </div>
                <div class="form-footer">
                    {{ Form::button('Save Component', ['type' => 'submit', 'class' => 'btn'])}}
                    {{ Form::close() }}
                </div>
                {{ Form::open(['method' => 'delete', 'url' => route('bumble_modules_components_delete', [$component->id]), 'class' => 'form__btn-delete'])}}
                {{ Form::button('Delete Component', ['type' => 'submit', 'class' => 'text--danger']) }}
                {{ Form::close() }}
            @endforeach
        </div>
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop
