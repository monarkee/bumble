<div class="form__textarea">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getName() . ' (required)' : $field->getName(); ?>
    {{ Form::label($field->getColumn(), $fieldName, ['class' => 'form__textarea-label']) }}
    {{ Form::textarea($field->getColumn(), null, ['class' => 'form__textarea-input', 'placeholder' => $field->getDescription()]) }}
</div>
