// const gulp = require('gulp'),
//     bump = require('gulp-bump'),
//     tsc = require('gulp-typescript'),
//     rollup = require('rollup'),
//     //mochaChrome = require('gulp-mocha-chrome'),
//     Path = require('path');

// exports.compile = function compile() {
//     const project = tsc.createProject(Path.join(process.cwd(), './tsconfig.json'), {
//         declaration: true
//     })
//     return gulp.src('./src/**/*.ts')
//         .pipe(project())
//         .pipe(gulp.dest('lib'));
// }

// exports.build = function build() {
//     const config = require(Path.join(process.cwd(), './rollup.config.js'));
//     return Promise.all(config.map(m => {
//         return rollup.rollup(m).then(bundler => {
//             return Promise.all(m.output.map(m => bundler.write(m)));
//         });
//     }));
// }


const gulp = require('gulp'),
    bump = require('gulp-bump'),
    tsc = require('gulp-typescript'),
    rollup = require('rollup'),
    mochaChrome = require('gulp-mocha-chrome'),
    Path = require('path'),
    jest = require('gulp-jest').default;

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
    const project = tsc.createProject(Path.join(process.cwd(), './tsconfig.json'), {
        declaration: true,
        typescript: require('typescript'),
        types: ['reflect-metadata']
    })
    return gulp.src('./src/**/*.ts')
        .pipe(project())
        .pipe(gulp.dest('lib'));
});

gulp.task('rollup', () => {
    const config = require(Path.join(process.cwd(), './rollup.config.js'));
    return Promise.all(config.map(m => {
        return rollup.rollup(m).then(bundler => {
            return Promise.all(m.output.map(m => bundler.write(m)));
        });
    }));
});

// gulp.task('test', ['rollup'], () => {
//     return gulp.src('test/index.html')
//         .pipe(mochaChrome())
// })

// gulp.task('test', gulp.series('rollup', () => {
//     return gulp.src('test/index.html')
//         .pipe(mochaChrome())
// }));

gulp.task('test', () => {
    process.env.NODE_ENV = 'test';
    var config;
    try {
        config = require(Path.join(process.cwd(), './jest.config.js'));
    } catch (e) {
        console.log('No tests for this package');
        return Promise.resolve();
    }

    return gulp.src('./__tests__').pipe(jest(config));
});



gulp.task('build', gulp.parallel('typescript', 'rollup'));


gulp.task('watch', function watch() {
    gulp.watch('./src/**/*.ts', gulp.parallel(['typescript', 'rollup']));
});

gulp.task('default', gulp.parallel('build'));