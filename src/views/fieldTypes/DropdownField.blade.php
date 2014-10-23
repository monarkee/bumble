<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {{ Form::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) }}
    <?php $values = $field->getValues(); ?>
    {{ Form::select($field->getColumn(), $values, (!isset($editing) ? $field->getDefaultOption() : null), ['class' => 'form__text-input', 'placeholder' => $field->getPlaceholder()]) }}
</div>
