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
  var options = {
    indentSize: 2
  };
  gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./src/'))
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: ['./', './src']
    });

    gulp.watch(["./src/sass/*.scss", "./src/sass/**/*.scss", "./src/sass/sections/*.scss", "node_modules/bootstrap/scss/bootstrap.scss"], function (event, cb) {
        setTimeout(function(){ gulp.start('sass'); }, 500)
    });
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch([ 'src/babel/*.js' ], [ 'babel' ]).on('change', browserSync.reload);
    gulp.watch(["./src/*.html"], ['htmlbeautify']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(["./src/sass/*.scss", "./src/sass/**/*.scss", "./src/sass/sections/*.scss", "node_modules/bootstrap/scss/bootstrap.scss"])
        .pipe(sassGlob())
        .pipe(sass())
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('css', function(){
    return gulp.src(['src/lib/slick/slick.css', 'src/lib/chosen/chosen.css', 'src/lib/politeMask/polite.css'])
    .pipe(gulp.dest("src/css"));
});

gulp.task('css-build', function(){
    return gulp.src(['src/css/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('html-build', function() {
  var options = {
    indentSize: 2
  };
  gulp.src('./src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('js-build', function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(minifyJS())
        .pipe(gulp.dest("./dist/js"));
});

gulp.task('img-build', function(){
    return gulp.src(['./src/img/*', './src/img/**/*'])
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('font-build', function(){
    return gulp.src(['./src/fonts/*', './src/fonts/*/*'])
    .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('js', function() {
    return gulp.src(['src/js/*.js', 'src/lib/mask.js', 'src/lib/slick/slick.min.js', 'src/lib/chosen/chosen.jquery.min.js', 'src/lib/politeMask/polite.js', 'src/lib/politeMask/polite_init.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

gulp.task('access', function() {
  return gulp.src(['./src/.htaccess'])
    .pipe(gulp.dest('./dist/'));
})

gulp.task('babel', function() {
    return gulp.src([ './src/babel/**/*.js' ])
        .pipe(babel())
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('./src/js'))
})

gulp.task('build', ['html-build', 'css-build', 'js-build', 'img-build', 'font-build', 'access']);

gulp.task('default', ['babel', 'htmlbeautify','css','sass','serve']);