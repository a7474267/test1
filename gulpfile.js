var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('jade', function () {
    // var YOUR_LOCALS = {};

    return gulp.src('./source/**/*.jade')
        .pipe(plumber())
        .pipe(jade({
            // locals: YOUR_LOCALS
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function () {
    return gulp.src('./source/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.postcss([autoprefixer()])) // 直接引入 autoprefixer
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
    gulp.watch('./source/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./source/**/*.jade', gulp.series('jade'));
});

gulp.task('default', gulp.series('sass', 'watch', 'jade'));