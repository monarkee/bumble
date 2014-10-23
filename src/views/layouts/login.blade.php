<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Bumble</title>

    <link rel="stylesheet" href="{{ asset('bower_components/trumbowyg/dist/ui/trumbowyg.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body class="login">

    @yield('content')

    <footer class="main-footer">
        <p class="copyright">&copy; {{ date('Y') }} Monarkee. All Rights Reserved.</p>
    </footer>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="{{ asset('js/bumble.js') }}"></script>
</body>
</html>
