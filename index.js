var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('imageBumperBubbles.js'))
    .pipe(gulp.dest('./dist/'))
	.on('end', () => { console.log("task complete.") });
});

gulp.start();