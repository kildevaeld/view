
const gulp = require('gulp'),
	bump = require('gulp-bump');


gulp.task('bump', () => {
	return gulp.src('./package.json')
	.pipe(bump())
	.pipe(gulp.dest('.'));
});

