// Gulp Requires
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rjs = require('gulp-requirejs'),
    rimraf = require('rimraf'),
    coffee = require('gulp-coffee'),
    coffeelint = require('gulp-coffeelint'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

// Node requires for exec and sys
var exec = require('child_process').exec,
    sys = require('sys');

// Directories
var SRC = 'app/assets/',
    DIST = 'public/',
    NODE = 'node_modules/',
    BOWER = 'app/assets/bower_components/',
    BUILD = 'app/assets/build/';

var onError = function (err) {
    gutil.beep();
};

// Clean build folders
gulp.task('clean-build', function(cb) {
    gulp.src(BUILD)
        .pipe(clean());
});

// Vendor CSS
gulp.task('vendorcss', function () {
    return gulp.src([
        NODE + 'normalize.css/normalize.css',
        NODE + 'animate.css/animate.css',
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(BUILD + '/css/'));
});

// SCSS Compiling and Minification
gulp.task('scss', function () {
    return gulp.src([
        SRC + 'scss/app.scss',
        SRC + 'scss/marketing.scss',
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            loadPath: [SRC],
            debugInfo: false,
            lineNumbers: false
        }))
        .pipe(autoprefixer('last 3 version'))
        .pipe(gulp.dest(BUILD + '/css'));
});

// Build Vendor JavaScript
gulp.task('vendorjs', function () {
    gulp.src([
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(BUILD + '/js/vendor'));
});

// Compile CoffeeScript
gulp.task('coffee', function () {
    return gulp.src([
        SRC + 'coffee/**/*.coffee'
    ])
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(BUILD + 'js'))
});

// Reload Blade Templates
gulp.task('blade', function () {
    return gulp.src('app/views/**/*.blade.php')
        .pipe(livereload(server));
});

/**
 * Master Build Tasks
 **/
gulp.task('buildcss', ['scss', 'vendorcss'], function () {
    gulp.src([
        BUILD + 'css/vendor.css',
        BUILD + 'css/marketing.css'
    ])
        .pipe(concat('marketing.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(DIST + 'css'))
//        .pipe(notify({message: 'CSS Complete.'}))
        .pipe(livereload());

    return gulp.src([
        BUILD + 'css/vendor.css',
        BUILD + 'css/app.css'
    ])
        .pipe(concat('app.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(DIST + 'css'))
//        .pipe(notify({message: 'CSS Complete.'}))
        .pipe(livereload());
});

// Do the creep, ahhhhhhh!
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch([
        SRC + 'scss/**/*.scss',
    ], ['buildcss']);

    // Watch .coffee files
    gulp.watch(SRC + 'coffee/**/*.coffee', ['buildjs']);

    // Watch blade files
    gulp.watch('app/views/**/*.blade.php', ['blade']);

    // Watch image files
    gulp.watch(SRC + 'img/**/*', ['compress-images']);
});

/**
 * Master Watch Tasks (These tasks are done in parallel)
 **/
gulp.task('build', ['buildcss'], function(cb) {
    rimraf(BUILD, cb);
});

// Gulp Default Task
gulp.task('default', ['build', 'watch']);
