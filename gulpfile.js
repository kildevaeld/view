const gulp = require('gulp'),
	bump = require('gulp-bump'),
	tsc = require('gulp-typescript'),
	webpack = require('webpack'),
	gutil = require('gulp-util');


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
	return gulp.src('./src/**/*.ts')
		.pipe(project())
		.pipe(gulp.dest('lib'));
});

gulp.task('webpack', done => {
	webpack(require('./webpack.config'), (e, s) => {
		if (e) {
			throw new gutil.PluginError('webpack:build', e);
		}
		gutil.log('[webpack:build]', s.toString({
			chunks: false,
			colors: true
		}));
		done();
	});
});

gulp.task('build', ['typescript', 'webpack']);

gulp.task('watch', ['default'], () => {
	gulp.watch('./src/**/*.ts', ['typescript'])
	const compiler = webpack(require('./webpack.config'));
	compiler.watch({}, e => e ? gutil.log(e) : void 0)

});

gulp.task('default', ['build']);