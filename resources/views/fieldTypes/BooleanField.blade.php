<div class="control g-row">
    <div class="g-col-2 tar">
        <label class="label label--tar">{{ $field->getName() }}</label>
    </div>
    <div class="g-col-10">
        {!! Form::checkbox($field->getColumn(), null, null, ['class' => '_switch']) !!}
    </div>
</div>
