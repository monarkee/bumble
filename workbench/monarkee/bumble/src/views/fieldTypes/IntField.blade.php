<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getName() . ' (required)' : $field->getName(); ?>
    {{ Form::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) }}
    {{ Form::checkbox($field->getColumn(), null, ['class' => 'form__text-input', 'placeholder' => $field->getDescription()]) }}
</div>
