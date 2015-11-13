var elixir = require('laravel-elixir');

elixir.config.assetsPath = "resources/assets";
elixir.config.css.outputFolder = "../public/css";
elixir.config.js.outputFolder = "../public/js";

elixir(function(mix) {
    mix.sass('bumble.scss')
        .coffee('bumble.coffee')
        .scripts([
            "../../../bower_components/jquery/dist/jquery.js",
            "../../../bower_components/switchery/dist/switchery.js",
            "../../../bower_components/datetimepicker/build/jquery.datetimepicker.full.js",
            "../../../bower_components/mirrormark/dist/js/mirrormark.package.min.js",
        ], 'public/js/vendor.js')
        .styles([
            "../../../bower_components/trumbowyg/dist/ui/trumbowyg.min.css",
            "../../../bower_components/datetimepicker/jquery.datetimepicker.css",
            "../../../bower_components/switchery/dist/switchery.css",
            "../../../bower_components/mirrormark/dist/css/mirrormark.package.min.css",
            "../../../css/bumble.css",
        ], 'public/css/vendor.css')
        .copy('public', '../bumbletest/public/packages/monarkee/bumble');
});