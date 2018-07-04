const gulp = require('gulp'),
	bump = require('gulp-bump'),
	tsc = require('gulp-typescript'),
	gutil = require('gulp-util'),
	babel = require('gulp-babel'),
	merge = require('merge2'),
	rollup = require('rollup');


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

	// return merge([
	// 	out.dts.pipe(gulp.dest('./lib')),
	// 	out.js.pipe(babel({
	// 		presets: ['env']
	// 	})).pipe(gulp.dest('./lib'))
	// ]);
	return out.pipe(gulp.dest('lib'));
});

gulp.task('rollup', _ => {
	const config = require('./rollup.config.js');
	return Promise.all(config.map(m => {
		return rollup.rollup(m).then(bundler => {
			return bundler.write(m.output);
		});
	}));
});


gulp.task('build', ['typescript', 'rollup']);

gulp.task('watch', ['default'], () => {
	gulp.watch('./src/**/*.ts', ['typescript', 'rollup']);
});

gulp.task('default', ['build']);