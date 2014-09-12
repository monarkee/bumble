<div class="form__text">
    {{ Form::label($component->column, $component->name, ['class' => 'form__text-label']) }}
    {{ Form::text($component->column, null, ['class' => 'form__text-input', 'placeholder' => $component->description])}}
    <p class="is-hidden" style="display: none;">{{ $component->validation_string }}</p>
</div>