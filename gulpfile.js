var gulp = require('gulp');
var concat = require ('gulp-concat');
var sass = require ('gulp-sass');
var bower = require('gulp-bower');
var runSequence = require('run-sequence');

gulp.task('bower', function() {
  return bower();
});

gulp.task('sass', function () {
  return gulp.src('stylesheets/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('compiled'));
});

gulp.task('js', function() {
  return gulp.src([
    'js/Base.js',
    'js/eventHub.js',
    'js/IAjaxHandler.js',
    'js/**/*.js'
  ])
    .pipe(concat('./main.js'))
    .pipe(gulp.dest('./compiled/'))
});

gulp.task('watch', function() {
  gulp.watch(['stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['js']);
});

gulp.task('default', function(callback) {
  runSequence('bower', ['sass', 'js'], callback);
});