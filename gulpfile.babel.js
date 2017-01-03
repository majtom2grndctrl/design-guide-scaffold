import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import nunjucks from 'gulp-nunjucks-render';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
const reload = browserSync.reload;

function html() {
  return gulp.src('src/pages/*.njk')
    .pipe(nunjucks({
      path: 'src/'
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
}

const css = {
  main: () => {
    return css.compile('src/sass/main.scss');
  },
  guide: () => {
    return css.compile('src/layouts/guide.scss');
  },
  compile: (path) => {
    return gulp.src(path)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());

  }
}

function js() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('core.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function dev() {
  browserSync.init({
    server: "./dist"
  })
  gulp.watch('src/**/*.njk', html).on('end', reload);
  gulp.watch('src/sass/**/*.scss', css.main).on('end', reload);
  gulp.watch('src/layouts/guide-scss/*.scss', css.guide).on('end', reload);
  gulp.watch('src/**/*.js', js).on('end', reload);
}

gulp.task(
  'default',
  gulp.series(
    gulp.parallel(html, css.main, css.guide, js),
    dev
  )
);
