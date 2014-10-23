 <div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {{ Form::label($field->getColumn(), $fieldName . ' (custom)', ['class' => 'form__text-label']) }}

    {{ Form::text($field->getColumn(), null, ['class' => 'form__text-input', 'placeholder' => $field->getPlaceholder()]) }}
    {{ Form::button('Add '.$field->getSingularName(), []) }}
</div>
