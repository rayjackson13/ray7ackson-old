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

var libPaths = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/slick-carousel/slick/slick.css'
]
 
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
        server: ['./', './dist']
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

gulp.task('css', function(){
    gulp.src(['src/lib/slick/slick.css', 'src/lib/chosen/chosen.css', 'src/lib/politeMask/polite.css'])
    .pipe(gulp.dest("./dist/css"));
});

gulp.task('html-build', ['htmlbeautify']);

gulp.task('css-build', ['sass' , 'css']);

gulp.task('js-build', ['js', 'babel']);

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
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

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

gulp.task('lib', function() {
    return gulp.src(libPaths)
        .pipe(gulp.dest('./src/lib'))
})

gulp.task('lib-build', function() {
    return gulp.src('./src/lib/**')
        .pipe(gulp.dest('./dist/lib/'))
})

gulp.task('build', ['html-build', 'lib-build', 'css-build', 'js-build', 'img-build', 'font-build', 'access']);

gulp.task('default', ['babel', 'htmlbeautify','css','sass','serve']);

gulp.task('serve:prod', ['build', 'serve']);