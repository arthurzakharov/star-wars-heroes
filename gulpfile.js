'use strict';

var gulp = require('gulp'),
    sourcemap = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    mqpacker = require("css-mqpacker"),
    csso = require("gulp-csso"),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');


gulp.task('css', function() {
  var plugins = [
    autoprefixer({browsers: ['last 2 version']}),
    mqpacker({
      sort: true
    })
  ];
  return gulp.src(['./css/style.css', './css/reset.css'])
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(postcss(plugins))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest("./css"))
      .pipe(csso())
      .pipe(browserSync.reload({stream: true}))
      .pipe(sourcemap.write('.'))
      .pipe(gulp.dest("./css"))
});

gulp.task('js', function() {
  return gulp.src(['./node_modules/jquery/dist/jquery.js', './js/code.js'])
      .pipe(concat('code.min.js'))
      // .pipe(uglify())
      .pipe(gulp.dest("js"))
});

gulp.task('watch', ['browser-sync', 'css', 'js'], function() {
  gulp.watch('./css/style.css', ['css', browserSync.reload]);
  gulp.watch('./js/code.js', ['js', browserSync.reload]);
  gulp.watch('./*.html', browserSync.reload);
});

gulp.task('browser-sync', ['css'], function() {
  browserSync({
    server: {
      baseDir: '.'
    },
    notify: false
  });
});

gulp.task('default', ['watch']);