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
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/bower_components/MirrorMark/dist/css/mirrormark.package.min.css') }}">

    @foreach ($cssAssets as $asset)
        <link rel="stylesheet" href="{{ asset($asset) }}">
    @endforeach
</head>
<body>
    <header class="bg1 lh1">
        <div class="flex aic acc jcsb">
            <div class="flex aic">
                <h1 class="ml2 tcw ft6 fw7 ls1 uppercase mr2">
                    <a href="{{ route('bumble.dashboard') }}" class="tcw">
                    @if (config('bumble.site-title-image'))
                        <img src="{{ config('bumble.site-title-image') }}">
                    @else
                        {{ config('bumble.site-title') }}
                    @endif
                    </a>
                </h1>

                <a href="{{ url('/') }}" class="tcw fw6 ft3 uppercase ls1">Visit Site</a>
            </div>

            <nav class="">
                <ul class="flex aic">
                    <li class="mr4 ft3 fw6 uppercase ls1">
                        <a href="{{ route('bumble.dashboard') }}" class="tcw">Dashboard</a>
                    </li>
                    @foreach ($topModels as $model)
                        @unless ($model->isHiddenFromTopNav())
                            <li class="mr4 ft3 fw6 uppercase ls1">
                                <a href="{{ route(config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="tcw">{{ $model->getPluralName() }}</a>
                            </li>
                        @endunless
                    @endforeach
                    <li class="main-nav__item main-nav__item--border-left pv1 pl2 pr2">
                        <a href="#" class="main-nav__link _dropdown" data-dropdown-target="account-menu">
                            <img class="wht35 fl lh1 circle" src="{{ $authUser->getAvatar() }}" alt="{{ $authUser->email }}&rsquo;s Avatar">
                        </a>
                        <ul id="account-menu" class="secondary-nav _dropdown-menu bbr3 oh">
                            {{-- <li class="secondary-nav__item"><a href="{{ url('/') }}" class="secondary-nav__link">Account</a></li>
                            <li class="secondary-nav__separator"></li> --}}
                            <li class="secondary-nav__item">
                                <a href="{{ route('bumble.logout') }}" class="secondary-nav__link">Logout</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    @yield('content')

    {{-- <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer> --}}


    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/vendor.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/bumble.js') }}"></script>

    @foreach ($jsAssets as $asset)
        <script type="text/javascript" src="{{ asset($asset) }}"></script>
    @endforeach
</body>
</html>
