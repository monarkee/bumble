<div class="form__text">
    {{ Form::label('key', 'Key', ['class' => 'form__text-label']) }}
    {{ Form::text('key', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a key'])}}
</div>

<div class="form__text">
    {{ Form::label('value', 'Value', ['class' => 'form__text-label']) }}
    {{ Form::text('value', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a key'])}}
</div>

<div class="form__textarea">
    {{ Form::label('description', 'Description', ['class' => 'form__textarea-label']) }}
    {{ Form::textarea('description', null, ['class' => 'form__textarea-input', 'placeholder' => 'You can enter a description to help you remember what this setting is for.']) }}
</div>

<div class="form__btn-row">
    {{ Form::button('Save Setting', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
</div>