<div class="main-content__left">
    @include('bumble::partials.messages')

    @foreach ($model->getComponents() as $field)
        @if ($field->hasCustomWidget())
            @include ('bumble::fieldTypes.'.$field->getWidgetType())
        @else
            @include ('bumble::fieldTypes.'.$field->getFieldType())
        @endif
    @endforeach

    <div class="form__btn-row">
        {{ Form::button('Save ' . $model->getModelName(), ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
    </div>
</div>

@if ($model->getDescription())
    <div class="main-content__right">
        <div class="form__help form__select">
            <span class="form__select-label" for="checkin_class">{{ $model->getDescription() }}</span>
        </div>
    </div>
@endif
