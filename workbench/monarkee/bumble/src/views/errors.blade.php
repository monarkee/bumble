@foreach ($errors->all() as $error)
    <div class="message--danger js-message">
        <p class="message__text">{{ $error }}</p>
        <a href="#" class="message__btn-close">Close</a>
        <hr>
    </div>
@endforeach
