var gulp = require('gulp'),
    concat = require('gulp-concat'),
    subtree = require('gulp-subtree'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify');

// Directories
var SRC = './src/',
	BUILD = './build/',
    DIST = './dist/',
    BOWER = './bower_components/';

gulp.task('dist-clean', function() {
    return gulp.src(DIST).pipe(clean());
    })

gulp.task('copyFiles', function() {
    return gulp.src([
    		SRC + '**/*.css',
    		SRC + '**/*.js',
    		SRC + 'index.html',
    	])
        .pipe(gulp.dest(DIST));
    });

gulp.task('packagecss', function() {
    return gulp.src([ 
            BOWER + 'codemirror/lib/codemirror.css',
    		SRC + 'css/mirrormark.css'
    	])
    	.pipe(concat('mirrormark.package.css'))
        .pipe(gulp.dest(DIST + 'css'));
    });

gulp.task('packagejs', function() {
    return gulp.src([ 
            BOWER + 'codemirror/lib/codemirror.js',
            BOWER + 'codemirror/mode/markdown/markdown.js',
            BOWER + 'codemirror/mode/edit/continuelist.js',
            BOWER + 'lodash/lodash.js',
            SRC + 'js/mirrormark.js'
        ])
        .pipe(concat('mirrormark.package.js'))
        .pipe(gulp.dest(DIST + 'js'));
    });

gulp.task('minifycss', function() {
    return gulp.src([ 
            DIST + 'css/demo.css',
            DIST + 'css/codemirror.css',
            DIST + 'css/mirrormark.css',
            DIST + 'css/mirrormark.package.css'
        ])
    	.pipe(minifycss())
    	.pipe(rename({
    		suffix: '.min'
    	}))
        .pipe(gulp.dest(DIST + 'css'));
    });

gulp.task('minifyjs', function() {
    return gulp.src(DIST + 'js/*.js')
        .pipe(streamify(uglify()))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(DIST + 'js'));
    });


/**
 * Master Tasks
 **/
gulp.task('build', function(callback) {
    // runSequence runs tasks in sequence to keep things straight forward
	return runSequence('dist-clean', 'copyFiles', ['packagecss', 'packagejs'], ['minifycss', 'minifyjs'], callback);
});


// Just build it
gulp.task('default', ['build']);

// Deploy to GH pages
gulp.task('temp', ['build'], function() {
    return gulp.src(DIST + '/**/*')
        .pipe(gulp.dest(BUILD));
});

gulp.task('deploy', ['temp'], function() {
    return gulp.src(BUILD)
        .pipe(subtree())
        .pipe(clean());
});
