<div class="main-content__left">
    @include('bumble::partials.messages')

    @foreach ($model->fields as $field)
        @include ('bumble::new.fieldTypes.'.$field->getFieldType())
    @endforeach
    <div class="form__btn-row">
        {{ Form::button('Save Entry', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
    </div>
</div>

<div class="main-content__right">
    <div class="form__help form__select">
        <span class="form__select-label" for="checkin_class">* Save</span>
    </div>
</div>