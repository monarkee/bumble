@if (isset($post))
    <img src="{{ $field->getCachedUrl($post->{$field->getColumn()}, ['w' => 900]) }}" alt="{{ $post->{$field->getColumn()} }}" width="50">
@endif
<div class="form__text">
    <?php $fieldName = $model->fieldIsRequired($field) ? $field->getTitle() . ' (required)' : $field->getTitle(); ?>
    {!! Form::label($field->getColumn(), $fieldName, ['class' => 'form__text-label']) !!}

    <p>{{ $field->getDescription() }}</p>
    <p>{!! Form::file($field->getColumn()) !!}</p>
    @if (isset($post))
    <p>Upload path: {{ $field->getUploadTo($post->{$field->getColumn()}) }}</p>
    @else
        <p>Upload path: {{ $field->getUploadTo() }}</p>
    @endif
</div>
