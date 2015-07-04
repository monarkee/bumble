<?php

/*
|--------------------------------------------------------------------------
| Blade Directives
|--------------------------------------------------------------------------
*/
Blade::directive('markdown', function($expression) {
    return "<?php echo app('\League\CommonMark\CommonMarkConverter')->convertToHtml({$expression}); ?>";
});
