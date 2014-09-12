<?php

/*
|--------------------------------------------------------------------------
| Blade Extensions
|--------------------------------------------------------------------------
*/
Blade::extend(function($view, $compiler) {
    $pattern = $compiler->createMatcher('markdown');
    $replace = '<?php echo \Michelf\Markdown::defaultTransform$2; ?>';
    return preg_replace($pattern, $replace, $view);
});
