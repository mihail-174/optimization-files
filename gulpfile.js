var gulp = require('gulp');
var image = require('gulp-image');
var rename = require('gulp-rename');
var del = require('del');
var cssmin = require('gulp-csso');
var uglify = require('gulp-uglifyjs');

gulp.task('img', ['clean_dist'], function() {
  return gulp.src('src/**/*.*')
    .pipe(image({
      pngquant: ['--speed=1', '--force', 256],
      optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
      zopflipng: false,
      jpegRecompress: false,
      // jpegRecompress: ['--strip', '--quality', 'medium', '--min', 85, '--max', 90],
      mozjpeg: ['-optimize', '-progressive'],
      guetzli: false,
      gifsicle: true,
      svgo: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', ['clean_dist'], function() {
  return gulp.src('src/**/*.css')
    .pipe(cssmin({
      restructure: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', ['clean_dist'], function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});




gulp.task('clean_dist', function() {
  return del.sync('dist/*');
});


gulp.task('clean_src', function() {
  return del.sync('src/*');
});

gulp.task('clean_all', function() {
  return del.sync(['src/*', 'dist/*']);
});
