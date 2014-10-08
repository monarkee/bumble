<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="{{ asset('packages/bumble/app.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.min.css') }}">
</head>
<body>
    <header class="main-header">
        <div class="main-header__wrap">
            <h1 class="main-logo"><a href="{{ route('bumble_dashboard') }}" class="main-logo__link">{{{ Config::get('bumble::site-title') }}}</a></h1>

            <a href="{{ url('/') }}" class="visit-site">Visit Site</a>

            <div class="flexible-space"></div>

            @if (Config::get('bumble::search'))
            <form action="{{ url('/') }}" class="main-search">
                <input class="main-search__input" type="search" name="q" value="" placeholder="Search Entries">
            </form>
            @endif

            <nav class="main-nav">
                <ul class="main-nav__links">
                    <li class="main-nav__item"><a href="{{ route('bumble_dashboard') }}" class="main-nav__link">Dashboard</a></li>
                    @foreach ($topModels as $model)
                        @unless ($model->isHiddenFromTopNav())
                            <li class="main-nav__item"><a href="{{ route(Config::get('bumble::admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="main-nav__link">{{ $model->getPluralName() }}</a></li>
                        @endunless
                    @endforeach
                    <li class="main-nav__item main-nav__item--border-left"><a href="{{ route('bumble_logout') }}" class="main-nav__link js-secondary-nav"><img class="main-nav__avatar" src="{{ Auth::user()->avatar }}" alt="{{ Auth::user()->full_name }}&rsquo;s Avatar"> {{ Auth::user()->first_name }}</a>
                        <ul class="secondary-nav">
                            <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Module Settings</a></li>
                            <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Module Settings</a></li>
                            <li class="secondary-nav__separator"></li>
                            <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Module Settings</a></li>
                            <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Module Settings</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    @yield('content')

    <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer>
    <script type="text/javascript" src="{{ asset('js/build/app.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('js/sort.js') }}"></script>
</body>
</html>
