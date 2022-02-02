var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var autoprefixer = require('gulp-autoprefixer');
var htmlbeautify = require('gulp-html-beautify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minifyJS = require('gulp-uglify');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify')
 
//Beautify HTML
gulp.task('htmlbeautify', function() {
  gulp.src('./src/*.html')
    .pipe(htmlbeautify({ indentSize: 2 }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: ['./', './dist'],
        open: false
    });
    browserSync.reload();

    gulp.watch(["./src/sass/*.scss", "./src/sass/**/*.scss", "./src/sass/sections/*.scss", "node_modules/bootstrap/scss/bootstrap.scss"], function (event, cb) {
        setTimeout(function(){ gulp.start('sass'); }, 500)
    });
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch([ 'src/babel/*.js' ], [ 'babel' ]).on('change', browserSync.reload);
    gulp.watch(["./src/*.html"], ['htmlbeautify']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    gulp.src(["./src/sass/**/*.scss", "node_modules/bootstrap/scss/bootstrap.scss"])
        .pipe(sassGlob())
        .pipe(sass())
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
        .pipe(gulp.dest("./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('html-build', ['htmlbeautify']);

gulp.task('css-build', ['sass']);

gulp.task('js-build', ['babel']);

gulp.task('img-build', function(){
    return gulp.src(['./src/img/*', './src/img/**/*'])
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('font-build', function(){
    return gulp.src(['./src/fonts/*'])
    .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('access', function() {
  return gulp.src(['./src/.htaccess', './src/manifest.json', './src/sw.js'])
    .pipe(gulp.dest('./dist/'));
})

gulp.task('babel', function() {
    return gulp.src('./src/babel/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(babel())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('build', ['html-build', 'css-build', 'js-build', 'img-build', 'font-build', 'access']);

gulp.task('default', ['build', 'serve']);