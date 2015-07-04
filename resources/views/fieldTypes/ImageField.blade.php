@if ($post->{$field->getColumn()})
    <img src="{{ $field->getCachedUrl($post->{$field->getColumn()}, ['w' => 900]) }}" alt="{{ $post->{$field->getColumn()} }}" width="50">
@endif
<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {!! BumbleForm::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) !!}

    <p>{{ $field->getDescription() }}</p>
    <p>{!! BumbleForm::file($field->getColumn()) !!}</p>
    <p>Upload path: {{ $field->getUploadTo($post->{$field->getColumn()}) }}</p>
</div>
