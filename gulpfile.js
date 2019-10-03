/* eslint-disable */
const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const path = require('path');
/* eslint-disable */

const src = [
    path.join(__dirname, '**', '*.ts'),
    '!' + path.join(__dirname, 'test', '**', '*.ts'),
    '!' + path.join(__dirname, 'node_modules', '**', '*.ts'),
];

const tsProjectUMD = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'umd',
    moduleResolution: 'node',
});
const tsProjectESNext = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'ESNext',
    moduleResolution: 'node',
});
const tsProjectAMD = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'amd',
    moduleResolution: 'node',
});
const tsProjectES6 = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'es2015',
    moduleResolution: 'node',
});
const tsProjectCJS = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'commonjs',
    moduleResolution: 'node',
});
const tsProjectSystem = ts.createProject('./tsconfig.json', {
    typescript: require('typescript'),
    declaration: true,
    target: 'es5',
    module: 'system',
    moduleResolution: 'node',
});
gulp.task('amd', function() {
    return gulp
        .src(src)
        .pipe(tsProjectAMD())
        .pipe(gulp.dest('dist/amd'));
});
gulp.task('commonjs', function() {
    return gulp
        .src(src)
        .pipe(tsProjectCJS())
        .pipe(gulp.dest('dist/commonjs'));
});
gulp.task('es2015', function() {
    return gulp
        .src(src)
        .pipe(tsProjectES6())
        .pipe(gulp.dest('dist/es2015'));
});
gulp.task('system', function() {
    return gulp
        .src(src)
        .pipe(tsProjectSystem())
        .pipe(gulp.dest('dist/system'));
});
gulp.task('esnext', function() {
    return gulp
        .src(src)
        .pipe(tsProjectSystem())
        .pipe(gulp.dest('dist/esnext'));
});
gulp.task('umd', function() {
    return gulp
        .src(src)
        .pipe(tsProjectSystem())
        .pipe(gulp.dest('dist/umd'));
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('build', gulp.series('clean', 'commonjs', 'es2015', 'amd', 'system', 'esnext', 'umd'), function() {});
