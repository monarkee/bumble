<div class="control g-row">
    <div class="g-col-1">
        {{ Form::label($field->getColumn(), $field->getTitle(), ['class' => 'form__textarea-label '.$model->getRequiredClass($field)]) }}
        @if ($field->getDescription()) <p class="help-text">{{ $field->getDescription() }}</p> @endif
    </div>
</div>
<div class="control g-row">
    <div class="g-col-1">
        <div class="bgw" style="background-color: #fff">
            {{ Form::textarea($field->getColumn(), $field->getDefaultValue() ?: null, ['class' => 'form__textarea-input mdhtmlform-md', 'placeholder' => $field->getDescription()]) }}
        </div>
    </div>
    <div class="g-col-1">
        <div class="form__textarea md-preview mdhtmlform-html"></div>
    </div>
</div>
