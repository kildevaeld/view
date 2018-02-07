const gulp = require('gulp'),
	bump = require('gulp-bump'),
	tsc = require('gulp-typescript'),
	gutil = require('gulp-util'),
	babel = require('gulp-babel'),
	merge = require('merge2');


gulp.task('bump', () => {
	return gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('.'));
});

gulp.task('bump:minor', () => {
	return gulp.src('./package.json')
		.pipe(bump({
			type: 'minor'
		})).pipe(gulp.dest('.'));
});

gulp.task('typescript', () => {
	const project = tsc.createProject('./tsconfig.json', {
		declaration: true
	})
	const out = gulp.src('./src/**/*.ts')
		.pipe(project())

	return merge([
		out.dts.pipe(gulp.dest('./lib')),
		out.js.pipe(babel({
			presets: ['env']
		})).pipe(gulp.dest('./lib'))
	]);
});


gulp.task('build', ['typescript']);

gulp.task('watch', ['default'], () => {
	gulp.watch('./src/**/*.ts', ['typescript'])
});

gulp.task('default', ['build']);