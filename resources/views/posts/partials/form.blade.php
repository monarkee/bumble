<div class="main-content__left">
    @include('bumble::partials.messages')

    <div class="tab-headers">
    @foreach ($model->getTabs() as $key => $tab)
        <a href="#" class="tab-header _tab-header btrr3 btlr3" data-tab-target="tab-header-{{ $key }}">
            <div class="tab-header__text">{{ title_name($key) }}</div>
        </a>
    @endforeach
    </div>

    @foreach ($model->getTabs() as $key => $tab)
        <div id="tab-header-{{ $key }}" class="tab bblr3 bbrr3">
            <div class="bgg05 br3 brdr1 bcg20 ph3 pv3">
                @foreach ($model->getTabFields($key) as $field)
                    @include ($field->getWidgetType())
                @endforeach
            </div>
        </div>
    @endforeach

    <div class="flex jcsb aic pv2">
        <div class="tar">
            {!! BumbleForm::button('Save ' . $model->getModelName(), ['class' => 'btn', 'type' => 'submit']) !!}
        </div>
        <div class="danger tar">* required</div>
    </div>
</div>