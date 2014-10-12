<?php
use Sami\Sami;
use Symfony\Component\Finder\Finder;

$iterator = Finder::create()
                  ->files()
                  ->name('*.php')
//                  ->exclude('Resources')
//                  ->exclude('Tests')
                  ->in('src/Monarkee/Bumble')
;

return new Sami($iterator, array(
//    'theme'                => 'symfony',
    'title'                => 'Bumble CMS',
    'build_dir'            => __DIR__.'/build',
    'cache_dir'            => __DIR__.'/cache',
    'default_opened_level' => 2,
));
