const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  });
});

//Copy the Fonts folder to dist( this is one time task to run. seperetly.)
gulp.task('copyFonts', function(){
  gulp.src('src/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
})

//Optimizing images( this is one time task to run. seperetly.)
gulp.task('imageMin', () =>
  gulp.src('src/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
);



// Compile Jade
gulp.task('pug', function(){
  gulp.src('src/pug/**/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.reload({stream: true}));
});

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/**/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({stream: true}));
});

// Concat and Minify the javascript files
gulp.task('scripts', function(){
  gulp.src('src/js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
});


gulp.task('default', ['browser-sync','watch','pug','sass','scripts','copyFonts', 'imageMin']);
