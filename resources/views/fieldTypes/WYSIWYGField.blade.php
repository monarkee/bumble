<div class="form__textarea">
    {!! BumbleForm::label($field->getColumn(), $field->getTitle(), ['class' => 'form__textarea-label '.$model->getRequiredClass($field)]) !!}
    @if ($field->getDescription()) <p class="help-text">{{ $field->getDescription() }}</p> @endif
    <div class="bgw" style="background-color: #fff">
    {!! BumbleForm::textarea($field->getColumn(), $field->getDefaultValue($editing) ?: null, ['class' => 'form__textarea-input _wysiwyg', 'placeholder' => $field->getDescription()]) !!}
    </div>
</div>
