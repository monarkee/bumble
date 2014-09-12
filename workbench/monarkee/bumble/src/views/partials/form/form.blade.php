<div class="main-content__left">
    @include('bumble::partials.messages')

    @foreach ($moduleComponents as $component)
        <?php $columnName = $component->column; ?>
        @include('bumble::partials.form.'.$component->type->slug)
    @endforeach
    <div class="form__btn-row">
        {{ Form::button('Save '.str_singular($module->name), ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
    </div>
</div>

<div class="main-content__right">
    <div class="form__help form__select">
        <span class="form__select-label" for="checkin_class">* {{ $module->description }}</span>
    </div>
</div>