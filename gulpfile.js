// Gulp Requires
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    rjs = require('gulp-requirejs'),
    amaretto = require('amaretto'),
    kombucha = require('kombucha'),
    browserify = require('gulp-browserify'),
    bourbon = require('node-bourbon'),
    rimraf = require('rimraf'),
    coffee = require('gulp-coffee'),
    coffeelint = require('gulp-coffeelint'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    html = require('html-browserify'),
    server = lr(),
    karma = require('karma').server,
    svgstore = require('gulp-svgstore'),
    svgmin= require('gulp-svgmin');

// Node requires for exec and sys
var exec = require('child_process').exec,
    sys = require('sys');

// Directories
var SRC = 'app/assets/',
    DIST = 'public/',
    NODE = 'node_modules/',
    KOMBUCHA = 'node_modules/kombucha/',
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
        SRC + 'packages/prism/prism.css'
    ])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(BUILD + '/css/'));
});

// SCSS Compiling and Minification
gulp.task('scss', function () {
    return gulp.src([
        SRC + 'scss/app.scss'
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            loadPath: [bourbon.includePaths, amaretto.includePaths, kombucha.includePaths.styles, SRC],
            debugInfo: false,
            lineNumbers: false
        }))
        .pipe(autoprefixer('last 3 version'))
        .pipe(gulp.dest(BUILD + '/css'));
});

// Build Vendor JavaScript
gulp.task('vendorjs', function () {
    gulp.src([
        SRC + 'packages/prism/prism.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(BUILD + '/js/vendor'));
});

// Compile CoffeeScript
gulp.task('coffee', function () {
    return gulp.src([
        SRC + 'angular/**/*.coffee',
        SRC + 'coffee/**/*.coffee'
    ])
        .pipe(coffeelint())
        .pipe(coffeelint.reporter())
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(BUILD + 'js'))
});

// Build Angular App
gulp.task('angular', function () {
    return gulp.src([
        KOMBUCHA + 'kombucha/angular/**/*',
        SRC + 'angular/**/*'
    ])
        .pipe(gulp.dest(BUILD + 'angular'))
        .pipe(gulp.dest(DIST + 'angular'));
});

// Image Minification
gulp.task('compress-images', function () {
    return gulp.src([
        KOMBUCHA + 'kombucha/img/**/*',
        SRC + 'img/**/*'
    ])
        .pipe(imagemin())
        .pipe(gulp.dest(DIST + 'img'))
        .pipe(notify('Images compressed'));
})

// Create Icon Sprite
gulp.task('svg-icons', function () {
    return gulp.src([
        KOMBUCHA + 'kombucha/icons/*.svg'
    ])
        .pipe(svgmin())
        .pipe(svgstore({ fileName: 'icons.svg', prefix: 'icon-' }))
        .pipe(gulp.dest(DIST + 'icons'));
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
    return gulp.src([
        BUILD + 'css/vendor.css',
        BUILD + 'css/app.css'
    ])
        .pipe(concat('app.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(DIST + 'css'))
//        .pipe(notify({message: 'CSS Complete.'}))
        .pipe(livereload(server));
});

// Build all JS
gulp.task('buildjs', ['coffee', 'vendorjs'], function () {
    return gulp.src([
        BUILD + 'js/vendor/**/*.js',
        BUILD + 'js/*.js'
    ])
        .pipe(browserify({
            transform: html
        }))
        .pipe(rename('app.min.js'))

        // .pipe(uglify())
        .pipe(gulp.dest(DIST + 'js'))
//        .pipe(notify({message: 'JS Complete.'}))
        .pipe(livereload(server));
});

// Unit Tests
gulp.task('unit', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done)
});

// Do the creep, ahhhhhhh!
gulp.task('watch', function () {
    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err);
        }
    });

    // Watch .scss files
    gulp.watch([
        SRC + 'scss/**/*.scss',
        KOMBUCHA + 'kombucha/styles/**/*.scss',
        KOMBUCHA + 'kombucha/styles/**/*.sass' // For the few sass files
    ], ['buildcss']);

    // Watch .coffee files
    gulp.watch(SRC + 'coffee/**/*.coffee', ['buildjs']);

    // Watch Angular files
    gulp.watch([
        SRC + 'angular/**/*',
        KOMBUCHA + 'kombucha/angular/modules/**/*'
    ], ['build']);

    // Watch blade files
    gulp.watch('app/views/**/*.blade.php', ['blade']);

    // Watch image files
    gulp.watch(SRC + 'img/**/*', ['compress-images']);
});

/**
 * Master Watch Tasks (These tasks are done in parallel)
 **/
gulp.task('build', ['buildjs', 'buildcss', 'angular'], function(cb) {
    rimraf(BUILD, cb);
});

// Gulp Default Task
gulp.task('default', ['build', 'watch']);
gulp.task('imagemin', ['compress-images']);
