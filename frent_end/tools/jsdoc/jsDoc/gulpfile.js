var gulp = require('gulp'),
    jsdoc = require("gulp-jsdoc");

gulp.task('generate', function(){
     return gulp.src("./src/js/*.js")
            .pipe(jsdoc('./output'))
});
gulp.task('watch', function(){
     gulp.watch('./src/js/*.js', ['generate']);
});
gulp.task('default', ['generate']);