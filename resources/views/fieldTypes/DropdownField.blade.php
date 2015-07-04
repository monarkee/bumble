<div class="control g-row">
    <div class="g-col-2 tar">
        {!! BumbleForm::label($field->getColumn(), $field->getTitle(), ['class' => 'label label--tar'.$model->getRequiredClass($field)]) !!}
    </div>
    <div class="g-col-10">
        <?php $values = $field->getValues(); ?>
        {!! BumbleForm::select($field->getColumn(), $values, (!isset($editing) ? $field->getDefaultOption() : null), ['class' => 'input input1', 'placeholder' => $field->getPlaceholder()]) !!}
    </div>
</div>
