<?php $fieldName = $model->fieldIsRequired($field) ? $field->getName() . ' (required)' : $field->getName(); ?>

<div class="form__checkboxes">
    <div class="checkbox__label">{{ $fieldName }}</div>
    <div class="form__checkbox-wrap--half">
        <label class="checkbox__input-label">
            {{ Form::checkbox($field->getColumn(), null, ['class' => 'checkbox__input']) }}
            {{  $field->getDescription() }}
        </label>
    </div>
</div>
