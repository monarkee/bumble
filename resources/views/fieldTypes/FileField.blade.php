<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {!! BumbleForm::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) !!}

    <p>{{ $field->getDescription() }}</p>
    <p>{!! BumbleForm::file($field->getColumn()) !!}</p>
    <p>Uploads to &rsquo;{{ $field->getUploadTo() }}&rsquo;</p>
</div>
