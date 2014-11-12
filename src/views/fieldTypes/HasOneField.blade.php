<div class="control g-row">
    <div class="g-col-2 tar">
        {{ Form::label($field->getColumn(), $field->getTitle(), ['class' => 'label label--tar'.$model->getRequiredClass($field)]) }}
    </div>
    <div class="g-col-10">
        <?php
            $values = [];

            if ( ! $model->fieldIsRequired($field)) $values[0] = '--';

            $options = $model->{$field->method()}()->getRelated()->lists($field->getRelatedTitle(), 'id');

            foreach ($options as $key => $value)
            {
                $values[$key] = $value;
            }

            if ($field->hidesSelf())
            {
                // This entries ID
                $removeId = \Form::getValueAttribute('id');

                // Remove this entry from the values
                if (isset($removeId)) unset($values[$removeId]);
            }
        ?>

            {{ Form::select($field->getColumn(), $values, null, ['class' => 'input input1', 'placeholder' => $field->getPlaceholder()]) }}
    </div>
</div>
