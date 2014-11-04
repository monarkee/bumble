<?php
use Sami\Sami;
use Symfony\Component\Finder\Finder;

$iterator = Finder::create()
                  ->files()
                  ->name('*.php')
                  ->exclude('Tests')
                  ->in('src/Monarkee/Bumble')
;

return new Sami($iterator, array(
    'title'                => 'Bumble CMS',
    'build_dir'            => '../../../public/docs',
    'cache_dir'            => __DIR__.'/cache',
    'default_opened_level' => 2,
));
