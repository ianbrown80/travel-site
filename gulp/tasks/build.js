var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('preview',['deleteDist', 'usemin', 'copyFiles', 'optimiseImages'], function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "dist"
    }
  });
});

gulp.task('deleteDist', function() {
  return del("./dist");
});

gulp.task('copyFiles', ['deleteDist'], function() {

  var paths = [
    '/app/**/*',
    '!./app/index.html',
    '!./app/asset/styles/**',
    '!./app/asset/images/**',
    '!./app/asset/scripts/**',
    '!./app/asset/temp',
    '!./app/asset/temp/**'
    ]

  return gulp.src(paths)
  .pipe(gulp.dest("./dist"));
})

gulp.task('optimiseImages', ['deleteDist', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('usemin', ['deleteDist', 'styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
  .pipe(usemin({
    css: [function() {
      return rev()
    }, function() {
      return cssnano()
    }],
    js: [function() {
      return rev()
    }, function() {
      return uglify()
    }]
  }))
  .pipe(gulp.dest("./dist"));
})

gulp.task('build', ['deleteDist', 'copyFiles', 'usemin', 'optimiseImages', 'preview']);
