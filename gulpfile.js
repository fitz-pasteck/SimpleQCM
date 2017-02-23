const gulp = require('gulp')

const css = require('gulp-css')
const pug = require('gulp-pug')
const babel = require('gulp-babel')
const clean = require('gulp-clean')

gulp.task('clean', _ => {
  return gulp.src('./dist')
    .pipe(clean())
})

gulp.task('build:css', _ => {
  return gulp.src('./src/static/css/**/*.css', {base: './src'})
    .pipe(css())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:views', _ => {
  return gulp.src('./src/views/**/*.pug', {base: './src'})
    .pipe(pug())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:babelify', _ => {
  return gulp.src(['./src/app.js', './src/static/js/**/*.js'], {base: './src'})
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:resources', () => {
  gulp.src('./src/static/media/**/*', { base: './src' })
    .pipe(gulp.dest('./dist'))
})

gulp.task('build:watch', _ => {
  gulp.watch('./src/**/*', ['clean', 'css', 'views', 'babelify', 'resources'])
})

gulp.task('default', ['clean', 'build:css', 'build:views', 'build:babelify', 'build:resources'])
