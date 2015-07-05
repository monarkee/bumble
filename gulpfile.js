var gulp = require('gulp'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    shell = require('gulp-shell'),
    plumber = require('gulp-plumber');

/*
|--------------------------------------------------------------------------
| Paths
|--------------------------------------------------------------------------
*/
var BOWER = './public/bower_components/',
    PACKAGES = './public/packages/',
    NODE = './node_modules/';

var vendorJS = [
    NODE + 'jquery/dist/jquery.min.js',
    BOWER + 'trumbowyg/dist/trumbowyg.min.js',
    BOWER + 'switchery/dist/switchery.min.js',
    PACKAGES + 'tipr/tipr.min.js',
    BOWER + 'datetimepicker/jquery.datetimepicker.js',
    BOWER + 'MirrorMark/dist/js/mirrormark.package.js',
    NODE + 'fastclick/lib/fastclick.js',
];

var paths = {
    src: {
        sass: "resources/assets/sass/",
        coffee: "resources/assets/coffee/",
        js: "resources/assets/js/"
    },
    dist: {
        js: "public/js/",
        css: "public/css/"
    },
    pkg: {
        src: "public/**/*",
        dist: "../../../public/packages/monarkee/bumble/"
    }
}

/*
|--------------------------------------------------------------------------
| Errors
|--------------------------------------------------------------------------
*/
var onError = function (err) {
    gutil.beep();
};

/*
|--------------------------------------------------------------------------
| Sass
|--------------------------------------------------------------------------
*/
gulp.task('sass', function () {
    return gulp.src([paths.src.sass + 'bumble.scss'])
    // .pipe(plumber({ errorHandler: onError }))
    .pipe(sass({ debugInfo: false, lineNumbers: false }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.dist.css));
});

/*
|--------------------------------------------------------------------------
| Coffee
|--------------------------------------------------------------------------
*/
gulp.task('coffee', function() {
    gulp.src(paths.src.coffee + '**/*.coffee')
        .pipe(coffee({ bare: true }).on('error', gutil.log))
        .pipe(gulp.dest(paths.dist.js));
});

/*
|--------------------------------------------------------------------------
| Vendor Javascript
|--------------------------------------------------------------------------
*/
gulp.task('vendorJS', function() {
   gulp.src(vendorJS)
       .pipe(concat('vendor.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest(paths.dist.js));
});

/*
|--------------------------------------------------------------------------
| Publish
|--------------------------------------------------------------------------
*/
gulp.task('publish', ['sass', 'coffee', 'vendorJS'], function() {
    gulp.src('').pipe(shell('cd ~/Sites/bumble/vendor/monarkee/bumble && mkdir -p ~/Sites/bumble/public/packages/monarkee/bumble/ && cp -r public/* ~/Sites/bumble/public/packages/monarkee/bumble/'), {ignoreErrors: true});
});

gulp.task('publish:sass', ['sass'], function() {
    gulp.src('').pipe(shell('cd ~/Sites/bumble/vendor/monarkee/bumble && mkdir -p ~/Sites/bumble/public/packages/monarkee/bumble/ && cp -r public/css/bumble.css ~/Sites/bumble/public/packages/monarkee/bumble/css/bumble.css'), {ignoreErrors: true});
});

/*
|--------------------------------------------------------------------------
| Watch
|--------------------------------------------------------------------------
*/
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch([
        paths.src.sass + '**/*.scss',
        paths.src.sass + '**/*.sass',
    ], ['sass', 'publish']);

    // Watch Coffee files
    gulp.watch([
        paths.src.coffee + '**/*.coffee',
    ], ['coffee', 'publish']);
});

gulp.task('watch:sass', function () {
    gulp.watch([
        paths.src.sass + '**/*.scss',
        paths.src.sass + '**/*.sass',
    ], ['sass', 'publish:sass']);
});