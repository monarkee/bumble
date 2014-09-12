@foreach ($models as $model)
    @if ($model->hasFields())
    <table style="width: 100%">
        <tr>
            <td colspan="6" style="text-align: center">{{ get_class($model) }}</td>
        </tr>
        <tr>
            <td>Field Name</td>
            <td>Column</td>
            <td>Sort</td>
            <td>Description</td>
            <td>Validation</td>
            <td>FieldType</td>
        </tr>

    @foreach ($model->fields as $field)
        <tr>
            <td>{{ $field->title }}</td>
            <td>{{ $field->options['column'] }}</td>
            <td>{{ $field->options['sort'] }}</td>
            <td>{{ $field->options['description'] }}</td>
            <td>{{ $field->options['validation'] }}</td>
            <td>{{ get_class($field) }}</td>
        </tr>
    @endforeach
    </table>
    @endif
@endforeach