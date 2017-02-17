var gulp = require('gulp');

gulp.task('default', function(done) {
  gulp.src(['./node_modules/uxcore/assets/**/*.css'])
      .pipe(gulp.dest('./dist'))
      .on('end', function() {
        done();
      });
});