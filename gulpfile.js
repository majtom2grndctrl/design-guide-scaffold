const gulp = require('gulp'),
      bs = require('browser-sync').create(),
      nunjucks = require('gulp-nunjucks-render'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps');

function html() {
  return gulp.src('src/index.njk')
    .pipe(nunjucks({
      path: 'src/'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.stream());
}

function css() {
  return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(bs.stream());
}

function dev() {
  bs.init({
    server: "./dist"
  })
  gulp.watch('src/**/*.njk', html).on('change', bs.reload);
  gulp.watch('src/sass/**/*.scss', css).on('change', bs.reload);
}

gulp.task(
  'default',
  gulp.series(
    gulp.parallel(html, css),
    dev
  )
);
