var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload');

var SRC = 'resources/assets/',
    DIST = 'public/';

var onError = function (err) {
    gutil.beep();
};

// SCSS Compiling and Minification
gulp.task('scss', function () {
    return gulp.src([
        SRC + 'sass/app.scss',
        //SRC + 'sass/marketing.scss',
    ])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
        //    //loadPath: [bourbon.includePaths, amaretto.includePaths, kombucha.includePaths.styles, SRC],
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

gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch([
        SRC + 'sass/**/*.scss',
    ], ['scss']);

    // Watch Coffee files
    gulp.watch([
        SRC + 'coffee/**/*.coffee',
    ], ['coffee']);
});

// Gulp Default Task
gulp.task('default', ['scss', 'coffee', 'watch']);
