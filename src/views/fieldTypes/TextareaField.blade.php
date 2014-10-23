<div class="form__textarea">
    {{ Form::label($field->getColumn(), $field->getTitle(), ['class' => 'form__textarea-label '.$model->getRequiredClass($field)]) }}
    @if ($field->getDescription()) <p class="help-text">{{ $field->getDescription() }}</p> @endif
    {{ Form::textarea($field->getColumn(), null, ['class' => 'form__textarea-input', 'placeholder' => $field->getDescription()]) }}
</div>