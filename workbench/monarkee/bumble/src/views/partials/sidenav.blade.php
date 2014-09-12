<aside class="main-sidebar">
    <ul class="side-nav">
        <li class="side-nav__item"><a href="{{ route('admin.tumblelog.index') }}" class="side-nav__link">{{-- <i class="icon--generic"></i> --}}Tumblelog</a>
            {{--
            <ul>
                <li><a href="#">Text</a></li>
                <li><a href="#">Photo</a></li>
                <li><a href="#">Quote</a></li>
                <li><a href="#">Link</a></li>
                <li><a href="#">Chat</a></li>
                <li><a href="#">Audio</a></li>
                <li><a href="#">Video</a></li>
            </ul>
            --}}
        </li>
        @foreach ($sideModels as $model)
        <li class="side-nav__item"><a href="{{ $model->createLink }}" class="side-nav__link">{{-- <i class="icon--generic"></i> --}}{{{ $model->getModelName() }}}</a></li>
        @endforeach
        <li class="side-nav__item"><a href="{{ route('admin.settings.index') }}" class="side-nav__link">{{-- <i class="icon--generic"></i> --}}Settings</a></li>
    </ul>
</aside>