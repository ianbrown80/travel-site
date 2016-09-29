var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('preview',['deleteDocs', 'usemin', 'copyFiles', 'optimiseImages'], function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDocs', function() {
  return del("./docs");
});

gulp.task('copyFiles', ['deleteDocs'], function() {

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
  .pipe(gulp.dest("./docs"));
})

gulp.task('optimiseImages', ['deleteDocs', 'icons'], function() {
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
  .pipe(imagemin({
    progressive: true,
    interlaced: true,
    multipass: true
  }))
  .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('usemin', ['deleteDocs', 'styles', 'scripts'], function() {
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
  .pipe(gulp.dest("./docs"));
})

gulp.task('build', ['deleteDocs', 'copyFiles', 'usemin', 'optimiseImages', 'preview']);
