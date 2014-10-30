var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    coffee = require('gulp-coffee'),
    shell = require('gulp-shell'),
    livereload = require('gulp-livereload');

var SRC = './resources/assets/',
    BOWER = './public/bower_components/',
    NODE = './node_modules/',
    DIST = './public/';

// Javascript Sources
// ------------------------------------------------------------------------------------ */
var vendorJS = [
    NODE + 'jquery/dist/cdn/jquery-2.1.1.min.js',
    BOWER + 'trumbowyg/dist/trumbowyg.min.js',
    SRC + 'packages/showdown/showdown.js',
    SRC + 'packages/mdhtmlform/mdhtmlform.js',
    NODE + 'fastclick/lib/fastclick.js',
];

var onError = function (err) {
    gutil.beep();
};

// SCSS Compiling and Minification
gulp.task('scss', function () {
    return gulp.src([
        SRC + 'sass/bumble.scss',
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            debugInfo: false,
            lineNumbers: false
        }))
        .pipe(autoprefixer())
        .pipe(livereload())
        .pipe(gulp.dest(DIST + '/css'));
});

gulp.task('coffee', function() {
    gulp.src(SRC + 'coffee/**/*.coffee')
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(DIST + 'js'))
});

// Concat Vendor Javascripts
// ------------------------------------------------------------------------------------ */
gulp.task('vendorJS', function() {
   gulp.src(vendorJS)
       .pipe(concat('vendor.min.js'))
       .pipe(uglify())
       .pipe(gulp.dest(DIST + 'js'));
});

gulp.task('publish', ['scss', 'coffee', 'vendorJS'], function() {
    gulp.src('').pipe(shell('cd ~/Sites/bumble && php artisan asset:publish --bench=monarkee/bumble'), {ignoreErrors: true});
});

/* Blade Templates */
gulp.task('blade', function () {
    return gulp.src('./views/**/*.blade.php')
        .pipe(livereload(server));
});

gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch([
        SRC + 'sass/**/*.scss',
    ], ['scss', 'publish']);

    // Watch Coffee files
    gulp.watch([
        SRC + 'coffee/**/*.coffee',
    ], ['coffee']);

    // Watch Blade files
    gulp.watch([
        './views/**/*.blade.php'
    ], ['blade']);
});

// Gulp Default Task
gulp.task('default', ['vendorJS', 'scss', 'coffee', 'publish', 'watch']);
