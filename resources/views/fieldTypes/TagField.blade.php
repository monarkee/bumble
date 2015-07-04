 <div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {!! BumbleForm::label($field->getColumn(), $fieldName . ' (custom)', ['class' => 'form__text-label']) !!}

    {!! BumbleForm::text($field->getColumn(), null, ['class' => 'form__text-input', 'placeholder' => $field->getPlaceholder()]) !!}
    {!! BumbleForm::button('Add '.$field->getSingularName(), []) !!}
</div>
