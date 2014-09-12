@extends('bumble::layouts.master')

@section('content')
<section class="main-area">
    <main class="main-content">
        <form action="" method="post" class="form">
        <div class="header">
            <h2 class="header__title">Create a New Entry</h2>
            <a href="{{ url('/') }}" class="btn-create">+ Add Entry</a>
        </div>
        <div class="main-content__left">
                <div class="form__text">
                    <span class="form__text-label">Title:</span>
                    <input class="form__text-input" type="text" placeholder="Name Your Entry">
                </div>

                <div class="form__textarea">
                    <textarea class="form__textarea-input" name="journal" id="journal" placeholder="Journal entry"></textarea>
                </div>

                <div class="form__select">
                    <span class="form__select-label" for="checkin_location">Location:</span>
                    <select name="checkin_location" id="checkin_location" class="form__select-box">
                        <option value="Keller, TX">Keller, TX</option>
                        <option value="NRH, TX">NRH, TX</option>
                        <option value="Southlake, TX">Southlake, TX</option>
                    </select>
                </div>

                <div class="form__select">
                    <span class="form__select-label" for="checkin_class">Class:</span>
                    <select name="checkin_class" id="checkin_class" class="form__select-box">
                        <option value="Jiu Jitsu">Jiu Jitsu</option>
                        <option value="Muay Thai">Muay Thai</option>
                    </select>
                </div>

                <div class="form__checkboxes">
                    <div class="checkbox__label">Post to:</div>

                    <div class="form__checkbox-wrap--half">
                        <label class="checkbox__input-label">
                            <input type="checkbox" class="checkbox__input" name="social_fb" id="social_fb" value="Yes">
                            Facebook
                        </label>
                    </div>

                    <div class="form__checkbox-wrap--half">
                        <label class="checkbox__input-label">
                            <input type="checkbox" class="checkbox__input" name="social_twitter" id="social_twitter" value="Yes">
                            Twitter
                        </label>
                    </div>
                </div>

                <div class="form__btn-row">
                    <button class="btn">Save Entry</button>
                </div>
        </div>

        <div class="main-content__right">
            <div class="form__select">
                <span class="form__select-label" for="checkin_class">Publish Date:</span>
                <select name="checkin_class" id="checkin_class" class="form__select-box">
                    <option value="Jiu Jitsu">Draft</option>
                    <option value="Muay Thai">Published</option>
                </select>
            </div>
            <div class="form__select">
                <span class="form__select-label" for="checkin_class">Status:</span>
                <select name="checkin_class" id="checkin_class" class="form__select-box">
                    <option value="Jiu Jitsu">Draft</option>
                    <option value="Muay Thai">Published</option>
                </select>
            </div>

            <div class="form__btn-row">
                <button class="btn">Save Entry</button>
            </div>
        </div>
        </form>
    </main>

    @include('bumble::partials.sidenav')
</section>
@stop