<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/css/bumble.css') }}">
</head>
<body class="login flex aic acc jcc fdc">

    <h1 class="ft7 tcg60 mb3">{{ Config::get('bumble.site-title') }}</h1>

        @yield('content')

        <footer class="main-footer">
            <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
        </footer>
</body>
</html>
