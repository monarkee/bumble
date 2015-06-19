<div class="main-content__left">
    @include('bumble::partials.messages')



    <div class="bgg05 flex aic acc pv2 ph2 mb3">
        <p>{!! Form::file('image') !!}</p>
    </div>

    <div class="control g-row">
        <div class="g-col-2 tar">
            {!! Form::label('title', 'Title', ['class' => 'label label--tar required']) !!}
        </div>
        <div class="g-col-10">
            {!! Form::text('title', null, ['class' => 'input input1', 'placeholder' => 'Shit']) !!}
        </div>
    </div>

    <div class="control g-row">
        <div class="g-col-2 tar">
            {!! Form::label('source', 'Source', ['class' => 'label label--tar required']) !!}
        </div>
        <div class="g-col-10">
            {!! Form::select('source', $sourceValues, null, ['class' => 'input input1']) !!}
        </div>
    </div>

    <div class="form__textarea">
        {!! Form::label('description', 'Description', ['class' => 'form__textarea-label required']) !!}
        <p class="help-text">Here is some help text</p>
        {!! Form::textarea('description', null, ['class' => 'form__textarea-input', 'placeholder' => 'Put shit here', 'rows' => 10]) !!}
    </div>

    <div class="danger pts">* required</div>

    <div class="pt">
        {!! Form::button('Save ' . $model->getModelName(), ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) !!}
    </div>
</div>