<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="/packages/monarkee/bumble/css/bumble.css">
</head>
<body class="login flex aic jcc acc fdc">

    <h1 class="tcg60 uppercase fwbold ls4 ft6 pv3">{{ Config::get('bumble.site-title') }}</h1>

    @yield('content')

    <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer>
</body>
</html>
