var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var livereload = require('gulp-livereload');
var source = require('vinyl-source-stream');

// Compile React
gulp.task('compile', function(){
  var b = browserify();
  b.transform(reactify);
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function () {
  livereload.listen();

  gulp.watch('./public/js/**/*.js', ['compile']);
});

// Default task
gulp.task('default', ['watch']);