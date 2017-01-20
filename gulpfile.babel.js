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
  project: () => {
    return css.compile('src/layouts/project/main.scss');
  },
  guide: () => {
    return css.compile('src/layouts/guide/guide.scss');
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

const js = {
  project: () => {
    return js.compile('src/layouts/project/**/*.js', 'core.js');
  },
  guide: () => {
    return js.compile('src/layouts/guide/**/*.js', 'guide.js');
  },
  compile: (path, output) => {
    return gulp.src(path)
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat(output))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream());
  }
}

function dev() {
  browserSync.init({
    server: "./dist"
  })
  gulp.watch('src/**/*.njk', html).on('end', reload);
  gulp.watch('src/layouts/project/**/*.scss', css.project).on('end', reload);
  gulp.watch('src/layouts/guide/**/*.scss', css.guide).on('end', reload);
  gulp.watch('src/layouts/project/**/*.js', js.project).on('end', reload);
  gulp.watch('src/layouts/guide/**/*.js', js.guide).on('end', reload);
}

gulp.task(
  'default',
  gulp.series(
    gulp.parallel(html, css.project, css.guide, js.project, js.guide),
    dev
  )
);
