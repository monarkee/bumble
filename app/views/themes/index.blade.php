<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Bumble - The CMS for Laravel</title>

<link rel="stylesheet" href="{{ asset('css/marketing.css') }}"/>
</head>
<body>
    <header class="main-header">
        <div class="wrap main-header__wrap">
            <h1 class="logo">
                <a href="{{ route('home') }}" class="logo__link">{{{ $homepage->title }}}</a>
            </h1>

            <nav class="main-nav">
                <ul class="main-nav__items">
                    <li class="main-nav__item">
                        <a class="main-nav__link" href="">Home</a>
                    </li>
                    <li class="main-nav__item">
                        <a class="main-nav__link" href="">Documentation</a>
                    </li>
                    <li class="main-nav__item">
                        <a class="main-nav__link" href="">Blog</a>
                    </li>
                    <li class="main-nav__item">
                        <a class="main-nav__link" href="">Donate</a>
                    </li>
                    <li class="main-nav__item">
                        <a class="main-nav__link" href="">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
    <section class="hero">
        <div class="banner wrap hero__wrap pv">
            @foreach ($banners as $banner)
                <h2 class="banner__title">{{{ $banner->title }}}</h2>
                <p class="banner_subtitle">{{{ $banner->content }}}</p>
            @endforeach

            <img class="pv" src="{{ asset('img/bumble.png') }}" alt="Screenshot of Bumble"/>
        </div>
    </section>
    {{--
    <section class="feature">
        <div class="wrap">
            <h3>{{{ $homepage->feature_1_title }}}</h3>
            @markdown($homepage->feature_1_content)
        </div>
    </section>
    <section class="feature">
        <div class="wrap">
            <h3>{{{ $homepage->feature_2_title }}}</h3>
            @markdown($homepage->feature_2_content)
        </div>
    </section>
    --}}
</body>
</html>
