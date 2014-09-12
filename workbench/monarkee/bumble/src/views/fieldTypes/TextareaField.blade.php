<div class="form__textarea">
    <?php $fieldName = $field->isRequired() ? $field->getName() . ' (required)' : $field->getName(); ?>
    {{ Form::label($field->options['column'], $fieldName, ['class' => 'form__textarea-label']) }}
    {{ Form::textarea($field->options['column'], null, ['class' => 'form__textarea-input', 'placeholder' => $field->options['description']]) }}
</div>