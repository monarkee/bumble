<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {{ Form::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) }}
    {{ Form::text($field->getColumn(), $field->getDefaultValue() ?: null, ['class' => 'form__text-input _timefield', 'placeholder' => $field->getPlaceholder()]) }}
</div>
