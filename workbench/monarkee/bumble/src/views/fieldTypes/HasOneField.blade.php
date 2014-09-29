<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {{ Form::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) }}
    <?php $values = $model->{$field->getLowerName()}()->getRelated()->lists($field->getTitleOption(), 'id'); ?>
    {{ Form::select($field->getColumn(), $values, null, ['class' => 'form__text-input', 'placeholder' => $field->getPlaceholder()]) }}
</div>
