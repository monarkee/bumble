<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getName() . ' (required)' : $field->getName(); ?>
    {!! BumbleForm::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) !!}
    {!! BumbleForm::checkbox($field->getColumn(), null, ['class' => 'form__text-input', 'placeholder' => $field->getDescription()]) !!}
</div>

<div class="form__checkboxes">
    <div class="checkbox__label">{{ $fieldName }}</div>
    <div class="form__checkbox-wrap--half">
        <label class="checkbox__input-label">
            <input type="checkbox" class="checkbox__input" name="social_twitter" id="social_twitter" value="Yes">
            {!! BumbleForm::checkbox($field->getColumn(), null, ['class' => 'checkbox__input']) !!}
            {{  $field->getDescription() }}
        </label>
    </div>
</div>
