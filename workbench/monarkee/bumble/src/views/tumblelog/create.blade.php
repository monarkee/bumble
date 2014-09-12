@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <div class="header">
            <h2 class="header__title">Create a new Post</h2>
        </div>
        {{ Form::open(['route' => 'admin.tumblelog.store', 'class' => 'form']) }}
            <div class="main-content__left">
                @include('bumble::partials.messages')

                <div class="form__text">
                    {{ Form::label('title', 'Title', ['class' => 'form__text-label']) }}
                    {{ Form::text('title', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a title'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('slug', 'Slug', ['class' => 'form__text-label']) }}
                    {{ Form::text('slug', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a slug'])}}
                </div>

                <div class="form__textarea">
                    {{ Form::label('content', 'Content', ['class' => 'form__textarea-label']) }}
                    {{ Form::textarea('content', null, ['class' => 'form__textarea-input', 'placeholder' => 'What do you have to say today?']) }}
                </div>

                <div class="form__text">
                    {{ Form::label('quote_source', 'Quote Source', ['class' => 'form__text-label']) }}
                    {{ Form::text('quote_source', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a quote_source'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('content_source', 'Content Source', ['class' => 'form__text-label']) }}
                    {{ Form::text('content_source', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a content_source'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('link', 'Link', ['class' => 'form__text-label']) }}
                    {{ Form::text('link', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a link'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('image', 'Image', ['class' => 'form__text-label']) }}
                    {{ Form::text('image', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a image'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('audio', 'Audio', ['class' => 'form__text-label']) }}
                    {{ Form::text('audio', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a audio'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('video', 'Video', ['class' => 'form__text-label']) }}
                    {{ Form::text('video', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a video'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('draft', 'Draft', ['class' => 'form__text-label']) }}
                    {{ Form::text('draft', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a draft'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('type', 'Type', ['class' => 'form__text-label']) }}
                    {{ Form::text('type', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a type'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('active', 'Active', ['class' => 'form__text-label']) }}
                    {{ Form::text('active', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a active status'])}}
                </div>

                <div class="form__text">
                    {{ Form::label('published', 'Published Date', ['class' => 'form__text-label']) }}
                    {{ Form::text('published', null, ['class' => 'form__text-input', 'placeholder' => 'Enter a published date'])}}
                </div>

                <div class="form__btn-row">
                    {{ Form::button('Save Post', ['class' => 'btn form__btn--auto-with', 'type' => 'submit']) }}
                </div>
            </div>

            <div class="main-content__right">
                <div class="form__help form__select">
                    <span class="form__select-label" for="checkin_class">* Tumblelog Description</span>
                </div>
            </div>
        {{ Form::close() }}
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop