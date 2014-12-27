<?php

/*
|--------------------------------------------------------------------------
| Blade Extensions
|--------------------------------------------------------------------------
*/
Blade::extend(function($view, $compiler) {
    $pattern = $compiler->createMatcher('markdown');
    $replace = '<?php echo \League\CommonMark\CommonMarkConverter::convertToHtml$2; ?>';
    return preg_replace($pattern, $replace, $view);
});
