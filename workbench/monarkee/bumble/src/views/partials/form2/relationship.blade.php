<div class="form__text">
    {{ Form::label($component->column, $component->name, ['class' => 'form__select-label']) }}
    {{ Form::select($component->column, $component->getRelationValues(), null, ['class' => 'form__select-box']) }}
    <p class="is-hidden" style="display: none;">{{ $component->validation_string }}</p>
</div>