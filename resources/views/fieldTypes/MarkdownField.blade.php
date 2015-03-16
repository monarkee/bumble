<div class="control g-row">
    <a href="#" class="media-browser-open _media-browser-open br2 bg1 uppercase ft1 ls1 fwbold tcw dib">Media Browser</a>
    <div class="full">
        {!! Form::label($field->getColumn(), $field->getTitle(), ['class' => 'form__textarea-label '.$model->getRequiredClass($field)]) !!}
        @if ($field->getDescription()) <p class="help-text">{{ $field->getDescription() }}</p> @endif
    </div>
    <div class="g-row">
        <div class="g-col-1">
            {!! Form::textarea($field->getColumn(), $field->getDefaultValue($editing) ?: null, ['class' => 'form__textarea-input _markdown-field', 'placeholder' => $field->getDescription()]) !!}
        </div>
    </div>
</div>
