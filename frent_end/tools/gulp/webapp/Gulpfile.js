var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    concat     = require('gulp-concat'),
    watch      = require('gulp-watch'),
    connect    = require('gulp-connect'),
    clean      = require('gulp-clean');

var ROOT = __dirname + '/build'

gulp.task('clean', function () {
 return gulp.src('build/', {read: false})
        .pipe(clean());
});


gulp.task('scripts', function () {
  gulp.src(['javascripts/components/home.js'])
      .pipe(browserify({
          debug: true,
          transform: [ 'reactify' ]
      }))
      .pipe(gulp.dest('javascripts/'));
});


gulp.task('watch', function() {
  gulp.watch('javascripts/*/*.js', [ 'scripts' ]);
  // gulp.watch('client/img/**/*', [ 'images' ]);
  // gulp.watch('public/*.html', [ 'copy' ]);
});

// gulp.task('livereload', function() {
//   gulp.src(['build/css/*.css', 'build/js/*.js', 'build/img/*', 'build/index.html'])
//     .pipe(watch())
//     .pipe(connect.reload());
// });

gulp.task('webserver', function() {
  connect.server({
    livereload: false,
    port: 8000,
    root: ['.']
  });
});

gulp.task('build', [ 'scripts' ]);
gulp.task('default', ['build', 'webserver', 'watch']);

// Live reload has an issue of loading react.js routes
// gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);