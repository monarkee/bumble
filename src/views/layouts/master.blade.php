<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/bower_components/trumbowyg/dist/ui/trumbowyg.min.css') }}">
    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/bower_components/datetimepicker/jquery.datetimepicker.css') }}">
    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/bower_components/switchery/dist/switchery.css') }}">
    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/packages/tipr/tipr.css') }}">
    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/css/bumble.css') }}">
</head>
<body>
    <header class="main-header">
        <div class="main-header__wrap">
            <h1 class="main-logo"><a href="{{ route('bumble.dashboard') }}" class="main-logo__link">{{{ config('bumble.site-title') }}}</a></h1>

            <a href="{{ url('/') }}" class="visit-site">Visit Site</a>

            @if (config('bumble.search'))
            <form action="{{ url('/') }}" class="main-search">
                <input class="main-search__input" type="search" name="q" value="" placeholder="Search Entries">
            </form>
            @endif

            <nav class="main-nav">
                <ul class="main-nav__links">
                    <li class="main-nav__item"><a href="{{ route('bumble.dashboard') }}" class="main-nav__link">Dashboard</a></li>
                    @foreach ($topModels as $model)
                        @unless ($model->isHiddenFromTopNav())
                            <li class="main-nav__item"><a href="{{ route(config('bumble::admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="main-nav__link">{{ $model->getPluralName() }}</a></li>
                        @endunless
                    @endforeach
                    <li class="main-nav__item main-nav__item--border-left">
                        <a href="#" class="main-nav__link _dropdown" data-dropdown-target="account-menu">
                            <img class="main-nav__avatar" src="{{ Auth::user()->getAvatar() }}" alt="{{ Auth::user()->getFullName() }}&rsquo;s Avatar"> {{ Auth::user()->getFirstName() }}
                        </a>
                        <ul id="account-menu" class="secondary-nav _dropdown-menu">
                            {{-- <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Account</a></li>
                            <li class="secondary-nav__separator"></li> --}}
                            <li class="secondary-nav__item"><a href="{{ route('bumble.logout') }}" class="secondary-nav__link">Logout</a></li>
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

    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/vendor.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/bumble.js') }}"></script>
</body>
</html>
