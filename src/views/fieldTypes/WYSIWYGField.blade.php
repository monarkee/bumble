<div class="form__textarea">
    {{ Form::label($field->getColumn(), $field->getTitle(), ['class' => 'form__textarea-label '.$model->getRequiredClass($field)]) }}
    @if ($field->getDescription()) <p class="help-text">{{ $field->getDescription() }}</p> @endif
    <div class="bgw" style="background-color: #fff">
    {{ Form::textarea($field->getColumn(), null, ['class' => 'form__textarea-input _wysiwyg', 'placeholder' => $field->getDescription()]) }}
    </div>
</div>
