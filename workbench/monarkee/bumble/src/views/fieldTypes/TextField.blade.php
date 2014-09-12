<div class="form__text">
    <?php $fieldName = $field->isRequired() ? $field->getName() . ' (required)' : $field->getName(); ?>
    {{ Form::label($field->options['column'], $fieldName, ['class' => 'form__text-label']) }}
    {{ Form::text($field->options['column'], null, ['class' => 'form__text-input', 'placeholder' => $field->options['description']]) }}
    <p class="is-hidden" style="display: none;">{{ $field->options['validation'] }}</p>
</div>