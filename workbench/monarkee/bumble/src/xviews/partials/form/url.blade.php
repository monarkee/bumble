<div class="form__textarea">
    {{ Form::label($component->column, $component->name, ['class' => 'form__textarea-label']) }}
    {{ Form::textarea($component->column, $post->$columnName, ['class' => 'form__textarea-input', 'placeholder' => $component->description]) }}
</div>