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
<body
@section('body-classes')
@stop
>
    <header class="main-header">
        <div class="main-header__wrap scrollable">
            <h1 class="main-logo"><a href="{{ route('bumble.dashboard') }}" class="main-logo__link fwbold">
                @if (config('bumble.site-title-image'))
                    <img src="{{ config('bumble.site-title-image') }}">
                @else
                    {{ config('bumble.site-title') }}
                @endif
                </a>
            </h1>

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
                            <li class="main-nav__item"><a href="{{ route(config('bumble.admin_prefix').'.'.$model->getPluralSlug().'.index') }}" class="main-nav__link">{{ $model->getPluralName() }}</a></li>
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


    <div class="modal pv3 ph3 flex jcc" style="display: none; z-index: 9999;">
        <div class="modal__bg stretch"></div>
        <div class="media-browser bgw">
            <div class="media-browser__clip">
                <div class="media-browser__content">
                    <div class="media-browser-search pb2 flex aic jcsb">
                        <h2 class="media-browser__heading fl ft5 tcg40">Add Media</h2>
                        <input type="text" class="media-browser__filter _media-browser-filter ft2 ph1 bgw" placeholder="Search for assets"/>
                    </div>
                    <ul class="assets">
                        @foreach ($bumbleAssets as $asset)
                            <li class="asset asset__row flex">
                                <img src="{{ $asset->getCachedUrl(['w'=>50]) }}" alt="" class="asset__img"/>
                                <div class="asset__title ft2 ph2 tal">{{ $asset->image }}</div>
                                <input type="text" class="media-browser-input bgw tac asset__input _input-value mr2 code" value='<img src="{{ $asset->getUrl()  }}">' data-original-value="{{ $asset->getUrl() }}"/>
                                <button class="asset__btn _send-to-editor">Copy</button>

                                <div class="options flex aic acc">
                                    <label class="ft1 fwbold uppercase ls1 tcg40 mr1">Width:</label><input type="text" name="width" value="300" class="_width media-browser-input tac mr2 code"/>
                                    <label class="ft1 fwbold uppercase ls1 tcg40 mr1">Height:</label><input type="text" name="height" value="300" class="_height media-browser-input tac mr2 code"/>
                                    <label class="ft1 fwbold uppercase ls1 tcg40 mr1">Crop:</label><input type="checkbox" checked class="_crop media-browser-input tac code"/>
                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
            {{--<a href="#" class="modal__close _media-browser-close">Close</a>--}}
    </div>

    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/vendor.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('/packages/monarkee/bumble/js/bumble.js') }}"></script>

    @foreach ($jsAssets as $asset)
        <script type="text/javascript" src="{{ asset($asset) }}"></script>
    @endforeach
</body>
</html>
