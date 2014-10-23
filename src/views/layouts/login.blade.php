<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="{{ asset('/packages/monarkee/bumble/css/bumble.css') }}">
</head>
<body class="login">

    @yield('content')

    <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer>
</body>
</html>
