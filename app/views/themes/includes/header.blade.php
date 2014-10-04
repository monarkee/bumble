<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <title>{{ app_config('title') }}</title>
    <meta name="description" content="{MetaDescription}">
    <meta name="author" content="David Hemphill">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="http://media.davidhemphill.com/amos-tumblr/css/style.css">

    <meta name="text:Google Analytics ID" content=""/>

    <style type="text/css">
        {CustomCSS}
    </style>

    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel="shortcut icon" href="{Favicon}">
    <link rel="apple-touch-icon" href="http://media.davidhemphill.com/amos-tumblr/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="http://media.davidhemphill.com/amos-tumblr/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="http://media.davidhemphill.com/amos-tumblr/images/apple-touch-icon-114x114.png">

    <script type="text/javascript" src="//use.typekit.net/hkx8lfb.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

    <?php /*
    {block:IfGoogleAnalyticsID}
    */ ?>
    <script type="text/javascript">

    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', '{text:Google Analytics ID}']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

    </script>
    <?php /*
    {/block:IfGoogleAnalyticsID}
    */ ?>
</head>
<body>

    <header id="main">
        <div class="wrap">
            <h1><a href="/">{{ Config::get('bumble::site-title') }}</a></h1>
            @if ($pages)
            <nav id="top">
                <ul>
                    @foreach ($pages as $page)
                    <li><a href="{{ $page->slug }}">{{ $page->title }}</a></li>
                    @endforeach
                </ul>
            </nav>
            @endif
        </div> <!-- /.wrap -->
    </header>
