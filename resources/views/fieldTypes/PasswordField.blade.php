<div class="control">
    <div class="">
        {!! BumbleForm::label($field->getColumn(), $field->getTitle(), [
            'class' => 'label'.$model->getRequiredClass($field)
        ]) !!}
    </div>
    <div class="">
        {!! BumbleForm::password($field->getColumn(), [
            'class' => 'input input1', 'placeholder' => $field->getPlaceholder()]) !!}
    </div>
</div>
