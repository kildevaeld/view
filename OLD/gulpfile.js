const gulp = require('gulp'),
	bump = require('gulp-bump'),
	tsc = require('gulp-typescript'),
	rollup = require('rollup'),
	mochaChrome = require('gulp-mocha-chrome');

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
		.pipe(gulp.dest('lib'));
});

gulp.task('rollup', _ => {
	const config = require('./rollup.config.js');
	return Promise.all(config.map(m => {
		return rollup.rollup(m).then(bundler => {
			return Promise.all(m.output.map(m => bundler.write(m)));
		});
	}));
});

gulp.task('test', ['rollup'], () => {
	return gulp.src('test/index.html')
		.pipe(mochaChrome())
})


gulp.task('build', ['typescript', 'rollup']);

gulp.task('watch', ['default'], () => {
	gulp.watch('./src/**/*.ts', ['typescript', 'rollup']);
});

gulp.task('default', ['build', 'test']);