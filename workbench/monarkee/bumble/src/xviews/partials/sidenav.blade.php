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
        @foreach ($sideModules as $module)
        <li class="side-nav__item"><a href="{{ $module->indexLink }}" class="side-nav__link">{{-- <i class="icon--generic"></i> --}}{{{ $module->name }}}</a></li>
        @endforeach
        <li class="side-nav__item"><a href="{{ route('admin.settings.index') }}" class="side-nav__link">{{-- <i class="icon--generic"></i> --}}Settings</a></li>
    </ul>
</aside>