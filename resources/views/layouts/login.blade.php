<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="/packages/monarkee/bumble/css/bumble.css">
</head>
<body class="login">

    <h1>{{ Config::get('bumble.site-title') }}</h1>

    @yield('content')

    <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer>
</body>
</html>
