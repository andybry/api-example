var gulp = require('gulp');
var concat = require ('gulp-concat');
var sass = require ('gulp-sass');

gulp.task('sass', function () {
  gulp.src('stylesheets/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('compiled'));
});

gulp.task('js', function() {
  gulp.src([
    'bower_components/underscore/underscore.js',
    'bower_components/jquery/dist/jquery..js',
    'js/**/*.js'
  ])
    .pipe(concat('./main.js'))
    .pipe(gulp.dest('./compiled/'))
});

gulp.task('watch', function() {
  gulp.watch(['stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['js/**/*.js'], ['js']);
});

gulp.task('default', ['sass'  , 'js']);