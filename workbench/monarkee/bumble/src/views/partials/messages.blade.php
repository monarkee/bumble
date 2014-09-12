@if (Session::has('success'))
    <div id="success" class="message--success js-message js-hide-message">
        <p class="message__text">{{ Session::get('success') }}</p>
        <a href="#" class="message__btn-close">Close</a>
    </div>
@endif

@foreach ($errors->all() as $error)
<div class="message--danger js-message">
    <p class="message__text">{{ $error }}</p>
    <a href="#" class="message__btn-close">Close</a>
    <hr>
</div>
@endforeach