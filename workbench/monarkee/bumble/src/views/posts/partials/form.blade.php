<div class="main-content__left">
    @include('bumble::partials.messages')

    <div class="tab-headers">
    @foreach ($model->getTabs() as $key => $tab)
        <a href="#" class="tab-header _tab-header" data-tab-target="tab-header-{{ $key }}">
            <div class="tab-header__text">{{ title_name($key) }}</div>
        </a>
    @endforeach
    </div>

    @foreach ($model->getTabs() as $key => $tab)
        <div id="tab-header-{{ $key }}" class="tab">
        @foreach ($model->getTabFields($key) as $field)
            @if ($field->hasCustomWidget())
                @include ('bumble::fieldTypes.'.$field->getWidgetType())
            @else
                @include ('bumble::fieldTypes.'.$field->getFieldType())
            @endif
        @endforeach
        </div>
    @endforeach

    <div class="pv">
        {{ Form::button('Save ' . $model->getModelName(), ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
    </div>
</div>
