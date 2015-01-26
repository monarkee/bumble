<div class="control g-row">
    <div class="g-col-2 tar">
        {!! Form::label($field->getColumn(), $field->getTitle(), ['class' => 'label label--tar '.$model->getRequiredClass($field)]) !!}
    </div>
    <div class="g-col-10">
        {!! Form::text($field->getColumn(), $field->getDefaultValue($editing) ?: null, ['class' => 'input input1', 'placeholder' => $field->getPlaceholder()]) !!}
    </div>
</div>
